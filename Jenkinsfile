pipeline {
    agent any

    stages {
        stage('Run Script') {
            steps {
                echo 'Executing single-stage pipeline...'
                sh 'echo "Test3 "'
            }
        }

        stage('Initializing terraform') {
            sh "terraform init"
        }

        stage('Destroying old cluster'){
            sh 'terraform destroy'
        }

        stage('Applying terraform'){
            sh 'terraform apply -auto-approve'
        }
    }
}
