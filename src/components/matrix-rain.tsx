"use client";

import { useEffect, useRef, useCallback } from "react";

interface MatrixRainProps {
  opacity?: number;
  speed?: number;
  density?: number;
  color?: string;
}

export function MatrixRain({
  opacity = 0.05,
  speed = 1,
  density = 0.98,
  color = "#00ff00",
}: MatrixRainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const dropsRef = useRef<number[]>([]);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Semi-transparent black to create trail effect
    ctx.fillStyle = `rgba(0, 0, 0, 0.05)`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Matrix characters
    const chars = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);

    // Initialize drops if needed
    if (dropsRef.current.length !== columns) {
      dropsRef.current = Array(columns).fill(1).map(() => Math.random() * -100);
    }

    ctx.fillStyle = color;
    ctx.font = `${fontSize}px monospace`;

    for (let i = 0; i < dropsRef.current.length; i++) {
      const char = chars[Math.floor(Math.random() * chars.length)];
      const x = i * fontSize;
      const y = dropsRef.current[i] * fontSize;

      // Vary the brightness
      const brightness = Math.random();
      if (brightness > 0.98) {
        ctx.fillStyle = "#ffffff"; // Occasional bright white
      } else if (brightness > 0.9) {
        ctx.fillStyle = "#88ff88"; // Light green
      } else {
        ctx.fillStyle = color;
      }

      ctx.fillText(char, x, y);

      // Reset drop to top with random delay
      if (y > canvas.height && Math.random() > density) {
        dropsRef.current[i] = 0;
      }

      dropsRef.current[i] += speed;
    }

    animationRef.current = requestAnimationFrame(draw);
  }, [color, density, speed]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      dropsRef.current = []; // Reset drops on resize
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // Start animation
    animationRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [draw]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity }}
    />
  );
}
