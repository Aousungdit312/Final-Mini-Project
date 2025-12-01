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
                    sleep 10
                    // เช็คว่ามี Container ชื่อ api รันอยู่ไหม (วิธีนี้ชัวร์กว่าบน Mac)
                    sh 'docker ps | grep api'
                }
            }
        }