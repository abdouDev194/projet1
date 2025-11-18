pipeline {
    agent {
        docker {
            image 'cypress/included:13.6.6' 
            // La syntaxe des arguments Docker est correcte
            args '--entrypoint=""' 
        }
    }

    stages {
        stage('Install dependencies') {
            steps {
                // ✅ Correction : Utiliser 'npm install' pour les dépendances du projet
                // 'npx cypress install' n'est pas nécessaire et a échoué (Code 500)
                sh 'npm install' 
            }
        }
        
        stage('Run cypress') {
            steps {
                // Si vous avez un script shell à exécuter, assurez-vous de l'autorisation
                // sh 'chmod +x ./batchs/e2etests.sh' 
                // sh './batchs/e2etests.sh'
                
                // Exécution de Cypress via npx (si le binaire est bien dans l'image)
                sh 'npx cypress run'
            }
        }
    }

    // ✅ Correction : La section post doit être placée APRES 'stages' et AVANT la fin du 'pipeline'
    post {
        always {
            // Assurez-vous que le chemin 'results/*.xml' est correct pour vos rapports
            junit 'results/*.xml'
        }
    }
}