import React from 'react';
import { cn } from './GlassCard';

interface BadgeProps {
  children: React.ReactNode;
  variant?: "critical" | "high" | "medium" | "low" | "default" | "success" | "outline";
  className?: string;
  glow?: boolean;
}

export function Badge({ children, variant = "default", className, glow = true }: BadgeProps) {
  const variants = {
    critical: `bg-destructive/20 text-destructive border-destructive/50 ${glow ? 'shadow-[0_0_10px_rgba(255,77,77,0.5)]' : ''}`,
    high: `bg-warning/20 text-warning border-warning/50 ${glow ? 'shadow-[0_0_10px_rgba(255,176,32,0.5)]' : ''}`,
    medium: `bg-primary/20 text-primary border-primary/50 ${glow ? 'shadow-[0_0_10px_rgba(79,140,255,0.5)]' : ''}`,
    low: `bg-accent/20 text-accent border-accent/50 ${glow ? 'shadow-[0_0_10px_rgba(0,229,255,0.5)]' : ''}`,
    success: `bg-green-500/20 text-green-400 border-green-500/50 ${glow ? 'shadow-[0_0_10px_rgba(34,197,94,0.5)]' : ''}`,
    default: "bg-white/10 text-white border-white/20",
    outline: "bg-transparent text-white border-white/30"
  };

  return (
    <span className={cn("px-2.5 py-0.5 rounded-full text-xs font-semibold border backdrop-blur-md", variants[variant], className)}>
      {children}
    </span>
  );
}
