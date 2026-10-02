1. Edit `index.html` to replace the undefined `.dp-btn` class with `.rbtn` on the authentication submit button, adding a nested `.spin` element and a `<span id="auth-submit-text">Sign In</span>`. Add `role="alert"` and `aria-live="assertive"` to the `#auth-error-msg` container to make dynamic errors screen reader friendly.
2. Edit `index.html`'s `handleAuthSubmit` function so that when loading, it toggles the `.is-loading` class on `submitBtn` and updates the text inside `#auth-submit-text` instead of directly replacing `submitBtn.textContent` (which destroys the spinner).
3. Verify the changes visually by generating a screenshot. Create a temporary Python Playwright script (saved to `/tmp/verify.py`), execute it via bash, and inspect the output. The script should use `page.evaluate` to mock `window.signInWithEmailAndPassword` to simulate an error and verify both loading and error states.
4. Run existing test `node --test tests/getTeamStyle.test.js`.
5. Create `.jules/palette.md` and add a journal entry detailing the UX and accessibility learnings regarding loading states and ARIA alerts in this project.
6. Complete pre commit steps to ensure proper testing, verification, review, and reflection are done.
7. Submit the change using branch `palette-auth-ux-polish`.
