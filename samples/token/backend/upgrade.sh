#!/bin/bash
set -e

if [ $# -ne 3 ]; then
        echo 'Use: '$0' version private amount'
	echo '\tversion: chaincode version'
        echo '\tprivate: private key'
        echo '\tamount: amount of tokens'
	exit 1
fi

# Address
VERSION=$1
ADDRESS=`echo -n $2 | md5sum | awk '{print $1}'`
AMOUNT=$3

MSPID="CORE_PEER_LOCALMSPID=Org1MSP"
MSPPATH="CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp" 
if [ $VERSION -eq 0 ]; then
        ACTION='instantiate'
else
        ACTION='upgrade'
fi

docker exec -e $MSPID -e $MSPPATH -d cli bash -c 'pkill node'
docker exec -e $MSPID -e $MSPPATH -w /opt/gopath/src/github.com/debug -d cli bash -c 'CORE_CHAINCODE_ID_NAME=token:'$VERSION' DEPLOY_MODE=dev node chaincode.js --peer.address peer0.org1.example.com:7052'

echo 'Running chaincode'
sleep 5

docker exec -e $MSPID -e $MSPPATH cli peer chaincode install -n token -v $VERSION -p "/opt/gopath/src/github.com/debug" -l "NODE"
docker exec -e $MSPID -e $MSPPATH cli peer chaincode $ACTION -o orderer.example.com:7050 -C mychannel -n token -l "NODE" -v $VERSION -c '{"Args":["init", "$ADDRESS", "$AMOUNT"]}' -P "OR ('Org1MSP.member','Org2MSP.member')"
