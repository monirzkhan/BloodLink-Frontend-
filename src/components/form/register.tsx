"use client";

import { cn } from "cn";
import {
  Activity,
  ArrowRight,
  Building2,
  Calendar,
  Check,
  CheckCircle2,
  Droplet,
  Eye,
  EyeOff,
  Heart,
  Lock,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  User,
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
import { useRegister } from "@/hooks";
import GoogleLoginComponent from "../modules/google-login/googleLogin";

const bloodGroups = [
  "A_POSITIVE",
  "A_NEGATIVE",
  "B_POSITIVE",
  "B_NEGATIVE",
  "AB_POSITIVE",
  "AB_NEGATIVE",
  "O_POSITIVE",
  "O_NEGATIVE",
] as const;

type BloodGroup = (typeof bloodGroups)[number];
type Role = "CALLER" | "DONOR" | "PATIENT" | "HOSPITAL";

const BLOOD_GROUP_OPTIONS: {
  value: BloodGroup;
  label: string;
  badge: string;
}[] = [
  { value: "O_NEGATIVE", label: "O-", badge: "Universal Donor" },
  { value: "O_POSITIVE", label: "O+", badge: "High Demand" },
  { value: "A_POSITIVE", label: "A+", badge: "Common" },
  { value: "A_NEGATIVE", label: "A-", badge: "Rare" },
  { value: "B_POSITIVE", label: "B+", badge: "High Demand" },
  { value: "B_NEGATIVE", label: "B-", badge: "Critical" },
  { value: "AB_POSITIVE", label: "AB+", badge: "Univ. Recipient" },
  { value: "AB_NEGATIVE", label: "AB-", badge: "Rarest" },
];

const ROLE_OPTIONS = [
  {
    value: "DONOR" as Role,
    title: "Blood Donor",
    desc: "I want to donate blood & save lives",
    badge: "Popular",
    icon: Droplet,
  },
  {
    value: "PATIENT" as Role,
    title: "Patient / Caller",
    desc: "Looking for emergency blood matches",
    badge: "Urgent",
    icon: Activity,
  },
  {
    value: "HOSPITAL" as Role,
    title: "Hospital",
    desc: "Medical institution blood management",
    badge: "Partner",
    icon: Building2,
  },
];

type FormValues = {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  role: Role;
  bloodGroup: BloodGroup | "";
  dateOfBirth: string;
  gender: string;
  lastDonationDate: string;
  division: string;
  district: string;
  area: string;
  hospitalName: string;
  registrationNumber: string;
  hospitalPhone: string;
  hospitalEmail: string;
  address: string;
};

const initialValues: FormValues = {
  name: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
  role: "DONOR",
  bloodGroup: "O_POSITIVE",
  dateOfBirth: "",
  gender: "MALE",
  lastDonationDate: "",
  division: "",
  district: "",
  area: "",
  hospitalName: "",
  registrationNumber: "",
  hospitalPhone: "",
  hospitalEmail: "",
  address: "",
};

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const router = useRouter();
  const { mutate: register, isPending } = useRegister();

  const update = (key: keyof FormValues, value: string) => {
    setValues((previous) => ({ ...previous, [key]: value }));
    setErrors((previous) => ({ ...previous, [key]: "" }));
  };

  const handleFillSample = (roleType: Role) => {
    if (roleType === "DONOR") {
      setValues({
        name: "Tahmid Hasan",
        email: "tahmid.donor@example.com",
        phone: "01712345678",
        password: "Password@123",
        confirmPassword: "Password@123",
        role: "DONOR",
        bloodGroup: "O_NEGATIVE",
        dateOfBirth: "1998-06-15",
        gender: "MALE",
        lastDonationDate: "2024-01-10",
        division: "Dhaka",
        district: "Dhaka",
        area: "Dhanmondi",
        hospitalName: "",
        registrationNumber: "",
        hospitalPhone: "",
        hospitalEmail: "",
        address: "",
      });
      toast.add({
        type: "info",
        title: "Donor Sample Loaded",
        description: "Form filled with sample blood donor data.",
      });
    } else if (roleType === "HOSPITAL") {
      setValues({
        name: "Dr. Rafiqul Islam",
        email: "director@cityhospital.org",
        phone: "01812345678",
        password: "Password@123",
        confirmPassword: "Password@123",
        role: "HOSPITAL",
        bloodGroup: "",
        dateOfBirth: "",
        gender: "",
        lastDonationDate: "",
        division: "Dhaka",
        district: "Dhaka",
        area: "Uttara",
        hospitalName: "City Care General Hospital",
        registrationNumber: "REG-DH-84920",
        hospitalPhone: "01912345678",
        hospitalEmail: "bloodbank@cityhospital.org",
        address: "Sector 3, Road 7, House 14",
      });
      toast.add({
        type: "info",
        title: "Hospital Sample Loaded",
        description: "Form filled with sample hospital profile.",
      });
    } else {
      setValues({
        ...initialValues,
        name: "Nusrat Jahan",
        email: "nusrat.patient@example.com",
        phone: "01912345678",
        password: "Password@123",
        confirmPassword: "Password@123",
        role: "PATIENT",
      });
      toast.add({
        type: "info",
        title: "Patient Sample Loaded",
        description: "Form filled with patient requester info.",
      });
    }
    setErrors({});
  };

  const validate = () => {
    const next: Record<string, string> = {};

    if (!values.name.trim()) next.name = "Full name is required.";

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      next.email = "Enter a valid email address.";
    }

    if (!/^01[3-9]\d{8}$/.test(values.phone.trim())) {
      next.phone = "Enter valid Bangladesh 11-digit mobile (e.g. 017xxxxxxxx).";
    }

    if (values.password.length < 8) {
      next.password = "Password must be at least 8 characters.";
    }

    if (values.password !== values.confirmPassword) {
      next.confirmPassword = "Passwords do not match.";
    }

    if (values.role === "DONOR") {
      if (!values.bloodGroup) next.bloodGroup = "Select your blood group.";
      if (!values.dateOfBirth) next.dateOfBirth = "Date of birth is required.";
      if (!values.gender) next.gender = "Select your gender.";
      if (!values.division.trim()) next.division = "Division is required.";
      if (!values.district.trim()) next.district = "District is required.";
      if (!values.area.trim()) next.area = "Area / Thana is required.";
    }

    if (values.role === "HOSPITAL") {
      if (!values.hospitalName.trim()) {
        next.hospitalName = "Hospital name is required.";
      }
      if (!values.registrationNumber.trim()) {
        next.registrationNumber = "Govt. registration number is required.";
      }
      if (!values.hospitalPhone.trim()) {
        next.hospitalPhone = "Official phone is required.";
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.hospitalEmail.trim())) {
        next.hospitalEmail = "Enter valid hospital contact email.";
      }
      if (!values.division.trim()) next.division = "Division is required.";
      if (!values.district.trim()) next.district = "District is required.";
      if (!values.area.trim()) next.area = "Area is required.";
      if (!values.address.trim())
        next.address = "Detailed address is required.";
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validate()) {
      toast.add({
        type: "error",
        title: "Incomplete Form",
        description: "Please fill in the required highlighted fields.",
      });
      return;
    }

    const payload: Record<string, unknown> = {
      name: values.name.trim(),
      email: values.email.trim().toLowerCase(),
      phone: values.phone.trim(),
      password: values.password,
      role: values.role,
    };

    if (values.role === "DONOR") {
      payload.donorProfile = {
        bloodGroup: values.bloodGroup,
        dateOfBirth: new Date(values.dateOfBirth).toISOString(),
        gender: values.gender,
        division: values.division.trim(),
        district: values.district.trim(),
        area: values.area.trim(),
        ...(values.lastDonationDate && {
          lastDonationDate: new Date(values.lastDonationDate).toISOString(),
        }),
      };
    }

    if (values.role === "HOSPITAL") {
      payload.hospitalProfile = {
        hospitalName: values.hospitalName.trim(),
        registrationNumber: values.registrationNumber.trim(),
        phone: values.hospitalPhone.trim(),
        email: values.hospitalEmail.trim().toLowerCase(),
        division: values.division.trim(),
        district: values.district.trim(),
        area: values.area.trim(),
        address: values.address.trim(),
      };
    }

    register(payload as Parameters<typeof register>[0], {
      onSuccess: () => {
        toast.add({
          type: "success",
          title: "Registration Successful",
          description:
            "Your BloodLink account has been created. Please sign in.",
        });

        router.push("/login");
      },
      onError: (error) => {
        toast.add({
          type: "error",
          title: "Registration Failed",
          description:
            error instanceof Error
              ? error.message
              : "Something went wrong. Please check your data and try again.",
        });
      },
    });
  };

  // Password matching check
  const passwordsMatch =
    values.password.length > 0 &&
    values.confirmPassword.length > 0 &&
    values.password === values.confirmPassword;

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <FieldGroup className="gap-6">
        {/* Header & Mission Tagline */}
        <div className="flex flex-col items-center gap-1.5 sm:gap-2 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-[11px] sm:text-xs font-semibold text-primary transition-all hover:bg-primary/15">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-primary" />
            </span>
            <span className="tracking-wide uppercase">
              Join BloodLink Registry
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-foreground">
            Create your account
          </h1>
          <p className="text-xs sm:text-sm text-balance text-muted-foreground px-2">
            Every voluntary donor brings life-saving hope to patients in need.
          </p>
        </div>

        {/* 1-Click Sample Pre-fill Pills */}
        <div className="rounded-xl border border-border/80 bg-muted/40 p-2.5 sm:p-3 shadow-xs">
          <div className="mb-2 flex items-center justify-between text-[11px] sm:text-xs font-medium text-muted-foreground">
            <span className="inline-flex items-center gap-1.5 font-semibold text-foreground">
              <Zap className="size-3.5 text-amber-500 fill-amber-500 shrink-0" />
              Quick Fill for Testing:
            </span>
            <span className="text-[10px] sm:text-[11px] text-muted-foreground">
              1-Click Populate
            </span>
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            <button
              type="button"
              onClick={() => handleFillSample("DONOR")}
              className="flex items-center justify-center gap-1 rounded-lg border border-border/50 bg-background/80 hover:bg-background px-2 py-1.5 text-[11px] font-medium text-foreground transition-all active:scale-95 cursor-pointer"
            >
              <Droplet className="size-3 text-rose-500 fill-rose-500/30" />
              <span>Sample Donor</span>
            </button>
            <button
              type="button"
              onClick={() => handleFillSample("PATIENT")}
              className="flex items-center justify-center gap-1 rounded-lg border border-border/50 bg-background/80 hover:bg-background px-2 py-1.5 text-[11px] font-medium text-foreground transition-all active:scale-95 cursor-pointer"
            >
              <Activity className="size-3 text-amber-500" />
              <span>Patient</span>
            </button>
            <button
              type="button"
              onClick={() => handleFillSample("HOSPITAL")}
              className="flex items-center justify-center gap-1 rounded-lg border border-border/50 bg-background/80 hover:bg-background px-2 py-1.5 text-[11px] font-medium text-foreground transition-all active:scale-95 cursor-pointer"
            >
              <Building2 className="size-3 text-blue-500" />
              <span>Hospital</span>
            </button>
          </div>
        </div>

        {/* Interactive Role Selection Cards */}
        <div className="space-y-2">
          <span className="block text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Select Account Type
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {ROLE_OPTIONS.map((role) => {
              const isSelected = values.role === role.value;
              const Icon = role.icon;
              return (
                <button
                  key={role.value}
                  type="button"
                  onClick={() => update("role", role.value)}
                  className={cn(
                    "flex flex-col items-start p-3 rounded-xl border text-left transition-all cursor-pointer relative",
                    isSelected
                      ? "border-primary bg-primary/10 shadow-sm ring-1 ring-primary"
                      : "border-border/60 bg-card/60 hover:bg-muted/40 hover:border-border",
                  )}
                >
                  <div className="flex items-center justify-between w-full mb-1.5">
                    <div
                      className={cn(
                        "flex size-7 items-center justify-center rounded-lg",
                        isSelected
                          ? "bg-primary text-white"
                          : "bg-muted text-muted-foreground",
                      )}
                    >
                      <Icon className="size-4" />
                    </div>
                    <span
                      className={cn(
                        "text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full",
                        isSelected
                          ? "bg-primary text-white"
                          : "bg-muted text-muted-foreground",
                      )}
                    >
                      {role.badge}
                    </span>
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-foreground">
                    {role.title}
                  </span>
                  <span className="text-[10px] text-muted-foreground leading-tight mt-0.5">
                    {role.desc}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Section 1: Basic Credentials */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 border-b border-border/50 pb-1.5">
            <User className="size-4 text-primary" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-foreground">
              Account Credentials
            </h2>
          </div>

          <div className="grid gap-3.5 sm:grid-cols-2">
            {/* Full Name */}
            <Field data-invalid={!!errors.name} className="gap-1.5">
              <FieldLabel
                htmlFor="name"
                className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-muted-foreground"
              >
                Full Name *
              </FieldLabel>
              <div className="relative group">
                <User className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input
                  id="name"
                  name="name"
                  placeholder="e.g. Shakib Ahmed"
                  value={values.name}
                  onChange={(e) => update("name", e.target.value)}
                  className="h-11 rounded-xl border border-input/70 bg-background/60 pl-10 pr-3 text-base md:text-sm transition-all focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20"
                  required
                />
              </div>
              {errors.name && <FieldError>{errors.name}</FieldError>}
            </Field>

            {/* Mobile Number */}
            <Field data-invalid={!!errors.phone} className="gap-1.5">
              <FieldLabel
                htmlFor="phone"
                className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-muted-foreground"
              >
                Mobile Number (BD) *
              </FieldLabel>
              <div className="relative group">
                <Phone className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="017xxxxxxxx"
                  value={values.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  className="h-11 rounded-xl border border-input/70 bg-background/60 pl-10 pr-3 text-base md:text-sm transition-all focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20"
                  required
                />
              </div>
              {errors.phone && <FieldError>{errors.phone}</FieldError>}
            </Field>

            {/* Email Address */}
            <Field
              data-invalid={!!errors.email}
              className="gap-1.5 sm:col-span-2"
            >
              <FieldLabel
                htmlFor="email"
                className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-muted-foreground"
              >
                Email Address *
              </FieldLabel>
              <div className="relative group">
                <Mail className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  value={values.email}
                  onChange={(e) => update("email", e.target.value)}
                  className="h-11 rounded-xl border border-input/70 bg-background/60 pl-10 pr-3 text-base md:text-sm transition-all focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20"
                  required
                />
              </div>
              {errors.email && <FieldError>{errors.email}</FieldError>}
            </Field>

            {/* Password */}
            <Field data-invalid={!!errors.password} className="gap-1.5">
              <FieldLabel
                htmlFor="password"
                className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-muted-foreground"
              >
                Password (Min 8 Chars) *
              </FieldLabel>
              <div className="relative group">
                <Lock className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={values.password}
                  onChange={(e) => update("password", e.target.value)}
                  className="h-11 rounded-xl border border-input/70 bg-background/60 pl-10 pr-10 text-base md:text-sm transition-all focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground size-7 flex items-center justify-center rounded-md"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </button>
              </div>
              {errors.password && <FieldError>{errors.password}</FieldError>}
            </Field>

            {/* Confirm Password */}
            <Field data-invalid={!!errors.confirmPassword} className="gap-1.5">
              <div className="flex items-center justify-between">
                <FieldLabel
                  htmlFor="confirmPassword"
                  className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                >
                  Confirm Password *
                </FieldLabel>
                {passwordsMatch && (
                  <span className="inline-flex items-center gap-1 text-[10px] text-emerald-500 font-medium">
                    <Check className="size-3" /> Match
                  </span>
                )}
              </div>
              <div className="relative group">
                <Lock className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={values.confirmPassword}
                  onChange={(e) => update("confirmPassword", e.target.value)}
                  className="h-11 rounded-xl border border-input/70 bg-background/60 pl-10 pr-10 text-base md:text-sm transition-all focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground size-7 flex items-center justify-center rounded-md"
                  aria-label={
                    showConfirmPassword ? "Hide password" : "Show password"
                  }
                >
                  {showConfirmPassword ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <FieldError>{errors.confirmPassword}</FieldError>
              )}
            </Field>
          </div>
        </div>

        {/* Section 2: Donor Specific Profile */}
        {values.role === "DONOR" && (
          <div className="space-y-3.5 rounded-2xl border border-primary/20 bg-primary/5 p-3.5 sm:p-5">
            <div className="flex items-center justify-between border-b border-primary/15 pb-2">
              <div className="flex items-center gap-2">
                <Droplet className="size-4 text-primary fill-primary/30" />
                <h2 className="text-xs font-bold uppercase tracking-wider text-foreground">
                  Blood Donor Profile
                </h2>
              </div>
              <span className="text-[10px] text-primary font-semibold">
                Critical for Matching
              </span>
            </div>

            {/* Tactile Blood Group Selection Grid */}
            <div className="space-y-1.5">
              <span className="block text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Select Your Blood Group *
              </span>
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5">
                {BLOOD_GROUP_OPTIONS.map((bg) => {
                  const isSelected = values.bloodGroup === bg.value;
                  return (
                    <button
                      key={bg.value}
                      type="button"
                      onClick={() => update("bloodGroup", bg.value)}
                      className={cn(
                        "flex flex-col items-center justify-center py-2 px-1 rounded-xl text-center transition-all cursor-pointer",
                        isSelected
                          ? "bg-primary text-white shadow-md shadow-primary/30 scale-105 border border-primary"
                          : "bg-background/80 hover:bg-background text-foreground border border-border/60",
                      )}
                    >
                      <span className="text-xs sm:text-sm font-black">
                        {bg.label}
                      </span>
                      <span className="text-[8px] opacity-75 line-clamp-1 leading-none mt-0.5">
                        {bg.label === "O-"
                          ? "Universal"
                          : bg.badge.split(" ")[0]}
                      </span>
                    </button>
                  );
                })}
              </div>
              {errors.bloodGroup && (
                <FieldError>{errors.bloodGroup}</FieldError>
              )}
            </div>

            <div className="grid gap-3.5 sm:grid-cols-2 pt-1">
              {/* Date of Birth */}
              <Field data-invalid={!!errors.dateOfBirth} className="gap-1.5">
                <FieldLabel
                  htmlFor="dateOfBirth"
                  className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                >
                  Date of Birth *
                </FieldLabel>
                <div className="relative group">
                  <Calendar className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <Input
                    id="dateOfBirth"
                    name="dateOfBirth"
                    type="date"
                    value={values.dateOfBirth}
                    onChange={(e) => update("dateOfBirth", e.target.value)}
                    className="h-11 rounded-xl border border-input/70 bg-background/80 pl-10 pr-3 text-base md:text-sm transition-all focus-visible:border-primary"
                    required
                  />
                </div>
                {errors.dateOfBirth && (
                  <FieldError>{errors.dateOfBirth}</FieldError>
                )}
              </Field>

              {/* Gender Pills */}
              <div className="gap-1.5 flex flex-col">
                <span className="block text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Gender *
                </span>
                <div className="grid grid-cols-3 gap-1.5 h-11">
                  {(["MALE", "FEMALE", "OTHER"] as const).map((g) => {
                    const isSelected = values.gender === g;
                    return (
                      <button
                        key={g}
                        type="button"
                        onClick={() => update("gender", g)}
                        className={cn(
                          "rounded-xl border text-xs font-semibold transition-all flex items-center justify-center cursor-pointer",
                          isSelected
                            ? "bg-primary text-white border-primary shadow-xs"
                            : "bg-background/80 text-foreground border-border/60 hover:bg-background",
                        )}
                      >
                        {g === "MALE"
                          ? "Male"
                          : g === "FEMALE"
                            ? "Female"
                            : "Other"}
                      </button>
                    );
                  })}
                </div>
                {errors.gender && <FieldError>{errors.gender}</FieldError>}
              </div>

              {/* Last Donation Date */}
              <Field className="gap-1.5 sm:col-span-2">
                <FieldLabel
                  htmlFor="lastDonationDate"
                  className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                >
                  Last Blood Donation Date (Optional)
                </FieldLabel>
                <div className="relative group">
                  <Calendar className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <Input
                    id="lastDonationDate"
                    name="lastDonationDate"
                    type="date"
                    value={values.lastDonationDate}
                    onChange={(e) => update("lastDonationDate", e.target.value)}
                    className="h-11 rounded-xl border border-input/70 bg-background/80 pl-10 pr-3 text-base md:text-sm transition-all focus-visible:border-primary"
                  />
                </div>
                <FieldDescription className="text-[10px] text-muted-foreground">
                  Leave empty if you are a first-time donor. Donors can donate
                  every 90 days.
                </FieldDescription>
              </Field>
            </div>

            {/* Location Coordinates for Donor */}
            <div className="space-y-2 pt-2 border-t border-primary/10">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
                <MapPin className="size-3.5 text-primary" />
                <span>Donor Living Location</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <Input
                  placeholder="Division (e.g. Dhaka)"
                  value={values.division}
                  onChange={(e) => update("division", e.target.value)}
                  className="h-10 rounded-xl border border-input/70 bg-background/80 px-3 text-base md:text-sm"
                  required
                />
                <Input
                  placeholder="District (e.g. Dhaka)"
                  value={values.district}
                  onChange={(e) => update("district", e.target.value)}
                  className="h-10 rounded-xl border border-input/70 bg-background/80 px-3 text-base md:text-sm"
                  required
                />
                <Input
                  placeholder="Area / Thana"
                  value={values.area}
                  onChange={(e) => update("area", e.target.value)}
                  className="h-10 rounded-xl border border-input/70 bg-background/80 px-3 text-base md:text-sm"
                  required
                />
              </div>
            </div>
          </div>
        )}

        {/* Section 2 (Alternative): Hospital Registration Profile */}
        {values.role === "HOSPITAL" && (
          <div className="space-y-3.5 rounded-2xl border border-blue-500/20 bg-blue-500/5 p-3.5 sm:p-5">
            <div className="flex items-center justify-between border-b border-blue-500/15 pb-2">
              <div className="flex items-center gap-2">
                <Building2 className="size-4 text-blue-500" />
                <h2 className="text-xs font-bold uppercase tracking-wider text-foreground">
                  Hospital & Facility Profile
                </h2>
              </div>
              <span className="text-[10px] text-blue-500 font-semibold">
                Medical Partner
              </span>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <Field data-invalid={!!errors.hospitalName} className="gap-1.5">
                <FieldLabel className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Hospital Name *
                </FieldLabel>
                <Input
                  placeholder="e.g. City General Hospital"
                  value={values.hospitalName}
                  onChange={(e) => update("hospitalName", e.target.value)}
                  className="h-11 rounded-xl border border-input/70 bg-background/80 px-3 text-base md:text-sm"
                  required
                />
                {errors.hospitalName && (
                  <FieldError>{errors.hospitalName}</FieldError>
                )}
              </Field>

              <Field
                data-invalid={!!errors.registrationNumber}
                className="gap-1.5"
              >
                <FieldLabel className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Govt Reg Number *
                </FieldLabel>
                <Input
                  placeholder="e.g. DGHS-REG-98102"
                  value={values.registrationNumber}
                  onChange={(e) => update("registrationNumber", e.target.value)}
                  className="h-11 rounded-xl border border-input/70 bg-background/80 px-3 text-base md:text-sm"
                  required
                />
                {errors.registrationNumber && (
                  <FieldError>{errors.registrationNumber}</FieldError>
                )}
              </Field>

              <Field data-invalid={!!errors.hospitalPhone} className="gap-1.5">
                <FieldLabel className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Official Phone *
                </FieldLabel>
                <Input
                  placeholder="01xxxxxxxxx"
                  value={values.hospitalPhone}
                  onChange={(e) => update("hospitalPhone", e.target.value)}
                  className="h-11 rounded-xl border border-input/70 bg-background/80 px-3 text-base md:text-sm"
                  required
                />
                {errors.hospitalPhone && (
                  <FieldError>{errors.hospitalPhone}</FieldError>
                )}
              </Field>

              <Field data-invalid={!!errors.hospitalEmail} className="gap-1.5">
                <FieldLabel className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Official Email *
                </FieldLabel>
                <Input
                  placeholder="bloodbank@hospital.org"
                  value={values.hospitalEmail}
                  onChange={(e) => update("hospitalEmail", e.target.value)}
                  className="h-11 rounded-xl border border-input/70 bg-background/80 px-3 text-base md:text-sm"
                  required
                />
                {errors.hospitalEmail && (
                  <FieldError>{errors.hospitalEmail}</FieldError>
                )}
              </Field>

              <div className="sm:col-span-2 space-y-2 pt-1">
                <span className="block text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Hospital Location & Address *
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <Input
                    placeholder="Division"
                    value={values.division}
                    onChange={(e) => update("division", e.target.value)}
                    className="h-10 rounded-xl border border-input/70 bg-background/80 px-3 text-base md:text-sm"
                    required
                  />
                  <Input
                    placeholder="District"
                    value={values.district}
                    onChange={(e) => update("district", e.target.value)}
                    className="h-10 rounded-xl border border-input/70 bg-background/80 px-3 text-base md:text-sm"
                    required
                  />
                  <Input
                    placeholder="Area"
                    value={values.area}
                    onChange={(e) => update("area", e.target.value)}
                    className="h-10 rounded-xl border border-input/70 bg-background/80 px-3 text-base md:text-sm"
                    required
                  />
                </div>
                <Input
                  placeholder="Detailed Street Address & Landmark"
                  value={values.address}
                  onChange={(e) => update("address", e.target.value)}
                  className="h-10 rounded-xl border border-input/70 bg-background/80 px-3 text-base md:text-sm"
                  required
                />
              </div>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <Field>
          <Button
            disabled={isPending}
            type="submit"
            className="group relative h-11 sm:h-12 w-full overflow-hidden rounded-xl bg-gradient-to-r from-primary via-red-600 to-rose-600 text-xs sm:text-sm font-semibold tracking-wide text-white shadow-lg shadow-primary/25 transition-all duration-300 hover:shadow-xl hover:shadow-primary/35 hover:brightness-105 active:scale-[0.99] disabled:opacity-70 cursor-pointer"
          >
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full pointer-events-none" />

            {isPending ? (
              <span className="inline-flex items-center gap-2 font-medium">
                <Spinner className="size-4" />
                <span>Creating Account on Registry...</span>
              </span>
            ) : (
              <span className="inline-flex items-center justify-center gap-2">
                <span>Complete BloodLink Registration</span>
                <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
              </span>
            )}
          </Button>
        </Field>

        <FieldSeparator className="text-[10px] sm:text-xs uppercase tracking-wider text-muted-foreground/80 font-medium">
          Or continue with
        </FieldSeparator>

        {/* Social SSO and Login Link */}
        <Field className="gap-3 sm:gap-4">
          <div className="flex justify-center w-full max-w-full overflow-hidden">
            <div className="w-full flex justify-center py-1 rounded-xl bg-card border border-border/60 hover:border-border transition-colors shadow-2xs overflow-hidden">
              <GoogleLoginComponent />
            </div>
          </div>

          <FieldDescription className="text-center text-[11px] sm:text-xs text-muted-foreground">
            Already have a BloodLink account?{" "}
            <Link
              href="/login"
              className="font-semibold text-primary underline-offset-4 hover:underline"
            >
              Sign In to your Dashboard
            </Link>
          </FieldDescription>
        </Field>

        {/* Security & Verification Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 pt-2 border-t border-border/40 text-[10px] sm:text-[11px] text-muted-foreground/80 text-center">
          <span className="inline-flex items-center gap-1">
            <ShieldCheck className="size-3.5 text-emerald-500 shrink-0" />
            256-bit SSL Secure
          </span>
          <span className="hidden xs:inline">•</span>
          <span className="inline-flex items-center gap-1">
            <Heart className="size-3.5 text-rose-500 fill-rose-500/30 shrink-0" />
            100% Free Voluntary Registry
          </span>
          <span className="hidden xs:inline">•</span>
          <span className="inline-flex items-center gap-1">
            <CheckCircle2 className="size-3.5 text-primary shrink-0" />
            Verified Medical Matching
          </span>
        </div>
      </FieldGroup>
    </form>
  );
}
