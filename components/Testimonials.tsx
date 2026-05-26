"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Eyebrow from "@/components/ui/Eyebrow";

type Testimonial = {
  id: string | number;
  quote: string;
  author: string;
  role?: string;
  company?: string;
};

type Props = { testimonials: Testimonial[] };

const ease = [0.2, 0.7, 0.1, 1] as const;

export default function Testimonials({ testimonials }: Props) {
  const [index, setIndex] = useState(0);
  if (!testimonials.length) return null;

  const t = testimonials[index];
  const total = testimonials.length;

  const prev = () => setIndex((i) => (i - 1 + total) % total);
  const next = () => setIndex((i) => (i + 1) % total);

  return (
    <section
      id="testimonials"
      data-testid="testimonials-section"
      className="bg-ink-2 border-b border-ink-3"
    >
      <div className="max-w-[88rem] mx-auto px-6 md:px-10 py-24 md:py-32">
        <div className="flex items-end justify-between gap-6 mb-12 flex-wrap">
          <Eyebrow index="010" label="What partners say" />
          <span className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-bone-dim">
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
        </div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={t.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, ease }}
              className="max-w-5xl"
              data-testid={`testimonial-card-${index}`}
            >
              <p className="font-display text-3xl md:text-5xl lg:text-6xl text-bone leading-[1.08]">
                <span className="text-signal mr-2">&ldquo;</span>
                {t.quote}
                <span className="text-signal ml-2">&rdquo;</span>
              </p>
              <footer className="mt-12 flex items-center gap-6">
                <span className="block h-px w-12 bg-signal" />
                <div>
                  <div className="font-display text-xl text-bone">{t.author}</div>
                  <div className="mt-1 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-bone-dim">
                    {t.role}
                    {t.role && t.company ? " · " : ""}
                    {t.company}
                  </div>
                </div>
              </footer>
            </motion.blockquote>
          </AnimatePresence>
        </div>

        <div className="mt-16 flex items-center gap-3">
          <button
            type="button"
            onClick={prev}
            aria-label="Previous testimonial"
            className="w-12 h-12 border border-ink-3 flex items-center justify-center text-bone-dim hover:text-signal hover:border-signal/60 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next testimonial"
            className="w-12 h-12 border border-ink-3 flex items-center justify-center text-bone-dim hover:text-signal hover:border-signal/60 transition-colors"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
