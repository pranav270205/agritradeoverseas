import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  Target,
  Globe,
  ShieldCheck,
  FileCheck,
  Users,
  Handshake,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import AnimatedSection from '@/components/AnimatedSection';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about AGRITRADE OVERSEAS — an India-based agricultural export company dedicated to supplying premium products to customers worldwide.',
};

const values = [
  {
    icon: ShieldCheck,
    title: 'Quality First',
    description:
      'We never compromise on quality. Every product is carefully inspected and tested before export.',
  },
  {
    icon: Handshake,
    title: 'Trust & Transparency',
    description:
      'We believe in building relationships through honest communication and transparent business practices.',
  },
  {
    icon: Globe,
    title: 'Global Vision',
    description:
      'Our vision extends beyond borders — connecting Indian agriculture with the world\'s markets.',
  },
  {
    icon: Users,
    title: 'Customer Partnership',
    description:
      'We treat every buyer as a long-term partner, understanding and adapting to their unique requirements.',
  },
];

const capabilities = [
  'Direct sourcing from India\'s premier agricultural regions',
  'State-of-the-art cleaning and grading processes',
  'Comprehensive quality testing for every batch',
  'Flexible packaging solutions for diverse market needs',
  'Complete export documentation and compliance support',
  'Dedicated logistics coordination for timely delivery',
  'Custom product specifications on request',
  'Responsive customer service and communication',
];

export default function AboutPage() {
  return (
    <>
      {/* Page Hero */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-primary via-primary-dark to-[#063d1a] overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
              backgroundSize: '40px 40px',
            }}
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <span className="inline-block px-4 py-1.5 bg-gold/20 text-gold rounded-full text-sm font-semibold mb-4 tracking-wider uppercase">
              About Us
            </span>
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              About <span className="text-gold-gradient">AGRITRADE OVERSEAS</span>
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Connecting India&apos;s finest agricultural products with global markets through
              quality, trust, and reliable export solutions.
            </p>
          </AnimatedSection>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* Company Story */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <AnimatedSection direction="left">
              <div className="relative">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="/images/hero-bg.png"
                    alt="AGRITRADE OVERSEAS operations"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent" />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-gold text-dark-text px-6 py-4 rounded-xl shadow-lg">
                  <p className="text-2xl font-bold" style={{ fontFamily: 'var(--font-heading)' }}>
                    Gujarat
                  </p>
                  <p className="text-sm font-medium">India</p>
                </div>
                <div className="absolute -top-4 -left-4 w-24 h-24 border-2 border-primary/20 rounded-2xl -z-10" />
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <span className="section-subtitle">Our Story</span>
              <h2 className="section-title mt-3 mb-6">
                Who We <span className="text-primary">Are</span>
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                AGRITRADE OVERSEAS is an India-based export company dedicated to supplying
                premium agricultural products to customers worldwide. We combine a strong
                sourcing network, strict quality standards, and dependable logistics to deliver
                products that meet international expectations.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                Based in Gujarat — the heart of India&apos;s agricultural trade — we have access
                to some of the finest growing regions for groundnuts, spices, grains, and
                other agricultural commodities. Our strategic location enables us to source
                directly from farms and processing units, ensuring freshness and quality at
                competitive prices.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Our mission is to connect global buyers with the finest agricultural
                commodities from India while building long-term relationships founded on
                trust, transparency, and consistent service.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 lg:py-28 bg-section-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <AnimatedSection delay={0}>
              <div className="bg-gradient-to-br from-primary to-primary-dark rounded-2xl p-8 lg:p-10 text-white h-full">
                <div className="w-14 h-14 rounded-xl bg-gold/20 flex items-center justify-center mb-6">
                  <Target size={28} className="text-gold" />
                </div>
                <h3
                  className="text-2xl font-bold mb-4"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  Our Mission
                </h3>
                <p className="text-white/80 leading-relaxed">
                  To be a trusted bridge between Indian agriculture and global markets by
                  delivering premium-quality products with integrity, efficiency, and a
                  commitment to exceeding customer expectations. We strive to create value
                  for our partners through consistent quality and dependable service.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.15}>
              <div className="bg-white rounded-2xl p-8 lg:p-10 shadow-lg border border-gray-100 h-full">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  <Globe size={28} className="text-primary" />
                </div>
                <h3
                  className="text-2xl font-bold text-dark-text mb-4"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  Our Vision
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  To become a globally recognized name in agricultural exports from India,
                  known for uncompromising quality, innovative trade solutions, and
                  partnerships that stand the test of time. We envision a future where Indian
                  agricultural excellence reaches every corner of the world.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-14">
            <span className="section-subtitle">What Drives Us</span>
            <h2 className="section-title mt-3 mb-4">
              Our Core <span className="text-primary">Values</span>
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <AnimatedSection key={value.title} delay={index * 0.1}>
                <div className="premium-card p-6 text-center h-full">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
                    <value.icon size={32} className="text-primary" />
                  </div>
                  <h3
                    className="text-lg font-bold text-dark-text mb-3"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {value.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-20 lg:py-28 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection direction="left">
              <span className="section-subtitle">What We Offer</span>
              <h2 className="section-title mt-3 mb-6">
                Our <span className="text-primary">Capabilities</span>
              </h2>
              <p className="text-gray-600 leading-relaxed mb-8">
                From sourcing to delivery, AGRITRADE OVERSEAS provides comprehensive export
                solutions designed to meet the highest expectations of international buyers.
              </p>
              <div className="space-y-3">
                {capabilities.map((cap, index) => (
                  <AnimatedSection key={index} delay={index * 0.05} direction="left">
                    <div className="flex items-start gap-3 group">
                      <CheckCircle2
                        size={20}
                        className="text-primary mt-0.5 shrink-0 group-hover:scale-110 transition-transform"
                      />
                      <p className="text-sm text-gray-700">{cap}</p>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Target, title: 'Quality Focus', desc: 'Rigorous testing standards' },
                  { icon: Globe, title: 'Global Reach', desc: 'Serving international markets' },
                  { icon: ShieldCheck, title: 'Trusted Sourcing', desc: 'Direct from Indian farms' },
                  { icon: FileCheck, title: 'Full Compliance', desc: 'Export documentation ready' },
                ].map((stat, index) => (
                  <div
                    key={stat.title}
                    className="bg-white rounded-xl p-5 shadow-md border border-gray-100 hover:border-primary/20 hover:shadow-lg transition-all group"
                  >
                    <stat.icon
                      size={28}
                      className="text-primary mb-3 group-hover:scale-110 transition-transform"
                    />
                    <h4 className="text-sm font-bold text-dark-text mb-1">{stat.title}</h4>
                    <p className="text-xs text-gray-500">{stat.desc}</p>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary-dark text-white text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2
              className="text-3xl sm:text-4xl font-bold mb-6"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Ready to Partner with Us?
            </h2>
            <p className="text-white/80 mb-8 text-lg">
              Get in touch to discuss your agricultural product requirements and explore how
              AGRITRADE OVERSEAS can serve your business.
            </p>
            <Link href="/contact" className="btn-gold group text-lg px-8 py-4">
              Contact Us Today
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
