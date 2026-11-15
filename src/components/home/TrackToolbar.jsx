/**
 * TrackToolbar — filter bar used by /languages and /cs-core.
 *
 * Left:  segmented plain-text category buttons (mono 13px). Active = underlined
 *         with 1px --text. Only rendered when `categories` is provided.
 * Right: text filter input (1px --border, 2px radius, mono 13px) with `/` kbd
 *         hint. Pressing `/` focuses it unless another input is active.
 *
 * Props:
 *   categories       — string[] | undefined  (omit to hide filter buttons)
 *   allTracks        — full (unfiltered) track array, for counts
 *   selectedCategory — string
 *   onCategoryChange — fn(category: string)
 *   search           — string
 *   onSearchChange   — fn(value: string)
 */

import { useEffect, useRef } from "react";

export function TrackToolbar({
  categories,
  allTracks,
  selectedCategory,
  onCategoryChange,
  search,
  onSearchChange,
}) {
  const inputRef = useRef(null);

  // `/` shortcut: focus filter input unless typing in another input
  useEffect(() => {
    function handleKey(e) {
      const tag = document.activeElement?.tagName;
      if (
        e.key === "/" &&
        tag !== "INPUT" &&
        tag !== "TEXTAREA" &&
        tag !== "SELECT"
      ) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  // Counts per category (computed from the unfiltered list)
  function countFor(cat) {
    if (!allTracks) return 0;
    if (cat === "All") return allTracks.length;
    return allTracks.filter((t) => t.category === cat).length;
  }

  return (
    <div
      className="flex items-start justify-between gap-4 flex-wrap"
      style={{ marginTop: "24px", marginBottom: "16px" }}
    >
      {/* Left: segmented category filter */}
      {categories && (
        <div
          className="flex items-center gap-5 flex-wrap"
          role="tablist"
          aria-label="Filter by category"
        >
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => onCategoryChange(cat)}
                className="font-mono focus-visible:outline-none"
                style={{
                  fontSize:       "13px",
                  color:          isActive ? "var(--text)" : "var(--muted)",
                  background:     "none",
                  border:         "none",
                  borderBottom:   isActive ? "1px solid var(--text)" : "1px solid transparent",
                  cursor:         "pointer",
                  transition:     "color 120ms",
                  padding:        "0 0 2px 0",
                  outline:        "none",
                }}
                onFocus={(e) => {
                  if (e.target.matches(":focus-visible")) {
                    e.target.style.outline = "2px solid var(--accent)";
                    e.target.style.outlineOffset = "3px";
                  }
                }}
                onBlur={(e) => {
                  e.target.style.outline = "none";
                }}
              >
                {cat}
                <span style={{ color: "var(--muted)", marginLeft: "4px" }}>
                  ({countFor(cat)})
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* Right: text filter input */}
      <div className="relative flex items-center w-full sm:w-[200px]">
        <input
          ref={inputRef}
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Filter tracks"
          aria-label="Filter tracks"
          className="font-mono w-full"
          style={{
            fontSize:    "13px",
            height:      "32px",
            padding:     "0 36px 0 10px",
            border:      "1px solid var(--border)",
            borderRadius: "2px",
            background:  "transparent",
            color:       "var(--text)",
            outline:     "none",
            transition:  "border-color 120ms",
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = "var(--accent)";
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = "var(--border)";
          }}
        />
        {/* `/` hint */}
        {!search && (
          <kbd
            aria-hidden="true"
            className="font-mono"
            style={{
              position:        "absolute",
              right:           "8px",
              top:             "50%",
              transform:       "translateY(-50%)",
              fontSize:        "11px",
              color:           "var(--muted)",
              border:          "1px solid var(--border)",
              borderRadius:    "2px",
              padding:         "1px 5px",
              background:      "var(--surface)",
              pointerEvents:   "none",
              lineHeight:      1.4,
            }}
          >
            /
          </kbd>
        )}
      </div>
    </div>
  );
}
