import React, { useState } from "react";
import axios from "axios";
import "./styles.css"; // Ensure this file exists

const App = () => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = { sender: "You", text: message };
    setChat((prevChat) => [...prevChat, userMessage]); // Append user message

    setMessage(""); // Clear input immediately

    try {
      const { data } = await axios.post("http://localhost:5000/api/routes/chat", { message });
      const botMessage = { sender: "Bot", text: data.reply };
      setChat((prevChat) => [...prevChat, botMessage]); // Append bot message correctly
    } catch (error) {
      console.error("Error:", error);
      setChat((prevChat) => [...prevChat, { sender: "Bot", text: "Sorry, something went wrong." }]);
    }
  };

  return (
    <div className="chat-container">
      <header className="chat-header">🤖 AI HUA Chatbot</header>

      <div className="chat-box">
        {chat.map((msg, index) => (
          <div key={index} className={`message ${msg.sender === "You" ? "user" : "bot"}`}>
            <strong>{msg.sender}:</strong> {msg.text}
          </div>
        ))}
      </div>

      <div className="chat-input">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default App;

