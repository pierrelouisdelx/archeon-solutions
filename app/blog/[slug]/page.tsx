import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { RichText } from '@/components/lexical/RichText';
import {
  JsonLd,
  articleLd,
  breadcrumbLd,
} from '@/components/seo/JsonLd';
import {
  absoluteUrl,
  getArticleBySlug,
  listArticles,
  mediaUrl,
} from '@/lib/content';

type Props = { params: Promise<{ slug: string }> };

export const revalidate = 60;

export async function generateStaticParams() {
  const { docs } = await listArticles({ limit: 200 });
  return docs.map((d) => ({ slug: (d as unknown as { slug: string }).slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const doc = await getArticleBySlug(slug);
  if (!doc) return { title: 'Not Found' };
  const a = doc as unknown as {
    title: string;
    slug: string;
    excerpt?: string;
    publishedAt?: string;
    meta?: { title?: string; description?: string; image?: { url?: string } };
    coverImage?: { url?: string };
  };
  const url = absoluteUrl(`/blog/${a.slug}`);
  const ogImage = a.meta?.image?.url ?? a.coverImage?.url ?? absoluteUrl(`/og/blog/${a.slug}`);
  return {
    title: a.meta?.title ?? a.title,
    description: a.meta?.description ?? a.excerpt,
    alternates: { canonical: url },
    openGraph: {
      title: a.meta?.title ?? a.title,
      description: a.meta?.description ?? a.excerpt,
      url,
      type: 'article',
      publishedTime: a.publishedAt,
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: a.title,
      description: a.excerpt,
      images: [ogImage],
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const doc = await getArticleBySlug(slug);
  if (!doc) notFound();
  const a = doc as unknown as {
    title: string;
    slug: string;
    excerpt?: string;
    content?: unknown;
    publishedAt?: string;
    updatedAt?: string;
    readingTime?: number;
    coverImage?: unknown;
    category?: { name?: string; slug?: string };
    author?: { name?: string; role?: string };
  };
  const cover = mediaUrl(a.coverImage, 'hero');

  return (
    <div className="App">
      <Header />
      <article className="min-h-screen bg-white pt-32 pb-24">
        <div className="max-w-3xl mx-auto px-6">
          <nav className="mb-8 font-mono text-xs text-[#475569]">
            <Link href="/blog" className="hover:text-[#2563EB]">
              ← Back to blog
            </Link>
          </nav>
          <div className="flex items-center gap-3 font-mono text-xs text-[#475569] mb-4">
            {a.category?.name ? (
              <Link
                href={`/blog/category/${a.category.slug ?? ''}`}
                className="uppercase tracking-[0.15em] text-[#2563EB]"
              >
                {a.category.name}
              </Link>
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
            {a.readingTime ? <span>{a.readingTime} min read</span> : null}
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-[#0F172A] mb-6 leading-tight">
            {a.title}
          </h1>
          {a.excerpt ? (
            <p className="text-lg text-[#475569] leading-relaxed mb-10">{a.excerpt}</p>
          ) : null}
          {cover ? (
            <div className="relative aspect-video rounded-xl overflow-hidden mb-12 bg-[#F1F5F9]">
              <Image src={cover} alt={a.title} fill className="object-cover" priority />
            </div>
          ) : null}
          <RichText
            data={a.content as Parameters<typeof RichText>[0]['data']}
          />
          {a.author ? (
            <footer className="mt-16 pt-8 border-t border-[#E2E8F0]">
              <p className="font-heading text-sm font-semibold text-[#0F172A]">
                {a.author.name}
              </p>
              {a.author.role ? (
                <p className="text-xs text-[#475569] mt-0.5">{a.author.role}</p>
              ) : null}
            </footer>
          ) : null}
        </div>
      </article>
      <Footer />
      <JsonLd data={articleLd(a as never)} />
      <JsonLd
        data={breadcrumbLd([
          { name: 'Home', url: absoluteUrl('/') },
          { name: 'Blog', url: absoluteUrl('/blog') },
          { name: a.title, url: absoluteUrl(`/blog/${a.slug}`) },
        ])}
      />
    </div>
  );
}
