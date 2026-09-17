import fs from 'fs';

const rawScript = fs.readFileSync('output/script_no_white_lies_us/script_no_white_lies_us_en.md', 'utf8');
const rawLines = rawScript.split('\n').map(l => l.trim()).filter(l => l.length > 0);

console.log('Tổng số câu trong script_no_white_lies_us_en.md:', rawLines.length);

// Đọc danh sách phân vai
const castingMd = fs.readFileSync('output/script_no_white_lies_us/voice-casting-white-lies.md', 'utf8');

const auditResults = [];

rawLines.forEach((text, index) => {
  const lineNum = index + 1;
  const hasQuotes = text.includes('"') || text.includes('”') || text.includes('“');
  
  auditResults.push({
    lineNum,
    text,
    hasQuotes
  });
});

console.log('Đã nạp 110 dòng script gốc.');
fs.writeFileSync('output/script_no_white_lies_us/script_lines_indexed.json', JSON.stringify(auditResults, null, 2));
