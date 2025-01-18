import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./base-page.ts";

export class RepoPage extends BasePage {
  public readonly btnCode: Locator;
  public readonly btnDownload: Locator;

  constructor(public page: Page) {
    super(page);
    this.page = page;
    this.btnCode = page.locator("//*[@data-component='text' and .='Code']").first();
    this.btnDownload = page.getByText("Download ZIP").first();
  }


}