'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';

/* ────────────────────────────────────────────────
   COUNTRY DATA
   ──────────────────────────────────────────────── */
const INDIA = { x: 680, y: 225, label: 'INDIA' };

const exportCountries = [
  { code: 'AE', name: 'UAE', region: 'Middle East', flag: '🇦🇪', x: 615, y: 215, desc: 'Key market for Indian spices, groundnuts, and grains' },
  { code: 'SA', name: 'Saudi Arabia', region: 'Middle East', flag: '🇸🇦', x: 575, y: 210, desc: 'Growing demand for premium Indian agricultural commodities' },
  { code: 'GB', name: 'United Kingdom', region: 'Europe', flag: '🇬🇧', x: 470, y: 120, desc: 'Established market for Indian spices and specialty products' },
  { code: 'DE', name: 'Germany', region: 'Europe', flag: '🇩🇪', x: 505, y: 125, desc: 'Major European hub for agricultural imports' },
  { code: 'US', name: 'United States', region: 'North America', flag: '🇺🇸', x: 195, y: 180, desc: 'Significant market for Indian spices and organic products' },
  { code: 'CA', name: 'Canada', region: 'North America', flag: '🇨🇦', x: 185, y: 130, desc: 'Growing market for Indian pulses and spices' },
  { code: 'AU', name: 'Australia', region: 'Oceania', flag: '🇦🇺', x: 830, y: 355, desc: 'Emerging market for Indian agricultural products' },
  { code: 'ZA', name: 'South Africa', region: 'Africa', flag: '🇿🇦', x: 530, y: 360, desc: 'Key African market for Indian grains and spices' },
];

/* ────────────────────────────────────────────────
   SVG HELPERS
   ──────────────────────────────────────────────── */
function getCurvedPath(x1: number, y1: number, x2: number, y2: number) {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const dist = Math.sqrt(dx * dx + dy * dy);
  const curvature = Math.min(dist * 0.25, 80);
  const nx = -dy / dist;
  const ny = dx / dist;
  const cx = mx + nx * curvature;
  const cy = my + ny * curvature;
  return `M${x1},${y1} Q${cx},${cy} ${x2},${y2}`;
}

/* ────────────────────────────────────────────────
   SIMPLIFIED WORLD MAP PATHS  
   ──────────────────────────────────────────────── */
const continentPaths = [
  // North America
  'M80,60 C100,45 160,40 210,55 C240,63 260,80 270,100 C280,125 265,155 240,175 C225,187 205,195 180,200 C155,205 130,195 115,180 C95,160 80,135 75,110 C72,90 70,72 80,60Z',
  // Central America & Caribbean
  'M215,200 C225,195 240,198 250,210 C260,222 255,240 245,248 C235,256 220,250 215,240 C210,228 208,210 215,200Z',
  // South America
  'M230,260 C260,245 300,255 315,280 C330,310 325,350 310,385 C295,415 270,440 250,445 C230,450 215,430 210,400 C205,370 210,330 215,300 C218,280 222,268 230,260Z',
  // Europe
  'M450,55 C470,48 500,50 520,60 C540,72 548,90 545,110 C542,128 530,145 515,155 C498,165 478,162 463,150 C448,138 440,120 440,100 C440,80 443,63 450,55Z',
  // UK / Ireland
  'M455,85 C462,78 475,80 478,90 C481,100 475,110 468,112 C460,114 453,108 452,98 C451,92 452,88 455,85Z',
  // Africa
  'M480,175 C510,160 550,170 565,200 C580,230 580,280 570,320 C560,355 540,385 515,400 C490,415 465,400 455,370 C445,340 445,300 450,265 C455,235 460,195 480,175Z',
  // Middle East
  'M560,140 C580,130 610,135 625,155 C640,175 640,200 630,220 C618,240 595,245 575,235 C558,225 548,205 548,185 C548,165 550,148 560,140Z',
  // India
  'M650,155 C670,140 700,145 715,165 C728,182 730,205 725,230 C720,250 705,268 688,275 C670,282 650,270 643,250 C636,230 635,205 640,185 C643,170 647,160 650,155Z',
  // Southeast Asia
  'M740,185 C760,175 790,180 805,200 C818,218 815,245 800,260 C785,275 760,272 748,255 C735,238 730,215 735,198 C737,190 738,187 740,185Z',
  // China / East Asia
  'M720,90 C755,70 810,80 840,110 C865,135 860,170 840,195 C820,218 785,225 755,215 C728,205 710,180 710,155 C710,130 712,105 720,90Z',
  // Russia (simplified band)
  'M520,35 C580,20 700,25 780,40 C830,48 860,65 855,80 C850,95 820,100 780,95 C720,87 640,80 580,75 C540,72 510,60 510,48 C510,42 514,38 520,35Z',
  // Australia
  'M790,310 C820,295 860,305 878,330 C895,355 890,390 870,405 C850,420 820,418 800,405 C780,390 770,365 775,340 C778,322 785,314 790,310Z',
  // New Zealand
  'M900,380 C908,375 918,380 920,390 C922,400 916,410 908,412 C900,414 894,405 894,396 C894,388 896,383 900,380Z',
  // Japan
  'M840,110 C848,102 860,108 862,120 C864,132 856,142 848,142 C840,142 835,132 836,122 C836,116 838,112 840,110Z',
];

/* ────────────────────────────────────────────────
   COMPONENT
   ──────────────────────────────────────────────── */
export default function ExportMarketsSection() {
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);

  return (
    <section className="py-20 lg:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <AnimatedSection className="text-center mb-14">
          <span className="section-subtitle">Our Reach</span>
          <h2 className="section-title mt-3 mb-4">
            Global <span className="text-primary">Export Markets</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Serving buyers across the Middle East, Europe, North America, Africa, and Asia
            with dependable export solutions.
          </p>
        </AnimatedSection>

        {/* ── INTERACTIVE MAP ── */}
        <AnimatedSection>
          <div className="relative bg-gradient-to-br from-[#f8faf5] via-white to-[#faf7f0] rounded-3xl border border-gray-100 shadow-lg overflow-hidden">
            {/* Subtle dot‑grid background */}
            <div
              className="absolute inset-0 opacity-[0.35]"
              style={{
                backgroundImage: 'radial-gradient(circle, #0B5D2A 0.6px, transparent 0.6px)',
                backgroundSize: '24px 24px',
              }}
            />

            {/* SVG Map */}
            <svg
              viewBox="0 0 1000 460"
              className="relative w-full h-auto"
              xmlns="http://www.w3.org/2000/svg"
              style={{ minHeight: '320px' }}
            >
              <defs>
                {/* Animated dash for route lines */}
                <style>{`
                  @keyframes dash-flow {
                    to { stroke-dashoffset: -24; }
                  }
                  .route-line {
                    stroke-dasharray: 8 6;
                    animation: dash-flow 1.2s linear infinite;
                  }
                  .route-line-glow {
                    stroke-dasharray: 8 6;
                    animation: dash-flow 1.2s linear infinite;
                    filter: blur(3px);
                  }
                  @keyframes marker-pulse {
                    0%, 100% { r: 6; opacity: 0.4; }
                    50% { r: 12; opacity: 0; }
                  }
                  @keyframes india-pulse {
                    0%, 100% { r: 10; opacity: 0.3; }
                    50% { r: 22; opacity: 0; }
                  }
                `}</style>
              </defs>

              {/* ── Continent shapes ── */}
              {continentPaths.map((d, i) => (
                <path
                  key={i}
                  d={d}
                  fill="#0B5D2A"
                  opacity={
                    // India continent shape highlighted more
                    i === 7 ? 0.22 : 0.08
                  }
                  stroke="#0B5D2A"
                  strokeWidth={i === 7 ? 1.5 : 0.5}
                  strokeOpacity={i === 7 ? 0.3 : 0.12}
                />
              ))}

              {/* ── Route lines (India → each country) ── */}
              {exportCountries.map((country) => {
                const path = getCurvedPath(INDIA.x, INDIA.y, country.x, country.y);
                const isHovered = hoveredCountry === country.code;
                return (
                  <g key={`route-${country.code}`}>
                    {/* Glow layer */}
                    <path
                      d={path}
                      fill="none"
                      stroke={isHovered ? '#D4A017' : '#0B5D2A'}
                      strokeWidth={isHovered ? 3 : 1.5}
                      className="route-line-glow"
                      opacity={isHovered ? 0.5 : 0.15}
                    />
                    {/* Main dashed line */}
                    <path
                      d={path}
                      fill="none"
                      stroke={isHovered ? '#D4A017' : '#0B5D2A'}
                      strokeWidth={isHovered ? 2 : 1}
                      className="route-line"
                      opacity={isHovered ? 0.9 : 0.35}
                    />
                  </g>
                );
              })}

              {/* ── India origin marker ── */}
              <g>
                <circle cx={INDIA.x} cy={INDIA.y} r="10" fill="#0B5D2A" opacity="0.3">
                  <animate attributeName="r" values="10;22;10" dur="2.5s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.3;0;0.3" dur="2.5s" repeatCount="indefinite" />
                </circle>
                <circle cx={INDIA.x} cy={INDIA.y} r="7" fill="#0B5D2A" stroke="white" strokeWidth="2.5" />
                <text
                  x={INDIA.x}
                  y={INDIA.y - 16}
                  textAnchor="middle"
                  fill="#0B5D2A"
                  fontSize="11"
                  fontWeight="700"
                  fontFamily="var(--font-heading), Georgia, serif"
                  letterSpacing="0.08em"
                >
                  INDIA
                </text>
              </g>

              {/* ── Country destination markers ── */}
              {exportCountries.map((country) => {
                const isHovered = hoveredCountry === country.code;
                return (
                  <g
                    key={`marker-${country.code}`}
                    onMouseEnter={() => setHoveredCountry(country.code)}
                    onMouseLeave={() => setHoveredCountry(null)}
                    style={{ cursor: 'pointer' }}
                  >
                    {/* Pulse ring */}
                    <circle cx={country.x} cy={country.y} r="6" fill="#D4A017" opacity="0.4">
                      <animate attributeName="r" values="6;12;6" dur="2s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.4;0;0.4" dur="2s" repeatCount="indefinite" />
                    </circle>
                    {/* Marker dot */}
                    <circle
                      cx={country.x}
                      cy={country.y}
                      r={isHovered ? 6 : 4.5}
                      fill="#D4A017"
                      stroke="white"
                      strokeWidth="2"
                      style={{ transition: 'r 0.3s ease' }}
                    />
                    {/* Hover glow */}
                    {isHovered && (
                      <circle cx={country.x} cy={country.y} r="18" fill="#D4A017" opacity="0.12" />
                    )}
                    {/* Country label */}
                    <text
                      x={country.x}
                      y={country.y - 12}
                      textAnchor="middle"
                      fill={isHovered ? '#D4A017' : '#374151'}
                      fontSize={isHovered ? '11' : '9.5'}
                      fontWeight={isHovered ? '700' : '600'}
                      fontFamily="var(--font-body), system-ui, sans-serif"
                      style={{ transition: 'all 0.3s ease' }}
                    >
                      {country.code}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* ── Legend ── */}
            <div className="flex items-center justify-center gap-8 pb-5 pt-1">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-primary border-2 border-white shadow" />
                <span className="text-xs font-semibold text-gray-600">Source (India)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-gold border-2 border-white shadow" />
                <span className="text-xs font-semibold text-gray-600">Export Markets</span>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* ── COUNTRY CARDS ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 lg:gap-5 mt-10">
          {exportCountries.map((country, index) => (
            <AnimatedSection key={country.code} delay={index * 0.07}>
              <motion.div
                className="premium-card p-5 h-full group cursor-default"
                onHoverStart={() => setHoveredCountry(country.code)}
                onHoverEnd={() => setHoveredCountry(null)}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25 }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl sm:text-3xl">{country.flag}</span>
                  <div className="min-w-0">
                    <h3
                      className="text-sm sm:text-base font-bold text-dark-text group-hover:text-primary transition-colors truncate"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      {country.name}
                    </h3>
                    <p className="text-[11px] text-gray-500 font-medium">{country.region}</p>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed line-clamp-2">
                  {country.desc}
                </p>
                {/* Gold accent bar */}
                <div className="mt-3 h-0.5 w-8 bg-gold/40 rounded-full group-hover:w-full group-hover:bg-gold transition-all duration-500" />
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
