import React, { useEffect, useState } from "react";

const fmt = () =>
  new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "Europe/Istanbul" }).format(new Date());

/** Local time in Istanbul. Rendered after mount so the prerendered HTML stays time-independent. */
export default function IstanbulClock({ lang }: { lang: "en" | "fa" }) {
  const [time, setTime] = useState("");

  useEffect(() => {
    setTime(fmt());
    const id = setInterval(() => setTime(fmt()), 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="font-mono text-[11px] text-slate-400 tabular-nums" dir="ltr" title="Europe/Istanbul">
      {lang === "fa" ? "استانبول" : "Istanbul"} {time || "--:--"}
    </span>
  );
}
