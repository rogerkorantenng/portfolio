"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { triggerXP, triggerAchievement } from "./xp-notification";

const PAGE_XP: Record<string, { xp: number; reason: string }> = {
  "/": { xp: 10, reason: "Accessed main terminal" },
  "/skills": { xp: 25, reason: "Viewed skill modules" },
  "/projects": { xp: 25, reason: "Viewed projects" },
  "/experience": { xp: 20, reason: "Viewed experience" },
  "/trophies": { xp: 20, reason: "Viewed trophy cabinet" },
  "/connect": { xp: 30, reason: "Initiated connection" },
};

const ACHIEVEMENTS = {
  first_visit: { name: "FIRST_CONTACT", pages: 1 },
  explorer: { name: "EXPLORER", pages: 3 },
  thorough: { name: "THOROUGH_INVESTIGATOR", pages: 5 },
  completionist: { name: "COMPLETIONIST", pages: 6 },
};

function getVisitedPages(): string[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem("visitedPages");
  return stored ? JSON.parse(stored) : [];
}

function saveVisitedPages(pages: string[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem("visitedPages", JSON.stringify(pages));
}

function getUnlockedAchievements(): string[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem("unlockedAchievements");
  return stored ? JSON.parse(stored) : [];
}

function saveUnlockedAchievements(achievements: string[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem("unlockedAchievements", JSON.stringify(achievements));
}

export function GamificationTracker() {
  const pathname = usePathname();
  const hasTriggered = useRef<Set<string>>(new Set());

  useEffect(() => {
    // Prevent double-triggering in same session
    if (hasTriggered.current.has(pathname)) return;

    const visitedPages = getVisitedPages();
    const unlockedAchievements = getUnlockedAchievements();

    // Check if this is a new page visit
    const isNewVisit = !visitedPages.includes(pathname);

    if (isNewVisit && PAGE_XP[pathname]) {
      // Mark as triggered for this session
      hasTriggered.current.add(pathname);

      // Add small delay for better UX
      setTimeout(() => {
        // Grant XP
        const { xp, reason } = PAGE_XP[pathname];
        triggerXP(xp, reason);

        // Save visited page
        const newVisitedPages = [...visitedPages, pathname];
        saveVisitedPages(newVisitedPages);

        // Check for achievements
        const uniquePages = new Set(newVisitedPages).size;

        Object.entries(ACHIEVEMENTS).forEach(([key, { name, pages }]) => {
          if (uniquePages >= pages && !unlockedAchievements.includes(key)) {
            setTimeout(() => {
              triggerAchievement(name);
              saveUnlockedAchievements([...unlockedAchievements, key]);
            }, 1500); // Delay achievement after XP
          }
        });
      }, 1000); // Initial delay after page load
    }
  }, [pathname]);

  return null;
}
