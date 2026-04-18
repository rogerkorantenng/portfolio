"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Terminal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "HOME", command: "cd ~" },
  { href: "/skills", label: "SKILL_MODULES", command: "./skills" },
  { href: "/projects", label: "PROJECTS", command: "./projects" },
  { href: "/experience", label: "EXPERIENCE", command: "cat /var/log" },
  { href: "/trophies", label: "TROPHIES", command: "./achievements" },
  { href: "/connect", label: "CONNECT", command: "ssh connect" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "glass border-b border-[#00ffff]/20 shadow-[0_0_20px_rgba(0,255,255,0.1)]"
          : "bg-transparent"
      )}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-3">
          <div className="relative flex h-10 w-10 items-center justify-center border border-[#00ffff] bg-black/50 transition-all group-hover:shadow-[0_0_15px_rgba(0,255,255,0.5)]">
            <Terminal className="h-5 w-5 text-[#00ffff]" />
            <div className="absolute -bottom-1 -right-1 h-2 w-2 bg-[#39ff14] animate-pulse" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-[#00ffff]/60 font-mono">SYSTEM://</span>
            <span className="text-sm font-bold text-[#00ffff] font-mono tracking-wider">
              ROGER.EXE
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "group relative px-3 py-2 text-xs font-mono uppercase tracking-wider transition-all",
                pathname === link.href
                  ? "text-[#00ffff]"
                  : "text-zinc-500 hover:text-[#00ffff]"
              )}
            >
              <span className="relative z-10 flex items-center gap-1">
                <span className="text-[#ff00ff] opacity-0 group-hover:opacity-100 transition-opacity">
                  {">"}
                </span>
                {link.label}
              </span>
              {pathname === link.href && (
                <motion.div
                  layoutId="navbar-indicator"
                  className="absolute inset-x-0 -bottom-px h-[2px] bg-gradient-to-r from-[#00ffff] via-[#ff00ff] to-[#00ffff]"
                  style={{
                    boxShadow: "0 0 10px #00ffff, 0 0 20px #ff00ff",
                  }}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              {pathname === link.href && (
                <div className="absolute inset-0 bg-[#00ffff]/5 border border-[#00ffff]/20" />
              )}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            className="relative p-2 border border-[#00ffff]/30 hover:border-[#00ffff] transition-colors hover:shadow-[0_0_10px_rgba(0,255,255,0.3)]"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="h-5 w-5 text-[#ff00ff]" />
            ) : (
              <Menu className="h-5 w-5 text-[#00ffff]" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-[#00ffff]/20 bg-black/95 backdrop-blur-lg md:hidden"
          >
            <div className="space-y-1 px-4 py-4">
              <div className="text-xs text-[#39ff14] font-mono mb-3 border-b border-[#00ffff]/20 pb-2">
                {">"} SELECT_DESTINATION:
              </div>
              {navLinks.map((link, index) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 text-sm font-mono transition-all",
                    pathname === link.href
                      ? "bg-[#00ffff]/10 text-[#00ffff] border-l-2 border-[#00ffff]"
                      : "text-zinc-400 hover:bg-[#00ffff]/5 hover:text-[#00ffff] border-l-2 border-transparent"
                  )}
                >
                  <span className="text-[#ff00ff] text-xs">[{index}]</span>
                  <span>{link.label}</span>
                  <span className="text-zinc-600 text-xs ml-auto">{link.command}</span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
