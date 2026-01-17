"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Terminal, Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
      {/* Background Effects */}
      <div className="fixed inset-0 grid-pattern opacity-20 pointer-events-none" />
      <div className="fixed -left-32 top-1/4 h-96 w-96 rounded-full bg-[#ff0000]/10 blur-[120px] pointer-events-none" />
      <div className="fixed -right-32 bottom-1/4 h-96 w-96 rounded-full bg-[#ff00ff]/10 blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative text-center max-w-2xl"
      >
        {/* Glitch 404 */}
        <div className="relative mb-8">
          <motion.h1
            className="text-[120px] sm:text-[180px] font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ff0000] via-[#ff00ff] to-[#00ffff] leading-none"
            animate={{
              textShadow: [
                "0 0 20px rgba(255,0,0,0.5)",
                "0 0 40px rgba(255,0,255,0.5)",
                "0 0 20px rgba(0,255,255,0.5)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            404
          </motion.h1>

          {/* Glitch layers */}
          <div className="absolute inset-0 text-[120px] sm:text-[180px] font-mono font-bold text-[#ff0000]/30 leading-none animate-pulse" style={{ transform: "translate(-2px, 2px)" }}>
            404
          </div>
          <div className="absolute inset-0 text-[120px] sm:text-[180px] font-mono font-bold text-[#00ffff]/30 leading-none animate-pulse" style={{ transform: "translate(2px, -2px)" }}>
            404
          </div>
        </div>

        {/* Terminal Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="border border-[#ff0000]/50 bg-black/80 backdrop-blur-sm mb-8"
        >
          {/* Terminal Header */}
          <div className="flex items-center gap-2 border-b border-[#ff0000]/30 bg-[#ff0000]/10 px-4 py-2">
            <div className="flex gap-2">
              <div className="h-3 w-3 rounded-full bg-[#ff5f56]" />
              <div className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
              <div className="h-3 w-3 rounded-full bg-[#27c93f]" />
            </div>
            <span className="text-xs font-mono text-[#ff0000]/60 ml-2">ERROR://ACCESS_DENIED</span>
          </div>

          {/* Terminal Body */}
          <div className="p-6 font-mono text-left">
            <div className="text-[#ff0000] mb-2">
              <span className="text-zinc-500">[ERROR]</span> ACCESS_DENIED
            </div>
            <div className="text-zinc-400 text-sm mb-4">
              <p>&gt; The requested resource could not be located.</p>
              <p>&gt; Path does not exist in the system.</p>
              <p>&gt; Authorization level: <span className="text-[#ff0000]">INSUFFICIENT</span></p>
            </div>
            <div className="text-[#39ff14] text-sm">
              <p>&gt; Suggested action: Return to main terminal</p>
              <p>&gt; Type &apos;help&apos; for available commands</p>
            </div>
          </div>
        </motion.div>

        {/* ASCII Art */}
        <motion.pre
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-[8px] sm:text-[10px] font-mono text-[#ff0000]/40 mb-8 leading-tight hidden sm:block"
        >
{`
    ╔═══════════════════════════════════════════════════════╗
    ║                                                       ║
    ║   ███████╗██████╗ ██████╗  ██████╗ ██████╗           ║
    ║   ██╔════╝██╔══██╗██╔══██╗██╔═══██╗██╔══██╗          ║
    ║   █████╗  ██████╔╝██████╔╝██║   ██║██████╔╝          ║
    ║   ██╔══╝  ██╔══██╗██╔══██╗██║   ██║██╔══██╗          ║
    ║   ███████╗██║  ██║██║  ██║╚██████╔╝██║  ██║          ║
    ║   ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝          ║
    ║                                                       ║
    ║            PAGE NOT FOUND IN DATABASE                 ║
    ║                                                       ║
    ╚═══════════════════════════════════════════════════════╝
`}
        </motion.pre>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/"
            className="flex items-center justify-center gap-2 px-6 py-3 border border-[#00ffff] text-[#00ffff] font-mono text-sm hover:bg-[#00ffff]/10 hover:shadow-[0_0_20px_rgba(0,255,255,0.3)] transition-all"
          >
            <Home className="h-4 w-4" />
            RETURN_TO_MAIN
          </Link>
          <button
            onClick={() => window.history.back()}
            className="flex items-center justify-center gap-2 px-6 py-3 border border-[#ff00ff] text-[#ff00ff] font-mono text-sm hover:bg-[#ff00ff]/10 hover:shadow-[0_0_20px_rgba(255,0,255,0.3)] transition-all"
          >
            <ArrowLeft className="h-4 w-4" />
            GO_BACK
          </button>
        </motion.div>

        {/* Blinking Terminal Icon */}
        <motion.div
          className="mt-12 flex justify-center"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Terminal className="h-8 w-8 text-[#ff0000]/50" />
        </motion.div>
      </motion.div>
    </div>
  );
}
