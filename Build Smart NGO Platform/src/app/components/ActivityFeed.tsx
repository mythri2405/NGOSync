import React from 'react';
import { motion } from 'motion/react';
import { Activity, Bell, Heart, Star, ShieldAlert } from 'lucide-react';
import { GlassCard } from './GlassCard';
import { DEMO_DATA } from '../data';

export function ActivityFeed() {
  const getIcon = (action: string) => {
    if (action.includes('donated')) return <Heart className="w-4 h-4 text-secondary" />;
    if (action.includes('volunteering')) return <Star className="w-4 h-4 text-accent" />;
    if (action.includes('dispatched') || action.includes('goal')) return <ShieldAlert className="w-4 h-4 text-primary" />;
    return <Bell className="w-4 h-4 text-white/60" />;
  };

  return (
    <GlassCard className="p-6 h-full flex flex-col">
      <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
        <Activity className="w-5 h-5 text-secondary" />
        Live Platform Activity
      </h3>
      
      <div className="space-y-4 flex-1 overflow-y-auto pr-2 custom-scrollbar">
        {DEMO_DATA.recentActivity.map((activity, idx) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="flex gap-4 p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors"
          >
            <div className="mt-1 flex-shrink-0 bg-background-dark/50 p-2 rounded-full h-8 w-8 flex items-center justify-center">
              {getIcon(activity.action)}
            </div>
            <div>
              <p className="text-sm text-white/90">
                <span className="font-semibold text-white">{activity.user}</span>{' '}
                <span className="text-white/70">{activity.action}</span>{' '}
                for <span className="font-medium text-accent">{activity.target}</span>
              </p>
              <p className="text-xs text-white/40 mt-1">{activity.time}</p>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="pt-4 mt-4 border-t border-white/10 text-center">
        <button className="text-xs text-secondary hover:text-white transition-colors">
          View All Activity
        </button>
      </div>
    </GlassCard>
  );
}
