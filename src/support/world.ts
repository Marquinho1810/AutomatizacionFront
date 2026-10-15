import { setWorldConstructor, World, IWorldOptions } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

/**
 * CustomWorld
 * -----------
 * "World" personalizado de Cucumber. Cucumber crea una nueva instancia
 * por cada escenario, lo que garantiza aislamiento entre pruebas.
 * Aquí centralizamos el navegador, el contexto, la página y las
 * instancias de los Page Objects para que los step definitions
 * puedan acceder a ellos mediante `this`.
 */
export class CustomWorld extends World {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;

  loginPage!: LoginPage;
  inventoryPage!: InventoryPage;
  cartPage!: CartPage;
  checkoutPage!: CheckoutPage;

  addedProductName = '';

  constructor(options: IWorldOptions) {
    super(options);
  }

  initPageObjects(): void {
    this.loginPage = new LoginPage(this.page);
    this.inventoryPage = new InventoryPage(this.page);
    this.cartPage = new CartPage(this.page);
    this.checkoutPage = new CheckoutPage(this.page);
  }
}

setWorldConstructor(CustomWorld);
