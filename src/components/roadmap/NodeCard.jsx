import { memo } from "react";
import { Handle, Position } from "reactflow";
import { CheckCircle2, Circle } from "lucide-react";
import { cn } from "../../utils/cn";

const NodeCard = ({ data, selected }) => {
  const isCompleted = data.isCompleted;

  return (
    <div
      className={cn(
        "relative min-w-[200px] rounded-xl border-2 bg-[#111213] p-4 shadow-lg transition-all hover:shadow-xl",
        selected
          ? "border-white ring-2 ring-white/20"
          : "border-[rgba(255,255,255,0.12)] hover:border-[#555]",
        isCompleted ? "border-white/50 bg-[rgba(255,255,255,0.06)]" : "",
      )}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="!bg-[#555] !border-[#888] !w-2 !h-2"
      />

      <div className="flex items-start gap-3">
        <div
          className={cn(
            "mt-0.5 transition-colors",
            isCompleted ? "text-white" : "text-[#555]",
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
              isCompleted ? "text-white" : "text-white",
            )}
          >
            {data.title}
          </h3>
          <p className="mt-1 text-xs text-[#555] line-clamp-2">
            {data.description}
          </p>
        </div>
      </div>

      {data.time && (
        <div className="mt-3 flex items-center gap-2 text-xs text-[#555]">
          <span className="rounded-md bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.12)] px-2 py-0.5 text-[10px] font-medium">
            {data.time}
          </span>
        </div>
      )}

      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-[#555] !border-[#888] !w-2 !h-2"
      />
    </div>
  );
};

export default memo(NodeCard);
