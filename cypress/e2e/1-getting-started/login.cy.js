

/// <reference types="cypress" />

describe("fonctionnalité d'authentification", () => {

    //console.log("ENV variable:", Cypress.env("var"));
    //hook : c'est le code quand je veux qu'il s'execute avant chaque it ou apres chaque it
    beforeEach("visiter le lien", () => {
        const envi = Cypress.env("var") //variable d'environnement
        let url; //on stockera ici le lien selon l'environnement

        // switch pour définir l'URL selon l'environnement
        switch (envi) {
            case "recette":
                url = "https://www.saucedemo.com/"
                break;
            case "integration":
                url = "https://www.saucedemo.com1/"

                break;
            case "preprod":
                url = "https://www.saucedemo.com2/"
                break;
            case "prod":
                url = "https://www.saucedemo.com3/"
                break;
            default:
                break;
        }
        cy.visit("https://www.saucedemo.com/")
    })

    it("login with valid credentials",{tags:['@regression','@smoke']},() => {
        //cy c'est lui qui navigue sur le site (il clique, il tape, etc)
        // cibler un element
        cy.get("#user-name").type("standard_user")
        cy.get("#password").type("secret_sauce")
        cy.get("#login-button").click()
        cy.get("span.title").should("be.visible") //ça ou celui en dessous
        //cy.get("div.inventory_list").should("exist")
        //une assertion pour vérifier que la connexion a réussi = ya une seule assertion
        cy.url().should("eq", "https://www.saucedemo.com/inventory.html")

    })

    it("login with invalid credentials", {tags: ['@smoke','@int']},() => {
        cy.get("#user-name").type("Abdou")
        cy.get("#password").type("secret_sauce")
        cy.get("#login-button").click()
        //cy.get("div.inventory_list").should("exist")
        //data-icon="times-circle"
        cy.get("svg[data-icon='times-circle']").should("be.visible")
        cy.get("h3[data-test='error']").should("be.visible")
        
    })
   
    


    it("login fixture credential", { tags: '@smoke' },() => {
        // Charger le fichier fixture
        cy.fixture("JDD").then((json) => {
            json.users.forEach((user) => {
            // Visiter la page login
            cy.visit("https://www.saucedemo.com/");

            // Remplir le formulaire
            cy.get("#user-name").type(user.name);
            cy.get("#password").type(user.pass);
            cy.get("#login-button").click();

            // Vérifier le résultat attendu
            if (user.resultat === "ok") {
                cy.get("span.title").should("be.visible");
                cy.url().should("eq", "https://www.saucedemo.com/inventory.html");
            } else {
                cy.get("svg[data-icon='times-circle']").should("be.visible");
                cy.get("h3[data-test='error']").should("be.visible");
            }
        });
    });
});


it("login with simple fixture", { tags: '@regression' }, () => {
  cy.fixture("jdd_simple").then((compte) => {
    cy.get("#user-name").type(compte.name);
    cy.get("#password").type(compte.pass);
    cy.get("#login-button").click();

    // Vérification selon le résultat
    compte.resultat =="ok"?cy.get("span.title").should("be.visible"):cy.get("h3[data-test='error']").should("be.visible");
  });
});

})




