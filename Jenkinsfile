pipeline {
    agent {
        docker {
            //image/include 
            //image 'cypress/browsers:node-24.11.1-chrome-142.0.7444.162-1-ff-145.0-edge-142.0.3595.65-1'
            image 'cypress/included:13.6.6'
            args '--entrypoint ""'
        }
    }

    stages {
        stage('Install dependencies') {
            steps {
                sh 'CYPRESS_INSTALL_BINARY npm install' 
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