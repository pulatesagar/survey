
import { chromium, Browser, Page, BrowserContext } from 'playwright';
const { addAttach } = require("jest-html-reporters/helper");

var browser: Browser, page: Page, context: BrowserContext;
let createSurveyPageUrl = 'http://survey-ui.s3-website-us-east-1.amazonaws.com/';
var createSurveyButton = 'text="Create New Survey"';
var surveyStatus = '//*[@id="inlineRadio1"]';
var surveyName = 'input[type="text"]';
var surveyStatusValue = 'Active'
var surveyNameValue = 'eGain Survey';
var surveyExpiry = 'input[type="date"]';
var surveyUrl = '//div[normalize-space(.)=\'Survey URL\']/div/input[normalize-space(@type)=\'text\']';
var surveyUrlValue = 'https://www.egain.com/';
var surveyFromEmailAddress = '//div[normalize-space(.)=\'Survey From Email Address\']/div/input[normalize-space(@type)=\'text\']';
var surveyFromEmailAddressValue = 'sagarpulate@gmail.com';
var surveyTriggerCaseClosure = 'input[type="checkbox"]';
var surveyTriggerActivityClosure = '//div[normalize-space(.)=\'Activity Closure\']/input[normalize-space(@type)=\'checkbox\']';
var surveyAccessabilityOption = 'select[id="inputState"]';
var surveyAccessabilityOptionValue = 'UserGroup';

// browser setup
beforeAll(async () => {
  browser = await chromium.launch({ headless: false, slowMo:10});
  context = await browser.newContext();
  page = await context.newPage();
  await page.goto(createSurveyPageUrl);
  
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
    let month, day, finalSurveyExpiryDate;
    var currentDate = new Date();
    var surveyDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + a);
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

    finalSurveyExpiryDate = yyyy + "-" + mm + "-" + day;
    // Click on create survey button and navigate to survey form
    await page.click(createSurveyButton);
    // Select Active status
    await page.check(surveyStatus);
    // Enter Survey Name
    await page.type(surveyName, surveyNameValue + " " + a);
    // Fill Survey Expiry Date
    await page.fill(surveyExpiry, finalSurveyExpiryDate);
    // Enter Survey URL
    await page.type(surveyUrl, surveyUrlValue);
    // Enter Survey From Email Address
    await page.type(surveyFromEmailAddress, surveyFromEmailAddressValue);
    // Select Survey Trigger
    await page.check(surveyTriggerCaseClosure);
    await page.check(surveyTriggerActivityClosure);
    // Select different options from dropdown
    if(a < 4)
    {
    await page.selectOption(surveyAccessabilityOption, surveyAccessabilityOptionValue+a);
    }
    else
    {
      surveyAccessabilityOptionValue = 'UserGroup1';
      await page.selectOption(surveyAccessabilityOption, surveyAccessabilityOptionValue);
    }

    // Submit the form
    await page.click('text="Submit"');

    // page scraping for data verification for created survey name
    const createdSurvey = await page.textContent('//html/body/div/div/div[2]/table/tbody/tr/td[1]');

    // demo purpose, print created survey name
    console.log("Created survey is:" + " " +createdSurvey); 

    // page scraping for data verification for selected survey status
    const surveyStatusCheck = await page.textContent('//html/body/div/div/div[2]/table/tbody/tr/td[5]');

    // demo purpose, print created survey status
    console.log("Created survey status is:" + " " +surveyStatusCheck);  

    // verify the created survey appears on page and are same value
    expect(createdSurvey).toBe(surveyNameValue + " " + a);

    // verify the selected survey status appears on page and are same value
    expect(surveyStatusCheck).toBe(surveyStatusValue);

    // take a screenshot of created survey
    const data = await page.screenshot({ path: './images/Survey.jpg'});

    // attach screenshot to report
    await addAttach(data, "Survey"+ " " +a);

    // demo purpose
    await page.waitForTimeout(1000) 

  });

});

