"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Trophy, Star } from "lucide-react";

interface XPEvent {
  id: string;
  amount: number;
  reason: string;
  type: "xp" | "achievement" | "level";
}

// Global event system for XP notifications
const xpListeners: Set<(event: XPEvent) => void> = new Set();

export function triggerXP(amount: number, reason: string) {
  const event: XPEvent = {
    id: Math.random().toString(36).substr(2, 9),
    amount,
    reason,
    type: "xp",
  };
  xpListeners.forEach((listener) => listener(event));
}

export function triggerAchievement(name: string) {
  const event: XPEvent = {
    id: Math.random().toString(36).substr(2, 9),
    amount: 0,
    reason: name,
    type: "achievement",
  };
  xpListeners.forEach((listener) => listener(event));
}

export function XPNotification() {
  const [notifications, setNotifications] = useState<XPEvent[]>([]);

  const addNotification = useCallback((event: XPEvent) => {
    setNotifications((prev) => [...prev, event]);

    // Remove after 3 seconds
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== event.id));
    }, 3000);
  }, []);

  useEffect(() => {
    xpListeners.add(addNotification);
    return () => {
      xpListeners.delete(addNotification);
    };
  }, [addNotification]);

  return (
    <div className="fixed top-20 right-4 z-50 space-y-2 pointer-events-none">
      <AnimatePresence>
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: 100, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.8 }}
            className={`
              flex items-center gap-3 px-4 py-3 font-mono text-sm
              border backdrop-blur-sm
              ${notification.type === "achievement"
                ? "bg-[#ffff00]/10 border-[#ffff00]/50 text-[#ffff00]"
                : "bg-[#39ff14]/10 border-[#39ff14]/50 text-[#39ff14]"
              }
            `}
          >
            {notification.type === "achievement" ? (
              <Trophy className="h-5 w-5" />
            ) : notification.type === "level" ? (
              <Star className="h-5 w-5" />
            ) : (
              <Zap className="h-5 w-5" />
            )}
            <div>
              {notification.type === "xp" ? (
                <>
                  <div className="font-bold">+{notification.amount} XP</div>
                  <div className="text-xs opacity-70">{notification.reason}</div>
                </>
              ) : (
                <>
                  <div className="font-bold">ACHIEVEMENT UNLOCKED</div>
                  <div className="text-xs opacity-70">{notification.reason}</div>
                </>
              )}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
