"use client";

import React, { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Braces, FileSpreadsheet, Table2, Trash2 } from "lucide-react";
import { FlowCanvas, FlowLink, FlowLabel, FlowNode } from "@/components/shared/flow";
import {
  StepBadge,
  UCButton,
  UCStat,
  UseCaseShell,
  UseCaseTabs,
  useScenarioRunner,
  useTicker,
  type UcTabDef,
} from "@/components/shared/use-case";
import { Callout } from "@/components/shared/callout";
import { SimControls } from "@/components/shared/sim-controls";
import { SqlCodeBlock } from "@/components/shared/sql-code-block";
import {
  FileIcon,
  QueryIcon,
  StageIcon,
  TableIcon,
  WarehouseIcon,
} from "@/components/shared/snowflake-icons";
import { logTs, type AutoLogLine } from "@/components/shared/auto-log";

/* ================================================================== */
/* INGESTION & STAGING — PUT → STAGE → COPY INTO                       */
/* 3 scenarios: CSV table load · TSV + file formats · JSON tweets      */
/* Authentic flow from the Data Warehousing labs (CSV/TSV/JSON).       */
/* ================================================================== */

const TABS = [
  { id: "CSV", label: "CSV → TABLE", num: "01", icon: FileSpreadsheet },
  { id: "TSV", label: "TSV + FILE FORMATS", num: "02", icon: Table2 },
  { id: "JSON", label: "JSON TWEETS", num: "03", icon: Braces },
] as const satisfies readonly UcTabDef[];

type TabId = (typeof TABS)[number]["id"];

/* per-step badge text (8-step machine) */
const PHASES = [
  "PUT FILE",
  "STAGE FILE",
  "ISSUE COPY",
  "WAREHOUSE UP",
  "ROWS STREAM",
  "ROWS STREAM",
  "VALIDATION",
  "LOAD COMPLETE",
] as const;

type LogFn = (text: string, tone?: string) => void;

const fmtKB = (kb: number) => (kb >= 1024 ? `${(kb / 1024).toFixed(1)} MB` : `${kb} KB`);

export default function IngestionModule() {
  const [tab, setTab] = useState<TabId>("CSV");
  return (
    <div className="flex flex-col gap-4">
      <UseCaseTabs tabs={TABS} active={tab} onChange={(t) => setTab(t as TabId)} label="Ingestion scenarios" />
      {tab === "CSV" && <CsvScenario />}
      {tab === "TSV" && <TsvScenario />}
      {tab === "JSON" && <JsonScenario />}
    </div>
  );
}

/* ================================================================== */
/* TAB A — CSV → TABLE                                                 */
/* ================================================================== */

const EMP_NAMES = [
  "VOSS", "KIM", "ORAZ", "NGUYEN", "BRANDT", "OKAFOR", "SILVA", "MEHTA",
  "DUBOIS", "NOVAK", "REYES", "HSU", "LARSEN", "ADEYEMI", "KOWAL", "IRVING",
  "MOREAU", "TANAKA", "BAUER", "ONYX", "PATEL", "CHEN", "FROST", "MERCER",
] as const;

const STAGE_FILES = [
  "employees.csv.gz",
  "employees_0.csv.gz",
  "employees_1.csv.gz",
  "employees_2.csv.gz",
] as const;

const CSV_TOTAL = 8;

function CsvScenario() {
  const [running, setRunning] = useState(false);
  const [immersive, setImmersive] = useState(false);
  const [logs, setLogs] = useState<AutoLogLine[]>([]);
  const [stats, setStats] = useState({ bytes: 0, rows: 0, errors: 0, files: 0 });
  const [rowCount, setRowCount] = useState(0);
  const idRef = useRef(1);

  const log: LogFn = (text, tone) =>
    setLogs((prev) => [...prev.slice(-42), { id: idRef.current++, text: `[${logTs()}] ${text}`, tone }]);

  const applyStep = (s: number) => {
    if (s === 0) {
      setRowCount(0);
      setStats((p) => ({ ...p, bytes: p.bytes + 128 }));
      log("PUT employees.csv → @%EMP_STAGE (128 KB) OK", "snow");
    } else if (s === 1) {
      setStats((p) => ({ ...p, files: p.files + 1 }));
      log("STAGE @%EMP_STAGE NOW HOLDS employees.csv.gz — ENCRYPTED AT REST", "mint");
    } else if (s === 2) {
      log("COPY INTO EMPLOYEES FROM @%EMP_STAGE — JOB 01AA2B3C QUEUED", "snow");
    } else if (s === 3) {
      log("WAREHOUSE WH_CALC_WH RESUMED — X-SMALL SPINNING UP", "neon");
    } else if (s === 5) {
      log("ROWS STREAMING — MICRO-PARTITIONS BEING WRITTEN", "neon");
    } else if (s === 6) {
      setStats((p) => ({ ...p, rows: p.rows + 128 }));
      log("VALIDATION_MODE = RETURN_ERRORS → 0 ERRORS SEEN", "mint");
    } else if (s === 7) {
      log("LOAD COMPLETE — 128 ROWS · 1 FILE STAGED · BYTES CLEARED FROM STAGE ON PURGE ONLY", "mint");
    }
  };

  const { step, reset } = useScenarioRunner(CSV_TOTAL, running, 1200, applyStep);

  /* rows stream during steps 4-5 — 0→64→128 */
  useTicker(running && step >= 4 && step <= 5, () => {
    const cap = step >= 5 ? 128 : 64;
    setRowCount((c) => (c >= cap ? c : Math.min(cap, c + 3)));
  }, 55);

  const purgeStage = () => {
    setStats((p) => ({ ...p, files: 0 }));
    log("REMOVE @%EMP_STAGE — STAGE PURGED · files.dropzone() EMPTY", "magenta");
  };

  const filled = Math.round((rowCount / 128) * EMP_NAMES.length);
  const shownFiles = STAGE_FILES.slice(0, Math.min(stats.files, STAGE_FILES.length));

  return (
    <div className="flex flex-col gap-4">
      <UseCaseShell
        title="CSV → TABLE // PUT → STAGE → COPY INTO"
        subtitle="DATA WAREHOUSING LAB · EMPLOYEES.CSV · 128 ROWS"
        immersiveActive={immersive}
        immersiveToggle={() => setImmersive((v) => !v)}
        logLines={logs}
        logTitle="SCENARIO LOG // CSV INGESTION"
        stats={
          <>
            <UCStat label="BYTES STAGED" value={fmtKB(stats.bytes)} tone="snow" />
            <UCStat label="ROWS LOADED" value={stats.rows.toLocaleString("en-US")} tone="mint" />
            <UCStat label="ERRORS SEEN" value={String(stats.errors)} tone={stats.errors > 0 ? "danger" : "mint"} />
            <UCStat label="STAGE FILES" value={String(stats.files)} tone="neon" />
            <UCStat label="FORMAT" value="CSV" tone="magenta" />
            <UCStat label="VALIDATION" value={step >= 6 ? "PASS" : "—"} tone={step >= 6 ? "mint" : "neutral"} />
          </>
        }
        controls={
          <>
            <SimControls
              running={running}
              onToggle={() => {
                setRunning((r) => !r);
                if (!running) log("SCENARIO ARMED — PUT → STAGE → COPY", "snow");
              }}
              onReset={() => {
                setRunning(false);
                reset();
                setLogs([]);
                setStats({ bytes: 0, rows: 0, errors: 0, files: 0 });
                setRowCount(0);
              }}
              status={running ? `${String(step + 1).padStart(2, "0")} · ${PHASES[step]}` : "SYSTEM IDLE — PRESS RUN"}
            />
            <p className="text-[8px] font-bold uppercase tracking-[0.25em] text-muted-foreground pt-1">STAGE OPS</p>
            <UCButton tone="danger" onClick={purgeStage} disabled={stats.files === 0} ariaLabel="Purge internal stage files">
              <Trash2 className="w-3 h-3" />
              REMOVE @%EMP_STAGE
            </UCButton>
          </>
        }
      >
        <FlowCanvas
          className="h-full"
          ariaLabel="CSV ingestion flow: user files, PUT command, internal stage, COPY INTO, employees target table with warehouse compute"
        >
          {/* LINKS */}
          <FlowLink d="M 16,22 L 21,22" status={step === 0 ? "flowing" : "idle"} dotDuration={1.1} />
          <FlowLink d="M 33,22 L 36,22" status={step === 1 ? "flowing" : "idle"} dotDuration={0.9} />
          <FlowLink d="M 54,22 L 61,22" status={step === 2 || step === 3 ? "flowing" : step >= 4 ? "success" : "idle"} dotDuration={1.2} />
          <FlowLink d="M 67,56 L 67,29" status={step === 3 || step === 4 ? "flowing" : "idle"} dotDuration={1.3} />
          <FlowLink d="M 73,22 L 77,22" status={step >= 4 && step <= 5 ? "flowing" : step >= 6 ? "success" : "idle"} dotDuration={1} />

          {/* LABELS */}
          <FlowLabel x={21} y={12} tone="snow">UPLOAD 128 KB</FlowLabel>
          <FlowLabel x={58} y={12}>READ + INSERT</FlowLabel>
          <FlowLabel x={60} y={43}>COMPUTE</FlowLabel>

          {/* NODES */}
          <FlowNode
            x={10} y={22} icon={<FileIcon className="w-3 h-3" />} label="USER FILES" sub="employees.csv · 128 KB"
            status={step === 0 ? "active" : step >= 7 ? "success" : "idle"} pulse={step === 0} size="sm" delay={0.05}
          />
          <FlowNode
            x={27} y={22} icon={<QueryIcon className="w-3 h-3" />} label="PUT" sub="CLIENT → STAGE"
            status={step === 0 ? "active" : step >= 6 ? "success" : "idle"} pulse={step === 0} size="sm" delay={0.12}
          />
          <FlowNode
            x={67} y={22} icon={<QueryIcon className="w-3 h-3" />} label="COPY INTO" sub="EMPLOYEES"
            status={step >= 2 && step <= 5 ? "active" : step >= 6 ? "success" : "idle"} pulse={step === 2 || step === 3} size="sm" delay={0.26}
          />
          <FlowNode
            x={67} y={62} icon={<WarehouseIcon className="w-3 h-3" />} label="WH_CALC_WH" sub="X-SMALL · RESUMED"
            status={step === 3 || step === 4 ? "active" : "idle"} pulse={step === 3} size="sm" delay={0.33}
          />

          {/* INTERNAL STAGE BOX */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.19, duration: 0.4 }}
            className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
            style={{ left: "45%", top: "22%" }}
          >
            <div className={`glass cyber-cut-sm px-2.5 py-2 w-[150px] ${step >= 1 && step < 6 ? "box-glow" : ""}`}>
              <div className="flex items-center gap-1 text-[8px] font-bold uppercase tracking-[0.14em] text-snow">
                <StageIcon className="w-3 h-3 shrink-0" />
                @%EMP_STAGE
              </div>
              <p className="text-[6.5px] uppercase tracking-[0.18em] text-muted-foreground mt-0.5">INTERNAL · ENCRYPTED · SSE</p>
              <div className="mt-1.5 pt-1.5 border-t border-snow/15 flex flex-col gap-1 min-h-[46px]">
                <AnimatePresence>
                  {shownFiles.map((f) => (
                    <motion.div
                      key={f}
                      layout
                      initial={{ opacity: 0, x: -14 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.7 }}
                      className="flex items-center gap-1 px-1.5 py-0.5 border border-mint/40 bg-mint/10 text-mint text-[6.5px] font-bold tracking-wider"
                    >
                      <FileIcon className="w-2.5 h-2.5 shrink-0" />
                      {f}
                    </motion.div>
                  ))}
                </AnimatePresence>
                {stats.files > STAGE_FILES.length && (
                  <span className="text-[6.5px] text-muted-foreground px-1">+{stats.files - STAGE_FILES.length} MORE STAGED</span>
                )}
                {stats.files === 0 && (
                  <span className="text-[6.5px] text-muted-foreground/60 uppercase tracking-wider px-1">AWAITING PUT…</span>
                )}
              </div>
            </div>
          </motion.div>

          {/* TARGET TABLE BOX */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.33, duration: 0.4 }}
            className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
            style={{ left: "88%", top: "22%" }}
          >
            <div className={`glass cyber-cut-sm px-2.5 py-2 w-[168px] ${step >= 6 ? "box-glow" : ""}`}>
              <div className="flex items-center justify-between gap-2">
                <span className="flex items-center gap-1 text-[8px] font-bold uppercase tracking-[0.14em] text-snow">
                  <TableIcon className="w-3 h-3 shrink-0" />
                  EMPLOYEES
                </span>
                <motion.span
                  key={rowCount}
                  initial={{ scale: 1.25, color: "#00ffa3" }}
                  animate={{ scale: 1, color: "#29b5e8" }}
                  className="text-[9px] font-extrabold tabular-nums"
                >
                  {rowCount}/128
                </motion.span>
              </div>
              <div className="mt-1.5 pt-1.5 border-t border-snow/15 grid grid-cols-4 gap-0.5">
                {EMP_NAMES.map((n, i) => (
                  <div
                    key={n}
                    className={`h-4 flex items-center justify-center border text-[6px] font-bold tracking-wider ${
                      i < filled ? "border-snow/40 bg-snow/10 text-snow" : "border-foreground/15 text-foreground/25"
                    }`}
                  >
                    {i < filled ? n : "·"}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* VALIDATION PREVIEW */}
          <AnimatePresence>
            {step >= 6 && (
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="absolute left-[5%] bottom-[6%] z-10 w-[224px] glass-inset cyber-cut-sm px-2.5 py-2"
              >
                <p className="text-[7px] font-bold uppercase tracking-[0.18em] text-mint">VALIDATION · RETURN_ERRORS</p>
                <p className="text-[8px] text-snow font-bold mt-0.5 tabular-nums">0 ERRORS SEEN · 128 ROWS ACCEPTED</p>
                <div className="mt-1 flex flex-col gap-0.5">
                  <p className="text-[6.5px] text-muted-foreground tabular-nums">102 · DANA VOSS · ENGINEERING · 2019</p>
                  <p className="text-[6.5px] text-muted-foreground tabular-nums">103 · RIN OKAFOR · OPS · 2021</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <StepBadge step={step} total={CSV_TOTAL} text={PHASES[step]} />
        </FlowCanvas>
      </UseCaseShell>

      {/* KNOWLEDGE */}
      <div className={immersive ? "hidden" : "grid md:grid-cols-2 gap-3 items-start"}>
        <SqlCodeBlock
          label="CSV_LOAD.sql"
          delay={0.05}
          code={`PUT file:///data/employees.csv @%EMP_STAGE;
COPY INTO EMPLOYEES FROM @%EMP_STAGE
  FILE_FORMAT = (TYPE = CSV SKIP_HEADER = 1);`}
        />
        <div className="flex flex-col gap-3">
          <Callout type="tip" title="Staging decouples load from transform" delay={0.1}>
            PUT only moves encrypted files into the internal stage — it never touches a table. COPY INTO does
            the parsing and column mapping separately, so you can re-load, validate or purge without
            re-uploading a single byte.
          </Callout>
          <Callout type="info" title="Validate before you commit" delay={0.15}>
            VALIDATION_MODE = RETURN_ERRORS previews the parse result and reports rejected rows without
            loading anything. The ERRORS SEEN stat reads this preview — 0 means the load is safe to commit.
          </Callout>
        </div>
      </div>
    </div>
  );
}

/* ================================================================== */
/* TAB B — TSV + FILE FORMATS                                          */
/* ================================================================== */

const SRV_CELLS = [
  "SRV-01", "SRV-02", "SRV-03", "SRV-04", "SRV-05", "SRV-06",
  "SRV-07", "SRV-08", "SRV-09", "SRV-10", "SRV-11", "SRV-12",
] as const;

const TSV_TOTAL = 8;

function TsvScenario() {
  const [running, setRunning] = useState(false);
  const [immersive, setImmersive] = useState(false);
  const [logs, setLogs] = useState<AutoLogLine[]>([]);
  const [stats, setStats] = useState({ bytes: 0, rows: 0, errors: 0, files: 0 });
  const [rowCount, setRowCount] = useState(0);
  const idRef = useRef(1);

  const log: LogFn = (text, tone) =>
    setLogs((prev) => [...prev.slice(-42), { id: idRef.current++, text: `[${logTs()}] ${text}`, tone }]);

  const applyStep = (s: number) => {
    if (s === 0) {
      setRowCount(0);
      setStats((p) => ({ ...p, bytes: p.bytes + 96 }));
      log("PUT sensor_readings.tsv → @%TSV_STAGE (96 KB) OK", "snow");
    } else if (s === 1) {
      setStats((p) => ({ ...p, files: p.files + 1 }));
      log("STAGE @%TSV_STAGE HOLDS sensor_readings.tsv.gz — TAB-SEPARATED PAYLOAD", "mint");
    } else if (s === 2) {
      log("CREATE FILE FORMAT TSV_FMT — TYPE = 'CSV' REGISTERED", "magenta");
    } else if (s === 3) {
      log("FIELD_DELIMITER = '\\t' — TAB SEPARATOR LOCKED ON TSV_FMT", "magenta");
    } else if (s === 4) {
      log("SKIP_HEADER = 1 — HEADER ROW BYPASSED ON EVERY LOAD", "magenta");
    } else if (s === 5) {
      log("COPY INTO SENSORS USING FORMAT TSV_FMT — WAREHOUSE COMPUTING", "neon");
    } else if (s === 6) {
      setStats((p) => ({ ...p, rows: p.rows + 96 }));
      log("VALIDATION → 0 ERRORS SEEN · 96 ROWS ACCEPTED", "mint");
    } else if (s === 7) {
      log("LOAD COMPLETE — TSV_FMT REUSABLE FOR EVERY FUTURE TSV STAGE LOAD", "mint");
    }
  };

  const { step, reset } = useScenarioRunner(TSV_TOTAL, running, 1150, applyStep);

  useTicker(running && step >= 5 && step <= 6, () => {
    const cap = step >= 6 ? 96 : 48;
    setRowCount((c) => (c >= cap ? c : Math.min(cap, c + 2)));
  }, 60);

  const filled = Math.round((rowCount / 96) * SRV_CELLS.length);
  const attrLit = (attr: 0 | 1 | 2) => (attr === 0 ? step >= 2 : attr === 1 ? step >= 3 : step >= 4);

  return (
    <div className="flex flex-col gap-4">
      <UseCaseShell
        title="TSV + FILE FORMATS // NAMED FORMAT OBJECT"
        subtitle="DATA STAGING LAB · SENSOR_READINGS.TSV · 96 ROWS"
        immersiveActive={immersive}
        immersiveToggle={() => setImmersive((v) => !v)}
        logLines={logs}
        logTitle="SCENARIO LOG // TSV INGESTION"
        stats={
          <>
            <UCStat label="BYTES STAGED" value={fmtKB(stats.bytes)} tone="snow" />
            <UCStat label="ROWS LOADED" value={stats.rows.toLocaleString("en-US")} tone="mint" />
            <UCStat label="ERRORS SEEN" value={String(stats.errors)} tone={stats.errors > 0 ? "danger" : "mint"} />
            <UCStat label="STAGE FILES" value={String(stats.files)} tone="neon" />
            <UCStat label="FORMAT" value="TSV" tone="magenta" />
            <UCStat label="FMT OBJECT" value={step >= 2 ? "TSV_FMT" : "—"} tone={step >= 2 ? "magenta" : "neutral"} />
          </>
        }
        controls={
          <SimControls
            running={running}
            onToggle={() => {
              setRunning((r) => !r);
              if (!running) log("SCENARIO ARMED — STAGING .TSV FILE", "snow");
            }}
            onReset={() => {
              setRunning(false);
              reset();
              setLogs([]);
              setStats({ bytes: 0, rows: 0, errors: 0, files: 0 });
              setRowCount(0);
            }}
            status={running ? `${String(step + 1).padStart(2, "0")} · ${PHASES[step]}` : "SYSTEM IDLE — PRESS RUN"}
          />
        }
      >
        <FlowCanvas
          className="h-full"
          ariaLabel="TSV ingestion flow: tab separated file staged and loaded through a named file format object"
        >
          {/* LINKS */}
          <FlowLink d="M 13,20 L 17,20" status={step === 0 ? "flowing" : "idle"} dotDuration={1.1} />
          <FlowLink d="M 29,20 L 33,20" status={step === 1 ? "flowing" : "idle"} dotDuration={0.9} />
          <FlowLink d="M 49,20 L 55,20" status={step >= 2 && step <= 4 ? "flowing" : step >= 5 ? "success" : "idle"} dotDuration={1.2} />
          <FlowLink d="M 62,52 L 62,27" status={step === 5 ? "flowing" : "idle"} dotDuration={1.3} />
          <FlowLink
            d="M 30,60 C 40,52 50,38 57,27"
            status={step >= 5 ? "cyber" : "idle"}
            dashed
            dot={step >= 5}
            dotDuration={1.4}
          />
          <FlowLink d="M 68,20 L 76,20" status={step >= 5 && step <= 6 ? "flowing" : step >= 7 ? "success" : "idle"} dotDuration={1} />

          {/* LABELS */}
          <FlowLabel x={19} y={11} tone="snow">UPLOAD 96 KB</FlowLabel>
          <FlowLabel x={52} y={11}>USING TSV_FMT</FlowLabel>
          <FlowLabel x={62} y={43}>COMPUTE</FlowLabel>

          {/* NODES */}
          <FlowNode
            x={9} y={20} icon={<FileIcon className="w-3 h-3" />} label="TSV FILES" sub="sensor_readings.tsv"
            status={step === 0 ? "active" : step >= 7 ? "success" : "idle"} pulse={step === 0} size="sm" delay={0.05}
          />
          <FlowNode
            x={23} y={20} icon={<QueryIcon className="w-3 h-3" />} label="PUT" sub="→ @%TSV_STAGE"
            status={step === 0 ? "active" : step >= 6 ? "success" : "idle"} pulse={step === 0} size="sm" delay={0.12}
          />
          <FlowNode
            x={62} y={20} icon={<QueryIcon className="w-3 h-3" />} label="COPY INTO" sub="SENSORS"
            status={step >= 5 && step <= 6 ? "active" : step >= 7 ? "success" : "idle"} pulse={step === 5} size="sm" delay={0.26}
          />
          <FlowNode
            x={62} y={58} icon={<WarehouseIcon className="w-3 h-3" />} label="WH_LOAD_WH" sub="X-SMALL · AUTO"
            status={step === 5 ? "active" : "idle"} pulse={step === 5} size="sm" delay={0.33}
          />

          {/* STAGE BOX */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.19, duration: 0.4 }}
            className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
            style={{ left: "41%", top: "20%" }}
          >
            <div className={`glass cyber-cut-sm px-2.5 py-2 w-[136px] ${step >= 1 && step < 5 ? "box-glow" : ""}`}>
              <div className="flex items-center gap-1 text-[8px] font-bold uppercase tracking-[0.14em] text-snow">
                <StageIcon className="w-3 h-3 shrink-0" />
                @%TSV_STAGE
              </div>
              <div className="mt-1.5 pt-1.5 border-t border-snow/15 flex flex-col gap-1 min-h-[40px]">
                <AnimatePresence>
                  {stats.files > 0 && (
                    <motion.div
                      layout
                      initial={{ opacity: 0, x: -14 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.7 }}
                      className="flex items-center gap-1 px-1.5 py-0.5 border border-mint/40 bg-mint/10 text-mint text-[6.5px] font-bold tracking-wider"
                    >
                      <FileIcon className="w-2.5 h-2.5 shrink-0" />
                      sensor_readings.tsv.gz
                    </motion.div>
                  )}
                </AnimatePresence>
                {stats.files === 0 && (
                  <span className="text-[6.5px] text-muted-foreground/60 uppercase tracking-wider px-1">AWAITING PUT…</span>
                )}
              </div>
            </div>
          </motion.div>

          {/* FILE FORMAT OBJECT CARD */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
            style={{ left: "20%", top: "70%" }}
          >
            <div className={`glass cyber-cut-sm px-2.5 py-2 w-[196px] ${step >= 2 ? "box-glow" : ""}`}>
              <div className="flex items-center gap-1 text-[8px] font-bold uppercase tracking-[0.14em] text-magenta">
                <Braces className="w-3 h-3 shrink-0" />
                FILE FORMAT · TSV_FMT
              </div>
              <div className="mt-1.5 pt-1.5 border-t border-snow/15 flex flex-col gap-1">
                <div className={`flex items-center justify-between px-1.5 py-1 border text-[6.5px] font-bold tracking-wider transition-colors ${attrLit(0) ? "border-mint/50 bg-mint/10 text-mint" : "border-foreground/15 text-muted-foreground"}`}>
                  <span>TYPE</span>
                  <span className="tabular-nums">=&gt; &apos;CSV&apos;</span>
                </div>
                <div className={`flex items-center justify-between px-1.5 py-1 border text-[6.5px] font-bold tracking-wider transition-colors ${attrLit(1) ? "border-mint/50 bg-mint/10 text-mint" : "border-foreground/15 text-muted-foreground"}`}>
                  <span>FIELD_DELIMITER</span>
                  <span className="tabular-nums">&apos;\t&apos;</span>
                </div>
                <div className={`flex items-center justify-between px-1.5 py-1 border text-[6.5px] font-bold tracking-wider transition-colors ${attrLit(2) ? "border-mint/50 bg-mint/10 text-mint" : "border-foreground/15 text-muted-foreground"}`}>
                  <span>SKIP_HEADER</span>
                  <span className="tabular-nums">1</span>
                </div>
                <AnimatePresence>
                  {step >= 3 && (
                    <motion.p
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-[6.5px] text-snow tracking-[0.14em] px-1 pt-0.5 tabular-nums"
                    >
                      SRV-01 ⇥ 27.4 ⇥ OK ⇥ PARSE ✓
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* TARGET TABLE BOX */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.36, duration: 0.4 }}
            className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
            style={{ left: "87%", top: "20%" }}
          >
            <div className={`glass cyber-cut-sm px-2.5 py-2 w-[150px] ${step >= 7 ? "box-glow" : ""}`}>
              <div className="flex items-center justify-between gap-2">
                <span className="flex items-center gap-1 text-[8px] font-bold uppercase tracking-[0.14em] text-snow">
                  <TableIcon className="w-3 h-3 shrink-0" />
                  SENSORS
                </span>
                <motion.span
                  key={rowCount}
                  initial={{ scale: 1.25, color: "#00ffa3" }}
                  animate={{ scale: 1, color: "#29b5e8" }}
                  className="text-[9px] font-extrabold tabular-nums"
                >
                  {rowCount}/96
                </motion.span>
              </div>
              <div className="mt-1.5 pt-1.5 border-t border-snow/15 grid grid-cols-4 gap-0.5">
                {SRV_CELLS.map((n, i) => (
                  <div
                    key={n}
                    title={i < filled ? `${n} · ${(Math.random() * 4 + 24).toFixed(1)}°C` : undefined}
                    className={`h-4 flex items-center justify-center border text-[6px] font-bold tracking-wider ${
                      i < filled ? "border-mint/40 bg-mint/10 text-mint" : "border-foreground/15 text-foreground/25"
                    }`}
                  >
                    {i < filled ? n : "·"}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* VALIDATION PREVIEW — bottom right */}
          <AnimatePresence>
            {step >= 6 && (
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="absolute right-[3%] bottom-[6%] z-10 w-[218px] glass-inset cyber-cut-sm px-2.5 py-2"
              >
                <p className="text-[7px] font-bold uppercase tracking-[0.18em] text-mint">VALIDATION · RETURN_ERRORS</p>
                <p className="text-[8px] text-snow font-bold mt-0.5 tabular-nums">0 ERRORS SEEN · 96 ROWS ACCEPTED</p>
                <div className="mt-1 flex flex-col gap-0.5">
                  <p className="text-[6.5px] text-muted-foreground tabular-nums">SRV-03 ⇥ 27.4 ⇥ OK · ROW 4</p>
                  <p className="text-[6.5px] text-muted-foreground tabular-nums">SRV-07 ⇥ 31.9 ⇥ WARN · ROW 8</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <StepBadge step={step} total={TSV_TOTAL} text={PHASES[step]} />
        </FlowCanvas>
      </UseCaseShell>

      {/* KNOWLEDGE */}
      <div className={immersive ? "hidden" : "grid md:grid-cols-2 gap-3 items-start"}>
        <SqlCodeBlock
          label="TSV_FORMAT.sql"
          delay={0.05}
          code={`CREATE FILE FORMAT TSV_FMT
  TYPE = 'CSV' FIELD_DELIMITER = '\\t' SKIP_HEADER = 1;
COPY INTO SENSORS FROM @%TSV_STAGE
  FILE_FORMAT = (FORMAT_NAME = TSV_FMT);
SELECT * FROM @%TSV_STAGE (FILE_FORMAT => TSV_FMT);`}
        />
        <div className="flex flex-col gap-3">
          <Callout type="exam" title="TSV is just CSV with a different delimiter" delay={0.1}>
            Snowflake has no separate TSV type — you register a named FILE FORMAT object with
            TYPE = &apos;CSV&apos; and FIELD_DELIMITER = &apos;\t&apos;. The object is reusable: point every
            future stage load at TSV_FMT instead of repeating options inline.
          </Callout>
          <Callout type="warn" title="Delimiter traps are real" delay={0.15}>
            The lab&apos;s .txt &quot;CSV DATA&quot; failed until the delimiter matched the actual file. Always
            query the staged file first (SELECT * FROM @stage) — the ERRORS SEEN preview costs nothing
            compared to a corrupted load.
          </Callout>
        </div>
      </div>
    </div>
  );
}

/* ================================================================== */
/* TAB C — JSON TWEETS (semi-structured → VARIANT → $1 paths)          */
/* ================================================================== */

const JSON_TOTAL = 8;

const TWEET_ROWS = [
  ["@glacier_dev", "WAREHOUSES ARE SPACE HEATERS", "09:14:00Z"],
  ["@frost_byte", "STAGE NOW · CRY LATER", "09:16:00Z"],
  ["@zero_deg", "$1 PATHS >>> ETL SCRIPTS", "09:18:00Z"],
  ["@sub_zero", "VARIANT IS MY LOVE LANGUAGE", "09:21:00Z"],
] as const;

const PATH_ROWS = [
  { path: "$1:user:name", col: "USER_NAME" },
  { path: "$1:tweet:text", col: "TWEET_TEXT" },
  { path: "$1:tweet:created_at", col: "CREATED_AT" },
] as const;

function JsonScenario() {
  const [running, setRunning] = useState(false);
  const [immersive, setImmersive] = useState(false);
  const [logs, setLogs] = useState<AutoLogLine[]>([]);
  const [stats, setStats] = useState({ bytes: 0, rows: 0, errors: 0, files: 0 });
  const [rowCount, setRowCount] = useState(0);
  const idRef = useRef(1);

  const log: LogFn = (text, tone) =>
    setLogs((prev) => [...prev.slice(-42), { id: idRef.current++, text: `[${logTs()}] ${text}`, tone }]);

  const applyStep = (s: number) => {
    if (s === 0) {
      setRowCount(0);
      setStats((p) => ({ ...p, bytes: p.bytes + 214 }));
      log("PUT tweets.json → @%TWEETS_STAGE (214 KB) OK", "snow");
    } else if (s === 1) {
      setStats((p) => ({ ...p, files: p.files + 1 }));
      log("STAGED AS VARIANT — SCHEMA-ON-READ · NO PARSING AT LOAD", "mint");
    } else if (s === 2) {
      log("COPY ISSUED — EXTRACT $1:user:name → USER_NAME", "magenta");
    } else if (s === 3) {
      log("PATH PROBED — $1:tweet:text → TWEET_TEXT", "magenta");
    } else if (s === 4) {
      log("PATH PROBED — $1:tweet:created_at → CREATED_AT", "magenta");
    } else if (s === 5) {
      log("ROWS STREAMING — VARIANT FLATTENED TO RELATIONAL COLUMNS", "neon");
    } else if (s === 6) {
      setStats((p) => ({ ...p, rows: p.rows + 36 }));
      log("VALIDATION → 0 ERRORS SEEN · 36 TWEETS FLATTENED", "mint");
    } else if (s === 7) {
      log("LOAD COMPLETE — VARIANT RETAINED FOR RE-QUERY WITH NEW PATHS", "mint");
    }
  };

  const { step, reset } = useScenarioRunner(JSON_TOTAL, running, 1150, applyStep);

  useTicker(running && step >= 4 && step <= 5, () => {
    const cap = step >= 5 ? 36 : 18;
    setRowCount((c) => (c >= cap ? c : Math.min(cap, c + 1)));
  }, 70);

  /* 0 = idle, 1 = hot (current), 2 = extracted (done) */
  const pathState = (i: number): 0 | 1 | 2 => {
    const at = i + 2; // steps 2,3,4
    if (step === at) return 1;
    if (step > at) return 2;
    return 0;
  };

  const shownRows = Math.min(TWEET_ROWS.length, Math.ceil(rowCount / 9));

  return (
    <div className="flex flex-col gap-4">
      <UseCaseShell
        title="JSON TWEETS // VARIANT + $1 PATH EXTRACTION"
        subtitle="TWEETS LAB · SEMI-STRUCTURED · 36 DOCUMENTS"
        immersiveActive={immersive}
        immersiveToggle={() => setImmersive((v) => !v)}
        logLines={logs}
        logTitle="SCENARIO LOG // JSON INGESTION"
        stats={
          <>
            <UCStat label="BYTES STAGED" value={fmtKB(stats.bytes)} tone="snow" />
            <UCStat label="ROWS LOADED" value={stats.rows.toLocaleString("en-US")} tone="mint" />
            <UCStat label="ERRORS SEEN" value={String(stats.errors)} tone={stats.errors > 0 ? "danger" : "mint"} />
            <UCStat label="STAGE FILES" value={String(stats.files)} tone="neon" />
            <UCStat label="FORMAT" value="JSON" tone="magenta" />
            <UCStat label="COL TYPE" value="VARIANT" tone={step >= 1 ? "magenta" : "neutral"} />
          </>
        }
        controls={
          <SimControls
            running={running}
            onToggle={() => {
              setRunning((r) => !r);
              if (!running) log("SCENARIO ARMED — JSON → VARIANT → TABLE", "snow");
            }}
            onReset={() => {
              setRunning(false);
              reset();
              setLogs([]);
              setStats({ bytes: 0, rows: 0, errors: 0, files: 0 });
              setRowCount(0);
            }}
            status={running ? `${String(step + 1).padStart(2, "0")} · ${PHASES[step]}` : "SYSTEM IDLE — PRESS RUN"}
          />
        }
      >
        <FlowCanvas
          className="h-full"
          ariaLabel="JSON ingestion flow: tweets json staged as variant then flattened to a relational table via dollar one path extraction"
        >
          {/* LINKS */}
          <FlowLink d="M 12,12 L 15,12" status={step === 0 ? "flowing" : "idle"} dotDuration={1} />
          <FlowLink d="M 24,12 L 27,12" status={step === 1 ? "flowing" : "idle"} dotDuration={0.9} />
          <FlowLink d="M 37,12 L 41,12" status={step === 2 ? "flowing" : step >= 3 ? "success" : "idle"} dotDuration={1.1} />
          <FlowLink d="M 32,17 C 29,30 27,36 25,44" status={step >= 1 && step <= 2 ? "flowing" : "idle"} dotDuration={1.3} />
          <FlowLink
            d="M 40,58 L 57,58"
            status={step >= 2 && step <= 3 ? "flowing" : step >= 4 && step <= 6 ? "success" : "idle"}
            dotDuration={1.1}
          />

          {/* LABELS */}
          <FlowLabel x={18} y={6} tone="snow">UPLOAD 214 KB</FlowLabel>
          <FlowLabel x={30} y={29}>VARIANT CACHE</FlowLabel>
          <FlowLabel x={49} y={50} tone={step >= 2 && step <= 4 ? "magenta" : "default"}>EXTRACT $1 PATHS</FlowLabel>

          {/* NODES */}
          <FlowNode
            x={8} y={12} icon={<FileIcon className="w-3 h-3" />} label="JSON FILES" sub="tweets.json"
            status={step === 0 ? "active" : step >= 7 ? "success" : "idle"} pulse={step === 0} size="sm" delay={0.05}
          />
          <FlowNode
            x={20} y={12} icon={<QueryIcon className="w-3 h-3" />} label="PUT" sub="→ @%TWEETS_STAGE"
            status={step === 0 ? "active" : step >= 6 ? "success" : "idle"} pulse={step === 0} size="sm" delay={0.1}
          />
          <FlowNode
            x={32} y={12} icon={<StageIcon className="w-3 h-3" />} label="@%TWEETS_STAGE" sub="TYPE = JSON"
            status={step === 1 ? "active" : step >= 2 ? "success" : "idle"} pulse={step === 1} size="sm" delay={0.15}
          />
          <FlowNode
            x={45} y={12} icon={<QueryIcon className="w-3 h-3" />} label="COPY INTO" sub="SELECT $1 PATHS"
            status={step >= 2 && step <= 5 ? "active" : step >= 6 ? "success" : "idle"} pulse={step === 2} size="sm" delay={0.2}
          />

          {/* JSON DOC CARD */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.25, duration: 0.4 }}
            className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
            style={{ left: "24%", top: "60%" }}
          >
            <div className="glass cyber-cut-sm px-2.5 py-2 w-[252px]">
              <div className="flex items-center justify-between gap-2">
                <span className="flex items-center gap-1 text-[8px] font-bold uppercase tracking-[0.14em] text-snow">
                  <Braces className="w-3 h-3 shrink-0" />
                  tweets.json · DOC 0001
                </span>
                <span className="text-[6.5px] uppercase tracking-[0.18em] text-muted-foreground">VARIANT</span>
              </div>
              <div className="mt-1.5 pt-1.5 border-t border-snow/15 flex flex-col gap-0.5">
                <p className="text-[6.5px] text-foreground/40 tracking-wider pl-1">{"{"}</p>
                {PATH_ROWS.map((p, i) => {
                  const st = pathState(i);
                  const line =
                    i === 0
                      ? `"user": { "name": "@glacier_dev", "followers": 1284 },`
                      : i === 1
                        ? `"tweet": { "text": "WAREHOUSES ARE SPACE HEATERS",`
                        : `"created_at": "2024-11-02T09:14:00Z" },`;
                  return (
                    <div
                      key={p.path}
                      className={`flex items-center gap-1.5 pl-1 pr-1 py-0.5 border transition-colors ${
                        st === 1
                          ? "border-snow/70 bg-snow/10 text-snow box-glow"
                          : st === 2
                            ? "border-mint/40 bg-mint/5 text-mint"
                            : "border-transparent text-foreground/60"
                      }`}
                    >
                      <span className="text-[6.5px] tracking-wider truncate">{line}</span>
                      <span
                        className={`ml-auto shrink-0 text-[6px] font-bold tracking-[0.12em] tabular-nums ${
                          st === 1 ? "text-snow" : st === 2 ? "text-mint" : "text-muted-foreground/40"
                        }`}
                      >
                        {p.path}
                      </span>
                    </div>
                  );
                })}
                <p className="text-[6.5px] text-foreground/40 tracking-wider pl-6">&quot;lang&quot;: &quot;en&quot;</p>
                <p className="text-[6.5px] text-foreground/40 tracking-wider pl-1">{"}"}</p>
              </div>
            </div>
          </motion.div>

          {/* FLATTENED TABLE CARD */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.33, duration: 0.4 }}
            className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
            style={{ left: "75%", top: "60%" }}
          >
            <div className={`glass cyber-cut-sm px-2.5 py-2 w-[252px] ${step >= 6 ? "box-glow" : ""}`}>
              <div className="flex items-center justify-between gap-2">
                <span className="flex items-center gap-1 text-[8px] font-bold uppercase tracking-[0.14em] text-snow">
                  <TableIcon className="w-3 h-3 shrink-0" />
                  TWEETS
                </span>
                <motion.span
                  key={rowCount}
                  initial={{ scale: 1.25, color: "#00ffa3" }}
                  animate={{ scale: 1, color: "#29b5e8" }}
                  className="text-[9px] font-extrabold tabular-nums"
                >
                  {rowCount}/36
                </motion.span>
              </div>
              <div className="mt-1.5 pt-1.5 border-t border-snow/15 grid grid-cols-[64px_1fr_58px] gap-x-1.5">
                {PATH_ROWS.map((p, i) => (
                  <span
                    key={p.col}
                    className={`text-[6px] font-bold uppercase tracking-[0.12em] pb-0.5 border-b transition-colors ${
                      step >= i + 2 ? "text-snow border-snow/60" : "text-muted-foreground/60 border-foreground/15"
                    }`}
                  >
                    {p.col}
                  </span>
                ))}
                {TWEET_ROWS.map((r, ri) => (
                  <React.Fragment key={r[0]}>
                    {r.map((cell, ci) => (
                      <span
                        key={ci}
                        className={`text-[6px] tracking-wider truncate tabular-nums py-0.5 transition-opacity ${
                          ri < shownRows ? (step >= 6 ? "text-mint opacity-100" : "text-foreground/85 opacity-100") : "opacity-0"
                        }`}
                      >
                        {ri < shownRows ? cell : "·"}
                      </span>
                    ))}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </motion.div>

          <StepBadge step={step} total={JSON_TOTAL} text={PHASES[step]} />
        </FlowCanvas>
      </UseCaseShell>

      {/* KNOWLEDGE */}
      <div className={immersive ? "hidden" : "grid md:grid-cols-2 gap-3 items-start"}>
        <SqlCodeBlock
          label="JSON_TWEETS.sql"
          delay={0.05}
          code={`PUT file:///data/tweets.json @%TWEETS_STAGE;
COPY INTO TWEETS FROM @%TWEETS_STAGE
  FILE_FORMAT = (TYPE = JSON);
SELECT $1:tweet:text, $1:user:name FROM @%TWEETS_STAGE;`}
        />
        <div className="flex flex-col gap-3">
          <Callout type="tip" title="JSON is stored as VARIANT — query with $1 paths" delay={0.1}>
            Each document lands whole in a VARIANT column, so the load never fails on shape changes. Project
            values later with $1:user:name style paths — schema-on-read instead of schema-on-write.
          </Callout>
          <Callout type="info" title="Flatten on demand, not on load" delay={0.15}>
            The TWEETS lab first loads raw, then extracts user.name and tweet.text into relational columns.
            New fields tomorrow? Query $1:tweet:new_field straight from the same staged VARIANT — zero
            re-ingestion.
          </Callout>
        </div>
      </div>
    </div>
  );
}
