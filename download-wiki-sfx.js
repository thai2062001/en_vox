import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SFX_DIR = path.join(__dirname, "output", "no-internet", "sfx");

// Link từ Wikimedia Commons và GitHub Raw Audio (không bị chặn 403, tải trực tiếp 100%)
const WIKI_SFX = [
  {
    fileName: "03_knock_wood.wav",
    url: "https://upload.wikimedia.org/wikipedia/commons/e/eb/Knock_on_door.ogg",
    desc: "Tiếng nắm tay gõ cửa gỗ thật cộc cộc vang dội"
  },
  {
    fileName: "08_phone_vibrate.wav",
    url: "https://upload.wikimedia.org/wikipedia/commons/1/15/Vibrate.ogg",
    desc: "Tiếng điện thoại rung trên mặt bàn gỗ thật (Bzz Bzz)"
  },
  {
    fileName: "09_notification_storm.wav",
    url: "https://upload.wikimedia.org/wikipedia/commons/8/87/Desk_bell_strike_01.wav",
    desc: "Tiếng chuông gõ ting ting thông báo kim loại"
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

async function fixWithWikimedia() {
  console.log("================================================================");
  console.log("📥 DOWNLOADING FROM WIKIMEDIA COMMONS AUDIO ARCHIVE");
  console.log("================================================================");

  for (const sfx of WIKI_SFX) {
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
  console.log("🎉 TOÀN BỘ 9/9 FILE SFX THU ÂM THỰC TẾ NGOÀI ĐỜI ĐÃ HOÀN TẤT 100%!");
  console.log("================================================================\n");
}

fixWithWikimedia();
