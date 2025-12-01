pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Build & Deploy') {
            steps {
                script {
                    // Stop containers if running, then rebuild and start
                    sh 'docker-compose down'
                    sh 'docker-compose up -d --build'
                }
            }
        }
        stage('Health Check') {
            steps {
                script {
                    sleep 10 // Wait for containers to be ready
                    sh 'curl -f http://localhost:3000/api/items'
                }
            }
        }
    }
}