const fs = require('fs');
const vm = require('vm');

const html = fs.readFileSync('./index.html', 'utf-8');

const scriptMatch = html.match(/<script type="module">([\s\S]*?)<\/script>/);
if (!scriptMatch) {
  console.error("Script tag not found");
  process.exit(1);
}

let scriptContent = scriptMatch[1];
// Strip all import statements so that the script can be evaluated in a VM context.
scriptContent = scriptContent.replace(/import\s+.*?from\s+['"].*?['"];?/g, '');

const sandbox = {
  window: {
    addEventListener: () => {},
    location: { hash: '' },
    apiCache: {},
  },
  document: {
    getElementById: () => ({
      innerHTML: '',
      style: {},
      addEventListener: () => {},
      classList: { add: () => {}, remove: () => {} }
    }),
    createElement: () => ({ style: {}, classList: { add: () => {} } }),
    querySelector: () => ({ addEventListener: () => {}, classList: { add: () => {} }, innerHTML: '', style: {} }),
    querySelectorAll: () => ([]),
  },
  localStorage: {
    getItem: () => null,
    setItem: () => {},
  },
  console: {
    log: () => {},
    error: () => {},
    warn: () => {}
  },
  setTimeout: () => {},
  setInterval: () => {},
  fetch: () => Promise.resolve({ json: () => Promise.resolve({}) }),
  alert: () => {},
  Date: Date,
  Math: Math,
  parseInt: parseInt,
  parseFloat: parseFloat,
  String: String,
};

try {
  vm.createContext(sandbox);
  vm.runInContext(scriptContent, sandbox);
} catch (e) {
  // Ignore evaluation errors caused by mock DOM limitations
}

const getTeamAbbr = sandbox.getTeamAbbr;

if (typeof getTeamAbbr !== 'function') {
  console.error("getTeamAbbr not found in sandbox!");
  process.exit(1);
}

let passed = 0;
let failed = 0;

function assertEqual(actual, expected, testName) {
  if (actual === expected) {
    passed++;
    console.log(`✅ ${testName}`);
  } else {
    failed++;
    console.error(`❌ ${testName}: Expected "${expected}", but got "${actual}"`);
  }
}

assertEqual(getTeamAbbr(null), '', 'Falsy team (null)');
assertEqual(getTeamAbbr(undefined), '', 'Falsy team (undefined)');
assertEqual(getTeamAbbr({ abbreviation: 'NYY' }), 'NYY', 'Team abbreviation present');
assertEqual(getTeamAbbr({ id: 109 }), 'AZ', 'MLB_TEAMS id match');
assertEqual(getTeamAbbr({ name: 'Los Angeles Dodgers' }), 'DOD', 'Fallback to parsed team name');
assertEqual(getTeamAbbr({ name: 'Chicago White Sox' }), 'SOX', 'Fallback to parsed 3 part name');
assertEqual(getTeamAbbr({}), 'TBD', 'Empty object returns TBD');
assertEqual(getTeamAbbr({ id: 9999 }), 'TBD', 'Unknown ID returns TBD');

console.log(`\nTests completed: ${passed} passed, ${failed} failed.`);
if (failed > 0) process.exit(1);
