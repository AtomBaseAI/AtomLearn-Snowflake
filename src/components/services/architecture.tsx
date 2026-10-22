"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FastForward } from "lucide-react";
import { GlassPanel } from "@/components/shared/glass-panel";
import {
  FlowCanvas,
  FlowNode,
  FlowLink,
  FlowLabel,
  type NodeStatus,
} from "@/components/shared/flow";
import {
  UseCaseShell,
  UCStat,
  UCButton,
  VerdictFlash,
  StepBadge,
  useScenarioRunner,
} from "@/components/shared/use-case";
import { SimControls } from "@/components/shared/sim-controls";
import { Callout } from "@/components/shared/callout";
import { highlightSql } from "@/components/shared/sql-code-block";
import { logTs, type AutoLogLine } from "@/components/shared/auto-log";
import {
  CloudIcon,
  ComputeIcon,
  DatabaseIcon,
  FileIcon,
  QueryIcon,
  StorageIcon,
  ViewIcon,
} from "@/components/shared/snowflake-icons";

/* ------------------------------------------------------------------ */
/* ARCHITECTURE — QUERY LIFECYCLE THROUGH THE 3 SNOWFLAKE LAYERS       */
/* ------------------------------------------------------------------ */

const BASE_MS = 1350;
const TURBO_MS = 90;
const TOTAL_PARTS = 12;
const PART_BYTES = 82 * 1024 * 1024; // one micro-partition ≈ 82 MB compressed
const MAX_LOG = 60;

const STEPS = [
  { id: "SUBMIT", label: "SUBMIT QUERY" },
  { id: "PARSE", label: "PARSE SQL" },
  { id: "OPTIMIZE", label: "OPTIMIZE PLAN" },
  { id: "PRUNE", label: "PRUNE PARTITIONS" },
  { id: "CACHE", label: "PROBE DATA CACHE" },
  { id: "EXECUTE", label: "MPP EXECUTE" },
  { id: "AGGREGATE", label: "AGGREGATE" },
  { id: "RETURN", label: "RESULT RETURNED" },
] as const;
const STEP_COUNT = STEPS.length;

const CLIENTS = [
  { id: "snowsql", label: "SNOWSQL", sub: "CLI // TERMINAL", x: 22, icon: QueryIcon },
  { id: "notebook", label: "NOTEBOOK", sub: "PYTHON // CELL", x: 50, icon: FileIcon },
  { id: "bi", label: "BI TOOL", sub: "DASHBOARDS // BI", x: 78, icon: ViewIcon },
] as const;
type ClientId = (typeof CLIENTS)[number]["id"];

const WH_NODES = [
  { x: 32, label: "N1" },
  { x: 50, label: "N2" },
  { x: 68, label: "N3" },
] as const;

const BRAIN_ROWS = [
  { name: "QUERY PARSER / OPTIMIZER", note: "AST · JOIN REORDER · PREDICATE PUSHDOWN" },
  { name: "METADATA + MICRO-PARTITION STATS", note: "MIN/MAX · ROW COUNTS · PRUNING INDEX" },
  { name: "ACCESS CONTROL (RBAC)", note: "ROLE → PRIVILEGE GRANT CHECK" },
  { name: "TRANSACTION MANAGER", note: "SNAPSHOT ISOLATION · CONSISTENT SCAN" },
] as const;

const ROW_CLS: Record<"idle" | "active" | "done", string> = {
  idle: "border-foreground/10 text-foreground/60 bg-black/40",
  active: "border-snow/70 bg-snow/10 text-snow",
  done: "border-mint/35 text-mint/80 bg-mint/[0.04]",
};

const PART_CLS: Record<"idle" | "pruned" | "cand" | "scanning" | "done", string> = {
  idle: "border-foreground/12 text-foreground/30 bg-black/30",
  pruned: "border-magenta/35 text-magenta/70 bg-magenta/[0.05] line-through",
  cand: "border-snow/50 text-snow bg-snow/[0.07]",
  scanning: "border-snow bg-snow/15 text-snow box-glow",
  done: "border-mint/60 text-mint bg-mint/[0.07]",
};

const SQL_LINES = [
  "USE WAREHOUSE WH_CALC_XS;",
  "SELECT r.region, SUM(o.amount) AS revenue",
  "FROM analytics.orders o",
  "JOIN analytics.region r ON r.id = o.region_id",
  "WHERE o.status = 'SHIPPED'",
  "  AND o.order_date >= '2025-01-01'",
  "GROUP BY r.region;",
];
/* active SQL line per engine step */
const LINE_FOR_STEP = [0, 1, 3, 5, 2, 4, 6, 1];

type CacheState = "COLD" | "HOT";
interface PruneInfo {
  scanned: number[];
  pruned: number;
}

const fmtBytes = (b: number): string => {
  if (b <= 0) return "0 B";
  if (b >= 1024 * 1024) return `${(b / (1024 * 1024)).toFixed(2)} MB`;
  if (b >= 1024) return `${(b / 1024).toFixed(0)} KB`;
  return `${b} B`;
};

const armedLine = (): AutoLogLine => ({
  id: 0,
  text: `[${logTs()}] > lifecycle engine armed — press RUN to fire a query through the 3 layers`,
  tone: "dim",
});

export default function ArchitectureModule() {
  const [running, setRunning] = useState(false);
  const [ms, setMs] = useState(BASE_MS);
  const turboRef = useRef(false);

  /* ── refs-as-truth: interval mutates refs, flush once per tick ── */
  const stepRef = useRef(0);
  const startedRef = useRef(false);
  const runIdRef = useRef(0);
  const clientRef = useRef<ClientId>("snowsql");
  const cacheRef = useRef<CacheState>("COLD");
  const pruneRef = useRef<PruneInfo | null>(null);
  const bytesRef = useRef(0);
  const bytesTargetRef = useRef(0);
  const pctRef = useRef(0);
  const queryIdRef = useRef("—");
  const logIdRef = useRef(1);
  const logRef = useRef<AutoLogLine[]>([armedLine()]);

  /* mirrored state for render */
  const [started, setStarted] = useState(false);
  const [cacheState, setCacheState] = useState<CacheState>("COLD");
  const [prune, setPrune] = useState<PruneInfo | null>(null);
  const [bytes, setBytes] = useState(0);
  const [pct, setPct] = useState(0);
  const [client, setClient] = useState<ClientId>("snowsql");
  const [queryId, setQueryId] = useState("—");
  const [log, setLog] = useState<AutoLogLine[]>([armedLine()]);

  const flush = useCallback(() => {
    setStarted(startedRef.current);
    setCacheState(cacheRef.current);
    setPrune(pruneRef.current ? { pruned: pruneRef.current.pruned, scanned: [...pruneRef.current.scanned] } : null);
    setBytes(bytesRef.current);
    setPct(pctRef.current);
    setClient(clientRef.current);
    setQueryId(queryIdRef.current);
    setLog([...logRef.current]);
  }, []);

  const pushLog = useCallback((text: string, tone?: string) => {
    logRef.current = [...logRef.current, { id: logIdRef.current++, text: `[${logTs()}] ${text}`, tone }].slice(-MAX_LOG);
  }, []);

  /* one step of the lifecycle state machine */
  const stepAction = useCallback(
    (s: number) => {
      /* loop wrap: RETURN → SUBMIT */
      if (s === 0 && stepRef.current === 7) {
        runIdRef.current += 1;
        cacheRef.current = "HOT";
        pushLog("── loop — data cache warm on WH local SSD, replaying faster ──", "dim");
      }
      stepRef.current = s;
      const c = CLIENTS.find((x) => x.id === clientRef.current) ?? CLIENTS[0];
      const run = Math.max(1, runIdRef.current);

      switch (s) {
        case 0: {
          if (!startedRef.current) {
            startedRef.current = true;
            runIdRef.current = 1;
          }
          const hash = (Math.imul(runIdRef.current, 2654435761) >>> 0).toString(16).padStart(8, "0");
          queryIdRef.current = `Q-${hash.slice(0, 6).toUpperCase()}`;
          pushLog(`> ${c.label} dispatches ${queryIdRef.current} — cloud services gateway accepted`, "snow");
          pushLog("> access control: ROLE SYSADMIN → SELECT on ANALYTICS.ORDERS — GRANTED", "mint");
          break;
        }
        case 1:
          pushLog("> parser: SQL → AST — tokens valid, types bound (1.8ms)", "ice");
          break;
        case 2:
          pushLog("> optimizer: join reorder + predicate pushdown — plan compiled");
          pushLog("> cloud services → WH_CALC_XS: execution plan dispatched", "dim");
          break;
        case 3: {
          const scannedCount = 3 + (run % 2);
          const startAt = (run * 5) % TOTAL_PARTS;
          const scanned = Array.from({ length: scannedCount }, (_, i) => (startAt + i * 2) % TOTAL_PARTS);
          pruneRef.current = { scanned, pruned: TOTAL_PARTS - scannedCount };
          pushLog(
            `> metadata: min/max stats on order_date → ${TOTAL_PARTS - scannedCount}/${TOTAL_PARTS} micro-partitions PRUNED`,
            "magenta"
          );
          break;
        }
        case 4:
          if (cacheRef.current === "HOT") {
            pushLog(`> data cache HOT — ${pruneRef.current?.scanned.length ?? 0} partitions already on local SSD`, "mint");
          } else {
            pushLog("> data cache COLD — miss: streaming remote S3 byte ranges", "ice");
          }
          break;
        case 5:
          bytesTargetRef.current = (pruneRef.current?.scanned.length ?? 3) * PART_BYTES;
          pushLog(
            `> MPP: ${pruneRef.current?.scanned.length ?? 3} partitions split across N1·N2·N3 — parallel scan`,
            "snow"
          );
          break;
        case 6:
          pushLog("> leader node merges partial results — GROUP BY materialized", "ice");
          break;
        case 7: {
          bytesRef.current = bytesTargetRef.current;
          pctRef.current = 100;
          const n = pruneRef.current?.scanned.length ?? 3;
          const dur = runIdRef.current <= 1 ? 1284 + n * 86 : 512 + n * 38;
          pushLog(`> 6 rows returned → ${c.label} · ${dur}ms · VERDICT: SUCCESS`, "mint");
          if (turboRef.current) {
            turboRef.current = false;
            setMs(BASE_MS);
          }
          break;
        }
      }
    },
    [pushLog]
  );

  const handleStep = useCallback(
    (s: number) => {
      stepAction(s);
      flush();
    },
    [stepAction, flush]
  );

  const { step, reset: resetRunner } = useScenarioRunner(STEP_COUNT, running, ms, handleStep);

  /* BYTES SCANNED counts up during EXECUTE / EXECUTION % fills through AGGREGATE */
  useEffect(() => {
    if (!started) return;
    if (step === 5) {
      const t = setInterval(() => {
        const target = bytesTargetRef.current;
        if (bytesRef.current < target) {
          bytesRef.current = Math.min(target, bytesRef.current + Math.max(24_000_000, Math.round(target / 26)));
        }
        if (pctRef.current < 72) pctRef.current = Math.min(72, pctRef.current + 2);
        setBytes(bytesRef.current);
        setPct(pctRef.current);
      }, 70);
      return () => clearInterval(t);
    }
    if (step === 6) {
      const t = setInterval(() => {
        if (pctRef.current < 96) pctRef.current = Math.min(96, pctRef.current + 3);
        setPct(pctRef.current);
      }, 70);
      return () => clearInterval(t);
    }
  }, [step, started]);

  const resetSim = useCallback(() => {
    setRunning(false);
    turboRef.current = false;
    setMs(BASE_MS);
    stepRef.current = 0;
    startedRef.current = false;
    runIdRef.current = 0;
    cacheRef.current = "COLD";
    pruneRef.current = null;
    bytesRef.current = 0;
    bytesTargetRef.current = 0;
    pctRef.current = 0;
    queryIdRef.current = "—";
    logRef.current = [
      { id: logIdRef.current++, text: `[${logTs()}] > engine reset — buffers cleared · data cache COLD`, tone: "dim" },
    ];
    flush();
    resetRunner();
  }, [flush, resetRunner]);

  const fastForward = useCallback(() => {
    turboRef.current = true;
    setMs(TURBO_MS);
    setRunning(true);
  }, []);

  const selectClient = useCallback(
    (id: ClientId) => {
      if (clientRef.current === id) return;
      clientRef.current = id;
      setClient(id);
      if (startedRef.current) {
        const cl = CLIENTS.find((x) => x.id === id) ?? CLIENTS[0];
        pushLog(`> client endpoint switched → ${cl.label}`, "dim");
        setLog([...logRef.current]);
      }
    },
    [pushLog]
  );

  /* ───────────────────────── derived view state ───────────────────────── */

  const s = step;
  const selected = client;

  const clientStatus = (id: ClientId): NodeStatus => {
    if (selected !== id) return "idle";
    if (s === 0) return "active";
    if (s === 7) return "success";
    return "cyber";
  };
  const clientLink = (id: ClientId): "idle" | "flowing" | "success" => {
    if (selected !== id) return "idle";
    if (s === 0) return "flowing";
    if (s === 7) return "success";
    return "idle";
  };
  const brainWh: "idle" | "flowing" | "success" = s === 2 || s === 3 ? "flowing" : s >= 4 ? "success" : "idle";
  const whSt: "idle" | "flowing" | "success" = s === 4 || s === 5 ? "flowing" : s === 6 || s === 7 ? "success" : "idle";
  const metaSt: "idle" | "cyber" = s === 3 ? "cyber" : "idle";

  const brainRowState = (row: number): "idle" | "active" | "done" => {
    if (!started) return "idle";
    if (s === 7) return "done";
    if (row === 0) return s === 1 || s === 2 ? "active" : s >= 3 ? "done" : "idle";
    if (row === 1) return s === 3 ? "active" : s >= 4 ? "done" : "idle";
    if (row === 2) return s === 0 ? "active" : s >= 1 ? "done" : "idle";
    return s === 5 || s === 6 ? "active" : "idle";
  };

  const nodeStatus = (n: number): NodeStatus => {
    if (!started) return "idle";
    if (s === 5) return pct > [0, 18, 36][n] ? "active" : "idle";
    if (s >= 6) return "success";
    return "idle";
  };
  const nodePulse = (n: number): boolean =>
    (s === 5 && nodeStatus(n) === "active") || (s === 6 && n === 1);
  const nodeGlow = (n: number): boolean => s === 5 || (s >= 6 && nodeStatus(n) === "success");

  const whStatus = !started ? "IDLE" : s === 5 ? "EXECUTING" : s === 6 ? "AGGREGATING" : s === 7 ? "RESULT OUT" : "ACTIVE";
  const whStatusCls = !started
    ? "text-muted-foreground"
    : s === 7
      ? "text-mint"
      : s === 5 || s === 6
        ? "text-snow"
        : "text-foreground/60";

  const cacheBadge = !started
    ? { text: "IDLE", cls: "border-foreground/25 text-muted-foreground bg-black/40" }
    : cacheState === "HOT"
      ? { text: "HOT", cls: "border-mint/60 text-mint bg-mint/10" }
      : { text: "COLD", cls: "border-magenta/60 text-magenta bg-magenta/10" };
  const cacheNote =
    s === 4 ? (cacheState === "HOT" ? "PROBE: HIT" : "PROBE: MISS") : s === 5 ? (cacheState === "HOT" ? "SERVING FROM SSD" : "STREAMING FROM S3") : "";

  const sortedScanned = prune ? [...prune.scanned].sort((a, b) => a - b) : [];
  const partState = (i: number): "idle" | "pruned" | "cand" | "scanning" | "done" => {
    if (!started || s < 3) return "idle";
    const isScan = !!prune && prune.scanned.includes(i);
    if (s === 3 || s === 4) return isScan ? "cand" : "pruned";
    if (s === 5) {
      if (!isScan) return "pruned";
      const idx = sortedScanned.indexOf(i);
      const len = Math.max(1, sortedScanned.length);
      return pct >= ((idx + 1) / len) * 72 ? "scanning" : "cand";
    }
    return isScan ? "done" : "pruned";
  };

  const links = (
    <>
      <FlowLink d="M22 13.5 C22 19 38 18.5 38 23.5" status={clientLink("snowsql")} dotDuration={1.1} showArrow strokeWidth={1.2} />
      <FlowLink d="M50 13.5 L50 23.5" status={clientLink("notebook")} dotDuration={1} showArrow strokeWidth={1.2} />
      <FlowLink d="M78 13.5 C78 19 62 18.5 62 23.5" status={clientLink("bi")} dotDuration={1.2} showArrow strokeWidth={1.2} />
      <FlowLink d="M50 42.5 L50 53" status={brainWh} dotDuration={1.2} showArrow strokeWidth={1.2} />
      <FlowLink d="M50 65.5 L50 80" status={whSt} dotDuration={1.2} showArrow strokeWidth={1.2} />
      <FlowLink d="M64 38 C82 46 80 68 64 80" status={metaSt} dashed dot={s === 3} dotDuration={1.6} strokeWidth={1} />
    </>
  );

  return (
    <div className="flex flex-col gap-4">
      <UseCaseShell
        title="FLOW VIEW // QUERY LIFECYCLE"
        subtitle="CLIENT → CLOUD SERVICES → VIRTUAL WAREHOUSE → MICRO-PARTITION STORAGE"
        stats={
          <>
            <UCStat label="QUERY LIFECYCLE" value={started ? STEPS[s].label : "STANDBY"} />
            <UCStat label="BYTES SCANNED" value={fmtBytes(bytes)} />
            <UCStat label="PARTITIONS PRUNED" value={prune ? `${prune.pruned}/${TOTAL_PARTS}` : `0/${TOTAL_PARTS}`} tone="magenta" />
            <UCStat
              label="CACHE STATE"
              value={started ? cacheState : "—"}
              tone={cacheState === "HOT" ? "mint" : started ? "magenta" : "neutral"}
            />
            <UCStat label="EXECUTION" value={`${pct}%`} tone="neon" />
            <UCStat label="QUERY ID" value={queryId} tone="neutral" />
          </>
        }
        controls={
          <>
            <SimControls
              running={running}
              onToggle={() => setRunning((r) => !r)}
              onReset={resetSim}
              status={!started ? "ENGINE IDLE — PRESS RUN" : running ? `LIVE // ${STEPS[s].label}` : `PAUSED // ${STEPS[s].label}`}
              hint="LOOP ≈10.8S · SECOND PASS READS FROM WARM CACHE · CLICK ANY CLIENT NODE"
            />
            <UCButton onClick={fastForward} tone="magenta" ariaLabel="Fast-forward the query lifecycle to the result">
              <FastForward className="w-3 h-3" />
              FAST-FORWARD → RESULT
            </UCButton>
          </>
        }
        logLines={log}
        logTitle="LIFECYCLE LOG // LIVE"
        logEmpty="PRESS RUN TO FIRE A QUERY THROUGH THE THREE LAYERS…"
        stageClass="h-[540px] sm:h-[560px] lg:h-[620px]"
      >
        <FlowCanvas className="h-full" links={links} ariaLabel="Snowflake query lifecycle flowing through client, cloud services, virtual warehouse and storage layers">
          <FlowLabel x={50} y={3} tone="snow">01 // CLIENT CONNECTORS — SUBMIT</FlowLabel>

          {/* ── CLIENT LAYER ── */}
          {CLIENTS.map((c, i) => {
            const Icon = c.icon;
            return (
              <FlowNode
                key={c.id}
                x={c.x}
                y={11}
                icon={<Icon className="w-3 h-3" />}
                label={c.label}
                sub={c.sub}
                status={clientStatus(c.id)}
                pulse={selected === c.id && s === 0}
                active={selected === c.id && (s === 0 || s === 7)}
                onClick={() => selectClient(c.id)}
                size="sm"
                delay={0.1 + i * 0.08}
              />
            );
          })}

          {/* ── CLOUD SERVICES — THE BRAIN ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="absolute z-10 -translate-x-1/2 -translate-y-1/2 glass cyber-cut p-2 w-[70%]"
            style={{ left: "50%", top: "33%" }}
          >
            <div className="flex items-center justify-between px-1 pb-1">
              <span className="flex items-center gap-1.5 text-[8px] font-bold uppercase tracking-[0.16em] text-snow">
                <CloudIcon className="w-3 h-3" /> L2 // CLOUD SERVICES — THE BRAIN
              </span>
              <span className="relative flex w-1.5 h-1.5">
                {started && s < 7 && <span className="absolute inline-flex w-full h-full bg-mint ping-ring" aria-hidden="true" />}
                <span className={`relative w-1.5 h-1.5 ${started && s < 7 ? "bg-mint" : "bg-foreground/30"}`} />
              </span>
            </div>
            <div className="flex flex-col gap-1">
              {BRAIN_ROWS.map((row, i) => {
                const st = brainRowState(i);
                return (
                  <div
                    key={row.name}
                    className={`flex items-center justify-between gap-2 min-h-[22px] px-1.5 border transition-colors duration-300 ${ROW_CLS[st]}`}
                  >
                    <span className="flex flex-col leading-none min-w-0">
                      <span className="text-[7px] font-bold tracking-wider truncate">{row.name}</span>
                      <span className="text-[6px] tracking-wider text-muted-foreground truncate">{row.note}</span>
                    </span>
                    <span
                      className={`shrink-0 text-[6px] font-extrabold tracking-[0.15em] ${
                        st === "active" ? "text-snow" : st === "done" ? "text-mint" : "text-foreground/25"
                      }`}
                    >
                      {st === "active" ? "RUN" : st === "done" ? "OK" : "··"}
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* ── VIRTUAL WAREHOUSE — MPP COMPUTE ── */}
          <div
            className="absolute z-10 -translate-x-1/2 -translate-y-1/2 glass-inset cyber-cut w-[62%] h-[88px]"
            style={{ left: "50%", top: "59%" }}
          >
            <div className="absolute top-1 inset-x-2 flex items-center justify-between gap-2">
              <span className="flex items-center gap-1.5 text-[7.5px] font-bold uppercase tracking-[0.16em] text-snow min-w-0">
                <ComputeIcon className="w-2.5 h-2.5 shrink-0" />
                <span className="truncate">L3 // VIRTUAL WAREHOUSE · WH_CALC_XS</span>
              </span>
              <span className={`shrink-0 text-[6.5px] font-bold tracking-[0.15em] ${whStatusCls}`}>
                {whStatus} · XS · 1 CR/HR
              </span>
            </div>
            <div className="absolute bottom-1 inset-x-2 border border-snow/20 bg-black/50 px-2 py-1 flex items-center gap-2">
              <span className="text-[6.5px] font-bold tracking-[0.15em] text-muted-foreground uppercase shrink-0">EXECUTION</span>
              <div className="flex-1 h-1 bg-foreground/10 overflow-hidden">
                <div className="h-full bg-snow transition-[width] duration-150" style={{ width: `${started ? pct : 0}%` }} />
              </div>
              <span className="text-[6.5px] font-extrabold text-snow tabular-nums shrink-0">{started ? pct : 0}%</span>
            </div>
          </div>
          {WH_NODES.map((n, i) => (
            <FlowNode
              key={n.label}
              x={n.x}
              y={57.5}
              icon={<ComputeIcon className="w-3 h-3" />}
              label={n.label}
              sub="MPP"
              status={nodeStatus(i)}
              pulse={nodePulse(i)}
              active={nodeGlow(i)}
              size="sm"
              delay={0.38 + i * 0.08}
            />
          ))}

          {/* ── STORAGE — MICRO-PARTITIONS + CACHE ── */}
          <div
            className="absolute z-10 -translate-x-1/2 -translate-y-1/2 glass-inset cyber-cut w-[66%] h-[84px] p-1.5 flex flex-col gap-1"
            style={{ left: "50%", top: "86.5%" }}
          >
            <div className="flex items-center justify-between gap-2 px-0.5">
              <span className="flex items-center gap-1.5 text-[7.5px] font-bold uppercase tracking-[0.16em] text-snow min-w-0">
                <DatabaseIcon className="w-2.5 h-2.5 shrink-0" />
                <span className="truncate">L4 // S3-BACKED STORAGE · ANALYTICS.ORDERS</span>
              </span>
              <span className="shrink-0 text-[6.5px] tracking-[0.15em] text-muted-foreground font-bold">
                {TOTAL_PARTS} MICRO-PARTITIONS
              </span>
            </div>
            <div className="flex-1 grid grid-cols-6 gap-1 min-h-0">
              {Array.from({ length: TOTAL_PARTS }, (_, i) => {
                const st = partState(i);
                return (
                  <div
                    key={i}
                    className={`border px-0.5 flex flex-col items-center justify-center leading-none transition-colors duration-300 ${PART_CLS[st]}`}
                    title={`Micro-partition MP-${String(i + 1).padStart(2, "0")} · ~82MB compressed · 128K rows`}
                  >
                    <span className="text-[6.5px] font-bold tracking-wider">MP-{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-[5.5px] opacity-70">82MB·128K</span>
                  </div>
                );
              })}
            </div>
            <div className="flex items-center justify-between border border-snow/20 bg-black/50 px-2 py-1">
              <span className="flex items-center gap-1.5 text-[6.5px] font-bold uppercase tracking-[0.15em] text-muted-foreground min-w-0">
                <StorageIcon className="w-2.5 h-2.5 shrink-0" />
                <span className="truncate">DATA CACHE · WAREHOUSE LOCAL SSD</span>
              </span>
              <span className="flex items-center gap-1.5 shrink-0">
                {cacheNote && <span className="text-[6px] tracking-[0.15em] text-neon font-bold">{cacheNote}</span>}
                <span className={`text-[6.5px] font-extrabold px-1 py-0.5 border tracking-[0.15em] ${cacheBadge.cls}`}>
                  {cacheBadge.text}
                </span>
              </span>
            </div>
          </div>

          {/* ── floating annotations ── */}
          <FlowLabel x={57.5} y={47.5} tone="snow">QUERY PLAN</FlowLabel>
          <FlowLabel x={58} y={72}>SCAN · CACHE PROBE</FlowLabel>
          <FlowLabel x={85} y={56} tone={s === 3 ? "magenta" : "default"}>PRUNING STATS</FlowLabel>
          <FlowLabel x={50} y={98}>STORAGE · COMPUTE · SERVICES — DECOUPLED &amp; INDEPENDENTLY SCALABLE</FlowLabel>

          <StepBadge step={s} total={STEP_COUNT} text={started ? STEPS[s].label : "STANDBY"} />
          <VerdictFlash show={started && s === 7} text="RESULT RETURNED" tone="ok" />
        </FlowCanvas>
      </UseCaseShell>

      {/* ── QUERY TEXT + KNOWLEDGE ── */}
      <div className="grid gap-4 lg:grid-cols-2 items-start">
        <GlassPanel title="QUERY TEXT" subtitle="ACTIVE LINE TRACKS THE ENGINE PHASE" className="!p-0" delay={0.22}>
          <div className="p-3 flex flex-col gap-2">
            <div className="glass-inset cyber-cut-sm cyber-scroll overflow-x-auto p-1.5 flex flex-col">
              {SQL_LINES.map((ln, i) => {
                const activeLine = started && LINE_FOR_STEP[s] === i;
                return (
                  <div
                    key={i}
                    className={`flex items-baseline gap-2 px-1.5 py-[3px] border-l-2 transition-colors duration-300 ${
                      activeLine ? "border-snow bg-snow/10" : "border-transparent"
                    }`}
                  >
                    <span
                      className={`text-[8px] tabular-nums w-4 text-right shrink-0 ${
                        activeLine ? "text-snow/70" : "text-foreground/25"
                      }`}
                    >
                      {i + 1}
                    </span>
                    <pre
                      className={`sql-code text-[9px] sm:text-[9.5px] whitespace-pre font-medium ${
                        activeLine ? "text-snow" : "text-foreground/55"
                      }`}
                    >
                      {highlightSql(ln)}
                    </pre>
                  </div>
                );
              })}
            </div>
            <div className="flex items-center justify-between gap-2 text-[8px] uppercase tracking-[0.2em] text-muted-foreground font-bold">
              <span className="truncate">ROLE: SYSADMIN · WH: WH_CALC_XS</span>
              <span className={`shrink-0 ${started ? "text-mint" : ""}`}>
                {started ? `PHASE: ${STEPS[s].id}` : "PHASE: STANDBY"}
              </span>
            </div>
          </div>
        </GlassPanel>

        <div className="flex flex-col gap-3">
          <Callout type="tip" title="Why pruning matters" delay={0.26}>
            Cloud services keeps min/max metadata for every column inside every micro-partition. The predicate{" "}
            <span className="text-snow">order_date &gt;= &apos;2025-01-01&apos;</span> eliminates{" "}
            <span className="text-magenta">{prune ? prune.pruned : 8} of {TOTAL_PARTS}</span> partitions before a single
            byte is read — less I/O, fewer credits burned, and sub-second scans over terabyte tables.
          </Callout>
          <Callout type="info" title="Warehouse isolation" delay={0.3}>
            N1·N2·N3 belong to <span className="text-snow">WH_CALC_XS</span> alone — MPP compute never contends with other
            teams&apos; warehouses. A runaway query slows only its own cluster; spin up a second warehouse and it reads the
            exact same S3-backed storage with zero data copies and zero contention.
          </Callout>
        </div>
      </div>
    </div>
  );
}
