pipeline {
    agent any

    environment {
        IMAGE_NAME = "jenkins-demo-app"
        CONTAINER_NAME = "jenkins-demo-running"
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npm test'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh "docker build -t ${IMAGE_NAME}:${BUILD_NUMBER} ."
            }
        }

        stage('Deploy (simulate production)') {
            steps {
                sh """
                    docker rm -f ${CONTAINER_NAME} || true
                    docker run -d --name ${CONTAINER_NAME} -p 4000:3000 ${IMAGE_NAME}:${BUILD_NUMBER}
                """
            }
        }

        stage('Smoke Test') {
            steps {
                sh 'sleep 3 && curl -f http://localhost:4000/health'
            }
        }
    }

    post {
        success {
            echo "✅ Pipeline succeeded — app deployed at http://localhost:4000"
        }
        failure {
            echo "❌ Pipeline failed — check logs above"
        }
    }
}