const express = require('express');
const router = express.Router();
const { registerStudent, login, createManager, getAllManagers } = require('../controllers/authController');
const { authenticate, authorizeAdmin } = require('../middleware/auth');

//testing-start-------------
const bcrypt = require("bcryptjs");
const db = require("../config/db");

router.post("/reset-admin", async (req, res) => {
  const hashed = await bcrypt.hash("admin123", 10);

  db.query(
    "UPDATE users SET password = ? WHERE email = ?",
    [hashed, "admin@campuscare.com"],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Admin password reset" });
    }
  );
});
//testing-end--------------

// Public routes
router.post('/register/student', registerStudent);
router.post('/login', login);

// Admin only routes
router.post('/manager', authenticate, authorizeAdmin, createManager);
router.get('/managers', authenticate, authorizeAdmin, getAllManagers);

module.exports = router;
