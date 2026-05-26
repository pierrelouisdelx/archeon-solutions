import type { MetadataRoute } from 'next';
import { absoluteUrl } from '@/lib/content';
import { listArticles, listProjects, listCategories } from '@/lib/content';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projects, articlesRes, categories] = await Promise.all([
    listProjects(500),
    listArticles({ limit: 500 }),
    listCategories(),
  ]);

  const now = new Date();

  return [
    { url: absoluteUrl('/'), lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: absoluteUrl('/projects'), lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: absoluteUrl('/blog'), lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    ...projects.map((p) => ({
      url: absoluteUrl(`/projects/${(p as { slug?: string }).slug}`),
      lastModified: new Date((p as { updatedAt?: string }).updatedAt ?? now),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    ...articlesRes.docs.map((a) => ({
      url: absoluteUrl(`/blog/${(a as { slug?: string }).slug}`),
      lastModified: new Date((a as { updatedAt?: string }).updatedAt ?? now),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...categories.map((c) => ({
      url: absoluteUrl(`/blog/category/${(c as { slug?: string }).slug}`),
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.5,
    })),
  ];
}
