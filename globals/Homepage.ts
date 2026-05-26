import type { GlobalConfig } from 'payload';

export const Homepage: GlobalConfig = {
  slug: 'homepage',
  access: { read: () => true },
  fields: [
    {
      name: 'hero',
      type: 'group',
      fields: [
        { name: 'eyebrow', type: 'text' },
        { name: 'heading', type: 'text' },
        { name: 'subheading', type: 'textarea' },
        { name: 'ctaLabel', type: 'text' },
        { name: 'ctaHref', type: 'text' },
      ],
    },
    {
      name: 'about',
      type: 'group',
      fields: [
        { name: 'eyebrow', type: 'text', defaultValue: 'About Us' },
        { name: 'heading', type: 'text' },
        { name: 'body', type: 'textarea' },
      ],
    },
    {
      name: 'stats',
      type: 'array',
      maxRows: 8,
      fields: [
        { name: 'value', type: 'text', required: true },
        { name: 'label', type: 'text', required: true },
      ],
    },
    {
      name: 'featuredProjects',
      type: 'relationship',
      relationTo: 'projects',
      hasMany: true,
      admin: { description: 'Leave empty to auto-pull the latest published projects.' },
    },
    {
      name: 'featuredTestimonials',
      type: 'relationship',
      relationTo: 'testimonials',
      hasMany: true,
    },
  ],
};
