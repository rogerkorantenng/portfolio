"use client";

import { motion } from "framer-motion";
import { Github, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
  index: number;
}

const categoryColors: Record<string, string> = {
  AI: "from-violet-500 to-purple-600",
  Backend: "from-blue-500 to-cyan-600",
  Cloud: "from-sky-500 to-blue-600",
  IoT: "from-emerald-500 to-teal-600",
  Frontend: "from-orange-500 to-red-600",
};

export function ProjectCard({ project, index }: ProjectCardProps) {
  const gradientColor = categoryColors[project.category] || "from-zinc-500 to-zinc-600";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <div className="group relative h-full overflow-hidden rounded-2xl border border-zinc-800/50 bg-zinc-900/30 backdrop-blur-sm transition-all duration-500 hover:border-zinc-700 hover:bg-zinc-900/50">
        {/* Hover glow effect */}
        <div className={`absolute -inset-px rounded-2xl bg-gradient-to-r ${gradientColor} opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-20`} />

        {/* Top gradient bar */}
        <div className={`h-1 w-full bg-gradient-to-r ${gradientColor}`} />

        <div className="relative flex h-full flex-col p-6">
          {/* Header */}
          <div className="mb-4 flex items-start justify-between">
            <Badge className={`border-0 bg-gradient-to-r ${gradientColor} text-white`}>
              {project.category}
            </Badge>
            {project.platform && (
              <span className="text-xs text-zinc-600">{project.platform}</span>
            )}
          </div>

          {/* Title */}
          <h3 className="mb-2 text-xl font-semibold text-white transition-colors group-hover:text-blue-400">
            {project.title}
          </h3>

          {/* Description */}
          <p className="mb-4 text-sm text-zinc-500 line-clamp-2">
            {project.description}
          </p>

          {/* Features */}
          <div className="mb-4 flex-1">
            <ul className="space-y-1.5">
              {project.features.slice(0, 3).map((feature, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-zinc-400">
                  <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r ${gradientColor}`} />
                  <span className="line-clamp-1">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack */}
          <div className="mb-4 flex flex-wrap gap-1.5">
            {project.stack.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="rounded-md bg-zinc-800/50 px-2 py-1 text-xs text-zinc-400"
              >
                {tech}
              </span>
            ))}
            {project.stack.length > 4 && (
              <span className="rounded-md bg-zinc-800/50 px-2 py-1 text-xs text-zinc-400">
                +{project.stack.length - 4}
              </span>
            )}
          </div>

          {/* Links */}
          {project.links && (
            <div className="flex gap-2 pt-2">
              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-800 text-zinc-500 transition-all hover:border-zinc-700 hover:bg-zinc-800 hover:text-white"
                >
                  <Github className="h-4 w-4" />
                </a>
              )}
              {project.links.demo && (
                <a
                  href={project.links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-800 text-zinc-500 transition-all hover:border-zinc-700 hover:bg-zinc-800 hover:text-white"
                >
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
