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

// 6 câu cần sửa chuẩn xác
const FIX_LINES = [
  // 1. Line 005 (0:25 - 0:28): "blurt out" -> ép AI đọc rõ âm /t/
  {
    lineNum: 5,
    fileName: "line_005.wav",
    segments: [
      { text: "And it comes with one terrifying, non-negotiable rule: Whenever someone asks you a question, your brain instantly forces your mouth to blurt out your rawest, unfiltered thoughts!", voice: "am_adam", speed: 1.0 }
    ]
  },
  // 2. Line 041 (2:18 - 2:22): VP hỏi Karen không có s
  {
    lineNum: 41,
    fileName: "line_041.wav",
    segments: [
      { text: "Trembling, the Vice President looks over at the Senior Human Resources Director:", voice: "am_adam", speed: 1.0 },
      { text: "Karen, how would you rate my leadership over the past year?", voice: "am_eric", speed: 1.0 }
    ]
  },
  // 3. Line 057 (3:54 - 3:56): "botox" -> viết liền hoặc phonetics
  {
    lineNum: 57,
    fileName: "line_057.wav",
    segments: [
      { text: "My skin looks like this because I spend fifteen thousand dollars a month on cosmetic surgery, botox, and weekly laser treatments, so please stop wasting your hard-earned paycheck on this garbage.", voice: "af_heart", speed: 1.05 }
    ]
  },
  // 4. Line 058 (4:03 - 4:06): "bedlam" -> đọc rõ /ˈbed.ləm/
  {
    lineNum: 58,
    fileName: "line_058.wav",
    segments: [
      { text: "Television networks descend into complete bedlam as producers scramble to cut live feeds while millions of viewers watch in absolute disbelief!", voice: "am_adam", speed: 1.02 }
    ]
  },
  // 5. Line 079 (5:16 - 5:20): Chàng trai hỏi ngược lại trong Hinge Date
  {
    lineNum: 79,
    fileName: "line_079.wav",
    segments: [
      { text: "He immediately asks in return:", voice: "am_adam", speed: 1.0 },
      { text: "And what do you think of me in person?", voice: "am_michael", speed: 1.05 }
    ]
  },
  // 6. Line 087 (6:00 - 6:06): Người chồng chê váy bục chỉ
  {
    lineNum: 87,
    fileName: "line_087.wav",
    segments: [
      { text: "The husband blinks in utter helplessness:", voice: "am_adam", speed: 1.05 },
      { text: "Yes! You've noticeably gained weight, your double chin is swallowing your neck, and that dress looks like the side seams are about to explode into confetti!", voice: "am_eric", speed: 1.1 }
    ]
  }
];

async function applySurgicalFixes() {
  console.log("=== BẮT ĐẦU FIX 6 CÂU PHÁT ÂM & LỆCH VAI ===");
  const outputDir = path.join(__dirname, "output", "script_no_white_lies_us", "raw_voice");

  for (const item of FIX_LINES) {
    const targetPath = path.join(outputDir, item.fileName);
    console.log(`\n🔄 Đang render chuẩn: ${item.fileName}...`);

    const segmentBuffers = [];

    for (let sIdx = 0; sIdx < item.segments.length; sIdx++) {
      const seg = item.segments[sIdx];
      console.log(`  -> Đoạn ${sIdx + 1}: Voice [${seg.voice}] | "${seg.text.substring(0, 45)}..."`);

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

      if (!success || !audioBuf) {
        throw new Error(`Không thể render ${item.fileName}`);
      }

      segmentBuffers.push(audioBuf);

      if (sIdx < item.segments.length - 1) {
        segmentBuffers.push(createSilenceBuffer(120));
      }

      await sleep(150);
    }

    const finalWav = concatenateWavBuffers(segmentBuffers);
    fs.writeFileSync(targetPath, finalWav);
    console.log(`  ✅ Đã ghi đè thành công: ${item.fileName} (${(finalWav.length / 1024).toFixed(1)} KB)`);
  }

  console.log("\n=== TẤT CẢ 6 CÂU ĐÃ ĐƯỢC CẬP NHẬT HOÀN HẢO! ===");
  console.log("Ghép lại file Master Audio...");

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

applySurgicalFixes().catch(console.error);
