import { test, expect } from '@playwright/test';

const BACKEND_URL = 'http://localhost:8000';
const FRONTEND_URL = 'http://localhost:3000';

// Function to generate unique username
const generateUniqueUsername = (prefix: string) => {
  const randomNum = Math.floor(Math.random() * 100000);
  return `${prefix}_${randomNum}`;
};

// Sample feedback data
const positiveFeedback = [
  // "The team went above and beyond my expectations!",
  // "Outstanding experience from start to finish.",
  // "Very satisfied with the product features.",
  // "The interface is intuitive and user-friendly.",
  "Great job on the recent updates!",
  "Customer service was exceptional.",
  "Love how easy it is to use the platform.",
  "Fantastic improvements in the latest version!"
];

const negativeFeedback = [
  // "Not satisfied with the support response.",
  // "The system is too complicated to use.",
  // "Found several bugs in the application.",
  // "Documentation needs improvement.",
  // "Features are missing compared to competitors.",
  "Experienced frequent crashes.",
  "The pricing is too high for what's offered.",
  "Performance issues need to be addressed."
];

const mixedFeedback = [
  "Great product with a few minor bugs.",
  "Excellent support, but the platform is a bit expensive.",
  "Nice interface but could use more features."
];

test.describe('Feedback Generation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(FRONTEND_URL);
  });

  test('should generate positive feedback', async ({ page }) => {
    for (let i = 0; i < 4; i++) {
      const username = generateUniqueUsername('positive_user');
      await page.goto(`${FRONTEND_URL}/register`);
      await page.fill('input[name="username"]', username);
      await page.fill('input[name="password"]', 'testpass123');
      await page.click('button[type="submit"]');
      await page.waitForURL(`${FRONTEND_URL}/login`);
      
      await page.fill('input[name="username"]', username);
      await page.fill('input[name="password"]', 'testpass123');
      await page.click('button[type="submit"]');
      await page.waitForURL(`${FRONTEND_URL}/home`);
      await page.waitForTimeout(1000);
      await page.goto(`${FRONTEND_URL}/feedback`);
      await page.fill('textarea[placeholder="Enter your feedback here"]', positiveFeedback[i]);
      await page.click('button[type="submit"]');
      await page.waitForTimeout(1000);
      await page.click('button[class*="MuiButton-root"]');
    }
  });

  test('should generate negative feedback', async ({ page }) => {
    for (let i = 0; i < 3; i++) {
      const username = generateUniqueUsername('negative_user');
      await page.goto(`${FRONTEND_URL}/register`);
      await page.fill('input[name="username"]', username);
      await page.fill('input[name="password"]', 'testpass123');
      await page.click('button[type="submit"]');
      await page.waitForURL(`${FRONTEND_URL}/login`);
      
      await page.fill('input[name="username"]', username);
      await page.fill('input[name="password"]', 'testpass123');
      await page.click('button[type="submit"]');
      await page.waitForURL(`${FRONTEND_URL}/home`);
      
      await page.waitForTimeout(1000);
      await page.goto(`${FRONTEND_URL}/feedback`);
      await page.fill('textarea[placeholder="Enter your feedback here"]', negativeFeedback[i]);
      await page.click('button[type="submit"]');
      await page.waitForTimeout(1000);
      await page.click('button[class*="MuiButton-root"]');
    }
  });

  // test('should generate mixed feedback', async ({ page }) => {
  //   for (let i = 0; i < 3; i++) {
  //     const username = generateUniqueUsername('mixed_user');
  //     await page.goto(`${FRONTEND_URL}/register`);
  //     await page.fill('input[name="username"]', username);
  //     await page.fill('input[name="password"]', 'testpass123');
  //     await page.click('button[type="submit"]');
  //     await page.waitForURL(`${FRONTEND_URL}/login`);
      
  //     await page.fill('input[name="username"]', username);
  //     await page.fill('input[name="password"]', 'testpass123');
  //     await page.click('button[type="submit"]');
  //     await page.waitForURL(`${FRONTEND_URL}/home`);
      
  //     await page.waitForTimeout(1000);
  //     await page.goto(`${FRONTEND_URL}/feedback`);
  //     await page.fill('textarea[placeholder="Enter your feedback here"]', mixedFeedback[i]);
  //     await page.click('button[type="submit"]');
  //     await page.waitForTimeout(1000);
  //     await page.click('button[class*="MuiButton-root"]');
  //   }
  // });
}); 