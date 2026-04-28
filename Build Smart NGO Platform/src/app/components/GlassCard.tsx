import React from 'react';
import { motion, HTMLMotionProps } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface GlassCardProps extends HTMLMotionProps<"div"> {
  hoverEffect?: boolean;
  glowColor?: "primary" | "secondary" | "accent" | "none";
}

export function GlassCard({ className, children, hoverEffect = true, glowColor = "none", ...props }: GlassCardProps) {
  const glowClasses = {
    primary: "hover:border-primary/50 hover:shadow-[0_0_20px_rgba(79,140,255,0.3)]",
    secondary: "hover:border-secondary/50 hover:shadow-[0_0_20px_rgba(124,92,255,0.3)]",
    accent: "hover:border-accent/50 hover:shadow-[0_0_20px_rgba(0,229,255,0.3)]",
    none: ""
  };

  return (
    <motion.div
      className={cn(
        "bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.1)] transition-colors duration-300",
        hoverEffect && "hover:bg-white/10",
        hoverEffect && glowClasses[glowColor],
        className
      )}
      whileHover={hoverEffect ? { y: -5 } : undefined}
      {...props}
    >
      {children}
    </motion.div>
  );
}
