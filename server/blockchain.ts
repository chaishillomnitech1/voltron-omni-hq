/**
 * Multi-Chain Blockchain Integration Service
 * Supports: Ethereum, Solana, Bitcoin
 * Provides real-time wallet data, transaction history, and asset tracking
 */

import axios from 'axios';

interface WalletBalance {
  address: string;
  chain: string;
  balance: string;
  usdValue: number;
  lastUpdated: Date;
}

interface Transaction {
  hash: string;
  from: string;
  to: string;
  value: string;
  timestamp: number;
  status: 'success' | 'pending' | 'failed';
  chain: string;
}

interface NFTAsset {
  contractAddress: string;
  tokenId: string;
  name: string;
  image: string;
  chain: string;
  owner: string;
}

interface BlockchainData {
  balances: WalletBalance[];
  transactions: Transaction[];
  nfts: NFTAsset[];
  totalValue: number;
}

// Ethereum Integration
export async function getEthereumData(address: string): Promise<BlockchainData> {
  try {
    const etherscanApiKey = process.env.ETHERSCAN_API_KEY || 'demo';
    
    // Get ETH balance
    const balanceResponse = await axios.get(
      `https://api.etherscan.io/api?module=account&action=balance&address=${address}&apikey=${etherscanApiKey}`
    );
    
    const ethBalance = balanceResponse.data.result ? 
      (parseInt(balanceResponse.data.result) / 1e18).toString() : '0';
    
    // Get transactions
    const txResponse = await axios.get(
      `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&apikey=${etherscanApiKey}`
    );
    
    const transactions: Transaction[] = (txResponse.data.result || []).map((tx: any) => ({
      hash: tx.hash,
      from: tx.from,
      to: tx.to,
      value: (parseInt(tx.value) / 1e18).toString(),
      timestamp: parseInt(tx.timeStamp),
      status: tx.isError === '0' ? 'success' : 'failed',
      chain: 'ethereum'
    }));
    
    // Get NFTs (simplified - would need OpenSea API for full data)
    const nfts: NFTAsset[] = [];
    
    return {
      balances: [{
        address,
        chain: 'ethereum',
        balance: ethBalance,
        usdValue: parseFloat(ethBalance) * 2000, // Approximate ETH price
        lastUpdated: new Date()
      }],
      transactions: transactions.slice(0, 20),
      nfts,
      totalValue: parseFloat(ethBalance) * 2000
    };
  } catch (error) {
    console.error('Error fetching Ethereum data:', error);
    return { balances: [], transactions: [], nfts: [], totalValue: 0 };
  }
}

// Solana Integration
export async function getSolanaData(address: string): Promise<BlockchainData> {
  try {
    // Using Solana RPC endpoint
    const rpcEndpoint = 'https://api.mainnet-beta.solana.com';
    
    // Get SOL balance
    const balanceResponse = await axios.post(rpcEndpoint, {
      jsonrpc: '2.0',
      id: 1,
      method: 'getBalance',
      params: [address]
    });
    
    const solBalance = (balanceResponse.data.result?.value || 0) / 1e9;
    
    // Get transaction history
    const txResponse = await axios.post(rpcEndpoint, {
      jsonrpc: '2.0',
      id: 1,
      method: 'getSignaturesForAddress',
      params: [address, { limit: 20 }]
    });
    
    const transactions: Transaction[] = (txResponse.data.result || []).map((tx: any) => ({
      hash: tx.signature,
      from: address,
      to: address,
      value: '0',
      timestamp: (tx.blockTime || 0) * 1000,
      status: tx.err ? 'failed' : 'success',
      chain: 'solana'
    }));
    
    return {
      balances: [{
        address,
        chain: 'solana',
        balance: solBalance.toString(),
        usdValue: solBalance * 100, // Approximate SOL price
        lastUpdated: new Date()
      }],
      transactions,
      nfts: [],
      totalValue: solBalance * 100
    };
  } catch (error) {
    console.error('Error fetching Solana data:', error);
    return { balances: [], transactions: [], nfts: [], totalValue: 0 };
  }
}

// Bitcoin Integration
export async function getBitcoinData(address: string): Promise<BlockchainData> {
  try {
    // Using Blockchain.com API
    const response = await axios.get(
      `https://blockchain.info/q/addressbalance/${address}?format=json`
    );
    
    const btcBalance = (response.data / 1e8).toString();
    
    // Get transactions
    const txResponse = await axios.get(
      `https://blockchain.info/address/${address}?format=json&limit=20`
    );
    
    const transactions: Transaction[] = (txResponse.data.txs || []).map((tx: any) => ({
      hash: tx.hash,
      from: address,
      to: address,
      value: (tx.result / 1e8).toString(),
      timestamp: tx.time * 1000,
      status: 'success',
      chain: 'bitcoin'
    }));
    
    return {
      balances: [{
        address,
        chain: 'bitcoin',
        balance: btcBalance,
        usdValue: parseFloat(btcBalance) * 45000, // Approximate BTC price
        lastUpdated: new Date()
      }],
      transactions,
      nfts: [],
      totalValue: parseFloat(btcBalance) * 45000
    };
  } catch (error) {
    console.error('Error fetching Bitcoin data:', error);
    return { balances: [], transactions: [], nfts: [], totalValue: 0 };
  }
}

// Aggregate data from all chains
export async function getMultiChainData(
  ethereumAddress?: string,
  solanaAddress?: string,
  bitcoinAddress?: string
): Promise<BlockchainData> {
  const results = await Promise.all([
    ethereumAddress ? getEthereumData(ethereumAddress) : Promise.resolve({ balances: [], transactions: [], nfts: [], totalValue: 0 }),
    solanaAddress ? getSolanaData(solanaAddress) : Promise.resolve({ balances: [], transactions: [], nfts: [], totalValue: 0 }),
    bitcoinAddress ? getBitcoinData(bitcoinAddress) : Promise.resolve({ balances: [], transactions: [], nfts: [], totalValue: 0 })
  ]);
  
  return {
    balances: results.flatMap(r => r.balances),
    transactions: results.flatMap(r => r.transactions).sort((a, b) => b.timestamp - a.timestamp),
    nfts: results.flatMap(r => r.nfts),
    totalValue: results.reduce((sum, r) => sum + r.totalValue, 0)
  };
}
