import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/shared/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl text-sm font-semibold tracking-tight transition-all duration-300 cursor-pointer disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-5 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-[0_10px_20px_-5px_rgba(var(--primary),0.3)] hover:shadow-[0_20px_40px_-10px_rgba(var(--primary),0.4)] hover:-translate-y-1 active:scale-[0.95]",
        destructive:
          "bg-destructive text-destructive-foreground hover:opacity-90 active:scale-[0.95]",
        outline:
          "border-2 border-foreground/10 bg-transparent text-foreground hover:bg-foreground/5 hover:border-foreground/20 active:scale-[0.95]",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 active:scale-[0.95]",
        ghost:
          "text-muted-foreground hover:bg-foreground/5 hover:text-foreground active:scale-[0.95]",
        glass:
          "bg-white/10 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10 text-foreground shadow-2xl hover:bg-white/20 active:scale-[0.95]",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-12 px-6",
        sm: "h-10 rounded-xl gap-1.5 px-4",
        lg: "h-16 rounded-[1.5rem] px-10 text-lg",
        icon: "size-12 rounded-2xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const Button = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> &
    VariantProps<typeof buttonVariants> & {
      asChild?: boolean;
    }
>(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      ref={ref}
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
});

Button.displayName = "Button";

export { Button, buttonVariants };