import type { CollectionConfig } from 'payload';

const initialsFromName = (name: string): string =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('')
    .slice(0, 3);

export const Team: CollectionConfig = {
  slug: 'team',
  admin: { useAsTitle: 'name', defaultColumns: ['name', 'role', 'order'] },
  access: { read: () => true },
  fields: [
    { name: 'name', type: 'text', required: true },
    {
      name: 'initials',
      type: 'text',
      admin: { description: 'Auto-derived from name if blank' },
      hooks: {
        beforeChange: [
          ({ value, data }) => value || (data?.name ? initialsFromName(data.name) : value),
        ],
      },
    },
    { name: 'role', type: 'text', required: true },
    { name: 'bio', type: 'textarea', required: true },
    { name: 'photo', type: 'upload', relationTo: 'media' },
    { name: 'order', type: 'number', defaultValue: 0, admin: { position: 'sidebar' } },
    {
      name: 'socials',
      type: 'array',
      fields: [
        { name: 'platform', type: 'select', options: ['linkedin', 'github', 'x', 'website', 'scholar'] },
        { name: 'url', type: 'text', required: true },
      ],
    },
  ],
};
