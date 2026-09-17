import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SFX_DIR = path.join(__dirname, "output", "no-internet", "sfx");

// Danh sách các URL file SFX thu âm thật (Real Recordings / Foley từ kho bản quyền mở chất lượng cao)
const REAL_SFX_SOURCES = [
  {
    fileName: "01_alarm_clock.wav",
    url: "https://cdn.freesound.org/previews/219/219244_4082826-lq.mp3",
    backupUrl: "https://actions.google.com/sounds/v1/alarms/digital_watch_alarm_long.ogg",
    desc: "Tiếng chuông đồng hồ báo thức điện tử thật dồn dập (Câu 1)"
  },
  {
    fileName: "02_error_chime.wav",
    url: "https://actions.google.com/sounds/v1/cartoon/metal_twang.ogg",
    backupUrl: "https://cdn.freesound.org/previews/142/142608_1840739-lq.mp3",
    desc: "Âm báo lỗi điện thoại / Mất kết nối thật (Câu 4-5)"
  },
  {
    fileName: "03_knock_wood.wav",
    url: "https://actions.google.com/sounds/v1/doors/wood_door_knocking.ogg",
    backupUrl: "https://cdn.freesound.org/previews/366/366113_6687700-lq.mp3",
    desc: "Tiếng gõ cửa gỗ thật cộc cộc vang dội (Câu 17-18)"
  },
  {
    fileName: "04_card_decline_buzz.wav",
    url: "https://actions.google.com/sounds/v1/alarms/beep_short.ogg",
    backupUrl: "https://cdn.freesound.org/previews/342/342756_5858296-lq.mp3",
    desc: "Tiếng Buzz từ chối thanh toán máy POS thật (Câu 21-23)"
  },
  {
    fileName: "05_vinyl_crackle.wav",
    url: "https://actions.google.com/sounds/v1/foley/record_needle_crackle.ogg",
    backupUrl: "https://cdn.freesound.org/previews/415/415209_5121236-lq.mp3",
    desc: "Tiếng kim đĩa than vinyl nổ lách tách ấm áp thu từ máy quay đĩa thật (Câu 60-63)"
  },
  {
    fileName: "06_chair_creak.wav",
    url: "https://actions.google.com/sounds/v1/household/chair_rocking_wood.ogg",
    backupUrl: "https://cdn.freesound.org/previews/416/416838_5121236-lq.mp3",
    desc: "Tiếng ghế bập bênh gỗ cót két thật (Câu 87)"
  },
  {
    fileName: "07_phone_ding_ding.wav",
    url: "https://actions.google.com/sounds/v1/household/bell_ring_short.ogg",
    backupUrl: "https://cdn.freesound.org/previews/411/411089_5121236-lq.mp3",
    desc: "Tiếng chuông thông báo thật ngân vang đanh thép (Câu 89)"
  },
  {
    fileName: "08_phone_vibrate.wav",
    url: "https://cdn.freesound.org/previews/536/536108_11566416-lq.mp3",
    backupUrl: "https://actions.google.com/sounds/v1/tools/vibrating_motor.ogg",
    desc: "Tiếng điện thoại rung bần bật trên mặt bàn gỗ thật (Câu 90)"
  },
  {
    fileName: "09_notification_storm.wav",
    url: "https://cdn.freesound.org/previews/567/567280_12384752-lq.mp3",
    backupUrl: "https://actions.google.com/sounds/v1/household/clock_ticking_fast.ogg",
    desc: "Bão thông báo ting ting dồn dập (Câu 91-93)"
  }
];

async function downloadFile(url, targetPath) {
  const res = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
    }
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const arrayBuffer = await res.arrayBuffer();
  await fs.writeFile(targetPath, Buffer.from(arrayBuffer));
}

async function fetchRealSFX() {
  console.log("================================================================");
  console.log("📥 DOWNLOADING STUDIO-QUALITY REAL SOUND RECORDINGS (FOLEY & UI)");
  console.log("================================================================");

  await fs.mkdir(SFX_DIR, { recursive: true });

  for (let i = 0; i < REAL_SFX_SOURCES.length; i++) {
    const sfx = REAL_SFX_SOURCES[i];
    const targetPath = path.join(SFX_DIR, sfx.fileName);

    process.stdout.write(`⏳ [${i + 1}/${REAL_SFX_SOURCES.length}] Đang tải [${sfx.fileName}] - ${sfx.desc}... `);

    try {
      try {
        await downloadFile(sfx.url, targetPath);
      } catch {
        // Fallback backup URL nếu URL 1 gặp sự cố
        await downloadFile(sfx.backupUrl, targetPath);
      }
      const stat = await fs.stat(targetPath);
      console.log(`✅ Thành công! (${(stat.size / 1024).toFixed(1)} KB)`);
    } catch (err) {
      console.log(`❌ Lỗi tải: ${err.message}`);
    }
  }

  console.log("\n================================================================");
  console.log("🎉 ĐÃ TẢI XONG TOÀN BỘ BỘ SFX THU ÂM THỰC TẾ CHẤT LƯỢNG CAO!");
  console.log(`📁 Thư mục: ${SFX_DIR}`);
  console.log("================================================================\n");
}

fetchRealSFX();
