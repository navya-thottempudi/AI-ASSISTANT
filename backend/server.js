import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import axios from "axios";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.log("❌ MongoDB Error:", err));

// Schema
const chatSchema = new mongoose.Schema({
  question: String,
  response: String,
});

const Chat = mongoose.model("Chat", chatSchema);


// 🔹 ASK ROUTE (AI)
app.post("/ask", async (req, res) => {
  const { question } = req.body;

  if (!question) {
    return res.status(400).json({ error: "Question is required" });
  }

  try {
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.1-8b-instant",
        messages: [{ role: "user", content: question }],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const answer = response.data.choices[0].message.content;

    // Save to MongoDB
    await Chat.create({
      question,
      response: answer,
    });

    res.json({ answer });

  } catch (error) {
    console.error("❌ Groq Error:", error.response?.data || error.message);
    res.status(500).json({ error: "Server error" });
  }
});


// 🔹 HISTORY ROUTE
app.get("/history", async (req, res) => {
  try {
    const chats = await Chat.find().sort({ _id: -1 }).limit(20);
    res.json(chats);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch history" });
  }
});


app.listen(5000, () => {
  console.log("🚀 Server running on port 5000");
});