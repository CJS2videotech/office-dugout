## 2024-05-23 - [Client-Side API Payload Caching]
**Learning:** The application aggressively polls the MLB Stats API every 60 seconds. For historical data (like yesterday's schedule and completed game boxscores), these repeated calls are redundant and waste bandwidth/CPU, especially since they can trigger 7+ boxscore requests per poll. Concurrent requests in Promise.all for the same game cause duplicate network requests.
**Action:** Implemented `window.apiCache` to memoize Promises for endpoints where `g.status.abstractGameState` is 'Final' or 'Completed Early'. Caching the Promise itself resolves concurrent request duplication and ensures the cached data is correctly injected into the normal rendering pipeline.

## 2024-05-23 - [API Response Caching for Polled Schedules]
**Learning:** Polling static historical endpoints (like season trophies or yesterday's schedule) causes redundant network requests. Concurrent UI mapping loops for Live game endpoints can trigger duplicate in-flight requests if users share a game.
**Action:** Cached the static season trophy API call. Cached yesterday's schedule API call conditionally (only if all games are final). Added a short-lived `liveApiCache` per polling loop to deduplicate concurrent live boxscore requests. Always cache the Promise to handle concurrency.

## 2026-09-07 - [Reusing Cached Promises in Modals]
**Learning:** Background polling loops populate window.apiCache and window.liveApiCache with API request promises, and currentGames and yesterdayGames with hydrated API payloads (e.g., linescore). Making new network requests in user-triggered events (like modals) ignores these populated caches and duplicates network fetches.
**Action:** Reused the cached promises (e.g., window.apiCache[gamePk]) and hydrated objects (e.g., game.linescore from currentGames) in modal functions instead of making redundant fetch calls, falling back to fetch concurrently using Promise.all only on cache misses.

## 2026-09-18 - [API Polling Request Waterfalls]
**Learning:** In the aggressive `loadScores` and `refreshAll` polling loops, background API requests (like fetching today's vs yesterday's schedules, or standings vs trophies) were mistakenly structured to fire sequentially due to late Promise instantiation or staggered `await` calls. This created a network request waterfall, significantly slowing down the update cycle.
**Action:** Always instantiate all background fetch Promises concurrently at the beginning of the function or encapsulate them simultaneously within `Promise.all` before awaiting them to optimize execution time.
