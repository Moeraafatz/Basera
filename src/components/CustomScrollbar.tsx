"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export function CustomScrollbar() {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const [isDragging, setIsDragging] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isDragging) return;
      e.preventDefault();
      const scrollAmount = e.deltaY;
      window.scrollBy({
        top: scrollAmount,
        behavior: "auto",
      });
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [isDragging]);

  useEffect(() => {
    const handleDrag = (e: MouseEvent) => {
      if (!isDragging) return;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const percentage = e.clientY / window.innerHeight;
      window.scrollTo({
        top: percentage * scrollHeight,
        behavior: "auto",
      });
    };

    if (isDragging) {
      window.addEventListener("mousemove", handleDrag);
      window.addEventListener("mouseup", () => setIsDragging(false));
    }

    return () => {
      window.removeEventListener("mousemove", handleDrag);
    };
  }, [isDragging]);

  return (
    <div
      ref={scrollContainerRef}
      className="fixed right-4 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col items-center gap-2"
      style={{ height: "calc(100vh - 200px)" }}
    >
      {/* Top indicator */}
      <div className="w-px h-8 bg-gradient-to-b from-transparent via-violet-500/50 to-violet-500" />
      
      {/* Track */}
      <div className="relative w-1 h-full rounded-full bg-white/5">
        {/* Glowing track lines */}
        <div className="absolute inset-0 bg-gradient-to-b from-violet-500/20 via-purple-500/20 to-pink-500/20 rounded-full" />
        
        {/* Animated particles in track */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 w-0.5 h-full"
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="absolute top-0 w-full h-20 bg-gradient-to-b from-violet-500 to-transparent opacity-50" />
        </motion.div>
        
        {/* Scroll Thumb */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 w-3 h-16 rounded-full cursor-grab active:cursor-grabbing"
          style={{
            top: `calc(${smoothProgress.get()} * (100% - 4rem))`,
          }}
          onMouseDown={() => setIsDragging(true)}
        >
          {/* Glowing orb effect */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 blur-sm" />
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-400 via-purple-400 to-pink-400" />
          
          {/* Inner glow */}
          <div className="absolute inset-2 rounded-full bg-white/80 blur-xs" />
          
          {/* Tech dot */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-white" />
          
          {/* Pulse ring */}
          <motion.div
            className="absolute inset-0 rounded-full border border-white/50"
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </div>
      
      {/* Bottom indicator */}
      <div className="w-px h-8 bg-gradient-to-b from-violet-500/50 via-purple-500/50 to-transparent" />
      
      {/* Side dots */}
      <div className="absolute right-6 top-0 bottom-0 flex flex-col justify-center gap-4">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="w-1 h-1 rounded-full bg-white/30"
            animate={{
              opacity: Math.abs(smoothProgress.get() * 4 - i / 4) < 0.2 ? 1 : 0.3,
              scale: Math.abs(smoothProgress.get() * 4 - i / 4) < 0.2 ? 1.5 : 1,
            }}
          />
        ))}
      </div>
      <div className="absolute left-6 top-0 bottom-0 flex flex-col justify-center gap-4">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="w-1 h-1 rounded-full bg-white/30"
            animate={{
              opacity: Math.abs(smoothProgress.get() * 4 - i / 4) < 0.2 ? 1 : 0.3,
              scale: Math.abs(smoothProgress.get() * 4 - i / 4) < 0.2 ? 1.5 : 1,
            }}
          />
        ))}
      </div>
    </div>
  );
}

// Hide default scrollbar
export function HideDefaultScrollbar() {
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      ::-webkit-scrollbar {
        width: 0px !important;
        height: 0px !important;
        display: none !important;
      }
      html {
        scrollbar-width: none;
        -ms-overflow-style: none;
      }
      body {
        scrollbar-width: none;
        -ms-overflow-style: none;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);
  return null;
}