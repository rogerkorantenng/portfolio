"use client";

import { motion } from "framer-motion";
import {
  BadgeGrid,
  type BadgeRarity,
  type BadgeCategory,
} from "@/components/achievement-badge";
import { certifications } from "@/data/certifications";
import { awards } from "@/data/awards";
import { getProjectBadges } from "@/data/projects";

// Convert data to badge format
const allBadges = [
  // Awards - Legendary
  ...awards.map((award) => ({
    id: award.id,
    name: award.title,
    description: award.description,
    category: "award" as BadgeCategory,
    rarity: "legendary" as BadgeRarity,
    unlocked: true,
    unlockedDate: award.year,
  })),
  // Certifications - Epic
  ...certifications.map((cert) => ({
    id: cert.id,
    name: cert.name,
    description: cert.issuer
      ? `Certified by ${cert.issuer}`
      : "Professional certification",
    category: "certification" as BadgeCategory,
    rarity: "epic" as BadgeRarity,
    unlocked: true,
    unlockedDate: cert.date || "Completed",
  })),
  // Project badges - Rare
  ...getProjectBadges().map((badge, index) => ({
    id: `project-${index}`,
    name: badge.replace(/_/g, " "),
    description: `Earned through successful project completion`,
    category: "project" as BadgeCategory,
    rarity: "rare" as BadgeRarity,
    unlocked: true,
    unlockedDate: "2023",
  })),
  // Milestones - Common/Rare
  {
    id: "first-1000-lines",
    name: "First 1000 Lines",
    description: "Wrote your first 1000 lines of production code",
    category: "milestone" as BadgeCategory,
    rarity: "common" as BadgeRarity,
    unlocked: true,
    unlockedDate: "2022",
  },
  {
    id: "team-leader",
    name: "Team Leader",
    description: "Led a team of engineers for the first time",
    category: "milestone" as BadgeCategory,
    rarity: "rare" as BadgeRarity,
    unlocked: true,
    unlockedDate: "2024",
  },
  {
    id: "open-source",
    name: "Open Source Contributor",
    description: "Contributed to open source projects",
    category: "milestone" as BadgeCategory,
    rarity: "common" as BadgeRarity,
    unlocked: true,
    unlockedDate: "2022",
  },
  {
    id: "cloud-master",
    name: "Cloud Master",
    description: "Deployed applications across multiple cloud platforms",
    category: "milestone" as BadgeCategory,
    rarity: "rare" as BadgeRarity,
    unlocked: true,
    unlockedDate: "2023",
  },
  // Locked badges (future goals)
  {
    id: "100k-users",
    name: "100K Users",
    description: "Build a product used by 100,000+ users",
    category: "milestone" as BadgeCategory,
    rarity: "legendary" as BadgeRarity,
    unlocked: false,
  },
  {
    id: "speaker",
    name: "Tech Speaker",
    description: "Speak at a major tech conference",
    category: "milestone" as BadgeCategory,
    rarity: "epic" as BadgeRarity,
    unlocked: false,
  },
];

export default function TrophiesPage() {
  const unlockedCount = allBadges.filter((b) => b.unlocked).length;
  const legendaryCount = allBadges.filter(
    (b) => b.unlocked && b.rarity === "legendary"
  ).length;
  const epicCount = allBadges.filter(
    (b) => b.unlocked && b.rarity === "epic"
  ).length;
  const rareCount = allBadges.filter(
    (b) => b.unlocked && b.rarity === "rare"
  ).length;

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Background */}
      <div className="fixed inset-0 grid-pattern opacity-30 pointer-events-none" />
      <div className="fixed -left-32 top-1/4 h-96 w-96 rounded-full bg-[#ffff00]/5 blur-[120px] pointer-events-none" />
      <div className="fixed -right-32 bottom-1/4 h-96 w-96 rounded-full bg-[#ff00ff]/5 blur-[120px] pointer-events-none" />

      <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center gap-2 text-xs font-mono text-[#39ff14] mb-2">
            <div className="h-2 w-2 rounded-full bg-[#39ff14] animate-pulse" />
            <span>SYSTEM://TROPHY_CABINET</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-mono font-bold text-white mb-4">
            TROPHIES <span className="text-[#ffff00]">UNLOCKED</span>
          </h1>
          <p className="text-zinc-500 font-mono text-sm max-w-2xl">
            {">"} Collection of achievements, certifications, and recognition earned
            throughout the operative&apos;s career. Each badge represents a milestone reached.
          </p>
        </motion.div>

        {/* Stats by Rarity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          <div className="border border-[#ffff00]/30 bg-[#ffff00]/5 p-4">
            <div className="text-xs font-mono text-[#ffff00]/60 mb-1">
              LEGENDARY
            </div>
            <div className="text-2xl font-mono font-bold text-[#ffff00]">
              {legendaryCount}
            </div>
          </div>
          <div className="border border-[#ff00ff]/30 bg-[#ff00ff]/5 p-4">
            <div className="text-xs font-mono text-[#ff00ff]/60 mb-1">
              EPIC
            </div>
            <div className="text-2xl font-mono font-bold text-[#ff00ff]">
              {epicCount}
            </div>
          </div>
          <div className="border border-[#00ffff]/30 bg-[#00ffff]/5 p-4">
            <div className="text-xs font-mono text-[#00ffff]/60 mb-1">
              RARE
            </div>
            <div className="text-2xl font-mono font-bold text-[#00ffff]">
              {rareCount}
            </div>
          </div>
          <div className="border border-zinc-700 bg-zinc-900/50 p-4">
            <div className="text-xs font-mono text-zinc-500 mb-1">
              TOTAL_UNLOCKED
            </div>
            <div className="text-2xl font-mono font-bold text-white">
              {unlockedCount}/{allBadges.length}
            </div>
          </div>
        </motion.div>

        {/* Badge Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <BadgeGrid badges={allBadges} />
        </motion.div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 border border-[#00ffff]/20 bg-black/30 p-6"
        >
          <div className="text-xs font-mono text-[#ff00ff] mb-4">
            {">"} RARITY_GUIDE
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { rarity: "Common", color: "#666666", description: "Basic achievements" },
              { rarity: "Rare", color: "#00ffff", description: "Notable accomplishments" },
              { rarity: "Epic", color: "#ff00ff", description: "Certifications & major milestones" },
              { rarity: "Legendary", color: "#ffff00", description: "Awards & exceptional recognition" },
            ].map((item) => (
              <div key={item.rarity} className="space-y-1">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3"
                    style={{ backgroundColor: item.color }}
                  />
                  <span
                    className="text-xs font-mono font-bold"
                    style={{ color: item.color }}
                  >
                    {item.rarity.toUpperCase()}
                  </span>
                </div>
                <p className="text-[10px] font-mono text-zinc-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
