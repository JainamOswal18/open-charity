
"use client";
import React, { createContext, useState, useContext, useEffect } from 'react';
import { ethers } from 'ethers';

// Type declaration for window.ethereum
declare global {
  interface Window {
    ethereum?: any;
  }
}

interface WalletContextType {
  account: string | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [account, setAccount] = useState<string | null>(null);

  // Helper function to access `window.ethereum` safely
  const getEthereumProvider = () => {
    if (typeof window !== 'undefined' && window.ethereum) {
      return window.ethereum;
    }
    console.warn("Ethereum provider not found. Please install MetaMask.");
    return null;
  };

  const connectWallet = async () => {
    const ethereum = getEthereumProvider();
    if (ethereum) {
      try {
        await ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.BrowserProvider(ethereum);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
      } catch (error) {
        console.error("Failed to connect wallet:", error);
      }
    } else {
      alert("Please install MetaMask or another Ethereum wallet");
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
  };

  useEffect(() => {
    const checkConnection = async () => {
      const ethereum = getEthereumProvider();
      if (ethereum) {
        const provider = new ethers.BrowserProvider(ethereum);
        try {
          const accounts = await provider.listAccounts();
          if (accounts.length > 0) {
            const address = accounts[0].address;
            setAccount(address);
          }
        } catch (error) {
          console.error("Failed to check wallet connection:", error);
        }
      }
    };

    checkConnection();

    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length > 0) {
        setAccount(accounts[0]);
      } else {
        setAccount(null);
      }
    };

    const ethereum = getEthereumProvider();
    if (ethereum) {
      ethereum.on('accountsChanged', handleAccountsChanged);
    }

    return () => {
      const ethereum = getEthereumProvider();
      if (ethereum) {
        ethereum.removeListener('accountsChanged', handleAccountsChanged);
      }
    };
  }, []);

  return (
    <WalletContext.Provider value={{ account, connectWallet, disconnectWallet }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};

// "use client"

// import React, { createContext, useState, useContext, useEffect } from 'react';
// import { ethers } from 'ethers';

// // Add type declaration for window.ethereum
// // declare global {
// //   interface Window {
// //     ethereum?: any;
// //   }
// // }

// interface WalletContextType {
//   account: string | null;
//   connectWallet: () => Promise<void>;
//   disconnectWallet: () => void;
// }

// const WalletContext = createContext<WalletContextType | undefined>(undefined);

// export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [account, setAccount] = useState<string | null>(null);

//   const connectWallet = async () => {
//     if (typeof window.ethereum !== 'undefined') {
//       try {
//         await window.ethereum.request({ method: 'eth_requestAccounts' });
//         const provider = new ethers.BrowserProvider(window.ethereum);
//         const signer = await provider.getSigner();
//         const address = await signer.getAddress();
//         setAccount(address); // Now we're setting the address string, not the signer
//       } catch (error) {
//         console.error("Failed to connect wallet:", error);
//       }
//     } else {
//       alert("Please install MetaMask or another Ethereum wallet");
//     }
//   };

//   const disconnectWallet = () => {
//     setAccount(null);
//   };

//   useEffect(() => {
//     const checkConnection = async () => {
//       if (typeof window.ethereum !== 'undefined') {
//         const provider = new ethers.BrowserProvider(window.ethereum);
//         try {
//           const accounts = await provider.listAccounts();
//           if (accounts.length > 0) {
//             const address = accounts[0].address; // Access the address property
//             setAccount(address);
//           }
//         } catch (error) {
//           console.error("Failed to check wallet connection:", error);
//         }
//       }
//     };

//     checkConnection();

//     // Add event listeners for account changes
//     const handleAccountsChanged = (accounts: string[]) => {
//       if (accounts.length > 0) {
//         setAccount(accounts[0]);
//       } else {
//         setAccount(null);
//       }
//     };

//     if (window.ethereum) {
//       window.ethereum.on('accountsChanged', handleAccountsChanged);
//     }

//     // Cleanup event listener
//     return () => {
//       if (window.ethereum) {
//         window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
//       }
//     };
//   }, []);

//   return (
//     <WalletContext.Provider value={{ account, connectWallet, disconnectWallet }}>
//       {children}
//     </WalletContext.Provider>
//   );
// };

// export const useWallet = () => {
//   const context = useContext(WalletContext);
//   if (context === undefined) {
//     throw new Error('useWallet must be used within a WalletProvider');
//   }
//   return context;
// };