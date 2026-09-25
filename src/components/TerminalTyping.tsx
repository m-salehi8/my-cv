import React, { useState, useEffect } from "react";

interface TerminalTypingProps {
  phrases?: string[];
  prefix?: string;
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseTime?: number;
  className?: string;
}

const DEFAULT_PHRASES = [
  "PYTHON · FASTAPI · MICROSERVICES · AI PIPELINES",
  "HIGH-THROUGHPUT ASYNC DATA HARVESTING",
  "LLM ORCHESTRATION & AGENTIC WORKFLOWS",
  "ENTERPRISE ERP & DISTRIBUTED SYSTEMS",
];

export default function TerminalTyping({
  phrases = DEFAULT_PHRASES,
  prefix = "role@backend:~$",
  typingSpeed = 50,
  deletingSpeed = 25,
  pauseTime = 1800,
  className = "",
}: TerminalTypingProps) {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fullPhrase = phrases[phraseIndex % phrases.length];

    if (!isDeleting && currentText === fullPhrase) {
      const timeout = setTimeout(() => setIsDeleting(true), pauseTime);
      return () => clearTimeout(timeout);
    }

    if (isDeleting && currentText === "") {
      setIsDeleting(false);
      setPhraseIndex((prev) => (prev + 1) % phrases.length);
      return;
    }

    const speed = isDeleting ? deletingSpeed : typingSpeed;
    const timeout = setTimeout(() => {
      setCurrentText((prev) =>
        isDeleting
          ? fullPhrase.substring(0, prev.length - 1)
          : fullPhrase.substring(0, prev.length + 1)
      );
    }, speed);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, phraseIndex, phrases, pauseTime, typingSpeed, deletingSpeed]);

  return (
    <div
      data-testid="hero-terminal-typing"
      className={`inline-flex items-center gap-2 font-mono text-xs sm:text-sm tracking-wider ${className}`}
    >
      <span className="text-emerald-400 font-bold select-none">{prefix}</span>
      <span className="text-slate-200 font-semibold">{currentText}</span>
      <span
        aria-hidden="true"
        className="inline-block w-2 sm:w-2.5 h-4 bg-emerald-400 animate-pulse ml-0.5"
      />
    </div>
  );
}
