import { Separator } from "@/components/ui/separator";

const footerLinks = {
  Services: ["Computer Vision", "LLM Optimization", "Healthcare AI", "Hyperspectral Analysis"],
  Company: ["About", "Careers", "Research", "Blog"],
  Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
};

export default function Footer() {
  return (
    <footer data-testid="footer" className="bg-[#0A0A0A] text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-4">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 flex items-center justify-center bg-white rounded-sm">
                <span className="font-heading font-bold text-base text-[#0A0A0A]">A</span>
              </div>
              <span className="font-heading font-bold text-lg tracking-tight">
                Archeon Solutions
              </span>
            </div>
            <p className="text-sm text-white/40 leading-relaxed max-w-xs mb-6">
              Pioneering AI intelligence for healthcare, earth observation, and
              high-performance computing. Research-grade solutions, production-ready.
            </p>
            <p className="font-mono text-xs text-white/25">
              Zurich &middot; San Francisco
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="md:col-span-2">
              <h4 className="font-heading text-sm font-semibold text-white/70 mb-4">
                {title}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-white/35 hover:text-white/70 transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="bg-white/10 mb-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/25">
            &copy; {new Date().getFullYear()} Archeon Solutions. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
