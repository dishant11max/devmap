import { useBadges } from "../../hooks/useBadges";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import { Award } from "lucide-react";

export function AchievementBadges({ stats }) {
  const { earned, locked } = useBadges(stats);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Award className="h-5 w-5 text-primary" />
          Achievements
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Earned Badges */}
        {earned.length > 0 && (
          <div className="mb-4">
            <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">
              Unlocked
            </p>
            <div className="flex flex-wrap gap-2">
              {earned.map((badge) => (
                <div
                  key={badge.id}
                  className="group relative flex items-center justify-center h-16 w-16 cursor-pointer transition-all hover:scale-110"
                >
                  <badge.icon className="w-full h-full drop-shadow-lg" />

                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-popover border border-border rounded-lg text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 shadow-xl backdrop-blur-sm">
                    <p className="font-bold text-primary">{badge.name}</p>
                    <p className="text-muted-foreground">{badge.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Locked Badges */}
        {locked.length > 0 && (
          <div>
            <p className="text-xs text-muted-foreground mb-3 font-medium uppercase tracking-wider pl-1">
              Locked Achievements
            </p>
            <div className="flex flex-wrap gap-4">
              {locked.map((badge) => (
                <div
                  key={badge.id}
                  className="group relative flex items-center justify-center h-14 w-14 cursor-not-allowed opacity-40 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-500"
                >
                  <badge.icon className="w-full h-full" />

                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-popover border border-border rounded-lg text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 shadow-lg">
                    <p className="font-medium text-muted-foreground">
                      {badge.name}
                    </p>
                    <p className="text-muted-foreground/50">
                      {badge.description}
                    </p>
                    <p className="text-[10px] text-primary mt-1 font-bold">
                      LOCKED
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {earned.length === 0 && locked.length === 0 && (
          <p className="text-sm text-muted-foreground">
            Complete steps to unlock badges!
          </p>
        )}
      </CardContent>
    </Card>
  );
}
