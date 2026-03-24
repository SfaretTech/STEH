import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  isAnimated?: boolean;
}

export function Logo({ className, isAnimated = true }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2 group", className)}>
      <div className={cn(
        "relative w-9 h-9 rounded-xl overflow-hidden transition-all duration-300 group-hover:scale-110 shadow-sm",
        isAnimated && "animate-logo-spin group-hover:animate-none"
      )}>
        <Image 
          src="/stehlogo.png" 
          alt="STEH Logo" 
          fill 
          className="object-cover"
        />
      </div>
      <span className="text-xl font-bold font-headline text-secondary-foreground tracking-tight">
        STEH
      </span>
    </div>
  );
}
