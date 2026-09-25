## 2024-05-24 - Add accessible labels to UI components
**Learning:** Vanilla HTML and JS string templates are prone to missing essential accessibility attributes like `aria-label` for icon-only buttons (e.g., modal close buttons `&times;`) and `for` attributes linking labels to inputs. This breaks screen reader functionality, making UI elements unnavigable for visually impaired users.
**Action:** Always ensure that icon-only interactive elements contain a descriptive `aria-label` and all `<label>` elements explicitly link to their target input via the `for` attribute, even when using JS string templates for rendering UI dynamically.
## 2024-08-27 - Connect UI text to adjacent form controls with labels
**Learning:** Custom CSS toggle switches often use descriptive text adjacent to the `<input type="checkbox">` that acts visually as a label but functionally as a standard text node (e.g. `<span>`). This forces users to precisely tap the tiny visual toggle element.
**Action:** Always convert descriptive elements adjacent to form inputs into semantic `<label for="[id]">` tags. Apply `cursor: pointer` and `flex: 1` to expand the interactive hit area across the entire row, drastically improving UX on smaller screens or touch devices.
## 2024-05-24 - Make custom interactive elements accessible
**Learning:** In vanilla web projects, custom interactive elements (like `<img>` or `<div>`) equipped with `onclick` handlers are completely invisible to keyboard-only navigation by default. This makes them inaccessible to many users.
**Action:** When adding or discovering custom elements acting as buttons, ensure they have `role="button"`, `tabindex="0"`, an inline `onkeydown` handler to trap Space/Enter keys and trigger clicks (preventing default scroll behavior), and a `:focus-visible` styling rule to provide clear visual feedback.
## 2024-09-25 - Enable Escape key to close custom modal overlays
**Learning:** Custom UI modal elements (`.modal-overlay`) in a vanilla HTML/CSS project lack the native `<dialog>` element's built-in behaviors, such as closing when the Escape key is pressed. This leaves keyboard users stranded if they don't manually tab to the close button.
**Action:** Always map a global `window` `keydown` listener for `Escape` to programmatically remove the active/open classes from custom modal overlays to provide standard, expected keyboard accessibility.
