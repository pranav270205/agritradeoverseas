'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { InfrastructureGalleryItem } from '@/lib/types';

interface InfrastructureGalleryProps {
  items: InfrastructureGalleryItem[];
}

export default function InfrastructureGallery({ items }: InfrastructureGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const totalSlides = items.length;

  const goToNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const goToPrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const goToSlide = useCallback((index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  }, [currentIndex]);

  // Auto-slide
  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(goToNext, 4000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused, goToNext]);

  // Swipe handling
  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 50;
    if (info.offset.x < -threshold) {
      goToNext();
    } else if (info.offset.x > threshold) {
      goToPrev();
    }
  };

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Main Carousel */}
      <div className="relative overflow-hidden rounded-2xl bg-gray-100" style={{ minHeight: '400px' }}>
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.3}
            onDragEnd={handleDragEnd}
            className="w-full"
          >
            <div className="grid md:grid-cols-2 gap-0">
              {/* Image */}
              <div className={`relative aspect-[4/3] md:aspect-auto md:min-h-[400px] overflow-hidden group cursor-grab active:cursor-grabbing ${items[currentIndex].image ? '' : 'bg-gradient-to-br from-gray-200 to-gray-300'}`}>
                {items[currentIndex].image ? (
                  <Image
                    src={items[currentIndex].image}
                    alt={items[currentIndex].title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5">
                    <div className="text-center p-6">
                      <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-primary/10 flex items-center justify-center">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-primary/40">
                          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                          <circle cx="8.5" cy="8.5" r="1.5"/>
                          <polyline points="21 15 16 10 5 21"/>
                        </svg>
                      </div>
                      <p className="text-sm font-medium text-primary/40">Image Placeholder</p>
                      <p className="text-xs text-gray-400 mt-1">{items[currentIndex].title}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex flex-col justify-center p-8 lg:p-12 bg-white">
                <span className="inline-block w-fit px-3 py-1 bg-gold/15 text-gold text-xs font-semibold rounded-full mb-4 tracking-wider uppercase">
                  {String(currentIndex + 1).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}
                </span>
                <h3
                  className="text-2xl lg:text-3xl font-bold text-dark-text mb-4"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {items[currentIndex].title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {items[currentIndex].description}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <button
          onClick={goToPrev}
          className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow-lg flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-300 z-10"
          aria-label="Previous slide"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={goToNext}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow-lg flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-300 z-10"
          aria-label="Next slide"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center gap-2 mt-6">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'w-8 bg-primary'
                : 'w-2.5 bg-gray-300 hover:bg-primary/40'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Thumbnail Strip */}
      <div className="mt-6 grid grid-cols-3 sm:grid-cols-6 gap-3">
        {items.map((item, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`relative aspect-[4/3] rounded-xl overflow-hidden transition-all duration-300 ${
              index === currentIndex
                ? 'ring-2 ring-primary ring-offset-2 shadow-lg'
                : 'opacity-60 hover:opacity-100'
            }`}
          >
            <div className={`absolute inset-0 ${item.image ? '' : 'bg-gradient-to-br from-gray-200 to-gray-300'}`}>
              {item.image ? (
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/5 to-primary/10">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-primary/30">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                    <circle cx="8.5" cy="8.5" r="1.5"/>
                    <polyline points="21 15 16 10 5 21"/>
                  </svg>
                </div>
              )}
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-1.5 bg-gradient-to-t from-black/60 to-transparent">
              <p className="text-[10px] font-medium text-white truncate">{item.title}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
