node {
    checkout scm
    docker.image('node:12').inside('-u root') {
        sh 'npm install'
        sh 'cp ./src/mode-prod.js ./src/mode.js'
        sh 'npm run build'
        sh 'ls'
    }
   docker.image('agung3wi/alpine-rsync:1.1').inside('-u root') {
        sshagent (credentials: ['ssh-teknisicilik']) {
            sh 'mkdir -p ~/.ssh'
            sh 'ssh-keyscan -H "pttas.xyz" > ~/.ssh/known_hosts'
            sh "rsync -rav --delete ./dist/ teknisicilik@pttas.xyz:/home/teknisicilik/freshgarden.pttas.xyz/public/"
        }
    }
}
