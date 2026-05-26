/**
 * One-shot seed: migrates the hard-coded marketing content into Payload.
 * Idempotent: re-running is safe — documents are matched by slug/name.
 *
 *   pnpm seed
 */
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs/promises';
import * as dotenv from 'dotenv';
import { getPayload as getPayloadInstance } from 'payload';
import config from '../payload.config';
import {
  fallbackProjects,
  fallbackTeam,
  fallbackStats,
  fallbackServices,
  fallbackClients,
  fallbackAffiliations,
  fallbackTestimonials,
} from '../lib/fallbacks';

dotenv.config();

const dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(dirname, '..');

const findOrCreate = async <T extends Record<string, unknown>>(
  payload: Awaited<ReturnType<typeof getPayloadInstance>>,
  collection: Parameters<typeof payload.find>[0]['collection'],
  matchField: string,
  matchValue: string,
  data: T,
): Promise<{ id: string | number }> => {
  const existing = await payload.find({
    collection,
    where: { [matchField]: { equals: matchValue } },
    limit: 1,
  });
  if (existing.docs[0]) return existing.docs[0] as { id: string | number };
  return (await payload.create({ collection, data: data as never })) as { id: string | number };
};

const uploadMedia = async (
  payload: Awaited<ReturnType<typeof getPayloadInstance>>,
  publicPath: string,
  alt: string,
): Promise<{ id: string | number } | null> => {
  if (!publicPath.startsWith('/')) return null; // skip remote URLs
  const filename = path.basename(publicPath);
  const existing = await payload.find({
    collection: 'media',
    where: { filename: { equals: filename } },
    limit: 1,
  });
  if (existing.docs[0]) return existing.docs[0] as { id: string | number };

  const filePath = path.join(rootDir, 'public', publicPath.replace(/^\//, ''));
  try {
    const data = await fs.readFile(filePath);
    return (await payload.create({
      collection: 'media',
      data: { alt } as never,
      file: {
        data,
        mimetype: filename.endsWith('.mp4')
          ? 'video/mp4'
          : filename.endsWith('.svg')
            ? 'image/svg+xml'
            : filename.endsWith('.webp')
              ? 'image/webp'
              : 'image/png',
        name: filename,
        size: data.byteLength,
      },
    })) as { id: string | number };
  } catch (err) {
    console.warn(`  ⚠ could not upload ${filePath}: ${(err as Error).message}`);
    return null;
  }
};

const run = async (): Promise<void> => {
  const payload = await getPayloadInstance({ config });

  console.log('▸ Site settings');
  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      siteName: 'Archeon Solutions',
      tagline: 'Research-grade AI, production-ready.',
      description:
        'Pioneering AI intelligence for healthcare, earth observation, and high-performance computing.',
      organizationLegalName: 'Archeon Solutions',
    },
  });

  console.log('▸ Homepage');
  await payload.updateGlobal({
    slug: 'homepage',
    data: { stats: fallbackStats },
  });

  console.log('▸ Team');
  for (const m of fallbackTeam) {
    await findOrCreate(payload, 'team', 'name', m.name, {
      name: m.name,
      initials: m.initials,
      role: m.role,
      bio: m.bio,
    });
  }

  console.log('▸ Services');
  for (const [i, s] of fallbackServices.entries()) {
    const slug = s.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    await findOrCreate(payload, 'services', 'slug', slug, {
      title: s.title,
      slug,
      summary: s.summary,
      icon: s.icon,
      span: s.span,
      order: i,
    });
  }

  console.log('▸ Clients');
  for (const [i, c] of fallbackClients.entries()) {
    const media = await uploadMedia(payload, c.logoUrl, c.name);
    if (!media) continue;
    await findOrCreate(payload, 'clients', 'name', c.name, {
      name: c.name,
      logo: media.id,
      height: c.height,
      order: i,
    });
  }

  console.log('▸ Affiliations');
  for (const [i, a] of fallbackAffiliations.entries()) {
    const media = await uploadMedia(payload, a.logoUrl, a.name);
    if (!media) continue;
    await findOrCreate(payload, 'affiliations', 'name', a.name, {
      name: a.name,
      logo: media.id,
      height: a.height,
      order: i,
    });
  }

  console.log('▸ Testimonials');
  for (const [i, t] of fallbackTestimonials.entries()) {
    await findOrCreate(payload, 'testimonials', 'author', t.author, {
      quote: t.quote,
      author: t.author,
      role: t.role,
      company: t.company,
      order: i,
    });
  }

  console.log('▸ Projects');
  for (const p of fallbackProjects) {
    const heroImage = p.image?.startsWith('/') ? await uploadMedia(payload, p.image, p.title) : null;
    const heroVideo = p.video ? await uploadMedia(payload, p.video, p.title) : null;
    await findOrCreate(payload, 'projects', 'slug', p.slug, {
      title: p.title,
      slug: p.slug,
      tag: p.tag,
      summary: p.summary,
      metrics: p.metrics,
      heroImage: heroImage?.id,
      heroVideo: heroVideo?.id,
      publishedAt: new Date().toISOString(),
      _status: 'published',
    });
  }

  console.log('▸ Categories');
  await findOrCreate(payload, 'categories', 'slug', 'engineering', {
    name: 'Engineering',
    slug: 'engineering',
  });
  await findOrCreate(payload, 'categories', 'slug', 'research', {
    name: 'Research',
    slug: 'research',
  });

  console.log('✓ Seed complete');
  process.exit(0);
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
