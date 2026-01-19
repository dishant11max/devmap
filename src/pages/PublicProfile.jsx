import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { languages } from "../data/languages";
import { roadmaps } from "../data/roadmaps";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Zap, ArrowLeft, User } from "lucide-react";
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
        // 1. Fetch profile by username
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

        // 2. Fetch user's progress
        const { data: progressData, error: progressError } = await supabase
          .from("user_progress")
          .select("node_id, language_slug")
          .eq("user_id", profileData.id);

        if (progressError) {
          console.error("Error fetching progress:", progressError);
        }

        // 3. Calculate stats
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

        // 4. Radar Chart
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
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <User className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Profile Not Found</h1>
          <p className="text-muted-foreground mb-4">
            The user @{username} doesn't exist or hasn't set up their profile.
          </p>
          <Button asChild>
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Home
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Profile Header */}
        <div className="flex flex-col items-center text-center mb-12 bg-card border border-border rounded-xl p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

          {/* Avatar */}
          <div className="relative mb-4 z-10">
            {profile.avatar_url ? (
              <img
                src={profile.avatar_url}
                alt={profile.full_name}
                className="h-24 w-24 rounded-full border-4 border-background shadow-xl"
              />
            ) : (
              <div className="h-24 w-24 rounded-full bg-secondary flex items-center justify-center text-4xl font-bold text-primary border-4 border-background shadow-xl">
                {profile.full_name?.[0] || "?"}
              </div>
            )}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Level {level}
            </div>
          </div>

          {/* Name & Username */}
          <h1 className="text-3xl font-bold tracking-tight z-10">
            {profile.full_name || "Developer"}
          </h1>
          <p className="text-muted-foreground z-10">@{profile.username}</p>

          {/* Stats */}
          <div className="flex items-center gap-6 mt-4 z-10">
            <div className="flex items-center gap-1.5">
              <Zap className="h-5 w-5 text-yellow-500" />
              <span className="font-bold">{xp}</span>
              <span className="text-muted-foreground">XP</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold">{totalCompleted}</span>
              <span className="text-muted-foreground">Steps Completed</span>
            </div>
          </div>
        </div>

        {/* Skill Radar */}
        <Card>
          <CardHeader>
            <CardTitle>Skill Distribution</CardTitle>
            <CardDescription>
              {profile.full_name?.split(" ")[0] || "This developer"}'s strengths
              at a glance
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[350px]">
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
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground mb-4">
            Want your own DevMap profile?
          </p>
          <Button asChild>
            <Link to="/">Get Started</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
