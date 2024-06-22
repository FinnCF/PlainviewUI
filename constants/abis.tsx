export const ERCKMS1_ABI = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_initialFee",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "newFee",
				"type": "uint256"
			}
		],
		"name": "AdditionFeeChanged",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "bytes",
				"name": "publicRSAKey",
				"type": "bytes"
			},
			{
				"internalType": "bytes",
				"name": "encryptedPrivateRSAKey",
				"type": "bytes"
			},
			{
				"internalType": "bytes",
				"name": "iv",
				"type": "bytes"
			}
		],
		"name": "addKey",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "deleteLatestKey",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "newFee",
				"type": "uint256"
			}
		],
		"name": "DeletionFeeChanged",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "newInstructions",
				"type": "string"
			}
		],
		"name": "EncryptionInstructionsUpdated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "FundsWithdrawn",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "totalKeys",
				"type": "uint256"
			}
		],
		"name": "KeyDeleted",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "totalKeys",
				"type": "uint256"
			}
		],
		"name": "KeyMade",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_instructions",
				"type": "string"
			}
		],
		"name": "setEncryptionInstructions",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_fee",
				"type": "uint256"
			}
		],
		"name": "setKeyAdditionFee",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_fee",
				"type": "uint256"
			}
		],
		"name": "setKeyDeletionFee",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "withdraw",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "encryptionInstructions",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_address",
				"type": "address"
			}
		],
		"name": "getCurrentKey",
		"outputs": [
			{
				"components": [
					{
						"internalType": "bytes",
						"name": "publicRSAKey",
						"type": "bytes"
					},
					{
						"internalType": "bytes",
						"name": "encryptedPrivateRSAKey",
						"type": "bytes"
					},
					{
						"internalType": "bytes",
						"name": "iv",
						"type": "bytes"
					},
					{
						"internalType": "uint256",
						"name": "blockNumber",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "timestamp",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "deprecated",
						"type": "uint256"
					}
				],
				"internalType": "struct EthKeysV1.Key",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_address",
				"type": "address"
			}
		],
		"name": "getKeys",
		"outputs": [
			{
				"components": [
					{
						"internalType": "bytes",
						"name": "publicRSAKey",
						"type": "bytes"
					},
					{
						"internalType": "bytes",
						"name": "encryptedPrivateRSAKey",
						"type": "bytes"
					},
					{
						"internalType": "bytes",
						"name": "iv",
						"type": "bytes"
					},
					{
						"internalType": "uint256",
						"name": "blockNumber",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "timestamp",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "deprecated",
						"type": "uint256"
					}
				],
				"internalType": "struct EthKeysV1.Key[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_address",
				"type": "address"
			}
		],
		"name": "getUserKeysLength",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "keyAdditionFee",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "keyDeletionFee",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "keys",
		"outputs": [
			{
				"internalType": "bytes",
				"name": "publicRSAKey",
				"type": "bytes"
			},
			{
				"internalType": "bytes",
				"name": "encryptedPrivateRSAKey",
				"type": "bytes"
			},
			{
				"internalType": "bytes",
				"name": "iv",
				"type": "bytes"
			},
			{
				"internalType": "uint256",
				"name": "blockNumber",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "deprecated",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalKeys",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

export const ERCFMS1_ABI = [
	{
		"inputs": [
			{
				"internalType": "bytes",
				"name": "encryptedData",
				"type": "bytes"
			},
			{
				"internalType": "bytes",
				"name": "encryptedName",
				"type": "bytes"
			},
			{
				"internalType": "bytes",
				"name": "encryptedFolder",
				"type": "bytes"
			},
			{
				"internalType": "bytes",
				"name": "encryptedKind",
				"type": "bytes"
			},
			{
				"internalType": "bytes",
				"name": "encryptedAESKey",
				"type": "bytes"
			},
			{
				"internalType": "bytes",
				"name": "iv",
				"type": "bytes"
			},
			{
				"internalType": "bytes",
				"name": "contentHash",
				"type": "bytes"
			}
		],
		"name": "addFile",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "FileAdded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "receiver",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "FileSent",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "receiver",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "fileIndex",
				"type": "uint256"
			},
			{
				"internalType": "bytes",
				"name": "encryptedData",
				"type": "bytes"
			},
			{
				"internalType": "bytes",
				"name": "encryptedName",
				"type": "bytes"
			},
			{
				"internalType": "bytes",
				"name": "encryptedFolder",
				"type": "bytes"
			},
			{
				"internalType": "bytes",
				"name": "encryptedKind",
				"type": "bytes"
			},
			{
				"internalType": "bytes",
				"name": "encryptedAESKey",
				"type": "bytes"
			},
			{
				"internalType": "bytes",
				"name": "iv",
				"type": "bytes"
			}
		],
		"name": "sendFile",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			}
		],
		"name": "getReceivedFiles",
		"outputs": [
			{
				"components": [
					{
						"internalType": "bytes",
						"name": "encryptedData",
						"type": "bytes"
					},
					{
						"internalType": "bytes",
						"name": "encryptedName",
						"type": "bytes"
					},
					{
						"internalType": "bytes",
						"name": "encryptedFolder",
						"type": "bytes"
					},
					{
						"internalType": "bytes",
						"name": "encryptedKind",
						"type": "bytes"
					},
					{
						"internalType": "bytes",
						"name": "encryptedAESKey",
						"type": "bytes"
					},
					{
						"internalType": "bytes",
						"name": "iv",
						"type": "bytes"
					},
					{
						"internalType": "bytes",
						"name": "contentHash",
						"type": "bytes"
					},
					{
						"internalType": "uint256",
						"name": "blockNumber",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "timestamp",
						"type": "uint256"
					},
					{
						"internalType": "address[]",
						"name": "sentTo",
						"type": "address[]"
					}
				],
				"internalType": "struct ERCFMS1.File[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			}
		],
		"name": "getReceivedFilesCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			}
		],
		"name": "getUserFiles",
		"outputs": [
			{
				"components": [
					{
						"internalType": "bytes",
						"name": "encryptedData",
						"type": "bytes"
					},
					{
						"internalType": "bytes",
						"name": "encryptedName",
						"type": "bytes"
					},
					{
						"internalType": "bytes",
						"name": "encryptedFolder",
						"type": "bytes"
					},
					{
						"internalType": "bytes",
						"name": "encryptedKind",
						"type": "bytes"
					},
					{
						"internalType": "bytes",
						"name": "encryptedAESKey",
						"type": "bytes"
					},
					{
						"internalType": "bytes",
						"name": "iv",
						"type": "bytes"
					},
					{
						"internalType": "bytes",
						"name": "contentHash",
						"type": "bytes"
					},
					{
						"internalType": "uint256",
						"name": "blockNumber",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "timestamp",
						"type": "uint256"
					},
					{
						"internalType": "address[]",
						"name": "sentTo",
						"type": "address[]"
					}
				],
				"internalType": "struct ERCFMS1.File[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			}
		],
		"name": "getUserFilesCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "receivedFiles",
		"outputs": [
			{
				"internalType": "bytes",
				"name": "encryptedData",
				"type": "bytes"
			},
			{
				"internalType": "bytes",
				"name": "encryptedName",
				"type": "bytes"
			},
			{
				"internalType": "bytes",
				"name": "encryptedFolder",
				"type": "bytes"
			},
			{
				"internalType": "bytes",
				"name": "encryptedKind",
				"type": "bytes"
			},
			{
				"internalType": "bytes",
				"name": "encryptedAESKey",
				"type": "bytes"
			},
			{
				"internalType": "bytes",
				"name": "iv",
				"type": "bytes"
			},
			{
				"internalType": "bytes",
				"name": "contentHash",
				"type": "bytes"
			},
			{
				"internalType": "uint256",
				"name": "blockNumber",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "userFiles",
		"outputs": [
			{
				"internalType": "bytes",
				"name": "encryptedData",
				"type": "bytes"
			},
			{
				"internalType": "bytes",
				"name": "encryptedName",
				"type": "bytes"
			},
			{
				"internalType": "bytes",
				"name": "encryptedFolder",
				"type": "bytes"
			},
			{
				"internalType": "bytes",
				"name": "encryptedKind",
				"type": "bytes"
			},
			{
				"internalType": "bytes",
				"name": "encryptedAESKey",
				"type": "bytes"
			},
			{
				"internalType": "bytes",
				"name": "iv",
				"type": "bytes"
			},
			{
				"internalType": "bytes",
				"name": "contentHash",
				"type": "bytes"
			},
			{
				"internalType": "uint256",
				"name": "blockNumber",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
