import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Share2, Zap, Target, Trophy, ArrowRight, Check, Map } from "lucide-react";
import { AchievementBadges } from "../components/dashboard/AchievementBadges";
import { AnimatedFlame } from "../components/dashboard/AnimatedFlame";
import { languages } from "../data/languages";
import { csCoreRoadmaps } from "../data/csCore";
import { roadmaps } from "../data/roadmaps";
import { Button } from "../components/ui/Button";

const allTracks = [...languages, ...csCoreRoadmaps];
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  XAxis,
  Tooltip,
} from "recharts";
import { supabase } from "../lib/supabase";
import { useUserProfile } from "../hooks/useUserProfile";

const getAllProgress = () => {
  const allProgress = {};
  const history = [];

  allTracks.forEach((lang) => {
    const saved = localStorage.getItem(`devmap_progress_${lang.id}`);
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
  const { profile } = useUserProfile();

  const [progressData, setProgressData] = useState({});
  const [totalCompletedNodes, setTotalCompletedNodes] = useState(0);
  const [contributionData, setContributionData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [level, setLevel] = useState(1);
  const [xp, setXp] = useState(0);
  const [recentActivity, setRecentActivity] = useState([]);
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
            allTracks.forEach((lang) => {
              aggregatedProgress[lang.id] = {
                completed: 0,
                total: roadmaps[lang.id]?.nodes?.length || 20,
                items: [],
                name: lang.name,
              };
            });

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
      setLevel(Math.floor(total / 10) + 1);
      setXp(total * 100);

      const sortedHistory = [...fullHistory].sort(
        (a, b) => new Date(b.date) - new Date(a.date),
      );
      setRecentActivity(sortedHistory.slice(0, 5));

      const today = new Date();
      const gridData = [];
      const dateMap = {};
      fullHistory.forEach((h) => {
        const day = h.date.split("T")[0];
        dateMap[day] = (dateMap[day] || 0) + 1;
      });

      const startDate = new Date();
      startDate.setDate(today.getDate() - 12 * 7);

      for (
        let d = new Date(startDate);
        d <= today;
        d.setDate(d.getDate() + 1)
      ) {
        const dayStr = d.toISOString().split("T")[0];
        const count = dateMap[dayStr] || 0;
        gridData.push({ date: dayStr, count });
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
  }, [user]);

  // Derived data
  const displayLevel = level;
  const displayXp = xp;

  const roadmapsStarted = Object.values(progressData).filter(
    (p) => p.completed > 0,
  ).length;

  const inProgressRoadmaps = allTracks
    .filter((l) => progressData[l.id]?.completed > 0)
    .sort((a, b) => progressData[b.id].completed - progressData[a.id].completed);

  const badgesEarned = [
    totalCompletedNodes >= 1,
    totalCompletedNodes > 0,
    totalCompletedNodes >= 10,
    roadmapsStarted >= 3,
    Object.values(progressData).filter((p) => p.completed >= p.total).length >=
      1,
    displayLevel >= 5,
  ].filter(Boolean).length;

  // Weekly chart data
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
  const chartData = weeklyData.slice(-12).map((d) => ({
    ...d,
    visualValue: d.count === 0 ? 0.2 : d.count,
    original: d,
  }));

  return (
    <div className="min-h-screen bg-[#08090A] text-white py-10 selection:bg-white">
      

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        {/* HERO: Streak Section */}
        <div className="group relative overflow-hidden rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[#111213]/40 backdrop-blur-md p-8 mb-8 transition-all hover:border-[rgba(255,255,255,0.12)] hover:shadow-2xl hover:shadow-[rgba(255,255,255,0.05)]">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 relative z-10">
            <div className="flex items-center gap-8">
              <div className="relative">
                <div className="flex items-center gap-5">
                  <div>
                    <div className="text-7xl font-black tabular-nums tracking-tighter bg-gradient-to-r from-white via-white to-[#555] bg-clip-text text-transparent">
                      {totalCompletedNodes > 0 ? 3 : 0}
                    </div>
                    <div className="text-xs font-bold uppercase tracking-[0.2em] text-white/90 mt-1 pl-1 flex items-center gap-2">
                      Day Streak
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1 md:text-right w-full">
              <div className="flex flex-col md:items-end">
                <h1 className="text-2xl font-bold text-white tracking-tight">
                  Welcome back,{" "}
                  <span className="text-[#888]">
                    {user?.user_metadata?.full_name?.split(" ")[0] ||
                      "Developer"}
                  </span>
                </h1>

                <div className="flex items-center gap-3 mt-3 text-sm font-medium bg-[rgba(255,255,255,0.06)]/50 p-1.5 pr-4 pl-2 rounded-full border border-white/5 w-fit">
                  <div className="bg-[#111213] rounded-full px-2 py-0.5 text-xs text-[#888] border border-white/5">
                    Lv.{displayLevel}
                  </div>
                  <div className="flex items-center gap-1.5 text-white">
                    <Zap className="h-3.5 w-3.5 text-white fill-white" />
                    {displayXp.toLocaleString()} XP
                  </div>
                </div>

                <div className="mt-4 w-full md:max-w-xs group/progress cursor-pointer">
                  <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-[#555] mb-1.5 group-hover/progress:text-white transition-colors">
                    <span>Next Level</span>
                    <span>{totalCompletedNodes % 10}/10</span>
                  </div>
                  <div className="h-2 bg-[rgba(255,255,255,0.06)] rounded-full overflow-hidden border border-white/5">
                    <div
                      className="h-full bg-gradient-to-r from-white to-white shadow-[0_0_10px_rgba(34,197,94,0.4)] transition-all duration-1000 ease-out"
                      style={{ width: `${(totalCompletedNodes % 10) * 10}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {[
            {
              label: "Steps Completed",
              value: totalCompletedNodes,
              icon: Target,
              delay: "0",
            },
            {
              label: "Roadmaps Active",
              value: roadmapsStarted,
              icon: Zap,
              delay: "100",
            },
            {
              label: "Badges Earned",
              value: badgesEarned,
              icon: Trophy,
              delay: "200",
            },
          ].map((stat, i) => (
            <div
              key={i}
              className="group flex items-center justify-between p-5 border border-[rgba(255,255,255,0.06)]/60 bg-[#111213]/20 backdrop-blur-sm rounded-xl hover:bg-[rgba(255,255,255,0.06)]/40 hover:border-[rgba(255,255,255,0.12)] transition-all duration-300"
            >
              <div>
                <div className="text-3xl font-bold text-white group-hover:text-white transition-colors">
                  {stat.value}
                </div>
                <div className="text-xs font-medium text-[#555] uppercase tracking-wider mt-1 group-hover:text-[#888]">
                  {stat.label}
                </div>
              </div>
              <div className="h-10 w-10 rounded-full bg-[#111213] border border-[rgba(255,255,255,0.06)] flex items-center justify-center text-[#555] group-hover:text-white group-hover:border-white/30 group-hover:bg-white transition-all">
                <stat.icon className="h-5 w-5" />
              </div>
            </div>
          ))}
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
          {/* Left Column (8 cols) */}
          <div className="lg:col-span-7 space-y-8">
            {/* Activity Chart */}
            <div className="border border-[rgba(255,255,255,0.06)]/60 bg-[#111213]/20 backdrop-blur-sm rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-sm font-bold text-[#888] uppercase tracking-widest">
                  Activity
                </h2>
                <div className="text-xs font-mono text-[#555] bg-[#111213]/50 px-2 py-1 rounded">
                  Last 12 Weeks
                </div>
              </div>

              <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} barSize={24}>
                    <Tooltip
                      cursor={{ fill: "transparent" }}
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-[#111213] border border-[rgba(255,255,255,0.06)] p-2 rounded-lg shadow-xl text-xs">
                              <p className="text-[#888] mb-1">
                                {payload[0].payload.date}
                              </p>
                              <p className="font-bold text-white">
                                {payload[0].value} contributions
                              </p>
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
                          fill={entry.count > 0 ? "#ffffff" : "#1A1A1A"}
                          className="transition-all duration-300 hover:opacity-80"
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="space-y-4">
              <h2 className="text-sm font-bold text-[#555] uppercase tracking-widest pl-2">
                Recent
              </h2>
              {recentActivity.length === 0 ? (
                <div className="p-10 border border-dashed border-[rgba(255,255,255,0.06)] rounded-2xl text-center bg-[#111213]/10">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#111213] border border-[rgba(255,255,255,0.06)]">
                    <Zap className="h-5 w-5 text-[#555]" />
                  </div>
                  <h3 className="text-white font-semibold mb-1">No activity yet</h3>
                  <p className="text-sm text-[#555] mb-5">
                    Start learning and your activity will appear here.
                  </p>
                  <Link
                    to="/languages"
                    className="inline-flex items-center gap-2 text-sm font-medium text-white hover:text-white border border-white/30 rounded-full px-4 py-2 bg-white hover:bg-white transition-all"
                  >
                    Browse Roadmaps <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              ) : (
                (() => {
                  // Group activity by language + date
                  const grouped = {};
                  recentActivity.forEach((act) => {
                    const day = act.date.split("T")[0];
                    const key = `${act.language}__${day}`;
                    if (!grouped[key]) {
                      grouped[key] = { language: act.language, date: day, count: 0 };
                    }
                    grouped[key].count++;
                  });
                  const groupedList = Object.values(grouped)
                    .sort((a, b) => new Date(b.date) - new Date(a.date))
                    .slice(0, 5);
                  return (
                    <div className="space-y-3">
                      {groupedList.map((act, i) => (
                        <div
                          key={i}
                          className="group flex items-center justify-between p-4 bg-[#111213]/30 border border-[rgba(255,255,255,0.06)]/60 rounded-xl hover:border-[rgba(255,255,255,0.12)] hover:bg-[#111213]/60 transition-all"
                        >
                          <div className="flex items-center gap-4">
                            <div className="h-8 w-8 rounded-full bg-white border border-white/20 flex items-center justify-center text-white">
                              <Check className="h-4 w-4" />
                            </div>
                            <div>
                              <div className="text-sm font-medium text-white group-hover:text-white transition-colors">
                                {act.language}
                              </div>
                              <div className="text-xs text-[#555]">
                                Completed {act.count} step{act.count > 1 ? "s" : ""}
                              </div>
                            </div>
                          </div>
                          <div className="text-xs font-mono text-[#555]">
                            {new Date(act.date).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                })()
              )}
            </div>
          </div>

          {/* Right Column (4 cols) */}
          <div className="lg:col-span-5 space-y-8">
            {/* Continue Learning */}
            <div className="border border-[rgba(255,255,255,0.06)]/60 bg-[#111213]/20 backdrop-blur-sm rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-sm font-bold text-[#888] uppercase tracking-widest">
                  Jump Back In
                </h2>
                <Link
                  to="/languages"
                  className="text-xs text-white hover:text-white font-medium"
                >
                  View All
                </Link>
              </div>

              {inProgressRoadmaps.length === 0 ? (
                <div className="text-center py-8">
                  <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#111213] border border-[rgba(255,255,255,0.06)]">
                    <Map className="h-4 w-4 text-[#555]" />
                  </div>
                  <p className="text-sm text-[#555] mb-4">
                    No active roadmaps yet
                  </p>
                  <Link
                    to="/languages"
                    className="inline-flex items-center gap-2 text-xs font-medium text-white hover:text-white border border-white/30 rounded-full px-3 py-1.5 bg-white hover:bg-white transition-all"
                  >
                    Browse Library <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              ) : (
                <div className="space-y-5">
                  {inProgressRoadmaps.slice(0, 3).map((lang) => {
                    const p = progressData[lang.id];
                    const percent = Math.round((p.completed / p.total) * 100);
                    return (
                      <Link
                        key={lang.id}
                        to={`/roadmap/${lang.id}`}
                        className="block group"
                      >
                        <div className="flex justify-between items-baseline text-xs font-medium mb-1.5">
                          <span className="text-white group-hover:text-white transition-colors">
                            {lang.name}
                          </span>
                          <span className="text-white">
                            {percent}%
                          </span>
                        </div>
                        <div className="h-1.5 bg-[rgba(255,255,255,0.06)] rounded-full overflow-hidden mb-1">
                          <div
                            className="h-full bg-white shadow-[0_0_8px_rgba(34,197,94,0.3)] group-hover:brightness-110 transition-all duration-300"
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                        <div className="text-[10px] text-[#555] group-hover:text-[#555] transition-colors">
                          Step {p.completed} of {p.total}
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Badges */}
            <div className="border border-[rgba(255,255,255,0.06)]/60 bg-[#111213]/20 backdrop-blur-sm rounded-xl p-6">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-sm font-bold text-[#888] uppercase tracking-widest">
                  Achievements
                </h2>
              </div>
              <AchievementBadges
                stats={{
                  totalCompleted: totalCompletedNodes,
                  streak: totalCompletedNodes > 0 ? 3 : 0,
                  roadmapsStarted: roadmapsStarted,
                  roadmapsCompleted: Object.values(progressData).filter(
                    (p) => p.completed >= p.total,
                  ).length,
                  level: displayLevel,
                }}
              />
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-3">
              <Button
                asChild
                variant="outline"
                className="h-12 border-[rgba(255,255,255,0.06)] bg-[#111213]/50 hover:bg-[rgba(255,255,255,0.06)] hover:text-white hover:border-[rgba(255,255,255,0.12)]"
              >
                <Link to="/til">
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-white" />
                    <span>TIL</span>
                  </div>
                </Link>
              </Button>
              {user && profile?.username && (
                <Button
                  variant="outline"
                  className="h-12 border-[rgba(255,255,255,0.06)] bg-[#111213]/50 hover:bg-[rgba(255,255,255,0.06)] hover:text-white hover:border-[rgba(255,255,255,0.12)]"
                  onClick={() => {
                    const url = `${window.location.origin}/u/${profile.username}`;
                    navigator.clipboard.writeText(url);
                    alert(`Profile link copied!\n${url}`);
                  }}
                >
                  <div className="flex items-center gap-2">
                    <Share2 className="h-4 w-4 text-white" />
                    <span>Share</span>
                  </div>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
