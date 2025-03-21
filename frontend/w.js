const contractAddress = "0xAEaF782791C94EC7CAc5Ae6cE893026b1D348D6c";
const contractABI = [[
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "contentId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "title",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "creator",
				"type": "address"
			}
		],
		"name": "ContentCreated",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_title",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_description",
				"type": "string"
			}
		],
		"name": "createContent",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_contentId",
				"type": "uint256"
			}
		],
		"name": "donateToContent",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "contentId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "donor",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "DonationReceived",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "contentCount",
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
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "contents",
		"outputs": [
			{
				"internalType": "string",
				"name": "title",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "description",
				"type": "string"
			},
			{
				"internalType": "address payable",
				"name": "creator",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "totalDonations",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_contentId",
				"type": "uint256"
			}
		],
		"name": "getContent",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
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
		"stateMutability": "view",
		"type": "function"
	}
]
    // 🔹 Paste your Smart Contract ABI here
];

let web3;
let contract;
let userAccount;

// 🔥 Improved MetaMask Connection Function
async function connectWallet() {
    if (typeof window.ethereum !== "undefined") {
        try {
            // Request account access
            const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
            userAccount = accounts[0];

            // ✅ Initialize Web3 with MetaMask provider
            web3 = new Web3(window.ethereum);

            // ✅ Load Smart Contract
            contract = new web3.eth.Contract(contractABI, contractAddress);

            // ✅ Update UI with Connected Address
            document.getElementById("walletAddress").innerText = `🔗 Connected: ${userAccount.slice(0, 6)}...${userAccount.slice(-4)}`;

            // ✅ Auto-refresh content after connection
            loadContent();

            // ✅ Listen for Account Changes
            window.ethereum.on("accountsChanged", (accounts) => {
                if (accounts.length > 0) {
                    userAccount = accounts[0];
                    document.getElementById("walletAddress").innerText = `🔗 Connected: ${userAccount.slice(0, 6)}...${userAccount.slice(-4)}`;
                } else {
                    userAccount = null;
                    document.getElementById("walletAddress").innerText = "🔴 Disconnected";
                }
            });

        } catch (error) {
            console.error("❌ Connection Error:", error);
            alert("⚠️ MetaMask Connection Failed! Try again.");
        }
    } else {
        alert("⚠️ MetaMask is not installed! Get it from https://metamask.io/");
    }
}

// ✅ Auto-detect MetaMask and update UI
window.addEventListener("load", async () => {
    if (typeof window.ethereum !== "undefined") {
        document.getElementById("connectBtn").innerText = "🔗 Connect Wallet";
    } else {
        document.getElementById("connectBtn").innerText = "❌ Install MetaMask";
        document.getElementById("connectBtn").disabled = true;
    }
});
