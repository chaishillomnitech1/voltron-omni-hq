import { Server as HTTPServer } from 'http';
import { Server as SocketIOServer, Socket } from 'socket.io';
import { getDb } from './db';

export interface ChatMessage {
  id: string;
  userId: string;
  username: string;
  message: string;
  timestamp: Date;
  avatar?: string;
}

interface ConnectedUser {
  id: string;
  username: string;
  avatar?: string;
  connectedAt: Date;
}

let io: SocketIOServer | null = null;
const connectedUsers = new Map<string, ConnectedUser>();
const messageHistory: ChatMessage[] = [];

export function initializeWebSocket(httpServer: HTTPServer) {
  io = new SocketIOServer(httpServer, {
    cors: {
      origin: process.env.NODE_ENV === 'production' 
        ? process.env.VITE_FRONTEND_URL 
        : 'http://localhost:5173',
      credentials: true,
    },
  });

  io.on('connection', (socket: Socket) => {
    console.log(`[WebSocket] User connected: ${socket.id}`);

    // User joins chat
    socket.on('join', (data: { userId: string; username: string; avatar?: string }) => {
      const user: ConnectedUser = {
        id: data.userId,
        username: data.username,
        avatar: data.avatar,
        connectedAt: new Date(),
      };

      connectedUsers.set(socket.id, user);

      // Send message history to new user
      socket.emit('message-history', messageHistory.slice(-50)); // Last 50 messages

      // Broadcast user joined
      io!.emit('user-joined', {
        user,
        onlineCount: connectedUsers.size,
      });

      console.log(`[WebSocket] ${data.username} joined. Online users: ${connectedUsers.size}`);
    });

    // Handle new messages
    socket.on('send-message', async (data: { message: string; userId: string; username: string }) => {
      const chatMessage: ChatMessage = {
        id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        userId: data.userId,
        username: data.username,
        message: data.message,
        timestamp: new Date(),
      };

      messageHistory.push(chatMessage);

      // Keep only last 500 messages in memory
      if (messageHistory.length > 500) {
        messageHistory.shift();
      }

      // Persist to database
      try {
        const db = await getDb();
        if (db) {
          // Insert message into chat_messages table
          await db.insert(require('../drizzle/schema').chat_messages).values({
            userId: data.userId,
            username: data.username,
            message: data.message,
            timestamp: new Date(),
          });
        }
      } catch (error) {
        console.error('[WebSocket] Failed to persist message:', error);
      }

      // Broadcast message to all connected users
      io!.emit('new-message', chatMessage);
      console.log(`[WebSocket] Message from ${data.username}: ${data.message.substring(0, 50)}...`);
    });

    // Handle typing indicator
    socket.on('typing', (data: { username: string }) => {
      socket.broadcast.emit('user-typing', data);
    });

    socket.on('stop-typing', (data: { username: string }) => {
      socket.broadcast.emit('user-stop-typing', data);
    });

    // Get online users
    socket.on('get-online-users', () => {
      const onlineUsers = Array.from(connectedUsers.values());
      socket.emit('online-users', onlineUsers);
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      const user = connectedUsers.get(socket.id);
      if (user) {
        connectedUsers.delete(socket.id);
        io!.emit('user-left', {
          username: user.username,
          onlineCount: connectedUsers.size,
        });
        console.log(`[WebSocket] ${user.username} disconnected. Online users: ${connectedUsers.size}`);
      }
    });

    // Handle errors
    socket.on('error', (error) => {
      console.error(`[WebSocket] Error from ${socket.id}:`, error);
    });
  });

  console.log('[WebSocket] Socket.io server initialized');
  return io;
}

export function getIO() {
  return io;
}

export function getConnectedUsers() {
  return Array.from(connectedUsers.values());
}

export function getMessageHistory(limit: number = 50) {
  return messageHistory.slice(-limit);
}
