'use client';

import { Download } from 'lucide-react';
import { motion } from 'framer-motion';

const FacebookIcon = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>);
const InstagramIcon = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>);
const LinkedinIcon = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z"/></svg>);
const YoutubeIcon = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.43zM9.75 15.02V8.48l5.75 3.27-5.75 3.27z"/></svg>);

const socialLinks = [
  { icon: FacebookIcon, href: '#', label: 'Facebook', color: 'hover:bg-blue-600' },
  { icon: InstagramIcon, href: '#', label: 'Instagram', color: 'hover:bg-pink-600' },
  { icon: LinkedinIcon, href: '#', label: 'LinkedIn', color: 'hover:bg-blue-700' },
  { icon: YoutubeIcon, href: '#', label: 'YouTube', color: 'hover:bg-red-600' },
];

export default function SocialMediaBar() {
  return (
    <section className="py-6 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          {/* Social Media Icons */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-500 mr-2">Follow Us:</span>
            <div className="flex items-center gap-2 bg-primary rounded-full px-5 py-2.5">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300"
                >
                  <social.icon />
                </a>
              ))}
            </div>
          </div>

          {/* Brochure Download */}
          <a
            href="/brochure/agritrade-overseas-brochure.pdf"
            download
            className="flex items-center gap-4 group"
          >
            <div className="relative">
              {/* Concentric rings */}
              <div className="w-16 h-16 rounded-full border-2 border-primary/20 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full border-2 border-primary/40 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Download size={16} className="text-white" />
                  </div>
                </div>
              </div>
              {/* Animated ring */}
              <div className="absolute inset-0 rounded-full border-2 border-primary/10 animate-ping" />
            </div>
            <div>
              <p className="text-sm font-semibold text-primary group-hover:text-primary-dark transition-colors">
                Our Brochure
              </p>
              <p className="text-xs text-gray-500">Download PDF</p>
            </div>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
