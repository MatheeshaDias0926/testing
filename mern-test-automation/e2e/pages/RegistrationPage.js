const { By, until } = require("selenium-webdriver");

class RegistrationPage {
  constructor(driver) {
    this.driver = driver;
    this.url = "http://localhost:3000/register";
    this.usernameField = By.id("username");
    this.emailField = By.id("email");
    this.passwordField = By.id("password");
    this.submitButton = By.id("submit-btn");
    this.errorMessages = By.className("error");
  }

  async navigate() {
    await this.driver.get(this.url);
    await this.driver.wait(until.elementLocated(this.usernameField));
  }

  async registerUser(username, email, password) {
    await this.driver.findElement(this.usernameField).sendKeys(username);
    await this.driver.findElement(this.emailField).sendKeys(email);
    await this.driver.findElement(this.passwordField).sendKeys(password);
    await this.driver.findElement(this.submitButton).click();
  }

  async getErrorMessages() {
    const elements = await this.driver.findElements(this.errorMessages);
    return Promise.all(elements.map((el) => el.getText()));
  }
}

module.exports = RegistrationPage;
