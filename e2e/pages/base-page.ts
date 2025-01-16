import { expect, Locator, Page, test } from "@playwright/test";

export class BasePage {
  public readonly backwardButton: Locator;


  constructor(public page: Page) {
    this.page = page;
    this.backwardButton = page.locator(".main-title__back-btn");
 
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

  async waitPageLoaded(page, headerText: string) {
    await expect(
      page.locator(".main-header__heading").locator("//*[contains(text(),'" +
          headerText +
          "')])",
      ),
      "Заголовок " + headerText + " отсутствует",
    ).toBeVisible();
  }

  async clickCloseButton(page): Promise<void> {
    page.getByRole("button", { name: "Выйти" }).click();
  }

}
