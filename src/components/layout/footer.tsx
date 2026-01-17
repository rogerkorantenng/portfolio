"use client";

import Link from "next/link";
import { Github, Linkedin, Mail, Globe, Terminal } from "lucide-react";
import { profile } from "@/data/profile";
import { VisitorCounter } from "@/components/visitor-counter";

const socialLinks = [
  {
    href: profile.links.github,
    icon: Github,
    label: "GitHub",
    command: "git remote",
  },
  {
    href: profile.links.linkedin,
    icon: Linkedin,
    label: "LinkedIn",
    command: "net connect",
  },
  {
    href: profile.links.blog,
    icon: Globe,
    label: "Blog",
    command: "curl blog",
  },
  {
    href: `mailto:${profile.email}`,
    icon: Mail,
    label: "Email",
    command: "mail -s",
  },
];

const footerLinks = [
  { href: "/", label: "HOME" },
  { href: "/skills", label: "SKILL_MODULES" },
  { href: "/missions", label: "MISSIONS" },
  { href: "/access-log", label: "ACCESS_LOG" },
  { href: "/trophies", label: "TROPHIES" },
  { href: "/connect", label: "CONNECT" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-[#00ffff]/20 bg-black">
      {/* Cyber grid pattern */}
      <div className="absolute inset-0 grid-pattern opacity-30" />

      {/* Top glow line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00ffff] to-transparent opacity-50" />

      <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand / System Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="group inline-flex items-center gap-3">
              <div className="relative flex h-12 w-12 items-center justify-center border border-[#00ffff] bg-black/50 transition-all group-hover:shadow-[0_0_20px_rgba(0,255,255,0.5)]">
                <Terminal className="h-6 w-6 text-[#00ffff]" />
                <div className="absolute -bottom-1 -right-1 h-2 w-2 bg-[#39ff14] animate-pulse" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-[#00ffff]/60 font-mono">OPERATIVE://</span>
                <span className="text-lg font-bold text-[#00ffff] font-mono tracking-wider">
                  ROGER.EXE
                </span>
              </div>
            </Link>

            <div className="mt-4 font-mono text-sm">
              <p className="text-zinc-500">
                <span className="text-[#ff00ff]">CLASS:</span>{" "}
                <span className="text-[#00ffff]">{profile.title}</span>
              </p>
              <p className="text-zinc-500 mt-1">
                <span className="text-[#ff00ff]">LOCATION:</span>{" "}
                <span className="text-zinc-400">{profile.location}</span>
              </p>
              <p className="text-zinc-500 mt-1">
                <span className="text-[#ff00ff]">STATUS:</span>{" "}
                <span className="text-[#39ff14] animate-pulse">ONLINE</span>
              </p>
            </div>

            {/* Social Links */}
            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex h-10 w-10 items-center justify-center border border-[#00ffff]/30 bg-black/50 text-zinc-500 transition-all hover:border-[#00ffff] hover:text-[#00ffff] hover:shadow-[0_0_15px_rgba(0,255,255,0.3)]"
                  aria-label={link.label}
                  title={link.command}
                >
                  <link.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-xs font-mono uppercase tracking-wider text-[#ff00ff]">
              {">"} SYSTEM_NAV
            </h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2 text-sm font-mono text-zinc-500 transition-colors hover:text-[#00ffff]"
                  >
                    <span className="text-[#00ffff]/30 group-hover:text-[#00ffff]">
                      $
                    </span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact / Connection */}
          <div>
            <h3 className="mb-4 text-xs font-mono uppercase tracking-wider text-[#ff00ff]">
              {">"} ESTABLISH_CONNECTION
            </h3>
            <ul className="space-y-2 font-mono text-sm">
              <li>
                <a
                  href={`mailto:${profile.email}`}
                  className="text-zinc-500 transition-colors hover:text-[#00ffff] break-all"
                >
                  {profile.email}
                </a>
              </li>
              <li className="text-zinc-600">{profile.phone}</li>
              <li className="text-zinc-600">{profile.location}</li>
            </ul>

            {/* ASCII Art decoration */}
            <div className="mt-6 text-[10px] text-[#00ffff]/30 font-mono leading-tight hidden lg:block">
              <pre>{`
╔═══════════════╗
║ SECURE LINK  ║
║   ACTIVE     ║
╚═══════════════╝
              `.trim()}</pre>
            </div>
          </div>
        </div>

        {/* Visitor Counter */}
        <div className="mt-8 flex justify-center border-t border-[#00ffff]/10 pt-6">
          <div className="border border-[#00ffff]/20 bg-black/50 px-6 py-3">
            <VisitorCounter />
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-6 flex flex-col items-center justify-between gap-4 border-t border-[#00ffff]/10 pt-6 sm:flex-row">
          <p className="text-xs font-mono text-zinc-600">
            <span className="text-[#00ffff]/50">[{currentYear}]</span>{" "}
            {profile.name} <span className="text-[#ff00ff]">//</span> ALL_RIGHTS_RESERVED
          </p>
          <p className="flex items-center gap-2 text-xs font-mono text-zinc-600">
            <span className="text-[#39ff14]">{">"}</span>
            BUILT_WITH
            <span className="text-[#00ffff]">NEXT.JS</span>
            <span className="text-[#ff00ff]">+</span>
            <span className="text-[#00ffff]">TYPESCRIPT</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
