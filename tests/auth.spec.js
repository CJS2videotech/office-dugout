const { test, expect } = require('@playwright/test');

test('handleAuthSubmit displays error on rejected promise', async ({ page }) => {
  // We can intercept the initial load of index.html and replace the script content to allow mocking.
  await page.route('**/*', async route => {
    const request = route.request();
    if (request.url().includes('identitytoolkit.googleapis.com')) {
      await route.fulfill({
        status: 400,
        contentType: 'application/json',
        body: JSON.stringify({
          error: {
            message: 'INVALID_PASSWORD',
          }
        })
      });
      return;
    }

    if (request.url() === 'http://127.0.0.1:3000/' || request.url() === 'http://127.0.0.1:3000/index.html') {
      const response = await page.request.fetch(route.request());
      let body = await response.text();

      // Make firebaseActive = true bypassing the check
      body = body.replace(/if \(!firebaseActive\)/g, 'if (false)');

      // Expose a way to inject a mock error
      body = body.replace(/await signInWithEmailAndPassword\(auth, email, password\);/g,
        'if (window.__MOCK_AUTH_ERROR) throw new Error(window.__MOCK_AUTH_ERROR); await signInWithEmailAndPassword(auth, email, password);');

      await route.fulfill({
        response,
        body,
        headers: { ...response.headers() }
      });
      return;
    }

    await route.continue();
  });

  await page.goto('http://127.0.0.1:3000/');

  // Set the mock error
  await page.evaluate(() => {
    window.__MOCK_AUTH_ERROR = "Firebase: Invalid credentials";
  });

  // Open the auth modal and fill the form
  await page.evaluate(() => {
    document.getElementById("auth-modal").classList.add("open");
    document.getElementById("auth-email").value = "test@example.com";
    document.getElementById("auth-password").value = "wrongpassword";
  });

  // Click the submit button
  await page.click('#auth-submit-btn');

  // Verify the error message is displayed
  const errorMsg = page.locator('#auth-error-msg');
  await expect(errorMsg).toBeVisible();
  await expect(errorMsg).toHaveText('Invalid credentials');

  // Verify the submit button state is restored
  const submitBtn = page.locator('#auth-submit-btn');
  await expect(submitBtn).toHaveText('Sign In');
  await expect(submitBtn).toBeEnabled();
});
