#!/bin/bash
set -e

if [ $# -ne 2 ]; then
		echo 'Use: '$0' private amount'
		echo '\tprivate: private key'
		echo '\tamount: amount of tokens'
	exit 1
fi

# Neutral path
cd ../

# don't rewrite paths for Windows Git Bash users
export MSYS_NO_PATHCONV=1
starttime=$(date +%s)
cd backend
rm -rf ./hfc-key-store
cd ..

# launch network; create channel and join peer to channel
cd network
./start.sh
cd ..

# Install packages
cd backend
echo 'npm install'
cp ../offline/backend.tar .
tar -xf backend.tar
rm backend.tar
cd ..

# Now launch the CLI container in order to install and instantiate chaincode
cd network
docker-compose -f ./docker-compose.yml up -d cli
cd ..

if [ -d 'chaincode/debug' ]; then
	rm -rf 'chaincode/debug'
fi

docker exec cli bash -c 'cp -r /opt/gopath/src/github.com/token /opt/gopath/src/github.com/debug'
docker exec -w /opt/gopath/src/github.com cli bash -c 'chmod 777 debug -R'
cd chaincode/debug
cp ../../offline/docker.tar .
tar -xf docker.tar
cd ../../

cd backend/util
sh upgrade.sh 0 $1 $2
cd ../../

# Register users
cd backend/util
echo 'Enroll user'
node enrollAdmin.js

echo 'Register user'
node registerUser.js
cd ../../

cd backend

# End
printf "\nTotal setup execution time : $(($(date +%s) - starttime)) secs ...\n\n\n"
printf "Run 'node app' to start the app\n"
printf "Run 'pushd util; sh upgrade.sh [version] [address] [amount]; popd' to update the chaincode\n\n"
