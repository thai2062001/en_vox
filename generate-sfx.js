import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SFX_DIR = path.join(__dirname, "output", "no-internet", "sfx");

/**
 * Tạo file WAV chuẩn từ mảng mẫu âm thanh (Float32Array từ -1.0 đến 1.0)
 */
function createWavBuffer(samples, sampleRate = 24000) {
  const numChannels = 1;
  const bytesPerSample = 2; // 16-bit PCM
  const blockAlign = numChannels * bytesPerSample;
  const byteRate = sampleRate * blockAlign;
  const dataSize = samples.length * bytesPerSample;
  const buffer = Buffer.alloc(44 + dataSize);

  // RIFF Header
  buffer.write("RIFF", 0);
  buffer.writeUInt32LE(36 + dataSize, 4);
  buffer.write("WAVE", 8);

  // fmt Subchunk
  buffer.write("fmt ", 12);
  buffer.writeUInt32LE(16, 16); // Subchunk1Size
  buffer.writeUInt16LE(1, 20);  // AudioFormat (PCM)
  buffer.writeUInt16LE(numChannels, 22);
  buffer.writeUInt32LE(sampleRate, 24);
  buffer.writeUInt32LE(byteRate, 28);
  buffer.writeUInt16LE(blockAlign, 32);
  buffer.writeUInt16LE(16, 34); // BitsPerSample

  // data Subchunk
  buffer.write("data", 36);
  buffer.writeUInt32LE(dataSize, 40);

  let offset = 44;
  for (let i = 0; i < samples.length; i++) {
    // Clamp sample trong khoảng [-1.0, 1.0]
    const s = Math.max(-1, Math.min(1, samples[i]));
    const intSample = s < 0 ? s * 0x8000 : s * 0x7FFF;
    buffer.writeInt16LE(Math.floor(intSample), offset);
    offset += 2;
  }

  return buffer;
}

// 1. SFX: Chuông báo thức dồn dập buổi sáng (Alarm Beep Beep)
function generateAlarmClock(sampleRate = 24000) {
  const duration = 2.5; // 2.5s
  const totalSamples = Math.floor(sampleRate * duration);
  const samples = new Float32Array(totalSamples);
  const freq = 880; // La (A5)
  const beepLen = Math.floor(sampleRate * 0.08);
  const gapLen = Math.floor(sampleRate * 0.06);

  for (let i = 0; i < totalSamples; i++) {
    const cyclePos = i % (beepLen + gapLen);
    if (cyclePos < beepLen) {
      const env = Math.sin((cyclePos / beepLen) * Math.PI);
      samples[i] = 0.6 * env * Math.sin((2 * Math.PI * freq * i) / sampleRate);
    } else {
      samples[i] = 0;
    }
  }
  return samples;
}

// 2. SFX: Âm báo lỗi điện thoại / Mất mạng (Error Chime - 2 nốt trầm buồn)
function generateErrorChime(sampleRate = 24000) {
  const duration = 1.0;
  const totalSamples = Math.floor(sampleRate * duration);
  const samples = new Float32Array(totalSamples);
  
  for (let i = 0; i < totalSamples; i++) {
    const t = i / sampleRate;
    if (t < 0.25) {
      const env = Math.exp(-t * 12);
      samples[i] = 0.5 * env * Math.sin(2 * Math.PI * 330 * t); // Nốt E4
    } else if (t < 0.7) {
      const t2 = t - 0.25;
      const env = Math.exp(-t2 * 10);
      samples[i] = 0.6 * env * Math.sin(2 * Math.PI * 220 * t2); // Nốt A3 (hạ trầm báo lỗi)
    }
  }
  return samples;
}

// 3. SFX: Tiếng gõ cửa gỗ cộc cộc (Door Knock - 3 tiếng gõ đanh)
function generateKnockWood(sampleRate = 24000) {
  const duration = 1.5;
  const totalSamples = Math.floor(sampleRate * duration);
  const samples = new Float32Array(totalSamples);
  const knockTimes = [0.1, 0.45, 0.8]; // 3 nhịp gõ

  for (const kt of knockTimes) {
    const startIdx = Math.floor(kt * sampleRate);
    const knockLen = Math.floor(0.12 * sampleRate);
    for (let j = 0; j < knockLen; j++) {
      const idx = startIdx + j;
      if (idx < totalSamples) {
        const t = j / sampleRate;
        const env = Math.exp(-t * 45);
        // Trộn tiếng gõ gỗ trầm 120Hz và cộng hưởng 280Hz + noise gỗ
        const osc = 0.7 * Math.sin(2 * Math.PI * 140 * t) + 0.3 * Math.sin(2 * Math.PI * 290 * t);
        const noise = (Math.random() * 2 - 1) * 0.15;
        samples[idx] += 0.8 * env * (osc + noise);
      }
    }
  }
  return samples;
}

// 4. SFX: Tiếng quẹt thẻ & Từ chối thanh toán (Card Buzz Error)
function generateCardDecline(sampleRate = 24000) {
  const duration = 1.2;
  const totalSamples = Math.floor(sampleRate * duration);
  const samples = new Float32Array(totalSamples);

  // Tiếng bíp quẹt thẻ (0.0s - 0.2s)
  for (let i = 0; i < Math.floor(0.2 * sampleRate); i++) {
    const t = i / sampleRate;
    const env = Math.exp(-t * 15);
    samples[i] = 0.4 * env * Math.sin(2 * Math.PI * 1800 * t);
  }

  // Tiếng BUZZ lỗi gay gắt (0.4s - 0.9s)
  const buzzStart = Math.floor(0.4 * sampleRate);
  const buzzLen = Math.floor(0.5 * sampleRate);
  for (let j = 0; j < buzzLen; j++) {
    const idx = buzzStart + j;
    if (idx < totalSamples) {
      const t = j / sampleRate;
      const env = Math.exp(-t * 4);
      // Sóng vuông 150Hz tạo tiếng rè báo lỗi gay gắt
      const square = Math.sin(2 * Math.PI * 150 * t) >= 0 ? 0.6 : -0.6;
      samples[idx] = env * square;
    }
  }
  return samples;
}

// 5. SFX: Tiếng kim đĩa than vinyl lách tách (Vinyl Crackle / Needle Drop)
function generateVinylCrackle(sampleRate = 24000) {
  const duration = 3.0;
  const totalSamples = Math.floor(sampleRate * duration);
  const samples = new Float32Array(totalSamples);

  for (let i = 0; i < totalSamples; i++) {
    // Noise nền ấm
    let val = (Math.random() * 2 - 1) * 0.02;
    // Thỉnh thoảng xuất hiện tiếng nổ lách tách (crackle pop)
    if (Math.random() < 0.003) {
      val += (Math.random() > 0.5 ? 1 : -1) * (0.15 + Math.random() * 0.25);
    }
    samples[i] = val;
  }
  return samples;
}

// 6. SFX: Tiếng ghế bập bênh gỗ cót két (Chair Creak)
function generateChairCreak(sampleRate = 24000) {
  const duration = 2.5;
  const totalSamples = Math.floor(sampleRate * duration);
  const samples = new Float32Array(totalSamples);
  const creakTimes = [0.2, 1.4];

  for (const ct of creakTimes) {
    const startIdx = Math.floor(ct * sampleRate);
    const creakLen = Math.floor(0.6 * sampleRate);
    for (let j = 0; j < creakLen; j++) {
      const idx = startIdx + j;
      if (idx < totalSamples) {
        const t = j / sampleRate;
        const env = Math.sin((j / creakLen) * Math.PI);
        const freqMod = 320 + Math.sin(2 * Math.PI * 8 * t) * 120;
        samples[idx] += 0.35 * env * Math.sin(2 * Math.PI * freqMod * t);
      }
    }
  }
  return samples;
}

// 7. SFX: Tiếng chuông DING DING! nổ vang (Climax Notification Chime)
function generateDingDingChime(sampleRate = 24000) {
  const duration = 2.0;
  const totalSamples = Math.floor(sampleRate * duration);
  const samples = new Float32Array(totalSamples);
  const dingTimes = [0.05, 0.45, 0.85]; // 3 tiếng DING liên tiếp

  for (const dt of dingTimes) {
    const startIdx = Math.floor(dt * sampleRate);
    const dingLen = Math.floor(0.8 * sampleRate);
    for (let j = 0; j < dingLen; j++) {
      const idx = startIdx + j;
      if (idx < totalSamples) {
        const t = j / sampleRate;
        const env = Math.exp(-t * 6);
        // Nốt Si cao 1975Hz và 3950Hz ngân vang sáng chói
        const chime = 0.6 * Math.sin(2 * Math.PI * 1975 * t) + 0.3 * Math.sin(2 * Math.PI * 3950 * t);
        samples[idx] += env * chime;
      }
    }
  }
  return samples;
}

// 8. SFX: Tiếng điện thoại rung trên sàn gỗ (Phone Vibrate Bzzz Bzzz)
function generatePhoneVibrate(sampleRate = 24000) {
  const duration = 2.0;
  const totalSamples = Math.floor(sampleRate * duration);
  const samples = new Float32Array(totalSamples);
  const vibTimes = [0.1, 0.8, 1.5];

  for (const vt of vibTimes) {
    const startIdx = Math.floor(vt * sampleRate);
    const vibLen = Math.floor(0.45 * sampleRate);
    for (let j = 0; j < vibLen; j++) {
      const idx = startIdx + j;
      if (idx < totalSamples) {
        const t = j / sampleRate;
        const env = Math.sin((j / vibLen) * Math.PI);
        // Motor rung 70Hz + âm sàn gỗ 140Hz
        const vib = Math.sin(2 * Math.PI * 70 * t) * 0.7 + (Math.random() * 2 - 1) * 0.15;
        samples[idx] += 0.6 * env * vib;
      }
    }
  }
  return samples;
}

// 9. SFX: Bão thông báo ting ting dồn dập (Notification Storm Avalanche)
function generateNotificationStorm(sampleRate = 24000) {
  const duration = 3.0;
  const totalSamples = Math.floor(sampleRate * duration);
  const samples = new Float32Array(totalSamples);
  
  // Hàng chục tiếng ting ting nổ liên tiếp ngẫu nhiên dồn dập
  for (let n = 0; n < 28; n++) {
    const startTime = 0.05 + (n * 0.09) + (Math.random() * 0.04);
    const startIdx = Math.floor(startTime * sampleRate);
    const dingLen = Math.floor(0.25 * sampleRate);
    const freq = 1600 + Math.random() * 800; // Tần số thay đổi liên tục

    for (let j = 0; j < dingLen; j++) {
      const idx = startIdx + j;
      if (idx < totalSamples) {
        const t = j / sampleRate;
        const env = Math.exp(-t * 16);
        samples[idx] += 0.25 * env * Math.sin(2 * Math.PI * freq * t);
      }
    }
  }
  return samples;
}

async function buildAllSFX() {
  console.log("================================================================");
  console.log("🔊 SOUND DESIGN ENGINE - GENERATING CUSTOM SFX PACK");
  console.log("================================================================");

  await fs.mkdir(SFX_DIR, { recursive: true });

  const sfxList = [
    { name: "01_alarm_clock.wav", gen: generateAlarmClock, desc: "Chuông báo thức dồn dập buổi sáng (Câu 1)" },
    { name: "02_error_chime.wav", gen: generateErrorChime, desc: "Âm báo mất mạng / No Service (Câu 4-5)" },
    { name: "03_knock_wood.wav", gen: generateKnockWood, desc: "Tiếng gõ cửa gỗ cộc cộc (Câu 17-18)" },
    { name: "04_card_decline_buzz.wav", gen: generateCardDecline, desc: "Tiếng quẹt Apple Pay lỗi & Buzz từ chối (Câu 21-23)" },
    { name: "05_vinyl_crackle.wav", gen: generateVinylCrackle, desc: "Tiếng nổ đĩa than lách tách ấm áp (Câu 60-63)" },
    { name: "06_chair_creak.wav", gen: generateChairCreak, desc: "Tiếng ghế bập bênh cót két hoàng hôn (Câu 87)" },
    { name: "07_phone_ding_ding.wav", gen: generateDingDingChime, desc: "Tiếng chuông DING DING! nổ vang kịch tính (Câu 89)" },
    { name: "08_phone_vibrate.wav", gen: generatePhoneVibrate, desc: "Tiếng điện thoại rung bần bật trên sàn gỗ (Câu 90)" },
    { name: "09_notification_storm.wav", gen: generateNotificationStorm, desc: "Bão thông báo 9,999+ dồn dập (Câu 91-93)" }
  ];

  for (const sfx of sfxList) {
    const rawSamples = sfx.gen();
    const wavBuffer = createWavBuffer(rawSamples, 24000);
    const outPath = path.join(SFX_DIR, sfx.name);
    await fs.writeFile(outPath, wavBuffer);
    console.log(`✅ [${sfx.name}] - ${sfx.desc} (${(wavBuffer.length / 1024).toFixed(1)} KB)`);
  }

  console.log("\n================================================================");
  console.log(`🎉 ĐÃ XUẤT ĐẦY ĐỦ ${sfxList.length} FILE HIỆU ỨNG ÂM THANH (SFX)!`);
  console.log(`📁 Thư mục lưu SFX: ${SFX_DIR}`);
  console.log("================================================================\n");
}

buildAllSFX();
