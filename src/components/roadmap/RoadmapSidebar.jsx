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
        "fixed right-0 top-14 z-40 h-[calc(100vh-3.5rem)] w-full overflow-y-auto border-l bg-background p-6 shadow-xl transition-transform duration-300 md:w-[400px]",
        isOpen ? "translate-x-0" : "translate-x-full"
      )}
    >
      <div className="mb-6 flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Step Details
        </span>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold">{node.data.title}</h2>
          <div className="mt-2 flex items-center gap-2">
            <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
              {node.data.time || "Self-paced"}
            </span>
            {isCompleted && (
              <span className="inline-flex items-center gap-1 rounded-full bg-green-500/10 px-2.5 py-0.5 text-xs font-medium text-green-600 dark:text-green-400">
                <CheckCircle2 className="h-3 w-3" />
                Completed
              </span>
            )}
          </div>
        </div>

        <div className="prose prose-sm dark:prose-invert">
          <p>{node.data.description}</p>
        </div>

        <div className="pt-4">
          <Button
            className={cn(
              "w-full gap-2",
              isCompleted && "bg-green-600 hover:bg-green-700 text-white"
            )}
            variant={isCompleted ? "default" : "default"}
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
          <div className="space-y-3 pt-6">
            <h3 className="font-semibold">Learning Resources</h3>
            <div className="grid gap-2">
              {node.data.resources.map((resource, i) => (
                <a
                  key={i}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-lg border p-3 transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
                    {resource.type === "video" ? (
                      <PlayCircle className="h-4 w-4" />
                    ) : (
                      <FileText className="h-4 w-4" />
                    )}
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <p className="truncate text-sm font-medium">
                      {resource.title}
                    </p>
                    <p className="text-xs text-muted-foreground capitalize">
                      {resource.type}
                    </p>
                  </div>
                  <ExternalLink className="h-4 w-4 text-muted-foreground" />
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
