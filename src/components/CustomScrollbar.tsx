"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";

export function CustomScrollbar() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ y: 0, scrollTop: 0 });

  const updateProgress = useCallback(() => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight > 0) {
      setScrollProgress(scrollTop / docHeight);
    }
  }, []);

  useEffect(() => {
    updateProgress();
    
    const handleScroll = () => updateProgress();
    const handleResize = () => updateProgress();
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [updateProgress]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
    dragStartRef.current = {
      y: e.clientY,
      scrollTop: window.scrollY,
    };
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      const deltaY = e.clientY - dragStartRef.current.y;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollDelta = (deltaY / scrollHeight) * document.documentElement.scrollHeight;
      window.scrollTo({
        top: dragStartRef.current.scrollTop + scrollDelta,
        behavior: "auto",
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!trackRef.current) return;
    
    const rect = trackRef.current.getBoundingClientRect();
    const relativeY = e.clientY - rect.top;
    const percentage = Math.max(0, Math.min(1, relativeY / rect.height));
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    
    window.scrollTo({
      top: percentage * scrollHeight,
      behavior: "smooth",
    });
  };

  const trackHeight = 256;
  const thumbHeight = 64;
  const maxThumbPosition = trackHeight - thumbHeight;
  const thumbPosition = scrollProgress * maxThumbPosition;

  return (
    <motion.div
      className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden md:flex items-center justify-center"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1 }}
    >
      <div className="relative flex items-center gap-3">
        
        {/* Left line */}
        <div className="w-px h-64">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-500/30 to-violet-500/30" />
        </div>

        {/* Track */}
        <div
          ref={trackRef}
          className="relative w-1.5 h-64 rounded-full bg-white/5"
          onClick={handleTrackClick}
        >
          {/* Progress fill */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-violet-500 via-purple-500 to-pink-500 rounded-full"
            style={{ height: `${scrollProgress * 100}%` }}
          />
          
          {/* Thumb */}
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 w-4 h-16 rounded-full cursor-grab select-none"
            style={{ top: thumbPosition }}
            onMouseDown={handleMouseDown}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={{
              boxShadow: isDragging 
                ? "0 0 30px rgba(139, 92, 246, 0.8)" 
                : "0 0 15px rgba(139, 92, 246, 0.4)",
            }}
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 blur-md" />
            <div className="relative inset-0.5 rounded-full bg-gradient-to-r from-violet-400 via-purple-400 to-pink-400">
              <div className="absolute inset-x-2 top-2 h-2 rounded-full bg-white/30" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white" />
            </div>
            {!isDragging && (
              <motion.div
                className="absolute inset-0 rounded-full border border-white/40"
                animate={{ scale: [1, 1.8], opacity: [0.6, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            )}
          </motion.div>
        </div>

        {/* Right line */}
        <div className="w-px h-64">
          <div className="absolute inset-0 bg-gradient-to-b from-pink-500/30 via-purple-500/30 to-transparent" />
        </div>

        {/* Side dots */}
        <div className="absolute right-8 flex flex-col gap-2">
          {[0.2, 0.4, 0.6, 0.8].map((pos, i) => (
            <motion.div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-white/20"
              animate={{
                opacity: Math.abs(scrollProgress - pos) < 0.15 ? 1 : 0.2,
                scale: Math.abs(scrollProgress - pos) < 0.15 ? 1.3 : 1,
              }}
            />
          ))}
        </div>
        <div className="absolute left-8 flex flex-col gap-2">
          {[0.2, 0.4, 0.6, 0.8].map((pos, i) => (
            <motion.div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-white/20"
              animate={{
                opacity: Math.abs(scrollProgress - pos) < 0.15 ? 1 : 0.2,
                scale: Math.abs(scrollProgress - pos) < 0.15 ? 1.3 : 1,
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function HideDefaultScrollbar() {
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      ::-webkit-scrollbar { width: 0px !important; height: 0px !important; display: none !important; }
      html { scrollbar-width: none; -ms-overflow-style: none; }
      body { scrollbar-width: none; -ms-overflow-style: none; }
    `;
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); };
  }, []);
  return null;
}