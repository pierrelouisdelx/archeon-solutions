import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    tag: "REMOTE SENSING",
    title: "Hyperspectral Heavy Metal Detection",
    description:
      "Built a complete pipeline for processing hyperspectral satellite imagery to detect and quantify heavy metal contamination in soil across mining regions. Achieved 94.2% detection accuracy using custom spectral unmixing algorithms.",
    metrics: ["94.2% accuracy", "12 spectral bands", "50km\u00b2 coverage"],
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
  },
  {
    tag: "MEDICAL IMAGING",
    title: "CT Scan Super-Resolution & Denoising",
    description:
      "Developed a novel diffusion-based architecture for simultaneous super-resolution (4x) and denoising of low-dose CT scans, enabling diagnostic-quality images from 75% reduced radiation exposure.",
    metrics: ["4x upscale", "75% dose reduction", "PSNR 38.7dB"],
    image:
      "https://images.unsplash.com/photo-1666214280250-41f16ba24a26?auto=format&fit=crop&w=800&q=80",
  },
  {
    tag: "HEALTHCARE AI",
    title: "Real-Time Endometriosis Detection",
    description:
      "Deployed a real-time computer vision system for laparoscopic surgery that identifies endometriosis lesions with sub-100ms latency, assisting surgeons during live procedures.",
    metrics: ["< 100ms latency", "91.8% sensitivity", "Real-time"],
    image:
      "https://images.unsplash.com/photo-1757152962882-6bf8495b324d?auto=format&fit=crop&w=800&q=80",
  },
  {
    tag: "LLM OPTIMIZATION",
    title: "DeepSeek V3 Inference World Record",
    description:
      "Achieved world-record throughput on DeepSeek V3 through custom CUDA kernels, int4 quantization with minimal quality loss, and a novel tensor parallelism strategy across 8-GPU clusters.",
    metrics: ["World record", "3.2x speedup", "< 1% quality loss"],
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
  },
];

export default function CaseStudies() {
  return (
    <section
      id="case-studies"
      data-testid="case-studies-section"
      className="py-24 md:py-32 bg-[#F8FAFC]"
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
            Our Work
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F172A] mb-4">
            Case Studies
          </h2>
          <p className="text-base text-[#475569] max-w-xl">
            Selected projects showcasing our expertise across AI disciplines.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              data-testid={`case-study-card-${i}`}
              className="group bg-white rounded-xl border border-[#E2E8F0] overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4">
                  <span className="font-mono text-[10px] tracking-[0.15em] bg-white/90 backdrop-blur-sm text-[#0F172A] px-3 py-1.5 rounded-full">
                    {project.tag}
                  </span>
                </div>
              </div>
              <div className="p-6 md:p-8">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-heading text-lg font-semibold text-[#0F172A] leading-tight pr-4">
                    {project.title}
                  </h3>
                  <div className="w-8 h-8 rounded-full border border-[#E2E8F0] flex items-center justify-center shrink-0 group-hover:bg-[#0F172A] group-hover:border-[#0F172A] transition-colors duration-300">
                    <ArrowUpRight className="w-4 h-4 text-[#475569] group-hover:text-white transition-colors duration-300" />
                  </div>
                </div>
                <p className="text-sm text-[#475569] leading-relaxed mb-5">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.metrics.map((metric) => (
                    <span
                      key={metric}
                      className="font-mono text-xs bg-[#F1F5F9] text-[#334155] px-3 py-1.5 rounded-md"
                    >
                      {metric}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
