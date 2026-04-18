"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, ChevronRight, Briefcase, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { experiences } from "@/data/experience";

export default function AccessLogPage() {
  const [expandedId, setExpandedId] = useState<string | null>(
    experiences[0]?.id ?? null
  );

  const toggle = (id: string) =>
    setExpandedId((prev) => (prev === id ? null : id));

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <div className="fixed inset-0 grid-pattern opacity-30 pointer-events-none" />
      <div className="fixed left-0 sm:-left-32 top-1/4 h-64 w-64 sm:h-96 sm:w-96 rounded-full bg-[#00ffff]/5 blur-[120px] pointer-events-none" />
      <div className="fixed right-0 sm:-right-32 bottom-1/4 h-64 w-64 sm:h-96 sm:w-96 rounded-full bg-[#ff00ff]/5 blur-[120px] pointer-events-none" />

      <div className="relative mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center gap-2 text-xs font-mono text-[#39ff14] mb-2">
            <div className="h-2 w-2 rounded-full bg-[#39ff14] animate-pulse" />
            <span>SYSTEM://EXPERIENCE</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-mono font-bold text-white mb-4">
            PROFESSIONAL <span className="text-[#00ffff]">EXPERIENCE</span>
          </h1>
          <p className="text-zinc-500 font-mono text-sm max-w-2xl">
            {">"} Professional experience and operations performed.
            Each entry represents a role undertaken and impact achieved.
          </p>
        </motion.div>

        {/* Accordion cards */}
        <div className="space-y-3">
          {experiences.map((exp, index) => {
            const isOpen = expandedId === exp.id;

            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div
                  className={cn(
                    "border bg-black/50 overflow-hidden transition-all duration-300",
                    isOpen
                      ? "border-[#00ffff] shadow-[0_0_30px_rgba(0,255,255,0.1)]"
                      : "border-zinc-800 hover:border-zinc-600"
                  )}
                >
                  {/* Top accent bar */}
                  <div
                    className={cn(
                      "h-0.5 w-full transition-all duration-300",
                      isOpen
                        ? "bg-gradient-to-r from-[#00ffff] to-[#ff00ff]"
                        : "bg-zinc-800"
                    )}
                  />

                  {/* Header — clickable */}
                  <button
                    onClick={() => toggle(exp.id)}
                    className="w-full text-left p-5 flex items-start justify-between gap-4 group"
                  >
                    <div className="flex-1 min-w-0">
                      {/* Status indicator */}
                      <div className="flex items-center gap-2 text-xs font-mono mb-2">
                        <div
                          className={cn(
                            "h-1.5 w-1.5 rounded-full",
                            isOpen
                              ? "bg-[#39ff14] animate-pulse"
                              : "bg-zinc-600"
                          )}
                        />
                        <span
                          className={cn(
                            "transition-colors",
                            isOpen ? "text-[#39ff14]" : "text-zinc-600"
                          )}
                        >
                          {isOpen ? "ACCESS_GRANTED" : "ENTRY_" + String(index + 1).padStart(2, "0")}
                        </span>
                      </div>

                      {/* Title & company */}
                      <h3 className="text-base sm:text-lg font-mono text-white mb-1 truncate">
                        {exp.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                        <span className="text-[#00ffff] font-mono text-sm flex items-center gap-1">
                          <Briefcase className="h-3 w-3" />
                          {exp.company}
                        </span>
                        <span className="flex items-center gap-1 text-xs font-mono text-zinc-600">
                          <MapPin className="h-3 w-3" />
                          {exp.location}
                        </span>
                      </div>

                      {/* Category tags — always visible */}
                      <div className="flex flex-wrap gap-2 mt-3">
                        {exp.categories.map((cat) => (
                          <span
                            key={cat}
                            className={cn(
                              "text-[10px] font-mono px-2 py-0.5 border transition-colors",
                              isOpen
                                ? "border-[#ff00ff]/40 text-[#ff00ff]"
                                : "border-zinc-800 text-zinc-600"
                            )}
                          >
                            {cat}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Chevron */}
                    <ChevronDown
                      className={cn(
                        "h-5 w-5 shrink-0 mt-1 transition-all duration-300",
                        isOpen
                          ? "text-[#00ffff] rotate-180"
                          : "text-zinc-600 group-hover:text-zinc-400"
                      )}
                    />
                  </button>

                  {/* Expandable content */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 pt-0">
                          <div className="border-t border-zinc-800 pt-4 space-y-5">
                            {exp.responsibilities.map((resp, respIndex) => (
                              <div key={respIndex}>
                                <div className="text-xs font-mono text-[#00ffff] mb-2">
                                  {">"}{" "}
                                  {resp.area.toUpperCase().replace(/ /g, "_")}
                                </div>
                                <ul className="space-y-2">
                                  {resp.bullets.map((bullet, bulletIndex) => (
                                    <motion.li
                                      key={bulletIndex}
                                      initial={{ opacity: 0, x: -10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{
                                        delay: respIndex * 0.1 + bulletIndex * 0.05,
                                      }}
                                      className="flex items-start gap-2 text-xs font-mono text-zinc-500"
                                    >
                                      <ChevronRight className="h-3 w-3 text-[#39ff14] mt-0.5 shrink-0" />
                                      <span>{bullet}</span>
                                    </motion.li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* End marker */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: experiences.length * 0.1 + 0.2 }}
          className="flex justify-center mt-8"
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
