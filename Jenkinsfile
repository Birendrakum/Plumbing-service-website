pipeline {
    agent any
    tools {
        terraform 'Terraform'
    }

    environment {
        DOCKER_CRED = credentials('Docker-cred')
    }

    stages {
        stage('Run Script') {
            steps {
                echo 'Executing single-stage pipeline test'
            }
        }

        stage('Initializing terraform') {
            steps{
                echo 'Initializing terraform'
                sh 'cd EKS && terraform init -upgrade'
            }
        }

        stage('Applying terraform'){
            steps {
            echo 'Applying terraform code'
            sh 'cd EKS && terraform apply -auto-approve'
            }
        }

        stage('Docker Login'){
            steps{
                    sh '''echo "Username7: ${DOCKER_CRED_USR}" > debug.txt
                           echo "Password7: ${DOCKER_CRED_PSW}" >> debug.txt '''
                    sh  'echo "${DOCKER_CRED_PSW}" | docker login -u ${DOCKER_CRED_USR} --password-stdin'
                }
        }

        stage('Docker image building and pushing to dockerhub'){
            steps{
                sh 'docker build -t logn31/plumbing-web:latest . && docker push logn31/plumbing-web:latest'
            }
        }
    }
}
