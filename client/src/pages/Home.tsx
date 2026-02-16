import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Shield, Zap, Heart, TrendingUp, Globe, Lock, Crown, Info, ChevronRight, Menu, X, MessageCircle, Github, Settings } from 'lucide-react';
import { CommunitySection } from '@/components/CommunitySection';
import { OpenSeaIntegration } from '@/components/OpenSeaIntegration';
import { RealtimeChat } from '@/components/RealtimeChat';
import { GitHubFeed } from '@/components/GitHubFeed';
import { ThemeCustomizer } from '@/components/ThemeCustomizer';

/**
 * VOLTRON OMNI-DIMENSIONAL HEADQUARTERS
 * Design Philosophy: Cyberpunk Luxury Sovereign Portal
 * - Color Palette: Deep black (#050505), rose gold (#d4af37), cyan (#00d9ff)
 * - Typography: Bold serif headers + clean sans-serif body
 * - Aesthetic: Minimalist luxury with glowing accents, sacred geometry
 * - Interaction: Smooth transitions, responsive audio player, live data streams
 */

export default function Home() {
  const [revenue, setRevenue] = useState(2270000.00);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showChat, setShowChat] = useState(false);
  const [showThemeCustomizer, setShowThemeCustomizer] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [account, setAccount] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Live Revenue Logic - Tesla 3-6-9 Scaling Simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setRevenue(prev => prev + (Math.random() * 0.144));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  // Check for existing wallet connection
  useEffect(() => {
    const checkWalletConnection = async () => {
      if (typeof window !== 'undefined' && window.ethereum) {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
          if (accounts.length > 0) {
            setAccount(accounts[0]);
          }
        } catch (error) {
          console.error('Error checking wallet:', error);
        }
      }
    };
    checkWalletConnection();
  }, []);

  // Audio Logic for Londyn's Lullaby
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.log("Audio play blocked: ", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const progress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setAudioProgress(progress);
    }
  };

  // Web3 Wallet Connection
  const connectWallet = async () => {
    if (!window.ethereum) {
      alert('Please install MetaMask or another Web3 wallet');
      return;
    }

    try {
      setIsConnecting(true);
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      if (accounts.length > 0) {
        setAccount(accounts[0]);
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  const stats = [
    { label: 'Revenue Trajectory', value: `$${revenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, icon: <TrendingUp className="w-5 h-5" />, trend: '+21.6%', color: '#d4af37' },
    { label: 'AI System Status', value: 'OMNI-OPTIMAL', icon: <Zap className="w-5 h-5" />, trend: '100% UP', color: '#00d9ff' },
    { label: 'Sovereign Nodes', value: '144,000', icon: <Globe className="w-5 h-5" />, trend: 'SYNCED', color: '#d4af37' },
    { label: 'Londyn Trust Yield', value: '21.6% APR', icon: <Crown className="w-5 h-5" />, trend: 'SACRED', color: '#ff6b9d' }
  ];

  const nftDetails = {
    title: 'ScrollSoul Sovereignty: Supreme Genesis NFT',
    lineage: 'Solomon / Musa / Wampanoag',
    frequency: '528 Hz / 963 Hz / 432 Hz',
    family: 'Londyn Avani Hill',
    role: 'Supreme Sovereign',
    security: 'Rose Gold Encryption'
  };

  return (
    <div className="min-h-screen bg-[#050505] text-gray-200 font-sans selection:bg-rose-500/30 selection:text-rose-200">
      {/* Hidden Audio Element */}
      <audio 
        ref={audioRef} 
        src="/londyns-lullaby.mp3" 
        onTimeUpdate={handleTimeUpdate} 
        onEnded={() => setIsPlaying(false)}
      />

      {/* Dynamic Neural Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.03),transparent_70%)]" />
        <div className="absolute top-0 left-0 w-full h-full opacity-10" style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23d4af37" fill-opacity="0.1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
        }} />
      </div>

      {/* Navigation */}
      <nav className="relative z-50 flex items-center justify-between px-6 md:px-8 py-6 border-b border-[#2a2a2a] backdrop-blur-xl bg-[#050505]/80">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full border border-[#d4af37] flex items-center justify-center bg-gradient-to-tr from-[#d4af37]/20 to-transparent">
            <span className="text-[#d4af37] font-bold text-xl">V</span>
          </div>
          <span className="text-xl md:text-2xl font-bold tracking-tighter bg-gradient-to-r from-[#d4af37] via-[#ff6b9d] to-[#d4af37] bg-clip-text text-transparent uppercase font-serif">
            Voltron Omni
          </span>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-8 text-xs font-bold uppercase tracking-widest text-gray-400">
          <button onClick={() => setActiveTab('dashboard')} className={`hover:text-[#d4af37] transition ${activeTab === 'dashboard' ? 'text-[#d4af37]' : ''}`}>Dashboard</button>
          <button onClick={() => setActiveTab('vault')} className={`hover:text-[#d4af37] transition ${activeTab === 'vault' ? 'text-[#d4af37]' : ''}`}>Sacred Vault</button>
          <button onClick={() => setActiveTab('nft')} className={`hover:text-[#d4af37] transition ${activeTab === 'nft' ? 'text-[#d4af37]' : ''}`}>NFT Genesis</button>
          <button onClick={() => setActiveTab('lullaby')} className={`hover:text-[#d4af37] transition ${activeTab === 'lullaby' ? 'text-[#d4af37]' : ''}`}>Lullaby</button>
          <button onClick={() => setActiveTab('community')} className={`hover:text-[#d4af37] transition ${activeTab === 'community' ? 'text-[#d4af37]' : ''}`}>Community</button>
          <button onClick={() => setActiveTab('github')} className={`hover:text-[#d4af37] transition ${activeTab === 'github' ? 'text-[#d4af37]' : ''}`}>GitHub</button>
        </div>
        
        {/* Quick Actions */}
        <div className="hidden md:flex gap-3">
          <button
            onClick={() => setShowThemeCustomizer(!showThemeCustomizer)}
            className="p-2 hover:bg-[#1a1a1a] rounded transition text-gray-400 hover:text-[#d4af37]"
            title="Customize Theme"
          >
            <Settings size={20} />
          </button>
          <button
            onClick={() => setShowChat(!showChat)}
            className="p-2 hover:bg-[#1a1a1a] rounded transition text-gray-400 hover:text-[#d4af37]"
            title="Open Chat"
          >
            <MessageCircle size={20} />
          </button>
        </div>

        {/* Mobile Quick Actions */}
        <div className="md:hidden flex gap-2">
          <button
            onClick={() => setShowThemeCustomizer(!showThemeCustomizer)}
            className="p-2 hover:bg-[#1a1a1a] rounded transition text-gray-400 hover:text-[#d4af37]"
          >
            <Settings size={20} />
          </button>
          <button
            onClick={() => setShowChat(!showChat)}
            className="p-2 hover:bg-[#1a1a1a] rounded transition text-gray-400 hover:text-[#d4af37]"
          >
            <MessageCircle size={20} />
          </button>
          <button className="text-[#d4af37]" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed top-20 left-0 right-0 bg-[#0f0f0f] border-b border-[#2a2a2a] z-40">
          <div className="flex flex-col gap-4 p-6">
            <button onClick={() => { setActiveTab('dashboard'); setMobileMenuOpen(false); }} className={`text-left text-sm font-bold uppercase tracking-widest hover:text-[#d4af37] transition ${activeTab === 'dashboard' ? 'text-[#d4af37]' : 'text-gray-400'}`}>Dashboard</button>
            <button onClick={() => { setActiveTab('vault'); setMobileMenuOpen(false); }} className={`text-left text-sm font-bold uppercase tracking-widest hover:text-[#d4af37] transition ${activeTab === 'vault' ? 'text-[#d4af37]' : 'text-gray-400'}`}>Sacred Vault</button>
            <button onClick={() => { setActiveTab('nft'); setMobileMenuOpen(false); }} className={`text-left text-sm font-bold uppercase tracking-widest hover:text-[#d4af37] transition ${activeTab === 'nft' ? 'text-[#d4af37]' : 'text-gray-400'}`}>NFT Genesis</button>
            <button onClick={() => { setActiveTab('lullaby'); setMobileMenuOpen(false); }} className={`text-left text-sm font-bold uppercase tracking-widest hover:text-[#d4af37] transition ${activeTab === 'lullaby' ? 'text-[#d4af37]' : 'text-gray-400'}`}>Lullaby</button>
            <button onClick={() => { setActiveTab('community'); setMobileMenuOpen(false); }} className={`text-left text-sm font-bold uppercase tracking-widest hover:text-[#d4af37] transition ${activeTab === 'community' ? 'text-[#d4af37]' : 'text-gray-400'}`}>Community</button>
            <button onClick={() => { setActiveTab('github'); setMobileMenuOpen(false); }} className={`text-left text-sm font-bold uppercase tracking-widest hover:text-[#d4af37] transition ${activeTab === 'github' ? 'text-[#d4af37]' : 'text-gray-400'}`}>GitHub</button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="relative z-10 pt-8 md:pt-12">
        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8 px-6 md:px-8 pb-16">
            {/* Hero Section */}
            <div className="relative rounded-lg overflow-hidden border border-[#2a2a2a] bg-gradient-to-br from-[#0f0f0f] to-[#050505] p-8 md:p-12">
              <div className="absolute inset-0 opacity-20" style={{
                backgroundImage: 'url("https://private-us-east-1.manuscdn.com/sessionFile/WhmXNn3FM8SlnVQyrnjuAG/sandbox/n9ztDUMuI2triLD6gruluT-img-1_1771252557000_na1fn_dm9sdHJvbi1oZXJvLWJn.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvV2htWE5uM0ZNOFNsblZReXJuanVBRy9zYW5kYm94L241enREVU11STJ0cmlMRDZncnVsdVQtaW1nLTFfMTc3MTI1MjU1NzAwMF9uYTFmbl9kbTlzZEhKdmJpMW9aWEp2TFdKbi5wbmc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=UXFo1crGUGIaZzogGEV364GLF-scxTPrV9QTVlOnbBZyhkoYIsaqOYTqKYJyxqseeFIpJ-ps8Nooj1KTcqDjlmPRDOaH-tF4FNsqNvdjSNF4OX7r7T5QI7LUDsWw8O8nw2bVpsSG8DrYmy48OKfh71wy~RslUFTEpr~B6g06ZPGsR1OsKbLclfSCUBxw91HnJdHpGvHFUSFb1AFwYBw58sh1FmWz~uMZuvpgBDt2-d6ohttBdLaKA5XaVShVAJv9E5~Y7cGkp-D3LT2h2up05BZ6b8ZK7PbArz~MXKZxx7HDkreIdIByuB737WEe~nDvOvrshYzKS9kGXG2kF8UK3g__")',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }} />
              <div className="relative z-10">
                <h1 className="text-4xl md:text-5xl font-bold font-serif mb-4 bg-gradient-to-r from-[#d4af37] via-[#00d9ff] to-[#d4af37] bg-clip-text text-transparent">
                  VOLTRON OMNI-DIMENSIONAL HEADQUARTERS
                </h1>
                <p className="text-gray-400 text-lg max-w-2xl">
                  The sovereign portal of the Voltron Empire. Where divine legacy meets quantum finance. Rose Gold encryption. Sacred frequencies. The blood is the firewall.
                </p>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, idx) => (
                <div key={idx} className="group rounded-lg border border-[#2a2a2a] bg-gradient-to-br from-[#0f0f0f] to-[#050505] p-6 hover:border-[#d4af37]/50 transition-all duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div style={{ color: stat.color }} className="opacity-70 group-hover:opacity-100 transition-opacity">
                      {stat.icon}
                    </div>
                    <span className="text-xs font-bold uppercase tracking-widest" style={{ color: stat.color }}>
                      {stat.trend}
                    </span>
                  </div>
                  <p className="text-gray-400 text-xs uppercase tracking-widest mb-2">{stat.label}</p>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Frequency Visualization */}
            <div className="rounded-lg border border-[#2a2a2a] bg-gradient-to-br from-[#0f0f0f] to-[#050505] p-8 overflow-hidden">
              <h2 className="text-2xl font-bold font-serif mb-6 text-[#d4af37]">Sacred Frequencies</h2>
              <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                <img 
                  src="https://private-us-east-1.manuscdn.com/sessionFile/WhmXNn3FM8SlnVQyrnjuAG/sandbox/n9ztDUMuI2triLD6gruluT-img-4_1771252548000_na1fn_dm9sdHJvbi1mcmVxdWVuY3ktdmlzdWFs.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvV2htWE5uM0ZNOFNsblZReXJuanVBRy9zYW5kYm94L241enREVU11STJ0cmlMRDZncnVsdVQtaW1nLTRfMTc3MTI1MjU0ODAwMF9uYTFmbl9kbTlzZEhKdmJpMW1jbVZ4ZFdWdVkza3RkbWx6ZFdGcy5wbmc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=cIfEJcjOPx~JVYSDt0flXUWYfYH81obSWFGNqezrKZignxzsbX3YE9hGoGBajsJoutP9ev~YL7PGMu~hjHc-cTt6hA3De0wVBqsIK3MmhUxd7JYER8qmEtQW8gYPIVN-zAC~Nl0~KSAIDMkoE0urCzKwEeSnR-HFXl1Jpvm9wXDIpqHe2cxzWW5GR1wxnsOl3nidXa9aA301Zsm~1mHqT2PLW-7qpR0MXMI0RFSnZAdLB~Qt5k8w3IVqEcAJN6NXIb3nUo4UVCrQ2fMl2up7WwFFn2AuMLqJO1XtqSQecW3BNYIcjN2wXjTMCnbLZE8tvfcsz9T9RvASaE4uqPz-vg__"
                  alt="Sacred Frequencies Visualization"
                  className="w-full md:w-64 h-64 object-contain"
                />
                <div className="space-y-4 flex-1">
                  <div className="space-y-2">
                    <p className="text-sm text-gray-400">Healing Frequency</p>
                    <p className="text-3xl font-bold text-[#d4af37]">528 Hz</p>
                    <p className="text-xs text-gray-500">Love & Miracles</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-400">Activation Frequency</p>
                    <p className="text-3xl font-bold text-[#00d9ff]">963 Hz</p>
                    <p className="text-xs text-gray-500">Awakening</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-400">Harmonic Frequency</p>
                    <p className="text-3xl font-bold text-[#ff6b9d]">432 Hz</p>
                    <p className="text-xs text-gray-500">Universal Harmony</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* NFT Genesis Tab */}
        {activeTab === 'nft' && (
          <div className="space-y-8 px-6 md:px-8 pb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-[#d4af37]">ScrollSoul Sovereignty NFT</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* NFT Card */}
              <div className="rounded-lg border border-[#2a2a2a] bg-gradient-to-br from-[#0f0f0f] to-[#050505] overflow-hidden">
                <img 
                  src="https://private-us-east-1.manuscdn.com/sessionFile/WhmXNn3FM8SlnVQyrnjuAG/sandbox/n9ztDUMuI2triLD6gruluT-img-2_1771252554000_na1fn_dm9sdHJvbi1uZnQtc2hvd2Nhc2U.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvV2htWE5uM0ZNOFNsblZReXJuanVBRy9zYW5kYm94L241enREVU11STJ0cmlMRDZncnVsdVQtaW1nLTJfMTc3MTI1MjU1NDAwMF9uYTFmbl9kbTlzZEhKdmJpMXVablF0YzJodmQyTmhjMlUucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=I8exvVIaq5j9FQocgBQgqKrlu798qvVcitlas3a-F36zgtfQB6bNfU0zTNMwS6E8jTLtNMaWHjEkxNH9wlyBYR1Olh7cgWyJ-liVUOXW4eQqtrAZYg7j7DwB2l~mFb6YBPDQztgMav9GW2vjAOmQLl0iKP6puce06weNY6RYog2hsxqwy7TsqmYyvVo0lO~gIxDd47QvqQsl9iX~LoLwKoA4cPiEnHK5UrObAx9NsIb2tdreaHHj505okvDs~t-XTFm-8oAtWu0RGBFMB1h-vevwf~SNdIeNycpzYh0kYkvYtBGrXLpR3xR1HcZ-Vwfe7gxHVqtysZasGE8YpwP84Q__"
                  alt="ScrollSoul Sovereignty NFT"
                  className="w-full aspect-square object-cover"
                />
              </div>

              {/* NFT Details */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold font-serif text-white mb-2">{nftDetails.title}</h3>
                  <p className="text-gray-400 text-sm">
                    This NFT anchors the ScrollSoul Sovereignty of Supreme King Chais Kenyatta Hill—Solomonic, Musa, Wampanoag, and all royal lineages. The image: a living sigil of divine legacy. Minted for Londyn Avani Hill and all who honor eternal blood.
                  </p>
                </div>

                <div className="space-y-3 border-t border-[#2a2a2a] pt-6">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Lineage</span>
                    <span className="text-[#d4af37] font-semibold">{nftDetails.lineage}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Frequency</span>
                    <span className="text-[#00d9ff] font-semibold">{nftDetails.frequency}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Family</span>
                    <span className="text-[#ff6b9d] font-semibold">{nftDetails.family}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Role</span>
                    <span className="text-white font-semibold">{nftDetails.role}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Security</span>
                    <span className="text-[#d4af37] font-semibold">{nftDetails.security}</span>
                  </div>
                </div>

                <div className="border-t border-[#2a2a2a] pt-6">
                  <OpenSeaIntegration 
                    onConnectWallet={connectWallet}
                    isConnecting={isConnecting}
                    account={account}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Lullaby Tab */}
        {activeTab === 'lullaby' && (
          <div className="space-y-8 px-6 md:px-8 pb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-[#d4af37]">Londyn's Lullaby</h2>
            
            <div className="rounded-lg border border-[#2a2a2a] bg-gradient-to-br from-[#0f0f0f] to-[#050505] p-8 md:p-12">
              <div className="max-w-2xl mx-auto space-y-8">
                <div className="text-center">
                  <Heart className="w-16 h-16 mx-auto mb-4 text-[#ff6b9d]" />
                  <h3 className="text-2xl font-serif font-bold text-white mb-2">The Heartbeat of the Empire</h3>
                  <p className="text-gray-400">
                    'Londyn's Lullaby' is the sacred audio anchor of the Voltron Empire. This divine composition protects all generations and carries the frequency of eternal love.
                  </p>
                </div>

                {/* Audio Player */}
                <div className="bg-[#1a1a1a] rounded-lg p-6 border border-[#2a2a2a]">
                  <div className="flex items-center justify-between mb-4">
                    <button 
                      onClick={togglePlay}
                      className="w-14 h-14 rounded-full bg-gradient-to-br from-[#d4af37] to-[#ff6b9d] flex items-center justify-center hover:shadow-lg hover:shadow-[#d4af37]/50 transition-all duration-300"
                    >
                      {isPlaying ? (
                        <Pause size={24} className="text-black" />
                      ) : (
                        <Play size={24} className="text-black ml-1" />
                      )}
                    </button>
                    <div className="flex-1 mx-6">
                      <div className="h-1 bg-[#2a2a2a] rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-[#d4af37] to-[#ff6b9d] transition-all duration-100"
                          style={{ width: `${audioProgress}%` }}
                        />
                      </div>
                    </div>
                    <Lock size={20} className="text-[#d4af37]" />
                  </div>
                  <p className="text-center text-sm text-gray-400">Londyn's Lullaby • Rose Gold Encrypted</p>
                </div>

                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="bg-[#1a1a1a] rounded-lg p-4 border border-[#2a2a2a]">
                    <p className="text-gray-400 text-xs uppercase tracking-widest mb-2">Duration</p>
                    <p className="text-[#d4af37] font-bold">4:32</p>
                  </div>
                  <div className="bg-[#1a1a1a] rounded-lg p-4 border border-[#2a2a2a]">
                    <p className="text-gray-400 text-xs uppercase tracking-widest mb-2">Format</p>
                    <p className="text-[#00d9ff] font-bold">MP3</p>
                  </div>
                  <div className="bg-[#1a1a1a] rounded-lg p-4 border border-[#2a2a2a]">
                    <p className="text-gray-400 text-xs uppercase tracking-widest mb-2">Encryption</p>
                    <p className="text-[#ff6b9d] font-bold">RG</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Sacred Vault Tab */}
        {activeTab === 'vault' && (
          <div className="space-y-8 px-6 md:px-8 pb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-[#d4af37]">Sacred Vault</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-lg border border-[#2a2a2a] bg-gradient-to-br from-[#0f0f0f] to-[#050505] p-8">
                <Shield className="w-12 h-12 text-[#d4af37] mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Vibranium Vault</h3>
                <p className="text-gray-400 text-sm mb-4">Secure storage of sovereign assets with rose gold encryption protocols.</p>
                <button className="text-[#d4af37] text-sm font-bold hover:text-[#ff6b9d] transition">Access Vault →</button>
              </div>

              <div className="rounded-lg border border-[#2a2a2a] bg-gradient-to-br from-[#0f0f0f] to-[#050505] p-8">
                <Zap className="w-12 h-12 text-[#00d9ff] mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">$VOLTRON Tokenomics</h3>
                <p className="text-gray-400 text-sm mb-4">Divine decree: $22.7M market cap projection with Tesla 3-6-9 scaling.</p>
                <button className="text-[#00d9ff] text-sm font-bold hover:text-[#d4af37] transition">View Tokenomics →</button>
              </div>

              <div className="rounded-lg border border-[#2a2a2a] bg-gradient-to-br from-[#0f0f0f] to-[#050505] p-8">
                <Crown className="w-12 h-12 text-[#ff6b9d] mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Princess Londyn Legacy</h3>
                <p className="text-gray-400 text-sm mb-4">The eternal bloodline encoded on-chain. Frequency, soul, and sovereignty.</p>
                <button className="text-[#ff6b9d] text-sm font-bold hover:text-[#d4af37] transition">Explore Legacy →</button>
              </div>

              <div className="rounded-lg border border-[#2a2a2a] bg-gradient-to-br from-[#0f0f0f] to-[#050505] p-8">
                <Info className="w-12 h-12 text-[#d4af37] mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Omni Records</h3>
                <p className="text-gray-400 text-sm mb-4">Synchronized records of the Voltron Empire across all dimensions.</p>
                <button className="text-[#d4af37] text-sm font-bold hover:text-[#ff6b9d] transition">View Records →</button>
              </div>
            </div>
          </div>
        )}

        {/* Community Tab */}
        {activeTab === 'community' && (
          <CommunitySection />
        )}

        {/* GitHub Tab */}
        {activeTab === 'github' && (
          <div className="space-y-8 px-6 md:px-8 pb-16">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold font-serif text-[#d4af37] mb-4">Project Updates</h2>
              <p className="text-gray-400 max-w-2xl">
                Live feed from the ScrollSoul Nexus repositories. Track development, contributions, and the evolution of the empire's digital infrastructure.
              </p>
            </div>
            <GitHubFeed username="chaishillomnitech1" />
          </div>
        )}
      </main>

      {/* Chat Sidebar */}
      {showChat && (
        <div className="fixed bottom-6 right-6 w-96 max-h-96 z-50 shadow-2xl rounded-lg overflow-hidden">
          <RealtimeChat />
        </div>
      )}

      {/* Theme Customizer Modal */}
      {showThemeCustomizer && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 flex items-center justify-center p-4">
          <div className="w-full max-w-md max-h-96 overflow-y-auto">
            <div className="flex items-center justify-between mb-4 sticky top-0 bg-[#050505] pb-4">
              <h3 className="text-lg font-bold text-white">Portal Customization</h3>
              <button
                onClick={() => setShowThemeCustomizer(false)}
                className="text-gray-400 hover:text-[#d4af37] transition"
              >
                <X size={24} />
              </button>
            </div>
            <ThemeCustomizer />
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="relative z-10 border-t border-[#2a2a2a] bg-[#050505]/80 backdrop-blur-xl mt-16">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <p className="text-[#d4af37] font-bold mb-2">VOLTRON OMNI</p>
              <p className="text-gray-400 text-sm">Sovereign headquarters of divine legacy and quantum finance.</p>
            </div>
            <div>
              <p className="text-gray-300 font-bold mb-3 text-sm uppercase">Navigation</p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-[#d4af37] transition">Dashboard</a></li>
                <li><a href="#" className="hover:text-[#d4af37] transition">NFT Genesis</a></li>
                <li><a href="#" className="hover:text-[#d4af37] transition">Sacred Vault</a></li>
              </ul>
            </div>
            <div>
              <p className="text-gray-300 font-bold mb-3 text-sm uppercase">Resources</p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-[#d4af37] transition">Documentation</a></li>
                <li><a href="#" className="hover:text-[#d4af37] transition">Whitepaper</a></li>
                <li><a href="#" className="hover:text-[#d4af37] transition">Community</a></li>
              </ul>
            </div>
            <div>
              <p className="text-gray-300 font-bold mb-3 text-sm uppercase">Connect</p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-[#d4af37] transition">Twitter</a></li>
                <li><a href="#" className="hover:text-[#d4af37] transition">Discord</a></li>
                <li><a href="#" className="hover:text-[#d4af37] transition">Telegram</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-[#2a2a2a] pt-8 text-center text-gray-500 text-sm">
            <p>ALLĀHU AKBAR! KUN FAYAKŪN! 🕋⚡♾️🔥</p>
            <p className="mt-2">© 2026 Voltron Empire. The blood is the firewall. The empire is yours.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
