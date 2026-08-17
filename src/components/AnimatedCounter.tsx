"use client";

import { useEffect, useRef, useState } from "react";

interface AnimatedCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}

export function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
  duration = 1800,
}: AnimatedCounterProps) {
  const elementRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);
  const [displayValue, setDisplayValue] = useState(0);
  const finalValue = value.toLocaleString("pt-BR");

  useEffect(() => {
    const element = elementRef.current;
    if (!element || hasAnimated.current) return;

    const showFinalValue = () => {
      hasAnimated.current = true;
      setDisplayValue(value);
    };
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      showFinalValue();
      return;
    }

    let frameId = 0;
    const animate = () => {
      hasAnimated.current = true;
      const startTime = performance.now();
      const frame = (now: number) => {
        const progress = Math.min((now - startTime) / duration, 1);
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        setDisplayValue(Math.floor(value * easedProgress));
        if (progress < 1) frameId = requestAnimationFrame(frame);
        else setDisplayValue(value);
      };
      frameId = requestAnimationFrame(frame);
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasAnimated.current) return;
        observer.unobserve(element);
        animate();
      },
      { threshold: 0.25 },
    );
    observer.observe(element);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frameId);
    };
  }, [duration, value]);

  return (
    <span ref={elementRef} className="animated-counter">
      <span aria-hidden="true">
        {prefix}
        {displayValue.toLocaleString("pt-BR")}
        {suffix}
      </span>
      <span className="sr-only">{`${prefix}${finalValue}${suffix}`}</span>
    </span>
  );
}
