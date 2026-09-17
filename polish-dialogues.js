import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { synthesizeSpeech } from "./kokoro-service.js";
import { KOKORO_API_URL } from "./config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const RAW_VOICE_DIR = path.join(__dirname, "output", "no-internet", "raw_voice");

function getPcm(buffer) {
  return buffer.subarray(44);
}

function createSilenceBuffer(durationSec, sampleRate = 24000) {
  const bytes = Math.floor(durationSec * sampleRate * 2);
  return Buffer.alloc(bytes, 0);
}

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

async function polishRemainingDialogues() {
  console.log("================================================================");
  console.log("🎙️ POLISHING LINE 15, LINE 32, LINE 86 WITH NATURAL ACTING");
  console.log("================================================================");
  console.log(`🔗 API Server: ${KOKORO_API_URL}`);

  // 1. Line 15: Announce to Alexa ("Alexa, turn on the ceiling lights...")
  console.log(`⏳ [1/3] Xử lý câu 15 (Ra lệnh cho Alexa)...`);
  const narr15 = "You confidently walk into your kitchen and announce:";
  const command15 = "Alexa, turn on the ceiling lights and play some cheerful morning Spotify jazz!";
  
  const narrBuf15 = await synthesizeSpeech(narr15, "am_adam", 1.05);
  const cmdBuf15 = await synthesizeSpeech(command15, "am_adam", 1.0); // Giọng tự tin, vui tươi

  const finalPcm15 = Buffer.concat([
    getPcm(narrBuf15),
    createSilenceBuffer(0.25),
    getPcm(cmdBuf15)
  ]);
  await fs.writeFile(path.join(RAW_VOICE_DIR, "line_015.wav"), createWav(finalPcm15));
  console.log(`✅ line_015.wav đã được xử lý ngắt nhịp ra lệnh tự nhiên!`);

  // 2. Line 32: Scream into the void ("WE ARE SO DOOMED!")
  console.log(`⏳ [2/3] Xử lý câu 32 (Hét lên WE ARE SO DOOMED!)...`);
  const narr32_1 = "The pure psychological agony peaks when you desperately want to open the X app and scream into the void:";
  const scream32 = "WE ARE SO DOOMED!";
  const narr32_2 = ", only to remember nobody can read your panic!";

  const buf32_1 = await synthesizeSpeech(narr32_1, "am_adam", 1.05);
  const buf32_scream = await synthesizeSpeech(scream32, "am_adam", 1.15); // Đọc dằn giọng, hoảng hốt
  const buf32_2 = await synthesizeSpeech(narr32_2, "am_adam", 1.0);

  const finalPcm32 = Buffer.concat([
    getPcm(buf32_1),
    createSilenceBuffer(0.2),
    getPcm(buf32_scream),
    createSilenceBuffer(0.2),
    getPcm(buf32_2)
  ]);
  await fs.writeFile(path.join(RAW_VOICE_DIR, "line_032.wav"), createWav(finalPcm32));
  console.log(`✅ line_032.wav đã có điểm nhấn hét lên tuyệt vời!`);

  // 3. Line 86: Thư thái ngoài hiên nhà ("You know what? Life without the Internet...")
  console.log(`⏳ [3/3] Xử lý câu 86 (Thở phào thư thái hoàng hôn)...`);
  const narr86 = "You stand on your front porch at dusk, taking a deep breath of fresh evening air, and a contented smile spreads across your face:";
  const quote86 = "You know what? Life without the Internet is actually pretty incredible!";

  const narrBuf86 = await synthesizeSpeech(narr86, "am_adam", 0.85);
  const quoteBuf86 = await synthesizeSpeech(quote86, "am_adam", 0.8); // Giọng mỉm cười, thư thái sâu lắng

  const finalPcm86 = Buffer.concat([
    getPcm(narrBuf86),
    createSilenceBuffer(0.35),
    getPcm(quoteBuf86)
  ]);
  await fs.writeFile(path.join(RAW_VOICE_DIR, "line_086.wav"), createWav(finalPcm86));
  console.log(`✅ line_086.wav đã đạt độ lắng đọng hoàng hôn hoàn hảo!`);

  console.log("\n================================================================\n");
}

polishRemainingDialogues();
