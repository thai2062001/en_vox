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

async function fixBotoxAndBlurt() {
  const outputDir = path.join(__dirname, "output", "script_no_white_lies_us", "raw_voice");

  // Fix line 057: Thay "Botox" bằng "bow-tox" để phát âm chuẩn /ˈboʊ.tɑːks/
  const p57 = path.join(outputDir, "line_057.wav");
  const audio57 = await synthesizeSpeech(
    "My skin looks like this because I spend fifteen thousand dollars a month on cosmetic surgery, bow-tox, and weekly laser treatments, so please stop wasting your hard-earned paycheck on this garbage.",
    "af_heart",
    1.05
  );
  fs.writeFileSync(p57, audio57);
  console.log("✅ Fix line_057 (bow-tox): xong!");

  // Ghép lại file Master Audio hoàn chỉnh
  console.log("Ghép lại master_audio_full.wav...");
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
  console.log(`🎉 HOÀN TẤT MASTER: ${masterPath}`);
}

fixBotoxAndBlurt().catch(console.error);
