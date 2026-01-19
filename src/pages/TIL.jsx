import { useState, useEffect } from "react";
import { tilEntries } from "../data/til";
import { getDailyTIL } from "../utils/dailyAlgo";
import { TILCard } from "../components/ui/TILCard";
import { BookOpen, Search, X, Calendar, Tag, Lightbulb } from "lucide-react";
import { Input } from "../components/ui/Input";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "../components/ui/Card";

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
    <div className="min-h-screen bg-background text-foreground py-16 relative">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-border/40 pb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <BookOpen className="h-6 w-6 text-primary" />
              <h1 className="text-3xl font-bold tracking-tight">
                Today I Learned
              </h1>
            </div>
            <p className="text-muted-foreground max-w-xl">
              Small snippets of knowledge, verified facts, and code tricks.
            </p>
          </div>

          <div className="w-full md:w-auto flex flex-col sm:flex-row gap-3">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search..."
                className="pl-9 bg-secondary/20 border-border/50 focus:border-primary/50"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Daily Spotlight Section */}
        {dailyTip && !search && selectedTag === "All" && (
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-4 text-primary font-bold tracking-wide text-sm uppercase">
              <Lightbulb className="h-4 w-4" />
              <span>Daily Spotlight</span>
            </div>
            <div
              onClick={() => setSelectedEntry(dailyTip)}
              className="cursor-pointer group relative overflow-hidden rounded-xl border border-primary/20 bg-gradient-to-br from-primary/10 via-background to-background p-6 transition-all hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="relative z-10">
                <div className="mb-2 flex items-center gap-2 text-xs font-mono text-primary/80">
                  <span>{dailyTip.date}</span>
                  <span>•</span>
                  <span className="uppercase">{dailyTip.category}</span>
                </div>
                <h2 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                  {dailyTip.title}
                </h2>
                <p className="text-muted-foreground line-clamp-2 max-w-3xl">
                  {dailyTip.content}
                </p>
                <div className="mt-4 flex gap-2">
                  {dailyTip.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono bg-background/50 border border-primary/10 px-2 py-1 rounded text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 h-32 w-32 bg-primary/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2"></div>
            </div>
          </div>
        )}

        {/* Tags Filter */}
        <div className="flex flex-wrap gap-2 mb-10">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3 py-1 text-xs font-mono rounded-sm transition-all border ${
                selectedTag === tag
                  ? "bg-primary/10 border-primary/30 text-primary"
                  : "bg-transparent border-border/50 text-muted-foreground hover:border-primary/30 hover:text-foreground"
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
              <TILCard
                key={entry.id}
                entry={entry}
                onClick={() => setSelectedEntry(entry)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 border border-dashed border-border rounded-lg bg-muted/5">
            <p className="text-muted-foreground">
              No entries found matching your criteria.
            </p>
            <button
              onClick={() => {
                setSearch("");
                setSelectedTag("All");
              }}
              className="text-sm text-primary mt-2 hover:underline"
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
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-card border border-border rounded-xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 md:p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono mb-2">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {selectedEntry.date}
                      </span>
                      <span>•</span>
                      <span className="uppercase tracking-widest font-semibold text-primary">
                        {selectedEntry.category}
                      </span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold leading-tight">
                      {selectedEntry.title}
                    </h2>
                  </div>
                  <button
                    onClick={() => setSelectedEntry(null)}
                    className="p-2 rounded-full hover:bg-secondary/50 transition-colors"
                  >
                    <X className="h-5 w-5 text-muted-foreground" />
                  </button>
                </div>

                <div className="prose prose-zinc dark:prose-invert max-w-none">
                  {/* Render content with line breaks */}
                  {selectedEntry.content.split("\n\n").map((paragraph, idx) => (
                    <p
                      key={idx}
                      className="text-base text-muted-foreground leading-relaxed mb-4"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-border flex flex-wrap gap-2">
                  {selectedEntry.tags.map((tag) => (
                    <div
                      key={tag}
                      className="inline-flex items-center gap-1.5 rounded-full bg-secondary/30 px-3 py-1 text-xs font-medium text-secondary-foreground"
                    >
                      <Tag className="h-3 w-3 opacity-60" />
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
