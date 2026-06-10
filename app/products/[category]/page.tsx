import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Send, ChevronRight } from 'lucide-react';
import { productCategories, getCategoryBySlug, getAllCategorySlugs } from '@/lib/products';
import AnimatedSection from '@/components/AnimatedSection';

type Params = { category: string };

export async function generateStaticParams() {
  return getAllCategorySlugs().map((slug) => ({ category: slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { category } = await params;
  const cat = getCategoryBySlug(category);
  if (!cat) return { title: 'Category Not Found' };
  return { title: cat.metaTitle, description: cat.metaDescription };
}

export default async function CategoryPage({ params }: { params: Promise<Params> }) {
  const { category } = await params;
  const cat = getCategoryBySlug(category);
  if (!cat) notFound();

  const otherCategories = productCategories.filter((c) => c.slug !== category).slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-primary via-primary-dark to-[#063d1a] overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`, backgroundSize: '40px 40px' }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-white/60 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={14} />
            <Link href="/products" className="hover:text-white transition-colors">Products</Link>
            <ChevronRight size={14} />
            <span className="text-gold">{cat.name}</span>
          </nav>

          <AnimatedSection>
            <span className="inline-block px-4 py-1.5 bg-gold/20 text-gold rounded-full text-sm font-semibold mb-4 tracking-wider uppercase">
              {cat.subProducts.length} {cat.subProducts.length === 1 ? 'Product' : 'Products'}
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
              {cat.name}
            </h1>
            <p className="text-lg text-white/80 max-w-3xl">{cat.description}</p>
          </AnimatedSection>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* Subproducts Grid */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-14">
            <span className="section-subtitle">Our Range</span>
            <h2 className="section-title mt-3 mb-4">
              {cat.name} <span className="text-primary">Products</span>
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {cat.subProducts.map((prod, index) => (
              <AnimatedSection key={prod.slug} delay={index * 0.08}>
                <div className="premium-card overflow-hidden group h-full flex flex-col">
                  {/* Image */}
                  <div className={`relative aspect-[4/3] overflow-hidden ${prod.image ? '' : 'bg-gradient-to-br from-gray-100 to-gray-200'}`}>
                    {prod.image ? (
                      <>
                        <Image
                          src={prod.image}
                          alt={prod.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
                    {/* Hover view detail */}
                    <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                      <Link
                        href={`/products/${cat.slug}/${prod.slug}`}
                        className="flex items-center justify-center gap-2 w-full py-2.5 bg-white text-primary rounded-lg text-sm font-semibold hover:bg-primary hover:text-white transition-colors"
                      >
                        View Details
                        <ArrowRight size={16} />
                      </Link>
                    </div>
                  </div>
                  {/* Content */}
                  <div className="p-5 flex flex-col flex-1">
                    <h3
                      className="text-lg font-bold text-dark-text mb-2 group-hover:text-primary transition-colors"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      {prod.name}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed mb-4 flex-1 line-clamp-3">
                      {prod.shortDescription}
                    </p>
                    <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
                      <Link
                        href={`/products/${cat.slug}/${prod.slug}`}
                        className="flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-dark transition-colors"
                      >
                        View Details <ArrowRight size={14} />
                      </Link>
                      <Link
                        href="/contact"
                        className="flex items-center gap-1.5 text-sm font-semibold text-gold hover:text-gold-dark transition-colors ml-auto"
                      >
                        <Send size={14} /> Inquiry
                      </Link>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Other Categories */}
      <section className="py-16 bg-section-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-10">
            <h2 className="section-title">Other <span className="text-primary">Categories</span></h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {otherCategories.map((oCat, i) => (
              <AnimatedSection key={oCat.slug} delay={i * 0.1}>
                <Link href={`/products/${oCat.slug}`} className="premium-card overflow-hidden group block">
                  <div className={`relative aspect-[4/3] overflow-hidden ${oCat.image ? '' : 'bg-gradient-to-br from-gray-200 to-gray-300'}`}>
                    {oCat.image ? (
                      <>
                        <Image src={oCat.image} alt={oCat.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      </>
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-primary/30">
                          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                          <circle cx="8.5" cy="8.5" r="1.5"/>
                          <polyline points="21 15 16 10 5 21"/>
                        </svg>
                      </div>
                    )}
                    <div className="absolute bottom-4 left-4">
                      <span className="px-2.5 py-0.5 bg-gold/90 text-dark-text text-xs font-semibold rounded-full">
                        {oCat.subProducts.length} Products
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-dark-text group-hover:text-primary transition-colors" style={{ fontFamily: 'var(--font-heading)' }}>{oCat.name}</h3>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">{oCat.description}</p>
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
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
              Interested in {cat.name}?
            </h2>
            <p className="text-white/80 mb-8">
              Get in touch for pricing, specifications, samples, and customized packaging solutions.
            </p>
            <Link href="/contact" className="btn-gold group">
              Request a Quote <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
