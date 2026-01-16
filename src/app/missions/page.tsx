"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ExternalLink,
  Github,
  ChevronDown,
  ChevronUp,
  Target,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  projects,
  projectCategories,
  getDifficultyLabel,
  getProjectXP,
  getProjectBadges,
  type Project,
} from "@/data/projects";

interface MissionCardProps {
  project: Project;
  index: number;
}

function MissionCard({ project, index }: MissionCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group border border-[#00ffff]/20 bg-black/50 overflow-hidden transition-all hover:border-[#00ffff] hover:shadow-[0_0_30px_rgba(0,255,255,0.1)]"
    >
      {/* Status bar */}
      <div
        className={cn(
          "h-1 w-full",
          project.status === "COMPLETE"
            ? "bg-[#39ff14]"
            : project.status === "IN_PROGRESS"
            ? "bg-[#ffff00]"
            : "bg-[#ff00ff]"
        )}
      />

      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono text-[#ff00ff]">
                CODENAME: {project.codename}
              </span>
              <span
                className={cn(
                  "text-[10px] font-mono px-1.5 py-0.5",
                  project.status === "COMPLETE"
                    ? "bg-[#39ff14]/20 text-[#39ff14]"
                    : project.status === "IN_PROGRESS"
                    ? "bg-[#ffff00]/20 text-[#ffff00]"
                    : "bg-[#ff00ff]/20 text-[#ff00ff]"
                )}
              >
                {project.status}
              </span>
            </div>
            <h3 className="text-lg font-mono text-white group-hover:text-[#00ffff] transition-colors">
              {project.title}
            </h3>
          </div>
          <div className="text-right">
            <div className="text-lg font-mono font-bold text-[#39ff14]">
              +{project.xpReward} XP
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm font-mono text-zinc-500 mb-4">
          {project.description}
        </p>

        {/* Difficulty & Platform */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="text-xs font-mono text-zinc-600">
              DIFFICULTY:{" "}
              <span className="text-[#ffff00]">
                {"★".repeat(project.difficulty)}
              </span>
              <span className="text-zinc-700">
                {"★".repeat(5 - project.difficulty)}
              </span>
            </div>
            <div className="text-xs font-mono text-zinc-600">
              [{getDifficultyLabel(project.difficulty)}]
            </div>
          </div>
          {project.platform && (
            <span className="text-xs font-mono text-[#00ffff]/60">
              {project.platform}
            </span>
          )}
        </div>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.stack.slice(0, expanded ? undefined : 4).map((tech) => (
            <span
              key={tech}
              className="text-[10px] font-mono px-2 py-1 border border-[#00ffff]/20 text-zinc-400"
            >
              {tech}
            </span>
          ))}
          {!expanded && project.stack.length > 4 && (
            <span className="text-[10px] font-mono text-zinc-600">
              +{project.stack.length - 4} more
            </span>
          )}
        </div>

        {/* Expandable Section */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1 text-xs font-mono text-[#00ffff] hover:text-[#00ffff]/80 transition-colors mb-4"
        >
          {expanded ? (
            <>
              <ChevronUp className="h-3 w-3" />
              COLLAPSE
            </>
          ) : (
            <>
              <ChevronDown className="h-3 w-3" />
              EXPAND_DETAILS
            </>
          )}
        </button>

        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="space-y-4 pt-4 border-t border-[#00ffff]/10"
          >
            {/* Problem */}
            <div>
              <div className="text-xs font-mono text-[#ff00ff] mb-1">
                {">"} PROBLEM
              </div>
              <p className="text-xs font-mono text-zinc-500">{project.problem}</p>
            </div>

            {/* Solution */}
            <div>
              <div className="text-xs font-mono text-[#39ff14] mb-1">
                {">"} SOLUTION
              </div>
              <p className="text-xs font-mono text-zinc-500">{project.solution}</p>
            </div>

            {/* Features */}
            <div>
              <div className="text-xs font-mono text-[#00ffff] mb-2">
                {">"} FEATURES
              </div>
              <ul className="space-y-1">
                {project.features.map((feature, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-xs font-mono text-zinc-500"
                  >
                    <span className="text-[#00ffff] mt-0.5">-</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Badges */}
            <div>
              <div className="text-xs font-mono text-[#ffff00] mb-2">
                {">"} REWARDS
              </div>
              <div className="flex flex-wrap gap-2">
                {project.badges.map((badge) => (
                  <span
                    key={badge}
                    className="text-[10px] font-mono px-2 py-1 bg-[#ffff00]/10 text-[#ffff00] border border-[#ffff00]/30"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Links */}
        {project.links && (
          <div className="flex items-center gap-3 pt-4 border-t border-[#00ffff]/10">
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs font-mono text-zinc-500 hover:text-[#00ffff] transition-colors"
              >
                <Github className="h-3 w-3" />
                SOURCE
              </a>
            )}
            {project.links.demo && (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs font-mono text-zinc-500 hover:text-[#00ffff] transition-colors"
              >
                <ExternalLink className="h-3 w-3" />
                DEMO
              </a>
            )}
            {project.links.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs font-mono text-zinc-500 hover:text-[#39ff14] transition-colors"
              >
                <Zap className="h-3 w-3" />
                LIVE
              </a>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function MissionsPage() {
  const [filter, setFilter] = useState<string>("All");
  const totalXP = getProjectXP();
  const badges = getProjectBadges();

  const filteredProjects =
    filter === "All"
      ? projects
      : projects.filter((p) => p.category === filter);

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Background */}
      <div className="fixed inset-0 grid-pattern opacity-30 pointer-events-none" />
      <div className="fixed -left-32 top-1/4 h-96 w-96 rounded-full bg-[#00ffff]/5 blur-[120px] pointer-events-none" />
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
            <span>SYSTEM://MISSION_LOGS</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-mono font-bold text-white mb-4">
            COMPLETED <span className="text-[#00ffff]">MISSIONS</span>
          </h1>
          <p className="text-zinc-500 font-mono text-sm max-w-2xl">
            {">"} Archive of completed operations and projects.
            Each mission represents a challenge overcome and skills demonstrated.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          <div className="border border-[#00ffff]/20 bg-black/50 p-4">
            <div className="text-xs font-mono text-zinc-600 mb-1">
              TOTAL_MISSIONS
            </div>
            <div className="text-2xl font-mono font-bold text-[#00ffff]">
              {projects.length}
            </div>
          </div>
          <div className="border border-[#39ff14]/20 bg-black/50 p-4">
            <div className="text-xs font-mono text-zinc-600 mb-1">
              XP_EARNED
            </div>
            <div className="text-2xl font-mono font-bold text-[#39ff14]">
              +{totalXP.toLocaleString()}
            </div>
          </div>
          <div className="border border-[#ffff00]/20 bg-black/50 p-4">
            <div className="text-xs font-mono text-zinc-600 mb-1">
              BADGES_EARNED
            </div>
            <div className="text-2xl font-mono font-bold text-[#ffff00]">
              {badges.length}
            </div>
          </div>
          <div className="border border-[#ff00ff]/20 bg-black/50 p-4">
            <div className="text-xs font-mono text-zinc-600 mb-1">
              SUCCESS_RATE
            </div>
            <div className="text-2xl font-mono font-bold text-[#ff00ff]">
              100%
            </div>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-2 mb-8"
        >
          {projectCategories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={cn(
                "px-4 py-2 text-xs font-mono uppercase tracking-wider transition-all",
                filter === category
                  ? "bg-[#00ffff]/20 text-[#00ffff] border border-[#00ffff]"
                  : "bg-black/50 text-zinc-500 border border-zinc-800 hover:border-[#00ffff]/50 hover:text-[#00ffff]"
              )}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {filteredProjects.map((project, index) => (
            <MissionCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-20">
            <p className="text-zinc-600 font-mono">
              No missions found for this category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
