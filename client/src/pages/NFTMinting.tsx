import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Crown, Zap, Heart, TrendingUp, Lock, Shield, Wallet, CheckCircle, AlertCircle } from 'lucide-react';
import { trpc } from '@/lib/trpc';

export default function NFTMinting() {
  const [activeTab, setActiveTab] = useState('collections');
  const [collectionName, setCollectionName] = useState('');
  const [collectionSymbol, setCollectionSymbol] = useState('');
  const [royaltyPercentage, setRoyaltyPercentage] = useState(10);
  const [nftName, setNftName] = useState('Lyric Plaque: Prophecy Fulfilled');
  const [nftDescription, setNftDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  
  // MetaMask state
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [networkId, setNetworkId] = useState<number | null>(null);
  const [deployingContract, setDeployingContract] = useState(false);

  const createCollectionMutation = trpc.nft.createCollection.useMutation();
  const mintNFTMutation = trpc.nft.mintNFT.useMutation();

  // Check for MetaMask on mount
  useEffect(() => {
    checkMetaMaskConnection();
    if (typeof window !== 'undefined' && (window as any).ethereum) {
      (window as any).ethereum.on('accountsChanged', handleAccountsChanged);
      (window as any).ethereum.on('chainChanged', handleChainChanged);
    }
    return () => {
      if (typeof window !== 'undefined' && (window as any).ethereum) {
        (window as any).ethereum.removeListener('accountsChanged', handleAccountsChanged);
        (window as any).ethereum.removeListener('chainChanged', handleChainChanged);
      }
    };
  }, []);

  const checkMetaMaskConnection = async () => {
    if (typeof window !== 'undefined' && (window as any).ethereum) {
      try {
        const accounts = await (window as any).ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          setWalletConnected(true);
          setWalletAddress(accounts[0]);
          const chainId = await (window as any).ethereum.request({ method: 'eth_chainId' });
          setNetworkId(parseInt(chainId, 16));
        }
      } catch (error) {
        console.error('Error checking MetaMask:', error);
      }
    }
  };

  const handleAccountsChanged = (accounts: string[]) => {
    if (accounts.length > 0) {
      setWalletConnected(true);
      setWalletAddress(accounts[0]);
    } else {
      setWalletConnected(false);
      setWalletAddress(null);
    }
  };

  const handleChainChanged = (chainId: string) => {
    setNetworkId(parseInt(chainId, 16));
  };

  const connectWallet = async () => {
    if (!(window as any).ethereum) {
      alert('Please install MetaMask to use NFT minting');
      return;
    }

    try {
      setIsConnecting(true);
      const accounts = await (window as any).ethereum.request({
        method: 'eth_requestAccounts',
      });

      if (accounts.length > 0) {
        setWalletConnected(true);
        setWalletAddress(accounts[0]);
        const chainId = await (window as any).ethereum.request({ method: 'eth_chainId' });
        setNetworkId(parseInt(chainId, 16));
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
      alert('Failed to connect wallet');
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setWalletConnected(false);
    setWalletAddress(null);
  };

  const deployContract = async () => {
    if (!walletConnected || !walletAddress) {
      alert('Please connect your wallet first');
      return;
    }

    if (!collectionName || !collectionSymbol) {
      alert('Please fill in collection name and symbol');
      return;
    }

    try {
      setDeployingContract(true);
      
      // In production, this would deploy a real smart contract
      // For now, we'll simulate the deployment
      const result = await createCollectionMutation.mutateAsync({
        name: collectionName,
        symbol: collectionSymbol,
        royaltyPercentage,
      });

      alert(`✅ Collection created!\nID: ${result.id}\nWallet: ${walletAddress}`);
      setCollectionName('');
      setCollectionSymbol('');
      setRoyaltyPercentage(10);
    } catch (error) {
      console.error('Error deploying contract:', error);
      alert('Failed to deploy contract');
    } finally {
      setDeployingContract(false);
    }
  };

  const handleMintNFT = async () => {
    if (!walletConnected) {
      alert('Please connect your wallet first');
      return;
    }

    try {
      const result = await mintNFTMutation.mutateAsync({
        collectionId: 'col-001',
        name: nftName,
        description: nftDescription,
        imageUrl: imageUrl || 'https://via.placeholder.com/500',
        royaltyBasisPoints: 1000,
        attributes: [
          { trait_type: 'Purpose', value: 'Divine Manifestation' },
          { trait_type: 'Execution', value: 'Sacred Song' },
          { trait_type: 'Prophecy', value: 'Fulfilled' },
          { trait_type: 'Alignment', value: 'Infinite' },
          { trait_type: 'scroll_level', value: 'Genesis' },
        ],
      });
      alert(`✅ NFT minted!\nToken ID: ${result.tokenId}\nWallet: ${walletAddress}`);
      setNftName('');
      setNftDescription('');
      setImageUrl('');
    } catch (error) {
      console.error('Error minting NFT:', error);
      alert('Failed to mint NFT');
    }
  };

  const getNetworkName = (id: number | null) => {
    switch (id) {
      case 1: return 'Ethereum Mainnet';
      case 137: return 'Polygon';
      case 5: return 'Goerli Testnet';
      case 80001: return 'Polygon Mumbai';
      default: return 'Unknown Network';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Crown className="w-8 h-8 text-amber-400" />
              <h1 className="text-4xl font-bold text-amber-400">Lyric Plaque Minting</h1>
            </div>
            
            {/* Wallet Connection Card */}
            <Card className="bg-slate-800 border-amber-400/30 w-80">
              <CardContent className="p-4">
                {walletConnected ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-green-400">
                      <CheckCircle className="w-5 h-5" />
                      <span className="font-semibold">Connected</span>
                    </div>
                    <div className="text-xs text-slate-300 break-all bg-slate-900 p-2 rounded">
                      {walletAddress}
                    </div>
                    <div className="text-xs text-slate-400">
                      Network: {getNetworkName(networkId)}
                    </div>
                    <Button 
                      onClick={disconnectWallet}
                      variant="outline"
                      size="sm"
                      className="w-full text-red-400 border-red-400/30 hover:bg-red-400/10"
                    >
                      Disconnect
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-amber-400">
                      <AlertCircle className="w-5 h-5" />
                      <span className="font-semibold">Not Connected</span>
                    </div>
                    <p className="text-xs text-slate-400">
                      Connect MetaMask to deploy contracts and mint NFTs
                    </p>
                    <Button 
                      onClick={connectWallet}
                      disabled={isConnecting}
                      className="w-full bg-amber-400 hover:bg-amber-500 text-slate-900 font-semibold"
                    >
                      <Wallet className="w-4 h-4 mr-2" />
                      {isConnecting ? 'Connecting...' : 'Connect MetaMask'}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          <p className="text-slate-300 text-lg">Create and manage sacred NFT artifacts with immutable royalty tracking</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-slate-800 border border-amber-400/20">
            <TabsTrigger value="collections" className="data-[state=active]:bg-amber-400/10 data-[state=active]:text-amber-400">
              Collections
            </TabsTrigger>
            <TabsTrigger value="mint" className="data-[state=active]:bg-amber-400/10 data-[state=active]:text-amber-400">
              Mint NFTs
            </TabsTrigger>
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-amber-400/10 data-[state=active]:text-amber-400">
              Dashboard
            </TabsTrigger>
          </TabsList>

          {/* Collections Tab */}
          <TabsContent value="collections" className="space-y-6 mt-6">
            <Card className="bg-slate-800 border-amber-400/20">
              <CardHeader>
                <CardTitle className="text-amber-400">Create NFT Collection</CardTitle>
                <CardDescription>Deploy a new ERC-721 smart contract for your Lyric Plaques</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-slate-300 mb-2 block">Collection Name</label>
                    <Input
                      placeholder="e.g., Lyric Plaques Genesis"
                      value={collectionName}
                      onChange={(e) => setCollectionName(e.target.value)}
                      className="bg-slate-900 border-amber-400/20 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-slate-300 mb-2 block">Symbol</label>
                    <Input
                      placeholder="e.g., LYRIC"
                      value={collectionSymbol}
                      onChange={(e) => setCollectionSymbol(e.target.value)}
                      className="bg-slate-900 border-amber-400/20 text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm text-slate-300 mb-2 block">Royalty Percentage: {royaltyPercentage}%</label>
                  <input
                    type="range"
                    min="0"
                    max="50"
                    value={royaltyPercentage}
                    onChange={(e) => setRoyaltyPercentage(parseInt(e.target.value))}
                    className="w-full"
                  />
                  <p className="text-xs text-slate-400 mt-2">Creators earn {royaltyPercentage}% on secondary sales</p>
                </div>

                <Button
                  onClick={deployContract}
                  disabled={!walletConnected || deployingContract}
                  className="w-full bg-amber-400 hover:bg-amber-500 text-slate-900 font-semibold"
                >
                  {deployingContract ? 'Deploying...' : 'Deploy Collection'}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Mint Tab */}
          <TabsContent value="mint" className="space-y-6 mt-6">
            <Card className="bg-slate-800 border-amber-400/20">
              <CardHeader>
                <CardTitle className="text-amber-400">Mint Lyric Plaque NFT</CardTitle>
                <CardDescription>Create a new NFT with immutable metadata and royalty tracking</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm text-slate-300 mb-2 block">NFT Name</label>
                  <Input
                    value={nftName}
                    onChange={(e) => setNftName(e.target.value)}
                    className="bg-slate-900 border-amber-400/20 text-white"
                  />
                </div>

                <div>
                  <label className="text-sm text-slate-300 mb-2 block">Description</label>
                  <Textarea
                    value={nftDescription}
                    onChange={(e) => setNftDescription(e.target.value)}
                    placeholder="Describe the sacred essence of this artifact..."
                    className="bg-slate-900 border-amber-400/20 text-white"
                  />
                </div>

                <div>
                  <label className="text-sm text-slate-300 mb-2 block">Image URL</label>
                  <Input
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="https://..."
                    className="bg-slate-900 border-amber-400/20 text-white"
                  />
                </div>

                <Button
                  onClick={handleMintNFT}
                  disabled={!walletConnected}
                  className="w-full bg-amber-400 hover:bg-amber-500 text-slate-900 font-semibold"
                >
                  Mint NFT
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-slate-800 border-amber-400/20">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm text-slate-300">Total Collections</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-amber-400">12</div>
                  <p className="text-xs text-slate-400 mt-2">+2 this month</p>
                </CardContent>
              </Card>

              <Card className="bg-slate-800 border-amber-400/20">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm text-slate-300">Total Minted</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-amber-400">1,444</div>
                  <p className="text-xs text-slate-400 mt-2">Across all collections</p>
                </CardContent>
              </Card>

              <Card className="bg-slate-800 border-amber-400/20">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm text-slate-300">Royalties Earned</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-amber-400">Ξ 12.4</div>
                  <p className="text-xs text-slate-400 mt-2">From secondary sales</p>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-slate-800 border-amber-400/20">
              <CardHeader>
                <CardTitle className="text-amber-400">Recent Mints</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-slate-900 rounded border border-amber-400/10">
                      <div>
                        <p className="text-sm font-semibold text-amber-400">Lyric Plaque #{i}</p>
                        <p className="text-xs text-slate-400">Collection: Genesis Series</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-green-400">✓ Minted</p>
                        <p className="text-xs text-slate-400">2 days ago</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
