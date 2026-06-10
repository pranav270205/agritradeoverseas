'use client';

import { CheckCircle2, ShieldCheck } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

const qualityPoints = [
  'Rigorous inspection at every stage of sourcing and processing',
  'Compliance with international food safety standards',
  'Advanced cleaning and grading technologies',
  'Moisture and contamination testing for every batch',
  'Proper packaging to maintain freshness during transit',
  'Full traceability from farm to destination port',
];

export default function QualityAssurance() {
  return (
    <section className="py-20 lg:py-28 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <AnimatedSection direction="left">
            <span className="section-subtitle">Quality Assurance</span>
            <h2 className="section-title mt-3 mb-6">
              Commitment to <span className="text-primary">Quality</span>
            </h2>
            <p className="text-gray-600 leading-relaxed mb-8">
              Every product undergoes careful inspection to ensure purity, consistency, and
              compliance with international standards. We maintain strict controls throughout
              sourcing, packaging, and shipment.
            </p>

            <div className="space-y-4">
              {qualityPoints.map((point, index) => (
                <AnimatedSection key={index} delay={index * 0.08} direction="left">
                  <div className="flex items-start gap-3 group">
                    <CheckCircle2
                      size={20}
                      className="text-primary mt-0.5 shrink-0 group-hover:scale-110 transition-transform"
                    />
                    <p className="text-sm text-gray-700 leading-relaxed">{point}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </AnimatedSection>

          {/* Visual */}
          <AnimatedSection direction="right">
            <div className="relative">
              <div className="bg-gradient-to-br from-primary to-primary-dark rounded-2xl p-10 text-center text-white">
                <ShieldCheck size={80} className="mx-auto mb-6 text-gold opacity-80" />
                <h3
                  className="text-2xl font-bold mb-3"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  Quality Guaranteed
                </h3>
                <p className="text-white/80 text-sm leading-relaxed mb-6">
                  Our quality management system ensures that every product shipped by AGRITRADE
                  OVERSEAS meets the highest international standards.
                </p>
                <div className="grid grid-cols-2 gap-4 mt-8">
                  {[
                    { label: 'Quality Tested', value: '100%' },
                    { label: 'Standards Met', value: 'International' },
                    { label: 'Traceability', value: 'Farm to Port' },
                    { label: 'Compliance', value: 'Full' },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="bg-white/10 rounded-xl p-3"
                    >
                      <p className="text-gold font-bold text-lg">{item.value}</p>
                      <p className="text-white/60 text-xs">{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>
              {/* Decorative */}
              <div className="absolute -bottom-4 -right-4 w-32 h-32 border-2 border-gold/20 rounded-2xl -z-10" />
              <div className="absolute -top-4 -left-4 w-20 h-20 bg-gold/10 rounded-full -z-10" />
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
