import fs from 'fs';

const content = fs.readFileSync('output/script_no_white_lies_us/script_no_white_lies_us_en.md', 'utf8');
const rawLines = content.split('\n').map(l => l.trim()).filter(l => l.length > 0);

console.log('Total non-empty lines in original script:', rawLines.length);

const quoteLines = [];
rawLines.forEach((line, index) => {
  if (line.includes('"') || line.includes('”') || line.includes('“')) {
    quoteLines.push({ lineNum: index + 1, text: line });
  }
});

console.log('Total lines with dialogue/quotes:', quoteLines.length);
fs.writeFileSync('output/script_no_white_lies_us/quote_lines.json', JSON.stringify(quoteLines, null, 2));
console.log('Saved to output/script_no_white_lies_us/quote_lines.json');
