import type { Metadata } from "next";
import { MapPin, Mail, Phone, Github, Linkedin, Globe } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { ContactForm } from "@/components/contact-form";
import { Card, CardContent } from "@/components/ui/card";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${profile.name}. Let's discuss your project or opportunity.`,
};

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
  },
  {
    icon: Phone,
    label: "Phone",
    value: profile.phone,
    href: `tel:${profile.phone}`,
  },
  {
    icon: MapPin,
    label: "Location",
    value: profile.location,
  },
];

const socialLinks = [
  {
    icon: Github,
    label: "GitHub",
    href: profile.links.github,
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: profile.links.linkedin,
  },
  {
    icon: Globe,
    label: "Blog",
    href: profile.links.blog,
  },
];

export default function ContactPage() {
  return (
    <div className="py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Get In Touch"
          subtitle="Have a project in mind? Let's discuss how we can work together."
        />

        <div className="grid gap-12 lg:grid-cols-5">
          {/* Contact Form */}
          <div className="lg:col-span-3">
            <Card>
              <CardContent className="p-6 sm:p-8">
                <h2 className="mb-6 text-xl font-semibold text-white">
                  Send a Message
                </h2>
                <ContactForm />
              </CardContent>
            </Card>
          </div>

          {/* Contact Info */}
          <div className="space-y-6 lg:col-span-2">
            <Card>
              <CardContent className="p-6">
                <h2 className="mb-4 text-lg font-semibold text-white">
                  Contact Information
                </h2>
                <div className="space-y-4">
                  {contactInfo.map((item) => (
                    <div key={item.label} className="flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-800">
                        <item.icon className="h-5 w-5 text-zinc-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-zinc-400">
                          {item.label}
                        </p>
                        {item.href ? (
                          <a
                            href={item.href}
                            className="text-white hover:underline"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-white">
                            {item.value}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="mb-4 text-lg font-semibold text-white">
                  Connect With Me
                </h2>
                <div className="flex gap-3">
                  {socialLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-12 w-12 items-center justify-center rounded-lg bg-zinc-800 text-zinc-400 transition-colors hover:bg-zinc-700 hover:text-white"
                      aria-label={link.label}
                    >
                      <link.icon className="h-5 w-5" />
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="mb-2 text-lg font-semibold text-white">
                  Availability
                </h2>
                <p className="text-sm text-zinc-400">
                  I&apos;m currently open to new opportunities and exciting projects.
                  Feel free to reach out if you&apos;d like to collaborate!
                </p>
                <div className="mt-4 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-green-500" />
                  <span className="text-sm font-medium text-green-400">
                    Available for hire
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
