/**
 * TrackTable — shared table used by /languages and /cs-core.
 *
 * Desktop (≥1024px): full column layout in a bordered box.
 * Mobile (<1024px):  stacked rows, no horizontal scroll.
 *
 * Props:
 *   tracks      — array of language or CS core track objects
 *   showOrder   — boolean — render "01".."07" order column (CS Core)
 *   showTags    — boolean — render tags as mono text under description
 *   progressMap — { [slug]: completedCount } (omit for CS Core = all 0%)
 */

import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { roadmaps } from "../../data/roadmaps";
import { TrackIcon } from "./TrackIcon";

// ─── styles injected once ────────────────────────────────────────────────────
const ROW_STYLES = `
  .track-row-link {
    display: block;
    text-decoration: none;
    color: inherit;
    outline: none;
    transition: background 120ms;
  }
  .track-row-link:hover {
    background: var(--surface);
  }
  .track-row-link:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: -2px;
  }
  @media (prefers-reduced-motion: reduce) {
    .track-row-link { transition: none; }
  }
`;

// ─── Progress bar + label ─────────────────────────────────────────────────────
function ProgressCell({ completed, total }) {
  const pct = total > 0 ? Math.min(100, Math.round((completed / total) * 100)) : 0;
  const isDone = pct === 100;

  return (
    <div
      className="flex items-center gap-2"
      style={{ minWidth: 0 }}
    >
      {/* 4px bar */}
      <div
        style={{
          flex:            1,
          height:          "4px",
          background:      "var(--border)",
          borderRadius:    "2px",
          overflow:        "hidden",
          minWidth:        "60px",
        }}
      >
        <div
          style={{
            width:        `${pct}%`,
            height:       "100%",
            background:   "var(--accent)",
            borderRadius: "2px",
            transition:   "width 300ms ease",
          }}
        />
      </div>
      {/* % or "done" */}
      <span
        className="font-mono"
        style={{
          fontSize:   "12px",
          color:      isDone ? "var(--ink)" : "var(--muted)",
          flexShrink: 0,
          width:      "36px",
          textAlign:  "right",
        }}
      >
        {isDone ? "done" : `${pct}%`}
      </span>
    </div>
  );
}

// ─── Desktop header row ───────────────────────────────────────────────────────
function HeaderRow({ showOrder }) {
  return (
    <div
      className="hidden lg:flex items-center"
      style={{
        padding:       "10px 16px",
        borderBottom:  "1px solid var(--border)",
        background:    "var(--bg)",
      }}
    >
      {showOrder && (
        <span className="font-mono" style={{ width: "40px", fontSize: "12px", color: "var(--muted)", flexShrink: 0 }}>
          #
        </span>
      )}
      {/* icon placeholder */}
      <span style={{ width: "36px", flexShrink: 0 }} />
      <span className="font-mono" style={{ flex: 1, fontSize: "12px", color: "var(--muted)" }}>
        track
      </span>
      <span className="font-mono" style={{ width: "100px", fontSize: "12px", color: "var(--muted)", flexShrink: 0 }}>
        level
      </span>
      <span className="font-mono" style={{ width: "72px", fontSize: "12px", color: "var(--muted)", flexShrink: 0 }}>
        steps
      </span>
      <span className="font-mono" style={{ width: "108px", fontSize: "12px", color: "var(--muted)", flexShrink: 0 }}>
        time
      </span>
      <span className="font-mono" style={{ width: "160px", fontSize: "12px", color: "var(--muted)", flexShrink: 0 }}>
        progress
      </span>
      <span style={{ width: "24px", flexShrink: 0 }} />
    </div>
  );
}

// ─── Single track row ─────────────────────────────────────────────────────────
function TrackRow({ track, idx, showOrder, showTags, progressMap }) {
  const totalSteps    = roadmaps[track.id]?.nodes?.length || track.steps || 20;
  const completedSteps = progressMap[track.id] || 0;
  const orderLabel    = String(idx + 1).padStart(2, "0");

  return (
    <Link
      to={`/roadmap/${track.id}`}
      className="track-row-link"
      style={{ borderTop: idx === 0 ? "none" : "1px solid var(--border)" }}
    >
      {/* ── Desktop row ──────────────────────────────────────────────────── */}
      <div
        className="hidden lg:flex items-center"
        style={{ padding: "14px 16px", gap: "0" }}
      >
        {/* Order */}
        {showOrder && (
          <span
            className="font-mono"
            style={{
              width:      "40px",
              fontSize:   "12px",
              color:      "var(--muted)",
              flexShrink: 0,
            }}
          >
            {orderLabel}
          </span>
        )}

        {/* Icon */}
        <span
          style={{
            width:          "36px",
            flexShrink:     0,
            color:          "var(--muted)",
            display:        "flex",
            alignItems:     "center",
          }}
        >
          <TrackIcon slug={track.id} size={20} />
        </span>

        {/* Name + description (+ tags) */}
        <span style={{ flex: 1, minWidth: 0, paddingRight: "16px" }}>
          <span
            className="font-sans font-medium block"
            style={{ fontSize: "15px", color: "var(--text)", lineHeight: 1.3 }}
          >
            {track.name}
          </span>
          <span
            className="font-sans block truncate"
            style={{ fontSize: "13px", color: "var(--muted)", marginTop: "2px" }}
          >
            {track.description}
          </span>
          {showTags && track.tags?.length > 0 && (
            <span
              className="font-mono block"
              style={{
                fontSize:   "12px",
                color:      "var(--muted)",
                marginTop:  "4px",
                overflow:   "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {track.tags.join(" · ")}
            </span>
          )}
        </span>

        {/* Level */}
        <span
          className="font-sans"
          style={{
            width:      "100px",
            fontSize:   "13px",
            color:      "var(--muted)",
            flexShrink: 0,
          }}
        >
          {track.difficulty}
        </span>

        {/* Steps */}
        <span
          className="font-mono"
          style={{
            width:      "72px",
            fontSize:   "13px",
            color:      "var(--muted)",
            flexShrink: 0,
          }}
        >
          {totalSteps} steps
        </span>

        {/* Time */}
        <span
          className="font-mono"
          style={{
            width:      "108px",
            fontSize:   "12px",
            color:      "var(--muted)",
            flexShrink: 0,
          }}
        >
          {track.estimatedTime}
        </span>

        {/* Progress */}
        <span style={{ width: "160px", flexShrink: 0, paddingRight: "12px" }}>
          <ProgressCell completed={completedSteps} total={totalSteps} />
        </span>

        {/* Chevron */}
        <span
          style={{
            width:      "24px",
            flexShrink: 0,
            color:      "var(--muted)",
            display:    "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <ChevronRight size={16} strokeWidth={1.5} aria-hidden="true" />
        </span>
      </div>

      {/* ── Mobile row (< lg) ────────────────────────────────────────────── */}
      <div
        className="flex flex-col lg:hidden"
        style={{ padding: "14px 16px", gap: "6px" }}
      >
        {/* Line 1: icon + name + level */}
        <div className="flex items-center gap-2">
          <span style={{ color: "var(--muted)", flexShrink: 0 }}>
            <TrackIcon slug={track.id} size={18} />
          </span>
          <span
            className="font-sans font-medium flex-1 min-w-0"
            style={{ fontSize: "15px", color: "var(--text)" }}
          >
            {track.name}
          </span>
          <span
            className="font-sans"
            style={{ fontSize: "12px", color: "var(--muted)", flexShrink: 0 }}
          >
            {track.difficulty}
          </span>
          <ChevronRight
            size={14}
            strokeWidth={1.5}
            aria-hidden="true"
            style={{ color: "var(--muted)", flexShrink: 0 }}
          />
        </div>

        {/* Line 2: description */}
        <p
          className="font-sans"
          style={{
            fontSize:     "13px",
            color:        "var(--muted)",
            margin:       0,
            overflow:     "hidden",
            textOverflow: "ellipsis",
            whiteSpace:   "nowrap",
          }}
        >
          {track.description}
        </p>

        {/* Tags (CS Core only) */}
        {showTags && track.tags?.length > 0 && (
          <p
            className="font-mono"
            style={{ fontSize: "12px", color: "var(--muted)", margin: 0 }}
          >
            {track.tags.join(" · ")}
          </p>
        )}

        {/* Line 3: steps · time · progress */}
        <div className="flex items-center gap-4 flex-wrap" style={{ marginTop: "4px" }}>
          <span
            className="font-mono"
            style={{ fontSize: "12px", color: "var(--muted)" }}
          >
            {totalSteps} steps
          </span>
          <span
            className="font-mono"
            style={{ fontSize: "12px", color: "var(--muted)" }}
          >
            {track.estimatedTime}
          </span>
          <span style={{ flex: 1, minWidth: "80px" }}>
            <ProgressCell completed={completedSteps} total={totalSteps} />
          </span>
        </div>
      </div>
    </Link>
  );
}

// ─── Empty state ──────────────────────────────────────────────────────────────
export function TrackEmptyState({ search, onClear }) {
  return (
    <p
      className="font-mono"
      style={{
        fontSize:  "13px",
        color:     "var(--muted)",
        padding:   "32px 0",
      }}
    >
      no tracks match &ldquo;{search}&rdquo;{" "}
      <button
        type="button"
        onClick={onClear}
        className="font-mono"
        style={{
          fontSize:        "13px",
          color:           "var(--text)",
          background:      "none",
          border:          "none",
          cursor:          "pointer",
          textDecoration:  "underline",
          padding:         0,
        }}
      >
        clear filters
      </button>
    </p>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────
export function TrackTable({ tracks, showOrder, showTags, progressMap = {} }) {
  if (!tracks || tracks.length === 0) return null;

  return (
    <>
      <style>{ROW_STYLES}</style>
      <div
        style={{
          border:       "1px solid var(--border)",
          borderRadius: "4px",
          overflow:     "hidden",
        }}
      >
        <HeaderRow showOrder={showOrder} />
        {tracks.map((track, idx) => (
          <TrackRow
            key={track.id}
            track={track}
            idx={idx}
            showOrder={showOrder}
            showTags={showTags}
            progressMap={progressMap}
            isLast={idx === tracks.length - 1}
          />
        ))}
      </div>
    </>
  );
}
