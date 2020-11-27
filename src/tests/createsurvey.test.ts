
import { chromium, Browser, Page, BrowserContext } from 'playwright';
const { addAttach } = require("jest-html-reporters/helper");

// variables and selectors declaration
let browser: Browser;
let page: Page;
let context: BrowserContext;
let create_survey_page_url = 'http://survey-ui.s3-website-us-east-1.amazonaws.com/';
let s_create_survey_button = 'text="Create New Survey"';
let s_survey_status = '//*[@id="inlineRadio1"]';
let s_survey_status_value = 'Active';
let s_survey_name = 'input[type="text"]';
let s_survey_name_value = 'eGain Survey';
let s_survey_expiry = 'input[type="date"]';
let s_survey_url = '//div[normalize-space(.)=\'Survey URL\']/div/input[normalize-space(@type)=\'text\']';
let s_survey_url_value = 'https://www.egain.com/';
let s_survey_from_email_address = '//div[normalize-space(.)=\'Survey From Email Address\']/div/input[normalize-space(@type)=\'text\']';
let s_survey_from_email_address_value = 'sagarpulate@gmail.com';
let s_survey_trigger_caseclosure = 'input[type="checkbox"]';
let s_survey_trigger_activityclosure = '//div[normalize-space(.)=\'Activity Closure\']/input[normalize-space(@type)=\'checkbox\']';
let s_survey_accessability_option = 'select[id="inputState"]';
let s_survey_accessability_option_value = 'UserGroup';

// browser setup
beforeAll(async () => {
  browser = await chromium.launch({ headless: false, slowMo:10});
  context = await browser.newContext();
  page = await context.newPage();
  await page.goto(create_survey_page_url);
  
});
// object dispose
afterAll(async () => {
  await page.close();
  await context.close();
  await browser.close();
});

describe('Create Survey Scenarios', () => {

  test.each([[1], [2], [3], [4], [5]])

    ('Create Survey %i', async (a) => {
    let month, day, finalSurveyDate;
    var oldDate = new Date();
    var surveyDate = new Date(oldDate.getFullYear(), oldDate.getMonth(), oldDate.getDate() + a);
    var mm = surveyDate.getMonth() + 1; // added 1 to get correct current month
    var dd = surveyDate.getDate(); // increment day's by 1
    var yyyy = surveyDate.getFullYear(); 
    // checking date formart is less than two digit, then appending 0 before the day 
    if (dd < 10) {
      day = '0' + dd.toString();
    }
    else
    {
      day=dd.toString();
    }
    // checking month formart is less than two digit, then appending 0 before the month 
    if (mm < 10) {
      month = '0' + mm.toString();
    }
    else
    {
      month=mm.toString();
    }

    finalSurveyDate = yyyy + "-" + mm + "-" + day;
    // Click on create survey button and navigate to survey form
    await page.click(s_create_survey_button);
    // Select Active status
    await page.check(s_survey_status);
    // Enter Survey Name
    await page.type(s_survey_name, s_survey_name_value + " " + a);
    // Fill Survey Expiry Date
    await page.fill(s_survey_expiry, finalSurveyDate);
    // Enter Survey URL
    await page.type(s_survey_url, s_survey_url_value);
    // Enter Survey From Email Address
    await page.type(s_survey_from_email_address, s_survey_from_email_address_value);
    // Select Survey Trigger
    await page.check(s_survey_trigger_caseclosure);
    await page.check(s_survey_trigger_activityclosure);
    // Select different options from dropdown
    if(a < 4)
    {
    await page.selectOption(s_survey_accessability_option, s_survey_accessability_option_value+a);
    }
    else
    {
      s_survey_accessability_option_value = 'UserGroup1';
      await page.selectOption(s_survey_accessability_option, s_survey_accessability_option_value);
    }
    // Submit the form
    await page.click('text="Submit"');
    // page scraping for data verification for created survey name
    const createdsurvey = await page.textContent('//html/body/div/div/div[2]/table/tbody/tr/td[1]');
    // demo purpose, print created survey name
    console.log("Created survey is" + " " +createdsurvey); 
    // page scraping for data verification for selected survey status
    const surveystatus = await page.textContent('//html/body/div/div/div[2]/table/tbody/tr/td[5]');
    // demo purpose, print created survey status
    console.log("Created survey status is" + " " +surveystatus);  
    // verify the created survey appears on page and are same value
    expect(createdsurvey).toBe(s_survey_name_value + " " + a);
    // verify the selected survey status appears on page and are same value
    expect(surveystatus).toBe(s_survey_status_value);
    // take a screenshot of created survey
    const data = await page.screenshot({ path: './images/Survey.jpg'});
    // attach screenshot to report
    await addAttach(data, "Survey"+ " " +a);
    // demo purpose
    await page.waitForTimeout(1000) 
  });
});

