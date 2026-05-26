"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Mail, MapPin } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";

const verticals = [
  "Banking & Finance",
  "Healthcare & Life Sciences",
  "Industrial / Public Sector",
  "R&D / Frontier Compute",
  "Other",
];

const ease = [0.2, 0.7, 0.1, 1] as const;

const API_BASE =
  process.env.NEXT_PUBLIC_BACKEND_URL || process.env.REACT_APP_BACKEND_URL || "";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    vertical: verticals[0],
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "sending" | "sent" | "error"
  >("idle");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setStatus("error");
      return;
    }
    setStatus("sending");
    try {
      if (API_BASE) {
        await fetch(`${API_BASE}/api/contact`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      }
      setStatus("sent");
      setForm({
        name: "",
        email: "",
        company: "",
        vertical: verticals[0],
        message: "",
      });
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      data-testid="contact-section"
      className="bg-ink border-b border-ink-3"
    >
      <div className="max-w-[88rem] mx-auto px-6 md:px-10 py-24 md:py-32">
        <SectionHeader
          index="011"
          label="Engage"
          title={
            <>
              Start with a <span className="italic">working session</span>.
            </>
          }
          body="Bring a real problem. We bring a senior engineer and a scientist. 30 minutes — no slides, no qualifying call."
        />

        <div className="mt-16 md:mt-20 grid grid-cols-12 gap-x-6 gap-y-12 border-t border-ink-3 pt-16">
          {/* Left — direct contact */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease }}
            className="col-span-12 lg:col-span-5 flex flex-col gap-10"
          >
            <a
              href="mailto:contact@archeon.solutions"
              className="group inline-flex items-center justify-between gap-6 border border-ink-3 px-6 py-7 hover:border-signal/60 transition-colors"
            >
              <div>
                <div className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-bone-dim">
                  Direct line
                </div>
                <div className="mt-2 font-display text-2xl md:text-3xl text-bone group-hover:text-signal transition-colors">
                  contact@archeon.solutions
                </div>
              </div>
              <Mail className="w-5 h-5 text-bone-dim group-hover:text-signal transition-colors" />
            </a>

            <div className="grid grid-cols-2 gap-px bg-ink-3 border-y border-ink-3">
              {[
                { city: "San Francisco", note: "Engineering · Research" },
                { city: "Zürich", note: "Client & Operations" },
              ].map((loc) => (
                <div key={loc.city} className="bg-ink p-6">
                  <MapPin className="w-4 h-4 text-signal" strokeWidth={1.5} />
                  <div className="mt-4 font-display text-xl text-bone">
                    {loc.city}
                  </div>
                  <div className="mt-1 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-bone-dim">
                    {loc.note}
                  </div>
                </div>
              ))}
            </div>

            <div className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-bone-dim leading-relaxed">
              Available globally — engagements delivered on-prem,
              hybrid or air-gapped as your compliance requires.
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.form
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease, delay: 0.1 }}
            onSubmit={handleSubmit}
            data-testid="contact-form"
            className="col-span-12 lg:col-span-7 space-y-8"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-8">
              <div>
                <label
                  htmlFor="name"
                  className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-bone-dim"
                >
                  Name *
                </label>
                <input
                  id="name"
                  name="name"
                  data-testid="contact-name-input"
                  placeholder="Your name"
                  value={form.name}
                  onChange={handleChange}
                  className="field-underline"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-bone-dim"
                >
                  Work email *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  data-testid="contact-email-input"
                  placeholder="you@company.com"
                  value={form.email}
                  onChange={handleChange}
                  className="field-underline"
                />
              </div>
              <div>
                <label
                  htmlFor="company"
                  className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-bone-dim"
                >
                  Company
                </label>
                <input
                  id="company"
                  name="company"
                  data-testid="contact-company-input"
                  placeholder="Organization"
                  value={form.company}
                  onChange={handleChange}
                  className="field-underline"
                />
              </div>
              <div>
                <label
                  htmlFor="vertical"
                  className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-bone-dim"
                >
                  Vertical
                </label>
                <select
                  id="vertical"
                  name="vertical"
                  data-testid="contact-vertical-input"
                  value={form.vertical}
                  onChange={handleChange}
                  className="field-underline bg-transparent appearance-none cursor-pointer"
                >
                  {verticals.map((v) => (
                    <option key={v} value={v} className="bg-ink text-bone">
                      {v}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="message"
                className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-bone-dim"
              >
                What are you trying to solve? *
              </label>
              <textarea
                id="message"
                name="message"
                data-testid="contact-message-input"
                placeholder="A specific problem, a model that's stuck, a system that needs to ship..."
                rows={4}
                value={form.message}
                onChange={handleChange}
                className="field-underline resize-none"
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-6 pt-2">
              <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-bone-dim max-w-xs">
                {status === "sent" &&
                  "Received. We respond within one business day."}
                {status === "error" &&
                  "Please complete required fields and try again."}
                {status === "idle" &&
                  "We respond within one business day · NDA on request"}
                {status === "sending" && "Sending…"}
              </p>
              <button
                type="submit"
                data-testid="contact-submit-btn"
                disabled={status === "sending"}
                className="group inline-flex items-center gap-3 bg-signal text-ink px-7 h-12 text-sm font-medium hover:bg-bone transition-colors disabled:opacity-60"
              >
                {status === "sending" ? "Sending…" : "Send brief"}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
