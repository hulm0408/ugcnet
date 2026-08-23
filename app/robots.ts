import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://arabic-net-jrf.vercel.app';

  return {
    rules: {
      userAgent: '*',
      allow: ['/', '/pyq', '/syllabus', '/practice', '/about', '/contact', '/privacy', '/terms'],
      disallow: ['/dashboard/', '/admin/', '/api/', '/_next/', '/scratch/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
