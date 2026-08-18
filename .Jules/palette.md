## 2024-05-24 - Custom Toggle Hit Areas
**Learning:** Using `span` tags for text next to custom toggle switches (checkboxes) is terrible for accessibility and UX because users have to precisely click the tiny toggle button itself.
**Action:** Always wrap the descriptive text in a `<label for="...">` associated with the toggle's input ID, and add `cursor: pointer;` so users know they can click the text to toggle the state. This massively increases the clickable hit area.
