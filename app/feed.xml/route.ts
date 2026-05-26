import { listArticles } from '@/lib/content';
import { absoluteUrl } from '@/lib/content';

export const revalidate = 300;

const escape = (s: string): string =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export async function GET(): Promise<Response> {
  const { docs } = await listArticles({ limit: 50 });
  const items = docs
    .map((doc) => {
      const a = doc as { title?: string; slug?: string; excerpt?: string; publishedAt?: string };
      const url = absoluteUrl(`/blog/${a.slug ?? ''}`);
      return `
    <item>
      <title>${escape(a.title ?? '')}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escape(a.excerpt ?? '')}</description>
      <pubDate>${new Date(a.publishedAt ?? Date.now()).toUTCString()}</pubDate>
    </item>`;
    })
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Archeon Solutions — Blog</title>
    <link>${absoluteUrl('/blog')}</link>
    <description>Research-grade AI engineering, production-tested.</description>
    <language>en</language>
    <atom:link href="${absoluteUrl('/feed.xml')}" rel="self" type="application/rss+xml" />
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  });
}
