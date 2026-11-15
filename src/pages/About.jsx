/**
 * /about — plain docs-style page. No centered hero, no cards, no animations.
 *
 * NOTE: The "why I built it" paragraph has been left out — you haven't supplied
 * those 1–2 sentences yet. Add them after the first paragraph when you're ready.
 *
 * NAVBAR FIX CAUSE (reported):
 *   The old About.jsx delegated to <AboutPage /> (about-page.jsx), which added
 *   its own <div className="min-h-screen ..."> root plus a hero <section> with
 *   py-24 md:py-36 (96px / 144px top padding) on top of AppLayout's pt-16.
 *   The combined offset pushed visible content to y ≈ 160–208px, making the
 *   navbar area look taller. A full-width border-t between the two sections
 *   appeared as an extra navbar border line. The Navbar code itself was
 *   identical on every route — the problem was entirely in about-page.jsx.
 *   This rewrite removes about-page.jsx entirely and uses the same PageHeader
 *   as /languages and /cs-core, which produces consistent top spacing.
 */

import { useMemo } from "react";
import { Link } from "react-router-dom";
import { roadmaps }            from "../data/roadmaps";
import { tilEntries }          from "../data/til";
import { totalResourcesCount } from "../data/resources";
import { PageHeader }          from "../components/home/PageHeader";

// Container matches navbar/footer: max-w-[1440px], px-6
const CONTAINER = "w-full max-w-[1440px] mx-auto px-6";

// ─── Definition list row ──────────────────────────────────────────────────────
function DefRow({ label, children, isLast }) {
  return (
    <div
      className="flex flex-col sm:flex-row items-start gap-1 sm:gap-6"
      style={{
        padding:      "16px 0",
        borderBottom: isLast ? "none" : "1px solid var(--border)",
      }}
    >
      <dt
        className="font-mono w-full sm:w-[148px] shrink-0"
        style={{
          fontSize:   "12px",
          color:      "var(--muted)",
          paddingTop: "2px",
          lineHeight: 1.5,
        }}
      >
        {label}
      </dt>
      <dd
        className="font-sans flex-1 m-0"
        style={{
          fontSize:   "15px",
          color:      "var(--text)",
          lineHeight: 1.6,
        }}
      >
        {children}
      </dd>
    </div>
  );
}

// ─── Inline external link ─────────────────────────────────────────────────────
function EL({ href, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      style={{
        color:          "var(--text)",
        textDecoration: "underline",
        textUnderlineOffset: "3px",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ink)")}
      onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text)")}
    >
      {children}
    </a>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function About() {
  const totalTracks = Object.keys(roadmaps).length;

  const totalNodes = useMemo(
    () =>
      Object.values(roadmaps).reduce(
        (a, r) => a + (r.nodes?.length || 0),
        0
      ),
    []
  );

  const totalTil       = tilEntries.length;
  const totalResources = totalResourcesCount;

  return (
    <div
      className="min-h-screen"
      style={{ background: "var(--bg)", color: "var(--text)" }}
    >
      <div className={CONTAINER}>
        <PageHeader
          path="~/about"
          title="About DevMap"
          description="A free, open-source learning platform for developers."
        />

        {/* ── Main paragraph ─────────────────────────────────────────────── */}
        <p
          className="font-sans"
          style={{
            fontSize:   "17px",
            color:      "var(--text)",
            maxWidth:   "62ch",
            lineHeight: 1.7,
            marginTop:  "40px",
            marginBottom: "0",
          }}
        >
          DevMap is {totalTracks} roadmaps for languages and CS fundamentals.
          Each roadmap is a graph of nodes with curated links, and there&rsquo;s
          a TIL log and a progress dashboard to go with them. It&rsquo;s built
          and maintained by Dishant Savadia.
        </p>

        {/*
          ── "Why I built it" placeholder ─────────────────────────────────
          Add 1–2 sentences here when supplied. Example:
          <p className="font-sans" style={{ fontSize: "17px", ... }}>
            {whyBuilt}
          </p>
        */}

        {/* ── Definition list ────────────────────────────────────────────── */}
        <dl
          style={{
            marginTop:    "48px",
            borderTop:    "1px solid var(--border)",
          }}
        >
          <DefRow label="What's inside">
            {totalTracks} tracks, {totalNodes} nodes, {totalResources} curated resources, {totalTil} TIL entries
          </DefRow>

          <DefRow label="Progress">
            Saved in your browser. Sign in with GitHub to sync it across devices.
          </DefRow>

          <DefRow label="Stack">
            React, Vite, Tailwind CSS, Supabase, Vercel
          </DefRow>

          <DefRow label="Source">
            <EL href="https://github.com/dishant11max/devmap">
              github.com/dishant11max/devmap
            </EL>
          </DefRow>

          <DefRow label="Contribute">
            Roadmaps are plain data files in{" "}
            <code
              className="font-mono"
              style={{ fontSize: "13px", color: "var(--muted)" }}
            >
              src/data/roadmaps
            </code>
            . Fix a link or add a track with a pull request.{" "}
            <EL href="https://github.com/dishant11max/devmap/blob/main/CONTRIBUTING.md">
              CONTRIBUTING.md
            </EL>
          </DefRow>

          <DefRow label="Creator" isLast>
            <span className="flex flex-col gap-1">
              <EL href="https://github.com/dishant11max">
                github.com/dishant11max
              </EL>
              <EL href="https://www.linkedin.com/in/dishant-savadia-b38b0a289/">
                linkedin.com/in/dishant-savadia
              </EL>
              <EL href="https://github.com/dishant11max">
                dishantsavadia.dev
              </EL>
            </span>
          </DefRow>
        </dl>

        {/* ── Closing text links (no buttons) ────────────────────────────── */}
        <div
          style={{
            marginTop:     "48px",
            display:       "flex",
            flexDirection: "column",
            gap:           "12px",
          }}
        >
          <Link
            to="/languages"
            className="font-mono"
            style={{
              fontSize:       "13px",
              color:          "var(--text)",
              textDecoration: "none",
              display:        "inline-block",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ink)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text)")}
          >
            Start with a track →
          </Link>
          <Link
            to="/resources"
            className="font-mono"
            style={{
              fontSize:       "13px",
              color:          "var(--text)",
              textDecoration: "none",
              display:        "inline-block",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ink)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text)")}
          >
            Browse resources →
          </Link>
        </div>

        <div style={{ height: "80px" }} />
      </div>
    </div>
  );
}
