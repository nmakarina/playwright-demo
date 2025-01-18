import { expect, test } from "@playwright/test";
import { LoginPage } from "./pages/login-page.ts";
import { MainPage } from "./pages/main-page.ts";
import { RepoPage } from "./pages/repo-page.ts";

const loginUser = process.env.TEST_LOGIN;
const passUser = process.env.TEST_PASSWORD;

test.beforeEach(async ({ page }) => {
  await test.step("Authentication", async() => {
    if (!loginUser || !passUser) {
      throw Error(`Provide "TEST_LOGIN" and "TEST_PASSWORD" inside .env`);
    }
    const loginPage = new LoginPage(page);
    await loginPage.login(loginUser, passUser, page);
  })
});

test("Authentication. Viewing the main page. TEST CASE 0001", async ({ page }) => {
  const mainPage = new MainPage(page);
  await mainPage.checkMainElementsOfPage(page, test);
});


test("Export. TEST CASE 0002", async ({ page }) => {
  const mainPage = new MainPage(page);
  await mainPage.repoLink.first().click();
  const repoPage = new RepoPage(page);
  await repoPage.btnCode.click();
  const downloadPromise = page.waitForEvent("download");
  await repoPage.btnDownload.click();
  const download = await downloadPromise;
  const fileName = download.suggestedFilename();
  //await download.saveAs('e2e/download/'+fileName)
  expect(fileName.includes(".zip"), "Имя скаченного файла не соответствует ожидаемому! (" + fileName + ")")
  .toBeTruthy();

});

test.afterEach(async ({ page }, testInfo) => {
  const screenshot = await page.screenshot();
  await testInfo.attach("screenshot", { body: screenshot, contentType: "image/png" });
});

