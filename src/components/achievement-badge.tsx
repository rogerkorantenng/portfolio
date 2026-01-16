"use client";

import { motion } from "framer-motion";
import { Lock, Award, Trophy, Star, Shield, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

export type BadgeRarity = "common" | "rare" | "epic" | "legendary";
export type BadgeCategory = "certification" | "award" | "milestone" | "project";

interface AchievementBadgeProps {
  id: string;
  name: string;
  description: string;
  category: BadgeCategory;
  rarity: BadgeRarity;
  unlocked: boolean;
  unlockedDate?: string;
  icon?: React.ReactNode;
  index?: number;
}

const rarityColors: Record<BadgeRarity, { border: string; bg: string; text: string; glow: string }> = {
  common: {
    border: "border-zinc-500/50",
    bg: "bg-zinc-500/10",
    text: "text-zinc-400",
    glow: "",
  },
  rare: {
    border: "border-[#00ffff]/50",
    bg: "bg-[#00ffff]/10",
    text: "text-[#00ffff]",
    glow: "shadow-[0_0_15px_rgba(0,255,255,0.2)]",
  },
  epic: {
    border: "border-[#ff00ff]/50",
    bg: "bg-[#ff00ff]/10",
    text: "text-[#ff00ff]",
    glow: "shadow-[0_0_20px_rgba(255,0,255,0.3)]",
  },
  legendary: {
    border: "border-[#ffff00]/50",
    bg: "bg-[#ffff00]/10",
    text: "text-[#ffff00]",
    glow: "shadow-[0_0_25px_rgba(255,255,0,0.4)]",
  },
};

const categoryIcons: Record<BadgeCategory, React.ElementType> = {
  certification: Award,
  award: Trophy,
  milestone: Star,
  project: Shield,
};

export function AchievementBadge({
  id,
  name,
  description,
  category,
  rarity,
  unlocked,
  unlockedDate,
  icon,
  index = 0,
}: AchievementBadgeProps) {
  const colors = rarityColors[rarity];
  const CategoryIcon = categoryIcons[category];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05 }}
      className={cn(
        "group relative border bg-black/50 p-4 transition-all",
        unlocked ? colors.border : "border-zinc-800/50",
        unlocked && colors.glow,
        !unlocked && "opacity-50"
      )}
    >
      {/* Rarity indicator */}
      <div
        className={cn(
          "absolute top-0 left-0 right-0 h-[2px]",
          unlocked ? colors.bg.replace("/10", "") : "bg-zinc-800"
        )}
      />

      {/* Badge content */}
      <div className="flex items-start gap-3">
        {/* Icon */}
        <div
          className={cn(
            "relative flex h-12 w-12 items-center justify-center hexagon",
            unlocked ? colors.bg : "bg-zinc-900"
          )}
        >
          {unlocked ? (
            icon || <CategoryIcon className={cn("h-6 w-6", colors.text)} />
          ) : (
            <Lock className="h-5 w-5 text-zinc-600" />
          )}

          {/* Glow effect for legendary */}
          {unlocked && rarity === "legendary" && (
            <div className="absolute inset-0 hexagon bg-[#ffff00]/20 animate-pulse" />
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h4
              className={cn(
                "font-mono text-sm truncate",
                unlocked ? "text-white" : "text-zinc-600"
              )}
            >
              {unlocked ? name : "???"}
            </h4>
            {unlocked && (
              <span
                className={cn(
                  "text-[10px] font-mono uppercase px-1.5 py-0.5",
                  colors.bg,
                  colors.text
                )}
              >
                {rarity}
              </span>
            )}
          </div>

          <p
            className={cn(
              "text-xs font-mono mt-1 line-clamp-2",
              unlocked ? "text-zinc-500" : "text-zinc-700"
            )}
          >
            {unlocked ? description : "Complete the required challenge to unlock"}
          </p>

          {unlocked && unlockedDate && (
            <p className="text-[10px] font-mono text-zinc-600 mt-2">
              UNLOCKED: {unlockedDate}
            </p>
          )}
        </div>
      </div>

      {/* Category label */}
      <div className="absolute bottom-2 right-2">
        <span className="text-[10px] font-mono text-zinc-700 uppercase">
          {category}
        </span>
      </div>
    </motion.div>
  );
}

interface BadgeGridProps {
  badges: AchievementBadgeProps[];
  className?: string;
}

export function BadgeGrid({ badges, className }: BadgeGridProps) {
  const unlockedCount = badges.filter((b) => b.unlocked).length;

  return (
    <div className={className}>
      {/* Stats header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#00ffff]/20">
        <div>
          <div className="text-xs font-mono text-[#ff00ff] mb-1">
            {">"} TROPHY_CABINET
          </div>
          <h3 className="text-lg font-mono text-white">
            ACHIEVEMENTS UNLOCKED
          </h3>
        </div>
        <div className="text-right">
          <div className="text-2xl font-mono font-bold text-[#00ffff]">
            {unlockedCount}
            <span className="text-zinc-600">/{badges.length}</span>
          </div>
          <div className="text-xs font-mono text-zinc-600">
            {Math.round((unlockedCount / badges.length) * 100)}% complete
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-2 bg-zinc-900 mb-6 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${(unlockedCount / badges.length) * 100}%` }}
          transition={{ duration: 1, delay: 0.5 }}
          className="h-full bg-gradient-to-r from-[#00ffff] to-[#ff00ff]"
        />
      </div>

      {/* Badge grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {badges.map((badge, index) => (
          <AchievementBadge key={badge.id} {...badge} index={index} />
        ))}
      </div>
    </div>
  );
}
