import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Archeon Solutions',
    short_name: 'Archeon',
    description:
      'Pioneering AI intelligence for healthcare, earth observation, and high-performance computing.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0F172A',
    theme_color: '#2563EB',
    icons: [{ src: '/logo.png', sizes: 'any', type: 'image/png' }],
  };
}
