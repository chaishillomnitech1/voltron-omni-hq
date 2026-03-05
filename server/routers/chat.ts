import { publicProcedure, protectedProcedure, router } from '../_core/trpc';
import { z } from 'zod';
import { getDb } from '../db';
import { chatMessages, chatChannels } from '../../drizzle/schema';
import { eq, desc } from 'drizzle-orm';

/**
 * Chat Router - ScrollVerse Real-Time Chat
 * Fixed to use new chatMessages schema with proper types
 */

export const chatRouter = router({
  getMessagesByChannel: publicProcedure
    .input(z.object({
      channelId: z.string().min(1),
      limit: z.number().default(100),
    }))
    .query(async ({ input }) => {
      const pageLimit = Math.min(input.limit, 500);
      try {
        const db = await getDb();
        if (!db) return [];
        const messages = await db
          .select()
          .from(chatMessages)
          .where(eq(chatMessages.channelId, input.channelId))
          .orderBy(desc(chatMessages.createdAt));
        return messages.slice(-pageLimit).reverse();
      } catch (error) {
        console.error('Error fetching channel messages:', error);
        return [];
      }
    }),

  getUserMessages: protectedProcedure
    .input(z.object({ limit: z.number().default(50) }))
    .query(async ({ input, ctx }) => {
      const pageLimit = Math.min(input.limit, 200);
      try {
        const db = await getDb();
        if (!db) return [];
        const messages = await db
          .select()
          .from(chatMessages)
          .where(eq(chatMessages.userId, String(ctx.user.id)))
          .orderBy(desc(chatMessages.createdAt));
        return messages.slice(-pageLimit).reverse();
      } catch (error) {
        console.error('Error fetching user messages:', error);
        return [];
      }
    }),

  sendMessage: protectedProcedure
    .input(z.object({
      channelId: z.string().min(1),
      content: z.string().min(1).max(1000),
      userRole: z.enum(['guardian', 'family', 'admin']).default('family'),
    }))
    .mutation(async ({ input, ctx }) => {
      if (input.content.length > 1000) {
        throw new Error('Message too long (max 1000 chars)');
      }
      const messageId = `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      try {
        const db = await getDb();
        if (!db) throw new Error('Database not available');
        const newMessage = {
          id: messageId,
          channelId: input.channelId,
          userId: String(ctx.user.id),
          userName: ctx.user.name || 'Anonymous',
          userRole: input.userRole,
          content: input.content,
          likes: 0,
          reactions: {},
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        await db.insert(chatMessages).values(newMessage);
        return newMessage;
      } catch (error) {
        console.error('Error saving message:', error);
        throw new Error('Failed to send message');
      }
    }),

  likeMessage: protectedProcedure
    .input(z.object({ messageId: z.string().min(1) }))
    .mutation(async ({ input }) => {
      try {
        const db = await getDb();
        if (!db) throw new Error('Database not available');
        const message = await db
          .select()
          .from(chatMessages)
          .where(eq(chatMessages.id, input.messageId));
        if (!message.length) throw new Error('Message not found');
        const currentLikes = message[0].likes || 0;
        await db
          .update(chatMessages)
          .set({ likes: currentLikes + 1, updatedAt: new Date() })
          .where(eq(chatMessages.id, input.messageId));
        return { success: true, likes: currentLikes + 1 };
      } catch (error) {
        console.error('Error liking message:', error);
        throw new Error('Failed to like message');
      }
    }),

  addReaction: protectedProcedure
    .input(z.object({
      messageId: z.string().min(1),
      emoji: z.string().min(1).max(2),
    }))
    .mutation(async ({ input }) => {
      try {
        const db = await getDb();
        if (!db) throw new Error('Database not available');
        const message = await db
          .select()
          .from(chatMessages)
          .where(eq(chatMessages.id, input.messageId));
        if (!message.length) throw new Error('Message not found');
        const reactions = (message[0].reactions as Record<string, number>) || {};
        reactions[input.emoji] = (reactions[input.emoji] || 0) + 1;
        await db
          .update(chatMessages)
          .set({ reactions, updatedAt: new Date() })
          .where(eq(chatMessages.id, input.messageId));
        return { success: true, reactions };
      } catch (error) {
        console.error('Error adding reaction:', error);
        throw new Error('Failed to add reaction');
      }
    }),

  getChannels: publicProcedure
    .query(async () => {
      try {
        const db = await getDb();
        if (!db) return [];
        const channels = await db
          .select()
          .from(chatChannels)
          .orderBy(chatChannels.name);
        return channels;
      } catch (error) {
        console.error('Error fetching channels:', error);
        return [];
      }
    }),

  createChannel: protectedProcedure
    .input(z.object({
      name: z.string().min(1).max(255),
      description: z.string().optional(),
      type: z.enum(['public', 'private', 'regional']).default('public'),
    }))
    .mutation(async ({ input, ctx }) => {
      if (ctx.user.role !== 'admin') {
        throw new Error('Only admins can create channels');
      }
      const channelId = `ch-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      try {
        const db = await getDb();
        if (!db) throw new Error('Database not available');
        const newChannel = {
          id: channelId,
          name: input.name,
          description: input.description || null,
          type: input.type,
          memberCount: 0,
          createdAt: new Date(),
        };
        await db.insert(chatChannels).values(newChannel);
        return newChannel;
      } catch (error) {
        console.error('Error creating channel:', error);
        throw new Error('Failed to create channel');
      }
    }),

  deleteMessage: protectedProcedure
    .input(z.object({ messageId: z.string().min(1) }))
    .mutation(async ({ input, ctx }) => {
      try {
        const db = await getDb();
        if (!db) throw new Error('Database not available');
        const message = await db
          .select()
          .from(chatMessages)
          .where(eq(chatMessages.id, input.messageId));
        if (!message.length) throw new Error('Message not found');
        if (message[0].userId !== String(ctx.user.id) && ctx.user.role !== 'admin') {
          throw new Error('You can only delete your own messages');
        }
        await db
          .update(chatMessages)
          .set({ content: '[deleted]', updatedAt: new Date() })
          .where(eq(chatMessages.id, input.messageId));
        return { success: true };
      } catch (error) {
        console.error('Error deleting message:', error);
        throw new Error('Failed to delete message');
      }
    }),
});
