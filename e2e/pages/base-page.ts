import { expect, Locator, Page, test } from "@playwright/test";

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

  async isLoad(url: string): Promise<void> {
    const currentUrl = this.page.url();
  }

}
