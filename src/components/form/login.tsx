"use client";

import { useForm } from "@tanstack/react-form";
import { cn } from "cn";
import {
  ArrowRight,
  Check,
  Droplet,
  Eye,
  EyeOff,
  Lock,
  Mail,
  ShieldCheck,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "@/components/ui/toast";
import { useLogin } from "@/hooks";
import { loginSchema } from "@/validations";
import GoogleLoginComponent from "../modules/google-login/googleLogin";

type DemoAccount = {
  label: string;
  role: string;
  email: string;
  pass: string;
};

const DEMO_ACCOUNTS: DemoAccount[] = [
  {
    label: "Donor",
    role: "Verified Donor",
    email: "odvutkabbo@gmail.com",
    pass: "Password@123",
  },
  {
    label: "Patient",
    role: "Urgent Caller",
    email: "patient.request@bloodlink.org",
    pass: "Patient@123",
  },
  {
    label: "Hospital",
    role: "Medical Partner",
    email: "dhaka.general@bloodlink.org",
    pass: "Hospital@123",
  },
];

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [activeDemo, setActiveDemo] = useState<string>("Donor");

  const router = useRouter();
  const { mutate: login, isPending: loginPending } = useLogin();

  const form = useForm({
    defaultValues: {
      email: "odvutkabbo@gmail.com",
      password: "Password@123",
    },
    validators: {
      onSubmit: loginSchema,
    },
    onSubmit: ({ value }) => {
      const loginData = {
        email: value.email,
        password: value.password,
      };

      login(loginData, {
        onSuccess: (res) => {
          toast.add({
            type: "success",
            title: "Welcome Back to BloodLink",
            description:
              "Authentication successful. Redirecting to your dashboard...",
          });
          router.push("/");
          console.log(res);
        },
        onError: (_err) => {
          toast.add({
            type: "error",
            title: "Authentication Failed",
            description:
              "Invalid email or password. Please verify and try again.",
          });
          console.log(_err);
        },
        
      });
    },
  });

  const handleFillDemo = (demo: DemoAccount) => {
    setActiveDemo(demo.label);
    form.setFieldValue("email", demo.email);
    form.setFieldValue("password", demo.pass);
    toast.add({
      type: "info",
      title: `${demo.label} Credentials Loaded`,
      description: `Filled with ${demo.email}`,
    });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className={cn("flex flex-col gap-5 sm:gap-6", className)}
      {...props}
    >
      <FieldGroup className="gap-5 sm:gap-6">
        {/* Header Branding */}
        <div className="flex flex-col items-center gap-1.5 sm:gap-2 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] sm:text-xs font-semibold text-primary transition-all hover:bg-primary/15">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-primary" />
            </span>
            <span className="tracking-wide uppercase">
              24/7 Matchmaking Network
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-foreground">
            Welcome back
          </h1>
          <p className="text-xs sm:text-sm text-balance text-muted-foreground px-2">
            Sign in to manage blood donation requests, respond to alerts, and
            save lives.
          </p>
        </div>

        {/* Demo Credentials Quick Switcher */}
        <div className="rounded-xl border border-border/80 bg-muted/40 p-2.5 sm:p-3 shadow-xs">
          <div className="mb-2 flex items-center justify-between text-[11px] sm:text-xs font-medium text-muted-foreground">
            <span className="inline-flex items-center gap-1.5 font-semibold text-foreground">
              <Zap className="size-3.5 text-amber-500 fill-amber-500 shrink-0" />
              Quick Demo Login:
            </span>
            <span className="text-[10px] sm:text-[11px] text-muted-foreground">
              1-Click Fill
            </span>
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            {DEMO_ACCOUNTS.map((demo) => {
              const isSelected = activeDemo === demo.label;
              return (
                <button
                  key={demo.label}
                  type="button"
                  onClick={() => handleFillDemo(demo)}
                  className={cn(
                    "flex flex-col items-center justify-center rounded-lg px-1.5 sm:px-2 py-1.5 text-[11px] sm:text-xs font-medium transition-all active:scale-95 cursor-pointer",
                    isSelected
                      ? "bg-primary text-primary-foreground shadow-sm scale-[1.02]"
                      : "bg-background/80 hover:bg-background text-foreground/80 hover:text-foreground border border-border/50",
                  )}
                >
                  <span className="font-semibold leading-tight truncate max-w-full">
                    {demo.label}
                  </span>
                  <span
                    className={cn(
                      "text-[9px] sm:text-[10px] opacity-75 leading-none mt-0.5 truncate max-w-full",
                      isSelected
                        ? "text-primary-foreground/90"
                        : "text-muted-foreground",
                    )}
                  >
                    {demo.role.split(" ")[0]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Email Field */}
        <form.Field name="email">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <Field data-invalid={isInvalid} className="gap-1.5 sm:gap-2">
                <FieldLabel
                  htmlFor={field.name}
                  className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                >
                  Email Address
                </FieldLabel>
                <div className="relative group">
                  <Mail className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
                  <Input
                    id={field.name}
                    name={field.name}
                    type="email"
                    onChange={(e) => field.handleChange(e.target.value)}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    autoComplete="email"
                    placeholder="name@example.com"
                    aria-invalid={isInvalid}
                    required
                    className="h-11 rounded-xl border border-input/70 bg-background/60 pl-10 pr-4 text-base md:text-sm transition-all focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20 dark:bg-muted/10"
                  />
                </div>
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>

        {/* Password Field */}
        <form.Field name="password">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            const val = field.state.value || "";

            // Dynamic password requirement checks
            const hasMinLength = val.length >= 8;
            const hasUpper = /[A-Z]/.test(val);
            const hasLower = /[a-z]/.test(val);
            const hasNumber = /[0-9]/.test(val);
            const hasSpecial = /[^A-Za-z0-9]/.test(val);
            const strengthScore = [
              hasMinLength,
              hasUpper,
              hasLower,
              hasNumber,
              hasSpecial,
            ].filter(Boolean).length;

            return (
              <Field data-invalid={isInvalid} className="gap-1.5 sm:gap-2">
                <div className="flex items-center justify-between">
                  <FieldLabel
                    htmlFor={field.name}
                    className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                  >
                    Password
                  </FieldLabel>
                  <Link
                    href="/"
                    className="text-[11px] sm:text-xs font-medium text-primary hover:text-primary/80 transition-colors hover:underline underline-offset-4"
                  >
                    Forgot password?
                  </Link>
                </div>

                <div className="relative group">
                  <Lock className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
                  <Input
                    id={field.name}
                    type={showPassword ? "text" : "password"}
                    name={field.name}
                    autoComplete="current-password"
                    onChange={(e) => field.handleChange(e.target.value)}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    aria-invalid={isInvalid}
                    placeholder="••••••••"
                    required
                    className="h-11 rounded-xl border border-input/70 bg-background/60 pl-10 pr-11 text-base md:text-sm transition-all focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20 dark:bg-muted/10"
                  />
                  <button
                    type="button"
                    tabIndex={-1}
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 size-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors hover:bg-muted/60 active:scale-90"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="size-4" />
                    ) : (
                      <Eye className="size-4" />
                    )}
                  </button>
                </div>

                {/* Dynamic Password Strength Indicators when user is typing */}
                {val.length > 0 && (
                  <div className="mt-1.5 space-y-2 rounded-lg border border-border/40 bg-muted/20 p-2 sm:p-2.5 transition-all">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-muted-foreground">
                        Security strength:
                      </span>
                      <span
                        className={cn(
                          "font-semibold",
                          strengthScore <= 2 && "text-rose-500",
                          strengthScore === 3 && "text-amber-500",
                          strengthScore >= 4 && "text-emerald-500",
                        )}
                      >
                        {strengthScore <= 2 && "Weak"}
                        {strengthScore === 3 && "Moderate"}
                        {strengthScore === 4 && "Strong"}
                        {strengthScore === 5 && "Excellent (Ready)"}
                      </span>
                    </div>

                    {/* Multi-segment strength bar */}
                    <div className="grid grid-cols-5 gap-1 h-1.5">
                      {[1, 2, 3, 4, 5].map((level) => (
                        <div
                          key={level}
                          className={cn(
                            "rounded-full transition-all duration-300",
                            strengthScore >= level
                              ? strengthScore <= 2
                                ? "bg-rose-500"
                                : strengthScore === 3
                                  ? "bg-amber-500"
                                  : "bg-emerald-500"
                              : "bg-muted",
                          )}
                        />
                      ))}
                    </div>

                    {/* Requirements checklist chips */}
                    <div className="flex flex-wrap gap-1 sm:gap-1.5 pt-0.5 text-[9px] sm:text-[10px]">
                      <span
                        className={cn(
                          "inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 font-medium transition-colors",
                          hasMinLength
                            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                            : "bg-muted text-muted-foreground",
                        )}
                      >
                        {hasMinLength ? (
                          <Check className="size-2.5 sm:size-3" />
                        ) : (
                          "•"
                        )}{" "}
                        8+ chars
                      </span>
                      <span
                        className={cn(
                          "inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 font-medium transition-colors",
                          hasUpper
                            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                            : "bg-muted text-muted-foreground",
                        )}
                      >
                        {hasUpper ? (
                          <Check className="size-2.5 sm:size-3" />
                        ) : (
                          "•"
                        )}{" "}
                        Uppercase
                      </span>
                      <span
                        className={cn(
                          "inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 font-medium transition-colors",
                          hasLower
                            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                            : "bg-muted text-muted-foreground",
                        )}
                      >
                        {hasLower ? (
                          <Check className="size-2.5 sm:size-3" />
                        ) : (
                          "•"
                        )}{" "}
                        Lowercase
                      </span>
                      <span
                        className={cn(
                          "inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 font-medium transition-colors",
                          hasNumber
                            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                            : "bg-muted text-muted-foreground",
                        )}
                      >
                        {hasNumber ? (
                          <Check className="size-2.5 sm:size-3" />
                        ) : (
                          "•"
                        )}{" "}
                        Number
                      </span>
                      <span
                        className={cn(
                          "inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 font-medium transition-colors",
                          hasSpecial
                            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                            : "bg-muted text-muted-foreground",
                        )}
                      >
                        {hasSpecial ? (
                          <Check className="size-2.5 sm:size-3" />
                        ) : (
                          "•"
                        )}{" "}
                        Special char
                      </span>
                    </div>
                  </div>
                )}

                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>

        {/* Remember Me Checkbox */}
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer select-none text-xs text-muted-foreground hover:text-foreground transition-colors py-0.5">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="size-4 rounded-md border-border text-primary focus:ring-primary/30 accent-primary cursor-pointer shrink-0"
            />
            <span className="text-[11px] sm:text-xs">
              Remember this device for 30 days
            </span>
          </label>
        </div>

        {/* Submit Button with Gradient & Dynamic Glow */}
        <Field>
          <Button
            disabled={loginPending}
            type="submit"
            className="group relative h-11 sm:h-12 w-full overflow-hidden rounded-xl bg-gradient-to-r from-primary via-red-600 to-rose-600 text-xs sm:text-sm font-semibold tracking-wide text-white shadow-lg shadow-primary/25 transition-all duration-300 hover:shadow-xl hover:shadow-primary/35 hover:brightness-105 active:scale-[0.99] disabled:opacity-70 cursor-pointer"
          >
            {/* Shimmer sweep effect */}
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full pointer-events-none" />

            {loginPending ? (
              <span className="inline-flex items-center gap-2 font-medium">
                <Spinner className="size-4" />
                <span>Authenticating Securely...</span>
              </span>
            ) : (
              <span className="inline-flex items-center justify-center gap-2">
                <span>Sign In to BloodLink</span>
                <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
              </span>
            )}
          </Button>
        </Field>

        {/* Separator */}
        <FieldSeparator className="text-[10px] sm:text-xs uppercase tracking-wider text-muted-foreground/80 font-medium">
          Or continue with
        </FieldSeparator>

        {/* Social SSO and Register Link */}
        <Field className="gap-3 sm:gap-4">
          <div className="flex justify-center w-full max-w-full overflow-hidden">
            <div className="w-full flex justify-center py-1 rounded-xl bg-card border border-border/60 hover:border-border transition-colors shadow-2xs overflow-hidden">
              <GoogleLoginComponent />
            </div>
          </div>

          <FieldDescription className="text-center text-[11px] sm:text-xs text-muted-foreground">
            Don&apos;t have a BloodLink account?{" "}
            <Link
              href="/register"
              className="font-semibold text-primary underline-offset-4 hover:underline"
            >
              Sign up as Donor or Patient
            </Link>
          </FieldDescription>
        </Field>

        {/* Security & Trust Footer */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 pt-2 border-t border-border/40 text-[10px] sm:text-[11px] text-muted-foreground/80 text-center">
          <span className="inline-flex items-center gap-1">
            <ShieldCheck className="size-3.5 text-emerald-500 shrink-0" />
            256-bit SSL Encrypted
          </span>
          <span className="hidden xs:inline">•</span>
          <span className="inline-flex items-center gap-1">
            <Droplet className="size-3.5 text-primary fill-primary/30 shrink-0" />
            Verified Medical Registry
          </span>
        </div>
      </FieldGroup>
    </form>
  );
}
