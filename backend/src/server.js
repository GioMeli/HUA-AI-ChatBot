const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const chatRoutes = require("./Chat"); // Ensure this path is correct

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/chat", chatRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
3️⃣ Install Dependencies (If Not Installed)
Make sure all required dependencies are installed:

sh
Αντιγραφή
Επεξεργασία
npm install
4️⃣ Start the Server
Try running:

sh
Αντιγραφή
Επεξεργασία
npm start
or for development:

sh
Αντιγραφή
Επεξεργασία
npm run dev
If you still get errors, let me know! 🚀🔥








