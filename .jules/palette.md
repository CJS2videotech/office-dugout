## 2024-10-04 - UX Loading States and Accessible Error Messages

**Learning:** When implementing asynchronous loading states on buttons in vanilla projects, simply replacing the element's `textContent` destroys nested DOM elements (like loading spinners). The proper pattern is to scope text updates to an inner span and use CSS classes (e.g., `.is-loading`) to toggle spinner visibility. Also, dynamic error messages must include `role="alert"` and `aria-live="assertive"` to ensure screen readers announce them properly upon display.
**Action:** Use `.rbtn` class, inner text spans, and `.is-loading` class toggling for button states. Ensure dynamic error elements include appropriate ARIA attributes for immediate screen reader notification.
