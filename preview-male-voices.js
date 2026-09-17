import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { synthesizeSpeech } from "./kokoro-service.js";
import { KOKORO_API_URL } from "./config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Danh sách các giọng nam chuẩn US & UK của Kokoro
const MALE_VOICES = [
  { id: "am_adam", name: "Adam", lang: "US (Mỹ)", style: "Trầm ấm, đĩnh đạc, rất hợp kể chuyện/documentary/review" },
  { id: "am_michael", name: "Michael", lang: "US (Mỹ)", style: "Tự nhiên, năng động, phong cách podcast/thuyết trình" },
  { id: "am_eric", name: "Eric", lang: "US (Mỹ)", style: "Khỏe khoắn, dứt khoát, phong cách tin tức/vlog" },
  { id: "am_liam", name: "Liam", lang: "US (Mỹ)", style: "Ấm áp, nhẹ nhàng, trẻ trung" },
  { id: "am_onyx", name: "Onyx", lang: "US (Mỹ)", style: "Trầm sâu (deep voice), mạnh mẽ, điện ảnh" },
  { id: "am_puck", name: "Puck", lang: "US (Mỹ)", style: "Cá tính, biểu cảm linh hoạt, hoạt hình/hài hước" },
  { id: "am_fenrir", name: "Fenrir", lang: "US (Mỹ)", style: "Mạnh mẽ, chất giọng lôi cuốn" },
  { id: "bm_george", name: "George", lang: "UK (Anh - Anh)", style: "Chuẩn giọng quý ông Anh Quốc, lịch thiệp, BBC style" },
  { id: "bm_lewis", name: "Lewis", lang: "UK (Anh - Anh)", style: "Trẻ trung, hiện đại, phát âm Anh - Anh rất rõ ràng" },
  { id: "bm_daniel", name: "Daniel", lang: "UK (Anh - Anh)", style: "Trang trọng, truyền cảm, học thuật" }
];

// Câu demo mẫu lấy từ chính script của bạn để thử độ biểu cảm
const SAMPLE_TEXT = "Imagine waking up at 8 AM on a gorgeous, sun-drenched Saturday morning in New York. But wait... the global Internet has officially vanished into thin air!";

async function generateMaleSamples() {
  console.log("================================================================");
  console.log("🎧 KOKORO AI - GENERATING MALE VOICE SAMPLES");
  console.log("================================================================");
  console.log(`🔗 API Server: ${KOKORO_API_URL}`);
  console.log(`📝 Câu đọc mẫu: "${SAMPLE_TEXT}"\n`);

  const outputDir = path.join(__dirname, "samples", "male_voices");
  await fs.mkdir(outputDir, { recursive: true });

  let successCount = 0;

  for (let i = 0; i < MALE_VOICES.length; i++) {
    const voice = MALE_VOICES[i];
    const fileName = `${String(i + 1).padStart(2, "0")}_${voice.id}_${voice.name}.wav`;
    const filePath = path.join(outputDir, fileName);

    process.stdout.write(`⏳ [${i + 1}/${MALE_VOICES.length}] Đang render [${voice.id}] - ${voice.name} (${voice.lang})... `);

    try {
      const audioBuffer = await synthesizeSpeech(SAMPLE_TEXT, voice.id, 1.0);
      await fs.writeFile(filePath, audioBuffer);
      console.log(`✅ Xong! (${(audioBuffer.length / 1024).toFixed(1)} KB)`);
      successCount++;
    } catch (err) {
      console.log(`❌ Lỗi: ${err.message}`);
    }
  }

  console.log("\n================================================================");
  console.log(`🎉 ĐÃ XUẤT XONG ${successCount}/${MALE_VOICES.length} FILE GIỌNG NAM DEMO!`);
  console.log(`📁 Thư mục chứa audio: ${outputDir}`);
  console.log("================================================================\n");

  // Tạo file README tóm tắt trong thư mục sample để tiện xem
  const summaryContent = `# 🎙️ Tổng Hợp File Nghe Thử Các Giọng Nam (Kokoro-82M)

Câu đọc mẫu:
> "${SAMPLE_TEXT}"

| File Audio | Voice ID | Tên | Khu vực | Phong cách & Đặc trưng |
|---|---|---|---|---|
${MALE_VOICES.map((v, idx) => `| \`${String(idx + 1).padStart(2, "0")}_${v.id}_${v.name}.wav\` | **${v.id}** | ${v.name} | ${v.lang} | ${v.style} |`).join("\n")}
`;
  await fs.writeFile(path.join(outputDir, "README.md"), summaryContent);
}

generateMaleSamples();
