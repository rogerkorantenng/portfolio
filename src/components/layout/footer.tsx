import Link from "next/link";
import { Github, Linkedin, Mail, Globe, Heart } from "lucide-react";
import { profile } from "@/data/profile";

const socialLinks = [
  {
    href: profile.links.github,
    icon: Github,
    label: "GitHub",
  },
  {
    href: profile.links.linkedin,
    icon: Linkedin,
    label: "LinkedIn",
  },
  {
    href: profile.links.blog,
    icon: Globe,
    label: "Blog",
  },
  {
    href: `mailto:${profile.email}`,
    icon: Mail,
    label: "Email",
  },
];

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/experience", label: "Experience" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-zinc-800 bg-zinc-900">
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="group inline-flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-violet-600 font-bold text-white shadow-lg shadow-blue-500/25 transition-transform group-hover:scale-105">
                {profile.name.charAt(0)}
              </div>
              <span className="text-xl font-bold text-white">
                {profile.name.split(" ")[0]}
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-zinc-300">
              {profile.title} based in {profile.location}. Building scalable
              solutions and AI-powered applications.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-800 text-zinc-400 shadow-sm transition-all hover:-translate-y-0.5 hover:bg-zinc-700 hover:text-white hover:shadow-md"
                  aria-label={link.label}
                >
                  <link.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-zinc-400 transition-colors hover:text-blue-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Get In Touch
            </h3>
            <ul className="space-y-3 text-zinc-400">
              <li>
                <a
                  href={`mailto:${profile.email}`}
                  className="transition-colors hover:text-blue-400"
                >
                  {profile.email}
                </a>
              </li>
              <li>{profile.phone}</li>
              <li>{profile.location}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-zinc-800 pt-8 sm:flex-row">
          <p className="text-sm text-zinc-400">
            &copy; {currentYear} {profile.name}. All rights reserved.
          </p>
          <p className="flex items-center gap-1 text-sm text-zinc-400">
            Built with <Heart className="h-4 w-4 text-red-500" /> using Next.js
          </p>
        </div>
      </div>
    </footer>
  );
}
