"use client";

import { useState } from "react";
import { SectionHeading } from "@/components/section-heading";
import { ProjectCard } from "@/components/project-card";
import { Button } from "@/components/ui/button";
import { projects, projectCategories, type ProjectCategory } from "@/data/projects";

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>("All");

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <div className="py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Projects"
          subtitle="A collection of projects I've worked on"
        />

        {/* Filter Buttons */}
        <div className="mb-12 flex flex-wrap justify-center gap-2">
          {projectCategories.map((category) => (
            <Button
              key={category}
              variant={activeFilter === category ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveFilter(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-zinc-400">
              No projects found in this category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
