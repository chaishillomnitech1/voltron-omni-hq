import { useState, useEffect } from 'react';
import { BrowserProvider, formatEther, Contract } from 'ethers';

interface WalletState {
  address: string | null;
  balance: string | null;
  chainId: number | null;
  isConnected: boolean;
  isConnecting: boolean;
  error: string | null;
}

export function useWeb3Wallet() {
  const [wallet, setWallet] = useState<WalletState>({
    address: null,
    balance: null,
    chainId: null,
    isConnected: false,
    isConnecting: false,
    error: null,
  });

  // Check if MetaMask is installed
  const isMetaMaskInstalled = () => {
    return typeof window !== 'undefined' && typeof (window as any).ethereum !== 'undefined';
  };

  // Connect wallet
  const connectWallet = async () => {
    if (!isMetaMaskInstalled()) {
      setWallet(prev => ({
        ...prev,
        error: 'MetaMask is not installed. Please install it to continue.',
      }));
      return;
    }

    setWallet(prev => ({ ...prev, isConnecting: true, error: null }));

    try {
      const provider = new BrowserProvider((window as any).ethereum);
      const accounts = await (window as any).ethereum.request({
        method: 'eth_requestAccounts',
      });

      if (accounts.length === 0) {
        throw new Error('No accounts found');
      }

      const address = accounts[0];
      const balance = await provider.getBalance(address);
      const network = await provider.getNetwork();

      setWallet({
        address,
        balance: formatEther(balance),
        chainId: Number(network?.chainId),
        isConnected: true,
        isConnecting: false,
        error: null,
      });
    } catch (error: any) {
      setWallet(prev => ({
        ...prev,
        isConnecting: false,
        error: error.message || 'Failed to connect wallet',
      }));
    }
  };

  // Disconnect wallet
  const disconnectWallet = () => {
    setWallet({
      address: null,
      balance: null,
      chainId: null,
      isConnected: false,
      isConnecting: false,
      error: null,
    });
  };

  // Switch network to Sepolia
  const switchToSepolia = async () => {
    if (!isMetaMaskInstalled()) {
      setWallet(prev => ({
        ...prev,
        error: 'MetaMask is not installed',
      }));
      return;
    }

    try {
      await (window as any).ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0xaa36a7' }], // Sepolia chain ID
      });
    } catch (error: any) {
      if (error.code === 4902) {
        // Network not added, try to add it
        try {
          await (window as any).ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: '0xaa36a7',
                chainName: 'Sepolia',
                rpcUrls: ['https://sepolia.infura.io/v3/YOUR_INFURA_KEY'],
                blockExplorerUrls: ['https://sepolia.etherscan.io'],
                nativeCurrency: {
                  name: 'Sepolia ETH',
                  symbol: 'ETH',
                  decimals: 18,
                },
              },
            ],
          });
        } catch (addError) {
          setWallet(prev => ({
            ...prev,
            error: 'Failed to add Sepolia network',
          }));
        }
      } else {
        setWallet(prev => ({
          ...prev,
          error: 'Failed to switch network',
        }));
      }
    }
  };

  // Get contract instance
  const getContractInstance = async (
    contractAddress: string,
    contractABI: any
  ) => {
    if (!wallet.isConnected) {
      throw new Error('Wallet not connected');
    }

    const provider = new BrowserProvider((window as any).ethereum);
    const signer = await provider.getSigner();
    return new Contract(contractAddress, contractABI, signer);
  };

  // Listen for account changes
  useEffect(() => {
    if (!isMetaMaskInstalled()) return;

    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length === 0) {
        disconnectWallet();
      } else {
        connectWallet();
      }
    };

    const handleChainChanged = () => {
      window.location.reload();
    };

    (window as any).ethereum.on('accountsChanged', handleAccountsChanged);
    (window as any).ethereum.on('chainChanged', handleChainChanged);

    return () => {
      (window as any).ethereum.removeListener('accountsChanged', handleAccountsChanged);
      (window as any).ethereum.removeListener('chainChanged', handleChainChanged);
    };
  }, []);

  // Check if already connected on mount
  useEffect(() => {
    const checkConnection = async () => {
      if (!isMetaMaskInstalled()) return;

      try {
        const accounts = await (window as any).ethereum.request({
          method: 'eth_accounts',
        });

        if (accounts.length > 0) {
          connectWallet();
        }
      } catch (error) {
        console.error('Error checking wallet connection:', error);
      }
    };

    checkConnection();
  }, []);

  return {
    ...wallet,
    connectWallet,
    disconnectWallet,
    switchToSepolia,
    getContractInstance,
    isMetaMaskInstalled,
  };
}
