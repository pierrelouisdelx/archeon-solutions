"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Logo from "@/components/Logo";

const navLinks = [
  { label: "Capabilities", href: "#services" },
  { label: "Industries", href: "#industries" },
  { label: "Work", href: "#case-studies" },
  { label: "Team", href: "#about" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 32);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      data-testid="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "nav-scrolled py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-[88rem] mx-auto px-6 md:px-10 flex items-center justify-between">
        {/* Logo + wordmark */}
        <Link
          href="#hero"
          data-testid="nav-logo"
          className="flex items-center gap-3 group"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <Logo variant="light" className="h-8 w-8 text-bone" />
          <span className="hidden sm:flex flex-col leading-none">
            <span className="font-display text-base text-bone">Archeon</span>
            <span className="font-mono text-[0.625rem] tracking-[0.22em] uppercase text-bone-dim mt-0.5">
              Solutions
            </span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              data-testid={`nav-link-${link.label.toLowerCase()}`}
              onClick={(e) => handleNavClick(e, link.href)}
              className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-bone-dim hover:text-bone transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:block">
          <a
            href="#contact"
            data-testid="nav-cta-btn"
            onClick={(e) => handleNavClick(e, "#contact")}
            className="group inline-flex items-center gap-2 border border-ink-3 px-4 h-10 text-sm text-bone hover:border-signal hover:text-signal transition-colors"
          >
            Book intro call
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          data-testid="mobile-menu-toggle"
          className="md:hidden text-bone"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-full left-0 right-0 bg-ink border-t border-ink-3"
            data-testid="mobile-menu"
          >
            <div className="flex flex-col px-6 py-8 gap-1">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="font-display text-3xl text-bone py-3 border-b border-ink-3"
                >
                  {link.label}
                </motion.a>
              ))}
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, "#contact")}
                data-testid="mobile-cta-btn"
                className="mt-6 inline-flex items-center justify-between bg-signal text-ink h-12 px-5 text-sm font-medium"
              >
                Book intro call
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
