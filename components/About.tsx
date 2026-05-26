"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";

type TeamMember = {
  id: string | number;
  name: string;
  role: string;
  bio: string;
  initials?: string;
  credential?: string;
};
type Stat = { value: string; label: string };

type Props = {
  team: TeamMember[];
  stats: Stat[];
  heading?: string;
  body?: string;
};

const ease = [0.2, 0.7, 0.1, 1] as const;

function parseNumeric(value: string) {
  const match = value.match(/-?\d+(?:[.,]\d+)?/);
  if (!match) return null;
  return parseFloat(match[0].replace(",", "."));
}

function StatCounter({ value }: { value: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const target = parseNumeric(value);
  const [display, setDisplay] = useState<string>(target !== null ? "0" : value);

  useEffect(() => {
    if (!inView || target === null) return;
    const start = performance.now();
    const duration = 1100;
    const startVal = 0;
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const v = startVal + (target - startVal) * eased;
      const isInteger = Number.isInteger(target);
      setDisplay(isInteger ? Math.round(v).toString() : v.toFixed(1));
      if (t < 1) raf = requestAnimationFrame(tick);
      else setDisplay(value);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, value]);

  return (
    <div ref={ref} className="font-display text-5xl md:text-7xl text-signal leading-none tabular-nums">
      {display}
    </div>
  );
}

const defaultHeading = (
  <>
    A studio of <span className="italic">scientists</span>.
  </>
);

const defaultBody =
  "Archeon is a small, senior team of AI researchers and engineers based in San Francisco and Zürich. We embed with your operators, ship working systems, and leave behind infrastructure and people your team owns.";

export default function About({ team, stats, heading, body }: Props) {
  return (
    <section
      id="about"
      data-testid="about-section"
      className="bg-ink border-b border-ink-3"
    >
      <div className="max-w-[88rem] mx-auto px-6 md:px-10 py-24 md:py-32">
        <SectionHeader
          index="008"
          label="Team"
          title={heading ?? defaultHeading}
          body={body ?? defaultBody}
        />

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease }}
          className="mt-16 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-px bg-ink-3 border-y border-ink-3"
          data-testid="about-stats"
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              data-testid={`stat-${i}`}
              className="bg-ink p-7 md:p-9"
            >
              <StatCounter value={stat.value} />
              <div className="mt-3 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-bone-dim">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        <div className="mt-24 mb-10 flex items-end justify-between gap-6 flex-wrap">
          <div>
            <span className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-bone-dim">
              The people on your engagement
            </span>
            <h3 className="mt-3 h-sub text-bone">Leadership</h3>
          </div>
          <p className="text-sm text-bone-dim max-w-md">
            Senior practitioners, no junior consultants. The names on the proposal are the
            people in your meetings.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-ink-3 border-y border-ink-3">
          {team.map((member, i) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, ease, delay: i * 0.07 }}
              data-testid={`team-member-${i}`}
              className="group bg-ink p-7 md:p-8 flex flex-col hover:bg-ink-2 transition-colors"
            >
              <div className="w-16 h-16 border border-ink-3 flex items-center justify-center mb-7 group-hover:border-signal transition-colors">
                <span className="font-display text-2xl text-bone group-hover:text-signal transition-colors">
                  {member.initials}
                </span>
              </div>
              <h4 className="font-display text-xl md:text-2xl text-bone leading-tight">
                {member.name}
              </h4>
              <p className="mt-1 font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-signal">
                {member.role}
              </p>
              <p className="mt-4 text-sm text-bone-dim leading-relaxed flex-1">
                {member.bio}
              </p>
              {member.credential ? (
                <span className="mt-5 inline-flex w-fit font-mono text-[0.625rem] uppercase tracking-[0.18em] text-bone border border-ink-3 px-2.5 py-1">
                  {member.credential}
                </span>
              ) : null}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
