import Header from '@/components/Header';
import Hero from '@/components/Hero';
import TrustedBy from '@/components/TrustedBy';
import Services from '@/components/Services';
import CaseStudies from '@/components/CaseStudies';
import About from '@/components/About';
import AcademicAffiliations from '@/components/AcademicAffiliations';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import {
  getHomepage,
  listAffiliations,
  listClients,
  listProjects,
  listServices,
  listTeam,
  listTestimonials,
  mediaUrl,
} from '@/lib/content';
import {
  fallbackAffiliations,
  fallbackClients,
  fallbackProjects,
  fallbackServices,
  fallbackStats,
  fallbackTeam,
  fallbackTestimonials,
} from '@/lib/fallbacks';

export const revalidate = 60;

const safe = async <T,>(fn: () => Promise<T>, empty: T): Promise<T> => {
  try {
    return await fn();
  } catch {
    return empty;
  }
};

export default async function Home() {
  const [homepage, projects, team, services, clients, affiliations, testimonials] = await Promise.all([
    safe(() => getHomepage(), null),
    safe(() => listProjects(8), []),
    safe(() => listTeam(), []),
    safe(() => listServices(), []),
    safe(() => listClients(), []),
    safe(() => listAffiliations(), []),
    safe(() => listTestimonials(), []),
  ]);

  const homepageData = homepage as
    | { stats?: { value: string; label: string }[]; about?: { heading?: string; body?: string } }
    | null;

  const projectsForHome =
    projects.length > 0
      ? projects.map((p) => {
          const proj = p as {
            id: string | number;
            slug: string;
            title: string;
            tag?: string;
            summary?: string;
            metrics?: { value: string }[];
            heroImage?: unknown;
            heroVideo?: unknown;
          };
          return {
            id: proj.id,
            slug: proj.slug,
            title: proj.title,
            tag: proj.tag ?? '',
            summary: proj.summary ?? '',
            metrics: proj.metrics ?? [],
            image: mediaUrl(proj.heroImage, 'card'),
            video: mediaUrl(proj.heroVideo),
          };
        })
      : fallbackProjects;

  const teamForHome =
    team.length > 0
      ? team.map((m) => {
          const t = m as { id: string | number; name: string; role: string; bio: string; initials?: string };
          return { id: t.id, name: t.name, role: t.role, bio: t.bio, initials: t.initials ?? '' };
        })
      : fallbackTeam;

  const servicesForHome =
    services.length > 0
      ? services.map((s) => {
          const sv = s as { id: string | number; title: string; summary: string; icon: string; span?: string };
          return { id: sv.id, title: sv.title, summary: sv.summary, icon: sv.icon, span: sv.span ?? 'md:col-span-1' };
        })
      : fallbackServices;

  const clientsForHome =
    clients.length > 0
      ? clients.map((c) => {
          const cl = c as { id: string | number; name: string; logo?: unknown; height?: number };
          return {
            id: cl.id,
            name: cl.name,
            logoUrl: mediaUrl(cl.logo) ?? '',
            height: cl.height ?? 36,
          };
        })
      : fallbackClients;

  const affiliationsForHome =
    affiliations.length > 0
      ? affiliations.map((a) => {
          const af = a as { id: string | number; name: string; logo?: unknown; height?: number };
          return {
            id: af.id,
            name: af.name,
            logoUrl: mediaUrl(af.logo) ?? '',
            height: af.height ?? 56,
          };
        })
      : fallbackAffiliations;

  const testimonialsForHome =
    testimonials.length > 0
      ? testimonials.map((t) => {
          const ts = t as {
            id: string | number;
            quote: string;
            author: string;
            role?: string;
            company?: string;
          };
          return { id: ts.id, quote: ts.quote, author: ts.author, role: ts.role, company: ts.company };
        })
      : fallbackTestimonials;

  const stats = homepageData?.stats?.length ? homepageData.stats : fallbackStats;

  return (
    <div className="App">
      <Header />
      <Hero />
      <TrustedBy clients={clientsForHome} />
      <Services services={servicesForHome} />
      <CaseStudies projects={projectsForHome} />
      <About
        team={teamForHome}
        stats={stats}
        heading={homepageData?.about?.heading}
        body={homepageData?.about?.body}
      />
      <AcademicAffiliations institutions={affiliationsForHome} />
      <Testimonials testimonials={testimonialsForHome} />
      <Contact />
      <Footer />
    </div>
  );
}
