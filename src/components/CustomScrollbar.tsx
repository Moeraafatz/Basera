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
        className="relative cursor-pointer"
        onClick={handleTrackClick}
      >
        {/* Thumb - floating, fully transparent with subtle border */}
        <motion.div
          className="absolute w-2 h-12 rounded-full cursor-grab select-none"
          style={{ 
            top: thumbPosition,
            backgroundColor: 'transparent',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.2), inset 0 0 4px rgba(255, 255, 255, 0.1)',
          }}
          onMouseDown={handleMouseDown}
          whileHover={{ 
            scale: 1.1,
            border: '1px solid rgba(255, 255, 255, 0.5)',
            boxShadow: '0 0 15px rgba(255, 255, 255, 0.2)',
          }}
          whileTap={{ 
            scale: 0.95,
            cursor: 'grabbing',
          }}
          animate={{
            boxShadow: isDragging 
              ? "0 0 20px rgba(255, 255, 255, 0.3)" 
              : "0 0 10px rgba(0, 0, 0, 0.2), inset 0 0 4px rgba(255, 255, 255, 0.1)",
          }}
        >
          {/* Subtle grip lines */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-1">
            <div className="w-1 h-0.5 rounded-full bg-white/40" />
            <div className="w-1 h-0.5 rounded-full bg-white/40" />
            <div className="w-1 h-0.5 rounded-full bg-white/40" />
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