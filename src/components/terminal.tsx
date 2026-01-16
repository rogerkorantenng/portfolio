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
        "║  missions  - Access mission logs (projects)      ║",
        "║  stats     - Display operative statistics        ║",
        "║  access    - View system access logs             ║",
        "║  trophies  - Show unlocked achievements          ║",
        "║  connect   - Establish secure connection         ║",
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
  missions: {
    description: "Navigate to projects",
    action: () => ({ navigate: "/missions", output: ["> Loading MISSION_LOGS..."] }),
  },
  stats: {
    description: "Display character stats",
    action: () => ({
      output: [
        "╔═══════════════════════════════════════╗",
        "║      OPERATIVE STATISTICS             ║",
        "╠═══════════════════════════════════════╣",
        "║  NAME:  Roger Koranteng               ║",
        "║  CLASS: Lead Software Engineer        ║",
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
  access: {
    description: "View access logs (experience)",
    action: () => ({ navigate: "/access-log", output: ["> Retrieving ACCESS_LOG..."] }),
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
        "  CLASS:     Lead Software Engineer",
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
        "  roger:x:1000:1000:Lead Software Engineer:/home/roger:/bin/code",
        "  backend:x:1001:1001:Laravel, Django, Node.js:/home/backend:/bin/api",
        "  aiml:x:1002:1002:TensorFlow, NLP, CV:/home/aiml:/bin/train",
        "  cloud:x:1003:1003:AWS, Azure, GCP:/home/cloud:/bin/deploy",
        "",
        "  > Real credentials? Run 'connect' instead ;)",
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
          className="h-80 overflow-y-auto p-4 cursor-text"
        >
          <AnimatePresence>
            {history.map((entry, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className={`whitespace-pre-wrap ${
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
                className="flex-1 bg-transparent text-[#00ffff] outline-none caret-[#39ff14]"
                autoFocus
                spellCheck={false}
                autoComplete="off"
              />
              <span className="w-2 h-5 bg-[#39ff14] animate-pulse ml-1" />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
