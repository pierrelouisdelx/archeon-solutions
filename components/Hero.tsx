"use client";

import { motion } from "framer-motion";
import { ArrowRight, ArrowDown } from "lucide-react";
import dynamic from "next/dynamic";

const SignalField = dynamic(() => import("./hero/SignalField"), {
  ssr: false,
  loading: () => null,
});

const chips = [
  "COMPUTER VISION",
  "LLM OPTIMIZATION",
  "HEALTHCARE",
  "FINANCE",
  "R&D",
];

const ease = [0.2, 0.7, 0.1, 1] as const;

export default function Hero() {
  return (
    <section
      id="hero"
      data-testid="hero-section"
      className="relative isolate w-full min-h-screen overflow-hidden bg-ink"
    >
      {/* Backdrop layers */}
      <div className="absolute inset-0 z-0">
        <SignalField />
        {/* Vignette to anchor the text */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(120% 80% at 25% 90%, color-mix(in oklch, var(--ink) 88%, transparent) 0%, color-mix(in oklch, var(--ink) 50%, transparent) 45%, transparent 75%)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, color-mix(in oklch, var(--ink) 65%, transparent) 0%, transparent 30%, transparent 60%, color-mix(in oklch, var(--ink) 92%, transparent) 100%)",
          }}
        />
      </div>

      {/* Top meta band */}
      <div className="relative z-10 pt-28 md:pt-32">
        <div className="max-w-[88rem] mx-auto px-6 md:px-10 flex items-start justify-between gap-6">
          <motion.span
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="eyebrow"
          >
            <span aria-hidden className="text-bone-dim">001</span>
            <span className="mx-3 inline-block w-6 h-px bg-signal/60 align-middle" />
            ARCHEON SOLUTIONS · SF / ZÜRICH · EST. 2026
          </motion.span>
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.08 }}
            className="hidden md:flex flex-col items-end gap-1 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-bone-dim"
          >
            <span>N 47°22′ · W 122°25′</span>
            <span className="text-signal">SYSTEMS ONLINE</span>
          </motion.div>
        </div>
      </div>

      {/* Headline block */}
      <div className="relative z-10 flex-1 flex items-end pb-24 md:pb-32 mt-24 md:mt-40">
        <div className="max-w-[88rem] mx-auto px-6 md:px-10 w-full grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-9">
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease, delay: 0.12 }}
              className="h-display text-bone"
            >
              Research-grade AI,
              <br />
              <span className="signal-mark">shipped</span> into production.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.32 }}
              className="mt-8 max-w-2xl text-base md:text-lg text-bone-dim leading-relaxed"
            >
              We are an AI research and engineering studio for tier-1 banks,
              insurers and industrial leaders. Built by scientists with
              world-record inference, published medical research, and operator
              experience at NVIDIA, Siemens Healthineers and JP Morgan — not
              prompt engineers.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease, delay: 0.44 }}
              className="mt-10 flex flex-wrap gap-2"
            >
              {chips.map((c) => (
                <span
                  key={c}
                  className="font-mono text-[0.6875rem] tracking-[0.18em] uppercase text-bone-dim border border-ink-3 px-3 py-1.5 hover:border-signal/60 hover:text-bone transition-colors"
                >
                  {c}
                </span>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease, delay: 0.56 }}
              className="mt-12 flex flex-wrap items-center gap-4"
            >
              <a
                href="#contact"
                data-testid="hero-cta-primary"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .querySelector("#contact")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="group inline-flex items-center gap-3 bg-signal text-ink px-6 h-12 text-sm font-medium tracking-tight hover:bg-bone transition-colors"
              >
                Book an intro call
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#case-studies"
                data-testid="hero-cta-secondary"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .querySelector("#case-studies")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="group inline-flex items-center gap-3 text-bone px-2 h-12 text-sm hover:text-signal transition-colors"
              >
                See the work
                <span aria-hidden className="inline-block w-8 h-px bg-current transition-all group-hover:w-12" />
              </a>
            </motion.div>
          </div>

          {/* Right index */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.36 }}
            className="hidden lg:flex col-span-3 flex-col items-end justify-end gap-4 pb-2"
          >
            <div className="border border-ink-3 px-5 py-4 backdrop-blur-sm bg-ink/40 max-w-[18rem]">
              <div className="eyebrow mb-2">Benchmark</div>
              <div className="h-sub text-bone">World record</div>
              <p className="mt-2 text-sm text-bone-dim leading-snug">
                DeepSeek V3 inference throughput — open-source, reproducible.
              </p>
            </div>
            <div className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-bone-dim flex items-center gap-2">
              <span className="inline-block w-2 h-2 bg-signal animate-pulse" />
              Now accepting Q3 engagements
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom indicator */}
      <div className="absolute z-10 bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 text-bone-dim font-mono text-[0.6875rem] uppercase tracking-[0.18em]">
        <ArrowDown className="w-3.5 h-3.5" /> Scroll
      </div>
    </section>
  );
}
