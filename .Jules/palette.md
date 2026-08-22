## 2026-08-22 - Added ARIA labels to icon-only modal close buttons
**Learning:** Vanilla JS apps generating modal templates via string interpolation often miss essential accessibility attributes on icon-only buttons like `&times;`.
**Action:** Always ensure `aria-label` is applied to all static and dynamically rendered icon-only buttons for screen reader support.
