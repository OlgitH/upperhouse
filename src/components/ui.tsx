import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full not-italic px-7 py-4 text-sm font-bold uppercase tracking-[0.14em] transition-colors";

const variants = {
  sand: "bg-sand text-ink hover:bg-accent hover:text-white",
  blue: "bg-brand-700 text-white hover:bg-accent hover:text-white",
  light: "bg-white text-brand-900 hover:bg-accent hover:text-white",
  slate: "bg-brand-500 text-white hover:bg-accent hover:text-white",
} as const;

export function ButtonLink({
  variant = "sand",
  className = "",
  ...props
}: ComponentProps<typeof Link> & { variant?: keyof typeof variants }) {
  return <Link className={`${base} ${variants[variant]} ${className}`} {...props} />;
}

export const buttonClass = (variant: keyof typeof variants = "sand") => `${base} ${variants[variant]}`;

export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p className={`mb-4 text-xs font-bold uppercase tracking-[0.28em] ${className}`}>{children}</p>
  );
}

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-7xl px-5 sm:px-8 ${className}`}>{children}</div>;
}

/** Desktop nav link styling, shared by the plain links and the dropdown trigger. */
export const navLinkBase =
  "flex h-full items-center text-center text-[15px] font-medium uppercase tracking-[0.2em] text-white underline decoration-transparent decoration-2 underline-offset-[10px] transition-colors hover:decoration-accent group-hover:decoration-accent focus-visible:bg-accent";
export const navLinkCls = `${navLinkBase} px-5`;
