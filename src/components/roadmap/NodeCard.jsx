import { memo } from "react";
import { Handle, Position } from "reactflow";
import { CheckCircle2, Circle } from "lucide-react";
import { cn } from "../../utils/cn";

const NodeCard = ({ data, selected }) => {
  const isCompleted = data.isCompleted;

  return (
    <div
      className={cn(
        "relative min-w-[200px] rounded-lg border-2 bg-card p-4 shadow-sm transition-all hover:shadow-md",
        selected ? "border-primary ring-2 ring-primary/20" : "border-border",
        isCompleted
          ? "border-green-500/50 bg-green-500/5 dark:bg-green-500/10"
          : ""
      )}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="!bg-muted-foreground"
      />

      <div className="flex items-start gap-3">
        <div
          className={cn(
            "mt-0.5 transition-colors",
            isCompleted ? "text-green-500" : "text-muted-foreground"
          )}
        >
          {isCompleted ? (
            <CheckCircle2 className="h-5 w-5" />
          ) : (
            <Circle className="h-5 w-5" />
          )}
        </div>
        <div>
          <h3 className="font-semibold leading-tight">{data.title}</h3>
          <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
            {data.description}
          </p>
        </div>
      </div>

      {data.time && (
        <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
          <span className="rounded-full bg-secondary px-2 py-0.5">
            {data.time}
          </span>
        </div>
      )}

      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-muted-foreground"
      />
    </div>
  );
};

export default memo(NodeCard);
