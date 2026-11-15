/**
 * /cs-core — CS fundamentals track listing.
 *
 * "Why CS Core?" cards, "separate good engineers from great ones" copy,
 * and all FAANG mentions have been removed per spec.
 * "7 TRACKS AVAILABLE" label removed — count lives in PageHeader description.
 * showOrder renders "01".."07" labels; header column is "#" (not a recommended order).
 */

import { useState, useMemo } from "react";
import { csCoreRoadmaps } from "../data/csCore";
import { PageHeader }     from "../components/home/PageHeader";
import { TrackToolbar }   from "../components/home/TrackToolbar";
import { TrackTable, TrackEmptyState } from "../components/home/TrackTable";

// Container matches navbar/footer: max-w-[1440px], px-6
const CONTAINER = "w-full max-w-[1440px] mx-auto px-6";

export default function CSCore() {
  const [search, setSearch] = useState("");

  const filteredTracks = useMemo(() => {
    if (!search.trim()) return csCoreRoadmaps;
    const q = search.toLowerCase();
    return csCoreRoadmaps.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        (t.tags && t.tags.some((tag) => tag.toLowerCase().includes(q)))
    );
  }, [search]);

  return (
    <div
      className="min-h-screen"
      style={{ background: "var(--bg)", color: "var(--text)" }}
    >
      <div className={CONTAINER}>
        <PageHeader
          path="~/cs-core"
          title="CS Core"
          description="Fundamentals underneath every language: algorithms, operating systems, networks, databases, system design, architecture, and ML."
        />

        <TrackToolbar
          search={search}
          onSearchChange={setSearch}
          /* no categories — search only on this page */
        />

        {filteredTracks.length === 0 ? (
          <TrackEmptyState
            search={search}
            onClear={() => setSearch("")}
          />
        ) : (
          <TrackTable
            tracks={filteredTracks}
            showOrder
            showTags
            /* no progressMap — CS Core has no progress tracking yet */
          />
        )}

        <div style={{ height: "80px" }} />
      </div>
    </div>
  );
}
