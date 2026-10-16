import type { Metadata } from 'next';
import { Playfair_Display, Syne, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { siteConfig } from '@/config/site';

const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair', display: 'swap' });
const syne = Syne({ subsets: ['latin'], variable: '--font-syne', display: 'swap' });
const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains', display: 'swap' });

export const metadata: Metadata = {
  title: { default: siteConfig.title, template: `%s — ${siteConfig.name}` },
  description: siteConfig.description,
  keywords: ['Flutter Developer', 'Mobile App Developer', 'Dart', 'Android Developer', 'iOS Developer', 'Mayur Sonawane', 'Portfolio', 'Pune', 'MCA', 'Flutter Internship', 'Flutter Freelance'],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  metadataBase: new URL(siteConfig.url),
  alternates: { canonical: siteConfig.url },
  openGraph: {
    type: 'website', locale: 'en_IN', url: siteConfig.url,
    title: siteConfig.title, description: siteConfig.description,
    siteName: siteConfig.name,
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: siteConfig.title }],
  },
  twitter: { card: 'summary_large_image', title: siteConfig.title, description: siteConfig.description, images: ['/opengraph-image'] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
};

import ScrollProgress from '@/components/ui/ScrollProgress';

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth"
      className={`${playfair.variable} ${syne.variable} ${inter.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#07090E] text-[#F8FAFC]">
        {/* Schema.org Person structured data */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org', '@type': 'Person',
          name: siteConfig.name, url: siteConfig.url,
          jobTitle: 'Mobile App Developer',
          alumniOf: 'MCA (Master of Computer Applications)',
          knowsAbout: ['Flutter', 'Dart', 'Android', 'iOS', 'Firebase', 'Mobile Development'],
          sameAs: [siteConfig.links.github, siteConfig.links.linkedin],
        }) }} />
        <ScrollProgress />
        <div className="grain-overlay" aria-hidden="true" />
        <a href="#main-content" className="skip-link">Skip to main content</a>
        {children}
      </body>
    </html>
  );
}
