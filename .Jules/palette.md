## 2024-05-19 - Ensure Modals and Forms have Complete Semantic HTML
**Learning:** This app heavily relies on vanilla HTML/JS generated modals and standard form inputs. It's easy for manual, string-based templates to miss implicit screen reader associations like `aria-label` for icon-only close buttons or `for` attributes linking labels to inputs.
**Action:** When adding new form inputs or icon buttons to `index.html` string templates, always manually write out the `for` and `aria-label` attributes to maintain accessibility standards.
