"use client";

import { motion } from "framer-motion";
import { SkillTree } from "@/components/skill-tree";
import { StatsPanel } from "@/components/stats-panel";
import {
  getTotalMasteryPoints,
  getMaxMasteryPoints,
  skillCategories,
} from "@/data/skills";

export default function SkillsPage() {
  const totalPoints = getTotalMasteryPoints();
  const maxPoints = getMaxMasteryPoints();
  const overallMastery = Math.round((totalPoints / maxPoints) * 100);
  const totalSkills = skillCategories.reduce(
    (sum, cat) => sum + cat.skills.length,
    0
  );
  const masteredSkills = skillCategories.reduce(
    (sum, cat) => sum + cat.skills.filter((s) => s.mastery >= 4).length,
    0
  );

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Background */}
      <div className="fixed inset-0 grid-pattern opacity-30 pointer-events-none" />
      <div className="fixed left-0 sm:-left-32 top-1/4 h-64 w-64 sm:h-96 sm:w-96 rounded-full bg-[#00ffff]/5 blur-[120px] pointer-events-none" />
      <div className="fixed right-0 sm:-right-32 bottom-1/4 h-64 w-64 sm:h-96 sm:w-96 rounded-full bg-[#ff00ff]/5 blur-[120px] pointer-events-none" />

      <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center gap-2 text-xs font-mono text-[#39ff14] mb-2">
            <div className="h-2 w-2 rounded-full bg-[#39ff14] animate-pulse" />
            <span>SYSTEM://SKILL_MODULES</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-mono font-bold text-white mb-4">
            SKILL <span className="text-[#00ffff]">TREE</span>
          </h1>
          <p className="text-zinc-500 font-mono text-sm max-w-2xl">
            {">"} Interactive visualization of acquired skills and expertise.
            Click on a category to explore individual skills and mastery levels.
          </p>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          <div className="border border-[#00ffff]/20 bg-black/50 p-4">
            <div className="text-xs font-mono text-zinc-600 mb-1">
              OVERALL_MASTERY
            </div>
            <div className="text-2xl font-mono font-bold text-[#00ffff]">
              {overallMastery}%
            </div>
          </div>
          <div className="border border-[#ff00ff]/20 bg-black/50 p-4">
            <div className="text-xs font-mono text-zinc-600 mb-1">
              TOTAL_SKILLS
            </div>
            <div className="text-2xl font-mono font-bold text-[#ff00ff]">
              {totalSkills}
            </div>
          </div>
          <div className="border border-[#39ff14]/20 bg-black/50 p-4">
            <div className="text-xs font-mono text-zinc-600 mb-1">
              SKILLS_MASTERED
            </div>
            <div className="text-2xl font-mono font-bold text-[#39ff14]">
              {masteredSkills}
            </div>
          </div>
          <div className="border border-[#ffff00]/20 bg-black/50 p-4">
            <div className="text-xs font-mono text-zinc-600 mb-1">
              CATEGORIES
            </div>
            <div className="text-2xl font-mono font-bold text-[#ffff00]">
              {skillCategories.length}
            </div>
          </div>
        </motion.div>

        {/* Skill Tree */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <SkillTree />
        </motion.div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 border border-[#00ffff]/20 bg-black/30 p-6"
        >
          <div className="text-xs font-mono text-[#ff00ff] mb-4">
            {">"} MASTERY_LEVELS
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            {[
              { level: 1, label: "Novice", color: "#666666" },
              { level: 2, label: "Apprentice", color: "#00ff00" },
              { level: 3, label: "Skilled", color: "#00ffff" },
              { level: 4, label: "Expert", color: "#ff00ff" },
              { level: 5, label: "Master", color: "#ffff00" },
            ].map((item) => (
              <div key={item.level} className="flex items-center gap-2">
                <div
                  className="w-3 h-3"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-xs font-mono text-zinc-500">
                  LVL {item.level}: {item.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
