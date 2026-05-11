import { Link } from "react-router-dom";
import { ArrowRight, Code2, Map, Trophy, Cpu, BookOpen, Zap } from "lucide-react";
import { Button } from "../components/ui/Button";
import MinimalHero from "../components/ui/hero-minimalism";
import { languages } from "../data/languages";

const DIFFICULTY_COLORS = {
  Beginner: "text-[#888] bg-[#1A1A1A] border-[rgba(255,255,255,0.06)]",
  Intermediate: "text-[#888] bg-[#1A1A1A] border-[rgba(255,255,255,0.06)]",
  Advanced: "text-white bg-[#222] border-[rgba(255,255,255,0.08)]",
};

function AsymmetricFeatureSection() {
  return (
    <section className="relative py-24 z-10 bg-[#08090A]">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay" />
      <div className="container relative z-10">
        {/* Asymmetric grid: 1 large + 2 stacked */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {/* Large Featured Card */}
          <div className="md:col-span-3 group relative overflow-hidden rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[#111213] p-10 transition-all hover:border-[rgba(255,255,255,0.12)] hover:bg-[#1A1A1A]">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="relative z-10">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#1A1A1A] border border-[rgba(255,255,255,0.06)] group-hover:border-[rgba(255,255,255,0.12)] transition-all duration-300">
                <Map className="h-7 w-7 text-[#888] group-hover:text-white transition-colors" />
              </div>
              <h3 className="mb-3 text-2xl font-bold text-white">Structured Roadmaps</h3>
              <p className="text-[#888] leading-relaxed max-w-sm">
                Visual flowcharts that guide you from beginner concepts to advanced mastery. Every step is curated, no guesswork.
              </p>
              <Link to="/languages" className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-[#888] hover:text-white transition-colors">
                Explore Languages <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Right column: 2 stacked smaller cards */}
          <div className="md:col-span-2 flex flex-col gap-6">
            <div className="group flex-1 relative overflow-hidden rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[#111213] p-7 transition-all hover:border-[rgba(255,255,255,0.12)] hover:bg-[#1A1A1A]">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative z-10">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[#1A1A1A] border border-[rgba(255,255,255,0.06)] group-hover:border-[rgba(255,255,255,0.12)] transition-all duration-300">
                  <Code2 className="h-5 w-5 text-[#888] group-hover:text-white transition-colors" />
                </div>
                <h3 className="mb-2 font-bold text-white text-lg">Curated Resources</h3>
                <p className="text-sm text-[#555] leading-relaxed">
                  Hand-picked videos and docs. No fluff, just the best material.
                </p>
              </div>
            </div>

            <div className="group flex-1 relative overflow-hidden rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[#111213] p-7 transition-all hover:border-[rgba(255,255,255,0.12)] hover:bg-[#1A1A1A]">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative z-10">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[#1A1A1A] border border-[rgba(255,255,255,0.06)] group-hover:border-[rgba(255,255,255,0.12)] transition-all duration-300">
                  <Trophy className="h-5 w-5 text-[#888] group-hover:text-white transition-colors" />
                </div>
                <h3 className="mb-2 font-bold text-white text-lg">Track Progress</h3>
                <p className="text-sm text-[#555] leading-relaxed">
                  Mark steps as completed. XP, streaks, and badges — gamified learning.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CS Core Banner */}
        <Link to="/cs-core" className="mt-6 group block">
          <div className="relative overflow-hidden rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[#111213] p-6 transition-all hover:border-[rgba(255,255,255,0.12)] hover:bg-[#1A1A1A]">
            <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1A1A1A] border border-[rgba(255,255,255,0.06)] group-hover:border-[rgba(255,255,255,0.12)] transition-all">
                  <Cpu className="h-5 w-5 text-[#555] group-hover:text-white transition-colors" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#888]">New</span>
                  <p className="font-bold text-white">CS Core Tracks</p>
                  <p className="text-sm text-[#555]">Algorithms, OS, Networks, Databases, System Design & more</p>
                </div>
              </div>
              <ArrowRight className="h-5 w-5 text-[#555] group-hover:text-white group-hover:translate-x-1 transition-all" />
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}

export default function Home() {
  const featuredLanguages = languages.filter((l) => l.popular).slice(0, 6);

  return (
    <div className="flex flex-col bg-[#08090A]">
      {/* Hero Section */}
      <MinimalHero />

      {/* Asymmetric Features Section */}
      <AsymmetricFeatureSection />

      {/* Popular Languages */}
      <section className="relative z-10 bg-[#111213]/20 py-28 border-t border-[rgba(255,255,255,0.06)]/50">
        <div className="container">
          <div className="mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-white text-balance">
                Start your journey today
              </h2>
              <p className="mt-3 text-[#555] max-w-md">
                Pick a language and dive in immediately. Every roadmap is structured for real progress.
              </p>
            </div>
            <Link to="/languages">
              <Button
                variant="outline"
                className="rounded-full border-[rgba(255,255,255,0.12)] text-white hover:bg-white hover:text-black hover:border-white transition-all gap-2 shrink-0"
              >
                View All <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
            {featuredLanguages.map((lang) => {
              const difficultyClass = DIFFICULTY_COLORS[lang.difficulty] || "text-[#888] bg-[rgba(255,255,255,0.06)] border-[rgba(255,255,255,0.12)]";

              return (
                <Link key={lang.id} to={`/roadmap/${lang.id}`} className="group">
                  <div className="h-full border border-[rgba(255,255,255,0.06)] bg-[#111213]/40 backdrop-blur-sm rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#555] hover:shadow-2xl hover:shadow-black/50">
                    {/* Header row */}
                    <div className="flex items-start justify-between mb-5">
                      <div
                        className="flex h-12 w-12 items-center justify-center rounded-xl border border-[rgba(255,255,255,0.06)] bg-[#111213]/50 text-sm font-black tracking-tight text-white transition-all duration-300 group-hover:border-[#555] group-hover:text-white"
                      >
                        {lang.abbreviation}
                      </div>
                      <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded border ${difficultyClass}`}>
                        {lang.difficulty}
                      </span>
                    </div>

                    <h3 className="mb-1.5 text-lg font-bold text-white group-hover:text-white transition-colors">
                      {lang.name}
                    </h3>
                    <p className="text-sm text-[#555] line-clamp-2 leading-relaxed">
                      {lang.description}
                    </p>

                    <div className="mt-5 flex items-center gap-3 text-xs text-[#555]">
                      <span className="flex items-center gap-1">
                        <BookOpen className="h-3 w-3" /> {lang.steps} steps
                      </span>
                      <span>•</span>
                      <span>{lang.estimatedTime}</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
