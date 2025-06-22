pipeline {
    agent any

    environment {
        AWS_CREDENTIALS = credentials('b9074a91-fa12-4231-be61-8b7e919b8015') // replace with Jenkins ID
        AWS_REGION = 'us-east-1'
        ECR_REPO = 'jenkins'
        IMAGE_TAG = "${BUILD_NUMBER}"
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/AAhsanSiddiqui123/jenkins_cicd'
            }
        }

        stage('Login to ECR') {
            steps {
                sh '''
                aws configure set aws_access_key_id $AWS_CREDENTIALS_USR
                aws configure set aws_secret_access_key $AWS_CREDENTIALS_PSW
                aws configure set default.region $AWS_REGION
                aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin 017820699382.dkr.ecr.$AWS_REGION.amazonaws.com
                '''
            }
        }

        stage('Build Docker Image') {
            steps {
                sh '''
                docker build -t $ECR_REPO:$IMAGE_TAG .
                docker tag $ECR_REPO:$IMAGE_TAG 017820699382.dkr.ecr.$AWS_REGION.amazonaws.com/$ECR_REPO:$IMAGE_TAG
                '''
            }
        }

        stage('Push to ECR') {
            steps {
                sh '''
                docker push 017820699382.dkr.ecr.$AWS_REGION.amazonaws.com/$ECR_REPO:$IMAGE_TAG
                '''
            }
        }
    }

    post {
        failure {
            echo 'Pipeline failed!'
        }
    }
}
