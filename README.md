# Office Dugout ⚾

**Office Dugout** is a high-fidelity, highly-customizable baseball dashboard built for tracking specific MLB teams across an office. It utilizes a modern, aesthetic "glassmorphism" design and queries live game data straight from the official MLB Stats API.

## 🌟 Features

*   **5-User Team Hub:** Distinctly tracks 5 users (Andrea, CJ, Brennan, Dominic, Mario) and their favorite teams (Brewers, Cubs, Giants, Yankees, Guardians).
*   **Dynamic Theming:** Every team's abbreviation or name dynamically adopts its designated team color (e.g., Cubs in Red, Brewers in Yellow). The Yankees even get a custom glowing-white text effect to stand out cleanly.
*   **Live Game Tracking:** Fetches and displays live scores, current inning status, and Probable Pitcher metadata that refreshes automatically every 60 seconds.
*   **Interactive Team Roster:** A sleek, animated team roster at the bottom of the page that, when clicked, opens a premium frosted-glass modal featuring the employee's high-res portrait, real-time matchup information, and full division standings.
*   **Season & Daily Leaderboards:** Two comprehensive global boards comparing the 5 teams' total season Win % alongside their daily aggregate Runs and Hits. 
*   **Zero Dependencies:** Built entirely with vanilla HTML, CSS, and JavaScript. It runs entirely on the client side without needing Node.js or a backend.

## 🚀 Deployment (GitHub Pages)

Deploying to GitHub Pages takes less than a minute.

1.  **Repository Setup:** Ensure `index.html` is at the very root of your repository.
2.  **Asset Handling:** This app utilizes local assets for its roster pictures and responsive backgrounds. Ensure there is an `assets/` directory directly alongside `index.html` with the following files (Note: **Linux servers are case-sensitive** so these must match exactly):
    *   `andrea.jpg`
    *   `cj.jpg`
    *   `Brennan.jpg`
    *   `Dominic.jpg`
    *   `Mario.jpg`
    *   `OD background.png`
    *   `OD phone background.png`
3.  **Deploy:** Go to your GitHub repository -> **Settings** -> **Pages**.
4.  **Launch:** Set the branch source to `main` (or `master`) and save. Within a few moments, your dynamic dashboard will be live online!

## ⚙️ How it Works

The Office Dugout dashboard achieves its zero-dependency architecture by querying directly into the `statsapi.mlb.com` endpoints:
*   `/schedule`: Fetches the games spanning the next 14 days and today's live runs/hits per team layout.
*   `/standings`: Fetches the live season records and divisional standings hydration matrices to build the global leaderboard.
