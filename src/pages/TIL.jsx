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
    <div className="min-h-screen bg-[#08090A] text-white py-16 relative">

      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        {/* Header Section */}
        <div className="mb-12 border-b border-[rgba(255,255,255,0.06)] pb-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <BookOpen className="h-6 w-6 text-white" />
                <h1 className="text-3xl font-bold tracking-tight text-white">
                  Today I Learned
                </h1>
              </div>
              <p className="text-[#555] max-w-xl">
                Small snippets of knowledge, verified facts, and code tricks.
              </p>
            </div>
          </div>
          {/* Prominent search bar — full width below title */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#555]" />
            <Input
              type="text"
              placeholder="Search snippets... (try 'React', 'SQL', 'Git')"
              className="pl-11 h-12 w-full bg-[#111213] border-[rgba(255,255,255,0.06)] text-white focus:border-[rgba(255,255,255,0.12)] focus:bg-[#1A1A1A] transition-all rounded-xl placeholder:text-[#555] text-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#555] hover:text-white transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* Daily Spotlight Section */}
        {dailyTip && !search && selectedTag === "All" && (
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-4 text-[#888] font-bold tracking-wide text-xs uppercase pl-1">
              <Lightbulb className="h-3.5 w-3.5 text-white" />
              <span>Daily Spotlight</span>
            </div>
            <div
              onClick={() => setSelectedEntry(dailyTip)}
              className="cursor-pointer group relative overflow-hidden rounded-xl border border-[rgba(255,255,255,0.06)] bg-[#111213]/40 backdrop-blur-sm p-8 transition-all hover:border-[#555] hover:shadow-2xl hover:shadow-black/50"
            >
              <div className="relative z-10">
                <div className="mb-3 flex items-center gap-2 text-xs font-mono text-[#555]">
                  <span className="text-[#888]">{dailyTip.date}</span>
                  <span>•</span>
                  <span className="uppercase tracking-wider">
                    {dailyTip.category}
                  </span>
                </div>
                <h2 className="text-2xl font-bold mb-3 text-white group-hover:text-white transition-colors">
                  {dailyTip.title}
                </h2>
                <p className="text-[#888] line-clamp-2 max-w-3xl leading-relaxed group-hover:text-white">
                  {dailyTip.content}
                </p>
                <div className="mt-6 flex gap-2">
                  {dailyTip.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] uppercase tracking-wider font-semibold bg-[#08090A] border border-[rgba(255,255,255,0.06)] px-2.5 py-1 rounded text-[#888] group-hover:border-[rgba(255,255,255,0.12)] group-hover:text-white transition-colors"
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
                  ? "bg-white border-white text-black font-bold"
                  : "bg-transparent border-[rgba(255,255,255,0.06)] text-[#555] hover:border-[rgba(255,255,255,0.12)] hover:text-white"
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
                <>
                  {isBreakPoint && (
                    <div key={`break-${idx}`} className="lg:col-span-3 md:col-span-2 col-span-1 flex items-center gap-4 py-4">
                      <div className="flex-1 h-px bg-[rgba(255,255,255,0.06)]" />
                      <span className="text-xs font-mono text-[#555] uppercase tracking-widest px-3">
                        {idx} snippets — keep going
                      </span>
                      <div className="flex-1 h-px bg-[rgba(255,255,255,0.06)]" />
                    </div>
                  )}
                  <div
                    key={entry.id}
                    onClick={() => setSelectedEntry(entry)}
                    className={`group cursor-pointer flex flex-col justify-between border border-[rgba(255,255,255,0.06)] bg-[#111213]/20 backdrop-blur-sm rounded-2xl p-6 transition-all hover:border-[#555] hover:bg-[#111213]/60 hover:-translate-y-1 ${
                      isFeatured ? "lg:col-span-2" : ""
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-[10px] font-mono text-[#555] uppercase">
                          {entry.date}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-[#111213] border border-[rgba(255,255,255,0.06)] text-[10px] font-medium text-[#888] uppercase">
                          {entry.category}
                        </span>
                      </div>
                      <h3 className={`font-bold text-white mb-2 group-hover:text-white transition-colors ${isFeatured ? "text-xl" : "text-lg"}`}>
                        {entry.title}
                      </h3>
                      <p className="text-sm text-[#555] line-clamp-3 leading-relaxed mb-4">
                        {entry.content}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mt-auto">
                      {entry.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] text-[#555] bg-[#08090A]/50 px-1.5 py-0.5 rounded border border-[rgba(255,255,255,0.06)]/50"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-24 border border-dashed border-[rgba(255,255,255,0.06)] rounded-xl bg-[#111213]/10">
            <h3 className="text-[#888] font-medium mb-1">No entries found</h3>
            <p className="text-sm text-[#555] mb-4">
              Try adjusting your search or filters.
            </p>
            <button
              onClick={() => {
                setSearch("");
                setSelectedTag("All");
              }}
              className="text-xs text-white border-b border-white pb-0.5 hover:opacity-80"
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
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-[#08090A] border border-[rgba(255,255,255,0.06)] rounded-2xl shadow-2xl shadow-black overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8 md:p-10">
                <div className="flex items-start justify-between mb-8">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 text-xs text-[#555] font-mono mb-2">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="h-3 w-3" />
                        {selectedEntry.date}
                      </span>
                      <span>•</span>
                      <span className="uppercase tracking-widest font-semibold text-white border border-[rgba(255,255,255,0.06)] px-2 py-0.5 rounded">
                        {selectedEntry.category}
                      </span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold leading-tight text-white">
                      {selectedEntry.title}
                    </h2>
                  </div>
                  <button
                    onClick={() => setSelectedEntry(null)}
                    className="p-2 rounded-full hover:bg-[#111213] text-[#555] hover:text-white transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="prose prose-invert max-w-none prose-p:text-[#888] prose-p:leading-relaxed prose-headings:text-white">
                  {/* Render content with line breaks, using Geist Mono for code */}
                  {selectedEntry.content.split("\n\n").map((paragraph, idx) => (
                    <p key={idx} className="font-mono text-sm">{paragraph}</p>
                  ))}
                </div>

                <div className="mt-10 pt-6 border-t border-[#111213] flex flex-wrap gap-2">
                  {selectedEntry.tags.map((tag) => (
                    <div
                      key={tag}
                      className="inline-flex items-center gap-1.5 rounded-md bg-[#111213] border border-[rgba(255,255,255,0.06)] px-3 py-1.5 text-xs font-medium text-white"
                    >
                      <Tag className="h-3 w-3 text-[#555]" />
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
