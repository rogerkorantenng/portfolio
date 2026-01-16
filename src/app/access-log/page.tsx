"use client";

import { motion } from "framer-motion";
import { MapPin, Calendar, Briefcase, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { experiences } from "@/data/experience";

export default function AccessLogPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Background */}
      <div className="fixed inset-0 grid-pattern opacity-30 pointer-events-none" />
      <div className="fixed -left-32 top-1/4 h-96 w-96 rounded-full bg-[#00ffff]/5 blur-[120px] pointer-events-none" />
      <div className="fixed -right-32 bottom-1/4 h-96 w-96 rounded-full bg-[#ff00ff]/5 blur-[120px] pointer-events-none" />

      <div className="relative mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center gap-2 text-xs font-mono text-[#39ff14] mb-2">
            <div className="h-2 w-2 rounded-full bg-[#39ff14] animate-pulse" />
            <span>SYSTEM://ACCESS_LOG</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-mono font-bold text-white mb-4">
            SYSTEM <span className="text-[#00ffff]">ACCESS_LOG</span>
          </h1>
          <p className="text-zinc-500 font-mono text-sm max-w-2xl">
            {">"} Chronological record of system access and operations performed.
            Each entry represents a role undertaken and impact achieved.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#00ffff] via-[#ff00ff] to-[#39ff14]" />

          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              className={cn(
                "relative mb-12 md:w-[calc(50%-2rem)]",
                index % 2 === 0 ? "md:mr-auto md:pr-8" : "md:ml-auto md:pl-8"
              )}
            >
              {/* Connection dot */}
              <div
                className={cn(
                  "absolute top-6 w-4 h-4 border-2 border-[#00ffff] bg-black",
                  index % 2 === 0
                    ? "left-[-8px] md:left-auto md:right-[-2rem] md:translate-x-1/2"
                    : "left-[-8px] md:left-[-2rem] md:translate-x-[-50%]"
                )}
              >
                <div className="absolute inset-1 bg-[#00ffff] animate-pulse" />
              </div>

              {/* Card */}
              <div className="border border-[#00ffff]/20 bg-black/50 overflow-hidden hover:border-[#00ffff] transition-all hover:shadow-[0_0_30px_rgba(0,255,255,0.1)]">
                {/* Status bar */}
                <div className="h-1 w-full bg-gradient-to-r from-[#00ffff] to-[#ff00ff]" />

                <div className="p-5">
                  {/* Timestamp */}
                  <div className="flex items-center gap-2 text-xs font-mono text-[#39ff14] mb-3">
                    <Calendar className="h-3 w-3" />
                    <span>
                      [{exp.startDate}] - [{exp.endDate}]
                    </span>
                  </div>

                  {/* Access granted header */}
                  <div className="text-xs font-mono text-[#ff00ff] mb-2">
                    {">"} ACCESS_GRANTED
                  </div>

                  {/* Title & Company */}
                  <h3 className="text-lg font-mono text-white mb-1">
                    {exp.title}
                  </h3>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-[#00ffff] font-mono text-sm">
                      {exp.company}
                    </span>
                    <span className="flex items-center gap-1 text-xs font-mono text-zinc-600">
                      <MapPin className="h-3 w-3" />
                      {exp.location}
                    </span>
                  </div>

                  {/* Categories */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {exp.categories.map((cat) => (
                      <span
                        key={cat}
                        className="text-[10px] font-mono px-2 py-1 border border-[#ff00ff]/30 text-[#ff00ff]"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>

                  {/* Responsibilities */}
                  <div className="space-y-4">
                    {exp.responsibilities.map((resp, respIndex) => (
                      <div key={respIndex}>
                        <div className="text-xs font-mono text-[#00ffff] mb-2">
                          {">"} {resp.area.toUpperCase().replace(/ /g, "_")}
                        </div>
                        <ul className="space-y-2">
                          {resp.bullets.map((bullet, bulletIndex) => (
                            <li
                              key={bulletIndex}
                              className="flex items-start gap-2 text-xs font-mono text-zinc-500"
                            >
                              <ChevronRight className="h-3 w-3 text-[#39ff14] mt-0.5 shrink-0" />
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* End marker */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: experiences.length * 0.2 + 0.2 }}
          className="relative flex justify-center"
        >
          <div className="border border-[#39ff14]/50 bg-black/50 px-6 py-3">
            <span className="text-xs font-mono text-[#39ff14]">
              {">"} END_OF_LOG
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
