import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { languages } from "../data/languages";
import { roadmaps } from "../data/roadmaps";
import { Button } from "../components/ui/Button";
import { Zap, ArrowLeft, User, Target, Trophy } from "lucide-react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

export default function PublicProfile() {
  const { username } = useParams();
  const [profile, setProfile] = useState(null);
  const [radarData, setRadarData] = useState([]);
  const [totalCompleted, setTotalCompleted] = useState(0);
  const [level, setLevel] = useState(1);
  const [xp, setXp] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadPublicProfile() {
      setIsLoading(true);
      setError(null);

      try {
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("username", username)
          .single();

        if (profileError || !profileData) {
          setError("Profile not found");
          setIsLoading(false);
          return;
        }

        setProfile(profileData);

        const { data: progressData, error: progressError } = await supabase
          .from("user_progress")
          .select("node_id, language_slug")
          .eq("user_id", profileData.id);

        if (progressError) {
          console.error("Error fetching progress:", progressError);
        }

        const aggregatedProgress = {};
        languages.forEach((lang) => {
          aggregatedProgress[lang.id] = {
            completed: 0,
            total: roadmaps[lang.id]?.nodes?.length || 20,
            name: lang.name,
          };
        });

        (progressData || []).forEach((row) => {
          if (aggregatedProgress[row.language_slug]) {
            aggregatedProgress[row.language_slug].completed++;
          }
        });

        const total = Object.values(aggregatedProgress).reduce(
          (acc, curr) => acc + curr.completed,
          0,
        );
        setTotalCompleted(total);
        setLevel(Math.floor(total / 10) + 1);
        setXp(total * 100);

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
      } catch (err) {
        console.error("Error loading profile:", err);
        setError("Something went wrong");
      } finally {
        setIsLoading(false);
      }
    }

    loadPublicProfile();
  }, [username]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4" />
          <p className="text-zinc-500">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="text-center">
          <User className="h-16 w-16 text-zinc-700 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-zinc-100 mb-2">
            Profile Not Found
          </h1>
          <p className="text-zinc-500 mb-4">
            The user @{username} doesn't exist or hasn't set up their profile.
          </p>
          <Button asChild className="bg-green-600 hover:bg-green-700">
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Home
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const roadmapsStarted =
    Object.keys(languages).length > 0 ? Math.floor(totalCompleted / 5) || 0 : 0;

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 py-10">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay fixed"></div>

      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        {/* Profile Header */}
        <div className="relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/40 backdrop-blur-md p-8 mb-8">
          <div className="flex flex-col items-center text-center">
            {/* Avatar */}
            <div className="relative mb-4">
              {profile.avatar_url ? (
                <img
                  src={profile.avatar_url}
                  alt={profile.full_name}
                  className="h-24 w-24 rounded-full border-4 border-zinc-800 shadow-xl"
                />
              ) : (
                <div className="h-24 w-24 rounded-full bg-zinc-800 flex items-center justify-center text-4xl font-bold text-zinc-400 border-4 border-zinc-700 shadow-xl">
                  {profile.full_name?.[0] || "?"}
                </div>
              )}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                Level {level}
              </div>
            </div>

            {/* Name & Username */}
            <h1 className="text-3xl font-bold text-white tracking-tight">
              {profile.full_name || "Developer"}
            </h1>
            <p className="text-zinc-500">@{profile.username}</p>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="border border-zinc-800 rounded-xl p-5 bg-zinc-900/40 text-center">
            <div className="text-3xl font-bold text-zinc-100">
              {xp.toLocaleString()}
            </div>
            <div className="text-xs text-zinc-500 mt-1 uppercase tracking-wide flex items-center justify-center gap-1.5">
              <Zap className="h-3 w-3 text-yellow-500" />
              XP Earned
            </div>
          </div>
          <div className="border border-zinc-800 rounded-xl p-5 bg-zinc-900/40 text-center">
            <div className="text-3xl font-bold text-zinc-100">
              {totalCompleted}
            </div>
            <div className="text-xs text-zinc-500 mt-1 uppercase tracking-wide flex items-center justify-center gap-1.5">
              <Target className="h-3 w-3 text-green-500" />
              Steps
            </div>
          </div>
          <div className="border border-zinc-800 rounded-xl p-5 bg-zinc-900/40 text-center">
            <div className="text-3xl font-bold text-zinc-100">{level}</div>
            <div className="text-xs text-zinc-500 mt-1 uppercase tracking-wide flex items-center justify-center gap-1.5">
              <Trophy className="h-3 w-3 text-amber-500" />
              Level
            </div>
          </div>
        </div>

        {/* Skill Radar */}
        <div className="border border-zinc-800 rounded-2xl bg-zinc-900/40 backdrop-blur-md p-6 mb-8">
          <h2 className="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-6">
            Skill Distribution
          </h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
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
          </div>
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-sm text-zinc-600 mb-4">
            Want your own DevMap profile?
          </p>
          <Button asChild className="bg-green-600 hover:bg-green-700">
            <Link to="/">Get Started</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
