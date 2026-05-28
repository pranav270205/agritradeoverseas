import type { Metadata } from 'next';
import Link from 'next/link';
import { Award, Network, BadgeDollarSign, Clock, FileText, Users, ArrowRight, CheckCircle2 } from 'lucide-react';
import AnimatedSection from '@/components/AnimatedSection';

export const metadata: Metadata = {
  title: 'Why Choose Us',
  description: 'Discover why global buyers choose AGRITRADE OVERSEAS for premium agricultural products from India.',
};

const reasons = [
  { icon: Award, title: 'Premium Quality Standards', description: 'Every product undergoes rigorous quality checks to ensure it meets international standards for purity, consistency, and safety. We use advanced testing methods to verify moisture content, foreign matter, and contamination levels.' },
  { icon: Network, title: 'Reliable Sourcing Network', description: 'Our extensive network of farmers and suppliers across India\'s premier agricultural regions ensures a consistent supply of the finest commodities. We maintain direct relationships with producers for quality assurance.' },
  { icon: BadgeDollarSign, title: 'Competitive Pricing', description: 'Direct sourcing from producers and efficient supply chain management enable us to offer competitive prices without compromising on product quality. We deliver value that benefits your bottom line.' },
  { icon: Clock, title: 'Timely Global Delivery', description: 'Our logistics partnerships with leading shipping lines and freight forwarders ensure your orders are delivered on time, every time, to any destination worldwide with full tracking visibility.' },
  { icon: FileText, title: 'Export Documentation Support', description: 'Complete documentation support including certificates of origin, phytosanitary certificates, fumigation certificates, and all customs documentation for seamless international trade.' },
  { icon: Users, title: 'Customer-Focused Approach', description: 'We prioritize understanding your unique requirements and deliver personalized solutions. Our responsive team ensures clear communication throughout the entire trading process.' },
];

const processSteps = [
  'Initial inquiry and requirement discussion',
  'Product sourcing and sample preparation',
  'Quality testing and certification',
  'Pricing and terms finalization',
  'Order processing and packaging',
  'Documentation and customs clearance',
  'Shipment and tracking',
  'Delivery confirmation and feedback',
];

export default function WhyChooseUsPage() {
  return (
    <>
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-primary via-primary-dark to-[#063d1a] overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`, backgroundSize: '40px 40px' }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <span className="inline-block px-4 py-1.5 bg-gold/20 text-gold rounded-full text-sm font-semibold mb-4 tracking-wider uppercase">Our Advantages</span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
              Why Global Buyers <span className="text-gold-gradient">Choose Us</span>
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">We bring together quality, reliability, and expertise to deliver an exceptional trading experience.</p>
          </AnimatedSection>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent" />
      </section>

      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {reasons.map((reason, index) => (
              <AnimatedSection key={reason.title} delay={index * 0.1}>
                <div className="premium-card p-7 h-full group">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                    <reason.icon size={28} className="text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-dark-text mb-3" style={{ fontFamily: 'var(--font-heading)' }}>{reason.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{reason.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-section-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection direction="left">
              <span className="section-subtitle">Our Process</span>
              <h2 className="section-title mt-3 mb-6">How We <span className="text-primary">Work With You</span></h2>
              <p className="text-gray-600 leading-relaxed mb-8">From initial inquiry to final delivery, our streamlined process ensures a smooth and transparent trading experience at every step.</p>
              <div className="space-y-4">
                {processSteps.map((step, i) => (
                  <AnimatedSection key={i} delay={i * 0.06} direction="left">
                    <div className="flex items-center gap-4 group">
                      <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold shrink-0 group-hover:bg-gold group-hover:text-dark-text transition-colors">{i + 1}</div>
                      <p className="text-sm text-gray-700 font-medium">{step}</p>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </AnimatedSection>
            <AnimatedSection direction="right">
              <div className="bg-gradient-to-br from-primary to-primary-dark rounded-2xl p-10 text-white text-center">
                <Award size={64} className="mx-auto mb-6 text-gold" />
                <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>Committed to Excellence</h3>
                <p className="text-white/80 leading-relaxed mb-6">At AGRITRADE OVERSEAS, excellence is not just a goal — it is our standard. We are committed to delivering products and services that consistently exceed expectations.</p>
                <Link href="/contact" className="btn-gold group">Get Started Today <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></Link>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-primary to-primary-dark text-white text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>Ready to Experience the Difference?</h2>
            <p className="text-white/80 mb-8">Partner with AGRITRADE OVERSEAS and discover why buyers across the globe trust us.</p>
            <Link href="/contact" className="btn-gold group">Request a Quote <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
