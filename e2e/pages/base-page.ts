import { expect, Locator, Page, test, TestInfo } from "@playwright/test";

export class BasePage {

  constructor(public page: Page) {
    this.page = page;
  }

  async reload(): Promise<void> {
    const currentUrl = this.page.url();
    await test.step(`Reloading page "${currentUrl}"`, async () => {
      await this.page.reload({ waitUntil: "domcontentloaded" });
    });
  }

  isLoad(url: string): boolean {
    const currentUrl = this.page.url();
    return currentUrl.includes(url);
  }

  async verifyDownloadFile(downloadButton: Locator, expectedFileName: string): Promise<void> {
    await test.step(`Verify that file is downloaded`, async () => {
      const downloadPromise = this.page.waitForEvent("download");
      await downloadButton.click();
      const download = await downloadPromise;
      const fileName = download.suggestedFilename();
      expect.soft(fileName.includes(expectedFileName), `File (${fileName}) is downloaded`)
        .toBeTruthy();
    })
  };

  async after(testInfo: TestInfo): Promise<void> {
    const screenshot = await this.page.screenshot();
    await testInfo.attach("screenshot after test", { body: screenshot, contentType: "image/png" });
  };

}
