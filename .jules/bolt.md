## 2026-08-18 - Avoid Redundant Network Requests in Repeated Render Loops
**Learning:** In applications where multiple components or users are associated with the same underlying entity (e.g., users predicting the same MLB game), a naive iteration can lead to redundant network requests (N+1 problem) if data is fetched per-user rather than per-game.
**Action:** When fetching data in a loop where inputs (like `gamePk`) might be duplicated across iterations, cache the `Promise` of the fetch call (not just the result) to instantly deduplicate concurrent in-flight requests.
