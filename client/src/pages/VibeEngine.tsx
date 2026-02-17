import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Music, Send, BarChart3, Link2, Zap, Globe } from 'lucide-react';
import { trpc } from '@/lib/trpc';

export default function VibeEngine() {
  const [activeTab, setActiveTab] = useState('campaigns');
  const [campaignTitle, setCampaignTitle] = useState('');
  const [contentTitle, setContentTitle] = useState('');
  const [contentUrl, setContentUrl] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['youtube', 'spotify']);
  const [scheduleTime, setScheduleTime] = useState('');

  const createCampaignMutation = trpc.distribution.createCampaign.useMutation();
  const uploadContentMutation = trpc.distribution.uploadContent.useMutation();
  const scheduleDistributionMutation = trpc.distribution.scheduleDistribution.useMutation();

  const platforms = [
    { id: 'youtube', name: 'YouTube', icon: '▶️' },
    { id: 'spotify', name: 'Spotify', icon: '🎵' },
    { id: 'twitter', name: 'Twitter', icon: '𝕏' },
    { id: 'tiktok', name: 'TikTok', icon: '🎬' },
    { id: 'instagram', name: 'Instagram', icon: '📸' },
    { id: 'soundcloud', name: 'SoundCloud', icon: '☁️' },
  ];

  const togglePlatform = (platformId: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platformId)
        ? prev.filter((p) => p !== platformId)
        : [...prev, platformId]
    );
  };

  const handleCreateCampaign = async () => {
    try {
      const result = await createCampaignMutation.mutateAsync({
        title: campaignTitle,
        contentType: 'music',
        platforms: selectedPlatforms as any,
        scheduleType: 'immediate',
      });
      alert(`Campaign created: ${result.campaignId}`);
      setCampaignTitle('');
    } catch (error) {
      console.error('Error creating campaign:', error);
    }
  };

  const handleScheduleDistribution = async () => {
    try {
      const result = await scheduleDistributionMutation.mutateAsync({
        campaignId: 'camp-001',
        contentId: 'content-001',
        platforms: selectedPlatforms as any,
        scheduleTime: scheduleTime || new Date().toISOString(),
      });
      alert(`Distribution scheduled: ${result.distributionId}`);
    } catch (error) {
      console.error('Error scheduling distribution:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Music className="w-8 h-8 text-rose-400" />
            <h1 className="text-4xl font-bold text-rose-400">VibeEngine</h1>
          </div>
          <p className="text-slate-300 text-lg">Automated multi-platform content distribution for the ScrollSoul Nexus</p>
        </div>

        {/* Platform Connections */}
        <Card className="bg-slate-800 border-rose-400/20 mb-8">
          <CardHeader>
            <CardTitle className="text-rose-400">Connected Platforms</CardTitle>
            <CardDescription>Your content distribution network</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
              {platforms.map((platform) => (
                <button
                  key={platform.id}
                  onClick={() => togglePlatform(platform.id)}
                  className={`p-4 rounded-lg border-2 transition ${
                    selectedPlatforms.includes(platform.id)
                      ? 'border-rose-400 bg-rose-400/10'
                      : 'border-slate-600 bg-slate-700 hover:border-slate-500'
                  }`}
                >
                  <div className="text-2xl mb-2">{platform.icon}</div>
                  <div className="text-xs font-medium text-white">{platform.name}</div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-slate-800 border border-rose-400/20">
            <TabsTrigger value="campaigns" className="data-[state=active]:bg-rose-400/10 data-[state=active]:text-rose-400">
              Campaigns
            </TabsTrigger>
            <TabsTrigger value="schedule" className="data-[state=active]:bg-rose-400/10 data-[state=active]:text-rose-400">
              Schedule
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-rose-400/10 data-[state=active]:text-rose-400">
              Analytics
            </TabsTrigger>
            <TabsTrigger value="history" className="data-[state=active]:bg-rose-400/10 data-[state=active]:text-rose-400">
              History
            </TabsTrigger>
          </TabsList>

          {/* Campaigns Tab */}
          <TabsContent value="campaigns" className="space-y-6">
            <Card className="bg-slate-800 border-rose-400/20">
              <CardHeader>
                <CardTitle className="text-rose-400">Create Campaign</CardTitle>
                <CardDescription>Launch a new multi-platform distribution campaign</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Campaign Title</label>
                  <Input
                    placeholder="e.g., Prophecy Fulfilled - Global Release"
                    value={campaignTitle}
                    onChange={(e) => setCampaignTitle(e.target.value)}
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-3">Target Platforms</label>
                  <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
                    {platforms.map((platform) => (
                      <button
                        key={platform.id}
                        onClick={() => togglePlatform(platform.id)}
                        className={`p-3 rounded text-xs font-medium transition ${
                          selectedPlatforms.includes(platform.id)
                            ? 'bg-rose-400 text-slate-900'
                            : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                        }`}
                      >
                        {platform.name}
                      </button>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={handleCreateCampaign}
                  disabled={createCampaignMutation.isPending}
                  className="w-full bg-rose-400 hover:bg-rose-500 text-slate-900 font-bold"
                >
                  {createCampaignMutation.isPending ? 'Creating...' : 'Create Campaign'}
                </Button>
              </CardContent>
            </Card>

            {/* Active Campaigns */}
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-white">Active Campaigns</h3>
              {[
                {
                  id: 'camp-001',
                  title: 'Prophecy Fulfilled - Launch',
                  platforms: 3,
                  reaches: 45230,
                  engagements: 6234,
                },
                {
                  id: 'camp-002',
                  title: 'Sacred Frequencies Release',
                  platforms: 2,
                  reaches: 12500,
                  engagements: 1823,
                },
              ].map((campaign) => (
                <Card key={campaign.id} className="bg-slate-800 border-slate-600">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-white">{campaign.title}</h4>
                        <p className="text-sm text-slate-400">{campaign.platforms} platforms • {campaign.reaches.toLocaleString()} reaches</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-rose-400">{campaign.engagements.toLocaleString()}</p>
                        <p className="text-xs text-slate-400">engagements</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Schedule Tab */}
          <TabsContent value="schedule" className="space-y-6">
            <Card className="bg-slate-800 border-rose-400/20">
              <CardHeader>
                <CardTitle className="text-rose-400">Schedule Distribution</CardTitle>
                <CardDescription>Plan your content release across platforms</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Content Title</label>
                  <Input
                    placeholder="e.g., Lyric Plaque: Prophecy Fulfilled"
                    value={contentTitle}
                    onChange={(e) => setContentTitle(e.target.value)}
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Content URL</label>
                  <Input
                    placeholder="https://..."
                    value={contentUrl}
                    onChange={(e) => setContentUrl(e.target.value)}
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Schedule Time</label>
                  <Input
                    type="datetime-local"
                    value={scheduleTime}
                    onChange={(e) => setScheduleTime(e.target.value)}
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-3">Platforms</label>
                  <div className="grid grid-cols-2 gap-2">
                    {platforms.map((platform) => (
                      <button
                        key={platform.id}
                        onClick={() => togglePlatform(platform.id)}
                        className={`p-3 rounded text-sm font-medium transition ${
                          selectedPlatforms.includes(platform.id)
                            ? 'bg-rose-400 text-slate-900'
                            : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                        }`}
                      >
                        {platform.name}
                      </button>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={handleScheduleDistribution}
                  disabled={scheduleDistributionMutation.isPending}
                  className="w-full bg-rose-400 hover:bg-rose-500 text-slate-900 font-bold"
                >
                  {scheduleDistributionMutation.isPending ? 'Scheduling...' : 'Schedule Distribution'}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-slate-800 border-rose-400/20">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm">Total Reaches</p>
                      <p className="text-2xl font-bold text-rose-400">57,730</p>
                    </div>
                    <Globe className="w-8 h-8 text-rose-400" />
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-slate-800 border-amber-400/20">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm">Engagements</p>
                      <p className="text-2xl font-bold text-amber-400">8,057</p>
                    </div>
                    <Zap className="w-8 h-8 text-amber-400" />
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-slate-800 border-green-400/20">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm">Engagement Rate</p>
                      <p className="text-2xl font-bold text-green-400">14%</p>
                    </div>
                    <BarChart3 className="w-8 h-8 text-green-400" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-slate-800 border-slate-600">
              <CardHeader>
                <CardTitle className="text-white">Platform Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { platform: 'YouTube', reaches: 15000, engagements: 2100, rate: 14 },
                    { platform: 'Spotify', reaches: 18000, engagements: 2500, rate: 13.9 },
                    { platform: 'Twitter', reaches: 12230, engagements: 1650, rate: 13.5 },
                    { platform: 'TikTok', reaches: 12500, engagements: 1807, rate: 14.5 },
                  ].map((stat) => (
                    <div key={stat.platform} className="bg-slate-700 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-white">{stat.platform}</span>
                        <span className="text-sm text-slate-400">{stat.engagements} engagements</span>
                      </div>
                      <div className="w-full bg-slate-600 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-rose-400 to-rose-500 h-2 rounded-full"
                          style={{ width: `${stat.rate * 7}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history" className="space-y-6">
            <Card className="bg-slate-800 border-slate-600">
              <CardHeader>
                <CardTitle className="text-white">Distribution History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { title: 'Prophecy Fulfilled', date: '2 days ago', platforms: 3, status: 'completed' },
                    { title: 'Sacred Frequencies', date: '5 days ago', platforms: 2, status: 'completed' },
                    { title: 'Genesis Release', date: '1 week ago', platforms: 6, status: 'completed' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
                      <div>
                        <p className="font-medium text-white">{item.title}</p>
                        <p className="text-xs text-slate-400">{item.date} • {item.platforms} platforms</p>
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-400/20 text-green-400">
                        {item.status}
                      </span>
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
