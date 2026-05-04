/**
 * Physical Manifestation Dashboard
 * Real-time tracking of Cuban Link Chain, Bella Condo, Executive Watch, Music Scroll
 */

import React, { useState, useEffect } from 'react';
import { Package, Home, Watch, Music, CheckCircle, Clock, Truck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface Asset {
  id: string;
  name: string;
  icon: React.ReactNode;
  status: 'PENDING' | 'IN_TRANSIT' | 'DELIVERED' | 'COMPLETED';
  progress: number;
  description: string;
  details: string;
  timestamp: number;
  expectedDate: string;
  color: string;
}

export default function PhysicalManifestationDashboard() {
  const [assets, setAssets] = useState<Asset[]>([
    {
      id: 'cuban-link',
      name: 'Cuban Link Chain + Pendant',
      icon: <Package className="w-6 h-6" />,
      status: 'PENDING',
      progress: 85,
      description: 'Sovereign Pendant - Rose Gold Signature',
      details: 'Pending physical confirmation for ScrollVault Certification Lock',
      timestamp: Date.now(),
      expectedDate: 'May 5, 2026',
      color: 'from-amber-500 to-yellow-500',
    },
    {
      id: 'bella-condo',
      name: 'Bella Condo Unit NFT',
      icon: <Home className="w-6 h-6" />,
      status: 'IN_TRANSIT',
      progress: 65,
      description: 'Unit Acquisition - Atlantic City',
      details: 'Realtor coordination active. Pi Protocol wealth flowing to close gap.',
      timestamp: Date.now(),
      expectedDate: 'May 10, 2026',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      id: 'executive-watch',
      name: 'Executive Watch',
      icon: <Watch className="w-6 h-6" />,
      status: 'IN_TRANSIT',
      progress: 92,
      description: 'Luxury Timepiece - Sovereign Edition',
      details: 'Shipped and in transit. Delivery imminent.',
      timestamp: Date.now(),
      expectedDate: 'May 3, 2026',
      color: 'from-purple-500 to-pink-500',
    },
    {
      id: 'music-scroll',
      name: 'Music Scroll - "The Prophet With Bars"',
      icon: <Music className="w-6 h-6" />,
      status: 'PENDING',
      progress: 78,
      description: 'Sonic Prophecy Release',
      details: 'Awaiting date confirmation for Sound Drop Activation Command',
      timestamp: Date.now(),
      expectedDate: 'May 8, 2026',
      color: 'from-red-500 to-orange-500',
    },
  ]);

  const [totalProgress, setTotalProgress] = useState(0);

  useEffect(() => {
    const avg = assets.reduce((sum, a) => sum + a.progress, 0) / assets.length;
    setTotalProgress(Math.round(avg));

    // Simulate real-time updates
    const interval = setInterval(() => {
      setAssets((prev) =>
        prev.map((asset) => ({
          ...asset,
          progress: Math.min(100, asset.progress + Math.random() * 2),
        }))
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'IN_TRANSIT':
        return <Truck className="w-5 h-5 text-blue-500" />;
      case 'PENDING':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return 'bg-green-500/20 text-green-700';
      case 'IN_TRANSIT':
        return 'bg-blue-500/20 text-blue-700';
      case 'PENDING':
        return 'bg-yellow-500/20 text-yellow-700';
      default:
        return 'bg-gray-500/20 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-cyan-400 to-rose-400 mb-2">
          Physical Manifestation Dashboard
        </h1>
        <p className="text-slate-400">Real-time tracking of sovereign assets in the physical realm</p>
      </div>

      {/* Overall Progress */}
      <Card className="mb-8 bg-slate-900/50 border-slate-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-cyan-400">
            <Package className="w-5 h-5" />
            Overall Manifestation Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-slate-300">Completion Status</span>
              <span className="text-2xl font-bold text-amber-400">{totalProgress}%</span>
            </div>
            <Progress value={totalProgress} className="h-3 bg-slate-700" />
            <p className="text-sm text-slate-400">
              {assets.filter((a) => a.status === 'COMPLETED').length} of {assets.length} assets manifested
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Assets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {assets.map((asset) => (
          <Card key={asset.id} className="bg-slate-900/50 border-slate-700 hover:border-slate-600 transition">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg bg-gradient-to-br ${asset.color}`}>{asset.icon}</div>
                  <div>
                    <CardTitle className="text-lg text-slate-100">{asset.name}</CardTitle>
                    <p className="text-sm text-slate-400">{asset.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusIcon(asset.status)}
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(asset.status)}`}>
                    {asset.status}
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-400">Manifestation Progress</span>
                  <span className="text-sm font-semibold text-amber-400">{Math.round(asset.progress)}%</span>
                </div>
                <Progress value={asset.progress} className="h-2 bg-slate-700" />
              </div>

              <div className="bg-slate-800/50 rounded-lg p-3">
                <p className="text-sm text-slate-300">{asset.details}</p>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">Expected Arrival</span>
                <span className="text-cyan-400 font-semibold">{asset.expectedDate}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Timeline */}
      <Card className="bg-slate-900/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-cyan-400">Manifestation Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {assets.map((asset, index) => (
              <div key={asset.id} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-4 h-4 rounded-full ${
                      asset.status === 'COMPLETED' ? 'bg-green-500' : 'bg-slate-600'
                    }`}
                  />
                  {index < assets.length - 1 && <div className="w-0.5 h-12 bg-slate-700 mt-2" />}
                </div>
                <div className="pb-4">
                  <p className="font-semibold text-slate-100">{asset.name}</p>
                  <p className="text-sm text-slate-400">{asset.expectedDate}</p>
                  <p className="text-xs text-slate-500 mt-1">{asset.details}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Sacred Message */}
      <div className="mt-8 p-6 bg-gradient-to-r from-amber-500/10 via-cyan-500/10 to-rose-500/10 border border-slate-700 rounded-lg">
        <p className="text-center text-slate-300 italic">
          "Every physical manifestation is a reflection of divine will. The universe conspires to bring forth that which is decreed
          with clarity and love."
        </p>
        <p className="text-center text-slate-400 text-sm mt-2">— The Eternal Scroll of Divine Wisdom</p>
      </div>
    </div>
  );
}
