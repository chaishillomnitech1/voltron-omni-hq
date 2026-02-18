import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Vote, TrendingUp, Users, Wallet, CheckCircle, Clock, Bell, X, AlertCircle } from 'lucide-react';
import { trpc } from '@/lib/trpc';

export default function DAOGovernance() {
  const [activeTab, setActiveTab] = useState('proposals');
  const [proposalTitle, setProposalTitle] = useState('');
  const [proposalDescription, setProposalDescription] = useState('');
  const [proposalType, setProposalType] = useState<'budget' | 'governance' | 'treasury' | 'member'>('budget');
  const [targetAmount, setTargetAmount] = useState('');
  const [duration, setDuration] = useState('7');
  
  // Notification state
  const [notifications, setNotifications] = useState<Array<{
    id: string;
    type: 'proposal' | 'vote' | 'execution' | 'alert';
    title: string;
    message: string;
    timestamp: Date;
    read: boolean;
  }>>([]);
  const [showNotifications, setShowNotifications] = useState(false);

  const createProposalMutation = trpc.dao.createProposal.useMutation();
  const voteMutation = trpc.dao.vote.useMutation();

  // Simulate real-time notifications
  useEffect(() => {
    const interval = setInterval(() => {
      const randomEvent = Math.random();
      
      if (randomEvent < 0.3) {
        addNotification({
          type: 'vote',
          title: 'New Vote Cast',
          message: 'Member voted on "Treasury Allocation Q1 2026"',
        });
      } else if (randomEvent < 0.6) {
        addNotification({
          type: 'proposal',
          title: 'New Proposal',
          message: 'New governance proposal submitted by council',
        });
      } else if (randomEvent < 0.9) {
        addNotification({
          type: 'execution',
          title: 'Proposal Executed',
          message: 'Budget allocation proposal executed successfully',
        });
      }
    }, 15000); // Every 15 seconds

    return () => clearInterval(interval);
  }, []);

  const addNotification = (notification: Omit<typeof notifications[0], 'id' | 'timestamp' | 'read'>) => {
    const newNotification = {
      id: Math.random().toString(36).substr(2, 9),
      ...notification,
      timestamp: new Date(),
      read: false,
    };
    setNotifications(prev => [newNotification, ...prev].slice(0, 10)); // Keep last 10
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const handleCreateProposal = async () => {
    try {
      const result = await createProposalMutation.mutateAsync({
        daoId: 'dao-001',
        title: proposalTitle,
        description: proposalDescription,
        proposalType,
        targetAmount: targetAmount ? parseInt(targetAmount) * 100 : undefined,
        duration: parseInt(duration),
      });
      
      addNotification({
        type: 'proposal',
        title: 'Proposal Created',
        message: `"${proposalTitle}" has been submitted for voting`,
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
      
      addNotification({
        type: 'vote',
        title: 'Vote Recorded',
        message: `Your vote "${vote}" has been recorded`,
      });
      
      alert(`Vote recorded: ${result.vote}`);
    } catch (error) {
      console.error('Error voting:', error);
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'proposal': return <AlertCircle className="w-4 h-4 text-blue-400" />;
      case 'vote': return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'execution': return <CheckCircle className="w-4 h-4 text-amber-400" />;
      default: return <Bell className="w-4 h-4 text-slate-400" />;
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Vote className="w-8 h-8 text-cyan-400" />
              <h1 className="text-4xl font-bold text-cyan-400">Providence DAO</h1>
            </div>
            
            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-3 hover:bg-slate-800 rounded-lg transition"
              >
                <Bell className="w-6 h-6 text-cyan-400" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notification Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 top-12 w-96 bg-slate-800 border border-cyan-400/30 rounded-lg shadow-xl z-50">
                  <div className="p-4 border-b border-cyan-400/20 flex items-center justify-between">
                    <h3 className="font-semibold text-cyan-400">Notifications</h3>
                    <button
                      onClick={() => setShowNotifications(false)}
                      className="text-slate-400 hover:text-white"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="p-4 text-center text-slate-400 text-sm">
                        No notifications yet
                      </div>
                    ) : (
                      notifications.map(notif => (
                        <div
                          key={notif.id}
                          onClick={() => markAsRead(notif.id)}
                          className={`p-3 border-b border-slate-700 cursor-pointer hover:bg-slate-700/50 transition ${
                            !notif.read ? 'bg-slate-700/30' : ''
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            {getNotificationIcon(notif.type)}
                            <div className="flex-1">
                              <p className="text-sm font-semibold text-white">{notif.title}</p>
                              <p className="text-xs text-slate-400 mt-1">{notif.message}</p>
                              <p className="text-xs text-slate-500 mt-2">
                                {notif.timestamp.toLocaleTimeString()}
                              </p>
                            </div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                removeNotification(notif.id);
                              }}
                              className="text-slate-400 hover:text-white"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
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
          <Card className="bg-slate-800 border-purple-400/20">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Voting Power</p>
                  <p className="text-2xl font-bold text-purple-400">1,200</p>
                </div>
                <TrendingUp className="w-8 h-8 text-purple-400" />
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
          <TabsContent value="proposals" className="space-y-4 mt-6">
            {[
              {
                id: 'prop-001',
                title: 'Treasury Allocation Q1 2026',
                description: 'Allocate 50K USDC for community development',
                status: 'active',
                votesFor: 28,
                votesAgainst: 8,
                daysLeft: 3,
              },
              {
                id: 'prop-002',
                title: 'Governance Update v2.0',
                description: 'Implement new voting mechanism',
                status: 'active',
                votesFor: 35,
                votesAgainst: 5,
                daysLeft: 5,
              },
              {
                id: 'prop-003',
                title: 'Member Onboarding Program',
                description: 'Launch structured onboarding for new members',
                status: 'passed',
                votesFor: 40,
                votesAgainst: 2,
                daysLeft: 0,
              },
            ].map(proposal => (
              <Card key={proposal.id} className="bg-slate-800 border-cyan-400/20">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-cyan-400">{proposal.title}</CardTitle>
                      <CardDescription>{proposal.description}</CardDescription>
                    </div>
                    <span className={`px-3 py-1 rounded text-xs font-semibold ${
                      proposal.status === 'active' 
                        ? 'bg-green-400/20 text-green-400'
                        : 'bg-slate-700 text-slate-300'
                    }`}>
                      {proposal.status === 'active' ? 'Active' : 'Passed'}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-slate-400 mb-1">Votes For</p>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-slate-700 rounded h-2">
                          <div
                            className="bg-green-400 h-2 rounded"
                            style={{ width: `${(proposal.votesFor / (proposal.votesFor + proposal.votesAgainst)) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm font-semibold text-green-400">{proposal.votesFor}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 mb-1">Votes Against</p>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-slate-700 rounded h-2">
                          <div
                            className="bg-red-400 h-2 rounded"
                            style={{ width: `${(proposal.votesAgainst / (proposal.votesFor + proposal.votesAgainst)) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm font-semibold text-red-400">{proposal.votesAgainst}</span>
                      </div>
                    </div>
                  </div>

                  {proposal.status === 'active' && (
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleVote(proposal.id, 'for')}
                        className="flex-1 bg-green-400/20 hover:bg-green-400/30 text-green-400 border border-green-400/30"
                      >
                        Vote For
                      </Button>
                      <Button
                        onClick={() => handleVote(proposal.id, 'against')}
                        className="flex-1 bg-red-400/20 hover:bg-red-400/30 text-red-400 border border-red-400/30"
                      >
                        Vote Against
                      </Button>
                      <Button
                        onClick={() => handleVote(proposal.id, 'abstain')}
                        className="flex-1 bg-slate-700 hover:bg-slate-600 text-slate-300"
                      >
                        Abstain
                      </Button>
                    </div>
                  )}

                  <p className="text-xs text-slate-400">
                    {proposal.daysLeft > 0 ? `${proposal.daysLeft} days left to vote` : 'Voting closed'}
                  </p>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Create Proposal Tab */}
          <TabsContent value="create" className="mt-6">
            <Card className="bg-slate-800 border-cyan-400/20">
              <CardHeader>
                <CardTitle className="text-cyan-400">Create New Proposal</CardTitle>
                <CardDescription>Submit a proposal for DAO members to vote on</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm text-slate-300 mb-2 block">Proposal Title</label>
                  <Input
                    placeholder="e.g., Treasury Allocation Q1 2026"
                    value={proposalTitle}
                    onChange={(e) => setProposalTitle(e.target.value)}
                    className="bg-slate-900 border-cyan-400/20 text-white"
                  />
                </div>

                <div>
                  <label className="text-sm text-slate-300 mb-2 block">Description</label>
                  <Textarea
                    placeholder="Describe your proposal in detail..."
                    value={proposalDescription}
                    onChange={(e) => setProposalDescription(e.target.value)}
                    className="bg-slate-900 border-cyan-400/20 text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-slate-300 mb-2 block">Proposal Type</label>
                    <select
                      value={proposalType}
                      onChange={(e) => setProposalType(e.target.value as any)}
                      className="w-full bg-slate-900 border border-cyan-400/20 text-white rounded px-3 py-2"
                    >
                      <option value="budget">Budget</option>
                      <option value="governance">Governance</option>
                      <option value="treasury">Treasury</option>
                      <option value="member">Member</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-sm text-slate-300 mb-2 block">Voting Duration (days)</label>
                    <Input
                      type="number"
                      min="1"
                      max="30"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      className="bg-slate-900 border-cyan-400/20 text-white"
                    />
                  </div>
                </div>

                {proposalType === 'budget' && (
                  <div>
                    <label className="text-sm text-slate-300 mb-2 block">Target Amount (USDC)</label>
                    <Input
                      type="number"
                      placeholder="50000"
                      value={targetAmount}
                      onChange={(e) => setTargetAmount(e.target.value)}
                      className="bg-slate-900 border-cyan-400/20 text-white"
                    />
                  </div>
                )}

                <Button
                  onClick={handleCreateProposal}
                  className="w-full bg-cyan-400 hover:bg-cyan-500 text-slate-900 font-semibold"
                >
                  Submit Proposal
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Treasury Tab */}
          <TabsContent value="treasury" className="space-y-4 mt-6">
            <Card className="bg-slate-800 border-cyan-400/20">
              <CardHeader>
                <CardTitle className="text-cyan-400">Treasury Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-slate-900 rounded border border-cyan-400/10">
                    <p className="text-slate-400 text-sm mb-2">Total Balance</p>
                    <p className="text-3xl font-bold text-cyan-400">500,000 USDC</p>
                  </div>
                  <div className="p-4 bg-slate-900 rounded border border-green-400/10">
                    <p className="text-slate-400 text-sm mb-2">Allocated</p>
                    <p className="text-3xl font-bold text-green-400">150,000 USDC</p>
                  </div>
                  <div className="p-4 bg-slate-900 rounded border border-amber-400/10">
                    <p className="text-slate-400 text-sm mb-2">Available</p>
                    <p className="text-3xl font-bold text-amber-400">350,000 USDC</p>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-cyan-400 font-semibold mb-4">Recent Transactions</h3>
                  <div className="space-y-2">
                    {[
                      { type: 'Allocation', amount: '50,000', status: 'Completed' },
                      { type: 'Transfer', amount: '25,000', status: 'Pending' },
                      { type: 'Deposit', amount: '100,000', status: 'Completed' },
                    ].map((tx, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-slate-900 rounded border border-slate-700">
                        <div>
                          <p className="text-sm font-semibold text-white">{tx.type}</p>
                          <p className="text-xs text-slate-400">{tx.amount} USDC</p>
                        </div>
                        <span className={`text-xs font-semibold px-2 py-1 rounded ${
                          tx.status === 'Completed'
                            ? 'bg-green-400/20 text-green-400'
                            : 'bg-amber-400/20 text-amber-400'
                        }`}>
                          {tx.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
