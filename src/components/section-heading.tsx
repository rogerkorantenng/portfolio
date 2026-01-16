"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  title,
  subtitle,
  className,
  align = "center",
}: SectionHeadingProps) {
  const words = title.split(" ");
  const lastWord = words.pop();
  const firstWords = words.join(" ");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={cn(
        "mb-16",
        align === "center" && "text-center",
        className
      )}
    >
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
        <span className="text-white">{firstWords} </span>
        <span className="gradient-text">{lastWord}</span>
      </h2>
      {subtitle && (
        <p className="mt-4 text-lg text-zinc-500">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
