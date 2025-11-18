/// <reference types="cypress" />

describe("Gestion complète des articles sur SauceDemo", () => {
  /********************************************************************************/
  beforeEach(() => {
    cy.visit("https://www.saucedemo.com");
    cy.get("#user-name").type("standard_user");
    cy.get("#password").type("secret_sauce");
    cy.get("#login-button").click();
  });
  /********************************************************************************/
  it("Ajoute deux derniers articles, vérifie le panier, vérifier le prix puis supprime les articles", () => {
/********************************************************************************* */
    // Ajouter l'avant-dernier article
    cy.get(".inventory_item").eq(4).within(() => {
      cy.contains("Add to cart").click();
      cy.contains("Remove").should("be.visible");
    });

    // Vérifier que le panier affiche 1
    cy.get(".shopping_cart_badge").should("have.text", "1");

    // Aller au panier
    cy.get("#shopping_cart_container").click();

    // Vérifier le prix du premier article
    cy.get(".cart_item").eq(0).find(".inventory_item_price").should("have.text", "$7.99");

    // Continuer les achats
    cy.contains("Continue Shopping").click();
    cy.url().should("include", "/inventory.html");

    // Ajouter le dernier article
    cy.get(".inventory_item").eq(5).within(() => {
      cy.contains("Add to cart").click();
      cy.contains("Remove").should("be.visible");
    });

    // Vérifier que le panier affiche 2
    cy.get(".shopping_cart_badge").should("have.text", "2");

    // Aller au panier
    cy.get("#shopping_cart_container").click();

    // Vérifier le prix du deuxième article
    cy.get(".cart_item").eq(1).find(".inventory_item_price").should("have.text", "$15.99");

    // Continuer les achats
    cy.contains("Continue Shopping").click();
    cy.url().should("include", "/inventory.html");

    // Supprimer l'avant-dernier article
    cy.get(".inventory_item").eq(4).within(() => {
      cy.contains("Remove").click();
      cy.contains("Add to cart").should("be.visible");
    });

    // Supprimer le dernier article
    cy.get(".inventory_item").eq(5).within(() => {
      cy.contains("Remove").click();
      cy.contains("Add to cart").should("be.visible");
    });

    // Vérifier que le panier est vide
    cy.get(".shopping_cart_badge").should("not.exist");
  });

});










