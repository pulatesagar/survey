
import { chromium, Browser, Page, BrowserContext } from 'playwright';
const { addAttach } = require("jest-html-reporters/helper");

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


beforeAll(async () => {
  browser = await chromium.launch({ headless: false, slowMo:10});
  context = await browser.newContext();
  page = await context.newPage();
  await page.goto(create_survey_page_url);
  
});

afterAll(async () => {
  await page.close();
  await context.close();
  await browser.close();
});

beforeEach(async () => {
  
});

afterEach(async () => {
  
});


describe('Create Survey Scenarios', () => {
  test.each([[1], [2], [3], [4], [5]])
    ('Create Survey %i', async (a) => {
    let month, day, finalSurveyDate;
    var oldDate = new Date();
    var surveyDate = new Date(oldDate.getFullYear(), oldDate.getMonth(), oldDate.getDate() + a);
    var mm = surveyDate.getMonth() + 1;
    var dd = surveyDate.getDate(); // increment day's by 1
    var yyyy = surveyDate.getFullYear();  
    if (dd < 10) {
      day = '0' + dd.toString();
    }
    else
    {
      day=dd.toString();
    }

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
    // Fill survey
    await page.type(s_survey_name, s_survey_name_value + " " + a);
    await page.fill(s_survey_expiry, finalSurveyDate);
    await page.type(s_survey_url, s_survey_url_value);
    await page.type(s_survey_from_email_address, s_survey_from_email_address_value);
    await page.check(s_survey_trigger_caseclosure);
    await page.check(s_survey_trigger_activityclosure);
    if(a < 4)
    {
    await page.selectOption(s_survey_accessability_option, s_survey_accessability_option_value+a);
    }
    else
    {
      s_survey_accessability_option_value = 'UserGroup1';
      await page.selectOption(s_survey_accessability_option, s_survey_accessability_option_value);
    }
    // Click text="Submit"
    await page.click('text="Submit"');
    // await page.waitForSelector('text="eGain Survey 1"');
    // await page.waitForSelector('text="Active"');
    const createdsurvey = await page.textContent('//html/body/div/div/div[2]/table/tbody/tr/td[1]');
    console.log("Created survey is" + " " +createdsurvey);
    const surveystatus = await page.textContent('//html/body/div/div/div[2]/table/tbody/tr/td[5]');
    console.log("Created survey status is" + " " +surveystatus);
    expect(createdsurvey).toBe(s_survey_name_value + " " + a);
    expect(surveystatus).toBe(s_survey_status_value);

    
    const data = await page.screenshot({ path: './images/Survey.jpg'});
    await addAttach(data, "Survey"+ " " +a);
    await page.waitForTimeout(1000)
  });
});

