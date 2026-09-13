import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';

Given('que el usuario inició sesión como {string}', async function (this: CustomWorld, username: string) {
  await this.loginPage.open();
  await this.loginPage.login(username, 'secret_sauce');
});

Given('el usuario agregó el producto {string} al carrito', async function (this: CustomWorld, productName: string) {
  await this.inventoryPage.addProductToCartByName(productName);
});

When('el usuario agrega el producto {string} al carrito', async function (this: CustomWorld, productName: string) {
  await this.inventoryPage.addProductToCartByName(productName);
});

When('el usuario abre el carrito de compras', async function (this: CustomWorld) {
  await this.inventoryPage.goToCart();
});

Then('el badge del carrito debería mostrar {string}', async function (this: CustomWorld, expectedCount: string) {
  const count = await this.inventoryPage.getCartBadgeCount();
  expect(count).toBe(Number(expectedCount));
});

Then('el producto {string} debería estar visible en el carrito', async function (this: CustomWorld, productName: string) {
  const isPresent = await this.cartPage.isProductInCart(productName);
  expect(isPresent).toBeTruthy();
});
