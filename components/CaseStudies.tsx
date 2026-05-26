"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";

export type CaseStudyProject = {
  id: string | number;
  slug?: string;
  tag: string;
  title: string;
  summary: string;
  metrics: { value: string }[];
  image?: string;
  video?: string;
};

type Props = { projects: CaseStudyProject[] };

const ease = [0.2, 0.7, 0.1, 1] as const;

function ProjectMedia({
  project,
  className,
}: {
  project: CaseStudyProject;
  className: string;
}) {
  if (project.video) {
    return (
      <video
        src={project.video}
        autoPlay
        loop
        muted
        playsInline
        aria-label={project.title}
        className={className}
      />
    );
  }
  if (project.image) {
    return (
      <Image
        src={project.image}
        alt={project.title}
        width={1600}
        height={1000}
        className={className}
        sizes="(min-width: 1024px) 50vw, 100vw"
        unoptimized={project.image.startsWith("http")}
      />
    );
  }
  return null;
}

function CardInner({ project, featured }: { project: CaseStudyProject; featured?: boolean }) {
  return (
    <>
      <div
        className={`relative overflow-hidden bg-ink-2 ${
          featured ? "aspect-[16/9]" : "aspect-[4/3]"
        }`}
      >
        <ProjectMedia
          project={project}
          className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-[1.03] group-hover:brightness-110"
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, transparent 0%, transparent 55%, color-mix(in oklch, var(--ink) 80%, transparent) 100%)",
          }}
        />
        <div className="absolute top-5 left-5 right-5 flex items-center justify-between">
          <span className="font-mono text-[0.625rem] tracking-[0.22em] uppercase bg-ink/70 backdrop-blur-sm text-bone px-3 py-1.5 border border-ink-3">
            {project.tag}
          </span>
          {featured ? (
            <span className="font-mono text-[0.625rem] tracking-[0.22em] uppercase bg-signal text-ink px-3 py-1.5">
              Featured
            </span>
          ) : null}
        </div>
      </div>
      <div className="p-7 md:p-9">
        <div className="flex items-start justify-between gap-6">
          <h3
            className={`font-display text-bone leading-tight ${
              featured ? "text-3xl md:text-5xl max-w-3xl" : "text-2xl md:text-[1.75rem]"
            }`}
          >
            {project.title}
          </h3>
          <span className="shrink-0 mt-1 w-10 h-10 border border-ink-3 flex items-center justify-center text-bone-dim group-hover:border-signal group-hover:text-signal transition-colors">
            <ArrowUpRight className="w-4 h-4" />
          </span>
        </div>
        <p className="mt-5 text-sm md:text-base text-bone-dim leading-relaxed max-w-2xl">
          {project.summary}
        </p>
        <div className="mt-7 flex flex-wrap gap-2">
          {project.metrics.map((metric) => (
            <span
              key={metric.value}
              className="font-mono text-[0.6875rem] tracking-[0.18em] uppercase text-bone border border-ink-3 px-3 py-1.5"
            >
              {metric.value}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}

export default function CaseStudies({ projects }: Props) {
  if (!projects.length) return null;

  // Promote a DeepSeek project (or first) to the featured slot.
  const featured =
    projects.find((p) => /deepseek/i.test(p.title) || p.tag === "LLM OPTIMIZATION") ||
    projects[0];
  const rest = projects.filter((p) => p.id !== featured.id).slice(0, 4);

  return (
    <section
      id="case-studies"
      data-testid="case-studies-section"
      className="bg-ink border-b border-ink-3"
    >
      <div className="max-w-[88rem] mx-auto px-6 md:px-10 py-24 md:py-32">
        <SectionHeader
          index="006"
          label="Proof"
          title={
            <>
              Selected <span className="italic">work</span>.
            </>
          }
          body="Engagements where the difference between research and production was measurable — in latency, in dollars, in patient outcomes."
        />

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease }}
          className="mt-16 md:mt-20"
          data-testid={`case-study-card-featured`}
        >
          {featured.slug ? (
            <Link
              href={`/projects/${featured.slug}`}
              className="group block border border-ink-3 bg-ink-2 hover:border-signal/60 transition-colors"
            >
              <CardInner project={featured} featured />
            </Link>
          ) : (
            <div className="group border border-ink-3 bg-ink-2">
              <CardInner project={featured} featured />
            </div>
          )}
        </motion.div>

        {rest.length > 0 && (
          <div className="mt-px grid grid-cols-1 md:grid-cols-2 gap-px bg-ink-3 border-x border-b border-ink-3 -mx-px">
            {rest.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, ease, delay: i * 0.08 }}
                data-testid={`case-study-card-${i}`}
                className="bg-ink-2"
              >
                {project.slug ? (
                  <Link
                    href={`/projects/${project.slug}`}
                    className="group block hover:bg-ink transition-colors h-full"
                  >
                    <CardInner project={project} />
                  </Link>
                ) : (
                  <div className="group h-full">
                    <CardInner project={project} />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
