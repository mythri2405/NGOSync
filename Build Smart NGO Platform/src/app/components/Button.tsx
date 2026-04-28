import React from 'react';
import { motion, HTMLMotionProps } from 'motion/react';
import { cn } from './GlassCard';

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "secondary" | "accent" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

export function Button({ variant = "primary", size = "md", className, children, ...props }: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center rounded-xl font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50 disabled:pointer-events-none";
  
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-5 py-2.5 text-sm",
    lg: "px-8 py-3.5 text-base"
  };

  const variants = {
    primary: "bg-primary text-white hover:bg-primary/90 shadow-[0_0_15px_rgba(79,140,255,0.4)] hover:shadow-[0_0_25px_rgba(79,140,255,0.6)] focus:ring-primary",
    secondary: "bg-secondary text-white hover:bg-secondary/90 shadow-[0_0_15px_rgba(124,92,255,0.4)] hover:shadow-[0_0_25px_rgba(124,92,255,0.6)] focus:ring-secondary",
    accent: "bg-accent text-accent-foreground hover:bg-accent/90 shadow-[0_0_15px_rgba(0,229,255,0.4)] hover:shadow-[0_0_25px_rgba(0,229,255,0.6)] focus:ring-accent",
    outline: "border border-white/20 bg-transparent hover:bg-white/10 text-white focus:ring-white/50",
    ghost: "bg-transparent hover:bg-white/10 text-white focus:ring-white/50"
  };

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      className={cn(baseStyles, sizes[size], variants[variant], className)}
      {...props}
    >
      {children}
    </motion.button>
  );
}
