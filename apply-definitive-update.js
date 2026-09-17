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

async function runDefinitiveMasterUpdate() {
  console.log("=== ĐANG CẬP NHẬT CHUẨN XÁC TỪNG FILE ===");
  const outputDir = path.join(__dirname, "output", "script_no_white_lies_us", "raw_voice");

  // 1. Line 005: "blurt-out" đọc cực chuẩn âm /t/ dứt khoát
  console.log("Rendering line_005.wav (blurt-out)...");
  const a5 = await synthesizeSpeech(
    "And it comes with one terrifying, non-negotiable rule: Whenever someone asks you a question, your brain instantly forces your mouth to blurt-out your rawest, unfiltered thoughts!",
    "am_adam",
    1.0
  );
  fs.writeFileSync(path.join(outputDir, "line_005.wav"), a5);

  // 2. Line 041: "Karen" chuẩn số ít
  console.log("Rendering line_041.wav (Karen)...");
  const a41_1 = await synthesizeSpeech("Trembling, the Vice President looks over at the Senior Human Resources Director:", "am_adam", 1.0);
  const a41_2 = await synthesizeSpeech("Karen, how would you rate my leadership over the past year?", "am_eric", 1.0);
  const line41 = concatenateWavBuffers([a41_1, createSilenceBuffer(120), a41_2]);
  fs.writeFileSync(path.join(outputDir, "line_041.wav"), line41);

  // 3. Line 057: "bow-tox" đọc liền mạch chuẩn /ˈboʊ.tɑːks/
  console.log("Rendering line_057.wav (bow-tox)...");
  const a57 = await synthesizeSpeech(
    "My skin looks like this because I spend fifteen thousand dollars a month on cosmetic surgery, bow-tox, and weekly laser treatments, so please stop wasting your hard-earned paycheck on this garbage.",
    "af_heart",
    1.05
  );
  fs.writeFileSync(path.join(outputDir, "line_057.wav"), a57);

  // 4. Line 079: Chàng trai Hinge date am_michael
  console.log("Rendering line_079.wav (Chàng trai Hinge)...");
  const a79_1 = await synthesizeSpeech("He immediately asks in return:", "am_adam", 1.0);
  const a79_2 = await synthesizeSpeech("And what do you think of me in person?", "am_michael", 1.05);
  const line79 = concatenateWavBuffers([a79_1, createSilenceBuffer(120), a79_2]);
  fs.writeFileSync(path.join(outputDir, "line_079.wav"), line79);

  // 5. Line 087: Người chồng chê váy am_eric (giọng đàn ông đứng tuổi)
  console.log("Rendering line_087.wav (Người chồng chê váy)...");
  const a87_1 = await synthesizeSpeech("The husband blinks in utter helplessness:", "am_adam", 1.05);
  const a87_2 = await synthesizeSpeech("Yes! You've noticeably gained weight, your double chin is swallowing your neck, and that dress looks like the side seams are about to explode into confetti!", "am_eric", 1.1);
  const line87 = concatenateWavBuffers([a87_1, createSilenceBuffer(120), a87_2]);
  fs.writeFileSync(path.join(outputDir, "line_087.wav"), line87);

  // Ghép nối Master Audio hoàn chỉnh 110 câu
  console.log("Đang ghép nối lại Master Audio hoàn chỉnh (master_audio_full.wav)...");
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

  console.log(`🎉 HOÀN THÀNH XUẤT SẮC BẢN MASTER MỚI: ${masterPath} (${(masterWav.length / 1024 / 1024).toFixed(2)} MB)`);
}

runDefinitiveMasterUpdate().catch(console.error);
