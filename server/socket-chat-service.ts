import { Server as SocketIOServer, Socket } from 'socket.io';
import { Server as HTTPServer } from 'http';
import { getDb } from './db';
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
      console.log(`[Chat] User connected: ${socket.id}`);

      // User join channel
      socket.on('join-channel', async (data: { channelId: string; user: ChatUser }) => {
        try {
          const { channelId, user } = data;
          
          // Add user to channel
          if (!this.channelSubscriptions.has(channelId)) {
            this.channelSubscriptions.set(channelId, new Set());
          }
          this.channelSubscriptions.get(channelId)?.add(socket.id);
          this.activeUsers.set(socket.id, user);

          // Join socket.io room
          socket.join(`channel:${channelId}`);

          // Notify others
          this.io.to(`channel:${channelId}`).emit('user-joined', {
            userId: user.id,
            userName: user.name,
            userRole: user.role,
            timestamp: new Date(),
          });

          console.log(`[Chat] User ${user.name} joined channel ${channelId}`);
        } catch (error) {
          console.error('[Chat] Error joining channel:', error);
          socket.emit('error', { message: 'Failed to join channel' });
        }
      });

      // Send message
      socket.on('send-message', async (data: { channelId: string; content: string }) => {
        try {
          const { channelId, content } = data;
          const user = this.activeUsers.get(socket.id);

          if (!user) {
            socket.emit('error', { message: 'User not authenticated' });
            return;
          }

          // Save to database
          const db = await getDb();
          const messageId = `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

          await db.insert(chatMessages).values({
            id: messageId,
            channelId,
            userId: user.id,
            userName: user.name,
            userRole: user.role,
            content,
            createdAt: new Date(),
            likes: 0,
            reactions: {},
          });

          // Broadcast to channel
          this.io.to(`channel:${channelId}`).emit('new-message', {
            id: messageId,
            channelId,
            userId: user.id,
            userName: user.name,
            userRole: user.role,
            content,
            timestamp: new Date(),
            likes: 0,
            reactions: {},
          });

          console.log(`[Chat] Message sent in ${channelId} by ${user.name}`);
        } catch (error) {
          console.error('[Chat] Error sending message:', error);
          socket.emit('error', { message: 'Failed to send message' });
        }
      });

      // Like message
      socket.on('like-message', async (data: { messageId: string; channelId: string }) => {
        try {
          const { messageId, channelId } = data;
          const db = await getDb();

          // Update likes in database
          const message = await db.query.chatMessages.findFirst({
            where: eq(chatMessages.id, messageId),
          });

          if (message) {
            const newLikes = (message.likes || 0) + 1;
            await db.update(chatMessages)
              .set({ likes: newLikes })
              .where(eq(chatMessages.id, messageId));

            // Broadcast update
            this.io.to(`channel:${channelId}`).emit('message-liked', {
              messageId,
              likes: newLikes,
            });
          }
        } catch (error) {
          console.error('[Chat] Error liking message:', error);
        }
      });

      // Add reaction
      socket.on('add-reaction', async (data: { messageId: string; channelId: string; emoji: string }) => {
        try {
          const { messageId, channelId, emoji } = data;
          const db = await getDb();

          // Update reactions in database
          const message = await db.query.chatMessages.findFirst({
            where: eq(chatMessages.id, messageId),
          });

          if (message) {
            const reactions = message.reactions || {};
            reactions[emoji] = (reactions[emoji] || 0) + 1;

            await db.update(chatMessages)
              .set({ reactions })
              .where(eq(chatMessages.id, messageId));

            // Broadcast update
            this.io.to(`channel:${channelId}`).emit('reaction-added', {
              messageId,
              emoji,
              count: reactions[emoji],
            });
          }
        } catch (error) {
          console.error('[Chat] Error adding reaction:', error);
        }
      });

      // Delete message
      socket.on('delete-message', async (data: { messageId: string; channelId: string }) => {
        try {
          const { messageId, channelId } = data;
          const user = this.activeUsers.get(socket.id);

          if (!user || user.role !== 'admin') {
            socket.emit('error', { message: 'Unauthorized' });
            return;
          }

          const db = await getDb();
          await db.delete(chatMessages).where(eq(chatMessages.id, messageId));

          // Broadcast deletion
          this.io.to(`channel:${channelId}`).emit('message-deleted', { messageId });
        } catch (error) {
          console.error('[Chat] Error deleting message:', error);
        }
      });

      // Typing indicator
      socket.on('typing', (data: { channelId: string }) => {
        const user = this.activeUsers.get(socket.id);
        if (user) {
          this.io.to(`channel:${data.channelId}`).emit('user-typing', {
            userId: user.id,
            userName: user.name,
          });
        }
      });

      // Stop typing
      socket.on('stop-typing', (data: { channelId: string }) => {
        const user = this.activeUsers.get(socket.id);
        if (user) {
          this.io.to(`channel:${data.channelId}`).emit('user-stop-typing', {
            userId: user.id,
          });
        }
      });

      // Disconnect
      socket.on('disconnect', () => {
        const user = this.activeUsers.get(socket.id);
        if (user) {
          // Remove from all channels
          this.channelSubscriptions.forEach((users, channelId) => {
            if (users.has(socket.id)) {
              users.delete(socket.id);
              this.io.to(`channel:${channelId}`).emit('user-left', {
                userId: user.id,
                userName: user.name,
              });
            }
          });

          this.activeUsers.delete(socket.id);
          console.log(`[Chat] User disconnected: ${socket.id}`);
        }
      });
    });
  }

  /**
   * Get channel messages
   */
  async getChannelMessages(channelId: string, limit: number = 50): Promise<ChatMessageData[]> {
    try {
      const db = await getDb();
      const messages = await db.query.chatMessages.findMany({
        where: eq(chatMessages.channelId, channelId),
        limit,
        orderBy: (m) => [m.createdAt],
      });

      return messages.map((m) => ({
        id: m.id,
        channelId: m.channelId,
        userId: m.userId,
        userName: m.userName,
        userRole: m.userRole as 'guardian' | 'family' | 'admin',
        content: m.content,
        timestamp: m.createdAt,
        likes: m.likes || 0,
        reactions: m.reactions || {},
      }));
    } catch (error) {
      console.error('[Chat] Error fetching messages:', error);
      return [];
    }
  }

  /**
   * Get active users in channel
   */
  getChannelUsers(channelId: string): ChatUser[] {
    const userIds = this.channelSubscriptions.get(channelId) || new Set();
    return Array.from(userIds)
      .map((userId) => this.activeUsers.get(userId))
      .filter((user): user is ChatUser => user !== undefined);
  }

  /**
   * Broadcast notification to channel
   */
  broadcastNotification(channelId: string, notification: { title: string; message: string }): void {
    this.io.to(`channel:${channelId}`).emit('notification', notification);
  }

  /**
   * Close socket.io server
   */
  close(): void {
    this.io.close();
  }
}

export { SocketChatService, ChatUser, ChatMessageData };
