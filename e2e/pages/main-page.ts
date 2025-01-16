import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./base-page.ts";

export class MainPage extends BasePage {
  public readonly labelTopRepo: Locator;

  constructor(public page: Page) {
    super(page);
    this.page = page;
    this.labelTopRepo = page.locator("//*[contains(.,'Top repositories')]").first();
  }

  async checkMainElementsOfPage(page, test): Promise<void> {
    await test.step("Verifying main elements of Main Page", async() => {
      await expect.soft(this.labelTopRepo, "label 'Top repositories' is visibled").toBeVisible();
    })
  }

}
