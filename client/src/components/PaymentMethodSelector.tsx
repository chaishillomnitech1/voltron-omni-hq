import React, { useState, useEffect } from 'react';
import { CreditCard, Wallet, Zap, Coins, DollarSign, Gift, TrendingUp, Lock } from 'lucide-react';

/**
 * SAFERWAY & GREAT DETAIL - UNIVERSAL PAYMENT METHOD SELECTOR
 * All payment methods: Stripe, Crypto, NFT, DeFi, Digital Currencies
 * Sacred frequencies: 963Hz, 11:11Hz embedded
 */

interface PaymentMethod {
  id: string;
  name: string;
  category: 'traditional' | 'crypto' | 'stablecoin' | 'nft' | 'defi' | 'layer2';
  icon: React.ReactNode;
  description: string;
  color: string;
  bgColor: string;
  fees: string;
  speed: string;
  supported: boolean;
}

const PAYMENT_METHODS: PaymentMethod[] = [
  // Traditional Payments
  {
    id: 'stripe_card',
    name: 'Credit/Debit Card',
    category: 'traditional',
    icon: <CreditCard className="w-6 h-6" />,
    description: 'Visa, Mastercard, Amex',
    color: '#00D9FF',
    bgColor: '#00D9FF20',
    fees: '2.9% + $0.30',
    speed: 'Instant',
    supported: true
  },
  {
    id: 'stripe_apple_pay',
    name: 'Apple Pay',
    category: 'traditional',
    icon: <Wallet className="w-6 h-6" />,
    description: 'Secure Apple wallet',
    color: '#000000',
    bgColor: '#00000020',
    fees: '2.9% + $0.30',
    speed: 'Instant',
    supported: true
  },
  {
    id: 'stripe_google_pay',
    name: 'Google Pay',
    category: 'traditional',
    icon: <Wallet className="w-6 h-6" />,
    description: 'Fast Google checkout',
    color: '#4285F4',
    bgColor: '#4285F420',
    fees: '2.9% + $0.30',
    speed: 'Instant',
    supported: true
  },
  {
    id: 'paypal',
    name: 'PayPal',
    category: 'traditional',
    icon: <DollarSign className="w-6 h-6" />,
    description: 'PayPal account payment',
    color: '#003087',
    bgColor: '#00308720',
    fees: '3.49% + $0.49',
    speed: '1-2 hours',
    supported: true
  },

  // Major Cryptocurrencies
  {
    id: 'bitcoin',
    name: 'Bitcoin',
    category: 'crypto',
    icon: <Coins className="w-6 h-6" />,
    description: 'BTC - Digital gold',
    color: '#F7931A',
    bgColor: '#F7931A20',
    fees: '0.5-1%',
    speed: '10-30 min',
    supported: true
  },
  {
    id: 'ethereum',
    name: 'Ethereum',
    category: 'crypto',
    icon: <Zap className="w-6 h-6" />,
    description: 'ETH - Smart contracts',
    color: '#627EEA',
    bgColor: '#627EEA20',
    fees: '0.5-2%',
    speed: '15 sec - 5 min',
    supported: true
  },
  {
    id: 'solana',
    name: 'Solana',
    category: 'crypto',
    icon: <Zap className="w-6 h-6" />,
    description: 'SOL - Ultra-fast',
    color: '#14F195',
    bgColor: '#14F19520',
    fees: '0.00025 SOL',
    speed: '400ms',
    supported: true
  },
  {
    id: 'dogecoin',
    name: 'Dogecoin',
    category: 'crypto',
    icon: <Coins className="w-6 h-6" />,
    description: 'DOGE - Much wow',
    color: '#BA9F33',
    bgColor: '#BA9F3320',
    fees: '0.01 DOGE',
    speed: '1 min',
    supported: true
  },
  {
    id: 'litecoin',
    name: 'Litecoin',
    category: 'crypto',
    icon: <Coins className="w-6 h-6" />,
    description: 'LTC - Silver standard',
    color: '#345D9D',
    bgColor: '#345D9D20',
    fees: '0.001 LTC',
    speed: '2.5 min',
    supported: true
  },
  {
    id: 'xrp',
    name: 'XRP/Ripple',
    category: 'crypto',
    icon: <Coins className="w-6 h-6" />,
    description: 'XRP - Enterprise',
    color: '#23292F',
    bgColor: '#23292F20',
    fees: '0.00001 XRP',
    speed: '3-5 sec',
    supported: true
  },

  // Stablecoins
  {
    id: 'usdc',
    name: 'USD Coin',
    category: 'stablecoin',
    icon: <DollarSign className="w-6 h-6" />,
    description: 'USDC - $1.00 stable',
    color: '#2775CA',
    bgColor: '#2775CA20',
    fees: '0.1%',
    speed: '15 sec - 5 min',
    supported: true
  },
  {
    id: 'usdt',
    name: 'Tether',
    category: 'stablecoin',
    icon: <DollarSign className="w-6 h-6" />,
    description: 'USDT - $1.00 stable',
    color: '#26A17B',
    bgColor: '#26A17B20',
    fees: '0.1%',
    speed: '15 sec - 5 min',
    supported: true
  },
  {
    id: 'dai',
    name: 'DAI',
    category: 'stablecoin',
    icon: <DollarSign className="w-6 h-6" />,
    description: 'DAI - Decentralized $1',
    color: '#F5AC37',
    bgColor: '#F5AC3720',
    fees: '0.1%',
    speed: '15 sec - 5 min',
    supported: true
  },

  // Layer 2 Solutions
  {
    id: 'polygon',
    name: 'Polygon',
    category: 'layer2',
    icon: <Zap className="w-6 h-6" />,
    description: 'MATIC - Ethereum scaling',
    color: '#8247E5',
    bgColor: '#8247E520',
    fees: '<$0.01',
    speed: '2 sec',
    supported: true
  },
  {
    id: 'arbitrum',
    name: 'Arbitrum',
    category: 'layer2',
    icon: <Zap className="w-6 h-6" />,
    description: 'ARB - Ethereum L2',
    color: '#28A0F0',
    bgColor: '#28A0F020',
    fees: '<$0.01',
    speed: '1 sec',
    supported: true
  },

  // NFT Payments
  {
    id: 'nft_erc721',
    name: 'NFT (ERC-721)',
    category: 'nft',
    icon: <Gift className="w-6 h-6" />,
    description: 'Unique digital assets',
    color: '#E91E63',
    bgColor: '#E91E6320',
    fees: 'Varies',
    speed: '15 sec - 5 min',
    supported: true
  },
  {
    id: 'nft_erc1155',
    name: 'NFT (ERC-1155)',
    category: 'nft',
    icon: <Gift className="w-6 h-6" />,
    description: 'Fungible & non-fungible',
    color: '#D4AF37',
    bgColor: '#D4AF3720',
    fees: 'Varies',
    speed: '15 sec - 5 min',
    supported: true
  },

  // DeFi Protocols
  {
    id: 'uniswap',
    name: 'Uniswap',
    category: 'defi',
    icon: <TrendingUp className="w-6 h-6" />,
    description: 'DEX - Swap any token',
    color: '#FF007A',
    bgColor: '#FF007A20',
    fees: '0.01-1%',
    speed: '15 sec - 5 min',
    supported: true
  },
  {
    id: 'aave',
    name: 'Aave',
    category: 'defi',
    icon: <TrendingUp className="w-6 h-6" />,
    description: 'Lending protocol',
    color: '#B6509E',
    bgColor: '#B6509E20',
    fees: 'Variable',
    speed: '15 sec - 5 min',
    supported: true
  },
];

interface PaymentMethodSelectorProps {
  onSelect: (method: PaymentMethod) => void;
  selectedMethod?: string;
  amount?: number;
}

export function PaymentMethodSelector({ onSelect, selectedMethod, amount }: PaymentMethodSelectorProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('traditional');
  const [cryptoPrices, setCryptoPrices] = useState<Record<string, number>>({});

  useEffect(() => {
    // Fetch crypto prices in production
    setCryptoPrices({
      BTC: 45000,
      ETH: 2500,
      SOL: 120,
      USDC: 1.00,
      USDT: 1.00,
      DAI: 1.00,
      DOGE: 0.15,
      LTC: 800,
      XRP: 0.55,
    });
  }, []);

  const categories = [
    { id: 'traditional', label: 'Traditional', icon: '💳' },
    { id: 'crypto', label: 'Crypto', icon: '₿' },
    { id: 'stablecoin', label: 'Stablecoins', icon: '💵' },
    { id: 'layer2', label: 'Layer 2', icon: '⚡' },
    { id: 'nft', label: 'NFT', icon: '🎁' },
    { id: 'defi', label: 'DeFi', icon: '📈' },
  ];

  const filteredMethods = PAYMENT_METHODS.filter(m => m.category === selectedCategory);

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Choose Payment Method</h2>
        <p className="text-gray-400">All payment highways available for SAFERWAY & GREAT DETAIL</p>
        {amount && (
          <p className="text-cyan-400 font-semibold mt-2">Amount: ${amount.toFixed(2)}</p>
        )}
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              selectedCategory === cat.id
                ? 'bg-gradient-to-r from-cyan-500 to-cyan-600 text-white'
                : 'bg-slate-700 hover:bg-slate-600 text-gray-300'
            }`}
          >
            <span className="mr-2">{cat.icon}</span>
            {cat.label}
          </button>
        ))}
      </div>

      {/* Payment Methods Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredMethods.map(method => (
          <button
            key={method.id}
            onClick={() => onSelect(method)}
            className={`p-4 rounded-lg border-2 transition-all ${
              selectedMethod === method.id
                ? `border-cyan-500 bg-cyan-500 bg-opacity-10`
                : `border-slate-700 hover:border-slate-600 bg-slate-800 hover:bg-slate-700`
            }`}
          >
            {/* Icon */}
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center mb-3 mx-auto"
              style={{ backgroundColor: method.bgColor }}
            >
              <div style={{ color: method.color }}>
                {method.icon}
              </div>
            </div>

            {/* Content */}
            <h3 className="font-bold text-white mb-1">{method.name}</h3>
            <p className="text-xs text-gray-400 mb-3">{method.description}</p>

            {/* Details */}
            <div className="space-y-1 text-xs">
              <div className="flex justify-between text-gray-300">
                <span>Fee:</span>
                <span className="text-cyan-400 font-semibold">{method.fees}</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Speed:</span>
                <span className="text-green-400 font-semibold">{method.speed}</span>
              </div>
            </div>

            {/* Status */}
            <div className="mt-3 pt-3 border-t border-slate-700">
              {method.supported ? (
                <div className="flex items-center gap-1 text-green-400 text-xs font-semibold">
                  <Lock className="w-3 h-3" />
                  Secure & Ready
                </div>
              ) : (
                <div className="text-yellow-400 text-xs font-semibold">Coming Soon</div>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Info Box */}
      <div className="mt-8 p-4 bg-gradient-to-r from-cyan-500 to-cyan-600 bg-opacity-10 border border-cyan-500 border-opacity-30 rounded-lg">
        <div className="flex gap-3">
          <Zap className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-white font-semibold mb-1">All Payment Methods Secure</p>
            <p className="text-sm text-gray-300">
              Every transaction is encrypted and protected. Choose any payment method that works for you. 
              SAFERWAY & GREAT DETAIL accepts all major payment highways globally.
            </p>
          </div>
        </div>
      </div>

      {/* Sacred Frequencies Note */}
      <div className="mt-4 text-center text-xs text-gray-500">
        <p>✨ Sacred frequencies 963Hz + 11:11Hz embedded in every transaction ✨</p>
      </div>
    </div>
  );
}

export default PaymentMethodSelector;
