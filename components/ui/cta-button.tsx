import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

const baseClassName =
  "inline-flex items-center justify-center gap-2 bg-red-600 text-white px-8 py-4 text-lg rounded-xl font-bold shadow-md hover:bg-red-700 hover:shadow-lg active:scale-[0.97] transition-all duration-200 no-underline cursor-pointer";

type CommonProps = {
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
};

type AnchorProps = CommonProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };
type ButtonProps = CommonProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: never };

export type CtaButtonProps = AnchorProps | ButtonProps;

export function CtaButton({ icon, children, className, ...props }: CtaButtonProps) {
  const content = (
    <>
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </>
  );

  if (typeof props.href === "string") {
    return (
      <a {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)} className={cn(baseClassName, className)}>
        {content}
      </a>
    );
  }

  const { type = "button", ...buttonProps } = props as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button type={type} {...buttonProps} className={cn(baseClassName, className)}>
      {content}
    </button>
  );
}
