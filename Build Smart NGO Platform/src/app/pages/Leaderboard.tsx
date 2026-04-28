import React from 'react';
import { motion } from 'motion/react';
import { Trophy, Star, Medal, TrendingUp } from 'lucide-react';
import { GlassCard } from '../components/GlassCard';
import { Badge } from '../components/Badge';
import { DEMO_DATA } from '../data';

export function Leaderboard() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4 mb-12">
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="w-20 h-20 mx-auto bg-gradient-to-tr from-warning to-destructive rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(255,176,32,0.4)]"
        >
          <Trophy className="w-10 h-10 text-white" />
        </motion.div>
        <h1 className="text-4xl font-bold">Impact Leaderboard</h1>
        <p className="text-white/60 text-lg">Celebrating the top contributors and NGOs making a difference this month.</p>
      </div>

      <div className="space-y-4">
        {DEMO_DATA.leaderboard.map((entry, i) => (
          <motion.div
            key={entry.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <GlassCard 
              className={`p-6 flex items-center gap-6 ${i === 0 ? 'border-warning/50 bg-warning/5 shadow-[0_0_30px_rgba(255,176,32,0.1)]' : ''}`}
              hoverEffect={false}
            >
              <div className="w-12 h-12 flex items-center justify-center text-3xl font-bold text-white/40">
                {entry.badge ? entry.badge : `#${entry.rank}`}
              </div>
              
              <div className="flex-1">
                <h3 className={`text-xl font-bold ${i === 0 ? 'text-warning' : 'text-white'}`}>{entry.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant={entry.type === 'NGO' ? 'primary' : 'outline'}>{entry.type}</Badge>
                  {i < 3 && <span className="text-xs text-white/50 flex items-center gap-1"><TrendingUp className="w-3 h-3 text-green-400" /> Up from last week</span>}
                </div>
              </div>

              <div className="text-right">
                <div className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">
                  {entry.score.toLocaleString()}
                </div>
                <div className="text-sm text-white/50 uppercase tracking-widest font-semibold flex items-center gap-1 justify-end">
                  <Star className="w-3 h-3 text-warning" /> Impact Score
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
