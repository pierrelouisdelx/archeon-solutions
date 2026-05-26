import 'server-only';
import { unstable_cache as cache } from 'next/cache';
import type { Where } from 'payload';
import { getPayload } from './payload';

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000';

export const absoluteUrl = (pathname: string): string =>
  `${SERVER_URL.replace(/\/$/, '')}${pathname.startsWith('/') ? pathname : `/${pathname}`}`;

export const mediaUrl = (
  media: unknown,
  size: 'thumbnail' | 'card' | 'hero' | 'og' | 'original' = 'original',
): string | undefined => {
  if (!media || typeof media !== 'object') return undefined;
  const m = media as {
    url?: string;
    sizes?: Record<string, { url?: string }>;
  };
  if (size !== 'original' && m.sizes?.[size]?.url) return m.sizes[size].url;
  return m.url;
};

export const listProjects = cache(
  async (limit = 100) => {
    const payload = await getPayload();
    const res = await payload.find({
      collection: 'projects',
      limit,
      sort: '-publishedAt',
      depth: 2,
      where: { _status: { equals: 'published' } },
    });
    return res.docs;
  },
  ['projects-list'],
  { tags: ['projects'], revalidate: 60 },
);

export const getProjectBySlug = cache(
  async (slug: string) => {
    const payload = await getPayload();
    const res = await payload.find({
      collection: 'projects',
      where: { slug: { equals: slug }, _status: { equals: 'published' } },
      depth: 2,
      limit: 1,
    });
    return res.docs[0] ?? null;
  },
  ['project-by-slug'],
  { tags: ['projects'], revalidate: 60 },
);

export const listArticles = cache(
  async (opts: { limit?: number; page?: number; categorySlug?: string } = {}) => {
    const payload = await getPayload();
    const where: Where = { _status: { equals: 'published' } };
    if (opts.categorySlug) {
      const cats = await payload.find({
        collection: 'categories',
        where: { slug: { equals: opts.categorySlug } },
        limit: 1,
      });
      const id = cats.docs[0]?.id;
      if (!id) return { docs: [], totalPages: 0, page: 1 };
      where.category = { equals: id };
    }
    return payload.find({
      collection: 'articles',
      limit: opts.limit ?? 12,
      page: opts.page ?? 1,
      sort: '-publishedAt',
      depth: 2,
      where,
    });
  },
  ['articles-list'],
  { tags: ['articles'], revalidate: 60 },
);

export const getArticleBySlug = cache(
  async (slug: string) => {
    const payload = await getPayload();
    const res = await payload.find({
      collection: 'articles',
      where: { slug: { equals: slug }, _status: { equals: 'published' } },
      depth: 2,
      limit: 1,
    });
    return res.docs[0] ?? null;
  },
  ['article-by-slug'],
  { tags: ['articles'], revalidate: 60 },
);

export const getSiteSettings = cache(
  async () => {
    const payload = await getPayload();
    return payload.findGlobal({ slug: 'site-settings', depth: 2 });
  },
  ['site-settings'],
  { tags: ['site-settings'], revalidate: 300 },
);

export const getHomepage = cache(
  async () => {
    const payload = await getPayload();
    return payload.findGlobal({ slug: 'homepage', depth: 2 });
  },
  ['homepage'],
  { tags: ['homepage'], revalidate: 60 },
);

export const getNavigation = cache(
  async () => {
    const payload = await getPayload();
    return payload.findGlobal({ slug: 'navigation', depth: 0 });
  },
  ['navigation'],
  { tags: ['navigation'], revalidate: 300 },
);

export const listTeam = cache(
  async () => {
    const payload = await getPayload();
    const res = await payload.find({ collection: 'team', limit: 50, sort: 'order', depth: 1 });
    return res.docs;
  },
  ['team-list'],
  { tags: ['team'], revalidate: 300 },
);

export const listServices = cache(
  async () => {
    const payload = await getPayload();
    const res = await payload.find({ collection: 'services', limit: 50, sort: 'order' });
    return res.docs;
  },
  ['services-list'],
  { tags: ['services'], revalidate: 300 },
);

export const listClients = cache(
  async () => {
    const payload = await getPayload();
    const res = await payload.find({ collection: 'clients', limit: 50, sort: 'order', depth: 1 });
    return res.docs;
  },
  ['clients-list'],
  { tags: ['clients'], revalidate: 300 },
);

export const listAffiliations = cache(
  async () => {
    const payload = await getPayload();
    const res = await payload.find({ collection: 'affiliations', limit: 50, sort: 'order', depth: 1 });
    return res.docs;
  },
  ['affiliations-list'],
  { tags: ['affiliations'], revalidate: 300 },
);

export const listTestimonials = cache(
  async () => {
    const payload = await getPayload();
    const res = await payload.find({ collection: 'testimonials', limit: 50, sort: 'order', depth: 1 });
    return res.docs;
  },
  ['testimonials-list'],
  { tags: ['testimonials'], revalidate: 300 },
);

export const listCategories = cache(
  async () => {
    const payload = await getPayload();
    const res = await payload.find({ collection: 'categories', limit: 100 });
    return res.docs;
  },
  ['categories-list'],
  { tags: ['categories'], revalidate: 300 },
);
