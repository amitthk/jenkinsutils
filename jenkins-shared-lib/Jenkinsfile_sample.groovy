#!groovy
properties([
    parameters([
        
    ])
])


environment{

}
//https://jenkins.io/doc/book/pipeline/shared-libraries/
library identifier: 'jenkins-shared-lib@master', 
   retriever: modernSCM([
       $class: 'GitSCMSource',
       remote: 'https://github.com/amitthk/jenkins-shared-lib.git',
       credentialsId: 'amitthk-git-creds'])

Map configMap = [:]

params.each{ key, value -> 
   echo "Pass parameter ${key} = ${value} to downstream job"
   configMap[key] = value;
}

runPlaybookFromScm(configMap)