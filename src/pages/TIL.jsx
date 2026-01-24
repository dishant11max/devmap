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
    <div className="min-h-screen bg-[#050505] text-zinc-100 py-16 relative selection:bg-white/20">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay fixed"></div>

      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-zinc-800 pb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <BookOpen className="h-6 w-6 text-white" />
              <h1 className="text-3xl font-bold tracking-tight text-white">
                Today I Learned
              </h1>
            </div>
            <p className="text-zinc-500 max-w-xl">
              Small snippets of knowledge, verified facts, and code tricks.
            </p>
          </div>

          <div className="w-full md:w-auto flex flex-col sm:flex-row gap-3">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
              <Input
                type="text"
                placeholder="Search snippets..."
                className="pl-10 h-10 bg-zinc-900/50 border-zinc-800 text-zinc-200 focus:border-white/20 focus:bg-zinc-900 transition-all rounded-lg placeholder:text-zinc-600"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Daily Spotlight Section */}
        {dailyTip && !search && selectedTag === "All" && (
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-4 text-zinc-400 font-bold tracking-wide text-xs uppercase pl-1">
              <Lightbulb className="h-3.5 w-3.5 text-white" />
              <span>Daily Spotlight</span>
            </div>
            <div
              onClick={() => setSelectedEntry(dailyTip)}
              className="cursor-pointer group relative overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/40 backdrop-blur-sm p-8 transition-all hover:border-zinc-500 hover:shadow-2xl hover:shadow-black/50"
            >
              <div className="relative z-10">
                <div className="mb-3 flex items-center gap-2 text-xs font-mono text-zinc-500">
                  <span className="text-zinc-400">{dailyTip.date}</span>
                  <span>•</span>
                  <span className="uppercase tracking-wider">
                    {dailyTip.category}
                  </span>
                </div>
                <h2 className="text-2xl font-bold mb-3 text-zinc-100 group-hover:text-white transition-colors">
                  {dailyTip.title}
                </h2>
                <p className="text-zinc-400 line-clamp-2 max-w-3xl leading-relaxed group-hover:text-zinc-300">
                  {dailyTip.content}
                </p>
                <div className="mt-6 flex gap-2">
                  {dailyTip.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] uppercase tracking-wider font-semibold bg-zinc-950 border border-zinc-800 px-2.5 py-1 rounded text-zinc-400 group-hover:border-zinc-700 group-hover:text-zinc-300 transition-colors"
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
                  ? "bg-zinc-100 border-zinc-100 text-black"
                  : "bg-transparent border-zinc-800 text-zinc-500 hover:border-zinc-600 hover:text-zinc-300"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Masonry-ish Grid */}
        {filteredEntries.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
            {filteredEntries.map((entry) => (
              <div
                key={entry.id}
                onClick={() => setSelectedEntry(entry)}
                className="group cursor-pointer flex flex-col justify-between border border-zinc-800 bg-zinc-900/20 backdrop-blur-sm rounded-xl p-6 transition-all hover:border-zinc-600 hover:bg-zinc-900/60 hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono text-zinc-600 uppercase">
                      {entry.date}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[10px] font-medium text-zinc-400 uppercase">
                      {entry.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-zinc-200 mb-2 group-hover:text-white transition-colors">
                    {entry.title}
                  </h3>
                  <p className="text-sm text-zinc-500 line-clamp-3 leading-relaxed mb-4">
                    {entry.content}
                  </p>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-auto">
                  {entry.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] text-zinc-600 bg-zinc-950/50 px-1.5 py-0.5 rounded border border-zinc-800/50"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 border border-dashed border-zinc-800 rounded-xl bg-zinc-900/10">
            <h3 className="text-zinc-400 font-medium mb-1">No entries found</h3>
            <p className="text-sm text-zinc-600 mb-4">
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
              className="relative w-full max-w-2xl bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl shadow-black overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8 md:p-10">
                <div className="flex items-start justify-between mb-8">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 text-xs text-zinc-500 font-mono mb-2">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="h-3 w-3" />
                        {selectedEntry.date}
                      </span>
                      <span>•</span>
                      <span className="uppercase tracking-widest font-semibold text-zinc-300 border border-zinc-800 px-2 py-0.5 rounded">
                        {selectedEntry.category}
                      </span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold leading-tight text-white">
                      {selectedEntry.title}
                    </h2>
                  </div>
                  <button
                    onClick={() => setSelectedEntry(null)}
                    className="p-2 rounded-full hover:bg-zinc-900 text-zinc-500 hover:text-white transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="prose prose-invert max-w-none prose-p:text-zinc-400 prose-p:leading-relaxed prose-headings:text-zinc-200">
                  {/* Render content with line breaks */}
                  {selectedEntry.content.split("\n\n").map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>

                <div className="mt-10 pt-6 border-t border-zinc-900 flex flex-wrap gap-2">
                  {selectedEntry.tags.map((tag) => (
                    <div
                      key={tag}
                      className="inline-flex items-center gap-1.5 rounded-md bg-zinc-900 border border-zinc-800 px-3 py-1.5 text-xs font-medium text-zinc-300"
                    >
                      <Tag className="h-3 w-3 text-zinc-600" />
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
