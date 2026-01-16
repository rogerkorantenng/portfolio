"use client";

import { motion } from "framer-motion";
import { profile, getXP, getLevel, getLevelProgress } from "@/data/profile";

interface StatBarProps {
  label: string;
  value: number;
  maxValue?: number;
  color?: "cyan" | "pink" | "green";
}

function StatBar({ label, value, maxValue = 100, color = "cyan" }: StatBarProps) {
  const percentage = Math.min((value / maxValue) * 100, 100);
  const filledBlocks = Math.floor(percentage / 10);
  const emptyBlocks = 10 - filledBlocks;

  const colorClasses = {
    cyan: "text-[#00ffff]",
    pink: "text-[#ff00ff]",
    green: "text-[#39ff14]",
  };

  return (
    <div className="flex items-center gap-2 font-mono text-sm">
      <span className="text-zinc-500 w-24 truncate">{label}</span>
      <span className={colorClasses[color]}>
        {"█".repeat(filledBlocks)}
        <span className="opacity-30">{"░".repeat(emptyBlocks)}</span>
      </span>
      <span className="text-zinc-600 w-12 text-right">{value}%</span>
    </div>
  );
}

interface StatsPanelProps {
  className?: string;
  compact?: boolean;
}

export function StatsPanel({ className, compact = false }: StatsPanelProps) {
  const xp = getXP();
  const level = getLevel();
  const levelProgress = getLevelProgress();
  const xpForCurrentLevel = (level - 1) * 500;
  const xpForNextLevel = level * 500;

  const stats = [
    { label: "Backend", value: 85, color: "cyan" as const },
    { label: "AI/ML", value: 75, color: "pink" as const },
    { label: "Cloud", value: 70, color: "cyan" as const },
    { label: "IoT", value: 60, color: "green" as const },
    { label: "Leadership", value: 80, color: "pink" as const },
  ];

  if (compact) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`font-mono text-xs ${className}`}
      >
        <div className="border border-[#00ffff]/30 bg-black/80 backdrop-blur-sm p-3">
          <div className="flex items-center justify-between border-b border-[#00ffff]/20 pb-2 mb-2">
            <span className="text-[#ff00ff]">LVL</span>
            <span className="text-[#00ffff] text-lg font-bold">{level}</span>
          </div>
          <div className="text-zinc-500">
            XP: <span className="text-[#39ff14]">{xp.toLocaleString()}</span>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`font-mono ${className}`}
    >
      <div className="border border-[#00ffff]/30 bg-black/80 backdrop-blur-sm">
        {/* Header */}
        <div className="border-b border-[#00ffff]/30 bg-gradient-to-r from-[#00ffff]/10 to-[#ff00ff]/10 px-4 py-2">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-[#39ff14] animate-pulse" />
            <span className="text-[#00ffff] text-xs uppercase tracking-wider">
              OPERATIVE_STATS
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          {/* ASCII Border Top */}
          <pre className="text-[#00ffff]/40 text-[10px] leading-none">
{`╔══════════════════════════════════════╗`}
          </pre>

          {/* Profile Info */}
          <div className="space-y-1 px-1">
            <div className="flex justify-between">
              <span className="text-zinc-500">OPERATIVE:</span>
              <span className="text-[#00ffff]">{profile.name.split(" ")[0]} Koranteng</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">CLASS:</span>
              <span className="text-[#ff00ff]">{profile.title}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">LEVEL:</span>
              <span className="text-[#39ff14] font-bold text-lg">{level}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-zinc-500">XP:</span>
              <span className="text-zinc-400">
                <span className="text-[#00ffff]">{xp.toLocaleString()}</span>
                <span className="text-zinc-600"> / {xpForNextLevel.toLocaleString()}</span>
              </span>
            </div>
          </div>

          {/* XP Progress Bar */}
          <div className="px-1">
            <div className="h-3 border border-[#00ffff]/30 bg-black/50 relative overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${levelProgress}%` }}
                transition={{ duration: 1, delay: 0.5 }}
                className="h-full bg-gradient-to-r from-[#00ffff] to-[#ff00ff]"
                style={{
                  boxShadow: "0 0 10px #00ffff",
                }}
              />
              <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent,transparent_4px,rgba(0,0,0,0.3)_4px,rgba(0,0,0,0.3)_8px)]" />
            </div>
          </div>

          {/* Divider */}
          <pre className="text-[#00ffff]/40 text-[10px] leading-none">
{`╠══════════════════════════════════════╣`}
          </pre>

          {/* Stats Section */}
          <div className="space-y-2 px-1">
            <span className="text-[#ff00ff] text-xs uppercase tracking-wider">
              SKILL_STATS
            </span>
            <div className="space-y-1">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index + 0.5 }}
                >
                  <StatBar {...stat} />
                </motion.div>
              ))}
            </div>
          </div>

          {/* ASCII Border Bottom */}
          <pre className="text-[#00ffff]/40 text-[10px] leading-none">
{`╚══════════════════════════════════════╝`}
          </pre>
        </div>
      </div>
    </motion.div>
  );
}
