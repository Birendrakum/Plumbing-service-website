pipeline {
    agent any
    tools {
        terraform 'Terraform'
    }

    environment {
        SCANNER_HOME = tool 'sonar-scanner'
        DOCKER_CRED = credentials('Docker-cred')
        EKS_CLUSTER_NAME = 'PlumbingSite-EKS-Cluster'
        AWS_REGION = 'us-east-1'
        EMAIL_RECIPIENT = 'birendrakum.119@gmail.com'
        EMAIL_SENDER = 'birendrakum.119@gmail.com'
    }

    stages {
        stage('Clean Workspace') {
            steps {
                cleanWs()
            }
        }

        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('sonar-server') {
                    sh ''' 
                    $SCANNER_HOME/bin/sonar-scanner \
                        -Dsonar.projectName=BMS \
                        -Dsonar.projectKey=BMS
                    '''
                }
            }
        }

        stage('Quality Gate') {
            steps {
                script {
                    waitForQualityGate abortPipeline: false, credentialsId: 'Sonar-token'
                }
            }
        }

        stage('OWASP FS Scan') {
            steps {
                dependencyCheck additionalArguments: '--scan ./ --disableYarnAudit --disableNodeAudit', odcInstallation: 'DP-Check'
                dependencyCheckPublisher pattern: '**/dependency-check-report.xml'
            }
        }

        stage('Trivy FS Scan') {
            steps {
                sh 'trivy fs . > trivyfs.txt'
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

        stage('Deploy to EKS Cluster') {
            steps {
                script {
                    sh '''
                    echo "Verifying AWS credentials..."
                    aws sts get-caller-identity

                    echo "Configuring kubectl for EKS cluster..."
                    aws eks update-kubeconfig --name $EKS_CLUSTER_NAME --region $AWS_REGION

                    echo "Verifying kubeconfig..."
                    kubectl config view

                    echo "Deploying application to EKS..."
                    kubectl apply -f deployment.yml
                    kubectl apply -f service.yml

                    echo "Verifying deployment..."
                    kubectl get pods
                    kubectl get svc
                    '''
                }
            }
        }

        stage('Notify') {
                    steps {
                        withCredentials([string(credentialsId: 'email-token', variable: 'EMAIL_TOKEN')]) {
                            sh '''
                                echo "Sending email using token: $EMAIL_TOKEN"
                                curl -s --url 'smtps://smtp.gmail.com:465' \
                                --ssl-reqd \
                                --mail-from '$EMAIL_SENDER' \
                                --mail-rcpt "$EMAIL_RECIPIENT" \
                                --upload-file <(echo -e "Subject: Jenkins Build Notification\n\nBuild completed.") \
                                --user '$EMAIL_SENDER:$EMAIL_TOKEN'
                            '''
                        }
                    }
                }
    }
}