import { Link } from "react-router-dom";
import { Button } from "./Button";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const defaultAchievements = [
  { label: "Companies Supported", value: "300+" },
  { label: "Projects Finalized", value: "800+" },
  { label: "Happy Customers", value: "99%" },
  { label: "Recognized Awards", value: "10+" },
];

export default function AboutPage({ achievements = defaultAchievements }) {
  return (
    <div className="flex flex-col overflow-hidden relative">
      {/* Background Grid Pattern (Themed) */}
      <div className="absolute inset-0 pointer-events-none -z-10 bg-background">
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.1] dark:opacity-[0.2]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="grid-about"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 60 0 L 0 0 0 60"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect
            width="100%"
            height="100%"
            fill="url(#grid-about)"
            className="text-foreground"
          />
        </svg>
        {/* Gradual fade at the bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background"></div>
      </div>

      {/* ---------------- HERO SECTION ---------------- */}
      <section className="py-20 md:py-32 relative">
        <div className="mx-auto max-w-4xl space-y-8 px-6 text-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight tracking-tight">
              The <span className="text-primary">DevMap</span>
              <br />
              Ecosystem
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              DevMap is evolving to be more than just a list of links. It
              supports an entire ecosystem — from structured learning paths to
              curated resources helping developers master new skills.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button asChild size="lg" className="rounded-full">
                <Link to="/languages">
                  Start Learning <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-full"
              >
                <Link to="/resources">View Resources</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- ABOUT SECTION ---------------- */}
      <section className="py-20 md:py-28 bg-muted/30 border-t border-border/40">
        <div className="mx-auto max-w-6xl space-y-16 px-6">
          {/* Header */}
          <div className="grid gap-6 text-center md:grid-cols-2 md:gap-12 md:text-left items-center">
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight">
              About Our Mission
            </h2>
            <p className="text-muted-foreground text-lg">
              DevMap is a passionate community dedicated to creating educational
              solutions that empower developers to thrive in the digital age.
            </p>
          </div>

          {/* ---------------- LAST THREE CARDS ---------------- */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {/* CARD 1: Accelerate Growth */}
            <motion.div
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="flex flex-col overflow-hidden rounded-2xl bg-card border border-border shadow-sm hover:shadow-md transition-all p-8"
            >
              <div className="mb-6 h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  ></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Accelerate Growth</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed flex-1">
                Our roadmaps drive learning, efficiency, and measurable progress
                for developers. We cut through the noise to bring you exactly
                what you need.
              </p>
              <Button variant="secondary" className="mt-auto w-full md:w-auto">
                <Link to="/languages">View Roadmaps</Link>
              </Button>
            </motion.div>

            {/* CARD 2: Future Ready */}
            <motion.div
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="flex flex-col overflow-hidden rounded-2xl bg-card border border-border shadow-sm hover:shadow-md transition-all p-8"
            >
              <div className="mb-6 h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                  ></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Future-Ready Skills</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed flex-1">
                Curated content for modern stacks, combining theory and
                practice. Stay ahead of the curve with constantly updated
                resources.
              </p>
              <Button
                variant="outline"
                className="mt-auto w-full md:w-auto"
                asChild
              >
                <Link to="/resources">Browse Resources</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
