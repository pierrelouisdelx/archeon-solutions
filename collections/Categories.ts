import type { CollectionConfig } from 'payload';
import { slugify } from '../lib/slug';

export const Categories: CollectionConfig = {
  slug: 'categories',
  admin: { useAsTitle: 'name' },
  access: { read: () => true },
  fields: [
    { name: 'name', type: 'text', required: true },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      hooks: {
        beforeValidate: [
          ({ value, data }) => value || (data?.name ? slugify(data.name) : value),
        ],
      },
    },
    { name: 'description', type: 'textarea' },
  ],
};

export const Tags: CollectionConfig = {
  slug: 'tags',
  admin: { useAsTitle: 'name' },
  access: { read: () => true },
  fields: [
    { name: 'name', type: 'text', required: true },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      hooks: {
        beforeValidate: [
          ({ value, data }) => value || (data?.name ? slugify(data.name) : value),
        ],
      },
    },
  ],
};
