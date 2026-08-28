const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('index.html', 'utf-8');
const $ = cheerio.load(html);

// Extract the script tags
const scripts = $('script').map((i, el) => $(el).text()).get();

let usersStr = '';
let calcWinnerStr = '';

// Process script content
for (const scriptContent of scripts) {
    if (!scriptContent) continue;

    // Find USERS
    if (!usersStr) {
        const usersMatch = scriptContent.match(/const USERS = \[[\s\S]*?\];/);
        if (usersMatch) {
            usersStr = usersMatch[0].replace('const USERS = ', 'global.USERS = ');
        }
    }

    // Find calcWinnerFromGames
    if (!calcWinnerStr) {
        const calcWinnerMatch = scriptContent.match(/function calcWinnerFromGames\(games\) \{[\s\S]*?return scores\[0\]\.id;\n\}/);
        if (calcWinnerMatch) {
            calcWinnerStr = calcWinnerMatch[0];
        }
    }
}

if (!usersStr) throw new Error('USERS not found');
if (!calcWinnerStr) throw new Error('calcWinnerFromGames not found');

// Make USERS globally available for the function evaluation
eval(usersStr);

// Export it dynamically
const calcWinnerFromGames = new Function('games', calcWinnerStr + ' return calcWinnerFromGames(games);');

// Helper to create basic game objects
function createGame(awayId, awayRuns, awayHits, homeId, homeRuns, homeHits, status = 'Final') {
  return {
    teams: {
      away: { team: { id: awayId }, score: awayRuns },
      home: { team: { id: homeId }, score: homeRuns }
    },
    linescore: {
      teams: {
        away: { hits: awayHits },
        home: { hits: homeHits }
      }
    },
    status: { abstractGameState: status }
  };
}

test('calcWinnerFromGames', async (t) => {
  await t.test('returns null for empty games array', () => {
    assert.strictEqual(calcWinnerFromGames([]), null);
  });

  await t.test('returns null when no games are final', () => {
    const games = [
      createGame(112, 5, 10, 158, 3, 8, 'In Progress')
    ];
    assert.strictEqual(calcWinnerFromGames(games), null);
  });

  await t.test('ignores games involving non-user teams', () => {
    const games = [
      createGame(999, 10, 15, 888, 2, 5, 'Final')
    ];
    assert.strictEqual(calcWinnerFromGames(games), null);
  });

  await t.test('determines winner by highest runs', () => {
    const games = [
      createGame(112, 5, 10, 158, 3, 8, 'Final'), // CJ (112): 5 runs, Andrea (158): 3 runs
      createGame(147, 7, 5, 114, 2, 3, 'Final')  // Dominic (147): 7 runs, Mario (114): 2 runs
    ];
    // Winner should be Dominic (147) because 7 > 5 > 3 > 2
    assert.strictEqual(calcWinnerFromGames(games), 'dominic');
  });

  await t.test('resolves ties by highest hits', () => {
    const games = [
      createGame(112, 5, 10, 158, 5, 8, 'Final'), // CJ (112): 5 runs, 10 hits; Andrea (158): 5 runs, 8 hits
      createGame(147, 5, 12, 114, 2, 3, 'Final')  // Dominic (147): 5 runs, 12 hits
    ];
    // Tie for 5 runs between CJ, Andrea, Dominic. Dominic has 12 hits, CJ 10, Andrea 8. Winner should be Dominic.
    assert.strictEqual(calcWinnerFromGames(games), 'dominic');
  });

  await t.test('handles missing linescore or hits gracefully', () => {
    // Manually construct game without linescore
    const games = [
      {
        teams: {
          away: { team: { id: 112 }, score: 4 },
          home: { team: { id: 158 }, score: 4 }
        },
        status: { abstractGameState: 'Final' } // Missing linescore
      },
      createGame(147, 4, 1, 114, 2, 3, 'Final') // Dominic (147): 4 runs, 1 hit
    ];
    // Tie for 4 runs. CJ and Andrea have 0 hits (default). Dominic has 1 hit. Winner should be Dominic.
    assert.strictEqual(calcWinnerFromGames(games), 'dominic');
  });

  await t.test('ignores invalid or undefined score', () => {
      const games = [
      {
        teams: {
          away: { team: { id: 112 } }, // Missing score
          home: { team: { id: 158 }, score: 1 }
        },
        status: { abstractGameState: 'Final' }
      }
    ];
    // Andrea has 1 run. CJ has 0 runs (default). Winner is Andrea.
    assert.strictEqual(calcWinnerFromGames(games), 'andrea');
  });
});
