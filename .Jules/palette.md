## 2024-05-18 - Add ARIA Labels to Icon-only Close Buttons
**Learning:** Icon-only modal close buttons (e.g. `&times;`) lack context for screen reader users and need explicit ARIA labels.
**Action:** Always add `aria-label="Close modal"` (or similar appropriate labels) to interactive elements that rely solely on visual icons or symbols for meaning.
