'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Target, Globe, ShieldCheck, FileCheck } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

const stats = [
  {
    icon: Target,
    title: 'Quality Focus',
    description: 'Stringent quality standards at every stage of sourcing and processing',
  },
  {
    icon: Globe,
    title: 'Global Reach',
    description: 'Serving buyers across the Middle East, Europe, Americas, and beyond',
  },
  {
    icon: ShieldCheck,
    title: 'Trusted Sourcing',
    description: 'Direct sourcing from India\'s premier agricultural regions',
  },
  {
    icon: FileCheck,
    title: 'Export Compliance',
    description: 'Fully compliant with international trade and food safety standards',
  },
];

export default function AboutPreview() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image Side */}
          <AnimatedSection direction="left">
            <div className="relative">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/hero-bg.png"
                  alt="AGRITRADE OVERSEAS agricultural operations"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
              </div>
              {/* Floating badge */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, type: 'spring' }}
                className="absolute -bottom-6 -right-6 bg-gold text-dark-text px-6 py-4 rounded-xl shadow-lg"
              >
                <p className="text-2xl font-bold" style={{ fontFamily: 'var(--font-heading)' }}>
                  Gujarat
                </p>
                <p className="text-sm font-medium">India</p>
              </motion.div>
              {/* Decorative element */}
              <div className="absolute -top-4 -left-4 w-24 h-24 border-2 border-primary/20 rounded-2xl -z-10" />
            </div>
          </AnimatedSection>

          {/* Content Side */}
          <div>
            <AnimatedSection direction="right">
              <span className="section-subtitle">About Us</span>
              <h2 className="section-title mt-3 mb-6">
                About <span className="text-primary">AGRITRADE OVERSEAS</span>
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                AGRITRADE OVERSEAS is an India-based export company dedicated to supplying premium
                agricultural products to customers worldwide. We combine a strong sourcing network,
                strict quality standards, and dependable logistics to deliver products that meet
                international expectations.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                Our mission is to connect global buyers with the finest agricultural commodities
                from India while building long-term relationships founded on trust, transparency,
                and consistent service.
              </p>
              <Link href="/about" className="btn-primary group">
                Learn More About Us
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </AnimatedSection>

            {/* Stat Cards */}
            <div className="grid grid-cols-2 gap-4 mt-10">
              {stats.map((stat, index) => (
                <AnimatedSection key={stat.title} delay={index * 0.1} direction="up">
                  <div className="p-4 rounded-xl bg-section-alt border border-primary/10 hover:border-primary/30 transition-all group">
                    <stat.icon
                      size={28}
                      className="text-primary mb-2 group-hover:scale-110 transition-transform"
                    />
                    <h4 className="text-sm font-semibold text-dark-text mb-1">{stat.title}</h4>
                    <p className="text-xs text-gray-500 leading-relaxed">{stat.description}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
