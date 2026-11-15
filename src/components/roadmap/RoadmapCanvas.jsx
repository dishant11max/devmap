import { useEffect } from "react";
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
  initialNodes = [],
  initialEdges = [],
  onNodeClick,
  completedNodes = [],
  preview = false,
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
    }));

    // Themed edges: completed = var(--accent), pending = var(--border), 1.5px, no animation
    const edgesWithStatus = initialEdges.map((edge) => {
      const sourceCompleted = completedNodes.includes(edge.source);
      return {
        ...edge,
        animated: false,
        style: {
          stroke: sourceCompleted ? "var(--accent)" : "var(--border)",
          strokeWidth: 1.5,
        },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: sourceCompleted ? "var(--accent)" : "var(--border)",
          width: 14,
          height: 14,
        },
      };
    });

    setNodes(nodesWithStatus);
    setEdges(edgesWithStatus);
  }, [initialNodes, initialEdges, completedNodes, setNodes, setEdges]);

  return (
    <div className="h-full w-full bg-bg">
      {preview ? (
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          fitView
          panOnDrag={false}
          zoomOnScroll={false}
          zoomOnPinch={false}
          zoomOnDoubleClick={false}
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable={false}
          preventScrolling={false}
          attributionPosition="bottom-right"
          className="bg-bg"
        >
          <Background gap={24} size={1} color="var(--border)" className="opacity-40" />
        </ReactFlow>
      ) : (
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
          className="bg-bg"
        >
          <Background gap={24} size={1} color="var(--border)" className="opacity-40" />
          <Controls className="bg-surface border-border fill-text text-text" />
        </ReactFlow>
      )}
    </div>
  );
}
