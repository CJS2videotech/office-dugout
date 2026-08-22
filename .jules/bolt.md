## 2026-08-22 - Caching API Responses in Polling Loop
**Learning:** The application polls for data every 60 seconds (`loadScores`), generating numerous identical API requests for games that have already ended.
**Action:** When working on API-fetching logic in a continuous polling app, always implement simple client-side caching (e.g., using a plain object like `boxscoreCache`) for finalized, immutable data to save bandwidth and execution time.
