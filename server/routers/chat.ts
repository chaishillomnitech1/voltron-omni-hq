import { publicProcedure, protectedProcedure, router } from '../_core/trpc';
import { z } from 'zod';
import { saveChatMessage, getChatMessages, getChatMessagesByUser } from '../db-helpers';

export const chatRouter = router({
  /**
   * Get recent chat messages
   */
  getMessages: publicProcedure
    .input(z.object({ limit: z.number().default(100) }))
    .query(async ({ input }) => {
      const limit = Math.min(input.limit, 500);
      return await getChatMessages(limit);
    }),

  /**
   * Get user's chat messages
   */
  getUserMessages: protectedProcedure
    .input(z.object({ limit: z.number().default(50) }))
    .query(async ({ input, ctx }) => {
      const limit = Math.min(input.limit, 200);
      return await getChatMessagesByUser(ctx.user.id, limit);
    }),

  /**
   * Send a new chat message
   */
  sendMessage: protectedProcedure
    .input(z.object({
      message: z.string().min(1),
      author: z.string().min(1),
    }))
    .mutation(async ({ input, ctx }) => {
      // Validate message length
      if (input.message.length > 1000) {
        throw new Error('Message too long (max 1000 chars)');
      }
      if (input.author.length > 255) {
        throw new Error('Author name too long (max 255 chars)');
      }

      const msg = {
        id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        userId: ctx.user.id,
        author: input.author,
        message: input.message,
        type: 'user' as const,
      };

      await saveChatMessage(msg);
      return msg;
    }),
});
