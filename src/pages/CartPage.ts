import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * CartPage
 * --------
 * Representa la página del carrito de compras (cart.html).
 */
export class CartPage extends BasePage {
  private readonly cartItem = '.cart_item';
  private readonly cartItemName = '.inventory_item_name';
  private readonly checkoutButton = '#checkout';

  constructor(page: Page) {
    super(page);
  }

  async getCartItemNames(): Promise<string[]> {
    return this.page.locator(this.cartItemName).allTextContents();
  }

  async getCartItemsCount(): Promise<number> {
    return this.page.locator(this.cartItem).count();
  }

  async isProductInCart(productName: string): Promise<boolean> {
    const names = await this.getCartItemNames();
    return names.map((n) => n.trim()).includes(productName.trim());
  }

  async proceedToCheckout(): Promise<void> {
    await this.page.click(this.checkoutButton);
  }
}
