import type { Metadata } from 'next';
import Link from 'next/link';
import { Shield, FileCheck, BadgeCheck, ClipboardCheck, ArrowRight, CheckCircle2 } from 'lucide-react';
import AnimatedSection from '@/components/AnimatedSection';

export const metadata: Metadata = {
  title: 'Certifications',
  description: 'AGRITRADE OVERSEAS maintains all necessary registrations and certifications for smooth international agricultural trade operations.',
};

const certifications = [
  { icon: BadgeCheck, title: 'APEDA Registration', description: 'Registered with Agricultural and Processed Food Products Export Development Authority (APEDA), enabling us to export a wide range of agricultural and processed food products from India. This registration ensures compliance with India\'s agricultural export policies and standards.', details: ['Agricultural export authorization', 'Product quality monitoring', 'Export promotion support', 'Market development assistance'] },
  { icon: FileCheck, title: 'IEC (Import Export Code)', description: 'Valid Import Export Code issued by the Directorate General of Foreign Trade (DGFT), Government of India. This is the primary document required for carrying out international trade operations from India.', details: ['Legal authorization for international trade', 'Customs clearance facilitation', 'Foreign exchange transaction compliance', 'Trade data reporting'] },
  { icon: ClipboardCheck, title: 'GST Registration', description: 'Fully registered under the Goods and Services Tax (GST) framework of India. This ensures transparent and compliant domestic and international business operations with proper tax documentation.', details: ['Transparent tax compliance', 'Input tax credit benefits', 'Proper invoicing and documentation', 'Interstate trade facilitation'] },
  { icon: Shield, title: 'FSSAI License', description: 'Licensed under the Food Safety and Standards Authority of India (FSSAI) for handling, processing, and exporting food products. This license ensures our products meet India\'s food safety regulations.', details: ['Food safety compliance', 'Quality assurance standards', 'Hygiene and sanitation protocols', 'Product labeling compliance'] },
];

const complianceAreas = [
  'International food safety standards compliance',
  'Phytosanitary certificate procurement',
  'Certificate of origin documentation',
  'Fumigation certification as required',
  'Laboratory testing and analysis reports',
  'Buyer-specific compliance requirements',
];

export default function CertificationsPage() {
  return (
    <>
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-primary via-primary-dark to-[#063d1a] overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`, backgroundSize: '40px 40px' }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <span className="inline-block px-4 py-1.5 bg-gold/20 text-gold rounded-full text-sm font-semibold mb-4 tracking-wider uppercase">Compliance & Trust</span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
              Compliance & <span className="text-gold-gradient">Certifications</span>
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">Registered and Compliance Ready — maintaining all necessary certifications for smooth international trade.</p>
          </AnimatedSection>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent" />
      </section>

      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {certifications.map((cert, index) => (
              <AnimatedSection key={cert.title} delay={index * 0.1}>
                <div className="premium-card p-7 h-full group">
                  <div className="flex items-start gap-4 mb-5">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                      <cert.icon size={28} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-dark-text" style={{ fontFamily: 'var(--font-heading)' }}>{cert.title}</h3>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed mb-5">{cert.description}</p>
                  <div className="space-y-2">
                    {cert.details.map((detail, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <CheckCircle2 size={14} className="text-primary shrink-0" />
                        <p className="text-xs text-gray-600">{detail}</p>
                      </div>
                    ))}
                  </div>
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
              <span className="section-subtitle">Additional Compliance</span>
              <h2 className="section-title mt-3 mb-6">Export <span className="text-primary">Documentation</span></h2>
              <p className="text-gray-600 leading-relaxed mb-8">Beyond our core registrations, we ensure complete compliance with all export documentation requirements specific to each destination country and product category.</p>
              <div className="space-y-3">
                {complianceAreas.map((area, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="text-primary mt-0.5 shrink-0" />
                    <p className="text-sm text-gray-700">{area}</p>
                  </div>
                ))}
              </div>
            </AnimatedSection>
            <AnimatedSection direction="right">
              <div className="bg-gradient-to-br from-primary to-primary-dark rounded-2xl p-10 text-center text-white">
                <Shield size={64} className="mx-auto mb-6 text-gold" />
                <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>Fully Compliant</h3>
                <p className="text-white/80 leading-relaxed">AGRITRADE OVERSEAS maintains complete compliance with all Indian and international trade regulations to ensure seamless export operations.</p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-primary to-primary-dark text-white text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>Need Documentation Support?</h2>
            <p className="text-white/80 mb-8">Our team handles all export documentation to ensure hassle-free international trade.</p>
            <Link href="/contact" className="btn-gold group">Contact Us <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
