import { MetadataRoute } from 'next';
import prisma from '@/lib/db';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://arabic-net-jrf.vercel.app';

  // 1. Core static routes
  const routes: MetadataRoute.Sitemap = ['', '/login', '/signup', '/pyq', '/syllabus', '/practice', '/about', '/contact', '/privacy', '/terms'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  // 2. Fetch PYQ Years
  try {
    const papers = await prisma.examPaper.findMany({
      where: { content_status: 'PUBLISHED' },
      select: { year: true, updated_at: true },
    });
    
    // Group by year to get unique years and their latest update
    const yearMap = new Map<number, Date>();
    papers.forEach(p => {
        const existing = yearMap.get(p.year);
        if (!existing || p.updated_at > existing) {
            yearMap.set(p.year, p.updated_at);
        }
    });

    for (const [year, lastMod] of Array.from(yearMap.entries())) {
      routes.push({
        url: `${baseUrl}/pyq/${year}`,
        lastModified: lastMod,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      });
    }

    // 3. Fetch Syllabus Topics
    const topics = await prisma.broadTopic.findMany({
      where: { unit: { unit_number: { gte: 1 } } },
      select: { 
          slug: true, 
          unit: { select: { unit_number: true } }
      },
    });

    for (const topic of topics) {
      if (topic.unit) {
          routes.push({
            url: `${baseUrl}/syllabus/${topic.unit.unit_number}/${topic.slug}`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.6,
          });
      }
    }
  } catch (error) {
    console.error("Error generating sitemap dynamic routes:", error);
  }

  return routes;
}
