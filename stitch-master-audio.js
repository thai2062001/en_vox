import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OUTPUT_DIR = path.join(__dirname, "output", "no-internet");
const RAW_VOICE_DIR = path.join(OUTPUT_DIR, "raw_voice");
const MASTER_OUTPUT_PATH = path.join(OUTPUT_DIR, "master_audio_full.wav");

/**
 * Đọc dữ liệu PCM 16-bit thô (bỏ qua 44-byte WAV header)
 */
async function readWavPcm(filePath) {
  const fileBuffer = await fs.readFile(filePath);
  if (fileBuffer.length <= 44) {
    throw new Error(`File ${filePath} is corrupted or empty`);
  }
  return fileBuffer.subarray(44);
}

/**
 * Tạo buffer khoảng lặng (Silence)
 * 24000Hz * 1 channel * 2 bytes/sample = 48000 bytes/second
 */
function createSilenceBuffer(durationSec, sampleRate = 24000) {
  const bytes = Math.floor(durationSec * sampleRate * 2);
  return Buffer.alloc(bytes, 0);
}

/**
 * Ghép toàn bộ PCM buffers và gắn Header WAV 24kHz hoàn chỉnh
 */
function createFullWavMaster(pcmBuffers, sampleRate = 24000) {
  const totalPcmSize = pcmBuffers.reduce((acc, b) => acc + b.length, 0);
  const numChannels = 1;
  const bytesPerSample = 2;
  const blockAlign = numChannels * bytesPerSample;
  const byteRate = sampleRate * blockAlign;

  const header = Buffer.alloc(44);
  header.write("RIFF", 0);
  header.writeUInt32LE(36 + totalPcmSize, 4);
  header.write("WAVE", 8);
  header.write("fmt ", 12);
  header.writeUInt32LE(16, 16);
  header.writeUInt16LE(1, 20); // PCM
  header.writeUInt16LE(numChannels, 22);
  header.writeUInt32LE(sampleRate, 24);
  header.writeUInt32LE(byteRate, 28);
  header.writeUInt16LE(blockAlign, 32);
  header.writeUInt16LE(16, 34);
  header.write("data", 36);
  header.writeUInt32LE(totalPcmSize, 40);

  return Buffer.concat([header, ...pcmBuffers]);
}

async function stitchMasterAudio() {
  console.log("================================================================");
  console.log("🎬 MASTER AUDIO STITCHER - SEQUENCING 94 AUDIO FILES");
  console.log("================================================================");

  const files = await fs.readdir(RAW_VOICE_DIR);
  const wavFiles = files.filter(f => f.startsWith("line_") && f.endsWith(".wav")).sort();

  console.log(`📁 Tìm thấy ${wavFiles.length} file audio để ghép nối.`);

  const pcmSequence = [];
  let totalDurationSec = 0;

  // Khoảng lặng mặc định giữa các câu thông thường (0.45 giây)
  const defaultSilence = createSilenceBuffer(0.45);

  // KHOẢNG LẶNG VÀNG KỊCH TÍNH (Dramatic Dead Pause) trước cú lật màn (1.8 giây)
  const dramaticSilence = createSilenceBuffer(1.8);

  for (let i = 0; i < wavFiles.length; i++) {
    const fileName = wavFiles[i];
    const lineNum = i + 1;
    const filePath = path.join(RAW_VOICE_DIR, fileName);

    const pcm = await readWavPcm(filePath);
    pcmSequence.push(pcm);
    const lineDuration = pcm.length / 48000;
    totalDurationSec += lineDuration;

    // Không chèn khoảng lặng sau câu cuối cùng
    if (i < wavFiles.length - 1) {
      // Câu 88 (ngay trước câu 89 "DING DING!"): Chèn 1.8s Dramatic Dead Pause
      if (lineNum === 88) {
        pcmSequence.push(dramaticSilence);
        totalDurationSec += 1.8;
        console.log(`⏸️ [Câu ${lineNum}] -> ĐÃ CHÈN KHOẢNG LẶNG KỊCH TÍNH 1.8s (Dramatic Pause)!`);
      } else {
        pcmSequence.push(defaultSilence);
        totalDurationSec += 0.45;
      }
    }
  }

  console.log("\n⏳ Đang xuất file Master Full Audio WAV 24kHz...");
  const masterBuffer = createFullWavMaster(pcmSequence, 24000);
  await fs.writeFile(MASTER_OUTPUT_PATH, masterBuffer);

  const totalMin = Math.floor(totalDurationSec / 60);
  const totalSec = Math.floor(totalDurationSec % 60);

  console.log("================================================================");
  console.log(`🎉 XUẤT THÀNH CÔNG FILE MASTER AUDIO TOÀN BỘ 94 CÂU!`);
  console.log(`⏱️ Tổng thời lượng: ${totalMin} phút ${totalSec} giây (${totalDurationSec.toFixed(1)}s)`);
  console.log(`📦 Dung lượng file : ${(masterBuffer.length / (1024 * 1024)).toFixed(2)} MB`);
  console.log(`📁 Đường dẫn file  : ${MASTER_OUTPUT_PATH}`);
  console.log("================================================================\n");
}

stitchMasterAudio();
