import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl text-base font-semibold ring-offset-background transition-calm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-5 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary-glow shadow-soft hover:shadow-hover",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border-2 border-primary/30 bg-card hover:bg-primary-light hover:border-primary/50 text-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-soft",
        ghost: "hover:bg-primary-light hover:text-primary-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        // CalmStep specific variants
        hero: "bg-primary text-primary-foreground hover:bg-primary-glow shadow-card hover:shadow-hover hover:scale-[1.02] active:scale-[0.98]",
        soft: "bg-primary-light text-primary-foreground border border-primary/20 hover:bg-primary/20 hover:border-primary/40",
        accent: "bg-accent text-accent-foreground hover:bg-accent/90 shadow-soft hover:shadow-hover",
        warm: "bg-warm text-warm-foreground hover:bg-warm/90 shadow-soft",
        calm: "bg-calm text-calm-foreground hover:bg-calm/90 shadow-soft",
      },
      size: {
        default: "h-12 px-6 py-3",
        sm: "h-10 rounded-xl px-4 text-sm",
        lg: "h-14 rounded-2xl px-10 text-lg",
        xl: "h-16 rounded-3xl px-12 text-xl",
        icon: "h-12 w-12 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
