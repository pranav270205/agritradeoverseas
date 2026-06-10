'use client';

import { motion } from 'framer-motion';
import { Shield, FileCheck, BadgeCheck, ClipboardCheck } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

const certifications = [
  {
    icon: BadgeCheck,
    title: 'APEDA Registration',
    description: 'Registered with Agricultural and Processed Food Products Export Development Authority for agricultural exports.',
  },
  {
    icon: FileCheck,
    title: 'IEC (Import Export Code)',
    description: 'Valid Import Export Code issued by the Directorate General of Foreign Trade, Government of India.',
  },
  {
    icon: ClipboardCheck,
    title: 'GST Registration',
    description: 'Fully registered under the Goods and Services Tax framework for transparent and compliant business operations.',
  },
  {
    icon: Shield,
    title: 'FSSAI License',
    description: 'Licensed under the Food Safety and Standards Authority of India for food product handling and export.',
  },
];

export default function CertificationsSection() {
  return (
    <section className="py-20 lg:py-28 bg-section-alt">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <AnimatedSection className="text-center mb-14">
          <span className="section-subtitle">Compliance & Trust</span>
          <h2 className="section-title mt-3 mb-4">
            Compliance & <span className="text-primary">Certifications</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Registered and Compliance Ready — We maintain all necessary registrations and
            certifications to ensure smooth international trade operations.
          </p>
        </AnimatedSection>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {certifications.map((cert, index) => (
            <AnimatedSection key={cert.title} delay={index * 0.1}>
              <motion.div
                whileHover={{ y: -8 }}
                className="premium-card p-6 text-center h-full"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
                  <cert.icon size={32} className="text-primary" />
                </div>
                <h3
                  className="text-base font-bold text-dark-text mb-3"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {cert.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">{cert.description}</p>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
