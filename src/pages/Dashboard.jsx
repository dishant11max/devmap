import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/Card";
import { ArrowRight, Trophy, Flame, CheckCircle2 } from "lucide-react";
import { languages } from "../data/languages";
import { roadmaps } from "../data/roadmaps"; // Import real roadmap data
import { Button } from "../components/ui/Button";

const getAllProgress = () => {
  const allProgress = {};
  const history = []; // Flat list of all completed events

  languages.forEach((lang) => {
    const saved = localStorage.getItem(`devmap_progress_${lang.id}`);

    // Use actual node count if available
    let realTotal = lang.steps || 20;
    if (roadmaps[lang.id] && roadmaps[lang.id].nodes) {
      realTotal = roadmaps[lang.id].nodes.length;
    }

    if (saved) {
      try {
        let completed = JSON.parse(saved);

        // Handle migration from old format
        if (Array.isArray(completed) && typeof completed[0] === "string") {
          completed = completed.map((id) => ({
            id,
            date: new Date().toISOString(),
          }));
        }

        allProgress[lang.id] = {
          completed: completed.length,
          total: realTotal,
          items: completed,
        };

        // Add to global history
        completed.forEach((item) => {
          if (item.date) {
            history.push({ date: item.date, language: lang.name });
          } else {
            history.push({
              date: new Date().toISOString(),
              language: lang.name,
            });
          }
        });
      } catch (e) {
        console.error(e);
      }
    }
  });
  return { allProgress, history };
};

export default function Dashboard() {
  const [progressData, setProgressData] = useState({});
  const [totalCompletedNodes, setTotalCompletedNodes] = useState(0);
  const [contributionData, setContributionData] = useState([]);

  useEffect(() => {
    const { allProgress, history } = getAllProgress();
    setProgressData(allProgress);

    const total = Object.values(allProgress).reduce(
      (acc, curr) => acc + curr.completed,
      0
    );
    setTotalCompletedNodes(total);

    // Process history
    const today = new Date();
    const currentYear = today.getFullYear();
    const gridData = [];
    const dateMap = {};

    history.forEach((h) => {
      const day = h.date.split("T")[0];
      dateMap[day] = (dateMap[day] || 0) + 1;
    });

    const startOfYear = new Date(currentYear, 0, 1);
    const endOfYear = new Date(currentYear, 11, 31);

    for (
      let d = new Date(startOfYear);
      d <= endOfYear;
      d.setDate(d.getDate() + 1)
    ) {
      const dayStr = d.toISOString().split("T")[0];
      const count = dateMap[dayStr] || 0;

      let level = 0;
      if (count > 0) level = 1;
      if (count > 2) level = 2;
      if (count > 4) level = 3;
      if (count > 6) level = 4;

      gridData.push({
        date: dayStr,
        count,
        level,
      });
    }

    setContributionData(gridData);
  }, []);

  const inProgressRoadmaps = [];
  const completedRoadmaps = [];

  languages.forEach((lang) => {
    const progress = progressData[lang.id];
    // We only care if they have at least started it
    if (progress && progress.completed > 0) {
      if (progress.completed >= progress.total) {
        completedRoadmaps.push(lang);
      } else {
        inProgressRoadmaps.push(lang);
      }
    }
  });

  // Calculate active projects count for stats
  const activeRoadmapsCount =
    inProgressRoadmaps.length + completedRoadmaps.length;

  return (
    <div className="min-h-screen bg-background text-foreground py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">My Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Track your learning journey across all roadmaps.
            </p>
          </div>
          <Button asChild>
            <Link to="/languages">Explore New Roadmaps</Link>
          </Button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <Card className="bg-card/50 backdrop-blur-sm border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Steps Completed
              </CardTitle>
              <CheckCircle2 className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totalCompletedNodes}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Across {activeRoadmapsCount} active roadmaps
              </p>
            </CardContent>
          </Card>
          <Card className="bg-card/50 backdrop-blur-sm border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Current Streak
              </CardTitle>
              <Flame className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {totalCompletedNodes > 0 ? "Active" : "0 Days"}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Keep the momentum going!
              </p>
            </CardContent>
          </Card>
          <Card className="bg-card/50 backdrop-blur-sm border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Completions
              </CardTitle>
              <Trophy className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {completedRoadmaps.length}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Roadmaps fully mastered
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Contribution Grid */}
        <Card className="mb-12 border-border bg-card">
          <CardHeader>
            <CardTitle>Activity</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Scrollable Container */}
            <div className="w-full overflow-x-auto pb-4">
              <div className="min-w-max">
                {/* Month Labels - Fixed for Calendar Year */}
                <div className="flex text-xs text-muted-foreground mb-2 pl-0 justify-between pr-4">
                  {[
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun",
                    "Jul",
                    "Aug",
                    "Sep",
                    "Oct",
                    "Nov",
                    "Dec",
                  ].map((m) => (
                    <div key={m} className="flex-1 text-center">
                      {m}
                    </div>
                  ))}
                </div>

                <div className="flex gap-1">
                  {/* Generate 53 columns for full year cover */}
                  {Array.from({ length: 53 }).map((_, colIndex) => (
                    <div key={colIndex} className="flex flex-col gap-1">
                      {Array.from({ length: 7 }).map((_, rowIndex) => {
                        // Calculate date based on specific start date (Jan 1, 2026)
                        // Assuming Jan 1 starts at col 0, row depends on day of week?
                        // For simplicity, let's just stream days sequentially from Jan 1
                        // Logic: exact day mapping is complex for a simple grid.
                        // Let's stick to the current linear fill but start from Jan 1.

                        const dayOfYear = colIndex * 7 + rowIndex;
                        const currentYear = new Date().getFullYear(); // 2026
                        const startDate = new Date(currentYear, 0, 1); // Jan 1

                        const d = new Date(startDate);
                        d.setDate(startDate.getDate() + dayOfYear);

                        // Stop if we roll into next year
                        if (d.getFullYear() !== currentYear)
                          return <div key={rowIndex} className="w-3 h-3" />;

                        const dayStr = d.toISOString().split("T")[0];
                        // Find data for this specific day
                        const dataForDay = contributionData.find(
                          (c) => c.date === dayStr
                        );
                        const count = dataForDay ? dataForDay.count : 0;
                        const level = dataForDay ? dataForDay.level : 0;

                        // Future dates (optional: dim them out or just show empty?)
                        // User just asked for "this year", so showing empty slots for future is fine.

                        const formattedDate = d.toLocaleDateString("en-US", {
                          weekday: "short",
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        });

                        return (
                          <div
                            key={rowIndex}
                            className={`w-3 h-3 rounded-sm transition-colors hover:ring-1 hover:ring-foreground/50 ${
                              level === 0
                                ? "bg-muted/20"
                                : level === 1
                                ? "bg-green-900/40"
                                : level === 2
                                ? "bg-green-700/60"
                                : level === 3
                                ? "bg-green-500/80"
                                : "bg-green-400"
                            }`}
                            title={`${count} learned on ${formattedDate}`}
                          />
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground mt-2 pl-1">
              <span>Less</span>
              <div className="flex gap-1">
                <div className="w-3 h-3 rounded-sm bg-muted/20"></div>
                <div className="w-3 h-3 rounded-sm bg-green-900/40"></div>
                <div className="w-3 h-3 rounded-sm bg-green-700/60"></div>
                <div className="w-3 h-3 rounded-sm bg-green-500/80"></div>
                <div className="w-3 h-3 rounded-sm bg-green-400"></div>
              </div>
              <span>More</span>
            </div>
            <div className="mt-4 pt-4 border-t border-border">
              <p className="text-sm text-muted-foreground">
                This activity is stored locally on your device. Completing steps
                in any roadmap will light up the grid!
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Completed Roadmaps Section */}
        {completedRoadmaps.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold tracking-tight mb-6 flex items-center gap-2">
              <Trophy className="text-yellow-500 h-6 w-6" /> Completions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {completedRoadmaps.map((lang) => (
                <div
                  key={lang.id}
                  className="relative overflow-hidden group rounded-xl border border-yellow-500/30 bg-gradient-to-br from-yellow-500/10 to-transparent p-6 transition-all hover:border-yellow-500/50"
                  // Link back to roadmap if they want to admire it?
                >
                  <div className="flex items-start justify-between relative z-10">
                    <div>
                      <h3 className="text-xl font-bold flex items-center gap-2">
                        {lang.name} Mastered
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        All steps completed
                      </p>
                      <p className="text-xs text-yellow-600/80 dark:text-yellow-400/80 mt-4 font-mono uppercase tracking-widest font-bold">
                        Certified
                      </p>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.3)]">
                      <CheckCircle2 className="h-6 w-6" />
                    </div>
                  </div>
                  {/* Decorative glow */}
                  <div className="absolute -bottom-10 -right-10 h-32 w-32 bg-yellow-500/20 rounded-full blur-3xl group-hover:bg-yellow-500/30 transition-all"></div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* In Progress Roadmaps */}
        <h2 className="text-2xl font-bold tracking-tight mb-6">In Progress</h2>
        {inProgressRoadmaps.length === 0 && completedRoadmaps.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-border rounded-xl">
            <p className="text-muted-foreground mb-4">
              You haven't started any roadmaps yet.
            </p>
            <Button asChild>
              <Link to="/languages">Browse Languages</Link>
            </Button>
          </div>
        ) : inProgressRoadmaps.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-border rounded-xl">
            <p className="text-muted-foreground mb-4">
              Wow, you've completed everything you started! Time to pick a new
              challenge?
            </p>
            <Button asChild>
              <Link to="/languages">Browse Languages</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {inProgressRoadmaps.map((lang) => {
              const progress = progressData[lang.id];
              const percentage = Math.round(
                (progress.completed / progress.total) * 100
              );

              return (
                <Link key={lang.id} to={`/roadmap/${lang.id}`}>
                  <Card className="h-full hover:border-primary/50 transition-all cursor-pointer group">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-lg font-bold text-primary group-hover:scale-110 transition-transform">
                          {lang.abbreviation}
                        </div>
                        <CardTitle className="text-lg">{lang.name}</CardTitle>
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </CardHeader>
                    <CardContent>
                      <div className="mt-4 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            Progress
                          </span>
                          <span className="font-medium">{percentage}%</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-secondary">
                          <div
                            className="h-full rounded-full bg-primary transition-all duration-500"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                          {progress.completed} of {progress.total} steps
                          completed
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
