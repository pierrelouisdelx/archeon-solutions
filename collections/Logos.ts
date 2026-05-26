import type { CollectionConfig } from 'payload';

const logoFields = [
  { name: 'name', type: 'text', required: true },
  { name: 'logo', type: 'upload', relationTo: 'media', required: true },
  { name: 'url', type: 'text' },
  { name: 'height', type: 'number', defaultValue: 36, admin: { description: 'Render height in px' } },
  { name: 'order', type: 'number', defaultValue: 0, admin: { position: 'sidebar' } },
] as const;

export const Clients: CollectionConfig = {
  slug: 'clients',
  admin: { useAsTitle: 'name' },
  access: { read: () => true },
  fields: logoFields as never,
};

export const Affiliations: CollectionConfig = {
  slug: 'affiliations',
  admin: { useAsTitle: 'name' },
  access: { read: () => true },
  fields: logoFields as never,
};
