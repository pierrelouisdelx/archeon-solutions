import type { CollectionConfig } from 'payload';
import {
  lexicalEditor,
  HeadingFeature,
  BlocksFeature,
  LinkFeature,
  FixedToolbarFeature,
  InlineToolbarFeature,
} from '@payloadcms/richtext-lexical';
import { revalidatePath, revalidateTag } from 'next/cache';
import { slugify } from '../lib/slug';

import type { Block } from 'payload';

const Quote: Block = {
  slug: 'quote',
  fields: [
    { name: 'quote', type: 'textarea', required: true },
    { name: 'attribution', type: 'text' },
  ],
};

const CodeBlock: Block = {
  slug: 'code',
  fields: [
    {
      name: 'language',
      type: 'select',
      defaultValue: 'ts',
      options: ['ts', 'tsx', 'js', 'py', 'bash', 'json', 'yaml', 'sql', 'rust', 'cpp'],
    },
    { name: 'code', type: 'code', required: true },
  ],
};

const ImageBlock: Block = {
  slug: 'image',
  fields: [
    { name: 'image', type: 'upload', relationTo: 'media', required: true },
    { name: 'caption', type: 'text' },
  ],
};

const Callout: Block = {
  slug: 'callout',
  fields: [
    {
      name: 'variant',
      type: 'select',
      defaultValue: 'info',
      options: ['info', 'success', 'warning', 'danger'],
    },
    { name: 'body', type: 'textarea', required: true },
  ],
};

const Embed: Block = {
  slug: 'embed',
  fields: [
    { name: 'url', type: 'text', required: true, admin: { description: 'YouTube, Vimeo, X, etc.' } },
    { name: 'title', type: 'text' },
  ],
};

const wordCount = (input: unknown): number => {
  if (!input || typeof input !== 'object') return 0;
  let count = 0;
  const walk = (node: unknown): void => {
    if (!node) return;
    if (typeof node === 'object' && node !== null) {
      const obj = node as Record<string, unknown>;
      if (typeof obj.text === 'string') count += obj.text.trim().split(/\s+/).filter(Boolean).length;
      if (Array.isArray(obj.children)) obj.children.forEach(walk);
      if (obj.root) walk(obj.root);
    }
  };
  walk(input);
  return count;
};

export const Articles: CollectionConfig = {
  slug: 'articles',
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'category', 'publishedAt', '_status'] },
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
          revalidateTag('articles', 'max');
          revalidatePath('/blog');
          if (doc?.slug) revalidatePath(`/blog/${doc.slug}`);
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
    { name: 'excerpt', type: 'textarea', required: true, maxLength: 280 },
    { name: 'coverImage', type: 'upload', relationTo: 'media' },
    {
      name: 'content',
      type: 'richText',
      required: true,
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
          LinkFeature(),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
          BlocksFeature({ blocks: [Quote, CodeBlock, ImageBlock, Callout, Embed] }),
        ],
      }),
    },
    { name: 'category', type: 'relationship', relationTo: 'categories' },
    { name: 'tags', type: 'relationship', relationTo: 'tags', hasMany: true },
    { name: 'author', type: 'relationship', relationTo: 'team' },
    { name: 'relatedProject', type: 'relationship', relationTo: 'projects' },
    {
      name: 'readingTime',
      type: 'number',
      admin: { position: 'sidebar', readOnly: true, description: 'Minutes (auto)' },
      hooks: {
        beforeChange: [
          ({ data, siblingData }) => {
            const words = wordCount(siblingData?.content ?? data?.content);
            return Math.max(1, Math.round(words / 220));
          },
        ],
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: { position: 'sidebar', date: { pickerAppearance: 'dayAndTime' } },
    },
  ],
};
