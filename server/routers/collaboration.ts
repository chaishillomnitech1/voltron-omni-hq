import { protectedProcedure, publicProcedure, router } from '../_core/trpc';
import { z } from 'zod';
import { getDb } from '../db';
import { nanoid } from 'nanoid';
import { eq } from 'drizzle-orm';

// In-memory store for active collaboration sessions
// In production, use Redis or a database
const activeSessions: Map<string, {
  id: string;
  name: string;
  participants: Set<number>;
  content: string;
  lastUpdated: Date;
  createdAt: Date;
}> = new Map();

export const collaborationRouter = router({
  /**
   * Create a new collaboration session
   */
  createSession: protectedProcedure
    .input(z.object({
      name: z.string().min(1).max(255),
      initialContent: z.string().optional(),
    }))
    .mutation(async ({ input, ctx }) => {
      const sessionId = `collab-${nanoid()}`;
      
      activeSessions.set(sessionId, {
        id: sessionId,
        name: input.name,
        participants: new Set([ctx.user.id]),
        content: input.initialContent || '',
        lastUpdated: new Date(),
        createdAt: new Date(),
      });

      return {
        sessionId,
        name: input.name,
        participantCount: 1,
      };
    }),

  /**
   * Join a collaboration session
   */
  joinSession: protectedProcedure
    .input(z.object({ sessionId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const session = activeSessions.get(input.sessionId);
      
      if (!session) {
        throw new Error('Session not found');
      }

      session.participants.add(ctx.user.id);
      session.lastUpdated = new Date();

      return {
        sessionId: session.id,
        name: session.name,
        content: session.content,
        participantCount: session.participants.size,
        participants: Array.from(session.participants),
      };
    }),

  /**
   * Leave a collaboration session
   */
  leaveSession: protectedProcedure
    .input(z.object({ sessionId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const session = activeSessions.get(input.sessionId);
      
      if (!session) {
        throw new Error('Session not found');
      }

      session.participants.delete(ctx.user.id);
      session.lastUpdated = new Date();

      // Clean up empty sessions
      if (session.participants.size === 0) {
        activeSessions.delete(input.sessionId);
      }

      return { success: true };
    }),

  /**
   * Update session content
   */
  updateContent: protectedProcedure
    .input(z.object({
      sessionId: z.string(),
      content: z.string(),
      cursorPosition: z.number().optional(),
    }))
    .mutation(async ({ input, ctx }) => {
      const session = activeSessions.get(input.sessionId);
      
      if (!session) {
        throw new Error('Session not found');
      }

      if (!session.participants.has(ctx.user.id)) {
        throw new Error('Not a participant in this session');
      }

      session.content = input.content;
      session.lastUpdated = new Date();

      return {
        success: true,
        lastUpdated: session.lastUpdated,
        participantCount: session.participants.size,
      };
    }),

  /**
   * Get session content
   */
  getSessionContent: publicProcedure
    .input(z.object({ sessionId: z.string() }))
    .query(async ({ input }) => {
      const session = activeSessions.get(input.sessionId);
      
      if (!session) {
        throw new Error('Session not found');
      }

      return {
        sessionId: session.id,
        name: session.name,
        content: session.content,
        participantCount: session.participants.size,
        lastUpdated: session.lastUpdated,
      };
    }),

  /**
   * List active sessions
   */
  listActiveSessions: publicProcedure.query(async () => {
    const sessions = Array.from(activeSessions.values()).map(session => ({
      id: session.id,
      name: session.name,
      participantCount: session.participants.size,
      createdAt: session.createdAt,
      lastUpdated: session.lastUpdated,
    }));

    return sessions.sort((a, b) => b.lastUpdated.getTime() - a.lastUpdated.getTime());
  }),

  /**
   * Add comment/annotation to session
   */
  addComment: protectedProcedure
    .input(z.object({
      sessionId: z.string(),
      text: z.string().min(1),
      position: z.number().optional(),
    }))
    .mutation(async ({ input, ctx }) => {
      const session = activeSessions.get(input.sessionId);
      
      if (!session) {
        throw new Error('Session not found');
      }

      if (!session.participants.has(ctx.user.id)) {
        throw new Error('Not a participant in this session');
      }

      const comment = {
        id: `comment-${nanoid()}`,
        userId: ctx.user.id,
        text: input.text,
        position: input.position,
        createdAt: new Date(),
      };

      return comment;
    }),

  /**
   * Get session participants
   */
  getParticipants: publicProcedure
    .input(z.object({ sessionId: z.string() }))
    .query(async ({ input }) => {
      const session = activeSessions.get(input.sessionId);
      
      if (!session) {
        throw new Error('Session not found');
      }

      return {
        sessionId: session.id,
        participants: Array.from(session.participants),
        participantCount: session.participants.size,
      };
    }),

  /**
   * Get session statistics
   */
  getSessionStats: publicProcedure.query(async () => {
    const stats = {
      activeSessions: activeSessions.size,
      totalParticipants: new Set(
        Array.from(activeSessions.values()).flatMap(s => Array.from(s.participants))
      ).size,
      sessions: Array.from(activeSessions.values()).map(s => ({
        id: s.id,
        name: s.name,
        participants: s.participants.size,
        contentLength: s.content.length,
        uptime: Date.now() - s.createdAt.getTime(),
      })),
    };

    return stats;
  }),
});
