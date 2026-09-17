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

// Ánh xạ 100% chi tiết theo vocal-emotion-guide.md
function getVocalConfig(lineNum, text) {
  let voice = "am_adam";
  let speed = 1.0;
  let emotion = "Neutral Storytelling";
  let pauseAfterMs = 400;

  // 01 – 03: Thức dậy lười biếng (0.9x - Thư thả, ngái ngủ)
  if (lineNum >= 1 && lineNum <= 3) {
    speed = 0.9;
    emotion = "Lazy & Sleepy morning";
  }
  // 04 – 08: Hoảng loạn & Ra sân (1.18x - Bối rối, dồn dập, cuống cuồng)
  else if (lineNum >= 4 && lineNum <= 8) {
    speed = 1.18;
    emotion = "Frantic panic & Confusion";
  }
  // 09 – 10: Nhận thức sự thật (0.85x - Lạnh lùng, nghiêm trọng)
  else if (lineNum >= 9 && lineNum <= 10) {
    speed = 0.85;
    emotion = "Chilling realization";
  }
  // 11 – 13: Mở đầu & Hook (1.0x - Sắc sảo, hài hước, dẫn chuyện)
  else if (lineNum >= 11 && lineNum <= 13) {
    speed = 1.0;
    emotion = "Sharp & Humorous hook";
  }
  // 14 – 19: Smart Home phản chủ (1.05x - Châm biếm mỉa mai; câu 16 Alexa dùng af_sarah)
  else if (lineNum >= 14 && lineNum <= 19) {
    speed = 1.05;
    emotion = "Sarcastic & Mocking smart home";
    if (text.includes("Sorry, I'm having trouble connecting to the internet")) {
      voice = "af_sarah"; // Giọng nữ máy Alexa
      speed = 0.95;
      emotion = "Robotic AI Speaker";
    }
  }
  // 20 – 26: Thảm họa tài chính & Starbucks (1.15x - Cuống quýt, căng thẳng ví tiền)
  else if (lineNum >= 20 && lineNum <= 26) {
    speed = 1.15;
    emotion = "Financial panic & Embarrassment";
    if (text.includes("Nationwide network blackout, bro")) {
      voice = "am_michael";
      speed = 1.1;
      emotion = "Drive-thru Barista";
    }
  }
  // 27 – 33: Siêu thị Casio & Gen Z (1.05x - Trào phúng, tự giễu cợt)
  else if (lineNum >= 27 && lineNum <= 33) {
    speed = 1.05;
    emotion = "Satirical & Theatrical retail chaos";
  }
  // 34 – 40: Lạc đường vì mất GPS (1.15x - Hỗn loạn giao thông, hài hước)
  else if (lineNum >= 34 && lineNum <= 40) {
    speed = 1.15;
    emotion = "Traffic mayhem & Comic relief";
  }
  // 41 – 48: Hạ tầng thực & Bệnh viện, Sân bay (0.95x - Nghiêm túc, điềm tĩnh, chuyên nghiệp)
  else if (lineNum >= 41 && lineNum <= 48) {
    speed = 0.95;
    emotion = "Calm, Steady & Professional documentary";
  }
  // 49 – 53: Dân văn phòng đi làm lại (1.05x - Hóm hỉnh, cà khịa WFH)
  else if (lineNum >= 49 && lineNum <= 53) {
    speed = 1.05;
    emotion = "Witty office reality check";
  }
  // 54 – 63: Thời kỳ Phục hưng tri thức & Đĩa than (0.9x - Hoài niệm, bình yên, giàu chất thơ)
  else if (lineNum >= 54 && lineNum <= 63) {
    speed = 0.9;
    emotion = "Warm nostalgia & Acoustic luxury";
  }
  // 64 – 71: Hẹn hò & Viết thư tay (0.88x - Lãng mạn, chân thật, hoài cổ)
  else if (lineNum >= 64 && lineNum <= 71) {
    speed = 0.88;
    emotion = "Romantic, Tender & Pure vintage dating";
  }
  // 72 – 77: Hàng xóm sum vầy & Hết FOMO (0.9x - Thư thái tuyệt đối, lắng đọng)
  else if (lineNum >= 72 && lineNum <= 77) {
    speed = 0.9;
    emotion = "Deep peaceful community & No FOMO";
  }
  // 78 – 79: Đỉnh điểm bình yên trước bão (0.8x - Cực Chậm, thư thái tuyệt đỉnh)
  else if (lineNum === 78 || lineNum === 79) {
    speed = 0.8;
    emotion = "Peak serenity before the storm";
    if (lineNum === 79) {
      pauseAfterMs = 1800; // DEAD PAUSE 1.8s
    }
  }
  // 80 – 81: Tiếng chuông cắt ngang (1.25x - Cực Nhanh, giật thót, bàng hoàng)
  else if (lineNum === 80 || lineNum === 81) {
    speed = 1.25;
    emotion = "Sudden jump-scare alert";
  }
  // 82 – 84: Cơn điên trở lại - Cú lật kết màn (1.28x - Cực Nhanh & Kích động)
  else if (lineNum >= 82) {
    speed = 1.28;
    emotion = "High-pitch manic hysteria & Comic climax";
    if (text.includes("OMG! What episode did the celebrity drama reach?!")) {
      voice = "am_puck"; // Giọng the thé kích động
      speed = 1.3;
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

  return lines.map((text, index) => {
    const lineNum = index + 1;
    const cfg = getVocalConfig(lineNum, text);

    return {
      index: lineNum,
      fileName: `line_${String(lineNum).padStart(3, "0")}.wav`,
      text,
      voice: cfg.voice,
      speed: cfg.speed,
      emotion: cfg.emotion,
      pauseAfterMs: cfg.pauseAfterMs
    };
  });
}

async function runBatchRender() {
  console.log("================================================================");
  console.log("🎭 KOKORO AI - VOCAL EMOTION & SPEED GUIDED BATCH RENDER");
  console.log("================================================================");
  console.log(`🔗 API Server  : ${KOKORO_API_URL}`);

  await fs.mkdir(RAW_VOICE_DIR, { recursive: true });

  const items = await parseScript();
  const manifestPath = path.join(OUTPUT_DIR, "vocal_timeline_manifest.json");
  await fs.writeFile(manifestPath, JSON.stringify(items, null, 2), "utf-8");
  console.log(`📝 Đã đồng bộ chi tiết kịch bản cảm xúc tại: ${manifestPath}\n`);

  let successCount = 0;
  const startTime = Date.now();

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const outPath = path.join(RAW_VOICE_DIR, item.fileName);

    process.stdout.write(`⏳ [${item.index}/${items.length}] (${item.speed}x | ${item.voice} | ${item.emotion}) "${item.text.slice(0, 30)}..." `);

    try {
      const audioBuffer = await synthesizeSpeech(item.text, item.voice, item.speed);
      await fs.writeFile(outPath, audioBuffer);
      console.log(`✅ (${(audioBuffer.length / 1024).toFixed(1)} KB)`);
      successCount++;
    } catch (err) {
      console.log(`❌ LỖI: ${err.message}`);
    }
  }

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log("\n================================================================");
  console.log(`🎉 HOÀN TẤT RENDER 100% (${successCount}/${items.length} FILE) THEO ĐÚNG VOCAL EMOTION GUIDE TRONG ${elapsed}s!`);
  console.log(`📁 Thư mục lưu audio: ${RAW_VOICE_DIR}`);
  console.log("================================================================\n");
}

runBatchRender();
