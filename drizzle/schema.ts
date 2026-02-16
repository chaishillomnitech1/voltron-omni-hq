import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, boolean } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Chat Messages Table
 * Stores all messages sent through the real-time chat system
 */
export const chatMessages = mysqlTable("chat_messages", {
  id: varchar("id", { length: 64 }).primaryKey(),
  userId: int("user_id").notNull(),
  author: varchar("author", { length: 255 }).notNull(),
  message: text("message").notNull(),
  type: mysqlEnum("type", ["user", "bot", "system"]).default("user"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type ChatMessage = typeof chatMessages.$inferSelect;
export type InsertChatMessage = typeof chatMessages.$inferInsert;

/**
 * Notifications Table
 * Stores all notifications for users (chat, GitHub, system events)
 */
export const notifications = mysqlTable("notifications", {
  id: varchar("id", { length: 64 }).primaryKey(),
  userId: int("user_id"),
  type: mysqlEnum("type", ["chat", "github", "system", "success", "error"]).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  message: text("message").notNull(),
  read: boolean("read").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type Notification = typeof notifications.$inferSelect;
export type InsertNotification = typeof notifications.$inferInsert;

/**
 * GitHub Events Table
 * Stores GitHub repository events (commits, PRs, issues)
 */
export const githubEvents = mysqlTable("github_events", {
  id: varchar("id", { length: 64 }).primaryKey(),
  repository: varchar("repository", { length: 255 }).notNull(),
  eventType: mysqlEnum("event_type", ["push", "pull_request", "issue", "release"]).notNull(),
  author: varchar("author", { length: 255 }).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  url: varchar("url", { length: 500 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type GitHubEvent = typeof githubEvents.$inferSelect;
export type InsertGitHubEvent = typeof githubEvents.$inferInsert;