import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Code2, Clock, BookOpen } from "lucide-react";
import { languages } from "../data/languages";
import { roadmaps } from "../data/roadmaps";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabase";

export default function Languages() {
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [progressMap, setProgressMap] = useState({});

  // Fetch progress data
  useEffect(() => {
    async function loadProgress() {
      const newProgressMap = {};

      if (user) {
        // Fetch from Supabase
        const { data, error } = await supabase
          .from("user_progress")
          .select("language_slug")
          .eq("user_id", user.id);

        if (!error && data) {
          // Count completed nodes per language
          const counts = {};
          data.forEach((row) => {
            counts[row.language_slug] = (counts[row.language_slug] || 0) + 1;
          });

          Object.keys(counts).forEach((slug) => {
            newProgressMap[slug] = counts[slug];
          });
        }
      } else {
        // Fetch from LocalStorage
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
      setProgressMap(newProgressMap);
    }

    loadProgress();
  }, [user]);

  const categories = ["All", ...new Set(languages.map((l) => l.category))];

  const filteredLanguages = languages.filter((lang) => {
    const matchesSearch = lang.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || lang.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 py-12">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay fixed"></div>

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-white">
              Explore Roadmaps
            </h1>
            <p className="text-zinc-500 max-w-md">
              Choose a technology to start your learning journey. Track your
              progress as you go.
            </p>
          </div>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
            <Input
              placeholder="Search languages..."
              className="pl-10 h-11 rounded-xl bg-zinc-900/50 border-zinc-800 text-zinc-100 placeholder:text-zinc-600 focus:border-zinc-600 focus:bg-zinc-900 transition-all"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="mb-10 flex flex-nowrap overflow-x-auto pb-4 gap-2 no-scrollbar md:flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === cat
                  ? "bg-zinc-100 text-zinc-950"
                  : "bg-zinc-900/50 text-zinc-400 hover:text-zinc-200 border border-zinc-800 hover:border-zinc-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredLanguages.map((lang) => {
            const totalSteps =
              roadmaps[lang.id]?.nodes?.length || lang.steps || 20;
            const completedSteps = progressMap[lang.id] || 0;
            const progressPercent = Math.min(
              100,
              Math.round((completedSteps / totalSteps) * 100),
            );

            return (
              <Link
                key={lang.id}
                to={`/roadmap/${lang.id}`}
                className="group h-full"
              >
                <div className="flex h-full flex-col border border-zinc-800 bg-zinc-900/40 backdrop-blur-sm rounded-xl p-5 transition-all duration-300 hover:-translate-y-1 hover:border-zinc-600 hover:shadow-2xl hover:shadow-black/50">
                  <div className="flex items-start justify-between mb-4">
                    <div className="px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-xs font-medium text-zinc-400">
                      {lang.category}
                    </div>
                    <div className="h-8 w-8 rounded-lg bg-zinc-950 border border-zinc-800 flex items-center justify-center text-xs font-bold text-white group-hover:border-zinc-600 transition-colors">
                      {lang.abbreviation || lang.name.substring(0, 2)}
                    </div>
                  </div>

                  <h3 className="mb-2 text-xl font-bold text-zinc-100 group-hover:text-white transition-colors">
                    {lang.name}
                  </h3>

                  <p className="text-sm text-zinc-500 line-clamp-2 mb-6 min-h-[2.5rem]">
                    {lang.description}
                  </p>

                  <div className="mt-auto space-y-4">
                    {/* Meta Info */}
                    <div className="flex items-center gap-4 text-xs font-medium text-zinc-500">
                      <div className="flex items-center gap-1.5">
                        <BookOpen className="h-3.5 w-3.5" />
                        {totalSteps} Steps
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5" />
                        {lang.estimatedTime}
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-[10px] font-medium uppercase tracking-wider text-zinc-500">
                        <span>Progress</span>
                        <span>{progressPercent}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-zinc-200 transition-all duration-500 ease-out group-hover:bg-white"
                          style={{ width: `${progressPercent}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}

          {filteredLanguages.length === 0 && (
            <div className="col-span-full py-20 text-center border border-dashed border-zinc-800 rounded-xl bg-zinc-900/20">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-zinc-900 mb-4 border border-zinc-800">
                <Search className="h-5 w-5 text-zinc-500" />
              </div>
              <h3 className="text-lg font-medium text-zinc-300">
                No results found
              </h3>
              <p className="text-zinc-500 mt-1">
                Try adjusting your search or filters.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
