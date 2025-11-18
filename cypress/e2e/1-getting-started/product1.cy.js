/// <reference types="cypress" />
describe("Gestion complète des articles sur SauceDemo", () => {
beforeEach("visite le lien", () => {

      // Connexion
    cy.visit("https://www.saucedemo.com");
    cy.get("#user-name").type("standard_user");
    cy.get("#password").type("secret_sauce");
    cy.get("#login-button").click();
})
    it("Ajoute deux articles, vérifie le panier puis les supprime", () => {

    // Ajouter le premier article
    cy.get(".inventory_item").eq(0).within(() => {
      cy.contains("Add to cart").click();
      cy.contains("Remove").should("be.visible");
    });


    // Vérifier que le panier affiche 1
    cy.get(".shopping_cart_badge").should("be.visible").and("have.text", "1");

    // Ajouter le deuxième article
    cy.get(".inventory_item").eq(1).within(() => {
      cy.contains("Add to cart").click();
      cy.contains("Remove").should("be.visible");
    });

    // Vérifier que le panier affiche 2
    cy.get(".shopping_cart_badge").should("be.visible").and("have.text", "2");


    // Supprimer le premier article
    cy.get(".inventory_item").eq(0).within(() => {
      cy.contains("Remove").click();
      cy.contains("Add to cart").should("be.visible");
    });

    // Supprimer le deuxième article
    cy.get(".inventory_item").eq(1).within(() => {
      cy.contains("Remove").click();
      cy.contains("Add to cart").should("be.visible");
    });

    // Vérifier que le panier est vide
    cy.get(".shopping_cart_badge").should("not.exist");
  });
});




