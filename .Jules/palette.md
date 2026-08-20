## 2024-05-15 - Add ARIA Labels to Modal Close Buttons and for attributes to form labels
**Learning:** Icon-only buttons (like `&times;` for closing modals) frequently lack ARIA labels, making them inaccessible to screen readers. Form labels need to have a `for` attribute pointing to the `id` of their respective input fields to provide proper associations.
**Action:** Next time you review or add modal interfaces or forms, check that all interactive icon-only elements have descriptive `aria-label` attributes and form labels have the correct `for` attributes.
