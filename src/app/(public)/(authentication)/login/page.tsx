"use client";

import { cn } from "cn";
import {
  Activity,
  ArrowLeft,
  CheckCircle2,
  Droplet,
  Heart,
  Hospital,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { LoginForm } from "@/components/form/login";

type BloodTypeInfo = {
  type: string;
  badge: string;
  canGiveTo: string;
  canReceiveFrom: string;
};

const BLOOD_COMPATIBILITY: BloodTypeInfo[] = [
  {
    type: "O-",
    badge: "Universal Donor",
    canGiveTo: "All Blood Types (A+, A-, B+, B-, AB+, AB-, O+, O-)",
    canReceiveFrom: "O- only",
  },
  {
    type: "O+",
    badge: "Most Demanded",
    canGiveTo: "O+, A+, B+, AB+",
    canReceiveFrom: "O+, O-",
  },
  {
    type: "A+",
    badge: "High Frequency",
    canGiveTo: "A+, AB+",
    canReceiveFrom: "A+, A-, O+, O-",
  },
  {
    type: "A-",
    badge: "Rare Type",
    canGiveTo: "A+, A-, AB+, AB-",
    canReceiveFrom: "A-, O-",
  },
  {
    type: "B+",
    badge: "High Demand",
    canGiveTo: "B+, AB+",
    canReceiveFrom: "B+, B-, O+, O-",
  },
  {
    type: "B-",
    badge: "Critical Need",
    canGiveTo: "B+, B-, AB+, AB-",
    canReceiveFrom: "B-, O-",
  },
  {
    type: "AB+",
    badge: "Universal Recipient",
    canGiveTo: "AB+ only",
    canReceiveFrom: "All Blood Types",
  },
  {
    type: "AB-",
    badge: "Rarest Type",
    canGiveTo: "AB+, AB-",
    canReceiveFrom: "AB-, A-, B-, O-",
  },
];

const EMERGENCY_UPDATES = [
  {
    id: 1,
    title: "Urgent: 2 Units O- Needed",
    location: "Dhaka Medical College",
    time: "2m ago",
    status: "Priority Red",
  },
  {
    id: 2,
    title: "Match Found: B+ Confirmed",
    location: "Chittagong General",
    time: "5m ago",
    status: "Fulfilled",
  },
  {
    id: 3,
    title: "Emergency Request: A+ Platelets",
    location: "Square Hospital",
    time: "9m ago",
    status: "Donor Dispatched",
  },
  {
    id: 4,
    title: "Rare Match: AB- Connected",
    location: "Rajshahi Medical",
    time: "14m ago",
    status: "Verified",
  },
];

export default function LoginPage() {
  const [activeBloodType, setActiveBloodType] = useState<BloodTypeInfo>(
    BLOOD_COMPATIBILITY[0],
  );
  const [currentUpdateIndex, setCurrentUpdateIndex] = useState(0);

  // Rotate live emergency news updates every 3.8s
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentUpdateIndex(
        (prevIndex) => (prevIndex + 1) % EMERGENCY_UPDATES.length,
      );
    }, 3800);
    return () => clearInterval(timer);
  }, []);

  const activeUpdate = EMERGENCY_UPDATES[currentUpdateIndex];

  return (
    <div className="relative min-h-svh w-full overflow-x-hidden overflow-y-auto bg-background text-foreground antialiased selection:bg-primary/20 selection:text-primary">
      {/* Background Decorative Ambient Glows */}
      <div className="pointer-events-none absolute -top-40 left-1/4 size-72 sm:size-96 rounded-full bg-primary/10 blur-[100px] sm:blur-[120px] dark:bg-primary/15" />
      <div className="pointer-events-none absolute bottom-0 left-0 size-60 sm:size-80 rounded-full bg-rose-500/10 blur-[80px] sm:blur-[100px] dark:bg-rose-500/10" />

      <div className="grid min-h-svh w-full lg:grid-cols-12">
        {/* Left Section: Login Form & Navigation (Full width on mobile/tablet, 5-6 cols on desktop) */}
        <div className="relative z-10 flex min-h-svh flex-col justify-between p-3.5 xs:p-5 sm:p-8 md:p-10 lg:p-8 xl:p-12 lg:col-span-6 xl:col-span-5">
          {/* Top Brand Bar */}
          <header className="flex items-center justify-between gap-2 sm:gap-4 pb-4">
            <Link
              href="/"
              className="group flex items-center gap-2.5 sm:gap-3 transition-transform hover:scale-[1.02] active:scale-95"
            >
              <div className="relative flex size-10 sm:size-12 items-center justify-center rounded-xl sm:rounded-2xl bg-gradient-to-br from-primary to-rose-600 p-0.5 shadow-md shadow-primary/20 transition-all group-hover:shadow-lg group-hover:shadow-primary/30 shrink-0">
                <div className="flex size-full items-center justify-center rounded-[10px] sm:rounded-[14px] bg-background">
                  <Image
                    src="/bloodLink-log.png"
                    alt="BloodLink Logo"
                    width={40}
                    height={40}
                    className="size-7 sm:size-8 object-contain transition-transform group-hover:scale-110"
                    priority
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-base sm:text-lg font-bold tracking-tight text-foreground">
                    Blood<span className="text-primary">Link</span>
                  </span>
                  <span className="rounded-full bg-primary/10 px-1.5 py-0.2 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-primary">
                    HQ
                  </span>
                </div>
                <span className="text-[10px] sm:text-[11px] font-medium text-muted-foreground leading-none">
                  Lifesaving Network
                </span>
              </div>
            </Link>

            <Link
              href="/"
              className="inline-flex items-center gap-1 sm:gap-1.5 rounded-full border border-border/60 bg-muted/40 px-2.5 sm:px-3.5 py-1.5 text-xs font-medium text-muted-foreground transition-all hover:bg-muted hover:text-foreground active:scale-95 shrink-0"
            >
              <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
              <span className="hidden xs:inline">Back to Home</span>
              <span className="xs:hidden">Home</span>
            </Link>
          </header>

          {/* Center: Main Login Form Card */}
          <main className="my-auto flex flex-1 items-center justify-center py-4 sm:py-6">
            <div className="w-full max-w-md mx-auto">
              {/* Mobile-Only Dynamic Live Pulse Banner (Visible only on mobile/tablet where right hero is hidden) */}
              <div className="lg:hidden mb-3.5 flex items-center justify-between rounded-xl border border-primary/20 bg-primary/5 px-3 py-2 text-xs backdrop-blur-md">
                <div className="flex items-center gap-2">
                  <span className="relative flex size-2">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-75" />
                    <span className="relative inline-flex size-2 rounded-full bg-primary" />
                  </span>
                  <span className="font-semibold text-foreground text-[11px] sm:text-xs">
                    Live Network Active
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[10px] sm:text-[11px] text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <Heart className="size-3 text-rose-500 fill-rose-500 animate-heartbeat" />
                    12.8k+ Donors
                  </span>
                  <span>•</span>
                  <span className="inline-flex items-center gap-1">
                    <Hospital className="size-3 text-amber-500" />
                    180+ Hospitals
                  </span>
                </div>
              </div>

              {/* Dynamic Emergency Live Ticker Banner */}
              <div className="mb-4 overflow-hidden rounded-xl sm:rounded-2xl border border-primary/20 bg-primary/5 p-2.5 sm:p-3 shadow-xs backdrop-blur-xs transition-all">
                <div className="flex items-center gap-2 sm:gap-2.5">
                  <div className="relative flex size-2.5 shrink-0 items-center justify-center">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-75" />
                    <span className="relative inline-flex size-2 rounded-full bg-primary" />
                  </div>
                  <div className="flex flex-1 items-center justify-between overflow-hidden gap-1">
                    <div className="truncate text-[11px] sm:text-xs font-semibold text-foreground">
                      <span className="text-primary font-bold mr-1">
                        {activeUpdate.status}:
                      </span>
                      <span>{activeUpdate.title}</span>
                      <span className="hidden md:inline text-muted-foreground ml-1">
                        • {activeUpdate.location}
                      </span>
                    </div>
                    <span className="shrink-0 text-[10px] font-medium text-muted-foreground/80">
                      {activeUpdate.time}
                    </span>
                  </div>
                </div>
              </div>

              {/* Form Container with Glass Effect */}
              <div className="relative rounded-2xl sm:rounded-3xl border border-border/60 bg-card/80 p-4 xs:p-6 sm:p-8 shadow-xl backdrop-blur-xl transition-all dark:bg-card/40">
                <LoginForm />
              </div>
            </div>
          </main>

          {/* Bottom Security / Trust Metrics */}
          <footer className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-4 text-[11px] sm:text-xs text-muted-foreground text-center sm:text-left">
            <div className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Matching Engine: Online</span>
            </div>
            <div className="flex items-center gap-2.5 sm:gap-3">
              <span className="hover:text-foreground transition-colors cursor-default">
                HIPAA Aligned
              </span>
              <span>•</span>
              <span className="hover:text-foreground transition-colors cursor-default">
                256-Bit TLS
              </span>
              <span>•</span>
              <span className="hover:text-foreground transition-colors cursor-default">
                Voluntary Blood Bank
              </span>
            </div>
          </footer>
        </div>

        {/* Right Section: Motion-Driven Cinematic Hero (Hidden on mobile/tablet, shown on lg screens 1024px+) */}
        <div className="relative hidden overflow-hidden lg:col-span-6 xl:col-span-7 lg:flex flex-col justify-between p-6 lg:p-8 xl:p-12 text-white min-h-svh overflow-y-auto">
          {/* Background Hero Image with Dynamic Ken-Burns feel */}
          <Image
            src="/bloodLink-login.png"
            alt="Blood Donation in Action"
            fill
            priority
            className="object-cover object-center brightness-75 contrast-105 transition-transform duration-10000 hover:scale-105"
          />

          {/* Cinematic Multi-layered Vignette and Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-black/30" />
          <div className="absolute inset-0 bg-radial-[at_top_right] from-primary/30 via-transparent to-black/80" />

          {/* Top Floating Glass Badge */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-black/40 px-3.5 py-1.5 sm:px-4 sm:py-2 backdrop-blur-md shadow-lg">
              <div className="flex size-2 items-center justify-center">
                <span className="absolute size-2 animate-ping rounded-full bg-rose-500 opacity-75" />
                <span className="size-1.5 rounded-full bg-rose-500" />
              </div>
              <span className="text-[11px] sm:text-xs font-semibold tracking-wide uppercase text-white/90">
                Emergency Blood Registry
              </span>
              <span className="rounded-full bg-rose-500/20 px-2 py-0.5 text-[9px] sm:text-[10px] font-bold text-rose-300">
                Live Active
              </span>
            </div>

            {/* Live Stats Pill */}
            <div className="inline-flex items-center gap-2.5 sm:gap-3 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-xs font-medium text-white/90 backdrop-blur-md">
              <div className="flex items-center gap-1.5">
                <Heart className="size-3.5 text-rose-400 fill-rose-400 animate-heartbeat" />
                <span>12,850+ Donors</span>
              </div>
              <span className="text-white/40">|</span>
              <div className="flex items-center gap-1.5">
                <Hospital className="size-3.5 text-amber-300" />
                <span>180+ Hospitals</span>
              </div>
            </div>
          </div>

          {/* Central Showcase Section */}
          <div className="relative z-10 my-auto py-6 xl:py-8">
            {/* Floating Motion Card 1 (Top-Right Floating) */}
            <div className="pointer-events-none absolute right-2 xl:right-4 -top-6 xl:-top-8 animate-float">
              <div className="pointer-events-auto flex items-center gap-3 rounded-2xl border border-white/20 bg-black/60 p-3 shadow-2xl backdrop-blur-xl">
                <div className="flex size-9 sm:size-10 items-center justify-center rounded-xl bg-gradient-to-br from-rose-500 to-primary text-white shadow-md shrink-0">
                  <Activity className="size-4 sm:size-5 animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-white">
                      Instant Dispatch
                    </span>
                    <span className="rounded-full bg-emerald-500/20 px-1.5 py-0.2 text-[9px] font-semibold text-emerald-300">
                      ⚡ 6.4m avg
                    </span>
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-white/70">
                    Matches verified in real-time
                  </p>
                </div>
              </div>
            </div>

            {/* Central Impact Typography */}
            <div className="max-w-xl space-y-3 sm:space-y-4">
              {/* Animated ECG Pulse Graphic */}
              <div className="flex items-center gap-2.5 sm:gap-3">
                <div className="h-0.5 w-8 sm:w-12 bg-gradient-to-r from-transparent to-rose-500" />
                <svg
                  className="h-5 sm:h-6 w-24 sm:w-28 text-rose-500"
                  viewBox="0 0 100 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  role="img"
                  aria-label="Heartbeat ECG waveform"
                >
                  <title>Heartbeat ECG waveform</title>
                  <path
                    d="M 0 12 L 20 12 L 26 3 L 34 21 L 42 6 L 48 16 L 54 12 L 100 12"
                    className="opacity-90 [stroke-dasharray:100] [stroke-dashoffset:0] animate-[ecg_3s_ease-in-out_infinite]"
                  />
                </svg>
                <span className="text-[10px] sm:text-xs font-bold tracking-widest uppercase text-rose-300">
                  Pulse Of Hope
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-extrabold tracking-tight leading-[1.15]">
                Every Drop Holds A{" "}
                <span className="bg-gradient-to-r from-rose-400 via-red-300 to-amber-200 bg-clip-text text-transparent">
                  Second Chance
                </span>{" "}
                At Life.
              </h2>

              <p className="text-xs sm:text-sm lg:text-sm xl:text-base leading-relaxed text-white/80">
                BloodLink seamlessly pairs urgent blood requests from patients
                and emergency rooms with willing nearby voluntary donors in
                minutes.
              </p>
            </div>

            {/* Interactive Blood Compatibility Matrix Widget */}
            <div className="mt-6 sm:mt-8 rounded-2xl border border-white/15 bg-black/50 p-3.5 sm:p-4 backdrop-blur-xl shadow-2xl">
              <div className="mb-2 flex flex-wrap items-center justify-between gap-1">
                <div className="flex items-center gap-1.5">
                  <Droplet className="size-4 text-rose-400 fill-rose-400/40" />
                  <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-white">
                    Interactive Blood Compatibility
                  </span>
                </div>
                <span className="text-[10px] sm:text-[11px] text-rose-300 font-medium">
                  Tap any type to explore
                </span>
              </div>

              {/* Blood group pills: 4 cols on lg, 8 cols on xl for optimal spacing */}
              <div className="grid grid-cols-4 xl:grid-cols-8 gap-1.5">
                {BLOOD_COMPATIBILITY.map((blood) => {
                  const isSelected = activeBloodType.type === blood.type;
                  return (
                    <button
                      key={blood.type}
                      type="button"
                      onClick={() => setActiveBloodType(blood)}
                      className={cn(
                        "flex flex-col items-center justify-center rounded-xl py-1.5 sm:py-2 px-1 text-center transition-all cursor-pointer active:scale-95",
                        isSelected
                          ? "bg-gradient-to-b from-rose-500 to-primary text-white shadow-lg shadow-rose-500/40 scale-105 border border-white/40"
                          : "bg-white/10 hover:bg-white/20 text-white/90 border border-white/10",
                      )}
                    >
                      <span className="text-xs sm:text-sm font-black tracking-tight">
                        {blood.type}
                      </span>
                      <span className="text-[8px] sm:text-[9px] text-white/70 line-clamp-1 leading-none mt-0.5">
                        {blood.type === "O-"
                          ? "Universal"
                          : blood.badge.split(" ")[0]}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Active compatibility preview */}
              <div className="mt-2.5 sm:mt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-2 rounded-xl bg-white/10 p-2 sm:p-2.5 text-xs border border-white/10">
                <div className="flex items-center gap-2">
                  <span className="rounded-lg bg-rose-500 px-2 py-0.5 font-bold text-white text-[11px] sm:text-xs">
                    {activeBloodType.type}
                  </span>
                  <span className="font-semibold text-white text-[11px] sm:text-xs">
                    {activeBloodType.badge}
                  </span>
                </div>
                <div className="text-[10px] sm:text-[11px] text-white/80">
                  <span className="text-white/60">Can Give To:</span>{" "}
                  <span className="font-medium text-emerald-300">
                    {activeBloodType.canGiveTo}
                  </span>
                </div>
              </div>
            </div>

            {/* Floating Motion Card 2 (Bottom-Left Floating) */}
            <div className="pointer-events-none mt-4 sm:mt-6 animate-float-reverse">
              <div className="pointer-events-auto inline-flex items-center gap-3 sm:gap-4 rounded-2xl border border-white/20 bg-black/60 px-3.5 sm:px-4 py-2.5 sm:py-3 shadow-2xl backdrop-blur-xl">
                <div className="flex -space-x-2 overflow-hidden shrink-0">
                  <div className="inline-block size-7 sm:size-8 rounded-full border-2 border-white/80 bg-rose-500 text-center text-[10px] sm:text-xs font-bold leading-6 sm:leading-7 text-white shadow-sm">
                    A+
                  </div>
                  <div className="inline-block size-7 sm:size-8 rounded-full border-2 border-white/80 bg-red-600 text-center text-[10px] sm:text-xs font-bold leading-6 sm:leading-7 text-white shadow-sm">
                    O-
                  </div>
                  <div className="inline-block size-7 sm:size-8 rounded-full border-2 border-white/80 bg-amber-500 text-center text-[10px] sm:text-xs font-bold leading-6 sm:leading-7 text-white shadow-sm">
                    B+
                  </div>
                  <div className="flex size-7 sm:size-8 items-center justify-center rounded-full border-2 border-white/80 bg-emerald-600 text-[9px] sm:text-[10px] font-bold text-white shadow-sm">
                    +48
                  </div>
                </div>

                <div className="text-left">
                  <div className="flex items-center gap-1 text-[11px] sm:text-xs font-semibold text-white">
                    <CheckCircle2 className="size-3.5 text-emerald-400 shrink-0" />
                    <span>Verified Donors Nearby</span>
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-white/70">
                    Ready for emergency response in your region
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Trust & Accreditation Badges */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 border-t border-white/15 pt-3 sm:pt-4 text-[11px] sm:text-xs text-white/70">
            <div className="flex items-center gap-1.5">
              <Sparkles className="size-3.5 sm:size-4 text-amber-300 shrink-0" />
              <span>Free, Non-Profit Voluntary Blood Network</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="size-2 rounded-full bg-emerald-400 shrink-0" />
              <span>Over 99.4% Fulfillment Rate</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
