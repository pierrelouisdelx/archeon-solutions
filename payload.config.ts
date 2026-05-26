import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';
import { buildConfig } from 'payload';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { seoPlugin } from '@payloadcms/plugin-seo';
import { redirectsPlugin } from '@payloadcms/plugin-redirects';
import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs';
import { searchPlugin } from '@payloadcms/plugin-search';
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob';

import { Users } from './collections/Users';
import { Media } from './collections/Media';
import { Categories, Tags } from './collections/Categories';
import { Projects } from './collections/Projects';
import { Articles } from './collections/Articles';
import { Team } from './collections/Team';
import { Services } from './collections/Services';
import { Clients, Affiliations } from './collections/Logos';
import { Testimonials } from './collections/Testimonials';
import { SiteSettings } from './globals/SiteSettings';
import { Homepage } from './globals/Homepage';
import { Navigation } from './globals/Navigation';

const dirname = path.dirname(fileURLToPath(import.meta.url));
const serverURL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000';

export default buildConfig({
  serverURL,
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: '— Archeon CMS',
    },
    livePreview: {
      url: ({ data, collectionConfig }) => {
        if (collectionConfig?.slug === 'projects' && data?.slug) return `${serverURL}/projects/${data.slug}`;
        if (collectionConfig?.slug === 'articles' && data?.slug) return `${serverURL}/blog/${data.slug}`;
        return serverURL;
      },
      collections: ['projects', 'articles'],
    },
  },
  editor: lexicalEditor({}),
  collections: [
    Users,
    Media,
    Categories,
    Tags,
    Projects,
    Articles,
    Team,
    Services,
    Clients,
    Affiliations,
    Testimonials,
  ],
  globals: [SiteSettings, Homepage, Navigation],
  secret: process.env.PAYLOAD_SECRET || 'dev-secret-change-me',
  sharp,
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URI || '' },
  }),
  plugins: [
    seoPlugin({
      collections: ['projects', 'articles', 'services'],
      uploadsCollection: 'media',
      generateTitle: ({ doc }) =>
        `${(doc as { title?: string })?.title ?? 'Archeon Solutions'} | Archeon Solutions`,
      generateDescription: ({ doc }) => {
        const d = doc as { summary?: string; excerpt?: string };
        return d?.summary || d?.excerpt || '';
      },
      generateURL: ({ doc, collectionSlug }) => {
        const slug = (doc as { slug?: string })?.slug;
        if (!slug) return serverURL;
        if (collectionSlug === 'articles') return `${serverURL}/blog/${slug}`;
        if (collectionSlug === 'projects') return `${serverURL}/projects/${slug}`;
        return `${serverURL}/${slug}`;
      },
    }),
    redirectsPlugin({ collections: ['projects', 'articles'] }),
    nestedDocsPlugin({
      collections: ['categories'],
      generateLabel: (_, doc) => (doc as { name?: string }).name ?? '',
      generateURL: (docs) => docs.reduce((url, d) => `${url}/${(d as { slug?: string }).slug ?? ''}`, ''),
    }),
    searchPlugin({
      collections: ['articles', 'projects'],
      defaultPriorities: { articles: 10, projects: 20 },
    }),
    ...(process.env.BLOB_READ_WRITE_TOKEN
      ? [
          vercelBlobStorage({
            collections: { media: true },
            token: process.env.BLOB_READ_WRITE_TOKEN,
          }),
        ]
      : []),
  ],
});
