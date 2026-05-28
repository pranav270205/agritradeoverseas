import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { productCategories } from '@/lib/products';
import AnimatedSection from '@/components/AnimatedSection';

export const metadata: Metadata = {
  title: 'Products',
  description: 'Explore our premium range of Indian agricultural products for export — Groundnuts, Spices, Pulses, Sesame Seeds, Grains, and Dry Fruits.',
};

export default function ProductsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-primary via-primary-dark to-[#063d1a] overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`, backgroundSize: '40px 40px' }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <span className="inline-block px-4 py-1.5 bg-gold/20 text-gold rounded-full text-sm font-semibold mb-4 tracking-wider uppercase">Our Products</span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
              Premium <span className="text-gold-gradient">Agricultural Products</span>
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Discover our carefully curated range of export-quality agricultural products sourced from India&apos;s finest growing regions, organized across six major product categories.
            </p>
          </AnimatedSection>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* Category Cards Grid */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-14">
            <span className="section-subtitle">Product Categories</span>
            <h2 className="section-title mt-3 mb-4">
              Explore Our <span className="text-primary">Export Portfolio</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              From premium groundnuts and aromatic spices to protein-rich pulses and specialty grains — we source, process, and export India&apos;s finest agricultural commodities.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {productCategories.map((cat, index) => (
              <AnimatedSection key={cat.slug} delay={index * 0.08}>
                <Link href={`/products/${cat.slug}`} className="premium-card overflow-hidden group block h-full">
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
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      </>
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-primary/30">
                          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                          <circle cx="8.5" cy="8.5" r="1.5"/>
                          <polyline points="21 15 16 10 5 21"/>
                        </svg>
                      </div>
                    )}
                    {/* Category name overlay */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3
                        className="text-xl font-bold text-white mb-1"
                        style={{ fontFamily: 'var(--font-heading)' }}
                      >
                        {cat.name}
                      </h3>
                      <span className="inline-block px-2.5 py-0.5 bg-gold/90 text-dark-text text-xs font-semibold rounded-full">
                        {cat.subProducts.length} {cat.subProducts.length === 1 ? 'Product' : 'Products'}
                      </span>
                    </div>
                  </div>
                  {/* Content */}
                  <div className="p-5">
                    <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-3">
                      {cat.description}
                    </p>
                    <div className="flex items-center gap-2 text-sm font-semibold text-primary group-hover:text-primary-dark transition-colors">
                      Explore Category
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-primary to-primary-dark text-white text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>Need a Custom Product?</h2>
            <p className="text-white/80 mb-8">Contact us with your specific requirements and we&apos;ll source it for you.</p>
            <Link href="/contact" className="btn-gold group">Request a Quote <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
