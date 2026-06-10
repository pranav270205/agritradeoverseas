import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import AnimatedSection from '@/components/AnimatedSection';
import ExportMarketsSection from '@/components/ExportMarketsSection';

export const metadata: Metadata = {
  title: 'Export Markets',
  description: 'AGRITRADE OVERSEAS serves buyers across the Middle East, Europe, North America, Africa, and Asia with dependable export solutions.',
};

const regions = [
  { name: 'Middle East', countries: ['UAE', 'Saudi Arabia', 'Oman', 'Qatar', 'Kuwait', 'Bahrain'], color: 'from-gold/10 to-gold/5', border: 'border-gold/20', accent: 'bg-gold' },
  { name: 'Europe', countries: ['United Kingdom', 'Germany', 'Netherlands', 'France', 'Spain'], color: 'from-blue-50 to-blue-50/50', border: 'border-blue-200/40', accent: 'bg-blue-500' },
  { name: 'North America', countries: ['United States', 'Canada', 'Mexico'], color: 'from-primary/5 to-primary/[0.02]', border: 'border-primary/15', accent: 'bg-primary' },
  { name: 'Africa', countries: ['South Africa', 'Kenya', 'Nigeria', 'Tanzania'], color: 'from-orange-50 to-orange-50/50', border: 'border-orange-200/40', accent: 'bg-orange-500' },
];

export default function ExportMarketsPage() {
  return (
    <>
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-primary via-primary-dark to-[#063d1a] overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`, backgroundSize: '40px 40px' }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <span className="inline-block px-4 py-1.5 bg-gold/20 text-gold rounded-full text-sm font-semibold mb-4 tracking-wider uppercase">Our Reach</span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
              Global <span className="text-gold-gradient">Export Markets</span>
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">Serving buyers across the Middle East, Europe, North America, Africa, and Asia with dependable export solutions.</p>
          </AnimatedSection>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* Interactive Map — reuse the homepage component */}
      <ExportMarketsSection />

      {/* Regions */}
      <section className="py-20 lg:py-28 bg-section-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-14">
            <span className="section-subtitle">Regional Coverage</span>
            <h2 className="section-title mt-3">Markets by <span className="text-primary">Region</span></h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {regions.map((region, i) => (
              <AnimatedSection key={region.name} delay={i * 0.1}>
                <div className={`rounded-2xl p-6 border bg-gradient-to-br ${region.color} ${region.border} h-full group hover:shadow-lg transition-all duration-300`}>
                  <div className="flex items-center gap-3 mb-5">
                    <span className={`w-2.5 h-2.5 rounded-full ${region.accent}`} />
                    <h3 className="text-lg font-bold text-dark-text" style={{ fontFamily: 'var(--font-heading)' }}>{region.name}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {region.countries.map((c) => (
                      <span key={c} className="px-3 py-1.5 bg-white/80 rounded-full text-xs font-medium text-gray-700 shadow-sm border border-gray-100/60 hover:border-primary/20 transition-colors">{c}</span>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-primary to-primary-dark text-white text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>Export to Your Country</h2>
            <p className="text-white/80 mb-8">We are ready to serve buyers from any part of the world. Contact us to discuss export possibilities to your market.</p>
            <Link href="/contact" className="btn-gold group">Get in Touch <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
