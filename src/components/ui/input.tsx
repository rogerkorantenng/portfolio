import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-12 w-full rounded-xl border-2 border-zinc-200 bg-white px-4 py-2 text-base ring-offset-white transition-all file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-400 focus-visible:border-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-700 dark:bg-zinc-900 dark:ring-offset-zinc-950 dark:placeholder:text-zinc-500 dark:focus-visible:border-blue-500 dark:focus-visible:ring-blue-500/20",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
