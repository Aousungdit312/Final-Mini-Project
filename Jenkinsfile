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
                    // ใช้ docker-compose (มีขีด) ตามที่แก้ให้ Mac
                    sh 'docker-compose down'
                    sh 'docker-compose up -d --build'
                }
            }
        }
        stage('Health Check') {
            steps {
                script {
                    sleep 10
                    // ใช้ docker ps แทน curl เพื่อเลี่ยงปัญหา Network บน Mac
                    sh 'docker ps | grep api'
                }
            }
        }
    }
}