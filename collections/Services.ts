import type { CollectionConfig } from 'payload';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { slugify } from '../lib/slug';

export const Services: CollectionConfig = {
  slug: 'services',
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'order'] },
  access: { read: () => true },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      hooks: {
        beforeValidate: [
          ({ value, data }) => value || (data?.title ? slugify(data.title) : value),
        ],
      },
    },
    { name: 'summary', type: 'textarea', required: true, maxLength: 280 },
    { name: 'description', type: 'richText', editor: lexicalEditor({}) },
    {
      name: 'icon',
      type: 'select',
      required: true,
      defaultValue: 'Eye',
      options: ['Eye', 'Brain', 'HeartPulse', 'Cpu', 'Microscope', 'BarChart3', 'Sparkles', 'Layers'],
    },
    {
      name: 'span',
      type: 'select',
      defaultValue: 'md:col-span-1',
      options: ['md:col-span-1', 'md:col-span-2'],
    },
    { name: 'order', type: 'number', defaultValue: 0, admin: { position: 'sidebar' } },
  ],
};
