import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Bot, CheckCircle, Clock, MapPin, Check } from 'lucide-react';
import { Button } from '../components/Button';
import { GlassCard } from '../components/GlassCard';
import { Badge } from '../components/Badge';
import { DEMO_DATA } from '../data';
import { toast } from 'sonner';

export function Matching() {
  const [acceptedTasks, setAcceptedTasks] = useState<number[]>([]);
  const [invitedVols, setInvitedVols] = useState<number[]>([]);

  const handleAcceptTask = (id: number) => {
    setAcceptedTasks([...acceptedTasks, id]);
    toast.success("Task Accepted!", { description: "The NGO has been notified of your intent to help." });
  };

  const handleInviteVol = (id: number, name: string) => {
    setInvitedVols([...invitedVols, id]);
    toast.success("Invitation Sent!", { description: `${name} has been notified of your interest.` });
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-bold flex items-center gap-3">
          <Bot className="text-primary w-8 h-8" />
          Smart Matching
        </h1>
        <p className="text-white/60 text-lg max-w-3xl">
          Our AI matches open NGO requests with the most suitable volunteers based on location, skills, and availability.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* NGO Requests */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold border-b border-white/10 pb-2">Open Requests</h2>
          <div className="space-y-4">
            {DEMO_DATA.requests.map(req => (
              <GlassCard key={req.id} className="p-5 flex flex-col gap-4">
                <div className="flex justify-between items-start">
                  <div>
                    <Badge variant={req.urgency === 'CRITICAL' ? 'critical' : 'high'} className="mb-2 inline-block">
                      {req.urgency} Priority
                    </Badge>
                    <h3 className="text-lg font-bold">{req.title}</h3>
                    <p className="text-sm text-white/60">{req.ngo}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-accent">{req.matched}/{req.needed}</div>
                    <div className="text-xs text-white/50">Volunteers</div>
                  </div>
                </div>

                <div className="flex gap-4 text-sm text-white/70 bg-white/5 p-3 rounded-xl border border-white/5">
                  <div className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-primary" /> {req.location}</div>
                  <div className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-secondary" /> {req.date}</div>
                </div>

                <Button 
                  variant={acceptedTasks.includes(req.id) ? "primary" : "outline"} 
                  className="w-full gap-2"
                  onClick={() => !acceptedTasks.includes(req.id) && handleAcceptTask(req.id)}
                  disabled={acceptedTasks.includes(req.id)}
                >
                  {acceptedTasks.includes(req.id) ? (
                    <>Accepted <Check className="w-4 h-4" /></>
                  ) : (
                    <>Accept Task <CheckCircle className="w-4 h-4" /></>
                  )}
                </Button>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* Available Volunteers */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold border-b border-white/10 pb-2">Top Matches for You</h2>
          <div className="space-y-4">
            {DEMO_DATA.volunteers.map(vol => (
              <GlassCard key={vol.id} className="p-5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-secondary to-primary flex items-center justify-center text-xl font-bold border-2 border-white/20">
                    {vol.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold">{vol.name}</h3>
                    <p className="text-xs text-white/60 mb-1">{vol.location} • {vol.availability}</p>
                    <div className="flex gap-1.5">
                      {vol.skills.map(s => (
                        <span key={s} className="px-2 py-0.5 rounded bg-white/10 text-[10px] text-white/80">{s}</span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <div className="text-lg font-bold text-primary">{vol.matchScore}%</div>
                  <div className="text-[10px] text-white/50 uppercase tracking-wider mb-2">Match</div>
                  <Button 
                    variant={invitedVols.includes(vol.id) ? "outline" : "primary"} 
                    size="sm"
                    onClick={() => !invitedVols.includes(vol.id) && handleInviteVol(vol.id, vol.name)}
                    disabled={invitedVols.includes(vol.id)}
                  >
                    {invitedVols.includes(vol.id) ? "Invited" : "Invite"}
                  </Button>
                </div>
              </GlassCard>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
