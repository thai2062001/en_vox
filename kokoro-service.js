import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { KOKORO_API_URL, DEFAULT_CONFIG } from "./config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Lấy danh sách giọng đọc từ Server Kokoro
 */
export async function getSpeakers() {
  const cleanUrl = KOKORO_API_URL.replace(/\/$/, "");
  try {
    const res = await fetch(`${cleanUrl}/speakers`);
    if (!res.ok) {
      throw new Error(`Server returned status ${res.status}`);
    }
    return await res.json();
  } catch (err) {
    throw new Error(`Cannot connect to Kokoro Server at ${cleanUrl}. Error: ${err.message}`);
  }
}

/**
 * Render Audio WAV từ văn bản
 * @param {string} text - Văn bản tiếng Anh cần đọc
 * @param {string} voice - ID giọng đọc (ví dụ: 'af_heart', 'am_adam', 'bf_emma')
 * @param {number} speed - Tốc độ đọc (mặc định 1.0)
 * @returns {Promise<Buffer>} - Buffer binary của file .wav
 */
export async function synthesizeSpeech(text, voice = DEFAULT_CONFIG.voice, speed = DEFAULT_CONFIG.speed) {
  if (!text || !text.trim()) {
    throw new Error("Text parameter cannot be empty");
  }

  const cleanUrl = KOKORO_API_URL.replace(/\/$/, "");
  const endpoint = `${cleanUrl}/tts`;

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "audio/wav"
    },
    body: JSON.stringify({
      text: text.trim(),
      voice: voice,
      speed: Number(speed) || 1.0
    })
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`TTS generation failed (${res.status}): ${errorText}`);
  }

  const arrayBuffer = await res.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

/**
 * Render văn bản và ghi trực tiếp ra file .wav trên ổ đĩa
 * @param {string} text 
 * @param {string} outputPath 
 * @param {string} voice 
 * @param {number} speed 
 */
export async function saveTtsToFile(text, outputPath = "./output.wav", voice = DEFAULT_CONFIG.voice, speed = DEFAULT_CONFIG.speed) {
  const audioBuffer = await synthesizeSpeech(text, voice, speed);
  const resolvedPath = path.resolve(__dirname, outputPath);
  await fs.writeFile(resolvedPath, audioBuffer);
  return resolvedPath;
}
