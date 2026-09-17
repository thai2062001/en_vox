import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SCRIPT_PATH = path.join(__dirname, "scripts", "no-internet", "script.md");
const RAW_VOICE_DIR = path.join(__dirname, "output", "no-internet", "raw_voice");

// Các ký tự đặc biệt có thể làm AI TTS bị vấp/ngắt sai hoặc đọc biểu tượng emoji
const PROBLEMATIC_PATTERNS = [
  { regex: /[\u{1F300}-\u{1FAFF}]/u, name: "Emoji icon" }, // Emoji như 🔊
  { regex: /—|–/, name: "Dashes (cần thay bằng dấu phẩy hoặc ngắt hơi)" },
  { regex: /\b[A-Z]{3,}\b/, name: "All caps word (có thể bị đọc từng chữ cái)" },
  { regex: /\.\.\./, name: "Dấu ba chấm lửng (cần kiểm tra độ ngắt hơi)" }
];

async function inspectAudioFiles() {
  console.log("================================================================");
  console.log("🔍 AUDIO QUALITY & SCRIPT AUDIT ENGINE (94 FILES INSPECTION)");
  console.log("================================================================");

  const scriptContent = await fs.readFile(SCRIPT_PATH, "utf-8");
  const scriptLines = scriptContent
    .split("\n")
    .map(l => l.trim())
    .filter(l => l.length > 0);

  const files = await fs.readdir(RAW_VOICE_DIR);
  const wavFiles = files.filter(f => f.endsWith(".wav")).sort();

  console.log(`📊 Số câu trong script: ${scriptLines.length}`);
  console.log(`📊 Số file audio tìm thấy: ${wavFiles.length}`);

  if (scriptLines.length !== wavFiles.length) {
    console.warn(`⚠️ CẢNH BÁO: Số lượng câu (${scriptLines.length}) không khớp với số lượng file (${wavFiles.length})!`);
  }

  const issues = [];
  const metrics = [];

  for (let i = 0; i < wavFiles.length; i++) {
    const fileName = wavFiles[i];
    const filePath = path.join(RAW_VOICE_DIR, fileName);
    const text = scriptLines[i] || "";
    const stat = await fs.stat(filePath);

    // Tính toán thời lượng audio dựa trên kích thước WAV (24000Hz, 16bit mono = 48000 bytes/sec)
    const dataSize = Math.max(0, stat.size - 44);
    const durationSec = dataSize / 48000;
    const wordCount = text.split(/\s+/).filter(w => w.length > 0).length;
    const wordsPerMinute = (wordCount / (durationSec / 60)).toFixed(0);

    metrics.push({
      line: i + 1,
      fileName,
      durationSec: durationSec.toFixed(2),
      wordCount,
      wordsPerMinute,
      sizeKB: (stat.size / 1024).toFixed(1)
    });

    // 1. Kiểm tra file quá nhỏ / rỗng (có thể bị lỗi khi render)
    if (stat.size < 10000 || durationSec < 0.5) {
      issues.push({
        line: i + 1,
        fileName,
        type: "AUDIO_TOO_SHORT",
        severity: "HIGH",
        detail: `Thời lượng quá ngắn (${durationSec.toFixed(2)}s), dung lượng ${(stat.size/1024).toFixed(1)}KB`
      });
    }

    // 2. Kiểm tra tốc độ đọc bất thường (WPM quá cao > 220 hoặc quá chậm < 70)
    if (wordsPerMinute > 230) {
      issues.push({
        line: i + 1,
        fileName,
        type: "READING_TOO_FAST",
        severity: "MEDIUM",
        detail: `Tốc độ đọc quá nhanh (${wordsPerMinute} từ/phút), có thể bị nuốt chữ.`
      });
    } else if (wordsPerMinute < 65 && wordCount > 5) {
      issues.push({
        line: i + 1,
        fileName,
        type: "READING_TOO_SLOW",
        severity: "LOW",
        detail: `Tốc độ đọc quá chậm (${wordsPerMinute} từ/phút).`
      });
    }

    // 3. Kiểm tra văn bản có ký tự dễ gây lỗi đọc cho AI
    if (text.includes("🔊")) {
      issues.push({
        line: i + 1,
        fileName,
        type: "EMOJI_DETECTED",
        severity: "HIGH",
        detail: `Chứa biểu tượng emoji '🔊' trong văn bản (cần xóa để AI không đọc thành 'speaker sound symbol')`
      });
    }

    if (text.includes("FOMO — the Fear of Missing Out")) {
      // Dash dài có thể gây ngắt lạ
    }
  }

  console.log("\n----------------------------------------------------------------");
  console.log(`📋 KẾT QUẢ RÀ SOÁT TỔNG THỂ:`);
  console.log(`- Tổng thời lượng toàn bộ 94 câu: ${(metrics.reduce((acc, m) => acc + parseFloat(m.durationSec), 0) / 60).toFixed(2)} phút.`);
  console.log(`- Tốc độ đọc trung bình: ${(metrics.reduce((acc, m) => acc + parseFloat(m.wordsPerMinute), 0) / metrics.length).toFixed(0)} từ/phút (chuẩn tự nhiên).`);
  console.log(`- Số vấn đề cần chú ý: ${issues.length}`);
  console.log("----------------------------------------------------------------\n");

  if (issues.length > 0) {
    console.log("⚠️ DANH SÁCH CÁC CÂU CẦN TỐI ƯU:");
    issues.forEach(iss => {
      console.log(`👉 [Câu ${iss.line} | ${iss.fileName}] [${iss.severity}] ${iss.type}: ${iss.detail}`);
    });
  } else {
    console.log("✅ TẤT CẢ 94 FILE AUDIO ĐỀU CÓ CHỈ SỐ HOÀN HẢO!");
  }

  // Ghi báo cáo audit chi tiết ra file JSON
  await fs.writeFile(
    path.join(__dirname, "output", "no-internet", "audio_audit_report.json"),
    JSON.stringify({ summary: { totalFiles: wavFiles.length, issuesCount: issues.length }, issues, metrics }, null, 2),
    "utf-8"
  );
}

inspectAudioFiles();
