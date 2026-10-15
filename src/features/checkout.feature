@checkout
Feature: Proceso de compra en SauceDemo
  Como un cliente de Sauce Demo
  Quiero poder completar una compra de principio a fin
  Para poder adquirir los productos que necesito

  Background:
    Given que el usuario inició sesión como "standard_user"
    And el usuario agregó el producto "Sauce Labs Backpack" al carrito
    And el usuario abre el carrito de compras

  @smoke @positive @e2e
  Scenario: Completar el proceso de compra exitosamente
    When el usuario procede al checkout
    And el usuario completa la información de envío con nombre "John", apellido "Doe" y código postal "12345"
    And el usuario finaliza la compra
    Then el usuario debería ver el mensaje de confirmación "Thank you for your order!"
