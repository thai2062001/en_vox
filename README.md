# 🎙️ EN_VOX - English AI Text-To-Speech Studio (Kokoro-82M)

Dự án Text-To-Speech (TTS) tiếng Anh cao cấp sử dụng AI **Kokoro-82M** chạy trên Google Colab GPU và Client Node.js ES Module có giao diện Web Studio hiện đại.

---

## 🚀 Hướng Dẫn Sử Dụng Nhanh

### Bước 1: Khởi chạy AI Server trên Google Colab
1. Mở [Google Colab](https://colab.research.google.com/).
2. Chọn **File -> Upload Notebook** và tải file `kokoro_colab_server.ipynb` trong thư mục này lên.
3. Chuyển Runtime sang **GPU T4** (*Runtime -> Change runtime type -> T4 GPU*).
4. Chạy toàn bộ Notebook.
5. Khi cell cuối chạy xong, copy đường link tunnel HTTPS được in ra:
   ```text
   👉 https://xxxx-xxxx-xxxx.trycloudflare.com 👈
   ```

---

### Bước 2: Cấu hình Client Node.js
Mở file `config.js` và dán URL nhận được ở Bước 1 vào:
```javascript
export const KOKORO_API_URL = "https://xxxx-xxxx-xxxx.trycloudflare.com";
```

---

### Bước 3: Cài đặt & Khởi chạy Web Studio
Mở terminal trong thư mục `en_vox`:
```bash
# Cài đặt thư viện Express & CORS
npm install

# Khởi chạy Web Server
npm run dev
# hoặc
npm start
```
Mở trình duyệt truy cập: **`http://localhost:3000`**

---

### 💻 Chạy thử nghiệm bằng dòng lệnh (CLI):
```bash
# Render audio từ terminal và lưu thành output.wav
npm run cli "Hello world, this is English Vox with Kokoro AI!"
```

---

## 📂 Danh sách các giọng đọc tích hợp sẵn:
- **`af_heart`**: Giọng nữ Mỹ cực kỳ tự nhiên, truyền cảm (Mặc định).
- **`af_bella`**, **`af_sarah`**, **`af_nicole`**, **`af_sky`**: Giọng nữ Mỹ.
- **`am_adam`**, **`am_michael`**, **`am_eric`**, **`am_liam`**: Giọng nam Mỹ.
- **`bf_emma`**, **`bf_isabella`**: Giọng nữ Anh (UK British).
- **`bm_george`**, **`bm_lewis`**: Giọng nam Anh (UK British).
