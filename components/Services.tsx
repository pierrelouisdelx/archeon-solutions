"use client";

import { motion } from "framer-motion";
import { Eye, Brain, HeartPulse, Cpu, Microscope, BarChart3 } from "lucide-react";

const services = [
  {
    icon: Eye,
    title: "Computer Vision",
    description:
      "From object detection to image segmentation, we build production-grade vision systems for industrial, medical, and earth observation applications.",
    span: "md:col-span-2",
  },
  {
    icon: Brain,
    title: "LLM Optimization",
    description:
      "Inference acceleration, quantization, and distributed deployment strategies that push language models to their performance limits.",
    span: "md:col-span-1",
  },
  {
    icon: HeartPulse,
    title: "Healthcare AI",
    description:
      "FDA-aware AI solutions for diagnostics, surgical assistance, and medical imaging that meet the highest standards of clinical reliability.",
    span: "md:col-span-1",
  },
  {
    icon: Microscope,
    title: "Hyperspectral Analysis",
    description:
      "Advanced spectral imaging pipelines for earth observation, mineral detection, and environmental monitoring at scale.",
    span: "md:col-span-1",
  },
  {
    icon: Cpu,
    title: "MLOps & Deployment",
    description:
      "End-to-end ML infrastructure: from experiment tracking and model registry to scalable inference endpoints and monitoring.",
    span: "md:col-span-1",
  },
  {
    icon: BarChart3,
    title: "Research & Development",
    description:
      "Cutting-edge research partnerships. We collaborate with institutions to bring novel AI methods from paper to production.",
    span: "md:col-span-2",
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};

export default function Services() {
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
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              custom={i}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              data-testid={`service-card-${i}`}
              className={`service-card ${service.span} bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-8 group`}
            >
              <div className="w-11 h-11 rounded-lg bg-[#0F172A] flex items-center justify-center mb-5 group-hover:bg-[#2563EB] transition-colors duration-300">
                <service.icon className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-[#0F172A] mb-2">
                {service.title}
              </h3>
              <p className="text-sm text-[#475569] leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
