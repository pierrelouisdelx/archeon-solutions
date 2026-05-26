"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

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

export default function CaseStudies({ projects }: Props) {
  return (
    <section
      id="case-studies"
      data-testid="case-studies-section"
      className="py-24 md:py-32 bg-[#F8FAFC]"
    >
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <span className="font-mono text-xs tracking-[0.2em] text-[#2563EB] uppercase mb-4 block">
            Our Work
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F172A] mb-4">
            Case Studies
          </h2>
          <p className="text-base text-[#475569] max-w-xl">
            Selected projects showcasing our expertise across AI disciplines.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, i) => {
            const card = (
              <>
                <div className="relative h-52 overflow-hidden bg-[#0F172A]">
                  {project.video ? (
                    <video
                      src={project.video}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      aria-label={project.title}
                    />
                  ) : project.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                  ) : null}
                  <div className="absolute top-4 left-4">
                    <span className="font-mono text-[10px] tracking-[0.15em] bg-white/90 backdrop-blur-sm text-[#0F172A] px-3 py-1.5 rounded-full">
                      {project.tag}
                    </span>
                  </div>
                </div>
                <div className="p-6 md:p-8">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-heading text-lg font-semibold text-[#0F172A] leading-tight pr-4">
                      {project.title}
                    </h3>
                    <div className="w-8 h-8 rounded-full border border-[#E2E8F0] flex items-center justify-center shrink-0 group-hover:bg-[#0F172A] group-hover:border-[#0F172A] transition-colors duration-300">
                      <ArrowUpRight className="w-4 h-4 text-[#475569] group-hover:text-white transition-colors duration-300" />
                    </div>
                  </div>
                  <p className="text-sm text-[#475569] leading-relaxed mb-5">
                    {project.summary}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.metrics.map((metric) => (
                      <span
                        key={metric.value}
                        className="font-mono text-xs bg-[#F1F5F9] text-[#334155] px-3 py-1.5 rounded-md"
                      >
                        {metric.value}
                      </span>
                    ))}
                  </div>
                </div>
              </>
            );

            const baseClass =
              "group bg-white rounded-xl border border-[#E2E8F0] overflow-hidden hover:shadow-lg transition-shadow duration-300 block";

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                data-testid={`case-study-card-${i}`}
              >
                {project.slug ? (
                  <Link href={`/projects/${project.slug}`} className={baseClass}>
                    {card}
                  </Link>
                ) : (
                  <div className={baseClass}>{card}</div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
