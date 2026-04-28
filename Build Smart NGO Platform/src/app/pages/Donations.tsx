import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Heart, Clock, Users, Zap, Search, Filter, ShieldCheck, CheckCircle } from 'lucide-react';
import { Button } from '../components/Button';
import { GlassCard } from '../components/GlassCard';
import { Badge } from '../components/Badge';
import { ProgressBar } from '../components/ProgressBar';
import { Modal } from '../components/Modal';
import { DEMO_DATA, Campaign } from '../data';
import { toast } from 'sonner';

export function Donations() {
  const [filter, setFilter] = useState("All");
  const [donateCampaign, setDonateCampaign] = useState<Campaign | null>(null);
  const [donateAmount, setDonateAmount] = useState<number>(1000);
  
  const filters = ["All", "Trending", "Critical", "Nearby", "Recommended"];

  const handleDonateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (donateCampaign) {
      toast.success(`Successfully donated ₹${donateAmount} to ${donateCampaign.title}!`, {
        description: "Your impact token has been added to your profile.",
      });
      setDonateCampaign(null);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
            <Heart className="text-destructive w-8 h-8" />
            Donation Marketplace
          </h1>
          <p className="text-white/60 text-lg max-w-2xl">
            Fund verified campaigns. AI ensures your donation reaches areas with the highest impact and lowest resource saturation.
          </p>
        </div>
        
        <div className="flex gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input 
              type="text" 
              placeholder="Search campaigns..." 
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/50 text-white placeholder-white/40 backdrop-blur-sm"
            />
          </div>
          <Button variant="outline" className="px-3"><Filter className="w-4 h-4" /></Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {filters.map(f => (
          <Button 
            key={f} 
            variant={filter === f ? "primary" : "ghost"} 
            size="sm"
            onClick={() => setFilter(f)}
            className={filter !== f ? "bg-white/5 border border-white/10" : ""}
          >
            {f}
          </Button>
        ))}
      </div>

      {/* Campaigns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {DEMO_DATA.campaigns.map((campaign, i) => (
          <motion.div
            key={campaign.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <GlassCard className="h-full flex flex-col group p-0 overflow-hidden" hoverEffect={true} glowColor={campaign.urgency === 'CRITICAL' ? 'primary' : 'secondary'}>
              {/* Card Header area */}
              <div className="p-6 pb-4 border-b border-white/5 bg-gradient-to-b from-white/5 to-transparent relative">
                {/* AI Tags */}
                <div className="absolute top-4 right-4 flex gap-2">
                  {i === 0 && <Badge variant="critical" glow>🔥 Trending</Badge>}
                  {i === 2 && <Badge variant="success" glow>✨ Recommended</Badge>}
                </div>
                
                <Badge variant="outline" className="mb-4">{campaign.category}</Badge>
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{campaign.title}</h3>
                <p className="text-sm text-white/60 mb-2">by {campaign.ngo}</p>
                <div className="flex items-center gap-1 text-xs text-white/50">
                  <Zap className="w-3 h-3" /> Verified & Trust Score: 98%
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-grow flex flex-col">
                <p className="text-sm text-white/70 mb-6 line-clamp-2">{campaign.description}</p>
                
                <div className="mt-auto space-y-4">
                  <div className="flex justify-between items-end mb-2">
                    <div>
                      <div className="text-2xl font-bold">₹{(campaign.raised/1000).toFixed(0)}k</div>
                      <div className="text-xs text-white/50">raised of ₹{(campaign.goal/1000).toFixed(0)}k</div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold text-primary">{Math.round((campaign.raised/campaign.goal)*100)}%</div>
                    </div>
                  </div>
                  
                  <ProgressBar 
                    progress={(campaign.raised/campaign.goal)*100} 
                    colorClass={campaign.urgency === 'CRITICAL' ? 'bg-destructive' : 'bg-primary'} 
                  />

                  <div className="flex justify-between items-center pt-4 border-t border-white/5 text-xs text-white/60">
                    <div className="flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-white/40" />
                      <span>{campaign.donors} donors</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-white/40" />
                      <span>{campaign.daysLeft} days left</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-6 pt-0">
                <Button 
                  variant={campaign.urgency === 'CRITICAL' ? 'primary' : 'secondary'} 
                  className="w-full relative overflow-hidden group/btn"
                  onClick={() => setDonateCampaign(campaign)}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2 w-full text-center">Donate Now <Heart className="w-4 h-4" /></span>
                </Button>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      <Modal
        isOpen={!!donateCampaign}
        onClose={() => setDonateCampaign(null)}
        title={`Donate to ${donateCampaign?.title}`}
      >
        {donateCampaign && (
          <form onSubmit={handleDonateSubmit} className="space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <p className="text-white/80 text-sm mb-4">
                Your donation will directly support <span className="font-semibold text-secondary">{donateCampaign.ngo}</span> in achieving their goal of ₹{(donateCampaign.goal).toLocaleString()}.
              </p>
              
              <div className="space-y-3">
                <label className="text-sm font-medium text-white/70">Select Amount (INR)</label>
                <div className="grid grid-cols-3 gap-3">
                  {[500, 1000, 5000].map(amount => (
                    <button
                      key={amount}
                      type="button"
                      onClick={() => setDonateAmount(amount)}
                      className={`py-2 rounded-lg text-sm font-semibold transition-all border ${
                        donateAmount === amount 
                          ? 'bg-secondary/20 border-secondary text-white' 
                          : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10'
                      }`}
                    >
                      ₹{amount}
                    </button>
                  ))}
                </div>
                <div className="relative mt-2">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50">₹</span>
                  <input 
                    type="number" 
                    value={donateAmount}
                    onChange={(e) => setDonateAmount(Number(e.target.value))}
                    className="w-full bg-black/20 border border-white/10 rounded-lg py-2 pl-8 pr-4 text-white focus:outline-none focus:border-secondary transition-colors"
                    placeholder="Custom amount"
                    min="1"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium text-white/70">Payment Method</label>
              <div className="grid grid-cols-2 gap-3">
                <button type="button" className="flex items-center justify-center gap-2 py-3 bg-white/5 border border-secondary/50 rounded-lg text-white">
                  <CheckCircle className="w-4 h-4 text-secondary" /> UPI / Cards
                </button>
                <button type="button" className="flex items-center justify-center gap-2 py-3 bg-white/5 border border-white/10 rounded-lg text-white/60 hover:bg-white/10">
                  Net Banking
                </button>
              </div>
            </div>

            <Button type="submit" variant="primary" className="w-full py-3 text-lg shadow-[0_0_20px_rgba(124,92,255,0.4)]">
              Donate ₹{donateAmount} Now
            </Button>
            <p className="text-center text-xs text-white/40 flex items-center justify-center gap-1">
              <ShieldCheck className="w-3 h-3" /> 100% Secure & AI-Verified Transaction
            </p>
          </form>
        )}
      </Modal>
    </div>
  );
}
