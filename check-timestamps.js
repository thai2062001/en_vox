import fs from 'fs';
import path from 'path';

const dir = 'output/script_no_white_lies_us/raw_voice';
const filesToCheck = ['line_005.wav', 'line_041.wav', 'line_057.wav', 'line_079.wav', 'line_087.wav'];

console.log('=== THỜI GIAN CẬP NHẬT CÁC FILE LẺ ===');
filesToCheck.forEach(f => {
  const p = path.join(dir, f);
  if (fs.existsSync(p)) {
    const stats = fs.statSync(p);
    console.log(`${f} -> Cập nhật lúc: ${stats.mtime.toISOString()} | Dung lượng: ${stats.size} bytes`);
  } else {
    console.log(`${f} -> KHÔNG TÌM THẤY`);
  }
});

const mPath = 'output/script_no_white_lies_us/master_audio_full.wav';
const mStats = fs.statSync(mPath);
console.log(`\nmaster_audio_full.wav -> Cập nhật lúc: ${mStats.mtime.toISOString()} | Dung lượng: ${mStats.size} bytes`);
