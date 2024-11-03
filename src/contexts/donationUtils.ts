import { ethers } from 'ethers';

const CONTRACT_ADDRESS = "0x56fD3089FEDDc293B84747b2e32E7fFC7C336727";
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
