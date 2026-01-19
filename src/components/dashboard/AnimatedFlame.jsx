import { Flame } from "lucide-react";
import { motion } from "framer-motion";

export function AnimatedFlame({ isActive = false, className = "" }) {
  if (!isActive) {
    return <Flame className={`h-4 w-4 text-muted-foreground ${className}`} />;
  }

  return (
    <motion.div
      className={`relative ${className}`}
      animate={{
        scale: [1, 1.15, 1],
      }}
      transition={{
        duration: 0.8,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <Flame className="h-4 w-4 text-orange-500" />
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-full bg-orange-500/30 blur-md -z-10"
        animate={{
          opacity: [0.3, 0.6, 0.3],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
}
