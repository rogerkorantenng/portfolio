import type { Metadata } from "next";
import { SectionHeading } from "@/components/section-heading";
import { Timeline } from "@/components/timeline";
import { CTAButtons } from "@/components/cta-buttons";
import { profile } from "@/data/profile";
import { experiences } from "@/data/experience";

export const metadata: Metadata = {
  title: "Experience",
  description: `Professional experience of ${profile.name} as a ${profile.title}.`,
};

export default function ExperiencePage() {
  return (
    <div className="py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Work Experience"
          subtitle="My professional journey and the impact I've made"
        />

        <Timeline experiences={experiences} />

        <div className="mt-16 text-center">
          <p className="mb-6 text-zinc-400">
            Interested in working together? Let&apos;s connect!
          </p>
          <CTAButtons className="justify-center" />
        </div>
      </div>
    </div>
  );
}
