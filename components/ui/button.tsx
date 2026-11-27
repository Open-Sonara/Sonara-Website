import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "quiet";
type Size = "md" | "lg";

const base =
  "group/button inline-flex items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap transition-[background-color,border-color,color,box-shadow,transform] duration-200 ease-[var(--ease-out-expo)] active:translate-y-px";

const variants: Record<Variant, string> = {
  primary:
    "bg-lav text-lav-ink shadow-[0_0.5rem_1.5rem_-0.75rem_rgb(167_139_250/0.7)] hover:bg-lav-bright hover:shadow-[0_0.75rem_2rem_-0.75rem_rgb(196_181_253/0.8)]",
  secondary: "border border-line-strong bg-raised/60 text-ink hover:border-lav/60 hover:bg-raised",
  quiet: "text-ink-2 hover:text-ink",
};

const sizes: Record<Size, string> = {
  md: "h-10 px-4 text-[0.9375rem]",
  lg: "h-12 px-6 text-base",
};

interface ButtonLinkProps extends Omit<ComponentProps<typeof Link>, "className"> {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  external?: boolean;
}

/** A link styled as a button. External links open in the same tab and carry rel="noopener". */
export function ButtonLink({ variant = "primary", size = "md", className, external, children, ...props }: ButtonLinkProps) {
  const cls = cn(base, variants[variant], sizes[size], className);
  if (external) {
    return (
      <a href={String(props.href)} className={cls} rel="noopener">
        {children}
      </a>
    );
  }
  return (
    <Link className={cls} {...props}>
      {children}
    </Link>
  );
}
