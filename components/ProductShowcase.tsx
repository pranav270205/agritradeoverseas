'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { productCategories } from '@/lib/products';
import AnimatedSection from './AnimatedSection';

export default function ProductShowcase() {
  return (
    <section className="py-20 lg:py-28 bg-section-alt">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <AnimatedSection className="text-center mb-14">
          <span className="section-subtitle">Our Products</span>
          <h2 className="section-title mt-3 mb-4">
            Premium <span className="text-primary">Agricultural Products</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our carefully curated range of export-quality agricultural products sourced
            from India&apos;s finest growing regions.
          </p>
        </AnimatedSection>

        {/* Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {productCategories.map((cat, index) => (
            <AnimatedSection key={cat.slug} delay={index * 0.1}>
              <motion.div
                className="premium-card overflow-hidden group"
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
              >
                {/* Image */}
                <div className={`relative aspect-[4/3] overflow-hidden ${cat.image ? '' : 'bg-gradient-to-br from-gray-200 to-gray-300'}`}>
                  {cat.image ? (
                    <>
                      <Image
                        src={cat.image}
                        alt={cat.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5">
                      <div className="text-center">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-primary/30 mx-auto mb-2">
                          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                          <circle cx="8.5" cy="8.5" r="1.5"/>
                          <polyline points="21 15 16 10 5 21"/>
                        </svg>
                        <p className="text-xs text-primary/30">{cat.name}</p>
                      </div>
                    </div>
                  )}
                  
                  {/* Subproduct count badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-primary/90 text-white text-xs font-medium rounded-full">
                      {cat.subProducts.length} {cat.subProducts.length === 1 ? 'Product' : 'Products'}
                    </span>
                  </div>

                  {/* Hover Actions */}
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    <Link
                      href={`/products/${cat.slug}`}
                      className="flex items-center justify-center gap-2 w-full py-2.5 bg-white text-primary rounded-lg text-sm font-semibold hover:bg-primary hover:text-white transition-colors"
                    >
                      Explore Category
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3
                    className="text-lg font-bold text-dark-text mb-2 group-hover:text-primary transition-colors"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {cat.name}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-2">
                    {cat.description}
                  </p>
                  <div className="flex items-center gap-3">
                    <Link
                      href={`/products/${cat.slug}`}
                      className="flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-dark transition-colors"
                    >
                      Explore Category
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>

        {/* View All Button */}
        <AnimatedSection className="text-center mt-12">
          <Link href="/products" className="btn-primary group">
            View All Products
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
