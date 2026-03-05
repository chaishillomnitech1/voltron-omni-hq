import { Server as SocketIOServer, Socket } from 'socket.io';
import { Server as HTTPServer } from 'http';
import { db } from './db';
import { chatMessages, chatChannels } from '../drizzle/schema';
import { eq } from 'drizzle-orm';

/**
 * ScrollVerse Real-Time Chat Service
 * 
 * Socket.io WebSocket implementation for live community chat
 * Features:
 * - Multiple channels (general, guardians, families, training, regional, announcements)
 * - Real-time message delivery
 * - Persistent message storage
 * - User presence tracking
 * - Message reactions and likes
 * - Typing indicators
 * 
 * Where Love Becomes Law. Legacy Becomes Infinity. 44:Omni × ∞
 */

interface ChatUser {
  id: string;
  name: string;
  role: 'guardian' | 'family' | 'admin';
  avatar?: string;
}

interface ChatMessageData {
  id: string;
  channelId: string;
  userId: string;
  userName: string;
  userRole: 'guardian' | 'family' | 'admin';
  content: string;
  timestamp: Date;
  likes: number;
  reactions: Record<string, number>;
}

class SocketChatService {
  private io: SocketIOServer;
  private activeUsers: Map<string, ChatUser> = new Map();
  private channelSubscriptions: Map<string, Set<string>> = new Map();

  constructor(httpServer: HTTPServer) {
    this.io = new SocketIOServer(httpServer, {
      cors: {
        origin: process.env.FRONTEND_URL || 'http://localhost:5173',
        credentials: true,
      },
      transports: ['websocket', 'polling'],
    });

    this.setupEventHandlers();
  }

  /**
   * Setup Socket.io event handlers
   */
  private setupEventHandlers(): void {
    this.io.on('connection', (socket: Socket) => {
      console.log(`✅ User connected: ${socket.id}`);

      // User joins
      socket.on('user:join', (user: ChatUser) => {
        this.activeUsers.set(socket.id, user);
        this.io.emit('user:joined', {
          userId: socket.id,
          userName: user.name,
          userRole: user.role,
          totalActive: this.activeUsers.size,
        });
        console.log(`👤 ${user.name} joined (${this.activeUsers.size} active)`);
      });

      // Subscribe to channel
      socket.on('channel:subscribe', (channelId: string) => {
        socket.join(`channel:${channelId}`);
        if (!this.channelSubscriptions.has(channelId)) {
          this.channelSubscriptions.set(channelId, new Set());
        }
        this.channelSubscriptions.get(channelId)?.add(socket.id);

        const channelUsers = this.channelSubscriptions.get(channelId)?.size || 0;
        this.io.to(`channel:${channelId}`).emit('channel:user-count', {
          channelId,
          userCount: channelUsers,
        });

        console.log(`📢 User subscribed to ${channelId} (${channelUsers} in channel)`);
      });

      // Unsubscribe from channel
      socket.on('channel:unsubscribe', (channelId: string) => {
        socket.leave(`channel:${channelId}`);
        this.channelSubscriptions.get(channelId)?.delete(socket.id);

        const channelUsers = this.channelSubscriptions.get(channelId)?.size || 0;
        this.io.to(`channel:${channelId}`).emit('channel:user-count', {
          channelId,
          userCount: channelUsers,
        });
      });

      // Send message
      socket.on('message:send', async (data: {
        channelId: string;
        content: string;
      }) => {
        const user = this.activeUsers.get(socket.id);
        if (!user) return;

        const messageData: ChatMessageData = {
          id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          channelId: data.channelId,
          userId: socket.id,
          userName: user.name,
          userRole: user.role,
          content: data.content,
          timestamp: new Date(),
          likes: 0,
          reactions: {},
        };

        // Save to database
        try {
          await db.insert(chatMessages).values({
            id: messageData.id,
            channelId: data.channelId,
            userId: socket.id,
            userName: user.name,
            userRole: user.role,
            content: data.content,
            createdAt: new Date(),
            likes: 0,
            reactions: JSON.stringify({}),
          });
        } catch (error) {
          console.error('Failed to save message:', error);
        }

        // Broadcast to channel
        this.io.to(`channel:${data.channelId}`).emit('message:received', messageData);
        console.log(`💬 Message in ${data.channelId}: ${user.name}`);
      });

      // Typing indicator
      socket.on('typing:start', (channelId: string) => {
        const user = this.activeUsers.get(socket.id);
        if (user) {
          this.io.to(`channel:${channelId}`).emit('typing:indicator', {
            userId: socket.id,
            userName: user.name,
            isTyping: true,
          });
        }
      });

      socket.on('typing:stop', (channelId: string) => {
        const user = this.activeUsers.get(socket.id);
        if (user) {
          this.io.to(`channel:${channelId}`).emit('typing:indicator', {
            userId: socket.id,
            userName: user.name,
            isTyping: false,
          });
        }
      });

      // Like message
      socket.on('message:like', (data: { messageId: string; channelId: string }) => {
        this.io.to(`channel:${data.channelId}`).emit('message:liked', {
          messageId: data.messageId,
          likes: 1, // In production, fetch actual count from DB
        });
      });

      // React to message
      socket.on('message:react', (data: {
        messageId: string;
        channelId: string;
        emoji: string;
      }) => {
        this.io.to(`channel:${data.channelId}`).emit('message:reaction', {
          messageId: data.messageId,
          emoji: data.emoji,
        });
      });

      // Get channel history
      socket.on('channel:history', async (data: { channelId: string; limit?: number }) => {
        try {
          const messages = await db
            .select()
            .from(chatMessages)
            .where(eq(chatMessages.channelId, data.channelId))
            .limit(data.limit || 50);

          socket.emit('channel:history-response', {
            channelId: data.channelId,
            messages: messages.map((m) => ({
              id: m.id,
              channelId: m.channelId,
              userId: m.userId,
              userName: m.userName,
              userRole: m.userRole,
              content: m.content,
              timestamp: m.createdAt,
              likes: m.likes,
              reactions: JSON.parse(m.reactions || '{}'),
            })),
          });
        } catch (error) {
          console.error('Failed to fetch channel history:', error);
          socket.emit('error', { message: 'Failed to load channel history' });
        }
      });

      // User disconnects
      socket.on('disconnect', () => {
        const user = this.activeUsers.get(socket.id);
        if (user) {
          this.activeUsers.delete(socket.id);
          this.io.emit('user:left', {
            userId: socket.id,
            userName: user.name,
            totalActive: this.activeUsers.size,
          });
          console.log(`👋 ${user.name} disconnected (${this.activeUsers.size} active)`);
        }

        // Remove from all channels
        this.channelSubscriptions.forEach((users, channelId) => {
          users.delete(socket.id);
          this.io.to(`channel:${channelId}`).emit('channel:user-count', {
            channelId,
            userCount: users.size,
          });
        });
      });
    });
  }

  /**
   * Get active users count
   */
  getActiveUsersCount(): number {
    return this.activeUsers.size;
  }

  /**
   * Get channel user count
   */
  getChannelUserCount(channelId: string): number {
    return this.channelSubscriptions.get(channelId)?.size || 0;
  }

  /**
   * Broadcast system message
   */
  broadcastSystemMessage(channelId: string, message: string): void {
    this.io.to(`channel:${channelId}`).emit('message:system', {
      id: `sys-${Date.now()}`,
      content: message,
      timestamp: new Date(),
    });
  }

  /**
   * Get Socket.io instance
   */
  getIO(): SocketIOServer {
    return this.io;
  }
}

export const createSocketChatService = (httpServer: HTTPServer) => {
  return new SocketChatService(httpServer);
};

export type { ChatUser, ChatMessageData };
