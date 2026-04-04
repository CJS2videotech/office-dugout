# Office Dugout ⚾

**Office Dugout** is a high-fidelity, highly-customizable baseball dashboard built for tracking specific MLB teams across an office. It utilizes a modern, aesthetic "glassmorphism" design and queries live game data straight from the official MLB Stats API.

## 🌟 Features

*   **5-User Team Hub:** Distinctly tracks 5 users (Andrea, CJ, Brennan, Dominic, Mario) and their favorite teams (Brewers, Cubs, Giants, Yankees, Guardians).
*   **Daily Picks Engine:** 
    *   **Live Game Dropdowns:** Users can select "Today", "Tomorrow", or "Yesterday" to dynamically fetch games directly from the MLB API.
    *   **Unlimited Picking:** Make independent picks for every game of the day, featuring complete support for doubleheaders.
    *   **Auto-Grading:** Because picks are natively tied to MLB Game IDs, the dashboard silently evaluates the final box score of your picks using live MLB data—automatically tracking and updating your pick status to WON or LOST without requiring manual admin input.
*   **Daily Picks Leaderboard:** A sleek standalone panel ranking the 5 users based on their active Daily Picks Win/Loss Record, Win Percentage, and Active Streak (🔥). The #1 ranked predictor earns the coveted Daily Picks Trophy (🏆).
*   **Yesterday's Recap Mode:** Selecting "Yesterday" on the Date dropdown intelligently disables new input forms to prevent predictions in the past, and transforms the Recent Picks sheet into a neat recap of yesterday's predictions and outcomes.
*   **The Dugout Chatter:** A fully fleshed-out message board attached right under the leaderboard. Read and write real-time banter. It features integrated persistence so your trash-talk is preserved perfectly across dashboard reboots.
*   **3D Interactive Flip-Cards:** Individual game column blocks and the Daily Leaderboard utilize native GPU-accelerated 3D CSS to physically spin around. Users can click `↺ YEST` to instantly flip the card and check their team's final box-score from yesterday.
*   **Gamified Trophy Engine (In-Game Stats):** Ranks teams internally by prioritizing `Runs > Hits > Stadium Attendance`. The daily winner automatically receives a golden 🏆 badge next to their name. A headless engine tracks the complete season since Opening Day to place a permanent `🏆 x N` counter inside each user's Profile Modal.
*   **Zero Dependencies:** Built completely with vanilla HTML/CSS/JS.

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

The Office Dugout seamlessly meshes engaging frontend features with the real world without needing user authentication or a backend cloud database. 

It accomplishes this in two ways:
1. **API Hydration:** Queries dynamic headless endpoints against `statsapi.mlb.com` to fetch schedules, rosters, box scores, doubleheaders, and standings to populate the deep stats models.
2. **Local Persistence:** Your Daily Picks predictions, Win/Loss Records, and Chatter Messages are saved beautifully directly into your browser's persistent `localStorage`. Just keep opening the dashboard on your machine, and your state will instantly reload.
