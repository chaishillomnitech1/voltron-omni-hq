import { protectedProcedure, publicProcedure, router } from '../_core/trpc';
import { z } from 'zod';
import { getDb } from '../db';
import { eq } from 'drizzle-orm';
import { userProfiles } from '../../drizzle/schema';

export const profilesRouter = router({
  /**
   * Get current user's profile
   */
  getMyProfile: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) return null;

    const profile = await db
      .select()
      .from(userProfiles)
      .where(eq(userProfiles.userId, ctx.user.id))
      .limit(1);

    return profile[0] || null;
  }),

  /**
   * Get public profile by user ID
   */
  getPublicProfile: publicProcedure
    .input(z.object({ userId: z.number() }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return null;

      const profile = await db
        .select()
        .from(userProfiles)
        .where(eq(userProfiles.userId, input.userId))
        .limit(1);

      return profile[0] || null;
    }),

  /**
   * Update user profile
   */
  updateProfile: protectedProcedure
    .input(z.object({
      displayName: z.string().optional(),
      bio: z.string().optional(),
      avatarUrl: z.string().optional(),
    }))
    .mutation(async ({ input, ctx }) => {
      const db = await getDb();
      if (!db) throw new Error('Database unavailable');

      // Check if profile exists
      const existing = await db
        .select()
        .from(userProfiles)
        .where(eq(userProfiles.userId, ctx.user.id))
        .limit(1);

      if (existing.length > 0) {
        // Update existing profile
        await db
          .update(userProfiles)
          .set({
            displayName: input.displayName,
            bio: input.bio,
            avatarUrl: input.avatarUrl,
          })
          .where(eq(userProfiles.userId, ctx.user.id));
      } else {
        // Create new profile
        await db.insert(userProfiles).values({
          userId: ctx.user.id,
          displayName: input.displayName,
          bio: input.bio,
          avatarUrl: input.avatarUrl,
        });
      }

      return { success: true };
    }),

  /**
   * Update notification preferences
   */
  updateNotificationPreferences: protectedProcedure
    .input(z.object({
      emailEnabled: z.boolean().optional(),
      chatEnabled: z.boolean().optional(),
      githubEnabled: z.boolean().optional(),
    }))
    .mutation(async ({ input, ctx }) => {
      const db = await getDb();
      if (!db) throw new Error('Database unavailable');

      await db
        .update(userProfiles)
        .set({
          notificationEmailEnabled: input.emailEnabled,
          notificationChatEnabled: input.chatEnabled,
          notificationGithubEnabled: input.githubEnabled,
        })
        .where(eq(userProfiles.userId, ctx.user.id));

      return { success: true };
    }),

  /**
   * Update theme preference
   */
  updateThemePreference: protectedProcedure
    .input(z.object({ theme: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const db = await getDb();
      if (!db) throw new Error('Database unavailable');

      await db
        .update(userProfiles)
        .set({ themePreference: input.theme })
        .where(eq(userProfiles.userId, ctx.user.id));

      return { success: true };
    }),
});
