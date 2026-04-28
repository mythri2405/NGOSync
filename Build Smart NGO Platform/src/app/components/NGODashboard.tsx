import { useState } from 'react';
import { motion } from 'motion/react';
import { Users, Send, Brain, TrendingUp, AlertCircle, MessageSquare, Sparkles } from 'lucide-react';
import { type NGO, type Volunteer, type Request, calculateMatchScore, parseNLPRequest } from '../data';

interface NGODashboardProps {
  ngo: NGO;
  volunteers: Volunteer[];
  requests: Request[];
  onCreateRequest: (request: Request) => void;
  onAddNotification: (message: string, type: 'match' | 'request' | 'donation') => void;
}

export function NGODashboard({ ngo, volunteers, requests, onCreateRequest, onAddNotification }: NGODashboardProps) {
  const [requestText, setRequestText] = useState('');
  const [showMatches, setShowMatches] = useState(false);

  const topMatches = volunteers
    .map(vol => ({
      volunteer: vol,
      score: calculateMatchScore(vol, ngo)
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);

  const handleNLPRequest = () => {
    if (!requestText.trim()) return;

    const parsed = parseNLPRequest(requestText);

    const newRequest: Request = {
      id: `req-${Date.now()}`,
      ngoId: ngo.id,
      type: parsed.type || 'volunteers',
      description: requestText,
      quantity: parsed.quantity || 1,
      urgency: parsed.urgency || 50,
      skills: parsed.skills,
      status: 'open',
      createdAt: new Date().toISOString()
    };

    onCreateRequest(newRequest);
    setRequestText('');
    onAddNotification('Request created successfully using AI', 'request');
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
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">{ngo.name}</h1>
              <p className="text-gray-300">{ngo.description}</p>
            </div>
            {ngo.verified && (
              <div className="px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-lg flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full" />
                <span className="text-green-400 font-medium">Verified NGO</span>
              </div>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl">
              <p className="text-sm text-gray-400 mb-1">Trust Score</p>
              <p className="text-2xl font-bold text-green-400">{ngo.trustScore}%</p>
            </div>
            <div className="p-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl">
              <p className="text-sm text-gray-400 mb-1">Urgency Level</p>
              <p className="text-2xl font-bold text-orange-400">{ngo.urgency}%</p>
            </div>
            <div className="p-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl">
              <p className="text-sm text-gray-400 mb-1">Funding Progress</p>
              <p className="text-2xl font-bold text-purple-400">
                {Math.round((ngo.fundingReceived / ngo.fundingGoal) * 100)}%
              </p>
            </div>
            <div className="p-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl">
              <p className="text-sm text-gray-400 mb-1">Volunteers Needed</p>
              <p className="text-2xl font-bold text-blue-400">{ngo.volunteersNeeded}</p>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* AI Request Creator */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-2xl p-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-6 h-6 text-purple-400" />
                <h3 className="text-xl font-bold text-white">AI Request Creator</h3>
              </div>

              <p className="text-gray-300 mb-4">
                Describe what you need in plain language, and AI will create a structured request
              </p>

              <div className="relative">
                <textarea
                  value={requestText}
                  onChange={(e) => setRequestText(e.target.value)}
                  placeholder="e.g., We need 10 volunteers for food drive this weekend..."
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[100px] resize-none"
                />
                <MessageSquare className="absolute top-3 right-3 w-5 h-5 text-gray-400" />
              </div>

              <motion.button
                onClick={handleNLPRequest}
                disabled={!requestText.trim()}
                className="mt-4 w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-purple-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Brain className="w-5 h-5" />
                Create Request with AI
              </motion.button>
            </motion.div>

            {/* Active Requests */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
            >
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-orange-400" />
                Active Requests ({requests.filter(r => r.ngoId === ngo.id && r.status === 'open').length})
              </h3>

              <div className="space-y-3">
                {requests.filter(r => r.ngoId === ngo.id).length === 0 ? (
                  <div className="text-center py-8 text-gray-400">
                    No requests yet. Create one using the AI creator above!
                  </div>
                ) : (
                  requests
                    .filter(r => r.ngoId === ngo.id)
                    .map((request, i) => (
                      <motion.div
                        key={request.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className={`p-4 rounded-xl border ${
                          request.status === 'fulfilled'
                            ? 'bg-green-500/10 border-green-500/30'
                            : request.status === 'in-progress'
                            ? 'bg-blue-500/10 border-blue-500/30'
                            : 'bg-orange-500/10 border-orange-500/30'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="text-white font-medium capitalize">{request.type} Request</p>
                            <p className="text-sm text-gray-400">Quantity: {request.quantity}</p>
                          </div>
                          <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                            request.status === 'fulfilled'
                              ? 'bg-green-500/20 text-green-400'
                              : request.status === 'in-progress'
                              ? 'bg-blue-500/20 text-blue-400'
                              : 'bg-orange-500/20 text-orange-400'
                          }`}>
                            {request.status}
                          </div>
                        </div>

                        <p className="text-gray-300 text-sm mb-3">{request.description}</p>

                        {request.skills && (
                          <div className="flex flex-wrap gap-2">
                            {request.skills.map(skill => (
                              <span
                                key={skill}
                                className="px-2 py-1 bg-purple-500/20 border border-purple-500/30 rounded text-xs text-purple-300"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        )}
                      </motion.div>
                    ))
                )}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* AI Matched Volunteers */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-bold flex items-center gap-2">
                  <Brain className="w-5 h-5 text-purple-400" />
                  AI Matches
                </h3>
                <button
                  onClick={() => setShowMatches(!showMatches)}
                  className="text-sm text-purple-400 hover:text-purple-300"
                >
                  {showMatches ? 'Hide' : 'Show All'}
                </button>
              </div>

              <div className="space-y-3">
                {topMatches.slice(0, showMatches ? 5 : 3).map((match, i) => (
                  <motion.div
                    key={match.volunteer.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="text-white font-medium">{match.volunteer.name}</p>
                        <p className="text-xs text-gray-400">{match.volunteer.location.city}</p>
                      </div>
                      <div className="flex items-center gap-1 px-2 py-1 bg-purple-500/20 rounded text-xs">
                        <Sparkles className="w-3 h-3 text-purple-400" />
                        <span className="text-purple-400 font-bold">{match.score}%</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-2">
                      {match.volunteer.skills.slice(0, 3).map(skill => (
                        <span
                          key={skill}
                          className="px-2 py-0.5 bg-blue-500/20 rounded text-xs text-blue-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    <div className="text-xs text-gray-400 capitalize">
                      {match.volunteer.availability}
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.button
                onClick={() => onAddNotification('Contacted top 3 matched volunteers', 'match')}
                className="mt-4 w-full py-2 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 text-purple-300 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Send className="w-4 h-4" />
                Contact Top Matches
              </motion.button>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
            >
              <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-400" />
                This Month
              </h3>

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-400 mb-1">New Volunteers</p>
                  <p className="text-2xl font-bold text-white">+12</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">Donations Received</p>
                  <p className="text-2xl font-bold text-white">₹{ngo.fundingReceived.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">Requests Fulfilled</p>
                  <p className="text-2xl font-bold text-white">{requests.filter(r => r.status === 'fulfilled').length}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
