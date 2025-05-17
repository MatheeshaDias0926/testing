const { Builder, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const path = require("path");

class TestSetup {
  constructor() {
    this.driver = null;
  }

  async initialize() {
    this.driver = await new Builder()
      .forBrowser("chrome")
      .setChromeOptions(
        new chrome.Options()
          .addArguments("--headless=new")
          .addArguments("--no-sandbox")
          .addArguments("--disable-dev-shm-usage")
      )
      .build();
    await this.driver.manage().window().setRect({ width: 1280, height: 1024 });
    await this.driver.manage().setTimeouts({ implicit: 5000 });
  }

  async quit() {
    if (this.driver) {
      await this.driver.quit();
    }
  }

  async takeScreenshot(testName) {
    if (this.driver) {
      const screenshot = await this.driver.takeScreenshot();
      require("fs").writeFileSync(
        path.join(__dirname, `../../screenshots/${testName}.png`),
        screenshot,
        "base64"
      );
    }
  }
}

module.exports = TestSetup;
