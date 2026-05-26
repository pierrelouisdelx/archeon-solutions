"use client";

import { motion } from "framer-motion";
import Image from "next/image";

type Client = {
  id: string | number;
  name: string;
  logoUrl: string;
  height: number;
};

type Props = { clients: Client[] };

export default function TrustedBy({ clients }: Props) {
  if (!clients.length) return null;
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
              key={c.id}
              className="flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity duration-300"
              style={{ height: c.height }}
            >
              <Image
                src={c.logoUrl}
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
