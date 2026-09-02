## 2024-05-23 - [Client-Side API Payload Caching]
**Learning:** The application aggressively polls the MLB Stats API every 60 seconds. For historical data (like yesterday's schedule and completed game boxscores), these repeated calls are redundant and waste bandwidth/CPU, especially since they can trigger 7+ boxscore requests per poll. Concurrent requests in Promise.all for the same game cause duplicate network requests.
**Action:** Implemented `window.apiCache` to memoize Promises for endpoints where `g.status.abstractGameState` is 'Final' or 'Completed Early'. Caching the Promise itself resolves concurrent request duplication and ensures the cached data is correctly injected into the normal rendering pipeline.

## 2024-05-23 - [API Response Caching for Polled Schedules]
**Learning:** Polling static historical endpoints (like season trophies or yesterday's schedule) causes redundant network requests. Concurrent UI mapping loops for Live game endpoints can trigger duplicate in-flight requests if users share a game.
**Action:** Cached the static season trophy API call. Cached yesterday's schedule API call conditionally (only if all games are final). Added a short-lived `liveApiCache` per polling loop to deduplicate concurrent live boxscore requests. Always cache the Promise to handle concurrency.

## 2024-05-23 - [Inconsistent Cache Keying for Polled Data]
**Learning:** When retrieving polled data manually (e.g., triggering a modal fetch vs. waiting for the background poll), it's crucial to align the URL payload string (e.g., `hydrate` parameters) and use a unified cache-key paradigm. Mixing key types (like using the raw URL `string` in one function and an integer `gamePk` in another) against the same global cache object `window.apiCache` leads to cache misses.
**Action:** When manually fetching endpoints that should be cached by a background poller, reconstruct the exact URL (or ID) string the background job uses. Utilize fallback key checking (`window.apiCache[url] || window.apiCache[gamePk]`) if multiple parts of the application index the data differently.
