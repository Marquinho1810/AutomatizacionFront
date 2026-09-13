import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';

Given('que el usuario se encuentra en la página de inicio de sesión de SauceDemo', async function (this: CustomWorld) {
  await this.loginPage.open();
});

When('el usuario inicia sesión con el usuario {string} y contraseña {string}', async function (
  this: CustomWorld,
  username: string,
  password: string
) {
  await this.loginPage.login(username, password);
});

Then('el usuario debería ver la página de productos', async function (this: CustomWorld) {
  expect(await this.inventoryPage.isLoaded()).toBeTruthy();
  expect(this.page.url()).toContain('inventory.html');
});

Then('el usuario debería ver un mensaje de error {string}', async function (this: CustomWorld, expectedMessage: string) {
  expect(await this.loginPage.isErrorDisplayed()).toBeTruthy();
  const actualMessage = await this.loginPage.getErrorMessage();
  expect(actualMessage).toContain(expectedMessage);
});
