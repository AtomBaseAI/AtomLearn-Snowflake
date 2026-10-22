"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { GlassPanel } from "./glass-panel";
import { AutoLog, type AutoLogLine } from "./auto-log";
import { Maximize, Minimize } from "lucide-react";

/* ------------------------------------------------------------------ */
/* UseCaseTabs — module tablist                                        */
/* ------------------------------------------------------------------ */

export interface UcTabDef {
  id: string;
  label: string;
  num: string;
  icon: LucideIcon;
}

export function UseCaseTabs({
  tabs,
  active,
  onChange,
  label,
}: {
  tabs: readonly UcTabDef[];
  active: string;
  onChange: (id: string) => void;
  label: string;
}) {
  return (
    <div role="tablist" aria-label={label} className="flex flex-wrap gap-1.5">
      {tabs.map((t) => {
        const isActive = active === t.id;
        const Icon = t.icon;
        return (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(t.id)}
            className={`flex items-center gap-2 px-3 py-2 text-[8px] font-bold uppercase tracking-[0.18em] border backdrop-blur-md transition-colors ${
              isActive
                ? "border-snow/70 bg-snow/15 text-snow shadow-[0_0_16px_rgba(41,181,232,0.28)]"
                : "border-foreground/15 bg-black/50 text-muted-foreground hover:border-snow/40 hover:text-snow"
            }`}
          >
            <Icon className="w-3 h-3" aria-hidden="true" />
            <span className={`tabular-nums ${isActive ? "text-snow/70" : "text-muted-foreground/50"}`}>{t.num}</span>
            {t.label}
          </button>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* useScenarioRunner — looping step machine for scenario animations    */
/* ------------------------------------------------------------------ */

export function useScenarioRunner(
  steps: number,
  running: boolean,
  ms: number,
  onStep: (step: number) => void
) {
  const [step, setStep] = useState(0);
  const cbRef = useRef(onStep);
  useEffect(() => {
    cbRef.current = onStep;
  });
  const seqRef = useRef(0);
  useEffect(() => {
    if (!running) return;
    const t = setInterval(() => {
      const s = seqRef.current % steps;
      seqRef.current += 1;
      setStep(s);
      cbRef.current(s);
    }, ms);
    return () => clearInterval(t);
  }, [running, steps, ms]);
  const reset = useCallback(() => {
    seqRef.current = 0;
    setStep(0);
  }, []);
  return { step, reset };
}

/* ------------------------------------------------------------------ */
/* useTicker — safe interval helper for counters/effects               */
/* ------------------------------------------------------------------ */

export function useTicker(active: boolean, fn: () => void, ms = 900) {
  const fnRef = useRef(fn);
  useEffect(() => {
    fnRef.current = fn;
  });
  useEffect(() => {
    if (!active) return;
    const t = setInterval(() => fnRef.current(), ms);
    return () => clearInterval(t);
  }, [active, ms]);
}

/* ------------------------------------------------------------------ */
/* FullscreenToggle — immersive mode button                            */
/* ------------------------------------------------------------------ */

export function FullscreenToggle({ active, onToggle }: { active: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={active}
      aria-label={active ? "Exit immersive view" : "Enter immersive view"}
      className={`flex items-center gap-1.5 px-2.5 py-1.5 text-[8px] font-bold uppercase tracking-[0.18em] border backdrop-blur-md bg-black/50 transition-colors ${
        active
          ? "border-snow/70 text-snow box-glow"
          : "border-foreground/20 text-muted-foreground hover:border-snow/50 hover:text-snow"
      }`}
    >
      {active ? <Minimize className="w-3 h-3" /> : <Maximize className="w-3 h-3" />}
      {active ? "EXIT" : "IMMERSIVE"}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* UseCaseShell — stage + LIVE STATS/CONTROLS rail + scenario log      */
/* ------------------------------------------------------------------ */

interface UseCaseShellProps {
  title: string;
  subtitle?: string;
  immersiveActive?: boolean;
  immersiveToggle?: () => void;
  stats?: React.ReactNode;
  controls?: React.ReactNode;
  logLines?: AutoLogLine[];
  logTitle?: string;
  logEmpty?: string;
  stageClass?: string;
  children: React.ReactNode;
}

export function UseCaseShell({
  title,
  subtitle,
  immersiveActive,
  immersiveToggle,
  stats,
  controls,
  logLines,
  logTitle = "SCENARIO LOG // LIVE",
  logEmpty,
  stageClass,
  children,
}: UseCaseShellProps) {
  const hasLog = logLines !== undefined;
  return (
    <div className="flex flex-col gap-4">
      <div className={`grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px] items-start ${immersiveActive ? "flex-1" : ""}`}>
        <GlassPanel
          title={title}
          subtitle={subtitle}
          className="!p-0 overflow-hidden"
          delay={0.05}
          actions={immersiveToggle ? <FullscreenToggle active={!!immersiveActive} onToggle={immersiveToggle} /> : undefined}
        >
          <div
            className={`relative scanlines overflow-hidden ${
              stageClass ?? (immersiveActive ? "h-[min(520px,58vh)]" : "h-[380px] sm:h-[440px] lg:h-[480px]")
            }`}
          >
            {children}
          </div>
        </GlassPanel>

        <div className="flex flex-col gap-4 min-w-0">
          {stats !== undefined && (
            <GlassPanel title="LIVE STATS" className="!p-0" delay={0.1}>
              <div className="p-3 grid grid-cols-2 gap-2">{stats}</div>
            </GlassPanel>
          )}
          {controls !== undefined && (
            <GlassPanel title="CONTROLS" className="!p-0" delay={0.15}>
              <div className="p-3 flex flex-col gap-2.5">{controls}</div>
            </GlassPanel>
          )}
        </div>
      </div>

      {hasLog && (
        <GlassPanel title={logTitle} className="!p-0" delay={0.2}>
          <div className="p-3">
            <AutoLog lines={logLines} emptyText={logEmpty ?? "PRESS RUN TO START THE SCENARIO…"} />
          </div>
        </GlassPanel>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* UCStat — compact stat readout for the LIVE STATS rail               */
/* ------------------------------------------------------------------ */

const UC_TONE_CLS = {
  snow: "text-snow border-snow/30",
  mint: "text-mint border-mint/30",
  magenta: "text-magenta border-magenta/30",
  neon: "text-neon border-neon/30",
  danger: "text-danger border-danger/30",
  neutral: "text-foreground/85 border-foreground/20",
} as const;

export type UcTone = keyof typeof UC_TONE_CLS;

export function UCStat({
  label,
  value,
  tone = "snow",
  delay,
}: {
  label: string;
  value: React.ReactNode;
  tone?: UcTone;
  delay?: number;
}) {
  const body = (
    <div className={`border bg-black/40 px-2.5 py-2 ${UC_TONE_CLS[tone]}`}>
      <p className="text-[7.5px] uppercase tracking-[0.18em] text-muted-foreground">{label}</p>
      <p className="text-sm font-extrabold tabular-nums mt-0.5 truncate">{value}</p>
    </div>
  );
  return delay ? (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay, duration: 0.35 }}>
      {body}
    </motion.div>
  ) : (
    body
  );
}

/* ------------------------------------------------------------------ */
/* UCToggle — on/off config chip                                       */
/* ------------------------------------------------------------------ */

export function UCToggle({
  on,
  onClick,
  children,
  accent = "snow",
  ariaLabel,
}: {
  on: boolean;
  onClick: () => void;
  children: React.ReactNode;
  accent?: "snow" | "mint" | "magenta";
  ariaLabel?: string;
}) {
  const onCls =
    accent === "magenta"
      ? "border-magenta/70 text-magenta shadow-[0_0_14px_rgba(255,45,120,0.4)]"
      : accent === "mint"
        ? "border-mint/70 text-mint shadow-[0_0_14px_rgba(0,255,163,0.35)]"
        : "border-snow/60 text-snow";
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      aria-pressed={on}
      className={`flex items-center gap-1.5 px-2.5 py-1.5 text-[8px] font-bold uppercase tracking-[0.18em] border backdrop-blur-md bg-black/60 transition-colors ${
        on ? onCls : "border-foreground/20 text-muted-foreground hover:border-foreground/40"
      }`}
    >
      {children}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* UCButton — cyber action chip                                        */
/* ------------------------------------------------------------------ */

export function UCButton({
  onClick,
  children,
  tone = "snow",
  ariaLabel,
  disabled,
}: {
  onClick: () => void;
  children: React.ReactNode;
  tone?: UcTone;
  ariaLabel?: string;
  disabled?: boolean;
}) {
  return (
    <motion.button
      type="button"
      whileHover={disabled ? undefined : { scale: 1.05 }}
      whileTap={disabled ? undefined : { scale: 0.94 }}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={`flex items-center gap-1.5 px-2.5 py-1.5 text-[8px] font-bold uppercase tracking-[0.18em] border bg-black/50 backdrop-blur-md cyber-cut-sm transition-colors disabled:opacity-40 ${UC_TONE_CLS[tone]} hover:bg-snow/10`}
    >
      {children}
    </motion.button>
  );
}

/* ------------------------------------------------------------------ */
/* VerdictFlash — centered banner                                      */
/* ------------------------------------------------------------------ */

export function VerdictFlash({
  show,
  text,
  tone = "ok",
}: {
  show: boolean;
  text: string;
  tone?: "ok" | "deny" | "snow";
}) {
  const cls =
    tone === "ok" ? "text-mint border-mint/60" : tone === "deny" ? "text-danger border-danger/60" : "text-snow border-snow/60";
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 1.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 z-30 flex justify-center"
        >
          <span className={`border bg-black/85 backdrop-blur-md px-5 py-2 text-[12px] font-extrabold uppercase tracking-[0.4em] box-glow ${cls}`}>
            {text}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ------------------------------------------------------------------ */
/* StepBadge — current scenario step readout (top-left of stage)       */
/* ------------------------------------------------------------------ */

export function StepBadge({ step, total, text }: { step: number; total: number; text: string }) {
  return (
    <div className="absolute left-2 top-2 z-20 glass-inset cyber-cut-sm px-2 py-1.5 flex items-center gap-2">
      <span className="text-[8px] font-extrabold tabular-nums text-snow">
        {String(step + 1).padStart(2, "0")}/{String(total).padStart(2, "0")}
      </span>
      <span className="text-[8px] font-bold uppercase tracking-[0.18em] text-muted-foreground">{text}</span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* UseCaseNote — one-line "why this matters" strip                     */
/* ------------------------------------------------------------------ */

export function UseCaseNote({ children, inline = false }: { children: React.ReactNode; inline?: boolean }) {
  const body = (
    <p className="text-[7.5px] leading-relaxed text-muted-foreground tracking-wider uppercase">
      <span className="text-snow font-extrabold">KEY INSIGHT · </span>
      {children}
    </p>
  );
  if (inline) {
    return (
      <div className="shrink-0 hidden sm:flex items-start justify-end px-3 pt-2 z-20">
        <div className="glass-inset cyber-cut-sm px-2 py-1.5">{body}</div>
      </div>
    );
  }
  return (
    <div className="absolute right-2 top-2 z-20 max-w-[46%] glass-inset cyber-cut-sm px-2 py-1.5 hidden sm:block">
      {body}
    </div>
  );
}
