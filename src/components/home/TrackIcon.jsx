/**
 * TrackIcon.jsx — shared icon renderer for roadmap slugs.
 *
 * simple-icons v16.37.0 notes:
 *   • siJava is ABSENT — Java uses lucide <Coffee>
 *   • siCss3 is ABSENT — CSS uses siCss
 */

import {
  Binary,
  Network,
  Terminal,
  Cpu,
  Database,
  Layers,
  Brain,
  Coffee,
} from "lucide-react";

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

/** Render a simple-icons SVG path inline at `size`px, fill=currentColor */
export function SiIcon({ icon, size = 20 }) {
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

export const TRACK_ICONS = {
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

/** Render the icon for a given roadmap slug at `size`px */
export function TrackIcon({ slug, size = 20 }) {
  const entry = TRACK_ICONS[slug];
  if (!entry) return null;
  if (entry.type === "si") return <SiIcon icon={entry.icon} size={size} />;
  const LucideIcon = entry.icon;
  return (
    <LucideIcon
      size={size}
      strokeWidth={1.5}
      aria-hidden="true"
      style={{ flexShrink: 0 }}
    />
  );
}
