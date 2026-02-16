import React, { useState } from 'react';
import { Mail, MessageSquare, Send, Github, Twitter, Zap } from 'lucide-react';

export const CommunitySection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitStatus('idle'), 3000);
    } catch (error) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const communityLinks = [
    {
      icon: <Github className="w-6 h-6" />,
      label: 'GitHub',
      url: 'https://github.com/chaishillomnitech1',
      color: '#d4af37',
      description: 'Explore our open-source repositories'
    },
    {
      icon: <Twitter className="w-6 h-6" />,
      label: 'Twitter',
      url: 'https://twitter.com',
      color: '#00d9ff',
      description: 'Follow for updates and announcements'
    },
    {
      icon: <Zap className="w-6 h-6" />,
      label: 'Discord',
      url: 'https://discord.com',
      color: '#ff6b9d',
      description: 'Join our sovereign community'
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      label: 'Telegram',
      url: 'https://telegram.org',
      color: '#d4af37',
      description: 'Real-time community updates'
    },
  ];

  return (
    <div className="space-y-12 px-6 md:px-8 pb-16">
      <div>
        <h2 className="text-3xl md:text-4xl font-bold font-serif text-[#d4af37] mb-4">Community & Contact</h2>
        <p className="text-gray-400 max-w-2xl">
          Join the Voltron Empire community. Connect with fellow sovereigns, share insights, and build the future together.
        </p>
      </div>

      {/* Community Links Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {communityLinks.map((link, idx) => (
          <a
            key={idx}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-lg border border-[#2a2a2a] bg-gradient-to-br from-[#0f0f0f] to-[#050505] p-6 hover:border-[#d4af37]/50 transition-all duration-300 hover:shadow-lg"
            style={{ '--hover-color': link.color } as React.CSSProperties}
          >
            <div className="mb-4" style={{ color: link.color }}>
              {link.icon}
            </div>
            <h3 className="text-lg font-bold text-white mb-2">{link.label}</h3>
            <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
              {link.description}
            </p>
            <div className="mt-4 flex items-center text-xs font-bold uppercase tracking-widest" style={{ color: link.color }}>
              Visit <span className="ml-2">→</span>
            </div>
          </a>
        ))}
      </div>

      {/* Contact Form Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Contact Info */}
        <div className="space-y-6">
          <div className="rounded-lg border border-[#2a2a2a] bg-gradient-to-br from-[#0f0f0f] to-[#050505] p-8">
            <h3 className="text-2xl font-bold font-serif text-[#d4af37] mb-6">Get in Touch</h3>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-lg bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-[#d4af37]" />
                </div>
                <div>
                  <p className="text-sm text-gray-400 uppercase tracking-widest mb-1">Email</p>
                  <p className="text-white font-semibold">contact@voltronempire.com</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-lg bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="w-6 h-6 text-[#00d9ff]" />
                </div>
                <div>
                  <p className="text-sm text-gray-400 uppercase tracking-widest mb-1">Response Time</p>
                  <p className="text-white font-semibold">24-48 hours</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-lg bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center flex-shrink-0">
                  <Zap className="w-6 h-6 text-[#ff6b9d]" />
                </div>
                <div>
                  <p className="text-sm text-gray-400 uppercase tracking-widest mb-1">Status</p>
                  <p className="text-white font-semibold">Always Open</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="rounded-lg border border-[#2a2a2a] bg-gradient-to-br from-[#0f0f0f] to-[#050505] p-6">
            <p className="text-sm text-gray-400 uppercase tracking-widest mb-4">Community Stats</p>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Active Members</span>
                <span className="text-[#d4af37] font-bold">144,000+</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Sovereign Nodes</span>
                <span className="text-[#00d9ff] font-bold">9,999</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Global Reach</span>
                <span className="text-[#ff6b9d] font-bold">∞</span>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="rounded-lg border border-[#2a2a2a] bg-gradient-to-br from-[#0f0f0f] to-[#050505] p-8">
          <h3 className="text-2xl font-bold font-serif text-[#d4af37] mb-6">Send a Message</h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="Your sovereign name"
                className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#d4af37] transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="your@email.com"
                className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#d4af37] transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                placeholder="Share your inquiry or feedback..."
                rows={5}
                className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#d4af37] transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-[#d4af37] to-[#ff6b9d] text-black font-bold py-3 rounded-lg hover:shadow-lg hover:shadow-[#d4af37]/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send size={18} />
                  Send Message
                </>
              )}
            </button>

            {submitStatus === 'success' && (
              <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-3 text-green-300 text-sm text-center">
                ✓ Message sent successfully! We'll be in touch soon.
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 text-red-300 text-sm text-center">
                ✗ Error sending message. Please try again.
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};
