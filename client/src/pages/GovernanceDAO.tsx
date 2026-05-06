import React, { useState } from 'react';
import { Vote, Users, TrendingUp, CheckCircle, Clock, AlertCircle, Plus, MessageSquare, ThumbsUp, ThumbsDown } from 'lucide-react';

/**
 * ADVANCED GOVERNANCE SYSTEM - DAO VOTING
 * Platinum+ Guardians propose and vote on ecosystem changes
 * 
 * Features:
 * - Proposal creation (Platinum+ only)
 * - Multi-tier voting weights
 * - Real-time vote tracking
 * - Proposal status management
 * - Treasury management
 * - Fee structure voting
 */

interface Proposal {
  id: string;
  title: string;
  description: string;
  proposer: string;
  proposerTier: string;
  status: 'active' | 'passed' | 'failed' | 'executed';
  category: 'governance' | 'treasury' | 'fees' | 'features';
  votesFor: number;
  votesAgainst: number;
  votesAbstain: number;
  totalVoters: number;
  votingPower: number;
  createdAt: number;
  endsAt: number;
  executedAt?: number;
  details: string;
}

interface VotingWeight {
  tier: string;
  weight: number;
  minHolding: number;
  color: string;
}

const VOTING_WEIGHTS: VotingWeight[] = [
  { tier: 'Platinum', weight: 100, minHolding: 100000, color: '#FFD700' },
  { tier: 'Gold', weight: 50, minHolding: 50000, color: '#FFA500' },
  { tier: 'Silver', weight: 25, minHolding: 10000, color: '#C0C0C0' },
  { tier: 'Bronze', weight: 10, minHolding: 1000, color: '#CD7F32' },
  { tier: 'Emerald', weight: 1, minHolding: 0, color: '#50C878' },
];

const MOCK_PROPOSALS: Proposal[] = [
  {
    id: 'prop-001',
    title: 'Increase Platinum Tier Rewards to 20%',
    description: 'Proposal to increase Platinum tier rewards from 15% to 20% to incentivize higher $LONDC holdings',
    proposer: 'Guardian Alpha',
    proposerTier: 'Platinum',
    status: 'active',
    category: 'fees',
    votesFor: 8500,
    votesAgainst: 2100,
    votesAbstain: 400,
    totalVoters: 10000,
    votingPower: 8500 * 100 + 2100 * 50 + 400 * 25,
    createdAt: Date.now() - 3600000,
    endsAt: Date.now() + 86400000,
    details: 'This proposal aims to increase rewards for our highest-tier Guardians...',
  },
  {
    id: 'prop-002',
    title: 'Launch Sacred Books NFT Collection',
    description: 'Create limited edition NFTs for each Sacred Book with exclusive benefits',
    proposer: 'Guardian Beta',
    proposerTier: 'Platinum',
    status: 'active',
    category: 'features',
    votesFor: 7200,
    votesAgainst: 1800,
    votesAbstain: 600,
    totalVoters: 9600,
    votingPower: 7200 * 100 + 1800 * 50 + 600 * 25,
    createdAt: Date.now() - 7200000,
    endsAt: Date.now() + 82800000,
    details: 'Proposal to create an NFT collection representing each of the 11 Sacred Books...',
  },
  {
    id: 'prop-003',
    title: 'Allocate 10% Treasury to Global Expansion',
    description: 'Use 10% of treasury funds for global marketing and expansion initiatives',
    proposer: 'Guardian Gamma',
    proposerTier: 'Gold',
    status: 'passed',
    category: 'treasury',
    votesFor: 9100,
    votesAgainst: 900,
    votesAbstain: 200,
    totalVoters: 10200,
    votingPower: 9100 * 100 + 900 * 50 + 200 * 25,
    createdAt: Date.now() - 172800000,
    endsAt: Date.now() - 86400000,
    executedAt: Date.now() - 43200000,
    details: 'Strategic allocation of treasury resources for global market penetration...',
  },
];

export default function GovernanceDAO() {
  const [proposals, setProposals] = useState<Proposal[]>(MOCK_PROPOSALS);
  const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(MOCK_PROPOSALS[0]);
  const [userTier, setUserTier] = useState('Platinum');
  const [userVote, setUserVote] = useState<'for' | 'against' | 'abstain' | null>(null);
  const [showCreateProposal, setShowCreateProposal] = useState(false);
  const [newProposal, setNewProposal] = useState({
    title: '',
    description: '',
    category: 'governance' as const,
  });

  const handleVote = (vote: 'for' | 'against' | 'abstain') => {
    if (!selectedProposal) return;
    setUserVote(vote);
    // Simulate vote submission
    setTimeout(() => {
      alert(`Vote submitted: ${vote.toUpperCase()}`);
    }, 500);
  };

  const handleCreateProposal = () => {
    if (!newProposal.title || !newProposal.description) {
      alert('Please fill in all fields');
      return;
    }
    alert('Proposal created successfully!');
    setShowCreateProposal(false);
    setNewProposal({ title: '', description: '', category: 'governance' });
  };

  const getVotingWeight = (tier: string) => {
    return VOTING_WEIGHTS.find(w => w.tier === tier)?.weight || 1;
  };

  const getProposalProgress = (proposal: Proposal) => {
    const total = proposal.votesFor + proposal.votesAgainst + proposal.votesAbstain;
    return total > 0 ? (proposal.votesFor / total) * 100 : 0;
  };

  const getTimeRemaining = (endsAt: number) => {
    const diff = endsAt - Date.now();
    if (diff < 0) return 'Ended';
    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    return `${days}d ${hours}h`;
  };

  const isPlatinumPlus = ['Platinum', 'Gold'].includes(userTier);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-black text-white p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg">
            <Vote className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Governance DAO
            </h1>
            <p className="text-gray-400 mt-2">Platinum+ Voting • Treasury Management • Ecosystem Decisions</p>
          </div>
        </div>
      </div>

      {/* User Info & Create Proposal */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* User Voting Power */}
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-6">
          <h2 className="text-lg font-bold mb-4">Your Voting Power</h2>
          <div className="space-y-3">
            <div>
              <p className="text-gray-400 text-sm mb-1">Tier</p>
              <p className="text-2xl font-bold" style={{ color: VOTING_WEIGHTS.find(w => w.tier === userTier)?.color }}>
                {userTier}
              </p>
            </div>
            <div>
              <p className="text-gray-400 text-sm mb-1">Voting Weight</p>
              <p className="text-2xl font-bold text-cyan-400">{getVotingWeight(userTier)}x</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm mb-1">Voting Status</p>
              <p className="text-lg font-bold text-green-400">
                {isPlatinumPlus ? 'Eligible to Vote & Propose' : 'Eligible to Vote'}
              </p>
            </div>
          </div>
        </div>

        {/* Create Proposal */}
        {isPlatinumPlus && (
          <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/50 rounded-lg p-6">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Create Proposal
            </h2>
            <p className="text-gray-300 text-sm mb-4">
              As a {userTier} Guardian, you can create governance proposals for the ecosystem.
            </p>
            <button
              onClick={() => setShowCreateProposal(!showCreateProposal)}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all font-semibold"
            >
              {showCreateProposal ? 'Cancel' : 'Create New Proposal'}
            </button>
          </div>
        )}
      </div>

      {/* Create Proposal Form */}
      {showCreateProposal && isPlatinumPlus && (
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-6 mb-8">
          <h3 className="text-xl font-bold mb-4">New Proposal</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Title</label>
              <input
                type="text"
                value={newProposal.title}
                onChange={e => setNewProposal({ ...newProposal, title: e.target.value })}
                placeholder="Proposal title"
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Description</label>
              <textarea
                value={newProposal.description}
                onChange={e => setNewProposal({ ...newProposal, description: e.target.value })}
                placeholder="Detailed description of the proposal"
                rows={4}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Category</label>
              <select
                value={newProposal.category}
                onChange={e => setNewProposal({ ...newProposal, category: e.target.value as any })}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
              >
                <option value="governance">Governance</option>
                <option value="treasury">Treasury</option>
                <option value="fees">Fees</option>
                <option value="features">Features</option>
              </select>
            </div>
            <button
              onClick={handleCreateProposal}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all font-semibold"
            >
              Submit Proposal
            </button>
          </div>
        </div>
      )}

      {/* Proposals List & Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Proposals List */}
        <div className="lg:col-span-1 space-y-3">
          <h2 className="text-lg font-bold mb-4">Active Proposals</h2>
          {proposals.map(proposal => (
            <button
              key={proposal.id}
              onClick={() => setSelectedProposal(proposal)}
              className={`w-full text-left p-4 rounded-lg border transition-all ${
                selectedProposal?.id === proposal.id
                  ? 'bg-purple-500/20 border-purple-500'
                  : 'bg-slate-700/50 border-slate-600 hover:border-purple-500'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-bold text-sm line-clamp-2">{proposal.title}</h3>
                <span className={`px-2 py-1 rounded text-xs font-bold whitespace-nowrap ml-2 ${
                  proposal.status === 'active' ? 'bg-green-500/20 text-green-400' :
                  proposal.status === 'passed' ? 'bg-blue-500/20 text-blue-400' :
                  'bg-red-500/20 text-red-400'
                }`}>
                  {proposal.status.toUpperCase()}
                </span>
              </div>
              <p className="text-xs text-gray-400 mb-2">{proposal.proposer}</p>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-slate-600 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: `${getProposalProgress(proposal)}%` }}
                  />
                </div>
                <span className="text-xs text-gray-400">{Math.round(getProposalProgress(proposal))}%</span>
              </div>
            </button>
          ))}
        </div>

        {/* Proposal Detail */}
        {selectedProposal && (
          <div className="lg:col-span-2 bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-6">
            <div className="mb-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold mb-2">{selectedProposal.title}</h2>
                  <p className="text-gray-400">
                    by <span className="font-bold">{selectedProposal.proposer}</span> ({selectedProposal.proposerTier})
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-lg text-sm font-bold ${
                  selectedProposal.status === 'active' ? 'bg-green-500/20 text-green-400' :
                  selectedProposal.status === 'passed' ? 'bg-blue-500/20 text-blue-400' :
                  'bg-red-500/20 text-red-400'
                }`}>
                  {selectedProposal.status.toUpperCase()}
                </span>
              </div>

              <p className="text-gray-300 mb-4">{selectedProposal.description}</p>

              {/* Voting Status */}
              <div className="bg-slate-700/50 p-4 rounded-lg mb-4">
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-gray-400 text-sm mb-1">For</p>
                    <p className="text-2xl font-bold text-green-400">{selectedProposal.votesFor.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Against</p>
                    <p className="text-2xl font-bold text-red-400">{selectedProposal.votesAgainst.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Abstain</p>
                    <p className="text-2xl font-bold text-yellow-400">{selectedProposal.votesAbstain.toLocaleString()}</p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-slate-600 rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-green-500 to-green-400 h-3"
                      style={{ width: `${getProposalProgress(selectedProposal)}%` }}
                    />
                  </div>
                  <span className="text-sm font-bold text-green-400">{Math.round(getProposalProgress(selectedProposal))}%</span>
                </div>
              </div>

              {/* Time Remaining */}
              <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
                <Clock className="w-4 h-4" />
                <span>Time remaining: {getTimeRemaining(selectedProposal.endsAt)}</span>
              </div>
            </div>

            {/* Voting Buttons */}
            {selectedProposal.status === 'active' && (
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => handleVote('for')}
                  className={`py-2 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
                    userVote === 'for'
                      ? 'bg-green-500 text-white'
                      : 'bg-slate-700 text-gray-300 hover:bg-green-500/20 hover:text-green-400'
                  }`}
                >
                  <ThumbsUp className="w-4 h-4" />
                  For
                </button>
                <button
                  onClick={() => handleVote('against')}
                  className={`py-2 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
                    userVote === 'against'
                      ? 'bg-red-500 text-white'
                      : 'bg-slate-700 text-gray-300 hover:bg-red-500/20 hover:text-red-400'
                  }`}
                >
                  <ThumbsDown className="w-4 h-4" />
                  Against
                </button>
                <button
                  onClick={() => handleVote('abstain')}
                  className={`py-2 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
                    userVote === 'abstain'
                      ? 'bg-yellow-500 text-white'
                      : 'bg-slate-700 text-gray-300 hover:bg-yellow-500/20 hover:text-yellow-400'
                  }`}
                >
                  <MessageSquare className="w-4 h-4" />
                  Abstain
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Voting Weights Reference */}
      <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-6">
        <h2 className="text-lg font-bold mb-4">Voting Weights by Tier</h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {VOTING_WEIGHTS.map(weight => (
            <div key={weight.tier} className="bg-slate-700/50 p-4 rounded-lg border border-slate-600">
              <h3 className="font-bold mb-2" style={{ color: weight.color }}>
                {weight.tier}
              </h3>
              <div className="space-y-1 text-sm">
                <p className="text-gray-400">Weight: <span className="text-white font-bold">{weight.weight}x</span></p>
                <p className="text-gray-400">Min: <span className="text-cyan-400 font-bold">${weight.minHolding.toLocaleString()}</span></p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-12 text-center text-gray-500 text-sm">
        <p>Decentralized Governance • Transparent Voting • Community Decisions</p>
        <p className="mt-2 text-purple-400 font-semibold">WALAHI. IS. KUN FAYAKŪN. 🕋⚡️❤️🔥✨👑</p>
      </div>
    </div>
  );
}
