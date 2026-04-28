import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { TrendingUp, Users, Heart, Building2, Clock, Target, Zap, Award } from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { type NGO, type Volunteer, type Campaign } from '../data';

interface ImpactDashboardProps {
  ngos: NGO[];
  volunteers: Volunteer[];
  campaigns: Campaign[];
}

export function ImpactDashboard({ ngos, volunteers, campaigns }: ImpactDashboardProps) {
  const totalDonations = campaigns.reduce((sum, c) => sum + c.raised, 0);
  const totalDonors = campaigns.reduce((sum, c) => sum + c.donorCount, 0);

  const categoryData = [
    { name: 'Food', value: ngos.filter(n => n.category === 'food').length, color: '#f97316' },
    { name: 'Education', value: ngos.filter(n => n.category === 'education').length, color: '#3b82f6' },
    { name: 'Healthcare', value: ngos.filter(n => n.category === 'healthcare').length, color: '#10b981' },
    { name: 'Animal Welfare', value: ngos.filter(n => n.category === 'animal-welfare').length, color: '#8b5cf6' },
    { name: 'Disaster Relief', value: ngos.filter(n => n.category === 'disaster-relief').length, color: '#ef4444' },
    { name: 'Environment', value: ngos.filter(n => n.category === 'environment').length, color: '#14b8a6' }
  ];

  const monthlyData = [
    { month: 'Jan', donations: 1200000, volunteers: 120 },
    { month: 'Feb', donations: 1500000, volunteers: 145 },
    { month: 'Mar', donations: 1800000, volunteers: 178 },
    { month: 'Apr', donations: 2100000, volunteers: 210 },
    { month: 'May', donations: 2400000, volunteers: 245 },
    { month: 'Jun', donations: totalDonations, volunteers: volunteers.length }
  ];

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
              Impact Dashboard
            </span>
          </h1>
          <p className="text-gray-300 text-lg">
            Real-time analytics and measurable social impact
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <AnimatedStat
            icon={Building2}
            label="Active NGOs"
            value={ngos.length}
            suffix="+"
            color="from-purple-500 to-pink-500"
            delay={0}
          />
          <AnimatedStat
            icon={Users}
            label="Volunteers Matched"
            value={volunteers.length}
            suffix="K+"
            color="from-blue-500 to-cyan-500"
            delay={0.1}
          />
          <AnimatedStat
            icon={Heart}
            label="Total Donations"
            value={Math.round(totalDonations / 100000)}
            prefix="₹"
            suffix="L"
            color="from-rose-500 to-orange-500"
            delay={0.2}
          />
          <AnimatedStat
            icon={TrendingUp}
            label="Lives Impacted"
            value={totalDonors}
            suffix="K+"
            color="from-green-500 to-emerald-500"
            delay={0.3}
          />
        </div>

        {/* Charts Grid */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Donation Trends */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
          >
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-purple-400" />
              Donation Trends
            </h3>

            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient id="colorDonations" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="month" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="donations"
                  stroke="#a855f7"
                  fillOpacity={1}
                  fill="url(#colorDonations)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Category Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
          >
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Target className="w-5 h-5 text-purple-400" />
              NGO Categories
            </h3>

            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Volunteer Growth */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mb-8"
        >
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Users className="w-5 h-5 text-purple-400" />
            Volunteer Growth
          </h3>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="month" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(0,0,0,0.8)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  color: '#fff'
                }}
              />
              <Bar dataKey="volunteers" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Impact Metrics */}
        <div className="grid md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7 }}
            className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <h4 className="text-white font-bold">Time Saved</h4>
                <p className="text-sm text-gray-400">Using AI matching</p>
              </div>
            </div>
            <div className="text-4xl font-bold text-white mb-2">2,400</div>
            <p className="text-purple-300">hours saved this month</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
            className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h4 className="text-white font-bold">Match Efficiency</h4>
                <p className="text-sm text-gray-400">AI-powered</p>
              </div>
            </div>
            <div className="text-4xl font-bold text-white mb-2">95%</div>
            <p className="text-blue-300">accuracy rate</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9 }}
            className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                <Award className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <h4 className="text-white font-bold">Resource Efficiency</h4>
                <p className="text-sm text-gray-400">Optimized allocation</p>
              </div>
            </div>
            <div className="text-4xl font-bold text-white mb-2">40%</div>
            <p className="text-green-300">faster distribution</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function AnimatedStat({ icon: Icon, label, value, prefix = '', suffix = '', color, delay }: any) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const duration = 2000;
      const increment = end / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all"
      whileHover={{ y: -5 }}
    >
      <div className={`w-12 h-12 bg-gradient-to-br ${color} rounded-xl flex items-center justify-center mb-4`}>
        <Icon className="w-6 h-6 text-white" />
      </div>

      <div className="text-3xl font-bold text-white mb-2">
        {prefix}{count.toLocaleString()}{suffix}
      </div>

      <p className="text-gray-400">{label}</p>
    </motion.div>
  );
}
