import { memo } from "react";
import { Handle, Position } from "reactflow";
import { Check } from "lucide-react";
import { cn } from "../../utils/cn";

const NodeCard = ({ data, selected }) => {
  const isCompleted = data.isCompleted;

  return (
    <div
      className={cn(
        "relative min-w-[190px] max-w-[240px] rounded-[2px] border bg-surface p-3 transition-colors",
        isCompleted
          ? "border-accent"
          : selected
            ? "border-ink"
            : "border-border hover:border-muted/50"
      )}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="!bg-border !border-border !w-1.5 !h-1.5"
      />

      <div className="flex items-start gap-2.5">
        <div className="mt-0.5 shrink-0">
          {isCompleted ? (
            <div className="w-3.5 h-3.5 rounded-[2px] bg-accent/15 border border-accent flex items-center justify-center text-accent">
              <Check className="h-2.5 w-2.5 stroke-[3]" />
            </div>
          ) : (
            <div className="w-3.5 h-3.5 rounded-[2px] border border-border bg-bg" />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <h3
            className={cn(
              "font-mono text-[12px] font-medium leading-snug truncate",
              isCompleted ? "text-text" : selected ? "text-ink" : "text-muted"
            )}
          >
            {data.title}
          </h3>
          {data.description && (
            <p className="mt-1 font-sans text-[11px] text-muted line-clamp-2 leading-relaxed">
              {data.description}
            </p>
          )}
        </div>
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-border !border-border !w-1.5 !h-1.5"
      />
    </div>
  );
};

export default memo(NodeCard);
