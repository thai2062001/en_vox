import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { PERFECT_PRODUCTION_PLAN } from './produce-perfect-110.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rawScript = fs.readFileSync('output/script_no_white_lies_us/script_no_white_lies_us_en.md', 'utf8');
const rawLines = rawScript.split('\n').map(l => l.trim()).filter(l => l.length > 0);

const rawVoiceDir = path.join(__dirname, 'output', 'script_no_white_lies_us', 'raw_voice');

console.log('=== BẮT ĐẦU KIỂM TRA TOÀN DIỆN 110 FILE AUDIO & KỊCH BẢN ===\n');

const auditSummary = {
  totalLinesScript: rawLines.length,
  totalPlanItems: PERFECT_PRODUCTION_PLAN.length,
  totalWavFilesChecked: 0,
  validFilesCount: 0,
  corruptedOrSmallFiles: [],
  discrepancies: []
};

// Đọc danh sách file trong thư mục raw_voice
const existingFiles = fs.readdirSync(rawVoiceDir).filter(f => f.endsWith('.wav'));
auditSummary.totalWavFilesChecked = existingFiles.length;

for (let i = 0; i < rawLines.length; i++) {
  const lineNum = i + 1;
  const rawText = rawLines[i];
  const fileNum = String(lineNum).padStart(3, '0');
  const fileName = `line_${fileNum}.wav`;
  const filePath = path.join(rawVoiceDir, fileName);

  const plan = PERFECT_PRODUCTION_PLAN.find(p => p.lineNum === lineNum);

  if (!plan) {
    auditSummary.discrepancies.push({
      lineNum,
      issue: 'Thiếu cấu hình trong PERFECT_PRODUCTION_PLAN',
      rawText
    });
    continue;
  }

  // 1. Kiểm tra file vật lý tồn tại và dung lượng
  if (!fs.existsSync(filePath)) {
    auditSummary.corruptedOrSmallFiles.push({
      lineNum,
      fileName,
      issue: 'File không tồn tại trên ổ cứng'
    });
    continue;
  }

  const stats = fs.statSync(filePath);
  const fileSizeKB = (stats.size / 1024).toFixed(1);

  if (stats.size < 2048) { // Nhỏ hơn 2KB là bất thường với câu thoại 24kHz
    auditSummary.corruptedOrSmallFiles.push({
      lineNum,
      fileName,
      fileSizeKB,
      issue: 'File quá nhỏ hoặc có thể bị hỏng header'
    });
  } else {
    auditSummary.validFilesCount++;
  }

  // 2. Kiểm tra tính toàn vẹn của WAV Header (44 bytes RIFF)
  const buf = Buffer.alloc(44);
  const fd = fs.openSync(filePath, 'r');
  fs.readSync(fd, buf, 0, 44, 0);
  fs.closeSync(fd);

  const isRiff = buf.toString('ascii', 0, 4) === 'RIFF';
  const isWave = buf.toString('ascii', 8, 12) === 'WAVE';
  const sampleRate = buf.readUInt32LE(24);

  if (!isRiff || !isWave || sampleRate !== 24000) {
    auditSummary.discrepancies.push({
      lineNum,
      fileName,
      issue: `WAV Header không chuẩn: RIFF=${isRiff}, WAVE=${isWave}, sampleRate=${sampleRate}`
    });
  }

  // 3. Kiểm tra giọng đọc đã map đúng
  const voicesAssigned = plan.segments.map(s => `${s.voice}(${s.speed}x)`).join(' + ');
  const combinedPlanText = plan.segments.map(s => s.text).join(' ');

  // In mẫu 5 dòng đầu và các dòng mốc quan trọng
  if (lineNum <= 5 || lineNum === 11 || lineNum === 27 || lineNum === 43 || lineNum === 56 || lineNum === 64 || lineNum === 70 || lineNum === 76 || lineNum === 84 || lineNum === 87 || lineNum === 110) {
    console.log(`[Line ${fileNum}] ${fileName} | ${fileSizeKB} KB | Voices: [${voicesAssigned}]`);
    console.log(`  📝 Script: "${rawText.substring(0, 65)}..."`);
    console.log(`  🎙️ Audio:  "${combinedPlanText.substring(0, 65)}..."\n`);
  }
}

console.log('----------------------------------------------------');
console.log(`✅ Tổng số dòng trong kịch bản gốc: ${auditSummary.totalLinesScript}`);
console.log(`✅ Tổng số file WAV thực tế:        ${auditSummary.totalWavFilesChecked}`);
console.log(`✅ Số file WAV hợp lệ (Playable):   ${auditSummary.validFilesCount} / 110`);
console.log(`⚠️ Số file bị lỗi / quá nhỏ:        ${auditSummary.corruptedOrSmallFiles.length}`);
console.log(`⚠️ Lỗi cấu hình / Header:           ${auditSummary.discrepancies.length}`);

// Kiểm tra file Master
const masterPath = path.join(__dirname, 'output', 'script_no_white_lies_us', 'master_audio_full.wav');
if (fs.existsSync(masterPath)) {
  const mStats = fs.statSync(masterPath);
  console.log(`🎵 File Master Audio:               Tồn tại (${(mStats.size / (1024 * 1024)).toFixed(2)} MB)`);
} else {
  console.error('❌ Không tìm thấy Master Audio!');
}

fs.writeFileSync('output/script_no_white_lies_us/detailed_audio_audit_report.json', JSON.stringify(auditSummary, null, 2));
console.log('----------------------------------------------------');
console.log('Báo cáo chi tiết đã lưu tại output/script_no_white_lies_us/detailed_audio_audit_report.json');
