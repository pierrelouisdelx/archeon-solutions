"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const clients = [
  { name: "Siemens Healthineers", src: "/logos/siemens-healthineers.svg", height: 36 },
  { name: "NVIDIA", src: "/logos/nvidia.svg", height: 28 },
  { name: "Avian", src: "/logos/avian.svg", height: 32 },
];

export default function TrustedBy() {
  return (
    <section
      id="trusted-by"
      data-testid="trusted-by-section"
      className="py-16 md:py-20 bg-[#0F172A] border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 md:mb-12"
        >
          <span className="font-mono text-xs tracking-[0.2em] text-[#2563EB] uppercase">
            Trusted by
          </span>
          <p className="mt-3 text-sm md:text-base text-white/50 max-w-xl mx-auto">
            Selected engagements with global technology and healthcare leaders.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8 md:gap-x-20"
        >
          {clients.map((c) => (
            <div
              key={c.name}
              className="flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity duration-300"
              style={{ height: c.height }}
            >
              <Image
                src={c.src}
                alt={c.name}
                width={200}
                height={c.height}
                className="h-full w-auto object-contain"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
