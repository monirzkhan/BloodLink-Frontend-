"use client";

import {
  Activity,
  ArrowLeft,
  CheckCircle2,
  Droplet,
  Heart,
  Hospital,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { RegisterForm } from "@/components/form/register";

export default function RegisterPage() {
  return (
    <div className="relative min-h-svh w-full overflow-x-hidden overflow-y-auto bg-background text-foreground antialiased selection:bg-primary/20 selection:text-primary">
      {/* Background Decorative Ambient Glows */}
      <div className="pointer-events-none absolute -top-40 left-1/4 size-72 sm:size-96 rounded-full bg-primary/10 blur-[100px] sm:blur-[120px] dark:bg-primary/15" />
      <div className="pointer-events-none absolute bottom-0 left-0 size-60 sm:size-80 rounded-full bg-rose-500/10 blur-[80px] sm:blur-[100px] dark:bg-rose-500/10" />

      <div className="grid min-h-svh w-full lg:grid-cols-12">
        {/* Left Section: Registration Form & Navigation (Full width on mobile/tablet, 6 cols on desktop) */}
        <div className="relative z-10 flex min-h-svh flex-col justify-between p-3.5 xs:p-5 sm:p-8 md:p-10 lg:p-8 xl:p-12 lg:col-span-6 xl:col-span-6">
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

          {/* Center: Main Registration Form Card */}
          <main className="my-auto flex flex-1 items-center justify-center py-4 sm:py-6">
            <div className="w-full max-w-xl mx-auto">
              {/* Mobile Live Pulse Banner (Visible only on mobile/tablet where right hero is hidden) */}
              <div className="lg:hidden mb-4 flex items-center justify-between rounded-xl border border-primary/20 bg-primary/5 px-3.5 py-2 text-xs backdrop-blur-md">
                <div className="flex items-center gap-2">
                  <span className="relative flex size-2">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-75" />
                    <span className="relative inline-flex size-2 rounded-full bg-primary" />
                  </span>
                  <span className="font-semibold text-foreground text-[11px] sm:text-xs">
                    BloodLink Registry
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

              {/* Form Container with Glass Effect */}
              <div className="relative rounded-2xl sm:rounded-3xl border border-border/60 bg-card/85 p-4 xs:p-6 sm:p-8 shadow-2xl backdrop-blur-xl transition-all dark:bg-card/45">
                <RegisterForm />
              </div>
            </div>
          </main>

          {/* Bottom Security / Trust Metrics */}
          <footer className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-4 text-[11px] sm:text-xs text-muted-foreground text-center sm:text-left">
            <div className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Registry Encryption: 256-Bit Active</span>
            </div>
            <div className="flex items-center gap-2.5 sm:gap-3">
              <span className="hover:text-foreground transition-colors cursor-default">
                HIPAA Aligned
              </span>
              <span>•</span>
              <span className="hover:text-foreground transition-colors cursor-default">
                Verified Medical Registry
              </span>
              <span>•</span>
              <span className="hover:text-foreground transition-colors cursor-default">
                Voluntary Non-Profit
              </span>
            </div>
          </footer>
        </div>

        {/* Right Section: Motion-Driven Cinematic Hero (Hidden on mobile/tablet, shown on lg screens 1024px+) */}
        <div className="relative hidden overflow-hidden lg:col-span-6 xl:col-span-6 lg:flex flex-col justify-between p-6 lg:p-8 xl:p-12 text-white min-h-svh overflow-y-auto">
          {/* Background Hero Image with Dynamic Ken-Burns feel */}
          <Image
            src="/bloodLink-register.png"
            alt="Blood Donation Volunteers and Healthcare"
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
                Join Voluntary Blood Registry
              </span>
              <span className="rounded-full bg-rose-500/20 px-2 py-0.5 text-[9px] sm:text-[10px] font-bold text-rose-300">
                Open Access
              </span>
            </div>

            {/* Live Stats Pill */}
            <div className="inline-flex items-center gap-2.5 sm:gap-3 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-xs font-medium text-white/90 backdrop-blur-md">
              <div className="flex items-center gap-1.5">
                <Heart className="size-3.5 text-rose-400 fill-rose-400 animate-heartbeat" />
                <span>100% Free</span>
              </div>
              <span className="text-white/40">|</span>
              <div className="flex items-center gap-1.5">
                <Users className="size-3.5 text-emerald-300" />
                <span>64 Districts</span>
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
                      Instant Matching
                    </span>
                    <span className="rounded-full bg-emerald-500/20 px-1.5 py-0.2 text-[9px] font-semibold text-emerald-300">
                      ⚡ 6.4m avg
                    </span>
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-white/70">
                    Direct SMS alerts when blood is needed
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
                  Be The Lifeline
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-extrabold tracking-tight leading-[1.15]">
                One Sign Up.{" "}
                <span className="bg-gradient-to-r from-rose-400 via-red-300 to-amber-200 bg-clip-text text-transparent">
                  Countless Lives
                </span>{" "}
                Saved.
              </h2>

              <p className="text-xs sm:text-sm lg:text-sm xl:text-base leading-relaxed text-white/80">
                Join a nationwide voluntary community of heroes. Whether
                donating, requesting in an emergency, or managing hospital
                inventory, BloodLink gives you the power to make an immediate
                impact.
              </p>
            </div>

            {/* Donor Journey Steps Widget */}
            <div className="mt-6 sm:mt-8 rounded-2xl border border-white/15 bg-black/50 p-4 backdrop-blur-xl shadow-2xl space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Sparkles className="size-4 text-amber-300" />
                  <span className="text-xs font-bold uppercase tracking-wider text-white">
                    How BloodLink Works
                  </span>
                </div>
                <span className="text-[10px] sm:text-[11px] text-rose-300 font-medium">
                  3 Simple Steps
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="rounded-xl border border-white/10 bg-white/5 p-2.5">
                  <div className="size-6 mx-auto mb-1.5 rounded-full bg-primary flex items-center justify-center text-[10px] font-bold text-white">
                    1
                  </div>
                  <span className="text-xs font-bold block text-white">
                    Register
                  </span>
                  <span className="text-[10px] text-white/70 block leading-tight mt-0.5">
                    Share blood type & area
                  </span>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/5 p-2.5">
                  <div className="size-6 mx-auto mb-1.5 rounded-full bg-amber-500 flex items-center justify-center text-[10px] font-bold text-white">
                    2
                  </div>
                  <span className="text-xs font-bold block text-white">
                    Match
                  </span>
                  <span className="text-[10px] text-white/70 block leading-tight mt-0.5">
                    Get pinged for nearby needs
                  </span>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/5 p-2.5">
                  <div className="size-6 mx-auto mb-1.5 rounded-full bg-emerald-500 flex items-center justify-center text-[10px] font-bold text-white">
                    3
                  </div>
                  <span className="text-xs font-bold block text-white">
                    Save Lives
                  </span>
                  <span className="text-[10px] text-white/70 block leading-tight mt-0.5">
                    Donate safely at certified centers
                  </span>
                </div>
              </div>
            </div>

            {/* Floating Motion Card 2 (Bottom-Left Floating) */}
            <div className="pointer-events-none mt-4 sm:mt-6 animate-float-reverse">
              <div className="pointer-events-auto inline-flex items-center gap-3 sm:gap-4 rounded-2xl border border-white/20 bg-black/60 px-3.5 sm:px-4 py-2.5 sm:py-3 shadow-2xl backdrop-blur-xl">
                <div className="flex size-9 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  <ShieldCheck className="size-5" />
                </div>

                <div className="text-left">
                  <div className="flex items-center gap-1 text-[11px] sm:text-xs font-semibold text-white">
                    <CheckCircle2 className="size-3.5 text-emerald-400 shrink-0" />
                    <span>Confidential & Verified</span>
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-white/70">
                    Your personal phone number is only shared with approved
                    requests
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Trust & Accreditation Badges */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 border-t border-white/15 pt-3 sm:pt-4 text-[11px] sm:text-xs text-white/70">
            <div className="flex items-center gap-1.5">
              <Droplet className="size-3.5 sm:size-4 text-rose-400 fill-rose-400/30 shrink-0" />
              <span>Certified Bangladesh Blood Transfusion Registry</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="size-2 rounded-full bg-emerald-400 shrink-0" />
              <span>Over 14,800+ Active Life Savers</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
