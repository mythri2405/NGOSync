import React from 'react';
import { NavLink, Outlet, useLocation } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { HeartHandshake, Map, Users, Target, Trophy, Bot, Menu, X } from 'lucide-react';
import { Button } from './components/Button';
import { cn } from './components/GlassCard';

const NAV_ITEMS = [
  { path: '/dashboard', label: 'Dashboard', icon: Target },
  { path: '/dashboard/ngos', label: 'NGOs', icon: Users },
  { path: '/dashboard/donations', label: 'Donations', icon: HeartHandshake },
  { path: '/dashboard/matching', label: 'Matching', icon: Bot },
  { path: '/dashboard/map', label: 'Live Map', icon: Map },
  { path: '/dashboard/leaderboard', label: 'Leaderboard', icon: Trophy },
  { path: '/dashboard/ai-interpreter', label: 'AI Agent', icon: Bot },
];

export function Layout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const location = useLocation();

  React.useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-secondary/20 blur-[120px] rounded-full pointer-events-none" />

      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <NavLink to="/dashboard" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-accent flex items-center justify-center shadow-[0_0_20px_rgba(79,140,255,0.4)] group-hover:shadow-[0_0_30px_rgba(79,140,255,0.6)] transition-all">
                <HeartHandshake className="text-white w-6 h-6" />
              </div>
              <span className="font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
                NGOSync
              </span>
            </NavLink>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1 bg-white/5 rounded-2xl p-1.5 border border-white/10">
              {NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 relative",
                      isActive ? "text-white" : "text-white/60 hover:text-white hover:bg-white/5"
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      <item.icon className={cn("w-4 h-4", isActive ? "text-accent" : "")} />
                      {item.label}
                      {isActive && (
                        <motion.div
                          layoutId="nav-pill"
                          className="absolute inset-0 bg-white/10 rounded-xl border border-white/20"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </nav>

            {/* Action Buttons */}
            <div className="hidden md:flex items-center gap-4">
              <NavLink to="/">
                <Button variant="ghost">Sign Out</Button>
              </NavLink>
              <NavLink to="/dashboard/donations">
                <Button variant="primary">Donate Now</Button>
              </NavLink>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden text-white/80 hover:text-white p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-20 left-0 w-full bg-background/95 backdrop-blur-xl border-b border-white/10 z-40 py-4 px-4 flex flex-col gap-2"
          >
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-colors",
                    isActive ? "bg-white/10 text-white border border-white/20" : "text-white/60 hover:text-white hover:bg-white/5"
                  )
                }
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </NavLink>
            ))}
            <div className="h-px bg-white/10 my-2" />
            <NavLink to="/dashboard/donations">
              <Button variant="primary" className="w-full justify-center">Donate Now</Button>
            </NavLink>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <AnimatePresence mode="wait">
          <Outlet />
        </AnimatePresence>
      </main>
    </div>
  );
}
