"use client";

import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ExternalLink, Play, RotateCcw } from "lucide-react";
import {
  LAB_COURSES,
  type FlowNodeDef,
  type Lab,
  type LabCourse,
  type LabModule,
  type LabStep,
  type LabStepBlock,
} from "@/lib/labs-data";
import { FlowCanvas, FlowLabel, FlowLink, FlowNode, type NodeStatus } from "@/components/shared/flow";
import { GlassPanel } from "@/components/shared/glass-panel";
import { SqlCodeBlock } from "@/components/shared/sql-code-block";
import { UCButton, UCToggle } from "@/components/shared/use-case";
import { DatabaseIcon, PipeIcon, WarehouseIcon } from "@/components/shared/snowflake-icons";

/* ------------------------------------------------------------------ */
/* LAB EXPLORER — SNOWFLAKE//NEXUS mission console                     */
/* Full curriculum browser: 2 courses → 6 labs → 28 modules.           */
/* Renders overview/explanation/output HTML, vertical flow maps with   */
/* a looping SIMULATE FLOW engine, numbered step cards with SQL        */
/* snippets + figures, and a localStorage-backed visited tracker.      */
/* ------------------------------------------------------------------ */

const VISITED_KEY = "sfnexus-lab-visited";

const pad = (n: number) => String(n).padStart(2, "0");
const trunc = (s: string, max: number) => (s.length > max ? `${s.slice(0, max - 1)}…` : s);

function typeStatus(type: string): NodeStatus {
  if (type === "start") return "success";
  if (type === "end") return "cyber";
  if (type === "decision") return "warn";
  return "active"; // process | io
}

const TYPE_CHIP: Record<string, { label: string; tone: "mint" | "snow" | "magenta" } | undefined> = {
  start: { label: "START", tone: "mint" },
  decision: { label: "DECISION", tone: "snow" },
  end: { label: "END", tone: "magenta" },
};

function hasStepContent(s: LabStep): boolean {
  if (s.title || s.description || s.code || s.image) return true;
  return s.blocks.some(
    (b) =>
      (b.type === "description" && !!b.html) ||
      (b.type === "snippet" && !!b.code) ||
      (b.type === "image" && !!b.url)
  );
}

/* ------------------------------------------------------------------ */
/* HtmlBlock — single trusted-HTML renderer (offline JSON export)      */
/* ------------------------------------------------------------------ */

function HtmlBlock({ html, className = "" }: { html: string; className?: string }) {
  return <div className={`lab-prose ${className}`} dangerouslySetInnerHTML={{ __html: html }} />;
}

/* ------------------------------------------------------------------ */
/* FigureView — lazy lab screenshot with muted caption                 */
/* ------------------------------------------------------------------ */

function FigureView({ url, caption, altBase }: { url: string; caption?: string | null; altBase: string }) {
  if (!url) return null;
  return (
    <figure className="flex flex-col gap-1.5">
      <img
        src={url}
        alt={caption ?? `Lab screenshot for ${altBase}`}
        loading="lazy"
        className="max-h-[280px] object-contain w-full border border-snow/15 bg-black/30"
      />
      {caption && (
        <figcaption className="text-[8px] uppercase tracking-[0.18em] text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

/* ------------------------------------------------------------------ */
/* StepCard — one numbered lab step (description + blocks + legacy)    */
/* ------------------------------------------------------------------ */

function StepCard({ step, idx, keyId }: { step: LabStep; idx: number; keyId: string }) {
  if (!hasStepContent(step)) return null;
  const k = (b: LabStepBlock, bi: number) => b.id ?? `${keyId}-b${bi}`;
  /* dedup: legacy step.description/code/image often duplicate the blocks array */
  const hasSnippetDup = step.blocks.some((b) => b.type === "snippet" && b.code && b.code === step.code);
  const hasImageDup = step.blocks.some((b) => b.type === "image" && b.url && b.url === step.image);
  const norm = (s: string | null | undefined) => (s ?? "").replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
  const stepDesc = norm(step.description);
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.45, delay: Math.min(idx * 0.06, 0.36), ease: [0.22, 1, 0.36, 1] }}
      className="glass-inset cyber-cut-sm p-4"
      aria-label={`Step ${idx + 1}: ${step.title ?? "procedure"}`}
    >
      <header className="flex items-center gap-2.5 pb-3 mb-3 border-b border-snow/10">
        <span className="shrink-0 text-[10px] font-extrabold tabular-nums text-snow border border-snow/40 bg-snow/10 px-1.5 py-0.5">
          {pad(idx + 1)}
        </span>
        <h4 className="min-w-0 text-[11px] font-bold uppercase tracking-[0.16em] text-snow/90 truncate">
          {step.title ?? `PROCEDURE ${pad(idx + 1)}`}
        </h4>
      </header>
      <div className="flex flex-col gap-3">
        {step.description && !step.blocks.some((b) => b.type === "description" && norm(b.html) === stepDesc && stepDesc.length > 0) && (
          <HtmlBlock html={step.description} />
        )}
        {step.blocks.map((b, bi) => {
          if (b.type === "description" && b.html) return <HtmlBlock key={k(b, bi)} html={b.html} />;
          if (b.type === "snippet" && b.code)
            return (
              <SqlCodeBlock
                key={k(b, bi)}
                code={b.code}
                label={b.label ?? (b.lang ?? "SQL").toUpperCase()}
                lang={(b.lang ?? "sql").toLowerCase()}
              />
            );
          if (b.type === "image" && b.url)
            return <FigureView key={k(b, bi)} url={b.url} caption={b.caption} altBase={step.title ?? `step ${idx + 1}`} />;
          return null;
        })}
        {step.code && !hasSnippetDup && (
          <SqlCodeBlock
            code={step.code}
            label={(step.codeLang ?? "SQL").toUpperCase()}
            lang={(step.codeLang ?? "sql").toLowerCase()}
          />
        )}
        {step.image && !hasImageDup && (
          <FigureView url={step.image} caption={step.imageCaption} altBase={step.title ?? `step ${idx + 1}`} />
        )}
      </div>
    </motion.article>
  );
}

/* ------------------------------------------------------------------ */
/* LegendChip — tiny flow legend token                                 */
/* ------------------------------------------------------------------ */

function LegendChip({ tone, children }: { tone: string; children: React.ReactNode }) {
  return (
    <span className={`text-[7px] font-bold uppercase tracking-[0.2em] border bg-black/40 px-1.5 py-0.5 ${tone}`}>
      {children}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* FlowMap — vertical flowchart + SIMULATE FLOW loop engine            */
/* ------------------------------------------------------------------ */

function FlowMap({ flow, modTitle }: { flow: FlowNodeDef[]; modTitle: string }) {
  const [simOn, setSimOn] = useState(false);
  const [simIdx, setSimIdx] = useState(0);
  const n = flow.length;

  useEffect(() => {
    if (!simOn || n === 0) return;
    const t = setInterval(() => setSimIdx((i) => (i + 1) % n), 900);
    return () => clearInterval(t);
  }, [simOn, n]);

  const cur = simOn && n > 0 ? simIdx % n : -1;
  const yFor = (i: number) => (n <= 1 ? 50 : 8 + i * (84 / (n - 1)));
  const nodeSize = n > 10 ? "xs" : "sm";
  const truncMax = n > 10 ? 30 : 40;
  const activeLabel = cur >= 0 ? flow[cur]?.label : undefined;

  return (
    <GlassPanel
      title="MODULE FLOW // VISUAL MAP"
      subtitle={`${pad(n)} NODES · ${pad(Math.max(0, n - 1))} LINKS · VERTICAL PIPELINE`}
      className="!p-0"
      delay={0.08}
      actions={
        <UCToggle
          on={simOn}
          onClick={() => {
            setSimIdx(0);
            setSimOn((s) => !s);
          }}
          accent="snow"
          ariaLabel={simOn ? "Stop flow simulation" : "Start flow simulation"}
        >
          <Play className="w-2.5 h-2.5" aria-hidden="true" />
          SIMULATE FLOW
        </UCToggle>
      }
    >
      <div className="p-3">
        <FlowCanvas className="h-[420px]" ariaLabel={`Visual flow map with ${n} nodes for module ${modTitle}`}>
          {flow.slice(0, -1).map((nd, i) => (
            <FlowLink
              key={`lnk-${nd.id}`}
              d={`M 50 ${yFor(i)} L 50 ${yFor(i + 1)}`}
              status={cur > i ? "flowing" : "idle"}
              showArrow
              strokeWidth={1}
              dot={cur > i}
              dotDuration={1.5}
            />
          ))}
          {flow.map((nd, i) => {
            const isCur = i === cur;
            const chip = TYPE_CHIP[nd.type];
            const dimmed = cur >= 0 && !isCur && i > cur;
            return (
              <React.Fragment key={nd.id}>
                <FlowNode
                  x={50}
                  y={yFor(i)}
                  label={trunc(nd.label, truncMax)}
                  status={typeStatus(nd.type)}
                  size={nodeSize}
                  pulse={isCur}
                  active={isCur}
                  delay={Math.min(i * 0.04, 0.5)}
                  className={`transition-opacity duration-300 ${dimmed ? "opacity-40" : ""}`}
                />
                {chip && (
                  <FlowLabel x={91} y={yFor(i)} tone={chip.tone}>
                    {chip.label}
                  </FlowLabel>
                )}
              </React.Fragment>
            );
          })}
          {simOn && activeLabel !== undefined && (
            <div className="absolute left-2 top-2 z-20 glass-inset cyber-cut-sm px-2 py-1.5 flex items-center gap-2 max-w-[68%]">
              <span className="text-[8px] font-extrabold tabular-nums text-snow shrink-0">
                {pad(cur + 1)}/{pad(n)}
              </span>
              <span className="text-[8px] font-bold uppercase tracking-[0.18em] text-muted-foreground truncate">
                {activeLabel}
              </span>
            </div>
          )}
        </FlowCanvas>
        <div className="mt-2.5 flex flex-wrap items-center gap-2">
          <span className="text-[7px] font-bold uppercase tracking-[0.24em] text-muted-foreground">LEGEND</span>
          <LegendChip tone="text-mint border-mint/40">START</LegendChip>
          <LegendChip tone="text-snow border-snow/40">PROCESS</LegendChip>
          <LegendChip tone="text-neon border-neon/40">DECISION</LegendChip>
          <LegendChip tone="text-magenta border-magenta/40">END</LegendChip>
          <span className="ml-auto text-[7px] uppercase tracking-[0.2em] text-muted-foreground/70 tabular-nums">
            {simOn ? "SIM RUNNING · 900MS / NODE" : "STATIC MAP · ENABLE SIMULATE FLOW"}
          </span>
        </div>
      </div>
    </GlassPanel>
  );
}

/* ------------------------------------------------------------------ */
/* ModuleDetail — the full mission brief for one module                */
/* ------------------------------------------------------------------ */

interface ModuleDetailProps {
  course: LabCourse;
  lab: Lab;
  mod: LabModule;
  ci: number;
  li: number;
  mi: number;
  seen: boolean;
}

function ModuleDetail({ course, lab, mod, ci, li, mi, seen }: ModuleDetailProps) {
  const flow = mod.flow ?? [];
  const mk = `${ci}-${li}-${mi}`;
  const crumb = `${(course.title ?? "COURSE").toUpperCase()} // ${(lab.title ?? "LAB").toUpperCase()}`;
  const anySteps = mod.steps.some(hasStepContent);

  return (
    <div className="flex flex-col gap-4">
      {/* Module header */}
      <div className="glass-inset cyber-cut-sm px-4 py-3.5">
        <div className="flex items-center gap-2 min-w-0">
          <DatabaseIcon className="w-3.5 h-3.5 text-snow/70 shrink-0" aria-hidden="true" />
          <p className="text-[7.5px] uppercase tracking-[0.28em] text-muted-foreground truncate">{crumb}</p>
        </div>
        <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1.5">
          <h2 className="text-sm sm:text-base font-extrabold uppercase tracking-[0.14em] text-snow text-glow">
            {mod.title ?? "UNTITLED MODULE"}
          </h2>
          {seen && (
            <span className="text-[7px] font-bold uppercase tracking-[0.2em] text-mint border border-mint/40 bg-mint/10 px-1.5 py-0.5">
              LOGGED · VISITED
            </span>
          )}
        </div>
        <p className="mt-1.5 text-[7.5px] uppercase tracking-[0.22em] text-muted-foreground tabular-nums">
          MODULE {pad(mi + 1)} / {pad(lab.modules.length)} · {pad(mod.steps.length)} STEPS
          {flow.length > 0 ? ` · ${pad(flow.length)} FLOW NODES` : ""}
        </p>
      </div>

      {/* Overview */}
      {mod.overview && (
        <GlassPanel title="OVERVIEW // MISSION BRIEF" className="!p-0" delay={0.04}>
          <div className="p-4 sm:p-5">
            <HtmlBlock html={mod.overview} />
          </div>
        </GlassPanel>
      )}

      {/* Explanation */}
      {mod.explanation && (
        <GlassPanel title="FIELD NOTES // DEEP DIVE" className="!p-0" delay={0.06}>
          <div className="p-4 sm:p-5">
            <HtmlBlock html={mod.explanation} />
          </div>
        </GlassPanel>
      )}

      {/* Flow diagram */}
      {flow.length > 0 && <FlowMap flow={flow} modTitle={mod.title ?? "module"} />}

      {/* Steps */}
      {anySteps && (
        <GlassPanel
          title="STEPS // EXECUTION PROCEDURE"
          subtitle={`${pad(mod.steps.length)} NUMBERED`}
          className="!p-0"
          delay={0.1}
        >
          <div className="p-3 sm:p-4 flex flex-col gap-3">
            {mod.steps.map((s, si) => (
              <StepCard key={`${mk}-s${si}`} step={s} idx={si} keyId={`${mk}-s${si}`} />
            ))}
          </div>
        </GlassPanel>
      )}

      {/* Expected output */}
      {(mod.output || mod.outputCode) && (
        <GlassPanel title="EXPECTED OUTPUT // RESULT" className="!p-0" delay={0.12}>
          <div className="p-4 sm:p-5 flex flex-col gap-3">
            {mod.output && (
              <HtmlBlock
                html={mod.output}
                className="[&_table]:w-full [&_td]:border [&_td]:border-snow/15 [&_td]:px-2 [&_td]:py-1.5 [&_td]:align-top [&_mark]:bg-transparent [&_mark]:text-danger [&_mark]:font-bold"
              />
            )}
            {mod.outputCode && <SqlCodeBlock code={mod.outputCode} label="DORA GRADER QUERY" lang="sql" />}
          </div>
        </GlassPanel>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* LabExplorerModule — default export                                  */
/* ------------------------------------------------------------------ */

function loadVisited(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = window.localStorage.getItem(VISITED_KEY);
    if (raw) {
      const arr: unknown = JSON.parse(raw);
      if (Array.isArray(arr)) {
        return new Set(arr.filter((x): x is string => typeof x === "string"));
      }
    }
  } catch {
    /* corrupted storage — start fresh */
  }
  return new Set();
}

export default function LabExplorerModule() {
  const [courseIdx, setCourseIdx] = useState(0);
  const [labIdx, setLabIdx] = useState(0);
  const [modIdx, setModIdx] = useState(0);
  /* Registry mounts this module with ssr:false — localStorage is readable at init.
     "0-0-0" is the module on screen at first paint, so it counts as visited. */
  const [visited, setVisited] = useState<Set<string>>(() => {
    const s = loadVisited();
    s.add("0-0-0");
    return s;
  });

  const totalMods = useMemo(
    () => LAB_COURSES.reduce((a, c) => a + c.labs.reduce((b, l) => b + l.modules.length, 0), 0),
    []
  );
  const courseCounts = useMemo(
    () =>
      LAB_COURSES.map((c) => ({
        labs: c.labs.length,
        mods: c.labs.reduce((a, l) => a + l.modules.length, 0),
        steps: c.labs.reduce((a, l) => a + l.modules.reduce((b, m) => b + m.steps.length, 0), 0),
      })),
    []
  );

  const course = LAB_COURSES[courseIdx] ?? LAB_COURSES[0];
  const lab = course.labs[labIdx] ?? course.labs[0];
  const mod = lab.modules[modIdx] ?? lab.modules[0];
  const modKey = `${courseIdx}-${labIdx}-${modIdx}`;
  const pct = totalMods === 0 ? 0 : Math.min(100, Math.round((visited.size / totalMods) * 100));

  /* Persist visited map to localStorage (external-system sync) */
  useEffect(() => {
    try {
      window.localStorage.setItem(VISITED_KEY, JSON.stringify(Array.from(visited)));
    } catch {
      /* storage unavailable */
    }
  }, [visited]);

  /* Visited tracking is event-driven: every module the console shows gets logged */
  const mark = (k: string) => setVisited((prev) => (prev.has(k) ? prev : new Set(prev).add(k)));

  const selectCourse = (ci: number) => {
    setCourseIdx(ci);
    setLabIdx(0);
    setModIdx(0);
    mark(`${ci}-0-0`);
  };
  const selectLab = (li: number) => {
    setLabIdx(li);
    setModIdx(0);
    mark(`${courseIdx}-${li}-0`);
  };
  const selectModule = (mi: number) => {
    setModIdx(mi);
    mark(`${courseIdx}-${labIdx}-${mi}`);
  };

  const resetProgress = () => setVisited(new Set());

  return (
    <div className="flex flex-col gap-4">
      {/* Course selector */}
      <div className="grid gap-3 sm:grid-cols-2" role="tablist" aria-label="Lab course selector">
        {LAB_COURSES.map((c, ci) => {
          const active = ci === courseIdx;
          const counts = courseCounts[ci] ?? { labs: 0, mods: 0, steps: 0 };
          const Icon = ci === 0 ? WarehouseIcon : PipeIcon;
          return (
            <button
              key={`course-${ci}`}
              type="button"
              role="tab"
              aria-selected={active}
              aria-label={`Select course ${c.title ?? "unnamed"}: ${counts.labs} labs, ${counts.mods} modules`}
              onClick={() => selectCourse(ci)}
              className={`relative overflow-hidden glass-inset cyber-cut-sm text-left px-4 py-3.5 transition-colors ${
                active
                  ? "border-snow/40 bg-snow/10 text-snow"
                  : "text-muted-foreground hover:border-snow/25 hover:text-foreground"
              }`}
            >
              <span className="flex items-center gap-3">
                <Icon
                  className={`w-5 h-5 shrink-0 ${active ? "text-snow" : "text-muted-foreground/60"}`}
                  aria-hidden="true"
                />
                <span className="min-w-0 flex-1">
                  <span
                    className={`block text-[11px] font-extrabold uppercase tracking-[0.24em] truncate ${
                      active ? "text-snow text-glow" : ""
                    }`}
                  >
                    {c.title ?? "COURSE"}
                  </span>
                  <span className="mt-1 block text-[7.5px] uppercase tracking-[0.22em] text-muted-foreground tabular-nums">
                    {pad(counts.labs)} LABS · {pad(counts.mods)} MODULES · {pad(counts.steps)} STEPS
                  </span>
                </span>
                <span
                  className={`shrink-0 text-[7px] font-bold uppercase tracking-[0.2em] tabular-nums ${
                    active ? "text-snow/70" : "text-muted-foreground/50"
                  }`}
                >
                  TRK-{pad(ci + 1)}
                </span>
              </span>
              {active && (
                <motion.span
                  layoutId="sfnx-lab-course-marker"
                  className="absolute inset-x-0 bottom-0 h-[2px] bg-snow shadow-[0_0_12px_rgba(41,181,232,0.8)]"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  aria-hidden="true"
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Curriculum progress */}
      <div className="glass-inset cyber-cut-sm px-4 py-3 flex flex-wrap items-center gap-x-4 gap-y-2">
        <p className="text-[8px] font-bold uppercase tracking-[0.28em] text-snow text-glow shrink-0">
          CURRICULUM PROGRESS
        </p>
        <div
          className="flex-1 min-w-[140px] h-[6px] bg-black/60 border border-foreground/15 relative overflow-hidden"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={totalMods}
          aria-valuenow={visited.size}
          aria-label="Curriculum progress: visited modules out of total"
        >
          <motion.div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-snow/70 via-snow to-mint shadow-[0_0_10px_rgba(41,181,232,0.6)]"
            initial={false}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
        <p className="text-[9px] font-bold tabular-nums text-foreground/85 shrink-0" aria-live="polite">
          {pct}%<span className="text-muted-foreground"> · {visited.size}/{totalMods} MODULES VISITED</span>
        </p>
        <UCButton tone="danger" onClick={resetProgress} ariaLabel="Reset curriculum progress">
          <RotateCcw className="w-2.5 h-2.5" aria-hidden="true" />
          RESET
        </UCButton>
      </div>

      {/* Rail + main pane */}
      <div className="grid gap-4 items-start lg:grid-cols-[300px_minmax(0,1fr)]">
        {/* Left rail */}
        <div className="flex flex-col gap-4 min-w-0">
          <GlassPanel
            title={`LABS // ${(course.title ?? "TRACK").toUpperCase()}`}
            subtitle={`${pad(course.labs.length)} LABS IN TRACK`}
            className="!p-0"
            delay={0.05}
          >
            <div className="p-3">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={`labs-${courseIdx}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.24 }}
                  className="flex flex-col gap-2"
                >
                  {course.labs.map((l, li) => {
                    const active = li === labIdx;
                    return (
                      <div
                        key={`lab-${courseIdx}-${li}`}
                        className={`border cyber-cut-sm transition-colors ${
                          active
                            ? "border-snow/40 bg-snow/10"
                            : "border-foreground/15 bg-black/40 hover:border-snow/25"
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => selectLab(li)}
                          aria-label={`Select lab ${li + 1}: ${l.title ?? "untitled"}`}
                          aria-current={active ? "true" : undefined}
                          className="w-full text-left px-3 py-2.5 flex items-center gap-2.5"
                        >
                          <span
                            className={`shrink-0 text-[10px] font-extrabold tabular-nums ${
                              active ? "text-snow" : "text-muted-foreground/60"
                            }`}
                          >
                            {pad(li + 1)}
                          </span>
                          <span className="min-w-0 flex-1">
                            <span
                              className={`block text-[9.5px] font-bold uppercase tracking-[0.14em] truncate ${
                                active ? "text-snow" : "text-foreground/80"
                              }`}
                            >
                              {l.title ?? "UNTITLED LAB"}
                            </span>
                            <span className="mt-0.5 block text-[7px] uppercase tracking-[0.2em] text-muted-foreground tabular-nums">
                              {pad(l.modules.length)} MODULES
                            </span>
                          </span>
                          <span
                            className={`shrink-0 w-1.5 h-1.5 ${active ? "bg-snow" : "bg-transparent"}`}
                            aria-hidden="true"
                          />
                        </button>
                        {l.linkUrl && (
                          <a
                            href={l.linkUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Open Snowflake course for ${l.title ?? "this lab"} in a new tab`}
                            className="mx-3 mb-2 w-fit flex items-center gap-1.5 px-2 py-1 text-[7px] font-bold uppercase tracking-[0.2em] text-muted-foreground hover:text-snow border border-foreground/15 hover:border-snow/40 bg-black/50 transition-colors"
                          >
                            <ExternalLink className="w-2.5 h-2.5" aria-hidden="true" />
                            OPEN SNOWFLAKE COURSE
                          </a>
                        )}
                      </div>
                    );
                  })}
                </motion.div>
              </AnimatePresence>
            </div>
          </GlassPanel>

          <GlassPanel
            title="MODULES // MISSION LIST"
            subtitle={lab.title ?? undefined}
            className="!p-0"
            delay={0.09}
          >
            <div className="p-3 max-h-[380px] overflow-y-auto cyber-scroll">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={`mods-${courseIdx}-${labIdx}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.22 }}
                  className="flex flex-col gap-1.5"
                >
                  {lab.modules.map((m, mi) => {
                    const active = mi === modIdx;
                    const key = `${courseIdx}-${labIdx}-${mi}`;
                    const isSeen = visited.has(key);
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => selectModule(mi)}
                        aria-label={`Select module ${mi + 1}: ${m.title ?? "untitled"}`}
                        aria-current={active ? "true" : undefined}
                        className={`w-full text-left px-2.5 py-2 border cyber-cut-sm flex items-center gap-2 transition-colors ${
                          active
                            ? "border-snow/40 bg-snow/10"
                            : "border-foreground/15 bg-black/40 hover:border-snow/25"
                        }`}
                      >
                        <span
                          className={`shrink-0 text-[9px] font-extrabold tabular-nums ${
                            active ? "text-snow" : "text-muted-foreground/60"
                          }`}
                        >
                          {pad(mi + 1)}
                        </span>
                        <span
                          className={`flex-1 min-w-0 text-[9px] font-bold uppercase tracking-[0.12em] truncate ${
                            active ? "text-snow" : "text-foreground/75"
                          }`}
                        >
                          {m.title ?? "UNTITLED MODULE"}
                        </span>
                        <span className="shrink-0 text-[7px] tabular-nums text-muted-foreground">
                          {pad(m.steps.length)} STEPS
                        </span>
                        {isSeen && (
                          <Check
                            className={`w-2.5 h-2.5 shrink-0 ${active ? "text-mint" : "text-mint/50"}`}
                            aria-label="Module visited"
                          />
                        )}
                      </button>
                    );
                  })}
                </motion.div>
              </AnimatePresence>
            </div>
          </GlassPanel>
        </div>

        {/* Main pane */}
        <div className="min-w-0">
          <div className="max-h-[1200px] overflow-y-auto cyber-scroll pr-0.5">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={modKey}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.32, ease: "easeOut" }}
              >
                <ModuleDetail
                  course={course}
                  lab={lab}
                  mod={mod}
                  ci={courseIdx}
                  li={labIdx}
                  mi={modIdx}
                  seen={visited.has(modKey)}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
