import React from 'react';
import { motion } from 'motion/react';
import { Map as MapIcon, Navigation, Info, AlertTriangle } from 'lucide-react';
import { GlassCard } from '../components/GlassCard';
import { Badge } from '../components/Badge';
import { IMAGES, DEMO_DATA } from '../data';

export function Map() {
  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col space-y-4">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <MapIcon className="text-accent w-8 h-8" />
            Live Crisis Map
          </h1>
          <p className="text-white/60">Real-time geospatial view of NGO activities and resource demands.</p>
        </div>
        <div className="flex gap-2">
          <Badge variant="critical">● Critical Zones</Badge>
          <Badge variant="medium">● Active NGOs</Badge>
          <Badge variant="outline" className="text-primary border-primary">● Volunteers</Badge>
        </div>
      </div>

      <GlassCard className="flex-1 relative overflow-hidden p-0 border-white/20">
        {/* Map Background */}
        <div className="absolute inset-0">
          <img src={IMAGES.map} alt="World Map" className="w-full h-full object-cover opacity-40 mix-blend-screen" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50" />
        </div>

        {/* Floating Control Panel */}
        <div className="absolute top-6 left-6 w-80 space-y-4">
          <GlassCard className="p-4 bg-background/80 backdrop-blur-2xl border-white/10 shadow-2xl">
            <h3 className="font-bold flex items-center gap-2 mb-3"><AlertTriangle className="w-4 h-4 text-warning" /> Live Alerts</h3>
            <div className="space-y-3">
              {DEMO_DATA.aiDemand.slice(0, 3).map((d, i) => (
                <div key={i} className="flex justify-between items-center text-sm border-b border-white/5 pb-2 last:border-0 last:pb-0">
                  <span>{d.location}</span>
                  <Badge variant={d.level === 'CRITICAL' ? 'critical' : 'high'}>{d.percentage}% Risk</Badge>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Animated Map Markers (Simulated) based on aiDemand */}
        {DEMO_DATA.aiDemand.map((d, i) => {
          const top = 30 + (i * 10) % 50; // Random looking
          const left = 20 + (i * 15) % 60;
          
          return (
            <motion.div 
              key={i}
              className={`absolute w-4 h-4 rounded-full ${d.level === 'CRITICAL' ? 'bg-destructive shadow-[0_0_20px_rgba(255,77,77,1)]' : d.level === 'HIGH' ? 'bg-warning shadow-[0_0_15px_rgba(255,176,32,1)]' : 'bg-primary shadow-[0_0_15px_rgba(79,140,255,1)]'}`}
              style={{ top: `${top}%`, left: `${left}%` }}
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
              transition={{ repeat: Infinity, duration: 2 + (i % 2), delay: i * 0.2 }}
            >
              <div className="absolute -top-6 -left-10 w-24 text-center opacity-0 hover:opacity-100 transition-opacity bg-black/80 text-[10px] py-1 rounded border border-white/20 whitespace-nowrap z-50 pointer-events-auto cursor-help">
                {d.location} ({d.percentage}%)
              </div>
            </motion.div>
          );
        })}

        {/* Map UI Overlays */}
        <div className="absolute bottom-6 right-6 flex flex-col gap-2">
          <button className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors">
            +
          </button>
          <button className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors">
            -
          </button>
          <button className="w-10 h-10 rounded-full bg-primary/20 backdrop-blur-md border border-primary/50 flex items-center justify-center text-primary hover:bg-primary/40 transition-colors mt-2">
            <Navigation className="w-4 h-4" />
          </button>
        </div>
      </GlassCard>
    </div>
  );
}
