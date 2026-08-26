## 2024-05-24 - Add accessible labels to UI components
**Learning:** Vanilla HTML and JS string templates are prone to missing essential accessibility attributes like `aria-label` for icon-only buttons (e.g., modal close buttons `&times;`) and `for` attributes linking labels to inputs. This breaks screen reader functionality, making UI elements unnavigable for visually impaired users.
**Action:** Always ensure that icon-only interactive elements contain a descriptive `aria-label` and all `<label>` elements explicitly link to their target input via the `for` attribute, even when using JS string templates for rendering UI dynamically.

## 2024-05-24 - Accessible Toggle Switches
**Learning:** Custom CSS toggle switches (where the actual `<input type="checkbox">` is visually hidden) often lose their focus outline, making keyboard navigation difficult. Furthermore, placing text next to a switch without wrapping it in a `<label for="...">` prevents users from toggling the switch by clicking the text, reducing the clickable area and harming usability.
**Action:** Always add `:focus-visible` styles to the visible part of a custom toggle (e.g. `input:focus-visible + .slider`) and ensure descriptive text next to the toggle is an explicitly linked `<label>` for a larger hit target.
