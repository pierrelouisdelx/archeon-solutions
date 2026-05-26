"use client";

import { motion } from "framer-motion";
import {
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

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};

export default function Services({ services }: Props) {
  return (
    <section
      id="services"
      data-testid="services-section"
      className="py-24 md:py-32 bg-white"
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
            What We Do
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F172A] mb-4">
            Our Services
          </h2>
          <p className="text-base text-[#475569] max-w-xl">
            We deliver end-to-end AI solutions from research through deployment,
            specializing in domains where precision is non-negotiable.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon] ?? Sparkles;
            return (
              <motion.div
                key={service.id}
                custom={i}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                data-testid={`service-card-${i}`}
                className={`service-card ${service.span} bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-8 group`}
              >
                <div className="w-11 h-11 rounded-lg bg-[#0F172A] flex items-center justify-center mb-5 group-hover:bg-[#2563EB] transition-colors duration-300">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-[#0F172A] mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-[#475569] leading-relaxed">
                  {service.summary}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
