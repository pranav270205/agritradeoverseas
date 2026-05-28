'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { productCategories } from '@/lib/products';
import AnimatedSection from '@/components/AnimatedSection';

const contactInfo = [
  { icon: MapPin, label: 'Our Location', value: 'Gujarat, India', detail: 'AGRITRADE OVERSEAS' },
  { icon: Mail, label: 'Email Us', value: 'info@agritradeoverseas.com', href: 'mailto:info@agritradeoverseas.com' },
  { icon: Phone, label: 'Call Us', value: '+91 XXXXXXXXXX', href: 'tel:+91XXXXXXXXXX' },
  { icon: Clock, label: 'Working Hours', value: 'Mon - Sat: 9:00 AM - 6:00 PM IST' },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '', companyName: '', email: '', phone: '', country: '', productInterested: '', message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <>
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-primary via-primary-dark to-[#063d1a] overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`, backgroundSize: '40px 40px' }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <span className="inline-block px-4 py-1.5 bg-gold/20 text-gold rounded-full text-sm font-semibold mb-4 tracking-wider uppercase">Contact Us</span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
              Get In <span className="text-gold-gradient">Touch</span>
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">Ready to discuss your agricultural product requirements? We&apos;d love to hear from you.</p>
          </AnimatedSection>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent" />
      </section>

      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Contact Info */}
            <div className="lg:col-span-2">
              <AnimatedSection direction="left">
                <span className="section-subtitle">Reach Out</span>
                <h2 className="section-title mt-3 mb-6">Contact <span className="text-primary">Information</span></h2>
                <p className="text-gray-600 leading-relaxed mb-8">Whether you&apos;re looking for a specific product or want to discuss export requirements, our team is ready to assist you.</p>

                <div className="space-y-5 mb-8">
                  {contactInfo.map((info) => (
                    <div key={info.label} className="flex items-start gap-4 group">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                        <info.icon size={22} className="text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">{info.label}</p>
                        {info.href ? (
                          <a href={info.href} className="text-dark-text font-semibold hover:text-primary transition-colors">{info.value}</a>
                        ) : (
                          <p className="text-dark-text font-semibold">{info.value}</p>
                        )}
                        {info.detail && <p className="text-sm text-gray-500">{info.detail}</p>}
                      </div>
                    </div>
                  ))}
                </div>

                {/* WhatsApp CTA */}
                <a
                  href="https://wa.me/91XXXXXXXXXX?text=Hello%2C%20I%20am%20interested%20in%20your%20agricultural%20products."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-6 py-3 bg-[#25D366] text-white rounded-xl font-semibold text-sm hover:bg-[#20bd5a] transition-colors"
                >
                  <MessageCircle size={20} fill="white" />
                  Chat on WhatsApp
                </a>
              </AnimatedSection>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <AnimatedSection direction="right">
                <div className="premium-card p-6 sm:p-8">
                  <h3 className="text-xl font-bold text-dark-text mb-6" style={{ fontFamily: 'var(--font-heading)' }}>Send Us an Inquiry</h3>

                  <AnimatePresence mode="wait">
                    {isSubmitted ? (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-center py-12"
                      >
                        <CheckCircle2 size={64} className="text-primary mx-auto mb-4" />
                        <h4 className="text-xl font-bold text-dark-text mb-2">Thank You!</h4>
                        <p className="text-gray-600">Your inquiry has been received. We&apos;ll get back to you shortly.</p>
                      </motion.div>
                    ) : (
                      <motion.form key="form" onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">Name *</label>
                            <input type="text" id="name" name="name" required value={formData.name} onChange={handleChange} className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" placeholder="Your name" />
                          </div>
                          <div>
                            <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1.5">Company Name</label>
                            <input type="text" id="companyName" name="companyName" value={formData.companyName} onChange={handleChange} className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" placeholder="Company name" />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">Email *</label>
                            <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange} className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" placeholder="your@email.com" />
                          </div>
                          <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1.5">Phone</label>
                            <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" placeholder="+1 234 567 8900" />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <div>
                            <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1.5">Country *</label>
                            <input type="text" id="country" name="country" required value={formData.country} onChange={handleChange} className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" placeholder="Your country" />
                          </div>
                          <div>
                            <label htmlFor="productInterested" className="block text-sm font-medium text-gray-700 mb-1.5">Product Interested In</label>
                            <select id="productInterested" name="productInterested" value={formData.productInterested} onChange={handleChange} className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white">
                              <option value="">Select a product</option>
                              {productCategories.map((cat) => (
                                <optgroup key={cat.slug} label={cat.name}>
                                  {cat.subProducts.map((p) => (
                                    <option key={p.slug} value={p.name}>{p.name}</option>
                                  ))}
                                </optgroup>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div>
                          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1.5">Message *</label>
                          <textarea id="message" name="message" required rows={5} value={formData.message} onChange={handleChange} className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none" placeholder="Tell us about your requirements..." />
                        </div>
                        <button type="submit" className="btn-primary w-full sm:w-auto">
                          <Send size={18} /> Send Inquiry
                        </button>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="py-16 bg-section-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-section-alt to-cream flex items-center justify-center">
              <div className="text-center">
                <MapPin size={48} className="text-primary mx-auto mb-4 animate-float" />
                <h4 className="text-xl font-bold text-dark-text mb-2" style={{ fontFamily: 'var(--font-heading)' }}>AGRITRADE OVERSEAS</h4>
                <p className="text-gray-600 mb-4">Gujarat, India</p>
                <a href="https://maps.google.com/?q=Gujarat+India" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors">
                  Open in Google Maps
                </a>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
