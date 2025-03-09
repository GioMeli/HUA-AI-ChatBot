require("dotenv").config();

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const chatRoutes = require("./routes/chat"); // Ensure this path is correct

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/chat", chatRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));




