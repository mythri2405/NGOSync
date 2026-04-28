import React from 'react';
import { motion } from 'motion/react';
import { cn } from './GlassCard';

interface ProgressBarProps {
  progress: number;
  className?: string;
  colorClass?: string;
  glow?: boolean;
}

export function ProgressBar({ progress, className, colorClass = "bg-primary", glow = true }: ProgressBarProps) {
  return (
    <div className={cn("w-full bg-white/10 rounded-full h-2.5 overflow-hidden", className)}>
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${progress}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
        className={cn(
          "h-2.5 rounded-full",
          colorClass,
          glow && "shadow-[0_0_10px_currentColor]"
        )}
      />
    </div>
  );
}
