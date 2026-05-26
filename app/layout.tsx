import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { JsonLd, organizationLd, websiteLd } from '@/components/seo/JsonLd';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(SERVER_URL),
  title: {
    default: 'Archeon Solutions — Research-grade AI, production-ready',
    template: '%s | Archeon Solutions',
  },
  description:
    'Pioneering AI intelligence for healthcare, earth observation, and high-performance computing. Research-grade solutions, production-ready.',
  keywords: [
    'AI consulting',
    'healthcare AI',
    'computer vision',
    'LLM optimization',
    'hyperspectral imaging',
    'medical imaging',
    'CT denoising',
    'MLOps',
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
    title: 'Archeon Solutions — Research-grade AI, production-ready',
    description:
      'Pioneering AI intelligence for healthcare, earth observation, and high-performance computing.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Archeon Solutions',
    description: 'Research-grade AI, production-ready.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
        <JsonLd data={organizationLd({ siteName: 'Archeon Solutions' })} />
        <JsonLd data={websiteLd()} />
      </body>
    </html>
  );
}
