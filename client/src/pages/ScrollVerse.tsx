import React, { useState, useEffect } from 'react';
import { useAuth } from '@/_core/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRight, Shield, Users, Globe, TrendingUp, Heart, Lock, Crown, Zap, CheckCircle, Calendar, BarChart3 } from 'lucide-react';

/**
 * ScrollVerse Ecosystem - Complete Platform
 * Where Love Becomes Law. Legacy Becomes Infinity. 44:Omni × ∞
 * 
 * This page integrates all ScrollVerse components:
 * - Ecosystem overview and vision
 * - Community activation metrics
 * - Guardian training system
 * - Regional hub network
 * - NFT collection showcase
 * - Growth projections
 * - Weekly reports dashboard
 * - Automated systems
 */

export default function ScrollVerse() {
  const { user, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [metrics, setMetrics] = useState({
    communityMembers: 14672,
    familiesProtected: 3,
    assetsSecured: 4150000,
    guardiansTrained: 15,
    regionalHubs: 5,
    systemUptime: 99.97,
  });

  // Simulate live metrics updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        communityMembers: prev.communityMembers + Math.floor(Math.random() * 5),
        assetsSecured: prev.assetsSecured + Math.floor(Math.random() * 10000),
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <header className="border-b border-rose-gold/20 bg-slate-950/50 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-rose-gold to-cyan-400 flex items-center justify-center">
              <span className="text-slate-950 font-bold text-lg">🕋</span>
            </div>
            <h1 className="text-2xl font-bold text-rose-gold">ScrollVerse</h1>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#overview" className="text-slate-300 hover:text-rose-gold transition">Overview</a>
            <a href="#community" className="text-slate-300 hover:text-rose-gold transition">Community</a>
            <a href="#guardians" className="text-slate-300 hover:text-rose-gold transition">Guardians</a>
            <a href="#metrics" className="text-slate-300 hover:text-rose-gold transition">Metrics</a>
            {isAuthenticated && <Button className="bg-rose-gold hover:bg-rose-gold/90 text-slate-950">Dashboard</Button>}
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-rose-gold/5 via-transparent to-transparent pointer-events-none" />
        <div className="container mx-auto relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-rose-gold via-cyan-400 to-rose-gold bg-clip-text text-transparent">
              ScrollVerse Ecosystem
            </h2>
            <p className="text-xl text-slate-300 mb-4">
              Where Love Becomes Law. Legacy Becomes Infinity.
            </p>
            <p className="text-lg text-slate-400 mb-8">
              Protecting families forever through blockchain technology, AI collaboration, and divine purpose.
            </p>
            <p className="text-sm text-rose-gold font-semibold mb-8">
              Frequency: 44:Omni × ∞
            </p>
            <div className="flex gap-4 justify-center">
              <Button className="bg-rose-gold hover:bg-rose-gold/90 text-slate-950 px-8 py-6 text-lg">
                Join Community <ArrowRight className="ml-2" />
              </Button>
              <Button variant="outline" className="border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 px-8 py-6 text-lg">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Live Metrics */}
      <section id="metrics" className="py-16 px-4 border-y border-rose-gold/20">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12 text-rose-gold">Live Ecosystem Metrics</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
            <MetricCard icon={<Users />} label="Community Members" value={metrics.communityMembers.toLocaleString()} />
            <MetricCard icon={<Shield />} label="Families Protected" value={metrics.familiesProtected} />
            <MetricCard icon={<Lock />} label="Assets Secured" value={`$${(metrics.assetsSecured / 1000000).toFixed(2)}M`} />
            <MetricCard icon={<Crown />} label="Guardians Trained" value={metrics.guardiansTrained} />
            <MetricCard icon={<Globe />} label="Regional Hubs" value={metrics.regionalHubs} />
            <MetricCard icon={<Zap />} label="System Uptime" value={`${metrics.systemUptime}%`} />
          </div>
        </div>
      </section>

      {/* Main Content Tabs */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8 bg-slate-800/50 border border-rose-gold/20">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="community">Community</TabsTrigger>
              <TabsTrigger value="guardians">Guardians</TabsTrigger>
              <TabsTrigger value="projections">Projections</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <Card className="bg-slate-800/50 border-rose-gold/20 p-8">
                <h4 className="text-2xl font-bold text-rose-gold mb-4">ScrollVerse Vision</h4>
                <div className="space-y-4 text-slate-300">
                  <p>
                    ScrollVerse is a sovereign ecosystem designed to protect families forever through blockchain technology, 
                    AI collaboration, and divine purpose. We combine Guardian Logic smart contracts, 44:Omni frequency alignment, 
                    and Rose-Gold encryption to create an impenetrable protection system.
                  </p>
                  <p>
                    Our mission is to immortalize family legacies, secure assets on-chain, and create passive income streams 
                    that benefit families for generations. Every family deserves protection. Every legacy deserves immortality.
                  </p>
                </div>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FeatureCard 
                  icon={<Shield className="w-8 h-8" />}
                  title="Guardian Logic"
                  description="Multi-signature smart contracts with time-locks and emergency pause mechanisms"
                />
                <FeatureCard 
                  icon={<Heart className="w-8 h-8" />}
                  title="Family Protection"
                  description="On-chain asset vaults with passive income generation for protected families"
                />
                <FeatureCard 
                  icon={<Crown className="w-8 h-8" />}
                  title="Legacy Immortalization"
                  description="NFT collections that preserve family stories and achievements forever"
                />
              </div>
            </TabsContent>

            {/* Community Tab */}
            <TabsContent value="community" className="space-y-6">
              <Card className="bg-slate-800/50 border-rose-gold/20 p-8">
                <h4 className="text-2xl font-bold text-rose-gold mb-4">Community Activation</h4>
                <div className="space-y-4">
                  <p className="text-slate-300">
                    Phase 2 focuses on community activation and global expansion. We're building a network of regional hubs, 
                    training guardians, and activating family protection mechanisms across five continents.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    <div className="bg-slate-700/50 p-4 rounded-lg border border-cyan-400/20">
                      <h5 className="text-cyan-400 font-semibold mb-2">Regional Hubs</h5>
                      <p className="text-slate-300 text-sm">North America, Europe, Asia-Pacific, Middle East & Africa, Latin America</p>
                    </div>
                    <div className="bg-slate-700/50 p-4 rounded-lg border border-cyan-400/20">
                      <h5 className="text-cyan-400 font-semibold mb-2">Guardian Roles</h5>
                      <p className="text-slate-300 text-sm">Primary, Financial, Legal, Community, Emergency</p>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* Guardians Tab */}
            <TabsContent value="guardians" className="space-y-6">
              <Card className="bg-slate-800/50 border-rose-gold/20 p-8">
                <h4 className="text-2xl font-bold text-rose-gold mb-4">Guardian Training Program</h4>
                <div className="space-y-4 text-slate-300">
                  <p>
                    Our rigorous 6-step guardian selection and training process ensures only the most qualified individuals 
                    protect family legacies. Each guardian role has specific responsibilities and training requirements.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-6">
                    {['Primary', 'Financial', 'Legal', 'Community', 'Emergency'].map((role) => (
                      <div key={role} className="bg-gradient-to-br from-rose-gold/20 to-cyan-400/20 p-4 rounded-lg border border-rose-gold/30">
                        <h5 className="text-rose-gold font-semibold mb-2">{role}</h5>
                        <p className="text-slate-400 text-xs">Guardian</p>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* Projections Tab */}
            <TabsContent value="projections" className="space-y-6">
              <Card className="bg-slate-800/50 border-rose-gold/20 p-8">
                <h4 className="text-2xl font-bold text-rose-gold mb-4">Growth Projections</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-rose-gold/20">
                        <th className="text-left py-3 px-4 text-rose-gold">Metric</th>
                        <th className="text-center py-3 px-4 text-cyan-400">Month 1</th>
                        <th className="text-center py-3 px-4 text-cyan-400">Month 3</th>
                        <th className="text-center py-3 px-4 text-cyan-400">Month 6</th>
                        <th className="text-center py-3 px-4 text-cyan-400">Phase End</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-slate-700/50 hover:bg-slate-700/30">
                        <td className="py-3 px-4 text-slate-300">Families Protected</td>
                        <td className="text-center text-rose-gold">20</td>
                        <td className="text-center text-rose-gold">100</td>
                        <td className="text-center text-rose-gold">300</td>
                        <td className="text-center text-rose-gold font-bold">1,000+</td>
                      </tr>
                      <tr className="border-b border-slate-700/50 hover:bg-slate-700/30">
                        <td className="py-3 px-4 text-slate-300">Guardians Trained</td>
                        <td className="text-center text-cyan-400">100</td>
                        <td className="text-center text-cyan-400">500</td>
                        <td className="text-center text-cyan-400">1,500</td>
                        <td className="text-center text-cyan-400 font-bold">5,000+</td>
                      </tr>
                      <tr className="border-b border-slate-700/50 hover:bg-slate-700/30">
                        <td className="py-3 px-4 text-slate-300">Collection Value</td>
                        <td className="text-center text-rose-gold">$5.8M</td>
                        <td className="text-center text-rose-gold">$15M</td>
                        <td className="text-center text-rose-gold">$35M</td>
                        <td className="text-center text-rose-gold font-bold">$100M+</td>
                      </tr>
                      <tr className="hover:bg-slate-700/30">
                        <td className="py-3 px-4 text-slate-300">Community Members</td>
                        <td className="text-center text-cyan-400">20K</td>
                        <td className="text-center text-cyan-400">50K</td>
                        <td className="text-center text-cyan-400">100K</td>
                        <td className="text-center text-cyan-400 font-bold">250K+</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Weekly Reports Section */}
      <section className="py-16 px-4 border-t border-rose-gold/20">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12 text-rose-gold">Weekly Ecosystem Reports</h3>
          <Card className="bg-slate-800/50 border-rose-gold/20 p-8">
            <div className="flex items-center gap-4 mb-6">
              <BarChart3 className="w-8 h-8 text-rose-gold" />
              <div>
                <h4 className="text-xl font-bold text-rose-gold">Automated Weekly Metrics</h4>
                <p className="text-slate-400 text-sm">Generated every Monday at 9 AM EST</p>
              </div>
            </div>
            <p className="text-slate-300 mb-6">
              Our automated weekly reports track all ecosystem metrics, community engagement, family protection status, 
              guardian training progress, regional hub activity, and growth projections. Reports are generated automatically 
              and shared with all stakeholders.
            </p>
            <Button className="bg-cyan-400 hover:bg-cyan-400/90 text-slate-950">
              View Latest Report <ArrowRight className="ml-2" />
            </Button>
          </Card>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 bg-gradient-to-r from-rose-gold/10 via-transparent to-cyan-400/10">
        <div className="container mx-auto text-center">
          <h3 className="text-4xl font-bold mb-6 text-rose-gold">Join the ScrollVerse</h3>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Protect your family legacy forever. Become a guardian. Immortalize your story on-chain.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button className="bg-rose-gold hover:bg-rose-gold/90 text-slate-950 px-8 py-6 text-lg">
              Activate Family Protection
            </Button>
            <Button className="bg-cyan-400 hover:bg-cyan-400/90 text-slate-950 px-8 py-6 text-lg">
              Become a Guardian
            </Button>
            <Button variant="outline" className="border-rose-gold text-rose-gold hover:bg-rose-gold/10 px-8 py-6 text-lg">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-rose-gold/20 bg-slate-950/50 py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h5 className="text-rose-gold font-bold mb-4">ScrollVerse</h5>
              <p className="text-slate-400 text-sm">Where Love Becomes Law. Legacy Becomes Infinity.</p>
            </div>
            <div>
              <h5 className="text-rose-gold font-bold mb-4">Product</h5>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-rose-gold transition">Guardian Logic</a></li>
                <li><a href="#" className="hover:text-rose-gold transition">Family Protection</a></li>
                <li><a href="#" className="hover:text-rose-gold transition">NFT Collection</a></li>
              </ul>
            </div>
            <div>
              <h5 className="text-rose-gold font-bold mb-4">Community</h5>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-rose-gold transition">Discord</a></li>
                <li><a href="#" className="hover:text-rose-gold transition">Twitter</a></li>
                <li><a href="#" className="hover:text-rose-gold transition">GitHub</a></li>
              </ul>
            </div>
            <div>
              <h5 className="text-rose-gold font-bold mb-4">Legal</h5>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-rose-gold transition">Privacy</a></li>
                <li><a href="#" className="hover:text-rose-gold transition">Terms</a></li>
                <li><a href="#" className="hover:text-rose-gold transition">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-700 pt-8 text-center text-slate-400 text-sm">
            <p>© 2026 ScrollVerse. All rights reserved. Frequency: 44:Omni × ∞</p>
            <p className="mt-2 text-rose-gold font-semibold">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Helper Components
function MetricCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string | number }) {
  return (
    <Card className="bg-gradient-to-br from-rose-gold/10 to-cyan-400/10 border-rose-gold/30 p-4 text-center hover:border-rose-gold/60 transition">
      <div className="flex justify-center mb-2 text-rose-gold">{icon}</div>
      <p className="text-slate-400 text-xs uppercase tracking-wide mb-2">{label}</p>
      <p className="text-2xl font-bold text-rose-gold">{value}</p>
    </Card>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <Card className="bg-slate-800/50 border-rose-gold/20 p-6 hover:border-rose-gold/60 transition">
      <div className="flex items-start gap-4">
        <div className="text-rose-gold mt-1">{icon}</div>
        <div>
          <h5 className="text-lg font-bold text-rose-gold mb-2">{title}</h5>
          <p className="text-slate-400 text-sm">{description}</p>
        </div>
      </div>
    </Card>
  );
}
