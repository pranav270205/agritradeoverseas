'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Shield, Globe, Truck, Handshake } from 'lucide-react';

const trustIndicators = [
  { icon: Shield, label: 'Premium Quality Products' },
  { icon: Globe, label: 'Global Export Solutions' },
  { icon: Truck, label: 'Reliable Logistics Support' },
  { icon: Handshake, label: 'Transparent Business Practices' },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-bg.png"
          alt="Premium agricultural fields"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/40" />
      </div>

      {/* Laurel Decorations */}
      <div className="laurel-left hidden lg:block">
        <svg viewBox="0 0 80 160" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M40 10 C20 30, 10 60, 10 80 C10 100, 20 130, 40 150" stroke="#D4A017" strokeWidth="1.5" fill="none" opacity="0.4"/>
          <path d="M40 20 C25 35, 18 55, 15 75 C18 95, 25 115, 40 140" stroke="#D4A017" strokeWidth="1" fill="none" opacity="0.3"/>
          {[30, 50, 70, 90, 110, 130].map((y, i) => (
            <ellipse key={i} cx={25 - i % 2 * 5} cy={y} rx="12" ry="6" fill="#D4A017" opacity="0.15" transform={`rotate(-20 ${25 - i % 2 * 5} ${y})`}/>
          ))}
        </svg>
      </div>
      <div className="laurel-right hidden lg:block">
        <svg viewBox="0 0 80 160" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M40 10 C20 30, 10 60, 10 80 C10 100, 20 130, 40 150" stroke="#D4A017" strokeWidth="1.5" fill="none" opacity="0.4"/>
          <path d="M40 20 C25 35, 18 55, 15 75 C18 95, 25 115, 40 140" stroke="#D4A017" strokeWidth="1" fill="none" opacity="0.3"/>
          {[30, 50, 70, 90, 110, 130].map((y, i) => (
            <ellipse key={i} cx={25 - i % 2 * 5} cy={y} rx="12" ry="6" fill="#D4A017" opacity="0.15" transform={`rotate(-20 ${25 - i % 2 * 5} ${y})`}/>
          ))}
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-32">
        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-gold/40 bg-gold/10 text-gold text-sm font-semibold tracking-wider uppercase">
            <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
            Cultivating Excellence in Agricultural Products
          </span>
        </motion.div>

        {/* Main Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Your Trusted Source for{' '}
          <span className="text-gold-gradient">Quality Agricultural</span>{' '}
          Products
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed"
        >
          Delivering premium agricultural products from India to global markets with a
          commitment to quality, reliability, and long-term partnerships.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <Link href="/products" className="btn-gold group">
            Explore Products
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link href="/contact" className="btn-outline group">
            Request a Quote
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
        >
          {trustIndicators.map((indicator, index) => (
            <motion.div
              key={indicator.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
              className="glass-effect rounded-xl px-4 py-4 flex flex-col items-center gap-2 hover:bg-white/15 transition-all"
            >
              <indicator.icon size={24} className="text-gold" />
              <span className="text-xs sm:text-sm text-white/90 font-medium text-center">
                {indicator.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-white/40 flex items-start justify-center p-2"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
        </motion.div>
      </motion.div>
    </section>
  );
}
