import { motion } from 'motion/react';
import { Users, MapPin, Brain, CheckCircle, Clock, TrendingUp, Sparkles, Target } from 'lucide-react';
import { type Volunteer, type NGO, type Request, calculateMatchScore } from '../data';

interface VolunteerDashboardProps {
  volunteer: Volunteer;
  ngos: NGO[];
  requests: Request[];
  onAcceptRequest: (requestId: string) => void;
  onAddNotification: (message: string, type: 'match' | 'request' | 'donation') => void;
}

export function VolunteerDashboard({ volunteer, ngos, requests, onAcceptRequest, onAddNotification }: VolunteerDashboardProps) {
  const topMatches = ngos
    .map(ngo => ({
      ngo,
      score: calculateMatchScore(volunteer, ngo)
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 6);

  const openRequests = requests
    .filter(r => r.status === 'open')
    .map(req => {
      const ngo = ngos.find(n => n.id === req.ngoId);
      return { request: req, ngo };
    })
    .filter(item => item.ngo !== undefined)
    .slice(0, 5);

  const myRequests = requests.filter(r => r.acceptedBy === volunteer.id);

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2">Welcome, {volunteer.name}!</h1>
          <p className="text-gray-300 mb-6">Your skills: {volunteer.skills.join(', ')}</p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl">
              <p className="text-sm text-gray-400 mb-1">Tasks Completed</p>
              <p className="text-2xl font-bold text-green-400">{myRequests.filter(r => r.status === 'fulfilled').length}</p>
            </div>
            <div className="p-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl">
              <p className="text-sm text-gray-400 mb-1">Active Tasks</p>
              <p className="text-2xl font-bold text-blue-400">{myRequests.filter(r => r.status === 'in-progress').length}</p>
            </div>
            <div className="p-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl">
              <p className="text-sm text-gray-400 mb-1">NGOs Helped</p>
              <p className="text-2xl font-bold text-purple-400">{new Set(myRequests.map(r => r.ngoId)).size}</p>
            </div>
            <div className="p-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl">
              <p className="text-sm text-gray-400 mb-1">Availability</p>
              <p className="text-2xl font-bold text-orange-400 capitalize">{volunteer.availability}</p>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* AI Matched NGOs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/30 rounded-2xl p-6"
            >
              <div className="flex items-center gap-2 mb-6">
                <Brain className="w-6 h-6 text-purple-400" />
                <h3 className="text-xl font-bold text-white">AI-Matched NGOs for You</h3>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {topMatches.map((match, i) => (
                  <motion.div
                    key={match.ngo.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="p-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl hover:border-purple-500/30 transition-all group"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="text-white font-bold mb-1">{match.ngo.name}</h4>
                        <p className="text-xs text-gray-400 flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {match.ngo.location.city}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <div className="flex items-center gap-1 px-2 py-1 bg-purple-500/20 rounded">
                          <Sparkles className="w-3 h-3 text-purple-400" />
                          <span className="text-purple-400 font-bold text-sm">{match.score}%</span>
                        </div>
                        <div className={`px-2 py-0.5 rounded text-xs ${
                          match.ngo.urgency > 80
                            ? 'bg-red-500/20 text-red-400'
                            : match.ngo.urgency > 60
                            ? 'bg-orange-500/20 text-orange-400'
                            : 'bg-green-500/20 text-green-400'
                        }`}>
                          {match.ngo.urgency}% urgent
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-300 text-sm mb-3 line-clamp-2">{match.ngo.description}</p>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400 capitalize">{match.ngo.category.replace('-', ' ')}</span>
                      <span className="text-xs text-blue-400">{match.ngo.volunteersNeeded} needed</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Available Requests */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
            >
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-orange-400" />
                Available Requests ({openRequests.length})
              </h3>

              <div className="space-y-3">
                {openRequests.length === 0 ? (
                  <div className="text-center py-8 text-gray-400">
                    No open requests at the moment. Check back soon!
                  </div>
                ) : (
                  openRequests.map(({ request, ngo }, i) => (
                    <motion.div
                      key={request.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="p-4 bg-white/5 rounded-xl border border-white/10 hover:border-orange-500/30 transition-all"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="text-white font-medium">{ngo?.name}</p>
                          <p className="text-sm text-gray-400 capitalize">{request.type} Request</p>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-xs ${
                          request.urgency > 80
                            ? 'bg-red-500/20 text-red-400'
                            : 'bg-orange-500/20 text-orange-400'
                        }`}>
                          Urgency: {request.urgency}%
                        </div>
                      </div>

                      <p className="text-gray-300 text-sm mb-3">{request.description}</p>

                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-2">
                          {request.skills?.map(skill => (
                            <span
                              key={skill}
                              className="px-2 py-1 bg-purple-500/20 border border-purple-500/30 rounded text-xs text-purple-300"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>

                        <motion.button
                          onClick={() => {
                            onAcceptRequest(request.id);
                            onAddNotification(`Accepted request from ${ngo?.name}`, 'request');
                          }}
                          className="px-4 py-2 bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 text-green-400 rounded-lg text-sm font-medium transition-all"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Accept
                        </motion.button>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* My Active Tasks */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
            >
              <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-400" />
                My Tasks
              </h3>

              <div className="space-y-3">
                {myRequests.length === 0 ? (
                  <div className="text-center py-4 text-gray-400 text-sm">
                    No tasks yet. Accept requests to get started!
                  </div>
                ) : (
                  myRequests.map((request, i) => {
                    const ngo = ngos.find(n => n.id === request.ngoId);
                    return (
                      <motion.div
                        key={request.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + i * 0.1 }}
                        className={`p-3 rounded-lg border ${
                          request.status === 'fulfilled'
                            ? 'bg-green-500/10 border-green-500/30'
                            : 'bg-blue-500/10 border-blue-500/30'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-1">
                          <p className="text-white font-medium text-sm">{ngo?.name}</p>
                          {request.status === 'fulfilled' && (
                            <CheckCircle className="w-4 h-4 text-green-400" />
                          )}
                        </div>
                        <p className="text-xs text-gray-400 capitalize">{request.type}</p>
                      </motion.div>
                    );
                  })
                )}
              </div>
            </motion.div>

            {/* Impact Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-2xl p-6"
            >
              <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-400" />
                Your Impact
              </h3>

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Hours Volunteered</p>
                  <p className="text-3xl font-bold text-white">48</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">Lives Impacted</p>
                  <p className="text-3xl font-bold text-white">156</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">Success Rate</p>
                  <p className="text-3xl font-bold text-green-400">95%</p>
                </div>
              </div>
            </motion.div>

            {/* Location */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
            >
              <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-purple-400" />
                Location
              </h3>

              <p className="text-gray-300">{volunteer.location.city}</p>
              <p className="text-sm text-gray-400 mt-2">
                Matching within 50km radius
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
