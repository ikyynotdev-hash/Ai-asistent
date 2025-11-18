// api/chat.js
import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "POST only" });

  try {
    const { messages } = req.body;

    if (!messages)
      return res.status(400).json({ error: "messages missing" });

    const key = process.env.OPENAI_API_KEY;
    if (!key) return res.status(500).json({ error: "No API key in env" });

    const r = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o-mini",
        messages,
        max_tokens: 500,
      },
      {
        headers: {
          Authorization: `Bearer ${key}`,
          "Content-Type": "application/json",
        },
      }
    );

    return res.status(200).json(r.data);
  } catch (err) {
    console.error("AI error:", err.response?.data || err.message);
    return res.status(500).json({
      error: "AI request failed",
      detail: err.response?.data || err.message,
    });
  }
                  }
