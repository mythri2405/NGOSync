import { useState } from 'react';
import { motion } from 'motion/react';
import { Building2, Users, Heart, Shield, Sparkles } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { mockNGOs, mockVolunteers, type NGO, type Volunteer, type Donor } from '../data';

type UserRole = 'ngo' | 'volunteer' | 'donor';

interface AuthPageProps {
  onLogin: (user: any) => void;
}

export function AuthPage({ onLogin }: AuthPageProps) {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const roles = [
    {
      type: 'ngo' as UserRole,
      icon: Building2,
      title: 'NGO',
      description: 'Find perfect volunteers instantly with AI',
      color: 'from-[#5a8a8a] to-[#3a5f7d]'
    },
    {
      type: 'volunteer' as UserRole,
      icon: Users,
      title: 'Volunteer',
      description: 'Get matched to causes you care about',
      color: 'from-[#3a5f7d] to-[#4a6d8a]'
    },
    {
      type: 'donor' as UserRole,
      icon: Heart,
      title: 'Donor',
      description: 'See your impact grow in real-time',
      color: 'from-[#4a6d8a] to-[#5a8a8a]'
    }
  ];

  const onSubmit = (data: any) => {
    if (!selectedRole) return;

    let userData;
    if (selectedRole === 'ngo') {
      userData = mockNGOs[0];
    } else if (selectedRole === 'volunteer') {
      userData = mockVolunteers[0];
    } else {
      userData = {
        id: 'donor-1',
        name: data.name,
        email: data.email,
        location: { lat: 28.6139, lng: 77.2090, city: 'New Delhi' },
        preferredCauses: ['education', 'food'],
        totalDonated: 0,
        donationHistory: [],
        favoriteNGOs: []
      } as Donor;
    }

    onLogin({
      id: userData.id,
      name: selectedRole === 'donor' ? data.name : ('name' in userData ? userData.name : 'User'),
      email: data.email,
      role: selectedRole,
      data: userData
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a2332] via-[#3a5f7d] to-[#1a2332] flex items-center justify-center p-4 overflow-hidden relative">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#5a8a8a]/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#3a5f7d]/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-6xl relative z-10"
      >
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 mb-6"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-[#5a8a8a] to-[#3a5f7d] rounded-2xl flex items-center justify-center shadow-lg shadow-[#5a8a8a]/30">
              <Heart className="w-8 h-8 text-[#f5f1e3]" />
            </div>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-[#5a8a8a] via-[#3a5f7d] to-[#f5f1e3] bg-clip-text text-transparent"
          >
            Smart NGO Resource Allocation
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-[#a8c5d1]"
          >
            <span className="text-[#5a8a8a] font-semibold">50K+ Lives Impacted</span> • AI-Powered Matching • Real-Time Impact Tracking
          </motion.p>
        </div>

        {!selectedRole ? (
          <div className="grid md:grid-cols-3 gap-6">
            {roles.map((role, index) => (
              <motion.button
                key={role.type}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                onClick={() => setSelectedRole(role.type)}
                className="group relative overflow-hidden rounded-2xl p-8 bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all"
                whileHover={{ scale: 1.02, y: -5 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${role.color} opacity-0 group-hover:opacity-10 transition-opacity`} />

                <div className={`w-16 h-16 bg-gradient-to-br ${role.color} rounded-xl flex items-center justify-center mb-6`}>
                  <role.icon className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-2xl font-bold text-white mb-2">{role.title}</h3>
                <p className="text-gray-400">{role.description}</p>

                <motion.div
                  className="mt-6 flex items-center gap-2 text-purple-400 font-medium"
                  whileHover={{ x: 5 }}
                >
                  Continue as {role.title}
                  <span className="text-xl">→</span>
                </motion.div>
              </motion.button>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md mx-auto"
          >
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
              <button
                onClick={() => setSelectedRole(null)}
                className="text-gray-400 hover:text-white mb-6 flex items-center gap-2"
              >
                ← Back
              </button>

              <div className="flex items-center gap-4 mb-6">
                {(() => {
                  const role = roles.find(r => r.type === selectedRole);
                  return role ? (
                    <>
                      <div className={`w-12 h-12 bg-gradient-to-br ${role.color} rounded-xl flex items-center justify-center`}>
                        <role.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-white">Join as {role.title}</h2>
                        <p className="text-gray-400 text-sm">{role.description}</p>
                      </div>
                    </>
                  ) : null;
                })()}
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label className="block text-white mb-2">Full Name</label>
                  <input
                    {...register('name', { required: true })}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter your name"
                  />
                  {errors.name && <span className="text-red-400 text-sm">Name is required</span>}
                </div>

                <div>
                  <label className="block text-white mb-2">Email</label>
                  <input
                    {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
                    type="email"
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="your@email.com"
                  />
                  {errors.email && <span className="text-red-400 text-sm">Valid email is required</span>}
                </div>

                {selectedRole === 'ngo' && (
                  <>
                    <div>
                      <label className="block text-white mb-2">NGO Name</label>
                      <input
                        {...register('ngoName')}
                        className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="Your organization name"
                      />
                    </div>
                    <div>
                      <label className="block text-white mb-2">Registration ID</label>
                      <input
                        {...register('registrationId')}
                        className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="NGO/YYYY/XXXXX"
                      />
                    </div>
                  </>
                )}

                {selectedRole === 'volunteer' && (
                  <div>
                    <label className="block text-white mb-2">Skills</label>
                    <input
                      {...register('skills')}
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="teaching, medical, logistics..."
                    />
                  </div>
                )}

                <motion.button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-purple-500/50 transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center justify-center gap-2">
                    <Shield className="w-5 h-5" />
                    Start Making Impact
                  </div>
                </motion.button>
              </form>

              <div className="mt-6 text-center text-gray-400 text-sm">
                Demo Mode • Using AI-powered matching
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
