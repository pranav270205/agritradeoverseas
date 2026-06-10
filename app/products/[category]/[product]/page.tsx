import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Package, Send, Shield, ChevronRight } from 'lucide-react';
import { getSubProductBySlug, getAllSubProductParams } from '@/lib/products';
import AnimatedSection from '@/components/AnimatedSection';

type Params = { category: string; product: string };

export async function generateStaticParams() {
  return getAllSubProductParams();
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { category, product } = await params;
  const result = getSubProductBySlug(category, product);
  if (!result) return { title: 'Product Not Found' };
  return { title: result.product.metaTitle, description: result.product.metaDescription };
}

export default async function SubProductDetailPage({ params }: { params: Promise<Params> }) {
  const { category, product: productSlug } = await params;
  const result = getSubProductBySlug(category, productSlug);
  if (!result) notFound();

  const { category: cat, product } = result;
  const relatedProducts = cat.subProducts.filter((p) => p.slug !== productSlug).slice(0, 3);
  const specs = Object.entries(product.specifications) as [string, string][];

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 bg-gradient-to-br from-primary via-primary-dark to-[#063d1a]">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-white/60 mb-6 flex-wrap">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={14} />
            <Link href="/products" className="hover:text-white transition-colors">Products</Link>
            <ChevronRight size={14} />
            <Link href={`/products/${cat.slug}`} className="hover:text-white transition-colors">{cat.name}</Link>
            <ChevronRight size={14} />
            <span className="text-gold">{product.name}</span>
          </nav>

          <AnimatedSection>
            <span className="inline-block px-3 py-1 bg-gold/20 text-gold rounded-full text-xs font-semibold mb-3 tracking-wider uppercase">
              {cat.name}
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white" style={{ fontFamily: 'var(--font-heading)' }}>
              {product.name}
            </h1>
          </AnimatedSection>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* Product Detail */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Image */}
            <AnimatedSection direction="left">
              <div className={`relative aspect-square rounded-2xl overflow-hidden shadow-2xl sticky top-28 ${product.image ? '' : 'bg-gradient-to-br from-gray-100 to-gray-200'}`}>
                {product.image ? (
                  <>
                    <Image src={product.image} alt={product.name} fill className="object-cover" priority />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5">
                    <div className="text-center">
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-primary/30 mx-auto mb-3">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                        <circle cx="8.5" cy="8.5" r="1.5"/>
                        <polyline points="21 15 16 10 5 21"/>
                      </svg>
                      <p className="text-sm text-primary/30">{product.name}</p>
                    </div>
                  </div>
                )}
              </div>
            </AnimatedSection>

            {/* Content */}
            <AnimatedSection direction="right">
              <h2 className="text-2xl font-bold text-dark-text mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                About {product.name}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-8">{product.fullDescription}</p>

              {/* Specifications Table */}
              <h3 className="text-lg font-bold text-dark-text mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                Product Specifications
              </h3>
              <div className="mb-8 rounded-xl border border-gray-200 overflow-hidden">
                <table className="w-full text-sm">
                  <tbody>
                    {specs.map(([key, value], i) => (
                      <tr key={key} className={i % 2 === 0 ? 'bg-gray-50/50' : 'bg-white'}>
                        <td className="px-4 py-3 font-medium text-dark-text border-r border-gray-100 w-[40%]">{key}</td>
                        <td className="px-4 py-3 text-gray-600">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Packaging Options */}
              <h3 className="text-lg font-bold text-dark-text mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                Packaging Options
              </h3>
              <div className="space-y-3 mb-8">
                {product.packagingOptions.map((option: string, i: number) => (
                  <div key={i} className="flex items-start gap-3">
                    <Package size={18} className="text-gold mt-0.5 shrink-0" />
                    <p className="text-sm text-gray-700">{option}</p>
                  </div>
                ))}
              </div>

              {/* Export Quality */}
              <h3 className="text-lg font-bold text-dark-text mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                Export Quality Assurance
              </h3>
              <div className="flex items-start gap-3 mb-8 p-4 rounded-xl bg-primary/5 border border-primary/10">
                <Shield size={20} className="text-primary mt-0.5 shrink-0" />
                <p className="text-sm text-gray-700 leading-relaxed">{product.exportQuality}</p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact" className="btn-primary group">
                  Send Inquiry <Send size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="/contact" className="btn-gold group">
                  Request a Quote <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-16 bg-section-alt">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection className="text-center mb-10">
              <h2 className="section-title">More <span className="text-primary">{cat.name}</span></h2>
            </AnimatedSection>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedProducts.map((rp, i) => (
                <AnimatedSection key={rp.slug} delay={i * 0.1}>
                  <Link href={`/products/${cat.slug}/${rp.slug}`} className="premium-card overflow-hidden group block">
                    <div className={`relative aspect-[4/3] overflow-hidden ${rp.image ? '' : 'bg-gradient-to-br from-gray-100 to-gray-200'}`}>
                      {rp.image ? (
                        <Image src={rp.image} alt={rp.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-primary/30">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                            <circle cx="8.5" cy="8.5" r="1.5"/>
                            <polyline points="21 15 16 10 5 21"/>
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-dark-text group-hover:text-primary transition-colors" style={{ fontFamily: 'var(--font-heading)' }}>{rp.name}</h3>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-2">{rp.shortDescription}</p>
                    </div>
                  </Link>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
