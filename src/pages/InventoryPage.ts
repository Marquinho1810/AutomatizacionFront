import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * InventoryPage
 * -------------
 * Representa la página de listado de productos (inventory.html),
 * a la que se accede tras un login exitoso.
 */
export class InventoryPage extends BasePage {
  private readonly inventoryItem = '.inventory_item';
  private readonly cartBadge = '.shopping_cart_badge';
  private readonly cartLink = '.shopping_cart_link';
  private readonly pageTitle = '.title';

  constructor(page: Page) {
    super(page);
  }

  private addToCartButtonFor(productName: string): string {
    const slug = productName
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');
    return `#add-to-cart-${slug}`;
  }

  async isLoaded(): Promise<boolean> {
    return this.isVisible(this.pageTitle);
  }

  async addProductToCartByName(productName: string): Promise<void> {
    const item = this.page.locator(this.inventoryItem).filter({ hasText: productName });
    await item.getByRole('button', { name: /add to cart/i }).click();
  }

  async addFirstAvailableProductToCart(): Promise<string> {
    const firstItem = this.page.locator(this.inventoryItem).first();
    const name = (await firstItem.locator('.inventory_item_name').textContent())?.trim() ?? '';
    await firstItem.getByRole('button', { name: /add to cart/i }).click();
    return name;
  }

  async getCartBadgeCount(): Promise<number> {
    // Timeout corto: si el carrito está vacío, el badge nunca aparece,
    // y eso es un estado válido (no un fallo) que no debe demorar la prueba.
    const visible = await this.isVisible(this.cartBadge, 2000);
    if (!visible) return 0;
    const text = await this.getText(this.cartBadge);
    return Number(text || 0);
  }

  async goToCart(): Promise<void> {
    await this.page.click(this.cartLink);
  }
}
