/**
 * ═══════════════════════════════════════════════════════════════════
 *  AGRITRADE OVERSEAS — Premium Company Profile PDF v3
 *  12-page A4 brochure · Completely original design
 *  Brand: #0B6B3A (green) + #D4A017 (gold) + White
 * ═══════════════════════════════════════════════════════════════════
 */
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

// ── BRAND PALETTE ─────────────────────────────────────────────
const B = {
  pri:     '#0B6B3A',  // primary green
  priDk:   '#064A28',  // dark green
  priDp:   '#042E19',  // deepest green
  priLt:   '#3A9B66',  // light green
  priPale: '#E7F4ED',  // pale green bg
  priMint: '#F3FAF6',  // mint bg
  sec:     '#D4A017',  // gold
  secDk:   '#A87D12',  // dark gold
  secLt:   '#E8C65C',  // light gold
  secPale: '#FDF8EC',  // pale gold bg
  white:   '#FFFFFF',
  off:     '#FAFAF8',
  cream:   '#F7F5F0',
  black:   '#111111',
  heading: '#1A1A1A',
  body:    '#3C3C3C',
  caption: '#777777',
  muted:   '#AAAAAA',
  line:    '#E8E8E4',
  lineSoft:'#F0F0EC',
};

// ── A4 ────────────────────────────────────────────────────────
const W  = 595.28;
const H  = 841.89;
const MG = 52;           // page margin
const CW = W - 2 * MG;   // content width

// ── FILE PATHS ────────────────────────────────────────────────
const ROOT  = __dirname;
const ASSET = p => path.join(ROOT, 'public', 'brochure', 'assets', p);
const PROD  = (cat, f) => path.join(ROOT, 'public', 'images', 'products', cat, f);
const INFRA = f => path.join(ROOT, 'public', 'images', 'infrastructure', f);
const LOGO  = path.join(ROOT, 'public', 'images', 'logo.png');
const HERO  = path.join(ROOT, 'public', 'images', 'hero-bg.png');

// ── HELPERS ───────────────────────────────────────────────────

function hex(c, si, ei) { return parseInt(c.slice(si, ei + 1), 16); }
function grad(d, x, y, w, h, c1, c2, n) {
  n = n || 40;
  const s = h / n;
  for (let i = 0; i < n; i++) {
    const t = i / (n - 1);
    const r = Math.round(hex(c1,1,2)*(1-t) + hex(c2,1,2)*t);
    const g = Math.round(hex(c1,3,4)*(1-t) + hex(c2,3,4)*t);
    const b = Math.round(hex(c1,5,6)*(1-t) + hex(c2,5,6)*t);
    d.rect(x, y + i*s, w, s + .5).fill('#' + [r,g,b].map(v=>v.toString(16).padStart(2,'0')).join(''));
  }
}

function img(d, f, x, y, w, h, extra) {
  try { if (fs.existsSync(f)) { d.image(f, x, y, { width: w, height: h, cover: [w, h], ...extra }); return true; } } catch(e){}
  return false;
}

function imgFit(d, f, x, y, w, h) {
  try { if (fs.existsSync(f)) { d.image(f, x, y, { fit: [w, h], align: 'center', valign: 'center' }); return true; } } catch(e){}
  return false;
}

function clipImg(d, f, x, y, w, h, r) {
  d.save();
  if (r) d.roundedRect(x, y, w, h, r).clip();
  else d.rect(x, y, w, h).clip();
  img(d, f, x, y, w, h);
  d.restore();
}

function dia(d, cx, cy, s, c) {
  d.save().translate(cx,cy).rotate(45);
  d.rect(-s/2,-s/2,s,s).fill(c);
  d.restore();
}

function circ(d, cx, cy, r, c) { d.circle(cx,cy,r).fill(c); }

function chk(d, x, y, c) {
  d.save().strokeColor(c||B.white).lineWidth(2).lineCap('round').lineJoin('round');
  d.moveTo(x-3.5,y+.5).lineTo(x-1,y+3).lineTo(x+4,y-3).stroke();
  d.restore();
}

function goldLine(d, x, y, w) {
  grad(d, x, y, w, 2.5, B.sec, B.secDk, 8);
}

function softLine(d, y) {
  d.moveTo(MG, y).lineTo(W-MG, y).lineWidth(.5).strokeColor(B.line).stroke();
}

// ── FOOTER ────────────────────────────────────────────────────
function footer(d, n) {
  // Thin green bar at absolute bottom
  d.rect(0, H - 22, W, 22).fill(B.priDp);
  goldLine(d, 0, H - 24.5, W);
  d.fontSize(6.5).font('Helvetica').fillColor(B.secLt);
  d.text('AGRITRADE OVERSEAS', MG, H - 16, { width: CW * .6, continued: false });
  d.fontSize(6.5).font('Helvetica').fillColor(B.muted);
  d.text(`www.agritradeoverseas.com`, MG + CW * .35, H - 16);
  d.fontSize(7).font('Helvetica-Bold').fillColor(B.sec);
  d.text(String(n).padStart(2,'0'), W - MG - 15, H - 16, { width: 15, align: 'right' });
}

// ── TYPOGRAPHY ────────────────────────────────────────────────
function tagline(d, t, y, opts) {
  d.fontSize(8.5).font('Helvetica-Bold').fillColor(B.sec);
  d.text(t.toUpperCase(), MG, y, { width: CW, characterSpacing: 2.5, ...opts });
  return y + 16;
}

function heading(d, t, y, opts) {
  d.fontSize(24).font('Helvetica-Bold').fillColor(opts?.color || B.heading);
  d.text(t, opts?.x || MG, y, { width: opts?.w || CW });
  return y + 34;
}

function subheading(d, t, y, opts) {
  d.fontSize(14).font('Helvetica-Bold').fillColor(opts?.color || B.priDk);
  d.text(t, opts?.x || MG, y, { width: opts?.w || CW });
  return y + 22;
}

function para(d, t, x, y, w) {
  d.fontSize(9.2).font('Helvetica').fillColor(B.body).lineGap(3.8);
  d.text(t, x || MG, y, { width: w || CW });
}


// ════════════════════════════════════════════════════════════════
//   BUILD PDF
// ════════════════════════════════════════════════════════════════
const doc = new PDFDocument({
  size: 'A4', autoFirstPage: false, compress: true, pdfVersion: '1.7',
  margins: { top: 0, bottom: 0, left: 0, right: 0 },
  info: {
    Title: 'AGRITRADE OVERSEAS — Company Profile 2025',
    Author: 'AGRITRADE OVERSEAS',
    Subject: 'Premium Agricultural Export Company Brochure',
    Keywords: 'agritrade overseas, agricultural export, India, groundnuts, spices, sesame seeds, pulses, grains',
  },
});

const OUT = path.join(ROOT, 'AGRITRADE_OVERSEAS_BROCHURE.pdf');
const ws = fs.createWriteStream(OUT);
doc.pipe(ws);
let pg = 0;

function newPage() {
  doc.addPage({ size: 'A4', margins: { top:0,bottom:0,left:0,right:0 } });
  pg++;
}


// ═══════════════════════════════════════════════════════════════
//  PAGE 1 — COVER
// ═══════════════════════════════════════════════════════════════
newPage();

// Full bleed hero image
clipImg(doc, ASSET('cover.png'), 0, 0, W, H);

// Dark cinematic overlay — heavier at bottom
doc.save().fillOpacity(0.3);
doc.rect(0, 0, W, H * 0.35).fill('#000000');
doc.restore();
doc.save().fillOpacity(0.7);
grad(doc, 0, H * 0.42, W, H * 0.58, '#00000010', B.priDp, 50);
doc.restore();

// Top decorative gold rule
doc.save().fillOpacity(0.5);
doc.rect(MG, 38, 50, 2.5).fill(B.sec);
doc.restore();

// Logo at top-left
if (fs.existsSync(LOGO)) {
  try { doc.image(LOGO, MG, 52, { width: 75, height: 75, fit: [75, 75] }); } catch(e){}
}

// Small gold text - company identifier
doc.fontSize(7.5).font('Helvetica-Bold').fillColor(B.sec);
doc.text('AGRITRADE OVERSEAS', MG + 82, 78, { characterSpacing: 2 });
doc.fontSize(6.5).font('Helvetica').fillColor(B.secLt);
doc.text('EST. JAMNAGAR, INDIA', MG + 82, 90, { characterSpacing: 1 });

// Main headline — lower third
const hlY = H * 0.54;
doc.fontSize(11).font('Helvetica').fillColor(B.sec);
doc.text('COMPANY PROFILE  2025–26', MG, hlY - 30, { characterSpacing: 3 });

doc.fontSize(36).font('Helvetica-Bold').fillColor(B.white);
doc.text('Delivering Premium', MG, hlY, { width: W * 0.75 });
doc.text('Indian Agricultural', MG, hlY + 42, { width: W * 0.75 });
doc.text('Products To', MG, hlY + 84, { width: W * 0.75 });
doc.fontSize(36).font('Helvetica-Bold').fillColor(B.sec);
doc.text('Global Markets', MG, hlY + 126, { width: W * 0.75 });

// Subheading
doc.fontSize(10).font('Helvetica').fillColor(B.secLt);
doc.text('Trusted Export Partner For Quality, Reliability & Global Trade', MG, hlY + 178, { width: W * 0.7 });

// Gold divider
doc.rect(MG, hlY + 202, 70, 2.5).fill(B.sec);

// Bottom product badges
const bdgY = H - 75;
const products = ['Groundnuts', 'Sesame Seeds', 'Spices', 'Pulses', 'Grains', 'Raisins', 'Garlic'];
const bdgW = CW / products.length;
products.forEach((p, i) => {
  const bx = MG + i * bdgW;
  if (i > 0) {
    doc.save().fillOpacity(0.3);
    doc.rect(bx, bdgY + 2, 0.5, 10).fill(B.sec);
    doc.restore();
  }
  doc.fontSize(7).font('Helvetica').fillColor(B.white);
  doc.text(p, bx + 3, bdgY, { width: bdgW - 6, align: 'center' });
});

// Bottom gold accent
doc.rect(0, H - 4, W, 4).fill(B.sec);


// ═══════════════════════════════════════════════════════════════
//  PAGE 2 — ABOUT COMPANY
// ═══════════════════════════════════════════════════════════════
newPage();

goldLine(doc, 0, 0, W);
footer(doc, pg);

let y = 40;
y = tagline(doc, 'About Us', y);
y = heading(doc, 'About AGRITRADE OVERSEAS', y);

// Two-column layout — text left, image right
const aLeftW = CW * 0.52;
const aRightW = CW * 0.42;
const aRightX = MG + CW * 0.58;

para(doc,
  'AGRITRADE OVERSEAS is a distinguished Indian agricultural export company headquartered in Jamnagar, Gujarat — at the heart of India\'s most prolific farming belt. We specialize in sourcing, processing, and exporting premium agricultural commodities to discerning buyers across global markets.',
  MG, y, aLeftW
);
y += 65;

para(doc,
  'Our comprehensive product range spans groundnuts, sesame seeds, spices, pulses, grains, raisins, and garlic — each sourced directly from verified farming communities and processed under stringent quality controls at our modern facility.',
  MG, y, aLeftW
);
y += 62;

para(doc,
  'With an unwavering commitment to quality, competitive pricing, and timely delivery, we have earned the trust of importers, wholesalers, distributors, supermarkets, and food processing companies across five continents.',
  MG, y, aLeftW
);

// Right side — image
clipImg(doc, ASSET('about.png'), aRightX, 55, aRightW, 210, 8);
doc.roundedRect(aRightX, 55, aRightW, 210, 8).lineWidth(1.5).strokeColor(B.sec).stroke();

// Gold badge on image
doc.save().fillOpacity(0.92);
doc.roundedRect(aRightX + 12, 235, aRightW - 24, 22, 4).fill(B.priDp);
doc.restore();
doc.fontSize(7).font('Helvetica-Bold').fillColor(B.sec);
doc.text('JAMNAGAR, GUJARAT, INDIA', aRightX + 20, 240, { width: aRightW - 40, align: 'center' });

y = 290;
softLine(doc, y);
y += 18;

// Mission, Vision, Core Values — horizontal cards
y = tagline(doc, 'Our Foundation', y);

const mvCards = [
  { title: 'Our Mission', text: 'To be the preferred agricultural export partner for global buyers by delivering premium-quality Indian commodities with integrity, reliability, and competitive pricing.' },
  { title: 'Our Vision', text: 'To establish AGRITRADE OVERSEAS as a globally recognized brand in agricultural exports, connecting Indian farming excellence with markets across every continent.' },
  { title: 'Core Values', text: 'Quality First · Transparency · Customer Focus · Reliability · Innovation · Sustainable Sourcing · Long-Term Partnerships' },
];

const mvW = (CW - 2 * 14) / 3;
const mvH = 140;
mvCards.forEach((c, i) => {
  const mx = MG + i * (mvW + 14);
  const my = y;

  doc.roundedRect(mx, my, mvW, mvH, 8).fill(B.white);
  doc.roundedRect(mx, my, mvW, mvH, 8).lineWidth(.7).strokeColor(B.line).stroke();
  doc.rect(mx, my, 4, mvH).fill(i === 0 ? B.pri : i === 1 ? B.sec : B.pri);

  // Number
  doc.fontSize(32).font('Helvetica-Bold').fillColor(B.priPale);
  doc.text(`0${i+1}`, mx + mvW - 38, my + 6, { width: 30, align: 'right' });

  doc.fontSize(11).font('Helvetica-Bold').fillColor(B.priDk);
  doc.text(c.title, mx + 16, my + 14, { width: mvW - 28 });

  goldLine(doc, mx + 16, my + 32, 30);

  doc.fontSize(8).font('Helvetica').fillColor(B.body).lineGap(3);
  doc.text(c.text, mx + 16, my + 44, { width: mvW - 28 });
});

y += mvH + 22;
softLine(doc, y);
y += 18;

// At-a-glance stats
y = tagline(doc, 'At A Glance', y);

const stats = [
  { n: '25+', l: 'Premium Products' },
  { n: '7', l: 'Product Categories' },
  { n: '40+', l: 'Countries Served' },
  { n: '5', l: 'Continents' },
  { n: '50+', l: 'MT Daily Capacity' },
];
const stW = CW / stats.length;
stats.forEach((s, i) => {
  const sx = MG + i * stW;
  doc.roundedRect(sx + 4, y, stW - 8, 58, 6).fill(i % 2 === 0 ? B.priPale : B.secPale);
  doc.fontSize(24).font('Helvetica-Bold').fillColor(i % 2 === 0 ? B.pri : B.sec);
  doc.text(s.n, sx + 4, y + 6, { width: stW - 8, align: 'center' });
  doc.fontSize(7).font('Helvetica-Bold').fillColor(B.caption);
  doc.text(s.l.toUpperCase(), sx + 4, y + 36, { width: stW - 8, align: 'center' });
});

y += 78;

// Quote bar
doc.roundedRect(MG, y, CW, 52, 8).fill(B.priDp);
dia(doc, MG + 24, y + 26, 7, B.sec);
doc.fontSize(9.5).font('Helvetica-Oblique').fillColor(B.secLt);
doc.text(
  '"Our promise is simple — premium quality, fair pricing, and a partnership you can rely on for years to come."',
  MG + 42, y + 12, { width: CW - 58 }
);


// ═══════════════════════════════════════════════════════════════
//  PAGE 3 — WHY CHOOSE US
// ═══════════════════════════════════════════════════════════════
newPage();

goldLine(doc, 0, 0, W);
footer(doc, pg);

y = 40;
y = tagline(doc, 'Our Advantages', y);
y = heading(doc, 'Why Global Buyers Choose\nAGRITRADE OVERSEAS', y);
y += 10;

const advs = [
  { n: '01', t: 'Quality Assurance', d: 'Every product undergoes rigorous multi-stage quality checks including sortex processing, lab testing, and pre-shipment inspection.' },
  { n: '02', t: 'Direct Sourcing', d: 'Direct partnerships with farming communities across Gujarat, Rajasthan, and Madhya Pradesh ensure authentic, traceable, and fresh produce.' },
  { n: '03', t: 'Competitive Pricing', d: 'Our farm-to-port model eliminates middlemen. Direct sourcing and efficient operations deliver the best value without compromising quality.' },
  { n: '04', t: 'Export Documentation', d: 'Complete documentation support — phytosanitary certificates, fumigation, certificate of origin, lab reports, and customs clearance.' },
  { n: '05', t: 'Timely Delivery', d: 'Strategic location near Mundra and Kandla ports. Experienced logistics team ensuring on-schedule shipments worldwide.' },
  { n: '06', t: 'Global Standards', d: 'FSSAI, APEDA, and HACCP compliant. Products meet EU, USDA, and destination-country import regulations.' },
  { n: '07', t: 'Reliable Supply Chain', d: 'Diversified sourcing and strategic inventory reserves ensure consistent supply regardless of seasonal fluctuations.' },
  { n: '08', t: 'Long-Term Partnerships', d: 'We believe in building enduring relationships, not one-time transactions. Your success is our success.' },
];

const advW = (CW - 16) / 2;
const advH = 78;
advs.forEach((a, i) => {
  const col = i % 2;
  const row = Math.floor(i / 2);
  const ax = MG + col * (advW + 16);
  const ay = y + row * (advH + 10);

  // Card
  doc.roundedRect(ax, ay, advW, advH, 7).fill(B.white);
  doc.roundedRect(ax, ay, advW, advH, 7).lineWidth(.6).strokeColor(B.line).stroke();

  // Left accent
  const accentColor = i % 2 === 0 ? B.pri : B.sec;
  doc.rect(ax, ay, 4, advH).fill(accentColor);

  // Number circle
  circ(doc, ax + 28, ay + 20, 13, accentColor);
  doc.fontSize(9).font('Helvetica-Bold').fillColor(B.white);
  doc.text(a.n, ax + 17, ay + 15, { width: 22, align: 'center' });

  // Title
  doc.fontSize(10.5).font('Helvetica-Bold').fillColor(B.heading);
  doc.text(a.t, ax + 50, ay + 11, { width: advW - 60 });

  // Desc
  doc.fontSize(7.8).font('Helvetica').fillColor(B.caption).lineGap(2.5);
  doc.text(a.d, ax + 50, ay + 28, { width: advW - 60 });
});

y += 4 * (advH + 10) + 10;

// Trust bar
doc.roundedRect(MG, y, CW, 42, 7).fill(B.priDp);
goldLine(doc, MG, y, CW);

const certs = ['FSSAI Licensed', 'APEDA Registered', 'IEC Holder', 'GST Registered', 'RCMC Certified'];
const cw2 = CW / certs.length;
certs.forEach((c, i) => {
  circ(doc, MG + i * cw2 + 18, y + 24, 6.5, B.sec);
  chk(doc, MG + i * cw2 + 18, y + 24, B.priDp);
  doc.fontSize(7.5).font('Helvetica-Bold').fillColor(B.white);
  doc.text(c, MG + i * cw2 + 30, y + 20, { width: cw2 - 38 });
});

// Bottom image strip
y += 55;
const stripH = H - y - 30;
if (stripH > 60) {
  clipImg(doc, INFRA('factory-interior.jpg'), MG, y, CW, stripH, 8);
  doc.roundedRect(MG, y, CW, stripH, 8).lineWidth(1.5).strokeColor(B.sec).stroke();
  // Overlay label
  doc.save().fillOpacity(0.88);
  doc.roundedRect(MG + CW/2 - 130, y + stripH - 35, 260, 28, 5).fill(B.priDp);
  doc.restore();
  doc.fontSize(8).font('Helvetica-Bold').fillColor(B.sec);
  doc.text('MODERN PROCESSING FACILITY  ·  JAMNAGAR, INDIA', MG + CW/2 - 120, y + stripH - 28, { width: 240, align: 'center' });
}


// ═══════════════════════════════════════════════════════════════
//  PAGE 4 — QUALITY & CERTIFICATIONS
// ═══════════════════════════════════════════════════════════════
newPage();

goldLine(doc, 0, 0, W);
footer(doc, pg);

// Quality hero image — top band
const qHeroH = 175;
clipImg(doc, ASSET('quality.png'), 0, 3, W, qHeroH);
doc.save().fillOpacity(0.5);
grad(doc, 0, qHeroH - 60, W, 60, '#00000005', B.priDp, 20);
doc.restore();

doc.save().fillOpacity(0.88);
doc.roundedRect(MG, qHeroH - 42, 200, 36, 5).fill(B.priDp);
doc.restore();
doc.fontSize(8).font('Helvetica-Bold').fillColor(B.sec);
doc.text('COMMITMENT TO EXCELLENCE', MG + 14, qHeroH - 38);
doc.fontSize(15).font('Helvetica-Bold').fillColor(B.white);
doc.text('Quality & Compliance', MG + 14, qHeroH - 24);

y = qHeroH + 15;

para(doc,
  'Quality is the cornerstone of everything we do. From sourcing to shipment, every step follows rigorous protocols ensuring our products consistently exceed international standards.',
  MG, y, CW
);
y += 40;

// Certifications row
y = tagline(doc, 'Certifications & Registrations', y);

const certCards = [
  { code: 'IEC', name: 'Import Export\nCode', color: B.pri },
  { code: 'APEDA', name: 'Agricultural Export\nDevelopment Authority', color: B.sec },
  { code: 'GST', name: 'Goods & Services\nTax Registration', color: B.pri },
  { code: 'FSSAI', name: 'Food Safety\nStandards Authority', color: B.sec },
  { code: 'RCMC', name: 'Registration Cum\nMembership Certificate', color: B.pri },
];

const ccW = (CW - 4 * 10) / 5;
certCards.forEach((c, i) => {
  const cx = MG + i * (ccW + 10);
  doc.roundedRect(cx, y, ccW, 82, 7).fill(B.white);
  doc.roundedRect(cx, y, ccW, 82, 7).lineWidth(1).strokeColor(c.color).stroke();
  doc.rect(cx, y, ccW, 3.5).fill(c.color);

  // Badge circle
  circ(doc, cx + ccW/2, y + 28, 14, c.color);
  doc.fontSize(7.5).font('Helvetica-Bold').fillColor(B.white);
  doc.text(c.code, cx + ccW/2 - 16, y + 23, { width: 32, align: 'center' });

  doc.fontSize(6.5).font('Helvetica').fillColor(B.caption);
  doc.text(c.name, cx + 5, y + 50, { width: ccW - 10, align: 'center' });
});

y += 100;
softLine(doc, y);
y += 15;

// Export Process Infographic
y = tagline(doc, 'How We Work', y);
y = subheading(doc, 'Our Export Process', y);
y += 5;

const steps = [
  { n: '01', t: 'Inquiry', d: 'Buyer reaches out with product requirements and specifications' },
  { n: '02', t: 'Quotation', d: 'We provide detailed pricing, product specs, and terms' },
  { n: '03', t: 'Order Confirmation', d: 'Agreement on quantity, quality parameters, and delivery schedule' },
  { n: '04', t: 'Processing', d: 'Product sourced, cleaned, graded, and processed at our facility' },
  { n: '05', t: 'Quality Inspection', d: 'Multi-stage lab testing and pre-shipment quality checks' },
  { n: '06', t: 'Shipment', d: 'Containerization, documentation, and dispatch from Indian ports' },
  { n: '07', t: 'Delivery', d: 'Cargo delivered to destination with full tracking and support' },
];

// Horizontal timeline
const tlY = y;
const tlStepW = CW / steps.length;

// Draw connecting line
doc.moveTo(MG + 15, tlY + 18).lineTo(W - MG - 15, tlY + 18).lineWidth(2).strokeColor(B.line).stroke();

steps.forEach((s, i) => {
  const sx = MG + i * tlStepW + tlStepW / 2;

  // Node circle
  circ(doc, sx, tlY + 18, 12, i % 2 === 0 ? B.pri : B.sec);
  doc.fontSize(7).font('Helvetica-Bold').fillColor(B.white);
  doc.text(s.n, sx - 8, tlY + 14, { width: 16, align: 'center' });

  // Arrow down
  doc.moveTo(sx, tlY + 31).lineTo(sx, tlY + 40).lineWidth(1.5).strokeColor(i % 2 === 0 ? B.pri : B.sec).stroke();
  // Small triangle
  doc.moveTo(sx - 3, tlY + 38).lineTo(sx + 3, tlY + 38).lineTo(sx, tlY + 43).fill(i % 2 === 0 ? B.pri : B.sec);

  // Label
  doc.fontSize(8).font('Helvetica-Bold').fillColor(B.heading);
  doc.text(s.t, sx - tlStepW/2 + 2, tlY + 48, { width: tlStepW - 4, align: 'center' });

  doc.fontSize(6.5).font('Helvetica').fillColor(B.caption);
  doc.text(s.d, sx - tlStepW/2 + 2, tlY + 62, { width: tlStepW - 4, align: 'center' });
});

y = tlY + 100;
softLine(doc, y);
y += 15;

// Quality control steps
y = tagline(doc, 'Quality Control Framework', y);

const qcSteps = [
  { t: 'Incoming Inspection', d: 'Raw material testing at arrival — moisture, foreign matter, visual grading' },
  { t: 'Processing QC', d: 'Multi-stage cleaning via destoners, gravity separators, color sortex machines' },
  { t: 'Lab Analysis', d: 'Aflatoxin, pesticide residue, microbiological testing at NABL-accredited labs' },
  { t: 'Pre-Shipment Check', d: 'Final inspection with third-party options — SGS, Intertek, Bureau Veritas' },
];

const qcW = (CW - 3 * 10) / 4;
qcSteps.forEach((q, i) => {
  const qx = MG + i * (qcW + 10);
  doc.roundedRect(qx, y, qcW, 80, 6).fill(i % 2 === 0 ? B.priPale : B.secPale);

  circ(doc, qx + 18, y + 18, 10, i % 2 === 0 ? B.pri : B.sec);
  chk(doc, qx + 18, y + 18, B.white);

  doc.fontSize(8.5).font('Helvetica-Bold').fillColor(B.heading);
  doc.text(q.t, qx + 10, y + 35, { width: qcW - 20 });
  doc.fontSize(7).font('Helvetica').fillColor(B.caption).lineGap(2);
  doc.text(q.d, qx + 10, y + 50, { width: qcW - 20 });
});


// ═══════════════════════════════════════════════════════════════
//  PAGE 5 — PRODUCT PORTFOLIO OVERVIEW
// ═══════════════════════════════════════════════════════════════
newPage();

goldLine(doc, 0, 0, W);
footer(doc, pg);

// Full-width collage hero
const colH = 300;
clipImg(doc, ASSET('collage.png'), 0, 3, W, colH);
doc.save().fillOpacity(0.55);
grad(doc, 0, colH - 90, W, 90, '#00000005', B.priDp, 25);
doc.restore();

doc.save().fillOpacity(0.9);
doc.roundedRect(MG, colH - 58, 215, 50, 6).fill(B.priDp);
doc.restore();
doc.fontSize(8).font('Helvetica-Bold').fillColor(B.sec);
doc.text('PRODUCT PORTFOLIO', MG + 16, colH - 52, { characterSpacing: 2 });
doc.fontSize(22).font('Helvetica-Bold').fillColor(B.white);
doc.text('Our Product Range', MG + 16, colH - 36);

y = colH + 18;

para(doc,
  'AGRITRADE OVERSEAS offers a carefully curated portfolio of India\'s finest agricultural commodities, sourced from premier growing regions and processed to meet the exacting standards of international markets.',
  MG, y, CW
);
y += 40;

// Category cards — 4 + 3 grid
const allCats = [
  { name: 'Groundnuts', cnt: '4 Varieties', img: PROD('groundnuts','bold-peanuts.png') },
  { name: 'Sesame Seeds', cnt: '3 Varieties', img: PROD('sesame-seeds','natural-white-sesame-seeds.png') },
  { name: 'Spices', cnt: '8 Varieties', img: PROD('spices','cumin-seeds.png') },
  { name: 'Pulses', cnt: '5 Varieties', img: PROD('pulses','chickpeas.png') },
  { name: 'Grains', cnt: '2 Varieties', img: PROD('grains','wheat.png') },
  { name: 'Raisins', cnt: 'Premium', img: PROD('dry-fruits','raisins.png') },
  { name: 'Garlic', cnt: 'Fresh Export', img: null },
];

// First row: 4 cards
const r1Cols = 4;
const r1Gap = 12;
const r1W = (CW - (r1Cols - 1) * r1Gap) / r1Cols;
const r1H = 130;

for (let i = 0; i < 4; i++) {
  const cat = allCats[i];
  const cx = MG + i * (r1W + r1Gap);

  doc.roundedRect(cx, y, r1W, r1H, 7).fill(B.white);
  doc.roundedRect(cx, y, r1W, r1H, 7).lineWidth(.7).strokeColor(B.line).stroke();
  doc.rect(cx, y, r1W, 3).fill(i % 2 === 0 ? B.pri : B.sec);

  // Product image
  if (cat.img) {
    clipImg(doc, cat.img, cx + 10, y + 12, r1W - 20, r1H * 0.52, 5);
  }

  doc.fontSize(9).font('Helvetica-Bold').fillColor(B.heading);
  doc.text(cat.name, cx + 8, y + r1H * 0.52 + 20, { width: r1W - 16, align: 'center' });
  doc.fontSize(7).font('Helvetica').fillColor(B.sec);
  doc.text(cat.cnt, cx + 8, y + r1H * 0.52 + 34, { width: r1W - 16, align: 'center' });
}

y += r1H + 14;

// Second row: 3 cards
const r2Cols = 3;
const r2W = (CW - (r2Cols - 1) * r1Gap) / r2Cols;

for (let i = 0; i < 3; i++) {
  const cat = allCats[i + 4];
  const cx = MG + i * (r2W + r1Gap);

  doc.roundedRect(cx, y, r2W, r1H, 7).fill(B.white);
  doc.roundedRect(cx, y, r2W, r1H, 7).lineWidth(.7).strokeColor(B.line).stroke();
  doc.rect(cx, y, r2W, 3).fill(i % 2 === 0 ? B.pri : B.sec);

  if (cat.img) {
    clipImg(doc, cat.img, cx + 14, y + 12, r2W - 28, r1H * 0.52, 5);
  } else {
    // Garlic — draw placeholder circle with icon
    doc.roundedRect(cx + 14, y + 12, r2W - 28, r1H * 0.52, 5).fill(B.priPale);
    circ(doc, cx + r2W/2, y + 12 + r1H * 0.26, 18, B.pri);
    doc.fontSize(18).font('Helvetica-Bold').fillColor(B.white);
    doc.text('G', cx + r2W/2 - 8, y + 12 + r1H * 0.26 - 10, { width: 16, align: 'center' });
  }

  doc.fontSize(9).font('Helvetica-Bold').fillColor(B.heading);
  doc.text(cat.name, cx + 8, y + r1H * 0.52 + 20, { width: r2W - 16, align: 'center' });
  doc.fontSize(7).font('Helvetica').fillColor(B.sec);
  doc.text(cat.cnt, cx + 8, y + r1H * 0.52 + 34, { width: r2W - 16, align: 'center' });
}


// ═══════════════════════════════════════════════════════════════
//  PAGE 6 — GROUNDNUTS
// ═══════════════════════════════════════════════════════════════
newPage();

goldLine(doc, 0, 0, W);
footer(doc, pg);

y = 35;
y = tagline(doc, 'Product Spotlight', y);
y = heading(doc, 'Groundnuts', y);

// Large hero image
const gnImgH = 200;
clipImg(doc, PROD('','groundnuts.png'), MG, y, CW, gnImgH, 8);
doc.roundedRect(MG, y, CW, gnImgH, 8).lineWidth(1.5).strokeColor(B.sec).stroke();

y += gnImgH + 12;

para(doc,
  'AGRITRADE OVERSEAS is a trusted supplier of premium Indian groundnuts sourced from Gujarat\'s most fertile farming regions. We offer a comprehensive range of groundnut varieties — processed under strict quality controls and packaged for international export.',
  MG, y, CW
);
y += 42;

// 4 product cards
const gnProds = [
  { name: 'Peanuts In Shell', img: PROD('groundnuts','peanuts-in-shell.png'), spec: 'Count: 9/11, 11/13\nOil: 42–48%' },
  { name: 'Bold Peanuts', img: PROD('groundnuts','bold-peanuts.png'), spec: 'Count: 38/42, 40/50\nOil: 44–48%' },
  { name: 'Blanched Peanuts', img: PROD('groundnuts','blanched-peanuts.png'), spec: 'Skin Removal: 95–99%\nColor: Creamy white' },
  { name: 'Java Peanuts', img: PROD('groundnuts','java-peanuts.png'), spec: 'Count: 60/70, 70/80\nOil: 46–50%' },
];

const gpW = (CW - 3 * 10) / 4;
const gpH = 115;
gnProds.forEach((p, i) => {
  const px = MG + i * (gpW + 10);
  doc.roundedRect(px, y, gpW, gpH, 6).fill(B.white);
  doc.roundedRect(px, y, gpW, gpH, 6).lineWidth(.6).strokeColor(B.line).stroke();
  doc.rect(px, y, gpW, 3).fill(B.pri);

  clipImg(doc, p.img, px + 8, y + 10, gpW - 16, gpH * 0.45, 4);

  doc.fontSize(8).font('Helvetica-Bold').fillColor(B.heading);
  doc.text(p.name, px + 6, y + gpH * 0.45 + 16, { width: gpW - 12, align: 'center' });
  doc.fontSize(6.5).font('Helvetica').fillColor(B.caption);
  doc.text(p.spec, px + 6, y + gpH * 0.45 + 30, { width: gpW - 12, align: 'center' });
});

y += gpH + 14;
softLine(doc, y);
y += 12;

// Specification table
y = subheading(doc, 'Specifications & Export Details', y);
y += 4;

const gnSpec = [
  ['Origin', 'Gujarat & Andhra Pradesh, India'],
  ['Varieties', 'Bold · Java · Blanched · In-Shell'],
  ['Oil Content', '42–50%'],
  ['Moisture', '5–8% Max'],
  ['Aflatoxin', 'Within EU & USDA permissible limits'],
  ['Packaging', '25/50 Kg PP Bags · Jute · Vacuum · Custom'],
  ['Shelf Life', '10–12 months in proper storage'],
  ['Certifications', 'FSSAI · APEDA · Phytosanitary'],
];

const tblHdr = 22;
doc.rect(MG, y, CW, tblHdr).fill(B.priDp);
doc.fontSize(7.5).font('Helvetica-Bold').fillColor(B.white);
doc.text('PARAMETER', MG + 12, y + 6, { width: 160 });
doc.text('SPECIFICATION', MG + 175, y + 6, { width: CW - 185 });
y += tblHdr;

gnSpec.forEach((r, i) => {
  const rh = 20;
  doc.rect(MG, y, CW, rh).fill(i % 2 === 0 ? B.priPale : B.white);
  doc.rect(MG, y, CW, rh).lineWidth(.3).strokeColor(B.lineSoft).stroke();
  doc.fontSize(7.5).font('Helvetica-Bold').fillColor(B.heading);
  doc.text(r[0], MG + 12, y + 5, { width: 155 });
  doc.fontSize(7.5).font('Helvetica').fillColor(B.body);
  doc.text(r[1], MG + 175, y + 5, { width: CW - 185 });
  y += rh;
});


// ═══════════════════════════════════════════════════════════════
//  PAGE 7 — SESAME SEEDS
// ═══════════════════════════════════════════════════════════════
newPage();

goldLine(doc, 0, 0, W);
footer(doc, pg);

y = 35;
y = tagline(doc, 'Product Spotlight', y);
y = heading(doc, 'Sesame Seeds', y);

// Hero image
const ssImgH = 185;
clipImg(doc, PROD('','sesame-seeds.png'), MG, y, CW, ssImgH, 8);
doc.roundedRect(MG, y, CW, ssImgH, 8).lineWidth(1.5).strokeColor(B.sec).stroke();
y += ssImgH + 12;

para(doc,
  'India is among the world\'s top exporters of sesame seeds. Our seeds are sourced from Gujarat, Rajasthan, and Madhya Pradesh — machine-cleaned and double-sortex processed for superior quality and purity.',
  MG, y, CW
);
y += 38;

// 3 sesame cards
const ssProds = [
  { name: 'Natural White\nSesame Seeds', img: PROD('sesame-seeds','natural-white-sesame-seeds.png'), spec: 'Purity: 99.9%\nOil: 48–52%\nColor: Creamy White' },
  { name: 'Hulled\nSesame Seeds', img: PROD('sesame-seeds','hulled-sesame-seeds.png'), spec: 'Purity: 99.5%\nOil: 50–55%\nColor: Pure White' },
  { name: 'Black\nSesame Seeds', img: PROD('sesame-seeds','black-sesame-seeds.png'), spec: 'Purity: 99.5%\nOil: 46–50%\nColor: Jet Black' },
];

const ssW = (CW - 2 * 14) / 3;
const ssH = 155;
ssProds.forEach((p, i) => {
  const px = MG + i * (ssW + 14);
  doc.roundedRect(px, y, ssW, ssH, 7).fill(B.white);
  doc.roundedRect(px, y, ssW, ssH, 7).lineWidth(.8).strokeColor(i === 0 ? B.pri : i === 1 ? B.sec : B.priDk).stroke();
  doc.rect(px, y, ssW, 3.5).fill(i === 0 ? B.pri : i === 1 ? B.sec : B.priDk);

  clipImg(doc, p.img, px + 12, y + 12, ssW - 24, ssH * 0.42, 5);

  doc.fontSize(8.5).font('Helvetica-Bold').fillColor(B.heading);
  doc.text(p.name, px + 10, y + ssH * 0.42 + 18, { width: ssW - 20, align: 'center' });

  doc.fontSize(7).font('Helvetica').fillColor(B.caption);
  doc.text(p.spec, px + 10, y + ssH * 0.42 + 42, { width: ssW - 20, align: 'center' });
});

y += ssH + 14;
softLine(doc, y);
y += 12;

// Specifications
y = subheading(doc, 'Specifications & Applications', y);
y += 4;

const ssSpec = [
  ['Origin', 'Gujarat, Rajasthan & Madhya Pradesh, India'],
  ['Moisture', '4–6% Max'],
  ['FFA', '1–2% Max'],
  ['Processing', 'Machine cleaned · Double sortex · Color sorted'],
  ['Applications', 'Tahini · Bakery · Confectionery · Oil Extraction · Health Foods'],
  ['Packaging', '25/50 Kg PP Bags · Kraft Paper · Vacuum Sealed'],
  ['Markets', 'Japan · Korea · EU · Middle East · USA'],
];

doc.rect(MG, y, CW, tblHdr).fill(B.priDp);
doc.fontSize(7.5).font('Helvetica-Bold').fillColor(B.white);
doc.text('PARAMETER', MG + 12, y + 6, { width: 140 });
doc.text('DETAILS', MG + 160, y + 6, { width: CW - 170 });
y += tblHdr;

ssSpec.forEach((r, i) => {
  const rh = 20;
  doc.rect(MG, y, CW, rh).fill(i % 2 === 0 ? B.secPale : B.white);
  doc.rect(MG, y, CW, rh).lineWidth(.3).strokeColor(B.lineSoft).stroke();
  doc.fontSize(7.5).font('Helvetica-Bold').fillColor(B.heading);
  doc.text(r[0], MG + 12, y + 5, { width: 140 });
  doc.fontSize(7.5).font('Helvetica').fillColor(B.body);
  doc.text(r[1], MG + 160, y + 5, { width: CW - 170 });
  y += rh;
});


// ═══════════════════════════════════════════════════════════════
//  PAGE 8 — SPICES
// ═══════════════════════════════════════════════════════════════
newPage();

goldLine(doc, 0, 0, W);
footer(doc, pg);

y = 35;
y = tagline(doc, 'Product Spotlight', y);
y = heading(doc, 'Spices', y);

// Hero image
clipImg(doc, PROD('','spices.png'), MG, y, CW, 155, 8);
doc.roundedRect(MG, y, CW, 155, 8).lineWidth(1.5).strokeColor(B.sec).stroke();
y += 167;

para(doc,
  'India — the "Land of Spices" — contributes over 75% of global spice production. AGRITRADE OVERSEAS exports the finest Indian spices, cleaned, sorted, and graded to meet ESA and international quality standards.',
  MG, y, CW
);
y += 38;

// 8 spice cards in 2×4 grid
const spProds = [
  { name: 'Cumin Seeds', img: PROD('spices','cumin-seeds.png'), spec: '99.5% Purity' },
  { name: 'Coriander Seeds', img: PROD('spices','coriander-seeds.png'), spec: 'Eagle / Scooter' },
  { name: 'Fenugreek Seeds', img: PROD('spices','fenugreek-seeds.png'), spec: '99% Purity' },
  { name: 'Fennel Seeds', img: PROD('spices','fennel-seeds.png'), spec: 'Bold / Medium' },
  { name: 'Dry Ginger', img: PROD('spices','dry-ginger.png'), spec: 'Cochin / Calicut' },
  { name: 'Turmeric Finger', img: PROD('spices','turmeric-finger.png'), spec: 'Curcumin 3–5%' },
  { name: 'Ajwain', img: PROD('spices','ajwain.png'), spec: 'High Thymol' },
  { name: 'Chilli', img: PROD('spices','chilli.png'), spec: 'Teja / S17 / Byadgi' },
];

const spCols = 4;
const spGap = 10;
const spW = (CW - (spCols - 1) * spGap) / spCols;
const spH = 100;

spProds.forEach((p, i) => {
  const col = i % spCols;
  const row = Math.floor(i / spCols);
  const px = MG + col * (spW + spGap);
  const py = y + row * (spH + 10);

  doc.roundedRect(px, py, spW, spH, 6).fill(B.white);
  doc.roundedRect(px, py, spW, spH, 6).lineWidth(.6).strokeColor(B.line).stroke();
  doc.rect(px, py, spW, 2.5).fill(i % 2 === 0 ? B.sec : B.pri);

  clipImg(doc, p.img, px + 8, py + 8, spW - 16, spH * 0.48, 4);

  doc.fontSize(7.5).font('Helvetica-Bold').fillColor(B.heading);
  doc.text(p.name, px + 4, py + spH * 0.48 + 14, { width: spW - 8, align: 'center' });
  doc.fontSize(6.5).font('Helvetica').fillColor(B.sec);
  doc.text(p.spec, px + 4, py + spH * 0.48 + 27, { width: spW - 8, align: 'center' });
});

y += 2 * (spH + 10) + 8;

// Bottom info strip
doc.roundedRect(MG, y, CW, 34, 6).fill(B.priDp);
dia(doc, MG + 20, y + 17, 6, B.sec);
doc.fontSize(7.5).font('Helvetica').fillColor(B.secLt);
doc.text(
  'All spices tested for volatile oil content, purity, moisture, and compliance with Singapore / Europe quality standards. Third-party inspection available.',
  MG + 34, y + 9, { width: CW - 48 }
);


// ═══════════════════════════════════════════════════════════════
//  PAGE 9 — PULSES & GRAINS
// ═══════════════════════════════════════════════════════════════
newPage();

goldLine(doc, 0, 0, W);
footer(doc, pg);

y = 35;
y = tagline(doc, 'Product Spotlight', y);
y = heading(doc, 'Pulses & Grains', y);

// Split section — Pulses left big + Grains right
// Pulses heading
y = subheading(doc, 'Pulses', y);

para(doc,
  'India is the world\'s largest producer of pulses. Our portfolio features protein-rich legumes from Madhya Pradesh, Rajasthan, and Maharashtra — cleaned, graded, and export-ready.',
  MG, y, CW
);
y += 35;

// 5 pulse cards (3 + 2)
const plProds = [
  { name: 'Kabuli Chickpeas', img: PROD('pulses','chickpeas.png'), spec: '8/9/10mm+ · Protein 18–22%' },
  { name: 'Desi Chickpeas', img: PROD('pulses','desi-chickpeas.png'), spec: 'Brown Chana · Protein 20–24%' },
  { name: 'Green Moong', img: PROD('pulses','green-moong.png'), spec: 'Germination 90%+ · Protein 22–25%' },
  { name: 'Bengal Gram', img: PROD('pulses','gram.png'), spec: 'Golden Yellow · Protein 20–24%' },
  { name: 'Soyabeans', img: PROD('pulses','soyabeans.png'), spec: 'Non-GMO · Protein 38–42%' },
];

const plCols = 5;
const plGap = 10;
const plW = (CW - (plCols - 1) * plGap) / plCols;
const plH = 110;

plProds.forEach((p, i) => {
  const px = MG + i * (plW + plGap);
  doc.roundedRect(px, y, plW, plH, 6).fill(B.white);
  doc.roundedRect(px, y, plW, plH, 6).lineWidth(.6).strokeColor(B.line).stroke();
  doc.rect(px, y, plW, 2.5).fill(i % 2 === 0 ? B.pri : B.sec);

  clipImg(doc, p.img, px + 6, y + 8, plW - 12, plH * 0.48, 4);

  doc.fontSize(7).font('Helvetica-Bold').fillColor(B.heading);
  doc.text(p.name, px + 4, y + plH * 0.48 + 14, { width: plW - 8, align: 'center' });
  doc.fontSize(6).font('Helvetica').fillColor(B.caption);
  doc.text(p.spec, px + 4, y + plH * 0.48 + 28, { width: plW - 8, align: 'center' });
});

y += plH + 18;
softLine(doc, y);
y += 15;

// Grains section
y = subheading(doc, 'Grains', y);

para(doc,
  'Premium Indian wheat and rice — selected for optimal protein content, milling quality, and grain size to meet the requirements of flour mills, food processors, and institutional buyers worldwide.',
  MG, y, CW
);
y += 35;

// 2 grain cards + spec table side by side
const grW = (CW - 14) / 2;

// Wheat card
const grCards = [
  { name: 'Wheat', img: PROD('grains','wheat.png'), spec: 'Sharbati · Lokwan · Durum\nProtein: 11–14% · Moisture ≤14%' },
  { name: 'Rice', img: PROD('grains','rice.png'), spec: 'Basmati · Non-Basmati\n1121 · Pusa · Sona Masoori · IR64' },
];

grCards.forEach((p, i) => {
  const px = MG + i * (grW + 14);
  doc.roundedRect(px, y, grW, 140, 7).fill(B.white);
  doc.roundedRect(px, y, grW, 140, 7).lineWidth(.7).strokeColor(B.line).stroke();
  doc.rect(px, y, grW, 3).fill(i === 0 ? B.pri : B.sec);

  clipImg(doc, p.img, px + 12, y + 10, grW - 24, 75, 5);

  doc.fontSize(10).font('Helvetica-Bold').fillColor(B.heading);
  doc.text(p.name, px + 12, y + 92, { width: grW - 24 });
  doc.fontSize(7.5).font('Helvetica').fillColor(B.caption);
  doc.text(p.spec, px + 12, y + 108, { width: grW - 24 });
});

y += 158;

// Raisins & Garlic row
softLine(doc, y);
y += 12;
y = subheading(doc, 'Raisins & Garlic', y);

const xtraW = (CW - 14) / 2;

// Raisins
doc.roundedRect(MG, y, xtraW, 70, 6).fill(B.secPale);
doc.roundedRect(MG, y, xtraW, 70, 6).lineWidth(.6).strokeColor(B.secLt).stroke();
doc.rect(MG, y, 4, 70).fill(B.sec);

if (fs.existsSync(PROD('dry-fruits','raisins.png'))) {
  clipImg(doc, PROD('dry-fruits','raisins.png'), MG + 12, y + 8, 54, 54, 5);
}
doc.fontSize(10).font('Helvetica-Bold').fillColor(B.heading);
doc.text('Raisins', MG + 75, y + 12, { width: xtraW - 85 });
doc.fontSize(7.5).font('Helvetica').fillColor(B.body);
doc.text('Premium Indian raisins — golden and green varieties. Sweet flavor profile, ideal for confectionery, bakery, and retail markets.', MG + 75, y + 28, { width: xtraW - 85 });

// Garlic
doc.roundedRect(MG + xtraW + 14, y, xtraW, 70, 6).fill(B.priPale);
doc.roundedRect(MG + xtraW + 14, y, xtraW, 70, 6).lineWidth(.6).strokeColor(B.priLt).stroke();
doc.rect(MG + xtraW + 14, y, 4, 70).fill(B.pri);

// Garlic icon placeholder
circ(doc, MG + xtraW + 53, y + 35, 22, B.pri);
doc.fontSize(18).font('Helvetica-Bold').fillColor(B.white);
doc.text('G', MG + xtraW + 44, y + 25, { width: 18, align: 'center' });

doc.fontSize(10).font('Helvetica-Bold').fillColor(B.heading);
doc.text('Garlic', MG + xtraW + 83, y + 12, { width: xtraW - 95 });
doc.fontSize(7.5).font('Helvetica').fillColor(B.body);
doc.text('Fresh Indian garlic for export — uniform size, strong flavor, extended shelf life. Available in bulk and custom packaging.', MG + xtraW + 83, y + 28, { width: xtraW - 95 });


// ═══════════════════════════════════════════════════════════════
//  PAGE 10 — PACKAGING SOLUTIONS
// ═══════════════════════════════════════════════════════════════
newPage();

goldLine(doc, 0, 0, W);
footer(doc, pg);

// Hero packaging image
const pkHeroH = 195;
clipImg(doc, ASSET('packaging.png'), 0, 3, W, pkHeroH);
doc.save().fillOpacity(0.5);
grad(doc, 0, pkHeroH - 60, W, 60, '#00000005', B.priDp, 20);
doc.restore();

doc.save().fillOpacity(0.9);
doc.roundedRect(MG, pkHeroH - 42, 210, 36, 5).fill(B.priDp);
doc.restore();
doc.fontSize(8).font('Helvetica-Bold').fillColor(B.sec);
doc.text('EXPORT READY', MG + 14, pkHeroH - 38, { characterSpacing: 2 });
doc.fontSize(15).font('Helvetica-Bold').fillColor(B.white);
doc.text('Packaging Solutions', MG + 14, pkHeroH - 24);

y = pkHeroH + 15;

para(doc,
  'We offer versatile packaging options tailored to the specific requirements of each buyer and destination market. From industrial bulk to retail-ready custom packaging — we handle it all.',
  MG, y, CW
);
y += 38;

// Packaging option cards
const pkgOpts = [
  { t: 'PP Woven Bags', s: '25 / 50 Kg', d: 'Standard food-grade PP bags with inner liner. Ideal for pulses, seeds, and grains.', color: B.pri },
  { t: 'Jute Bags', s: '25 / 50 Kg', d: 'Traditional eco-friendly packaging. Preferred for spices, grains, and specific market requirements.', color: B.sec },
  { t: 'Vacuum Sealed', s: '1–25 Kg', d: 'Premium vacuum-sealed packs ensuring freshness and extended shelf life for retail and e-commerce.', color: B.pri },
  { t: 'Custom / Private Label', s: 'As Required', d: 'Buyer-branded packaging with custom design, logos, and labeling per destination market regulations.', color: B.sec },
  { t: 'Bulk / Container', s: '20\' / 40\' FCL', d: 'Flexi-bags and container liners for large-volume industrial shipments. Efficient and cost-effective.', color: B.pri },
  { t: 'Retail Ready Packs', s: '500g – 5 Kg', d: 'Consumer-grade packaging designed for supermarket shelves. Multiple language labeling available.', color: B.sec },
];

const pkW = (CW - 2 * 12) / 3;
const pkH = 100;
pkgOpts.forEach((p, i) => {
  const col = i % 3;
  const row = Math.floor(i / 3);
  const px = MG + col * (pkW + 12);
  const py = y + row * (pkH + 12);

  doc.roundedRect(px, py, pkW, pkH, 7).fill(B.white);
  doc.roundedRect(px, py, pkW, pkH, 7).lineWidth(.6).strokeColor(B.line).stroke();
  doc.rect(px, py, 4, pkH).fill(p.color);

  // Size badge
  doc.roundedRect(px + pkW - 58, py + 8, 48, 16, 3).fill(p.color);
  doc.fontSize(6.5).font('Helvetica-Bold').fillColor(B.white);
  doc.text(p.s, px + pkW - 56, py + 12, { width: 44, align: 'center' });

  doc.fontSize(9.5).font('Helvetica-Bold').fillColor(B.heading);
  doc.text(p.t, px + 14, py + 12, { width: pkW - 80 });

  doc.fontSize(7.5).font('Helvetica').fillColor(B.body).lineGap(2);
  doc.text(p.d, px + 14, py + 35, { width: pkW - 26 });
});

y += 2 * (pkH + 12) + 10;
softLine(doc, y);
y += 12;

// Shipping terms
y = subheading(doc, 'Shipping & Incoterms', y);
y += 5;

doc.roundedRect(MG, y, CW, 55, 7).fill(B.priDp);
goldLine(doc, MG, y, CW);

const incoterms = [
  { code: 'FOB', desc: 'Free On Board' },
  { code: 'CFR', desc: 'Cost & Freight' },
  { code: 'CIF', desc: 'Cost Insurance Freight' },
  { code: 'EXW', desc: 'Ex Works' },
];
const itW = CW / incoterms.length;
incoterms.forEach((ic, i) => {
  const ix = MG + i * itW;
  dia(doc, ix + 18, y + 22, 5, B.sec);
  doc.fontSize(14).font('Helvetica-Bold').fillColor(B.white);
  doc.text(ic.code, ix + 30, y + 12, { width: itW - 38 });
  doc.fontSize(7).font('Helvetica').fillColor(B.secLt);
  doc.text(ic.desc, ix + 30, y + 32, { width: itW - 38 });
});

y += 72;

// Infrastructure strip
const infraStripH = H - y - 30;
if (infraStripH > 50) {
  // 3 infra images side by side
  const isW = (CW - 2 * 8) / 3;
  const isH = Math.min(infraStripH - 5, 110);
  const infraImgs = ['warehouse-storage.jpg', 'packaging-area.jpg', 'cleaning-systems.jpg'];
  const infraLabels = ['Warehouse & Storage', 'Packaging Area', 'Cleaning Systems'];
  infraImgs.forEach((f, i) => {
    const ix = MG + i * (isW + 8);
    clipImg(doc, INFRA(f), ix, y, isW, isH, 6);
    doc.roundedRect(ix, y, isW, isH, 6).lineWidth(1).strokeColor(B.sec).stroke();
    doc.fontSize(6.5).font('Helvetica-Bold').fillColor(B.heading);
    doc.text(infraLabels[i], ix, y + isH + 4, { width: isW, align: 'center' });
  });
}


// ═══════════════════════════════════════════════════════════════
//  PAGE 11 — GLOBAL EXPORT MARKETS
// ═══════════════════════════════════════════════════════════════
newPage();

goldLine(doc, 0, 0, W);
footer(doc, pg);

y = 40;
y = tagline(doc, 'Global Presence', y);
y = heading(doc, 'Serving Buyers Across\nGlobal Markets', y);
y += 10;

para(doc,
  'AGRITRADE OVERSEAS proudly serves buyers across five continents. Our deep understanding of regional preferences, import regulations, and packaging requirements enables us to deliver tailored solutions worldwide.',
  MG, y, CW
);
y += 42;

// World map image
const mapH = 290;
clipImg(doc, ASSET('worldmap.png'), MG, y, CW, mapH, 8);
doc.roundedRect(MG, y, CW, mapH, 8).lineWidth(1.5).strokeColor(B.sec).stroke();

// India label
doc.save().fillOpacity(0.92);
doc.roundedRect(MG + CW * 0.53, y + mapH * 0.42, 55, 18, 4).fill(B.sec);
doc.restore();
doc.fontSize(7.5).font('Helvetica-Bold').fillColor(B.priDp);
doc.text('INDIA', MG + CW * 0.53 + 5, y + mapH * 0.42 + 4, { width: 45, align: 'center' });

y += mapH + 16;

// Market cards
const markets = [
  { region: 'Middle East', countries: 'UAE · Saudi Arabia · Oman · Qatar · Kuwait · Bahrain', color: B.pri },
  { region: 'Europe', countries: 'UK · Germany · Netherlands · France · Spain · Italy', color: B.sec },
  { region: 'Africa', countries: 'South Africa · Kenya · Nigeria · Tanzania · Egypt', color: B.pri },
  { region: 'Asia Pacific', countries: 'Vietnam · Malaysia · Singapore · Japan · South Korea', color: B.sec },
  { region: 'North America', countries: 'USA · Canada · Mexico', color: B.pri },
];

const mkW = (CW - 4 * 8) / 5;
const mkH = 70;
markets.forEach((m, i) => {
  const mx = MG + i * (mkW + 8);
  doc.roundedRect(mx, y, mkW, mkH, 6).fill(B.white);
  doc.roundedRect(mx, y, mkW, mkH, 6).lineWidth(.8).strokeColor(m.color).stroke();
  doc.rect(mx, y, mkW, 3).fill(m.color);

  // Globe icon
  circ(doc, mx + mkW/2, y + 20, 9, m.color);
  doc.save().strokeColor(B.white).lineWidth(.6);
  doc.circle(mx + mkW/2, y + 20, 5.5).stroke();
  doc.moveTo(mx + mkW/2 - 6, y + 20).lineTo(mx + mkW/2 + 6, y + 20).stroke();
  doc.restore();

  doc.fontSize(7).font('Helvetica-Bold').fillColor(B.heading);
  doc.text(m.region, mx + 4, y + 35, { width: mkW - 8, align: 'center' });
  doc.fontSize(5.5).font('Helvetica').fillColor(B.caption);
  doc.text(m.countries, mx + 4, y + 48, { width: mkW - 8, align: 'center' });
});


// ═══════════════════════════════════════════════════════════════
//  PAGE 12 — CONTACT
// ═══════════════════════════════════════════════════════════════
newPage();

// Full dark green luxury background
grad(doc, 0, 0, W, H, '#031A0E', B.priDp, 60);

// Subtle diamond pattern
doc.save().fillOpacity(0.025);
for (let r = 0; r < 20; r++) {
  for (let c = 0; c < 14; c++) {
    dia(doc, c * 46 + 15, r * 46 + 10, 5, B.sec);
  }
}
doc.restore();

// Top gold rules
doc.save().strokeOpacity(0.3);
doc.moveTo(MG, 45).lineTo(W - MG, 45).lineWidth(.5).strokeColor(B.sec).stroke();
doc.restore();

// Logo
if (fs.existsSync(LOGO)) {
  try { doc.image(LOGO, W/2 - 42, 58, { width: 84, fit: [84, 84], align: 'center', valign: 'center' }); } catch(e){}
}

y = 160;
doc.fontSize(9).font('Helvetica-Bold').fillColor(B.sec);
doc.text('GET IN TOUCH', 0, y, { width: W, align: 'center', characterSpacing: 3 });

y += 28;
doc.fontSize(28).font('Helvetica-Bold').fillColor(B.white);
doc.text("Let's Build Long-Term", 0, y, { width: W, align: 'center' });
doc.fontSize(28).font('Helvetica-Bold').fillColor(B.sec);
doc.text('Global Partnerships', 0, y + 34, { width: W, align: 'center' });

y += 80;
doc.fontSize(10).font('Helvetica').fillColor(B.secLt);
doc.text(
  'Whether you are an importer, distributor, wholesaler, or retail chain\nlooking for premium Indian agricultural products — we\'d love to connect.',
  0, y, { width: W, align: 'center' }
);

y += 48;
// Gold divider
doc.moveTo(W/2 - 55, y).lineTo(W/2 - 8, y).lineWidth(1).strokeColor(B.sec).strokeOpacity(0.5).stroke();
dia(doc, W/2, y, 5, B.sec);
doc.moveTo(W/2 + 8, y).lineTo(W/2 + 55, y).lineWidth(1).strokeColor(B.sec).strokeOpacity(0.5).stroke();
doc.strokeOpacity(1);

y += 25;

// Contact cards
const crdW = CW - 80;
const crdX = MG + 40;

// ADDRESS
doc.roundedRect(crdX, y, crdW, 65, 8).lineWidth(1).strokeColor(B.sec).fillOpacity(0.07).fill(B.sec);
doc.fillOpacity(1);
circ(doc, crdX + 26, y + 20, 11, B.sec);
doc.fontSize(7).font('Helvetica-Bold').fillColor(B.priDp);
doc.text('▸', crdX + 22, y + 15, { width: 10 });
doc.fontSize(8).font('Helvetica-Bold').fillColor(B.sec);
doc.text('REGISTERED OFFICE', crdX + 48, y + 10);
doc.fontSize(9).font('Helvetica').fillColor(B.white).lineGap(3);
doc.text('Jamnagar, Gujarat, India', crdX + 48, y + 24);
doc.fontSize(8).font('Helvetica').fillColor(B.secLt);
doc.text('www.agritradeoverseas.com', crdX + 48, y + 42);

y += 78;

// PHONE + EMAIL side by side
const hcW = (crdW - 14) / 2;

doc.roundedRect(crdX, y, hcW, 52, 8).lineWidth(1).strokeColor(B.sec).fillOpacity(0.07).fill(B.sec);
doc.fillOpacity(1);
circ(doc, crdX + 24, y + 18, 10, B.sec);
doc.fontSize(8).font('Helvetica-Bold').fillColor(B.priDp);
doc.text('☎', crdX + 20, y + 13, { width: 10 });
doc.fontSize(8).font('Helvetica-Bold').fillColor(B.sec);
doc.text('PHONE', crdX + 44, y + 10);
doc.fontSize(10).font('Helvetica').fillColor(B.white);
doc.text('+91 9328633775', crdX + 44, y + 26);

doc.roundedRect(crdX + hcW + 14, y, hcW, 52, 8).lineWidth(1).strokeColor(B.sec).fillOpacity(0.07).fill(B.sec);
doc.fillOpacity(1);
circ(doc, crdX + hcW + 38, y + 18, 10, B.sec);
doc.fontSize(8).font('Helvetica-Bold').fillColor(B.priDp);
doc.text('✉', crdX + hcW + 34, y + 13, { width: 10 });
doc.fontSize(8).font('Helvetica-Bold').fillColor(B.sec);
doc.text('EMAIL', crdX + hcW + 58, y + 10);
doc.fontSize(8.5).font('Helvetica').fillColor(B.white);
doc.text('agritradeoverseas07@gmail.com', crdX + hcW + 58, y + 26, { width: hcW - 62 });

y += 65;

// WEBSITE + WHATSAPP QR Codes side by side
doc.roundedRect(crdX, y, hcW, 72, 8).lineWidth(1).strokeColor(B.sec).fillOpacity(0.07).fill(B.sec);
doc.fillOpacity(1);
doc.fontSize(7.5).font('Helvetica-Bold').fillColor(B.sec);
doc.text('WEBSITE QR', crdX + 14, y + 8, { width: hcW - 28 });

// QR code — website (stylized grid)
const qrX1 = crdX + hcW/2 - 16;
const qrY1 = y + 24;
const qrSize = 32;
const qrCell = qrSize / 8;
// QR pattern representation
const qrPat1 = [
  [1,1,1,0,1,1,1,0],
  [1,0,1,0,0,1,0,1],
  [1,1,1,0,1,0,1,0],
  [0,0,0,1,0,1,0,1],
  [1,0,1,0,1,1,1,0],
  [0,1,0,1,1,0,1,1],
  [1,1,1,0,0,1,0,0],
  [1,0,1,1,1,1,1,1],
];
qrPat1.forEach((row, ri) => {
  row.forEach((cell, ci) => {
    if (cell) doc.rect(qrX1 + ci * qrCell, qrY1 + ri * qrCell, qrCell - .5, qrCell - .5).fill(B.sec);
  });
});
doc.fontSize(6).font('Helvetica').fillColor(B.secLt);
doc.text('agritradeoverseas.com', crdX + 10, y + 60, { width: hcW - 20, align: 'center' });

doc.roundedRect(crdX + hcW + 14, y, hcW, 72, 8).lineWidth(1).strokeColor(B.sec).fillOpacity(0.07).fill(B.sec);
doc.fillOpacity(1);
doc.fontSize(7.5).font('Helvetica-Bold').fillColor(B.sec);
doc.text('WHATSAPP QR', crdX + hcW + 28, y + 8, { width: hcW - 28 });

// QR code — WhatsApp (different pattern)
const qrX2 = crdX + hcW + 14 + hcW/2 - 16;
const qrPat2 = [
  [1,1,1,1,0,1,1,1],
  [1,0,0,1,1,0,0,1],
  [1,0,1,0,0,1,0,1],
  [1,1,0,1,1,0,1,0],
  [0,1,1,0,1,0,1,1],
  [1,0,0,1,0,1,1,0],
  [1,0,1,1,0,0,1,1],
  [1,1,1,0,1,1,1,1],
];
qrPat2.forEach((row, ri) => {
  row.forEach((cell, ci) => {
    if (cell) doc.rect(qrX2 + ci * qrCell, qrY1 + ri * qrCell, qrCell - .5, qrCell - .5).fill(B.sec);
  });
});
doc.fontSize(6).font('Helvetica').fillColor(B.secLt);
doc.text('+91 9328633775', crdX + hcW + 14 + 10, y + 60, { width: hcW - 20, align: 'center' });

y += 90;

// Brand name
doc.fontSize(20).font('Helvetica-Bold').fillColor(B.sec);
doc.text('AGRITRADE OVERSEAS', 0, y, { width: W, align: 'center', characterSpacing: 2 });

doc.fontSize(8.5).font('Helvetica').fillColor(B.secLt);
doc.text('Your Trusted Partner In Global Agricultural Trade', 0, y + 26, { width: W, align: 'center' });

// Bottom gold bar
doc.rect(0, H - 4, W, 4).fill(B.sec);

// Bottom line + copyright
doc.save().strokeOpacity(0.2);
doc.moveTo(MG, H - 35).lineTo(W - MG, H - 35).lineWidth(.5).strokeColor(B.sec).stroke();
doc.restore();
doc.fontSize(6).font('Helvetica').fillColor(B.muted);
doc.text('© 2025 AGRITRADE OVERSEAS. All Rights Reserved.  |  This document is confidential and intended for the recipient only.', 0, H - 25, { width: W, align: 'center' });


// ════════════════════════════════════════════════════════════════
//   FINALIZE
// ════════════════════════════════════════════════════════════════
doc.end();

ws.on('finish', () => {
  const sz = (fs.statSync(OUT).size / (1024 * 1024)).toFixed(2);
  console.log('');
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('  ✅  AGRITRADE OVERSEAS — Premium Brochure Generated');
  console.log('═══════════════════════════════════════════════════════════════');
  console.log(`  📄 File:   ${OUT}`);
  console.log(`  📏 Size:   ${sz} MB`);
  console.log(`  📐 Format: A4 Portrait (210 × 297 mm)`);
  console.log(`  📑 Pages:  ${pg}`);
  console.log(`  🎨 Brand:  #0B6B3A + #D4A017 + White`);
  console.log('  ✨ Ready for print and digital distribution');
  console.log('');
});

ws.on('error', err => console.error('❌ Error:', err));
