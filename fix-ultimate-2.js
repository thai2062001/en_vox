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

// 2 câu cần tối ưu đặc biệt cho chuẩn xác từng âm tiết
const ULTIMATE_FIXES = [
  // 1. Line 005: "blurt out" -> Thử tách và nối hoặc dùng câu từ rõ ràng âm /t/
  {
    lineNum: 5,
    fileName: "line_005.wav",
    segments: [
      { text: "And it comes with one terrifying, non-negotiable rule: Whenever someone asks you a question, your brain instantly forces your mouth to blurt out your rawest, unfiltered thoughts!", voice: "am_michael", speed: 1.0 }
    ]
  },
  // 2. Line 057: "Botox" -> dùng "Botox injections" hoặc "Botox treatments"
  {
    lineNum: 57,
    fileName: "line_057.wav",
    segments: [
      { text: "My skin looks like this because I spend fifteen thousand dollars a month on cosmetic surgery, Botox injections, and weekly laser treatments, so please stop wasting your hard-earned paycheck on this garbage.", voice: "af_heart", speed: 1.05 }
    ]
  }
];

async function runUltimateFixes() {
  console.log("=== BẮT ĐẦU FIX TUYỆT ĐỐI CHO LINE 005 & LINE 057 ===");
  const outputDir = path.join(__dirname, "output", "script_no_white_lies_us", "raw_voice");

  for (const item of ULTIMATE_FIXES) {
    const targetPath = path.join(outputDir, item.fileName);
    console.log(`\n🔄 Đang render: ${item.fileName}...`);

    const segmentBuffers = [];

    for (let sIdx = 0; sIdx < item.segments.length; sIdx++) {
      const seg = item.segments[sIdx];
      console.log(`  -> Đoạn ${sIdx + 1}: Voice [${seg.voice}] | "${seg.text}"`);

      let retry = 0;
      let success = false;
      let audioBuf = null;

      while (retry < 3 && !success) {
        try {
          audioBuf = await synthesizeSpeech(seg.text, seg.voice, seg.speed || 1.0);
          success = true;
        } catch (err) {
          retry++;
          console.warn(`    ⚠️ Thử lại ${retry}/3:`, err.message);
          await sleep(2000);
        }
      }

      segmentBuffers.push(audioBuf);
      await sleep(150);
    }

    const finalWav = concatenateWavBuffers(segmentBuffers);
    fs.writeFileSync(targetPath, finalWav);
    console.log(`  ✅ Đã xuất: ${item.fileName} (${(finalWav.length / 1024).toFixed(1)} KB)`);
  }

  console.log("\nGhép lại file Master Audio hoàn chỉnh...");
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

  console.log(`🎉 HOÀN THÀNH XUẤT SẮC! File Master: ${masterPath} (${(masterWav.length / 1024 / 1024).toFixed(2)} MB)`);
}

runUltimateFixes().catch(console.error);
