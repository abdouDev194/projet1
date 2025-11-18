pipeline {
    agent {
        docker {
            image 'cypress/included:13.6.6'
            // L'entrée par défaut de cette image est généralement adaptée pour l'exécution.
            // Laisser 'args' vide ou le supprimer si non nécessaire,
            // ou bien utiliser './node_modules/.bin/cypress' dans vos steps.
            args '-u root' // Utiliser root pour s'assurer des permissions d'installation et de nettoyage
        }
    }
    stages {
        stage('Install Node Dependencies') {
            steps {
                // 1. Installer les dépendances NPM de votre projet (plugins, Allure, etc.)
                sh 'npm install'
                
                // 2. SUPPRESSION : 'npx cypress install' n'est PAS nécessaire.
                // Le binaire Cypress est déjà présent dans l'image 'cypress/included'.
            }
        }
        
        // ---
        
        stage('Run Cypress and Generate JUnit Report') {
            steps {
                // Exécuter les tests et générer le rapport JUnit
                // - `--reporter junit`: spécifie le format JUnit.
                // - `--reporter-options`: définit le chemin du fichier XML pour Jenkins.
                sh 'npx cypress run --reporter junit --reporter-options "mochaFile=cypress/results/junit-[hash].xml"'
            }
        }
        
        // ---
        
        stage('Publish Reports') {
            steps {
                // Publier le rapport JUnit
                // Le chemin doit correspondre à celui défini dans l'étape précédente.
                junit 'cypress/results/*.xml'
                
                // Si vous utilisez Allure, ajoutez cette étape (nécessite le plugin Allure Jenkins)
                // allure([
                //     allureResults: 'allure-results',
                //     jdk: '',
                //     properties: [],
                //     reportBuildPolicy: 'ALWAYS'
                // ])
            }
        }
    }
}