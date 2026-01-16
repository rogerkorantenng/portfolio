import type { Metadata } from "next";
import { MapPin, Mail, Phone, ExternalLink, GraduationCap, Award } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { BadgeList } from "@/components/badge-list";
import { CTAButtons } from "@/components/cta-buttons";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { profile } from "@/data/profile";
import { skills } from "@/data/skills";
import { education } from "@/data/education";
import { certifications } from "@/data/certifications";
import { awards } from "@/data/awards";

export const metadata: Metadata = {
  title: "About",
  description: `Learn more about ${profile.name}, a ${profile.title} based in ${profile.location}.`,
};

export default function AboutPage() {
  return (
    <div className="py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* About Section */}
        <section className="mb-20">
          <SectionHeading title="About Me" align="left" />
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <p className="text-lg leading-relaxed text-zinc-300">
                {profile.summary}
              </p>
              <p className="mt-6 text-lg leading-relaxed text-zinc-300">
                With experience leading engineering teams and delivering products that achieve
                significant adoption rates, I specialize in building multi-tenant SaaS architectures,
                optimizing database performance, and developing AI-powered applications. My work
                has contributed to environmental monitoring initiatives and enterprise solutions
                across multiple industries.
              </p>
              <div className="mt-8">
                <CTAButtons />
              </div>
            </div>
            <div className="space-y-4">
              <Card>
                <CardContent className="p-6">
                  <h3 className="mb-4 font-semibold text-white">
                    Contact Info
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-3 text-zinc-400">
                      <MapPin className="h-4 w-4 shrink-0" />
                      <span>{profile.location}</span>
                    </div>
                    <div className="flex items-center gap-3 text-zinc-400">
                      <Mail className="h-4 w-4 shrink-0" />
                      <a
                        href={`mailto:${profile.email}`}
                        className="hover:text-white"
                      >
                        {profile.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-3 text-zinc-400">
                      <Phone className="h-4 w-4 shrink-0" />
                      <span>{profile.phone}</span>
                    </div>
                    <div className="flex items-center gap-3 text-zinc-400">
                      <ExternalLink className="h-4 w-4 shrink-0" />
                      <a
                        href={profile.links.blog}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-white"
                      >
                        Blog
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="mb-20">
          <SectionHeading
            title="Skills & Technologies"
            subtitle="Technologies and tools I work with"
            align="left"
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {skills.map((category) => (
              <Card key={category.name}>
                <CardHeader>
                  <CardTitle className="text-lg">{category.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <BadgeList items={category.skills} />
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Education Section */}
        <section className="mb-20">
          <SectionHeading
            title="Education"
            subtitle="Academic background"
            align="left"
          />
          <div className="grid gap-6 sm:grid-cols-2">
            {education.map((edu) => (
              <Card key={edu.id}>
                <CardContent className="flex gap-4 p-6">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-zinc-800">
                    <GraduationCap className="h-6 w-6 text-zinc-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">
                      {edu.degree} in {edu.field}
                    </h3>
                    <p className="text-zinc-300">
                      {edu.institution}
                    </p>
                    <p className="text-sm text-zinc-500">{edu.location}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Certifications Section */}
        <section className="mb-20">
          <SectionHeading
            title="Certifications"
            subtitle="Professional credentials"
            align="left"
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {certifications.map((cert) => (
              <Card key={cert.id}>
                <CardContent className="p-4">
                  <h3 className="font-medium text-white">
                    {cert.name}
                  </h3>
                  {cert.issuer && (
                    <p className="text-sm text-zinc-400">
                      {cert.issuer}
                    </p>
                  )}
                  {cert.date && (
                    <p className="mt-1 text-xs text-zinc-500">{cert.date}</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Awards Section */}
        <section>
          <SectionHeading
            title="Awards & Recognition"
            subtitle="Notable achievements"
            align="left"
          />
          <div className="grid gap-6 sm:grid-cols-2">
            {awards.map((award) => (
              <Card key={award.id}>
                <CardContent className="flex gap-4 p-6">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-yellow-900">
                    <Award className="h-6 w-6 text-yellow-400" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-white">
                        {award.title}
                      </h3>
                      {award.year && (
                        <Badge variant="secondary">{award.year}</Badge>
                      )}
                    </div>
                    <p className="text-zinc-300">
                      {award.organization}
                    </p>
                    <Badge variant="outline" className="mt-2">
                      {award.achievement}
                    </Badge>
                    <p className="mt-3 text-sm text-zinc-500">
                      {award.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
