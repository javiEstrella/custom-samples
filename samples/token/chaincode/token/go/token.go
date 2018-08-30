package main

/* Imports
 * 4 utility libraries for formatting, handling bytes, reading and writing JSON, and string manipulation
 * 2 specific Hyperledger Fabric specific libraries for Smart Contracts
 */
import (
	"encoding/json"
	"fmt"
	"strconv"

	"github.com/hyperledger/fabric/core/chaincode/shim"
	sc "github.com/hyperledger/fabric/protos/peer"
)

// Define the Smart Contract structure
type SmartContract struct {
}

// Define the address structure, with 2 properties.  Structure tags are used by encoding/json library
type Address struct {
	Item  string `json:"item"`
	Owner  string `json:"owner"`
}

/*
 * The Init method is called when the Smart Contract "token" is instantiated by the blockchain network
 * Best practice is to have any Ledger initialization in separate function -- see initLedger()
 */
func (s *SmartContract) Init(APIstub shim.ChaincodeStubInterface) sc.Response {
	return shim.Success(nil)
}

/*
 * The Invoke method is called as a result of an application request to run the Smart Contract "token"
 * The calling application program has also specified the particular smart contract function to be called, with arguments
 */
func (s *SmartContract) Invoke(APIstub shim.ChaincodeStubInterface) sc.Response {

	// Retrieve the requested Smart Contract function and arguments
	function, args := APIstub.GetFunctionAndParameters()
	// Route to the appropriate handler function to interact with the ledger appropriately
	if function == "queryAddress" {
		return s.queryAddress(APIstub, args)

	} else if function == "initLedger" {
		return s.initLedger(APIstub)
	}

	return shim.Error("Invalid Smart Contract function name.")
}

func (s *SmartContract) queryAddress(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {

	if len(args) != 1 {
		return shim.Error("Incorrect number of arguments. Expecting 1")
	}

	addressAsBytes, _ := APIstub.GetState(args[0])
	return shim.Success(addressAsBytes)
}

func (s *SmartContract) initLedger(APIstub shim.ChaincodeStubInterface) sc.Response {
	addresses := []Address{
		Address{Item: "Pen", Owner: "Pepe"},
		Address{Item: "Pencil", Owner: "Pipo"},
		Address{Item: "Lighter", Owner: "Pupa"},
		Address{Item: "Book", Owner: "Pope"},
	}

	i := 0
	for i < len(addresses) {
		fmt.Println("i is ", i)
		addressAsBytes, _ := json.Marshal(addresses[i])
		APIstub.PutState("ADD"+strconv.Itoa(i), addressAsBytes)
		fmt.Println("Added", addresses[i])
		i = i + 1
	}

	return shim.Success(nil)
}

// The main function is only relevant in unit test mode. Only included here for completeness.
func main() {

	// Create a new Smart Contract
	err := shim.Start(new(SmartContract))
	if err != nil {
		fmt.Printf("Error creating new Smart Contract: %s", err)
	}
}
