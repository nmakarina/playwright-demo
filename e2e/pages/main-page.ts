import { expect, Locator, Page, test } from "@playwright/test";
import { BasePage } from "./base-page.ts";

export class MainPage extends BasePage {
  public readonly labelTopRepo: Locator;
  public readonly repoLink: Locator;

  constructor(public page: Page) {
    super(page);
    this.page = page;
    this.labelTopRepo = page.locator("//*[contains(.,'Top repositories')]").first();
    this.repoLink = page.locator("//a[@data-hovercard-type='repository']");
  }

  async checkMainElementsOfPage(): Promise<void> {
    await test.step("Verifying main elements of Main Page", async() => {
      await expect.soft(this.labelTopRepo, "label 'Top repositories' is visibled").toBeVisible();
      //Here you can verify any elements that you want to verify :)
    })
  }

}
