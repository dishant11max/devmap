import { useEffect, useState, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  Share2,
  Zap,
  Target,
  Trophy,
  Check,
  Map,
  ChevronRight,
} from "lucide-react";
import { useBadges } from "../hooks/useBadges";
import { languages } from "../data/languages";
import { csCoreRoadmaps } from "../data/csCore";
import { roadmaps } from "../data/roadmaps";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  Tooltip,
} from "recharts";
import { supabase } from "../lib/supabase";
import { useUserProfile } from "../hooks/useUserProfile";
import { ScrollReveal } from "../components/ui/ScrollReveal";

const CONTAINER = "w-full max-w-[1440px] mx-auto px-6";
const allTracks = [...languages, ...csCoreRoadmaps];

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
  const [_isLoading, setIsLoading] = useState(true);
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

  const displayLevel = level;
  const displayXp = xp;

  const roadmapsStarted = Object.values(progressData).filter(
    (p) => p.completed > 0,
  ).length;

  const inProgressRoadmaps = allTracks
    .filter((l) => progressData[l.id]?.completed > 0)
    .sort((a, b) => progressData[b.id].completed - progressData[a.id].completed);

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

  const badgeStats = useMemo(
    () => ({
      totalCompleted: totalCompletedNodes,
      streak: totalCompletedNodes > 0 ? 3 : 0,
      roadmapsStarted,
      roadmapsCompleted: Object.values(progressData).filter(
        (p) => p.completed >= p.total,
      ).length,
      level: displayLevel,
    }),
    [totalCompletedNodes, roadmapsStarted, progressData, displayLevel],
  );

  const { earned: earnedBadges, locked: lockedBadges } = useBadges(badgeStats);
  const displayName = user?.user_metadata?.full_name?.split(" ")[0] || "Developer";

  return (
    <>
      <style>{`
        .dash-row-link:focus-visible {
          outline: 2px solid var(--accent);
          outline-offset: -1px;
        }
        @media (prefers-reduced-motion: reduce) {
          .dash-bar { transition: none !important; }
        }
      `}</style>

      <div className="min-h-screen bg-bg text-text">
        <div className={CONTAINER}>
          {/* ── Page Header ────────────────────────────────────────── */}
          <div className="pt-16 pb-10 border-b border-border">
            <div className="font-mono text-xs text-muted mb-3">
              ~/dashboard
            </div>

            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
              <h1 className="font-sans text-3xl sm:text-4xl font-medium tracking-tight text-text">
                {displayName}
              </h1>

              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-muted border border-border px-2 py-1 rounded-[2px] bg-surface">
                  Lv.{displayLevel}
                </span>
                <span className="font-mono text-xs text-text">
                  {displayXp.toLocaleString()} XP
                </span>
              </div>
            </div>

            {/* Next level progress bar */}
            <div className="mt-5 max-w-xs">
              <div className="flex justify-between font-mono text-xs text-muted mb-1.5">
                <span>next level</span>
                <span>{totalCompletedNodes % 10}/10</span>
              </div>
              <div className="h-1 bg-border rounded-[2px] overflow-hidden">
                <div
                  className="dash-bar h-full bg-accent transition-all duration-700 ease-out"
                  style={{ width: `${(totalCompletedNodes % 10) * 10}%` }}
                />
              </div>
            </div>
          </div>

          {/* ── Stats Strip (2x2 on mobile, 4 columns on md+) ──────── */}
          <ScrollReveal delay={0.05} y={16}>
            <div className="grid grid-cols-2 md:grid-cols-4 border border-border rounded-[2px] mt-8 md:mt-12 bg-surface/20 divide-y md:divide-y-0 divide-x-0 md:divide-x divide-border">
              {/* Cell 1: Nodes completed */}
              <div className="p-4 sm:p-6 border-r border-border md:border-r-0">
                <div className="font-mono text-2xl sm:text-3xl font-medium text-text">
                  {totalCompletedNodes}
                </div>
                <div className="font-mono text-xs text-muted mt-1 flex items-center gap-1.5">
                  <Target className="h-3 w-3 shrink-0" />
                  <span>nodes completed</span>
                </div>
              </div>

              {/* Cell 2: Tracks active */}
              <div className="p-4 sm:p-6">
                <div className="font-mono text-2xl sm:text-3xl font-medium text-text">
                  {roadmapsStarted}
                </div>
                <div className="font-mono text-xs text-muted mt-1 flex items-center gap-1.5">
                  <Map className="h-3 w-3 shrink-0" />
                  <span>tracks active</span>
                </div>
              </div>

              {/* Cell 3: Current level */}
              <div className="p-4 sm:p-6 border-r border-border md:border-r-0">
                <div className="font-mono text-2xl sm:text-3xl font-medium text-text">
                  {displayLevel}
                </div>
                <div className="font-mono text-xs text-muted mt-1 flex items-center gap-1.5">
                  <Zap className="h-3 w-3 shrink-0" />
                  <span>current level</span>
                </div>
              </div>

              {/* Cell 4: Badges earned */}
              <div className="p-4 sm:p-6">
                <div className="font-mono text-2xl sm:text-3xl font-medium text-text">
                  {earnedBadges.length}
                </div>
                <div className="font-mono text-xs text-muted mt-1 flex items-center gap-1.5">
                  <Trophy className="h-3 w-3 shrink-0" />
                  <span>badges earned</span>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* ── Main Grid (1 col mobile, 2 col lg+) ────────────────── */}
          <ScrollReveal delay={0.1} y={20}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-border border border-border rounded-[2px] mt-8 md:mt-12 overflow-hidden">
              {/* Box 1: Activity Chart */}
            <div className="bg-bg p-5 sm:p-6">
              <div className="flex items-baseline justify-between mb-5">
                <span className="font-mono text-xs text-muted">activity</span>
                <span className="font-mono text-xs text-muted">last 12 weeks</span>
              </div>
              <div className="h-44 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} barSize={16}>
                    <Tooltip
                      cursor={{ fill: "transparent" }}
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="font-mono text-xs bg-surface border border-border p-2 rounded-[2px] shadow-lg">
                              <p className="text-muted">{payload[0].payload.date}</p>
                              <p className="text-text font-medium mt-0.5">
                                {payload[0].payload.original?.count ?? 0} nodes
                              </p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar dataKey="visualValue" radius={[2, 2, 0, 0]}>
                      {chartData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={entry.count > 0 ? "var(--accent)" : "var(--border)"}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Box 2: Jump Back In */}
            <div className="bg-bg p-5 sm:p-6">
              <div className="flex items-baseline justify-between mb-5">
                <span className="font-mono text-xs text-muted">jump back in</span>
                <Link
                  to="/languages"
                  className="font-mono text-xs text-muted hover:text-text transition-colors"
                >
                  all tracks →
                </Link>
              </div>

              {inProgressRoadmaps.length === 0 ? (
                <p className="font-mono text-xs text-muted py-6">
                  No active tracks yet.{" "}
                  <Link
                    to="/languages"
                    className="text-text underline underline-offset-2 hover:text-ink transition-colors"
                  >
                    Browse tracks →
                  </Link>
                </p>
              ) : (
                <div className="divide-y divide-border">
                  {inProgressRoadmaps.slice(0, 4).map((lang) => {
                    const p = progressData[lang.id];
                    const percent = Math.round((p.completed / p.total) * 100);
                    const isDone = percent === 100;
                    return (
                      <Link
                        key={lang.id}
                        to={`/roadmap/${lang.id}`}
                        className="dash-row-link block py-3 group hover:bg-surface/40 transition-colors -mx-2 px-2 rounded-[2px]"
                      >
                        <div className="flex justify-between items-baseline mb-1.5">
                          <span className="font-sans text-sm font-medium text-text group-hover:text-ink transition-colors">
                            {lang.name}
                          </span>
                          <span className="font-mono text-xs text-muted">
                            {isDone ? (
                              <span className="text-ink">done</span>
                            ) : (
                              `${percent}%`
                            )}
                          </span>
                        </div>
                        <div className="h-1 bg-border rounded-[2px] overflow-hidden mb-1.5">
                          <div
                            className="dash-bar h-full bg-accent transition-all duration-300"
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                        <div className="font-mono text-xs text-muted">
                          {p.completed} / {p.total} nodes
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Box 3: Recent Activity */}
            <div className="bg-bg p-5 sm:p-6">
              <span className="font-mono text-xs text-muted block mb-5">
                recent
              </span>

              {recentActivity.length === 0 ? (
                <p className="font-mono text-xs text-muted py-6">
                  No activity yet.{" "}
                  <Link
                    to="/languages"
                    className="text-text underline underline-offset-2 hover:text-ink transition-colors"
                  >
                    Start a track →
                  </Link>
                </p>
              ) : (
                (() => {
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
                    <div className="divide-y divide-border">
                      {groupedList.map((act, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between py-2.5 gap-3"
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <Check className="h-3.5 w-3.5 text-muted shrink-0" />
                            <div className="min-w-0">
                              <p className="font-sans text-sm text-text truncate">
                                {act.language}
                              </p>
                              <p className="font-mono text-xs text-muted">
                                {act.count} node{act.count > 1 ? "s" : ""} completed
                              </p>
                            </div>
                          </div>
                          <span className="font-mono text-xs text-muted shrink-0">
                            {new Date(act.date).toLocaleDateString(undefined, {
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                      ))}
                    </div>
                  );
                })()
              )}
            </div>

            {/* Box 4: Quick Links */}
            <div className="bg-bg p-5 sm:p-6 flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs text-muted block mb-5">
                  quick links
                </span>

                <div className="space-y-2">
                  <Link
                    to="/til"
                    className="dash-row-link flex items-center justify-between p-3 border border-border rounded-[2px] font-mono text-xs text-text hover:bg-surface hover:text-ink transition-colors"
                  >
                    <span>TIL log</span>
                    <ChevronRight className="h-3.5 w-3.5 text-muted" />
                  </Link>

                  <Link
                    to="/languages"
                    className="dash-row-link flex items-center justify-between p-3 border border-border rounded-[2px] font-mono text-xs text-text hover:bg-surface hover:text-ink transition-colors"
                  >
                    <span>Languages</span>
                    <ChevronRight className="h-3.5 w-3.5 text-muted" />
                  </Link>

                  <Link
                    to="/cs-core"
                    className="dash-row-link flex items-center justify-between p-3 border border-border rounded-[2px] font-mono text-xs text-text hover:bg-surface hover:text-ink transition-colors"
                  >
                    <span>CS Core</span>
                    <ChevronRight className="h-3.5 w-3.5 text-muted" />
                  </Link>
                </div>
              </div>

              {user && profile?.username && (
                <button
                  type="button"
                  onClick={() => {
                    const url = `${window.location.origin}/u/${profile.username}`;
                    navigator.clipboard.writeText(url);
                    alert(`Profile link copied!\n${url}`);
                  }}
                  className="dash-row-link mt-4 flex items-center justify-between p-3 border border-border rounded-[2px] font-mono text-xs text-text hover:bg-surface hover:text-ink transition-colors cursor-pointer text-left w-full"
                >
                  <span className="flex items-center gap-2">
                    <Share2 className="h-3.5 w-3.5 text-muted" />
                    <span>Copy public profile link</span>
                  </span>
                  <ChevronRight className="h-3.5 w-3.5 text-muted" />
                </button>
              )}
            </div>
          </div>
          </ScrollReveal>

          {/* ── Achievements ───────────────────────────────────────── */}
          <ScrollReveal delay={0.15} y={20}>
            <div className="mt-12 pb-20">
              <div className="flex items-baseline justify-between mb-4">
                <span className="font-mono text-xs text-muted">
                  achievements — {earnedBadges.length} unlocked
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {earnedBadges.map((badge) => (
                  <div
                    key={badge.id}
                    className="flex items-center gap-3 p-3 border border-border rounded-[2px] bg-surface/30"
                  >
                    <div className="h-7 w-7 rounded-[2px] bg-surface border border-border flex items-center justify-center shrink-0">
                      <badge.icon className="h-4 w-4 text-text" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-mono text-xs font-medium text-text truncate">
                        {badge.name}
                      </p>
                      <p className="font-mono text-[11px] text-muted truncate">
                        {badge.description}
                      </p>
                    </div>
                  </div>
                ))}

                {lockedBadges.map((badge) => (
                  <div
                    key={badge.id}
                    className="flex items-center gap-3 p-3 border border-border/50 rounded-[2px] opacity-40"
                  >
                    <div className="h-7 w-7 rounded-[2px] border border-border flex items-center justify-center shrink-0">
                      <badge.icon className="h-4 w-4 text-muted" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-mono text-xs text-muted truncate">
                        {badge.name}
                      </p>
                      <p className="font-mono text-[11px] text-muted truncate">
                        {badge.description}
                      </p>
                    </div>
                    <span className="font-mono text-[10px] text-muted uppercase tracking-wider shrink-0 border border-border px-1 py-0.5 rounded-[2px]">
                      locked
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </>
  );
}
