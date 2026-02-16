import { protectedProcedure, router } from '../_core/trpc';
import { z } from 'zod';
import {
  saveNotification,
  getUserNotifications,
  markNotificationAsRead,
  getUnreadNotificationCount,
} from '../db-helpers';

export const notificationsRouter = router({
  /**
   * Get user's notifications
   */
  getNotifications: protectedProcedure
    .input(z.object({ limit: z.number().default(50) }))
    .query(async ({ input, ctx }) => {
      const limit = Math.min(input.limit, 200);
      return await getUserNotifications(ctx.user.id, limit);
    }),

  /**
   * Get unread notification count
   */
  getUnreadCount: protectedProcedure.query(async ({ ctx }) => {
    const count = await getUnreadNotificationCount(ctx.user.id);
    return { count };
  }),

  /**
   * Mark notification as read
   */
  markAsRead: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      await markNotificationAsRead(input.id);
      return { success: true };
    }),

  /**
   * Create a new notification
   */
  create: protectedProcedure
    .input(z.object({
      type: z.enum(['chat', 'github', 'system', 'success', 'error']),
      title: z.string().min(1),
      message: z.string().min(1),
    }))
    .mutation(async ({ input, ctx }) => {
      const notif = {
        id: `notif-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        userId: ctx.user.id,
        type: input.type,
        title: input.title,
        message: input.message,
        read: false,
      };

      await saveNotification(notif);
      return notif;
    }),
});
