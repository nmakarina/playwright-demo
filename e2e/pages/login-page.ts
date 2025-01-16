import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./base-page.ts";

export class LoginPage extends BasePage {
  public readonly inputLogin: Locator;
  public readonly inputPassword: Locator;
  public readonly btnAuth: Locator;


  constructor(public page: Page) {
    super(page);
    this.page = page;
    this.inputLogin = page.locator("#login_field");
    this.inputPassword = page.locator("#password");
    this.btnAuth = page.locator("//input[@name='commit']").first();
  }


  async login(login: string, password: string, page: Page): Promise<void> {
    await page.goto("/");
    const pageUrl = page.url();
    const urlObject = new URL(pageUrl);
    if (urlObject.hostname !== "localhost") {
      await page.goto("/login");
      await this.inputLogin.fill(login);
      await this.inputPassword.fill(password);
      await this.btnAuth.click();
    }
  }
}