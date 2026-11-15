/**
 * HomeSections.jsx
 * Four content sections between the hero and footer.
 *
 * Icon notes (simple-icons v16.37.0):
 *   • siJava is ABSENT in this version — Java uses lucide <Coffee> instead.
 *   • siCss3 is ABSENT — CSS uses siCss instead.
 */

import { useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Binary,
  Network,
  Terminal,
  Cpu,
  Database,
  Layers,
  Brain,
  Map,
  BookOpen,
  Trophy,
  Search,
  FileText,
  Cloud,
  Coffee,
} from "lucide-react";

// Named imports from simple-icons barrel — Vite tree-shakes individual icons.
import {
  siRust,
  siGo,
  siPython,
  siC,
  siCplusplus,
  siJavascript,
  siTypescript,
  siHtml5,
  siCss,
} from "simple-icons";

import { roadmaps }              from "../../data/roadmaps";
import { tilEntries }            from "../../data/til";
import { totalResourcesCount }   from "../../data/resources";

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

/** Render a simple-icons path as an inline SVG at `size`px, fill=currentColor */
function SiIcon({ icon, size = 28 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      style={{ flexShrink: 0 }}
    >
      <path d={icon.path} />
    </svg>
  );
}

/** Full-bleed 1px var(--border) divider line */
function Divider() {
  return <div style={{ width: "100%", height: "1px", background: "var(--border)" }} />;
}

// Icon map per roadmap slug
const TRACK_ICONS = {
  javascript:              { type: "si",     icon: siJavascript },
  python:                  { type: "si",     icon: siPython },
  java:                    { type: "lucide", icon: Coffee },        // siJava absent in v16
  cpp:                     { type: "si",     icon: siCplusplus },
  c:                       { type: "si",     icon: siC },
  go:                      { type: "si",     icon: siGo },
  rust:                    { type: "si",     icon: siRust },
  typescript:              { type: "si",     icon: siTypescript },
  html:                    { type: "si",     icon: siHtml5 },
  css:                     { type: "si",     icon: siCss },         // siCss3 absent in v16
  algorithms:              { type: "lucide", icon: Binary },
  networks:                { type: "lucide", icon: Network },
  "operating-systems":     { type: "lucide", icon: Terminal },
  databases:               { type: "lucide", icon: Database },
  "system-design":         { type: "lucide", icon: Layers },
  "computer-architecture": { type: "lucide", icon: Cpu },
  "ai-ml":                 { type: "lucide", icon: Brain },
};

const TRACK_LABELS = {
  javascript:              "JavaScript",
  python:                  "Python",
  java:                    "Java",
  cpp:                     "C++",
  c:                       "C",
  go:                      "Go",
  rust:                    "Rust",
  typescript:              "TypeScript",
  html:                    "HTML",
  css:                     "CSS",
  algorithms:              "Algorithms",
  networks:                "Networks",
  "operating-systems":     "Operating Systems",
  databases:               "Databases",
  "system-design":         "System Design",
  "computer-architecture": "Computer Architecture",
  "ai-ml":                 "AI & ML",
};

function TrackIcon({ slug, size = 28 }) {
  const entry = TRACK_ICONS[slug];
  if (!entry) return null;
  if (entry.type === "si") return <SiIcon icon={entry.icon} size={size} />;
  const LucideIcon = entry.icon;
  return <LucideIcon size={size} strokeWidth={1.5} aria-hidden="true" />;
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 1 · TRACK GRID
// ─────────────────────────────────────────────────────────────────────────────

function TrackGrid() {
  const slugs = Object.keys(roadmaps);

  const totalTracks    = slugs.length;
  const totalNodes     = useMemo(
    () => Object.values(roadmaps).reduce((a, r) => a + (r.nodes?.length || 0), 0),
    []
  );
  const totalTil       = tilEntries.length;
  const totalResources = totalResourcesCount;

  // 17 roadmaps + 1 "All tracks →" tile = 18 tiles total
  const tiles = [
    ...slugs.map((slug) => ({
      slug,
      name:  TRACK_LABELS[slug] || slug,
      nodes: roadmaps[slug]?.nodes?.length ?? 0,
      to:    `/roadmap/${slug}`,
      isAll: false,
    })),
    {
      slug:  "__all__",
      name:  "All tracks →",
      nodes: null,
      to:    "/languages",
      isAll: true,
    },
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="w-full max-w-[1440px] mx-auto px-6">
        {/* Stat line: 12px mono --muted */}
        <p
          className="font-mono mb-5"
          style={{ fontSize: "12px", color: "var(--muted)", userSelect: "none" }}
        >
          {totalTracks} tracks &middot; {totalNodes} nodes &middot; {totalTil} TIL entries &middot; {totalResources} resources
        </p>

        {/*
          Grid: 2 col mobile / 3 col sm (640px) / 6 col lg (1024px).
          Hairline 1px borders via box-shadow on the outer wrapper + right/bottom
          borders on each cell using outline trick — works without gap.
          We use border on the outer container and each tile gets a right + bottom
          border. The CSS grid has no gap.
        */}
        <div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6"
          style={{ border: "1px solid var(--border)" }}
        >
          {tiles.map((tile) => (
            <Link
              key={tile.slug}
              to={tile.to}
              className="group flex flex-col justify-center focus-visible:outline-none"
              style={{
                padding:        "20px 16px",
                minHeight:      "96px",
                borderRight:    "1px solid var(--border)",
                borderBottom:   "1px solid var(--border)",
                color:          "var(--muted)",
                textDecoration: "none",
                transition:     "background 120ms, color 120ms",
                // We'll override color on hover via CSS class below
              }}
            >
              {/* Focus ring */}
              <style>{`.track-tile:focus-visible { outline: 2px solid var(--accent); outline-offset: -2px; }`}</style>
              {!tile.isAll && (
                <span className="mb-2.5 group-hover:text-[var(--text)] transition-colors duration-[120ms]">
                  <TrackIcon slug={tile.slug} size={28} />
                </span>
              )}
              <span
                className="font-mono font-medium leading-tight group-hover:text-[var(--text)] transition-colors duration-[120ms]"
                style={{ fontSize: "12px", color: tile.isAll ? "var(--muted)" : "var(--text)" }}
              >
                {tile.name}
              </span>
              {!tile.isAll && (
                <span
                  className="font-mono mt-0.5"
                  style={{ fontSize: "12px", color: "var(--muted)" }}
                >
                  {tile.nodes} nodes
                </span>
              )}
              {/* Background on hover via pseudo-class — use Tailwind group-hover */}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 2 · FEATURE GRID
// ─────────────────────────────────────────────────────────────────────────────

/** Small monospace keyboard shortcut badge */
function KBD({ children }) {
  return (
    <kbd
      className="font-mono"
      style={{
        fontSize:     "11px",
        padding:      "1px 4px",
        borderRadius: "2px",
        border:       "1px solid var(--border)",
        background:   "var(--surface)",
        color:        "var(--text)",
        lineHeight:   1.4,
        display:      "inline",
      }}
    >
      {children}
    </kbd>
  );
}

function FeatureGrid() {
  const totalTil = tilEntries.length;

  const cells = [
    {
      icon: Map,
      title: "Roadmaps",
      desc: "Each track is a graph of nodes. Open a node for notes and curated links, then mark it done.",
    },
    {
      icon: BookOpen,
      title: "Curated resources",
      desc: "Textbooks, official documentation, and practice platforms, attached to the node they belong to.",
    },
    {
      icon: Trophy,
      title: "Progress and XP",
      desc: "Every finished node is worth 100 XP. Levels and per-track progress live on your dashboard.",
    },
    {
      icon: Search,
      title: "Search",
      desc: (
        <>
          Jump to any roadmap or TIL entry from anywhere. Press <KBD>⌘K</KBD>, or <KBD>Ctrl+K</KBD>.
        </>
      ),
    },
    {
      icon: FileText,
      title: "TIL log",
      desc: (
        <>
          {totalTil} short notes on concepts and gotchas, searchable with <KBD>⌘K</KBD>.
        </>
      ),
    },
    {
      icon: Cloud,
      title: "Sync and profile",
      desc: "Progress saves in your browser. Sign in with GitHub to sync it across devices and get a public profile at /u/your-username.",
      wide: true,
    },
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="w-full max-w-[1440px] mx-auto px-6">
        {/* Outer 1px border box, 4px radius, inner cells divided by 1px lines */}
        <div
          style={{
            border:       "1px solid var(--border)",
            borderRadius: "4px",
            overflow:     "hidden",
          }}
        >
          {/* Row 1: 2 cells — 1 col mobile, 2 col sm+ */}
          <div className="grid grid-cols-1 sm:grid-cols-2">
            <FeatureCell cell={cells[0]} borderRight borderBottom />
            <FeatureCell cell={cells[1]} borderRight={false} borderBottom />
          </div>

          {/* Row 2: 3 cells — 1 col mobile, 3 col sm+ */}
          <div className="grid grid-cols-1 sm:grid-cols-3">
            <FeatureCell cell={cells[2]} borderRight borderBottom />
            <FeatureCell cell={cells[3]} borderRight borderBottom />
            <FeatureCell cell={cells[4]} borderRight={false} borderBottom />
          </div>

          {/* Row 3: 1 wide cell */}
          <FeatureCell cell={cells[5]} borderRight={false} borderBottom={false} />
        </div>
      </div>
    </section>
  );
}

function FeatureCell({ cell, borderRight, borderBottom }) {
  const Icon = cell.icon;
  return (
    <div
      className={borderRight ? "sm:border-r border-border" : ""}
      style={{
        padding:      "24px",
        borderBottom: borderBottom ? "1px solid var(--border)" : "none",
        display:      "flex",
        flexDirection: "column",
        gap:          "10px",
      }}
    >
      <Icon
        size={16}
        strokeWidth={1.5}
        aria-hidden="true"
        style={{ color: "var(--muted)", flexShrink: 0 }}
      />
      <p
        className="font-sans font-medium"
        style={{ fontSize: "15px", color: "var(--text)", lineHeight: 1.3, margin: 0 }}
      >
        {cell.title}
      </p>
      <p
        className="font-sans"
        style={{
          fontSize:  "14px",
          color:     "var(--muted)",
          maxWidth:  "60ch",
          lineHeight: 1.6,
          margin:    0,
        }}
      >
        {cell.desc}
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 3 · COMPARISON TABLE
// ─────────────────────────────────────────────────────────────────────────────

function ComparisonTable() {
  const rows = [
    {
      label:     "Where do I start?",
      devmap:    "Step one of the track",
      bookmarks: "You pick, again",
      courses:   "Lesson one",
    },
    {
      label:     "What comes next?",
      devmap:    "The next node, in order",
      bookmarks: "Whatever\u2019s recommended",
      courses:   "The next lesson",
    },
    {
      label:     "Where are the resources?",
      devmap:    "On the node they belong to",
      bookmarks: "Spread across tabs",
      courses:   "Inside the course",
    },
    {
      label:     "Where is my progress?",
      devmap:    "On the roadmap and your dashboard",
      bookmarks: "Nowhere",
      courses:   "Inside the course platform",
    },
    {
      label:     "Cost",
      devmap:    "Free",
      bookmarks: "Free",
      courses:   "Usually paid",
    },
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="w-full max-w-[1440px] mx-auto px-6">
        {/* Heading row */}
        <div
          className="flex items-baseline justify-between gap-4 flex-wrap mb-6"
        >
          <h2
            className="font-sans font-medium"
            style={{ fontSize: "28px", color: "var(--text)", margin: 0 }}
          >
            DevMap, or a pile of tabs?
          </h2>
          <Link
            to="/languages"
            className="font-mono"
            style={{
              fontSize:       "12px",
              color:          "var(--muted)",
              textDecoration: "none",
              whiteSpace:     "nowrap",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
            onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
          >
            Browse tracks
          </Link>
        </div>

        {/* Scroll container — page body never scrolls sideways */}
        <div style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
          <table
            style={{
              width:           "100%",
              minWidth:        "560px",
              borderCollapse:  "collapse",
              fontFamily:      "inherit",
            }}
          >
            <thead>
              <tr>
                <th
                  style={{
                    width:        "28%",
                    padding:      "12px 16px",
                    textAlign:    "left",
                    fontSize:     "12px",
                    fontFamily:   "var(--font-mono)",
                    color:        "var(--muted)",
                    fontWeight:   400,
                    borderBottom: "1px solid var(--border)",
                  }}
                />
                {/* DevMap — highlighted header */}
                <th
                  style={{
                    padding:      "12px 16px",
                    textAlign:    "left",
                    fontSize:     "13px",
                    fontFamily:   "var(--font-sans)",
                    fontWeight:   500,
                    color:        "var(--text)",
                    background:   "var(--surface)",
                    borderBottom: "1px solid var(--border)",
                    borderLeft:   "1px solid var(--border)",
                  }}
                >
                  DevMap
                </th>
                <th
                  style={{
                    padding:      "12px 16px",
                    textAlign:    "left",
                    fontSize:     "13px",
                    fontFamily:   "var(--font-sans)",
                    fontWeight:   400,
                    color:        "var(--muted)",
                    borderBottom: "1px solid var(--border)",
                    borderLeft:   "1px solid var(--border)",
                  }}
                >
                  Bookmarks and playlists
                </th>
                <th
                  style={{
                    padding:      "12px 16px",
                    textAlign:    "left",
                    fontSize:     "13px",
                    fontFamily:   "var(--font-sans)",
                    fontWeight:   400,
                    color:        "var(--muted)",
                    borderBottom: "1px solid var(--border)",
                    borderLeft:   "1px solid var(--border)",
                  }}
                >
                  Paid courses
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => {
                const isLast = i === rows.length - 1;
                return (
                  <tr key={row.label}>
                    <td
                      style={{
                        padding:      "14px 16px",
                        fontSize:     "13px",
                        fontFamily:   "var(--font-sans)",
                        color:        "var(--muted)",
                        borderBottom: isLast ? "none" : "1px solid var(--border)",
                      }}
                    >
                      {row.label}
                    </td>
                    <td
                      style={{
                        padding:      "14px 16px",
                        fontSize:     "13px",
                        fontFamily:   "var(--font-sans)",
                        color:        "var(--text)",
                        background:   "var(--surface)",
                        borderBottom: isLast ? "none" : "1px solid var(--border)",
                        borderLeft:   "1px solid var(--border)",
                      }}
                    >
                      {row.devmap}
                    </td>
                    <td
                      style={{
                        padding:      "14px 16px",
                        fontSize:     "13px",
                        fontFamily:   "var(--font-sans)",
                        color:        "var(--muted)",
                        borderBottom: isLast ? "none" : "1px solid var(--border)",
                        borderLeft:   "1px solid var(--border)",
                      }}
                    >
                      {row.bookmarks}
                    </td>
                    <td
                      style={{
                        padding:      "14px 16px",
                        fontSize:     "13px",
                        fontFamily:   "var(--font-sans)",
                        color:        "var(--muted)",
                        borderBottom: isLast ? "none" : "1px solid var(--border)",
                        borderLeft:   "1px solid var(--border)",
                      }}
                    >
                      {row.courses}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 4 · CLOSING CTA
// ─────────────────────────────────────────────────────────────────────────────

function ClosingCTA() {
  const totalTracks = Object.keys(roadmaps).length;

  return (
    <section className="py-16 md:py-24">
      <div
        className="w-full max-w-[1440px] mx-auto px-6 flex flex-col items-center"
        style={{ textAlign: "center" }}
      >
        <h2
          className="font-sans font-medium"
          style={{
            fontSize:      "clamp(32px, 4vw, 48px)",
            color:         "var(--text)",
            lineHeight:    1.1,
            letterSpacing: "-0.01em",
            margin:        0,
          }}
        >
          Start with a track.
        </h2>

        <p
          className="font-sans mt-4"
          style={{ fontSize: "16px", color: "var(--muted)", lineHeight: 1.5, margin: "16px 0 0" }}
        >
          Free and open source. Progress saves in your browser.
        </p>

        {/* Command bar — matches hero's $ open roadmaps bar */}
        <div
          className="flex items-center justify-between font-mono mt-8 w-full"
          style={{
            maxWidth:   "520px",
            height:     "40px",
            padding:    "0 14px",
            border:     "1px solid var(--border)",
            background: "color-mix(in srgb, var(--bg) 90%, var(--surface) 10%)",
            borderRadius: "2px",
            marginTop:  "32px",
          }}
        >
          <div className="flex items-center gap-2" style={{ color: "var(--text)" }}>
            <span
              className="font-bold"
              style={{ color: "var(--accent)", fontSize: "12px" }}
            >
              $
            </span>
            <span style={{ fontSize: "12px", letterSpacing: "0.02em" }}>
              open roadmaps/rust
            </span>
          </div>
          <Link
            to="/roadmap/rust"
            className="font-mono font-bold"
            style={{
              fontSize:     "12px",
              padding:      "4px 10px",
              borderRadius: "2px",
              background:   "var(--accent)",
              color:        "var(--on-accent)",
              textDecoration: "none",
              letterSpacing:  "-0.01em",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Open →
          </Link>
        </div>

        {/* Browse all */}
        <p
          className="font-mono"
          style={{ fontSize: "12px", color: "var(--muted)", marginTop: "20px" }}
        >
          or{" "}
          <Link
            to="/languages"
            style={{
              color:          "var(--muted)",
              textDecoration: "underline",
            }}
          >
            browse all {totalTracks} tracks
          </Link>
        </p>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Root export
// ─────────────────────────────────────────────────────────────────────────────

export function HomeSections() {
  return (
    <>
      <Divider />
      <TrackGrid />
      <Divider />
      <FeatureGrid />
      <Divider />
      <ComparisonTable />
      <Divider />
      <ClosingCTA />
      <Divider />
    </>
  );
}
