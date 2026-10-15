import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Adam Naeman — Creative Full Stack & Cloud Developer | Art & Code Jam',
  description: 'High-voltage developer portfolio and project showcase for Adam Naeman. Built with Next.js 14, Supabase, PostgreSQL, and Vercel.',
  keywords: ['Adam Naeman', 'Portfolio', 'Full Stack Developer', 'Supabase', 'Next.js', 'PostgreSQL', 'Vercel', 'Acid Pop', 'Creative Developer'],
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
