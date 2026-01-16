"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Server,
  Database,
  Cloud,
  Brain,
  Cpu,
  Wrench,
  ChevronRight,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  skillCategories,
  getMasteryLabel,
  getMasteryColor,
  getCategoryMastery,
  type SkillCategory,
  type Skill,
} from "@/data/skills";

const categoryIcons: Record<string, React.ElementType> = {
  server: Server,
  database: Database,
  cloud: Cloud,
  brain: Brain,
  cpu: Cpu,
  wrench: Wrench,
};

const colorClasses: Record<string, { border: string; bg: string; text: string; glow: string }> = {
  cyan: {
    border: "border-[#00ffff]/30 hover:border-[#00ffff]",
    bg: "bg-[#00ffff]/10",
    text: "text-[#00ffff]",
    glow: "hover:shadow-[0_0_20px_rgba(0,255,255,0.3)]",
  },
  pink: {
    border: "border-[#ff00ff]/30 hover:border-[#ff00ff]",
    bg: "bg-[#ff00ff]/10",
    text: "text-[#ff00ff]",
    glow: "hover:shadow-[0_0_20px_rgba(255,0,255,0.3)]",
  },
  green: {
    border: "border-[#39ff14]/30 hover:border-[#39ff14]",
    bg: "bg-[#39ff14]/10",
    text: "text-[#39ff14]",
    glow: "hover:shadow-[0_0_20px_rgba(57,255,20,0.3)]",
  },
  yellow: {
    border: "border-[#ffff00]/30 hover:border-[#ffff00]",
    bg: "bg-[#ffff00]/10",
    text: "text-[#ffff00]",
    glow: "hover:shadow-[0_0_20px_rgba(255,255,0,0.3)]",
  },
  purple: {
    border: "border-[#bf00ff]/30 hover:border-[#bf00ff]",
    bg: "bg-[#bf00ff]/10",
    text: "text-[#bf00ff]",
    glow: "hover:shadow-[0_0_20px_rgba(191,0,255,0.3)]",
  },
};

interface SkillNodeProps {
  skill: Skill;
  color: string;
  delay: number;
}

function SkillNode({ skill, color, delay }: SkillNodeProps) {
  const colors = colorClasses[color] || colorClasses.cyan;
  const masteryColor = getMasteryColor(skill.mastery);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay }}
      className={cn(
        "group relative border bg-black/50 p-3 transition-all cursor-default",
        colors.border,
        colors.glow
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm font-mono text-zinc-300 group-hover:text-white">
          {skill.name}
        </span>
        <span
          className="text-xs font-mono px-2 py-0.5"
          style={{ color: masteryColor, backgroundColor: `${masteryColor}20` }}
        >
          {getMasteryLabel(skill.mastery)}
        </span>
      </div>

      {/* Mastery bar */}
      <div className="mt-2 h-1 bg-zinc-800 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${(skill.mastery / 5) * 100}%` }}
          transition={{ delay: delay + 0.2, duration: 0.5 }}
          className="h-full"
          style={{ backgroundColor: masteryColor }}
        />
      </div>

      {skill.description && (
        <p className="mt-2 text-xs text-zinc-500 line-clamp-1 group-hover:line-clamp-none">
          {skill.description}
        </p>
      )}
    </motion.div>
  );
}

interface CategoryNodeProps {
  category: SkillCategory;
  onClick: () => void;
  isSelected: boolean;
  index: number;
}

function CategoryNode({ category, onClick, isSelected, index }: CategoryNodeProps) {
  const Icon = categoryIcons[category.icon] || Server;
  const colors = colorClasses[category.color] || colorClasses.cyan;
  const mastery = getCategoryMastery(category.id);

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      onClick={onClick}
      className={cn(
        "group relative border bg-black/50 p-5 transition-all text-left w-full",
        colors.border,
        colors.glow,
        isSelected && `${colors.bg} ${colors.border.replace("/30", "")}`
      )}
    >
      {/* Connection line to center */}
      <div className="absolute -top-8 left-1/2 w-px h-8 bg-gradient-to-b from-transparent to-[#00ffff]/30 hidden lg:block" />

      <div className="flex items-start justify-between">
        <div className={cn("p-2", colors.bg)}>
          <Icon className={cn("h-6 w-6", colors.text)} />
        </div>
        <div className="text-right">
          <span className={cn("text-2xl font-mono font-bold", colors.text)}>
            {mastery}%
          </span>
        </div>
      </div>

      <div className="mt-3">
        <h3 className="font-mono text-sm text-white uppercase tracking-wider">
          {category.name}
        </h3>
        <p className="text-xs text-zinc-500 mt-1">
          {category.skills.length} skills
        </p>
      </div>

      {/* Progress bar */}
      <div className="mt-3 h-1 bg-zinc-800 overflow-hidden">
        <div
          className={cn("h-full transition-all", colors.bg.replace("/10", ""))}
          style={{ width: `${mastery}%` }}
        />
      </div>

      <div className="mt-3 flex items-center justify-between text-xs">
        <span className="text-zinc-600">
          {category.skills.filter((s) => s.mastery >= 4).length} mastered
        </span>
        <ChevronRight
          className={cn(
            "h-4 w-4 transition-transform",
            colors.text,
            isSelected && "rotate-90"
          )}
        />
      </div>
    </motion.button>
  );
}

export function SkillTree() {
  const [selectedCategory, setSelectedCategory] = useState<SkillCategory | null>(null);

  return (
    <div className="space-y-8">
      {/* Category Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {skillCategories.map((category, index) => (
          <CategoryNode
            key={category.id}
            category={category}
            onClick={() =>
              setSelectedCategory(
                selectedCategory?.id === category.id ? null : category
              )
            }
            isSelected={selectedCategory?.id === category.id}
            index={index}
          />
        ))}
      </div>

      {/* Selected Category Skills */}
      <AnimatePresence>
        {selectedCategory && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="border border-[#00ffff]/20 bg-black/30 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="text-xs font-mono text-[#ff00ff] mb-1">
                    {">"} SKILL_MODULE
                  </div>
                  <h3 className="text-xl font-mono text-white uppercase">
                    {selectedCategory.name}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="p-2 border border-[#ff00ff]/30 hover:border-[#ff00ff] hover:bg-[#ff00ff]/10 transition-all"
                >
                  <X className="h-4 w-4 text-[#ff00ff]" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {selectedCategory.skills.map((skill, index) => (
                  <SkillNode
                    key={skill.name}
                    skill={skill}
                    color={selectedCategory.color}
                    delay={index * 0.05}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
