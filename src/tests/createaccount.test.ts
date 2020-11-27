
import { chromium, Browser, Page, BrowserContext } from 'playwright';
const { addAttach } = require("jest-html-reporters/helper");

let browser: Browser;
let page: Page;
let context: BrowserContext;
let page_url = 'https://master.d1htewdfqlz7ha.amplifyapp.com/';
let s_create_account_link = 'text="Create account"';
let s_create_account_button = 'text="Create Account"';
let s_username = 'input[data-test="sign-up-username-input"]';
let s_password = 'input[data-test="sign-up-password-input"]';
let s_emailaddress = 'input[data-test="sign-up-email-input"]';
let s_countrycode = 'select[id="country-dial-code-select"]';
let s_phone = 'input[data-test="sign-up-phone-number-input"]';
let username = 'sagarpulate1';
let password = 'egain@123';
let emailaddress = 'sagarpulate@gmail.com' ;
let countrycode= '+91';
let phone = '9834614881';



beforeAll(async () => {
  browser = await chromium.launch({ headless: false, slowMo: 2000 });
  context = await browser.newContext();
  page = await context.newPage();

});

afterAll(async () => {
  await page.close();
  await context.close();
  await browser.close();
});

beforeEach(async () => {
  //page = await context.newPage();
});

afterEach(async () => {
  //await page.close();
});



describe('Registration Scenarios', () => {

  test('Should be Page loaded', async () => {
    await page.goto(page_url);
    await page.waitForLoadState("load");
    const data = await page.screenshot({ path: './images/PageLoaded.jpg' });
    await addAttach(data, "PageLoaded");
    expect(page.url()).toBe(page_url);
  })

  test('Should link redirected to create account page', async () => {
    var i = 2;
    // Navigate to create account
    await page.click(s_create_account_link);
    // Fill username
    await page.fill(s_username, username);
    // Fill password
    await page.fill(s_password, password);
    // Fill email
    await page.fill(s_emailaddress, emailaddress);
    // Country Code
    await page.selectOption(s_countrycode, countrycode);
    // Fill phone number
    await page.fill(s_phone, phone);
    // hit the create account button
    await page.click(s_create_account_button);
    // demo purpose added
    await page.waitForTimeout(5000);
  });

});
  