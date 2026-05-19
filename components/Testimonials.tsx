import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "Archeon's hyperspectral analysis pipeline transformed our environmental monitoring program. Their team delivered accuracy levels we didn't think were achievable with satellite data alone.",
    author: "Dr. Elena Vasquez",
    role: "Director of Environmental Sciences",
    company: "GeoWatch International",
  },
  {
    quote:
      "The super-resolution model they built for our CT imaging division has meaningfully reduced radiation exposure for patients while maintaining diagnostic quality. Genuinely groundbreaking work.",
    author: "Prof. James Whitfield",
    role: "Chief of Radiology",
    company: "Nordic Medical Institute",
  },
  {
    quote:
      "Working with Archeon on inference optimization was a revelation. They found performance gains our internal team had missed for months, ultimately achieving results that set an industry benchmark.",
    author: "Kai Nakamura",
    role: "VP of Infrastructure",
    company: "Nexus AI Labs",
  },
];

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      data-testid="testimonials-section"
      className="py-24 md:py-32 bg-[#0F172A]"
    >
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <span className="font-mono text-xs tracking-[0.2em] text-[#2563EB] uppercase mb-4 block">
            Testimonials
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Trusted by Leaders
          </h2>
          <p className="text-base text-white/50 max-w-xl">
            What our partners and clients say about working with Archeon.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.author}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              data-testid={`testimonial-card-${i}`}
              className="bg-white/5 border border-white/10 rounded-xl p-8 flex flex-col justify-between hover:border-[#2563EB]/30 transition-colors duration-300"
            >
              <div>
                <Quote className="w-8 h-8 text-[#2563EB]/40 mb-5" />
                <p className="text-sm md:text-base text-white/80 leading-relaxed mb-8">
                  "{t.quote}"
                </p>
              </div>
              <div>
                <div className="w-full h-px bg-white/10 mb-5" />
                <p className="font-heading text-sm font-semibold text-white">
                  {t.author}
                </p>
                <p className="text-xs text-white/40 mt-0.5">
                  {t.role}, {t.company}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
