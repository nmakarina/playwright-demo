import { test } from "@playwright/test";
import { LoginPage } from "./pages/login-page.ts";
import { MainPage } from "./pages/main-page.ts";

const loginUser = process.env.TEST_LOGIN;
const passUser = process.env.TEST_PASSWORD;

test.beforeEach(async ({ page }) => {
  await test.step("Authentication", async() => {
    if (!loginUser || !passUser) {
      throw Error(`Provide "TEST_LOGIN" and "TEST_PASSWORD" inside .env`);
    }
    const loginPage = new LoginPage(page);
    await loginPage.login(loginUser, passUser, page);
    //await page.waitForTimeout(2000);
  })
});

test("Authentication. Viewing the main page. TEST CASE 0001", async ({ page, context }) => {
  const mainPage = new MainPage(page);
  await mainPage.checkMainElementsOfPage(page, test);
  await page.waitForTimeout(2000);

});


test.afterEach(async ({ page }, testInfo) => {
  const screenshot = await page.screenshot();
  await testInfo.attach("screenshot", { body: screenshot, contentType: "image/png" });
});

