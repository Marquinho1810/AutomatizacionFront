import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * CheckoutPage
 * ------------
 * Representa el flujo de checkout de SauceDemo, compuesto por tres pasos:
 *  1. checkout-step-one.html  -> Información del cliente
 *  2. checkout-step-two.html  -> Resumen de la orden
 *  3. checkout-complete.html  -> Confirmación de la compra
 */
export class CheckoutPage extends BasePage {
  // Step One
  private readonly firstNameInput = '#first-name';
  private readonly lastNameInput = '#last-name';
  private readonly postalCodeInput = '#postal-code';
  private readonly continueButton = '#continue';

  // Step Two
  private readonly finishButton = '#finish';
  private readonly summaryTotalLabel = '.summary_total_label';

  // Complete
  private readonly completeHeader = '.complete-header';
  private readonly backHomeButton = '#back-to-products';

  constructor(page: Page) {
    super(page);
  }

  async fillCustomerInformation(firstName: string, lastName: string, postalCode: string): Promise<void> {
    await this.page.fill(this.firstNameInput, firstName);
    await this.page.fill(this.lastNameInput, lastName);
    await this.page.fill(this.postalCodeInput, postalCode);
    await this.page.click(this.continueButton);
  }

  async getOrderTotal(): Promise<string> {
    return this.getText(this.summaryTotalLabel);
  }

  async finishPurchase(): Promise<void> {
    await this.page.click(this.finishButton);
  }

  async getConfirmationMessage(): Promise<string> {
    return this.getText(this.completeHeader);
  }

  async isPurchaseComplete(): Promise<boolean> {
    return this.isVisible(this.completeHeader);
  }

  async backToProducts(): Promise<void> {
    await this.page.click(this.backHomeButton);
  }
}
