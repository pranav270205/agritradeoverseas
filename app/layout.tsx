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
    default: 'AGRITRADE OVERSEAS | Agricultural Products Exporter from India',
    template: '%s | AGRITRADE OVERSEAS',
  },
  description:
    'AGRITRADE OVERSEAS is a Jamnagar-based agricultural export company supplying premium groundnuts, spices, pulses, grains, sesame seeds, and dry fruits to international markets.',
  keywords: [
    'Agricultural Exporter India',
    'Groundnut Exporter',
    'Spices Exporter',
    'Pulses Exporter',
    'Jamnagar Export Company',
    'Indian Agricultural Products',
    'AGRITRADE OVERSEAS',
  ],
  openGraph: {
    title: 'AGRITRADE OVERSEAS | Agricultural Products Exporter from India',
    description:
      'AGRITRADE OVERSEAS is a Jamnagar-based agricultural export company supplying premium groundnuts, spices, pulses, grains, sesame seeds, and dry fruits to international markets.',
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
        <link rel="icon" href="/images/logo.png" />
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
