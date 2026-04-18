"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Terminal as TerminalIcon,
  Shield,
  Cpu,
  Database,
  Cloud,
  Brain,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Terminal } from "@/components/terminal";
import { StatsPanel } from "@/components/stats-panel";
import { GlitchText } from "@/components/glitch-text";
import { TypingSequence } from "@/components/typing-text";
import { profile, getXP, getLevel } from "@/data/profile";
import { projects } from "@/data/projects";
import { coreTechnologies } from "@/data/skills";

const quickLinks = [
  { href: "/skills", label: "SKILL_MODULES", icon: Cpu, command: "./skills" },
  { href: "/projects", label: "PROJECTS", icon: Shield, command: "./projects" },
  { href: "/experience", label: "EXPERIENCE", icon: Database, command: "cat /log" },
  { href: "/trophies", label: "TROPHIES", icon: Brain, command: "./trophies" },
];

const bootMessages = [
  "> SYSTEM BOOT SEQUENCE INITIATED...",
  "> Loading kernel modules... [OK]",
  "> Initializing neural interface... [OK]",
  "> Establishing secure connection... [OK]",
  "> Welcome, visitor.",
];

export default function HomePage() {
  const [bootComplete, setBootComplete] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 3);
  const level = getLevel();
  const xp = getXP();

  useEffect(() => {
    // Skip boot animation if user has visited before in this session
    const hasBooted = sessionStorage.getItem("hasBooted");
    if (hasBooted) {
      setBootComplete(true);
      setShowContent(true);
    }
  }, []);

  const handleBootComplete = () => {
    setBootComplete(true);
    sessionStorage.setItem("hasBooted", "true");
    setTimeout(() => setShowContent(true), 500);
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section - Boot Sequence */}
      <section className="relative min-h-screen overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 bg-[#0a0a0a]" />
        <div className="absolute inset-0 grid-pattern opacity-30" />

        {/* Animated gradient orbs - Cyberpunk colors - contained within viewport */}
        <div className="absolute left-0 top-1/4 h-64 w-64 sm:h-96 sm:w-96 sm:-left-32 rounded-full bg-[#00ffff]/10 blur-[120px]" />
        <div className="absolute right-0 bottom-1/4 h-64 w-64 sm:h-96 sm:w-96 sm:-right-32 rounded-full bg-[#ff00ff]/10 blur-[120px]" />
        <div className="absolute left-1/2 top-1/2 h-48 w-48 sm:h-64 sm:w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#39ff14]/5 blur-[100px]" />

        <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-4 py-20 sm:px-6 lg:px-8">
          {/* Boot Sequence */}
          {!bootComplete && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center"
            >
              <div className="max-w-2xl w-full">
                <TypingSequence
                  lines={bootMessages}
                  speed={30}
                  lineDelay={300}
                  onComplete={handleBootComplete}
                  className="text-sm sm:text-base"
                />
              </div>
            </motion.div>
          )}

          {/* Main Content */}
          {showContent && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="grid gap-8 lg:grid-cols-2"
            >
              {/* Left Column - Terminal */}
              <div className="space-y-6">
                {/* Header */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-4"
                >
                  <div className="flex items-center gap-2 text-xs font-mono text-[#39ff14]">
                    <div className="h-2 w-2 rounded-full bg-[#39ff14] animate-pulse" />
                    <span>SYSTEM ONLINE</span>
                    <span className="text-zinc-600">|</span>
                    <span className="text-[#00ffff]">LVL {level}</span>
                    <span className="text-zinc-600">|</span>
                    <span className="text-zinc-500">XP: {xp.toLocaleString()}</span>
                  </div>

                  <h1 className="font-mono">
                    <GlitchText
                      text={profile.name.split(" ")[0].toUpperCase()}
                      as="span"
                      className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#00ffff] block"
                    />
                    <span className="text-2xl sm:text-3xl lg:text-4xl text-[#ff00ff] block mt-2">
                      {profile.title}
                    </span>
                  </h1>

                  <p className="text-zinc-400 max-w-lg font-mono text-sm">
                    <span className="text-[#39ff14]">{">"}</span> Backend Systems Specialist.
                    AI/ML Engineer. Cloud Architect.
                    Building scalable solutions that drive impact.
                  </p>
                </motion.div>

                {/* Terminal Component */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Terminal className="w-full" />
                </motion.div>
              </div>

              {/* Right Column - Stats and Quick Links */}
              <div className="space-y-6">
                {/* Stats Panel */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <StatsPanel />
                </motion.div>

                {/* Quick Links */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="grid grid-cols-2 gap-3"
                >
                  {quickLinks.map((link, index) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="group relative border border-[#00ffff]/20 bg-black/50 p-4 transition-all hover:border-[#00ffff] hover:shadow-[0_0_20px_rgba(0,255,255,0.2)]"
                    >
                      <div className="flex items-start justify-between">
                        <link.icon className="h-6 w-6 text-[#00ffff]/60 group-hover:text-[#00ffff] transition-colors" />
                        <span className="text-[10px] font-mono text-zinc-600 group-hover:text-[#39ff14]">
                          [{index}]
                        </span>
                      </div>
                      <div className="mt-3">
                        <p className="text-sm font-mono text-white group-hover:text-[#00ffff]">
                          {link.label}
                        </p>
                        <p className="text-xs font-mono text-zinc-600 mt-1">
                          $ {link.command}
                        </p>
                      </div>
                      {/* Hover effect line */}
                      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#00ffff] to-[#ff00ff] opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  ))}
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex flex-col sm:flex-row gap-3"
                >
                  <Button
                    size="lg"
                    className="flex-1 border border-[#00ffff] bg-[#00ffff]/10 text-[#00ffff] hover:bg-[#00ffff]/20 hover:shadow-[0_0_20px_rgba(0,255,255,0.3)] font-mono uppercase tracking-wider"
                    asChild
                  >
                    <Link href="/connect">
                      <TerminalIcon className="mr-2 h-4 w-4" />
                      ESTABLISH_CONNECTION
                    </Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="flex-1 border-[#ff00ff]/50 text-[#ff00ff] hover:bg-[#ff00ff]/10 hover:border-[#ff00ff] font-mono uppercase tracking-wider"
                    asChild
                  >
                    <a href="/Software_Engineer.pdf" download>
                      DOWNLOAD_CV
                    </a>
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Tech Stack Marquee */}
      {showContent && (
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="relative z-10 overflow-hidden border-y border-[#00ffff]/20 bg-black/50 py-4 backdrop-blur-sm"
        >
          <div className="flex whitespace-nowrap">
            <div className="marquee flex items-center gap-8">
              {[...coreTechnologies, ...coreTechnologies].map((tech, i) => (
                <span
                  key={i}
                  className="text-sm font-mono text-zinc-600 transition-colors hover:text-[#00ffff]"
                >
                  <span className="text-[#ff00ff]">&lt;</span>
                  {tech}
                  <span className="text-[#ff00ff]">/&gt;</span>
                </span>
              ))}
            </div>
          </div>
        </motion.section>
      )}

      {/* Featured Missions Preview */}
      {showContent && (
        <section className="relative z-10 bg-[#0a0a0a] py-20">
          <div className="absolute inset-0 dot-pattern opacity-20" />
          <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <div className="flex items-center gap-2 text-xs font-mono text-[#ff00ff] mb-2">
                <span>{">"}</span>
                <span>RECENT_OPERATIONS</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-mono font-bold text-white">
                COMPLETED <span className="text-[#00ffff]">PROJECTS</span>
              </h2>
            </motion.div>

            <div className="grid gap-4 md:grid-cols-3">
              {featuredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative border border-[#00ffff]/20 bg-black/50 p-5 transition-all hover:border-[#00ffff] hover:shadow-[0_0_30px_rgba(0,255,255,0.1)]"
                >
                  {/* Status indicator */}
                  <div className="absolute top-3 right-3 flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-[#39ff14]" />
                    <span className="text-[10px] font-mono text-[#39ff14]">
                      {project.status}
                    </span>
                  </div>

                  {/* Codename */}
                  <div className="text-xs font-mono text-[#ff00ff] mb-2">
                    CODENAME: {project.codename}
                  </div>

                  {/* Title */}
                  <h3 className="font-mono text-white group-hover:text-[#00ffff] transition-colors mb-2">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs font-mono text-zinc-500 mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Difficulty and XP */}
                  <div className="flex items-center justify-between text-xs font-mono">
                    <div className="text-zinc-600">
                      DIFF: <span className="text-[#ffff00]">{"★".repeat(project.difficulty)}</span>
                      <span className="text-zinc-700">{"★".repeat(5 - project.difficulty)}</span>
                    </div>
                    <div className="text-[#39ff14]">
                      +{project.xpReward} XP
                    </div>
                  </div>

                  {/* Bottom line */}
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#00ffff] to-[#ff00ff] opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-8 text-center"
            >
              <Button
                variant="outline"
                className="border-[#00ffff]/50 text-[#00ffff] hover:bg-[#00ffff]/10 hover:border-[#00ffff] font-mono uppercase tracking-wider"
                asChild
              >
                <Link href="/projects">
                  VIEW_ALL_PROJECTS
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      {showContent && (
        <section className="relative z-10 overflow-hidden py-24">
          <div className="absolute inset-0 bg-gradient-to-br from-[#00ffff]/10 via-[#ff00ff]/10 to-[#39ff14]/10" />
          <div className="absolute inset-0 grid-pattern opacity-30" />

          <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="text-xs font-mono text-[#39ff14] mb-4">
                {">"} READY TO COLLABORATE?
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-mono font-bold text-white mb-4">
                LET&apos;S BUILD SOMETHING{" "}
                <span className="gradient-text-animated">LEGENDARY</span>
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-zinc-400 font-mono text-sm mb-8">
                Looking for a skilled operative to join your team?
                I&apos;m always open to discussing new projects, creative challenges,
                or opportunities to make an impact.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button
                  size="lg"
                  className="border border-[#00ffff] bg-[#00ffff]/10 text-[#00ffff] hover:bg-[#00ffff]/20 hover:shadow-[0_0_30px_rgba(0,255,255,0.3)] font-mono uppercase tracking-wider"
                  asChild
                >
                  <Link href="/connect">
                    INITIATE_CONTACT
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      )}
    </div>
  );
}
