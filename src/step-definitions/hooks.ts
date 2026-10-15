import { Before, After, AfterStep, Status, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium } from '@playwright/test';
import { CustomWorld } from '../support/world';

const HEADLESS = process.env.HEADLESS !== 'false';

// slowMo: Seteado en 1200 milisegundos solo con fines de VISUALIZACIÓN al correr en modo headed.
// Setear en 0 para uso en CI/headless.
const SLOWMO = Number(process.env.SLOWMO) || 1200;

setDefaultTimeout(30 * 1000 + SLOWMO * 20);

Before(async function (this: CustomWorld) {
  this.browser = await chromium.launch({ headless: HEADLESS, slowMo: SLOWMO, args: ['--lang=en-US', '--disable-features=Translate,TranslateUI'] });
  this.context = await this.browser.newContext({
    viewport: { width: 1280, height: 800 },
    locale: 'en-US'
  });
  this.page = await this.context.newPage();
  this.initPageObjects();
});

AfterStep(async function (this: CustomWorld, { result }) {
  // Adjunta una captura de pantalla al reporte cuando un step falla.
  if (result?.status === Status.FAILED && this.page) {
    const screenshot = await this.page.screenshot();
    this.attach(screenshot, 'image/png');
  }
});

After(async function (this: CustomWorld) {
  await this.page?.close();
  await this.context?.close();
  await this.browser?.close();
});