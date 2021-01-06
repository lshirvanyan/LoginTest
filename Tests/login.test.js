const { TestScheduler } = require('jest');
const { chromium } = require('playwright');
const { LoginPage } = require('../Pages/Login.js');
var loginPage;
var browser;

beforeAll(async () => {
  browser = await chromium.launch({headless: false});
});
afterAll(async () => {
  await browser.close();
});
beforeEach(async () => {
  page = await browser.newPage();
  loginPage = new LoginPage(page);
  await loginPage.Navigate();
});
afterEach(async () => {
  await page.close();
});

test("Login with valid data", async () => {    
    await loginPage.CheckLoginWithValidInput('admin', 'admin');
});

test("Check login is not submitted when Username field is empty", async () => {    
    await loginPage.CheckLoginFieldsToBeValid('', 'admin');
});

test("Check login is not submitted when Password field is empty", async () => {    
    await loginPage.CheckLoginFieldsToBeValid('admin', '');
});

test("Check login is not submitted when Username field is incorrect", async () => {    
    await loginPage.CheckLoginFieldsToBeValid('admin1', 'admin');
});

test("Check login is not submitted when Password field is incorrect", async () => {    
    await loginPage.CheckLoginFieldsToBeValid('admin', 'admin2');
});