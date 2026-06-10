'use client';

import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, MessageCircle, AlertCircle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { productCategories } from '@/lib/products';
import AnimatedSection from '@/components/AnimatedSection';

// ──────────────────────────────────────────────────────────────
// EmailJS Configuration
// Dashboard: https://dashboard.emailjs.com
// ──────────────────────────────────────────────────────────────
const EMAILJS_SERVICE_ID  = 'service_tp9vc8y';
const EMAILJS_TEMPLATE_ID = 'template_lvg7iva';
const EMAILJS_PUBLIC_KEY   = 'jDLfzLQ03wKnrMeVx';

const contactInfo = [
  { icon: MapPin, label: 'Our Location', value: 'Jamnagar, Gujarat, India', detail: 'Naklank Ranuja Mandir, Aliya Bada \u2013 Jambuda Road, Gujarat \u2013 361120' },
  { icon: Mail, label: 'Email Us', value: 'agritradeoverseas07@gmail.com', href: 'mailto:agritradeoverseas07@gmail.com' },
  { icon: Phone, label: 'Call Us', value: '+91 93286 33775', href: 'tel:+919328633775' },
  { icon: Clock, label: 'Working Hours', value: 'Monday \u2013 Saturday: 9:00 AM \u2013 6:00 PM IST', detail: 'Sunday: Closed' },
];

export default function ContactPage() {
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: '', companyName: '', email: '', phone: '', country: '', productInterested: '', message: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Validate EmailJS credentials are configured
    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      console.error('[EmailJS] Missing credentials — Service ID, Template ID, or Public Key is not set.');
      setError('Unable to send inquiry. Please try again or contact us directly.');
      setIsLoading(false);
      return;
    }

    // Template parameters — must match EmailJS template variables exactly
    const templateParams = {
      from_name: formData.name,
      company_name: formData.companyName || 'Not provided',
      from_email: formData.email,
      phone: formData.phone || 'Not provided',
      country: formData.country,
      product: formData.productInterested || 'Not specified',
      message: formData.message,
    };

    console.log('[EmailJS] Sending inquiry...', { service: EMAILJS_SERVICE_ID, template: EMAILJS_TEMPLATE_ID });

    try {
      const result = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY,
      );

      console.log('[EmailJS] Success:', result.status, result.text);
      setIsSubmitted(true);
      setFormData({ name: '', companyName: '', email: '', phone: '', country: '', productInterested: '', message: '' });
    } catch (err) {
      console.error('[EmailJS] Error:', err);
      setError('Unable to send inquiry. Please try again or contact us directly.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendAnother = () => {
    setIsSubmitted(false);
    setError('');
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
                  href="https://wa.me/919328633775?text=Hello%2C%20I%20am%20interested%20in%20your%20agricultural%20products."
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
                        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
                          <CheckCircle2 size={48} className="text-primary" />
                        </div>
                        <h4 className="text-xl font-bold text-dark-text mb-2">Thank You!</h4>
                        <p className="text-gray-600 mb-6 max-w-md mx-auto">Your inquiry has been submitted successfully. Our team will contact you shortly.</p>
                        <button
                          onClick={handleSendAnother}
                          className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-primary border border-primary/30 rounded-lg hover:bg-primary/5 transition-colors"
                        >
                          <Send size={16} /> Send Another Inquiry
                        </button>
                      </motion.div>
                    ) : (
                      <motion.form key="form" ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                        {/* Error Message */}
                        <AnimatePresence>
                          {error && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg"
                            >
                              <AlertCircle size={20} className="text-red-500 shrink-0 mt-0.5" />
                              <p className="text-sm text-red-700">{error}</p>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">Name *</label>
                            <input type="text" id="name" name="name" required value={formData.name} onChange={handleChange} disabled={isLoading} className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all disabled:opacity-60 disabled:cursor-not-allowed" placeholder="Your name" />
                          </div>
                          <div>
                            <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1.5">Company Name</label>
                            <input type="text" id="companyName" name="companyName" value={formData.companyName} onChange={handleChange} disabled={isLoading} className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all disabled:opacity-60 disabled:cursor-not-allowed" placeholder="Company name" />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">Email *</label>
                            <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange} disabled={isLoading} className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all disabled:opacity-60 disabled:cursor-not-allowed" placeholder="your@email.com" />
                          </div>
                          <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1.5">Phone</label>
                            <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} disabled={isLoading} className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all disabled:opacity-60 disabled:cursor-not-allowed" placeholder="+91 23456 78900" />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <div>
                            <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1.5">Country *</label>
                            <input type="text" id="country" name="country" required value={formData.country} onChange={handleChange} disabled={isLoading} className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all disabled:opacity-60 disabled:cursor-not-allowed" placeholder="Your country" />
                          </div>
                          <div>
                            <label htmlFor="productInterested" className="block text-sm font-medium text-gray-700 mb-1.5">Product Interested In</label>
                            <select id="productInterested" name="productInterested" value={formData.productInterested} onChange={handleChange} disabled={isLoading} className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white disabled:opacity-60 disabled:cursor-not-allowed">
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
                          <textarea id="message" name="message" required rows={5} value={formData.message} onChange={handleChange} disabled={isLoading} className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none disabled:opacity-60 disabled:cursor-not-allowed" placeholder="Tell us about your requirements..." />
                        </div>
                        <button
                          type="submit"
                          disabled={isLoading}
                          className="btn-primary w-full sm:w-auto disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                          {isLoading ? (
                            <>
                              <Loader2 size={18} className="animate-spin" /> Sending Inquiry...
                            </>
                          ) : (
                            <>
                              <Send size={18} /> Send Inquiry
                            </>
                          )}
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
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl">
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
              {/* Overlay with business info and Open in Maps button */}
              <div className="absolute bottom-4 left-4 right-4 flex justify-center">
                <div className="inline-flex items-center gap-4 px-6 py-3 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg">
                  <div className="hidden sm:block">
                    <h4 className="text-sm font-bold text-dark-text" style={{ fontFamily: 'var(--font-heading)' }}>AGRITRADE OVERSEAS</h4>
                    <p className="text-xs text-gray-500">Jamnagar, Gujarat, India</p>
                  </div>
                  <a
                    href="https://maps.app.goo.gl/CphZC4yfTwZkhF8u9"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors"
                  >
                    <MapPin size={14} />
                    Open in Google Maps
                  </a>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
