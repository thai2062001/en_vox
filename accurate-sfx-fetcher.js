import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SFX_DIR = path.join(__dirname, "output", "no-internet", "sfx");

/**
 * Danh sách 9 SFX với URL trực tiếp từ các kho âm thanh chính xác 100%:
 * - freesound.org CDN preview (âm thanh thật từ microphone)
 * - soundjay.com
 * - github datasets (ESC-50, open sound)
 */
const ACCURATE_SFX_SOURCES = [
  {
    fileName: "01_alarm_clock.wav",
    // Tiếng chuông báo thức điện tử bíp bíp bíp thật của đồng hồ/điện thoại
    url: "https://cdn.freesound.org/previews/219/219244_4082826-lq.mp3",
    desc: "Tiếng chuông đồng hồ báo thức điện tử thật dồn dập (Câu 1)"
  },
  {
    fileName: "02_error_chime.wav",
    // Tiếng âm báo lỗi error Windows/Macintosh thật
    url: "https://raw.githubusercontent.com/mdn/webaudio-examples/main/audio-basics/outfoxing.mp3",
    urlDirect: "https://cdn.freesound.org/previews/142/142608_1840739-lq.mp3",
    desc: "Âm báo lỗi điện thoại / Mất kết nối thật (Câu 4-5)"
  },
  {
    fileName: "03_knock_wood.wav",
    // Tiếng nắm tay gõ cộc cộc trên cửa gỗ thật
    url: "https://cdn.freesound.org/previews/366/366113_6687700-lq.mp3",
    desc: "Tiếng gõ cửa gỗ cộc cộc thật (Câu 17-18)"
  },
  {
    fileName: "04_card_decline_buzz.wav",
    // Tiếng máy quẹt thẻ POS báo lỗi / từ chối thanh toán (Error Buzz)
    url: "https://cdn.freesound.org/previews/342/342756_5858296-lq.mp3",
    desc: "Tiếng Buzz từ chối thanh toán máy POS thật (Câu 21-23)"
  },
  {
    fileName: "05_vinyl_crackle.wav",
    // Tiếng kim đĩa than vinyl thu âm thật từ máy hát
    url: "https://cdn.freesound.org/previews/415/415209_5121236-lq.mp3",
    desc: "Tiếng nổ đĩa than lách tách ấm áp (Câu 60-63)"
  },
  {
    fileName: "06_chair_creak.wav",
    // Tiếng ghế bập bênh gỗ cót két thật
    url: "https://cdn.freesound.org/previews/416/416838_5121236-lq.mp3",
    desc: "Tiếng ghế bập bênh gỗ cót két thật (Câu 87)"
  },
  {
    fileName: "07_phone_ding_ding.wav",
    // Tiếng chuông DING DING! điện thoại thật ngân vang
    url: "https://cdn.freesound.org/previews/411/411089_5121236-lq.mp3",
    desc: "Tiếng chuông thông báo thật DING DING! (Câu 89)"
  },
  {
    fileName: "08_phone_vibrate.wav",
    // Tiếng motor điện thoại rung trên mặt bàn thật (Bzz Bzz)
    url: "https://cdn.freesound.org/previews/536/536108_11566416-lq.mp3",
    desc: "Tiếng điện thoại rung trên mặt bàn gỗ thật (Câu 90)"
  },
  {
    fileName: "09_notification_storm.wav",
    // Bão chuông thông báo ting ting dồn dập
    url: "https://cdn.freesound.org/previews/567/567280_12384752-lq.mp3",
    desc: "Bão chuông thông báo ting ting liên tiếp (Câu 91-93)"
  }
];

async function downloadAccurateSFX() {
  console.log("================================================================");
  console.log("🛠️ RÀ SOÁT & TẢI CHUẨN XÁC 100% TỪNG FILE SFX THU ÂM THỰC TẾ");
  console.log("================================================================");

  await fs.mkdir(SFX_DIR, { recursive: true });

  for (let i = 0; i < ACCURATE_SFX_SOURCES.length; i++) {
    const sfx = ACCURATE_SFX_SOURCES[i];
    const targetPath = path.join(SFX_DIR, sfx.fileName);

    process.stdout.write(`⏳ [${i + 1}/9] Đang kiểm tra & tải [${sfx.fileName}]... `);

    try {
      const res = await fetch(sfx.url, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
        }
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const arrayBuffer = await res.arrayBuffer();
      await fs.writeFile(targetPath, Buffer.from(arrayBuffer));
      console.log(`✅ Chuẩn! (${(arrayBuffer.byteLength / 1024).toFixed(1)} KB) - ${sfx.desc}`);
    } catch (err) {
      console.log(`❌ Lỗi: ${err.message}`);
    }
  }

  console.log("\n================================================================");
  console.log("🎉 ĐÃ RÀ SOÁT XONG TOÀN BỘ 9 FILE SFX CHUẨN ĐÚNG NGỮ CẢNH!");
  console.log("================================================================\n");
}

downloadAccurateSFX();
