
import { chromium, Browser, Page, BrowserContext } from 'playwright';
const { addAttach } = require("jest-html-reporters/helper");

let browser: Browser;
let page: Page;
let context: BrowserContext;
let page_url = 'https://master.d1htewdfqlz7ha.amplifyapp.com/';
let createAccountLink = 'text="Create account"';
let createAccountButton = 'text="Create Account"';
//selectors
let selectorUserName = 'input[data-test="sign-up-username-input"]';
let selectorPassword = 'input[data-test="sign-up-password-input"]';
let selectorEmailAddress = 'input[data-test="sign-up-email-input"]';
let selectorCountryCode = 'select[id="country-dial-code-select"]';
let selectorPhone = 'input[data-test="sign-up-phone-number-input"]';
// user data
let username = 'sagarpulate';
let password = 'egain@123';
let emailAddress = 'sagarpulate@gmail.com' ;
let countryCode= '+91';
let phone = '9834614881';




beforeAll(async () => {
  browser = await chromium.launch({ headless: false, slowMo: 500 });
  context = await browser.newContext();
  page = await context.newPage();

});

afterAll(async () => {
  await page.close();
  await context.close();
  await browser.close();
});

describe('Registration Scenarios', () => {

  test('Page load', async () => {
    await page.goto(page_url);
    await page.waitForLoadState("load");
    const data = await page.screenshot({ path: './images/PageLoaded.jpg' });
    await addAttach(data, "PageLoaded");
    expect(page.url()).toBe(page_url);
  })

  test('Create Account', async () => {
    var i = 2;
    // Navigate to create account
    await page.click(createAccountLink);
    // Fill username
    await page.fill(selectorUserName, username);
    // Fill password
    await page.fill(selectorPassword, password);
    // Fill email
    await page.fill(selectorEmailAddress, emailAddress);
    // Country Code
    await page.selectOption(selectorCountryCode, countryCode);
    // Fill phone number
    await page.fill(selectorPhone, phone);
    // hit the create account button
    await page.click(createAccountButton);
    // checking error message
    await page.waitForSelector('text="User pool client 2cjnno3ofslgtkf3ttttcpep8m does not exist."');

    const data = await page.screenshot({ path: './images/CreateAccount.jpg' });

    await addAttach(data, "Create Account");

  });

});
  