// Functional and UI tests using Selenium WebDriver
const { Builder, By, until } = require("selenium-webdriver");
const assert = require("assert");

describe("UI & Functional Tests", function () {
  let driver;
  this.timeout(30000);

  before(async () => {
    driver = await new Builder().forBrowser("chrome").build();
  });

  after(async () => {
    await driver.quit();
  });

  it("should load the login page", async () => {
    await driver.get("http://localhost:3000/login");
    const title = await driver.getTitle();
    assert.ok(title.includes("React App"));
  });

  it("UI-001: should render registration form fields", async () => {
    await driver.get("http://localhost:3000/register");
    const username = await driver.findElement(By.name("username"));
    const email = await driver.findElement(By.name("email"));
    const password = await driver.findElement(By.name("password"));
    assert.ok(username && email && password);
  });

  it("UI-002: should handle form input interactions", async () => {
    await driver.get("http://localhost:3000/register");
    const username = await driver.findElement(By.name("username"));
    const email = await driver.findElement(By.name("email"));
    const password = await driver.findElement(By.name("password"));
    // Type and clear
    await username.sendKeys("testuser");
    await username.clear();
    await username.sendKeys("testuser2");
    // Tab navigation
    await username.sendKeys("\uE004"); // Tab key
    const active = await driver.switchTo().activeElement();
    // Focus state: check that the email input is now focused
    const emailIsFocused =
      (await email.getAttribute("id")) === (await active.getAttribute("id"));
    assert.ok(emailIsFocused, "Email input should be focused after tab");
  });

  // Add more UI/functional tests here
});
