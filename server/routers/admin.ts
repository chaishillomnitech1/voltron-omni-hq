import { protectedProcedure, router } from '../_core/trpc';
import { z } from 'zod';
import { TRPCError } from '@trpc/server';
import { getDb } from '../db';
import { eq, desc } from 'drizzle-orm';
import { chatMessages, flaggedMessages, adminLogs, users } from '../../drizzle/schema';
import { nanoid } from 'nanoid';

// Middleware to check admin role
const adminProcedure = protectedProcedure.use(async ({ ctx, next }) => {
  if (ctx.user.role !== 'admin') {
    throw new TRPCError({ code: 'FORBIDDEN', message: 'Admin access required' });
  }
  return next({ ctx });
});

export const adminRouter = router({
  /**
   * Get all chat messages for moderation
   */
  getChatMessages: adminProcedure
    .input(z.object({ limit: z.number().default(50), offset: z.number().default(0) }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return [];
      
      return await db
        .select()
        .from(chatMessages)
        .orderBy(desc(chatMessages.createdAt))
        .limit(input.limit)
        .offset(input.offset);
    }),

  /**
   * Flag a message for review
   */
  flagMessage: adminProcedure
    .input(z.object({
      messageId: z.string(),
      reason: z.string().min(1).max(255),
    }))
    .mutation(async ({ input, ctx }) => {
      const db = await getDb();
      if (!db) throw new Error('Database unavailable');

      const flagId = `flag-${nanoid()}`;
      await db.insert(flaggedMessages).values({
        id: flagId,
        messageId: input.messageId,
        flaggedBy: ctx.user.id,
        reason: input.reason,
        status: 'pending',
      });

      // Log action
      await logAdminAction(ctx.user.id, 'FLAG_MESSAGE', input.messageId, input.reason);

      return { success: true, flagId };
    }),

  /**
   * Delete a message
   */
  deleteMessage: adminProcedure
    .input(z.object({ messageId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const db = await getDb();
      if (!db) throw new Error('Database unavailable');

      await db.delete(chatMessages).where(eq(chatMessages.id, input.messageId));

      // Log action
      await logAdminAction(ctx.user.id, 'DELETE_MESSAGE', input.messageId);

      return { success: true };
    }),

  /**
   * Get all users
   */
  getUsers: adminProcedure
    .input(z.object({ limit: z.number().default(50) }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return [];

      return await db
        .select()
        .from(users)
        .orderBy(desc(users.createdAt))
        .limit(input.limit);
    }),

  /**
   * Update user role
   */
  updateUserRole: adminProcedure
    .input(z.object({
      userId: z.number(),
      role: z.enum(['user', 'admin']),
    }))
    .mutation(async ({ input, ctx }) => {
      const db = await getDb();
      if (!db) throw new Error('Database unavailable');

      await db
        .update(users)
        .set({ role: input.role })
        .where(eq(users.id, input.userId));

      // Log action
      await logAdminAction(ctx.user.id, 'UPDATE_USER_ROLE', input.userId.toString(), `Role set to ${input.role}`);

      return { success: true };
    }),

  /**
   * Get admin analytics
   */
  getAnalytics: adminProcedure.query(async () => {
    const db = await getDb();
    if (!db) return null;

    const totalUsersResult = await db.select().from(users);
    const totalMessagesResult = await db.select().from(chatMessages);
    const flaggedCountResult = await db
      .select()
      .from(flaggedMessages)
      .where(eq(flaggedMessages.status, 'pending'));

    return {
      totalUsers: totalUsersResult.length,
      totalMessages: totalMessagesResult.length,
      pendingFlags: flaggedCountResult.length,
      lastUpdated: new Date(),
    };
  }),
});

async function logAdminAction(adminId: number, action: string, targetId?: string, details?: string) {
  const db = await getDb();
  if (!db) return;

  await db.insert(adminLogs).values({
    id: `log-${nanoid()}`,
    adminId,
    action,
    targetId,
    details,
  });
}
