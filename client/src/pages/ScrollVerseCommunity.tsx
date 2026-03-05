import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/_core/hooks/useAuth';
import { MessageCircle, Users, TrendingUp, Send, Heart, MessageSquare, Eye, Pin } from 'lucide-react';

/**
 * ScrollVerse Community Forum & Chat
 * 
 * Features:
 * - Discussion threads organized by category
 * - Real-time chat for guardians and families
 * - Regional hub coordination
 * - Community engagement metrics
 * - Moderation tools
 * 
 * Where Love Becomes Law. Legacy Becomes Infinity. 44:Omni × ∞
 */

interface ForumThread {
  id: string;
  title: string;
  category: 'general' | 'regional' | 'training' | 'technical';
  author: string;
  authorRole: 'guardian' | 'family' | 'admin';
  createdAt: Date;
  updatedAt: Date;
  replies: number;
  views: number;
  likes: number;
  isPinned: boolean;
  preview: string;
}

interface ChatMessage {
  id: string;
  author: string;
  authorRole: 'guardian' | 'family' | 'admin';
  content: string;
  timestamp: Date;
  likes: number;
  channel: string;
}

interface CommunityStats {
  totalMembers: number;
  activeToday: number;
  threadsCreated: number;
  messagesExchanged: number;
  regionalHubs: number;
}

export default function ScrollVerseCommunity() {
  const { user, isAuthenticated } = useAuth();
  const [selectedTab, setSelectedTab] = useState('forum');
  const [selectedChannel, setSelectedChannel] = useState('general');
  const [messageInput, setMessageInput] = useState('');
  const [newThreadTitle, setNewThreadTitle] = useState('');
  const [newThreadCategory, setNewThreadCategory] = useState<'general' | 'regional' | 'training' | 'technical'>('general');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Mock forum threads
  const [forumThreads] = useState<ForumThread[]>([
    {
      id: 'thread-1',
      title: 'Best Practices for Family Asset Protection',
      category: 'training',
      author: 'Guardian Sarah',
      authorRole: 'guardian',
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
      replies: 12,
      views: 245,
      likes: 34,
      isPinned: true,
      preview: 'Share your strategies for protecting family assets and legacy planning...',
    },
    {
      id: 'thread-2',
      title: 'Regional Hub Coordination - North America',
      category: 'regional',
      author: 'Hub Coordinator James',
      authorRole: 'admin',
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(Date.now() - 30 * 60 * 1000),
      replies: 8,
      views: 156,
      likes: 22,
      isPinned: true,
      preview: 'Discussing regional hub activities, training schedules, and family activations...',
    },
    {
      id: 'thread-3',
      title: 'Smart Contract Verification Questions',
      category: 'technical',
      author: 'Guardian Marcus',
      authorRole: 'guardian',
      createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
      updatedAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
      replies: 5,
      views: 89,
      likes: 14,
      isPinned: false,
      preview: 'How do I verify the smart contract deployment on Etherscan?...',
    },
    {
      id: 'thread-4',
      title: 'Welcome to ScrollVerse Community!',
      category: 'general',
      author: 'ScrollVerse Team',
      authorRole: 'admin',
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      replies: 34,
      views: 512,
      likes: 89,
      isPinned: true,
      preview: 'Welcome to the ScrollVerse community! This is your space to connect, learn, and grow...',
    },
  ]);

  // Mock chat messages
  const [chatMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      author: 'Guardian Sarah',
      authorRole: 'guardian',
      content: 'Just completed the Emergency Protocols module! Feeling more prepared.',
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      likes: 3,
      channel: 'general',
    },
    {
      id: 'msg-2',
      author: 'Family Member David',
      authorRole: 'family',
      content: 'Thank you all for the support. My family protection is now active!',
      timestamp: new Date(Date.now() - 10 * 60 * 1000),
      likes: 8,
      channel: 'general',
    },
    {
      id: 'msg-3',
      author: 'Hub Coordinator James',
      authorRole: 'admin',
      content: 'Next regional training session is scheduled for March 15th. Sign up in the training channel!',
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      likes: 12,
      channel: 'general',
    },
  ]);

  // Mock community stats
  const [stats] = useState<CommunityStats>({
    totalMembers: 14672,
    activeToday: 2341,
    threadsCreated: 287,
    messagesExchanged: 8934,
    regionalHubs: 12,
  });

  // Mock channels
  const channels = [
    { id: 'general', name: 'General', icon: '💬', members: 14672 },
    { id: 'guardians', name: 'Guardians', icon: '🛡️', members: 3421 },
    { id: 'families', name: 'Families', icon: '👨‍👩‍👧‍👦', members: 11251 },
    { id: 'training', name: 'Training', icon: '📚', members: 5234 },
    { id: 'regional', name: 'Regional Hubs', icon: '🌍', members: 8765 },
    { id: 'announcements', name: 'Announcements', icon: '📢', members: 14672 },
  ];

  // Mock categories
  const categories = [
    { id: 'general', name: 'General Discussion', color: 'bg-blue-500/20 text-blue-600' },
    { id: 'regional', name: 'Regional Hub', color: 'bg-green-500/20 text-green-600' },
    { id: 'training', name: 'Training', color: 'bg-amber-500/20 text-amber-600' },
    { id: 'technical', name: 'Technical', color: 'bg-purple-500/20 text-purple-600' },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Community Access Required</CardTitle>
            <CardDescription>Please log in to join the ScrollVerse community</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              You must be authenticated to access the community forum and chat.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-foreground">🕋 ScrollVerse Community</h1>
          <p className="text-lg text-muted-foreground">
            Connect, collaborate, and grow together. Where Love Becomes Law. Legacy Becomes Infinity.
          </p>
        </div>

        {/* Community Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Members</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{stats.totalMembers.toLocaleString()}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Today</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.activeToday.toLocaleString()}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Threads</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats.threadsCreated}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Messages</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-600">{stats.messagesExchanged.toLocaleString()}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Regional Hubs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">{stats.regionalHubs}</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="forum" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Forum
            </TabsTrigger>
            <TabsTrigger value="chat" className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              Chat
            </TabsTrigger>
          </TabsList>

          {/* Forum Tab */}
          <TabsContent value="forum" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Discussion Forum</CardTitle>
                    <CardDescription>
                      Share ideas, ask questions, and collaborate with the community
                    </CardDescription>
                  </div>
                  <Button className="bg-primary text-primary-foreground">New Thread</Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Category Filter */}
                <div className="flex gap-2 flex-wrap">
                  {categories.map((cat) => (
                    <Button
                      key={cat.id}
                      variant="outline"
                      size="sm"
                      className="text-xs"
                    >
                      {cat.name}
                    </Button>
                  ))}
                </div>

                {/* Forum Threads */}
                <div className="space-y-3 mt-4">
                  {forumThreads.map((thread) => (
                    <div
                      key={thread.id}
                      className="flex items-start space-x-4 p-4 border rounded-lg hover:bg-accent transition-colors cursor-pointer group"
                    >
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              {thread.isPinned && <Pin className="w-4 h-4 text-amber-500" />}
                              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                                {thread.title}
                              </h3>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">{thread.preview}</p>
                          </div>
                          <Badge
                            className={
                              categories.find((c) => c.id === thread.category)?.color ||
                              'bg-gray-500/20 text-gray-600'
                            }
                          >
                            {categories.find((c) => c.id === thread.category)?.name}
                          </Badge>
                        </div>

                        <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
                          <span>
                            by <span className="font-medium text-foreground">{thread.author}</span>
                          </span>
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <Eye className="w-3 h-3" />
                              {thread.views}
                            </div>
                            <div className="flex items-center gap-1">
                              <MessageSquare className="w-3 h-3" />
                              {thread.replies}
                            </div>
                            <div className="flex items-center gap-1">
                              <Heart className="w-3 h-3" />
                              {thread.likes}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Chat Tab */}
          <TabsContent value="chat" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Channels Sidebar */}
              <Card className="md:col-span-1">
                <CardHeader>
                  <CardTitle className="text-sm">Channels</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {channels.map((channel) => (
                    <button
                      key={channel.id}
                      onClick={() => setSelectedChannel(channel.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors text-sm ${
                        selectedChannel === channel.id
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:bg-accent text-foreground'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span>{channel.icon}</span>
                        <span className="font-medium">{channel.name}</span>
                      </div>
                      <span className="text-xs opacity-75 ml-6">{channel.members} members</span>
                    </button>
                  ))}
                </CardContent>
              </Card>

              {/* Chat Area */}
              <Card className="md:col-span-3">
                <CardHeader className="border-b">
                  <CardTitle>
                    {channels.find((c) => c.id === selectedChannel)?.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col h-96">
                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto space-y-4 mb-4 p-4 bg-muted/30 rounded-lg">
                    {chatMessages.map((msg) => (
                      <div key={msg.id} className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-sm text-foreground">{msg.author}</span>
                          <Badge variant="outline" className="text-xs">
                            {msg.authorRole}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {msg.timestamp.toLocaleTimeString()}
                          </span>
                        </div>
                        <p className="text-sm text-foreground ml-0">{msg.content}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <button className="hover:text-primary transition-colors flex items-center gap-1">
                            <Heart className="w-3 h-3" />
                            {msg.likes}
                          </button>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Message Input */}
                  <div className="flex gap-2">
                    <Input
                      placeholder="Type a message..."
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && messageInput.trim()) {
                          setMessageInput('');
                        }
                      }}
                      className="flex-1"
                    />
                    <Button
                      size="icon"
                      className="bg-primary text-primary-foreground"
                      onClick={() => {
                        if (messageInput.trim()) {
                          setMessageInput('');
                        }
                      }}
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Community Guidelines */}
        <Card className="bg-muted/50 border-muted">
          <CardHeader>
            <CardTitle className="text-sm">Community Guidelines</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <p>✅ Be respectful and supportive of all community members</p>
            <p>✅ Share knowledge and help others learn</p>
            <p>✅ Report inappropriate content to moderators</p>
            <p>✅ Respect privacy and confidentiality of family information</p>
            <p>✅ Follow all regional and legal guidelines</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
