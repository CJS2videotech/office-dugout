## 2024-09-30 - Added Global Escape Listener for Custom Modals
**Learning:** This app uses custom `.modal-overlay` components instead of native `<dialog>` tags. Because of this, it does not inherit the native behavior where pressing the `Escape` key automatically closes the modal, leading to a keyboard accessibility trap.
**Action:** Always ensure that when implementing or interacting with custom `.modal-overlay` components, a global `Escape` keydown listener is present on the `window` to programmatically remove the `.open` class and close them.
