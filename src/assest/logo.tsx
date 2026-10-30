import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  className?: string;
  showText?: boolean;
}

const Logo = ({ className = "", showText = true }: LogoProps) => {
  return (
    <Link
      href="/"
      className={`group inline-flex items-center gap-2.5 transition-transform hover:scale-[1.02] active:scale-95 ${className}`}
    >
      <div className="relative flex size-10 sm:size-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-rose-600 p-0.5 shadow-md shadow-primary/20 transition-all group-hover:shadow-lg group-hover:shadow-primary/30 shrink-0">
        <div className="flex size-full items-center justify-center rounded-[10px] bg-background">
          <Image
            src="/bloodLink-log.png"
            alt="BloodLink Logo"
            width={36}
            height={36}
            className="size-7 sm:size-8 object-contain transition-transform group-hover:scale-110"
            priority
          />
        </div>
      </div>
      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 leading-none">
            <span className="text-lg sm:text-xl font-bold tracking-tight text-foreground">
              Blood<span className="text-primary">Link</span>
            </span>
            <span className="rounded-full bg-primary/10 px-1.5 py-0.2 text-[9px] font-bold uppercase tracking-wider text-primary">
              HQ
            </span>
          </div>
          <span className="text-[10px] sm:text-[11px] font-medium text-muted-foreground leading-tight mt-0.5">
            Lifesaving Network
          </span>
        </div>
      )}
    </Link>
  );
};

export default Logo;
