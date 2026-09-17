import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { synthesizeSpeech } from "./kokoro-service.js";
import { KOKORO_API_URL } from "./config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const RAW_VOICE_DIR = path.join(__dirname, "output", "no-internet", "raw_voice");

async function fixLine24YearPronunciation() {
  console.log("================================================================");
  console.log("🎙️ FIXING LINE 24 YEAR PRONUNCIATION: 'nineteen ninety-eight'");
  console.log("================================================================");
  console.log(`🔗 API Server: ${KOKORO_API_URL}`);

  const cleanText = "You frantically dump your entire backpack across the passenger seat: all you can find is one rusty nineteen ninety-eight quarter, two paperclips, and faded Target receipts from six months ago.";
  
  console.log(`⏳ Đang render lại line_024.wav với cách đọc năm tự nhiên 'nineteen ninety-eight' (Speed: 1.15x)...`);
  const audioBuf = await synthesizeSpeech(cleanText, "am_adam", 1.15);
  
  const outPath = path.join(RAW_VOICE_DIR, "line_024.wav");
  await fs.writeFile(outPath, audioBuf);

  console.log(`✅ line_024.wav đã phát âm chuẩn tự nhiên 'nineteen ninety-eight'! (${(audioBuf.length / 1024).toFixed(1)} KB)`);
  console.log("================================================================\n");
}

fixLine24YearPronunciation();
