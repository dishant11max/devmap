import { useMemo } from "react";

import { BadgeIcons } from "../components/dashboard/BadgeIcons";

// Badge Definitions
const BADGE_DEFINITIONS = [
  {
    id: "first-commit",
    name: "First Commit",
    description: "Complete your first learning step",
    icon: BadgeIcons.FirstCommit,
    condition: (stats) => stats.totalCompleted >= 1,
  },
  {
    id: "consistency",
    name: "Consistency",
    description: "Maintain a 3+ day streak",
    icon: BadgeIcons.Consistency,
    condition: (stats) => stats.streak >= 3,
  },
  {
    id: "momentum",
    name: "Momentum",
    description: "Complete 10 learning steps",
    icon: BadgeIcons.Momentum,
    condition: (stats) => stats.totalCompleted >= 10,
  },
  {
    id: "explorer",
    name: "Explorer",
    description: "Start learning 3 different technologies",
    icon: BadgeIcons.Explorer,
    condition: (stats) => stats.roadmapsStarted >= 3,
  },
  {
    id: "mastery",
    name: "Mastery",
    description: "Complete an entire roadmap",
    icon: BadgeIcons.Mastery,
    condition: (stats) => stats.roadmapsCompleted >= 1,
  },
  {
    id: "rising-star",
    name: "Rising Star",
    description: "Reach Level 5",
    icon: BadgeIcons.RisingStar,
    condition: (stats) => stats.level >= 5,
  },
  {
    id: "dedicated",
    name: "Dedicated",
    description: "Maintain a 30+ day streak",
    icon: BadgeIcons.Dedicated,
    condition: (stats) => stats.streak >= 30,
  },
];

export function useBadges(stats) {
  const badges = useMemo(() => {
    if (!stats) return { earned: [], locked: BADGE_DEFINITIONS };

    const earned = [];
    const locked = [];

    BADGE_DEFINITIONS.forEach((badge) => {
      if (badge.condition(stats)) {
        earned.push(badge);
      } else {
        locked.push(badge);
      }
    });

    return { earned, locked };
  }, [stats]);

  return badges;
}

export { BADGE_DEFINITIONS };
