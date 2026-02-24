import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Loader2, CheckCircle2, AlertCircle, Copy } from 'lucide-react';

interface DeploymentStatus {
  inheritanceVault?: string;
  voltronDAO?: string;
  lyricPlaqueNFT?: string;
  timestamp?: string;
  network?: string;
}

export function ContractDeployment() {
  const [deploymentStatus, setDeploymentStatus] = useState<DeploymentStatus | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [nftMetadata, setNftMetadata] = useState({
    name: 'Lyric Plaque',
    symbol: 'PLAQUE',
    royaltyPercentage: 10,
  });
  const [daoProposal, setDaoProposal] = useState({
    title: '',
    description: '',
    votingPeriod: 7,
  });

  // Load deployment addresses from file
  useEffect(() => {
    const loadDeploymentAddresses = async () => {
      try {
        const response = await fetch('/deployments.json');
        if (response.ok) {
          const data = await response.json();
          setDeploymentStatus(data);
        }
      } catch (err) {
        console.log('No deployments.json found yet');
      }
    };
    loadDeploymentAddresses();
  }, []);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleMintNFT = async () => {
    if (!deploymentStatus?.lyricPlaqueNFT) {
      setError('LyricPlaqueNFT contract not deployed');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      if (!window.ethereum) {
        throw new Error('MetaMask not found');
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      // Simple NFT minting interface
      const abi = [
        'function mint(address to, string memory uri) public returns (uint256)',
        'function setRoyaltyInfo(uint256 tokenId, address receiver, uint96 feeNumerator) public',
      ];

      const contract = new ethers.Contract(
        deploymentStatus.lyricPlaqueNFT,
        abi,
        signer
      );

      const metadataUri = `ipfs://QmLyricPlaque${Date.now()}`;
      const tx = await contract.mint(await signer.getAddress(), metadataUri);
      await tx.wait();

      setError(null);
      alert(`NFT minted successfully! TX: ${tx.hash}`);
    } catch (err) {
      setError(`Minting failed: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProposal = async () => {
    if (!deploymentStatus?.voltronDAO) {
      setError('VoltronDAO contract not deployed');
      return;
    }

    if (!daoProposal.title || !daoProposal.description) {
      setError('Please fill in proposal title and description');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      if (!window.ethereum) {
        throw new Error('MetaMask not found');
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const abi = [
        'function createProposal(string memory title, string memory description, uint256 votingPeriod) public returns (uint256)',
      ];

      const contract = new ethers.Contract(
        deploymentStatus.voltronDAO,
        abi,
        signer
      );

      const tx = await contract.createProposal(
        daoProposal.title,
        daoProposal.description,
        daoProposal.votingPeriod
      );
      await tx.wait();

      setDaoProposal({ title: '', description: '', votingPeriod: 7 });
      alert(`Proposal created successfully! TX: ${tx.hash}`);
    } catch (err) {
      setError(`Proposal creation failed: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="grid gap-4">
        {/* Deployment Status */}
        <Card className="p-6 bg-gradient-to-br from-rose-900/20 to-cyan-900/20 border-rose-500/30">
          <h2 className="text-2xl font-bold text-rose-400 mb-4">📋 Contract Deployment Status</h2>
          
          {deploymentStatus ? (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-400" />
                <span className="text-sm text-gray-300">
                  Network: <span className="font-mono text-cyan-300">{deploymentStatus.network}</span>
                </span>
              </div>

              {deploymentStatus.inheritanceVault && (
                <div className="bg-black/40 p-3 rounded border border-cyan-500/30">
                  <div className="text-sm text-gray-400 mb-1">InheritanceVault</div>
                  <div className="flex items-center gap-2">
                    <code className="text-xs text-cyan-300 break-all">
                      {deploymentStatus.inheritanceVault}
                    </code>
                    <button
                      onClick={() => copyToClipboard(deploymentStatus.inheritanceVault!)}
                      className="p-1 hover:bg-cyan-500/20 rounded"
                    >
                      <Copy className="w-4 h-4 text-cyan-400" />
                    </button>
                  </div>
                </div>
              )}

              {deploymentStatus.voltronDAO && (
                <div className="bg-black/40 p-3 rounded border border-cyan-500/30">
                  <div className="text-sm text-gray-400 mb-1">VoltronDAO</div>
                  <div className="flex items-center gap-2">
                    <code className="text-xs text-cyan-300 break-all">
                      {deploymentStatus.voltronDAO}
                    </code>
                    <button
                      onClick={() => copyToClipboard(deploymentStatus.voltronDAO!)}
                      className="p-1 hover:bg-cyan-500/20 rounded"
                    >
                      <Copy className="w-4 h-4 text-cyan-400" />
                    </button>
                  </div>
                </div>
              )}

              {deploymentStatus.lyricPlaqueNFT && (
                <div className="bg-black/40 p-3 rounded border border-cyan-500/30">
                  <div className="text-sm text-gray-400 mb-1">LyricPlaqueNFT</div>
                  <div className="flex items-center gap-2">
                    <code className="text-xs text-cyan-300 break-all">
                      {deploymentStatus.lyricPlaqueNFT}
                    </code>
                    <button
                      onClick={() => copyToClipboard(deploymentStatus.lyricPlaqueNFT!)}
                      className="p-1 hover:bg-cyan-500/20 rounded"
                    >
                      <Copy className="w-4 h-4 text-cyan-400" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2 text-amber-400">
              <AlertCircle className="w-5 h-5" />
              <span>Contracts not yet deployed. Run deployment script to continue.</span>
            </div>
          )}
        </Card>

        {/* NFT Minting */}
        <Card className="p-6 bg-gradient-to-br from-rose-900/20 to-cyan-900/20 border-rose-500/30">
          <h3 className="text-xl font-bold text-rose-400 mb-4">🎨 Mint Lyric Plaque NFT</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">NFT Name</label>
              <Input
                value={nftMetadata.name}
                onChange={(e) => setNftMetadata({ ...nftMetadata, name: e.target.value })}
                className="bg-black/40 border-cyan-500/30"
                disabled
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Symbol</label>
              <Input
                value={nftMetadata.symbol}
                onChange={(e) => setNftMetadata({ ...nftMetadata, symbol: e.target.value })}
                className="bg-black/40 border-cyan-500/30"
                disabled
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Royalty Percentage</label>
              <Input
                type="number"
                value={nftMetadata.royaltyPercentage}
                onChange={(e) =>
                  setNftMetadata({ ...nftMetadata, royaltyPercentage: Number(e.target.value) })
                }
                className="bg-black/40 border-cyan-500/30"
                min="0"
                max="100"
              />
            </div>

            <Button
              onClick={handleMintNFT}
              disabled={loading || !deploymentStatus?.lyricPlaqueNFT}
              className="w-full bg-gradient-to-r from-rose-600 to-cyan-600 hover:from-rose-500 hover:to-cyan-500"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Minting...
                </>
              ) : (
                'Mint NFT'
              )}
            </Button>
          </div>
        </Card>

        {/* DAO Proposal Creation */}
        <Card className="p-6 bg-gradient-to-br from-rose-900/20 to-cyan-900/20 border-rose-500/30">
          <h3 className="text-xl font-bold text-rose-400 mb-4">🗳️ Create DAO Proposal</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Proposal Title</label>
              <Input
                value={daoProposal.title}
                onChange={(e) => setDaoProposal({ ...daoProposal, title: e.target.value })}
                placeholder="Enter proposal title..."
                className="bg-black/40 border-cyan-500/30"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Description</label>
              <textarea
                value={daoProposal.description}
                onChange={(e) => setDaoProposal({ ...daoProposal, description: e.target.value })}
                placeholder="Enter proposal description..."
                className="w-full bg-black/40 border border-cyan-500/30 rounded p-2 text-gray-300 text-sm"
                rows={4}
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Voting Period (days)</label>
              <Input
                type="number"
                value={daoProposal.votingPeriod}
                onChange={(e) =>
                  setDaoProposal({ ...daoProposal, votingPeriod: Number(e.target.value) })
                }
                className="bg-black/40 border-cyan-500/30"
                min="1"
                max="30"
              />
            </div>

            <Button
              onClick={handleCreateProposal}
              disabled={loading || !deploymentStatus?.voltronDAO}
              className="w-full bg-gradient-to-r from-rose-600 to-cyan-600 hover:from-rose-500 hover:to-cyan-500"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Creating...
                </>
              ) : (
                'Create Proposal'
              )}
            </Button>
          </div>
        </Card>

        {/* Error Display */}
        {error && (
          <Card className="p-4 bg-red-900/20 border-red-500/30">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-red-300">{error}</div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
