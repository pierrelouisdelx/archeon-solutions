"use client";

import { motion } from "framer-motion";

type TeamMember = {
  id: string | number;
  name: string;
  role: string;
  bio: string;
  initials?: string;
};
type Stat = { value: string; label: string };

type Props = {
  team: TeamMember[];
  stats: Stat[];
  heading?: string;
  body?: string;
};

const defaultHeading = (
  <>
    Research-Grade AI, <span className="text-[#2563EB]">Production-Ready</span>
  </>
);

const defaultBody =
  "Archeon Solutions was founded on the belief that the gap between research and production is where the most valuable work happens. Our team combines deep academic expertise with battle-tested engineering to deliver AI systems that perform at the frontier of what's possible.";

export default function About({ team, stats, heading, body }: Props) {
  return (
    <section
      id="about"
      data-testid="about-section"
      className="py-24 md:py-32 bg-white"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
          >
            <span className="font-mono text-xs tracking-[0.2em] text-[#2563EB] uppercase mb-4 block">
              About Us
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F172A] mb-6">
              {heading ?? defaultHeading}
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-end"
          >
            <p className="text-base text-[#475569] leading-relaxed">
              {body ?? defaultBody}
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
          data-testid="about-stats"
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              data-testid={`stat-${i}`}
              className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-6 text-center"
            >
              <div className="font-heading text-3xl md:text-4xl font-bold text-[#0F172A] mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-[#475569]">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <h3 className="font-heading text-2xl font-bold text-[#0F172A] mb-2">
            Leadership Team
          </h3>
          <p className="text-sm text-[#475569]">
            World-class researchers and engineers united by a passion for impactful AI.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {team.map((member, i) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              data-testid={`team-member-${i}`}
              className="group bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-6 hover:border-[#2563EB]/30 transition-colors duration-300"
            >
              <div className="w-14 h-14 rounded-full bg-[#0F172A] flex items-center justify-center mb-5 group-hover:bg-[#2563EB] transition-colors duration-300">
                <span className="font-heading text-base font-bold text-white">
                  {member.initials}
                </span>
              </div>
              <h4 className="font-heading text-base font-semibold text-[#0F172A] mb-0.5">
                {member.name}
              </h4>
              <p className="font-mono text-xs text-[#2563EB] mb-3">
                {member.role}
              </p>
              <p className="text-sm text-[#475569] leading-relaxed">
                {member.bio}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
