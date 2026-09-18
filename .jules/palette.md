## 2024-05-24 - Focus Indicators on Switches and Native Buttons
**Learning:** Custom CSS toggle switches (opacity: 0 inputs) often miss keyboard focus styles. Additionally, reused classes (like `.dp-select` used for both text inputs and selects) can leak inappropriate UX properties like `cursor: pointer` to text inputs.
**Action:** Ensure custom toggles have a `:focus-visible + .slider` selector to display a focus ring, globally apply `:focus-visible` to `button` elements, and reset cursor styles on specific input types when reusing generic form classes.
