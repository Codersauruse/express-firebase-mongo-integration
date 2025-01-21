const authRouter = require("./routes/authRoutes.js");
require("dotenv").config();
const cors = require("cors");
const express = require("express");
const connectDB = require("./config/mongo");

const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173", // Your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
    credentials: true, // Include credentials if required
  })
);
app.use(express.json());

app.use("/api/auth", authRouter);
// Connect to MongoDB and start the server
connectDB();
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
