import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const HF_API_TOKEN = process.env.HF_TOKEN;
const HF_MODEL_URL = "https://api-inference.huggingface.co/models/bigscience/bloomz-560m";



app.post("/api/chat", async (req, res) => {
  const userMessage = req.body.message;

  // Input validation
  if (!userMessage || userMessage.length < 5) {
    return res.status(400).json({ error: "Message too short or missing." });
  }

  try {
    const prompt = `You are an AI interview coach. Give clear, helpful, professional feedback on this answer:\n"${userMessage}"\nFocus on tone, clarity, and how to improve.`;

    const response = await fetch(HF_MODEL_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${HF_API_TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ inputs: prompt })
    });

    const data = await response.json();

    console.log("🧠 Raw response:", JSON.stringify(data, null, 2));

    let reply = "⚠️ No valid feedback.";
    if (Array.isArray(data) && data[0]?.generated_text) {
      reply = data[0].generated_text;
    } else if (typeof data.generated_text === "string") {
      reply = data.generated_text;
    }

    if (reply.length < 5) {
      throw new Error("Generated reply was too short.");
    }

    res.json({ reply });
  } catch (err) {
    console.error("❌ API error:", err);
    res.status(500).json({ error: "Could not generate AI feedback." });
  }
});

app.listen(5000, () => {
  console.log("✅ Server running on http://localhost:5000");
});
