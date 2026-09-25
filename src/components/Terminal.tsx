import React, { useState, useEffect, useRef } from "react";
import { TERMINAL_COMMANDS, PROFILE, SKILLS, PROJECTS } from "../data/resume";
import { Terminal as TerminalIcon, CornerDownLeft, Trash2, Sparkles, Send } from "lucide-react";

interface TerminalProps {
  onOpenCvModal?: () => void;
  lang?: "en" | "fa";
}

interface CommandHistoryEntry {
  command: string;
  output: string[];
  isError?: boolean;
}

export default function Terminal({ onOpenCvModal, lang = "en" }: TerminalProps) {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [inputVal, setInputVal] = useState<string>("");
  const [history, setHistory] = useState<CommandHistoryEntry[]>([
    {
      command: "salehi --info",
      output: TERMINAL_COMMANDS[0].output,
    },
  ]);

  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSelectTab = (idx: number) => {
    setActiveTab(idx);
    const cmd = TERMINAL_COMMANDS[idx];
    setHistory((prev) => [
      ...prev,
      {
        command: cmd.command,
        output: cmd.output,
      },
    ]);
  };

  const handleRunCommand = (cmdToRun: string) => {
    const raw = cmdToRun.trim();
    if (!raw) return;

    const lower = raw.toLowerCase();

    let output: string[] = [];
    let isError = false;

    if (lower === "clear" || lower === "cls") {
      setHistory([]);
      setInputVal("");
      return;
    } else if (lower === "help") {
      output = [
        "Available CLI commands:",
        "  info | whoami       Display bio, experience & current availability",
        "  stack | skills      List backend, database & devops competencies",
        "  experience | exp    Show career timeline and enterprise roles",
        "  projects            Display featured engineering architecture builds",
        "  contact             Show email, phone and Telegram handles",
        "  curl /health        Simulate REST API healthcheck response",
        "  cv | resume         Launch CV viewer and PDF download modal",
        "  clear               Reset terminal output buffer",
      ];
    } else if (lower === "info" || lower === "whoami" || lower === "salehi --info") {
      output = TERMINAL_COMMANDS[0].output;
    } else if (lower === "stack" || lower === "skills" || lower === "salehi --stack") {
      output = TERMINAL_COMMANDS[1].output;
    } else if (lower === "experience" || lower === "exp" || lower === "salehi --experience") {
      output = TERMINAL_COMMANDS[2].output;
    } else if (lower === "contact" || lower === "salehi --contact") {
      output = TERMINAL_COMMANDS[3].output;
    } else if (lower === "projects") {
      output = PROJECTS.map(
        (p) => `▸ [${p.index}] ${p.title} (${p.period}) — Stack: ${p.tags.join(", ")}`
      );
    } else if (lower.includes("curl") || lower.includes("health")) {
      output = [
        "HTTP/2 200 OK",
        "content-type: application/json",
        "server: uvicorn (FastAPI)",
        "{",
        '  "status": "healthy",',
        '  "uptime": "99.98%",',
        '  "postgresql": "connected (pg_pool active)",',
        '  "redis_cache": "hit_rate 94.6%",',
        '  "rabbitmq_workers": 8',
        "}",
      ];
    } else if (lower === "cv" || lower === "resume") {
      if (onOpenCvModal) {
        onOpenCvModal();
        output = ["Opening official CV PDF viewer..."];
      } else {
        output = [`Resume PDF available at: ${PROFILE.email}`];
      }
    } else {
      isError = true;
      output = [
        `zsh: command not found: ${raw}`,
        "Type 'help' or click the quick action chips below for valid commands.",
      ];
    }

    setHistory((prev) => [
      ...prev,
      {
        command: raw,
        output,
        isError,
      },
    ]);
    setInputVal("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleRunCommand(inputVal);
    }
  };

  // Auto-scroll terminal output to bottom
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const quickPills = [
    { label: "whoami", cmd: "whoami" },
    { label: "stack", cmd: "stack" },
    { label: "experience", cmd: "experience" },
    { label: "projects", cmd: "projects" },
    { label: "curl /health", cmd: "curl /health" },
    { label: "clear", cmd: "clear" },
  ];

  return (
    <div
      data-testid="hero-terminal"
      className="rounded-2xl border border-white/10 bg-[#0B111D]/95 backdrop-blur-xl shadow-2xl overflow-hidden font-mono text-xs sm:text-sm flex flex-col"
    >
      {/* Top Window Bar */}
      <div className="flex items-center justify-between border-b border-white/5 px-4 py-3 bg-[#090E17]/80">
        <div className="flex items-center gap-2">
          <div className="h-2.5 w-2.5 rounded-full bg-[#EF4444]" />
          <div className="h-2.5 w-2.5 rounded-full bg-[#F59E0B]" />
          <div className="h-2.5 w-2.5 rounded-full bg-[#10B981]" />
        </div>
        <div className="text-slate-400 text-xs tracking-wider flex items-center gap-1.5">
          <TerminalIcon className="w-3.5 h-3.5 text-emerald-400" />
          <span>salehi@backend ~ zsh (interactive)</span>
        </div>
        <button
          onClick={() => setHistory([])}
          title="Clear screen"
          className="text-slate-500 hover:text-slate-300 transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Tabs Row (--info, --stack, --experience, --contact) */}
      <div className="flex items-center gap-2 px-3 sm:px-4 py-2 border-b border-white/5 bg-[#090E17]/40 overflow-x-auto scrollbar-none">
        {TERMINAL_COMMANDS.map((c, i) => (
          <button
            key={c.id}
            onClick={() => handleSelectTab(i)}
            className={`px-2.5 sm:px-3 py-1 rounded-md text-xs tracking-wider transition-colors whitespace-nowrap shrink-0 ${
              activeTab === i
                ? "bg-emerald-950/70 border border-emerald-500/40 text-emerald-400 font-medium"
                : "bg-white/5 border border-white/5 text-slate-400 hover:text-slate-200 hover:bg-white/10"
            }`}
          >
            --{c.id}
          </button>
        ))}
      </div>

      {/* Scrollable Terminal Output Buffer */}
      <div
        onClick={() => inputRef.current?.focus()}
        className="p-4 sm:p-5 h-[280px] sm:h-[320px] overflow-y-auto space-y-4 scrollbar-thin cursor-text"
      >
        <div className="text-[11px] text-slate-500 mb-2">
          Last login: {new Date().toLocaleDateString()} on ttys004 · Type <span className="text-emerald-400 font-semibold">'help'</span> for available commands.
        </div>

        {history.map((entry, idx) => (
          <div key={idx} className="space-y-1.5">
            {/* Command Prompt */}
            <div className="flex items-center gap-2 text-slate-300">
              <span className="text-emerald-400 font-bold select-none">➜</span>
              <span className="text-cyan-400 select-none">~</span>
              <span className="text-slate-100 font-semibold">{entry.command}</span>
            </div>

            {/* Output Lines */}
            <div
              className={`pl-4 font-mono text-xs leading-relaxed ${
                entry.isError ? "text-rose-400" : "text-slate-300"
              }`}
            >
              {entry.output.map((line, lIdx) => {
                const isKey = line.includes('": "') || line.includes("▸");
                const isHighlighted =
                  line.includes("FastAPI") ||
                  line.includes("Python") ||
                  line.includes("open_to_opportunities") ||
                  line.includes("200 OK");

                return (
                  <div
                    key={lIdx}
                    className={
                      isHighlighted
                        ? "text-emerald-300 font-medium"
                        : isKey
                        ? "text-slate-200"
                        : "text-slate-400"
                    }
                  >
                    {line}
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {/* Live Interactive Input Line */}
        <div className="flex items-center gap-2 text-slate-300 pt-1">
          <span className="text-emerald-400 font-bold select-none">➜</span>
          <span className="text-cyan-400 select-none">~</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type 'help' or command here..."
            className="flex-1 bg-transparent border-none outline-none text-slate-100 font-mono text-xs sm:text-sm placeholder:text-slate-600 focus:ring-0"
          />
        </div>

        <div ref={terminalEndRef} />
      </div>

      {/* Mobile Quick Tap Action Bar */}
      <div className="px-3 sm:px-4 py-2 border-t border-white/5 bg-[#090E17]/60 flex items-center justify-between gap-2 overflow-x-auto scrollbar-none">
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="text-[10px] text-slate-500 uppercase font-mono mr-1">Quick:</span>
          {quickPills.map((pill) => (
            <button
              key={pill.cmd}
              onClick={() => handleRunCommand(pill.cmd)}
              className="px-2 py-0.5 rounded text-[11px] font-mono bg-white/5 hover:bg-emerald-500/20 hover:text-emerald-300 text-slate-400 border border-white/5 transition-colors whitespace-nowrap"
            >
              {pill.label}
            </button>
          ))}
        </div>

        <button
          onClick={() => handleRunCommand(inputVal)}
          disabled={!inputVal.trim()}
          className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 disabled:opacity-30 transition-colors"
          title="Send command"
        >
          <CornerDownLeft className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
