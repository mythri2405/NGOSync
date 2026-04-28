import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, TrendingUp, Users, X, Check, CreditCard, Shield, Sparkles } from 'lucide-react';
import { type Campaign, type NGO, type Donor, recommendNGOsForDonor } from '../data';

interface DonationMarketplaceProps {
  campaigns: Campaign[];
  ngos: NGO[];
  donor?: Donor;
  onDonate: (message: string, type: 'donation') => void;
}

export function DonationMarketplace({ campaigns, ngos, donor, onDonate }: DonationMarketplaceProps) {
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [donationAmount, setDonationAmount] = useState('');
  const [showPayment, setShowPayment] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [filter, setFilter] = useState<'all' | 'urgent' | 'recommended'>('all');

  const recommendedNGOs = donor ? recommendNGOsForDonor(donor, ngos, campaigns) : [];

  const filteredCampaigns = campaigns.filter(camp => {
    if (filter === 'urgent') return camp.urgency === 'critical' || camp.urgency === 'high';
    if (filter === 'recommended' && donor) {
      return recommendedNGOs.some(ngo => ngo.id === camp.ngoId);
    }
    return true;
  });

  const handleDonateClick = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    setDonationAmount('');
    setShowPayment(true);
    setSuccess(false);
  };

  const handlePayment = () => {
    if (!donationAmount || parseFloat(donationAmount) <= 0) return;

    setProcessing(true);

    setTimeout(() => {
      setProcessing(false);
      setSuccess(true);

      const ngo = ngos.find(n => n.id === selectedCampaign?.ngoId);
      onDonate(`Successfully donated ₹${donationAmount} to ${ngo?.name}`, 'donation');

      setTimeout(() => {
        setShowPayment(false);
        setSelectedCampaign(null);
      }, 2000);
    }, 2000);
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'critical': return 'text-red-400 bg-red-500/20';
      case 'high': return 'text-orange-400 bg-orange-500/20';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20';
      default: return 'text-green-400 bg-green-500/20';
    }
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Donation Marketplace
            </span>
          </h1>
          <p className="text-gray-300 text-lg mb-6">
            Support verified causes and track your impact in real-time
          </p>

          {/* Filters */}
          <div className="flex flex-wrap gap-3">
            {[
              { value: 'all', label: 'All Causes', icon: Heart },
              { value: 'urgent', label: 'Urgent Needs', icon: TrendingUp },
              { value: 'recommended', label: 'Recommended for You', icon: Sparkles }
            ].map(({ value, label, icon: Icon }) => (
              <motion.button
                key={value}
                onClick={() => setFilter(value as any)}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${
                  filter === value
                    ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                    : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon className="w-4 h-4" />
                {label}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Recommended Section */}
        {donor && filter === 'recommended' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-2xl"
          >
            <div className="flex items-center gap-3 mb-2">
              <Sparkles className="w-6 h-6 text-purple-400" />
              <h2 className="text-xl font-bold text-white">AI Recommendations for You</h2>
            </div>
            <p className="text-gray-300">
              Based on your preferences: {donor.preferredCauses.join(', ')} and location
            </p>
          </motion.div>
        )}

        {/* Campaigns Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCampaigns.map((campaign, i) => {
            const ngo = ngos.find(n => n.id === campaign.ngoId);
            const progress = (campaign.raised / campaign.goal) * 100;

            return (
              <motion.div
                key={campaign.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:border-purple-500/30 transition-all"
                whileHover={{ y: -5 }}
              >
                {/* Urgency Badge */}
                <div className="absolute top-4 right-4 z-10">
                  <div className={`px-3 py-1 rounded-full text-xs font-medium uppercase ${getUrgencyColor(campaign.urgency)}`}>
                    {campaign.urgency}
                  </div>
                </div>

                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={campaign.image}
                    alt={campaign.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                  {/* NGO Badge */}
                  {ngo?.verified && (
                    <div className="absolute bottom-3 left-3 px-2 py-1 bg-green-500/20 border border-green-500/30 rounded-lg flex items-center gap-1">
                      <Shield className="w-3 h-3 text-green-400" />
                      <span className="text-xs text-green-400">Verified</span>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  {/* NGO Name */}
                  <p className="text-sm text-purple-400 font-medium mb-2">{ngo?.name}</p>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-3">{campaign.title}</h3>

                  {/* Description */}
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">{campaign.description}</p>

                  {/* Progress */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-gray-300">
                        ₹{campaign.raised.toLocaleString()} raised
                      </span>
                      <span className="text-gray-400">
                        {progress.toFixed(0)}%
                      </span>
                    </div>

                    <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 1, delay: i * 0.1 }}
                        className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                      />
                    </div>

                    <div className="flex items-center justify-between text-xs text-gray-400 mt-2">
                      <span>Goal: ₹{campaign.goal.toLocaleString()}</span>
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {campaign.donorCount} donors
                      </div>
                    </div>
                  </div>

                  {/* Donate Button */}
                  <motion.button
                    onClick={() => handleDonateClick(campaign)}
                    className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-purple-500/50 transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Heart className="w-4 h-4" />
                    Donate Now
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Payment Modal */}
        <AnimatePresence>
          {showPayment && selectedCampaign && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => !processing && setShowPayment(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-gradient-to-br from-slate-900 to-slate-800 border border-white/10 rounded-2xl p-6 max-w-md w-full"
              >
                {!success ? (
                  <>
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-1">Make a Donation</h3>
                        <p className="text-gray-400">{selectedCampaign.title}</p>
                      </div>
                      <button
                        onClick={() => !processing && setShowPayment(false)}
                        className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                        disabled={processing}
                      >
                        <X className="w-5 h-5 text-gray-400" />
                      </button>
                    </div>

                    {/* Amount Input */}
                    <div className="mb-6">
                      <label className="block text-white mb-2">Donation Amount</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">₹</span>
                        <input
                          type="number"
                          value={donationAmount}
                          onChange={(e) => setDonationAmount(e.target.value)}
                          placeholder="0"
                          className="w-full pl-8 pr-4 py-4 bg-white/10 border border-white/20 rounded-lg text-white text-2xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                          disabled={processing}
                        />
                      </div>

                      {/* Quick Amounts */}
                      <div className="grid grid-cols-4 gap-2 mt-3">
                        {[500, 1000, 2500, 5000].map(amount => (
                          <button
                            key={amount}
                            onClick={() => setDonationAmount(amount.toString())}
                            className="px-3 py-2 bg-white/5 hover:bg-purple-500/20 border border-white/10 hover:border-purple-500/30 rounded-lg text-gray-300 text-sm transition-all"
                            disabled={processing}
                          >
                            ₹{amount}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Mock Payment Details */}
                    <div className="mb-6 space-y-3">
                      <div>
                        <label className="block text-white mb-2 text-sm">Card Number</label>
                        <input
                          type="text"
                          placeholder="1234 5678 9012 3456"
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                          disabled={processing}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-white mb-2 text-sm">Expiry</label>
                          <input
                            type="text"
                            placeholder="MM/YY"
                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                            disabled={processing}
                          />
                        </div>
                        <div>
                          <label className="block text-white mb-2 text-sm">CVV</label>
                          <input
                            type="text"
                            placeholder="123"
                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                            disabled={processing}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Security Badge */}
                    <div className="flex items-center gap-2 mb-6 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                      <Shield className="w-5 h-5 text-green-400" />
                      <span className="text-sm text-green-400">Secure payment • 256-bit encryption</span>
                    </div>

                    {/* Submit Button */}
                    <motion.button
                      onClick={handlePayment}
                      disabled={processing || !donationAmount || parseFloat(donationAmount) <= 0}
                      className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-purple-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      whileHover={!processing ? { scale: 1.02 } : {}}
                      whileTap={!processing ? { scale: 0.98 } : {}}
                    >
                      {processing ? (
                        <>
                          <motion.div
                            className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          />
                          Processing...
                        </>
                      ) : (
                        <>
                          <CreditCard className="w-5 h-5" />
                          Donate ₹{donationAmount || 0}
                        </>
                      )}
                    </motion.button>
                  </>
                ) : (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center py-8"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', duration: 0.6 }}
                      className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6"
                    >
                      <Check className="w-10 h-10 text-white" />
                    </motion.div>

                    <h3 className="text-3xl font-bold text-white mb-2">Thank You!</h3>
                    <p className="text-gray-300 mb-6">
                      Your donation of ₹{donationAmount} has been processed successfully
                    </p>

                    <div className="flex items-center justify-center gap-2 text-green-400">
                      <Heart className="w-5 h-5" />
                      <span>Making real impact together</span>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
