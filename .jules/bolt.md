## 2024-05-23 - [Client-Side API Payload Caching]
**Learning:** The application aggressively polls the MLB Stats API every 60 seconds. For historical data (like yesterday's schedule and completed game boxscores), these repeated calls are redundant and waste bandwidth/CPU, especially since they can trigger 7+ boxscore requests per poll. Concurrent requests in Promise.all for the same game cause duplicate network requests.
**Action:** Implemented `window.apiCache` to memoize Promises for endpoints where `g.status.abstractGameState` is 'Final' or 'Completed Early'. Caching the Promise itself resolves concurrent request duplication and ensures the cached data is correctly injected into the normal rendering pipeline.

## 2024-05-23 - [API Response Caching for Polled Schedules]
**Learning:** Polling static historical endpoints (like season trophies or yesterday's schedule) causes redundant network requests. Concurrent UI mapping loops for Live game endpoints can trigger duplicate in-flight requests if users share a game.
**Action:** Cached the static season trophy API call. Cached yesterday's schedule API call conditionally (only if all games are final). Added a short-lived `liveApiCache` per polling loop to deduplicate concurrent live boxscore requests. Always cache the Promise to handle concurrency.

## 2024-05-23 - [Modal Data Hydration from Background Poll]
**Learning:** Polling the `/schedule` endpoint with `hydrate=linescore` stores robust linescore data (including currentInning, balls, strikes, outs) on the client (`currentGames`, `yesterdayGames`). Triggering an explicit `fetch(/linescore)` when opening the Box Score modal for a game already present in the background poll is completely redundant.
**Action:** When a user opens a modal, check if the `gamePk` exists in memory and reuse the `linescore` object. Only fetch network fallbacks via `Promise.all` if data is missing, preventing a waterfall and saving an HTTP request on every click.
