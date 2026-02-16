import { publicProcedure, router } from '../_core/trpc';
import { z } from 'zod';
import { getDb } from '../db';
import { chatMessages, notifications, githubEvents, users } from '../../drizzle/schema';
import { desc, gte } from 'drizzle-orm';

export const analyticsRouter = router({
  /**
   * Get dashboard overview metrics
   */
  getDashboardMetrics: publicProcedure.query(async () => {
    const db = await getDb();
    if (!db) return null;

    const allUsers = await db.select().from(users);
    const allMessages = await db.select().from(chatMessages);
    const allNotifications = await db.select().from(notifications);
    const allGithubEvents = await db.select().from(githubEvents);

    // Calculate metrics
    const totalUsers = allUsers.length;
    const totalMessages = allMessages.length;
    const totalNotifications = allNotifications.length;
    const totalGithubEvents = allGithubEvents.length;
    const unreadNotifications = allNotifications.filter(n => !n.read).length;

    // Calculate growth rates
    const last24h = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const messagesLast24h = allMessages.filter(m => m.createdAt > last24h).length;
    const eventsLast24h = allGithubEvents.filter(e => e.createdAt > last24h).length;

    return {
      totalUsers,
      totalMessages,
      totalNotifications,
      unreadNotifications,
      totalGithubEvents,
      messagesLast24h,
      eventsLast24h,
      messageGrowth: totalMessages > 0 ? ((messagesLast24h / totalMessages) * 100).toFixed(1) : '0',
      eventGrowth: totalGithubEvents > 0 ? ((eventsLast24h / totalGithubEvents) * 100).toFixed(1) : '0',
    };
  }),

  /**
   * Get chat activity analytics
   */
  getChatAnalytics: publicProcedure
    .input(z.object({ days: z.number().default(7) }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return [];

      const cutoffDate = new Date(Date.now() - input.days * 24 * 60 * 60 * 1000);
      const messages = await db
        .select()
        .from(chatMessages)
        .where(gte(chatMessages.createdAt, cutoffDate));

      // Group by day
      const byDay: Record<string, number> = {};
      messages.forEach(msg => {
        const day = msg.createdAt.toISOString().split('T')[0];
        byDay[day] = (byDay[day] || 0) + 1;
      });

      return Object.entries(byDay)
        .map(([date, count]) => ({ date, messages: count }))
        .sort((a, b) => a.date.localeCompare(b.date));
    }),

  /**
   * Get GitHub event analytics
   */
  getGithubAnalytics: publicProcedure
    .input(z.object({ days: z.number().default(7) }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return null;

      const cutoffDate = new Date(Date.now() - input.days * 24 * 60 * 60 * 1000);
      const events = await db
        .select()
        .from(githubEvents)
        .where(gte(githubEvents.createdAt, cutoffDate));

      // Aggregate by event type
      const byType = {
        push: events.filter(e => e.eventType === 'push').length,
        pull_request: events.filter(e => e.eventType === 'pull_request').length,
        issue: events.filter(e => e.eventType === 'issue').length,
        release: events.filter(e => e.eventType === 'release').length,
      };

      // Group by day
      const byDay: Record<string, number> = {};
      events.forEach(evt => {
        const day = evt.createdAt.toISOString().split('T')[0];
        byDay[day] = (byDay[day] || 0) + 1;
      });

      const timeline = Object.entries(byDay)
        .map(([date, count]) => ({ date, events: count }))
        .sort((a, b) => a.date.localeCompare(b.date));

      return {
        byType,
        timeline,
        totalEvents: events.length,
        uniqueRepositories: new Set(events.map(e => e.repository)).size,
        uniqueAuthors: new Set(events.map(e => e.author)).size,
      };
    }),

  /**
   * Get user engagement analytics
   */
  getUserEngagement: publicProcedure.query(async () => {
    const db = await getDb();
    if (!db) return null;

    const allUsers = await db.select().from(users);
    const allMessages = await db.select().from(chatMessages);

    // Calculate engagement
    const activeUsers = new Set(allMessages.map(m => m.userId)).size;
    const totalUsers = allUsers.length;
    const engagementRate = totalUsers > 0 ? ((activeUsers / totalUsers) * 100).toFixed(1) : '0';

    // Messages per user
    const messagesPerUser = totalUsers > 0 ? (allMessages.length / totalUsers).toFixed(1) : '0';

    // Last 7 days activity
    const last7days = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const activeLastWeek = new Set(
      allMessages.filter(m => m.createdAt > last7days).map(m => m.userId)
    ).size;

    return {
      totalUsers,
      activeUsers,
      engagementRate,
      messagesPerUser,
      activeLastWeek,
      totalMessages: allMessages.length,
    };
  }),

  /**
   * Get revenue analytics (simulated)
   */
  getRevenueAnalytics: publicProcedure.query(async () => {
    // Simulated revenue data based on Tesla 3-6-9 scaling
    const baseRevenue = 2270000;
    const dailyGrowth = 0.144; // 14.4% daily growth simulation

    const today = new Date();
    const revenue = {
      current: baseRevenue + Math.random() * 100000,
      daily: baseRevenue * dailyGrowth,
      weekly: baseRevenue * dailyGrowth * 7,
      monthly: baseRevenue * dailyGrowth * 30,
      projected30days: baseRevenue * Math.pow(1 + dailyGrowth / 100, 30),
    };

    return {
      current: revenue.current.toFixed(2),
      daily: revenue.daily.toFixed(2),
      weekly: revenue.weekly.toFixed(2),
      monthly: revenue.monthly.toFixed(2),
      projected30days: revenue.projected30days.toFixed(2),
      growthRate: '14.4%',
      currency: 'USD',
    };
  }),

  /**
   * Get notification statistics
   */
  getNotificationStats: publicProcedure.query(async () => {
    const db = await getDb();
    if (!db) return null;

    const allNotifications = await db.select().from(notifications);

    const byType = {
      chat: allNotifications.filter(n => n.type === 'chat').length,
      github: allNotifications.filter(n => n.type === 'github').length,
      system: allNotifications.filter(n => n.type === 'system').length,
      success: allNotifications.filter(n => n.type === 'success').length,
      error: allNotifications.filter(n => n.type === 'error').length,
    };

    const readCount = allNotifications.filter(n => n.read).length;
    const unreadCount = allNotifications.filter(n => !n.read).length;

    return {
      total: allNotifications.length,
      byType,
      read: readCount,
      unread: unreadCount,
      readRate: allNotifications.length > 0 ? ((readCount / allNotifications.length) * 100).toFixed(1) : '0',
    };
  }),
});
