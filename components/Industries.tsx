"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";

export type Industry = {
  id: string;
  name: string;
  tagline: string;
  body: string;
  metrics: { value: string; label: string }[];
  partners: string[];
};

type Props = { industries: Industry[] };

const ease = [0.2, 0.7, 0.1, 1] as const;

export default function Industries({ industries }: Props) {
  const [active, setActive] = useState(industries[0]?.id ?? "");
  if (!industries.length) return null;
  const current = industries.find((i) => i.id === active) ?? industries[0];

  return (
    <section
      id="industries"
      data-testid="industries-section"
      className="bg-ink-2 border-b border-ink-3"
    >
      <div className="max-w-[88rem] mx-auto px-6 md:px-10 py-24 md:py-32">
        <SectionHeader
          index="005"
          label="Industries"
          title={
            <>
              Verticals we know <span className="italic">cold</span>.
            </>
          }
          body="We work where mistakes are expensive — regulated industries with measurable AI ROI. Pick a vertical to see how we engage."
        />

        <div className="mt-16 md:mt-20 grid grid-cols-12 gap-x-6 gap-y-8 border-t border-ink-3">
          {/* Tabs (vertical on desktop) */}
          <ul
            className="col-span-12 md:col-span-4 flex md:flex-col gap-px bg-ink-3 md:border-r md:border-ink-3"
            role="tablist"
          >
            {industries.map((ind, i) => {
              const isActive = ind.id === current.id;
              return (
                <li key={ind.id} className="flex-1">
                  <button
                    role="tab"
                    aria-selected={isActive}
                    data-testid={`industry-tab-${ind.id}`}
                    onClick={() => setActive(ind.id)}
                    className={`w-full text-left h-full px-5 md:px-7 py-6 md:py-8 transition-colors flex flex-col gap-2 ${
                      isActive
                        ? "bg-ink text-bone"
                        : "bg-ink-2 text-bone-dim hover:bg-ink/70 hover:text-bone"
                    }`}
                  >
                    <span className="font-mono text-[0.6875rem] tracking-[0.22em] uppercase">
                      <span className={isActive ? "text-signal" : "text-bone-dim"}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="mx-2 opacity-50">/</span>
                      <span>{ind.tagline}</span>
                    </span>
                    <span className="font-display text-xl md:text-2xl leading-tight">
                      {ind.name}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Detail pane */}
          <div className="col-span-12 md:col-span-8 bg-ink min-h-[24rem] p-7 md:p-12 border-t md:border-t border-ink-3 md:border-t-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease }}
                className="h-full flex flex-col"
              >
                <div className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-bone-dim">
                  Vertical brief
                </div>
                <h3 className="mt-3 h-sub text-bone">{current.name}</h3>
                <p className="mt-5 text-base md:text-lg text-bone-dim leading-relaxed max-w-2xl">
                  {current.body}
                </p>

                <div className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-6">
                  {current.metrics.map((m) => (
                    <div key={m.label}>
                      <div className="font-display text-3xl md:text-4xl text-signal">
                        {m.value}
                      </div>
                      <div className="mt-1 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-bone-dim">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-auto pt-10 flex flex-wrap items-end justify-between gap-6 border-t border-ink-3">
                  <div>
                    <div className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-bone-dim mb-3">
                      Selected partners
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {current.partners.map((p) => (
                        <span
                          key={p}
                          className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-bone border border-ink-3 px-3 py-1.5"
                        >
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                  <a
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      document
                        .querySelector("#contact")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="group inline-flex items-center gap-2 text-bone hover:text-signal transition-colors"
                  >
                    <span className="font-mono text-[0.6875rem] uppercase tracking-[0.22em]">
                      Discuss this vertical
                    </span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
