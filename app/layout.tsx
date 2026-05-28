import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: {
    default: 'AGRITRADE OVERSEAS | Premium Agricultural Products Exporter from India',
    template: '%s | AGRITRADE OVERSEAS',
  },
  description:
    'AGRITRADE OVERSEAS exports premium agricultural products from India to global markets with a focus on quality, reliability, and transparent business practices.',
  keywords: [
    'Agricultural products exporter from India',
    'Groundnuts exporter India',
    'Spices exporter India',
    'Agro commodities exporter',
    'Global agriculture supplier',
    'Indian agricultural exports',
    'Cumin exporter India',
    'Wheat exporter India',
  ],
  openGraph: {
    title: 'AGRITRADE OVERSEAS | Premium Agricultural Products Exporter from India',
    description:
      'Delivering premium agricultural products from India to global markets with commitment to quality and reliability.',
    type: 'website',
    locale: 'en_US',
    siteName: 'AGRITRADE OVERSEAS',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <link rel="icon" href="/images/logo.jpeg" />
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
