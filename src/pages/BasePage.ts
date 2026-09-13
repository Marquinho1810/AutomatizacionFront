import { Page } from '@playwright/test';

/**
 * BasePage
 * ---------
 * Clase base del patrón Page Object Model (POM).
 * Todas las páginas concretas heredan de esta clase para reutilizar
 * comportamientos comunes (navegación, esperas, utilidades) y evitar
 * duplicación de código.
 */
export class BasePage {
  protected readonly page: Page;
  protected readonly baseUrl = 'https://www.saucedemo.com/';

  constructor(page: Page) {
    this.page = page;
  }

  async goto(path = ''): Promise<void> {
    await this.page.goto(`${this.baseUrl}${path}`);
  }

  async getTitle(): Promise<string> {
    return this.page.title();
  }

  /**
   * Espera activamente (hasta `timeout` ms) a que el elemento esté visible.
   */
  async isVisible(selector: string, timeout = 8000): Promise<boolean> {
    try {
      await this.page.locator(selector).waitFor({ state: 'visible', timeout });
      return true;
    } catch {
      return false;
    }
  }

  async getText(selector: string): Promise<string> {
    return (await this.page.locator(selector).textContent())?.trim() ?? '';
  }
}
