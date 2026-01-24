import { Link } from "react-router-dom";
import { Button } from "./Button";
import { ChevronRight, TrendingUp, Beaker } from "lucide-react";
import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <div className="flex flex-col overflow-hidden relative bg-[#050505] text-zinc-100 min-h-screen">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:32px_32px] opacity-30 pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay" />

      {/* ---------------- HERO SECTION ---------------- */}
      <section className="py-24 md:py-36 relative z-10">
        <div className="mx-auto max-w-4xl space-y-8 px-6 text-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight">
              The <span className="text-zinc-400">DevMap</span>
              <br />
              Ecosystem
            </h1>
            <p className="text-lg text-zinc-400 leading-relaxed max-w-2xl mx-auto">
              DevMap is evolving to be more than just a list of links. It
              supports an entire ecosystem — from structured learning paths to
              curated resources helping developers master new skills.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Button
                asChild
                size="lg"
                className="rounded-full bg-white text-black hover:bg-zinc-200"
              >
                <Link to="/languages">
                  Start Learning <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-full border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white"
              >
                <Link to="/resources">View Resources</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- ABOUT SECTION ---------------- */}
      <section className="py-20 md:py-28 bg-zinc-900/30 border-t border-zinc-800 relative z-10">
        <div className="mx-auto max-w-6xl space-y-16 px-6">
          {/* Header */}
          <div className="grid gap-6 text-center md:grid-cols-2 md:gap-12 md:text-left items-center">
            <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight">
              About Our Mission
            </h2>
            <p className="text-zinc-400 text-lg">
              DevMap is a passionate community dedicated to creating educational
              solutions that empower developers to thrive in the digital age.
            </p>
          </div>

          {/* ---------------- CARDS ---------------- */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            {/* CARD 1: Accelerate Growth */}
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="flex flex-col overflow-hidden rounded-2xl bg-zinc-900/40 backdrop-blur-sm border border-zinc-800 hover:border-zinc-600 transition-all p-8"
            >
              <div className="mb-6 h-12 w-12 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-zinc-300" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">
                Accelerate Growth
              </h3>
              <p className="text-zinc-400 mb-6 leading-relaxed flex-1">
                Our roadmaps drive learning, efficiency, and measurable progress
                for developers. We cut through the noise to bring you exactly
                what you need.
              </p>
              <Button
                variant="secondary"
                className="mt-auto w-full md:w-auto bg-zinc-800 text-zinc-100 hover:bg-zinc-700 border-0"
              >
                <Link to="/languages">View Roadmaps</Link>
              </Button>
            </motion.div>

            {/* CARD 2: Future Ready */}
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="flex flex-col overflow-hidden rounded-2xl bg-zinc-900/40 backdrop-blur-sm border border-zinc-800 hover:border-zinc-600 transition-all p-8"
            >
              <div className="mb-6 h-12 w-12 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center">
                <Beaker className="w-5 h-5 text-zinc-300" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">
                Future-Ready Skills
              </h3>
              <p className="text-zinc-400 mb-6 leading-relaxed flex-1">
                Curated content for modern stacks, combining theory and
                practice. Stay ahead of the curve with constantly updated
                resources.
              </p>
              <Button
                variant="outline"
                className="mt-auto w-full md:w-auto border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white"
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
