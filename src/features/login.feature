@login
Feature: Inicio de sesión en SauceDemo
  Como un cliente de Sauce Demo
  Quiero poder iniciar sesión en la aplicación
  Para poder acceder al catálogo de productos y realizar compras

  Background:
    Given que el usuario se encuentra en la página de inicio de sesión de SauceDemo

  @smoke @positive
  Scenario: Inicio de sesión exitoso con credenciales válidas
    When el usuario inicia sesión con el usuario "standard_user" y contraseña "secret_sauce"
    Then el usuario debería ver la página de productos

  @negative
  Scenario Outline: Inicio de sesión fallido con credenciales inválidas
    When el usuario inicia sesión con el usuario "<usuario>" y contraseña "<password>"
    Then el usuario debería ver un mensaje de error "<mensajeError>"

    Examples:
      | usuario       | password       | mensajeError                                                              |
      | invalid_user  | secret_sauce   | Epic sadface: Username and password do not match any user in this service |
      | standard_user | wrong_password | Epic sadface: Username and password do not match any user in this service |

  @negative @locked
  Scenario: Usuario bloqueado no puede iniciar sesión
    When el usuario inicia sesión con el usuario "locked_out_user" y contraseña "secret_sauce"
    Then el usuario debería ver un mensaje de error "Epic sadface: Sorry, this user has been locked out."
