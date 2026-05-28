'use client';

import { motion } from 'framer-motion';
import { Search, Ship, TrendingUp } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

const processCards = [
  {
    step: 1,
    title: 'Sourcing',
    description:
      'We carefully source the finest agricultural products directly from India\'s premier farming regions, ensuring quality from the very origin.',
    icon: Search,
    highlighted: false,
  },
  {
    step: 2,
    title: 'Export',
    description:
      'Our streamlined export operations ensure efficient documentation, compliance with international standards, and timely shipment to global destinations.',
    icon: Ship,
    highlighted: true,
  },
  {
    step: 3,
    title: 'Trading',
    description:
      'We build lasting trade partnerships with global buyers, delivering consistent quality and competitive pricing for long-term business growth.',
    icon: TrendingUp,
    highlighted: false,
  },
];

export default function ProcessSection() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <AnimatedSection className="text-center mb-14">
          <span className="section-subtitle">Highest Quality Agriculture Products</span>
          <h2 className="section-title mt-3 mb-4">
            Crafting Quality Through <span className="text-primary">Essential Process</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our meticulous process ensures that every product meets the highest standards of
            excellence. From sourcing to exporting, our steps are designed to guarantee quality,
            freshness, and customer satisfaction.
          </p>
        </AnimatedSection>

        {/* Process Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {processCards.map((card, index) => (
            <AnimatedSection key={card.title} delay={index * 0.15}>
              <motion.div
                whileHover={{ y: -10 }}
                className={`relative rounded-2xl p-8 text-center transition-all duration-500 group ${
                  card.highlighted
                    ? 'bg-gradient-to-br from-primary to-primary-dark text-white shadow-xl shadow-primary/20'
                    : 'bg-white border-2 border-gray-100 hover:border-primary/20 hover:shadow-xl'
                }`}
              >
                {/* Step Number */}
                <div
                  className={`absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    card.highlighted
                      ? 'bg-gold text-dark-text'
                      : 'bg-primary text-white'
                  }`}
                >
                  {card.step}
                </div>

                {/* Icon */}
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 mt-2 ${
                    card.highlighted
                      ? 'bg-white/20'
                      : 'bg-primary/10 group-hover:bg-primary/20'
                  } transition-colors`}
                >
                  <card.icon
                    size={32}
                    className={card.highlighted ? 'text-white' : 'text-primary'}
                  />
                </div>

                {/* Content */}
                <h3
                  className={`text-xl font-bold mb-3 ${
                    card.highlighted ? 'text-white' : 'text-dark-text'
                  }`}
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {card.title}
                </h3>
                <p
                  className={`text-sm leading-relaxed ${
                    card.highlighted ? 'text-white/80' : 'text-gray-600'
                  }`}
                >
                  {card.description}
                </p>

                {/* Decorative line */}
                {card.highlighted && (
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-gold rounded-full" />
                )}
              </motion.div>
            </AnimatedSection>
          ))}
        </div>

        {/* Connecting line */}
        <div className="hidden md:block relative mt-[-140px] mb-[140px] mx-auto" style={{ width: '60%' }}>
          <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-gradient-to-r from-gray-200 via-primary/30 to-gray-200 -z-10" />
        </div>
      </div>
    </section>
  );
}
