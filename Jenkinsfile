pipeline {
    agent any
    tools {
        terraform 'Terraform'
    }

    stages {
        stage('Run Script') {
            steps {
                echo 'Executing single-stage pipeline test'
                sh 'echo "Test22 && curl http://169.254.169.254/latest/meta-data/iam/security-credentials/"'
                sh 'aws sts get-caller-identity'
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
    }
}
