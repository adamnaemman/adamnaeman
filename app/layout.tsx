import type { Metadata, Viewport } from 'next';
import './globals.css';

const SITE_URL = 'https://adamnaeman.vercel.app';
const TITLE = 'Adam Naeman — Full Stack & ML Developer';
const DESCRIPTION =
  'Portfolio of Adam Naeman — full stack web, machine learning and 3D. Next.js, TypeScript, PyTorch, Blender. Every project listed has real source behind it.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: '%s · Adam Naeman',
  },
  description: DESCRIPTION,
  keywords: [
    'Adam Naeman',
    'Portfolio',
    'Full Stack Developer',
    'Next.js',
    'TypeScript',
    'PyTorch',
    'Blender',
    'Malaysia',
  ],
  authors: [{ name: 'Adam Naeman', url: 'https://github.com/adamnaemman' }],
  creator: 'Adam Naeman',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: 'Adam Naeman',
    title: TITLE,
    description: DESCRIPTION,
    locale: 'en_MY',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'Adam Naeman — full stack web, machine learning and 3D',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/og.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#aef324',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
