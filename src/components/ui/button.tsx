import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "btn-press inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 hover:brightness-110",
        secondary:
          "bg-zinc-100 text-zinc-900 shadow-sm hover:bg-zinc-200 hover:shadow-md dark:bg-zinc-800 dark:text-white dark:hover:bg-zinc-700",
        outline:
          "border-2 border-zinc-200 bg-white/50 backdrop-blur-sm hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600 dark:border-zinc-700 dark:bg-zinc-900/50 dark:hover:border-blue-700 dark:hover:bg-blue-950 dark:hover:text-blue-400",
        ghost:
          "hover:bg-zinc-100 dark:hover:bg-zinc-800",
        link: "text-blue-600 underline-offset-4 hover:underline dark:text-blue-400",
      },
      size: {
        default: "h-11 px-5 py-2",
        sm: "h-9 rounded-lg px-4 text-xs",
        lg: "h-12 rounded-xl px-8 text-base",
        icon: "h-10 w-10 rounded-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
