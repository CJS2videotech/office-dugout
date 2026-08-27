const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf-8');
const match = html.match(/function fmtDate\(str\)\s*\{[\s\S]*?\n\}/);
if (!match) {
  throw new Error("Could not find fmtDate in index.html");
}

eval(match[0]);

test('fmtDate formats a standard date string correctly', () => {
  assert.strictEqual(fmtDate('2023-10-05'), '10/5');
});

test('fmtDate formats single digit month and day correctly', () => {
  assert.strictEqual(fmtDate('2024-01-09'), '1/9');
});

test('fmtDate formats end of year correctly', () => {
  assert.strictEqual(fmtDate('2024-12-31'), '12/31');
});
