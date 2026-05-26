import type { CollectionConfig } from 'payload';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { revalidatePath, revalidateTag } from 'next/cache';
import { slugify } from '../lib/slug';

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'tag', 'featured', 'publishedAt'] },
  versions: { drafts: { autosave: { interval: 2000 } } },
  access: {
    read: ({ req }) => {
      if (req.user) return true;
      return { _status: { equals: 'published' } };
    },
  },
  hooks: {
    afterChange: [
      ({ doc }) => {
        try {
          revalidateTag('projects', 'max');
          revalidatePath('/');
          revalidatePath('/projects');
          if (doc?.slug) revalidatePath(`/projects/${doc.slug}`);
        } catch {
          /* outside of request context */
        }
      },
    ],
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: { position: 'sidebar' },
      hooks: {
        beforeValidate: [
          ({ value, data }) => value || (data?.title ? slugify(data.title) : value),
        ],
      },
    },
    { name: 'tag', type: 'text', required: true, admin: { description: 'e.g. "MEDICAL IMAGING"' } },
    { name: 'summary', type: 'textarea', required: true, maxLength: 280 },
    {
      name: 'description',
      type: 'richText',
      editor: lexicalEditor({}),
    },
    {
      name: 'metrics',
      type: 'array',
      fields: [
        { name: 'value', type: 'text', required: true },
      ],
    },
    { name: 'heroImage', type: 'upload', relationTo: 'media' },
    { name: 'heroVideo', type: 'upload', relationTo: 'media' },
    { name: 'gallery', type: 'upload', relationTo: 'media', hasMany: true },
    { name: 'client', type: 'relationship', relationTo: 'clients' },
    { name: 'relatedArticles', type: 'relationship', relationTo: 'articles', hasMany: true },
    { name: 'featured', type: 'checkbox', defaultValue: false, admin: { position: 'sidebar' } },
    {
      name: 'publishedAt',
      type: 'date',
      admin: { position: 'sidebar', date: { pickerAppearance: 'dayAndTime' } },
    },
  ],
};
