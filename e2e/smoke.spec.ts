//import { expect, test } from "@playwright/test";
import { RepoPage } from "./pages/repo-page.ts";
import { test, expect } from './fixtures/test-fixture.ts';
import { MainPage } from "./pages/main-page.ts";


test("Authentication. Viewing the main page. TEST CASE 0001", async ({ page }) => {
  const mainPage = new MainPage(page);
  await mainPage.checkMainElementsOfPage();
});


test("Export repo zip-file. TEST CASE 0002",
  { annotation: { type: "BUG", description: "<bug link>" } },
  async ({ page }) => {
    const mainPage = new MainPage(page);
    await test.step(`Select first repo`, async () => {
      await mainPage.repoLink.first().click();
    });
    const repoPage = new RepoPage(page);
    await test.step(`Downloading ZIP`, async () => {
      await repoPage.btnCode.click();
      await repoPage.verifyDownloadFile(repoPage.btnDownload, ".zip");
    })
  });


