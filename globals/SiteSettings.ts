import type { GlobalConfig } from 'payload';

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  access: { read: () => true },
  fields: [
    { name: 'siteName', type: 'text', required: true, defaultValue: 'Archeon Solutions' },
    { name: 'tagline', type: 'text' },
    { name: 'description', type: 'textarea' },
    { name: 'defaultOgImage', type: 'upload', relationTo: 'media' },
    { name: 'contactEmail', type: 'email' },
    {
      name: 'socials',
      type: 'array',
      fields: [
        { name: 'platform', type: 'select', options: ['linkedin', 'github', 'x', 'youtube'] },
        { name: 'url', type: 'text', required: true },
      ],
    },
    { name: 'organizationLegalName', type: 'text', defaultValue: 'Archeon Solutions' },
    { name: 'foundingDate', type: 'date' },
  ],
};
