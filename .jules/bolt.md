## 2024-05-23 - [Client-Side API Payload Caching]
**Learning:** The application aggressively polls the MLB Stats API every 60 seconds. For historical data (like yesterday's schedule and completed game boxscores), these repeated calls are redundant and waste bandwidth/CPU, especially since they can trigger 7+ boxscore requests per poll. Concurrent requests in Promise.all for the same game cause duplicate network requests.
**Action:** Implemented `window.apiCache` to memoize Promises for endpoints where `g.status.abstractGameState` is 'Final' or 'Completed Early'. Caching the Promise itself resolves concurrent request duplication and ensures the cached data is correctly injected into the normal rendering pipeline.

## 2024-05-23 - [API Response Caching for Polled Schedules]
**Learning:** Polling static historical endpoints (like season trophies or yesterday's schedule) causes redundant network requests. Concurrent UI mapping loops for Live game endpoints can trigger duplicate in-flight requests if users share a game.
**Action:** Cached the static season trophy API call. Cached yesterday's schedule API call conditionally (only if all games are final). Added a short-lived `liveApiCache` per polling loop to deduplicate concurrent live boxscore requests. Always cache the Promise to handle concurrency.

## 2026-09-07 - [Reusing Cached Promises in Modals]
**Learning:** Background polling loops populate window.apiCache and window.liveApiCache with API request promises, and currentGames and yesterdayGames with hydrated API payloads (e.g., linescore). Making new network requests in user-triggered events (like modals) ignores these populated caches and duplicates network fetches.
**Action:** Reused the cached promises (e.g., window.apiCache[gamePk]) and hydrated objects (e.g., game.linescore from currentGames) in modal functions instead of making redundant fetch calls, falling back to fetch concurrently using Promise.all only on cache misses.

## 2026-09-16 - [Preventing Network Waterfalls in Polling Loops]
**Learning:** Sequential `await` chains inside aggressive 60s polling loops like `loadScores()` and `refreshAll()` cause unnecessary request waterfalls, delaying total time-to-render. `loadScores` was stalled waiting for today's data to process before initiating yesterday's data fetch, and `refreshAll` stalled `loadSeasonTrophies` until all other main calls resolved.
**Action:** Always wrap independent asynchronous tasks in `Promise.all` arrays or initialize the `fetch` promise without `await`ing immediately, moving the `await` directly before the payload is needed, to maximize network concurrency and reduce total load time.

## 2026-09-16 - [Avoiding Race Conditions with renderHRBSeasonLeaderboard]
**Learning:** `renderHRBSeasonLeaderboard()` depends on global state that is populated by other asynchronous functions like `loadScores()`. Chaining it directly to `loadSeasonTrophies().then()` inside a `Promise.all` executes it before other data like `currentGames` is guaranteed to be ready, introducing a race condition.
**Action:** When optimizing asynchronous data fetches using `Promise.all`, ensure synchronous rendering functions that depend on multiple global state objects execute *after* the entire `Promise.all` resolves, rather than chaining them to individual promises within the array.
