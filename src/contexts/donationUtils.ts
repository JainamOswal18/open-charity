import { ethers } from 'ethers';

const CONTRACT_ADDRESS = "0x21414f02dafe8441bA2a88A6f6790A531E971171";
const CONTRACT_ABI = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "charity",
				"type": "address"
			}
		],
		"name": "CharityRegistered",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address payable",
				"name": "_charity",
				"type": "address"
			}
		],
		"name": "donate",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "donor",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "charity",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"name": "DonationMade",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_charity",
				"type": "address"
			}
		],
		"name": "registerCharity",
		"outputs": [],
		"stateMutability": "nonpayable",
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
		"name": "donations",
		"outputs": [
			{
				"internalType": "address",
				"name": "charity",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
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
				"name": "_donor",
				"type": "address"
			}
		],
		"name": "getDonationHistory",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "charity",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "amount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "timestamp",
						"type": "uint256"
					}
				],
				"internalType": "struct CharityDonation.Donation[]",
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
				"name": "_charity",
				"type": "address"
			}
		],
		"name": "getTotalDonations",
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
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "registeredCharities",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
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
			}
		],
		"name": "totalDonations",
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

export const donateCrypto = async (charityAddress: string, amount: string) => {
  if (typeof window.ethereum !== 'undefined') {
    try {
      console.log("Requesting account access...");
      await window.ethereum.request({ method: 'eth_requestAccounts' });

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      console.log("Preparing to donate. Charity Address:", charityAddress, "Amount:", amount);
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

      const tx = await contract.donate(charityAddress, {
        value: ethers.parseEther(amount),
      });

      console.log("Transaction sent. Waiting for confirmation...");
      const receipt = await tx.wait();
      console.log("Donation Successful. Receipt:", receipt);

      return receipt;
    } catch (error) {
      console.error("Error in donation transaction:", error);
      throw error;
    }
  } else {
    throw new Error("Ethereum object not found, install MetaMask.");
  }
};

export const getDonationHistory = async (walletAddress: string) => {
  if (typeof window.ethereum !== 'undefined') {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

      const donations = await contract.getDonationHistory(walletAddress);
      return donations;
    } catch (error) {
      console.error("Error fetching donation history:", error);
      throw error;
    }
  } else {
    throw new Error("Ethereum object not found, install MetaMask.");
  }
};


export const getCharityInfo = async (charityAddress: string) => {
  if (typeof window.ethereum !== 'undefined') {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);

      const totalDonations = await contract.getTotalDonations(charityAddress);
      return ethers.formatEther(totalDonations);
    } catch (error) {
      console.error("Error fetching charity info:", error);
      throw error;
    }
  } else {
    throw new Error("Ethereum object not found, install MetaMask.");
  }
};