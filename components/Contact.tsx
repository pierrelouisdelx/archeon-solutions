import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send, MapPin, Mail, ArrowUpRight } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${API}/contact`, form);
      toast.success("Message sent successfully! We'll be in touch soon.");
      setForm({ name: "", email: "", company: "", message: "" });
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      data-testid="contact-section"
      className="py-24 md:py-32 bg-white"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
          >
            <span className="font-mono text-xs tracking-[0.2em] text-[#2563EB] uppercase mb-4 block">
              Contact
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F172A] mb-6">
              Get in Touch
            </h2>
            <p className="text-base text-[#475569] leading-relaxed mb-10 max-w-md">
              Have a project in mind or want to explore how AI can transform your
              operations? We'd love to hear from you.
            </p>

            <div className="space-y-5">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#F1F5F9] flex items-center justify-center">
                  <Mail className="w-4 h-4 text-[#475569]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[#0F172A]">Email</p>
                  <p className="text-sm text-[#475569]">contact@archeon.ai</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#F1F5F9] flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-[#475569]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[#0F172A]">Location</p>
                  <p className="text-sm text-[#475569]">
                    Zurich, Switzerland & San Francisco, CA
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <form
              onSubmit={handleSubmit}
              data-testid="contact-form"
              className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-8 space-y-5"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="name"
                    className="text-sm font-medium text-[#0F172A] mb-1.5 block"
                  >
                    Name *
                  </label>
                  <Input
                    id="name"
                    name="name"
                    data-testid="contact-name-input"
                    placeholder="Your name"
                    value={form.name}
                    onChange={handleChange}
                    className="bg-white border-[#E2E8F0]"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-[#0F172A] mb-1.5 block"
                  >
                    Email *
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    data-testid="contact-email-input"
                    placeholder="you@company.com"
                    value={form.email}
                    onChange={handleChange}
                    className="bg-white border-[#E2E8F0]"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="company"
                  className="text-sm font-medium text-[#0F172A] mb-1.5 block"
                >
                  Company
                </label>
                <Input
                  id="company"
                  name="company"
                  data-testid="contact-company-input"
                  placeholder="Your company (optional)"
                  value={form.company}
                  onChange={handleChange}
                  className="bg-white border-[#E2E8F0]"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="text-sm font-medium text-[#0F172A] mb-1.5 block"
                >
                  Message *
                </label>
                <Textarea
                  id="message"
                  name="message"
                  data-testid="contact-message-input"
                  placeholder="Tell us about your project..."
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  className="bg-white border-[#E2E8F0] resize-none"
                />
              </div>
              <Button
                type="submit"
                data-testid="contact-submit-btn"
                disabled={loading}
                className="w-full bg-[#0F172A] hover:bg-[#1E293B] text-white rounded-full h-11 text-sm font-medium"
              >
                {loading ? (
                  "Sending..."
                ) : (
                  <>
                    Send Message
                    <Send className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
