"use client";

import { useEffect, useRef } from "react";

export function useScrollReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold }
    );

    const children = el.querySelectorAll(".reveal-item");
    children.forEach((child) => observer.observe(child));

    return () => observer.disconnect();
  }, [threshold]);

  return ref;
}

export function useStaggerReveal(items: React.ReactNode[], delay = 100) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const children = el.querySelectorAll(".reveal-item");
            children.forEach((child, i) => {
              setTimeout(() => {
                child.classList.add("visible");
              }, i * delay);
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return ref;
}

export function useMagneticEffect() {
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const cards = document.querySelectorAll(".magnetic-card");
      cards.forEach((card) => {
        const rect = (card as HTMLElement).getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        const depth = 0.1;
        (card as HTMLElement).style.transform = `perspective(1000px) rotateX(${y * depth}deg) rotateY(${x * depth}deg) translate3d(0, 0, 0)`;
      });
    };

    const handleMouseLeave = () => {
      const cards = document.querySelectorAll(".magnetic-card");
      cards.forEach((card) => {
        (card as HTMLElement).style.transform = "perspective(1000px) rotateX(0) rotateY(0)";
      });
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.querySelectorAll(".magnetic-card").forEach((card) => {
      card.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);
}

export function useTypewriter(text: string, speed = 50) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.textContent = "";
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        el.textContent += text[i];
        i++;
      } else {
        clearInterval(timer);
      }
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);

  return ref;
}
