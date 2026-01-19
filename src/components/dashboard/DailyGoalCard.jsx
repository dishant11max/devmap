import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import { Target, CheckCircle2 } from "lucide-react";

export function DailyGoalCard({ completedToday = 0, goal = 3 }) {
  const progress = Math.min(completedToday / goal, 1);
  const percentage = Math.round(progress * 100);
  const isComplete = completedToday >= goal;

  // SVG circle math
  const size = 80;
  const strokeWidth = 6;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - progress * circumference;

  return (
    <Card className={isComplete ? "border-green-500/50 bg-green-500/5" : ""}>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-base">
          <Target className="h-4 w-4 text-primary" />
          Daily Goal
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4">
          {/* Circular Progress */}
          <div className="relative flex-shrink-0">
            <svg width={size} height={size} className="-rotate-90">
              {/* Background circle */}
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke="currentColor"
                strokeWidth={strokeWidth}
                className="text-secondary"
              />
              {/* Progress circle */}
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke="currentColor"
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                className={`transition-all duration-500 ${
                  isComplete ? "text-green-500" : "text-primary"
                }`}
              />
            </svg>
            {/* Center text */}
            <div className="absolute inset-0 flex items-center justify-center">
              {isComplete ? (
                <CheckCircle2 className="h-6 w-6 text-green-500" />
              ) : (
                <span className="text-lg font-bold">{percentage}%</span>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium">
              {isComplete ? "Goal Complete! 🎉" : "Keep going!"}
            </p>
            <p className="text-xs text-muted-foreground">
              {completedToday} of {goal} steps today
            </p>
            {!isComplete && (
              <p className="text-xs text-muted-foreground mt-1">
                {goal - completedToday} more to unlock today's badge
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
