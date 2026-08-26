## 2024-05-24 - Add accessible labels to UI components
**Learning:** Vanilla HTML and JS string templates are prone to missing essential accessibility attributes like `aria-label` for icon-only buttons (e.g., modal close buttons `&times;`) and `for` attributes linking labels to inputs. This breaks screen reader functionality, making UI elements unnavigable for visually impaired users.
**Action:** Always ensure that icon-only interactive elements contain a descriptive `aria-label` and all `<label>` elements explicitly link to their target input via the `for` attribute, even when using JS string templates for rendering UI dynamically.

## 2026-08-26 - Expanded click area for CSS toggle switches
**Learning:** Custom CSS toggle switches often have descriptive text wrapped in standard `<span>` tags adjacent to the checkbox, rather than semantic `<label>` tags. This not only fails to associate the description with the input for screen readers, but also restricts the clickable area strictly to the small visual switch, causing a frustrating UX on mobile and desktop.
**Action:** Always convert descriptive adjacent `<span>` elements into semantic `<label for="[id]">` tags. Apply `cursor: pointer; flex: 1;` styles to ensure the entire horizontal space can be clicked to toggle the state, massively improving the interactive hit area while gaining immediate accessibility wins.
