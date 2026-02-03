// const express = require('express');
// const cors = require('cors');
// const dotenv = require('dotenv');

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware

// //---------for deployment on Vercel--------
// //app.use(cors());
// // const cors = require("cors");
// app.use(cors({
//   origin: "*", // later you can restrict to Vercel domain
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   credentials: true
// }));
// //----------------------------------------

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Routes
// const authRoutes = require('./routes/authRoutes');
// const complaintRoutes = require('./routes/complaintRoutes');

// app.use('/api/auth', authRoutes);
// app.use('/api/complaints', complaintRoutes);

// // Test route
// app.get('/', (req, res) => {
//   res.send('Campus Care Backend Server is Running!');
// });

// //--------test route while deploying--------
// app.get("/api/health", (req, res) => {
//   res.json({ status: "Backend is running" });
// });
// //---------------------------------------

// // Start server
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });



const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: "*", // later restrict to Vercel domain
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const authRoutes = require("./routes/authRoutes");
const complaintRoutes = require("./routes/complaintRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/complaints", complaintRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "Backend is running" });
});

// Root test
app.get("/", (req, res) => {
  res.send("Campus Care Backend Server is Running!");
});

// 🔥 START SERVER FIRST (CRITICAL FOR RENDER)
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// 🔥 CONNECT DB AFTER SERVER STARTS (NON-BLOCKING)
const db = require("./config/db");

db.connect((err) => {
  if (err) {
    console.error("DB connection failed:", err.message);
  } else {
    console.log("MySQL connected");
  }
});
