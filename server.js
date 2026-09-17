import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { KOKORO_API_URL, DEFAULT_CONFIG } from "./config.js";
import { getSpeakers, synthesizeSpeech } from "./kokoro-service.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// API cung cấp cấu hình hiện tại cho UI Client
app.get("/api/config", (req, res) => {
  res.json({
    apiUrl: KOKORO_API_URL,
    defaultConfig: DEFAULT_CONFIG
  });
});

// API Proxy lấy danh sách giọng
app.get("/api/speakers", async (req, res) => {
  try {
    const speakers = await getSpeakers();
    res.json(speakers);
  } catch (error) {
    res.status(502).json({ 
      error: "Không thể kết nối đến Kokoro Server trên Colab", 
      details: error.message,
      apiUrl: KOKORO_API_URL
    });
  }
});

// API Proxy tạo giọng nói
app.post("/api/tts", async (req, res) => {
  try {
    const { text, voice, speed } = req.body;
    if (!text || !text.trim()) {
      return res.status(400).json({ error: "Nội dung văn bản không được để trống" });
    }

    const audioBuffer = await synthesizeSpeech(
      text, 
      voice || DEFAULT_CONFIG.voice, 
      speed || DEFAULT_CONFIG.speed
    );

    res.set({
      "Content-Type": "audio/wav",
      "Content-Disposition": "attachment; filename=\"speech.wav\"",
      "Content-Length": audioBuffer.length
    });

    res.send(audioBuffer);
  } catch (error) {
    console.error("Lỗi khi tạo TTS:", error.message);
    res.status(500).json({ 
      error: "Lỗi tạo audio", 
      details: error.message 
    });
  }
});

app.listen(PORT, () => {
  console.log("\n========================================================");
  console.log(`🚀 English Vox Web App đang chạy tại: http://localhost:${PORT}`);
  console.log(`🔗 Target Colab API: ${KOKORO_API_URL}`);
  console.log("========================================================\n");
});
