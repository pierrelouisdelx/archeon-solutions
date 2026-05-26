import type { Metadata } from 'next';
import { Geist, Instrument_Serif, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { JsonLd, organizationLd, websiteLd } from '@/components/seo/JsonLd';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
});

const instrumentSerif = Instrument_Serif({
  variable: '--font-instrument-serif',
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
});

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(SERVER_URL),
  title: {
    default: 'Archeon Solutions — Research-grade AI, shipped into production',
    template: '%s | Archeon Solutions',
  },
  description:
    'Archeon Solutions is an AI research and engineering studio. Real scientists, not prompt engineers. Computer vision, LLM optimization, healthcare and finance AI for Swiss and global enterprises.',
  keywords: [
    'AI consulting',
    'AI implementation',
    'healthcare AI',
    'finance AI',
    'computer vision',
    'LLM optimization',
    'inference optimization',
    'hyperspectral imaging',
    'medical imaging',
    'CT denoising',
    'MLOps',
    'Switzerland',
    'San Francisco',
  ],
  authors: [{ name: 'Archeon Solutions' }],
  creator: 'Archeon Solutions',
  publisher: 'Archeon Solutions',
  formatDetection: { email: false, address: false, telephone: false },
  alternates: {
    canonical: '/',
    types: { 'application/rss+xml': '/feed.xml' },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SERVER_URL,
    siteName: 'Archeon Solutions',
    title: 'Archeon Solutions — Research-grade AI, shipped into production',
    description:
      'An AI research and engineering studio for tier-1 enterprises. Computer vision, LLMs, healthcare, finance, R&D. Zurich · San Francisco.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Archeon Solutions',
    description: 'Research-grade AI, shipped into production.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {children}
        <JsonLd data={organizationLd({ siteName: 'Archeon Solutions' })} />
        <JsonLd data={websiteLd()} />
      </body>
    </html>
  );
}
