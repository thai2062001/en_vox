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

async function fixDialogueLines() {
  console.log("================================================================");
  console.log("🎙️ RE-PRODUCING LINE 23 & LINE 39 WITH DUAL-VOICE ROLES");
  console.log("================================================================");
  console.log(`🔗 API Server: ${KOKORO_API_URL}`);

  // 1. Fix Line 23: Starbucks Barista
  console.log(`\n⏳ [1/2] Đang tách đôi câu 23 (Starbucks)...`);
  const narr23 = "Instead, the barista shakes his head apologetically as the screen blares a loud error buzz:";
  const barista23 = "Nationwide network blackout, bro. Cash only today, exact change preferred!";

  const narrBuf23 = await synthesizeSpeech(narr23, "am_adam", 1.05);
  const baristaBuf23 = await synthesizeSpeech(barista23, "am_michael", 1.1);

  const finalPcm23 = Buffer.concat([
    getPcm(narrBuf23),
    createSilenceBuffer(0.3),
    getPcm(baristaBuf23)
  ]);
  await fs.writeFile(path.join(RAW_VOICE_DIR, "line_023.wav"), createWav(finalPcm23));
  console.log(`✅ Đã sửa xong line_023.wav (Giọng nam dẫn am_adam + Barista am_michael)!`);

  // 2. Fix Line 39: Ford F-150 Truck Driver
  console.log(`\n⏳ [2/2] Đang tách đôi câu 39 (Tài xế Ford F-150)...`);
  const narr39 = "Tough guys in lifted Ford F-150 trucks roll down their windows at red lights, awkwardly shouting across lanes:";
  const driver39 = "Hey buddy, do you know if this road goes toward Interstate 5 North?";

  const narrBuf39 = await synthesizeSpeech(narr39, "am_adam", 1.05);
  const driverBuf39 = await synthesizeSpeech(driver39, "am_fenrir", 1.05); // Giọng tài xế ồm ồm, vang

  const finalPcm39 = Buffer.concat([
    getPcm(narrBuf39),
    createSilenceBuffer(0.3),
    getPcm(driverBuf39)
  ]);
  await fs.writeFile(path.join(RAW_VOICE_DIR, "line_039.wav"), createWav(finalPcm39));
  console.log(`✅ Đã sửa xong line_039.wav (Giọng nam dẫn am_adam + Tài xế am_fenrir)!`);

  console.log("\n================================================================\n");
}

fixDialogueLines();
