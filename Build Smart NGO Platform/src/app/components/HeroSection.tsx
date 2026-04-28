import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, Brain, TrendingUp, Shield, Zap, MapPin, Heart, Users } from 'lucide-react';
import { useRef } from 'react';
import { ImpactStories } from './ImpactStories';

interface HeroSectionProps {
  onNavigate: (page: 'map' | 'donate' | 'dashboard' | 'impact') => void;
}

export function HeroSection({ onNavigate }: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  return (
    <div ref={containerRef} className="relative">
      {/* Hero Section */}
      <motion.section
        style={{ opacity, scale }}
        className="min-h-screen flex items-center justify-center px-4 py-20"
      >
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#5a8a8a]/20 border border-[#5a8a8a]/30 rounded-full mb-8">
              <Heart className="w-4 h-4 text-[#5a8a8a]" />
              <span className="text-[#5a8a8a] text-sm font-medium">AI-Powered • Real Impact • Lives Changed</span>
            </div>

            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6">
              <span className="bg-gradient-to-r from-[#5a8a8a] via-[#3a5f7d] to-[#f5f1e3] bg-clip-text text-transparent">
                Smart NGO Resource
              </span>
              <br />
              <span className="text-[#f5f1e3]">Allocation</span>
            </h1>

            <p className="text-xl md:text-2xl text-[#a8c5d1] mb-12 max-w-3xl mx-auto">
              AI connects hearts to causes—instantly matching NGOs, volunteers, and donors.
              <br />
              <span className="text-[#5a8a8a] font-medium">50,000 lives touched. ₹2.5Cr distributed. 95% success rate.</span>
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <motion.button
                onClick={() => onNavigate('map')}
                className="px-8 py-4 bg-gradient-to-r from-[#5a8a8a] to-[#3a5f7d] text-[#f5f1e3] rounded-xl font-bold flex items-center gap-2 hover:shadow-lg hover:shadow-[#5a8a8a]/50 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <MapPin className="w-5 h-5" />
                See AI Matching Live
                <ArrowRight className="w-5 h-5" />
              </motion.button>

              <motion.button
                onClick={() => onNavigate('donate')}
                className="px-8 py-4 bg-transparent border-2 border-[#5a8a8a] text-[#5a8a8a] rounded-xl font-bold flex items-center gap-2 hover:bg-[#5a8a8a]/10 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Heart className="w-5 h-5" />
                Create Impact Now
              </motion.button>
            </div>
          </motion.div>

          {/* Floating Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20"
          >
            {[
              { label: 'Lives Impacted', value: '50K+', icon: Heart, description: 'Real people helped' },
              { label: 'Resources Saved', value: '₹2.5Cr', icon: TrendingUp, description: 'Distributed efficiently' },
              { label: 'Time Saved', value: '2.4K hrs', icon: Zap, description: 'Via AI matching' },
              { label: 'Success Rate', value: '95%', icon: Brain, description: 'Match accuracy' }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + i * 0.1 }}
                className="p-6 bg-[#2a3f5f]/60 backdrop-blur-xl border border-[#5a8a8a]/20 rounded-2xl hover:border-[#5a8a8a]/40 transition-all group"
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-[#5a8a8a] to-[#3a5f7d] rounded-xl flex items-center justify-center mb-3 mx-auto shadow-lg shadow-[#5a8a8a]/20 group-hover:shadow-[#5a8a8a]/40 transition-all">
                  <stat.icon className="w-6 h-6 text-[#f5f1e3]" />
                </div>
                <div className="text-3xl font-bold text-[#f5f1e3] mb-1">{stat.value}</div>
                <div className="text-sm text-[#5a8a8a] font-medium mb-1">{stat.label}</div>
                <div className="text-xs text-[#a8c5d1]">{stat.description}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Problem Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#f5f1e3] mb-6">
              The Crisis We're Solving
            </h2>
            <p className="text-xl text-[#a8c5d1] max-w-3xl mx-auto">
              <span className="text-[#5a8a8a] font-semibold">40% of resources are wasted</span> in traditional NGO coordination.
              <br />
              Help arrives too late. Lives slip through the cracks. Impact goes unmeasured.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Slow Coordination',
                impact: '2,400 hours wasted monthly',
                problem: 'Manual matching delays help by days',
                solution: 'AI matches in <10 seconds with 95% accuracy',
                color: 'from-[#5a8a8a] to-[#3a5f7d]'
              },
              {
                title: 'Misallocated Resources',
                impact: '₹50L wasted annually',
                problem: 'Wrong donations to wrong causes',
                solution: 'Predictive AI ensures optimal resource distribution',
                color: 'from-[#3a5f7d] to-[#4a6d8a]'
              },
              {
                title: 'Unmeasured Impact',
                impact: 'Zero accountability',
                problem: 'Donors never see real outcomes',
                solution: 'Live dashboards track every rupee, every life',
                color: 'from-[#4a6d8a] to-[#5a8a8a]'
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#5a8a8a]/10 to-transparent rounded-2xl blur-xl group-hover:blur-2xl transition-all" />

                <div className="relative h-full p-8 bg-[#2a3f5f]/60 backdrop-blur-xl border border-[#5a8a8a]/20 rounded-2xl hover:border-[#5a8a8a]/40 transition-all">
                  <div className={`w-12 h-12 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-[#5a8a8a]/20`}>
                    <Shield className="w-6 h-6 text-[#f5f1e3]" />
                  </div>

                  <div className="mb-4">
                    <h3 className="text-2xl font-bold text-[#f5f1e3] mb-2">{item.title}</h3>
                    <div className="px-3 py-1 bg-red-500/20 border border-red-500/30 rounded-lg inline-block">
                      <span className="text-red-400 text-sm font-bold">💔 {item.impact}</span>
                    </div>
                  </div>

                  <div className="mb-4 pb-4 border-b border-[#5a8a8a]/20">
                    <div className="text-sm text-red-400 font-medium mb-2">The Problem:</div>
                    <p className="text-[#a8c5d1]">{item.problem}</p>
                  </div>

                  <div>
                    <div className="text-sm text-[#5a8a8a] font-medium mb-2">💚 Our Impact:</div>
                    <p className="text-[#f5f1e3]">{item.solution}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Features */}
      <section className="py-20 px-4 bg-gradient-to-b from-transparent via-[#3a5f7d]/10 to-transparent">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#5a8a8a]/20 border border-[#5a8a8a]/30 rounded-full mb-6">
              <Brain className="w-4 h-4 text-[#5a8a8a]" />
              <span className="text-[#5a8a8a] text-sm font-medium">Powered by Advanced AI/ML</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-[#f5f1e3] mb-6">
              6 AI Systems Working
              <br />
              <span className="bg-gradient-to-r from-[#5a8a8a] to-[#3a5f7d] bg-clip-text text-transparent">
                24/7 for Maximum Impact
              </span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Brain,
                title: 'Smart Matching',
                description: 'ML algorithm matches volunteers to NGOs based on skills, distance, and urgency',
                score: '95% accuracy'
              },
              {
                icon: TrendingUp,
                title: 'Demand Prediction',
                description: 'Predicts high-need zones using historical data and real-time patterns',
                score: 'Real-time'
              },
              {
                icon: Shield,
                title: 'Trust Scoring',
                description: 'AI-powered fraud detection and NGO verification system',
                score: '98% reliable'
              },
              {
                icon: MapPin,
                title: 'Geo Clustering',
                description: 'Identifies resource gaps and optimizes distribution routes',
                score: '40% faster'
              },
              {
                icon: Heart,
                title: 'Donor AI',
                description: 'Personalized NGO recommendations based on donor preferences',
                score: '3x engagement'
              },
              {
                icon: Zap,
                title: 'NLP Requests',
                description: 'Convert natural language to structured resource requests',
                score: 'Instant'
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 bg-gradient-to-br from-[#2a3f5f]/60 to-[#2a3f5f]/40 backdrop-blur-xl border border-[#5a8a8a]/20 rounded-2xl hover:border-[#5a8a8a]/50 transition-all group"
                whileHover={{ y: -5 }}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-[#5a8a8a] to-[#3a5f7d] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-[#5a8a8a]/20">
                  <feature.icon className="w-6 h-6 text-[#f5f1e3]" />
                </div>

                <h3 className="text-xl font-bold text-[#f5f1e3] mb-2">{feature.title}</h3>
                <p className="text-[#a8c5d1] mb-4">{feature.description}</p>

                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#5a8a8a]/20 border border-[#5a8a8a]/30 rounded-full">
                  <div className="w-2 h-2 bg-[#5a8a8a] rounded-full animate-pulse" />
                  <span className="text-[#5a8a8a] text-sm font-medium">{feature.score}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Stories */}
      <ImpactStories />

      {/* CTA Section */}
      <section className="py-32 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-bold text-[#f5f1e3] mb-6">
              Your Turn to Create
              <br />
              <span className="bg-gradient-to-r from-[#5a8a8a] to-[#3a5f7d] bg-clip-text text-transparent">
                Meaningful Change
              </span>
            </h2>
            <p className="text-xl text-[#a8c5d1] mb-12">
              Join 10,000+ change-makers using AI to amplify their impact
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <motion.button
                onClick={() => onNavigate('dashboard')}
                className="px-10 py-5 bg-gradient-to-r from-[#5a8a8a] to-[#3a5f7d] text-[#f5f1e3] rounded-xl font-bold text-lg flex items-center gap-3 hover:shadow-2xl hover:shadow-[#5a8a8a]/50 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Your Impact Journey
                <ArrowRight className="w-6 h-6" />
              </motion.button>

              <motion.button
                onClick={() => onNavigate('impact')}
                className="px-10 py-5 bg-transparent border-2 border-[#5a8a8a] text-[#5a8a8a] rounded-xl font-bold text-lg flex items-center gap-3 hover:bg-[#5a8a8a]/10 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                See Full Impact Report
                <TrendingUp className="w-6 h-6" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
