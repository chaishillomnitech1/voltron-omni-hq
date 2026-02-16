import React, { useState } from 'react';
import { Bell, X, Github, MessageCircle, AlertCircle, CheckCircle, Info } from 'lucide-react';
import { useNotificationStore } from '@/stores/notificationStore';

export const NotificationCenter = () => {
  const { notifications, removeNotification, markAsRead, markAllAsRead, getUnreadCount } = useNotificationStore();
  const [isOpen, setIsOpen] = useState(false);
  const unreadCount = getUnreadCount();

  const getIcon = (type: string) => {
    switch (type) {
      case 'github':
        return <Github size={16} className="text-[#d4af37]" />;
      case 'chat':
        return <MessageCircle size={16} className="text-[#00d9ff]" />;
      case 'error':
        return <AlertCircle size={16} className="text-red-500" />;
      case 'success':
        return <CheckCircle size={16} className="text-green-500" />;
      default:
        return <Info size={16} className="text-[#ff6b9d]" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'github':
        return 'border-l-[#d4af37]';
      case 'chat':
        return 'border-l-[#00d9ff]';
      case 'error':
        return 'border-l-red-500';
      case 'success':
        return 'border-l-green-500';
      default:
        return 'border-l-[#ff6b9d]';
    }
  };

  return (
    <div className="relative">
      {/* Notification Bell Icon */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 hover:bg-[#1a1a1a] rounded-lg transition text-gray-400 hover:text-[#d4af37]"
        title="Notifications"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Notification Panel */}
      {isOpen && (
        <div className="absolute right-0 top-12 w-96 max-h-96 bg-[#0f0f0f] border border-[#2a2a2a] rounded-lg shadow-2xl z-50 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-[#2a2a2a] sticky top-0 bg-[#050505]">
            <h3 className="text-lg font-bold text-white">Notifications</h3>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-xs text-[#d4af37] hover:text-[#ff6b9d] transition"
                >
                  Mark all as read
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white transition"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Notifications List */}
          <div className="overflow-y-auto flex-1">
            {notifications.length === 0 ? (
              <div className="flex items-center justify-center h-32 text-gray-500">
                <p className="text-sm">No notifications yet</p>
              </div>
            ) : (
              <div className="divide-y divide-[#2a2a2a]">
                {notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className={`p-4 hover:bg-[#1a1a1a] transition border-l-4 ${getTypeColor(notif.type)} ${
                      !notif.read ? 'bg-[#1a1a1a]/50' : ''
                    }`}
                    onClick={() => !notif.read && markAsRead(notif.id)}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3 flex-1">
                        <div className="mt-1">{getIcon(notif.type)}</div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-white text-sm">{notif.title}</h4>
                          <p className="text-gray-400 text-xs mt-1">{notif.message}</p>
                          <p className="text-gray-500 text-xs mt-2">
                            {new Date(notif.timestamp).toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeNotification(notif.id);
                        }}
                        className="text-gray-500 hover:text-gray-300 transition flex-shrink-0"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
