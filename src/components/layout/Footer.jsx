import { Link } from "react-router-dom";
import { Github, Linkedin, Map } from "lucide-react";

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
    <footer className="border-t border-[rgba(255,255,255,0.06)] bg-[#08090A] pt-10 pb-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8 mb-10">
          <div className="max-w-xs">
            <div className="flex items-center gap-2 mb-3">
              <Map className="h-5 w-5 text-[#888]" />
              <span className="font-bold text-white text-lg">DevMap</span>
            </div>
            <p className="text-sm text-[#555] leading-relaxed">
              Structured roadmaps, curated resources, and progress tracking.
              Free and open source.
            </p>
          </div>
          <nav className="flex flex-wrap gap-x-8 gap-y-3">
            {footerLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-sm text-[#555] hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[rgba(255,255,255,0.06)] pt-6">
          <p className="text-xs text-[#555]">
            © {new Date().getFullYear()} DevMap
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/dishant11max/devmap"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-xs text-[#555] hover:text-white transition-colors"
            >
              <Github className="h-4 w-4" />
              <span>GitHub</span>
            </a>
            <a
              href="https://www.linkedin.com/in/dishant-savadia-b38b0a289/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-xs text-[#555] hover:text-white transition-colors"
            >
              <Linkedin className="h-4 w-4" />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
