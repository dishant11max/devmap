import { motion } from "framer-motion";

/**
 * ScrollReveal — Smooth scroll-triggered reveal animation.
 * Works seamlessly across both desktop and mobile viewports.
 * Uses GPU-accelerated opacity + transform (translateY) transitions.
 */
export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  y = 24,
  duration = 0.5,
  once = true,
  ...props
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-30px" }}
      transition={{
        duration,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/**
 * ScrollStagger — Container that staggers child ScrollStaggerItem components.
 */
export function ScrollStagger({
  children,
  className = "",
  staggerDelay = 0.06,
  delayChildren = 0.05,
  once = true,
  ...props
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-30px" }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren,
          },
        },
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/**
 * ScrollStaggerItem — Individual item inside a ScrollStagger container.
 */
export function ScrollStaggerItem({
  children,
  className = "",
  y = 16,
  duration = 0.45,
  ...props
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration,
            ease: [0.21, 0.47, 0.32, 0.98],
          },
        },
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
