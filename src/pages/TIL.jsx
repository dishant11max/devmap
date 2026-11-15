import { useState, useEffect } from "react";
import { tilEntries } from "../data/til";
import { getDailyTIL } from "../utils/dailyAlgo";
import { TILCard } from "../components/ui/TILCard";
import { BookOpen, Search, X, Calendar, Tag, Lightbulb } from "lucide-react";
import { Input } from "../components/ui/Input";
import { motion, AnimatePresence } from "framer-motion";

export default function TIL() {
  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState("All");
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [dailyTip, setDailyTip] = useState(null);

  useEffect(() => {
    // Get the deterministic daily tip
    const todayTip = getDailyTIL(tilEntries);
    setDailyTip(todayTip);
  }, []);

  // Get unique tags
  const allTags = [
    "All",
    ...new Set(tilEntries.flatMap((entry) => entry.tags)),
  ];

  const filteredEntries = tilEntries.filter((entry) => {
    const matchesSearch =
      entry.title.toLowerCase().includes(search.toLowerCase()) ||
      entry.content.toLowerCase().includes(search.toLowerCase());
    const matchesTag =
      selectedTag === "All" || entry.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  // Close modal on Esc
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setSelectedEntry(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <div className="min-h-screen bg-bg text-text py-16 relative">

      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        {/* Header Section */}
        <div className="mb-12 border-b border-border pb-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <BookOpen className="h-6 w-6 text-text" />
                <h1 className="text-3xl font-bold tracking-tight text-text">
                  Today I Learned
                </h1>
              </div>
              <p className="text-muted max-w-xl">
                Small snippets of knowledge, verified facts, and code tricks.
              </p>
            </div>
          </div>
          {/* Prominent search bar — full width below title */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
            <Input
              type="text"
              placeholder="Search snippets... (try 'React', 'SQL', 'Git')"
              className="pl-11 h-12 w-full bg-surface border-border text-text focus:border-accent transition-all rounded-xl placeholder:text-muted text-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-text transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* Daily Spotlight Section */}
        {dailyTip && !search && selectedTag === "All" && (
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-4 text-muted font-bold tracking-wide text-xs uppercase pl-1">
              <Lightbulb className="h-3.5 w-3.5 text-accent" />
              <span>Daily Spotlight</span>
            </div>
            <div
              onClick={() => setSelectedEntry(dailyTip)}
              className="cursor-pointer group relative overflow-hidden rounded-xl border border-border bg-surface/40 backdrop-blur-sm p-8 transition-all hover:border-muted hover:shadow-2xl"
            >
              <div className="relative z-10">
                <div className="mb-3 flex items-center gap-2 text-xs font-mono text-muted">
                  <span className="text-muted">{dailyTip.date}</span>
                  <span>•</span>
                  <span className="uppercase tracking-wider">
                    {dailyTip.category}
                  </span>
                </div>
                <h2 className="text-2xl font-bold mb-3 text-text group-hover:text-ink transition-colors">
                  {dailyTip.title}
                </h2>
                <p className="text-muted line-clamp-2 max-w-3xl leading-relaxed group-hover:text-text">
                  {dailyTip.content}
                </p>
                <div className="mt-6 flex gap-2">
                  {dailyTip.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] uppercase tracking-wider font-semibold bg-bg border border-border px-2.5 py-1 rounded text-muted group-hover:border-border group-hover:text-text transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tags Filter */}
        <div className="flex flex-wrap gap-2 mb-10">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all border ${
                selectedTag === tag
                  ? "bg-accent border-accent text-on-accent font-bold"
                  : "bg-transparent border-border text-muted hover:border-muted hover:text-text"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Masonry-ish Grid */}
        {filteredEntries.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEntries.map((entry, idx) => {
              const isFeatured = idx === 0 && filteredEntries.length > 1;
              const isBreakPoint = idx > 0 && idx % 12 === 0;
              return (
                <div key={entry.id} className={isFeatured ? "lg:col-span-2" : ""}>
                  {isBreakPoint && (
                    <div className="lg:col-span-3 md:col-span-2 col-span-1 flex items-center gap-4 py-4 mb-6">
                      <div className="flex-1 h-px bg-border" />
                      <span className="text-xs font-mono text-muted uppercase tracking-widest px-3">
                        {idx} snippets — keep going
                      </span>
                      <div className="flex-1 h-px bg-border" />
                    </div>
                  )}
                  <div
                    onClick={() => setSelectedEntry(entry)}
                    className="group cursor-pointer flex flex-col justify-between border border-border bg-surface/20 backdrop-blur-sm rounded-2xl p-6 transition-all hover:border-muted hover:bg-surface/60 hover:-translate-y-1 h-full"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-[10px] font-mono text-muted uppercase">
                          {entry.date}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-bg border border-border text-[10px] font-medium text-muted uppercase">
                          {entry.category}
                        </span>
                      </div>
                      <h3 className={`font-bold text-text mb-2 group-hover:text-ink transition-colors ${isFeatured ? "text-xl" : "text-lg"}`}>
                        {entry.title}
                      </h3>
                      <p className="text-sm text-muted line-clamp-3 leading-relaxed mb-4">
                        {entry.content}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mt-auto">
                      {entry.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] text-muted bg-bg/50 px-1.5 py-0.5 rounded border border-border/50"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-24 border border-dashed border-border rounded-xl bg-surface/10">
            <h3 className="text-muted font-medium mb-1">No entries found</h3>
            <p className="text-sm text-muted mb-4">
              Try adjusting your search or filters.
            </p>
            <button
              onClick={() => {
                setSearch("");
                setSelectedTag("All");
              }}
              className="text-xs text-text border-b border-text pb-0.5 hover:opacity-80"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>

      {/* Modal Overlay */}
      <AnimatePresence>
        {selectedEntry && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedEntry(null)}
              className="absolute inset-0 bg-[color-mix(in_srgb,var(--bg)_80%,transparent)] backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-surface border border-border rounded-2xl shadow-2xl overflow-y-auto max-h-[85vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8 md:p-10">
                <div className="flex items-start justify-between mb-8">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 text-xs text-muted font-mono mb-2">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="h-3 w-3" />
                        {selectedEntry.date}
                      </span>
                      <span>•</span>
                      <span className="uppercase tracking-widest font-semibold text-text border border-border px-2 py-0.5 rounded">
                        {selectedEntry.category}
                      </span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold leading-tight text-text">
                      {selectedEntry.title}
                    </h2>
                  </div>
                  <button
                    onClick={() => setSelectedEntry(null)}
                    className="p-2 rounded-full hover:bg-border/60 text-muted hover:text-text transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="prose prose-invert max-w-none prose-p:text-muted prose-p:leading-relaxed prose-headings:text-text">
                  {/* Render content with line breaks, using Geist Mono for code */}
                  {selectedEntry.content.split("\n\n").map((paragraph, idx) => (
                    <p key={idx} className="font-mono text-sm">{paragraph}</p>
                  ))}
                </div>

                <div className="mt-10 pt-6 border-t border-border flex flex-wrap gap-2">
                  {selectedEntry.tags.map((tag) => (
                    <div
                      key={tag}
                      className="inline-flex items-center gap-1.5 rounded-md bg-bg border border-border px-3 py-1.5 text-xs font-medium text-text"
                    >
                      <Tag className="h-3 w-3 text-muted" />
                      {tag}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
