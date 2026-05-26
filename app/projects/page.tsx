import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { listProjects, mediaUrl, absoluteUrl } from '@/lib/content';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Selected case studies in healthcare AI, earth observation, LLM optimization and computer vision.',
  alternates: { canonical: absoluteUrl('/projects') },
  openGraph: {
    title: 'Projects | Archeon Solutions',
    description:
      'Selected case studies in healthcare AI, earth observation, LLM optimization and computer vision.',
    url: absoluteUrl('/projects'),
    type: 'website',
  },
};

export default async function ProjectsIndex() {
  const projects = await listProjects();

  return (
    <div className="App">
      <Header />
      <main className="min-h-screen bg-[#F8FAFC] pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <header className="mb-16">
            <span className="font-mono text-xs tracking-[0.2em] text-[#2563EB] uppercase mb-4 block">
              Our Work
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0F172A] mb-4">
              Projects
            </h1>
            <p className="text-base text-[#475569] max-w-xl">
              Production AI systems delivered across healthcare, geospatial, and high-performance computing.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((p) => {
              const project = p as {
                id: string | number;
                title: string;
                slug: string;
                tag?: string;
                summary?: string;
                heroImage?: unknown;
              };
              const img = mediaUrl(project.heroImage, 'card');
              return (
                <Link
                  key={project.id}
                  href={`/projects/${project.slug}`}
                  className="group block bg-white rounded-xl border border-[#E2E8F0] overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="relative h-52 overflow-hidden bg-[#0F172A]">
                    {img ? (
                      <Image
                        src={img}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    ) : null}
                    {project.tag ? (
                      <div className="absolute top-4 left-4">
                        <span className="font-mono text-[10px] tracking-[0.15em] bg-white/90 backdrop-blur-sm text-[#0F172A] px-3 py-1.5 rounded-full">
                          {project.tag}
                        </span>
                      </div>
                    ) : null}
                  </div>
                  <div className="p-6 md:p-8">
                    <h2 className="font-heading text-lg font-semibold text-[#0F172A] leading-tight mb-3">
                      {project.title}
                    </h2>
                    <p className="text-sm text-[#475569] leading-relaxed">{project.summary}</p>
                  </div>
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
