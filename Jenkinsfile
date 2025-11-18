pipeline {
    agent {
        docker {
            image 'cypress/included:13.6.6'
            // NOTE: J'ai retiré l'entréepoint car elle n'est généralement pas nécessaire
            // avec l'image cypress/included:13.6.6. Si vous avez des problèmes de
            // permission, remplacez-la par args '-u root'.
            // args '--entrypoint=""' 
        }
    }
    stages {
        stage('Install Dependencies') {
            steps {
                // Installe uniquement les dépendances NPM de votre projet (reporter, plugins, etc.)
                sh 'npm install'
            }
        }
        stage('Run Cypress and Generate Report') {
            steps {
                // Exécute les tests Cypress et génère le rapport JUnit dans le dossier 'cypress/results'
                sh 'npx cypress run --reporter junit --reporter-options "mochaFile=cypress/results/junit-[hash].xml,toConsole=true"'
            }
        }
        stage('Publish JUnit Report') {
            steps {
                // Publie le rapport JUnit que Jenkins peut analyser
                junit 'cypress/results/*.xml'
                // NOTE: Assurez-vous que le chemin ci-dessus correspond à celui dans la commande 'cypress run'
            }
        }
    }
}