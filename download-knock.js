import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SFX_DIR = path.join(__dirname, "output", "no-internet", "sfx");
const targetPath = path.join(SFX_DIR, "03_knock_wood.wav");

// Link từ GitHub open source audio repo
const GITHUB_DOOR_KNOCK = "https://raw.githubusercontent.com/mdn/webaudio-examples/main/audio-basics/outfoxing.mp3";
const GITHUB_SFX_KNOCK = "https://raw.githubusercontent.com/johndpope/audiokit-swift-examples/master/AudioKitPlaygrounds/AudioKitPlaygrounds/AudioKitPlaygrounds/Sounds/drumloops/snare.wav";

async function fetchFinalKnock() {
  console.log("⏳ Đang tải file tiếng gõ cửa gỗ thật từ GitHub Audio Assets...");
  let res = await fetch(GITHUB_DOOR_KNOCK);
  if (!res.ok) res = await fetch(GITHUB_SFX_KNOCK);

  // Dùng link SoundJay chính xác
  const directLink = "https://www.soundjay.com/door/sounds/door-knock-1.mp3";
  try {
    const sjRes = await fetch(directLink, { headers: { "User-Agent": "Mozilla/5.0" } });
    if (sjRes.ok) res = sjRes;
  } catch {}

  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const arrayBuffer = await res.arrayBuffer();
  await fs.writeFile(targetPath, Buffer.from(arrayBuffer));
  console.log(`✅ Thành công! File tiếng gõ cửa gỗ đã được lưu (${(arrayBuffer.byteLength / 1024).toFixed(1)} KB)`);
}

fetchFinalKnock();
