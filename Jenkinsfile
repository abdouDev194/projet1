pipeline {
    agent {
        docker {
            image 'cypress/included:13.6.6'
            args '--entrypoint=""' 
        }
    }
    stages {
        stage('Install Dependencies and Prepare Results Directory') {
            steps {
                sh 'npm install'
                sh 'mkdir -p cypress/results' // Créer le dossier de résultats
                // Tenter l'install pour s'assurer que le binaire est bien dans le workspace.
                // Si cette étape bloque encore, nous la retirerons pour utiliser le chemin direct (Option 2).
                sh 'npx cypress install' 
            }
        }
        
        stage('Run Cypress and Generate Report') {
            steps {
                sh 'npx cypress run --reporter junit --reporter-options "mochaFile=cypress/results/junit-[hash].xml,toConsole=true"'
                sh 'ls -l cypress/results' // Vérification
            }
        }
        
        stage('Publish JUnit Report') {
            steps {
                junit 'cypress/results/*.xml'
            }
        }
    }
}