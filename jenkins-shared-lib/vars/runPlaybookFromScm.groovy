#!groovy

def call(Map configMap){

    pipeline{

    agent any

    options {
        timeout(time: 1, unit: 'HOURS') 
        disableConcurrentBuilds()
        skipDefaultCheckout()
    }

    stages{

        stage('Load & Verify Params'){
            script{
                def requiredParams = ['PLAYBOOK_REPO_URL','BRANCH_NAME','PLAYBOOK_NAME', 'PLAYBOOK_TFSTATE_REPO_URL']

                for(itm in requiredParams){
                    if(!configMap.containsKey(itm)){
                        error "Required param ${itm} was missing!"
                    }
                }
            }
        }
        stage('Init'){
            checkout([
                $class: 'GitSCM',
                branches: [[name: "configMap.BRANCH_NAME"]],
                doGenerateSubmoduleConfigurations: false,
                extensions: [[$class: 'WipeWorkspace']],
                gitTool: 'SYSTEM',
                submoduleCfg: [],
                userRemoteConfigs: [[
                    url: "${configMap.PLAYBOOK_REPO_URL}",
                    credentialsId: "amitthk-git-creds"
                ]]
            ])
            checkout([
                $class: 'GitSCM',
                branches: [[name: "configMap.BRANCH_NAME"]],
                doGenerateSubmoduleConfigurations: false,
                extensions: [[$class: 'RelativeTargetDirectory', relativeTargetDir: "terraform"]],
                gitTool: 'SYSTEM',
                submoduleCfg: [],
                userRemoteConfigs: [[
                    url: "${configMap.PLAYBOOK_TFSTATE_REPO_URL}",
                    credentialsId: "amitthk-git-creds"
                ]]
            ])
        }

        stage('Run Playbook'){
            when {
            expression {
                return env.ACTION_TYPE == 'deploy';
                }
            }
            steps{
                withCredentials([file(credentialsId: 'amitthk-cdhstack-admin.pem', variable: 'pvt_key')]){
                sh "cp ${pvt_key} ${APP_BASE_DIR}/key.tmp"
                sh "ansible-playbook -i terraform/inventories/${configMap.STACKNAME} --private-key=${APP_BASE_DIR}/key.tmp --tags ${configMap.PLAYBOOK_TAGS} $APP_BASE_DIR/${configMap.PLAYBOOK_NAME}"
                }
            }
        }
    }

    post {
        always {
            sh '''
            rm -f ${APP_BASE_DIR}/key.tmp | true
            '''
        }
    }
    }
}