import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Music, Send, BarChart3, Link2, Zap, Globe, Plus, Trash2, TrendingUp } from 'lucide-react';
import { trpc } from '@/lib/trpc';

export default function VibeEngine() {
  const [activeTab, setActiveTab] = useState('campaigns');
  const [campaignTitle, setCampaignTitle] = useState('');
  const [contentTitle, setContentTitle] = useState('');
  const [contentUrl, setContentUrl] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['youtube', 'spotify']);
  const [scheduleTime, setScheduleTime] = useState('');
  
  // A/B Testing state
  const [abTestTitle, setAbTestTitle] = useState('');
  const [variants, setVariants] = useState<Array<{
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    engagementRate?: number;
    impressions?: number;
    clicks?: number;
  }>>([
    { id: 'var-1', title: 'Variant A', description: '', imageUrl: '' },
    { id: 'var-2', title: 'Variant B', description: '', imageUrl: '' },
  ]);
  const [selectedVariantId, setSelectedVariantId] = useState('var-1');
  const [showABResults, setShowABResults] = useState(false);

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

  const updateVariant = (id: string, field: string, value: string) => {
    setVariants(prev => prev.map(v => v.id === id ? { ...v, [field]: value } : v));
  };

  const addVariant = () => {
    const newId = `var-${Date.now()}`;
    setVariants(prev => [...prev, { id: newId, title: `Variant ${String.fromCharCode(65 + prev.length)}`, description: '', imageUrl: '' }]);
  };

  const removeVariant = (id: string) => {
    if (variants.length > 2) {
      setVariants(prev => prev.filter(v => v.id !== id));
    }
  };

  const launchABTest = async () => {
    if (!abTestTitle || variants.some(v => !v.title || !v.description)) {
      alert('Please fill in all variant details');
      return;
    }

    // Simulate A/B test launch with random engagement metrics
    const updatedVariants = variants.map(v => ({
      ...v,
      engagementRate: Math.random() * 15,
      impressions: Math.floor(Math.random() * 10000) + 1000,
      clicks: Math.floor(Math.random() * 500) + 50,
    }));

    setVariants(updatedVariants);
    setShowABResults(true);
    alert(`A/B Test "${abTestTitle}" launched across ${selectedPlatforms.length} platforms!`);
  };

  const getWinnerVariant = () => {
    return variants.reduce((prev, current) => 
      (current.engagementRate || 0) > (prev.engagementRate || 0) ? current : prev
    );
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
          <p className="text-slate-300 text-lg">Automated multi-platform content distribution with A/B testing</p>
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
            <TabsTrigger value="ab-testing" className="data-[state=active]:bg-rose-400/10 data-[state=active]:text-rose-400">
              A/B Testing
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-rose-400/10 data-[state=active]:text-rose-400">
              Analytics
            </TabsTrigger>
          </TabsList>

          {/* Campaigns Tab */}
          <TabsContent value="campaigns" className="space-y-6 mt-6">
            <Card className="bg-slate-800 border-rose-400/20">
              <CardHeader>
                <CardTitle className="text-rose-400">Create Campaign</CardTitle>
                <CardDescription>Launch a new content distribution campaign</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm text-slate-300 mb-2 block">Campaign Title</label>
                  <Input
                    placeholder="e.g., Londyn's Lullaby - Global Release"
                    value={campaignTitle}
                    onChange={(e) => setCampaignTitle(e.target.value)}
                    className="bg-slate-900 border-rose-400/20 text-white"
                  />
                </div>

                <div>
                  <label className="text-sm text-slate-300 mb-2 block">Content Title</label>
                  <Input
                    placeholder="e.g., Londyn's Lullaby"
                    value={contentTitle}
                    onChange={(e) => setContentTitle(e.target.value)}
                    className="bg-slate-900 border-rose-400/20 text-white"
                  />
                </div>

                <div>
                  <label className="text-sm text-slate-300 mb-2 block">Content URL</label>
                  <Input
                    placeholder="https://..."
                    value={contentUrl}
                    onChange={(e) => setContentUrl(e.target.value)}
                    className="bg-slate-900 border-rose-400/20 text-white"
                  />
                </div>

                <Button
                  onClick={handleCreateCampaign}
                  className="w-full bg-rose-400 hover:bg-rose-500 text-slate-900 font-semibold"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create Campaign
                </Button>
              </CardContent>
            </Card>

            {/* Recent Campaigns */}
            <div className="space-y-3">
              <h3 className="text-rose-400 font-semibold">Recent Campaigns</h3>
              {[
                { id: 'camp-001', title: 'Londyn\'s Lullaby Release', platforms: 6, status: 'Active', reach: '125K' },
                { id: 'camp-002', title: 'Q1 Content Series', platforms: 4, status: 'Scheduled', reach: '89K' },
                { id: 'camp-003', title: 'Community Showcase', platforms: 3, status: 'Completed', reach: '234K' },
              ].map(campaign => (
                <Card key={campaign.id} className="bg-slate-800 border-rose-400/10">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-white">{campaign.title}</p>
                        <p className="text-xs text-slate-400 mt-1">{campaign.platforms} platforms • {campaign.reach} reach</p>
                      </div>
                      <span className={`text-xs font-semibold px-3 py-1 rounded ${
                        campaign.status === 'Active'
                          ? 'bg-green-400/20 text-green-400'
                          : campaign.status === 'Scheduled'
                          ? 'bg-amber-400/20 text-amber-400'
                          : 'bg-slate-700 text-slate-300'
                      }`}>
                        {campaign.status}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Schedule Tab */}
          <TabsContent value="schedule" className="space-y-6 mt-6">
            <Card className="bg-slate-800 border-rose-400/20">
              <CardHeader>
                <CardTitle className="text-rose-400">Schedule Distribution</CardTitle>
                <CardDescription>Set when your content goes live across platforms</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm text-slate-300 mb-2 block">Schedule Time</label>
                  <Input
                    type="datetime-local"
                    value={scheduleTime}
                    onChange={(e) => setScheduleTime(e.target.value)}
                    className="bg-slate-900 border-rose-400/20 text-white"
                  />
                </div>

                <Button
                  onClick={handleScheduleDistribution}
                  className="w-full bg-rose-400 hover:bg-rose-500 text-slate-900 font-semibold"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Schedule Distribution
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* A/B Testing Tab */}
          <TabsContent value="ab-testing" className="space-y-6 mt-6">
            <Card className="bg-slate-800 border-rose-400/20">
              <CardHeader>
                <CardTitle className="text-rose-400">A/B Testing</CardTitle>
                <CardDescription>Test different content titles and images to optimize engagement</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="text-sm text-slate-300 mb-2 block">Test Name</label>
                  <Input
                    placeholder="e.g., Title Variation Test"
                    value={abTestTitle}
                    onChange={(e) => setAbTestTitle(e.target.value)}
                    className="bg-slate-900 border-rose-400/20 text-white"
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-rose-400 font-semibold">Variants</h3>
                    <Button
                      onClick={addVariant}
                      size="sm"
                      className="bg-rose-400/20 hover:bg-rose-400/30 text-rose-400 border border-rose-400/30"
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Add Variant
                    </Button>
                  </div>

                  {variants.map((variant, idx) => (
                    <div key={variant.id} className="p-4 bg-slate-900 rounded border border-rose-400/10 space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-white">Variant {String.fromCharCode(65 + idx)}</h4>
                        {variants.length > 2 && (
                          <button
                            onClick={() => removeVariant(variant.id)}
                            className="text-red-400 hover:text-red-300"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>

                      <div>
                        <label className="text-xs text-slate-400 mb-1 block">Title</label>
                        <Input
                          placeholder="Content title for this variant"
                          value={variant.title}
                          onChange={(e) => updateVariant(variant.id, 'title', e.target.value)}
                          className="bg-slate-800 border-rose-400/20 text-white text-sm"
                        />
                      </div>

                      <div>
                        <label className="text-xs text-slate-400 mb-1 block">Description</label>
                        <Textarea
                          placeholder="Variant description..."
                          value={variant.description}
                          onChange={(e) => updateVariant(variant.id, 'description', e.target.value)}
                          className="bg-slate-800 border-rose-400/20 text-white text-sm"
                        />
                      </div>

                      <div>
                        <label className="text-xs text-slate-400 mb-1 block">Image URL</label>
                        <Input
                          placeholder="https://..."
                          value={variant.imageUrl}
                          onChange={(e) => updateVariant(variant.id, 'imageUrl', e.target.value)}
                          className="bg-slate-800 border-rose-400/20 text-white text-sm"
                        />
                      </div>

                      {showABResults && variant.engagementRate !== undefined && (
                        <div className="p-3 bg-slate-800 rounded border border-rose-400/20 space-y-2">
                          <p className="text-xs text-slate-400">Performance Metrics</p>
                          <div className="grid grid-cols-3 gap-2 text-center">
                            <div>
                              <p className="text-xs text-slate-400">Engagement</p>
                              <p className="text-sm font-semibold text-rose-400">{variant.engagementRate?.toFixed(1)}%</p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-400">Impressions</p>
                              <p className="text-sm font-semibold text-rose-400">{variant.impressions?.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-400">Clicks</p>
                              <p className="text-sm font-semibold text-rose-400">{variant.clicks?.toLocaleString()}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <Button
                  onClick={launchABTest}
                  disabled={!abTestTitle || variants.some(v => !v.title || !v.description)}
                  className="w-full bg-rose-400 hover:bg-rose-500 text-slate-900 font-semibold"
                >
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Launch A/B Test
                </Button>

                {showABResults && (
                  <div className="p-4 bg-green-400/10 border border-green-400/30 rounded">
                    <p className="text-sm text-green-400 font-semibold mb-2">🏆 Winner Detected</p>
                    <p className="text-sm text-slate-300">
                      <strong>{getWinnerVariant().title}</strong> is performing best with {getWinnerVariant().engagementRate?.toFixed(1)}% engagement rate
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="bg-slate-800 border-rose-400/20">
                <CardContent className="pt-6">
                  <p className="text-slate-400 text-sm mb-2">Total Reach</p>
                  <p className="text-3xl font-bold text-rose-400">2.4M</p>
                  <p className="text-xs text-slate-400 mt-2">+12% this month</p>
                </CardContent>
              </Card>

              <Card className="bg-slate-800 border-rose-400/20">
                <CardContent className="pt-6">
                  <p className="text-slate-400 text-sm mb-2">Engagement Rate</p>
                  <p className="text-3xl font-bold text-rose-400">8.3%</p>
                  <p className="text-xs text-slate-400 mt-2">Industry avg: 5.2%</p>
                </CardContent>
              </Card>

              <Card className="bg-slate-800 border-rose-400/20">
                <CardContent className="pt-6">
                  <p className="text-slate-400 text-sm mb-2">Active Campaigns</p>
                  <p className="text-3xl font-bold text-rose-400">12</p>
                  <p className="text-xs text-slate-400 mt-2">Across 6 platforms</p>
                </CardContent>
              </Card>

              <Card className="bg-slate-800 border-rose-400/20">
                <CardContent className="pt-6">
                  <p className="text-slate-400 text-sm mb-2">A/B Tests Running</p>
                  <p className="text-3xl font-bold text-rose-400">3</p>
                  <p className="text-xs text-slate-400 mt-2">2 with winners</p>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-slate-800 border-rose-400/20">
              <CardHeader>
                <CardTitle className="text-rose-400">Platform Performance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { platform: 'YouTube', reach: '850K', engagement: '9.2%', trend: '+15%' },
                  { platform: 'TikTok', reach: '620K', engagement: '12.1%', trend: '+28%' },
                  { platform: 'Instagram', reach: '480K', engagement: '7.8%', trend: '+8%' },
                  { platform: 'Twitter', reach: '320K', engagement: '6.5%', trend: '+5%' },
                  { platform: 'Spotify', reach: '95K', engagement: '4.2%', trend: '-2%' },
                  { platform: 'SoundCloud', reach: '35K', engagement: '3.1%', trend: '+12%' },
                ].map(stat => (
                  <div key={stat.platform} className="flex items-center justify-between p-3 bg-slate-900 rounded border border-rose-400/10">
                    <div>
                      <p className="font-semibold text-white">{stat.platform}</p>
                      <p className="text-xs text-slate-400">{stat.reach} reach</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-rose-400">{stat.engagement}</p>
                      <p className={`text-xs ${stat.trend.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                        {stat.trend}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
