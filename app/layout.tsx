import type { Metadata, Viewport } from 'next';
import {
  Poppins,
  Space_Grotesk,
  JetBrains_Mono,
  Silkscreen,
  Titan_One,
  Playfair_Display,
} from 'next/font/google';
import './globals.css';

// Self-hosted by next/font: no render-blocking @import, only the families and
// weights this design actually uses are downloaded.
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800', '900'],
  variable: '--ff-poppins',
  display: 'swap',
});
const grotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--ff-display',
  display: 'swap',
});
const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--ff-mono',
  display: 'swap',
});
const silkscreen = Silkscreen({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--ff-pixel',
  display: 'swap',
});
const titan = Titan_One({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--ff-bubble',
  display: 'swap',
});
const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['600'],
  style: ['italic'],
  variable: '--ff-serif',
  display: 'swap',
});

const FONT_VARS = [
  poppins.variable,
  grotesk.variable,
  jetbrains.variable,
  silkscreen.variable,
  titan.variable,
  playfair.variable,
].join(' ');

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
    <html lang="en" className={FONT_VARS}>
      <body>
        {children}
      </body>
    </html>
  );
}
