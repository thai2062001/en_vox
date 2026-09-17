import path from "path";
import { fileURLToPath } from "url";
import { searchSounds, fetchBestSound } from "./freesound-service.js";
import { FREESOUND_API_KEY } from "./config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SFX_DIR = path.join(__dirname, "output", "no-internet", "sfx");

// Danh sách các từ khóa chuẩn studio foley theo đúng 9 phân đoạn của kịch bản
const SFX_PIPELINE = [
  {
    fileName: "01_alarm_clock.mp3",
    query: "digital alarm clock beeping",
    desc: "Chuông báo thức điện tử sáng thứ 7"
  },
  {
    fileName: "02_error_chime.mp3",
    query: "phone error chime notification",
    desc: "Âm báo lỗi điện thoại mất sóng"
  },
  {
    fileName: "03_knock_wood.mp3",
    query: "foley solid wood door knocking",
    desc: "Tiếng nắm tay đấm gõ cửa gỗ đặc"
  },
  {
    fileName: "04_card_decline_buzz.mp3",
    query: "pos terminal payment card decline error buzz",
    desc: "Tiếng máy POS từ chối thẻ Starbucks"
  },
  {
    fileName: "05_vinyl_crackle.mp3",
    query: "vinyl record needle drop crackle vintage",
    desc: "Tiếng kim đĩa than vinyl nổ lách tách"
  },
  {
    fileName: "06_chair_creak.mp3",
    query: "wooden rocking chair squeak creak",
    desc: "Tiếng ghế bập bênh gỗ cót két hoàng hôn"
  },
  {
    fileName: "07_phone_ding_ding.mp3",
    query: "loud notification chime bell ring",
    desc: "Tiếng chuông DING DING! nổ vang sau khoảng lặng"
  },
  {
    fileName: "08_phone_vibrate.mp3",
    query: "mobile phone vibrating on wooden table",
    desc: "Tiếng điện thoại rung trên sàn gỗ"
  },
  {
    fileName: "09_notification_storm.mp3",
    query: "fast message pop alerts chime series",
    desc: "Bão thông báo 9,999+ dồn dập"
  }
];

async function runFreesoundPipeline() {
  console.log("================================================================");
  console.log("🌐 FREESOUND.ORG API - FOLEY SOUND EFFECT FETCHER");
  console.log("================================================================");

  if (!FREESOUND_API_KEY || FREESOUND_API_KEY.includes("YOUR_FREESOUND_API_KEY")) {
    console.log("⚠️ CHƯA CÓ API KEY!");
    console.log("1. Hãy truy cập: https://freesound.org/apiv2/apply/ để lấy API Key miễn phí (chỉ mất 30s).");
    console.log("2. Dán API Key vào biến `FREESOUND_API_KEY` trong file `config.js`.");
    console.log("3. Chạy lại lệnh: node download-freesound-sfx.js\n");
    return;
  }

  for (let i = 0; i < SFX_PIPELINE.length; i++) {
    const sfx = SFX_PIPELINE[i];
    const outPath = path.join(SFX_DIR, sfx.fileName);

    process.stdout.write(`⏳ [${i + 1}/${SFX_PIPELINE.length}] Tìm & Tải [${sfx.query}]... `);

    try {
      const info = await fetchBestSound(sfx.query, outPath);
      console.log(`✅ Xong! ("${info.name}" bởi ${info.author} - ${info.duration.toFixed(1)}s)`);
    } catch (err) {
      console.log(`❌ Lỗi: ${err.message}`);
    }
  }

  console.log("\n================================================================");
  console.log("🎉 ĐÃ HOÀN TẤT TẢI BỘ SFX THỰC TẾ 100% TỪ FREESOUND.ORG!");
  console.log(`📁 Thư mục lưu: ${SFX_DIR}`);
  console.log("================================================================\n");
}

runFreesoundPipeline();
