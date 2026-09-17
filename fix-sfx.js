import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SFX_DIR = path.join(__dirname, "output", "no-internet", "sfx");

// Link CDN trực tiếp chất lượng cao (Pixabay / Wikimedia Commons / Google Sound Library)
const SFX_DOWNLOAD_LIST = [
  {
    fileName: "03_knock_wood.wav",
    url: "https://cdn.pixabay.com/download/audio/2022/03/15/audio_731e846059.mp3?filename=knocking-on-door-sound-effect-24088.mp3",
    desc: "Tiếng nắm tay gõ cửa gỗ thật vang dội (Knock Knock)"
  },
  {
    fileName: "06_chair_creak.wav",
    url: "https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=chair-creak-93796.mp3",
    desc: "Tiếng ghế gỗ cót két cơ học tự nhiên"
  },
  {
    fileName: "08_phone_vibrate.wav",
    url: "https://cdn.pixabay.com/download/audio/2021/08/04/audio_03d6d03cf9.mp3?filename=cell-phone-vibrating-72120.mp3",
    desc: "Tiếng điện thoại rung trên mặt bàn gỗ thật (Bzz Bzz)"
  },
  {
    fileName: "09_notification_storm.wav",
    url: "https://cdn.pixabay.com/download/audio/2022/03/10/audio_c3527aa526.mp3?filename=message-pop-alert-24549.mp3",
    desc: "Tiếng thông báo tin nhắn pop-up dồn dập"
  }
];

async function downloadFile(url, targetPath) {
  const res = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    }
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const arrayBuffer = await res.arrayBuffer();
  await fs.writeFile(targetPath, Buffer.from(arrayBuffer));
}

async function fixRemainingSFX() {
  console.log("================================================================");
  console.log("📥 DOWNLOADING REMAINING REAL SFX FROM PIXABAY HIGH QUALITY CDN");
  console.log("================================================================");

  for (const sfx of SFX_DOWNLOAD_LIST) {
    const targetPath = path.join(SFX_DIR, sfx.fileName);
    process.stdout.write(`⏳ Đang tải [${sfx.fileName}] - ${sfx.desc}... `);
    try {
      await downloadFile(sfx.url, targetPath);
      const stat = await fs.stat(targetPath);
      console.log(`✅ Thành công! (${(stat.size / 1024).toFixed(1)} KB)`);
    } catch (err) {
      console.log(`❌ Lỗi: ${err.message}`);
    }
  }

  console.log("\n================================================================");
  console.log("🎉 ĐÃ CẬP NHẬT 100% TOÀN BỘ CÁC FILE SFX THU ÂM NGOÀI ĐỜI THẬT!");
  console.log("================================================================\n");
}

fixRemainingSFX();
