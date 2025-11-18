const { defineConfig } = require("cypress");
const allureWriter = require("@shelex/cypress-allure-plugin/writer"); // 👈 Ligne à vérifier !

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      allureWriter(on, config); // 👈 Ligne essentielle à vérifier !
      // ... autres enregistrements (comme cypress/grep)
      return config;
    },
    // ... autres configurations
  },
});