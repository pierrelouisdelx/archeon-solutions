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

  // Duplicate the list so the marquee loops seamlessly.
  const reel = [...clients, ...clients];

  return (
    <section
      id="trusted-by"
      data-testid="trusted-by-section"
      aria-label="Selected engagements"
      className="relative bg-ink border-y border-ink-3"
    >
      <div className="max-w-[88rem] mx-auto px-6 md:px-10 py-10 md:py-12">
        <div className="flex items-center gap-6">
          <span className="eyebrow shrink-0 hidden sm:inline-flex items-center gap-3">
            <span aria-hidden className="text-bone-dim">003</span>
            <span aria-hidden className="inline-block w-6 h-px bg-signal/60" />
            Selected engagements
          </span>
          <div className="hidden sm:block flex-1 h-px bg-ink-3" />
        </div>

        <div className="mt-8 marquee-pause overflow-hidden relative">
          {/* edge fades */}
          <div
            className="absolute inset-y-0 left-0 w-16 z-10 pointer-events-none"
            style={{
              background:
                "linear-gradient(to right, var(--ink), transparent)",
            }}
          />
          <div
            className="absolute inset-y-0 right-0 w-16 z-10 pointer-events-none"
            style={{
              background:
                "linear-gradient(to left, var(--ink), transparent)",
            }}
          />
          <div className="marquee-track flex w-max items-center gap-x-20 md:gap-x-28">
            {reel.map((c, i) => (
              <div
                key={`${c.id}-${i}`}
                className="flex items-center justify-center opacity-55 hover:opacity-100 transition-opacity duration-300"
                style={{ height: c.height }}
              >
                <Image
                  src={c.logoUrl}
                  alt={c.name}
                  width={220}
                  height={c.height}
                  className="h-full w-auto object-contain"
                  style={{ filter: "brightness(0) invert(1)" }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
