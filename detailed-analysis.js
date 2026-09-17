import fs from 'fs';

const rawScript = fs.readFileSync('output/script_no_white_lies_us/script_no_white_lies_us_en.md', 'utf8');
const rawLines = rawScript.split('\n').map(l => l.trim()).filter(l => l.length > 0);

const castingMd = fs.readFileSync('output/script_no_white_lies_us/voice-casting-white-lies.md', 'utf8');

// Định nghĩa phân vai chính xác 1-1 cho từng câu thoại trong 110 câu
// Narrator: am_adam (mặc định cho lời dẫn)
// Nhân vật:
// - Mẹ Susan: af_heart (hoặc af_bella)
// - Bố: am_adam (giọng hoảng hốt)
// - Con trai: am_adam (nhân vật chính)
// - Bà Higgins: af_bella
// - Barista Starbucks: am_michael
// - Sếp VP: am_eric
// - Giám đốc HR Karen: af_sarah
// - MC Nam Thời sự: am_eric
// - Nữ MC Thời sự: af_nicole
// - Skincare Influencer: af_heart
// - Bác sĩ Nha Khoa: am_eric
// - Thợ Cắt Tóc: am_adam
// - Chàng trai Hinge date: am_adam
// - Cô gái Hinge date: af_bella
// - Bạn gái nhận vòng cổ TJ Maxx: af_heart
// - Chàng trai tặng vòng cổ: am_michael
// - Người vợ hỏi váy: af_heart
// - Người chồng chê váy bục chỉ: am_michael
// - Sếp gửi tin nhắn Slack: am_eric

const detailedVerification = [];

rawLines.forEach((line, index) => {
  const lineNum = index + 1;
  const quotes = [];
  const regex = /"([^"]*)"/g;
  let match;
  while ((match = regex.exec(line)) !== null) {
    quotes.push(match[1]);
  }

  detailedVerification.push({
    lineNum,
    fullLine: line,
    quotesCount: quotes.length,
    quotes
  });
});

fs.writeFileSync('output/script_no_white_lies_us/line_quotes_detailed.json', JSON.stringify(detailedVerification, null, 2));
console.log('Phân tích chi tiết 110 dòng xong.');
