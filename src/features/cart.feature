@cart
Feature: Carrito de compras en SauceDemo
  Como un cliente de Sauce Demo
  Quiero poder agregar productos al carrito
  Para poder revisar los artículos antes de comprarlos

  Background:
    Given que el usuario inició sesión como "standard_user"

  @smoke @positive
  Scenario: Agregar un producto al carrito desde la página de productos
    When el usuario agrega el producto "Sauce Labs Backpack" al carrito
    Then el badge del carrito debería mostrar "1"

  @positive
  Scenario: Ver los productos agregados en el carrito de compras
    When el usuario agrega el producto "Sauce Labs Bike Light" al carrito
    And el usuario abre el carrito de compras
    Then el producto "Sauce Labs Bike Light" debería estar visible en el carrito

  @positive
  Scenario: Agregar múltiples productos al carrito
    When el usuario agrega el producto "Sauce Labs Backpack" al carrito
    And el usuario agrega el producto "Sauce Labs Bolt T-Shirt" al carrito
    Then el badge del carrito debería mostrar "2"
