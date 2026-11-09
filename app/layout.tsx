import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Adam Naeman — Full Stack & ML Developer | Portfolio',
  description: 'Portfolio of Adam Naeman — full stack web, machine learning and 3D. Next.js, TypeScript, PyTorch, Blender. Every project listed has real source behind it.',
  keywords: ['Adam Naeman', 'Portfolio', 'Full Stack Developer', 'Next.js', 'TypeScript', 'PyTorch', 'Blender', 'Malaysia'],
  authors: [{ name: 'Adam Naeman' }],
  viewport: 'width=device-width, initial-scale=1',
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
