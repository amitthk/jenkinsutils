import java.text.SimpleDateFormat

def getTimeStamp(){
	def dateFormat = new SimpleDateFormat("yyyyMMddHHmm")
	def date = new Date()
	return dateFormat.format(date);
}

def getTargetEnv(String branchName) {
	def deploy_env="dev";
	switch(branchName){
		case('develop'):
		deploy_env="dev";
		break;
		case('sit'):
		deploy_env="sit";
		break;
		case('uat'):
		deploy_env="uat";
		break;
		case('staging'):
		deploy_env="staging";
		break;
		case('master'):
		deploy_env="prod";
		break;
		case('cdp'):
		deploy_env="all";
		break;
		default:
			if(branchName.startsWith("feature")){
				deploy_env="none"
			}
		break;
	}
	return deploy_env;
}

def runWithServer(body) {
    def id = UUID.randomUUID().toString()
    deploy id
    try {
        body.call "${jettyUrl}${id}/"
    } finally {
        undeploy id
    }
}

def getCurrentBranch() {
    def branchName = sh (script: 'git rev-parse --abbrev-ref HEAD', returnStdout: true).trim();
    return branchName;
}

def isFileAffected(String match) {
    def changeLogSets = currentBuild.changeSets;
    def filesAffected = [];
    for (int i = 0; i < changeLogSets.size(); i++) {
            def entries = changeLogSets[i].items
            for (int j = 0; j < entries.length; j++) {
                def entry = entries[j];
                def files = new ArrayList(entry.affectedFiles);
                for(int k =0; k < files.size(); k++){
                    if(files[k] == match){
                    return true;
                }
            }
        }
    }
    return false;
}

def notifyJobStatus(int notificationQueueId, String message){
    def notificationTimeStamp=getTimeStamp();
    statusJson = "{\"id\": ${notificationQueueId}, \"createdOn\": ${notificationTimeStamp}, \"notificationMessage\": \"${message}\"}";
    sendNotification(statusJson);
}

def sendNotification(String notificationsApiHostName, String statusJson) {
    def command = "curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '${statusJson}' '${notificationsApiHostName}/notifications'";
    sh command;
}

def inputGetFile(String savedfile = null) {
 def filedata = null
 def filename = null
 // Get file using input step, will put it in build directory
 // the filename will not be included in the upload data, so optionally allow it to be specified
 // taken from here: https://issues.jenkins-ci.org/browse/JENKINS-27413
 if (savedfile == null) {
 def inputFile = input message: 'Upload file', parameters: [file(name: 'library_data_upload'), string(name: 'filename', defaultValue: 'uploaded-file-data')]
 filedata = inputFile['library_data_upload']
 filename = inputFile['filename']
 } else {
 def inputFile = input message: 'Upload file', parameters: [file(name: 'library_data_upload')]
 filedata = inputFile
 filename = savedfile
 }
 // Read contents and write to workspace
 writeFile(file: filename, encoding: 'Base64', text: filedata.read().getBytes().encodeBase64().toString())
 // Remove the file from the master to avoid stuff like secret leakage
 filedata.delete()
 return filename
}
def getReleaseVersion(String cutRelease, String artifactVersion, String gitCommitShorHash){
    if(cutRelease.toString()=="true"){
        return "${artifactVersion}-${gitCommitShorHash}"
    }else{
        return "${artifactVersion}"
    }
}
return this;