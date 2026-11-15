/**
 * /languages — language roadmap listing.
 *
 * Data fetching (Supabase + localStorage) is UNCHANGED from the original.
 * Only presentation has changed: PageHeader + TrackToolbar + TrackTable.
 */

import { useState, useEffect, useMemo } from "react";
import { languages } from "../data/languages";
import { roadmaps } from "../data/roadmaps";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabase";
import { PageHeader }   from "../components/home/PageHeader";
import { TrackToolbar } from "../components/home/TrackToolbar";
import { TrackTable, TrackEmptyState } from "../components/home/TrackTable";

// Container matches navbar/footer: max-w-[1440px], px-6
const CONTAINER = "w-full max-w-[1440px] mx-auto px-6";

export default function Languages() {
  const { user } = useAuth();
  const [search,           setSearch]           = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [progressMap,      setProgressMap]       = useState({});

  // ── Progress fetching (unchanged logic) ────────────────────────────────────
  useEffect(() => {
    let mounted = true;

    async function loadProgress() {
      const newProgressMap = {};

      if (user) {
        const { data, error } = await supabase
          .from("user_progress")
          .select("language_slug")
          .eq("user_id", user.id);

        if (!error && data) {
          const counts = {};
          data.forEach((row) => {
            counts[row.language_slug] = (counts[row.language_slug] || 0) + 1;
          });
          Object.keys(counts).forEach((slug) => {
            newProgressMap[slug] = counts[slug];
          });
        }
      } else {
        languages.forEach((lang) => {
          const saved = localStorage.getItem(`devmap_progress_${lang.id}`);
          if (saved) {
            try {
              const completed = JSON.parse(saved);
              if (Array.isArray(completed)) {
                newProgressMap[lang.id] = completed.length;
              }
            } catch (e) {
              console.error(e);
            }
          }
        });
      }

      if (mounted) setProgressMap(newProgressMap);
    }

    loadProgress();
    return () => { mounted = false; };
  }, [user]);

  // ── Derived data ───────────────────────────────────────────────────────────
  const categories = useMemo(
    () => ["All", ...new Set(languages.map((l) => l.category))],
    []
  );

  const totalSteps = useMemo(
    () =>
      languages.reduce(
        (acc, l) => acc + (roadmaps[l.id]?.nodes?.length || l.steps || 20),
        0
      ),
    []
  );

  const filteredLanguages = useMemo(() => {
    return languages.filter((lang) => {
      const matchesSearch = lang.name
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || lang.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, selectedCategory]);

  function clearFilters() {
    setSearch("");
    setSelectedCategory("All");
  }

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div
      className="min-h-screen"
      style={{ background: "var(--bg)", color: "var(--text)" }}
    >
      <div className={CONTAINER}>
        <PageHeader
          path="~/languages"
          title="Languages"
          description={`${languages.length} language roadmaps. Pick one and start at step one.`}
          meta={`${totalSteps} steps total`}
        />

        <TrackToolbar
          categories={categories}
          allTracks={languages}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          search={search}
          onSearchChange={setSearch}
        />

        {filteredLanguages.length === 0 ? (
          <TrackEmptyState
            search={search || selectedCategory}
            onClear={clearFilters}
          />
        ) : (
          <TrackTable
            tracks={filteredLanguages}
            progressMap={progressMap}
          />
        )}

        {/* Bottom breathing room */}
        <div style={{ height: "80px" }} />
      </div>
    </div>
  );
}
