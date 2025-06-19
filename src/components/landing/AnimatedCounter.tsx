"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

interface AnimatedCounterProps {
  value: string;
  suffix?: string;
  duration?: number;
}

export function AnimatedCounter({
  value,
  suffix = "",
  duration = 2,
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  // Extract numeric part
  const getNumericValue = (val: string) => {
    const numStr = val.replace(/[^\d.]/g, "");
    const num = parseFloat(numStr);

    if (val.includes("K")) return num * 1000;
    if (val.includes("M")) return num * 1000000;
    if (val.includes("%")) return num;
    return num;
  };

  const targetValue = getNumericValue(value);

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationId: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);

      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentCount = Math.floor(targetValue * easeOut);

      setCount(currentCount);

      if (progress < 1) {
        animationId = requestAnimationFrame(animate);
      }
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [isInView, targetValue, duration]);

  const formatValue = (num: number) => {
    if (value.includes("K")) {
      return `${(num / 1000).toFixed(0)}K`;
    }
    if (value.includes("M")) {
      return `${(num / 1000000).toFixed(1)}M`;
    }
    if (value.includes("%")) {
      return `${num}%`;
    }
    if (value.includes("/")) {
      return value;
    }
    return num.toString();
  };

  return (
    <motion.div
      ref={ref}
      className="text-3xl font-bold text-vibe-purple-700"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {formatValue(count)}
      {suffix}
    </motion.div>
  )
}
