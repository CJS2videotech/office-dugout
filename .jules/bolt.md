## 2024-05-23 - [Client-Side API Payload Caching]
**Learning:** The application aggressively polls the MLB Stats API every 60 seconds. For historical data (like yesterday's schedule and completed game boxscores), these repeated calls are redundant and waste bandwidth/CPU, especially since they can trigger 7+ boxscore requests per poll. Concurrent requests in Promise.all for the same game cause duplicate network requests.
**Action:** Implemented `window.apiCache` to memoize Promises for endpoints where `g.status.abstractGameState` is 'Final' or 'Completed Early'. Caching the Promise itself resolves concurrent request duplication and ensures the cached data is correctly injected into the normal rendering pipeline.

## 2024-05-23 - [API Response Caching for Polled Schedules]
**Learning:** Polling static historical endpoints (like season trophies or yesterday's schedule) causes redundant network requests. Concurrent UI mapping loops for Live game endpoints can trigger duplicate in-flight requests if users share a game.
**Action:** Cached the static season trophy API call. Cached yesterday's schedule API call conditionally (only if all games are final). Added a short-lived `liveApiCache` per polling loop to deduplicate concurrent live boxscore requests. Always cache the Promise to handle concurrency.

## 2024-05-23 - [Modal Caching and Concurrent Fetching]
**Learning:** Re-fetching box scores and linescores for user-triggered modals (like Box Score) ignores the fact that these are already requested in background polling or cached via `window.apiCache`/`liveApiCache`. Also, when mixing cached promises with fallback fetch network requests, sequentially awaiting them produces a waterfall delay regression.
**Action:** Reused cached promises and pre-hydrated properties (`matchingGame.linescore`) inside user-triggered modals (`openBoxScore`). Wrapped both cached promises and fallback `fetch` calls in a single `Promise.all` to fetch them concurrently instead of sequentially awaiting them.
