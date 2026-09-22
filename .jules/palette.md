## 2025-02-18 - Added Escape Key Support to Modals
**Learning:** When using custom non-native dialog elements (`.modal-overlay`) for modals, implicit accessibility keyboard navigation (such as pressing the `Escape` key to close the modal) is not provided by the browser. It must be explicitly programmed via global `keydown` event listeners.
**Action:** When implementing custom modals or reviewing them, always verify that an `Escape` key listener is attached to the window or document to allow users to easily dismiss the modal via keyboard, thereby improving keyboard accessibility.
