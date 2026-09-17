// Elements
const textInput = document.getElementById("textInput");
const charCount = document.getElementById("charCount");
const voiceSelect = document.getElementById("voiceSelect");
const voiceCountBadge = document.getElementById("voiceCountBadge");
const speedRange = document.getElementById("speedRange");
const speedValue = document.getElementById("speedValue");
const generateBtn = document.getElementById("generateBtn");
const serverBadge = document.getElementById("serverBadge");
const serverStatusText = document.getElementById("serverStatusText");
const statusTag = document.getElementById("statusTag");
const emptyState = document.getElementById("emptyState");
const activePlayer = document.getElementById("activePlayer");
const audioElement = document.getElementById("audioElement");
const downloadLink = document.getElementById("downloadLink");
const replayBtn = document.getElementById("replayBtn");
const currentVoiceTag = document.getElementById("currentVoiceTag");
const currentSpeedTag = document.getElementById("currentSpeedTag");
const tunnelEndpointDisplay = document.getElementById("tunnelEndpointDisplay");
const historyList = document.getElementById("historyList");
const sampleBtns = document.querySelectorAll(".sample-btn");

let currentAudioBlobUrl = null;
let historyItems = [];

// Khởi chạy ứng dụng
async function init() {
  updateCharCount();
  setupEventListeners();
  await checkServerStatus();
}

// Cập nhật số ký tự
function updateCharCount() {
  const len = textInput.value.trim().length;
  charCount.textContent = `${len} character${len !== 1 ? 's' : ''}`;
}

// Kiểm tra kết nối Backend & Colab
async function checkServerStatus() {
  try {
    // 1. Lấy thông tin cấu hình từ local Node server
    const cfgRes = await fetch("/api/config");
    const cfgData = await cfgRes.json();
    
    tunnelEndpointDisplay.textContent = `${cfgData.apiUrl}`;

    // 2. Thử lấy danh sách Speakers từ Backend (sẽ gọi sang Colab)
    const spkRes = await fetch("/api/speakers");
    if (!spkRes.ok) {
      const errData = await spkRes.json();
      throw new Error(errData.details || "Cannot connect to Colab API");
    }

    const speakers = await spkRes.json();
    
    // Cập nhật giao diện khi kết nối thành công
    serverBadge.querySelector(".status-dot").className = "status-dot online";
    serverStatusText.textContent = "AI Online (Colab)";
    statusTag.textContent = "Connected";
    statusTag.style.color = "#10b981";

    if (Array.isArray(speakers) && speakers.length > 0) {
      voiceCountBadge.textContent = `${speakers.length} voices`;
      voiceSelect.innerHTML = "";
      speakers.forEach(spk => {
        const opt = document.createElement("option");
        opt.value = spk.id;
        opt.textContent = `${spk.name} [${spk.id}]`;
        if (spk.id === "af_heart") opt.selected = true;
        voiceSelect.appendChild(opt);
      });
    }
  } catch (error) {
    console.warn("Connection check failed:", error);
    serverBadge.querySelector(".status-dot").className = "status-dot error";
    serverStatusText.textContent = "Colab Offline / Check config.js";
    statusTag.textContent = "Waiting for Colab";
    statusTag.style.color = "#f59e0b";
    voiceCountBadge.textContent = "Default voices";
  }
}

// Xử lý tạo audio
async function handleGenerateTTS() {
  const text = textInput.value.trim();
  if (!text) {
    alert("Please enter English text to synthesize!");
    textInput.focus();
    return;
  }

  const voice = voiceSelect.value;
  const speed = parseFloat(speedRange.value);

  // Giao diện khi đang tải
  generateBtn.disabled = true;
  generateBtn.querySelector(".btn-label").textContent = "Synthesizing...";
  statusTag.textContent = "Generating AI Speech...";
  statusTag.style.color = "#a5b4fc";
  
  emptyState.classList.remove("hidden");
  emptyState.querySelector(".wave-placeholder").classList.add("animating");
  emptyState.querySelector("p").textContent = "Synthesizing natural speech on Colab GPU...";
  activePlayer.classList.add("hidden");

  try {
    const response = await fetch("/api/tts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, voice, speed })
    });

    if (!response.ok) {
      const errData = await response.json();
      throw new Error(errData.details || errData.error || `HTTP ${response.status}`);
    }

    const audioBlob = await response.blob();
    
    // Thu hồi URL cũ để tránh leak bộ nhớ
    if (currentAudioBlobUrl) {
      URL.revokeObjectURL(currentAudioBlobUrl);
    }

    currentAudioBlobUrl = URL.createObjectURL(audioBlob);
    
    // Gắn vào audio player
    audioElement.src = currentAudioBlobUrl;
    downloadLink.href = currentAudioBlobUrl;
    downloadLink.download = `kokoro_${voice}_${Date.now()}.wav`;

    currentVoiceTag.textContent = voice;
    currentSpeedTag.textContent = `${speed}x`;

    // Hiển thị player
    emptyState.classList.add("hidden");
    activePlayer.classList.remove("hidden");
    statusTag.textContent = "Ready";
    statusTag.style.color = "#10b981";

    audioElement.play().catch(e => console.log("Autoplay was blocked:", e));

    // Lưu vào lịch sử
    addHistoryItem(text, voice, speed, currentAudioBlobUrl);

  } catch (error) {
    console.error("TTS Synthesis Error:", error);
    alert(`Generation Error: ${error.message}\n\nPlease verify that your Google Colab notebook is actively running and the URL in config.js is correct.`);
    statusTag.textContent = "Error";
    statusTag.style.color = "#ef4444";
    emptyState.querySelector(".wave-placeholder").classList.remove("animating");
    emptyState.querySelector("p").textContent = "Error occurred during generation.";
  } finally {
    generateBtn.disabled = false;
    generateBtn.querySelector(".btn-label").textContent = "Synthesize Speech";
  }
}

function addHistoryItem(text, voice, speed, blobUrl) {
  historyItems.unshift({ text, voice, speed, blobUrl, time: new Date().toLocaleTimeString() });
  if (historyItems.length > 5) historyItems.pop();

  historyList.innerHTML = "";
  historyItems.forEach(item => {
    const div = document.createElement("div");
    div.className = "history-item";
    div.innerHTML = `
      <div class="history-text" title="${item.text}">"${item.text}"</div>
      <div style="display:flex; gap:6px; align-items:center;">
        <span style="font-size:0.7rem; color:var(--text-dim);">${item.voice} • ${item.speed}x</span>
        <button class="btn-ghost" style="padding:2px 8px; font-size:0.7rem;" onclick="playBlob('${item.blobUrl}')">Play</button>
      </div>
    `;
    historyList.appendChild(div);
  });
}

window.playBlob = function(url) {
  audioElement.src = url;
  audioElement.play();
};

function setupEventListeners() {
  textInput.addEventListener("input", updateCharCount);
  
  speedRange.addEventListener("input", (e) => {
    speedValue.textContent = `${parseFloat(e.target.value).toFixed(2)}x`;
  });

  generateBtn.addEventListener("click", handleGenerateTTS);

  replayBtn.addEventListener("click", () => {
    if (audioElement.src) {
      audioElement.currentTime = 0;
      audioElement.play();
    }
  });

  sampleBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      textInput.value = btn.getAttribute("data-text");
      updateCharCount();
    });
  });
}

init();
