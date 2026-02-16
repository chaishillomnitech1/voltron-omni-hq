import { eq, desc } from "drizzle-orm";
import { getDb } from "./db";
import { chatMessages, notifications, githubEvents } from "../drizzle/schema";
import type { InsertChatMessage, InsertNotification, InsertGitHubEvent } from "../drizzle/schema";

/**
 * Chat Message Helpers
 */

export async function saveChatMessage(msg: InsertChatMessage): Promise<void> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot save chat message: database not available");
    return;
  }

  try {
    await db.insert(chatMessages).values(msg);
  } catch (error) {
    console.error("[Database] Failed to save chat message:", error);
    throw error;
  }
}

export async function getChatMessages(limit = 100) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get chat messages: database not available");
    return [];
  }

  try {
    return await db
      .select()
      .from(chatMessages)
      .orderBy(desc(chatMessages.createdAt))
      .limit(limit);
  } catch (error) {
    console.error("[Database] Failed to get chat messages:", error);
    return [];
  }
}

export async function getChatMessagesByUser(userId: number, limit = 50) {
  const db = await getDb();
  if (!db) return [];

  try {
    return await db
      .select()
      .from(chatMessages)
      .where(eq(chatMessages.userId, userId))
      .orderBy(desc(chatMessages.createdAt))
      .limit(limit);
  } catch (error) {
    console.error("[Database] Failed to get user chat messages:", error);
    return [];
  }
}

/**
 * Notification Helpers
 */

export async function saveNotification(notif: InsertNotification): Promise<void> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot save notification: database not available");
    return;
  }

  try {
    await db.insert(notifications).values(notif);
  } catch (error) {
    console.error("[Database] Failed to save notification:", error);
    throw error;
  }
}

export async function getUserNotifications(userId: number, limit = 50) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get notifications: database not available");
    return [];
  }

  try {
    return await db
      .select()
      .from(notifications)
      .where(eq(notifications.userId, userId))
      .orderBy(desc(notifications.createdAt))
      .limit(limit);
  } catch (error) {
    console.error("[Database] Failed to get user notifications:", error);
    return [];
  }
}

export async function markNotificationAsRead(id: string): Promise<void> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot mark notification: database not available");
    return;
  }

  try {
    await db
      .update(notifications)
      .set({ read: true })
      .where(eq(notifications.id, id));
  } catch (error) {
    console.error("[Database] Failed to mark notification as read:", error);
    throw error;
  }
}

export async function getUnreadNotificationCount(userId: number): Promise<number> {
  const db = await getDb();
  if (!db) return 0;

  try {
    const result = await db
      .select()
      .from(notifications)
      .where(eq(notifications.userId, userId));
    
    return result.filter((n) => !n.read).length;
  } catch (error) {
    console.error("[Database] Failed to get unread count:", error);
    return 0;
  }
}

/**
 * GitHub Event Helpers
 */

export async function saveGitHubEvent(event: InsertGitHubEvent): Promise<void> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot save GitHub event: database not available");
    return;
  }

  try {
    await db.insert(githubEvents).values(event);
  } catch (error) {
    console.error("[Database] Failed to save GitHub event:", error);
    throw error;
  }
}

export async function getRecentGitHubEvents(limit = 20) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get GitHub events: database not available");
    return [];
  }

  try {
    return await db
      .select()
      .from(githubEvents)
      .orderBy(desc(githubEvents.createdAt))
      .limit(limit);
  } catch (error) {
    console.error("[Database] Failed to get GitHub events:", error);
    return [];
  }
}

export async function getGitHubEventsByRepository(repository: string, limit = 20) {
  const db = await getDb();
  if (!db) return [];

  try {
    return await db
      .select()
      .from(githubEvents)
      .where(eq(githubEvents.repository, repository))
      .orderBy(desc(githubEvents.createdAt))
      .limit(limit);
  } catch (error) {
    console.error("[Database] Failed to get repository events:", error);
    return [];
  }
}

export async function getLatestGitHubEventTime(): Promise<number> {
  const db = await getDb();
  if (!db) return 0;

  try {
    const result = await db
      .select()
      .from(githubEvents)
      .orderBy(desc(githubEvents.createdAt))
      .limit(1);
    
    return result[0]?.createdAt?.getTime() || 0;
  } catch (error) {
    console.error("[Database] Failed to get latest event time:", error);
    return 0;
  }
}
