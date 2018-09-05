#!/bin/bash
set -e

if [ $# -ne 2 ]; then
        echo 'Use: '$0' private amount'
        echo '\tprivate: private key'
        echo '\tamount: amount of tokens'
	exit 1
fi

# don't rewrite paths for Windows Git Bash users
export MSYS_NO_PATHCONV=1
starttime=$(date +%s)
rm -rf ./hfc-key-store

# launch network; create channel and join peer to channel
cd ../network
./start.sh

# Now launch the CLI container in order to install and instantiate chaincode
docker-compose -f ./docker-compose.yml up -d cli

if [ -d '../chaincode/debug' ]; then
	rm -rf '../chaincode/debug'
fi

docker exec cli bash -c 'cp -r /opt/gopath/src/github.com/token /opt/gopath/src/github.com/debug'
docker exec -w /opt/gopath/src/github.com/debug cli bash -c 'npm install; cd ..; chmod 777 debug -R'

cd ../backend
sh upgrade.sh 0 $1 $2

printf "\nTotal setup execution time : $(($(date +%s) - starttime)) secs ...\n\n\n"
printf "Start by installing required packages run 'npm install'\n"
printf "Then run 'node enrollAdmin', then 'node registerUser'\n"
printf "To conclude run 'node app' to start the app\n\n"