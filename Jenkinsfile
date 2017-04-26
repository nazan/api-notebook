#!groovy

node('exchange-jenkins-slave') {
  withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: 'github', passwordVariable: 'GITHUB_PASS', usernameVariable: 'GITHUB_USER']]) {
    git url: 'git@github.com:mulesoft/valkyr.git', branch: 'master'
    pipeline = load('pipeline.groovy')
    pipeline.jenkinsSteps()
  }
}
