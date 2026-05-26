import type { ArrayField, GlobalConfig } from 'payload';

const linkArray = (name: string): ArrayField => ({
  name,
  type: 'array',
  fields: [
    { name: 'label', type: 'text', required: true },
    { name: 'href', type: 'text', required: true },
  ],
});

export const Navigation: GlobalConfig = {
  slug: 'navigation',
  access: { read: () => true },
  fields: [linkArray('header'), linkArray('footer')],
};
