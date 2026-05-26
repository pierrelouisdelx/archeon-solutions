"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const institutions = [
  { name: "UC Berkeley", src: "/logos/berkeley.svg", height: 56 },
  { name: "Harvard University", src: "/logos/harvard.svg", height: 56 },
  { name: "University College London", src: "/logos/ucl.svg", height: 56 },
];

export default function AcademicAffiliations() {
  return (
    <section
      id="academic-affiliations"
      data-testid="academic-affiliations-section"
      className="py-20 md:py-24 bg-white border-y border-slate-100"
    >
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 md:mb-14"
        >
          <span className="font-mono text-xs tracking-[0.2em] text-[#2563EB] uppercase">
            Academic Affiliations
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#0F172A] mt-4">
            Research-grade engineering, rooted in academia.
          </h2>
          <p className="mt-4 text-sm md:text-base text-slate-500 max-w-2xl mx-auto">
            Our engineers hold advanced degrees and research backgrounds from
            world-leading institutions, bringing scientific rigor to every
            engagement.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap items-center justify-center gap-x-16 gap-y-10 md:gap-x-24"
        >
          {institutions.map((inst) => (
            <div
              key={inst.name}
              className="flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity duration-300"
              style={{ height: inst.height }}
            >
              <Image
                src={inst.src}
                alt={inst.name}
                width={240}
                height={inst.height}
                className="h-full w-auto object-contain"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
