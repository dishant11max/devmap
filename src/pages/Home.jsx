import { TerminalWindow } from "../components/home/TerminalWindow";
import { HomeSections } from "../components/home/HomeSections";

export default function Home() {
  return (
    <div
      className="relative min-h-screen overflow-x-hidden font-sans"
      style={{ background: "var(--bg)", color: "var(--text)" }}
    >
      {/* ── 1. HERO SECTION: 88svh with full-bleed artwork ─────────────────── */}
      <section className="relative min-h-[88svh] flex flex-col justify-end overflow-hidden">
        {/* Full-bleed background image */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <picture className="w-full h-full block">
            <source srcSet="/hero-ink.webp" type="image/webp" />
            <img
              src="/hero-ink.jpg"
              alt="Coastal engraving landscape"
              width={1920}
              height={1080}
              fetchPriority="high"
              className="w-full h-full object-cover"
              style={{ objectPosition: "72% 55%" }}
            />
          </picture>

          {/* Mobile backdrop: strong darkening over the top/mid section where text sits */}
          <div
            className="absolute inset-0 pointer-events-none lg:hidden"
            style={{
              background:
                "linear-gradient(to bottom, var(--bg) 0%, color-mix(in srgb, var(--bg) 94%, transparent) 20%, color-mix(in srgb, var(--bg) 85%, transparent) 50%, color-mix(in srgb, var(--bg) 70%, transparent) 75%, var(--bg) 100%)",
            }}
          />

          {/* Desktop localized soft left-edge darkening vignette */}
          <div
            className="hidden lg:block absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(to right, color-mix(in srgb, var(--bg) 92%, transparent) 0%, color-mix(in srgb, var(--bg) 60%, transparent) 35%, transparent 65%)",
            }}
          />

          {/* Bottom feathering into --bg */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(to bottom, transparent 0%, transparent 75%, var(--bg) 100%)",
            }}
          />

          {/* Subtle dither grain overlay */}
          <div className="absolute inset-0 bg-dither pointer-events-none opacity-20" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 pt-28 pb-12 flex-1 flex flex-col justify-end">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-end">
            {/* HERO LEFT */}
            <div className="lg:col-span-5 max-w-[52ch] flex flex-col justify-end pb-3">
              <h1
                className="font-medium tracking-tight leading-[1.15] mb-3 text-balance"
                style={{
                  fontSize: "clamp(1.5rem, 2.5vw, 2.125rem)",
                  color: "var(--text)",
                }}
              >
                The structured way into the stack you want to master.
              </h1>

              <p
                className="leading-relaxed mb-6 font-normal font-sans"
                style={{
                  fontSize: "18px",
                  color: "color-mix(in srgb, var(--text) 88%, transparent)",
                }}
              >
                Roadmaps for languages and CS fundamentals. Track progress, keep a daily TIL log, and learn from curated resources.
              </p>

              {/* Command-style CTA bar */}
              <div className="flex flex-col gap-2.5 font-mono">
                <div
                  className="flex items-center justify-between"
                  style={{
                    height: "40px",
                    padding: "0 14px",
                    borderRadius: "2px",
                    border: "1px solid var(--border)",
                    background: "color-mix(in srgb, var(--surface) 90%, transparent)",
                    maxWidth: "420px",
                  }}
                >
                  <div className="flex items-center gap-2" style={{ color: "var(--text)" }}>
                    <span className="font-bold" style={{ color: "var(--accent)", fontSize: "12px" }}>
                      $
                    </span>
                    <span style={{ fontSize: "12px", letterSpacing: "0.04em" }}>
                      open roadmaps
                    </span>
                  </div>
                  <a
                    href="/languages"
                    className="flex items-center gap-1 font-bold"
                    style={{
                      fontSize: "12px",
                      padding: "4px 10px",
                      borderRadius: "2px",
                      background: "var(--accent)",
                      color: "var(--on-accent)",
                      textDecoration: "none",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    Open &rarr;
                  </a>
                </div>

                {/* Trust line */}
                <p
                  className="font-mono"
                  style={{ fontSize: "11px", color: "var(--muted)", letterSpacing: "-0.01em" }}
                >
                  Free &bull; Open source &bull; Progress saves in your browser, no signup
                </p>

                {/* Quick-jump links */}
                <div
                  className="flex items-center gap-3"
                  style={{ fontSize: "12px", color: "var(--muted)" }}
                >
                  <span style={{ fontSize: "11px", color: "color-mix(in srgb, var(--muted) 70%, transparent)" }}>
                    quick jump:
                  </span>
                  <a
                    href="/languages"
                    style={{ color: "inherit", textDecoration: "none" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ink)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}
                  >
                    Languages
                  </a>
                  <span style={{ color: "var(--border)" }}>/</span>
                  <a
                    href="/cs-core"
                    style={{ color: "inherit", textDecoration: "none" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ink)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}
                  >
                    CS Core
                  </a>
                </div>
              </div>
            </div>

            {/* HERO RIGHT: Terminal Window (unchanged) */}
            <div className="lg:col-span-7 flex justify-end lg:-mr-6 xl:-mr-12 lg:pt-14">
              <TerminalWindow />
            </div>
          </div>
        </div>
      </section>

      {/* ── 2-5. NEW SECTIONS (Track grid, Feature grid, Comparison, CTA) ───── */}
      <HomeSections />
    </div>
  );
}
