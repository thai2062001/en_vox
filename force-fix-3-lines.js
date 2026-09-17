import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { synthesizeSpeech } from "./kokoro-service.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function createSilenceBuffer(durationMs, sampleRate = 24000) {
  const numSamples = Math.floor((sampleRate * durationMs) / 1000);
  return Buffer.alloc(numSamples * 2);
}

function concatenateWavBuffers(buffers) {
  if (!buffers || buffers.length === 0) return Buffer.alloc(0);
  if (buffers.length === 1) return buffers[0];

  const pcmChunks = [];
  let header = null;

  for (const buf of buffers) {
    if (buf.length >= 44 && buf.toString("ascii", 0, 4) === "RIFF") {
      if (!header) {
        header = Buffer.from(buf.subarray(0, 44));
      }
      pcmChunks.push(buf.subarray(44));
    } else {
      pcmChunks.push(buf);
    }
  }

  const allPcm = Buffer.concat(pcmChunks);
  const totalLength = 44 + allPcm.length;
  const newHeader = Buffer.alloc(44);
  header.copy(newHeader);

  newHeader.writeUInt32LE(totalLength - 8, 4);
  newHeader.writeUInt32LE(allPcm.length, 40);

  return Buffer.concat([newHeader, allPcm]);
}

async function forceFixTarget3Lines() {
  console.log("=== SỬA TRIỆT ĐỂ 3 CHỖ BẮT BUỘC ===");
  const outputDir = path.join(__dirname, "output", "script_no_white_lies_us", "raw_voice");

  // 1. Line 057: Sửa từ Botox phát âm liền mạch /ˈboʊ.tɑːks/
  console.log("1. Render line_057.wav (Nữ minh tinh nói botox liền mạch)...");
  const a57 = await synthesizeSpeech(
    "My skin looks like this because I spend fifteen thousand dollars a month on cosmetic surgery, boe-tox, and weekly laser treatments, so please stop wasting your hard-earned paycheck on this garbage.",
    "af_heart",
    1.05
  );
  fs.writeFileSync(path.join(outputDir, "line_057.wav"), a57);
  console.log("   ✅ Đã xong line_057.wav");

  // 2. Line 079: Chàng trai hẹn hò hỏi ngược lại (Đổi hoàn toàn sang giọng nhân vật nam trẻ am_michael)
  console.log("2. Render line_079.wav (Chàng trai ở nhà hàng hỏi ngược lại)...");
  const a79_intro = await synthesizeSpeech("He immediately asks in return:", "am_adam", 1.0);
  const a79_quote = await synthesizeSpeech("And what do you think of me in person?", "am_michael", 1.05);
  const line79 = concatenateWavBuffers([a79_intro, createSilenceBuffer(150), a79_quote]);
  fs.writeFileSync(path.join(outputDir, "line_079.wav"), line79);
  console.log("   ✅ Đã xong line_079.wav");

  // 3. Line 087: Người chồng chê váy (Đổi hoàn toàn câu chê sang giọng người chồng am_eric)
  console.log("3. Render line_087.wav (Người chồng dưới phố chê váy bục chỉ)...");
  const a87_intro = await synthesizeSpeech("The husband blinks in utter helplessness:", "am_adam", 1.05);
  const a87_quote = await synthesizeSpeech("Yes! You've noticeably gained weight, your double chin is swallowing your neck, and that dress looks like the side seams are about to explode into confetti!", "am_eric", 1.12);
  const line87 = concatenateWavBuffers([a87_intro, createSilenceBuffer(150), a87_quote]);
  fs.writeFileSync(path.join(outputDir, "line_087.wav"), line87);
  console.log("   ✅ Đã xong line_087.wav");

  // Ghép lại toàn bộ 110 câu vào Master Audio
  console.log("\nTiến hành ghép nối toàn bộ 110 câu vào master_audio_full.wav...");
  const masterSegments = [];
  const sceneJumpLines = [10, 19, 25, 32, 46, 58, 73, 88, 98];

  for (let i = 1; i <= 110; i++) {
    const fileNum = String(i).padStart(3, "0");
    const filePath = path.join(outputDir, `line_${fileNum}.wav`);
    const fileBuf = fs.readFileSync(filePath);
    masterSegments.push(fileBuf);

    if (i < 110) {
      const pauseDuration = sceneJumpLines.includes(i) ? 750 : 300;
      masterSegments.push(createSilenceBuffer(pauseDuration));
    }
  }

  const masterWav = concatenateWavBuffers(masterSegments);
  const masterPath = path.join(__dirname, "output", "script_no_white_lies_us", "master_audio_full.wav");
  fs.writeFileSync(masterPath, masterWav);

  console.log(`🎉 HOÀN THÀNH XUẤT SẮC! File Master chuẩn chỉnh: ${masterPath} (${(masterWav.length / 1024 / 1024).toFixed(2)} MB)`);
}

forceFixTarget3Lines().catch(console.error);
