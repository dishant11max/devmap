import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { Search, BookOpen, Clock } from "lucide-react";
import { languages } from "../data/languages";
import { roadmaps } from "../data/roadmaps";
import { Input } from "../components/ui/Input";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabase";

const DIFFICULTY_COLORS = {
  Beginner: "text-[#888] bg-[#1A1A1A] border-[rgba(255,255,255,0.06)]",
  Intermediate: "text-[#888] bg-[#1A1A1A] border-[rgba(255,255,255,0.06)]",
  Advanced: "text-white bg-[#222] border-[rgba(255,255,255,0.08)]",
};

export default function Languages() {
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [progressMap, setProgressMap] = useState({});

  // Fetch progress data
  useEffect(() => {
    let mounted = true;

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

      if (mounted) {
        setProgressMap(newProgressMap);
      }
    }

    loadProgress();

    return () => {
      mounted = false;
    };
  }, [user]);

  const categories = useMemo(
    () => ["All", ...new Set(languages.map((l) => l.category))],
    [],
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

  return (
    <div className="min-h-screen bg-[#08090A] text-white py-12 relative overflow-hidden">

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-white">
              Explore Roadmaps
            </h1>
            <p className="text-[#555] max-w-md">
              Choose a technology to start your learning journey. Track your
              progress as you go.
            </p>
          </div>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-3 h-4 w-4 text-[#555]" />
            <Input
              placeholder="Search languages..."
              className="pl-10 h-11 rounded-xl bg-[#111213] border-[rgba(255,255,255,0.06)] text-white placeholder:text-[#555] focus:border-[rgba(255,255,255,0.12)] focus:bg-[#1A1A1A] transition-all"
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
                  ? "bg-white text-black"
                  : "bg-[#111213] text-[#888] hover:text-white border border-[rgba(255,255,255,0.06)] hover:border-[rgba(255,255,255,0.12)]"
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
                <div className="flex h-full flex-col border border-[rgba(255,255,255,0.06)] bg-[#111213] rounded-xl p-5 transition-all duration-200 hover:border-[rgba(255,255,255,0.12)] hover:bg-[#1A1A1A]">
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className="h-10 w-10 rounded-lg border border-[rgba(255,255,255,0.06)] bg-[#1A1A1A] flex items-center justify-center text-xs font-black tracking-tight text-[#888] transition-all group-hover:text-white"
                    >
                      {lang.abbreviation || lang.name.substring(0, 2)}
                    </div>
                    <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded border ${DIFFICULTY_COLORS[lang.difficulty] || 'text-[#888] bg-[rgba(255,255,255,0.06)] border-[rgba(255,255,255,0.12)]'}`}>
                      {lang.difficulty}
                    </span>
                  </div>

                  <h3 className="mb-2 text-lg font-bold text-white group-hover:text-white transition-colors">
                    {lang.name}
                  </h3>

                  <p className="text-sm text-[#555] line-clamp-2 mb-5 min-h-[2.5rem] leading-relaxed">
                    {lang.description}
                  </p>

                  <div className="mt-auto space-y-4">
                    {/* Meta Info */}
                    <div className="flex items-center gap-4 text-xs font-medium text-[#555]">
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
                      <div className="flex justify-between text-[10px] font-medium uppercase tracking-wider text-[#555]">
                        <span>Progress</span>
                        <span className={progressPercent > 0 ? "text-white" : ""}>{progressPercent}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-[#333] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-white transition-all duration-500 ease-out"
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
            <div className="col-span-full py-20 text-center border border-dashed border-[rgba(255,255,255,0.06)] rounded-xl bg-[#111213]/20">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#111213] mb-4 border border-[rgba(255,255,255,0.06)]">
                <Search className="h-5 w-5 text-[#555]" />
              </div>
              <h3 className="text-lg font-medium text-white">
                No results found
              </h3>
              <p className="text-[#555] mt-1">
                Try adjusting your search or filters.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
