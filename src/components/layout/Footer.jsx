import { Link } from "react-router-dom";
import { Github, Linkedin, Globe, ArrowUpRight } from "lucide-react";

const footerLinks = [
  { to: "/languages", label: "Languages" },
  { to: "/cs-core", label: "CS Core" },
  { to: "/til", label: "TIL" },
  { to: "/resources", label: "Resources" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/about", label: "About" },
];

export function Footer() {
  return (
    <footer className="relative border-t border-border overflow-hidden text-text font-mono text-xs">
      {/* Ocean Horizon Image Background Texture */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <picture className="w-full h-full block">
          <source srcSet="/footer.webp" type="image/webp" />
          <img
            src="/footer.jpg"
            alt="Quiet ocean horizon at dusk"
            width={1920}
            height={600}
            className="w-full h-full object-cover object-center"
          />
        </picture>
        {/* Smooth seamless gradient transition from --bg at top down into ocean water */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, var(--bg) 0%, color-mix(in srgb, var(--bg) 85%, transparent) 25%, color-mix(in srgb, var(--bg) 70%, transparent) 65%, color-mix(in srgb, var(--bg) 50%, transparent) 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{ backgroundColor: "color-mix(in srgb, var(--bg) 40%, transparent)" }}
        />
        <div className="absolute inset-0 bg-dither opacity-20" />
      </div>

      {/* Footer Content */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-border">
          {/* Brand & Mission */}
          <div className="md:col-span-5 flex flex-col justify-between space-y-4">
            <div>
              <span className="font-bold tracking-tight text-base text-text uppercase block mb-2">
                DEVMAP
              </span>
              <p className="text-xs text-muted max-w-sm leading-relaxed font-sans">
                The structured way into the stack you want to master. Free, open source roadmaps, daily micro-logs, and curated references.
              </p>
            </div>
            <div className="text-[11px] text-muted">
              Built by <span className="text-text font-semibold">Dishant Savadia</span>
            </div>
          </div>

          {/* Creator Links & Socials */}
          <div className="md:col-span-4 space-y-3">
            <span className="text-[10px] text-ink font-semibold uppercase tracking-wider block mb-2">
              CREATOR // DISHANT SAVADIA
            </span>
            <div className="flex flex-col space-y-2">
              {/* GitHub */}
              <a
                href="https://github.com/dishant11max"
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between p-2 rounded-[2px] border border-border bg-surface/80 hover:border-ink hover:bg-surface transition-all"
              >
                <div className="flex items-center gap-2">
                  <Github className="h-3.5 w-3.5 text-ink" />
                  <span className="text-xs text-text">github.com/dishant11max</span>
                </div>
                <ArrowUpRight className="h-3 w-3 text-muted group-hover:text-text transition-colors" />
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/dishant-savadia-b38b0a289/"
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between p-2 rounded-[2px] border border-border bg-surface/80 hover:border-ink hover:bg-surface transition-all"
              >
                <div className="flex items-center gap-2">
                  <Linkedin className="h-3.5 w-3.5 text-ink" />
                  <span className="text-xs text-text">linkedin.com/in/dishant-savadia</span>
                </div>
                <ArrowUpRight className="h-3 w-3 text-muted group-hover:text-text transition-colors" />
              </a>

              {/* Portfolio */}
              <a
                href="https://github.com/dishant11max"
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between p-2 rounded-[2px] border border-border bg-surface/80 hover:border-ink hover:bg-surface transition-all"
              >
                <div className="flex items-center gap-2">
                  <Globe className="h-3.5 w-3.5 text-ink" />
                  <span className="text-xs text-text">dishantsavadia.dev</span>
                </div>
                <ArrowUpRight className="h-3 w-3 text-muted group-hover:text-text transition-colors" />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-[10px] text-ink font-semibold uppercase tracking-wider block mb-2">
              NAVIGATION
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {footerLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-muted hover:text-text transition-colors py-1"
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="https://github.com/dishant11max/devmap"
                target="_blank"
                rel="noreferrer"
                className="text-muted hover:text-text transition-colors py-1 flex items-center gap-1"
              >
                <span>Source</span>
                <ArrowUpRight className="h-2.5 w-2.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright without unconfirmed license claim */}
        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[11px] text-muted">
          <div>&copy; {new Date().getFullYear()} DEVMAP &bull; Free & Open Source</div>
          <div>devmap.sh</div>
        </div>
      </div>
    </footer>
  );
}
