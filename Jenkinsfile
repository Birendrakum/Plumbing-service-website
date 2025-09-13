pipeline {
    agent any

    stages {
        stage('Run Script') {
            steps {
                echo 'Executing single-stage pipeline...'
                sh 'echo "Test6 "'
            }
        }

        stage('Initializing terraform') {
            steps{
                echo 'Initializing terraform'
                sh 'cd EKS'
                sh "terraform init"
            }
        }

        stage('Destroying old cluster'){
            steps{
                echo 'Destroying old cluster'
                sh 'terraform destroy'
          }
        }

        stage('Applying terraform'){
            steps {
            echo 'Applying terraform code'
            sh 'terraform apply -auto-approve'
            }
        }
    }
}
