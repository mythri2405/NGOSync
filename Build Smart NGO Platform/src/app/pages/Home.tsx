import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ChevronRight, Activity, Zap, TrendingUp, AlertCircle, Heart } from 'lucide-react';
import { Link } from 'react-router';
import { Button } from '../components/Button';
import { GlassCard } from '../components/GlassCard';
import { Badge } from '../components/Badge';
import { ProgressBar } from '../components/ProgressBar';
import { ActivityFeed } from '../components/ActivityFeed';
import { DEMO_DATA, IMAGES } from '../data';

export function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-16 pb-12"
    >
      {/* Hero Section */}
      <section className="relative pt-12 pb-8 flex flex-col items-center text-center">
        <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md">
          <Zap className="w-4 h-4 text-accent" />
          <span className="text-sm font-medium text-white/80">AI-Powered Allocation Engine Active</span>
        </motion.div>
        
        <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 max-w-4xl leading-tight">
          Smart NGO <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary">
            Resource Allocation
          </span>
        </motion.h1>
        
        <motion.p variants={itemVariants} className="text-lg md:text-xl text-white/60 mb-10 max-w-2xl">
          Intelligently connecting NGOs, volunteers, and donors using real-time demand prediction for maximum impact.
        </motion.p>
        
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
          <Link to="/dashboard/donations">
            <Button variant="primary" size="lg" className="gap-2">
              Explore Campaigns <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <Link to="/dashboard/matching">
            <Button variant="outline" size="lg">
              I am a Volunteer
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* Live Impact Strip */}
      <motion.section variants={itemVariants}>
        <GlassCard className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10 p-6 md:p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px]" />
          
          <div className="flex flex-col items-center justify-center p-4">
            <span className="text-4xl font-bold text-white mb-2 tracking-tight">₹{DEMO_DATA.stats.donated.toLocaleString()}</span>
            <span className="text-white/60 text-sm uppercase tracking-wider font-medium flex items-center gap-2">
              <Activity className="w-4 h-4 text-accent" /> Donated Today
            </span>
          </div>
          <div className="flex flex-col items-center justify-center p-4">
            <span className="text-4xl font-bold text-white mb-2 tracking-tight">{DEMO_DATA.stats.volunteers}</span>
            <span className="text-white/60 text-sm uppercase tracking-wider font-medium flex items-center gap-2">
              <Zap className="w-4 h-4 text-primary" /> Volunteers Matched
            </span>
          </div>
          <div className="flex flex-col items-center justify-center p-4">
            <span className="text-4xl font-bold text-white mb-2 tracking-tight">{DEMO_DATA.stats.ngos}</span>
            <span className="text-white/60 text-sm uppercase tracking-wider font-medium flex items-center gap-2">
              <Heart className="w-4 h-4 text-secondary" /> NGOs Supported
            </span>
          </div>
        </GlassCard>
      </motion.section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Top Priority NGOs */}
        <motion.section variants={itemVariants} className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold flex items-center gap-3">
              <AlertCircle className="text-destructive w-6 h-6" />
              Top Priority Needs
            </h2>
            <Link to="/dashboard/ngos" className="text-sm text-primary hover:text-primary/80 flex items-center gap-1">
              View all <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-6">
            {DEMO_DATA.ngos.filter(n => n.urgency === 'CRITICAL' || n.urgency === 'HIGH').slice(0,4).map(ngo => (
              <GlassCard key={ngo.id} className="p-6 flex flex-col h-full">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-lg text-white mb-1">{ngo.name}</h3>
                    <p className="text-sm text-white/60">{ngo.location} • {ngo.category}</p>
                  </div>
                  <Badge variant={ngo.urgency === 'CRITICAL' ? 'critical' : 'high'}>
                    {ngo.urgency}
                  </Badge>
                </div>
                <div className="mt-auto pt-6 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/80">Funding Goal</span>
                    <span className="font-medium text-white">{ngo.funding}%</span>
                  </div>
                  <ProgressBar progress={ngo.funding} colorClass={ngo.urgency === 'CRITICAL' ? 'bg-destructive' : 'bg-warning'} />
                </div>
              </GlassCard>
            ))}
          </div>
        </motion.section>

        {/* AI Demand Prediction */}
        <motion.section variants={itemVariants} className="space-y-6">
          <h2 className="text-2xl font-bold flex items-center gap-3">
            <TrendingUp className="text-accent w-6 h-6" />
            AI Demand Forecast
          </h2>
          <GlassCard className="p-6 relative overflow-hidden">
            <div className="absolute -right-20 -top-20 w-40 h-40 bg-accent/20 rounded-full blur-[60px]" />
            <div className="space-y-6 relative z-10">
              {DEMO_DATA.aiDemand.slice(0, 5).map((demand, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-medium text-white/90">{demand.location}</span>
                    <span className="text-white font-bold">{demand.percentage}%</span>
                  </div>
                  <ProgressBar 
                    progress={demand.percentage} 
                    colorClass={
                      demand.level === 'CRITICAL' ? 'bg-destructive' : 
                      demand.level === 'HIGH' ? 'bg-warning' : 
                      demand.level === 'MEDIUM' ? 'bg-primary' : 'bg-accent'
                    }
                  />
                </div>
              ))}
            </div>
          </GlassCard>

          <div className="mt-6 h-[400px]">
            <ActivityFeed />
          </div>
        </motion.section>
      </div>

      {/* Impact Stories */}
      <motion.section variants={itemVariants} className="space-y-6">
        <h2 className="text-2xl font-bold">Latest Impact</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <GlassCard className="overflow-hidden group">
            <div className="h-48 overflow-hidden">
              <img src={IMAGES.food} alt="Food distribution" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="p-6">
              <Badge variant="outline" className="mb-3 inline-block">Mumbai</Badge>
              <h3 className="font-bold text-lg mb-2">1,000 Meals Delivered</h3>
              <p className="text-sm text-white/60">FeedIndia Foundation successfully reached 1,000 daily wage workers thanks to smart routing.</p>
            </div>
          </GlassCard>
          <GlassCard className="overflow-hidden group">
            <div className="h-48 overflow-hidden">
              <img src={IMAGES.children} alt="Children education" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="p-6">
              <Badge variant="outline" className="mb-3 inline-block">Kolkata</Badge>
              <h3 className="font-bold text-lg mb-2">New Tech Center</h3>
              <p className="text-sm text-white/60">WomenRise Collective opened a new digital literacy center funded 100% via NGOSync.</p>
            </div>
          </GlassCard>
          <GlassCard className="overflow-hidden group">
            <div className="h-48 overflow-hidden">
              <img src={IMAGES.dog} alt="Animal rescue" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="p-6">
              <Badge variant="outline" className="mb-3 inline-block">Bangalore</Badge>
              <h3 className="font-bold text-lg mb-2">Medical Camp Success</h3>
              <p className="text-sm text-white/60">Pawsitive Impact treated 50+ street dogs after a surge in volunteer sign-ups.</p>
            </div>
          </GlassCard>
        </div>
      </motion.section>
    </motion.div>
  );
}
