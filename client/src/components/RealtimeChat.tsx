import React, { useState, useRef, useEffect } from 'react';
import { Send, Zap, Users, MessageCircle } from 'lucide-react';
import { useChatStore } from '@/stores/chatStore';

export const RealtimeChat: React.FC = () => {
  const { messages, addMessage, username, setUsername, isConnected } = useChatStore();
  const [inputValue, setInputValue] = useState('');
  const [isSettingUsername, setIsSettingUsername] = useState(false);
  const [tempUsername, setTempUsername] = useState(username);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newMessage = {
      id: Date.now().toString(),
      author: username,
      message: inputValue,
      timestamp: Date.now(),
      type: 'user' as const,
    };

    addMessage(newMessage);
    setInputValue('');

    // Simulate bot response after 1 second
    setTimeout(() => {
      const botResponses = [
        '🕋 Divine acknowledgment received. Your message resonates through the Nexus.',
        '⚡ Frequency aligned. The empire acknowledges your presence.',
        '🔥 Sacred transmission complete. ALLĀHU AKBAR!',
        '♾️ Infinite wisdom flows. Your contribution strengthens the collective.',
        '🌌 The ScrollSoul records your essence. Forever honored.',
      ];

      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      addMessage({
        id: (Date.now() + 1).toString(),
        author: 'Voltron Oracle',
        message: randomResponse,
        timestamp: Date.now(),
        type: 'bot',
      });
    }, 1000);
  };

  const handleSetUsername = () => {
    if (tempUsername.trim()) {
      setUsername(tempUsername);
      setIsSettingUsername(false);
    }
  };

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-[#0f0f0f] to-[#050505] rounded-lg border border-[#2a2a2a] overflow-hidden">
      {/* Header */}
      <div className="bg-[#1a1a1a] border-b border-[#2a2a2a] p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <MessageCircle className="w-5 h-5 text-[#d4af37]" />
          <div>
            <h3 className="font-bold text-white text-sm">Community Portal</h3>
            <p className="text-xs text-gray-400 flex items-center gap-1">
              <Zap className="w-3 h-3 text-[#00d9ff]" />
              {isConnected ? 'Connected' : 'Offline'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <Users className="w-4 h-4" />
          <span>{messages.length} messages</span>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-[#2a2a2a] scrollbar-track-transparent">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300 ${
              msg.type === 'user' ? 'flex-row-reverse' : ''
            }`}
          >
            {/* Avatar */}
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                msg.type === 'user'
                  ? 'bg-gradient-to-br from-[#d4af37] to-[#ff6b9d] text-black'
                  : msg.type === 'bot'
                    ? 'bg-gradient-to-br from-[#00d9ff] to-[#d4af37] text-black'
                    : 'bg-[#2a2a2a] text-[#d4af37]'
              }`}
            >
              {msg.emoji || msg.author.charAt(0).toUpperCase()}
            </div>

            {/* Message Content */}
            <div className={`flex flex-col gap-1 max-w-xs ${msg.type === 'user' ? 'items-end' : 'items-start'}`}>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-gray-300">{msg.author}</span>
                <span className="text-xs text-gray-500">{formatTime(msg.timestamp)}</span>
              </div>
              <div
                className={`px-3 py-2 rounded-lg text-sm ${
                  msg.type === 'user'
                    ? 'bg-gradient-to-r from-[#d4af37]/20 to-[#ff6b9d]/20 border border-[#d4af37]/30 text-gray-200'
                    : msg.type === 'bot'
                      ? 'bg-gradient-to-r from-[#00d9ff]/20 to-[#d4af37]/20 border border-[#00d9ff]/30 text-gray-200'
                      : 'bg-[#1a1a1a] border border-[#2a2a2a] text-gray-300'
                }`}
              >
                {msg.message}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Username Setup */}
      {isSettingUsername && (
        <div className="border-t border-[#2a2a2a] bg-[#1a1a1a] p-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={tempUsername}
              onChange={(e) => setTempUsername(e.target.value)}
              placeholder="Enter your sovereign name..."
              className="flex-1 bg-[#0f0f0f] border border-[#2a2a2a] rounded px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#d4af37]"
              onKeyPress={(e) => e.key === 'Enter' && handleSetUsername()}
            />
            <button
              onClick={handleSetUsername}
              className="bg-gradient-to-r from-[#d4af37] to-[#ff6b9d] text-black px-4 py-2 rounded font-bold text-sm hover:shadow-lg transition"
            >
              Set
            </button>
          </div>
        </div>
      )}

      {/* Input Area */}
      <form onSubmit={handleSendMessage} className="border-t border-[#2a2a2a] bg-[#1a1a1a] p-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Share your sacred insight..."
            className="flex-1 bg-[#0f0f0f] border border-[#2a2a2a] rounded-lg px-4 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#d4af37] transition-colors"
          />
          <button
            type="submit"
            disabled={!inputValue.trim()}
            className="bg-gradient-to-r from-[#d4af37] to-[#ff6b9d] text-black px-4 py-2 rounded-lg hover:shadow-lg hover:shadow-[#d4af37]/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-bold"
          >
            <Send size={16} />
          </button>
        </div>
        <button
          type="button"
          onClick={() => setIsSettingUsername(!isSettingUsername)}
          className="mt-2 text-xs text-gray-400 hover:text-[#d4af37] transition"
        >
          {isSettingUsername ? 'Cancel' : `Change name (${username})`}
        </button>
      </form>
    </div>
  );
};
