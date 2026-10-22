"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, Radio, Skull } from "lucide-react";
import { FlowCanvas, FlowLink, FlowLabel, FlowNode } from "@/components/shared/flow";
import {
  StepBadge,
  UCStat,
  UCToggle,
  UseCaseShell,
  VerdictFlash,
  useTicker,
} from "@/components/shared/use-case";
import { Callout } from "@/components/shared/callout";
import { SimControls } from "@/components/shared/sim-controls";
import { SqlCodeBlock } from "@/components/shared/sql-code-block";
import {
  CloudIcon,
  PipeIcon,
  QueryIcon,
  StreamIcon,
  TableIcon,
  TaskIcon,
} from "@/components/shared/snowflake-icons";
import { logTs, type AutoLogLine } from "@/components/shared/auto-log";

/* ================================================================== */
/* SNOWPIPE · STREAMS · TASKS — the continuous ELT pipeline            */
/* S3 events → SQS auto-ingest → Snowpipe micro-batches → RAW_FEED     */
/* → RAW_STREAM (offset pointer) → MERGE_TASK (cron) → ANALYTICS.      */
/* From the Data Engineering lab: "PIPELINE - ETL, ELT".               */
/* ================================================================== */

const PHASES = [
  "SYSTEM IDLE",
  "S3 EVENT",
  "SQS NOTIFY",
  "PIPE INGEST",
  "RAW FEED FILL",
  "STREAM CAPTURE",
  "TASK COUNTDOWN",
  "MERGE DELTA",
] as const;

const PHASE_IDLE = 0;
const PHASE_DEFAULT = 6; // task countdown while live

interface BatchChip {
  id: number;
  rows: number;
}

const ANALYTICS_SAMPLE = [
  ["SESSION-8841", "KIRA_9", "1,204"],
  ["SESSION-8842", "XEN0N", "870"],
] as const;

export default function SnowpipeModule() {
  const [running, setRunning] = useState(false);
  const [immersive, setImmersive] = useState(false);
  const [errorInject, setErrorInject] = useState(false);

  const [logs, setLogs] = useState<AutoLogLine[]>([]);
  const [phase, setPhase] = useState<number>(PHASE_IDLE);

  const [filesIngested, setFilesIngested] = useState(0);
  const [rawRows, setRawRows] = useState(0);
  const [streamOffset, setStreamOffset] = useState(0);
  const [mergeCycles, setMergeCycles] = useState(0);
  const [errorsSeen, setErrorsSeen] = useState(0);
  const [analyticsRows, setAnalyticsRows] = useState(0);
  const [countdown, setCountdown] = useState(60);
  const [streamState, setStreamState] = useState<"FRESH" | "STALE">("STALE");

  const [batches, setBatches] = useState<BatchChip[]>([]);
  const [lastFile, setLastFile] = useState<string | null>(null);
  const [errorActive, setErrorActive] = useState(false);
  const [liveFlash, setLiveFlash] = useState(false);

  const [s3Pulse, setS3Pulse] = useState(false);
  const [sqsPulse, setSqsPulse] = useState(false);
  const [pipePulse, setPipePulse] = useState(false);
  const [mergeFlash, setMergeFlash] = useState(false);

  /* refs — mutable sim state read inside ticker closures */
  const idRef = useRef(1);
  const pendingRef = useRef(0);
  const poisonedRef = useRef(0);
  const deltaRef = useRef(0);
  const rawRef = useRef(0);
  const analyticsRef = useRef(0);
  const cyclesRef = useRef(0);
  const clockRef = useRef(60);
  const mbRef = useRef(0);
  const fileSeqRef = useRef(0);
  const lastFileRef = useRef<string>("");
  const phaseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const flashTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (phaseTimer.current) clearTimeout(phaseTimer.current);
      if (flashTimer.current) clearTimeout(flashTimer.current);
    },
    []
  );

  const log = (text: string, tone?: string) =>
    setLogs((prev) => [...prev.slice(-42), { id: idRef.current++, text: `[${logTs()}] ${text}`, tone }]);

  const setPhaseTransient = (n: number) => {
    setPhase(n);
    if (phaseTimer.current) clearTimeout(phaseTimer.current);
    phaseTimer.current = setTimeout(() => setPhase(PHASE_DEFAULT), 1200);
  };

  const flashLive = () => {
    setLiveFlash(true);
    if (flashTimer.current) clearTimeout(flashTimer.current);
    flashTimer.current = setTimeout(() => setLiveFlash(false), 2000);
  };

  const pulse = (setter: (v: boolean) => void, ms = 800) => {
    setter(true);
    setTimeout(() => setter(false), ms);
  };

  const applyRows = (rows: number) => {
    const firstData = rawRef.current === 0 && rows > 0;
    rawRef.current += rows;
    deltaRef.current += rows;
    setRawRows(rawRef.current);
    setStreamOffset(deltaRef.current);
    setStreamState("FRESH");
    if (firstData) flashLive();
  };

  /* ── S3 → SQS: a new game events file lands every ~2.1s (irregular) ── */
  const landFile = () => {
    if (Math.random() < 0.3) return; // irregular arrival gap
    fileSeqRef.current += 1;
    pendingRef.current += 1;
    const fname = `game_events_${String(fileSeqRef.current).padStart(4, "0")}.csv`;
    const kb = 48 + Math.floor(Math.random() * 96);
    lastFileRef.current = fname;
    setLastFile(fname);
    setFilesIngested((n) => n + 1);
    if (errorInject && poisonedRef.current === 0 && Math.random() < 0.4) {
      poisonedRef.current += 1;
      log(`[SQS] OBJECT LANDED: ${fname} (${kb} KB) — POISON RECORDS DETECTED`, "danger");
    } else {
      log(`[SQS] OBJECT LANDED: ${fname} (${kb} KB)`, "snow");
    }
    pulse(setS3Pulse);
    pulse(setSqsPulse);
    setPhaseTransient(2);
  };

  /* ── SNOWPIPE: continuous micro-batch ingest every ~2s, warehouse-free ── */
  const ingestBatch = () => {
    if (errorActive) {
      // retry tick — the poisoned file is replayed with bad records skipped
      setErrorActive(false);
      poisonedRef.current = 0;
      const rows = 84 + Math.floor(Math.random() * 120);
      applyRows(rows);
      log("RETRY OK — BAD RECORD(S) SKIPPED · REST OF FILE INGESTED", "mint");
      log("PIPELINE RECOVERED — SNOWPIPE AT-LEAST-ONCE SEMANTICS", "mint");
      flashLive();
      pulse(setPipePulse);
      setPhaseTransient(3);
      return;
    }
    if (poisonedRef.current > 0) {
      setErrorActive(true);
      setErrorsSeen((n) => n + 1);
      log(`SNOWPIPE COPY ERROR — ${lastFileRef.current}: NUMERIC FIELD OVERFLOW (ROW 512)`, "danger");
      log("RETRY QUEUED (1/3) — MICRO-BATCH WILL BE REPLAYED", "magenta");
      setPhaseTransient(3);
      return;
    }
    if (pendingRef.current === 0) return;
    const n = pendingRef.current;
    pendingRef.current = 0;
    mbRef.current += 1;
    const rows = n * (140 + Math.floor(Math.random() * 110));
    applyRows(rows);
    setBatches((b) => [...b.slice(-2), { id: mbRef.current, rows }]);
    log(
      `SNOWPIPE MICRO-BATCH #${String(mbRef.current).padStart(3, "0")} · ${n} FILE(S) · ${rows} ROWS — WAREHOUSE-FREE`,
      "neon"
    );
    pulse(setPipePulse);
    setPhaseTransient(4);
  };

  /* ── MERGE_TASK: cron 1 minute compressed to 8s of wall clock ── */
  const fireMerge = () => {
    pulse(setMergeFlash, 900);
    setPhaseTransient(7);
    if (deltaRef.current > 0) {
      const merged = deltaRef.current;
      deltaRef.current = 0;
      cyclesRef.current += 1;
      analyticsRef.current += merged;
      setMergeCycles(cyclesRef.current);
      setAnalyticsRows(analyticsRef.current);
      setStreamOffset(0);
      setStreamState("STALE");
      log("TASK MERGE_TASK FIRED — SYSTEM$STREAM_HAS_DATA = TRUE", "snow");
      log(`MERGE ANALYTICS ← RAW_STREAM · ${merged.toLocaleString("en-US")} ROWS · 0 DUPLICATES`, "mint");
      if (errorsSeen > 0) log("MERGE SKIPPED 0 DUPLICATES — IDEMPOTENT REPLAY IS SAFE", "mint");
    } else {
      log("TASK MERGE_TASK FIRED — SYSTEM$STREAM_HAS_DATA = FALSE · SKIPPED", "muted");
    }
  };

  const tickClock = () => {
    clockRef.current -= 1;
    if (clockRef.current <= 0) {
      clockRef.current = 60;
      fireMerge();
    }
    setCountdown(clockRef.current);
  };

  useTicker(running, landFile, 2100);
  useTicker(running, ingestBatch, 2000);
  useTicker(running, tickClock, 133);

  const toggleRun = () => {
    const nr = !running;
    setRunning(nr);
    setPhase(nr ? PHASE_DEFAULT : PHASE_IDLE);
    log(
      nr
        ? "PIPELINE ONLINE — SNOWPIPE AUTO-INGEST LISTENING ON SQS QUEUE"
        : "PIPELINE PAUSED — STREAM OFFSETS RETAINED",
      nr ? "snow" : "muted"
    );
  };

  const resetSim = () => {
    setRunning(false);
    setPhase(PHASE_IDLE);
    pendingRef.current = 0;
    poisonedRef.current = 0;
    deltaRef.current = 0;
    rawRef.current = 0;
    analyticsRef.current = 0;
    cyclesRef.current = 0;
    clockRef.current = 60;
    mbRef.current = 0;
    fileSeqRef.current = 0;
    lastFileRef.current = "";
    setLogs([]);
    setFilesIngested(0);
    setRawRows(0);
    setStreamOffset(0);
    setMergeCycles(0);
    setErrorsSeen(0);
    setAnalyticsRows(0);
    setCountdown(60);
    setStreamState("STALE");
    setErrorActive(false);
    setBatches([]);
    setLastFile(null);
    setLiveFlash(false);
    setMergeFlash(false);
  };

  const countdownLabel = `T-${String(Math.floor(countdown / 60)).padStart(2, "0")}:${String(countdown % 60).padStart(2, "0")}`;

  return (
    <div className="flex flex-col gap-4">
      <UseCaseShell
        title="CONTINUOUS ELT // SNOWPIPE → RAW_FEED → STREAM → TASK → MERGE"
        subtitle="DATA ENGINEERING LAB · GAME EVENTS PIPELINE · AUTO-INGEST"
        immersiveActive={immersive}
        immersiveToggle={() => setImmersive((v) => !v)}
        logLines={logs}
        logTitle="PIPELINE LOG // LIVE"
        stats={
          <>
            <UCStat label="FILES INGESTED" value={String(filesIngested)} tone="snow" />
            <UCStat label="RAW ROWS" value={rawRows.toLocaleString("en-US")} tone="mint" />
            <UCStat label="STREAM OFFSET" value={`+${streamOffset.toLocaleString("en-US")}`} tone="neon" />
            <UCStat label="TASK COUNTDOWN" value={countdownLabel} tone="magenta" />
            <UCStat label="MERGE CYCLES" value={String(mergeCycles)} tone="snow" />
            <UCStat
              label="ERROR STATE"
              value={errorActive ? "ERROR · RETRY" : "OK"}
              tone={errorActive ? "danger" : "mint"}
            />
          </>
        }
        controls={
          <>
            <SimControls
              running={running}
              onToggle={toggleRun}
              onReset={resetSim}
              status={
                !running
                  ? "PIPELINE IDLE — PRESS RUN"
                  : errorActive
                    ? "ERROR ACTIVE — SNOWPIPE REPLAYING MICRO-BATCH"
                    : "PIPELINE LIVE — CONTINUOUS INGEST · TASK CRON ARMED"
              }
            />
            <p className="text-[8px] font-bold uppercase tracking-[0.25em] text-muted-foreground pt-1">CHAOS INJECT</p>
            <UCToggle
              on={errorInject}
              onClick={() => {
                setErrorInject((v) => {
                  log(
                    !v
                      ? "ERROR INJECT ARMED — NEXT POISONED FILE WILL BREAK A MICRO-BATCH"
                      : "ERROR INJECT DISARMED — PIPELINE CLEAN",
                    "magenta"
                  );
                  return !v;
                });
              }}
              accent="magenta"
              ariaLabel="Toggle poisoned file injection into the pipeline"
            >
              <Skull className="w-3 h-3" />
              FILE ERROR INJECT
            </UCToggle>
            <p className="text-[7.5px] text-muted-foreground/70 tracking-wider uppercase leading-relaxed">
              POISONED FILE → RED ERROR PATH → AUTO-RETRY → IDEMPOTENT MERGE (0 DUPLICATES)
            </p>
          </>
        }
      >
        <FlowCanvas
          className="h-full"
          ariaLabel="Snowpipe continuous ELT pipeline: S3 game events, SQS auto ingest, Snowpipe micro batches, raw feed table, stream, scheduled merge task and analytics table"
        >
          {/* LINKS */}
          <FlowLink d="M 16,20 L 22,20" status={running ? "flowing" : "idle"} dotDuration={1.4} />
          <FlowLink d="M 35,20 L 39,20" status={running ? "flowing" : "idle"} dotDuration={1.2} />
          <FlowLink d="M 55,20 L 58,20" status={running ? "flowing" : "idle"} dotDuration={1.1} />
          <FlowLink d="M 75,20 L 80,20" status={running ? "flowing" : "idle"} dotDuration={1.2} />
          <FlowLink
            d="M 88,26 C 88,50 42,50 29,66"
            status={running && streamState === "FRESH" ? "flowing" : "idle"}
            dotDuration={2.4}
          />
          <FlowLink d="M 31,74 L 42,74" status={mergeFlash ? "success" : "idle"} dot={mergeFlash} dotDuration={0.9} />
          <FlowLink d="M 54,74 L 60,74" status={mergeFlash ? "success" : "idle"} dot={mergeFlash} dotDuration={0.9} />
          <FlowLink d="M 46,26 L 46,40" status={errorActive ? "error" : "idle"} dashed dot={errorActive} dotDuration={1} />

          {/* LABELS */}
          <FlowLabel x={19} y={13} tone={sqsPulse ? "magenta" : "default"}>
            {lastFile ? `EVENT · ${lastFile}` : "OBJECT CREATED EVENT"}
          </FlowLabel>
          <FlowLabel x={46} y={9}>MICRO-BATCH ≈2S</FlowLabel>
          {errorActive && (
            <FlowLabel x={54} y={34} tone="danger">
              RETRY 1/3
            </FlowLabel>
          )}
          <FlowLabel x={26} y={62} tone={countdown <= 10 ? "mint" : "default"}>
            {countdownLabel} · NEXT FIRE
          </FlowLabel>
          <FlowLabel x={88} y={30} tone={streamState === "FRESH" ? "mint" : "default"}>
            {streamState === "FRESH" ? `FRESH · +${streamOffset.toLocaleString("en-US")}` : "STALE · CONSUMED"}
          </FlowLabel>

          {/* NODES — ROW A */}
          <FlowNode
            x={10} y={20} icon={<CloudIcon className="w-3 h-3" />} label="GAME EVENTS" sub="S3://GAME-LOGS/"
            status={s3Pulse ? "active" : running ? "idle" : "idle"} pulse={s3Pulse} size="sm" delay={0.05}
          />
          <FlowNode
            x={28} y={20} icon={<Radio className="w-3 h-3" />} label="SQS AUTO-INGEST" sub="NOTIFY QUEUE"
            status={sqsPulse ? "active" : "idle"} pulse={sqsPulse} size="sm" delay={0.12}
          />
          <FlowNode
            x={46} y={20} icon={<PipeIcon className="w-3 h-3" />} label="SNOWPIPE" sub="SERVERLESS · CONTINUOUS"
            status={running ? "active" : "idle"} pulse={pipePulse} size="sm" delay={0.19}
          />
          <FlowNode
            x={88} y={20} icon={<StreamIcon className="w-3 h-3" />} label="RAW_STREAM" sub={`OFFSET +${streamOffset.toLocaleString("en-US")}`}
            status={streamState === "FRESH" ? "success" : "idle"} pulse={streamState === "FRESH" && running} size="sm" delay={0.33}
          />

          {/* RAW_FEED BOX — fills continuously */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.26, duration: 0.4 }}
            className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
            style={{ left: "67%", top: "20%" }}
          >
            <div className={`glass cyber-cut-sm px-2.5 py-2 w-[142px] ${running ? "box-glow" : ""}`}>
              <div className="flex items-center justify-between gap-2">
                <span className="flex items-center gap-1 text-[8px] font-bold uppercase tracking-[0.14em] text-snow">
                  <TableIcon className="w-3 h-3 shrink-0" />
                  RAW_FEED
                </span>
                <motion.span
                  key={rawRows}
                  initial={{ scale: 1.2, color: "#00ffa3" }}
                  animate={{ scale: 1, color: "#29b5e8" }}
                  className="text-[9px] font-extrabold tabular-nums"
                >
                  {rawRows.toLocaleString("en-US")}
                </motion.span>
              </div>
              <div className="mt-1.5 pt-1.5 border-t border-snow/15 flex flex-col gap-1 min-h-[42px]">
                <AnimatePresence>
                  {batches.map((b) => (
                    <motion.div
                      key={`mb-${b.id}`}
                      layout
                      initial={{ opacity: 0, x: -14 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.7 }}
                      className="px-1.5 py-0.5 border border-mint/40 bg-mint/10 text-mint text-[6.5px] font-bold tracking-wider tabular-nums"
                    >
                      MB-{String(b.id).padStart(3, "0")} · {b.rows.toLocaleString("en-US")} ROWS
                    </motion.div>
                  ))}
                </AnimatePresence>
                {batches.length === 0 && (
                  <span className="text-[6.5px] text-muted-foreground/60 uppercase tracking-wider px-1">
                    AWAITING MICRO-BATCH…
                  </span>
                )}
              </div>
              <p className="mt-1 text-[6px] uppercase tracking-[0.18em] text-muted-foreground/70">APPEND-ONLY · SERVERLESS</p>
            </div>
          </motion.div>

          {/* COPY HISTORY — errors_only preview node */}
          <FlowNode
            x={46} y={46} icon={<AlertTriangle className="w-3 h-3" />} label="COPY_HISTORY" sub="ERRORS_ONLY PREVIEW"
            status={errorActive ? "error" : "idle"} pulse={errorActive} size="xs" delay={0.4}
          />

          {/* NODES — ROW B */}
          <FlowNode
            x={26} y={74} icon={<TaskIcon className="w-3 h-3" />} label="MERGE_TASK" sub="CRON · EVERY 1 MIN"
            status={mergeFlash ? "active" : running ? "idle" : "idle"} pulse={mergeFlash} size="sm" delay={0.47}
          />
          <FlowNode
            x={48} y={74} icon={<QueryIcon className="w-3 h-3" />} label="MERGE" sub="IDEMPOTENT UPSERT"
            status={mergeFlash ? "success" : "idle"} pulse={mergeFlash} size="sm" delay={0.54}
          />

          {/* ANALYTICS BOX */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.4 }}
            className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
            style={{ left: "69%", top: "74%" }}
          >
            <div className={`glass cyber-cut-sm px-2.5 py-2 w-[152px] ${analyticsRows > 0 ? "box-glow" : ""}`}>
              <div className="flex items-center justify-between gap-2">
                <span className="flex items-center gap-1 text-[8px] font-bold uppercase tracking-[0.14em] text-snow">
                  <TableIcon className="w-3 h-3 shrink-0" />
                  ANALYTICS
                </span>
                <motion.span
                  key={analyticsRows}
                  initial={{ scale: 1.2, color: "#ff2d78" }}
                  animate={{ scale: 1, color: "#00ffa3" }}
                  className="text-[9px] font-extrabold tabular-nums"
                >
                  {analyticsRows.toLocaleString("en-US")}
                </motion.span>
              </div>
              <div className="mt-1.5 pt-1.5 border-t border-snow/15 flex flex-col gap-0.5 min-h-[34px]">
                <AnimatePresence>
                  {analyticsRows > 0
                    ? ANALYTICS_SAMPLE.map((r) => (
                        <motion.div
                          key={r[0]}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="flex items-center justify-between text-[6.5px] font-bold tracking-wider text-mint tabular-nums"
                        >
                          <span>{r[0]} · {r[1]}</span>
                          <span>{r[2]} PTS</span>
                        </motion.div>
                      ))
                    : null}
                </AnimatePresence>
                {analyticsRows === 0 && (
                  <span className="text-[6.5px] text-muted-foreground/60 uppercase tracking-wider px-1">
                    WAITING FOR MERGE…
                  </span>
                )}
              </div>
            </div>
          </motion.div>

          <VerdictFlash show={liveFlash} text="PIPELINE LIVE" tone="ok" />
          <StepBadge step={phase} total={8} text={PHASES[phase]} />
        </FlowCanvas>
      </UseCaseShell>

      {/* KNOWLEDGE */}
      <div className={immersive ? "hidden" : "grid md:grid-cols-2 gap-3 items-start"}>
        <SqlCodeBlock
          label="PIPELINE_DDL.sql"
          delay={0.05}
          code={`CREATE PIPE GAME_PIPE AUTO_INGEST = TRUE AS
  COPY INTO RAW_FEED FROM @EXT_STAGE;

CREATE STREAM RAW_STREAM ON TABLE RAW_FEED;

CREATE TASK MERGE_TASK SCHEDULE = '1 MINUTE' AS
  MERGE INTO ANALYTICS USING RAW_STREAM ...;`}
        />
        <div className="flex flex-col gap-3">
          <Callout type="tip" title="Snowpipe = continuous, warehouse-free load" delay={0.1}>
            Files land in S3, SQS notifies the pipe, and serverless compute ingests micro-batches within
            seconds. No warehouse to size, resume or pay for while idle — you billing is per-second of
            actual load work.
          </Callout>
          <Callout type="exam" title="Streams are offset pointers — MERGE makes pipelines idempotent" delay={0.15}>
            A stream records the delta since it was last consumed. MERGE reads the offset, upserts, and
            advances it — replaying a batch can never double-count (0 DUPLICATES), which is what makes the
            task safe to re-run after failures.
          </Callout>
          <Callout type="info" title="Tasks = cron for SQL" delay={0.2}>
            SCHEDULE = &apos;1 MINUTE&apos; fires the task on a timer; WHEN SYSTEM$STREAM_HAS_DATA guards it
            from burning credits on empty offsets. Chain tasks into DAGs for multi-step ELT.
          </Callout>
        </div>
      </div>
    </div>
  );
}
