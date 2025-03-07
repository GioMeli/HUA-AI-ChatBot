const express = require("express");
const cors = require("cors");
const chatRoutes = require("./routes/chat");

const app = express();
app.use(express.json());
app.use(cors()); // Allow frontend to communicate with backend

// API Routes
app.use("/api/chat", chatRoutes);

module.exports = app;
