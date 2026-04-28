import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { motion } from 'motion/react';
import { HeartHandshake, Mail, Lock, ArrowRight, Building2, Users, HandHeart } from 'lucide-react';
import { Button } from '../components/Button';
import { GlassCard } from '../components/GlassCard';

type UserRole = 'ngo' | 'volunteer' | 'donor' | null;

export function Login() {
  const [selectedRole, setSelectedRole] = useState<UserRole>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate login delay
    setTimeout(() => {
      setIsLoading(false);
      navigate('/dashboard');
    }, 1500);
  };

  const roles = [
    {
      id: 'ngo' as UserRole,
      name: 'NGO / Organization',
      description: 'Manage campaigns, track donations, and coordinate volunteers',
      icon: Building2,
      gradient: 'from-primary to-blue-400',
    },
    {
      id: 'volunteer' as UserRole,
      name: 'Volunteer',
      description: 'Find opportunities and contribute your time and skills',
      icon: Users,
      gradient: 'from-accent to-purple-400',
    },
    {
      id: 'donor' as UserRole,
      name: 'Donor',
      description: 'Support causes and track your impact',
      icon: HandHeart,
      gradient: 'from-secondary to-cyan-400',
    },
  ];

  if (!selectedRole) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl w-full"
        >
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-tr from-primary to-accent mb-6 shadow-[0_0_40px_rgba(79,140,255,0.5)]"
            >
              <HeartHandshake className="text-white w-10 h-10" />
            </motion.div>
            <h1 className="text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70 mb-4">
              Welcome to NGOSync
            </h1>
            <p className="text-white/60 text-lg">
              Select your role to get started
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {roles.map((role, index) => (
              <motion.div
                key={role.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <GlassCard
                  className="p-8 relative overflow-hidden cursor-pointer group hover:border-primary/50 transition-all duration-300"
                  onClick={() => setSelectedRole(role.id)}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${role.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

                  <div className="relative z-10 text-center">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${role.gradient} mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <role.icon className="text-white w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">
                      {role.name}
                    </h3>
                    <p className="text-white/60 text-sm leading-relaxed mb-6">
                      {role.description}
                    </p>
                    <Button
                      variant="primary"
                      className="w-full group/btn"
                      onClick={() => setSelectedRole(role.id)}
                    >
                      Continue
                      <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    );
  }

  const selectedRoleData = roles.find(r => r.id === selectedRole);

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full"
      >
        <GlassCard className="p-8 sm:p-10 relative overflow-hidden">
          {/* Subtle background glow inside the card */}
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 rounded-full bg-primary/20 blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-32 h-32 rounded-full bg-secondary/20 blur-2xl pointer-events-none" />

          <div className="relative z-10 text-center mb-10">
            <button
              onClick={() => setSelectedRole(null)}
              className="absolute left-0 top-0 text-white/60 hover:text-white transition-colors text-sm flex items-center gap-1"
            >
              <ArrowRight className="w-4 h-4 rotate-180" />
              Back
            </button>

            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr ${selectedRoleData?.gradient} mb-6 shadow-[0_0_30px_rgba(79,140,255,0.4)]`}
            >
              {selectedRoleData && <selectedRoleData.icon className="text-white w-8 h-8" />}
            </motion.div>
            <h2 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
              {selectedRoleData?.name} Login
            </h2>
            <p className="mt-3 text-white/60 text-sm">
              Sign in to continue making a difference.
            </p>
          </div>

          <form onSubmit={handleLogin} className="relative z-10 space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white/70 mb-1.5" htmlFor="email">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-white/40" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 border border-white/10 rounded-xl bg-white/5 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all sm:text-sm"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-sm font-medium text-white/70" htmlFor="password">
                    Password
                  </label>
                  <Link to="#" className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-white/40" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 border border-white/10 rounded-xl bg-white/5 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all sm:text-sm"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full flex justify-center py-3 text-base group"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                  />
                  Signing In...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Sign In
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              )}
            </Button>
          </form>

          <div className="relative z-10 mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-background/50 text-white/50">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button className="flex justify-center items-center py-2.5 px-4 border border-white/10 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
              </button>
              <button className="flex justify-center items-center py-2.5 px-4 border border-white/10 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </button>
            </div>
          </div>

          <div className="relative z-10 mt-8 text-center text-sm text-white/60">
            Don't have an account?{' '}
            <Link to="#" className="font-medium text-accent hover:text-accent/80 transition-colors">
              Sign up
            </Link>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
}
