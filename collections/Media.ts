import type { CollectionConfig } from 'payload';

export const Media: CollectionConfig = {
  slug: 'media',
  admin: { useAsTitle: 'filename' },
  access: { read: () => true },
  upload: {
    staticDir: 'public/uploads',
    mimeTypes: ['image/*', 'video/*'],
    imageSizes: [
      { name: 'thumbnail', width: 400, height: undefined, position: 'centre' },
      { name: 'card', width: 800, height: undefined, position: 'centre' },
      { name: 'hero', width: 1600, height: undefined, position: 'centre' },
      { name: 'og', width: 1200, height: 630, position: 'centre' },
    ],
  },
  fields: [
    { name: 'alt', type: 'text', required: true },
    { name: 'caption', type: 'text' },
  ],
};
