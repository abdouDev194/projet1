pipeline {
    agent {
        docker {
            //image/include 
            //image 'cypress/browsers:node-24.11.1-chrome-142.0.7444.162-1-ff-145.0-edge-142.0.3595.65-1'
            image 'cypress/browsers:latest'
            //args '--entrypoint ""'
        }
    }

    stages {
        stage('Install dependencies') {
            steps {
                sh 'npm cache clean --force'
                sh 'npx cypress cache clear'
                sh 'npm ci'
            }
        } 
        //uygytfta
        stage('Run cypress tests') {
            steps {
                sh 'cypress/batch/login_only.sh'
            }
        }
    }
}