# Reto de Automatización QA – FrontEnd (SauceDemo) - SOAINT

Suite de pruebas automatizadas end-to-end para [SauceDemo](https://www.saucedemo.com/), construida con **Playwright** + **Cucumber (Gherkin)** y el patrón **Page Object Model (POM)**.

## 📋 Contenido

- [Objetivo](#objetivo)
- [Stack tecnológico](#stack-tecnológico)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Requisitos previos](#requisitos-previos)
- [Instalación](#instalación)
- [Ejecución de los tests](#ejecución-de-los-tests)
- [Reporte de resultados](#reporte-de-resultados)
- [Estrategia de automatización](#estrategia-de-automatización)
- [Credenciales de prueba](#credenciales-de-prueba)

## Objetivo

Automatizar el flujo solicitado en el reto técnico para SauceDemo: **login → agregar productos al carrito → checkout completo**, cubriendo también escenarios negativos (credenciales inválidas, usuario bloqueado).

## Stack tecnológico

| Herramienta | Uso |
|---|---|
| [Playwright](https://playwright.dev/) | Motor de automatización de navegador |
| [Cucumber.js](https://github.com/cucumber/cucumber-js) | Ejecución de escenarios en Gherkin (BDD) |
| TypeScript | Lenguaje de programación |
| multiple-cucumber-html-reporter | Reporte HTML enriquecido |

## Estructura del proyecto

```
sauce-demo-automation/
├── src/
│   ├── features/                  # Escenarios en Gherkin (.feature)
│   │   ├── login.feature
│   │   ├── cart.feature
│   │   └── checkout.feature
│   ├── step-definitions/          # Implementación de los steps
│   │   ├── login.steps.ts
│   │   ├── cart.steps.ts
│   │   ├── checkout.steps.ts
│   │   └── hooks.ts               # Before/After (ciclo de vida del navegador)
│   ├── pages/                     # Page Object Model
│   │   ├── BasePage.ts
│   │   ├── LoginPage.ts
│   │   ├── InventoryPage.ts
│   │   ├── CartPage.ts
│   │   └── CheckoutPage.ts
│   └── support/
│       ├── world.ts                # Cucumber World personalizado
│       └── generate-report.js      # Generador de reporte HTML
├── cucumber.js                     # Configuración de Cucumber
├── tsconfig.json
├── package.json
└── README.md
```

## Requisitos previos

| Herramienta | Versión recomendada | Versión mínima soportada |
|---|---|---|
| [Node.js](https://nodejs.org/) | **22 LTS** o **24 LTS** | 20.11.0 (primera LTS con soporte completo de las APIs usadas por `@types/node@22`, Playwright 1.50 y TypeScript 5.7) |
| npm | 10.9.x (incluido con Node 22 LTS) o 11.x (incluido con Node 24 LTS) | 10.2.4 |

## Instalación

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/Marquinho1810/AutomatizacionFront
   cd AutomatizacionFront
   ```

2. Instalar dependencias:
   ```bash
   npm install
   ```

3. Instalar los navegadores de Playwright:
   ```bash
   npx playwright install --with-deps chromium
   ```

## Ejecución de los tests

Ejecutar toda la suite (modo headless por defecto):

```bash
npm test
```

Ejecutar en modo visible (ver el navegador mientras corre):

```bash
# macOS / Linux
HEADLESS=false npm test

# Windows PowerShell
$env:HEADLESS="false"; npm test
```

Ejecutar solo un subconjunto de escenarios por tag (por ejemplo, solo smoke tests):

```bash
npx cucumber-js --tags "@smoke"
```

`--tags` Para combinar tags, usa los operadores lógicos `and` / `or` / `not` dentro de esa misma cadena:

```bash
# Escenarios de login que además sean positivos (AND)
npx cucumber-js --tags "@login and @positive"

# Escenarios de login O positivos (OR)
npx cucumber-js --tags "@login or @positive"

# Todos menos los negativos (NOT)
npx cucumber-js --tags "not @negative"
```

Otros tags disponibles: `@login`, `@cart`, `@checkout`, `@positive`, `@negative`, `@locked`, `@e2e`.

## Reporte de resultados

Tras ejecutar los tests se genera un reporte JSON (`reports/cucumber-report.json`) y un HTML básico (`reports/cucumber-report.html`). Para generar un reporte HTML enriquecido con gráficos, ejecutar:

```bash
npm run test:report
```

El reporte final se genera en: `reports/html-report/index.html` — ábrelo en cualquier navegador.

Si un escenario falla, el hook `AfterStep` adjunta automáticamente una captura de pantalla al reporte, facilitando el diagnóstico.

## Estrategia de automatización

### Patrón de diseño: Page Object Model (POM)

Cada pantalla de la aplicación (Login, Inventario, Carrito, Checkout) se modela como una clase independiente dentro de `src/pages/`. Estas clases:

- Encapsulan los **selectores** de la UI (si SauceDemo cambia un selector, solo se actualiza en un lugar).
- Exponen **métodos de negocio** (`login()`, `addProductToCartByName()`, `proceedToCheckout()`) en lugar de exponer detalles de implementación a los steps.
- Heredan de `BasePage`, que centraliza utilidades comunes (navegación, esperas, lectura de texto).

Esto separa claramente **qué hace la prueba** (steps/features) de **cómo interactúa con la UI** (page objects), mejorando el mantenimiento y la legibilidad.

### BDD con Cucumber/Gherkin

Los escenarios se escriben en **español**, en lenguaje natural (Gherkin), lo que permite que perfiles no técnicos (QA manual, negocio) puedan leer y validar los criterios de aceptación directamente. Se usa:

- `Background` para evitar repetir pasos comunes (por ejemplo, el login previo).
- `Scenario Outline` + `Examples` para cubrir múltiples combinaciones de credenciales inválidas sin duplicar escenarios.
- Tags (`@smoke`, `@positive`, `@negative`, etc.) para poder ejecutar subconjuntos específicos de la suite (por ejemplo, en un pipeline de CI rápido solo se corren los `@smoke`).

### World personalizado

`CustomWorld` (en `src/support/world.ts`) centraliza el `browser`, `context`, `page` y las instancias de los Page Objects, e implementa aislamiento total entre escenarios: cada escenario arranca con un navegador limpio (`Before` hook) y lo cierra al finalizar (`After` hook), evitando fugas de estado entre pruebas.

### Cobertura de escenarios

| Feature | Escenarios cubiertos |
|---|---|
| `login.feature` | Login exitoso, credenciales inválidas (usuario/clave incorrectos), usuario bloqueado (`locked_out_user`) |
| `cart.feature` | Agregar un producto, agregar múltiples productos, visualizar productos en el carrito |
| `checkout.feature` | Flujo completo de compra hasta la pantalla de confirmación |

### Manejo de errores y estabilidad

- Uso de **locators de Playwright** basados en roles y atributos estables (`data-test`, `#id`) en lugar de XPaths frágiles.
- **Auto-waiting** nativo de Playwright: no se usan `sleep()` fijos, lo que reduce pruebas inestables (*flaky tests*).
- Capturas de pantalla automáticas ante fallos, adjuntas al reporte.

## Notas sobre dependencias

Las versiones de `package.json` se actualizaron a sus últimas mayores estables al momento
(`@cucumber/cucumber` v11.3, `@playwright/test`/`playwright` v1.50, `typescript` v5.7,
`multiple-cucumber-html-reporter` v3.9). Se agregó además un bloque `overrides` para forzar
que las dependencias transitivas `glob`, `uuid` y `reflect-metadata` (usadas internamente por
Cucumber y por el generador de reportes) resuelvan a versiones no deprecadas:

```json
"overrides": {
  "glob": "latest",
  "uuid": "^11.0.5",
  "reflect-metadata": "^0.2.2"
}
```

## Credenciales de prueba

| Usuario | Contraseña | Comportamiento esperado |
|---|---|---|
| `standard_user` | `secret_sauce` | Login exitoso, flujo completo disponible |
| `locked_out_user` | `secret_sauce` | Login rechazado con mensaje de error |

---

**Autor:** Marcos Antonio Padilla Acuña (QA Automation Engineer)
**Licencia:** MIT
