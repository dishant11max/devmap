import { useCallback, useEffect, useMemo } from "react";
import ReactFlow, {
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  MarkerType,
} from "reactflow";
import "reactflow/dist/style.css";
import NodeCard from "./NodeCard";

const nodeTypes = {
  roadmapNode: NodeCard,
};

export function RoadmapCanvas({
  initialNodes,
  initialEdges,
  onNodeClick,
  completedNodes,
}) {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  useEffect(() => {
    // Inject completion status into nodes
    const nodesWithStatus = initialNodes.map((node) => ({
      ...node,
      data: {
        ...node.data,
        isCompleted: completedNodes.includes(node.id),
      },
      // Force update by creating new object if status changes
    }));

    // Update edges style based on completion (optional: green edge if source is completed)
    const edgesWithStatus = initialEdges.map((edge) => {
      const sourceCompleted = completedNodes.includes(edge.source);
      return {
        ...edge,
        animated: !sourceCompleted, // Stop animation when done maybe? Or keep it.
        style: {
          stroke: sourceCompleted ? "#22c55e" : "#64748b",
          strokeWidth: 2,
        },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: sourceCompleted ? "#22c55e" : "#64748b",
        },
      };
    });

    setNodes(nodesWithStatus);
    setEdges(edgesWithStatus);
  }, [initialNodes, initialEdges, completedNodes, setNodes, setEdges]);

  return (
    <div className="h-full w-full bg-background/50">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        fitView
        minZoom={0.5}
        maxZoom={1.5}
        attributionPosition="bottom-right"
        className="dark:bg-background"
      >
        <Background gap={20} size={1} className="opacity-50" />
        <Controls className="bg-background border-border fill-foreground text-foreground" />
      </ReactFlow>
    </div>
  );
}
