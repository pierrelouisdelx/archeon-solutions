"use client";

import { motion } from "framer-motion";
import Eyebrow from "@/components/ui/Eyebrow";

const ease = [0.2, 0.7, 0.1, 1] as const;

const proofs = [
  {
    metric: "World record",
    label: "DeepSeek V3 inference throughput — published, reproducible.",
  },
  {
    metric: "Peer-reviewed",
    label: "Medical imaging research with Siemens Healthineers and UCL.",
  },
  {
    metric: "Operators",
    label: "Built systems at NVIDIA, JP Morgan, Siemens Healthineers, Avian.",
  },
];

export default function Manifesto() {
  return (
    <section
      id="manifesto"
      data-testid="manifesto-section"
      className="relative bg-ink border-b border-ink-3"
    >
      <div className="max-w-[88rem] mx-auto px-6 md:px-10 py-24 md:py-32">
        <div className="grid grid-cols-12 gap-x-6 gap-y-12">
          <div className="col-span-12 md:col-span-3">
            <Eyebrow index="002" label="Positioning" />
            <p className="mt-6 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-bone-dim leading-relaxed">
              A studio, not an agency.
              <br />
              Scientists, not slideware.
            </p>
          </div>

          <div className="col-span-12 md:col-span-9">
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease }}
              className="h-section text-bone max-w-4xl"
            >
              Most &ldquo;AI consultancies&rdquo; sell prompt engineering and
              dashboards. We build the{" "}
              <span className="signal-mark">systems</span> banks, hospitals and
              industrial operators run in production — measured in latency,
              cost and accuracy, not in slide decks.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease, delay: 0.1 }}
              className="mt-8 max-w-2xl text-base md:text-lg text-bone-dim leading-relaxed"
            >
              Archeon is a small, senior team of French and American AI
              scientists based in San Francisco and Zürich. We embed with your
              engineers, ship working systems, transfer knowledge — and leave
              behind infrastructure your team owns.
            </motion.p>

            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-px bg-ink-3">
              {proofs.map((p, i) => (
                <motion.div
                  key={p.metric}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.6, ease, delay: 0.15 + i * 0.08 }}
                  className="bg-ink p-6 md:p-7"
                >
                  <div className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-signal">
                    {String(i + 1).padStart(2, "0")} / Proof
                  </div>
                  <div className="mt-3 font-display text-2xl md:text-3xl text-bone leading-tight">
                    {p.metric}
                  </div>
                  <p className="mt-3 text-sm text-bone-dim leading-relaxed">
                    {p.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
