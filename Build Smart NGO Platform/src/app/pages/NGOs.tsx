import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, MapPin, Users, Heart, Star, CheckCircle, Activity, Award } from 'lucide-react';
import { Button } from '../components/Button';
import { GlassCard } from '../components/GlassCard';
import { Badge } from '../components/Badge';
import { ProgressBar } from '../components/ProgressBar';
import { Modal } from '../components/Modal';
import { DEMO_DATA, NGO } from '../data';
import { toast } from 'sonner';

const CATEGORIES = ["All", "Food", "Education", "Disaster", "Medical", "Animal", "Water", "Women", "Environment"];

export function NGOs() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [detailsModalNGO, setDetailsModalNGO] = useState<NGO | null>(null);
  const [supportModalNGO, setSupportModalNGO] = useState<NGO | null>(null);
  const [supportAmount, setSupportAmount] = useState<number>(50);

  const filteredNGOs = activeCategory === "All" 
    ? DEMO_DATA.ngos 
    : DEMO_DATA.ngos.filter(ngo => ngo.category === activeCategory);

  const handleSupportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (supportModalNGO) {
      toast.success(`Successfully donated $${supportAmount} to ${supportModalNGO.name}!`, {
        description: "Your receipt has been sent to your email.",
      });
      setSupportModalNGO(null);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-bold flex items-center gap-3">
          <ShieldCheck className="text-secondary w-8 h-8" />
          Verified NGOs
        </h1>
        <p className="text-white/60 text-lg max-w-3xl">
          Discover highly-rated, AI-vetted NGOs working across the country. We track their fund utilization and impact to ensure transparency.
        </p>
      </div>

      {/* Filter Chips */}
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 border ${
              activeCategory === cat 
                ? 'bg-secondary/20 border-secondary text-white shadow-[0_0_15px_rgba(124,92,255,0.4)]' 
                : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredNGOs.map((ngo, idx) => (
          <motion.div
            key={ngo.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
          >
            <GlassCard className="p-6 h-full flex flex-col md:flex-row gap-6 hover:shadow-[0_0_30px_rgba(124,92,255,0.15)] transition-shadow">
              <div className="flex-1 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold mb-1 flex items-center gap-2">
                      {ngo.name}
                      <ShieldCheck className="w-4 h-4 text-accent" />
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-white/60">
                      <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {ngo.location}</span>
                      <span className="flex items-center gap-1"><Heart className="w-3.5 h-3.5" /> {ngo.category}</span>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-white/80 line-clamp-2">
                  {ngo.description}
                </p>

                <div className="grid grid-cols-2 gap-4 py-2 border-y border-white/10">
                  <div>
                    <div className="text-xs text-white/50 mb-1">Trust Score</div>
                    <div className="font-semibold text-accent">{ngo.trust}%</div>
                  </div>
                  <div>
                    <div className="text-xs text-white/50 mb-1">Active Volunteers</div>
                    <div className="font-semibold flex items-center gap-1"><Users className="w-4 h-4 text-primary" /> {ngo.volunteers}</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-white/60">Current Resource Fulfilment</span>
                    <span className="font-medium text-white">{ngo.funding}%</span>
                  </div>
                  <ProgressBar progress={ngo.funding} colorClass="bg-secondary" glow={false} />
                </div>
              </div>

              <div className="md:w-32 flex flex-col gap-3 justify-center border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-6">
                <Badge variant={ngo.urgency === 'CRITICAL' ? 'critical' : ngo.urgency === 'HIGH' ? 'high' : 'medium'} className="text-center w-full justify-center">
                  {ngo.urgency}
                </Badge>
                <Button variant="outline" size="sm" className="w-full" onClick={() => setDetailsModalNGO(ngo)}>Details</Button>
                <Button variant="primary" size="sm" className="w-full" onClick={() => setSupportModalNGO(ngo)}>Support</Button>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {/* Details Modal */}
      <Modal 
        isOpen={!!detailsModalNGO} 
        onClose={() => setDetailsModalNGO(null)}
        title={detailsModalNGO?.name || 'NGO Details'}
      >
        {detailsModalNGO && (
          <div className="space-y-6">
            <div className="flex flex-wrap gap-3 items-center text-sm text-white/70">
              <span className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-full"><MapPin className="w-4 h-4 text-primary" /> {detailsModalNGO.location}</span>
              <span className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-full"><Heart className="w-4 h-4 text-secondary" /> {detailsModalNGO.category}</span>
              <span className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-full"><Users className="w-4 h-4 text-accent" /> {detailsModalNGO.volunteers} Volunteers</span>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                <Activity className="w-5 h-5 text-secondary" /> Mission & Overview
              </h3>
              <p className="text-white/80 leading-relaxed bg-white/5 p-4 rounded-xl border border-white/5">
                {detailsModalNGO.description} This AI-verified organization has been crucial in addressing local challenges, demonstrating a strong track record of resource utilization and community impact.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-secondary/10 to-transparent p-4 rounded-xl border border-secondary/20">
                <div className="text-secondary mb-1 flex items-center gap-2"><ShieldCheck className="w-4 h-4" /> AI Trust Score</div>
                <div className="text-3xl font-bold text-white">{detailsModalNGO.trust}%</div>
                <div className="text-xs text-white/50 mt-1">Based on financial transparency and on-ground impact data.</div>
              </div>
              <div className="bg-gradient-to-br from-primary/10 to-transparent p-4 rounded-xl border border-primary/20">
                <div className="text-primary mb-1 flex items-center gap-2"><Award className="w-4 h-4" /> Success Rate</div>
                <div className="text-3xl font-bold text-white">{Math.min(99, detailsModalNGO.trust + 5)}%</div>
                <div className="text-xs text-white/50 mt-1">Campaign success over the last 12 months.</div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Resource Status</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-white/70">Current Funding & Resources</span>
                  <span className="font-semibold text-secondary">{detailsModalNGO.funding}%</span>
                </div>
                <ProgressBar progress={detailsModalNGO.funding} colorClass="bg-secondary" glow={true} />
                <p className="text-xs text-white/50 mt-2">
                  {detailsModalNGO.funding < 50 ? 'Urgent support needed to reach operational goals.' : 'Pacing well, but additional support extends their reach.'}
                </p>
              </div>
            </div>

            <div className="pt-4 flex gap-3">
              <Button variant="primary" className="flex-1" onClick={() => {
                setSupportModalNGO(detailsModalNGO);
                setDetailsModalNGO(null);
              }}>
                Support this NGO
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Support / Donate Modal */}
      <Modal 
        isOpen={!!supportModalNGO} 
        onClose={() => setSupportModalNGO(null)}
        title={`Support ${supportModalNGO?.name}`}
      >
        {supportModalNGO && (
          <form onSubmit={handleSupportSubmit} className="space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <p className="text-white/80 text-sm mb-4">
                Your contribution will directly assist <span className="font-semibold text-secondary">{supportModalNGO.name}</span> in their operations in {supportModalNGO.location}.
              </p>
              
              <div className="space-y-3">
                <label className="text-sm font-medium text-white/70">Select Amount (USD)</label>
                <div className="grid grid-cols-3 gap-3">
                  {[25, 50, 100].map(amount => (
                    <button
                      key={amount}
                      type="button"
                      onClick={() => setSupportAmount(amount)}
                      className={`py-2 rounded-lg text-sm font-semibold transition-all border ${
                        supportAmount === amount 
                          ? 'bg-secondary/20 border-secondary text-white' 
                          : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10'
                      }`}
                    >
                      ${amount}
                    </button>
                  ))}
                </div>
                <div className="relative mt-2">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50">$</span>
                  <input 
                    type="number" 
                    value={supportAmount}
                    onChange={(e) => setSupportAmount(Number(e.target.value))}
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
                  <CheckCircle className="w-4 h-4 text-secondary" /> Credit Card
                </button>
                <button type="button" className="flex items-center justify-center gap-2 py-3 bg-white/5 border border-white/10 rounded-lg text-white/60 hover:bg-white/10">
                  Crypto / Web3
                </button>
              </div>
            </div>

            <Button type="submit" variant="primary" className="w-full py-3 text-lg shadow-[0_0_20px_rgba(124,92,255,0.4)]">
              Confirm Contribution of ${supportAmount}
            </Button>
            <p className="text-center text-xs text-white/40 flex items-center justify-center gap-1">
              <ShieldCheck className="w-3 h-3" /> Secure AI-verified transaction
            </p>
          </form>
        )}
      </Modal>
    </div>
  );
}
