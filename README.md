# Office Dugout ⚾

**Office Dugout** is a high-fidelity, highly-customizable baseball dashboard built for tracking specific MLB teams across an office. It utilizes a modern, aesthetic "glassmorphism" design and queries live game data straight from the official MLB Stats API.

## 🌟 Features

*   **5-User Team Hub:** Distinctly tracks 5 users (Andrea, CJ, Brennan, Dominic, Mario) and their favorite teams.
*   **Dynamic Theming:** Every team's abbreviation dynamically adopts its designated team color. The Yankees receive a custom glowing-white textual effect.
*   **3D Interactive Flip-Cards:** Individual game column blocks and the Daily Leaderboard utilize native GPU-accelerated 3D CSS to physically spin around. Users can click `↺ YEST` to instantly flip the card and check their team's final box-score from yesterday without leaving the page.
*   **Custom User Map Guide:** Features a modal overlay containing a visual breakdown of the page interface that accepts completely custom user screenshots.
*   **Gamified Trophy Engine:**
    *   **Daily Leader:** Ranks teams internally by prioritizing `Runs > Hits > Stadium Attendance`. The daily winner automatically receives a golden 🏆 badge next to their name.
    *   **Season Tracker:** A headless engine calculates the "Daily Leader" for *every single day* since Opening Day completely in the background without needing a database, placing a permanent `🏆 x N Season Wins` counter inside each user's Profile Modal.
*   **Zero Dependencies:** Built entirely with vanilla HTML, CSS, and JavaScript.

## 🚀 Deployment (GitHub Pages)

Deploying to GitHub Pages takes less than a minute.

1.  **Repository Setup:** Ensure `index.html` is at the very root of your repository.
2.  **Asset Handling:** This app utilizes local assets for its pictures and responsive backgrounds. Ensure there is an `assets/` directory targeting these exact names (Note: **Linux servers are case-sensitive**):
    *   `andrea.jpg`
    *   `cj.jpg`
    *   `Brennan.jpg`
    *   `Dominic.jpg`
    *   `Mario.png`
    *   `Button OD team.png`
    *   `OD background.png`
    *   `OD phone background.jpg`
    *   `instructions.png` (Used for the UI Guide popup)
3.  **Deploy:** Go to your GitHub repository -> **Settings** -> **Pages**, set source to `main` branch, and save.

## ⚙️ How it Works

The Office Dugout achieves its zero-dependency persistence by running dynamic headless queries against `statsapi.mlb.com`:
*   `/schedule`: Fetches active live runs/hits, the next 14 days, and ghost-loads the *Previous* 24 hours to seamlessly hydrate the back panels of the 3D flip-cards.
*   `Date Ranges`: Executes a single bulk query fetching the entire season layout since March 20th to generate the all-time Trophy tally.
*   `/standings`: Fetches the live season records and divisional matrices to build the global leaderboard.
