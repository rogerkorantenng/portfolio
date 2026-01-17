"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Users, Eye } from "lucide-react";

interface CounterData {
  totalVisits: number;
  uniqueVisitors: number;
}

// Using CountAPI - free and simple
const NAMESPACE = "roger-portfolio";
const KEY = "visits";

export function VisitorCounter() {
  const [data, setData] = useState<CounterData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const trackVisit = async () => {
      try {
        // Check if this is a unique visitor (first visit in this session)
        const hasVisited = sessionStorage.getItem("hasCountedVisit");

        if (!hasVisited) {
          // Increment counter for new visit
          const response = await fetch(
            `https://api.countapi.xyz/hit/${NAMESPACE}/${KEY}`
          );
          const result = await response.json();

          sessionStorage.setItem("hasCountedVisit", "true");

          setData({
            totalVisits: result.value || 0,
            uniqueVisitors: Math.floor((result.value || 0) * 0.7), // Estimate unique visitors
          });
        } else {
          // Just get current count without incrementing
          const response = await fetch(
            `https://api.countapi.xyz/get/${NAMESPACE}/${KEY}`
          );
          const result = await response.json();

          setData({
            totalVisits: result.value || 0,
            uniqueVisitors: Math.floor((result.value || 0) * 0.7),
          });
        }
      } catch (error) {
        console.error("Failed to track visit:", error);
        // Fallback to localStorage count
        const localCount = parseInt(localStorage.getItem("fallbackVisitCount") || "0") + 1;
        localStorage.setItem("fallbackVisitCount", localCount.toString());
        setData({
          totalVisits: localCount,
          uniqueVisitors: Math.floor(localCount * 0.7),
        });
      } finally {
        setIsLoading(false);
      }
    };

    trackVisit();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center gap-4 font-mono text-xs">
        <div className="flex items-center gap-2 text-zinc-600">
          <div className="h-3 w-16 bg-zinc-800 animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-wrap items-center gap-4 font-mono text-xs"
    >
      <div className="flex items-center gap-2 text-[#00ffff]">
        <Eye className="h-3 w-3" />
        <span className="text-zinc-500">TOTAL_VIEWS:</span>
        <motion.span
          key={data?.totalVisits}
          initial={{ scale: 1.2, color: "#39ff14" }}
          animate={{ scale: 1, color: "#00ffff" }}
          className="font-bold"
        >
          {data?.totalVisits?.toLocaleString() || "---"}
        </motion.span>
      </div>

      <div className="flex items-center gap-2 text-[#ff00ff]">
        <Users className="h-3 w-3" />
        <span className="text-zinc-500">OPERATIVES:</span>
        <span className="font-bold">
          {data?.uniqueVisitors?.toLocaleString() || "---"}
        </span>
      </div>
    </motion.div>
  );
}

// Compact version for navbar or small spaces
export function VisitorCounterCompact() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const getCount = async () => {
      try {
        const hasVisited = sessionStorage.getItem("hasCountedVisit");
        const endpoint = hasVisited ? "get" : "hit";

        const response = await fetch(
          `https://api.countapi.xyz/${endpoint}/${NAMESPACE}/${KEY}`
        );
        const result = await response.json();

        if (!hasVisited) {
          sessionStorage.setItem("hasCountedVisit", "true");
        }

        setCount(result.value || 0);
      } catch {
        const localCount = parseInt(localStorage.getItem("fallbackVisitCount") || "0");
        setCount(localCount);
      }
    };

    getCount();
  }, []);

  return (
    <div className="flex items-center gap-1.5 font-mono text-[10px] text-zinc-500">
      <div className="h-1.5 w-1.5 rounded-full bg-[#39ff14] animate-pulse" />
      <span>{count?.toLocaleString() || "..."} views</span>
    </div>
  );
}
