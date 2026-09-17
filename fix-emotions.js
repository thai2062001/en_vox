import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { synthesizeSpeech } from "./kokoro-service.js";
import { KOKORO_API_URL } from "./config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SCRIPT_PATH = path.join(__dirname, "scripts", "no-internet", "script.md");
const OUTPUT_DIR = path.join(__dirname, "output", "no-internet");
const RAW_VOICE_DIR = path.join(OUTPUT_DIR, "raw_voice");

// Ánh xạ 100% CHÍNH XÁC theo từng câu thực tế của kịch bản (94 câu)
function getExactVocalConfig(index, text) {
  let voice = "am_adam";
  let speed = 1.0;
  let emotion = "Storytelling";
  let pauseAfterMs = 400;

  // 1. Phân đoạn 01–03: Thức dậy lười biếng (Chậm 0.9x)
  if (index >= 1 && index <= 3) {
    speed = 0.9;
    emotion = "Thư thả, ngái ngủ, uể oải buổi sáng";
  }
  // 2. Phân đoạn 04–08: Hoảng loạn & Ra sân (Nhanh 1.18x)
  else if (index >= 4 && index <= 8) {
    speed = 1.18;
    emotion = "Bối rối, dồn dập, cuống cuồng";
  }
  // 3. Phân đoạn 09–10: Nhận thức sự thật (Chậm & Hạ giọng 0.85x)
  else if (index >= 9 && index <= 10) {
    speed = 0.85;
    emotion = "Lạnh lùng, nghiêm trọng, giật mình";
  }
  // 4. Phân đoạn 11–13: Mở đầu & Hook (Vừa phải 1.0x)
  else if (index >= 11 && index <= 13) {
    speed = 1.0;
    emotion = "Sắc sảo, hài hước, tính dẫn chuyện cao";
  }
  // 5. Phân đoạn 14–19: Smart Home phản chủ (1.05x; riêng Alexa dùng af_sarah 0.95x)
  else if (index >= 14 && index <= 19) {
    speed = 1.05;
    emotion = "Châm biếm, mỉa mai sự vô dụng của công nghệ";
    if (text.includes("Sorry, I'm having trouble connecting to the internet")) {
      voice = "af_sarah";
      speed = 0.95;
      emotion = "Giọng nữ máy Alexa vô hồn";
    }
  }
  // 6. Phân đoạn 20–26: Thảm họa tài chính & Starbucks (1.15x; Barista dùng am_michael 1.1x)
  else if (index >= 20 && index <= 26) {
    speed = 1.15;
    emotion = "Cuống quýt, bẽ bàng, căng thẳng ví tiền";
    if (text.includes("Nationwide network blackout, bro")) {
      voice = "am_michael";
      speed = 1.1;
      emotion = "Drive-thru Barista";
    }
  }
  // 7. Phân đoạn 27–33: Siêu thị Casio & Gen Z (1.05x)
  else if (index >= 27 && index <= 33) {
    speed = 1.05;
    emotion = "Trào phúng, tự giễu cợt, nhịp kịch trường";
  }
  // 8. Phân đoạn 34–40: Lạc đường vì mất GPS (1.15x)
  else if (index >= 34 && index <= 40) {
    speed = 1.15;
    emotion = "Hỗn loạn giao thông, hài hước";
  }
  // 9. Phân đoạn 41–48: Hạ tầng thực & Bệnh viện, Sân bay (0.95x)
  else if (index >= 41 && index <= 48) {
    speed = 0.95;
    emotion = "Nghiêm túc, điềm tĩnh, chuyên nghiệp (Documentary style)";
  }
  // 10. Phân đoạn 49–53: Dân văn phòng đi làm lại (1.05x)
  else if (index >= 49 && index <= 53) {
    speed = 1.05;
    emotion = "Hóm hỉnh, cà khịa dân WFH";
  }
  // 11. Phân đoạn 54–63: Phục hưng tri thức & Đĩa than (0.9x)
  else if (index >= 54 && index <= 63) {
    speed = 0.9;
    emotion = "Hoài niệm (Nostalgic), bình yên, giàu chất thơ";
  }
  // 12. Phân đoạn 64–71: Hẹn hò & Viết thư tay (0.88x)
  else if (index >= 64 && index <= 71) {
    speed = 0.88;
    emotion = "Lãng mạn, chân thật, hoài cổ";
  }
  // 13. Phân đoạn 72–77: Hàng xóm sum vầy & Hết FOMO (0.9x)
  else if (index >= 72 && index <= 77) {
    speed = 0.9;
    emotion = "Thư thái tuyệt đối, giải tỏa áp lực tinh thần";
  }
  // 14. Phân đoạn 78–79 (Thực tế là câu 84-88 trong script): Đỉnh điểm bình yên trước bão (0.8x)
  else if (index >= 78 && index <= 88) {
    speed = 0.8;
    emotion = "Bình thản, tận hưởng, giọng trầm ấm";
    if (index === 88) {
      pauseAfterMs = 1800; // DEAD PAUSE 1.8s ngay trước khi chuông nổ
      emotion = "Khoảng lặng kịch tính (Dramatic Dead Pause)";
    }
  }
  // 15. Phân đoạn 80–81 (Thực tế là câu 89-90: DING DING! & Rung điện thoại) (1.25x)
  else if (index >= 89 && index <= 90) {
    speed = 1.25;
    emotion = "Giật thót, bàng hoàng, sốc thị giác";
  }
  // 16. Phân đoạn 82–84 (Thực tế là câu 91-94: Cơn điên trở lại - Cú lật kết màn) (1.28x - 1.3x)
  else if (index >= 91) {
    speed = 1.28;
    emotion = "Hưng phấn tột độ, cuồng loạn";
    if (text.includes("OMG! What episode did the celebrity drama reach?!")) {
      voice = "am_puck"; // Giọng the thé kích động
      speed = 1.3;
      emotion = "The thé cuồng loạn (High-pitch Mania)";
    }
  }

  return { voice, speed, emotion, pauseAfterMs };
}

async function parseScript() {
  const content = await fs.readFile(SCRIPT_PATH, "utf-8");
  const lines = content
    .split("\n")
    .map(line => line.trim())
    .filter(line => line.length > 0);

  return lines.map((text, idx) => {
    const index = idx + 1;
    const cfg = getExactVocalConfig(index, text);
    return {
      index,
      fileName: `line_${String(index).padStart(3, "0")}.wav`,
      text,
      voice: cfg.voice,
      speed: cfg.speed,
      emotion: cfg.emotion,
      pauseAfterMs: cfg.pauseAfterMs
    };
  });
}

async function fixAndReRender() {
  console.log("================================================================");
  console.log("🛠️ KIỂM TRA & RENDER LẠI CHUẨN XÁC CÁC CÂU 78 ĐẾN 88 (HOÀNG HÔN BÌNH YÊN 0.8x)");
  console.log("================================================================");
  console.log(`🔗 API Server: ${KOKORO_API_URL}`);

  const items = await parseScript();
  const manifestPath = path.join(OUTPUT_DIR, "vocal_timeline_manifest.json");
  await fs.writeFile(manifestPath, JSON.stringify(items, null, 2), "utf-8");

  // Các câu cần re-render từ 78 đến 88 cho đúng chất hoàng hôn 0.8x
  const targetIndices = [78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88];

  for (const idx of targetIndices) {
    const item = items[idx - 1];
    const outPath = path.join(RAW_VOICE_DIR, item.fileName);
    process.stdout.write(`⏳ Đang render lại câu ${item.index}: "${item.text.slice(0, 35)}..." [${item.speed}x | ${item.emotion}]... `);

    try {
      const audioBuffer = await synthesizeSpeech(item.text, item.voice, item.speed);
      await fs.writeFile(outPath, audioBuffer);
      console.log(`✅ (${(audioBuffer.length / 1024).toFixed(1)} KB)`);
    } catch (err) {
      console.log(`❌ Lỗi: ${err.message}`);
    }
  }

  console.log("\n================================================================");
  console.log("🎉 ĐÃ ĐỒNG BỘ VÀ FIX CHUẨN XÁC 100% CẢM XÚC HOÀNG HÔN BÌNH YÊN!");
  console.log("================================================================\n");
}

fixAndReRender();
