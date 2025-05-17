const TestSetup = require("../config/setup");
const RegistrationPage = require("../pages/RegistrationPage");

describe("User Registration Tests", () => {
  let setup;
  let registrationPage;

  beforeAll(async () => {
    setup = new TestSetup();
    await setup.initialize();
    registrationPage = new RegistrationPage(setup.driver);
  });

  afterEach(async () => {
    // Take screenshot on test failure
    if (expect.getState().currentTest.failed) {
      await setup.takeScreenshot(expect.getState().currentTest.name);
    }
  });

  afterAll(async () => {
    await setup.quit();
  });

  test("FR-001: Successful user registration", async () => {
    const timestamp = Date.now();
    const username = `seleniumuser_${timestamp}`;
    const email = `selenium_${timestamp}@test.com`;
    const password = "testpass123";

    await registrationPage.navigate();
    await registrationPage.registerUser(username, email, password);

    // Verify success by checking if we're redirected or get success message
    const currentUrl = await setup.driver.getCurrentUrl();
    expect(currentUrl).not.toBe(registrationPage.url);
  }, 10000);

  test("FR-002: Form validation for required fields", async () => {
    await registrationPage.navigate();
    await registrationPage.registerUser("", "invalid-email", "123");

    const errors = await registrationPage.getErrorMessages();
    expect(errors).toContain("Username is required");
    expect(errors).toContain("Email is invalid");
    expect(errors).toContain("Password must be at least 6 characters");
  }, 10000);

  test("API-002: Duplicate user handling through UI", async () => {
    const timestamp = Date.now();
    const username = `duplicateuser_${timestamp}`;
    const email = `duplicate_${timestamp}@test.com`;
    const password = "testpass123";

    // First registration
    await registrationPage.navigate();
    await registrationPage.registerUser(username, email, password);
    await setup.driver.wait(until.urlIs("http://localhost:3000/"), 5000);

    // Attempt duplicate registration
    await registrationPage.navigate();
    await registrationPage.registerUser(username, email, password);

    // Verify error message
    const alertText = await setup.driver.switchTo().alert().getText();
    expect(alertText).toContain("already exists");
    await setup.driver.switchTo().alert().accept();
  }, 15000);

  test("PERF-001: Registration response time", async () => {
    const timestamp = Date.now();
    const username = `perfuser_${timestamp}`;
    const email = `perf_${timestamp}@test.com`;
    const password = "testpass123";

    await registrationPage.navigate();
    const startTime = Date.now();
    await registrationPage.registerUser(username, email, password);
    const endTime = Date.now();
    const duration = endTime - startTime;

    console.log(`Registration took ${duration}ms`);
    expect(duration).toBeLessThan(2000);
  }, 10000);
});
