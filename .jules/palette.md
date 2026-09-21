## 2024-11-20 - Global Escape Key Support for Modals
**Learning:** When building custom `.modal-overlay` components without the native `<dialog>` element, keyboard accessibility using the `Escape` key is not provided automatically and must be explicitly added via a global `keydown` event listener attached to `window`.
**Action:** Always ensure a global `keydown` listener for the `Escape` key is attached to handle custom `.modal-overlay` closures, or refactor to use native `<dialog>` elements where possible for built-in accessibility.
