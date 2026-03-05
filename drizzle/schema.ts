import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, boolean, json } from "drizzle-orm/mysql-core";

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
 * Chat Messages Table - ScrollVerse Real-Time Chat
 * Stores all messages sent through the real-time chat system
 * Channels: general, guardians, families, training, regional, announcements
 */
export const chatMessages = mysqlTable("chat_messages", {
  id: varchar("id", { length: 64 }).primaryKey(),
  channelId: varchar("channel_id", { length: 64 }).notNull(),
  userId: varchar("user_id", { length: 64 }).notNull(),
  userName: varchar("user_name", { length: 255 }).notNull(),
  userRole: mysqlEnum("user_role", ["guardian", "family", "admin"]).default("family").notNull(),
  content: text("content").notNull(),
  likes: int("likes").default(0),
  reactions: json("reactions").default({}),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

export type ChatMessage = typeof chatMessages.$inferSelect;
export type InsertChatMessage = typeof chatMessages.$inferInsert;

/**
 * Chat Channels Table - ScrollVerse Community Channels
 */
export const chatChannels = mysqlTable("chat_channels", {
  id: varchar("id", { length: 64 }).primaryKey(),
  name: varchar("name", { length: 255 }).notNull().unique(),
  description: text("description"),
  type: mysqlEnum("type", ["public", "private", "regional"]).default("public"),
  memberCount: int("member_count").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type ChatChannel = typeof chatChannels.$inferSelect;
export type InsertChatChannel = typeof chatChannels.$inferInsert;

/**
 * Guardian Certification Results Table
 * Stores quiz completion and certification data
 */
export const certificationResults = mysqlTable("certification_results", {
  id: varchar("id", { length: 64 }).primaryKey(),
  userId: varchar("user_id", { length: 64 }).notNull(),
  userName: varchar("user_name", { length: 255 }).notNull(),
  moduleId: varchar("module_id", { length: 64 }).notNull(),
  moduleName: varchar("module_name", { length: 255 }).notNull(),
  score: int("score").notNull(),
  totalQuestions: int("total_questions").notNull(),
  passed: boolean("passed").notNull(),
  timeSpent: int("time_spent").notNull(),
  completedAt: timestamp("completed_at").defaultNow().notNull(),
});

export type CertificationResult = typeof certificationResults.$inferSelect;
export type InsertCertificationResult = typeof certificationResults.$inferInsert;

/**
 * Guardian Milestones Table
 * Tracks guardian certification milestones and advancement
 */
export const guardianMilestones = mysqlTable("guardian_milestones", {
  id: varchar("id", { length: 64 }).primaryKey(),
  userId: varchar("user_id", { length: 64 }).notNull(),
  userName: varchar("user_name", { length: 255 }).notNull(),
  milestoneId: varchar("milestone_id", { length: 64 }).notNull(),
  milestoneName: varchar("milestone_name", { length: 255 }).notNull(),
  level: int("level").notNull(),
  completed: boolean("completed").default(false),
  completedAt: timestamp("completed_at"),
  reward: varchar("reward", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type GuardianMilestone = typeof guardianMilestones.$inferSelect;
export type InsertGuardianMilestone = typeof guardianMilestones.$inferInsert;

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

/**
 * User Profiles Table
 * Stores user customization and preferences
 */
export const userProfiles = mysqlTable("user_profiles", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("user_id").notNull().unique(),
  displayName: varchar("display_name", { length: 255 }),
  bio: text("bio"),
  avatarUrl: varchar("avatar_url", { length: 500 }),
  notificationEmailEnabled: boolean("notification_email_enabled").default(true),
  notificationChatEnabled: boolean("notification_chat_enabled").default(true),
  notificationGithubEnabled: boolean("notification_github_enabled").default(true),
  themePreference: varchar("theme_preference", { length: 50 }).default("rose-gold"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

export type UserProfile = typeof userProfiles.$inferSelect;
export type InsertUserProfile = typeof userProfiles.$inferInsert;

/**
 * Flagged Messages Table
 * Stores messages flagged for moderation review
 */
export const flaggedMessages = mysqlTable("flagged_messages", {
  id: varchar("id", { length: 64 }).primaryKey(),
  messageId: varchar("message_id", { length: 64 }).notNull(),
  flaggedBy: int("flagged_by").notNull(),
  reason: varchar("reason", { length: 255 }).notNull(),
  status: mysqlEnum("status", ["pending", "reviewed", "resolved"]).default("pending"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type FlaggedMessage = typeof flaggedMessages.$inferSelect;
export type InsertFlaggedMessage = typeof flaggedMessages.$inferInsert;

/**
 * Admin Logs Table
 * Stores all admin actions for audit trail
 */
export const adminLogs = mysqlTable("admin_logs", {
  id: varchar("id", { length: 64 }).primaryKey(),
  adminId: int("admin_id").notNull(),
  action: varchar("action", { length: 100 }).notNull(),
  targetId: varchar("target_id", { length: 64 }),
  details: text("details"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type AdminLog = typeof adminLogs.$inferSelect;
export type InsertAdminLog = typeof adminLogs.$inferInsert;


// ============================================
// VOLTRON WEALTH NEXUS SCHEMA
// ============================================

/**
 * User Vaults - Personal asset registry
 */
export const userVaults = mysqlTable("user_vaults", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("user_id").notNull().references(() => users.id),
  vaultName: varchar("vault_name", { length: 255 }).notNull(),
  bio: text("bio"),
  totalAssetsCount: int("total_assets_count").default(0),
  estimatedAnnualValue: int("estimated_annual_value").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type UserVault = typeof userVaults.$inferSelect;
export type InsertUserVault = typeof userVaults.$inferInsert;

/**
 * Vault Assets - Individual assets within a vault
 */
export const vaultAssets = mysqlTable("vault_assets", {
  id: int("id").autoincrement().primaryKey(),
  vaultId: int("vault_id").notNull().references(() => userVaults.id),
  assetType: mysqlEnum("asset_type", ["skill", "content", "ip", "network", "data"]).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  category: varchar("category", { length: 100 }),
  monetizationPotential: mysqlEnum("monetization_potential", ["high", "medium", "low"]).default("medium"),
  marketDemandScore: int("market_demand_score").default(0),
  competitiveAdvantage: int("competitive_advantage").default(0),
  baseValue: int("base_value").default(0),
  uniqueMultiplier: varchar("unique_multiplier", { length: 10 }).default("1.0"),
  estimatedAnnualRevenue: int("estimated_annual_revenue").default(0),
  revenueHistory: text("revenue_history"),
  status: mysqlEnum("status", ["active", "inactive", "pending_monetization"]).default("active"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type VaultAsset = typeof vaultAssets.$inferSelect;
export type InsertVaultAsset = typeof vaultAssets.$inferInsert;

/**
 * Marketplace Opportunities
 */
export const marketplaceOpportunities = mysqlTable("marketplace_opportunities", {
  id: int("id").autoincrement().primaryKey(),
  creatorId: int("creator_id").notNull().references(() => users.id),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  assetTypesNeeded: text("asset_types_needed"),
  budgetMin: int("budget_min").default(0),
  budgetMax: int("budget_max").default(0),
  timeline: varchar("timeline", { length: 100 }),
  status: mysqlEnum("status", ["open", "matched", "in_progress", "completed"]).default("open"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  deadline: timestamp("deadline"),
});

export type MarketplaceOpportunity = typeof marketplaceOpportunities.$inferSelect;
export type InsertMarketplaceOpportunity = typeof marketplaceOpportunities.$inferInsert;

/**
 * Asset-Opportunity Matches
 */
export const assetOpportunityMatches = mysqlTable("asset_opportunity_matches", {
  id: int("id").autoincrement().primaryKey(),
  assetId: int("asset_id").notNull(),
  opportunityId: int("opportunity_id").notNull(),
  matchScore: int("match_score").default(0),
  synergyNotes: text("synergy_notes"),
  estimatedRevenue: int("estimated_revenue").default(0),
  status: mysqlEnum("status", ["suggested", "accepted", "rejected", "completed"]).default("suggested"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  completedAt: timestamp("completed_at"),
});

export type AssetOpportunityMatch = typeof assetOpportunityMatches.$inferSelect;
export type InsertAssetOpportunityMatch = typeof assetOpportunityMatches.$inferInsert;

/**
 * Sovereign Circles - Group wealth creation
 */
export const sovereignCircles = mysqlTable("sovereign_circles", {
  id: int("id").autoincrement().primaryKey(),
  founderId: int("founder_id").notNull().references(() => users.id),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  memberCount: int("member_count").default(1),
  totalCombinedValue: int("total_combined_value").default(0),
  governanceType: mysqlEnum("governance_type", ["democratic", "founder_led", "consensus"]).default("founder_led"),
  status: mysqlEnum("status", ["active", "inactive"]).default("active"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type SovereignCircle = typeof sovereignCircles.$inferSelect;
export type InsertSovereignCircle = typeof sovereignCircles.$inferInsert;

/**
 * Circle Members
 */
export const circleMembers = mysqlTable("circle_members", {
  id: int("id").autoincrement().primaryKey(),
  circleId: int("circle_id").notNull().references(() => sovereignCircles.id),
  userId: int("user_id").notNull().references(() => users.id),
  role: mysqlEnum("role", ["founder", "member", "advisor"]).default("member"),
  contributionPercentage: int("contribution_percentage").default(0),
  joinedAt: timestamp("joined_at").defaultNow().notNull(),
  status: mysqlEnum("status", ["active", "inactive"]).default("active"),
});

export type CircleMember = typeof circleMembers.$inferSelect;
export type InsertCircleMember = typeof circleMembers.$inferInsert;

/**
 * Wealth Agreements - Smart contracts & deals
 */
export const wealthAgreements = mysqlTable("wealth_agreements", {
  id: int("id").autoincrement().primaryKey(),
  type: mysqlEnum("type", ["asset_sale", "revenue_share", "partnership", "licensing"]).notNull(),
  partyAId: int("party_a_id").notNull(),
  partyBId: int("party_b_id").notNull(),
  assetId: int("asset_id"),
  opportunityId: int("opportunity_id"),
  terms: text("terms"),
  revenueSplit: text("revenue_split"),
  contractHash: varchar("contract_hash", { length: 255 }),
  status: mysqlEnum("status", ["draft", "signed", "active", "completed", "disputed"]).default("draft"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  signedAt: timestamp("signed_at"),
  expiresAt: timestamp("expires_at"),
});

export type WealthAgreement = typeof wealthAgreements.$inferSelect;
export type InsertWealthAgreement = typeof wealthAgreements.$inferInsert;

/**
 * Wealth Transactions - Revenue tracking
 */
export const wealthTransactions = mysqlTable("wealth_transactions", {
  id: int("id").autoincrement().primaryKey(),
  agreementId: int("agreement_id"),
  fromUserId: int("from_user_id").notNull(),
  toUserId: int("to_user_id").notNull(),
  amount: int("amount").notNull(),
  assetId: int("asset_id"),
  transactionType: mysqlEnum("transaction_type", ["payment", "royalty", "revenue_share"]).notNull(),
  status: mysqlEnum("status", ["pending", "completed", "failed"]).default("pending"),
  blockchainHash: varchar("blockchain_hash", { length: 255 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  completedAt: timestamp("completed_at"),
});

export type WealthTransaction = typeof wealthTransactions.$inferSelect;
export type InsertWealthTransaction = typeof wealthTransactions.$inferInsert;
