import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useRoadmapProgress } from "../hooks/useRoadmapProgress";
import { RoadmapCanvas } from "../components/roadmap/RoadmapCanvas";
import { RoadmapSidebar } from "../components/roadmap/RoadmapSidebar";
import { ProgressBar } from "../components/ui/ProgressBar";
import { roadmaps } from "../data/roadmaps";
import { Button } from "../components/ui/Button";
import { ArrowLeft, RefreshCcw } from "lucide-react";

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
      <div className="flex h-[50vh] flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Roadmap not found</h1>
        <Button onClick={() => navigate("/languages")}>
          Back to Languages
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
    roadmapData.nodes.find((n) => n.id === id)
  ).length;
  const progress = totalSteps > 0 ? (completedCount / totalSteps) * 100 : 0;

  return (
    <div className="relative flex h-[calc(100vh-3.5rem)] flex-col overflow-hidden">
      {/* Top Bar */}
      <div className="flex items-center justify-between border-b bg-background px-6 py-3">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/languages")}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-lg font-bold leading-none">
              {roadmapData.displayName}
            </h1>
            <p className="text-xs text-muted-foreground">
              {completedCount} of {totalSteps} steps completed
            </p>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-end gap-4 md:max-w-md">
          <ProgressBar value={progress} className="max-w-[150px]" />
          <span className="text-sm font-medium">{Math.round(progress)}%</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={resetProgress}
            title="Reset Progress"
          >
            <RefreshCcw className="h-4 w-4" />
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
