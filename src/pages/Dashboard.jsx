import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../components/ui/Card";
import {
  ArrowRight,
  Trophy,
  CheckCircle2,
  Target,
  Zap,
  TrendingUp,
  Share2,
  Check,
} from "lucide-react";
import { AchievementBadges } from "../components/dashboard/AchievementBadges";
import { DailyGoalCard } from "../components/dashboard/DailyGoalCard";
import { AnimatedFlame } from "../components/dashboard/AnimatedFlame";
import { UsernameForm } from "../components/dashboard/UsernameForm";
import { languages } from "../data/languages";
import { roadmaps } from "../data/roadmaps";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from "recharts";

const getAllProgress = () => {
  const allProgress = {};
  const history = [];

  languages.forEach((lang) => {
    const saved = localStorage.getItem(`devmap_progress_${lang.id}`);

    // Find real total
    let realTotal = lang.steps || 20;
    if (roadmaps[lang.id] && roadmaps[lang.id].nodes) {
      realTotal = roadmaps[lang.id].nodes.length;
    }

    if (saved) {
      try {
        let completed = JSON.parse(saved);
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
          name: lang.name,
          category: lang.category || "Languages", // Assuming we add categories later
        };

        completed.forEach((item) => {
          history.push({
            date: item.date || new Date().toISOString(),
            language: lang.name,
            nodeId: item.id,
          });
        });
      } catch (e) {
        console.error(e);
      }
    } else {
      // Initialize empty for charts
      allProgress[lang.id] = {
        completed: 0,
        total: realTotal,
        items: [],
        name: lang.name,
      };
    }
  });
  return { allProgress, history };
};

import { supabase } from "../lib/supabase";
import { useUserProfile } from "../hooks/useUserProfile";

export default function Dashboard() {
  const { user } = useAuth();
  const { profile } = useUserProfile();

  const [progressData, setProgressData] = useState({});
  const [totalCompletedNodes, setTotalCompletedNodes] = useState(0);
  const [contributionData, setContributionData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [level, setLevel] = useState(1);
  const [xp, setXp] = useState(0);

  const [recentActivity, setRecentActivity] = useState([]);
  const [radarData, setRadarData] = useState([]);

  const subscriptionRef = useRef(null);

  useEffect(() => {
    async function loadDashboardData() {
      setIsLoading(true);
      let aggregatedProgress = {};
      let fullHistory = [];

      if (user) {
        try {
          const { data, error } = await supabase
            .from("user_progress")
            .select("node_id, language_slug, completed_at")
            .eq("user_id", user.id);

          if (!error && data) {
            // Transform DB rows into the structure Dashboard expects
            languages.forEach((lang) => {
              aggregatedProgress[lang.id] = {
                completed: 0,
                total: roadmaps[lang.id]?.nodes?.length || 20,
                items: [],
                name: lang.name,
              };
            });

            // Fill it
            data.forEach((row) => {
              if (aggregatedProgress[row.language_slug]) {
                aggregatedProgress[row.language_slug].completed++;
                aggregatedProgress[row.language_slug].items.push({
                  id: row.node_id,
                  date: row.completed_at,
                });

                fullHistory.push({
                  date: row.completed_at,
                  language: aggregatedProgress[row.language_slug].name,
                  nodeId: row.node_id,
                });
              }
            });
          }
        } catch (err) {
          console.error("Dashboard fetch failed", err);
        }
      } else {
        const { allProgress, history } = getAllProgress();
        aggregatedProgress = allProgress;
        fullHistory = history;
      }

      setProgressData(aggregatedProgress);

      const total = Object.values(aggregatedProgress).reduce(
        (acc, curr) => acc + curr.completed,
        0,
      );
      setTotalCompletedNodes(total);

      const calculatedLevel = Math.floor(total / 10) + 1;
      setLevel(calculatedLevel);
      setXp(total * 100);

      const sortedHistory = [...fullHistory].sort(
        (a, b) => new Date(b.date) - new Date(a.date),
      );
      setRecentActivity(sortedHistory.slice(0, 5));

      const categories = {
        Frontend: ["React", "HTML", "CSS", "JavaScript", "TypeScript"],
        Backend: ["Node.js", "Python", "Go", "Java", "SQL"],
        Tools: ["Git", "Docker", "Linux"],
        CS: ["Algorithms", "C++", "C"],
      };

      const radarStats = [
        { subject: "Frontend", A: 0, fullMark: 100 },
        { subject: "Backend", A: 0, fullMark: 100 },
        { subject: "Tools", A: 0, fullMark: 100 },
        { subject: "CS Theory", A: 0, fullMark: 100 },
        { subject: "Design", A: 0, fullMark: 100 },
      ];

      Object.values(aggregatedProgress).forEach((p) => {
        if (categories.Frontend.includes(p.name))
          radarStats[0].A += p.completed * 5;
        else if (categories.Backend.includes(p.name))
          radarStats[1].A += p.completed * 5;
        else if (categories.Tools.includes(p.name))
          radarStats[2].A += p.completed * 5;
        else if (categories.CS.includes(p.name))
          radarStats[3].A += p.completed * 5;
        else radarStats[4].A += p.completed * 5;
      });
      setRadarData(radarStats);

      const today = new Date();
      const gridData = [];
      const dateMap = {};

      fullHistory.forEach((h) => {
        const day = h.date.split("T")[0];
        dateMap[day] = (dateMap[day] || 0) + 1;
      });

      const startDate = new Date();
      startDate.setDate(today.getDate() - 22 * 7);

      for (
        let d = new Date(startDate);
        d <= today;
        d.setDate(d.getDate() + 1)
      ) {
        const dayStr = d.toISOString().split("T")[0];
        const count = dateMap[dayStr] || 0;
        let lvl = 0;
        if (count > 0) lvl = 1;
        if (count > 2) lvl = 2;
        if (count > 4) lvl = 3;
        if (count > 6) lvl = 4;
        gridData.push({ date: dayStr, count, level: lvl });
      }
      setContributionData(gridData);
      setIsLoading(false);
    }

    loadDashboardData();

    if (user) {
      subscriptionRef.current = supabase
        .channel("user_progress_changes")
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "user_progress",
            filter: `user_id=eq.${user.id}`,
          },
          () => {
            // Reload data when something changes
            console.log("Real-time update received!");
            loadDashboardData();
          },
        )
        .subscribe();
    }

    return () => {
      if (subscriptionRef.current) {
        supabase.removeChannel(subscriptionRef.current);
      }
    };
  }, [user]); // Re-run when auth state changes

  // Derived State for UI

  const displayLevel = level;
  const displayXp = xp;

  const inProgressRoadmaps = [];
  const completedRoadmaps = [];
  Object.keys(progressData).forEach((key) => {
    const lang = languages.find((l) => l.id === key);
    if (!lang) return;
    const p = progressData[key];
    if (p.completed > 0) {
      if (p.completed >= p.total) completedRoadmaps.push(lang);
      else inProgressRoadmaps.push(lang);
    }
  });

  return (
    <div className="min-h-screen bg-background text-foreground py-12 bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:16px_16px]">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 bg-card border border-border rounded-lg p-8">
          <div className="flex items-center gap-8">
            {/* Hero Streak */}
            <div className="flex flex-col items-center">
              <div className="relative">
                <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-500/30 flex items-center justify-center">
                  <AnimatedFlame
                    isActive={totalCompletedNodes > 0}
                    className="h-8 w-8"
                  />
                </div>
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange-500 to-red-500 text-white text-lg font-black px-3 py-0.5 rounded-full shadow-lg">
                  {totalCompletedNodes > 0 ? 3 : 0}
                </div>
              </div>
              <span className="text-xs text-muted-foreground mt-4 uppercase tracking-widest">
                Day Streak
              </span>
            </div>

            {/* User Info */}
            <div className="flex-1">
              <h1 className="text-2xl font-extrabold tracking-tight">
                Welcome back,{" "}
                {user?.user_metadata?.full_name?.split(" ")[0] || "Developer"}
              </h1>

              {/* Compact Level & XP */}
              <div className="flex items-center gap-4 mt-2">
                <span className="inline-flex items-center gap-1.5 bg-secondary px-3 py-1 rounded-full text-sm font-semibold">
                  <span className="text-primary">Lv.{displayLevel}</span>
                  <span className="text-muted-foreground">•</span>
                  <Zap className="h-3.5 w-3.5 text-yellow-500" />
                  <span className="text-muted-foreground">{displayXp} XP</span>
                </span>
              </div>

              {/* Progress to next level */}
              <div className="mt-3 max-w-xs">
                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                  <span>Progress to Level {displayLevel + 1}</span>
                  <span>{totalCompletedNodes % 10}/10 steps</span>
                </div>
                <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all"
                    style={{ width: `${(totalCompletedNodes % 10) * 10}%` }}
                  />
                </div>
              </div>

              {user && (
                <div className="mt-3">
                  <UsernameForm
                    currentUsername={profile?.username}
                    userId={user.id}
                    onSuccess={(newUsername) => {
                      window.location.reload();
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 relative z-10">
            {user && profile?.username && (
              <Button
                variant="outline"
                onClick={() => {
                  const url = `${window.location.origin}/u/${profile.username}`;
                  navigator.clipboard.writeText(url);
                  alert(`Profile link copied!\n${url}`);
                }}
                className="gap-2"
              >
                <Share2 className="h-4 w-4" />
                Share Profile
              </Button>
            )}
            <Button asChild variant="outline">
              <Link to="/til">Today I Learned</Link>
            </Button>
            <Button asChild>
              <Link to="/languages">Continue Learning</Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Stats */}
            <div className="flex items-center gap-6 p-4 bg-card/50 backdrop-blur-sm rounded-lg border border-border">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <div>
                  <div className="text-2xl font-bold">
                    {totalCompletedNodes}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Steps Completed
                  </p>
                </div>
              </div>
              <div className="h-8 w-px bg-border" />
              <div className="flex items-center gap-3">
                <TrendingUp className="h-5 w-5 text-primary" />
                <div>
                  <div className="text-2xl font-bold">
                    {
                      Object.values(progressData).filter((p) => p.completed > 0)
                        .length
                    }
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Roadmaps Started
                  </p>
                </div>
              </div>
            </div>

            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Learning Activity
                </CardTitle>
                <CardDescription>
                  Your contribution graph over the last year
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="w-full h-40">
                  {(() => {
                    const weeklyData = [];
                    let currentWeek = { date: "", count: 0 };
                    contributionData.forEach((day, i) => {
                      if (i % 7 === 0) {
                        if (i > 0) weeklyData.push(currentWeek);
                        currentWeek = { date: day.date, count: 0 };
                      }
                      currentWeek.count += day.count;
                    });
                    weeklyData.push(currentWeek);

                    const chartData = weeklyData.map((d) => ({
                      ...d,
                      visualValue: d.count === 0 ? 0.3 : d.count,
                    }));

                    return (
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData} barSize={12}>
                          <Tooltip
                            cursor={{ fill: "transparent" }}
                            content={({ active, payload }) => {
                              if (active && payload && payload.length) {
                                const data = payload[0].payload;
                                return (
                                  <div className="bg-zinc-900 border border-zinc-800 p-2 rounded-lg text-xs">
                                    <p className="font-bold mb-1">
                                      {data.date}
                                    </p>
                                    <p>{data.count} contributions</p>
                                  </div>
                                );
                              }
                              return null;
                            }}
                          />
                          <Bar dataKey="visualValue" radius={[4, 4, 4, 4]}>
                            {chartData.map((entry, index) => (
                              <Cell
                                key={`cell-${index}`}
                                fill={entry.count > 0 ? "#22c55e" : "#27272a"}
                                stroke={entry.count === 0 ? "#3f3f46" : "none"}
                                strokeWidth={1}
                              />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    );
                  })()}
                  <div className="text-xs text-center text-muted-foreground mt-2">
                    Activity over last 20 weeks
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity - Compact */}
            <div className="p-4 bg-card/50 backdrop-blur-sm rounded-lg border border-border">
              <h3 className="text-sm font-semibold mb-3">Recent Activity</h3>
              {recentActivity.length === 0 ? (
                <p className="text-muted-foreground text-sm">
                  No activity yet. Start learning!
                </p>
              ) : (
                <div className="space-y-2">
                  {recentActivity.slice(0, 3).map((act, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between text-sm"
                    >
                      <span>
                        Completed step in{" "}
                        <span className="text-primary font-medium">
                          {act.language}
                        </span>
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(act.date).toLocaleDateString()}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-8">
            <DailyGoalCard
              completedToday={
                recentActivity.filter(
                  (a) =>
                    new Date(a.date).toDateString() ===
                    new Date().toDateString(),
                ).length
              }
              goal={3}
            />

            <AchievementBadges
              stats={{
                totalCompleted: totalCompletedNodes,
                streak: totalCompletedNodes > 0 ? 3 : 0,
                roadmapsStarted: Object.values(progressData).filter(
                  (p) => p.completed > 0,
                ).length,
                roadmapsCompleted: Object.values(progressData).filter(
                  (p) => p.completed >= p.total,
                ).length,
                level: displayLevel,
              }}
            />

            <Card className="h-fit">
              <CardHeader>
                <CardTitle>Skill Distribution</CardTitle>
                <CardDescription>Your strengths at a glance</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart
                    cx="50%"
                    cy="50%"
                    outerRadius="80%"
                    data={radarData}
                  >
                    <PolarGrid stroke="#27272a" />
                    <PolarAngleAxis
                      dataKey="subject"
                      tick={{ fill: "#71717a", fontSize: 12 }}
                    />
                    <PolarRadiusAxis
                      angle={30}
                      domain={[0, 50]}
                      tick={false}
                      axisLine={false}
                    />
                    <Radar
                      name="Skills"
                      dataKey="A"
                      stroke="#22c55e"
                      fill="#22c55e"
                      fillOpacity={0.3}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#18181b",
                        borderColor: "#27272a",
                        borderRadius: "8px",
                      }}
                      itemStyle={{ color: "#22c55e" }}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Resume Learning</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {inProgressRoadmaps.length === 0 ? (
                  <div className="text-sm text-muted-foreground">
                    No active courses.
                  </div>
                ) : (
                  inProgressRoadmaps.slice(0, 3).map((lang) => {
                    const p = progressData[lang.id];
                    const percent = Math.round((p.completed / p.total) * 100);
                    return (
                      <div key={lang.id} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium">{lang.name}</span>
                          <span className="text-muted-foreground">
                            {percent}%
                          </span>
                        </div>
                        <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary"
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                      </div>
                    );
                  })
                )}
                <Button asChild variant="ghost" className="w-full text-xs h-8">
                  <Link to="/languages">View All Languages</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
