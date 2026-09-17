import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { synthesizeSpeech } from "./kokoro-service.js";
import { KOKORO_API_URL } from "./config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OUTPUT_DIR = path.join(__dirname, "output", "no-internet");
const RAW_VOICE_DIR = path.join(OUTPUT_DIR, "raw_voice");

async function fixLine93Optimized() {
  const optimizedText = 'You slam the charger into the port, frantically tapping the screen with wild eyes, screaming: "Oh my God, did I miss anything?! Who got canceled?!".';
  const outPath = path.join(RAW_VOICE_DIR, "line_093.wav");

  console.log("================================================================");
  console.log("🎙️ RE-RENDERING LINE_093.WAV WITH OPTIMIZED PHRASING");
  console.log("================================================================");
  console.log(`🔗 API Server: ${KOKORO_API_URL}`);
  console.log(`🗣️ Voice     : am_adam`);
  console.log(`⚡ Speed     : 1.25x (Kịch tính, dồn dập)`);
  console.log(`📝 Text mới  : "${optimizedText}"`);

  const audioBuffer = await synthesizeSpeech(optimizedText, "am_adam", 1.25);
  await fs.writeFile(outPath, audioBuffer);

  console.log(`\n✅ Render thành công line_093.wav mới! (${(audioBuffer.length / 1024).toFixed(1)} KB)`);
  console.log("================================================================\n");
}

fixLine93Optimized();
