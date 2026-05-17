"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";

export function CustomScrollbar() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ thumbY: 0, scrollTop: 0 });

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
      thumbY: e.clientY,
      scrollTop: window.scrollY,
    };
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      const deltaY = e.clientY - dragStartRef.current.thumbY;
      const viewportHeight = window.innerHeight;
      const scrollableHeight = document.documentElement.scrollHeight - viewportHeight;
      const scrollDelta = (deltaY / viewportHeight) * document.documentElement.scrollHeight;
      window.scrollTo({
        top: Math.max(0, Math.min(scrollableHeight, dragStartRef.current.scrollTop + scrollDelta)),
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
    if (!trackRef.current || isDragging) return;

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
  const thumbHeight = 48;
  const maxThumbPosition = trackHeight - thumbHeight;
  const thumbPosition = scrollProgress * maxThumbPosition;

  return (
    <motion.div
      className="fixed right-4 top-1/2 -translate-y-1/2 z-50 hidden md:flex items-center justify-center"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1 }}
    >
      <div
        ref={trackRef}
        className="relative cursor-pointer h-64 w-3 bg-ivory-300/30 rounded-full"
        onClick={handleTrackClick}
      >
        {/* Thumb */}
        <motion.div
          className="absolute w-3 h-12 -left-0.5 rounded-full cursor-grab select-none bg-gradient-to-b from-book-cloth to-kraft"
          style={{ top: thumbPosition }}
          onMouseDown={handleMouseDown}
          whileHover={{ scaleX: 1.2 }}
          whileTap={{ scale: 0.9, cursor: "grabbing" }}
          animate={{ scale: isDragging ? 1.1 : 1 }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-0.5">
            <div className="w-1 h-0.5 rounded-full bg-white/60" />
            <div className="w-1 h-0.5 rounded-full bg-white/60" />
            <div className="w-1 h-0.5 rounded-full bg-white/60" />
          </div>
        </motion.div>
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