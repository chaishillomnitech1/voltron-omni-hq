import { publicProcedure, router } from '../_core/trpc';
import { z } from 'zod';
import { getDb } from '../db';
import { desc, like, eq } from 'drizzle-orm';
import { githubEvents } from '../../drizzle/schema';

export const githubSearchRouter = router({
  /**
   * Search GitHub events with advanced filters
   */
  searchEvents: publicProcedure
    .input(z.object({
      query: z.string().optional(),
      eventType: z.enum(['push', 'pull_request', 'issue', 'release']).optional(),
      repository: z.string().optional(),
      author: z.string().optional(),
      limit: z.number().default(50),
    }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return [];

      // Get all events and filter in memory for simplicity
      const allEvents = await db
        .select()
        .from(githubEvents)
        .orderBy(desc(githubEvents.createdAt));

      let filtered = allEvents;

      if (input.eventType) {
        filtered = filtered.filter(e => e.eventType === input.eventType);
      }

      if (input.repository) {
        const repo = input.repository;
        filtered = filtered.filter(e => e.repository.includes(repo));
      }

      if (input.author) {
        const author = input.author;
        filtered = filtered.filter(e => e.author.includes(author));
      }

      if (input.query) {
        const q = input.query;
        filtered = filtered.filter(e =>
          e.title.includes(q) || (e.description ? e.description.includes(q) : false)
        );
      }

      return filtered.slice(0, Math.min(input.limit, 100));
    }),

  /**
   * Get events by repository
   */
  getRepositoryEvents: publicProcedure
    .input(z.object({
      repository: z.string(),
      limit: z.number().default(50),
    }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return [];

      const allEvents = await db
        .select()
        .from(githubEvents)
        .orderBy(desc(githubEvents.createdAt));

      return allEvents
        .filter(e => e.repository === input.repository)
        .slice(0, Math.min(input.limit, 100));
    }),

  /**
   * Get recent events
   */
  getRecentEvents: publicProcedure
    .input(z.object({ limit: z.number().default(50) }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return [];

      return await db
        .select()
        .from(githubEvents)
        .orderBy(desc(githubEvents.createdAt))
        .limit(Math.min(input.limit, 100));
    }),

  /**
   * Get unique repositories
   */
  getRepositories: publicProcedure.query(async () => {
    const db = await getDb();
    if (!db) return [];

    const allEvents = await db.select().from(githubEvents);
    const repoSet = new Set(allEvents.map(e => e.repository));
    const repos = Array.from(repoSet);
    return repos.sort();
  }),

  /**
   * Get event statistics
   */
  getStatistics: publicProcedure.query(async () => {
    const db = await getDb();
    if (!db) return null;

    const events = await db.select().from(githubEvents);

    const stats = {
      totalEvents: events.length,
      byType: {
        push: events.filter(e => e.eventType === 'push').length,
        pull_request: events.filter(e => e.eventType === 'pull_request').length,
        issue: events.filter(e => e.eventType === 'issue').length,
        release: events.filter(e => e.eventType === 'release').length,
      },
      uniqueRepositories: Array.from(new Set(events.map(e => e.repository))).length,
      uniqueAuthors: Array.from(new Set(events.map(e => e.author))).length,
    };

    return stats;
  }),
});
