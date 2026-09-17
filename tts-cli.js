import { saveTtsToFile, getSpeakers } from "./kokoro-service.js";
import { DEFAULT_CONFIG, KOKORO_API_URL } from "./config.js";

async function main() {
  const text = process.argv.slice(2).join(" ") || 
    "Hello! Welcome to English Vox, powered by the Kokoro AI neural speech engine. This voice is crystal clear and sounds completely natural!";
  
  const voice = DEFAULT_CONFIG.voice;
  const speed = DEFAULT_CONFIG.speed;
  const outputFile = "output.wav";

  console.log("=========================================");
  console.log("🎤 KOKORO TTS - CLI SPEECH SYNTHESIZER");
  console.log("=========================================");
  console.log(`🔗 API Server  : ${KOKORO_API_URL}`);
  console.log(`🗣️ Voice ID    : ${voice}`);
  console.log(`⚡ Speed       : ${speed}x`);
  console.log(`📝 Text Input  : "${text}"`);
  console.log("⏳ Processing request...");

  try {
    const savedPath = await saveTtsToFile(text, outputFile, voice, speed);
    console.log("-----------------------------------------");
    console.log(`✅ Success! Audio saved to: ${savedPath}`);
    console.log("=========================================\n");
  } catch (error) {
    console.error("❌ Error during speech synthesis:", error.message);
    if (KOKORO_API_URL.includes("your-tunnel-link")) {
      console.log("\n⚠️ Lưu ý: Hãy mở Colab notebook `kokoro_colab_server.ipynb`, chạy server và dán link tunnel vào file `config.js` trước khi sử dụng!");
    }
  }
}

main();
