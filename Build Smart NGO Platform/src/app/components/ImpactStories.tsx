import { motion } from 'motion/react';
import { Heart, Users, TrendingUp, Award, Quote } from 'lucide-react';

export function ImpactStories() {
  const stories = [
    {
      id: 1,
      ngo: 'Hope Foundation',
      impact: '10,000 families fed',
      testimonial: 'With AI matching, we found volunteers 10x faster. Every second saved means more people helped.',
      volunteer: 'Priya Sharma',
      metric: '2,400 hours saved',
      image: 'https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?w=400'
    },
    {
      id: 2,
      ngo: 'Disaster Relief Corps',
      impact: '500 lives saved',
      testimonial: 'Real-time matching during floods helped us deploy the right volunteers instantly.',
      volunteer: 'Vikram Singh',
      metric: '95% match accuracy',
      image: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400'
    },
    {
      id: 3,
      ngo: 'Educare Mission',
      impact: '1,200 children educated',
      testimonial: 'Donor recommendations brought us supporters who truly care about our cause.',
      volunteer: 'Anjali Patel',
      metric: '₹12L raised',
      image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400'
    }
  ];

  const impactMetrics = [
    {
      icon: Users,
      value: '50,000+',
      label: 'Lives Touched',
      description: 'Direct beneficiaries across 15 states',
      color: 'from-[#5a8a8a] to-[#3a5f7d]'
    },
    {
      icon: Heart,
      value: '₹2.5Cr',
      label: 'Funds Allocated',
      description: 'Distributed with 95% efficiency',
      color: 'from-[#3a5f7d] to-[#4a6d8a]'
    },
    {
      icon: TrendingUp,
      value: '40%',
      label: 'Faster Response',
      description: 'AI cuts coordination time in half',
      color: 'from-[#4a6d8a] to-[#5a8a8a]'
    },
    {
      icon: Award,
      value: '98%',
      label: 'Success Rate',
      description: 'Volunteers matched to their passion',
      color: 'from-[#5a8a8a] to-[#f5f1e3]'
    }
  ];

  return (
    <div className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#5a8a8a]/20 border border-[#5a8a8a]/30 rounded-full mb-6">
            <Heart className="w-4 h-4 text-[#5a8a8a]" />
            <span className="text-[#5a8a8a] text-sm font-medium">Real Impact, Real Stories</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-[#f5f1e3] mb-6">
            Transforming Lives Through
            <br />
            <span className="bg-gradient-to-r from-[#5a8a8a] via-[#3a5f7d] to-[#4a6d8a] bg-clip-text text-transparent">
              Intelligent Coordination
            </span>
          </h2>

          <p className="text-xl text-[#a8c5d1] max-w-3xl mx-auto">
            Every match made, every donation processed, every volunteer deployed—
            it all adds up to measurable social change.
          </p>
        </motion.div>

        {/* Impact Metrics Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {impactMetrics.map((metric, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#5a8a8a]/20 to-[#3a5f7d]/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all" />

              <div className="relative bg-[#2a3f5f]/80 backdrop-blur-xl border border-[#5a8a8a]/20 rounded-2xl p-6 hover:border-[#5a8a8a]/40 transition-all">
                <div className={`w-14 h-14 bg-gradient-to-br ${metric.color} rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-[#5a8a8a]/20`}>
                  <metric.icon className="w-7 h-7 text-[#f5f1e3]" />
                </div>

                <div className="text-4xl font-bold text-[#f5f1e3] mb-2">{metric.value}</div>
                <div className="text-lg font-medium text-[#5a8a8a] mb-2">{metric.label}</div>
                <p className="text-sm text-[#a8c5d1]">{metric.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Impact Stories */}
        <div className="grid md:grid-cols-3 gap-6">
          {stories.map((story, i) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#5a8a8a]/10 to-transparent rounded-2xl blur-xl group-hover:blur-2xl transition-all" />

              <div className="relative bg-[#2a3f5f]/60 backdrop-blur-xl border border-[#5a8a8a]/20 rounded-2xl overflow-hidden hover:border-[#5a8a8a]/40 transition-all">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={story.image}
                    alt={story.ngo}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a2332] via-[#1a2332]/50 to-transparent" />

                  {/* Impact Badge */}
                  <div className="absolute bottom-3 left-3 px-3 py-1.5 bg-[#5a8a8a]/90 backdrop-blur-sm rounded-lg">
                    <p className="text-[#f5f1e3] font-bold text-sm">{story.impact}</p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start gap-2 mb-4">
                    <Quote className="w-5 h-5 text-[#5a8a8a] flex-shrink-0 mt-1" />
                    <p className="text-[#f5f1e3] italic">"{story.testimonial}"</p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-[#5a8a8a]/20">
                    <div>
                      <p className="text-[#5a8a8a] font-medium text-sm">{story.volunteer}</p>
                      <p className="text-[#a8c5d1] text-xs">{story.ngo}</p>
                    </div>

                    <div className="text-right">
                      <p className="text-[#f5f1e3] font-bold text-sm">{story.metric}</p>
                      <p className="text-[#a8c5d1] text-xs">AI Impact</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-block p-8 bg-gradient-to-br from-[#5a8a8a]/20 to-[#3a5f7d]/20 border border-[#5a8a8a]/30 rounded-2xl">
            <p className="text-3xl font-bold text-[#f5f1e3] mb-2">
              Your contribution creates ripples
            </p>
            <p className="text-[#a8c5d1] text-lg">
              Every action multiplies—1 volunteer helps 10 families, 1 donation feeds 50 people
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
