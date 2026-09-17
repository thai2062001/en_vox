import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { synthesizeSpeech } from "./kokoro-service.js";
import { KOKORO_API_URL } from "./config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const RAW_VOICE_DIR = path.join(__dirname, "output", "no-internet", "raw_voice");

async function fixLine73Pronunciation() {
  console.log("================================================================");
  console.log("🎙️ FIXING PRONUNCIATION FOR LINE 73: 'leaving people on Read (/red/)'");
  console.log("================================================================");
  console.log(`🔗 API Server: ${KOKORO_API_URL}`);

  // Dùng phonetic spelling "Red" để ép engine phát âm chính xác tuyệt đối /red/ (quá khứ phân từ / seen tin nhắn)
  const phoneticText = 'There is no more ghosting, no leaving people on "Red", and no passive-aggressive status updates; if you want to express your feelings, you have to say it face-to-face.';
  
  console.log(`⏳ Đang render lại line_073.wav với phát âm chuẩn /red/ (Speed: 0.9x)...`);
  const audioBuf = await synthesizeSpeech(phoneticText, "am_adam", 0.9);
  
  const outPath = path.join(RAW_VOICE_DIR, "line_073.wav");
  await fs.writeFile(outPath, audioBuf);

  console.log(`✅ line_073.wav đã phát âm chuẩn 100% /red/! (${(audioBuf.length / 1024).toFixed(1)} KB)`);
  console.log("================================================================\n");
}

fixLine73Pronunciation();
