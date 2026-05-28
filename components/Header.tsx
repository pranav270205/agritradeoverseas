'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronRight, ChevronDown } from 'lucide-react';
import { navLinks } from '@/lib/navigation';
import { productCategories } from '@/lib/products';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [mobileProductsExpanded, setMobileProductsExpanded] = useState(false);
  const [mobileExpandedCategory, setMobileExpandedCategory] = useState<string | null>(null);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsProductsDropdownOpen(false);
    setMobileProductsExpanded(false);
    setMobileExpandedCategory(null);
  }, [pathname]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsProductsDropdownOpen(false);
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsProductsDropdownOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const handleDropdownEnter = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setIsProductsDropdownOpen(true);
    if (!hoveredCategory) setHoveredCategory(productCategories[0]?.slug || null);
  };

  const handleDropdownLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setIsProductsDropdownOpen(false);
      setHoveredCategory(null);
    }, 200);
  };

  const isProductsActive = pathname.startsWith('/products');

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-lg py-2'
            : 'bg-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-12 h-12 sm:w-14 sm:h-14 overflow-hidden rounded-lg">
                <Image
                  src="/images/logo.png"
                  alt="AGRITRADE OVERSEAS Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div className="hidden sm:block">
                <h1
                  className={`text-lg font-bold leading-tight transition-colors duration-300 ${
                    isScrolled ? 'text-primary' : 'text-white'
                  }`}
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  AGRITRADE
                </h1>
                <p
                  className={`text-xs font-medium tracking-widest uppercase transition-colors duration-300 ${
                    isScrolled ? 'text-gold' : 'text-gold-light'
                  }`}
                >
                  OVERSEAS
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.href === '/products' && isProductsActive);

                // Products link with mega-menu dropdown
                if (link.href === '/products') {
                  return (
                    <div
                      key={link.href}
                      className="relative"
                      ref={dropdownRef}
                      onMouseEnter={handleDropdownEnter}
                      onMouseLeave={handleDropdownLeave}
                    >
                      <Link
                        href="/products"
                        className={`relative flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                          isActive
                            ? isScrolled
                              ? 'text-primary'
                              : 'text-gold'
                            : isScrolled
                            ? 'text-gray-700 hover:text-primary hover:bg-primary/5'
                            : 'text-white/90 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        {link.label}
                        <ChevronDown
                          size={14}
                          className={`transition-transform duration-300 ${
                            isProductsDropdownOpen ? 'rotate-180' : ''
                          }`}
                        />
                        {isActive && (
                          <motion.div
                            layoutId="activeNav"
                            className="absolute bottom-0 left-4 right-4 h-0.5 bg-gold rounded-full"
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                          />
                        )}
                      </Link>

                      {/* Mega Menu Dropdown */}
                      <AnimatePresence>
                        {isProductsDropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 8 }}
                            transition={{ duration: 0.2, ease: 'easeOut' }}
                            className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[680px] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50"
                          >
                            {/* Dropdown arrow */}
                            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rotate-45 border-l border-t border-gray-100" />

                            <div className="relative flex">
                              {/* Left: Categories */}
                              <div className="w-[240px] bg-gradient-to-b from-primary/[0.03] to-primary/[0.08] border-r border-gray-100 py-3">
                                <p className="px-5 py-2 text-xs font-semibold text-gold uppercase tracking-wider">
                                  Product Categories
                                </p>
                                {productCategories.map((cat) => (
                                  <Link
                                    key={cat.slug}
                                    href={`/products/${cat.slug}`}
                                    onMouseEnter={() => setHoveredCategory(cat.slug)}
                                    className={`flex items-center justify-between px-5 py-2.5 text-sm transition-all duration-200 group/cat ${
                                      hoveredCategory === cat.slug
                                        ? 'bg-primary text-white'
                                        : 'text-gray-700 hover:bg-primary/5 hover:text-primary'
                                    }`}
                                  >
                                    <span className="font-medium">{cat.name}</span>
                                    <ChevronRight
                                      size={14}
                                      className={`transition-transform duration-200 ${
                                        hoveredCategory === cat.slug
                                          ? 'translate-x-0.5 text-gold-light'
                                          : 'text-gray-400 group-hover/cat:text-primary'
                                      }`}
                                    />
                                  </Link>
                                ))}
                                <div className="mx-5 mt-3 pt-3 border-t border-gray-200">
                                  <Link
                                    href="/products"
                                    className="flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-dark transition-colors"
                                  >
                                    View All Products
                                    <ChevronRight size={14} />
                                  </Link>
                                </div>
                              </div>

                              {/* Right: Subproducts of hovered category */}
                              <div className="flex-1 py-3 px-2">
                                {hoveredCategory && (() => {
                                  const cat = productCategories.find(c => c.slug === hoveredCategory);
                                  if (!cat) return null;
                                  return (
                                    <>
                                      <p className="px-4 py-2 text-xs font-semibold text-gold uppercase tracking-wider">
                                        {cat.name}
                                      </p>
                                      <div className="grid grid-cols-2 gap-0.5">
                                        {cat.subProducts.map((prod) => (
                                          <Link
                                            key={prod.slug}
                                            href={`/products/${cat.slug}/${prod.slug}`}
                                            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-primary hover:bg-primary/5 rounded-lg transition-all duration-200 group/sub"
                                          >
                                            <span className="w-1.5 h-1.5 rounded-full bg-gold/50 group-hover/sub:bg-primary shrink-0 transition-colors" />
                                            <span className="font-medium">{prod.name}</span>
                                          </Link>
                                        ))}
                                      </div>
                                    </>
                                  );
                                })()}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                      isActive
                        ? isScrolled
                          ? 'text-primary'
                          : 'text-gold'
                        : isScrolled
                        ? 'text-gray-700 hover:text-primary hover:bg-primary/5'
                        : 'text-white/90 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute bottom-0 left-4 right-4 h-0.5 bg-gold rounded-full"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* CTA + Mobile Menu */}
            <div className="flex items-center gap-3">
              <Link
                href="/contact"
                className={`hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${
                  isScrolled
                    ? 'bg-primary text-white hover:bg-primary-dark shadow-md hover:shadow-lg'
                    : 'bg-gold text-dark-text hover:bg-gold-light shadow-md hover:shadow-lg'
                }`}
              >
                Request a Quote
                <ChevronRight size={16} />
              </Link>

              {/* Hamburger */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`lg:hidden p-2 rounded-lg transition-colors ${
                  isScrolled
                    ? 'text-primary hover:bg-primary/10'
                    : 'text-white hover:bg-white/10'
                }`}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-40 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-[300px] bg-white z-50 lg:hidden shadow-2xl"
            >
              <div className="flex flex-col h-full">
                {/* Mobile Menu Header */}
                <div className="flex items-center justify-between p-5 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 overflow-hidden rounded-lg">
                      <Image
                        src="/images/logo.png"
                        alt="AGRITRADE OVERSEAS"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-primary">AGRITRADE</p>
                      <p className="text-xs text-gold font-medium tracking-wider">OVERSEAS</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 rounded-lg text-gray-500 hover:bg-gray-100"
                    aria-label="Close menu"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Mobile Nav Links */}
                <nav className="flex-1 overflow-y-auto py-4">
                  {navLinks.map((link, index) => {
                    const isActive = pathname === link.href || (link.href === '/products' && isProductsActive);

                    // Products with accordion
                    if (link.href === '/products') {
                      return (
                        <motion.div
                          key={link.href}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          {/* Products header */}
                          <button
                            onClick={() => setMobileProductsExpanded(!mobileProductsExpanded)}
                            className={`flex items-center justify-between w-full px-6 py-3.5 text-sm font-medium transition-all ${
                              isActive
                                ? 'text-primary bg-primary/5 border-r-3 border-primary'
                                : 'text-gray-700 hover:text-primary hover:bg-gray-50'
                            }`}
                          >
                            <span>{link.label}</span>
                            <ChevronDown
                              size={16}
                              className={`transition-transform duration-300 ${
                                mobileProductsExpanded ? 'rotate-180' : ''
                              } ${isActive ? 'text-primary' : 'text-gray-400'}`}
                            />
                          </button>

                          {/* Categories accordion */}
                          <AnimatePresence>
                            {mobileProductsExpanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: 'easeInOut' }}
                                className="overflow-hidden bg-gray-50/50"
                              >
                                {/* View All Products link */}
                                <Link
                                  href="/products"
                                  onClick={() => setIsMobileMenuOpen(false)}
                                  className="flex items-center gap-2 px-8 py-2.5 text-xs font-semibold text-gold uppercase tracking-wider hover:bg-primary/5 transition-colors"
                                >
                                  View All Categories
                                  <ChevronRight size={12} />
                                </Link>

                                {productCategories.map((cat) => (
                                  <div key={cat.slug}>
                                    {/* Category header */}
                                    <button
                                      onClick={() =>
                                        setMobileExpandedCategory(
                                          mobileExpandedCategory === cat.slug ? null : cat.slug
                                        )
                                      }
                                      className={`flex items-center justify-between w-full px-8 py-3 text-sm transition-all ${
                                        mobileExpandedCategory === cat.slug
                                          ? 'text-primary font-semibold bg-primary/5'
                                          : 'text-gray-600 hover:text-primary hover:bg-gray-50'
                                      }`}
                                    >
                                      <span>{cat.name}</span>
                                      <ChevronDown
                                        size={14}
                                        className={`transition-transform duration-300 ${
                                          mobileExpandedCategory === cat.slug ? 'rotate-180 text-primary' : 'text-gray-400'
                                        }`}
                                      />
                                    </button>

                                    {/* Subproducts */}
                                    <AnimatePresence>
                                      {mobileExpandedCategory === cat.slug && (
                                        <motion.div
                                          initial={{ height: 0, opacity: 0 }}
                                          animate={{ height: 'auto', opacity: 1 }}
                                          exit={{ height: 0, opacity: 0 }}
                                          transition={{ duration: 0.25, ease: 'easeInOut' }}
                                          className="overflow-hidden"
                                        >
                                          {/* Category page link */}
                                          <Link
                                            href={`/products/${cat.slug}`}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="flex items-center gap-2 px-10 py-2 text-xs font-semibold text-primary hover:bg-primary/5 transition-colors"
                                          >
                                            View All {cat.name}
                                            <ChevronRight size={12} />
                                          </Link>
                                          {cat.subProducts.map((prod) => (
                                            <Link
                                              key={prod.slug}
                                              href={`/products/${cat.slug}/${prod.slug}`}
                                              onClick={() => setIsMobileMenuOpen(false)}
                                              className="flex items-center gap-2.5 px-10 py-2.5 text-sm text-gray-500 hover:text-primary hover:bg-primary/5 transition-colors"
                                            >
                                              <span className="w-1.5 h-1.5 rounded-full bg-gold/50 shrink-0" />
                                              {prod.name}
                                            </Link>
                                          ))}
                                        </motion.div>
                                      )}
                                    </AnimatePresence>
                                  </div>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      );
                    }

                    return (
                      <motion.div
                        key={link.href}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Link
                          href={link.href}
                          className={`flex items-center justify-between px-6 py-3.5 text-sm font-medium transition-all ${
                            isActive
                              ? 'text-primary bg-primary/5 border-r-3 border-primary'
                              : 'text-gray-700 hover:text-primary hover:bg-gray-50'
                          }`}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {link.label}
                          <ChevronRight
                            size={16}
                            className={isActive ? 'text-primary' : 'text-gray-400'}
                          />
                        </Link>
                      </motion.div>
                    );
                  })}
                </nav>

                {/* Mobile CTA */}
                <div className="p-5 border-t border-gray-100">
                  <Link
                    href="/contact"
                    className="flex items-center justify-center gap-2 w-full py-3.5 bg-primary text-white rounded-xl font-semibold text-sm hover:bg-primary-dark transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Request a Quote
                    <ChevronRight size={16} />
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
