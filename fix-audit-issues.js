import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { synthesizeSpeech } from "./kokoro-service.js";
import { KOKORO_API_URL } from "./config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const RAW_VOICE_DIR = path.join(__dirname, "output", "no-internet", "raw_voice");

async function fixSpecificLines() {
  console.log("================================================================");
  console.log("🛠️ RE-RENDERING LINE 6 & LINE 89 WITH CLEAN PHRASING");
  console.log("================================================================");

  // 1. Line 6: Giảm speed từ 1.18x xuống 1.05x để phát âm rõ ràng "Wi-Fi router kicked the bucket"
  const line6Text = "Thinking your Wi-Fi router kicked the bucket, you slip on your favorite green Crocs and sprint straight out the front door.";
  console.log(`⏳ Re-rendering line_006.wav (Speed: 1.05x)...`);
  const buf6 = await synthesizeSpeech(line6Text, "am_adam", 1.05);
  await fs.writeFile(path.join(RAW_VOICE_DIR, "line_006.wav"), buf6);
  console.log(`✅ line_006.wav đã được làm mượt và rõ chữ! (${(buf6.length / 1024).toFixed(1)} KB)`);

  // 2. Line 89: Xóa bỏ emoji 🔊 để phát âm sạch, nhịp DING DING đanh thép
  const line89Text = '"DING DING! DING DING! DING DING!" A violent, unmistakable digital chime shatters the evening silence!';
  console.log(`⏳ Re-rendering line_089.wav (Speed: 1.25x)...`);
  const buf89 = await synthesizeSpeech(line89Text, "am_adam", 1.25);
  await fs.writeFile(path.join(RAW_VOICE_DIR, "line_089.wav"), buf89);
  console.log(`✅ line_089.wav đã sạch emoji và chuẩn nhịp DING DING! (${(buf89.length / 1024).toFixed(1)} KB)`);

  console.log("================================================================\n");
}

fixSpecificLines();
