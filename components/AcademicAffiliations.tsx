"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Eyebrow from "@/components/ui/Eyebrow";

type Institution = {
  id: string | number;
  name: string;
  logoUrl: string;
  height: number;
};

type Props = { institutions: Institution[] };

const ease = [0.2, 0.7, 0.1, 1] as const;

export default function AcademicAffiliations({ institutions }: Props) {
  if (!institutions.length) return null;
  return (
    <section
      id="academic-affiliations"
      data-testid="academic-affiliations-section"
      className="bg-ink border-b border-ink-3"
    >
      <div className="max-w-[88rem] mx-auto px-6 md:px-10 py-20 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease }}
          className="grid grid-cols-12 gap-x-6 gap-y-10 items-center"
        >
          <div className="col-span-12 md:col-span-4">
            <Eyebrow index="009" label="Research network" />
            <p className="mt-5 font-display text-xl md:text-2xl text-bone leading-snug max-w-sm">
              Active collaborations with research groups at Berkeley, Harvard and UCL.
            </p>
          </div>

          <div className="col-span-12 md:col-span-8 flex flex-wrap items-center justify-start md:justify-end gap-x-14 gap-y-8 md:gap-x-20">
            {institutions.map((inst) => (
              <div
                key={inst.id}
                className="flex items-center justify-center opacity-55 hover:opacity-100 transition-opacity duration-300"
                style={{ height: inst.height }}
              >
                <Image
                  src={inst.logoUrl}
                  alt={inst.name}
                  width={220}
                  height={inst.height}
                  className="h-full w-auto object-contain"
                  style={{ filter: "brightness(0) invert(1)" }}
                />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
