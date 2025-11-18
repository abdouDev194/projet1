// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'
import 'cypress-mochawesome-reporter/register';

// ✅ CORRECTION: Utilisation de l'import correct pour les commandes Allure Shelex
// ✅ LIGNE CORRIGÉE
import '@shelex/cypress-allure-plugin'; 


const { register: registerCypressGrep } = require('@cypress/grep')
registerCypressGrep()