# Production Rules & Lessons Learned (TTS Storytelling Pipeline)

Tập hợp các quy tắc chuẩn hóa và kinh nghiệm thực chiến đúc kết từ các dự án trước để đảm bảo chất lượng lồng tiếng AI (Kokoro TTS / Storytelling) đạt mức tự nhiên, chuyên nghiệp và không có lỗi ngớ ngẩn.

---

## 1. Quy tắc Tách Lời Dẫn và Lời Thoại (Strict Dialogue & Narration Separation)
* **Quy tắc vàng:** Không bao giờ để một giọng đọc toàn bộ câu nếu câu đó chứa cả phần dẫn chuyện (Narrator) và câu thoại nhân vật (trong dấu ngoặc kép `"`).
* **Cơ chế xử lý:**
  * **Phần ngoài ngoặc kép:** Luôn dùng giọng dẫn chuyện mặc định (`am_adam`).
  * **Phần trong ngoặc kép:** Dùng đúng giọng nhân vật được phân vai (`af_heart`, `af_bella`, `am_eric`, `af_sarah`,...).
  * **Nối file con:** Tạo các đoạn audio nhỏ theo từng phần rồi ghép nối tự động (concatenation) với khoảng nghỉ siêu ngắn (100ms - 150ms) để xuất ra file `line_xxx.wav` duy nhất cho timeline dựng video.

---

## 2. Quy tắc Chuẩn Hóa Phiên Âm TTS (Phonetic & Text Sanitization)
AI TTS đọc văn bản nguyên mẫu (raw text) rất dễ mắc lỗi phát âm số, ký hiệu và chữ viết tắt. Bắt buộc phải tiền xử lý văn bản (sanitization) trước khi gửi tới API:

### A. Thời gian & Giờ giấc (Time Formats)
* ❌ Tránh để nguyên: `7:00 AM`, `8:30 PM`, `11:59:58 PM` *(AI sẽ đọc thành "seven colon zero zero" hoặc đọc lỗi số giây)*
* ✅ Viết chữ đầy đủ: `seven AM`, `eight thirty PM`, `eleven fifty-nine fifty-eight PM`.

### B. Tiền tệ & Tỷ lệ / Con số (Currency & Numbers)
* ❌ Tránh: `$4.17`, `$80`, `$15,000`, `94%`, `3:1`, `1998`
* ✅ Viết chữ đầy đủ: 
  * `$4.17` $\rightarrow$ `four dollars and seventeen cents`
  * `$80` $\rightarrow$ `eighty dollars`
  * `$15,000` $\rightarrow$ `fifteen thousand dollars`
  * `94%` $\rightarrow$ `ninety-four percent`
  * `3:1` $\rightarrow$ `three to one`
  * Năm `1998` $\rightarrow$ `nineteen ninety-eight` *(tránh AI đọc "nineteen-hundred ninety-eight" hoặc "one thousand nine hundred")*.

### C. Từ viết tắt & Thương hiệu (Abbreviations & Brands)
* ❌ Tránh: `VP`, `HR`, `Q3`, `TJ Maxx`
* ✅ Viết rõ: `Vice President` (hoặc `V-P`), `H-R`, `Q-three`, `T-J Maxx`.

### D. Đồng âm & Từ ngữ cảnh đặc thù (Contextual Pronunciation)
* Trường hợp từ `Read` (Mạng xã hội / Tin nhắn "Left on Read"):
  * ❌ Không để đọc thành `/riːd/` (dạng nguyên thể).
  * ✅ Cần phiên âm hoặc đảm bảo đọc thành `/red/` (quá khứ phân từ / giống màu red).

---

## 3. Quy tắc Điều Chỉnh Tốc Độ & Nhịp Cảm Xúc (Pacing & Emotional Dynamics)
Không dùng một tốc độ (`speed: 1.0`) cho toàn bộ 100+ câu. Cần tinh chỉnh theo nhịp kịch bản:
* **Mở đầu / Giới thiệu / Thiết lập bối cảnh:** `speed: 1.0` (Vừa phải, rõ ràng, truyền cảm).
* **Cao trào / Áp lực công sở / Xung đột / Hỗn loạn:** `speed: 1.02 - 1.05` (Gấp gáp, nhịp điệu dồn dập).
* **Kết thúc / Suy ngẫm / Bài học triết lý:** `speed: 0.95 - 0.98` (Trầm lắng, sâu sắc, có độ vang và lắng đọng).

---

## 4. Quy tắc Ghép Master & Khoảng Lặng (Master Stitching & Silence Padding)
* **Giữa các câu thông thường:** Chèn khoảng lặng đệm `300ms`.
* **Giữa các đoạn chuyển cảnh lớn (Time Jumps / Scene Breaks):** Chèn khoảng lặng `700ms - 900ms` để tai người nghe kịp cảm nhận sự thay đổi không gian/thời gian.
* **File xuất khẩu:**
  * Giữ nguyên từng file riêng lẻ (`line_001.wav`, `line_002.wav`,...) trong thư mục `raw_voice/` phục vụ import CapCut/Premiere.
  * Xuất thêm 1 file tổng `master_audio_full.wav` hoàn chỉnh kèm metadata WPM và độ dài từng câu.
