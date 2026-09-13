import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * LoginPage
 * ---------
 * Encapsula los elementos y acciones de la pantalla de inicio de sesión
 * de SauceDemo (https://www.saucedemo.com/).
 */
export class LoginPage extends BasePage {
  private readonly usernameInput = '#user-name';
  private readonly passwordInput = '#password';
  private readonly loginButton = '#login-button';
  private readonly errorMessage = '[data-test="error"]';

  constructor(page: Page) {
    super(page);
  }

  async open(): Promise<void> {
    await this.goto();
  }

  async login(username: string, password: string): Promise<void> {
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
  }

  async getErrorMessage(): Promise<string> {
    return this.getText(this.errorMessage);
  }

  async isErrorDisplayed(): Promise<boolean> {
    return this.isVisible(this.errorMessage);
  }
}
