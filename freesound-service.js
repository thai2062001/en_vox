import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { FREESOUND_API_KEY } from "./config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = "https://freesound.org/apiv2";

/**
 * Tìm kiếm âm thanh trên Freesound theo từ khóa
 * @param {string} query - Từ khóa tìm kiếm (e.g. "door knock", "vinyl crackle")
 * @param {number} pageSize - Số lượng kết quả trả về
 */
export async function searchSounds(query, pageSize = 5) {
  if (!FREESOUND_API_KEY || FREESOUND_API_KEY === "YOUR_FREESOUND_API_KEY_HERE") {
    throw new Error("Vui lòng nhập FREESOUND_API_KEY vào file config.js trước khi sử dụng!");
  }

  const endpoint = `${BASE_URL}/search/text/?query=${encodeURIComponent(query)}&token=${FREESOUND_API_KEY}&fields=id,name,description,previews,duration,license,username&page_size=${pageSize}`;
  
  const res = await fetch(endpoint);
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Lỗi Freesound API (${res.status}): ${errText}`);
  }

  const data = await res.json();
  return data.results;
}

/**
 * Tải file âm thanh preview chất lượng cao trực tiếp về máy
 * @param {string} previewUrl - Link preview-hq-mp3 hoặc preview-hq-ogg từ Freesound
 * @param {string} outputPath - Đường dẫn file lưu trên máy
 */
export async function downloadSound(previewUrl, outputPath) {
  const res = await fetch(previewUrl, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
    }
  });

  if (!res.ok) {
    throw new Error(`Không thể tải file âm thanh từ Freesound (HTTP ${res.status})`);
  }

  const arrayBuffer = await res.arrayBuffer();
  const dir = path.dirname(outputPath);
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(outputPath, Buffer.from(arrayBuffer));
  return outputPath;
}

/**
 * Tự động tìm kiếm kết quả tốt nhất và tải trực tiếp về file
 * @param {string} query - Từ khóa tìm kiếm (e.g. "foley door knock")
 * @param {string} targetFilePath - Đường dẫn lưu file
 */
export async function fetchBestSound(query, targetFilePath) {
  const results = await searchSounds(query, 3);
  if (!results || results.length === 0) {
    throw new Error(`Không tìm thấy âm thanh nào cho từ khóa: "${query}"`);
  }

  // Chọn âm thanh đầu tiên có preview chất lượng cao
  const bestMatch = results[0];
  const previewUrl = bestMatch.previews["preview-hq-mp3"] || bestMatch.previews["preview-lq-mp3"];
  
  if (!previewUrl) {
    throw new Error(`Âm thanh "${bestMatch.name}" không có link preview khả dụng`);
  }

  await downloadSound(previewUrl, targetFilePath);
  return {
    id: bestMatch.id,
    name: bestMatch.name,
    author: bestMatch.username,
    duration: bestMatch.duration,
    filePath: targetFilePath
  };
}
