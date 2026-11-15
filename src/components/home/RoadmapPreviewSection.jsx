import { Link, useNavigate } from "react-router-dom";
import { RoadmapCanvas } from "../roadmap/RoadmapCanvas";
import { rust } from "../../data/roadmaps/rust";

export default function RoadmapPreviewSection() {
  const navigate = useNavigate();

  // Completed the first 4 nodes of Rust
  const sampleCompletedNodes = ["1", "2", "3", "4"];
  const totalNodes = rust.nodes.length; // 13
  const progressPercent = (sampleCompletedNodes.length / totalNodes) * 100;

  return (
    <section className="relative z-10 border-t border-border bg-bg py-16">
      <div className="w-full max-w-[1440px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column (5/12): Top-aligned with window */}
          <div className="lg:col-span-5 max-w-md flex flex-col justify-between self-start">
            <div>
              <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-text mb-3">
                Roadmaps you can see.
              </h2>
              <p className="text-sm text-muted leading-relaxed mb-4 font-sans">
                Every roadmap is a graph of nodes. Open one for notes and curated links, mark it done, and watch the path fill in.
              </p>
              <Link
                to="/roadmap/rust"
                className="inline-flex items-center gap-1.5 font-mono text-xs text-accent hover:underline mb-8"
              >
                <span>Open the Rust roadmap &rarr;</span>
              </Link>
            </div>

            {/* Three plain mono lines separated by hairlines (no cards) */}
            <div className="border-t border-b border-border divide-y divide-border font-mono text-xs text-muted mt-2">
              <div className="py-2.5">Every node links to curated resources</div>
              <div className="py-2.5">Mark nodes done to earn XP</div>
              <div className="py-2.5">
                Progress saves in your browser, syncs when you sign in with GitHub
              </div>
            </div>
          </div>

          {/* Right Column (7/12): Window frame matching hero */}
          <div className="lg:col-span-7">
            <div
              onClick={() => navigate("/roadmap/rust")}
              className="rounded-[10px] border border-border bg-[var(--window-bg)] text-[var(--window-text)] overflow-hidden shadow-2xl transition-colors hover:border-accent/50 cursor-pointer group"
            >
              {/* Window title bar matching hero */}
              <div className="flex items-center justify-between px-3.5 py-2.5 border-b border-border bg-[color-mix(in_srgb,var(--window-bg)_80%,black)]">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                </div>
                <div className="font-mono text-[11px] text-muted tracking-wide">
                  devmap / roadmap / rust
                </div>
              </div>

              {/* Top bar inside: 4px amber progress bar + mono text + SAMPLE badge */}
              <div className="border-b border-border bg-[color-mix(in_srgb,var(--window-bg)_90%,black)]">
                <div className="h-1 bg-border w-full overflow-hidden">
                  <div
                    className="h-full bg-accent"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <div className="flex items-center justify-between px-3.5 py-2 font-mono text-xs">
                  <span className="text-muted">
                    {sampleCompletedNodes.length} / {totalNodes} nodes · sample
                  </span>
                  <span className="text-[10px] font-bold text-accent bg-accent/10 border border-accent/30 px-1.5 py-0.5 rounded-[2px] tracking-wider uppercase">
                    SAMPLE
                  </span>
                </div>
              </div>

              {/* Real read-only RoadmapCanvas (420px height) */}
              <div className="h-[420px] w-full relative">
                <RoadmapCanvas
                  initialNodes={rust.nodes}
                  initialEdges={rust.edges}
                  completedNodes={sampleCompletedNodes}
                  preview={true}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
