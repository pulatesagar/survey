
import { chromium, Browser, Page, BrowserContext } from 'playwright';
const { addAttach } = require("jest-html-reporters/helper");

let browser: Browser;
let page: Page;
let context: BrowserContext;
let page_url = 'https://localhost:5001/';
let expected_title = 'Landmark Investor';
let username = 'acarlin2147@gmail.com';
let password = '123';
let invalidusername = 'acarlin2147@gmail.comm';
let invalidPassword = '12';
let s_login_link1 = '//div[normalize-space(.)=\'Please login to continue.\']';
let s_login_link2 = 'text=/.*Login.*/';
let s_invalidcredentials_error= '//div[normalize-space(.)=\'Error Username or password is invalid\']';
let s_login_success = 'text="Ms. Ann Carlin"';
let s_logout_click= 'text=/.*Logout.*/';

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

describe('Login Scenarios', () => {

  test('Verify page title & landing page', async () => {
    await page.goto(page_url);
    await page.waitForLoadState("load");
    await page.waitForSelector(s_login_link1);
    const current_title = await page.title();
    const data = await page.screenshot({ path: './images/title.jpg' });
    await addAttach(data, "Investor Title");
    expect(current_title).toBe(expected_title);
  });

  test('Verify Login with valid username and incorrect password', async () => {

    await page.goto(page_url);
    await Promise.all([
      page.waitForNavigation(),
      page.click('text="login"')
    ]);

    await page.fill('input[name="Username"]', username);
    await page.fill('input[name="Password"]', invalidPassword);
    await page.click('text="LOG IN"');
    await page.waitForTimeout(3000);
    const data = await page.screenshot({ path: './images/incorrectpassword.jpg' });
    await addAttach(data, "invalidPassword");
    await page.waitForSelector(s_invalidcredentials_error);
  });

  test('Verify Login with invalid username and correct password', async () => {

    await page.goto(page_url);
    await Promise.all([
      page.waitForNavigation(),
      page.click('text="login"')
    ]);
    await page.fill('input[name="Username"]', invalidusername);
    await page.fill('input[name="Password"]', password);
    await page.click('text="LOG IN"');
    await page.waitForTimeout(5000);
    const data = await page.screenshot({ path: './images/invalidusername.jpg' });
    await addAttach(data, "invalidusername");
    await page.waitForSelector(s_invalidcredentials_error);
  });


  test('Verify Login with invalid username and incorrect password', async () => {

    await page.goto(page_url);
    await Promise.all([
      page.waitForNavigation(),
      page.click('text="login"')
    ]);

    await page.fill('input[name="Username"]', invalidusername);
    await page.fill('input[name="Password"]', invalidPassword);
    await page.click('text="LOG IN"');
    await page.waitForTimeout(5000);
    const data = await page.screenshot({ path: './images/invalidusername&password.jpg' });
    await addAttach(data, "Invalid Username & Password");
    await page.waitForSelector(s_invalidcredentials_error);
  });

    test('Verify Login with valid username and password', async () => {

      await page.goto(page_url);
      await Promise.all([
        page.waitForNavigation(),
        page.click('text="login"')
      ]);
      await page.waitForTimeout(5000);// for demo purpose only
      await page.fill('input[name="Username"]', username);
      await page.fill('input[name="Password"]', password);
      //await page.click('text="LOG IN"');
      await page.click('//div//button[@value="login"]'); //xpath example
      await page.waitForNavigation();
      await page.waitForSelector(s_login_success);//Login Successfully if element found
      const data = await page.screenshot({ path: './images/login.jpg' });
      await addAttach(data, "Valid Credentials");
    });

    // test('Verify Logout page', async () => {
    //   await page.goto(page_url);
    //   await page.waitForNavigation();
    //   await Promise.all([
    //     page.waitForNavigation(/*{ url: 'https://localhost:5001/' }*/),
    //     page.click(s_logout_click)
    //   ]);
    //   await page.waitForSelector(s_login_link2);//waiting for landing page/Login selector to verify logout flow.
    //   const data = await page.screenshot({ path: './images/logout.jpg' });
    //   await addAttach(data, "Logout Success");

    // });
  });