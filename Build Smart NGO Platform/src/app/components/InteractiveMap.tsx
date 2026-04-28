import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Users, TrendingUp, X, Zap, Navigation, AlertCircle } from 'lucide-react';
import { type NGO, type Volunteer, calculateMatchScore, predictHighDemandZones, getPriorityNGOs } from '../data';

interface InteractiveMapProps {
  ngos: NGO[];
  volunteers: Volunteer[];
  userRole: 'ngo' | 'volunteer' | 'donor';
  onAddNotification: (message: string, type: 'match' | 'request' | 'donation') => void;
}

export function InteractiveMap({ ngos, volunteers, userRole, onAddNotification }: InteractiveMapProps) {
  const [selectedNGO, setSelectedNGO] = useState<NGO | null>(null);
  const [showHeatmap, setShowHeatmap] = useState(true);
  const [matchingMode, setMatchingMode] = useState(false);

  const demandZones = predictHighDemandZones(ngos);
  const priorityNGOs = getPriorityNGOs(ngos);

  const handleMatch = (ngo: NGO) => {
    setMatchingMode(true);
    setTimeout(() => {
      onAddNotification(
        `AI matched 3 volunteers with ${ngo.name}`,
        'match'
      );
      setMatchingMode(false);
    }, 2000);
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
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              AI-Powered Smart Map
            </span>
          </h1>
          <p className="text-gray-300 text-lg">
            Real-time visualization of NGOs, volunteers, and high-demand zones
          </p>

          {/* Controls */}
          <div className="flex flex-wrap gap-3 mt-6">
            <motion.button
              onClick={() => setShowHeatmap(!showHeatmap)}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${
                showHeatmap
                  ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                  : 'bg-white/5 text-gray-400 border border-white/10'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <TrendingUp className="w-4 h-4" />
              Demand Heatmap
            </motion.button>

            <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full" />
                <span className="text-sm text-gray-300">NGOs ({ngos.length})</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full" />
                <span className="text-sm text-gray-300">Volunteers ({volunteers.length})</span>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Map */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative h-[600px] bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl overflow-hidden border border-white/10"
            >
              {/* Map Background */}
              <div className="absolute inset-0 opacity-20">
                <svg className="w-full h-full" viewBox="0 0 800 600">
                  <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" opacity="0.1" />
                    </pattern>
                  </defs>
                  <rect width="800" height="600" fill="url(#grid)" />
                </svg>
              </div>

              {/* Heatmap Overlay */}
              {showHeatmap && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 pointer-events-none"
                >
                  {demandZones.slice(0, 5).map((zone, i) => (
                    <motion.div
                      key={zone.city}
                      className="absolute rounded-full blur-3xl"
                      style={{
                        width: `${zone.demand * 2}px`,
                        height: `${zone.demand * 2}px`,
                        left: `${(i * 150) % 600}px`,
                        top: `${((i * 120) % 400) + 50}px`,
                        background: `radial-gradient(circle, rgba(239, 68, 68, ${zone.demand / 150}) 0%, transparent 70%)`
                      }}
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 0.8, 0.5]
                      }}
                      transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                    />
                  ))}
                </motion.div>
              )}

              {/* NGO Markers */}
              {ngos.map((ngo, i) => {
                const x = ((i * 157) % 600) + 50;
                const y = ((i * 211) % 450) + 50;
                const isPriority = priorityNGOs.some(p => p.id === ngo.id);

                return (
                  <motion.button
                    key={ngo.id}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => setSelectedNGO(ngo)}
                    className="absolute group"
                    style={{ left: `${x}px`, top: `${y}px` }}
                    whileHover={{ scale: 1.3 }}
                  >
                    {/* Urgency Ring */}
                    {isPriority && (
                      <motion.div
                        className="absolute -inset-2 rounded-full border-2 border-orange-500"
                        animate={{
                          scale: [1, 1.5],
                          opacity: [1, 0]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}

                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shadow-lg ${
                        isPriority ? 'bg-orange-500' : 'bg-red-500'
                      }`}
                      style={{
                        boxShadow: `0 0 ${ngo.urgency / 3}px ${isPriority ? '#f97316' : '#ef4444'}`
                      }}
                    >
                      <MapPin className="w-4 h-4 text-white" />
                    </div>

                    {/* Tooltip */}
                    <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                      <div className="bg-black/90 backdrop-blur-xl px-3 py-2 rounded-lg border border-white/20">
                        <p className="text-white text-sm font-medium">{ngo.name}</p>
                        <p className="text-xs text-gray-400">{ngo.category}</p>
                      </div>
                    </div>
                  </motion.button>
                );
              })}

              {/* Volunteer Markers */}
              {volunteers.slice(0, 8).map((vol, i) => {
                const x = ((i * 193) % 600) + 100;
                const y = ((i * 167) % 450) + 100;

                return (
                  <motion.div
                    key={vol.id}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + i * 0.05 }}
                    className="absolute"
                    style={{ left: `${x}px`, top: `${y}px` }}
                  >
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                      <Users className="w-3 h-3 text-white" />
                    </div>
                  </motion.div>
                );
              })}

              {/* Matching Animation */}
              {matchingMode && selectedNGO && (
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 bg-gradient-to-r from-blue-500 to-red-500"
                      style={{
                        left: `${((i * 193) % 600) + 100}px`,
                        top: `${((i * 167) % 450) + 100}px`,
                        transformOrigin: 'top left'
                      }}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{
                        height: '100px',
                        opacity: [0, 1, 0]
                      }}
                      transition={{ duration: 1.5, delay: i * 0.2 }}
                    />
                  ))}
                </motion.div>
              )}

              {/* Legend */}
              <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-xl rounded-lg p-3 border border-white/10">
                <div className="text-xs text-gray-300 space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-orange-500 rounded-full" />
                    <span>High Priority NGOs</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-400/50 rounded-full blur-sm" />
                    <span>High Demand Zones</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Demand Zones */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <AlertCircle className="w-5 h-5 text-orange-400" />
                <h3 className="text-white font-bold">High Demand Zones</h3>
              </div>

              <div className="space-y-3">
                {demandZones.slice(0, 5).map((zone, i) => (
                  <motion.div
                    key={zone.city}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all"
                  >
                    <div>
                      <p className="text-white font-medium">{zone.city}</p>
                      <p className="text-xs text-gray-400 capitalize">{zone.category}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-orange-400 font-bold">{zone.demand}%</div>
                      <div className="text-xs text-gray-400">demand</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Priority NGOs */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <Zap className="w-5 h-5 text-purple-400" />
                <h3 className="text-white font-bold">Top Priority NGOs</h3>
              </div>

              <div className="space-y-3">
                {priorityNGOs.map((ngo, i) => (
                  <motion.button
                    key={ngo.id}
                    onClick={() => setSelectedNGO(ngo)}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="w-full text-left p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <p className="text-white font-medium text-sm">{ngo.name}</p>
                      <div className="flex items-center gap-1 px-2 py-1 bg-orange-500/20 rounded text-xs text-orange-400">
                        <Zap className="w-3 h-3" />
                        {ngo.urgency}
                      </div>
                    </div>
                    <p className="text-xs text-gray-400">{ngo.location.city}</p>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* NGO Detail Modal */}
        <AnimatePresence>
          {selectedNGO && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedNGO(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-gradient-to-br from-slate-900 to-slate-800 border border-white/10 rounded-2xl p-6 max-w-md w-full"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">{selectedNGO.name}</h3>
                    <p className="text-gray-400">{selectedNGO.location.city}</p>
                  </div>
                  <button
                    onClick={() => setSelectedNGO(null)}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-400" />
                  </button>
                </div>

                <img
                  src={selectedNGO.image}
                  alt={selectedNGO.name}
                  className="w-full h-48 object-cover rounded-xl mb-4"
                />

                <p className="text-gray-300 mb-6">{selectedNGO.description}</p>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="p-3 bg-white/5 rounded-lg">
                    <p className="text-xs text-gray-400 mb-1">Trust Score</p>
                    <p className="text-2xl font-bold text-green-400">{selectedNGO.trustScore}%</p>
                  </div>
                  <div className="p-3 bg-white/5 rounded-lg">
                    <p className="text-xs text-gray-400 mb-1">Urgency</p>
                    <p className="text-2xl font-bold text-orange-400">{selectedNGO.urgency}%</p>
                  </div>
                  <div className="p-3 bg-white/5 rounded-lg">
                    <p className="text-xs text-gray-400 mb-1">Volunteers Needed</p>
                    <p className="text-2xl font-bold text-blue-400">{selectedNGO.volunteersNeeded}</p>
                  </div>
                  <div className="p-3 bg-white/5 rounded-lg">
                    <p className="text-xs text-gray-400 mb-1">Category</p>
                    <p className="text-sm font-medium text-purple-400 capitalize">{selectedNGO.category.replace('-', ' ')}</p>
                  </div>
                </div>

                {userRole === 'volunteer' && (
                  <motion.button
                    onClick={() => handleMatch(selectedNGO)}
                    disabled={matchingMode}
                    className="w-full py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg font-medium flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-purple-500/50 transition-all disabled:opacity-50"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {matchingMode ? (
                      <>
                        <motion.div
                          className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        />
                        AI Matching...
                      </>
                    ) : (
                      <>
                        <Zap className="w-5 h-5" />
                        Get AI Matched
                      </>
                    )}
                  </motion.button>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
