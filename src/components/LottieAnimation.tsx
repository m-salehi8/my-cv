import React, { useRef, useState, useEffect } from "react";
import { LottieLight, LottieHandle } from "lottie-react";

interface LottieAnimationProps {
  animationData?: unknown;
  src?: string | unknown;
  path?: string;
  className?: string;
  loop?: boolean;
  autoplay?: boolean;
  speed?: number;
  width?: number | string;
  height?: number | string;
  ariaLabel?: string;
}

export default function LottieAnimation({
  animationData,
  src,
  path,
  className = "",
  loop = true,
  autoplay = true,
  speed = 1,
  width,
  height,
  ariaLabel,
}: LottieAnimationProps) {
  const lottieRef = useRef<LottieHandle>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasError, setHasError] = useState(false);

  const animationSource = (src ?? path ?? animationData) as any;

  // 1. IntersectionObserver: Pause when out of viewport to maximize battery & GPU efficiency
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (lottieRef.current) {
          if (entry.isIntersecting) {
            lottieRef.current.play();
          } else {
            lottieRef.current.pause();
          }
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // 2. Playback speed adjustment
  useEffect(() => {
    if (lottieRef.current && speed !== 1) {
      try {
        lottieRef.current.setSpeed(speed);
      } catch {
        // ignore
      }
    }
  }, [speed]);

  // 2. Accessibility: Respect prefers-reduced-motion
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches && lottieRef.current) {
      lottieRef.current.pause();
    }
  }, []);

  if (hasError) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      role="img"
      aria-label={ariaLabel || "Interactive backend vector animation"}
      className={`relative inline-flex items-center justify-center overflow-hidden pointer-events-none select-none ${className}`}
      style={{
        width: width ?? "100%",
        height: height ?? "100%",
      }}
    >
      <LottieLight
        lottieRef={lottieRef}
        src={animationSource}
        loop={loop}
        autoplay={autoplay}
        style={{
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
}
