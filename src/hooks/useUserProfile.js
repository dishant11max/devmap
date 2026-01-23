import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabase";

export function useUserProfile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load Profile from DB
  useEffect(() => {
    async function loadProfile() {
      if (!user) {
        setProfile({
          level: 1,
          total_xp: 0,
          current_streak: 0,
          full_name: "Guest",
        });
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        if (error) {
          console.error("Error fetching profile:", error);
        } else {
          setProfile(data);
        }
      } catch (err) {
        console.error("Profile load failed", err);
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, [user]);

  // Recalculate Stats
  const updateStats = async (totalNodesCompleted) => {
    if (!user) return;

    const newXp = totalNodesCompleted * 100;
    const newLevel = Math.floor(totalNodesCompleted / 10) + 1;

    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          total_xp: newXp,
          level: newLevel,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id);

      if (!error) {
        setProfile((prev) => ({ ...prev, total_xp: newXp, level: newLevel }));
      }
    } catch (err) {
      console.error("Failed to update stats", err);
    }
  };

  return { profile, loading, updateStats };
}
