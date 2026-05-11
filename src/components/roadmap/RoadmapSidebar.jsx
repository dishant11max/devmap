import {
  X,
  CheckCircle2,
  Circle,
  ExternalLink,
  PlayCircle,
  FileText,
} from "lucide-react";
import { Button } from "../ui/Button";
import { cn } from "../../utils/cn";

export function RoadmapSidebar({
  node,
  isOpen,
  onClose,
  onToggleComplete,
  isCompleted,
}) {
  if (!node) return null;

  return (
    <div
      className={cn(
        "fixed right-0 top-14 z-40 h-[calc(100vh-3.5rem)] w-full overflow-y-auto border-l border-[rgba(255,255,255,0.06)] bg-[#0a0a0a] p-6 shadow-2xl transition-transform duration-300 md:w-[400px]",
        isOpen ? "translate-x-0" : "translate-x-full",
      )}
    >
      <div className="mb-6 flex items-center justify-between">
        <span className="text-[10px] font-semibold uppercase tracking-widest text-[#555]">
          Step Details
        </span>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="h-8 w-8 text-[#888] hover:text-white hover:bg-[rgba(255,255,255,0.06)]"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-white">{node.data.title}</h2>
          <div className="mt-3 flex items-center gap-2">
            <span className="inline-flex items-center rounded-md border border-[rgba(255,255,255,0.06)] bg-[#111213] px-2.5 py-1 text-[10px] font-medium text-[#888] uppercase tracking-wide">
              {node.data.time || "Self-paced"}
            </span>
            {isCompleted && (
              <span className="inline-flex items-center gap-1 rounded-md bg-white/10 border border-white/20 px-2.5 py-1 text-[10px] font-medium text-white">
                <CheckCircle2 className="h-3 w-3" />
                Done
              </span>
            )}
          </div>
        </div>

        <div className="prose prose-sm prose-invert prose-p:text-[#888] prose-p:leading-relaxed">
          <p>{node.data.description}</p>
        </div>

        <div className="pt-4">
          <Button
            className={cn(
              "w-full gap-2 h-11 font-medium",
              isCompleted
                ? "bg-white text-black hover:bg-white"
                : "bg-[rgba(255,255,255,0.06)] text-white hover:bg-[rgba(255,255,255,0.12)] border border-[rgba(255,255,255,0.12)]",
            )}
            onClick={() => onToggleComplete(node.id)}
          >
            {isCompleted ? (
              <>
                <CheckCircle2 className="h-4 w-4" /> Completed
              </>
            ) : (
              <>
                <Circle className="h-4 w-4" /> Mark as Completed
              </>
            )}
          </Button>
        </div>

        {node.data.resources && node.data.resources.length > 0 && (
          <div className="space-y-3 pt-6 border-t border-[rgba(255,255,255,0.06)]">
            <h3 className="font-semibold text-sm text-white uppercase tracking-wide">
              Resources
            </h3>
            <div className="grid gap-2">
              {node.data.resources.map((resource, i) => (
                <a
                  key={i}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-lg border border-[rgba(255,255,255,0.06)] bg-[#111213]/50 p-3 transition-all hover:bg-[rgba(255,255,255,0.06)] hover:border-[#555] group"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.12)] text-[#888] group-hover:text-white group-hover:border-[#555] transition-colors">
                    {resource.type === "video" ? (
                      <PlayCircle className="h-4 w-4" />
                    ) : (
                      <FileText className="h-4 w-4" />
                    )}
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <p className="truncate text-sm font-medium text-white group-hover:text-white">
                      {resource.title}
                    </p>
                    <p className="text-[10px] text-[#555] capitalize uppercase tracking-wide">
                      {resource.type}
                    </p>
                  </div>
                  <ExternalLink className="h-3.5 w-3.5 text-[#555] group-hover:text-[#888] transition-colors" />
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
