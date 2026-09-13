import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';

When('el usuario procede al checkout', async function (this: CustomWorld) {
  await this.cartPage.proceedToCheckout();
});

When(
  'el usuario completa la información de envío con nombre {string}, apellido {string} y código postal {string}',
  async function (this: CustomWorld, firstName: string, lastName: string, postalCode: string) {
    await this.checkoutPage.fillCustomerInformation(firstName, lastName, postalCode);
  }
);

When('el usuario finaliza la compra', async function (this: CustomWorld) {
  await this.checkoutPage.finishPurchase();
});

Then('el usuario debería ver el mensaje de confirmación {string}', async function (this: CustomWorld, expectedMessage: string) {
  expect(await this.checkoutPage.isPurchaseComplete()).toBeTruthy();
  const message = await this.checkoutPage.getConfirmationMessage();
  expect(message).toContain(expectedMessage);
});
