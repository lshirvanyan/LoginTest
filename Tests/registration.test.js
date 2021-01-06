const { TestScheduler } = require('jest');
const { chromium } = require('playwright');
const { RegistrationPage } = require('../Pages/Registration.js');
var registrationPage;
var browser;

beforeAll(async () => {
  browser = await chromium.launch({headless: false});
});
afterAll(async () => {
  await browser.close();
});
beforeEach(async () => {
  page = await browser.newPage();
  registrationPage = new RegistrationPage(page);
  await registrationPage.Navigate();
});
afterEach(async () => {
  await page.close();
});

test("Create new account with valid data", async () => {    
    await registrationPage.CheckRegistrationWithValidInput('FName', 'LName', 'Email@test.com', 'Password', 'Password');
});

test("Check the form is not submitted when First Name field is empty", async () => {    
  await registrationPage.CheckFormFieldsToBeValid('', 'LName', 'Email@test.com', 'Password', 'Password');
});

test("Check the form is not submitted when Last Name field is empty", async () => {    
  await registrationPage.CheckFormFieldsToBeValid('FName', '', 'Email@test.com', 'Password', 'Password');
});

test("Check the form is not submitted when Email field is empty", async () => {    
  await registrationPage.CheckFormFieldsToBeValid('FName', 'LName', '', 'Password', 'Password');
});

test("Check the form is not submitted when Password field is empty", async () => {    
  await registrationPage.CheckFormFieldsToBeValid('FName', 'LName', 'Email@test.com', '', 'Password');
});

test("Check the form is not submitted when Confirm Password field is empty", async () => {    
  await registrationPage.CheckFormFieldsToBeValid('FName', 'LName', 'Email@test.com', 'Password', '');
});

test("Check the form is not submitted when Password and Confirm Password fields not matched", async () => {    
    await registrationPage.CheckPasswordFieldsValidation('FName', 'LName', 'Email@test.com', 'Password1', 'Password');
});

test("Check the form is not submitted when try to input not valid email", async () => {    
  await registrationPage.CheckFormFieldsToBeValid('FName', 'LName', 'Email', 'Password1', 'Password');
});

test("Check the form is not submitted when Accept Terms checkbox is unchecked", async () => {    
  await registrationPage.CheckFormFieldsToBeValid('FName', 'LName', 'Email', 'Password1', 'Password', false);
});
