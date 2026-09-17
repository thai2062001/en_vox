import fs from 'fs';
import { PRODUCTION_PLAN } from './produce-white-lies-audio.js';

const rawScript = fs.readFileSync('output/script_no_white_lies_us/script_no_white_lies_us_en.md', 'utf8');
const rawLines = rawScript.split('\n').map(l => l.trim()).filter(l => l.length > 0);

console.log('So sánh giữa kịch bản gốc và PRODUCTION_PLAN:');

const mismatches = [];

for (let i = 0; i < rawLines.length; i++) {
  const lineNum = i + 1;
  const rawText = rawLines[i];
  const plan = PRODUCTION_PLAN.find(p => p.lineNum === lineNum);

  if (!plan) {
    mismatches.push({ lineNum, issue: 'Thiếu trong PRODUCTION_PLAN', rawText });
    continue;
  }

  // Ghép các segments lại
  const planText = plan.segments.map(s => s.text).join(' ');
  const voices = plan.segments.map(s => s.voice);

  // Kiểm tra nếu câu gốc có thoại mà plan chỉ có 1 voice am_adam
  const hasQuotes = rawText.includes('"');
  
  mismatches.push({
    lineNum,
    rawText,
    planSegmentsCount: plan.segments.length,
    voices,
    hasQuotes,
    planText
  });
}

fs.writeFileSync('output/script_no_white_lies_us/full_audit_comparison.json', JSON.stringify(mismatches, null, 2));
console.log('Đã xuất full_audit_comparison.json với 110 câu đối chiếu.');
