const express = require("express");
const { Configuration, OpenAIApi } = require("openai");

const router = express.Router();

// ✅ Ensure OpenAI API Key is loaded
if (!process.env.OPENAI_API_KEY) {
  console.error("⚠️ ERROR: Missing OpenAI API Key!");
  process.exit(1);
}

const openai = new OpenAIApi(
  new Configuration({ apiKey: process.env.OPENAI_API_KEY })
);

router.post("/", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: "Message required" });

    const response = await openai.createChatCompletion({
      model: "gpt-4", // ✅ Ensure this is correct
      messages: [{ role: "user", content: message }],
    });

    // ✅ Correctly extract the response from OpenAI
    const botReply = response?.data?.choices?.[0]?.message?.content;

    if (!botReply) {
      throw new Error("Invalid OpenAI response.");
    }

    res.json({ reply: botReply });
  } catch (error) {
    console.error("❌ OpenAI API Error:", error);
    res.status(500).json({ reply: "Sorry, I couldn't process that request." });
  }
});

module.exports = router;

