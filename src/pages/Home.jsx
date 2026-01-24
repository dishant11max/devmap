import { Link } from "react-router-dom";
import { ArrowRight, Code2, Map, Trophy } from "lucide-react";
import { Button } from "../components/ui/Button";
import { LiquidButton } from "../components/ui/liquid-glass-button";
import MinimalHero from "../components/ui/hero-minimalism";
import { languages } from "../data/languages";

function FeatureCard({ icon: Icon, title, description }) {
  return (
    <div className="group border border-zinc-800 bg-zinc-900/40 backdrop-blur-sm rounded-xl p-6 transition-all hover:border-zinc-600 hover:bg-zinc-900/80">
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-800 border border-zinc-700 group-hover:border-zinc-500 group-hover:bg-zinc-800/80 transition-colors">
        <Icon className="h-6 w-6 text-zinc-100" />
      </div>
      <h3 className="mb-2 font-bold text-white text-center">{title}</h3>
      <p className="text-sm text-zinc-400 text-center">{description}</p>
    </div>
  );
}

export default function Home() {
  const featuredLanguages = languages.filter((l) => l.popular).slice(0, 6);

  return (
    <div className="flex flex-col bg-[#050505]">
      {/* Hero Section */}
      <MinimalHero />

      {/* Features Section */}
      <section className="relative py-24 z-10 bg-[#050505]">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay"></div>
        <div className="container relative z-10">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <FeatureCard
              icon={Map}
              title="Structured Roadmaps"
              description="Visual flowcharts that guide you from beginner concepts to advanced mastery."
            />
            <FeatureCard
              icon={Code2}
              title="Curated Resources"
              description="Hand-picked videos and docs. No fluff, just the best learning material."
            />
            <FeatureCard
              icon={Trophy}
              title="Track Progress"
              description="Mark steps as completed. Your progress is saved automatically."
            />
          </div>
        </div>
      </section>

      {/* Popular Languages */}
      <section className="relative z-10 bg-zinc-900/20 py-24 border-t border-zinc-800/50">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white text-balance">
              Start your journey today
            </h2>
            <p className="mt-4 text-zinc-400">
              Pick a language and start learning immediately.
            </p>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
            {featuredLanguages.map((lang) => (
              <Link key={lang.id} to={`/roadmap/${lang.id}`}>
                <div className="group h-full border border-zinc-800 bg-zinc-900/40 backdrop-blur-sm rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-zinc-600 hover:shadow-2xl hover:shadow-black/50">
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-950 text-2xl font-bold text-white border border-zinc-800 group-hover:border-zinc-500 transition-colors">
                      {lang.abbreviation}
                    </div>
                    <h3 className="mb-2 text-xl font-bold text-white group-hover:text-zinc-300 transition-colors">
                      {lang.name}
                    </h3>
                    <p className="mb-4 text-sm text-zinc-500 line-clamp-2">
                      {lang.description}
                    </p>
                    <div className="mt-auto flex items-center gap-2 text-xs font-medium text-zinc-500">
                      <span className="rounded-full bg-zinc-900 px-2.5 py-0.5 border border-zinc-800">
                        {lang.difficulty}
                      </span>
                      <span>•</span>
                      <span>{lang.estimatedTime}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link to="/languages">
              <Button
                variant="outline"
                className="rounded-full border-zinc-700 text-zinc-300 hover:bg-zinc-100 hover:text-black hover:border-zinc-100 transition-all"
              >
                View All Languages
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
