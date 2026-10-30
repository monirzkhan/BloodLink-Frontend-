"use client";

import { useQueryClient } from "@tanstack/react-query";
import { cn } from "cn";
import {
  Droplet,
  Heart,
  LayoutDashboard,
  LogOut,
  Menu,
  Moon,
  PhoneCall,
  Sun,
  User,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "@/assest/logo";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { useGetMe, useLogout } from "@/hooks";
import { useTheme } from "@/providers/theme.provider";

type NavRoute = {
  name: string;
  path: string;
  badge?: string;
  isUrgent?: boolean;
};

const ROUTES: NavRoute[] = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about-us" },
  { name: "Find Donors", path: "/register?role=PATIENT" },
  { name: "Become a Donor", path: "/register?role=DONOR" },
  {
    name: "Emergency Need",
    path: "/register?role=PATIENT",
    badge: "Urgent",
    isUrgent: true,
  },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { resolvedTheme, toggleTheme } = useTheme();

  const { data, isLoading } = useGetMe();
  const { mutate: logout, isPending: isLoggingOut } = useLogout();
  const queryClient = useQueryClient();

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, []);

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        toast.add({
          type: "success",
          title: "Logged Out Successfully",
          description: "Stay safe! See you soon.",
        });
        queryClient.removeQueries({ queryKey: ["user"] });
      },
      onError: (_err) => {
        toast.add({
          type: "error",
          title: "Logout Failed",
          description: "Something went wrong while logging out.",
        });
      },
    });
  };

  // Determine dashboard URL based on user role if available
  const user = data as {
    name?: string;
    email?: string;
    role?: "DONOR" | "CALLER" | "ADMIN" | "HOSPITAL";
  } | null;

  const dashboardPath = user?.role
    ? user.role === "DONOR"
      ? "/donor"
      : user.role === "ADMIN"
        ? "/admin"
        : "/caller"
    : "/donor";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-xl transition-colors">
      {/* Top Micro-Bar: Emergency Helpline (Hidden on small mobile) */}
      <div className="hidden sm:block border-b border-border/40 bg-muted/40 py-1 text-[11px] text-muted-foreground">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-2">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
            </span>
            <span className="font-semibold text-foreground">
              Live Network Active:
            </span>
            <span>Over 14,890+ voluntary donors ready across 64 districts</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1 font-semibold text-primary">
              <PhoneCall className="size-3 text-emerald-500" />
              Emergency Line: 999 / 106
            </span>
            <span>•</span>
            <span className="text-muted-foreground">24/7 Matchmaking</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 sm:py-3.5">
        {/* Left: Brand Logo */}
        <div className="flex items-center gap-3">
          <Logo />
        </div>

        {/* Center: Desktop Navigation Links */}
        <nav
          aria-label="Main Navigation"
          className="hidden lg:flex items-center gap-1 xl:gap-2"
        >
          {ROUTES.map((route) => {
            const isActive = pathname === route.path;
            return (
              <Link
                key={route.name}
                href={route.path}
                className={cn(
                  "relative inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all",
                  isActive
                    ? "bg-primary/10 text-primary font-bold shadow-2xs"
                    : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
                  route.isUrgent &&
                    !isActive &&
                    "text-rose-600 dark:text-rose-400 font-bold",
                )}
              >
                {route.isUrgent && (
                  <span className="relative flex size-2 shrink-0">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-rose-500 opacity-75" />
                    <span className="relative inline-flex size-2 rounded-full bg-rose-500" />
                  </span>
                )}
                <span>{route.name}</span>
                {route.badge && (
                  <span
                    className={cn(
                      "rounded-full px-1.5 py-0.2 text-[9px] font-bold uppercase tracking-wider",
                      route.isUrgent
                        ? "bg-rose-500 text-white"
                        : "bg-primary/15 text-primary",
                    )}
                  >
                    {route.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right: Theme Toggle & Authentication CTAs */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Dark / Light Mode Toggle Button with Icon & Smooth Rotation */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={
              resolvedTheme === "dark"
                ? "Switch to Light Mode"
                : "Switch to Dark Mode"
            }
            className="group relative flex size-9 sm:size-10 items-center justify-center rounded-xl border border-border/70 bg-card/70 text-foreground shadow-2xs backdrop-blur-md transition-all hover:bg-muted hover:border-border active:scale-90 cursor-pointer"
          >
            {resolvedTheme === "dark" ? (
              <Sun className="size-4 sm:size-4.5 text-amber-400 transition-transform duration-500 group-hover:rotate-90 group-hover:scale-110" />
            ) : (
              <Moon className="size-4 sm:size-4.5 text-slate-700 transition-transform duration-500 group-hover:-rotate-45 group-hover:scale-110" />
            )}
          </button>

          {/* Logged Out Controls */}
          {!data && !isLoading && (
            <div className="hidden sm:flex items-center gap-2">
              <Link
                href="/login"
                className="inline-flex h-9 sm:h-10 items-center justify-center rounded-xl px-3.5 sm:px-4 text-xs sm:text-sm font-semibold text-foreground transition-all hover:bg-muted"
              >
                Sign In
              </Link>

              <Link
                href="/register"
                className="group relative inline-flex h-9 sm:h-10 items-center justify-center gap-1.5 overflow-hidden rounded-xl bg-gradient-to-r from-primary via-red-600 to-rose-600 px-4 text-xs sm:text-sm font-semibold text-white shadow-md shadow-primary/25 transition-all hover:shadow-lg hover:shadow-primary/35 hover:brightness-105 active:scale-95"
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full pointer-events-none" />
                <Heart className="size-3.5 fill-white/80" />
                <span>Register</span>
              </Link>
            </div>
          )}

          {/* Logged In Controls */}
          {data && !isLoading && (
            <div className="hidden sm:flex items-center gap-2">
              <Link
                href={dashboardPath}
                className="inline-flex items-center gap-2 rounded-xl border border-primary/20 bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary transition-all hover:bg-primary/20"
              >
                <div className="flex size-5 items-center justify-center rounded-full bg-primary text-white text-[10px]">
                  <User className="size-3" />
                </div>
                <span className="max-w-[120px] truncate">
                  {user?.name || "Dashboard"}
                </span>
                {user?.role && (
                  <span className="rounded-md bg-primary text-white px-1 py-0.2 text-[9px] font-bold uppercase">
                    {user.role}
                  </span>
                )}
              </Link>

              <Button
                variant="ghost"
                size="sm"
                disabled={isLoggingOut}
                onClick={handleLogout}
                className="h-9 px-2.5 text-xs text-muted-foreground hover:text-destructive transition-colors cursor-pointer"
                aria-label="Logout"
              >
                <LogOut className="size-4" />
                <span className="hidden md:inline ml-1">Logout</span>
              </Button>
            </div>
          )}

          {/* Mobile Hamburger Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            className="flex size-9 sm:size-10 items-center justify-center rounded-xl border border-border/70 bg-card/70 text-foreground shadow-2xs lg:hidden transition-all hover:bg-muted active:scale-90 cursor-pointer"
          >
            {mobileMenuOpen ? (
              <X className="size-5" />
            ) : (
              <Menu className="size-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Animated Dropdown Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-border/50 bg-background/95 px-4 pt-3 pb-6 shadow-2xl backdrop-blur-2xl transition-all animate-fadeIn">
          <nav
            aria-label="Mobile Navigation"
            className="flex flex-col space-y-1.5 pb-4"
          >
            {ROUTES.map((route) => {
              const isActive = pathname === route.path;
              return (
                <Link
                  key={route.name}
                  href={route.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-all",
                    isActive
                      ? "bg-primary/10 text-primary font-bold"
                      : "text-foreground hover:bg-muted/70",
                    route.isUrgent &&
                      "text-rose-600 dark:text-rose-400 font-bold",
                  )}
                >
                  <div className="flex items-center gap-2">
                    {route.isUrgent ? (
                      <Droplet className="size-4 text-rose-500 fill-rose-500" />
                    ) : (
                      <span className="size-1.5 rounded-full bg-muted-foreground/50" />
                    )}
                    <span>{route.name}</span>
                  </div>
                  {route.badge && (
                    <span
                      className={cn(
                        "rounded-full px-2 py-0.5 text-[10px] font-bold uppercase",
                        route.isUrgent
                          ? "bg-rose-500 text-white"
                          : "bg-primary/15 text-primary",
                      )}
                    >
                      {route.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Auth Actions */}
          <div className="space-y-2 border-t border-border/50 pt-3">
            {!data && !isLoading && (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex h-11 items-center justify-center rounded-xl border border-border/70 bg-card font-semibold text-sm text-foreground shadow-2xs hover:bg-muted transition-all text-center"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex h-11 items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-primary to-rose-600 font-semibold text-sm text-white shadow-md shadow-primary/20 hover:brightness-105 transition-all text-center"
                >
                  <Heart className="size-3.5 fill-white" />
                  <span>Register</span>
                </Link>
              </div>
            )}

            {data && !isLoading && (
              <div className="space-y-2">
                <Link
                  href={dashboardPath}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex h-11 items-center justify-between rounded-xl bg-primary/10 border border-primary/20 px-4 text-sm font-bold text-primary"
                >
                  <div className="flex items-center gap-2">
                    <LayoutDashboard className="size-4" />
                    <span>My Dashboard</span>
                  </div>
                  {user?.role && (
                    <span className="rounded-md bg-primary text-white px-2 py-0.5 text-[10px] uppercase">
                      {user.role}
                    </span>
                  )}
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-destructive/20 bg-destructive/5 text-destructive font-semibold text-sm hover:bg-destructive/10 transition-colors cursor-pointer"
                >
                  <LogOut className="size-4" />
                  <span>Logout of Account</span>
                </button>
              </div>
            )}

            {/* Emergency Hotline Banner on Mobile */}
            <div className="mt-3 flex items-center justify-between rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-2.5 text-xs text-emerald-800 dark:text-emerald-300">
              <div className="flex items-center gap-2">
                <PhoneCall className="size-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span className="font-semibold">Emergency Blood Hotline:</span>
              </div>
              <span className="font-bold">999 / 106</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
