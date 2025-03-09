const express = require("express");
const { Configuration, OpenAIApi } = require("openai");

const router = express.Router();

// Ensure API key exists
if (!process.env.OPENAI_API_KEY) {
  console.error("⚠️ OPENAI_API_KEY is missing! Set it in your environment variables.");
}

const openai = new OpenAIApi(
  new Configuration({ apiKey: process.env.OPENAI_API_KEY })
);

router.post("/", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message.trim()) return res.status(400).json({ error: "Message required" });

    console.log("User Message:", message); // Debugging log

    const response = await openai.createChatCompletion({
      model: "gpt-4", // Ensure you have access to GPT-4
      messages: [{ role: "user", content: message }],
      temperature: 0.7, // Adjust creativity level (0 = factual, 1 = creative)
      max_tokens: 150, // Limit response length
    });

    const botReply = response?.data?.choices?.[0]?.message?.content?.trim();
    
    if (!botReply) {
      throw new Error("Empty response from OpenAI");
    }

    console.log("Bot Reply:", botReply); // Debugging log

    res.json({ reply: botReply });

  } catch (error) {
    console.error("❌ OpenAI API Error:", error.response?.data || error.message);
    res.status(500).json({ error: "OpenAI API Error, please try again later." });
  }
});

module.exports = router;

