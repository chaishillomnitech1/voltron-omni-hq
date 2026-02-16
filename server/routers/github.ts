import { publicProcedure, router } from '../_core/trpc';
import { z } from 'zod';
import {
  getRecentGitHubEvents,
  getGitHubEventsByRepository,
  getLatestGitHubEventTime,
} from '../db-helpers';

export const githubRouter = router({
  /**
   * Get recent GitHub events
   */
  getRecentEvents: publicProcedure
    .input(z.object({ limit: z.number().default(20) }))
    .query(async ({ input }) => {
      const limit = Math.min(input.limit, 100);
      return await getRecentGitHubEvents(limit);
    }),

  /**
   * Get events for a specific repository
   */
  getRepositoryEvents: publicProcedure
    .input(z.object({
      repository: z.string().min(1),
      limit: z.number().default(20),
    }))
    .query(async ({ input }) => {
      const limit = Math.min(input.limit, 100);
      return await getGitHubEventsByRepository(input.repository, limit);
    }),

  /**
   * Get latest event timestamp
   */
  getLatestEventTime: publicProcedure.query(async () => {
    const timestamp = await getLatestGitHubEventTime();
    return { timestamp };
  }),
});
