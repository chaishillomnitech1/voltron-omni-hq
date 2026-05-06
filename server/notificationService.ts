/**
 * REAL-TIME NOTIFICATION SERVICE
 * WebSocket-based alerts for key ScrollVerse events
 * 
 * Features:
 * - Live recruitment notifications
 * - Frequency synchronization alerts
 * - Sacred book release notifications
 * - Tier advancement alerts
 * - Reward distribution notifications
 * - Network health alerts
 */

import { z } from 'zod';

// Notification types
export enum NotificationType {
  RECRUITMENT = 'recruitment',
  FREQUENCY = 'frequency',
  BOOK_RELEASE = 'book_release',
  TIER_ADVANCEMENT = 'tier_advancement',
  REWARD_DISTRIBUTION = 'reward_distribution',
  NETWORK_ALERT = 'network_alert',
  BROADCAST_START = 'broadcast_start',
  GUARDIAN_MILESTONE = 'guardian_milestone',
}

// Notification priority levels
export enum NotificationPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical',
}

// Notification schema
export const NotificationSchema = z.object({
  id: z.string(),
  type: z.nativeEnum(NotificationType),
  priority: z.nativeEnum(NotificationPriority),
  title: z.string(),
  description: z.string(),
  icon: z.string(),
  timestamp: z.number(),
  read: z.boolean().default(false),
  actionUrl: z.string().optional(),
  data: z.record(z.any()).optional(),
});

export type Notification = z.infer<typeof NotificationSchema>;

// Notification templates
export const NOTIFICATION_TEMPLATES = {
  [NotificationType.RECRUITMENT]: {
    title: 'New Guardian Recruited',
    description: (data: any) => `${data.tierName} tier guardian ${data.nodeId} joined the network`,
    icon: '⭐',
    priority: NotificationPriority.MEDIUM,
  },
  [NotificationType.FREQUENCY]: {
    title: 'Frequency Synchronized',
    description: (data: any) => `${data.frequency}Hz frequency synchronized across ${data.nodeCount} nodes`,
    icon: '〰️',
    priority: NotificationPriority.MEDIUM,
  },
  [NotificationType.BOOK_RELEASE]: {
    title: 'Sacred Book Released',
    description: (data: any) => `${data.bookTitle} is now available in the Sacred Books Gallery`,
    icon: '📖',
    priority: NotificationPriority.HIGH,
  },
  [NotificationType.TIER_ADVANCEMENT]: {
    title: 'Tier Advancement',
    description: (data: any) => `Congratulations! You advanced to ${data.newTier} tier`,
    icon: '👑',
    priority: NotificationPriority.HIGH,
  },
  [NotificationType.REWARD_DISTRIBUTION]: {
    title: 'Rewards Distributed',
    description: (data: any) => `You received ${data.amount} $LONDC rewards`,
    icon: '💰',
    priority: NotificationPriority.MEDIUM,
  },
  [NotificationType.NETWORK_ALERT]: {
    title: 'Network Alert',
    description: (data: any) => `Network status: ${data.status} (${data.uptime}% uptime)`,
    icon: '⚠️',
    priority: NotificationPriority.CRITICAL,
  },
  [NotificationType.BROADCAST_START]: {
    title: 'Broadcast Started',
    description: (data: any) => `${data.channelName} broadcast is now live with ${data.viewers} viewers`,
    icon: '📡',
    priority: NotificationPriority.MEDIUM,
  },
  [NotificationType.GUARDIAN_MILESTONE]: {
    title: 'Milestone Reached',
    description: (data: any) => `Guardian network reached ${data.milestone} nodes!`,
    icon: '🎉',
    priority: NotificationPriority.HIGH,
  },
};

/**
 * Create notification from template
 */
export function createNotification(
  type: NotificationType,
  data: Record<string, any>
): Notification {
  const template = NOTIFICATION_TEMPLATES[type];

  return {
    id: `notif-${Date.now()}-${Math.random().toString(36).slice(2)}`,
    type,
    priority: template.priority,
    title: template.title,
    description: template.description(data),
    icon: template.icon,
    timestamp: Date.now(),
    read: false,
    data,
  };
}

/**
 * Notification service for managing subscriptions and broadcasting
 */
export class NotificationService {
  private subscribers: Map<string, Set<(notification: Notification) => void>> = new Map();
  private notificationHistory: Notification[] = [];
  private maxHistorySize = 1000;

  /**
   * Subscribe to notifications
   */
  subscribe(userId: string, callback: (notification: Notification) => void): () => void {
    if (!this.subscribers.has(userId)) {
      this.subscribers.set(userId, new Set());
    }

    this.subscribers.get(userId)!.add(callback);

    // Return unsubscribe function
    return () => {
      this.subscribers.get(userId)?.delete(callback);
    };
  }

  /**
   * Broadcast notification to specific user
   */
  notify(userId: string, notification: Notification): void {
    const callbacks = this.subscribers.get(userId);
    if (callbacks) {
      callbacks.forEach(callback => {
        try {
          callback(notification);
        } catch (error) {
          console.error('Notification callback error:', error);
        }
      });
    }

    // Add to history
    this.addToHistory(notification);
  }

  /**
   * Broadcast notification to all users
   */
  notifyAll(notification: Notification): void {
    this.subscribers.forEach((callbacks, userId) => {
      callbacks.forEach(callback => {
        try {
          callback(notification);
        } catch (error) {
          console.error('Notification callback error:', error);
        }
      });
    });

    // Add to history
    this.addToHistory(notification);
  }

  /**
   * Broadcast to specific tier
   */
  notifyTier(tier: string, notification: Notification): void {
    // In production, this would query users by tier
    this.notifyAll(notification);
  }

  /**
   * Add notification to history
   */
  private addToHistory(notification: Notification): void {
    this.notificationHistory.push(notification);
    if (this.notificationHistory.length > this.maxHistorySize) {
      this.notificationHistory.shift();
    }
  }

  /**
   * Get notification history for user
   */
  getHistory(userId: string, limit: number = 50): Notification[] {
    // In production, this would query from database
    return this.notificationHistory.slice(-limit).reverse();
  }

  /**
   * Mark notification as read
   */
  markAsRead(notificationId: string): void {
    const notification = this.notificationHistory.find(n => n.id === notificationId);
    if (notification) {
      notification.read = true;
    }
  }

  /**
   * Get unread count for user
   */
  getUnreadCount(userId: string): number {
    // In production, this would query from database
    return this.notificationHistory.filter(n => !n.read).length;
  }
}

// Global notification service instance
export const notificationService = new NotificationService();

/**
 * Notification event emitters for different systems
 */

/**
 * Emit recruitment notification
 */
export function emitRecruitmentNotification(
  tierName: string,
  nodeId: string,
  userId?: string
): Notification {
  const notification = createNotification(NotificationType.RECRUITMENT, {
    tierName,
    nodeId,
  });

  if (userId) {
    notificationService.notify(userId, notification);
  } else {
    notificationService.notifyAll(notification);
  }

  return notification;
}

/**
 * Emit frequency synchronization notification
 */
export function emitFrequencyNotification(
  frequency: number,
  nodeCount: number,
  userId?: string
): Notification {
  const notification = createNotification(NotificationType.FREQUENCY, {
    frequency,
    nodeCount,
  });

  if (userId) {
    notificationService.notify(userId, notification);
  } else {
    notificationService.notifyAll(notification);
  }

  return notification;
}

/**
 * Emit sacred book release notification
 */
export function emitBookReleaseNotification(
  bookTitle: string,
  bookId: number,
  userId?: string
): Notification {
  const notification = createNotification(NotificationType.BOOK_RELEASE, {
    bookTitle,
    bookId,
  });

  if (userId) {
    notificationService.notify(userId, notification);
  } else {
    notificationService.notifyAll(notification);
  }

  return notification;
}

/**
 * Emit tier advancement notification
 */
export function emitTierAdvancementNotification(
  newTier: string,
  userId: string
): Notification {
  const notification = createNotification(NotificationType.TIER_ADVANCEMENT, {
    newTier,
  });

  notificationService.notify(userId, notification);
  return notification;
}

/**
 * Emit reward distribution notification
 */
export function emitRewardNotification(
  amount: number,
  tier: string,
  userId: string
): Notification {
  const notification = createNotification(NotificationType.REWARD_DISTRIBUTION, {
    amount,
    tier,
  });

  notificationService.notify(userId, notification);
  return notification;
}

/**
 * Emit network alert notification
 */
export function emitNetworkAlertNotification(
  status: 'optimal' | 'warning' | 'critical',
  uptime: number
): Notification {
  const notification = createNotification(NotificationType.NETWORK_ALERT, {
    status,
    uptime,
  });

  notificationService.notifyAll(notification);
  return notification;
}

/**
 * Emit broadcast start notification
 */
export function emitBroadcastNotification(
  channelName: string,
  viewers: number,
  userId?: string
): Notification {
  const notification = createNotification(NotificationType.BROADCAST_START, {
    channelName,
    viewers,
  });

  if (userId) {
    notificationService.notify(userId, notification);
  } else {
    notificationService.notifyAll(notification);
  }

  return notification;
}

/**
 * Emit guardian milestone notification
 */
export function emitMilestoneNotification(
  milestone: number,
  userId?: string
): Notification {
  const notification = createNotification(NotificationType.GUARDIAN_MILESTONE, {
    milestone,
  });

  if (userId) {
    notificationService.notify(userId, notification);
  } else {
    notificationService.notifyAll(notification);
  }

  return notification;
}

/**
 * Batch notification emitter for scheduled events
 */
export async function emitScheduledNotifications(): Promise<void> {
  // Emit recruitment notification
  emitRecruitmentNotification('Gold', 'NODE-2156');

  // Emit frequency notification
  emitFrequencyNotification(963, 7800000000);

  // Emit milestone notification
  emitMilestoneNotification(10500);

  // Emit broadcast notification
  emitBroadcastNotification('ScrollTV', 450000000);
}

export default {
  NotificationType,
  NotificationPriority,
  createNotification,
  notificationService,
  emitRecruitmentNotification,
  emitFrequencyNotification,
  emitBookReleaseNotification,
  emitTierAdvancementNotification,
  emitRewardNotification,
  emitNetworkAlertNotification,
  emitBroadcastNotification,
  emitMilestoneNotification,
  emitScheduledNotifications,
};
