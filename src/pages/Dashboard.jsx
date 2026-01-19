import { useEffect, useState } from "react";
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
  Flame,
  CheckCircle2,
  Target,
  Zap,
  TrendingUp,
} from "lucide-react";
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

export default function Dashboard() {
  const { user } = useAuth();
  const [progressData, setProgressData] = useState({});
  const [totalCompletedNodes, setTotalCompletedNodes] = useState(0);
  const [contributionData, setContributionData] = useState([]);
  const [level, setLevel] = useState(1);
  const [xp, setXp] = useState(0);
  const [recentActivity, setRecentActivity] = useState([]);
  const [radarData, setRadarData] = useState([]);

  useEffect(() => {
    const { allProgress, history } = getAllProgress();
    setProgressData(allProgress);

    // Calculate totals
    const total = Object.values(allProgress).reduce(
      (acc, curr) => acc + curr.completed,
      0,
    );
    setTotalCompletedNodes(total);

    // Gamification Logic
    // Level up every 10 steps
    const newLevel = Math.floor(total / 10) + 1;
    setLevel(newLevel);

    // XP is just total * 100 for now
    setXp(total * 100);

    // Recent Activity (Last 5 items)
    // Sort by date desc
    const sortedHistory = [...history].sort(
      (a, b) => new Date(b.date) - new Date(a.date),
    );
    setRecentActivity(sortedHistory.slice(0, 5));

    // Radar Chart Data Logic (Mocked Categories based on Lang names for demo)
    // In real app, we'd tag languages with categories (Frontend, Backend, etc)
    // Here lets map specific langs to mock categories
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

    Object.values(allProgress).forEach((p) => {
      // Simple heuristic mapping
      if (categories.Frontend.includes(p.name))
        radarStats[0].A += p.completed * 5;
      else if (categories.Backend.includes(p.name))
        radarStats[1].A += p.completed * 5;
      else if (categories.Tools.includes(p.name))
        radarStats[2].A += p.completed * 5;
      else if (categories.CS.includes(p.name))
        radarStats[3].A += p.completed * 5;
      else radarStats[4].A += p.completed * 5; // Fallback to design/misc
    });

    setRadarData(radarStats);

    // Contribution Grid Logic
    // We want the last 22 weeks (approx 5 months) to fill the chart nicely
    const today = new Date();
    const gridData = [];
    const dateMap = {};

    history.forEach((h) => {
      const day = h.date.split("T")[0];
      dateMap[day] = (dateMap[day] || 0) + 1;
    });

    // Start 22 weeks ago
    const startDate = new Date();
    startDate.setDate(today.getDate() - 22 * 7);

    for (let d = new Date(startDate); d <= today; d.setDate(d.getDate() + 1)) {
      const dayStr = d.toISOString().split("T")[0];
      const count = dateMap[dayStr] || 0;
      let level = 0;
      if (count > 0) level = 1;
      if (count > 2) level = 2;
      if (count > 4) level = 3;
      if (count > 6) level = 4;

      gridData.push({ date: dayStr, count, level });
    }
    setContributionData(gridData);
  }, []);

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
    <div className="min-h-screen bg-background text-foreground py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 bg-card border border-border rounded-xl p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

          <div className="flex items-center gap-6 relative z-10">
            <div className="relative">
              <div className="h-24 w-24 rounded-full bg-secondary flex items-center justify-center text-4xl font-bold text-primary ring-4 ring-background shadow-xl">
                {level}
              </div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                Level
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                Welcome back,{" "}
                {user?.user_metadata?.full_name?.split(" ")[0] || "Developer"}
              </h1>
              <div className="flex items-center gap-3 mt-2 text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Zap className="h-4 w-4 text-yellow-500" />
                  {xp} XP Earned
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <Target className="h-4 w-4 text-red-500" />
                  Next Level: {level * 10 - totalCompletedNodes} steps
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-3 relative z-10">
            <Button asChild variant="outline">
              <Link to="/til">Today I Learned</Link>
            </Button>
            <Button asChild>
              <Link to="/languages">Continue Learning</Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Stats Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Global Rank
                  </CardTitle>
                  <Trophy className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Top 5%</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Based on XP
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Current Streak
                  </CardTitle>
                  <Flame className="h-4 w-4 text-orange-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {totalCompletedNodes > 0 ? "3 Days" : "0 Days"}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    You're on fire!
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Total Steps
                  </CardTitle>
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {totalCompletedNodes}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Nodes mastered
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Activity Grid */}
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

            {/* Recent Activity Feed */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Milestones</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {recentActivity.length === 0 ? (
                    <p className="text-muted-foreground text-sm">
                      No activity yet. Start learning!
                    </p>
                  ) : (
                    recentActivity.map((act, i) => (
                      <div key={i} className="flex gap-4">
                        <div className="relative mt-0.5">
                          <div className="h-2 w-2 rounded-full bg-primary ring-4 ring-primary/20" />
                          {i !== recentActivity.length - 1 && (
                            <div className="absolute top-3 left-1 h-full w-px bg-border" />
                          )}
                        </div>
                        <div className="pb-2">
                          <p className="text-sm font-medium">
                            Completed step in{" "}
                            <span className="text-primary">{act.language}</span>
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(act.date).toLocaleDateString()} •{" "}
                            {new Date(act.date).toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Column */}
          <div className="space-y-8">
            {/* Skill Radar */}
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

            {/* In Progress List (Compact) */}
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
