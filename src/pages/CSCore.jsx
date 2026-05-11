import { Link } from "react-router-dom";
import { Cpu, ArrowRight, BookOpen, Clock, Zap, Map, Network, Server, HardDrive, BarChart2, Wrench, Brain } from "lucide-react";
import { csCoreRoadmaps } from "../data/csCore";

const TRACK_ICONS = {
  algorithms: Zap,
  networks: Network,
  "operating-systems": Server,
  databases: HardDrive,
  "system-design": BarChart2,
  "computer-architecture": Wrench,
  "ai-ml": Brain,
};

export default function CSCore() {
  return (
    <div className="min-h-screen bg-[#08090A] text-white py-16 relative">
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        {/* Header */}
        <div className="mb-16 border-b border-[rgba(255,255,255,0.06)] pb-10">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#555] mb-4 font-mono">
            CS CORE
          </p>
          <h1 className="text-4xl font-black tracking-tight text-white mb-4">
            Computer Science Fundamentals
          </h1>
          <p className="text-[#888] max-w-2xl text-lg leading-relaxed">
            The tracks that separate good engineers from great ones. Algorithms, systems, networks, and beyond.
          </p>
        </div>

        {/* Why CS Core */}
        <div className="mb-16">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#555] mb-6 font-mono">
            WHY CS CORE?
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                title: "For Interview Prep",
                desc: "Algorithms & System Design are the backbone of FAANG and top-tier engineering interviews.",
              },
              {
                title: "For CS Students",
                desc: "Bridge the gap between theory and practice. Apply OS, Networks, and Architecture concepts in real projects.",
              },
              {
                title: "For Self-taught Devs",
                desc: "Level up beyond syntax and frameworks. Understanding the system makes everything else click.",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border border-[rgba(255,255,255,0.06)] bg-[#111213] p-6 hover:border-[rgba(255,255,255,0.12)] hover:bg-[#1A1A1A] transition-all">
                <p className="text-sm font-bold mb-2 text-white">{item.title}</p>
                <p className="text-sm text-[#888] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Track Grid */}
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#555] mb-6 font-mono">
          {csCoreRoadmaps.length} TRACKS AVAILABLE
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
          {csCoreRoadmaps.map((track, idx) => {
            const TrackIcon = TRACK_ICONS[track.id] || Cpu;
            const num = String(idx + 1).padStart(1, "0");

            return (
              <Link
                key={track.id}
                to={`/roadmap/${track.id}`}
                className="group"
              >
                <div className="h-full relative overflow-hidden rounded-xl border border-[rgba(255,255,255,0.06)] bg-[#111213] p-7 transition-all duration-200 hover:border-[rgba(255,255,255,0.12)] hover:bg-[#1A1A1A]">
                  <div className="relative z-10">
                    {/* Header row */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[rgba(255,255,255,0.06)] bg-[#1A1A1A] text-[#888] group-hover:text-white transition-colors">
                        <TrackIcon className="h-5 w-5" />
                      </div>
                      <span className="text-[10px] uppercase font-semibold tracking-wider px-2 py-1 rounded bg-[#1A1A1A] border border-[rgba(255,255,255,0.06)] text-[#888]">
                        {track.difficulty}
                      </span>
                    </div>

                    {/* Title */}
                    <p className="text-[11px] font-mono text-[#555] mb-1">{num}.0</p>
                    <h3 className="font-bold text-white text-lg mb-2 group-hover:text-white transition-colors">
                      {track.name}
                    </h3>
                    <p className="text-sm text-[#555] leading-relaxed mb-6 line-clamp-2">
                      {track.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {track.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-medium uppercase tracking-wider px-2 py-0.5 rounded bg-[#222] text-[#888] border border-[rgba(255,255,255,0.06)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Meta + CTA */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-xs text-[#555]">
                        <span className="flex items-center gap-1">
                          <BookOpen className="h-3 w-3" /> {track.steps} steps
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" /> {track.estimatedTime}
                        </span>
                      </div>
                      <span className="text-xs font-medium text-[#555] flex items-center gap-1 group-hover:text-white transition-colors">
                        View Roadmap <ArrowRight className="h-3 w-3" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
