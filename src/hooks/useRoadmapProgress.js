import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabase";

export function useRoadmapProgress(languageSlug) {
  const { user } = useAuth();
  // State now holds objects: { id: string, date: string }
  const [completedItems, setCompletedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load state (Local or Cloud)
  useEffect(() => {
    let mounted = true;

    async function loadProgress() {
      setIsLoading(true);

      if (user) {
        // --- LOGGED IN: FETCH FROM SUPABASE ---
        try {
          // 1. Fetch Cloud Data
          const { data, error } = await supabase
            .from("user_progress")
            .select("node_id, completed_at")
            .eq("language_slug", languageSlug)
            .eq("user_id", user.id);

          if (error) throw error;

          const cloudItems =
            data?.map((row) => ({
              id: row.node_id,
              date: row.completed_at,
            })) || [];

          // 2. Migration Check (Local -> Cloud)
          // If cloud is empty but local has data, push local to cloud
          const localSaved = localStorage.getItem(
            `devmap_progress_${languageSlug}`,
          );
          if (localSaved && cloudItems.length === 0) {
            console.log("Migrating local progress to cloud...");
            try {
              let localParsed = JSON.parse(localSaved);
              // Handle old string array format
              if (
                Array.isArray(localParsed) &&
                typeof localParsed[0] === "string"
              ) {
                localParsed = localParsed.map((id) => ({
                  id,
                  date: new Date().toISOString(),
                }));
              }

              // Insert into Supabase
              const updates = localParsed.map((item) => ({
                user_id: user.id,
                node_id: item.id,
                language_slug: languageSlug,
                completed_at: item.date,
              }));

              if (updates.length > 0) {
                const { error: insertError } = await supabase
                  .from("user_progress")
                  .upsert(updates, { onConflict: "user_id, node_id" });

                if (!insertError) {
                  // If successful, use the local data as the initial state
                  if (mounted) setCompletedItems(localParsed);
                  // Optional: Clear local storage after successful sync?
                  // localStorage.removeItem(`devmap_progress_${languageSlug}`);
                  setIsLoading(false);
                  return;
                }
              }
            } catch (err) {
              console.error("Migration failed", err);
            }
          }

          if (mounted) setCompletedItems(cloudItems);
        } catch (err) {
          console.error("Error loading cloud progress:", err);
        }
      } else {
        // --- GUEST: FETCH FROM LOCAL STORAGE ---
        const saved = localStorage.getItem(`devmap_progress_${languageSlug}`);
        if (saved) {
          try {
            const parsed = JSON.parse(saved);
            if (Array.isArray(parsed) && typeof parsed[0] === "string") {
              const migrated = parsed.map((id) => ({
                id,
                date: new Date().toISOString(),
              }));
              setCompletedItems(migrated);
            } else {
              setCompletedItems(parsed || []);
            }
          } catch (e) {
            console.error("Failed to parse local progress", e);
            setCompletedItems([]);
          }
        } else {
          setCompletedItems([]);
        }
      }
      setIsLoading(false);
    }

    loadProgress();

    return () => {
      mounted = false;
    };
  }, [languageSlug, user]);

  const toggleNode = async (nodeId) => {
    // Optimistic Update
    const previousItems = [...completedItems];
    let newItems;

    const exists = completedItems.find((item) => item.id === nodeId);

    if (exists) {
      newItems = completedItems.filter((item) => item.id !== nodeId);
    } else {
      newItems = [
        ...completedItems,
        { id: nodeId, date: new Date().toISOString() },
      ];
    }

    setCompletedItems(newItems);

    if (user) {
      // Sync to Cloud
      if (exists) {
        // DELETE
        const { error } = await supabase
          .from("user_progress")
          .delete()
          .eq("user_id", user.id)
          .eq("node_id", nodeId)
          .eq("language_slug", languageSlug); // Good practice to include slug

        if (error) {
          console.error("Failed to delete progress", error);
          setCompletedItems(previousItems); // Rollback
        }
      } else {
        // INSERT
        const { error } = await supabase.from("user_progress").insert({
          user_id: user.id,
          node_id: nodeId,
          language_slug: languageSlug,
        });

        if (error) {
          console.error("Failed to save progress", error);
          setCompletedItems(previousItems); // Rollback
        }
      }
    } else {
      // Sync to Local
      localStorage.setItem(
        `devmap_progress_${languageSlug}`,
        JSON.stringify(newItems),
      );
    }
  };

  // Helper for UI consumption (just want IDs)
  const completedNodes = completedItems.map((item) => item.id);
  const isCompleted = (nodeId) => completedNodes.includes(nodeId);

  const resetProgress = async () => {
    setCompletedItems([]);
    if (user) {
      await supabase
        .from("user_progress")
        .delete()
        .eq("language_slug", languageSlug)
        .eq("user_id", user.id);
    } else {
      localStorage.removeItem(`devmap_progress_${languageSlug}`);
    }
  };

  return {
    completedNodes,
    completedItems,
    toggleNode,
    isCompleted,
    resetProgress,
    isLoading,
  };
}
