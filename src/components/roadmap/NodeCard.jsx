import { memo } from "react";
import { Handle, Position } from "reactflow";
import { CheckCircle2, Circle } from "lucide-react";
import { cn } from "../../utils/cn";

const NodeCard = ({ data, selected }) => {
  const isCompleted = data.isCompleted;

  return (
    <div
      className={cn(
        "relative min-w-[200px] rounded-xl border-2 bg-zinc-900 p-4 shadow-lg transition-all hover:shadow-xl",
        selected
          ? "border-white ring-2 ring-white/20"
          : "border-zinc-700 hover:border-zinc-500",
        isCompleted ? "border-white/50 bg-zinc-800" : "",
      )}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="!bg-zinc-500 !border-zinc-400 !w-2 !h-2"
      />

      <div className="flex items-start gap-3">
        <div
          className={cn(
            "mt-0.5 transition-colors",
            isCompleted ? "text-white" : "text-zinc-500",
          )}
        >
          {isCompleted ? (
            <CheckCircle2 className="h-5 w-5" />
          ) : (
            <Circle className="h-5 w-5" />
          )}
        </div>
        <div>
          <h3
            className={cn(
              "font-semibold leading-tight",
              isCompleted ? "text-white" : "text-zinc-200",
            )}
          >
            {data.title}
          </h3>
          <p className="mt-1 text-xs text-zinc-500 line-clamp-2">
            {data.description}
          </p>
        </div>
      </div>

      {data.time && (
        <div className="mt-3 flex items-center gap-2 text-xs text-zinc-500">
          <span className="rounded-md bg-zinc-800 border border-zinc-700 px-2 py-0.5 text-[10px] font-medium">
            {data.time}
          </span>
        </div>
      )}

      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-zinc-500 !border-zinc-400 !w-2 !h-2"
      />
    </div>
  );
};

export default memo(NodeCard);
