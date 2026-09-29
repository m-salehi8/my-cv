import { RefObject, useEffect } from "react";

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

/** Writes page scroll progress (0..1) to `--scroll` on <html>. Call once. */
export function useRootScrollProgress() {
  useEffect(() => {
    const root = document.documentElement;
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = root.scrollHeight - window.innerHeight;
      root.style.setProperty("--scroll", max > 0 ? String(clamp01(window.scrollY / max)) : "0");
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
}

/**
 * Writes an element's scroll progress (0..1) to `--p` on that element without re-rendering.
 * Progress is 0 when the element's top is at `start` (fraction of viewport height)
 * and 1 when its bottom is at `end`.
 */
export function useElementProgress(ref: RefObject<HTMLElement | null>, start: number, end: number) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      const rect = el.getBoundingClientRect();
      const a = vh * start;
      const b = vh * end - rect.height;
      el.style.setProperty("--p", String(clamp01((a - rect.top) / (a - b))));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [ref, start, end]);
}
