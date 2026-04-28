import { motion, AnimatePresence } from 'motion/react';
import { X, Bell, Check, AlertCircle, Heart } from 'lucide-react';
import { type Notification } from '../data';

interface NotificationPanelProps {
  notifications: Notification[];
  show: boolean;
  onClose: () => void;
  onMarkRead: (id: string) => void;
}

export function NotificationPanel({ notifications, show, onClose, onMarkRead }: NotificationPanelProps) {
  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'match':
        return <Bell className="w-5 h-5 text-purple-400" />;
      case 'request':
        return <AlertCircle className="w-5 h-5 text-orange-400" />;
      case 'donation':
        return <Heart className="w-5 h-5 text-pink-400" />;
    }
  };

  const getBgColor = (type: Notification['type']) => {
    switch (type) {
      case 'match':
        return 'from-purple-500/10 to-blue-500/10 border-purple-500/30';
      case 'request':
        return 'from-orange-500/10 to-yellow-500/10 border-orange-500/30';
      case 'donation':
        return 'from-pink-500/10 to-rose-500/10 border-pink-500/30';
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          />

          {/* Panel */}
          <motion.div
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-gradient-to-br from-slate-900 to-slate-800 border-l border-white/10 z-50 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <Bell className="w-6 h-6 text-purple-400" />
                  Notifications
                </h2>
                <motion.button
                  onClick={onClose}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-5 h-5 text-gray-400" />
                </motion.button>
              </div>

              {notifications.filter(n => !n.read).length > 0 && (
                <p className="text-sm text-gray-400">
                  {notifications.filter(n => !n.read).length} unread notification
                  {notifications.filter(n => !n.read).length !== 1 ? 's' : ''}
                </p>
              )}
            </div>

            {/* Notifications List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {notifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <Bell className="w-16 h-16 text-gray-600 mb-4" />
                  <p className="text-gray-400">No notifications yet</p>
                  <p className="text-sm text-gray-500 mt-2">
                    We'll notify you when something important happens
                  </p>
                </div>
              ) : (
                <AnimatePresence>
                  {notifications.map((notification, i) => (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ delay: i * 0.05 }}
                      className={`p-4 rounded-xl border ${
                        notification.read
                          ? 'bg-white/5 border-white/10'
                          : `bg-gradient-to-r ${getBgColor(notification.type)} border`
                      } hover:border-white/20 transition-all cursor-pointer group`}
                      onClick={() => onMarkRead(notification.id)}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg ${
                          notification.read ? 'bg-white/5' : 'bg-white/10'
                        }`}>
                          {getIcon(notification.type)}
                        </div>

                        <div className="flex-1 min-w-0">
                          <p className={`${
                            notification.read ? 'text-gray-300' : 'text-white font-medium'
                          } mb-1`}>
                            {notification.message}
                          </p>

                          <div className="flex items-center gap-2">
                            <p className="text-xs text-gray-400">
                              {new Date(notification.timestamp).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </p>

                            {!notification.read && (
                              <div className="flex items-center gap-1 text-xs text-purple-400">
                                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
                                New
                              </div>
                            )}
                          </div>
                        </div>

                        {notification.read && (
                          <Check className="w-4 h-4 text-green-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                        )}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* Footer */}
            {notifications.length > 0 && (
              <div className="p-4 border-t border-white/10">
                <button
                  onClick={() => {
                    notifications.forEach(n => {
                      if (!n.read) onMarkRead(n.id);
                    });
                  }}
                  className="w-full py-3 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 text-purple-300 rounded-lg font-medium transition-all"
                >
                  Mark All as Read
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
