"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Eye,
  Brain,
  HeartPulse,
  Cpu,
  Microscope,
  BarChart3,
  Sparkles,
  Layers,
  type LucideIcon,
} from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";

const iconMap: Record<string, LucideIcon> = {
  Eye,
  Brain,
  HeartPulse,
  Cpu,
  Microscope,
  BarChart3,
  Sparkles,
  Layers,
};

type Service = {
  id: string | number;
  title: string;
  summary: string;
  icon: string;
  span: string;
};

type Props = { services: Service[] };

const ease = [0.2, 0.7, 0.1, 1] as const;

export default function Services({ services }: Props) {
  return (
    <section
      id="services"
      data-testid="services-section"
      className="bg-ink border-b border-ink-3"
    >
      <div className="max-w-[88rem] mx-auto px-6 md:px-10 py-24 md:py-32">
        <SectionHeader
          index="004"
          label="Capabilities"
          title={
            <>
              What we <span className="italic">build</span>.
            </>
          }
          body="Five engineering practices, one team. We sequence them per engagement — vision in production, language at scale, ML infra that survives audit."
        />

        <div className="mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-4 gap-px bg-ink-3">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon] ?? Sparkles;
            const span = service.span || "md:col-span-1";
            return (
              <motion.article
                key={service.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, ease, delay: i * 0.06 }}
                data-testid={`service-card-${i}`}
                className={`group relative bg-ink p-7 md:p-9 ${span} flex flex-col min-h-[18rem] hover:bg-ink-2 transition-colors`}
              >
                <div className="flex items-start justify-between mb-10">
                  <span className="font-mono text-[0.6875rem] tracking-[0.22em] uppercase text-bone-dim">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <Icon
                    className="w-5 h-5 text-signal opacity-90 group-hover:opacity-100 transition-opacity"
                    strokeWidth={1.5}
                  />
                </div>
                <h3 className="font-display text-2xl md:text-[1.75rem] text-bone leading-tight">
                  {service.title}
                </h3>
                <p className="mt-4 text-sm md:text-[0.95rem] text-bone-dim leading-relaxed flex-1">
                  {service.summary}
                </p>
                <div className="mt-6 flex items-center justify-between text-bone-dim group-hover:text-signal transition-colors">
                  <span className="font-mono text-[0.6875rem] uppercase tracking-[0.18em]">
                    Learn more
                  </span>
                  <ArrowUpRight
                    className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
