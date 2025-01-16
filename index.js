require("dotenv").config();
const express = require("express");
const connectDB = require("./config/mongo");


const app = express();

// Middleware
app.use(express.json());


// Connect to MongoDB and start the server
connectDB();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
