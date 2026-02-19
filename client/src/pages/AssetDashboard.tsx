import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TrendingUp, Wallet, Bitcoin, Zap, DollarSign } from 'lucide-react';
import { trpc } from '@/lib/trpc';
import { Web3WalletButton } from '@/components/Web3WalletButton';

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

interface BlockchainData {
  balances: WalletBalance[];
  transactions: Transaction[];
  nfts: any[];
  totalValue: number;
}

export default function AssetDashboard() {
  const [ethereumAddress, setEthereumAddress] = useState('');
  const [solanaAddress, setSolanaAddress] = useState('');
  const [bitcoinAddress, setBitcoinAddress] = useState('');
  const [blockchainData, setBlockchainData] = useState<BlockchainData | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const handleFetchData = async () => {
    setLoading(true);
    try {
      // Simulated blockchain data fetch
      // In production, this would call your blockchain.ts service via tRPC
      const mockData: BlockchainData = {
        balances: [
          ...(ethereumAddress ? [{
            address: ethereumAddress,
            chain: 'ethereum',
            balance: '2.5',
            usdValue: 5000,
            lastUpdated: new Date()
          }] : []),
          ...(solanaAddress ? [{
            address: solanaAddress,
            chain: 'solana',
            balance: '150',
            usdValue: 15000,
            lastUpdated: new Date()
          }] : []),
          ...(bitcoinAddress ? [{
            address: bitcoinAddress,
            chain: 'bitcoin',
            balance: '0.5',
            usdValue: 22500,
            lastUpdated: new Date()
          }] : [])
        ],
        transactions: [
          {
            hash: '0x1234567890abcdef',
            from: ethereumAddress || 'N/A',
            to: '0xabcdef1234567890',
            value: '1.5',
            timestamp: Date.now() - 86400000,
            status: 'success',
            chain: 'ethereum'
          },
          {
            hash: 'solana_tx_123',
            from: solanaAddress || 'N/A',
            to: 'recipient_address',
            value: '50',
            timestamp: Date.now() - 172800000,
            status: 'success',
            chain: 'solana'
          }
        ],
        nfts: [],
        totalValue: 42500
      };
      
      setBlockchainData(mockData);
    } catch (error) {
      console.error('Error fetching blockchain data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString() + ' ' + new Date(timestamp).toLocaleTimeString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-cyan-400 mb-2">
              Multi-Chain Asset Dashboard
            </h1>
            <p className="text-slate-400">Track your assets across Ethereum, Solana, and Bitcoin</p>
          </div>
          <Web3WalletButton />
        </div>

        {/* Wallet Input Section */}
        <Card className="bg-slate-900/50 border-rose-500/20 mb-8">
          <CardHeader>
            <CardTitle className="text-rose-400">Connect Wallets</CardTitle>
            <CardDescription>Enter your wallet addresses to track assets across chains</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm text-slate-300 mb-2 block">Ethereum Address</label>
                <Input
                  placeholder="0x..."
                  value={ethereumAddress}
                  onChange={(e) => setEthereumAddress(e.target.value)}
                  className="bg-slate-800 border-slate-700 text-white"
                />
              </div>
              <div>
                <label className="text-sm text-slate-300 mb-2 block">Solana Address</label>
                <Input
                  placeholder="Solana address"
                  value={solanaAddress}
                  onChange={(e) => setSolanaAddress(e.target.value)}
                  className="bg-slate-800 border-slate-700 text-white"
                />
              </div>
              <div>
                <label className="text-sm text-slate-300 mb-2 block">Bitcoin Address</label>
                <Input
                  placeholder="bc1q..."
                  value={bitcoinAddress}
                  onChange={(e) => setBitcoinAddress(e.target.value)}
                  className="bg-slate-800 border-slate-700 text-white"
                />
              </div>
            </div>
            <Button
              onClick={handleFetchData}
              disabled={loading || (!ethereumAddress && !solanaAddress && !bitcoinAddress)}
              className="w-full bg-gradient-to-r from-rose-500 to-cyan-500 hover:from-rose-600 hover:to-cyan-600 text-white"
            >
              {loading ? 'Fetching...' : 'Fetch Wallet Data'}
            </Button>
          </CardContent>
        </Card>

        {/* Data Display */}
        {blockchainData && (
          <>
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <Card className="bg-slate-900/50 border-rose-500/20">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm">Total Value</p>
                      <p className="text-2xl font-bold text-rose-400">${blockchainData.totalValue.toLocaleString()}</p>
                    </div>
                    <DollarSign className="text-rose-400" size={32} />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-900/50 border-cyan-500/20">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm">Wallets Connected</p>
                      <p className="text-2xl font-bold text-cyan-400">{blockchainData.balances.length}</p>
                    </div>
                    <Wallet className="text-cyan-400" size={32} />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-900/50 border-purple-500/20">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm">Transactions</p>
                      <p className="text-2xl font-bold text-purple-400">{blockchainData.transactions.length}</p>
                    </div>
                    <TrendingUp className="text-purple-400" size={32} />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-900/50 border-yellow-500/20">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm">NFTs</p>
                      <p className="text-2xl font-bold text-yellow-400">{blockchainData.nfts.length}</p>
                    </div>
                    <Zap className="text-yellow-400" size={32} />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Detailed Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <TabsList className="bg-slate-900/50 border border-slate-700">
                <TabsTrigger value="overview" className="text-rose-400">Overview</TabsTrigger>
                <TabsTrigger value="balances" className="text-cyan-400">Balances</TabsTrigger>
                <TabsTrigger value="transactions" className="text-purple-400">Transactions</TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview">
                <Card className="bg-slate-900/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-rose-400">Portfolio Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {blockchainData.balances.map((balance, idx) => (
                        <div key={idx} className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                          <div>
                            <p className="text-slate-300 font-semibold capitalize">{balance.chain}</p>
                            <p className="text-slate-500 text-sm">{formatAddress(balance.address)}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-slate-300 font-semibold">${balance.usdValue.toLocaleString()}</p>
                            <p className="text-slate-500 text-sm">{balance.balance} {balance.chain === 'ethereum' ? 'ETH' : balance.chain === 'solana' ? 'SOL' : 'BTC'}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Balances Tab */}
              <TabsContent value="balances">
                <Card className="bg-slate-900/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-cyan-400">Wallet Balances</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-slate-700">
                            <th className="text-left p-3 text-slate-400">Chain</th>
                            <th className="text-left p-3 text-slate-400">Address</th>
                            <th className="text-right p-3 text-slate-400">Balance</th>
                            <th className="text-right p-3 text-slate-400">USD Value</th>
                            <th className="text-left p-3 text-slate-400">Updated</th>
                          </tr>
                        </thead>
                        <tbody>
                          {blockchainData.balances.map((balance, idx) => (
                            <tr key={idx} className="border-b border-slate-700/50 hover:bg-slate-800/30">
                              <td className="p-3 text-slate-300 capitalize font-semibold">{balance.chain}</td>
                              <td className="p-3 text-slate-400 font-mono text-xs">{formatAddress(balance.address)}</td>
                              <td className="p-3 text-right text-slate-300">{balance.balance}</td>
                              <td className="p-3 text-right text-rose-400 font-semibold">${balance.usdValue.toLocaleString()}</td>
                              <td className="p-3 text-slate-500 text-xs">{formatDate(balance.lastUpdated.getTime())}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Transactions Tab */}
              <TabsContent value="transactions">
                <Card className="bg-slate-900/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-purple-400">Recent Transactions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {blockchainData.transactions.map((tx, idx) => (
                        <div key={idx} className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-3">
                              <div className={`w-2 h-2 rounded-full ${
                                tx.status === 'success' ? 'bg-green-500' : 
                                tx.status === 'pending' ? 'bg-yellow-500' : 
                                'bg-red-500'
                              }`} />
                              <span className="text-slate-300 font-mono text-sm">{formatAddress(tx.hash)}</span>
                            </div>
                            <span className={`text-xs px-2 py-1 rounded ${
                              tx.status === 'success' ? 'bg-green-500/20 text-green-400' :
                              tx.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                              'bg-red-500/20 text-red-400'
                            }`}>
                              {tx.status}
                            </span>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-slate-500">From</p>
                              <p className="text-slate-300 font-mono">{formatAddress(tx.from)}</p>
                            </div>
                            <div>
                              <p className="text-slate-500">To</p>
                              <p className="text-slate-300 font-mono">{formatAddress(tx.to)}</p>
                            </div>
                            <div>
                              <p className="text-slate-500">Amount</p>
                              <p className="text-slate-300 font-semibold">{tx.value} {tx.chain === 'ethereum' ? 'ETH' : tx.chain === 'solana' ? 'SOL' : 'BTC'}</p>
                            </div>
                            <div>
                              <p className="text-slate-500">Date</p>
                              <p className="text-slate-300 text-xs">{formatDate(tx.timestamp)}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </>
        )}
      </div>
    </div>
  );
}
