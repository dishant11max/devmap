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
        "fixed right-0 top-14 z-40 h-[calc(100vh-3.5rem)] w-full overflow-y-auto border-l border-zinc-800 bg-[#0a0a0a] p-6 shadow-2xl transition-transform duration-300 md:w-[400px]",
        isOpen ? "translate-x-0" : "translate-x-full",
      )}
    >
      <div className="mb-6 flex items-center justify-between">
        <span className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
          Step Details
        </span>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="h-8 w-8 text-zinc-400 hover:text-white hover:bg-zinc-800"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-white">{node.data.title}</h2>
          <div className="mt-3 flex items-center gap-2">
            <span className="inline-flex items-center rounded-md border border-zinc-800 bg-zinc-900 px-2.5 py-1 text-[10px] font-medium text-zinc-400 uppercase tracking-wide">
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

        <div className="prose prose-sm prose-invert prose-p:text-zinc-400 prose-p:leading-relaxed">
          <p>{node.data.description}</p>
        </div>

        <div className="pt-4">
          <Button
            className={cn(
              "w-full gap-2 h-11 font-medium",
              isCompleted
                ? "bg-white text-black hover:bg-zinc-200"
                : "bg-zinc-800 text-zinc-100 hover:bg-zinc-700 border border-zinc-700",
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
          <div className="space-y-3 pt-6 border-t border-zinc-800">
            <h3 className="font-semibold text-sm text-zinc-300 uppercase tracking-wide">
              Resources
            </h3>
            <div className="grid gap-2">
              {node.data.resources.map((resource, i) => (
                <a
                  key={i}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-lg border border-zinc-800 bg-zinc-900/50 p-3 transition-all hover:bg-zinc-800 hover:border-zinc-600 group"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-400 group-hover:text-white group-hover:border-zinc-500 transition-colors">
                    {resource.type === "video" ? (
                      <PlayCircle className="h-4 w-4" />
                    ) : (
                      <FileText className="h-4 w-4" />
                    )}
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <p className="truncate text-sm font-medium text-zinc-200 group-hover:text-white">
                      {resource.title}
                    </p>
                    <p className="text-[10px] text-zinc-500 capitalize uppercase tracking-wide">
                      {resource.type}
                    </p>
                  </div>
                  <ExternalLink className="h-3.5 w-3.5 text-zinc-600 group-hover:text-zinc-400 transition-colors" />
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
