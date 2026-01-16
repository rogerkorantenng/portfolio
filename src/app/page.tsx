"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  Briefcase,
  Code2,
  Users,
  Sparkles,
  ChevronDown,
  Github,
  Linkedin,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeading } from "@/components/section-heading";
import { ProjectCard } from "@/components/project-card";
import { profile } from "@/data/profile";
import { experiences } from "@/data/experience";
import { projects } from "@/data/projects";
import { coreTechnologies } from "@/data/skills";

const stats = [
  {
    icon: Briefcase,
    value: profile.highlights.yearsOfExperience,
    label: "Years Experience",
  },
  {
    icon: Users,
    value: profile.highlights.teamSize,
    label: "Team Led",
  },
  {
    icon: Award,
    value: "2",
    label: "Major Awards",
  },
  {
    icon: Code2,
    value: "4+",
    label: "Projects Shipped",
  },
];

const socialLinks = [
  { icon: Github, href: profile.links.github, label: "GitHub" },
  { icon: Linkedin, href: profile.links.linkedin, label: "LinkedIn" },
  { icon: Mail, href: `mailto:${profile.email}`, label: "Email" },
];

export default function HomePage() {
  const featuredProjects = projects.filter((p) => p.featured);
  const latestExperiences = experiences.slice(0, 2);

  return (
    <div className="flex flex-col">
      {/* Hero Section - Split Screen */}
      <section className="relative min-h-screen overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 bg-[#030303]" />
        <div className="absolute inset-0 dot-pattern opacity-30" />

        {/* Animated gradient orbs */}
        <div className="absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-blue-600/20 blur-[120px]" />
        <div className="absolute -right-32 bottom-1/4 h-96 w-96 rounded-full bg-purple-600/20 blur-[120px]" />
        <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-600/10 blur-[100px]" />

        <div className="relative mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-4 py-20 text-center sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Badge className="mb-8 border-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 px-4 py-2 text-blue-300 backdrop-blur-sm">
                <Sparkles className="mr-2 h-4 w-4" />
                Available for opportunities
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="heading-xl"
            >
              <span className="block text-white">Hi, I&apos;m</span>
              <span className="gradient-text-animated">{profile.name.split(" ")[0]}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-6 text-xl font-medium text-zinc-400 sm:text-2xl"
            >
              {profile.title}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-zinc-500"
            >
              I build{" "}
              <span className="text-white">scalable backend systems</span>,{" "}
              <span className="text-white">AI-powered applications</span>, and{" "}
              <span className="text-white">IoT solutions</span> that drive
              measurable impact.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-10 flex flex-wrap justify-center gap-4"
            >
              <Button
                size="lg"
                className="group border-0 bg-gradient-to-r from-blue-600 to-purple-600 px-8 text-white hover:from-blue-500 hover:to-purple-500"
                asChild
              >
                <Link href="/contact">
                  Get In Touch
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-zinc-800 bg-transparent px-8 hover:bg-zinc-900"
                asChild
              >
                <a href="/Software_Engineer.pdf" download>
                  Download CV
                </a>
              </Button>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="mt-10 flex items-center justify-center gap-4"
            >
              <span className="text-sm text-zinc-600">Connect with me</span>
              <div className="flex gap-2">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-800 text-zinc-500 transition-all hover:border-blue-500/50 hover:bg-blue-500/10 hover:text-blue-400"
                    aria-label={link.label}
                  >
                    <link.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="flex flex-col items-center gap-2 text-zinc-600"
          >
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <ChevronDown className="h-5 w-5" />
          </motion.div>
        </motion.div>
      </section>

      {/* Tech Stack Marquee */}
      <section className="relative z-10 overflow-hidden border-y border-zinc-800/50 bg-zinc-950/50 py-6 backdrop-blur-sm">
        <div className="flex whitespace-nowrap">
          <div className="marquee flex items-center gap-8">
            {[...coreTechnologies, ...coreTechnologies].map((tech, i) => (
              <span
                key={i}
                className="text-lg font-medium text-zinc-600 transition-colors hover:text-white"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section - Glassmorphism Cards */}
      <section className="relative z-10 bg-[#030303] py-24">
        <div className="absolute inset-0 dot-pattern opacity-20" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="group relative overflow-hidden rounded-2xl border border-zinc-800/50 bg-zinc-900/30 p-6 backdrop-blur-sm transition-all hover:border-zinc-700 hover:bg-zinc-900/50">
                  <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-gradient-to-br from-blue-600/10 to-purple-600/10 blur-2xl transition-all group-hover:from-blue-600/20 group-hover:to-purple-600/20" />
                  <stat.icon className="mb-4 h-8 w-8 text-zinc-600 transition-colors group-hover:text-blue-400" />
                  <p className="text-4xl font-bold text-white">{stat.value}</p>
                  <p className="mt-1 text-sm text-zinc-500">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="relative z-10 bg-[#030303] py-24">
        <div className="absolute inset-0 grid-pattern" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Key Achievements"
            subtitle="Highlights from my career journey"
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {profile.highlights.achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="group flex items-center gap-4 rounded-2xl border border-zinc-800/50 bg-zinc-900/30 p-5 backdrop-blur-sm transition-all hover:border-amber-500/30 hover:bg-zinc-900/50">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg shadow-amber-500/20">
                    <Award className="h-6 w-6 text-white" />
                  </div>
                  <p className="font-medium text-zinc-300">{achievement}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="relative z-10 bg-zinc-950 py-24">
        <div className="absolute inset-0 dot-pattern opacity-20" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Featured Projects"
            subtitle="Some of my notable work"
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <Button
              variant="outline"
              size="lg"
              className="group border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900"
              asChild
            >
              <Link href="/projects">
                View All Projects
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Featured Experience */}
      <section className="relative z-10 bg-[#030303] py-24">
        <div className="absolute inset-0 grid-pattern" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Recent Experience"
            subtitle="Where I've been making an impact"
          />
          <div className="space-y-6">
            {latestExperiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="group overflow-hidden rounded-2xl border border-zinc-800/50 bg-zinc-900/30 backdrop-blur-sm transition-all hover:border-zinc-700 hover:bg-zinc-900/50">
                  <div className="h-1 w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600" />
                  <div className="p-6">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <h3 className="text-xl font-semibold text-white">
                          {exp.title}
                        </h3>
                        <p className="mt-1 font-medium text-blue-400">
                          {exp.company}
                        </p>
                        <p className="mt-1 text-sm text-zinc-500">
                          {exp.startDate} - {exp.endDate} | {exp.location}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {exp.categories.map((cat) => (
                          <Badge
                            key={cat}
                            className="border-0 bg-zinc-800 text-zinc-300"
                          >
                            {cat}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="mt-5">
                      <ul className="space-y-2 text-zinc-400">
                        {exp.responsibilities
                          .flatMap((r) => r.bullets)
                          .slice(0, 3)
                          .map((bullet, i) => (
                            <li key={i} className="flex gap-3">
                              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
                              <span>{bullet}</span>
                            </li>
                          ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <Button
              variant="outline"
              size="lg"
              className="group border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900"
              asChild
            >
              <Link href="/experience">
                View Full Experience
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 overflow-hidden py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20" />
        <div className="absolute -left-48 -top-48 h-96 w-96 rounded-full bg-blue-600/30 blur-[120px]" />
        <div className="absolute -bottom-48 -right-48 h-96 w-96 rounded-full bg-purple-600/30 blur-[120px]" />

        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
              Let&apos;s Build Something{" "}
              <span className="gradient-text">Amazing</span>
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-400">
              I&apos;m always open to discussing new projects, creative ideas, or
              opportunities to be part of your vision.
            </p>
            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <Button
                size="lg"
                className="group border-0 bg-white px-8 text-zinc-900 hover:bg-zinc-100"
                asChild
              >
                <Link href="/contact">
                  Start a Conversation
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 bg-white/5 px-8 text-white backdrop-blur-sm hover:bg-white/10"
                asChild
              >
                <a href="/Software_Engineer.pdf" download>
                  Download CV
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
