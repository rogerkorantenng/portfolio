"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

interface TerminalProps {
  className?: string;
  onCommandExecuted?: (command: string) => void;
}

interface CommandResult {
  output?: string[];
  navigate?: string;
  clear?: boolean;
  special?: string;
}

interface Command {
  description: string;
  action: () => CommandResult;
}

const COMMANDS: Record<string, Command> = {
  help: {
    description: "Show available commands",
    action: () => ({
      output: [
        "╔══════════════════════════════════════════════════╗",
        "║           AVAILABLE SYSTEM COMMANDS              ║",
        "╠══════════════════════════════════════════════════╣",
        "║  help      - Display this help menu              ║",
        "║  skills    - View skill modules                  ║",
        "║  projects  - View projects                        ║",
        "║  stats     - Display operative statistics        ║",
        "║  experience - View professional experience        ║",
        "║  trophies  - Show unlocked achievements          ║",
        "║  connect   - Establish secure connection         ║",
        "║  progress  - Show exploration progress           ║",
        "║  clear     - Clear terminal                      ║",
        "║  whoami    - Display operative info              ║",
        "║  matrix    - ████████████████                    ║",
        "╚══════════════════════════════════════════════════╝",
      ],
    }),
  },
  skills: {
    description: "Navigate to skills",
    action: () => ({ navigate: "/skills", output: ["> Accessing SKILL_MODULES..."] }),
  },
  projects: {
    description: "View projects",
    action: () => ({ navigate: "/projects", output: ["> Loading PROJECTS..."] }),
  },
  stats: {
    description: "Display character stats",
    action: () => ({
      output: [
        "╔═══════════════════════════════════════╗",
        "║      OPERATIVE STATISTICS             ║",
        "╠═══════════════════════════════════════╣",
        "║  NAME:  Roger Koranteng               ║",
        "║  CLASS: Senior Software Engineer        ║",
        "║  LEVEL: 15                            ║",
        "║  XP:    3,450 / 5,000                 ║",
        "╠═══════════════════════════════════════╣",
        "║  Backend    ████████████░░ 85%        ║",
        "║  AI/ML      ██████████░░░░ 75%        ║",
        "║  Cloud      █████████░░░░░ 70%        ║",
        "║  IoT        ████████░░░░░░ 60%        ║",
        "║  Leadership ██████████░░░░ 80%        ║",
        "╚═══════════════════════════════════════╝",
      ],
    }),
  },
  experience: {
    description: "View professional experience",
    action: () => ({ navigate: "/experience", output: ["> Loading EXPERIENCE..."] }),
  },
  trophies: {
    description: "Show achievements",
    action: () => ({ navigate: "/trophies", output: ["> Loading TROPHY_CABINET..."] }),
  },
  connect: {
    description: "Open contact form",
    action: () => ({ navigate: "/connect", output: ["> Establishing SECURE_CONNECTION..."] }),
  },
  clear: {
    description: "Clear terminal",
    action: (): CommandResult => ({ clear: true }),
  },
  whoami: {
    description: "Display operative info",
    action: () => ({
      output: [
        "",
        "  ██████╗  ██████╗  ██████╗ ███████╗██████╗ ",
        "  ██╔══██╗██╔═══██╗██╔════╝ ██╔════╝██╔══██╗",
        "  ██████╔╝██║   ██║██║  ███╗█████╗  ██████╔╝",
        "  ██╔══██╗██║   ██║██║   ██║██╔══╝  ██╔══██╗",
        "  ██║  ██║╚██████╔╝╚██████╔╝███████╗██║  ██║",
        "  ╚═╝  ╚═╝ ╚═════╝  ╚═════╝ ╚══════╝╚═╝  ╚═╝",
        "",
        "  OPERATIVE: Roger Obeng Koranteng",
        "  CLASS:     Senior Software Engineer",
        "  LOCATION:  Accra, Ghana",
        "  STATUS:    ONLINE",
        "",
        "  > Backend Systems Specialist",
        "  > AI/ML Engineer",
        "  > Cloud Architecture Expert",
        "",
      ],
    }),
  },
  matrix: {
    description: "Easter egg",
    action: () => ({
      output: [
        "",
        "  Wake up, Neo...",
        "  The Matrix has you...",
        "  Follow the white rabbit.",
        "",
        "  Knock, knock, Neo.",
        "",
      ],
      special: "matrix",
    }),
  },
  "sudo hire_roger": {
    description: "Easter egg",
    action: () => ({
      output: [
        "",
        "  ╔════════════════════════════════════════════════════╗",
        "  ║                                                    ║",
        "  ║   🎉 HIRING PROTOCOL INITIATED 🎉                 ║",
        "  ║                                                    ║",
        "  ║   Roger.exe is ready to join your team!           ║",
        "  ║                                                    ║",
        "  ║   SKILLS VERIFIED: ✓                              ║",
        "  ║   ENTHUSIASM: MAXIMUM                             ║",
        "  ║   AVAILABILITY: READY                             ║",
        "  ║                                                    ║",
        "  ║   > Run 'connect' to proceed                      ║",
        "  ║                                                    ║",
        "  ╚════════════════════════════════════════════════════╝",
        "",
      ],
    }),
  },
  "cat /etc/passwd": {
    description: "Easter egg",
    action: () => ({
      output: [
        "",
        "  Nice try, hacker! 😄",
        "",
        "  roger:x:1000:1000:Senior Software Engineer:/home/roger:/bin/code",
        "  backend:x:1001:1001:Laravel, Django, Node.js:/home/backend:/bin/api",
        "  aiml:x:1002:1002:TensorFlow, NLP, CV:/home/aiml:/bin/train",
        "  cloud:x:1003:1003:AWS, Azure, GCP:/home/cloud:/bin/deploy",
        "",
        "  > Real credentials? Run 'connect' instead ;)",
        "",
      ],
    }),
  },
  progress: {
    description: "Show exploration progress",
    action: () => {
      // Get progress from localStorage (client-side only)
      let visitedCount = 0;
      let achievements: string[] = [];
      if (typeof window !== "undefined") {
        const visited = localStorage.getItem("visitedPages");
        visitedCount = visited ? JSON.parse(visited).length : 0;
        const unlocked = localStorage.getItem("unlockedAchievements");
        achievements = unlocked ? JSON.parse(unlocked) : [];
      }
      const totalPages = 6;
      const progress = Math.round((visitedCount / totalPages) * 100);
      const filled = Math.floor(progress / 10);
      const empty = 10 - filled;

      return {
        output: [
          "",
          "  ╔═══════════════════════════════════════╗",
          "  ║       EXPLORATION PROGRESS            ║",
          "  ╠═══════════════════════════════════════╣",
          `  ║  AREAS EXPLORED: ${visitedCount}/${totalPages}                  ║`,
          `  ║  [${"█".repeat(filled)}${"░".repeat(empty)}] ${progress}%          ║`,
          "  ╠═══════════════════════════════════════╣",
          "  ║  ACHIEVEMENTS UNLOCKED:               ║",
          ...(achievements.length > 0
            ? achievements.map(a => `  ║  ✓ ${a.toUpperCase().padEnd(32)}║`)
            : ["  ║  (none yet - keep exploring!)        ║"]),
          "  ╚═══════════════════════════════════════╝",
          "",
          "  > Explore all pages to unlock achievements!",
          "",
        ],
      };
    },
  },
  secret: {
    description: "Hidden command",
    action: () => ({
      output: [
        "",
        "  🔓 SECRET COMMAND DISCOVERED!",
        "",
        "  You found a hidden command.",
        "  Here's a hint: Try pressing ↑↑↓↓",
        "  on your keyboard anywhere on the site...",
        "",
      ],
    }),
  },
};

const BOOT_SEQUENCE = [
  "SYSTEM INITIALIZING...",
  "Loading kernel modules... [OK]",
  "Mounting file systems... [OK]",
  "Starting network services... [OK]",
  "Authenticating user... [OK]",
  "",
  "╔══════════════════════════════════════════════════════════╗",
  "║                                                          ║",
  "║   ██████╗  ██████╗  ██████╗ ███████╗██████╗ ███████╗██╗  ║",
  "║   ██╔══██╗██╔═══██╗██╔════╝ ██╔════╝██╔══██╗██╔════╝╚██╗ ║",
  "║   ██████╔╝██║   ██║██║  ███╗█████╗  ██████╔╝███████╗ ██║ ║",
  "║   ██╔══██╗██║   ██║██║   ██║██╔══╝  ██╔══██╗╚════██║ ██║ ║",
  "║   ██║  ██║╚██████╔╝╚██████╔╝███████╗██║  ██║███████║██╔╝ ║",
  "║   ╚═╝  ╚═╝ ╚═════╝  ╚═════╝ ╚══════╝╚═╝  ╚═╝╚══════╝╚═╝  ║",
  "║                                                          ║",
  "║          LEAD SOFTWARE ENGINEER TERMINAL v2.0            ║",
  "║                                                          ║",
  "╚══════════════════════════════════════════════════════════╝",
  "",
  "Welcome, visitor. Type 'help' for available commands.",
  "",
];

export function Terminal({ className, onCommandExecuted }: TerminalProps) {
  const [history, setHistory] = useState<Array<{ type: "input" | "output"; content: string }>>([]);
  const [currentInput, setCurrentInput] = useState("");
  const [isBooting, setIsBooting] = useState(true);
  const [bootIndex, setBootIndex] = useState(0);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Boot sequence
  useEffect(() => {
    if (isBooting && bootIndex < BOOT_SEQUENCE.length) {
      const timer = setTimeout(() => {
        setHistory((prev) => [...prev, { type: "output", content: BOOT_SEQUENCE[bootIndex] }]);
        setBootIndex((prev) => prev + 1);
      }, bootIndex < 5 ? 100 : 30);
      return () => clearTimeout(timer);
    } else if (bootIndex >= BOOT_SEQUENCE.length) {
      setIsBooting(false);
    }
  }, [isBooting, bootIndex]);

  // Auto-scroll
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  // Focus input on click
  const handleTerminalClick = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  const executeCommand = useCallback((cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();

    // Add input to history
    setHistory((prev) => [...prev, { type: "input", content: `> ${cmd}` }]);

    if (trimmedCmd === "") return;

    // Add to command history
    setCommandHistory((prev) => [...prev, trimmedCmd]);
    setHistoryIndex(-1);

    // Find and execute command
    const command = COMMANDS[trimmedCmd as keyof typeof COMMANDS];

    if (command) {
      const result = command.action();

      if (result.clear) {
        setHistory([]);
        return;
      }

      if (result.output) {
        result.output.forEach((line, index) => {
          setTimeout(() => {
            setHistory((prev) => [...prev, { type: "output", content: line }]);
          }, index * 20);
        });
      }

      if (result.navigate) {
        setTimeout(() => {
          router.push(result.navigate!);
        }, 500);
      }

      onCommandExecuted?.(trimmedCmd);
    } else {
      setHistory((prev) => [
        ...prev,
        { type: "output", content: `Command not found: ${cmd}` },
        { type: "output", content: "Type 'help' for available commands." },
      ]);
    }
  }, [router, onCommandExecuted]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      executeCommand(currentInput);
      setCurrentInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1
          ? commandHistory.length - 1
          : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setCurrentInput("");
        } else {
          setHistoryIndex(newIndex);
          setCurrentInput(commandHistory[newIndex]);
        }
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      // Simple tab completion
      const matches = Object.keys(COMMANDS).filter((cmd) =>
        cmd.startsWith(currentInput.toLowerCase())
      );
      if (matches.length === 1) {
        setCurrentInput(matches[0]);
      }
    }
  }, [currentInput, commandHistory, historyIndex, executeCommand]);

  // Quick commands for mobile
  const quickCommands = [
    { cmd: "help", label: "HELP", color: "#00ffff" },
    { cmd: "skills", label: "SKILLS", color: "#39ff14" },
    { cmd: "projects", label: "PROJECTS", color: "#ff00ff" },
    { cmd: "stats", label: "STATS", color: "#ffff00" },
    { cmd: "connect", label: "CONNECT", color: "#00ffff" },
    { cmd: "whoami", label: "WHOAMI", color: "#ff00ff" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`font-mono ${className}`}
    >
      <div className="border border-[#00ffff]/30 bg-black/90 backdrop-blur-sm shadow-[0_0_30px_rgba(0,255,255,0.1)]">
        {/* Terminal Header */}
        <div className="flex items-center justify-between border-b border-[#00ffff]/30 bg-gradient-to-r from-[#00ffff]/10 to-[#ff00ff]/10 px-4 py-2">
          <div className="flex items-center gap-3">
            <div className="flex gap-2">
              <div className="h-3 w-3 rounded-full bg-[#ff5f56]" />
              <div className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
              <div className="h-3 w-3 rounded-full bg-[#27c93f]" />
            </div>
            <span className="text-xs text-[#00ffff]/60">ROGER@SYSTEM:~</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-[#39ff14] animate-pulse" />
            <span className="text-xs text-[#39ff14]">CONNECTED</span>
          </div>
        </div>

        {/* Terminal Body */}
        <div
          ref={terminalRef}
          onClick={handleTerminalClick}
          className="h-64 sm:h-80 overflow-y-auto overflow-x-auto p-3 sm:p-4 cursor-text"
        >
          <AnimatePresence>
            {history.map((entry, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className={`whitespace-pre-wrap text-xs sm:text-sm ${
                  entry.type === "input"
                    ? "text-[#00ffff]"
                    : "text-[#39ff14]"
                }`}
              >
                {entry.content}
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Input Line */}
          {!isBooting && (
            <div className="flex items-center mt-1">
              <span className="text-[#ff00ff] mr-2">{">"}</span>
              <input
                ref={inputRef}
                type="text"
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent text-[#00ffff] outline-none caret-[#39ff14] text-sm"
                autoFocus
                spellCheck={false}
                autoComplete="off"
              />
              <span className="w-2 h-5 bg-[#39ff14] animate-pulse ml-1" />
            </div>
          )}
        </div>

        {/* Mobile Quick Commands */}
        {!isBooting && (
          <div className="border-t border-[#00ffff]/20 p-2 sm:hidden">
            <div className="text-[10px] text-zinc-500 mb-2 px-1">QUICK_COMMANDS:</div>
            <div className="grid grid-cols-3 gap-1.5">
              {quickCommands.map(({ cmd, label, color }) => (
                <button
                  key={cmd}
                  onClick={() => {
                    executeCommand(cmd);
                    setCurrentInput("");
                  }}
                  className="px-2 py-1.5 text-[10px] font-mono border transition-all active:scale-95"
                  style={{
                    borderColor: `${color}40`,
                    color: color,
                    backgroundColor: `${color}10`,
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
