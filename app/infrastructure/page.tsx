import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Sparkles, SearchCheck, Package, Ship, Warehouse, TrendingUp } from 'lucide-react';
import AnimatedSection from '@/components/AnimatedSection';
import InfrastructureGallery from '@/components/InfrastructureGallery';
import { infrastructureGallery, processingCapabilities } from '@/lib/infrastructure';

export const metadata: Metadata = {
  title: 'Infrastructure & Processing Capability | AGRITRADE OVERSEAS',
  description: 'AGRITRADE OVERSEAS is focused on developing quality-oriented agricultural processing and export infrastructure designed for global market standards.',
};

const iconMap: Record<string, React.ReactNode> = {
  Sparkles: <Sparkles size={28} />,
  SearchCheck: <SearchCheck size={28} />,
  Package: <Package size={28} />,
  Ship: <Ship size={28} />,
  Warehouse: <Warehouse size={28} />,
  TrendingUp: <TrendingUp size={28} />,
};

export default function InfrastructurePage() {
  return (
    <>
      {/* ===== HERO SECTION ===== */}
      <section className="relative pt-32 pb-24 lg:pb-32 overflow-hidden">
        {/* Background — placeholder for factory image */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#062a13] via-primary-dark to-[#063d1a]">
          {/* Placeholder pattern overlay */}
          <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`, backgroundSize: '30px 30px' }} />
          {/* Decorative shapes */}
          <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-gold/5 blur-3xl" />
          <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-primary-light/5 blur-3xl" />
        </div>
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/30" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <span className="inline-block px-4 py-1.5 bg-gold/20 text-gold rounded-full text-sm font-semibold mb-6 tracking-wider uppercase">
              Our Infrastructure
            </span>
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Advanced Processing{' '}
              <span className="text-gold-gradient">Infrastructure</span>
            </h1>
            <p className="text-lg lg:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              Building quality-focused agricultural processing and export infrastructure designed to support global standards and scalable operations.
            </p>
          </AnimatedSection>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* ===== INFRASTRUCTURE OVERVIEW ===== */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedSection>
              <span className="section-subtitle">Overview</span>
              <h2 className="section-title mt-3 mb-6">
                Infrastructure & <span className="text-primary">Processing Capability</span>
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                AGRITRADE OVERSEAS is focused on developing modern processing and operational systems designed to support premium agricultural exports. Our infrastructure approach emphasizes quality handling, efficient processing, export readiness, and scalable growth for international markets.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ===== IMAGE GALLERY / CAROUSEL ===== */}
      <section className="py-16 lg:py-20 bg-section-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <span className="section-subtitle">Gallery</span>
            <h2 className="section-title mt-3 mb-4">
              Our <span className="text-primary">Facility</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Take a visual tour of our processing infrastructure, designed for quality-focused agricultural operations.
            </p>
          </AnimatedSection>

          <AnimatedSection>
            <InfrastructureGallery items={infrastructureGallery} />
          </AnimatedSection>
        </div>
      </section>

      {/* ===== PROCESSING CAPABILITIES ===== */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-14">
            <span className="section-subtitle">Capabilities</span>
            <h2 className="section-title mt-3 mb-4">
              Processing <span className="text-primary">Capabilities</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our operational systems are designed to handle the full spectrum of agricultural processing, from raw material intake to export-ready packaging.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {processingCapabilities.map((cap, index) => (
              <AnimatedSection key={cap.title} delay={index * 0.08}>
                <div className="premium-card p-6 lg:p-8 h-full group">
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center text-primary mb-5 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                    {iconMap[cap.icon] || <Sparkles size={28} />}
                  </div>
                  <h3
                    className="text-lg font-bold text-dark-text mb-3 group-hover:text-primary transition-colors"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {cap.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {cap.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ===== QUALITY STANDARDS ===== */}
      <section className="py-20 lg:py-28 bg-gradient-to-br from-primary via-primary-dark to-[#063d1a] text-white overflow-hidden relative">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`, backgroundSize: '40px 40px' }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedSection>
              <span className="inline-block px-4 py-1.5 bg-gold/20 text-gold rounded-full text-sm font-semibold mb-6 tracking-wider uppercase">
                Quality Standards
              </span>
              <h2
                className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Commitment to{' '}
                <span className="text-gold-gradient">Quality Standards</span>
              </h2>
              <p className="text-lg text-white/80 leading-relaxed">
                Our operational approach focuses on quality handling, hygienic processing practices, careful inspection, and export-oriented packaging systems designed to meet international buyer expectations.
              </p>
            </AnimatedSection>

            {/* Quality pillars */}
            <AnimatedSection delay={0.2}>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-12">
                {[
                  { label: 'Quality Handling', value: 'Multi-Stage' },
                  { label: 'Processing', value: 'Hygienic' },
                  { label: 'Inspection', value: 'Rigorous' },
                  { label: 'Packaging', value: 'Export-Ready' },
                ].map((pillar) => (
                  <div key={pillar.label} className="glass-effect rounded-xl p-5">
                    <p className="text-2xl font-bold text-gold mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
                      {pillar.value}
                    </p>
                    <p className="text-sm text-white/70">{pillar.label}</p>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="py-20 lg:py-24 bg-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2
              className="text-3xl sm:text-4xl font-bold text-dark-text mb-4"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Looking for Reliable Agricultural{' '}
              <span className="text-primary">Export Solutions?</span>
            </h2>
            <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
              Partner with AGRITRADE OVERSEAS for quality-focused agricultural sourcing and professional export support.
            </p>
            <Link href="/contact" className="btn-primary group">
              Request a Quote
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
