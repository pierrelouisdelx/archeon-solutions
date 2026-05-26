import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { absoluteUrl, listArticles, listCategories, mediaUrl } from '@/lib/content';

type Props = { params: Promise<{ slug: string }> };

export const revalidate = 60;

export async function generateStaticParams() {
  const cats = await listCategories();
  return cats.map((c) => ({ slug: (c as unknown as { slug: string }).slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cats = await listCategories();
  const cat = cats.find((c) => (c as { slug?: string }).slug === slug) as
    | { name: string; description?: string }
    | undefined;
  if (!cat) return { title: 'Not Found' };
  return {
    title: `${cat.name} | Archeon Blog`,
    description: cat.description ?? `Articles tagged ${cat.name}.`,
    alternates: { canonical: absoluteUrl(`/blog/category/${slug}`) },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const cats = await listCategories();
  const cat = cats.find((c) => (c as { slug?: string }).slug === slug) as
    | { name: string; description?: string }
    | undefined;
  if (!cat) notFound();
  const { docs } = await listArticles({ categorySlug: slug, limit: 50 });

  return (
    <div className="App">
      <Header />
      <main className="min-h-screen bg-white pt-32 pb-24">
        <div className="max-w-6xl mx-auto px-6">
          <header className="mb-12">
            <span className="font-mono text-xs tracking-[0.2em] text-[#2563EB] uppercase mb-4 block">
              Category
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-[#0F172A] mb-4">
              {cat.name}
            </h1>
            {cat.description ? (
              <p className="text-base text-[#475569] max-w-2xl">{cat.description}</p>
            ) : null}
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {docs.map((d) => {
              const a = d as {
                id: string | number;
                title: string;
                slug: string;
                excerpt?: string;
                coverImage?: unknown;
                publishedAt?: string;
              };
              const img = mediaUrl(a.coverImage, 'card');
              return (
                <Link key={a.id} href={`/blog/${a.slug}`} className="group block">
                  {img ? (
                    <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-[#F1F5F9] mb-4">
                      <Image src={img} alt={a.title} fill sizes="33vw" className="object-cover" />
                    </div>
                  ) : null}
                  <h2 className="font-heading text-xl font-semibold text-[#0F172A] mb-2 group-hover:text-[#2563EB]">
                    {a.title}
                  </h2>
                  <p className="text-sm text-[#475569]">{a.excerpt}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
