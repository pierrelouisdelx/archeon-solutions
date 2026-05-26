import Logo from "@/components/Logo";

const footerLinks = {
  Capabilities: [
    { label: "Computer Vision", href: "#services" },
    { label: "LLM Engineering", href: "#services" },
    { label: "Healthcare AI", href: "#services" },
    { label: "Finance AI", href: "#services" },
    { label: "Research & Development", href: "#services" },
  ],
  Studio: [
    { label: "Work", href: "#case-studies" },
    { label: "Team", href: "#about" },
    { label: "Industries", href: "#industries" },
    { label: "Blog", href: "/blog" },
  ],
  Engage: [
    { label: "Book intro call", href: "#contact" },
    { label: "contact@archeon.solutions", href: "mailto:contact@archeon.solutions" },
  ],
};

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer
      data-testid="footer"
      className="bg-ink text-bone border-t border-ink-3"
    >
      <div className="max-w-[88rem] mx-auto px-6 md:px-10 pt-16 pb-10">
        <div className="flex items-center gap-6 mb-12 font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-bone-dim">
          <span className="inline-block w-12 h-px bg-signal" />
          Archeon Solutions · {year} · San Francisco · Zürich
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-14">
          {/* Brand */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 mb-6">
              <Logo variant="light" className="h-10 w-10 text-bone" />
              <span className="font-display text-2xl text-bone">
                Archeon Solutions
              </span>
            </div>
            <p className="font-display text-2xl md:text-3xl text-bone leading-snug max-w-md">
              Research-grade AI,
              <br />
              shipped into production.
            </p>
            <p className="mt-6 text-sm text-bone-dim leading-relaxed max-w-sm">
              An AI research and engineering studio. Computer vision, LLMs,
              healthcare, finance, R&D — for tier-1 enterprises in Europe and
              North America.
            </p>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="md:col-span-2">
              <h4 className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-signal mb-5">
                {title}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-bone-dim hover:text-bone transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="md:col-span-1" />
        </div>

        <div className="pt-8 border-t border-ink-3 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="font-mono text-[0.625rem] uppercase tracking-[0.22em] text-bone-dim">
            &copy; {year} Archeon Solutions · All rights reserved
          </p>
          <p className="font-mono text-[0.625rem] uppercase tracking-[0.22em] text-bone-dim">
            <span className="inline-block w-2 h-2 bg-signal align-middle mr-2 animate-pulse" />
            Accepting Q3 engagements
          </p>
        </div>
      </div>
    </footer>
  );
}
