import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { absoluteUrl, listArticles, listCategories, mediaUrl } from '@/lib/content';

export const revalidate = 60;

type Props = { searchParams: Promise<{ page?: string }> };

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Research notes, engineering deep-dives, and field reports from the Archeon team.',
  alternates: {
    canonical: absoluteUrl('/blog'),
    types: { 'application/rss+xml': absoluteUrl('/feed.xml') },
  },
  openGraph: {
    title: 'Blog | Archeon Solutions',
    description: 'Research notes, engineering deep-dives, and field reports from the Archeon team.',
    url: absoluteUrl('/blog'),
    type: 'website',
  },
};

export default async function BlogIndex({ searchParams }: Props) {
  const sp = await searchParams;
  const page = Math.max(1, parseInt(sp.page ?? '1', 10) || 1);
  const [{ docs, totalPages }, categories] = await Promise.all([
    listArticles({ page, limit: 12 }),
    listCategories(),
  ]);

  return (
    <div className="App">
      <Header />
      <main className="min-h-screen bg-white pt-32 pb-24">
        <div className="max-w-6xl mx-auto px-6">
          <header className="mb-12">
            <span className="font-mono text-xs tracking-[0.2em] text-[#2563EB] uppercase mb-4 block">
              Insights
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0F172A] mb-4">
              Blog
            </h1>
            <p className="text-base text-[#475569] max-w-2xl">
              Engineering deep-dives, research notes, and field reports.
            </p>
          </header>

          {categories.length ? (
            <nav className="mb-10 flex flex-wrap gap-2">
              <Link
                href="/blog"
                className="font-mono text-xs px-3 py-1.5 rounded-full bg-[#0F172A] text-white"
              >
                All
              </Link>
              {categories.map((c) => {
                const cat = c as { id: string | number; name: string; slug: string };
                return (
                  <Link
                    key={cat.id}
                    href={`/blog/category/${cat.slug}`}
                    className="font-mono text-xs px-3 py-1.5 rounded-full bg-[#F1F5F9] text-[#334155] hover:bg-[#E2E8F0]"
                  >
                    {cat.name}
                  </Link>
                );
              })}
            </nav>
          ) : null}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {docs.map((d) => {
              const a = d as {
                id: string | number;
                title: string;
                slug: string;
                excerpt?: string;
                coverImage?: unknown;
                publishedAt?: string;
                readingTime?: number;
                category?: { name?: string };
              };
              const img = mediaUrl(a.coverImage, 'card');
              return (
                <Link
                  key={a.id}
                  href={`/blog/${a.slug}`}
                  className="group block"
                >
                  {img ? (
                    <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-[#F1F5F9] mb-4">
                      <Image
                        src={img}
                        alt={a.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                  ) : null}
                  <div className="flex items-center gap-3 font-mono text-xs text-[#475569] mb-2">
                    {a.category?.name ? (
                      <span className="uppercase tracking-[0.15em] text-[#2563EB]">
                        {a.category.name}
                      </span>
                    ) : null}
                    {a.publishedAt ? (
                      <time dateTime={a.publishedAt}>
                        {new Date(a.publishedAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </time>
                    ) : null}
                    {a.readingTime ? <span>{a.readingTime} min</span> : null}
                  </div>
                  <h2 className="font-heading text-xl font-semibold text-[#0F172A] mb-2 group-hover:text-[#2563EB] transition-colors">
                    {a.title}
                  </h2>
                  <p className="text-sm text-[#475569] leading-relaxed">{a.excerpt}</p>
                </Link>
              );
            })}
          </div>

          {totalPages > 1 ? (
            <nav className="mt-16 flex items-center justify-center gap-4 font-mono text-sm">
              {page > 1 ? (
                <Link
                  href={`/blog?page=${page - 1}`}
                  className="px-4 py-2 rounded-md border border-[#E2E8F0] hover:bg-[#F8FAFC]"
                >
                  ← Prev
                </Link>
              ) : null}
              <span className="text-[#475569]">
                Page {page} of {totalPages}
              </span>
              {page < totalPages ? (
                <Link
                  href={`/blog?page=${page + 1}`}
                  className="px-4 py-2 rounded-md border border-[#E2E8F0] hover:bg-[#F8FAFC]"
                >
                  Next →
                </Link>
              ) : null}
            </nav>
          ) : null}
        </div>
      </main>
      <Footer />
    </div>
  );
}
