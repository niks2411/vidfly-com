import { test, expect, type Page } from '@playwright/test';

// Helper to capture console errors and uncaught exceptions
function setupErrorListeners(page: Page, consoleErrors: string[]) {
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      const text = msg.text();
      // Ignore known third-party script logs (Google Analytics, clarity tracking etc.)
      if (
        !text.includes('clarity') && 
        !text.includes('googletagmanager') && 
        !text.includes('google-analytics') &&
        !text.includes('favicon.ico')
      ) {
        console.error(`Browser console error: ${text}`);
        consoleErrors.push(text);
      }
    }
  });

  page.on('pageerror', (err) => {
    console.error(`Uncaught exception in page: ${err.message}`);
    consoleErrors.push(err.message);
  });
}

// Helper to verify that no DOM reconciliation or application error occurred
async function verifyNoErrors(page: Page, consoleErrors: string[]) {
  const rootError = page.locator('text=Application Error');
  const connectionInterrupted = page.locator('text=Connection Interrupted');
  await expect(rootError).toBeHidden();
  await expect(connectionInterrupted).toBeHidden();

  // Check if we hit any DOM reconciliation error in console
  for (const err of consoleErrors) {
    if (
      err.includes("insertBefore") ||
      err.includes("removeChild") ||
      err.includes("NotFoundError") ||
      err.includes("not a child of this node")
    ) {
      throw new Error(`DOM reconciliation error detected: ${err}`);
    }
  }
}

test.describe('Page Navigation DOM Stability & Routing tests', () => {
  const baseUrl = process.env.PLAYWRIGHT_TEST_BASE_URL || 'http://localhost:3000';

  test('Test Case 1: Core Pages client-side loop (12 Transitions)', async ({ page }) => {
    const consoleErrors: string[] = [];
    setupErrorListeners(page, consoleErrors);

    console.log(`Navigating to home page: ${baseUrl}`);
    await page.goto(baseUrl);
    await expect(page).toHaveTitle(/Vidflyy/i);

    const navigationActions = [
      { name: 'Pricing (Header Button)', click: () => page.locator('button:has-text("Pricing")').first().click() },
      { name: 'Home Page (via Logo)', click: () => page.locator('a[href="/"]').first().click() },
      { name: 'How It Works (Header Button)', click: () => page.locator('button:has-text("How Vidflyy Works")').first().click() },
      { name: 'Contact Page (Header Button)', click: () => page.locator('button:has-text("Contact Us")').first().click() },
      { name: 'Pricing Page (Header Button)', click: () => page.locator('button:has-text("Pricing")').first().click() },
      { name: 'Home Page (via Logo)', click: () => page.locator('a[href="/"]').first().click() },
      { name: 'Buy Youtube Views', click: () => page.locator('a[href="/buy-youtube-views"]').first().click() },
      { name: 'Buy Youtube Subscribers', click: () => page.locator('a[href="/buy-youtube-subscribers"]').first().click() },
      { name: 'Buy Youtube Likes', click: () => page.locator('a[href="/buy-youtube-likes"]').first().click() },
      { name: 'Free Youtube Views', click: () => page.locator('a[href="/free-youtube-views"]').first().click() },
      { name: 'Home Page (via Logo)', click: () => page.locator('a[href="/"]').first().click() },
    ];

    console.log('Beginning Core Pages Navigation Loop...');
    for (let i = 0; i < navigationActions.length; i++) {
      const action = navigationActions[i];
      console.log(`Step ${i + 1}/${navigationActions.length}: Navigating to ${action.name}`);
      await action.click();
      await page.waitForTimeout(400);
      await verifyNoErrors(page, consoleErrors);
    }
  });

  test('Test Case 2: Niche YouTube Promotion Landing Pages Loop (12 Transitions)', async ({ page }) => {
    const consoleErrors: string[] = [];
    setupErrorListeners(page, consoleErrors);

    await page.goto(baseUrl);
    await expect(page).toHaveTitle(/Vidflyy/i);

    const landingPages = [
      { name: 'Gaming Promotion', click: () => page.locator('a[href="/youtube-gaming-promotion"]').first().click() },
      { name: 'Home Page', click: () => page.locator('a[href="/"]').first().click() },
      { name: 'Music Promotion', click: () => page.locator('a[href="/youtube-music-promotion"]').first().click() },
      { name: 'Travel Promotion', click: () => page.locator('a[href="/youtube-travel-promotion"]').first().click() },
      { name: 'Health & Beauty Promotion', click: () => page.locator('a[href="/youtube-health-beauty-promotion"]').first().click() },
      { name: 'Home Page', click: () => page.locator('a[href="/"]').first().click() },
      { name: 'Motivation Promotion', click: () => page.locator('a[href="/youtube-motivation-promotion"]').first().click() },
      { name: 'Vlogging Promotion', click: () => page.locator('a[href="/youtube-vlogging-promotion"]').first().click() },
      { name: 'Home Page', click: () => page.locator('a[href="/"]').first().click() },
    ];

    console.log('Beginning Niche Promotion Pages Loop...');
    for (let i = 0; i < landingPages.length; i++) {
      const action = landingPages[i];
      console.log(`Step ${i + 1}/${landingPages.length}: Navigating to ${action.name}`);
      await action.click();
      await page.waitForTimeout(400);
      await verifyNoErrors(page, consoleErrors);
    }
  });

  test('Test Case 3: Legal Policies Navigation Loop (5 Transitions)', async ({ page }) => {
    const consoleErrors: string[] = [];
    setupErrorListeners(page, consoleErrors);

    await page.goto(baseUrl);
    await expect(page).toHaveTitle(/Vidflyy/i);

    const policyPages = [
      { name: 'Privacy Policy', click: () => page.locator('a[href="/privacy-policy"]').first().click() },
      { name: 'Terms & Conditions', click: () => page.locator('a[href="/terms-and-conditions"]').first().click() },
      { name: 'Home Page', click: () => page.locator('a[href="/"]').first().click() },
    ];

    console.log('Beginning Legal Policies Pages Loop...');
    for (let i = 0; i < policyPages.length; i++) {
      const action = policyPages[i];
      console.log(`Step ${i + 1}/${policyPages.length}: Navigating to ${action.name}`);
      await action.click();
      await page.waitForTimeout(400);
      await verifyNoErrors(page, consoleErrors);
    }
  });

  test('Test Case 4: DOM Persistence Verification on Excluded Route (/get-started)', async ({ page }) => {
    await page.goto(`${baseUrl}/get-started`);
    await page.waitForTimeout(500);

    const navbarWrapper = page.locator('.sticky.top-0');
    const footerWrapper = page.locator('footer.footer-section');

    // Confirm that they are hidden from the user
    await expect(navbarWrapper).toBeHidden();
    await expect(footerWrapper).toBeHidden();

    // Confirm that they still exist in the DOM (checking their presence in DOM)
    const navbarExists = await navbarWrapper.count();
    const footerExists = await footerWrapper.count();
    
    expect(navbarExists).toBeGreaterThan(0);
    expect(footerExists).toBeGreaterThan(0);
    
    console.log('DOM node stability verified successfully: Navbar and Footer exist in the DOM tree but are hidden.');
  });
});
