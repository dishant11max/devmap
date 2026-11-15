import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useRoadmapProgress } from "../hooks/useRoadmapProgress";
import { RoadmapCanvas } from "../components/roadmap/RoadmapCanvas";
import { RoadmapSidebar } from "../components/roadmap/RoadmapSidebar";
import { ProgressBar } from "../components/ui/ProgressBar";
import { roadmaps } from "../data/roadmaps";
import { Button } from "../components/ui/Button";
import { ArrowLeft, RefreshCcw, CheckCircle2 } from "lucide-react";

export default function RoadmapViewer() {
  const { languageSlug } = useParams();
  const navigate = useNavigate();
  const { completedNodes, toggleNode, isCompleted, resetProgress } =
    useRoadmapProgress(languageSlug);

  const [selectedNode, setSelectedNode] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const roadmapData = roadmaps[languageSlug];

  useEffect(() => {
    // Reset selection on language change
    setSelectedNode(null);
    setIsSidebarOpen(false);
  }, [languageSlug]);

  if (!roadmapData) {
    return (
      <div className="flex h-[50vh] flex-col items-center justify-center gap-4 bg-bg text-text">
        <h1 className="text-2xl font-bold">Roadmap not found</h1>
        <Button
          onClick={() => navigate(-1)}
          variant="outline"
          className="border-border text-text"
        >
          Go Back
        </Button>
      </div>
    );
  }

  const handleNodeClick = (_, node) => {
    setSelectedNode(node);
    setIsSidebarOpen(true);
  };

  const handleToggleComplete = (nodeId) => {
    toggleNode(nodeId);
    // Update selected node data locally to reflect change immediately in sidebar
    if (selectedNode && selectedNode.id === nodeId) {
      // logic handled by hook + re-render, sidebar checks hook directly or props
    }
  };

  const totalSteps = roadmapData.nodes.length;
  const completedCount = completedNodes.filter((id) =>
    roadmapData.nodes.find((n) => n.id === id),
  ).length;
  const progress = totalSteps > 0 ? (completedCount / totalSteps) * 100 : 0;

  return (
    <div className="relative flex h-[calc(100vh-3.5rem)] flex-col overflow-hidden bg-bg text-text selection:bg-accent selection:text-on-accent">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(var(--border)_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />

      {/* Top Bar - Floating Glass */}
      <div className="absolute top-4 left-4 right-4 z-40 flex items-center justify-between bg-surface/80 backdrop-blur-md border border-border rounded-xl px-4 py-3 shadow-2xl">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="text-muted hover:text-text hover:bg-border/50 rounded-full h-8 w-8"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <h1 className="text-sm font-bold leading-none text-text tracking-wide uppercase">
                {roadmapData.displayName}
              </h1>
              <span className="text-[10px] bg-bg text-muted px-1.5 py-0.5 rounded border border-border">
                Roadmap
              </span>
            </div>
            <p className="text-[10px] text-muted font-mono mt-0.5">
              {completedCount}/{totalSteps} modules completed
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 sm:gap-6">
          {/* Progress Segment */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden sm:block w-24 md:w-32 h-1.5 bg-border rounded-full overflow-hidden">
              <div
                className="h-full bg-accent transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-xs font-mono font-medium text-text w-9 text-right">
              {Math.round(progress)}%
            </span>
          </div>

          <div className="h-4 w-[1px] bg-border" />

          <Button
            variant="ghost"
            size="icon"
            onClick={resetProgress}
            title="Reset Progress"
            className="text-muted hover:text-red-400 hover:bg-border/50 rounded-full h-8 w-8"
          >
            <RefreshCcw className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative flex-1">
        <RoadmapCanvas
          initialNodes={roadmapData.nodes}
          initialEdges={roadmapData.edges}
          onNodeClick={handleNodeClick}
          completedNodes={completedNodes}
        />

        <RoadmapSidebar
          node={selectedNode}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          onToggleComplete={handleToggleComplete}
          isCompleted={selectedNode ? isCompleted(selectedNode.id) : false}
        />
      </div>
    </div>
  );
}
