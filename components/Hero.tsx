"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    id: 1,
    title: "Hyperspectral Intelligence",
    subtitle: "Heavy Metal Detection via Earth Observation",
    description:
      "Pioneering analysis of hyperspectral satellite imagery to detect and map heavy metal contamination across vast terrains with unprecedented accuracy.",
    tag: "REMOTE SENSING",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1920&q=80",
  },
  {
    id: 2,
    title: "Super-Resolution AI",
    subtitle: "Diffusion Models for CT Scan Enhancement",
    description:
      "Custom diffusion architectures achieving state-of-the-art super-resolution and denoising on medical CT scans, enabling earlier and more precise diagnostics.",
    tag: "MEDICAL IMAGING",
    image:
      "https://images.unsplash.com/photo-1666214280250-41f16ba24a26?auto=format&fit=crop&w=1920&q=80",
  },
  {
    id: 3,
    title: "Live Endometriosis Detection",
    subtitle: "Real-Time Surgical Video Analysis",
    description:
      "SOTA deep learning models deployed for real-time intraoperative detection of endometriosis lesions during laparoscopic surgery.",
    tag: "HEALTHCARE AI",
    image:
      "https://images.unsplash.com/photo-1757152962882-6bf8495b324d?auto=format&fit=crop&w=1920&q=80",
  },
  {
    id: 4,
    title: "DeepSeek V3 Inference",
    subtitle: "World Record Performance Optimization",
    description:
      "Achieved world-record inference speeds on DeepSeek V3 through custom kernel optimization, quantization strategies, and distributed systems engineering.",
    tag: "LLM OPTIMIZATION",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1920&q=80",
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startAutoplay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
  }, []);

  useEffect(() => {
    startAutoplay();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [startAutoplay]);

  const goTo = useCallback(
    (index) => {
      setDirection(index > current ? 1 : -1);
      setCurrent(index);
      startAutoplay();
    },
    [current, startAutoplay]
  );

  const goPrev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
    startAutoplay();
  }, [startAutoplay]);

  const goNext = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % slides.length);
    startAutoplay();
  }, [startAutoplay]);

  const slide = slides[current];

  const imageVariants = {
    enter: { opacity: 0, scale: 1.08 },
    center: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } },
    exit: { opacity: 0, scale: 0.98, transition: { duration: 0.5 } },
  };

  const textVariants = {
    enter: (dir) => ({ opacity: 0, y: dir > 0 ? 40 : -40 }),
    center: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] } },
    exit: (dir) => ({ opacity: 0, y: dir > 0 ? -30 : 30, transition: { duration: 0.3 } }),
  };

  return (
    <section
      id="hero"
      data-testid="hero-carousel"
      className="relative w-full h-screen overflow-hidden bg-[#0A0A0A]"
    >
      {/* Background Images */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={slide.id}
          custom={direction}
          variants={imageVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0"
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className="slide-overlay absolute inset-0" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end pb-24 md:pb-32">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={slide.id}
              custom={direction}
              variants={textVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="max-w-2xl"
            >
              <span
                data-testid="hero-slide-tag"
                className="font-mono text-xs tracking-[0.2em] text-[#2563EB] mb-4 block"
              >
                {slide.tag}
              </span>
              <h1
                data-testid="hero-slide-title"
                className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-3 leading-[1.1]"
              >
                {slide.title}
              </h1>
              <p
                data-testid="hero-slide-subtitle"
                className="font-heading text-lg md:text-xl text-white/80 font-medium mb-4"
              >
                {slide.subtitle}
              </p>
              <p
                data-testid="hero-slide-description"
                className="text-sm md:text-base text-white/60 leading-relaxed max-w-lg mb-8"
              >
                {slide.description}
              </p>
              <a
                href="#contact"
                data-testid="hero-cta-btn"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 bg-white text-[#0F172A] px-6 py-3 rounded-full text-sm font-semibold hover:bg-white/90 transition-colors"
              >
                Explore Project
                <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          </AnimatePresence>

          {/* Slide indicators + navigation */}
          <div className="flex items-center justify-between mt-12">
            <div className="flex items-center gap-2" data-testid="carousel-indicators">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  data-testid={`carousel-dot-${idx}`}
                  onClick={() => goTo(idx)}
                  className={`carousel-dot rounded-full ${idx === current ? "active" : ""}`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-white/50 mr-2">
                {String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
              </span>
              <button
                data-testid="carousel-prev-btn"
                onClick={goPrev}
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/50 transition-colors"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                data-testid="carousel-next-btn"
                onClick={goNext}
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/50 transition-colors"
                aria-label="Next slide"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
