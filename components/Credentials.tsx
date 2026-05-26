"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";

const credentials = [
  {
    company: "NVIDIA",
    role: "AI & Accelerated Computing",
    description:
      "Inference optimization, custom CUDA kernels and accelerated training pipelines.",
    achievements: [
      "LLM inference optimization",
      "CUDA + TensorRT pipelines",
      "Distributed training infra",
    ],
  },
  {
    company: "Siemens Healthineers",
    role: "Medical AI",
    description:
      "Clinical imaging, diagnostic models and registration systems shipped into hospitals.",
    achievements: [
      "Diffusion-based CT super-resolution",
      "Real-time surgical vision",
      "Clinical integration & validation",
    ],
  },
  {
    company: "JP Morgan",
    role: "Financial AI",
    description:
      "On-prem LLM tooling and document intelligence inside a tier-1 banking perimeter.",
    achievements: [
      "On-prem inference stacks",
      "Risk & compliance modeling",
      "Audit-ready ML systems",
    ],
  },
];

const ease = [0.2, 0.7, 0.1, 1] as const;

export function Credentials() {
  return (
    <section
      id="credentials"
      data-testid="credentials-section"
      className="bg-ink-2 border-b border-ink-3"
    >
      <div className="max-w-[88rem] mx-auto px-6 md:px-10 py-24 md:py-32">
        <SectionHeader
          index="007"
          label="Background"
          title={
            <>
              Trained inside the systems we now <span className="italic">replace</span>.
            </>
          }
          body="Our team built and ran AI inside the institutions our clients trust. We come back with the playbook."
        />

        <div className="mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-3 gap-px bg-ink-3 border-y border-ink-3">
          {credentials.map((cred, i) => (
            <motion.div
              key={cred.company}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, ease, delay: i * 0.07 }}
              className="bg-ink p-7 md:p-9 flex flex-col"
            >
              <div className="flex items-start justify-between mb-6">
                <span className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-bone-dim">
                  {String(i + 1).padStart(2, "0")} / Operator
                </span>
              </div>
              <h3 className="font-display text-2xl md:text-3xl text-bone leading-tight">
                {cred.company}
              </h3>
              <p className="mt-1 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-signal">
                {cred.role}
              </p>
              <p className="mt-5 text-sm text-bone-dim leading-relaxed">
                {cred.description}
              </p>
              <ul className="mt-6 space-y-2.5 pt-5 border-t border-ink-3">
                {cred.achievements.map((a) => (
                  <li key={a} className="flex items-start gap-3 text-sm text-bone">
                    <Check
                      className="w-4 h-4 mt-0.5 shrink-0 text-signal"
                      strokeWidth={2.2}
                    />
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Credentials;
