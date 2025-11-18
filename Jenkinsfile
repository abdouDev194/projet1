pipeline {
    agent {
        docker {
            image 'cypress/included:13.6.6'
            args '-u root'
        }
    }
    stages {
        stage('Install, Prepare, and Install Binary') {
            steps {
                sh 'npm install'
                sh 'npx cypress install' 
                sh 'mkdir -p cypress/results' 
            }
        }
        
        stage('Run Cypress and Generate Report') {
            steps {
                // Exécute les tests et génère le fichier XML dans cypress/results
                sh 'npx cypress run --reporter junit --reporter-options "mochaFile=cypress/results/junit-[hash].xml,toConsole=true"'
                
                // 🚀 VERIFICATION : Lister le contenu du dossier de résultats
                sh 'ls -l cypress/results' 
                
                // 💡 Astuce : Afficher le contenu du fichier (les 5 premières lignes)
                sh 'head -n 5 cypress/results/*.xml'
            }
        }
        
        stage('Publish JUnit Report') {
            steps {
                // Tente de publier le rapport. S'il existe, l'étape passe.
                junit 'cypress/results/*.xml'
            }
        }
    }
}