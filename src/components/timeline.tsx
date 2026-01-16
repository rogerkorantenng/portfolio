"use client";

import { motion } from "framer-motion";
import { Briefcase, MapPin, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Experience } from "@/data/experience";

interface TimelineProps {
  experiences: Experience[];
}

export function Timeline({ experiences }: TimelineProps) {
  return (
    <div className="relative space-y-8">
      {/* Vertical line */}
      <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-violet-500 to-purple-500 md:left-1/2 md:-translate-x-1/2" />

      {experiences.map((exp, index) => (
        <motion.div
          key={exp.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.15 }}
          className={`relative flex flex-col md:flex-row ${
            index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
          }`}
        >
          {/* Timeline dot */}
          <div className="absolute left-6 flex h-3 w-3 items-center justify-center md:left-1/2 md:-translate-x-1/2">
            <div className="h-3 w-3 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 shadow-lg shadow-blue-500/50" />
            <div className="absolute h-6 w-6 animate-ping rounded-full bg-blue-500/30" />
          </div>

          {/* Content */}
          <div
            className={`ml-14 w-full md:ml-0 md:w-[calc(50%-3rem)] ${
              index % 2 === 0 ? "md:pr-8" : "md:pl-8"
            }`}
          >
            <div className="card-hover overflow-hidden rounded-2xl border border-zinc-800/50 bg-zinc-900/80 shadow-sm backdrop-blur-sm">
              {/* Top gradient bar */}
              <div className="h-1 w-full bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600" />

              <div className="p-6">
                <div className="mb-4 flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <h3 className="text-xl font-semibold text-white">
                      {exp.title}
                    </h3>
                    <div className="mt-2 flex items-center gap-2 text-blue-400">
                      <Briefcase className="h-4 w-4" />
                      <span className="font-medium">{exp.company}</span>
                    </div>
                  </div>
                  <Badge
                    variant="outline"
                    className={
                      exp.type === "remote"
                        ? "border-emerald-800 bg-emerald-950 text-emerald-400"
                        : "border-zinc-700 bg-zinc-800 text-zinc-300"
                    }
                  >
                    {exp.type === "remote" ? "Remote" : "On-site"}
                  </Badge>
                </div>

                <div className="mb-5 flex flex-wrap gap-4 text-sm text-zinc-400">
                  <div className="flex items-center gap-1.5 rounded-full bg-zinc-800 px-3 py-1">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {exp.startDate} - {exp.endDate}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 rounded-full bg-zinc-800 px-3 py-1">
                    <MapPin className="h-4 w-4" />
                    <span>{exp.location}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  {exp.responsibilities.map((resp) => (
                    <div key={resp.area}>
                      <h4 className="mb-2 text-sm font-semibold text-zinc-200">
                        {resp.area}
                      </h4>
                      <ul className="space-y-2 text-sm text-zinc-300">
                        {resp.bullets.map((bullet, i) => (
                          <li key={i} className="flex gap-3">
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-blue-500 to-violet-500" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {exp.categories.map((cat) => (
                    <Badge key={cat} variant="secondary">
                      {cat}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
