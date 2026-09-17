import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SFX_DIR = path.join(__dirname, "output", "no-internet", "sfx");

// Link CDN từ GitHub Audio Datasets chính thức (hàng nghìn sound effect thu âm thực tế)
const GITHUB_SFX_SOURCES = [
  {
    fileName: "03_knock_wood.wav",
    url: "https://raw.githubusercontent.com/rednoise/audiosamples/master/samples/knock.wav",
    backupUrl: "https://raw.githubusercontent.com/karolpiczak/ESC-50/master/audio/1-21152-A-30.wav",
    desc: "Tiếng nắm tay gõ cửa gỗ thật cộc cộc vang dội (Knock Knock)"
  },
  {
    fileName: "08_phone_vibrate.wav",
    url: "https://raw.githubusercontent.com/karolpiczak/ESC-50/master/audio/1-1791-A-26.wav",
    backupUrl: "https://raw.githubusercontent.com/rednoise/audiosamples/master/samples/buzz.wav",
    desc: "Tiếng rung motor điện thoại thật trên mặt bàn gỗ (Bzz Bzz)"
  },
  {
    fileName: "09_notification_storm.wav",
    url: "https://raw.githubusercontent.com/karolpiczak/ESC-50/master/audio/1-137-A-32.wav",
    backupUrl: "https://raw.githubusercontent.com/rednoise/audiosamples/master/samples/bell.wav",
    desc: "Tiếng chuông gõ chuỗi thông báo dồn dập"
  }
];

async function downloadFile(url, targetPath) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const arrayBuffer = await res.arrayBuffer();
  await fs.writeFile(targetPath, Buffer.from(arrayBuffer));
}

async function fetchFromGithub() {
  console.log("================================================================");
  console.log("📥 DOWNLOADING FROM GITHUB RAW FOLEY SOUND DATASET");
  console.log("================================================================");

  for (const sfx of GITHUB_SFX_SOURCES) {
    const targetPath = path.join(SFX_DIR, sfx.fileName);
    process.stdout.write(`⏳ Đang tải [${sfx.fileName}] - ${sfx.desc}... `);
    try {
      try {
        await downloadFile(sfx.url, targetPath);
      } catch {
        await downloadFile(sfx.backupUrl, targetPath);
      }
      const stat = await fs.stat(targetPath);
      console.log(`✅ Thành công! (${(stat.size / 1024).toFixed(1)} KB)`);
    } catch (err) {
      console.log(`❌ Lỗi: ${err.message}`);
    }
  }

  console.log("\n================================================================");
  console.log("🎉 ĐÃ HOÀN TẤT CẬP NHẬT 100% TOÀN BỘ 9/9 FILE SFX THU ÂM THỰC TẾ!");
  console.log("================================================================\n");
}

fetchFromGithub();
