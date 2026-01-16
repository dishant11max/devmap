import { Link } from "react-router-dom";
import { ArrowRight, Code2, Map, Trophy } from "lucide-react";
import { Button } from "../components/ui/Button";
import { LiquidButton } from "../components/ui/liquid-glass-button";
import MinimalHero from "../components/ui/hero-minimalism";
import { languages } from "../data/languages";
import { Card, CardContent } from "../components/ui/Card";

function FeatureCard({ icon: Icon, title, description }) {
  return (
    <Card className="border/50 bg-background/60 shadow-none backdrop-blur-sm transition-all hover:bg-accent/50 z-10">
      <CardContent className="pt-6 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/5 ring-1 ring-primary/10">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <h3 className="mb-2 font-bold">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}

export default function Home() {
  const featuredLanguages = languages.filter((l) => l.popular).slice(0, 6);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <MinimalHero />

      {/* Features Section */}
      <section className="relative py-24 z-10 bg-background">
        <div className="container">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
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
      <section className="relative z-10 bg-muted/30 py-24">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-balance">
              Start your journey today
            </h2>
            <p className="mt-4 text-muted-foreground">
              Pick a language and start learning immediately.
            </p>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
            {featuredLanguages.map((lang) => (
              <Link key={lang.id} to={`/roadmap/${lang.id}`}>
                <Card className="h-full border-muted-foreground/10 bg-background/50 transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5">
                  <CardContent className="flex flex-col items-center p-6 text-center">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary text-2xl font-bold text-primary">
                      {lang.abbreviation}
                    </div>
                    <h3 className="mb-2 text-xl font-bold">{lang.name}</h3>
                    <p className="mb-4 text-sm text-muted-foreground line-clamp-2">
                      {lang.description}
                    </p>
                    <div className="mt-auto flex items-center gap-2 text-xs font-medium text-muted-foreground">
                      <span className="rounded-full bg-secondary px-2.5 py-0.5">
                        {lang.difficulty}
                      </span>
                      <span>•</span>
                      <span>{lang.estimatedTime}</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link to="/languages">
              <Button variant="outline" className="rounded-full">
                View All Languages
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
