pipeline {
    agent {
        docker {
            // ✅ CORRECTION 1 : Image mise à jour pour supporter Node.js >= 22
            // Ceci corrige les avertissements npm WARN EBADENGINE.
            // Cette image utilise Node.js 24.
            image 'cypress/browsers:node-24.11.1-chrome-126'
            args '--entrypoint ""'
        }
    }

    stages {
        stage('Install dependencies') {
            steps {
                sh 'CYPRESS_INSTALL_BINARY=0 npm install' 
            }
        } 
        
        stage('Run cypress tests') {
            steps {
                // ✅ CORRECTION 2 : Ajout de chmod +x pour résoudre "Permission denied" (exit code 126)
                sh 'chmod +x cypress/batch/login_only.sh'
                sh 'cypress/batch/login_only.sh'
            }
        }
    }
}