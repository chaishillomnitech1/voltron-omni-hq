import React, { useState } from 'react';
import { Trash2, Star, BarChart3, Users, Lock, Shield, AlertCircle, CheckCircle } from 'lucide-react';
import { useChatStore } from '@/stores/chatStore';
import { useNotificationStore } from '@/stores/notificationStore';

interface AdminState {
  flaggedMessages: Set<string>;
  featuredProjects: Set<string>;
  bannedUsers: Set<string>;
}

export const AdminDashboard = () => {
  const { messages } = useChatStore();
  const { notifications } = useNotificationStore();
  const [adminState, setAdminState] = useState<AdminState>({
    flaggedMessages: new Set(),
    featuredProjects: new Set(),
    bannedUsers: new Set(),
  });
  const [activeTab, setActiveTab] = useState<'moderation' | 'content' | 'users' | 'analytics'>('moderation');

  const toggleFlagMessage = (msgId: string) => {
    setAdminState((prev) => {
      const flagged = new Set(prev.flaggedMessages);
      if (flagged.has(msgId)) {
        flagged.delete(msgId);
      } else {
        flagged.add(msgId);
      }
      return { ...prev, flaggedMessages: flagged };
    });
  };

  const toggleFeatureProject = (projectName: string) => {
    setAdminState((prev) => {
      const featured = new Set(prev.featuredProjects);
      if (featured.has(projectName)) {
        featured.delete(projectName);
      } else {
        featured.add(projectName);
      }
      return { ...prev, featuredProjects: featured };
    });
  };

  const toggleBanUser = (username: string) => {
    setAdminState((prev) => {
      const banned = new Set(prev.bannedUsers);
      if (banned.has(username)) {
        banned.delete(username);
      } else {
        banned.add(username);
      }
      return { ...prev, bannedUsers: banned };
    });
  };

  const flaggedMessages = messages.filter((m) => adminState.flaggedMessages.has(m.id));

  return (
    <div className="min-h-screen bg-[#050505] text-gray-200 pt-8 pb-16">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold font-serif text-[#d4af37] mb-2">Admin Dashboard</h1>
          <p className="text-gray-400">Manage moderation, content, users, and analytics</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-[#2a2a2a]">
          {(['moderation', 'content', 'users', 'analytics'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 font-semibold uppercase text-sm tracking-widest transition border-b-2 ${
                activeTab === tab
                  ? 'text-[#d4af37] border-[#d4af37]'
                  : 'text-gray-400 border-transparent hover:text-white'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Moderation Tab */}
        {activeTab === 'moderation' && (
          <div className="space-y-6">
            <div className="rounded-lg border border-[#2a2a2a] bg-gradient-to-br from-[#0f0f0f] to-[#050505] p-8">
              <div className="flex items-center gap-3 mb-6">
                <AlertCircle size={24} className="text-red-500" />
                <h2 className="text-2xl font-bold text-white">Message Moderation</h2>
              </div>

              <div className="space-y-3">
                {messages.length === 0 ? (
                  <p className="text-gray-400">No messages to moderate</p>
                ) : (
                  messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`p-4 rounded-lg border transition ${
                        adminState.flaggedMessages.has(msg.id)
                          ? 'border-red-500 bg-red-500/10'
                          : 'border-[#2a2a2a] bg-[#1a1a1a] hover:bg-[#2a2a2a]'
                      }`}
                    >
                      <div className="flex justify-between items-start gap-4">
                        <div className="flex-1">
                          <p className="text-white font-semibold">{msg.author}</p>
                          <p className="text-gray-400 text-sm mt-1">{msg.message}</p>
                          <p className="text-gray-500 text-xs mt-2">
                            {new Date(msg.timestamp).toLocaleString()}
                          </p>
                        </div>
                        <button
                          onClick={() => toggleFlagMessage(msg.id)}
                          className={`px-3 py-2 rounded text-sm font-semibold transition ${
                            adminState.flaggedMessages.has(msg.id)
                              ? 'bg-red-500 text-white hover:bg-red-600'
                              : 'bg-[#2a2a2a] text-gray-400 hover:bg-[#3a3a3a]'
                          }`}
                        >
                          {adminState.flaggedMessages.has(msg.id) ? 'Unflag' : 'Flag'}
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="mt-6 p-4 bg-[#1a1a1a] rounded-lg border border-[#2a2a2a]">
                <p className="text-sm text-gray-400">
                  <strong>Flagged Messages:</strong> {adminState.flaggedMessages.size} / {messages.length}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Content Tab */}
        {activeTab === 'content' && (
          <div className="space-y-6">
            <div className="rounded-lg border border-[#2a2a2a] bg-gradient-to-br from-[#0f0f0f] to-[#050505] p-8">
              <div className="flex items-center gap-3 mb-6">
                <Star size={24} className="text-[#d4af37]" />
                <h2 className="text-2xl font-bold text-white">Featured Projects</h2>
              </div>

              <div className="space-y-3">
                <p className="text-gray-400 text-sm mb-4">
                  Select projects to feature on the GitHub feed
                </p>
                {['Quantum-Financial-System-QFS', 'Akashic-ip-protection', 'ScrollSoul-Nexus'].map((project) => (
                  <div
                    key={project}
                    className={`p-4 rounded-lg border transition flex justify-between items-center ${
                      adminState.featuredProjects.has(project)
                        ? 'border-[#d4af37] bg-[#d4af37]/10'
                        : 'border-[#2a2a2a] bg-[#1a1a1a] hover:bg-[#2a2a2a]'
                    }`}
                  >
                    <div>
                      <p className="text-white font-semibold">{project}</p>
                      <p className="text-gray-400 text-xs mt-1">Repository on GitHub</p>
                    </div>
                    <button
                      onClick={() => toggleFeatureProject(project)}
                      className={`px-3 py-2 rounded text-sm font-semibold transition ${
                        adminState.featuredProjects.has(project)
                          ? 'bg-[#d4af37] text-black hover:bg-[#e5c158]'
                          : 'bg-[#2a2a2a] text-gray-400 hover:bg-[#3a3a3a]'
                      }`}
                    >
                      {adminState.featuredProjects.has(project) ? '★ Featured' : '☆ Feature'}
                    </button>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-[#1a1a1a] rounded-lg border border-[#2a2a2a]">
                <p className="text-sm text-gray-400">
                  <strong>Featured:</strong> {adminState.featuredProjects.size} projects
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="space-y-6">
            <div className="rounded-lg border border-[#2a2a2a] bg-gradient-to-br from-[#0f0f0f] to-[#050505] p-8">
              <div className="flex items-center gap-3 mb-6">
                <Users size={24} className="text-[#00d9ff]" />
                <h2 className="text-2xl font-bold text-white">User Management</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="p-4 rounded-lg bg-[#1a1a1a] border border-[#2a2a2a]">
                  <p className="text-gray-400 text-sm uppercase tracking-widest mb-2">Total Users</p>
                  <p className="text-3xl font-bold text-[#d4af37]">144</p>
                </div>
                <div className="p-4 rounded-lg bg-[#1a1a1a] border border-[#2a2a2a]">
                  <p className="text-gray-400 text-sm uppercase tracking-widest mb-2">Active Today</p>
                  <p className="text-3xl font-bold text-[#00d9ff]">42</p>
                </div>
                <div className="p-4 rounded-lg bg-[#1a1a1a] border border-[#2a2a2a]">
                  <p className="text-gray-400 text-sm uppercase tracking-widest mb-2">Banned Users</p>
                  <p className="text-3xl font-bold text-red-500">{adminState.bannedUsers.size}</p>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-gray-400 text-sm mb-4">Active users in chat</p>
                {['Sovereign', 'Londyn', 'Chais', 'Admin'].map((user) => (
                  <div
                    key={user}
                    className={`p-4 rounded-lg border transition flex justify-between items-center ${
                      adminState.bannedUsers.has(user)
                        ? 'border-red-500 bg-red-500/10'
                        : 'border-[#2a2a2a] bg-[#1a1a1a] hover:bg-[#2a2a2a]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#d4af37]/20 flex items-center justify-center">
                        <span className="text-[#d4af37] font-bold">{user[0]}</span>
                      </div>
                      <p className="text-white font-semibold">{user}</p>
                    </div>
                    <button
                      onClick={() => toggleBanUser(user)}
                      className={`px-3 py-2 rounded text-sm font-semibold transition ${
                        adminState.bannedUsers.has(user)
                          ? 'bg-red-500 text-white hover:bg-red-600'
                          : 'bg-[#2a2a2a] text-gray-400 hover:bg-[#3a3a3a]'
                      }`}
                    >
                      {adminState.bannedUsers.has(user) ? 'Unban' : 'Ban'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="rounded-lg border border-[#2a2a2a] bg-gradient-to-br from-[#0f0f0f] to-[#050505] p-8">
              <div className="flex items-center gap-3 mb-6">
                <BarChart3 size={24} className="text-[#ff6b9d]" />
                <h2 className="text-2xl font-bold text-white">Portal Analytics</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-lg bg-[#1a1a1a] border border-[#2a2a2a]">
                  <p className="text-gray-400 text-sm uppercase tracking-widest mb-4">Messages</p>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Total Messages</span>
                      <span className="text-2xl font-bold text-[#d4af37]">{messages.length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Flagged</span>
                      <span className="text-2xl font-bold text-red-500">{adminState.flaggedMessages.size}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Healthy</span>
                      <span className="text-2xl font-bold text-green-500">
                        {messages.length - adminState.flaggedMessages.size}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-lg bg-[#1a1a1a] border border-[#2a2a2a]">
                  <p className="text-gray-400 text-sm uppercase tracking-widest mb-4">Notifications</p>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Total</span>
                      <span className="text-2xl font-bold text-[#00d9ff]">{notifications.length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Unread</span>
                      <span className="text-2xl font-bold text-[#ff6b9d]">
                        {notifications.filter((n) => !n.read).length}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Read</span>
                      <span className="text-2xl font-bold text-gray-500">
                        {notifications.filter((n) => n.read).length}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-[#1a1a1a] rounded-lg border border-[#2a2a2a]">
                <p className="text-sm text-gray-400">
                  Portal Health: <span className="text-green-500 font-semibold">Excellent</span>
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  Last updated: {new Date().toLocaleTimeString()}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
