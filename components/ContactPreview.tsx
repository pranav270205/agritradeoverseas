'use client';

import Link from 'next/link';
import { Mail, Phone, MapPin, ArrowRight, Clock } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

const contactInfo = [
  {
    icon: MapPin,
    label: 'Visit Us',
    value: 'Jamnagar, Gujarat, India',
    detail: 'Naklank Ranuja Mandir, Aliya Bada \u2013 Jambuda Road',
  },
  {
    icon: Mail,
    label: 'Email Us',
    value: 'agritradeoverseas07@gmail.com',
    href: 'mailto:agritradeoverseas07@gmail.com',
  },
  {
    icon: Phone,
    label: 'Call Us',
    value: '+91 93286 33775',
    href: 'tel:+919328633775',
  },
  {
    icon: Clock,
    label: 'Working Hours',
    value: 'Mon \u2013 Sat: 9:00 AM \u2013 6:00 PM IST',
    detail: 'Sunday: Closed',
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
              {/* Embedded Google Map */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.0!2d70.07!3d22.47!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDI4JzEyLjAiTiA3MMKwMDQnMTIuMCJF!5e0!3m2!1sen!2sin!4v1700000000000"
                width="100%"
                height="100%"
                style={{ border: 0, position: 'absolute', inset: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="AGRITRADE OVERSEAS Location - Jamnagar, Gujarat, India"
              />
              {/* Overlay with Open in Maps button */}
              <div className="absolute bottom-4 left-4 right-4 flex justify-center">
                <a
                  href="https://maps.app.goo.gl/CphZC4yfTwZkhF8u9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/95 backdrop-blur-sm text-primary rounded-xl text-sm font-semibold hover:bg-white shadow-lg transition-all"
                >
                  <MapPin size={16} />
                  Open in Google Maps
                  <ArrowRight size={14} />
                </a>
              </div>
              {/* Border decoration */}
              <div className="absolute inset-0 border-2 border-primary/10 rounded-2xl pointer-events-none" />
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
