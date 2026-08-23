import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { auth } from '@/lib/auth';
import { Inter, Amiri } from 'next/font/google';
import prisma from '@/lib/db';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const amiri = Amiri({ subsets: ['arabic'], weight: ['400', '700'], variable: '--font-amiri' });

export async function generateMetadata(): Promise<Metadata> {
  const totalQuestions = await prisma.question.count({ where: { content_status: 'PUBLISHED' } });
  const qStr = totalQuestions.toLocaleString();

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'),
    title: {
      default: 'Arabic NET/JRF Practice — UGC NET Arabic Previous Year Questions',
      template: '%s | Arabic NET/JRF Practice',
    },
    description: `Practice ${qStr} UGC NET/JRF Arabic Previous Year Questions. Year-wise, Unit-wise, Topic-wise, and Paper-wise practice. Free bilingual (Arabic & English) practice platform.`,
    keywords: [
      'UGC NET Arabic',
      'JRF Arabic',
      'Arabic PYQ',
      'Arabic Previous Year Questions',
      'NET Arabic practice',
      'Arabic literature questions',
      'UGC NET preparation',
      'Arabic NET mock test',
    ],
    authors: [{ name: 'Arabic NET/JRF Practice' }],
    creator: 'Arabic NET/JRF Practice',
    openGraph: {
      type: 'website',
      locale: 'en_IN',
      alternateLocale: 'ar_SA',
      siteName: 'Arabic NET/JRF Practice',
      title: 'Arabic NET/JRF Practice — UGC NET Arabic PYQ Platform',
      description: `Practice ${qStr} UGC NET/JRF Arabic Previous Year Questions.`,
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Arabic NET/JRF Practice',
      description: `Practice ${qStr} UGC NET/JRF Arabic Previous Year Questions.`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Arabic NET/JRF Practice',
    url: process.env.NEXT_PUBLIC_APP_URL || 'https://arabic-net-jrf.vercel.app',
    description: 'Practice UGC NET/JRF Arabic Previous Year Questions.',
  };

  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`bg-[#FCFAF8] text-stone-900 min-h-screen flex flex-col antialiased ${inter.variable} ${amiri.variable}`}>
        {/* Sticky header — always on top via z-50 */}
        <Header user={session?.user || null} />
        {/* Page content fills remaining viewport height */}
        <div className="flex-1 flex flex-col">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
