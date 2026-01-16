import type { Metadata } from "next";
import { ExternalLink, BookOpen, Globe } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { profile } from "@/data/profile";
import { publications } from "@/data/publications";

export const metadata: Metadata = {
  title: "Blog & Publications",
  description: `Technical writings and publications by ${profile.name}.`,
};

const typeIcons = {
  book: BookOpen,
  blog: Globe,
  article: BookOpen,
};

export default function BlogPage() {
  return (
    <div className="py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Publications & Writing"
          subtitle="Technical content, books, and blog posts I've authored"
        />

        <div className="grid gap-8 md:grid-cols-2">
          {publications.map((pub) => {
            const Icon = typeIcons[pub.type];
            return (
              <Card key={pub.id} className="flex flex-col">
                <CardHeader>
                  <div className="mb-2 flex items-center gap-2">
                    <Badge variant="secondary" className="capitalize">
                      {pub.type}
                    </Badge>
                    <span className="text-sm text-zinc-400">
                      {pub.publisher}
                    </span>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-zinc-800">
                      <Icon className="h-6 w-6 text-zinc-400" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{pub.title}</CardTitle>
                      <CardDescription className="mt-2">
                        {pub.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-1">
                  <h4 className="mb-3 text-sm font-semibold text-white">
                    Highlights
                  </h4>
                  <ul className="space-y-2 text-sm text-zinc-400">
                    {pub.highlights.map((highlight, index) => (
                      <li key={index} className="flex gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-400" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                  {pub.link && (
                    <div className="mt-6">
                      <Button variant="outline" size="sm" asChild>
                        <a
                          href={pub.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="h-4 w-4" />
                          Visit
                        </a>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="mt-16 rounded-xl bg-zinc-900 p-8 text-center">
          <h2 className="text-2xl font-bold text-white">
            Stay Updated
          </h2>
          <p className="mt-2 text-zinc-400">
            Visit my blog for the latest articles on machine learning, climate tech, and software engineering.
          </p>
          <Button className="mt-6" asChild>
            <a
              href={profile.links.blog}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Globe className="h-4 w-4" />
              Visit Blog
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
