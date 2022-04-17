#!/usr/bin/env groovy
def buildType = ''
def bitbucketRepo = '<<tepsi>>'
def bitbucketRepoGroup = '<<sdworx>>'
def jiraServer = '<<sdworx>>'
def skipRemainingStages = false

@NonCPS
def String generateJiraFilter(){
    return "(ASWR|DSUP|ED)-\\d+"
}

    //Source for input: https://medium.com/disney-streaming/jenkins-pipeline-with-dynamic-user-input-9f340fb8d9e2
def getEnvVariablesBasedOnBranch(branch) {
    switch (branch) {
        case ~/^(feature\/)(.*)/:
            return '{"stage": "", "bumpVersion": "yarn run feature-version", "versionTag": "latest-feature"}'
            break;
        case ~/^(develop)(.*)/:
            return '{"stage": "tst", "bumpVersion": "yarn run develop-version", "versionTag": "latest-develop"}'
            break;
        case ~/^(release\/)(.*)/:
            return '{"stage": "acc", "bumpVersion": "yarn run release-version", "versionTag": "latest-release"}'
            break;
        case ~/^(hotfix\/)(.*)/:
            return '{"stage": "prp", "bumpVersion": "yarn run hotfix-version", "versionTag": "latest-hotfix"}'
            break;
        case ~/^(master)(.*)/:
            return '{"stage": "prp", "bumpVersion": "yarn run master-version", "versionTag": "latest"}'
            break;
        default:
            return null;
    }
}

def getEnvVariablesBasedOnDeploymentEnv(env) {
    switch (env) {
        case ~/^(tst)(.*)/:
            return '{"cacheControl": "public,max-age=365000000,immutable", "stageName": "testing", "jiraWorkflows": [{"project":"aswr", "transitionBuild":"TEST artifact built", "transitionBuildId":"321", "commentBuild":"Ticket included in build (Jenkins) for TST", "transitionDeploy":"Ready for Testing", "transitionDeployId":"341", "commentDeploy":"Deployed to TST"}]}'
            break;
        case ~/^(acc)(.*)/:
            return '{"cacheControl": "public,max-age=365000000,immutable", "stageName": "staging", "jiraWorkflows": [{"project":"aswr", "transitionBuild":"ACC artifact built", "transitionBuildId":"331", "commentBuild":"AEM Build RELEASE CANDIDATE artifact", "transitionDeploy":"Ready for validation", "transitionDeployId":"351", "commentDeploy":"Deployed to ACC"}]}'
            break;
        case ~/^(prp|prd)(.*)/:
            return '{"cacheControl": "public,max-age=365000000,immutable", "stageName": "production", "jiraWorkflows": []}'
            break;
        default:
            return null;
    }
}

@NonCPS
def get_jira_ticket_from_commits() {
    def jiraTickets = []
    def issue_pattern = generateJiraFilter()
    // Find all relevant commit ids
    currentBuild.changeSets.each {
        changeSet ->
            changeSet.each {
                commit ->
                    String msg = commit.getMsg()
                def jiraTicketsInCommit = msg.findAll(issue_pattern).unique()
                println "[DEBUG] jiraTicketsInCommit: ${jiraTicketsInCommit}"
                jiraTickets.addAll(jiraTicketsInCommit)
            }
    }
    return jiraTickets.unique()
}

@NonCPS
def get_jira_ticket_from_commitMessage(String[] commits) {
    def jiraTickets = []
    def issue_pattern = generateJiraFilter()
    // Find all relevant commit ids
    commits.each {
        commit ->
            echo "[INFO] ### Check line: ${commit}"
            echo "[INFO] ### Found items: ${commit.findAll(issue_pattern)}"
            def jiraTicketsInCommit = commit.findAll(issue_pattern).unique()
            jiraTickets.addAll(jiraTicketsInCommit)
    }
    return jiraTickets.unique()
}

private boolean lastCommitIsBumpCommit() {
    // lastCommit = sh([script: 'git log -1 --abbrev-commit --pretty=oneline', returnStdout: true])
    lastCommit = sh([script: 'git --no-pager log -1 --pretty=%B', returnStdout: true]).trim()
    return lastCommit.contains("[ci skip]");
}

private boolean lastCommitIsDoneByJenkins() {
    lastCommit = sh([script: "git log -1 --pretty=format:'%ae'", returnStdout: true])
    return lastCommit.contains("development@<<sdworx>>.com");
}

private int getPullRequestID() {
    def strValuePrID = sh([script: "git log -1 --pretty=format:'%s' | grep -o 'pull request #[[:digit:]]*' | cut -d '#' -f2", returnStdout: true]).trim()
    def intValuePrID = strValuePrID.isInteger() ? (strValuePrID as int) : null
    return intValuePrID
}

def getPullRequestInfo(bbRepoGroup, bbRepo, bbPRId) {
    withCredentials([usernameColonPassword(credentialsId: 'development-at-bitbucket-readonly', variable: 'BITBUCKET_APP_ACCOUNT')]) {
        def combinedIssueID = []
        def cmdPRTitleIssueID = [ 'bash', '-c', "curl -s --request GET -u '${BITBUCKET_APP_ACCOUNT}' --header 'Content-Type: application/json' --url 'https://api.bitbucket.org/2.0/repositories/${bbRepoGroup}/${bbRepo}/pullrequests/${bbPRId}' | jq -r '.title' | grep -Eo 'ASWR-[[:digit:]]*' | sort --unique".toString()]
        def cmdPRDescriptionIssueID = [ 'bash', '-c', "curl -s --request GET -u '${BITBUCKET_APP_ACCOUNT}' --header 'Content-Type: application/json' --url 'https://api.bitbucket.org/2.0/repositories/${bbRepoGroup}/${bbRepo}/pullrequests/${bbPRId}' | jq -r '.description' | grep -Eo 'ASWR-[[:digit:]]*' | sort --unique".toString()]
        if (env.IS_DEBUG.toBoolean()) {
            println "[DEBUG] cmdPRTitleIssueID: " + cmdPRTitleIssueID
            println "[DEBUG] cmdPRDescriptionIssueID: " + cmdPRDescriptionIssueID
        }
        def resultPRTitleIssueID = cmdPRTitleIssueID.execute().text.trim()
        def resultPRDescriptionIssueID = cmdPRDescriptionIssueID.execute().text.trim()
        if (env.IS_DEBUG.toBoolean()) {
            println "[DEBUG] resultPRTitleIssueID: " + resultPRTitleIssueID
            println "[DEBUG] resultPRDescriptionIssueID: " + resultPRDescriptionIssueID
        }
        if (resultPRTitleIssueID?.trim()) {
            combinedIssueID = combinedIssueID << resultPRTitleIssueID
            if (!resultPRDescriptionIssueID?.isEmpty()) {
                combinedIssueID = combinedIssueID << resultPRDescriptionIssueID.split('\n').toList()
            }
            if (env.IS_DEBUG.toBoolean()) {
                println "[DEBUG] combinedIssueID: " + combinedIssueID
            }
        }
        return combinedIssueID.flatten().sort().unique()
    }
}

def updateJiraTicket(bbRepoGroup, bbRepo, bbPRId, buildType, jiraServer, transition, transitionId, comment) {
    def jiraTickets = []
    echo "[INFO] ### Getting details from the PR"
    // Groovy truth says that a null or empty string is false,
    //  so you can just wrap it in () as well if you need it in a statement that wouldn't already make it a boolean
    if (bbPRId?.trim()) {
        echo "[INFO] ### bbPRId: ${bbPRId}"
        jiraTickets = getPullRequestInfo(bbRepoGroup, bbRepo, bbPRId)
        if (env.IS_DEBUG.toBoolean()) {
            echo "[DEBUG] jiraTickets: ${jiraTickets}"
        }
        if (jiraTickets && !jiraTickets.isEmpty()) {
            jiraTickets.each {
                // Actually post a comment
                jiraTicket ->
                    echo "[INFO] ### Getting the jiraTicket from PR: ${jiraTicket}"
                    // Retrieves all fields from the provided JIRA site
                    def responseFields = jiraGetFields site: jiraServer
                    if (env.IS_DEBUG.toBoolean()) {
                        echo responseFields.successful.toString()
                        echo responseFields.data.toString()
                    }
                    def customFieldId = getFieldId(responseFields.data, "Deploy environment")
                    if (!customFieldId?.trim()) {
                        return 0
                    }
                    // Retrieves the Jira Ticket
                    def issue = jiraGetIssue idOrKey: jiraTicket, site: jiraServer
                    if (env.IS_DEBUG.toBoolean()) {
                        echo issue.successful.toString()
                        echo issue.data.toString()
                    }
                    def customFieldValue = issue.data.fields[customFieldId]?.value
                    if (!customFieldValue?.trim()) {
                        echo "[INFO] ###  customFieldValue is NULL"
                    } else {
                        echo "[INFO] ### customFieldvalue: ${customFieldValue}"
                    }
                    echo "[INFO] ### GIT_BRANCH_ALT: ${env.GIT_BRANCH_ALT}"
                    if (env.GIT_BRANCH_ALT == 'develop') {
                        switch(customFieldValue) {
                            case ~/^(TST|ACC|PRP|PRD)/:
                                echo "[INFO] ### The current value of the Deploy environment belong to TST|ACC|PRP|PRD"
                                echo "[INFO] ### The Deploy environment is not changed !!!"
                                break
                            default:
                                echo "[INFO] ### The current value of the Deploy environment is NULL"
                                customFieldValue = 'TST'
                                echo "[INFO] ### The Deploy environment is set to ${customFieldValue}"
                                break
                        }
                    } else if (env.GIT_BRANCH_ALT =~ "^release/(.*)") {
                        switch(customFieldValue) {
                            case ~/^(TST)/:
                                echo "[INFO] ### The current value of the Deploy environment is NULL or set to TST"
                                echo "[INFO] ### The release branches are acceptable for ACC only"
                                customFieldValue = 'ACC'
                                echo "[INFO] ### The Deploy environment is set to ${customFieldValue}"
                                break
                            case ~/^(ACC|PRP|PRD)/:
                                echo "[INFO] ### The current value of the Deploy environment belong to ACC|PRP|PRD"
                                echo "[INFO] ### The Deploy environment is not changed !!!"
                                break
                            default:
                                echo "[INFO] ### The current value of the Deploy environment is NULL"
                                customFieldValue = 'ACC'
                                echo "[INFO] ### The Deploy environment is set to ${customFieldValue}"
                                break
                        }
                    } else if (env.GIT_BRANCH_ALT == 'master') {
                        switch(customFieldValue) {
                            case ~/^(TST|ACC)/:
                                echo "[INFO] ### The current value of the Deploy environment belong to TST|ACC"
                                customFieldValue = 'PRP'
                                echo "[INFO] ### The Deploy environment is set to ${customFieldValue} !!!"
                                break
                            case ~/^(PRP|PRD)/:
                                echo "[INFO] ### The current value of the Deploy environment belong to PRP|PRD"
                                echo "[INFO] ### The Deploy environment is not changed !!!"
                                break
                            default:
                                echo "[INFO] ### The current value of the Deploy environment is NULL"
                                customFieldValue = 'PRP'
                                echo "[INFO] ### The Deploy environment is set to ${customFieldValue}"
                                break
                        }
                    }
                    // This is a custom field named "Deploy environment"
                    def deployEnvironment = [fields: ["${customFieldId}": [value: "${customFieldValue}"]]]
                    // Updating the Jira Ticket by ID
                    def responseEdit = jiraEditIssue idOrKey: jiraTicket, issue: deployEnvironment, site: jiraServer
                    if (env.IS_DEBUG.toBoolean()) {
                        echo responseEdit.successful.toString()
                        echo responseEdit.data.toString()
                    }
                    def statusName = issue.data.fields.status.name.toString()
                    if (!statusName?.trim()) {
                        echo "[WARN] ###  statusName is NULL"
                    } else {
                        echo "[INFO] ### statusName: ${statusName}"
                    }
                    switch(statusName) {
                        case ~/^(Blocked|Testing|Pending Bugfixing)/:
                            echo "[INFO] ### The current status name is ${statusName}"
                            echo "[INFO] ### The status name is IMMUTABLE!!!"
                            statusNameUpdate = false
                            break
                        default:
                            echo "[INFO] ### The current status name is ${statusName}"
                            echo "[INFO] ### The status name is going to be updated..."
                            statusNameUpdate = true
                            break
                    }
                    if (statusNameUpdate) {
                        def transitionInput = [transition: [id: "${transitionId}"]]
                        // Changing the Jira Ticket status by ID
                        def responseTransition = jiraTransitionIssue idOrKey: jiraTicket, input: transitionInput, site: jiraServer
                        if (env.IS_DEBUG.toBoolean()) {
                            echo responseTransition.successful.toString()
                            echo responseTransition.data.toString()
                        }
                        def commentSuccess = [body: "{panel:title=SUCCESS for ${bbRepoGroup}|borderStyle=dashed|borderColor=#ccc|titleBGColor=#00B300|bgColor=#D2F9BA}* _*${buildType}*_ in Jenkins build _*${env.JOB_BASE_NAME}*_ for branch: _*${env.GIT_BRANCH_ALT}*_ on build _*#${env.BUILD_NUMBER}*_\n\n* The *Deploy environment* is set to *${customFieldValue}*\n\n* The *Status* is set to *${transition}*\n\n* The *Comment* is set to *${comment}*{panel}"]
                    } else {
                        def commentSuccess = [body: "{panel:title=SUCCESS for ${bbRepoGroup}|borderStyle=dashed|borderColor=#ccc|titleBGColor=#00B300|bgColor=#D2F9BA}* _*${buildType}*_ in Jenkins build _*${env.JOB_BASE_NAME}*_ for branch: _*${env.GIT_BRANCH_ALT}*_ on build _*#${env.BUILD_NUMBER}*_\n\n* The *Deploy environment* is set to *${customFieldValue}*\n\n* The *Status* wasn't changed : *${transition}*{panel}"]
                    }
                    // Adding a succeful comment to the Jira Ticket by ID
                    def responseCommentSuccess = jiraAddComment idOrKey: jiraTicket, input: commentSuccess, site: jiraServer
                    if (env.IS_DEBUG.toBoolean()) {
                        echo responseCommentSuccess.successful.toString()
                        echo responseCommentSuccess.data.toString()
                    }
            }
        } else {
            echo "[INFO] ### The BitBucket PR ID is ${bbPRId}. Nothing to update in JIRA!"
        }
    }
    return jiraTickets
}

// Get a Custom field id from fields based on the field name.
def getFieldId(fields, fieldName) {
    for (i = 0; i <fields.size(); i++) {
        if(fields[i].custom && fields[i].name == fieldName) {
            println "fields[i].custom: ${fields[i].custom}"
            println "fields[i].name: ${fields[i].name}"
            return fields[i].id
        }
    }
}

pipeline {
    agent any

    tools {
        nodejs 'v16_13_0'
    }

    options {
        buildDiscarder(logRotator(numToKeepStr: '20', artifactNumToKeepStr: '20'))
        disableConcurrentBuilds()
        timestamps()
    }

    environment {
        CI = 'true'
        IS_DEBUG = 'true'
        HASH_COMMIT = sh(script: "git rev-parse --short HEAD", returnStdout: true).trim()
        BITBUCKET_PR_ID = getPullRequestID()
    }

    triggers {
        bitbucketPush()
    }

    stages {
        // Set up build parameters
        stage('Init') {
            steps {
                script {
                    env.SHOULD_BUILD = 'true'
                    env.SHOULD_PUBLISH = 'false'
                    env.PROJECT_VERSION = sh([script: "npm run npm-package-version --silent", returnStdout: true ]).trim()
                    env.JIRA_VERSION = "${env.PROJECT_VERSION.replaceAll('-RC(.*)','').replaceAll('-DEV(.*)','').replaceAll('-FEA(.*)','').replaceAll('-HOTFIX(.*)','')}-react"
                    currentBuild.displayName = env.PROJECT_VERSION
                    if (env.CHANGE_BRANCH != null) {
                        env.GIT_BRANCH_ALT = env.CHANGE_BRANCH
                    } else {
                        env.GIT_BRANCH_ALT = env.GIT_BRANCH
                    }
                    def envVariablesBasedOnBranch = getEnvVariablesBasedOnBranch(env.GIT_BRANCH_ALT)
                    if (envVariablesBasedOnBranch != null) {
                        def props = readJSON text: envVariablesBasedOnBranch
                        env.ENVIRONMENT = props['stage']
                        if (!env.ENVIRONMENT.isEmpty()) {
                            env.SHOULD_PUBLISH = 'true'
                            env.FEATURE_BUMP_VERSION = props['bumpVersion']
                            env.FEATURE_SET_VERSION_TAG = props['versionTag']
                        }
                    }
                    if (env.IS_DEBUG.toBoolean()) {
                        echo "[DEBUG] set ENVIRONMENT: ${env.ENVIRONMENT}"
                        echo "[DEBUG] set GIT_BRANCH_ALT: ${env.GIT_BRANCH_ALT}"
                        echo "[DEBUG] set SHOULD_BUILD: ${env.SHOULD_BUILD}"
                        echo "[DEBUG] set SHOULD_PUBLISH: ${env.SHOULD_PUBLISH}"
                        echo "[DEBUG] set FEATURE_BUMP_VERSION: ${env.FEATURE_BUMP_VERSION}"
                        echo "[DEBUG] set FEATURE_SET_VERSION_TAG: ${env.FEATURE_SET_VERSION_TAG}"
                        echo "[DEBUG] set BITBUCKET_PR_ID: ${env.BITBUCKET_PR_ID}"
                        echo "[DEBUG] set PROJECT_VERSION: ${env.PROJECT_VERSION}"
                        echo "[DEBUG] set JIRA_VERSION: ${env.JIRA_VERSION}"
                    }
                }
            }
        }

        stage('Auto-build pre-checks') {
            when {
                not {
                    triggeredBy 'UserIdCause'
                }
            }
            steps {
                script {
                    if (env.IS_DEBUG.toBoolean()) {
                        echo "[DEBUG] is BumpCommit: ${lastCommitIsBumpCommit()}"
                        echo "[DEBUG] changeSet: ${currentBuild.changeSets.size()}"
                        echo "[DEBUG] is done by jenkins: ${lastCommitIsDoneByJenkins()}"
                        echo "[DEBUG] git commit check: ${env.GIT_COMMIT} - ${env.GIT_PREVIOUS_COMMIT}"
                    }
                    if (
                        (currentBuild.changeSets.size() == 1 && currentBuild.changeSets[0].items.size() == 1 && (lastCommitIsBumpCommit() || lastCommitIsDoneByJenkins())) ||
                        (env.GIT_COMMIT == env.GIT_PREVIOUS_COMMIT)
                    ) {
                        currentBuild.result = 'ABORTED'
                        currentBuild.description = 'SCM Skip - build skipped'
                        env.SHOULD_BUILD = 'false'
                    } else {
                        echo "[INFO] ### Last commit is not a bump commit, job continues as normal."
                    }
                }
            }
        }

        // Set up build parameters
        stage('Update params for manual build') {
            when {
                triggeredBy 'UserIdCause'
            }
            steps {
                timeout(time: 60, unit: 'SECONDS') {
                    script {
                        def possibleEnvs = ['tst', 'acc', 'prp'];
                        if (env.GIT_BRANCH_ALT == "master") {
                            possibleEnvs << 'prd';
                        }
                        // Show the select input modal
                        def INPUT_PARAMS = input message: 'Please Provide Parameters', ok: 'Next',
                            parameters: [
                                choice(name: 'ENVIRONMENT', choices: possibleEnvs.join('\n'), description: 'Please select the Environment'),
                                booleanParam(name: 'SHOULD_PUBLISH', defaultValue: 'false', description: 'Publish a new version of a package into BitBucket')]
                        env.ENVIRONMENT = INPUT_PARAMS.ENVIRONMENT
                        env.SHOULD_PUBLISH = INPUT_PARAMS.SHOULD_PUBLISH
                        if (env.IS_DEBUG.toBoolean()) {
                            echo "[DEBUG] Should publish? --> ${env.SHOULD_PUBLISH}"
                            echo "[DEBUG] to env? --> ${env.ENVIRONMENT}"
                            echo "[DEBUG] Set env variables --> ${env.GIT_BRANCH_ALT}"
                        }
                    }
                }
            }
        }

        stage('Pre-build preperations') {
            when {
                environment name: 'SHOULD_BUILD', value: 'true'
            }
            steps {
                script {
                    echo "[INFO] ### Get all variables based on deploy-env"
                    def envVariablesBasedOnDeploymentEnv = getEnvVariablesBasedOnDeploymentEnv(env.ENVIRONMENT);
                    if (envVariablesBasedOnDeploymentEnv != null) {
                        def props = readJSON text: envVariablesBasedOnDeploymentEnv
                        env.ENVIRONMENT_NAME = props['stageName']
                        env.S3_CACHE_CONTROL = props['cacheControl']
                        env.JIRA_WORKFLOWS = props['jiraWorkflows']
                        if (env.IS_DEBUG.toBoolean()) {
                            echo "[DEBUG] set ENVIRONMENT_NAME: ${env.ENVIRONMENT_NAME}"
                            echo "[DEBUG] set JIRA_WORKFLOWS: ${env.JIRA_WORKFLOWS}"
                            echo "[DEBUG] set JIRA_WORKFLOWS 2: ${env.JIRA_WORKFLOWS.getClass()}"
                        }
                    }
                    withCredentials([string(credentialsId: 'vedaccio_registry', variable: 'NPM_TOKEN')]) {
                        sh("echo \"@as:registry=http://mgmt-verdaccio.intranet.foxandcat.eu:4873/\" > .npmrc")
                        sh("echo \"//mgmt-verdaccio.intranet.foxandcat.eu:4873/:_authToken=\"${NPM_TOKEN}\"\" >> .npmrc")
                    }
                    echo "[INFO] ### Install app dependencies"
                    sh("yarn install:ci")
                }
            }
        }

        // Lint Tests
        stage('Tests') {
            when {
                environment name: 'SHOULD_BUILD', value: 'true'
            }
            steps {
                script {
                    sh("yarn run test:ci")
                }
            }
            post {
                success {
                    step ([$class: 'CoberturaPublisher', coberturaReportFile: 'tests/results/coverage/cobertura-coverage.xml'])
                    script {
                        def jiraTickets = get_jira_ticket_from_commits()
                        if (env.IS_DEBUG.toBoolean()) {
                            echo "[DEBUG]jiraTickets: ${jiraTickets}"
                        }
                        def customBranchName = "${env.GIT_BRANCH_ALT}"
                        echo "[INFO] ### Custom jira branchName ==> ${customBranchName}"
                        if (!jiraTickets.isEmpty()) {
                            customBranchName = "${env.GIT_BRANCH_ALT}__${jiraTickets.join('__')}"
                            echo "[INFO] ### There are ticket number found in commit messages so extending customBranchname  ==> ${customBranchName}"
                        }
                        jiraSendBuildInfo site: '<<sdworx>>.atlassian.net', branch: "${customBranchName}"
                    }
                }
            }
        }

        // Publish private package for develop, master and release branches
        stage('Publish package') {
            when {
                environment name: 'SHOULD_BUILD', value: 'true'
                environment name: 'SHOULD_PUBLISH', value: 'true'
            }
            steps {
                script {
                    echo "[INFO] ### Set env variables"
                    def url = "git@" + env.GIT_URL.replaceFirst(".+://", "").replaceFirst("/", ":")
                    sh("git remote set-url origin ${url}")
                    // New function to publish a private package
                    echo "[INFO] ### Build all needed private packages for branch ${env.GIT_BRANCH_ALT}"
                    sh("git branch -u origin/${env.GIT_BRANCH_ALT}")
                    sh("git status")
                    sh("git fetch origin")
                    sh("git reset --hard")
                    sh("${env.FEATURE_BUMP_VERSION}")
                    if (env.FEATURE_SET_VERSION_TAG == null && env.FEATURE_SET_VERSION_TAG == 'null') {
                        echo "The package wasn't tagged as latest for the ${env.GIT_BRANCH_ALT} branch!"
                    } else {
                        sh("yarn publish --non-interactive --tag ${env.FEATURE_SET_VERSION_TAG} --verbose")
                    }
                    sh("git status")
                    sh("git pull origin")
                    sh("git push && git push --tags")
                    sh("git branch -a")
                }
            }
        }

        stage('Deploy artifacts') {
            when {
                environment name: 'SHOULD_BUILD', value: 'true'
                environment name: 'SHOULD_PUBLISH', value: 'true'
            }
            steps {
                parallel(
                    deploy_styles_to_s3: {
                        script {
                            echo "[INFO] ### Build all needed private packages"
                            sh("yarn clean:dist")
                            sh("yarn build")
                            // The new npm-package-version script are invoked and returned a version of a package.json
                            env.PROJECT_VERSION = sh([script: "npm run npm-package-version --silent", returnStdout: true ]).trim()
                            // The new definition of the s3Path variable has suppplied to set an unified path approach depends on environment and version
                            def s3PathAlt ="static-content/application-resource/<<tepsi>>/${env.PROJECT_VERSION}/"
                            echo "[INFO] ### env.PROJECT_VERSION: ${env.PROJECT_VERSION}"
                            echo "[INFO] ### s3PathAlt: ${env.S3_CACHE_CONTROL}"
                            echo "[INFO] ### s3CacheControl: ${env.S3_CACHE_CONTROL}"
                            s3Upload(bucket: "<<sdworx>>-static-content", path: "${s3PathAlt}", includePathPattern: '**/*.*', workingDir: "dist/styles", cacheControl: "${env.S3_CACHE_CONTROL}")
                            s3Upload(bucket: "<<sdworx>>-static-content", path: "${s3PathAlt}", includePathPattern: '**/*.*', workingDir: "public", cacheControl: "${env.S3_CACHE_CONTROL}")
                        }
                    },
                    deploy_storybook: {
                        script {
                            sh("./node_modules/.bin/cross-env APP_ENV=${env.ENVIRONMENT} NODE_ENV=production yarn run storybook:dist")
                            echo "[INFO] ### env.ENVIRONMENT: ${env.ENVIRONMENT}"
                            echo "[INFO] ### s3CacheControl: ${env.S3_CACHE_CONTROL}"
                            s3Upload(bucket: "855098603944-<<tepsi>>-${env.ENVIRONMENT}", path: "${env.ENVIRONMENT}/", includePathPattern: '**/*.*', workingDir: "dist-storybook", cacheControl: "${env.S3_CACHE_CONTROL}")
                            s3Upload(bucket: "855098603944-<<tepsi>>-${env.ENVIRONMENT}", path: "${env.ENVIRONMENT}/", includePathPattern: '**/*.*', workingDir: "public", cacheControl: "${env.S3_CACHE_CONTROL}")
                        }
                    }
                )
            }
        }

        stage('Create artifacts') {
            when {
                environment name: 'SHOULD_BUILD', value: 'true'
                environment name: 'SHOULD_PUBLISH', value: 'true'
            }
            steps {
                archiveArtifacts(artifacts: 'dist/**/*.*,dist-storybook/**/*.*', fingerprint: true, onlyIfSuccessful: true)
            }
        }
    }

    post {
        success {
            script {
                if (env.SHOULD_BUILD == 'true') {
                    buildType = "builded"
                    if (env.SHOULD_PUBLISH == 'true') {
                        buildType = "published"
                        if (env.IS_DEBUG.toBoolean()) {
                            echo "[DEBUG] Use JIRA env --> ${env.ENVIRONMENT_NAME}"
                        }
                        // jiraSendDeploymentInfo site: '<<sdworx>>.atlassian.net', environmentId: "${env.ENVIRONMENT}-<<tepsi>>", environmentName: "${env.ENVIRONMENT}-<<tepsi>>", environmentType: "${env.ENVIRONMENT_NAME}"
                        if (env.JIRA_WORKFLOWS?.trim() && !(env.JIRA_WORKFLOWS instanceof net.sf.json.JSONNull)) {
                            if (env.IS_DEBUG.toBoolean()) {
                                echo "[DEBUG] Use JIRA workflows --> ${env.JIRA_WORKFLOWS.getClass()}"
                            }
                            def jiraWorkflows = readJSON text: env.JIRA_WORKFLOWS
                            jiraWorkflows.each {
                                jiraWorkflow ->
                                    if (env.IS_DEBUG.toBoolean()) {
                                        echo "[DEBUG] Use JIRA workflow --> ${jiraWorkflow.getClass()}"
                                        echo "[DEBUG] Use JIRA workflow project --> ${jiraWorkflow['project']}"
                                        echo "[DEBUG] Use JIRA transitionDeploy --> ${jiraWorkflow['transitionDeploy']}"
                                        echo "[DEBUG] Use JIRA transitionDeployId --> ${jiraWorkflow['transitionDeployId']}"
                                        echo "[DEBUG] Use JIRA commentDeploy --> ${jiraWorkflow['commentDeploy']}"
                                    }
                                    try {
                                        def jiraTicketsDeploy = updateJiraTicket(bitbucketRepoGroup, bitbucketRepo, env.BITBUCKET_PR_ID, buildType, jiraServer, jiraWorkflow['transitionDeploy'], jiraWorkflow['transitionDeployId'], jiraWorkflow['commentDeploy'])
                                        if (jiraTicketsDeploy != null && jiraTicketsDeploy.size() != 0) {
                                            echo "[INFO] ### JIRA tickets have been updated"
                                        } else {
                                            echo "[INFO] ### JIRA tickets have not been updated"
                                        }
                                    } catch (error) {
                                        echo error.getMessage()
                                        currentBuild.result = 'SUCCESS'
                                    }
                            }
                        } else {
                            echo "[WARNING] ### Has NO jira workflow mappings"
                        }
                        slackSend channel: '#deploys-aem',
                                    color: 'good',
                                    message: "*Successfull ${buildType}* Job ${env.JOB_BASE_NAME} - ${env.BUILD_NUMBER} - Commit: ${env.GIT_COMMIT}\n More info at: ${env.BUILD_URL}"
                    } else {
                        try {
                            def jiraTickets = get_jira_ticket_from_commits()
                            if (env.IS_DEBUG.toBoolean()) {
                                echo "[DEBUG]jiraTickets: ${jiraTickets}"
                            }
                            jiraTickets.each {
                                // Actually post a comment
                                jiraTicket ->
                                    def comment = [body: "{panel:title=SUCCESS for ${bitbucketRepo}|borderStyle=dashed|borderColor=#ccc|titleBGColor=#00B300|bgColor=#D2F9BA}* Jenkins pipeline _*${currentBuild.fullDisplayName}*_ for Commit: _*${env.GIT_COMMIT}*_ on build _*#${env.BUILD_NUMBER}*_{panel}"]
                                    // Adding a succeful comment to the Jira issue by ID
                                    def responseComment = jiraAddComment idOrKey: jiraTicket, input: comment, site: jiraServer
                                    if (env.IS_DEBUG.toBoolean()) {
                                        echo responseComment.successful.toString()
                                        echo responseComment.data.toString()
                                    }
                            }
                        } catch (error) {
                            echo error.getMessage()
                            currentBuild.result = 'SUCCESS'
                        }
                    }
                }
            }
        }

        failure {
            slackSend channel: '#deploys-aem',
                        color: '#FF0000',
                    message: "Unsuccessful pipeline: *${currentBuild.fullDisplayName}* Commit: ${env.GIT_COMMIT}. Details: ${env.BUILD_URL}. "
        }

        cleanup {
            cleanWs(deleteDirs: true, notFailBuild: true)
        }
    }
}
