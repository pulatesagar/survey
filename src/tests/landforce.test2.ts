
import { chromium, Browser, Page, BrowserContext } from 'playwright';
const { addAttach } = require("jest-html-reporters/helper");

let browser: Browser;
let page: Page;
let context: BrowserContext;
let page_url = 'https://accounts.google.com/signup';
let page_loaded = 'https://accounts.google.com/signup/v2/webcreateaccount?flowName=GlifWebSignIn&flowEntry=SignUp';


beforeAll(async () => {
  browser = await chromium.launch({ headless: false });
  context = await browser.newContext();

});

afterAll(async () => {
   await page.close();
   await context.close();
   await browser.close();
});

beforeEach(async () => {
  page = await context.newPage();
});

afterEach(async () => {
  await page.close();
});

describe('Registration Scenarios', () => {

  test('Should be Page loaded', async () => {
    await page.goto(page_url);
    await page.waitForLoadState("load");
    const data = await page.screenshot({ path: './images/PageLoaded.jpg' });
    await addAttach(data, "PageLoaded");
    expect(page.url()).toBe(page_loaded);
  });

  test('Google', async () => {
  await page.goto(page_url);
      // Click input[aria-label="First name"]
  await page.click('input[aria-label="First name"]');

  // Fill input[aria-label="First name"]
  await page.fill('input[aria-label="First name"]', 'sagar');

  // Press Tab
  await page.press('input[aria-label="First name"]', 'Tab');

  // Fill input[aria-label="Last name"]
  await page.fill('input[aria-label="Last name"]', 'pulate');

  // Press Tab
  await page.press('input[aria-label="Last name"]', 'Tab');

  // Fill input[aria-label="Username"]
  await page.fill('input[aria-label="Username"]', 'sagarpulate20');

  // Press Tab
  await page.press('input[aria-label="Username"]', 'Tab');

  // Press Tab
  await page.press('text=/.*Use my current email address i.*/', 'Tab');

  // Fill input[aria-label="Password"]
  await page.fill('input[aria-label="Password"]', 'Aloha@123');

  // Press Tab
  await page.press('input[aria-label="Password"]', 'Tab');

  // Fill input[aria-label="Confirm"]
  await page.fill('input[aria-label="Confirm"]', 'Aloha@123');

  // Click text="Next"
  await Promise.all([
    page.waitForNavigation(/*{ url: 'https://accounts.google.com/signup/v2/webgradsidvphone?flowName=GlifWebSignIn&flowEntry=SignUp&TL=AM3QAYZ3hlnXk13BTxnVkXK_jFn2H_tSKZ6WexaueQA4E7tLHdpzQ1BAFHz1ZkuB' }*/),
    page.click('text="Next"')
  ]);

  await page.fill('input[aria-label="Phone number"]', '9657717732');
  const data = await page.screenshot({ path: './images/RegistrationStep2.jpg' });
  await addAttach(data, "RegistrationStep2");
    
  });

});