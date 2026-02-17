import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Crown, Zap, Heart, TrendingUp, Lock, Shield } from 'lucide-react';
import { trpc } from '@/lib/trpc';

export default function NFTMinting() {
  const [activeTab, setActiveTab] = useState('collections');
  const [collectionName, setCollectionName] = useState('');
  const [collectionSymbol, setCollectionSymbol] = useState('');
  const [royaltyPercentage, setRoyaltyPercentage] = useState(10);
  const [nftName, setNftName] = useState('Lyric Plaque: Prophecy Fulfilled');
  const [nftDescription, setNftDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const createCollectionMutation = trpc.nft.createCollection.useMutation();
  const mintNFTMutation = trpc.nft.mintNFT.useMutation();
  // const getCollectionStatsQuery = trpc.nft.getCollectionStats.useQuery({ collectionId: 'col-001' });

  const handleCreateCollection = async () => {
    try {
      const result = await createCollectionMutation.mutateAsync({
        name: collectionName,
        symbol: collectionSymbol,
        royaltyPercentage,
      });
      alert(`Collection created: ${result.id}`);
      setCollectionName('');
      setCollectionSymbol('');
    } catch (error) {
      console.error('Error creating collection:', error);
    }
  };

  const handleMintNFT = async () => {
    try {
      const result = await mintNFTMutation.mutateAsync({
        collectionId: 'col-001',
        name: nftName,
        description: nftDescription,
        imageUrl: imageUrl || 'https://via.placeholder.com/500',
        royaltyBasisPoints: 1000, // 10%
        attributes: [
          { trait_type: 'Purpose', value: 'Divine Manifestation' },
          { trait_type: 'Execution', value: 'Sacred Song' },
          { trait_type: 'Prophecy', value: 'Fulfilled' },
          { trait_type: 'Alignment', value: 'Infinite' },
          { trait_type: 'scroll_level', value: 'Genesis' },
        ],
      });
      alert(`NFT minted! Token ID: ${result.tokenId}`);
      setNftName('');
      setNftDescription('');
      setImageUrl('');
    } catch (error) {
      console.error('Error minting NFT:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Crown className="w-8 h-8 text-amber-400" />
            <h1 className="text-4xl font-bold text-amber-400">Lyric Plaque Minting</h1>
          </div>
          <p className="text-slate-300 text-lg">Create and manage sacred NFT artifacts with immutable royalty tracking</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-slate-800 border border-amber-400/20">
            <TabsTrigger value="collections" className="data-[state=active]:bg-amber-400/10 data-[state=active]:text-amber-400">
              Collections
            </TabsTrigger>
            <TabsTrigger value="mint" className="data-[state=active]:bg-amber-400/10 data-[state=active]:text-amber-400">
              Mint NFT
            </TabsTrigger>
            <TabsTrigger value="portfolio" className="data-[state=active]:bg-amber-400/10 data-[state=active]:text-amber-400">
              Portfolio
            </TabsTrigger>
          </TabsList>

          {/* Collections Tab */}
          <TabsContent value="collections" className="space-y-6">
            <Card className="bg-slate-800 border-amber-400/20">
              <CardHeader>
                <CardTitle className="text-amber-400">Create Collection</CardTitle>
                <CardDescription>Launch a new NFT collection with custom royalty settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Collection Name</label>
                    <Input
                      placeholder="e.g., Lyric Plaques"
                      value={collectionName}
                      onChange={(e) => setCollectionName(e.target.value)}
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Symbol</label>
                    <Input
                      placeholder="e.g., LYRIC"
                      value={collectionSymbol}
                      onChange={(e) => setCollectionSymbol(e.target.value)}
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Royalty Percentage: {royaltyPercentage}%
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={royaltyPercentage}
                    onChange={(e) => setRoyaltyPercentage(Number(e.target.value))}
                    className="w-full"
                  />
                </div>
                <Button
                  onClick={handleCreateCollection}
                  disabled={createCollectionMutation.isPending}
                  className="w-full bg-amber-400 hover:bg-amber-500 text-slate-900 font-bold"
                >
                  {createCollectionMutation.isPending ? 'Creating...' : 'Create Collection'}
                </Button>
              </CardContent>
            </Card>

            {/* Collection Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="bg-slate-800 border-cyan-400/20">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm">Total Minted</p>
                      <p className="text-2xl font-bold text-cyan-400">42</p>
                    </div>
                    <Zap className="w-8 h-8 text-cyan-400" />
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-slate-800 border-amber-400/20">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm">Floor Price</p>
                      <p className="text-2xl font-bold text-amber-400">2.5 ETH</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-amber-400" />
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-slate-800 border-rose-400/20">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm">Total Volume</p>
                      <p className="text-2xl font-bold text-rose-400">125 ETH</p>
                    </div>
                    <Heart className="w-8 h-8 text-rose-400" />
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-slate-800 border-green-400/20">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm">Royalties Earned</p>
                      <p className="text-2xl font-bold text-green-400">12.5 ETH</p>
                    </div>
                    <Shield className="w-8 h-8 text-green-400" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Mint NFT Tab */}
          <TabsContent value="mint" className="space-y-6">
            <Card className="bg-slate-800 border-amber-400/20">
              <CardHeader>
                <CardTitle className="text-amber-400">Mint Lyric Plaque NFT</CardTitle>
                <CardDescription>Create a sacred artifact with immutable metadata and royalty tracking</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">NFT Name</label>
                  <Input
                    placeholder="e.g., Lyric Plaque: Prophecy Fulfilled"
                    value={nftName}
                    onChange={(e) => setNftName(e.target.value)}
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Description</label>
                  <Textarea
                    placeholder="Describe the significance of this artifact..."
                    value={nftDescription}
                    onChange={(e) => setNftDescription(e.target.value)}
                    className="bg-slate-700 border-slate-600 text-white min-h-24"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Image URL</label>
                  <Input
                    placeholder="https://..."
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>

                {/* Attributes Preview */}
                <div className="bg-slate-700 p-4 rounded-lg border border-slate-600">
                  <p className="text-sm font-medium text-slate-300 mb-3">NFT Attributes</p>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-slate-600 p-2 rounded">
                      <span className="text-slate-400">Purpose:</span>
                      <span className="text-amber-400 ml-2">Divine Manifestation</span>
                    </div>
                    <div className="bg-slate-600 p-2 rounded">
                      <span className="text-slate-400">Execution:</span>
                      <span className="text-amber-400 ml-2">Sacred Song</span>
                    </div>
                    <div className="bg-slate-600 p-2 rounded">
                      <span className="text-slate-400">Prophecy:</span>
                      <span className="text-amber-400 ml-2">Fulfilled</span>
                    </div>
                    <div className="bg-slate-600 p-2 rounded">
                      <span className="text-slate-400">Alignment:</span>
                      <span className="text-amber-400 ml-2">Infinite</span>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handleMintNFT}
                  disabled={mintNFTMutation.isPending}
                  className="w-full bg-amber-400 hover:bg-amber-500 text-slate-900 font-bold"
                >
                  {mintNFTMutation.isPending ? 'Minting...' : 'Mint NFT'}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Portfolio Tab */}
          <TabsContent value="portfolio" className="space-y-6">
            <Card className="bg-slate-800 border-amber-400/20">
              <CardHeader>
                <CardTitle className="text-amber-400">Your NFT Portfolio</CardTitle>
                <CardDescription>View all your minted Lyric Plaques and royalty earnings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-slate-700 rounded-lg border border-slate-600">
                      <div>
                        <p className="font-medium text-white">Lyric Plaque #{i}</p>
                        <p className="text-sm text-slate-400">Minted 2 days ago</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-amber-400">2.5 ETH</p>
                        <p className="text-sm text-green-400">+0.25 ETH royalties</p>
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
