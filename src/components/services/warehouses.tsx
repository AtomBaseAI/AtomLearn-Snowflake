"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Layers } from "lucide-react";
import {
  UseCaseShell,
  UCStat,
  UCToggle,
  UCButton,
  VerdictFlash,
  StepBadge,
  UseCaseNote,
  useScenarioRunner,
} from "@/components/shared/use-case";
import { FlowCanvas, FlowLink, FlowLabel } from "@/components/shared/flow";
import { Callout } from "@/components/shared/callout";
import { SimControls } from "@/components/shared/sim-controls";
import { SqlCodeBlock } from "@/components/shared/sql-code-block";
import { logTs, type AutoLogLine } from "@/components/shared/auto-log";
import { WarehouseIcon, QueryIcon, ComputeIcon, SparkIcon } from "@/components/shared/snowflake-icons";

/* ------------------------------------------------------------------ */
/* types + static data                                                 */
/* ------------------------------------------------------------------ */

type WhSize = "XS" | "S" | "M" | "L";
type WhState = "RUNNING" | "SUSPENDED" | "RESUMING" | "SCALING";

interface Q {
  id: string;
  state: "queued" | "running" | "done";
  node: number;
  cluster: 1 | 2;
  prog: number; // 0-100
  ms: number; // simulated exec time
}

interface NodeS {
  q: Q | null;
  flash: number; // ticks of success flash after completion
}

const SIZE_ORDER: readonly WhSize[] = ["XS", "S", "M", "L"] as const;

const SIZE_CONF: Record<WhSize, { nodes: number; credits: number }> = {
  XS: { nodes: 1, credits: 1 },
  S: { nodes: 2, credits: 2 },
  M: { nodes: 4, credits: 4 },
  L: { nodes: 8, credits: 8 },
};

const STEPS = 8;
const STEP_MS = 1100;
const SIM_SEC_PER_STEP = 90; // simulated seconds billed per tick
const IDLE_TO_SUSPEND = 3; // idle ticks before auto-suspend (~"60s")
const QUEUE_CAP = 6;
const ARRIVAL_P = 0.78;

const STEP_TEXT = [
  "INTAKE",
  "QUEUEING",
  "DISPATCH",
  "MPP FAN-OUT",
  "PARALLEL SCAN",
  "AGGREGATE",
  "RESULTS RETURN",
  "SETTLE",
];

const WH_SQL = `CREATE WAREHOUSE WH_MAIN
  WAREHOUSE_SIZE    = 'MEDIUM'  -- XS 1 cr/hr -> L 8 cr/hr
  MIN_CLUSTER_COUNT = 1
  MAX_CLUSTER_COUNT = 2         -- scale-out headroom
  AUTO_SUSPEND      = 60        -- seconds of idle
  AUTO_RESUME       = TRUE
  SCALING_POLICY    = 'STANDARD';`;

interface World {
  size: WhSize;
  qid: number;
  queries: Q[];
  n1: NodeS[];
  n2: NodeS[];
  wh: WhState;
  clusters: 1 | 2;
  credits: number;
  idle: number;
  avgMs: number;
  done: number;
  scaleArmed: boolean;
  scalePending: boolean;
  releasePending: boolean;
  c2Idle: number;
}

interface Snapshot {
  size: WhSize;
  queue: Q[];
  n1: NodeS[];
  n2: NodeS[];
  results: Q[];
  wh: WhState;
  clusters: 1 | 2;
  credits: number;
  idle: number;
  avgMs: number;
  done: number;
}

/* ------------------------------------------------------------------ */
/* sim factory helpers                                                 */
/* ------------------------------------------------------------------ */

const makeNodes = (n: number): NodeS[] => Array.from({ length: n }, () => ({ q: null, flash: 0 }));

const mkQuery = (w: World): Q => ({
  id: `Q-${w.qid++}`,
  state: "queued",
  node: -1,
  cluster: 1,
  prog: 0,
  ms: 800 + Math.round(Math.random() * 1700),
});

const makeWorld = (size: WhSize): World => {
  const w: World = {
    size,
    qid: 1042,
    queries: [],
    n1: makeNodes(SIZE_CONF[size].nodes),
    n2: makeNodes(SIZE_CONF[size].nodes),
    wh: "SUSPENDED",
    clusters: 1,
    credits: 0,
    idle: 0,
    avgMs: 0,
    done: 0,
    scaleArmed: false,
    scalePending: false,
    releasePending: false,
    c2Idle: 0,
  };
  for (let i = 0; i < 3; i++) w.queries.push(mkQuery(w)); // seed intake
  return w;
};

const takeSnapshot = (w: World): Snapshot => ({
  size: w.size,
  queue: w.queries.filter((q) => q.state === "queued"),
  n1: w.n1.map((n) => ({ q: n.q ? { ...n.q } : null, flash: n.flash })),
  n2: w.n2.map((n) => ({ q: n.q ? { ...n.q } : null, flash: n.flash })),
  results: w.queries.filter((q) => q.state === "done").slice(-5).reverse(),
  wh: w.wh,
  clusters: w.clusters,
  credits: w.credits,
  idle: w.idle,
  avgMs: w.avgMs,
  done: w.done,
});

const colsFor = (nodes: number): number => (nodes <= 2 ? nodes : nodes === 4 ? 2 : 4);

/* ------------------------------------------------------------------ */
/* NodeTile — glass MPP node with animated load bar                    */
/* ------------------------------------------------------------------ */

function NodeTile({ n, idx, accent, suspended }: { n: NodeS; idx: number; accent: "snow" | "magenta"; suspended: boolean }) {
  const q = n.q;
  const active = !!q;
  const prog = q ? Math.round(q.prog) : 0;
  const border = n.flash > 0
    ? "border-mint/70 shadow-[0_0_12px_rgba(0,255,163,0.3)]"
    : active
      ? accent === "magenta"
        ? "border-magenta/70 shadow-[0_0_12px_rgba(255,45,120,0.25)]"
        : "border-snow/70 box-glow"
      : "border-foreground/20";
  return (
    <div className={`relative flex flex-col justify-between gap-0.5 border bg-black/50 px-1 py-1 min-h-[30px] ${border} ${suspended ? "opacity-40" : ""}`}>
      <div className="flex items-center justify-between">
        <span className="text-[6.5px] font-extrabold tracking-[0.15em] text-foreground/80">N{idx + 1}</span>
        {n.flash > 0 ? (
          <Check className="w-2.5 h-2.5 text-mint" aria-hidden="true" />
        ) : active ? (
          <span className={`w-1 h-1 ping-ring ${accent === "magenta" ? "bg-magenta" : "bg-snow"}`} aria-hidden="true" />
        ) : (
          <span className="w-1 h-1 bg-foreground/30" aria-hidden="true" />
        )}
      </div>
      <span className={`text-[6px] tracking-wider truncate ${active ? (accent === "magenta" ? "text-magenta" : "text-snow") : "text-muted-foreground/50"}`}>
        {q ? q.id : "IDLE"}
      </span>
      <div className="h-1 border border-snow/10 bg-black/70 overflow-hidden">
        <motion.div
          className={`h-full ${n.flash > 0 ? "bg-mint" : accent === "magenta" ? "bg-magenta" : "bg-snow"}`}
          initial={false}
          animate={{ width: `${active ? prog : 0}%` }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        />
      </div>
      <span className="text-[5.5px] tabular-nums text-right text-muted-foreground">{active ? `${prog}%` : "—"}</span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* VIRTUAL WAREHOUSES — queue → MPP cluster → results                  */
/* ------------------------------------------------------------------ */

export default function WarehousesModule() {
  const [running, setRunning] = useState(false);
  const [scaleOn, setScaleOn] = useState(false);
  const [size, setSize] = useState<WhSize>("M");
  const [immersive, setImmersive] = useState(false);
  const [flash, setFlash] = useState<{ text: string; tone: "ok" | "deny" | "snow"; key: number } | null>(null);
  const [logs, setLogs] = useState<AutoLogLine[]>([
    { id: 0, text: `${logTs()} WH_MAIN PROVISIONED — SIZE M · 4 NODES · SUSPENDED`, tone: "dim" },
  ]);

  const worldRef = useRef<World>(makeWorld("M"));
  const [snap, setSnap] = useState<Snapshot>(() => takeSnapshot(makeWorld("M")));

  const logIdRef = useRef(1);
  const timersRef = useRef<number[]>([]);
  useEffect(() => () => timersRef.current.forEach((t) => window.clearTimeout(t)), []);
  const later = (fn: () => void, ms: number) => {
    const id = window.setTimeout(fn, ms);
    timersRef.current.push(id);
  };

  const pushLogs = (drafts: Array<{ text: string; tone: string }>) => {
    if (!drafts.length) return;
    setLogs((prev) =>
      [...prev, ...drafts.map((d) => ({ id: logIdRef.current++, text: `${logTs()} ${d.text}`, tone: d.tone }))].slice(-50)
    );
  };

  const doFlash = (text: string, tone: "ok" | "deny" | "snow") => {
    setFlash({ text, tone, key: Date.now() });
    later(() => setFlash(null), 1500);
  };

  /* ── one warehouse tick: arrivals → scale-out → dispatch → exec → credits → suspend ── */
  const onTick = () => {
    const w = worldRef.current;
    const draft: Array<{ text: string; tone: string }> = [];

    /* 1 · auto-resume completes */
    if (w.wh === "RESUMING") {
      w.wh = "RUNNING";
      draft.push({ text: "WAREHOUSE RUNNING — LOCAL CACHE WARMED", tone: "mint" });
    }

    /* 2 · query arrivals */
    const queuedNow = w.queries.filter((q) => q.state === "queued").length;
    if (queuedNow < QUEUE_CAP && Math.random() < ARRIVAL_P) {
      const q = mkQuery(w);
      w.queries.push(q);
      draft.push({ text: `QUERY ${q.id} SUBMITTED → QUEUE`, tone: "dim" });
      if (w.wh === "SUSPENDED") {
        w.wh = "RESUMING";
        draft.push({ text: "AUTO-RESUME — QUERY RECEIVED, SPINNING UP", tone: "neon" });
        doFlash("RESUMING", "snow");
      }
    }

    /* 3 · multi-cluster scale-out state machine */
    const queueDepth = w.queries.filter((q) => q.state === "queued").length;
    if (w.releasePending && w.n2.every((n) => !n.q)) {
      w.releasePending = false;
      if (w.clusters === 2) {
        w.clusters = 1;
        draft.push({ text: "CLUSTER 2 RELEASED — BACK TO 1 CLUSTER", tone: "dim" });
      }
    }
    if (!w.scaleArmed && w.clusters === 2 && !w.releasePending) {
      if (w.n2.every((n) => !n.q)) {
        w.clusters = 1;
        w.c2Idle = 0;
        draft.push({ text: "SCALE-OUT OFF — CLUSTER 2 DRAINED & RELEASED", tone: "dim" });
      } else {
        w.releasePending = true;
      }
    }
    /* scale-in — cluster 2 lingers briefly after the queue drains, then releases */
    if (w.scaleArmed && w.clusters === 2 && !w.releasePending) {
      if (queueDepth === 0 && w.n2.every((n) => !n.q)) {
        w.c2Idle += 1;
        if (w.c2Idle >= 2) {
          w.c2Idle = 0;
          w.clusters = 1;
          draft.push({ text: "SCALE-IN — QUEUE DRAINED, CLUSTER 2 RELEASED", tone: "dim" });
        }
      } else {
        w.c2Idle = 0;
      }
    }
    if (w.scaleArmed && w.clusters === 1 && !w.scalePending && w.wh === "RUNNING" && queueDepth >= 3) {
      w.scalePending = true;
      w.wh = "SCALING";
      draft.push({ text: `QUEUE ${queueDepth} ≥ 3 — SCALE-OUT TRIGGERED`, tone: "magenta" });
    }
    if (w.scalePending && w.wh === "SCALING") {
      w.scalePending = false;
      w.clusters = 2;
      w.wh = "RUNNING";
      draft.push({ text: "SCALE-OUT: CLUSTER 2 ONLINE — DRAINING QUEUE", tone: "magenta" });
      doFlash("CLUSTER 2 ONLINE", "snow");
    }

    /* 4 · dispatch queued queries onto free MPP nodes (cluster 1 first) */
    if (w.wh === "RUNNING" || w.wh === "SCALING") {
      for (const q of w.queries) {
        if (q.state !== "queued") continue;
        let idx = w.n1.findIndex((n) => !n.q);
        let arr = w.n1;
        let cluster: 1 | 2 = 1;
        if (idx < 0 && w.clusters === 2) {
          idx = w.n2.findIndex((n) => !n.q);
          arr = w.n2;
          cluster = 2;
        }
        if (idx < 0) break;
        q.state = "running";
        q.cluster = cluster;
        q.node = idx;
        arr[idx].q = q;
        draft.push({ text: `QUERY ${q.id} ASSIGNED → ${cluster === 2 ? "C2·" : ""}NODE N${idx + 1}`, tone: "snow" });
      }
    }

    /* 5 · parallel execution — every busy node advances its query */
    let anyBusy = false;
    const runNodes = (arr: NodeS[]) => {
      arr.forEach((n) => {
        if (n.flash > 0) n.flash -= 1;
        if (!n.q) return;
        anyBusy = true;
        n.q.prog = Math.min(100, n.q.prog + 26 + Math.random() * 22);
        if (n.q.prog >= 100) {
          const q = n.q;
          q.state = "done";
          w.done += 1;
          w.avgMs = w.avgMs === 0 ? q.ms : w.avgMs * 0.55 + q.ms * 0.45;
          draft.push({ text: `${q.id} COMPLETE IN ${(q.ms / 1000).toFixed(1)}S → RESULTS`, tone: "mint" });
          n.q = null;
          n.flash = 2;
        }
      });
    };
    runNodes(w.n1);
    if (w.clusters === 2) runNodes(w.n2);

    /* 6 · credit burn — per second, per running cluster */
    if (w.wh !== "SUSPENDED") {
      const clustersActive = w.clusters + (w.wh === "SCALING" ? 1 : 0);
      w.credits += (SIZE_CONF[w.size].credits * clustersActive * SIM_SEC_PER_STEP) / 3600;
    }

    /* 7 · auto-suspend after sustained idle */
    const queuedLeft = w.queries.some((q) => q.state === "queued");
    if (w.wh === "RUNNING" && !anyBusy && !queuedLeft) {
      w.idle += 1;
      if (w.idle === 1) draft.push({ text: "IDLE — AUTO-SUSPEND COUNTDOWN 60s", tone: "dim" });
      if (w.idle >= IDLE_TO_SUSPEND) {
        w.wh = "SUSPENDED";
        w.idle = 0;
        w.clusters = 1;
        w.scalePending = false;
        draft.push({ text: "AUTO-SUSPEND AFTER 60s IDLE — CREDITS HALTED", tone: "danger" });
        doFlash("SUSPENDED", "deny");
      }
    } else if (w.wh !== "SUSPENDED") {
      w.idle = 0;
    }

    /* 8 · keep the query ledger light */
    if (w.queries.length > 24) {
      w.queries = w.queries.filter((q) => q.state !== "done").concat(w.queries.filter((q) => q.state === "done").slice(-5));
    }

    setSnap(takeSnapshot(w));
    pushLogs(draft);
  };

  const { step, reset: resetRunner } = useScenarioRunner(STEPS, running, STEP_MS, onTick);

  /* ── handlers ── */

  const toggleRun = () => {
    if (running) {
      setRunning(false);
    } else {
      setRunning(true);
      pushLogs([{ text: `SIM ENGINE START — TICK ${STEP_MS}MS · ${STEPS} STEPS`, tone: "snow" }]);
    }
  };

  const changeSize = (s: WhSize) => {
    const w = worldRef.current;
    const conf = SIZE_CONF[s];
    if (w.size === s) return;
    w.size = s;
    w.queries = [];
    w.n1 = makeNodes(conf.nodes);
    w.n2 = makeNodes(conf.nodes);
    w.wh = "SUSPENDED";
    w.clusters = 1;
    w.credits = 0;
    w.idle = 0;
    w.avgMs = 0;
    w.done = 0;
    w.scalePending = false;
    w.releasePending = false;
    w.c2Idle = 0;
    for (let i = 0; i < 3; i++) w.queries.push(mkQuery(w));
    setSize(s);
    setScaleOn(false);
    setSnap(takeSnapshot(w));
    resetRunner();
    pushLogs([{ text: `RESIZE → ${s} — SIM RESET · ${conf.nodes} NODES · ${conf.credits} CR/HR`, tone: "snow" }]);
  };

  const toggleScale = () => {
    const w = worldRef.current;
    const v = !w.scaleArmed;
    w.scaleArmed = v;
    setScaleOn(v);
    pushLogs([
      {
        text: v
          ? "SCALE-OUT ARMED — CLUSTER 2 JOINS AT QUEUE ≥ 3"
          : "SCALE-OUT DISARMED — CLUSTER 2 WILL DRAIN & EXIT",
        tone: v ? "magenta" : "dim",
      },
    ]);
  };

  const fullReset = () => {
    const w = worldRef.current;
    const armed = w.scaleArmed;
    const keepSize = w.size;
    worldRef.current = makeWorld(keepSize);
    worldRef.current.scaleArmed = armed;
    setScaleOn(armed);
    setRunning(false);
    setFlash(null);
    setLogs([{ id: logIdRef.current++, text: `${logTs()} SIM RESET — QUEUE RESEEDED · SIZE ${keepSize}`, tone: "dim" }]);
    setSnap(takeSnapshot(worldRef.current));
    resetRunner();
  };

  /* ── derived render data ── */

  const conf = SIZE_CONF[snap.size];
  const cols = colsFor(conf.nodes);
  const suspended = snap.wh === "SUSPENDED";
  const live = running && !suspended;
  const c2Live = snap.clusters === 2;
  const activeQ = snap.n1.filter((n) => n.q).length + (c2Live ? snap.n2.filter((n) => n.q).length : 0);
  const c1Flash = snap.n1.some((n) => n.flash > 0);

  const whBadgeCls =
    snap.wh === "RUNNING"
      ? "border-mint/60 text-mint"
      : snap.wh === "SUSPENDED"
        ? "border-danger/60 text-danger"
        : snap.wh === "SCALING"
          ? "border-magenta/60 text-magenta"
          : "border-neon/60 text-neon";

  const stats = (
    <>
      <UCStat
        label="STATE"
        value={snap.wh}
        tone={snap.wh === "RUNNING" ? "mint" : snap.wh === "SUSPENDED" ? "danger" : snap.wh === "SCALING" ? "magenta" : "neon"}
      />
      <UCStat label="CLUSTERS" value={c2Live ? "2 · SCALED OUT" : "1"} tone={c2Live ? "magenta" : "neutral"} delay={0.05} />
      <UCStat label="ACTIVE QUERIES" value={String(activeQ)} tone="snow" delay={0.1} />
      <UCStat
        label="QUEUE DEPTH"
        value={String(snap.queue.length)}
        tone={snap.queue.length >= 3 ? "magenta" : snap.queue.length > 0 ? "neon" : "neutral"}
        delay={0.15}
      />
      <UCStat label="CREDITS BURNED" value={snap.credits.toFixed(2)} tone="magenta" delay={0.2} />
      <UCStat label="AVG EXEC" value={snap.avgMs > 0 ? `${Math.round(snap.avgMs)} MS` : "—"} tone="snow" delay={0.25} />
      <UCStat label="SIZE" value={`${snap.size} · ${conf.nodes} NODES`} tone="neutral" delay={0.3} />
      <UCStat label="COMPLETED" value={String(snap.done)} tone="mint" delay={0.35} />
    </>
  );

  const controls = (
    <>
      <SimControls
        running={running}
        onToggle={toggleRun}
        onReset={fullReset}
        status={`WH ${snap.size} · ${conf.nodes} NODES · ${conf.credits} CR/HR — ${snap.wh}${c2Live ? " · ×2 CLUSTERS" : ""}`}
        hint={`1 TICK ≈ ${SIM_SEC_PER_STEP}s SIM TIME · ${IDLE_TO_SUSPEND} IDLE TICKS = AUTO-SUSPEND · RESIZE RESETS`}
      />
      <p className="text-[8px] font-bold uppercase tracking-[0.25em] text-muted-foreground pt-1">WAREHOUSE SIZE</p>
      <div className="flex flex-wrap gap-1.5">
        {SIZE_ORDER.map((s) => (
          <UCButton
            key={s}
            tone={size === s ? "snow" : "neutral"}
            onClick={() => changeSize(s)}
            ariaLabel={size === s ? `Warehouse size ${s} active` : `Set warehouse size ${s} — ${SIZE_CONF[s].nodes} nodes, ${SIZE_CONF[s].credits} credits per hour`}
          >
            {s}
            <span className="text-[6.5px] text-muted-foreground">{SIZE_CONF[s].credits}CR</span>
          </UCButton>
        ))}
      </div>
      <UCToggle on={scaleOn} onClick={toggleScale} accent="magenta" ariaLabel="Toggle multi-cluster scale-out — cluster 2 joins when queue depth reaches 3">
        <Layers className="w-3 h-3" aria-hidden="true" />
        SCALE OUT {scaleOn ? "· ARMED" : "· OFF"}
      </UCToggle>
      {/* credit burn bar chart — credits/hour by size */}
      <div className="mt-1 pt-2 border-t border-snow/10">
        <div className="flex items-center justify-between">
          <p className="text-[8px] font-bold uppercase tracking-[0.25em] text-muted-foreground">CREDIT BURN / HR</p>
          <p className="text-[7px] font-bold tracking-[0.18em] text-magenta">×2 WHEN SCALED</p>
        </div>
        <div className="mt-2 flex items-end justify-between gap-2 h-[74px]">
          {SIZE_ORDER.map((s) => {
            const h = (SIZE_CONF[s].credits / 8) * 100;
            const cur = size === s;
            return (
              <div key={s} className="flex-1 h-full flex flex-col items-center justify-end gap-1">
                <span className={`text-[7px] font-extrabold tabular-nums ${cur ? "text-snow" : "text-muted-foreground/60"}`}>
                  {SIZE_CONF[s].credits}
                </span>
                <div className="w-full max-w-[26px] flex-1 flex items-end border-b border-snow/25">
                  <motion.div
                    className={`w-full ${cur ? "bg-snow box-glow" : "bg-foreground/25"}`}
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ type: "spring", stiffness: 120, damping: 18 }}
                  />
                </div>
                <span className={`text-[7px] font-extrabold tracking-[0.18em] ${cur ? "text-snow" : "text-muted-foreground/60"}`}>{s}</span>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );

  return (
    <div className="flex flex-col gap-4">
      <UseCaseShell
        title="VIRTUAL WAREHOUSES // MPP COMPUTE SIM"
        subtitle="QUEUE → MPP NODES → RESULTS — SIZING · SCALE-OUT · AUTO-SUSPEND · CREDIT BURN"
        immersiveActive={immersive}
        immersiveToggle={() => setImmersive((v) => !v)}
        stats={stats}
        controls={controls}
        logLines={logs}
      >
        <FlowCanvas className="h-full" ariaLabel="Virtual warehouse simulation: query queue feeding MPP compute clusters returning results">
          {/* LINKS — QUEUE → CLUSTER 1 */}
          <FlowLink d="M19.5,50 L29,50" status={live ? "flowing" : "idle"} dot={live} dotDuration={1.2} />
          {/* LINKS — QUEUE → CLUSTER 2 (dashed while armed, magenta when live) */}
          {scaleOn && (
            <FlowLink
              d="M19.5,42 C32,28 44,26 55.5,30"
              status={c2Live ? "cyber" : "idle"}
              dashed={!c2Live}
              dot={c2Live}
              dotDuration={1.4}
              dotDelay={0.2}
            />
          )}
          {/* LINKS — CLUSTER 1 → RESULTS */}
          <FlowLink
            d="M53.5,52 C66,68 76,64 85,58"
            status={c1Flash ? "success" : live ? "flowing" : "idle"}
            dot={live || c1Flash}
            dotDuration={1.6}
            dotDelay={0.3}
          />
          {/* LINKS — CLUSTER 2 → RESULTS */}
          {c2Live && <FlowLink d="M76,34 C82,40 84,48 85,54" status="cyber" dot dotDuration={1.5} dotDelay={0.4} />}

          {/* QUEUE COLUMN */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="absolute z-10 flex flex-col gap-1.5"
            style={{ left: "3%", top: "16%", width: "16%" }}
          >
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1 text-[7.5px] font-extrabold tracking-[0.18em] text-snow/90">
                <QueryIcon className="w-3 h-3" aria-hidden="true" /> QUEUE
              </span>
              <span
                className={`text-[7px] px-1 border font-extrabold tabular-nums ${
                  snap.queue.length >= 3 ? "border-magenta/60 text-magenta" : "border-foreground/20 text-muted-foreground"
                }`}
              >
                {snap.queue.length}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <AnimatePresence initial={false}>
                {snap.queue.map((q) => (
                  <motion.div
                    key={q.id}
                    layout
                    initial={{ opacity: 0, x: -14 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 16 }}
                    transition={{ duration: 0.22 }}
                    className="border border-neon/50 bg-neon/[0.05] px-1.5 py-1 flex items-center justify-between gap-1"
                  >
                    <span className="text-[7px] font-extrabold tracking-wider text-neon truncate">{q.id}</span>
                    <span className="text-[5.5px] tracking-[0.18em] text-muted-foreground">WAIT</span>
                  </motion.div>
                ))}
              </AnimatePresence>
              {snap.queue.length === 0 && (
                <div className="border border-dashed border-foreground/15 px-1.5 py-1.5 text-[6px] tracking-[0.18em] text-muted-foreground/60 text-center">
                  QUEUE EMPTY
                </div>
              )}
            </div>
            <p className="text-[6px] tracking-[0.18em] text-muted-foreground/70 uppercase">INCOMING QUERIES · CAP {QUEUE_CAP}</p>
          </motion.div>

          {/* WAREHOUSE CLUSTER 1 — MAIN MPP CLUSTER */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.25 }}
            className="absolute z-10"
            style={{ left: "29.5%", top: "22%", width: "24%", height: "56%" }}
          >
            <div className={`h-full glass-inset cyber-cut-sm p-2 flex flex-col gap-1.5 ${suspended ? "opacity-50 saturate-50" : ""}`}>
              <div className="flex items-center justify-between gap-1 border-b border-snow/15 pb-1">
                <span className="flex items-center gap-1 text-[7.5px] font-extrabold tracking-[0.18em] text-snow">
                  <WarehouseIcon className="w-3 h-3" aria-hidden="true" /> WH_MAIN
                </span>
                <span className={`text-[6.5px] px-1 py-0.5 border font-extrabold tracking-[0.15em] ${whBadgeCls}`}>{snap.wh}</span>
              </div>
              <div className="flex-1 grid gap-1.5" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0,1fr))` }}>
                {snap.n1.map((n, i) => (
                  <NodeTile key={i} n={n} idx={i} accent="snow" suspended={suspended} />
                ))}
              </div>
              <p className="text-[6px] tracking-[0.18em] text-muted-foreground uppercase text-center">
                MPP MULTI-CORE CLUSTER · {conf.nodes} SERVER{conf.nodes > 1 ? "S" : ""} · {conf.credits} CR/HR
              </p>
            </div>
          </motion.div>

          {/* WAREHOUSE CLUSTER 2 — SCALE-OUT (slides in on queue pressure) */}
          <AnimatePresence>
            {c2Live && (
              <motion.div
                key="wh-c2"
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 60 }}
                transition={{ type: "spring", stiffness: 120, damping: 18 }}
                className="absolute z-10"
                style={{ left: "56%", top: "16%", width: "20%", height: "44%" }}
              >
                <div className="h-full border border-magenta/40 bg-magenta/[0.03] cyber-cut-sm p-2 flex flex-col gap-1.5">
                  <div className="flex items-center justify-between gap-1 border-b border-magenta/25 pb-1">
                    <span className="flex items-center gap-1 text-[7.5px] font-extrabold tracking-[0.18em] text-magenta">
                      <ComputeIcon className="w-3 h-3" aria-hidden="true" /> WH_C2
                    </span>
                    <span className="text-[6px] px-1 border border-magenta/60 text-magenta font-extrabold tracking-[0.15em]">SCALE-OUT</span>
                  </div>
                  <div className="flex-1 grid gap-1.5" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0,1fr))` }}>
                    {snap.n2.map((n, i) => (
                      <NodeTile key={i} n={n} idx={i} accent="magenta" suspended={false} />
                    ))}
                  </div>
                  <p className="text-[6px] tracking-[0.18em] text-magenta/70 uppercase text-center">DRAINING QUEUE · CREDITS ×2</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* RESULTS COLUMN */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
            className="absolute z-10 flex flex-col gap-1.5"
            style={{ left: "85.5%", top: "16%", width: "13%" }}
          >
            <div className="flex items-center gap-1 text-[7.5px] font-extrabold tracking-[0.18em] text-mint">
              <SparkIcon className="w-3 h-3" aria-hidden="true" /> RESULTS
            </div>
            <div className="flex flex-col gap-1">
              <AnimatePresence initial={false}>
                {snap.results.map((q) => (
                  <motion.div
                    key={q.id}
                    layout
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="border border-mint/50 bg-mint/[0.05] px-1.5 py-1"
                  >
                    <div className="flex items-center gap-1">
                      <Check className="w-2.5 h-2.5 text-mint" aria-hidden="true" />
                      <span className="text-[7px] font-extrabold tracking-wider text-mint truncate">{q.id}</span>
                    </div>
                    <p className="text-[5.5px] tracking-wider text-muted-foreground tabular-nums">
                      {(q.ms / 1000).toFixed(1)}S · {q.cluster === 2 ? "C2·" : ""}N{q.node + 1}
                    </p>
                  </motion.div>
                ))}
              </AnimatePresence>
              {snap.results.length === 0 && (
                <div className="border border-dashed border-foreground/15 px-1.5 py-1.5 text-[6px] tracking-[0.18em] text-muted-foreground/60 text-center">
                  NO ROWS YET
                </div>
              )}
            </div>
          </motion.div>

          {/* STAGE CAPTIONS */}
          <FlowLabel x={24.5} y={57} tone="default">
            DISPATCH
          </FlowLabel>
          {c2Live ? (
            <FlowLabel x={66} y={74} tone="magenta">
              2 CLUSTERS ACTIVE — CREDITS ×2
            </FlowLabel>
          ) : scaleOn ? (
            <FlowLabel x={41.5} y={88} tone="magenta">
              SCALE-OUT ARMED — QUEUE ≥ 3 SPINS UP C2
            </FlowLabel>
          ) : null}

          <StepBadge step={step} total={STEPS} text={STEP_TEXT[step] ?? "INTAKE"} />
          <UseCaseNote>
            Isolation: every virtual warehouse owns its own compute + local result cache — queries never contend and
            warehouses never see each other&apos;s cache.
          </UseCaseNote>
          <VerdictFlash show={!!flash} text={flash?.text ?? ""} tone={flash?.tone ?? "snow"} />
        </FlowCanvas>
      </UseCaseShell>

      {/* ══════════ KNOWLEDGE — hidden in immersive fullscreen ══════════ */}
      <div className={immersive ? "hidden" : "grid md:grid-cols-3 gap-3"}>
        <Callout type="warn" title="Multi-cluster = no queuing, but credits multiply" delay={0.05}>
          When queries stack up, Snowflake can add entire extra clusters — each a full copy of the MPP compute grid.
          Queues vanish and throughput doubles… and so does the bill: 2 clusters at size M burn 8 credits/hour, not 4.
        </Callout>
        <Callout type="tip" title="Auto-suspend saves cost" delay={0.1}>
          An idle warehouse bills zero credits. AUTO_SUSPEND = 60 powers the nodes down after a minute without work and
          AUTO_RESUME spins them back on the next query — the default cost posture for dev and BI warehouses.
        </Callout>
        <SqlCodeBlock delay={0.15} label="DDL // WH_CONFIG.SQL" dense code={WH_SQL} />
      </div>
    </div>
  );
}
