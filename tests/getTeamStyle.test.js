const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');

// Read index.html
const html = fs.readFileSync('index.html', 'utf-8');

// Robust function extraction using brace counting
function extractFunction(source, funcName) {
  const startIdx = source.indexOf(`function ${funcName}`);
  if (startIdx === -1) return null;

  let braceCount = 0;
  let inFunction = false;
  let endIdx = -1;

  for (let i = startIdx; i < source.length; i++) {
    if (source[i] === '{') {
      braceCount++;
      inFunction = true;
    } else if (source[i] === '}') {
      braceCount--;
    }

    if (inFunction && braceCount === 0) {
      endIdx = i;
      break;
    }
  }

  return endIdx !== -1 ? source.substring(startIdx, endIdx + 1) : null;
}

const getTeamStyleStr = extractFunction(html, 'getTeamStyle');
if (!getTeamStyleStr) {
  throw new Error("Could not find getTeamStyle function in index.html");
}

// Mock USERS global variable
global.USERS = [
  { id: 'andrea', teamId: 158, secondary: 'var(--u-andrea-2)' },
  { id: 'dominic', teamId: 147, secondary: 'var(--u-dominic-2)', glow: 'text-shadow: 0 0 10px rgba(255,255,255,0.7);' }
];

// Evaluate the function to put it in the local scope
const getTeamStyle = eval(`(${getTeamStyleStr})`);


test('getTeamStyle tests', async (t) => {

  await t.test('Match without glow', () => {
    const result = getTeamStyle(158);
    assert.strictEqual(result, 'color:var(--u-andrea-2);');
  });

  await t.test('Match with glow', () => {
    const result = getTeamStyle(147);
    assert.strictEqual(result, 'color:var(--u-dominic-2);text-shadow: 0 0 10px rgba(255,255,255,0.7);');
  });

  await t.test('No match, default color', () => {
    const result = getTeamStyle(999);
    assert.strictEqual(result, 'color:#fff;');
  });

  await t.test('No match, custom default color', () => {
    const result = getTeamStyle(999, '#000');
    assert.strictEqual(result, 'color:#000;');
  });

});
