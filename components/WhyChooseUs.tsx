'use client';

import { motion } from 'framer-motion';
import {
  Award,
  Network,
  BadgeDollarSign,
  Clock,
  FileText,
  Users,
} from 'lucide-react';
import AnimatedSection from './AnimatedSection';

const reasons = [
  {
    icon: Award,
    title: 'Premium Quality Standards',
    description:
      'Every product undergoes rigorous quality checks to ensure it meets international standards for purity, consistency, and safety.',
  },
  {
    icon: Network,
    title: 'Reliable Sourcing Network',
    description:
      'Our strong network of farmers and suppliers across India ensures a steady supply of the finest agricultural commodities.',
  },
  {
    icon: BadgeDollarSign,
    title: 'Competitive Pricing',
    description:
      'Direct sourcing from producers enables us to offer competitive prices without compromising on product quality.',
  },
  {
    icon: Clock,
    title: 'Timely Global Delivery',
    description:
      'Efficient logistics partnerships ensure your orders are delivered on time, every time, to any destination worldwide.',
  },
  {
    icon: FileText,
    title: 'Export Documentation Support',
    description:
      'Complete documentation support for seamless international trade, from certificates of origin to phytosanitary certificates.',
  },
  {
    icon: Users,
    title: 'Customer-Focused Approach',
    description:
      'We prioritize understanding your needs and delivering personalized solutions that build long-term partnerships.',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 lg:py-28 bg-gradient-to-br from-primary via-primary-dark to-[#063d1a] text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <AnimatedSection className="text-center mb-14">
          <span className="text-gold text-sm font-semibold uppercase tracking-wider">
            Our Advantages
          </span>
          <h2 className="section-title-white mt-3 mb-4">
            Why Global Buyers <span className="text-gold">Choose Us</span>
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            We bring together quality, reliability, and expertise to deliver an exceptional
            trading experience for our global partners.
          </p>
        </AnimatedSection>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, index) => (
            <AnimatedSection key={reason.title} delay={index * 0.1}>
              <motion.div
                whileHover={{ y: -6, scale: 1.02 }}
                className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 group h-full"
              >
                <div className="w-14 h-14 rounded-xl bg-gold/20 flex items-center justify-center mb-5 group-hover:bg-gold/30 transition-colors">
                  <reason.icon size={28} className="text-gold" />
                </div>
                <h3
                  className="text-lg font-bold text-white mb-3"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {reason.title}
                </h3>
                <p className="text-sm text-white/70 leading-relaxed">{reason.description}</p>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
