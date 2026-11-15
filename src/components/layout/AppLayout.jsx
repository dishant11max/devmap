import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

const ROUTE_TITLES = {
  "/": "DevMap — Structured Developer Roadmaps & Fundamentals",
  "/languages": "Languages — DevMap",
  "/cs-core": "CS Core Tracks — DevMap",
  "/til": "Today I Learned — DevMap",
  "/resources": "Curated Developer Resources — DevMap",
  "/dashboard": "Developer Dashboard — DevMap",
  "/about": "About — DevMap",
};

export function AppLayout() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  // Dynamic document title per route without external dependencies
  useEffect(() => {
    const pathname = location.pathname;
    if (ROUTE_TITLES[pathname]) {
      document.title = ROUTE_TITLES[pathname];
    } else if (pathname.startsWith("/roadmap/")) {
      const slug = pathname.split("/")[2] || "Track";
      const formatted = slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, " ");
      document.title = `${formatted} Roadmap — DevMap`;
    } else if (pathname.startsWith("/u/")) {
      const username = pathname.split("/")[2] || "User";
      document.title = `${username}'s Profile — DevMap`;
    } else {
      document.title = "DevMap — Structured Developer Roadmaps";
    }
  }, [location.pathname]);

  return (
    <div className="relative flex min-h-screen flex-col bg-bg font-sans antialiased text-text selection:bg-accent selection:text-on-accent">
      {/* Fixed top scrim behind navbar (z-40, below nav z-50, above background): ONLY ON HOME over the hero artwork */}
      {isHome && (
        <div
          className="fixed top-0 left-0 right-0 h-[140px] pointer-events-none z-40"
          style={{
            background:
              "linear-gradient(to bottom, color-mix(in srgb, var(--bg) 85%, transparent) 0%, color-mix(in srgb, var(--bg) 45%, transparent) 55%, transparent 100%)",
          }}
          aria-hidden="true"
        />
      )}

      <Navbar />

      <main className={`flex-1 ${isHome ? "" : "pt-16"}`}>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
