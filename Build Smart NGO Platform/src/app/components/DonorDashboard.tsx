import { useState } from 'react';
import { motion } from 'motion/react';
import { Heart, TrendingUp, Sparkles, MapPin, Shield, Star, DollarSign } from 'lucide-react';
import { type Donor, type NGO, type Campaign, recommendNGOsForDonor } from '../data';

interface DonorDashboardProps {
  donor: Donor;
  ngos: NGO[];
  campaigns: Campaign[];
  onDonate: (message: string, type: 'donation') => void;
}

export function DonorDashboard({ donor, ngos, campaigns, onDonate }: DonorDashboardProps) {
  const [showAll, setShowAll] = useState(false);

  const recommendedNGOs = recommendNGOsForDonor(donor, ngos, campaigns);
  const favoriteNGOs = ngos.filter(ngo => donor.favoriteNGOs.includes(ngo.id));
  const urgentCampaigns = campaigns.filter(c => c.urgency === 'critical' || c.urgency === 'high').slice(0, 3);

  const totalDonated = donor.donationHistory.reduce((sum, d) => sum + d.amount, 0);
  const thisMonthDonations = donor.donationHistory
    .filter(d => new Date(d.date).getMonth() === new Date().getMonth())
    .reduce((sum, d) => sum + d.amount, 0);

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2">Welcome back, {donor.name}!</h1>
          <p className="text-gray-300 mb-6">Your preferred causes: {donor.preferredCauses.join(', ')}</p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl">
              <p className="text-sm text-gray-400 mb-1">Total Donated</p>
              <p className="text-2xl font-bold text-green-400">₹{totalDonated.toLocaleString()}</p>
            </div>
            <div className="p-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl">
              <p className="text-sm text-gray-400 mb-1">This Month</p>
              <p className="text-2xl font-bold text-purple-400">₹{thisMonthDonations.toLocaleString()}</p>
            </div>
            <div className="p-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl">
              <p className="text-sm text-gray-400 mb-1">NGOs Supported</p>
              <p className="text-2xl font-bold text-blue-400">{new Set(donor.donationHistory.map(d => d.ngoId)).size}</p>
            </div>
            <div className="p-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl">
              <p className="text-sm text-gray-400 mb-1">Lives Impacted</p>
              <p className="text-2xl font-bold text-orange-400">{Math.round(totalDonated / 1000)}</p>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* AI Recommendations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-2xl p-6"
            >
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="w-6 h-6 text-purple-400" />
                <h3 className="text-xl font-bold text-white">AI-Recommended for You</h3>
              </div>

              <p className="text-gray-300 mb-6">
                Based on your interests and donation history, we recommend these verified NGOs
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                {recommendedNGOs.slice(0, showAll ? 6 : 4).map((ngo, i) => {
                  const campaign = campaigns.find(c => c.ngoId === ngo.id);

                  return (
                    <motion.div
                      key={ngo.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="p-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl hover:border-purple-500/30 transition-all group"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="text-white font-bold mb-1">{ngo.name}</h4>
                          <p className="text-xs text-gray-400 flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {ngo.location.city}
                          </p>
                        </div>
                        {ngo.verified && (
                          <div className="px-2 py-1 bg-green-500/20 border border-green-500/30 rounded flex items-center gap-1">
                            <Shield className="w-3 h-3 text-green-400" />
                            <span className="text-xs text-green-400">Verified</span>
                          </div>
                        )}
                      </div>

                      <p className="text-gray-300 text-sm mb-3 line-clamp-2">{ngo.description}</p>

                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                          <span className="text-sm text-white">{ngo.trustScore}% Trust</span>
                        </div>
                        <span className="text-xs text-purple-400 capitalize">{ngo.category.replace('-', ' ')}</span>
                      </div>

                      {campaign && (
                        <div className="mb-3">
                          <div className="flex justify-between text-xs text-gray-400 mb-1">
                            <span>₹{campaign.raised.toLocaleString()}</span>
                            <span>₹{campaign.goal.toLocaleString()}</span>
                          </div>
                          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                              style={{ width: `${(campaign.raised / campaign.goal) * 100}%` }}
                            />
                          </div>
                        </div>
                      )}

                      <motion.button
                        onClick={() => onDonate(`View campaign details for ${ngo.name}`, 'donation')}
                        className="w-full py-2 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 text-purple-300 rounded-lg text-sm font-medium transition-all"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        View Campaign
                      </motion.button>
                    </motion.div>
                  );
                })}
              </div>

              {recommendedNGOs.length > 4 && (
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="mt-4 text-purple-400 hover:text-purple-300 text-sm font-medium"
                >
                  {showAll ? 'Show Less' : `Show ${recommendedNGOs.length - 4} More`}
                </button>
              )}
            </motion.div>

            {/* Donation History */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
            >
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-400" />
                Recent Donations
              </h3>

              <div className="space-y-3">
                {donor.donationHistory.length === 0 ? (
                  <div className="text-center py-8 text-gray-400">
                    No donations yet. Start supporting a cause today!
                  </div>
                ) : (
                  donor.donationHistory.slice(0, 5).map((donation, i) => {
                    const ngo = ngos.find(n => n.id === donation.ngoId);

                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="p-4 bg-white/5 rounded-xl border border-white/10 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                            <Heart className="w-5 h-5 text-green-400" />
                          </div>
                          <div>
                            <p className="text-white font-medium">{ngo?.name || 'NGO'}</p>
                            <p className="text-xs text-gray-400">
                              {new Date(donation.date).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-green-400 font-bold">₹{donation.amount.toLocaleString()}</p>
                        </div>
                      </motion.div>
                    );
                  })
                )}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Urgent Causes */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-red-500/30 rounded-2xl p-6"
            >
              <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                <Heart className="w-5 h-5 text-red-400" />
                Urgent Causes
              </h3>

              <div className="space-y-3">
                {urgentCampaigns.map((campaign, i) => {
                  const ngo = ngos.find(n => n.id === campaign.ngoId);

                  return (
                    <motion.div
                      key={campaign.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + i * 0.1 }}
                      className="p-3 bg-white/5 rounded-lg border border-red-500/20"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <p className="text-white font-medium text-sm">{ngo?.name}</p>
                        <div className="px-2 py-0.5 bg-red-500/20 rounded text-xs text-red-400 uppercase">
                          {campaign.urgency}
                        </div>
                      </div>
                      <p className="text-xs text-gray-400 mb-2 line-clamp-2">{campaign.title}</p>
                      <div className="text-xs text-red-300">
                        ₹{(campaign.goal - campaign.raised).toLocaleString()} needed
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Favorite NGOs */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
            >
              <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-400" />
                Favorites
              </h3>

              <div className="space-y-3">
                {favoriteNGOs.length === 0 ? (
                  <div className="text-center py-4 text-gray-400 text-sm">
                    No favorites yet. Star NGOs to save them here!
                  </div>
                ) : (
                  favoriteNGOs.map((ngo, i) => (
                    <motion.div
                      key={ngo.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                      className="p-3 bg-white/5 rounded-lg"
                    >
                      <p className="text-white font-medium text-sm">{ngo.name}</p>
                      <p className="text-xs text-gray-400">{ngo.location.city}</p>
                    </motion.div>
                  ))
                )}
              </div>
            </motion.div>

            {/* Impact */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/30 rounded-2xl p-6"
            >
              <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-purple-400" />
                Your Impact
              </h3>

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-400 mb-1">People Fed</p>
                  <p className="text-2xl font-bold text-white">{Math.round(totalDonated / 500)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">Children Educated</p>
                  <p className="text-2xl font-bold text-white">{Math.round(totalDonated / 2000)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">Impact Score</p>
                  <p className="text-2xl font-bold text-purple-400">A+</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
