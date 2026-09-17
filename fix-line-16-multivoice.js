import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { synthesizeSpeech } from "./kokoro-service.js";
import { KOKORO_API_URL } from "./config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const RAW_VOICE_DIR = path.join(__dirname, "output", "no-internet", "raw_voice");
const OUT_PATH = path.join(RAW_VOICE_DIR, "line_016.wav");

/**
 * Đọc dữ liệu PCM 16-bit thô (bỏ qua 44-byte WAV header)
 */
function getPcm(buffer) {
  return buffer.subarray(44);
}

/**
 * Tạo buffer khoảng lặng (Silence)
 */
function createSilenceBuffer(durationSec, sampleRate = 24000) {
  const bytes = Math.floor(durationSec * sampleRate * 2);
  return Buffer.alloc(bytes, 0);
}

/**
 * Đóng gói PCM thành file WAV 24kHz hoàn chỉnh
 */
function createWav(pcmBuffer, sampleRate = 24000) {
  const totalPcmSize = pcmBuffer.length;
  const header = Buffer.alloc(44);
  header.write("RIFF", 0);
  header.writeUInt32LE(36 + totalPcmSize, 4);
  header.write("WAVE", 8);
  header.write("fmt ", 12);
  header.writeUInt32LE(16, 16);
  header.writeUInt16LE(1, 20); // PCM
  header.writeUInt16LE(1, 22);  // Mono
  header.writeUInt32LE(sampleRate, 24);
  header.writeUInt32LE(sampleRate * 2, 28);
  header.writeUInt16LE(2, 32);
  header.writeUInt16LE(16, 34);
  header.write("data", 36);
  header.writeUInt32LE(totalPcmSize, 40);

  return Buffer.concat([header, pcmBuffer]);
}

async function fixLine16MultiVoice() {
  console.log("================================================================");
  console.log("🎙️ RE-PRODUCING LINE_016.WAV WITH DUAL-VOICE ROLES");
  console.log("================================================================");
  console.log(`🔗 API Server: ${KOKORO_API_URL}`);

  // Phần 1: Lời dẫn chuyện của giọng nam am_adam
  const narratorText = "Instead of smooth music, the glowing smart cylinder only pulses an ominous, angry red ring, whispering in a robotic tone:";
  console.log(`⏳ [1/2] Render giọng nam dẫn chuyện (am_adam | 1.05x)...`);
  const narratorBuf = await synthesizeSpeech(narratorText, "am_adam", 1.05);

  // Phần 2: Lời thoại của trợ lý ảo Alexa bằng giọng nữ af_sarah (0.95x)
  const alexaText = "Sorry, I'm having trouble connecting to the internet.";
  console.log(`⏳ [2/2] Render câu thoại Alexa (af_sarah | 0.95x)...`);
  const alexaBuf = await synthesizeSpeech(alexaText, "af_sarah", 0.95);

  // Ghép nối: Giọng nam -> Nghỉ 0.3s -> Giọng nữ Alexa
  const silence = createSilenceBuffer(0.35);
  const fullPcm = Buffer.concat([
    getPcm(narratorBuf),
    silence,
    getPcm(alexaBuf)
  ]);

  const finalWav = createWav(fullPcm, 24000);
  await fs.writeFile(OUT_PATH, finalWav);

  console.log(`\n✅ Đã ghép hoàn hảo line_016.wav (Giọng nam dẫn + Alexa thoại)! (${(finalWav.length / 1024).toFixed(1)} KB)`);
  console.log("================================================================\n");
}

fixLine16MultiVoice();
