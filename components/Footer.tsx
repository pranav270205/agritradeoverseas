import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import { productCategories } from '@/lib/products';

const FacebookIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>);
const InstagramIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>);
const LinkedinIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z"/></svg>);
const YoutubeIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.43zM9.75 15.02V8.48l5.75 3.27-5.75 3.27z"/></svg>);

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Products', href: '/products' },
  { label: 'Infrastructure', href: '/infrastructure' },
  { label: 'Why Choose Us', href: '/why-choose-us' },
  { label: 'Export Markets', href: '/export-markets' },
  { label: 'Certifications', href: '/certifications' },
  { label: 'Contact Us', href: '/contact' },
];

const socialLinks = [
  { icon: FacebookIcon, href: '#', label: 'Facebook' },
  { icon: InstagramIcon, href: '#', label: 'Instagram' },
  { icon: LinkedinIcon, href: '#', label: 'LinkedIn' },
  { icon: YoutubeIcon, href: '#', label: 'YouTube' },
];

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="relative w-12 h-12 overflow-hidden rounded-lg">
                <Image
                  src="/images/logo.png"
                  alt="AGRITRADE OVERSEAS"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="text-lg font-bold" style={{ fontFamily: 'var(--font-heading)' }}>
                  AGRITRADE
                </h3>
                <p className="text-xs font-medium tracking-widest text-gold">OVERSEAS</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              AGRITRADE OVERSEAS is an India-based export company dedicated to supplying premium
              agricultural products to customers worldwide with a commitment to quality and
              transparency.
            </p>
            {/* Social Icons */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all duration-300"
                >
                  <social.icon />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gold mb-5">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-2 text-gray-400 text-sm hover:text-white transition-colors group"
                  >
                    <ArrowRight
                      size={14}
                      className="text-primary group-hover:translate-x-1 transition-transform"
                    />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products — now shows categories */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gold mb-5">
              Our Products
            </h4>
            <ul className="space-y-3">
              {productCategories.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/products/${cat.slug}`}
                    className="flex items-center gap-2 text-gray-400 text-sm hover:text-white transition-colors group"
                  >
                    <ArrowRight
                      size={14}
                      className="text-primary group-hover:translate-x-1 transition-transform"
                    />
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gold mb-5">
              Contact Us
            </h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm text-white font-medium">AGRITRADE OVERSEAS</p>
                  <p className="text-sm text-gray-400">Gujarat, India</p>
                </div>
              </div>
              <a
                href="mailto:info@agritradeoverseas.com"
                className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors"
              >
                <Mail size={18} className="text-primary shrink-0" />
                <span className="text-sm">info@agritradeoverseas.com</span>
              </a>
              <a
                href="tel:+91XXXXXXXXXX"
                className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors"
              >
                <Phone size={18} className="text-primary shrink-0" />
                <span className="text-sm">+91 XXXXXXXXXX</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Tagline */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <p className="text-center text-sm text-gold/80 italic" style={{ fontFamily: 'var(--font-heading)' }}>
            Growing Trust. Delivering Quality. Connecting Global Markets.
          </p>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-center text-xs text-gray-500">
            © 2026 AGRITRADE OVERSEAS. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
