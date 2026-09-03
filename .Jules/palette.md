## 2024-05-24 - Add accessible labels to UI components
**Learning:** Vanilla HTML and JS string templates are prone to missing essential accessibility attributes like `aria-label` for icon-only buttons (e.g., modal close buttons `&times;`) and `for` attributes linking labels to inputs. This breaks screen reader functionality, making UI elements unnavigable for visually impaired users.
**Action:** Always ensure that icon-only interactive elements contain a descriptive `aria-label` and all `<label>` elements explicitly link to their target input via the `for` attribute, even when using JS string templates for rendering UI dynamically.
## 2024-08-27 - Connect UI text to adjacent form controls with labels
**Learning:** Custom CSS toggle switches often use descriptive text adjacent to the `<input type="checkbox">` that acts visually as a label but functionally as a standard text node (e.g. `<span>`). This forces users to precisely tap the tiny visual toggle element.
**Action:** Always convert descriptive elements adjacent to form inputs into semantic `<label for="[id]">` tags. Apply `cursor: pointer` and `flex: 1` to expand the interactive hit area across the entire row, drastically improving UX on smaller screens or touch devices.
## 2024-09-03 - Add keyboard accessibility to interactive non-button elements
**Learning:** In vanilla projects, adding `onclick` handlers to non-button semantic elements like `<img>` or `<div>` excludes keyboard-only users because these elements are not inherently focusable and do not automatically trigger click events on 'Enter' or 'Space'.
**Action:** Always add `role="button"`, `tabindex="0"`, a manual `onkeydown` handler mapping 'Enter' and 'Space' to `.click()`, and `:focus-visible` styling when making non-semantic elements interactive.
