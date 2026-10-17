"use client";

import { cn } from "cn";
import {
  Activity,
  ArrowRight,
  CheckCircle2,
  Droplet,
  Heart,
  Hospital,
  PhoneCall,
  Search,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type BloodInfo = {
  group: string;
  donorsNearby: number;
  matchRate: string;
  type: string;
  urgentNotice: string;
};

const BLOOD_STATS: Record<string, BloodInfo> = {
  "O-": {
    group: "O-",
    donorsNearby: 34,
    matchRate: "99.8%",
    type: "Universal Donor (Can give to all 8 types)",
    urgentNotice: "Critical supply level — Highest hospital demand today",
  },
  "O+": {
    group: "O+",
    donorsNearby: 142,
    matchRate: "99.4%",
    type: "Most Common Type in Bangladesh",
    urgentNotice: "High demand in surgical & trauma emergency units",
  },
  "A+": {
    group: "A+",
    donorsNearby: 98,
    matchRate: "99.2%",
    type: "Compatible with A+ and AB+",
    urgentNotice: "Platelet requests active in Dhaka & Chittagong",
  },
  "A-": {
    group: "A-",
    donorsNearby: 19,
    matchRate: "98.7%",
    type: "Rare Blood Group",
    urgentNotice: "Rare donor needed: 2 units requested in Sylhet",
  },
  "B+": {
    group: "B+",
    donorsNearby: 124,
    matchRate: "99.5%",
    type: "High Frequency Group",
    urgentNotice: "Ready donors standing by across 64 districts",
  },
  "B-": {
    group: "B-",
    donorsNearby: 22,
    matchRate: "98.9%",
    type: "Critical Shortage Group",
    urgentNotice: "Urgent B- call: National Heart Foundation",
  },
  "AB+": {
    group: "AB+",
    donorsNearby: 64,
    matchRate: "99.6%",
    type: "Universal Recipient (Can receive any type)",
    urgentNotice: "Routine donations active at partner hospitals",
  },
  "AB-": {
    group: "AB-",
    donorsNearby: 12,
    matchRate: "98.1%",
    type: "Rarest Blood Type (<1% population)",
    urgentNotice: "VIP Alert: Emergency standby volunteer dispatched",
  },
};

const EMERGENCY_TICKERS = [
  {
    id: 1,
    blood: "O-",
    location: "Dhaka Medical College Hospital",
    time: "2 mins ago",
    status: "Urgent",
  },
  {
    id: 2,
    blood: "B+",
    location: "Chittagong General Hospital",
    time: "5 mins ago",
    status: "Matched",
  },
  {
    id: 3,
    blood: "A+ Platelets",
    location: "Square Hospital, Panthapath",
    time: "8 mins ago",
    status: "Dispatched",
  },
  {
    id: 4,
    blood: "AB-",
    location: "Rajshahi Medical Centre",
    time: "12 mins ago",
    status: "Standby",
  },
];

export default function HeroPage() {
  const [selectedBlood, setSelectedBlood] = useState<string>("O-");
  const [activeTicker, setActiveTicker] = useState(0);

  // 3D Parallax tilt state for the central blood droplet
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Rotating emergency requests ticker
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTicker((prev) => (prev + 1) % EMERGENCY_TICKERS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Mouse move handler for interactive 3D tilt
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    // Normalized tilt values
    setTilt({
      x: (y / (rect.height / 2)) * -14,
      y: (x / (rect.width / 2)) * 14,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const activeStats = BLOOD_STATS[selectedBlood] || BLOOD_STATS["O-"];
  const currentTicker = EMERGENCY_TICKERS[activeTicker];

  return (
    <section className="relative w-full overflow-hidden rounded-3xl py-6 sm:py-10 lg:py-16">
      {/* Background Volumetric Ambient Lighting */}
      <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 size-96 sm:size-[500px] rounded-full bg-gradient-to-tr from-primary/20 via-rose-500/15 to-transparent blur-[140px] dark:bg-primary/25" />
      <div className="pointer-events-none absolute bottom-0 right-10 size-80 rounded-full bg-red-600/10 blur-[120px]" />

      <div className="relative z-10 grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-8 xl:gap-12">
        {/* Left Column: Narrative, Interactive Match Explorer & CTAs (7 cols on lg) */}
        <div className="flex flex-col space-y-6 sm:space-y-8 lg:col-span-7">
          {/* Live Emergency Ticker Pill */}
          <div className="inline-flex w-fit items-center gap-2.5 rounded-full border border-primary/25 bg-primary/10 px-3.5 py-1.5 text-xs font-semibold text-primary shadow-xs backdrop-blur-md transition-all hover:bg-primary/15">
            <span className="relative flex size-2.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex size-2.5 rounded-full bg-primary" />
            </span>
            <span className="font-bold uppercase tracking-wider text-[11px] sm:text-xs">
              Live Emergency Network
            </span>
            <span className="hidden sm:inline text-muted-foreground">•</span>
            <span className="hidden sm:inline font-normal text-foreground truncate max-w-[280px]">
              {currentTicker.blood} Needed at {currentTicker.location}
            </span>
          </div>

          {/* Headline with 3D Gradient Text & Life-Saving Punch */}
          <div className="space-y-3 sm:space-y-4">
            <h1 className="text-3xl font-black tracking-tight text-foreground sm:text-4xl md:text-5xl xl:text-6xl leading-[1.12]">
              Every Drop Holds A{" "}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-primary via-rose-500 to-amber-500 bg-clip-text text-transparent drop-shadow-xs">
                  Second Chance
                </span>
                <span className="absolute -bottom-1 left-0 h-1 w-full rounded-full bg-gradient-to-r from-primary to-rose-500/60" />
              </span>{" "}
              At Life.
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl">
              Bangladesh&apos;s intelligent voluntary blood matching registry.
              We connect emergency patients, nearby verified donors, and
              hospital ICUs in real-time within{" "}
              <span className="font-semibold text-foreground">minutes</span>.
            </p>
          </div>

          {/* Interactive Blood Group Availability Matrix */}
          <div className="rounded-2xl border border-border/70 bg-card/75 p-3.5 sm:p-5 shadow-xl backdrop-blur-xl">
            <div className="mb-2.5 flex flex-wrap items-center justify-between gap-1.5">
              <div className="flex items-center gap-2">
                <div className="flex size-6 items-center justify-center rounded-lg bg-primary/15 text-primary">
                  <Droplet className="size-3.5 fill-primary/30" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-foreground">
                  Quick Live Blood Availability Finder
                </span>
              </div>
              <span className="text-[11px] font-medium text-primary">
                Tap group to check donors
              </span>
            </div>

            {/* 8 Blood Type Buttons */}
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5">
              {Object.keys(BLOOD_STATS).map((group) => {
                const isSelected = selectedBlood === group;
                return (
                  <button
                    key={group}
                    type="button"
                    onClick={() => setSelectedBlood(group)}
                    className={cn(
                      "flex flex-col items-center justify-center rounded-xl py-2 px-1 text-center transition-all cursor-pointer active:scale-95",
                      isSelected
                        ? "bg-gradient-to-br from-primary to-rose-600 text-white shadow-lg shadow-primary/35 scale-105 border border-primary/50 font-black"
                        : "bg-muted/50 hover:bg-muted text-foreground border border-border/50 font-bold",
                    )}
                  >
                    <span className="text-sm sm:text-base leading-none">
                      {group}
                    </span>
                    <span
                      className={cn(
                        "text-[9px] mt-0.5 leading-none",
                        isSelected ? "text-white/80" : "text-muted-foreground",
                      )}
                    >
                      {BLOOD_STATS[group].donorsNearby} on
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Dynamic Result Box for Selected Group */}
            <div className="mt-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 rounded-xl border border-primary/20 bg-primary/5 p-3 text-xs">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="rounded-md bg-primary px-2 py-0.5 text-xs font-black text-white">
                    {activeStats.group}
                  </span>
                  <span className="font-semibold text-foreground">
                    {activeStats.type}
                  </span>
                </div>
                <p className="text-[11px] text-muted-foreground">
                  {activeStats.urgentNotice}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <div className="text-right hidden sm:block">
                  <span className="block text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    {activeStats.matchRate} Match Rate
                  </span>
                  <span className="block text-[10px] text-muted-foreground">
                    {activeStats.donorsNearby} Active Donors
                  </span>
                </div>
                <Link
                  href="/register"
                  className="inline-flex items-center gap-1 rounded-lg bg-primary hover:bg-primary/90 text-white px-3 py-1.5 text-xs font-bold shadow-sm transition-all active:scale-95"
                >
                  <span>Request {activeStats.group}</span>
                  <ArrowRight className="size-3" />
                </Link>
              </div>
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
            <Link
              href="/register"
              className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-primary via-red-600 to-rose-600 px-7 text-sm font-bold tracking-wide text-white shadow-xl shadow-primary/30 transition-all hover:shadow-2xl hover:shadow-primary/40 hover:brightness-105 active:scale-98"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-1000 group-hover:translate-x-full pointer-events-none" />
              <span className="flex items-center gap-2">
                <Search className="size-4" />
                <span>Find Donors Fast</span>
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>

            <Link
              href="/register"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-border/80 bg-card/80 px-6 text-sm font-semibold text-foreground shadow-sm backdrop-blur-md transition-all hover:bg-muted hover:border-border active:scale-98"
            >
              <Heart className="size-4 text-rose-500 fill-rose-500/30" />
              <span>Register as Life Saver</span>
            </Link>

            <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-muted-foreground sm:ml-auto">
              <PhoneCall className="size-3.5 text-emerald-500 animate-pulse" />
              <span>24/7 Helpline: 999 / 106</span>
            </div>
          </div>

          {/* Live Trust Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-border/50">
            <div className="space-y-0.5">
              <span className="text-xl sm:text-2xl font-black text-foreground">
                14,890+
              </span>
              <span className="block text-[11px] font-medium text-muted-foreground">
                Verified Donors
              </span>
            </div>

            <div className="space-y-0.5">
              <span className="text-xl sm:text-2xl font-black text-primary">
                99.4%
              </span>
              <span className="block text-[11px] font-medium text-muted-foreground">
                Fulfillment Rate
              </span>
            </div>

            <div className="space-y-0.5">
              <span className="text-xl sm:text-2xl font-black text-emerald-500">
                6.4 min
              </span>
              <span className="block text-[11px] font-medium text-muted-foreground">
                Average Response
              </span>
            </div>

            <div className="space-y-0.5">
              <span className="text-xl sm:text-2xl font-black text-amber-500">
                64 / 64
              </span>
              <span className="block text-[11px] font-medium text-muted-foreground">
                Districts Active
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: 3D Visual Showcase & Interactive Blood Drop (5 cols on lg) */}
        <section
          ref={containerRef}
          aria-label="3D Blood Droplet Interactive Showcase"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative flex items-center justify-center lg:col-span-5 min-h-[380px] sm:min-h-[460px] lg:min-h-[520px]"
          style={{ perspective: "1000px" }}
        >
          {/* Animated Liquid Ripple Rings radiating behind the 3D Droplet */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="size-60 sm:size-72 rounded-full border border-red-500/20 bg-red-500/5 animate-liquid-ripple" />
            <div
              className="size-80 sm:size-96 rounded-full border border-rose-500/15 bg-rose-500/5 animate-liquid-ripple"
              style={{ animationDelay: "1s" }}
            />
            <div
              className="size-[380px] sm:size-[440px] rounded-full border border-primary/10 animate-liquid-ripple"
              style={{ animationDelay: "2s" }}
            />
          </div>

          {/* Central 3D Interactive Liquid Blood Droplet */}
          <div
            className="relative z-20 flex size-52 sm:size-64 md:size-72 items-center justify-center transition-transform duration-200 ease-out cursor-pointer"
            style={{
              transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              transformStyle: "preserve-3d",
            }}
          >
            {/* The 3D Droplet Shape with Fluid Morphing */}
            <div
              className="relative size-full animate-droplet-morph shadow-2xl transition-all duration-500"
              style={{
                background:
                  "radial-gradient(circle at 35% 30%, #ff4d6d 0%, #e11d48 40%, #9f1239 75%, #4c0519 100%)",
                boxShadow:
                  "0 25px 60px -15px rgba(225, 29, 72, 0.6), inset -15px -15px 35px rgba(0, 0, 0, 0.6), inset 12px 12px 25px rgba(255, 255, 255, 0.45)",
              }}
            >
              {/* Glossy Specular 3D Light Highlight Reflection */}
              <div className="absolute top-6 left-8 h-14 w-10 rotate-[-25deg] rounded-full bg-gradient-to-b from-white/70 via-white/20 to-transparent blur-[1px]" />
              <div className="absolute top-4 left-16 size-4 rounded-full bg-white/80 blur-[0.5px]" />
              <div className="absolute bottom-8 right-10 size-12 rounded-full bg-rose-400/25 blur-md" />

              {/* Beating Heart Icon & Holographic Core inside the Droplet */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white drop-shadow-md select-none">
                <Heart className="size-16 sm:size-20 text-white fill-white/90 animate-heartbeat drop-shadow-[0_0_20px_rgba(255,255,255,0.7)]" />
                <span className="text-xs sm:text-sm font-black tracking-widest uppercase mt-1 drop-shadow-sm">
                  BloodLink
                </span>
                <span className="text-[10px] font-semibold text-rose-200">
                  Save a Life
                </span>
              </div>
            </div>

            {/* Orbiting Satellite Floating Micro Droplets */}
            <div className="pointer-events-none absolute -top-4 -left-6 size-8 rounded-full bg-gradient-to-br from-rose-400 to-primary animate-float-drop shadow-lg shadow-rose-500/40" />
            <div
              className="pointer-events-none absolute -bottom-6 -right-4 size-6 rounded-full bg-gradient-to-br from-rose-400 to-red-700 animate-float-reverse shadow-md shadow-rose-500/40"
              style={{ animationDelay: "1.5s" }}
            />
            <div
              className="pointer-events-none absolute top-1/2 -right-8 size-4 rounded-full bg-gradient-to-br from-rose-300 to-primary animate-float-drop shadow-md shadow-rose-500/30"
              style={{ animationDelay: "2.5s" }}
            />
          </div>

          {/* Floating Glassmorphism Telemetry Cards Around the Droplet */}

          {/* Floating Card 1: Top Right - Urgent Match */}
          <div
            className="pointer-events-none absolute -top-2 sm:top-2 right-0 sm:-right-2 z-30 animate-float"
            style={{ transform: "translateZ(40px)" }}
          >
            <div className="pointer-events-auto flex items-center gap-2.5 rounded-2xl border border-white/20 bg-background/80 p-2.5 sm:p-3 shadow-xl backdrop-blur-xl dark:bg-card/85">
              <div className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-rose-600 text-white shadow-md shrink-0">
                <Activity className="size-4 animate-pulse" />
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-foreground">
                    Instant Match
                  </span>
                  <span className="rounded-full bg-emerald-500/15 px-1.5 py-0.2 text-[9px] font-bold text-emerald-600 dark:text-emerald-400">
                    4m ago
                  </span>
                </div>
                <p className="text-[10px] text-muted-foreground">
                  O- Unit dispatched in Dhaka
                </p>
              </div>
            </div>
          </div>

          {/* Floating Card 2: Bottom Left - Active Donors nearby */}
          <div
            className="pointer-events-none absolute -bottom-4 sm:bottom-2 left-0 sm:-left-4 z-30 animate-float-reverse"
            style={{ transform: "translateZ(50px)" }}
          >
            <div className="pointer-events-auto flex items-center gap-3 rounded-2xl border border-white/20 bg-background/80 p-2.5 sm:p-3 shadow-xl backdrop-blur-xl dark:bg-card/85">
              <div className="flex -space-x-2 overflow-hidden shrink-0">
                <div className="inline-block size-7 rounded-full border-2 border-background bg-rose-500 text-center text-[10px] font-bold leading-6 text-white shadow-xs">
                  A+
                </div>
                <div className="inline-block size-7 rounded-full border-2 border-background bg-red-600 text-center text-[10px] font-bold leading-6 text-white shadow-xs">
                  O-
                </div>
                <div className="inline-block size-7 rounded-full border-2 border-background bg-amber-500 text-center text-[10px] font-bold leading-6 text-white shadow-xs">
                  B+
                </div>
              </div>

              <div className="text-left">
                <div className="flex items-center gap-1 text-xs font-bold text-foreground">
                  <CheckCircle2 className="size-3 text-emerald-500" />
                  <span>84 Donors Active</span>
                </div>
                <p className="text-[10px] text-muted-foreground">
                  Standing by near your location
                </p>
              </div>
            </div>
          </div>

          {/* Floating Card 3: Top Left - Medical Certification */}
          <div
            className="pointer-events-none absolute top-4 -left-4 hidden xl:block z-30 animate-float"
            style={{ animationDelay: "2s" }}
          >
            <div className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-background/80 px-3 py-1.5 shadow-lg backdrop-blur-md dark:bg-card/85">
              <ShieldCheck className="size-3.5 text-primary" />
              <span className="text-[11px] font-bold text-foreground">
                100% Free & Verified
              </span>
            </div>
          </div>

          {/* Floating Card 4: Bottom Right - Hospital Connectivity */}
          <div
            className="pointer-events-none absolute bottom-8 right-2 hidden xl:block z-30 animate-float-reverse"
            style={{ animationDelay: "3s" }}
          >
            <div className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-background/80 px-3 py-1.5 shadow-lg backdrop-blur-md dark:bg-card/85">
              <Hospital className="size-3.5 text-amber-500" />
              <span className="text-[11px] font-bold text-foreground">
                180+ Connected Hospitals
              </span>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
