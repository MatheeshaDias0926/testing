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

  // Add more UI/functional tests here
});
