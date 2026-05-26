import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { RichText } from '@/components/lexical/RichText';
import {
  JsonLd,
  breadcrumbLd,
  creativeWorkLd,
} from '@/components/seo/JsonLd';
import {
  absoluteUrl,
  getProjectBySlug,
  listProjects,
  mediaUrl,
} from '@/lib/content';

type Props = { params: Promise<{ slug: string }> };

export const revalidate = 60;

export async function generateStaticParams() {
  const projects = await listProjects();
  return projects.map((p) => ({ slug: (p as unknown as { slug: string }).slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const doc = await getProjectBySlug(slug);
  if (!doc) return { title: 'Not Found' };
  const project = doc as unknown as {
    title: string;
    slug: string;
    summary?: string;
    meta?: { title?: string; description?: string; image?: { url?: string } };
    heroImage?: { url?: string };
    publishedAt?: string;
  };
  const url = absoluteUrl(`/projects/${project.slug}`);
  const ogImage = project.meta?.image?.url ?? project.heroImage?.url ?? absoluteUrl(`/og/projects/${project.slug}`);
  return {
    title: project.meta?.title ?? project.title,
    description: project.meta?.description ?? project.summary,
    alternates: { canonical: url },
    openGraph: {
      title: project.meta?.title ?? project.title,
      description: project.meta?.description ?? project.summary,
      url,
      type: 'article',
      images: [{ url: ogImage, width: 1200, height: 630 }],
      publishedTime: project.publishedAt,
    },
    twitter: {
      card: 'summary_large_image',
      title: project.title,
      description: project.summary,
      images: [ogImage],
    },
  };
}

export default async function ProjectDetail({ params }: Props) {
  const { slug } = await params;
  const doc = await getProjectBySlug(slug);
  if (!doc) notFound();
  const project = doc as unknown as {
    title: string;
    slug: string;
    tag?: string;
    summary?: string;
    description?: unknown;
    metrics?: { value: string }[];
    heroImage?: unknown;
    heroVideo?: unknown;
    publishedAt?: string;
    relatedArticles?: { title: string; slug: string }[];
  };

  const heroImg = mediaUrl(project.heroImage, 'hero');
  const heroVid = mediaUrl(project.heroVideo);

  return (
    <div className="App">
      <Header />
      <article className="min-h-screen bg-white pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-6">
          <nav className="mb-8 font-mono text-xs text-[#475569]">
            <Link href="/projects" className="hover:text-[#2563EB]">
              ← All projects
            </Link>
          </nav>
          {project.tag ? (
            <span className="font-mono text-xs tracking-[0.2em] text-[#2563EB] uppercase mb-4 block">
              {project.tag}
            </span>
          ) : null}
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0F172A] mb-6 leading-tight">
            {project.title}
          </h1>
          {project.summary ? (
            <p className="text-lg text-[#475569] leading-relaxed mb-10">{project.summary}</p>
          ) : null}

          {heroVid ? (
            <video
              src={heroVid}
              autoPlay
              loop
              muted
              playsInline
              className="w-full aspect-video object-cover rounded-xl mb-12 bg-[#0F172A]"
            />
          ) : heroImg ? (
            <div className="relative aspect-video rounded-xl overflow-hidden mb-12 bg-[#0F172A]">
              <Image src={heroImg} alt={project.title} fill className="object-cover" priority />
            </div>
          ) : null}

          {project.metrics?.length ? (
            <div className="flex flex-wrap gap-2 mb-12">
              {project.metrics.map((m) => (
                <span
                  key={m.value}
                  className="font-mono text-xs bg-[#F1F5F9] text-[#334155] px-3 py-1.5 rounded-md"
                >
                  {m.value}
                </span>
              ))}
            </div>
          ) : null}

          <RichText
            data={
              project.description as Parameters<typeof RichText>[0]['data']
            }
          />

          {project.relatedArticles?.length ? (
            <section className="mt-16 pt-12 border-t border-[#E2E8F0]">
              <h2 className="font-heading text-2xl font-bold text-[#0F172A] mb-6">Related articles</h2>
              <ul className="space-y-3">
                {project.relatedArticles.map((a) => (
                  <li key={a.slug}>
                    <Link
                      href={`/blog/${a.slug}`}
                      className="text-[#2563EB] hover:underline"
                    >
                      {a.title} →
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>
      </article>
      <Footer />
      <JsonLd data={creativeWorkLd(project as never)} />
      <JsonLd
        data={breadcrumbLd([
          { name: 'Home', url: absoluteUrl('/') },
          { name: 'Projects', url: absoluteUrl('/projects') },
          { name: project.title, url: absoluteUrl(`/projects/${project.slug}`) },
        ])}
      />
    </div>
  );
}
