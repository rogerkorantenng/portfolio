"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface TypingTextProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  showCursor?: boolean;
  onComplete?: () => void;
}

export function TypingText({
  text,
  speed = 50,
  delay = 0,
  className,
  showCursor = true,
  onComplete,
}: TypingTextProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const startDelay = setTimeout(() => {
      setIsTyping(true);
      let currentIndex = 0;

      const typeInterval = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayedText(text.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(typeInterval);
          setIsTyping(false);
          setIsComplete(true);
          onComplete?.();
        }
      }, speed);

      return () => clearInterval(typeInterval);
    }, delay);

    return () => clearTimeout(startDelay);
  }, [text, speed, delay, onComplete]);

  return (
    <span className={cn("font-mono", className)}>
      {displayedText}
      {showCursor && (
        <span
          className={cn(
            "inline-block w-2 h-5 ml-1 bg-[#39ff14] align-middle",
            isTyping || !isComplete ? "cursor-blink" : "opacity-0"
          )}
        />
      )}
    </span>
  );
}

interface TypingSequenceProps {
  lines: string[];
  speed?: number;
  lineDelay?: number;
  className?: string;
  lineClassName?: string;
  onComplete?: () => void;
}

export function TypingSequence({
  lines,
  speed = 30,
  lineDelay = 500,
  className,
  lineClassName,
  onComplete,
}: TypingSequenceProps) {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [completedLines, setCompletedLines] = useState<string[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  const handleLineComplete = () => {
    setCompletedLines((prev) => [...prev, lines[currentLineIndex]]);

    if (currentLineIndex < lines.length - 1) {
      setTimeout(() => {
        setCurrentLineIndex((prev) => prev + 1);
      }, lineDelay);
    } else {
      setIsComplete(true);
      onComplete?.();
    }
  };

  return (
    <div className={cn("space-y-1", className)}>
      {completedLines.map((line, index) => (
        <div key={index} className={cn("text-[#39ff14]", lineClassName)}>
          {line}
        </div>
      ))}
      {!isComplete && currentLineIndex < lines.length && (
        <TypingText
          text={lines[currentLineIndex]}
          speed={speed}
          className={cn("text-[#39ff14]", lineClassName)}
          onComplete={handleLineComplete}
          showCursor={true}
        />
      )}
    </div>
  );
}
