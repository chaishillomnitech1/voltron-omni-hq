import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Vote, TrendingUp, Users, Wallet, CheckCircle, Clock } from 'lucide-react';
import { trpc } from '@/lib/trpc';

export default function DAOGovernance() {
  const [activeTab, setActiveTab] = useState('proposals');
  const [proposalTitle, setProposalTitle] = useState('');
  const [proposalDescription, setProposalDescription] = useState('');
  const [proposalType, setProposalType] = useState<'budget' | 'governance' | 'treasury' | 'member'>('budget');
  const [targetAmount, setTargetAmount] = useState('');
  const [duration, setDuration] = useState('7');

  const createProposalMutation = trpc.dao.createProposal.useMutation();
  const voteMutation = trpc.dao.vote.useMutation();

  const handleCreateProposal = async () => {
    try {
      const result = await createProposalMutation.mutateAsync({
        daoId: 'dao-001',
        title: proposalTitle,
        description: proposalDescription,
        proposalType,
        targetAmount: targetAmount ? parseInt(targetAmount) * 100 : undefined, // Convert to cents
        duration: parseInt(duration),
      });
      alert(`Proposal created: ${result.proposalId}`);
      setProposalTitle('');
      setProposalDescription('');
      setTargetAmount('');
    } catch (error) {
      console.error('Error creating proposal:', error);
    }
  };

  const handleVote = async (proposalId: string, vote: 'for' | 'against' | 'abstain') => {
    try {
      const result = await voteMutation.mutateAsync({
        proposalId,
        daoId: 'dao-001',
        vote,
        votingPower: 1,
      });
      alert(`Vote recorded: ${result.vote}`);
    } catch (error) {
      console.error('Error voting:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Vote className="w-8 h-8 text-cyan-400" />
            <h1 className="text-4xl font-bold text-cyan-400">Providence DAO</h1>
          </div>
          <p className="text-slate-300 text-lg">Decentralized governance for the ScrollSoul Nexus</p>
        </div>

        {/* DAO Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-slate-800 border-cyan-400/20">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Members</p>
                  <p className="text-2xl font-bold text-cyan-400">42</p>
                </div>
                <Users className="w-8 h-8 text-cyan-400" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-slate-800 border-amber-400/20">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Treasury</p>
                  <p className="text-2xl font-bold text-amber-400">500K USDC</p>
                </div>
                <Wallet className="w-8 h-8 text-amber-400" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-slate-800 border-green-400/20">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Active Proposals</p>
                  <p className="text-2xl font-bold text-green-400">3</p>
                </div>
                <Clock className="w-8 h-8 text-green-400" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-slate-800 border-rose-400/20">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Executed</p>
                  <p className="text-2xl font-bold text-rose-400">15</p>
                </div>
                <CheckCircle className="w-8 h-8 text-rose-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-slate-800 border border-cyan-400/20">
            <TabsTrigger value="proposals" className="data-[state=active]:bg-cyan-400/10 data-[state=active]:text-cyan-400">
              Proposals
            </TabsTrigger>
            <TabsTrigger value="create" className="data-[state=active]:bg-cyan-400/10 data-[state=active]:text-cyan-400">
              Create Proposal
            </TabsTrigger>
            <TabsTrigger value="treasury" className="data-[state=active]:bg-cyan-400/10 data-[state=active]:text-cyan-400">
              Treasury
            </TabsTrigger>
          </TabsList>

          {/* Proposals Tab */}
          <TabsContent value="proposals" className="space-y-6">
            <div className="space-y-4">
              {[
                {
                  id: 'prop-001',
                  title: 'Allocate 50k USDC to Marketing',
                  description: 'Fund Q2 marketing campaign across platforms',
                  type: 'budget',
                  votesFor: 1250,
                  votesAgainst: 350,
                  approval: 78,
                  status: 'active',
                },
                {
                  id: 'prop-002',
                  title: 'Add New DAO Member',
                  description: 'Approve new member for governance participation',
                  type: 'member',
                  votesFor: 890,
                  votesAgainst: 110,
                  approval: 89,
                  status: 'active',
                },
                {
                  id: 'prop-003',
                  title: 'Update Voting Threshold',
                  description: 'Change voting threshold from 50% to 60%',
                  type: 'governance',
                  votesFor: 1500,
                  votesAgainst: 200,
                  approval: 88,
                  status: 'executed',
                },
              ].map((proposal) => (
                <Card key={proposal.id} className="bg-slate-800 border-slate-600 hover:border-cyan-400/50 transition">
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-lg font-bold text-white">{proposal.title}</h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            proposal.status === 'active'
                              ? 'bg-green-400/20 text-green-400'
                              : 'bg-slate-600 text-slate-300'
                          }`}>
                            {proposal.status === 'active' ? 'Active' : 'Executed'}
                          </span>
                        </div>
                        <p className="text-slate-400 text-sm">{proposal.description}</p>
                      </div>

                      {/* Voting Stats */}
                      <div className="bg-slate-700 p-4 rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm font-medium text-slate-300">Approval: {proposal.approval}%</span>
                          <span className="text-xs text-slate-400">{proposal.votesFor} for • {proposal.votesAgainst} against</span>
                        </div>
                        <div className="w-full bg-slate-600 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-cyan-400 to-cyan-500 h-2 rounded-full"
                            style={{ width: `${proposal.approval}%` }}
                          />
                        </div>
                      </div>

                      {/* Voting Buttons */}
                      {proposal.status === 'active' && (
                        <div className="flex gap-2">
                          <Button
                            onClick={() => handleVote(proposal.id, 'for')}
                            className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                          >
                            Vote For
                          </Button>
                          <Button
                            onClick={() => handleVote(proposal.id, 'against')}
                            className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                          >
                            Vote Against
                          </Button>
                          <Button
                            onClick={() => handleVote(proposal.id, 'abstain')}
                            className="flex-1 bg-slate-600 hover:bg-slate-700 text-white"
                          >
                            Abstain
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Create Proposal Tab */}
          <TabsContent value="create" className="space-y-6">
            <Card className="bg-slate-800 border-cyan-400/20">
              <CardHeader>
                <CardTitle className="text-cyan-400">Create New Proposal</CardTitle>
                <CardDescription>Submit a governance proposal for DAO voting</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Proposal Title</label>
                  <Input
                    placeholder="e.g., Allocate funds for development"
                    value={proposalTitle}
                    onChange={(e) => setProposalTitle(e.target.value)}
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Description</label>
                  <Textarea
                    placeholder="Describe the proposal in detail..."
                    value={proposalDescription}
                    onChange={(e) => setProposalDescription(e.target.value)}
                    className="bg-slate-700 border-slate-600 text-white min-h-24"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Proposal Type</label>
                    <select
                      value={proposalType}
                      onChange={(e) => setProposalType(e.target.value as any)}
                      className="w-full bg-slate-700 border border-slate-600 text-white rounded px-3 py-2"
                    >
                      <option value="budget">Budget</option>
                      <option value="governance">Governance</option>
                      <option value="treasury">Treasury</option>
                      <option value="member">Member</option>
                    </select>
                  </div>

                  {proposalType === 'budget' && (
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Target Amount (USDC)</label>
                      <Input
                        type="number"
                        placeholder="e.g., 50000"
                        value={targetAmount}
                        onChange={(e) => setTargetAmount(e.target.value)}
                        className="bg-slate-700 border-slate-600 text-white"
                      />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Voting Duration (days)</label>
                  <Input
                    type="number"
                    min="1"
                    max="30"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>

                <Button
                  onClick={handleCreateProposal}
                  disabled={createProposalMutation.isPending}
                  className="w-full bg-cyan-400 hover:bg-cyan-500 text-slate-900 font-bold"
                >
                  {createProposalMutation.isPending ? 'Creating...' : 'Create Proposal'}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Treasury Tab */}
          <TabsContent value="treasury" className="space-y-6">
            <Card className="bg-slate-800 border-cyan-400/20">
              <CardHeader>
                <CardTitle className="text-cyan-400">DAO Treasury</CardTitle>
                <CardDescription>View treasury balance and allocations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-gradient-to-r from-cyan-400/10 to-cyan-400/5 p-6 rounded-lg border border-cyan-400/20">
                  <p className="text-slate-400 text-sm mb-2">Total Balance</p>
                  <p className="text-4xl font-bold text-cyan-400">500,000 USDC</p>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-white">Allocations</h4>
                  {[
                    { name: 'Marketing', allocated: 50000, spent: 25000 },
                    { name: 'Development', allocated: 100000, spent: 80000 },
                    { name: 'Operations', allocated: 75000, spent: 45000 },
                  ].map((allocation) => (
                    <div key={allocation.name} className="bg-slate-700 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-white">{allocation.name}</span>
                        <span className="text-sm text-slate-400">
                          ${allocation.spent.toLocaleString()} / ${allocation.allocated.toLocaleString()}
                        </span>
                      </div>
                      <div className="w-full bg-slate-600 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-amber-400 to-amber-500 h-2 rounded-full"
                          style={{ width: `${(allocation.spent / allocation.allocated) * 100}%` }}
                        />
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
