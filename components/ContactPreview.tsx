'use client';

import Link from 'next/link';
import { Mail, Phone, MapPin, ArrowRight, Clock } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

const contactInfo = [
  {
    icon: MapPin,
    label: 'Visit Us',
    value: 'Gujarat, India',
    detail: 'AGRITRADE OVERSEAS',
  },
  {
    icon: Mail,
    label: 'Email Us',
    value: 'info@agritradeoverseas.com',
    href: 'mailto:info@agritradeoverseas.com',
  },
  {
    icon: Phone,
    label: 'Call Us',
    value: '+91 XXXXXXXXXX',
    href: 'tel:+91XXXXXXXXXX',
  },
  {
    icon: Clock,
    label: 'Working Hours',
    value: 'Mon - Sat: 9:00 AM - 6:00 PM IST',
  },
];

export default function ContactPreview() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left: Info */}
          <AnimatedSection direction="left">
            <span className="section-subtitle">Get In Touch</span>
            <h2 className="section-title mt-3 mb-6">
              Ready to <span className="text-primary">Start Trading?</span>
            </h2>
            <p className="text-gray-600 leading-relaxed mb-8">
              Whether you&apos;re looking for a specific agricultural product or want to discuss
              bulk export requirements, our team is ready to assist you. Reach out to us today.
            </p>

            <div className="space-y-5 mb-8">
              {contactInfo.map((info) => (
                <div key={info.label} className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                    <info.icon size={22} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">{info.label}</p>
                    {info.href ? (
                      <a
                        href={info.href}
                        className="text-dark-text font-semibold hover:text-primary transition-colors"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-dark-text font-semibold">{info.value}</p>
                    )}
                    {info.detail && (
                      <p className="text-sm text-gray-500">{info.detail}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <Link href="/contact" className="btn-primary group">
              Send an Inquiry
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </AnimatedSection>

          {/* Right: Map Placeholder */}
          <AnimatedSection direction="right">
            <div className="relative h-full min-h-[400px] rounded-2xl overflow-hidden shadow-xl">
              {/* Map placeholder with styled background */}
              <div className="absolute inset-0 bg-gradient-to-br from-section-alt to-cream flex items-center justify-center">
                <div className="text-center">
                  <MapPin size={48} className="text-primary mx-auto mb-4 animate-float" />
                  <h4
                    className="text-xl font-bold text-dark-text mb-2"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    AGRITRADE OVERSEAS
                  </h4>
                  <p className="text-gray-600">Gujarat, India</p>
                  <a
                    href="https://maps.google.com/?q=Gujarat+India"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors"
                  >
                    Open in Google Maps
                    <ArrowRight size={14} />
                  </a>
                </div>
              </div>
              {/* Border decoration */}
              <div className="absolute inset-0 border-2 border-primary/10 rounded-2xl" />
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
