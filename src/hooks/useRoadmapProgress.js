import { useState, useEffect } from "react";

export function useRoadmapProgress(languageSlug) {
  // State now holds objects: { id: string, date: string }
  const [completedItems, setCompletedItems] = useState([]);

  // Load initial state
  useEffect(() => {
    const saved = localStorage.getItem(`devmap_progress_${languageSlug}`);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Migration: Check if it's the old array of strings
        if (Array.isArray(parsed) && typeof parsed[0] === "string") {
          const migrated = parsed.map((id) => ({
            id,
            date: new Date().toISOString(),
          }));
          setCompletedItems(migrated);
          localStorage.setItem(
            `devmap_progress_${languageSlug}`,
            JSON.stringify(migrated)
          );
        } else {
          setCompletedItems(parsed || []);
        }
      } catch (e) {
        console.error("Failed to parse progress", e);
        setCompletedItems([]);
      }
    } else {
      setCompletedItems([]);
    }
  }, [languageSlug]);

  const toggleNode = (nodeId) => {
    setCompletedItems((prev) => {
      const exists = prev.find((item) => item.id === nodeId);
      let newItems;

      if (exists) {
        // Remove
        newItems = prev.filter((item) => item.id !== nodeId);
      } else {
        // Add with timestamp
        newItems = [...prev, { id: nodeId, date: new Date().toISOString() }];
      }

      localStorage.setItem(
        `devmap_progress_${languageSlug}`,
        JSON.stringify(newItems)
      );
      return newItems;
    });
  };

  // Helper for UI consumption (just want IDs)
  const completedNodes = completedItems.map((item) => item.id);
  const isCompleted = (nodeId) => completedNodes.includes(nodeId);

  const resetProgress = () => {
    setCompletedItems([]);
    localStorage.removeItem(`devmap_progress_${languageSlug}`);
  };

  return {
    completedNodes, // Keep API compatible for consumers who just want the list
    completedItems, // Expose full data for Dashboard
    toggleNode,
    isCompleted,
    resetProgress,
  };
}
