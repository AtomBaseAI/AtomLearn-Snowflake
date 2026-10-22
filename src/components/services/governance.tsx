"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Crown, RotateCcw, Users as UsersIcon, X, Zap } from "lucide-react";

import { SectionTitle } from "@/components/shared/typography";
import { GlassPanel } from "@/components/shared/glass-panel";
import { FlowCanvas, FlowLabel, FlowLink, FlowNode } from "@/components/shared/flow";
import {
  StepBadge,
  UCButton,
  UCStat,
  UCToggle,
  UseCaseShell,
  VerdictFlash,
  useScenarioRunner,
  useTicker,
} from "@/components/shared/use-case";
import { AutoLog, logTs, type AutoLogLine } from "@/components/shared/auto-log";
import { Callout } from "@/components/shared/callout";
import { SimControls } from "@/components/shared/sim-controls";
import { SqlCodeBlock } from "@/components/shared/sql-code-block";
import { DatabaseIcon, MonitorIcon, RoleIcon, WarehouseIcon } from "@/components/shared/snowflake-icons";

/* ================================================================== */
/* GOVERNANCE & RBAC — role hierarchy sim + resource monitor firewall   */
/* Based on DORA "Roles & Access" + "Resource Monitor Setup" labs       */
/* ================================================================== */

/* ------------------------------------------------------------------ */
/* Static data                                                         */
/* ------------------------------------------------------------------ */

type DetailId = "ACCOUNTADMIN" | "SYSADMIN" | "DORA_DEV" | "USERS" | "DEMO_DB";

interface RoleMeta {
  label: string;
  kind: string;
  note: string;
  icon: React.ReactNode;
  privileges: string[];
}

const ROLE_INFO: Record<DetailId, RoleMeta> = {
  ACCOUNTADMIN: {
    label: "ACCOUNTADMIN",
    kind: "TOP-LEVEL ROLE // CROWN",
    note: "GOD-MODE — NEVER USE IT DAY-TO-DAY",
    icon: <Crown className="w-3 h-3" aria-hidden="true" />,
    privileges: [
      "ALL ACCOUNT OPERATIONS — UNRESTRICTED",
      "CREATE ROLE · CREATE RESOURCE MONITOR",
      "MANAGE GRANTS ON ACCOUNT",
      "INITIAL OWNER OF EVERY NEW OBJECT",
      "DROP DATABASE · DROP ACCOUNT",
    ],
  },
  SYSADMIN: {
    label: "SYSADMIN",
    kind: "HUB ROLE // OWNS THE CHAIN",
    note: "OWNS ALL DATABASES + WAREHOUSES BELOW IT",
    icon: <RoleIcon className="w-3 h-3" aria-hidden="true" />,
    privileges: [
      "INHERITS DORA_DEV (AFTER GRANT ROLE)",
      "OWNERSHIP OF DBs + WAREHOUSES IN CHAIN",
      "CREATE DATABASE · CREATE WAREHOUSE",
      "GRANTS ROLES TO LOWER ROLES",
    ],
  },
  DORA_DEV: {
    label: "DORA_DEV",
    kind: "CUSTOM ROLE // DORA LAB",
    note: "SCHEMA-LEVEL RIGHTS — NOT ACCOUNT-LEVEL",
    icon: <RoleIcon className="w-3 h-3" aria-hidden="true" />,
    privileges: [
      "OWNERSHIP OF DATABASE DEMO_DB (TRANSFERRED)",
      "USAGE ON WAREHOUSE COMPUTE_WH",
      "CREATE TABLE ON DEMO_DB.PUBLIC",
      "✗ DROP DATABASE — DENIED (ACCOUNTADMIN-ONLY)",
    ],
  },
  USERS: {
    label: "USERS",
    kind: "SESSION PRINCIPALS",
    note: "ACTIVATE ROLES — NEVER HOLD OBJECTS DIRECTLY",
    icon: <UsersIcon className="w-3 h-3" aria-hidden="true" />,
    privileges: [
      "ROLE DORA_DEV ACTIVATED VIA USE ROLE",
      "USAGE ON WAREHOUSE COMPUTE_WH",
      "SELECT ON GRANTED TABLES",
      "NO DIRECT OBJECT OWNERSHIP",
    ],
  },
  DEMO_DB: {
    label: "DEMO_DB",
    kind: "DATABASE // DORA LAB",
    note: "OWNERSHIP MOVES WITH GRANT OWNERSHIP",
    icon: <DatabaseIcon className="w-3 h-3" aria-hidden="true" />,
    privileges: [
      "OWNER: DORA_DEV (AFTER OWNERSHIP GRANT)",
      "SCHEMA: PUBLIC",
      "TABLE: TRIPS (CREATED AS DORA_DEV)",
      "OPERATED BY OWNER OR PARENT ROLE",
    ],
  },
};

const HIER_STEPS: { cmd: string; detail: string }[] = [
  { cmd: "CREATE ROLE DORA_DEV;", detail: "CREATE CUSTOM ROLE" },
  { cmd: "GRANT OWNERSHIP ON DATABASE DEMO_DB TO ROLE DORA_DEV;", detail: "TRANSFER OWNERSHIP" },
  { cmd: "GRANT ROLE DORA_DEV TO ROLE SYSADMIN;", detail: "LINK OWNERSHIP CHAIN" },
  { cmd: "USE ROLE DORA_DEV;", detail: "SWITCH SESSION ROLE" },
  { cmd: "CREATE TABLE DEMO_DB.PUBLIC.TRIPS AS SELECT …;", detail: "WRITE TEST — ALLOWED" },
  { cmd: "DROP DATABASE DEMO_DB;", detail: "DROP TEST — DENIED" },
];

const RM_DDL = `CREATE RESOURCE MONITOR RM_DORA WITH CREDIT_QUOTA = 100
  TRIGGERS ON 50 PERCENT DO NOTIFY
           ON 80 PERCENT DO SUSPEND IMMEDIATELY
           ON 100 PERCENT DO KILL;`;

const TRIGGER_ROWS = [
  {
    p: "50%",
    action: "NOTIFY",
    cls: "text-neon border-neon/40 bg-neon/[0.06]",
    desc: "Alert dispatched to account admins — the warehouse keeps burning.",
  },
  {
    p: "80%",
    action: "SUSPEND IMMEDIATELY",
    cls: "text-danger border-danger/50 bg-danger/[0.06]",
    desc: "Running queries aborted, new queries queued — COMPUTE_WH halts instantly.",
  },
  {
    p: "100%",
    action: "KILL",
    cls: "text-magenta border-magenta/50 bg-magenta/[0.06]",
    desc: "Hard cap — everything terminated. The firewall of last resort.",
  },
];

const METER_THRESHOLDS = [
  { p: 50, label: "NOTIFY", lit: "text-neon" },
  { p: 80, label: "SUSPEND", lit: "text-danger" },
  { p: 100, label: "KILL", lit: "text-magenta" },
];

type Verdict = { text: string; tone: "ok" | "deny" | "snow" } | null;
type MonitorState = "NOMINAL" | "NOTIFY" | "SUSPENDED";

const initialLog1 = (): AutoLogLine[] => [
  { id: 0, text: `[${logTs()}] > RBAC console armed — press RUN to walk the grant chain`, tone: "dim" },
];

const initialLog2 = (): AutoLogLine[] => [
  { id: 0, text: `[${logTs()}] > resource monitor RM_DORA armed — guarding the 100-credit quota`, tone: "dim" },
];

/* ------------------------------------------------------------------ */
/* Module                                                              */
/* ------------------------------------------------------------------ */

export default function GovernanceModule() {
  /* ============ SECTION 1 — ROLE HIERARCHY ============ */
  const [running1, setRunning1] = useState(false);
  const [started1, setStarted1] = useState(false);
  const [progress1, setProgress1] = useState(-1);
  const [verdict1, setVerdict1] = useState<Verdict>(null);
  const [selectedRole, setSelectedRole] = useState<DetailId | null>(null);
  const [log1, setLog1] = useState<AutoLogLine[]>(initialLog1);
  const log1Ref = useRef<AutoLogLine[] | null>(null);
  if (log1Ref.current == null) log1Ref.current = initialLog1();
  const lastStep1Ref = useRef(-1);
  const id1Ref = useRef(1);

  const push1 = useCallback((text: string, tone?: string) => {
    id1Ref.current += 1;
    log1Ref.current = [...(log1Ref.current ?? []), { id: id1Ref.current, text: `[${logTs()}] ${text}`, tone }].slice(-60);
    setLog1([...(log1Ref.current ?? [])]);
  }, []);

  const applyStep1 = useCallback(
    (s: number) => {
      if (s === 0) {
        if (lastStep1Ref.current === HIER_STEPS.length - 1) {
          push1("─── SCENARIO LOOP — RE-ARMING THE CHAIN ───", "dim");
          setVerdict1(null);
        }
        setStarted1(true);
      }
      lastStep1Ref.current = s;
      setProgress1(s);
      switch (s) {
        case 0:
          push1(`> ${HIER_STEPS[0].cmd}`, "snow");
          push1("> Role DORA_DEV successfully created — a blank custom role with zero privileges.", "mint");
          break;
        case 1:
          push1(`> ${HIER_STEPS[1].cmd}`, "snow");
          push1("> DEMO_DB owner → DORA_DEV — ownership transferred down the chain.", "mint");
          break;
        case 2:
          push1(`> ${HIER_STEPS[2].cmd}`, "snow");
          push1("> Ownership chain links up — SYSADMIN inherits DORA_DEV (hierarchy established).", "mint");
          break;
        case 3:
          push1(`> ${HIER_STEPS[3].cmd}`, "snow");
          push1("> Session context switched — CURRENT_ROLE = DORA_DEV.", "neon");
          break;
        case 4:
          push1(`> ${HIER_STEPS[4].cmd}`, "snow");
          push1("> Table DEMO_DB.PUBLIC.TRIPS created — write privileges flow through the chain.", "mint");
          setVerdict1({ text: "ACCESS GRANTED", tone: "ok" });
          break;
        case 5:
          push1(`> ${HIER_STEPS[5].cmd}`, "snow");
          push1("> SQL compilation error:", "danger");
          push1(">   Insufficient privileges to operate on database 'DEMO_DB'", "danger");
          push1("> DROP DATABASE is ACCOUNTADMIN-only — DORA_DEV holds schema-level rights, not account-level.", "magenta");
          setVerdict1({ text: "ACCESS DENIED", tone: "deny" });
          break;
      }
    },
    [push1]
  );

  const runner1 = useScenarioRunner(HIER_STEPS.length, running1, 1700, applyStep1);
  const resetRunner1 = runner1.reset;

  const reset1 = useCallback(() => {
    setRunning1(false);
    setStarted1(false);
    setProgress1(-1);
    setVerdict1(null);
    setSelectedRole(null);
    lastStep1Ref.current = -1;
    log1Ref.current = initialLog1();
    setLog1([...(log1Ref.current ?? [])]);
    resetRunner1();
  }, [resetRunner1]);

  /* auto-clear verdict flashes */
  useEffect(() => {
    if (!verdict1) return;
    const t = setTimeout(() => setVerdict1(null), 1500);
    return () => clearTimeout(t);
  }, [verdict1]);

  /* derived — section 1 */
  const phase1 = started1 ? progress1 : -1;
  const roleCreated = phase1 >= 0;
  const dbOwner = phase1 >= 1 ? "DORA_DEV" : "ACCOUNTADMIN";
  const chained = phase1 >= 2;
  const usersLinked = phase1 >= 3;
  const tableCreated = phase1 >= 4;
  const currentRole = phase1 >= 3 ? "DORA_DEV" : "ACCOUNTADMIN";
  const grantsIssued = (phase1 >= 1 ? 1 : 0) + (phase1 >= 2 ? 1 : 0);
  const detail = selectedRole ? ROLE_INFO[selectedRole] : null;

  /* ============ SECTION 2 — RESOURCE MONITOR ============ */
  const [burning, setBurning] = useState(true);
  const [boost, setBoost] = useState(false);
  const [credits, setCredits] = useState(0);
  const [monState, setMonState] = useState<MonitorState>("NOMINAL");
  const [warehouseOn, setWarehouseOn] = useState(true);
  const [triggeredAt, setTriggeredAt] = useState<string | null>(null);
  const [verdict2, setVerdict2] = useState<Verdict>(null);
  const [log2, setLog2] = useState<AutoLogLine[]>(initialLog2);

  const creditsRef = useRef(0);
  const monStateRef = useRef<MonitorState>("NOMINAL");
  const warehouseRef = useRef(true);
  const triggeredAtRef = useRef<string | null>(null);
  const boostRef = useRef(false);
  const log2Ref = useRef<AutoLogLine[] | null>(null);
  if (log2Ref.current == null) log2Ref.current = initialLog2();
  const id2Ref = useRef(1);

  const push2 = useCallback((text: string, tone?: string) => {
    id2Ref.current += 1;
    log2Ref.current = [...(log2Ref.current ?? []), { id: id2Ref.current, text: `[${logTs()}] ${text}`, tone }].slice(-60);
    setLog2([...(log2Ref.current ?? [])]);
  }, []);

  const flush2 = useCallback(() => {
    setCredits(creditsRef.current);
    setMonState(monStateRef.current);
    setWarehouseOn(warehouseRef.current);
    setTriggeredAt(triggeredAtRef.current);
    setLog2([...(log2Ref.current ?? [])]);
  }, []);

  const burnTick = useCallback(() => {
    if (monStateRef.current === "SUSPENDED") return;
    const before = creditsRef.current;
    const inc = boostRef.current ? 1.5 + Math.random() * 1.1 : 0.45 + Math.random() * 0.5;
    const next = Math.min(100, before + inc);
    creditsRef.current = next;

    if (before < 25 && next >= 25) push2("> COMPUTE_WH consumed 25% of quota (25.0 CR) — NOMINAL", "dim");
    if (before < 50 && next >= 50 && monStateRef.current === "NOMINAL") {
      monStateRef.current = "NOTIFY";
      push2("> RM_DORA trigger @ 50 PERCENT — DO NOTIFY → alert dispatched to ACCOUNTADMIN", "neon");
    }
    if (before < 75 && next >= 75) push2("> COMPUTE_WH consumed 75% of quota (75.0 CR) — approaching the suspend line", "dim");
    if (next >= 80) {
      monStateRef.current = "SUSPENDED";
      warehouseRef.current = false;
      triggeredAtRef.current = logTs();
      push2("> RM_DORA trigger @ 80 PERCENT — DO SUSPEND IMMEDIATELY", "danger");
      push2("> COMPUTE_WH suspended — running queries aborted, queued queries held", "danger");
      push2(`> credits frozen at ${next.toFixed(1)}% of the 100-credit quota`, "muted");
      setVerdict2({ text: "CREDIT GUARD TRIGGERED", tone: "deny" });
    }
    flush2();
  }, [push2, flush2]);

  useTicker(burning && monState !== "SUSPENDED", burnTick, boost ? 70 : 150);

  useEffect(() => {
    if (!verdict2) return;
    const t = setTimeout(() => setVerdict2(null), 1800);
    return () => clearTimeout(t);
  }, [verdict2]);

  const toggleBoost = useCallback(() => {
    const nv = !boostRef.current;
    boostRef.current = nv;
    setBoost(nv);
    push2(nv ? "> BOOST BURN engaged — flood the gauge, watch the guard react" : "> BOOST BURN disengaged — normal burn rate", nv ? "magenta" : "dim");
  }, [push2]);

  const resetQuota = useCallback(() => {
    creditsRef.current = 0;
    monStateRef.current = "NOMINAL";
    warehouseRef.current = true;
    triggeredAtRef.current = null;
    setVerdict2(null);
    push2("> RESET QUOTA — COMPUTE_WH resumed · RM_DORA re-armed at 0% / 100 CR", "mint");
    flush2();
  }, [push2, flush2]);

  const inspectWarehouse = useCallback(() => {
    push2(
      warehouseOn
        ? "> inspect COMPUTE_WH — X-SMALL warehouse running, credits accruing against RM_DORA"
        : "> inspect COMPUTE_WH — suspended by RM_DORA @ 80 PERCENT (SUSPEND IMMEDIATELY)",
      "dim"
    );
  }, [push2, warehouseOn]);

  const inspectMonitor = useCallback(() => {
    push2("> inspect RM_DORA — CREDIT_QUOTA 100 · triggers 50 NOTIFY / 80 SUSPEND IMMEDIATELY / 100 KILL", "dim");
  }, [push2]);

  /* derived — section 2 */
  const stateTone = monState === "SUSPENDED" ? "danger" : monState === "NOTIFY" ? "neon" : "snow";
  const fillGrad =
    credits >= 80
      ? "linear-gradient(90deg, rgba(103,232,249,0.85), rgba(255,45,120,0.95))"
      : credits >= 50
        ? "linear-gradient(90deg, rgba(41,181,232,0.8), rgba(103,232,249,0.9))"
        : "linear-gradient(90deg, rgba(41,181,232,0.4), rgba(41,181,232,0.85))";

  return (
    <div className="flex flex-col gap-6">
      {/* ================= SECTION 1 — ROLE HIERARCHY ================= */}
      <SectionTitle
        kicker="06 · A // RBAC GRAPH — DORA 'ROLES & ACCESS' LAB"
        title="ROLE HIERARCHY & OWNERSHIP CHAIN"
        desc="Create a custom role, transfer DEMO_DB ownership, link the hierarchy through SYSADMIN — then flip the session role and watch DROP DATABASE get denied at the door."
      />

      <UseCaseShell
        title="SIM 01 // GRANT CHAIN"
        subtitle="ACCOUNTADMIN → SYSADMIN → DORA_DEV → USERS"
        stats={
          <>
            <UCStat label="CURRENT ROLE" value={currentRole} tone={currentRole === "ACCOUNTADMIN" ? "magenta" : "mint"} />
            <UCStat label="GRANTS ISSUED" value={String(grantsIssued)} tone="snow" />
            <UCStat label="DEMO_DB OWNER" value={dbOwner} tone={dbOwner === "DORA_DEV" ? "mint" : "neutral"} />
            <UCStat label="HIERARCHY" value={chained ? "ESTABLISHED" : "PENDING"} tone={chained ? "mint" : "neutral"} />
            <UCStat label="TABLE TRIPS" value={tableCreated ? "CREATED" : "—"} tone={tableCreated ? "mint" : "neutral"} />
            <UCStat
              label="LAST VERDICT"
              value={verdict1?.text ?? "—"}
              tone={verdict1?.tone === "ok" ? "mint" : verdict1?.tone === "deny" ? "danger" : "neutral"}
            />
          </>
        }
        controls={
          <div className="flex flex-col gap-2.5">
            <SimControls
              running={running1}
              onToggle={() => setRunning1((r) => !r)}
              onReset={reset1}
              status={running1 ? "GRANT CHAIN LIVE — WALKING THE RBAC GRAPH" : "IDLE — PRESS RUN TO WALK THE CHAIN"}
              hint="6 LAB STEPS · 1.7S PER STEP · LOOPS UNTIL PAUSED"
            />
            <p className="text-[8px] font-bold uppercase tracking-[0.18em] text-muted-foreground leading-relaxed">
              <span className="text-snow">TIP · </span>CLICK ANY ROLE NODE ON THE CANVAS TO INSPECT ITS PRIVILEGE LIST.
            </p>
          </div>
        }
        logLines={log1}
        logTitle="GRANT LOG // LIVE"
        logEmpty="PRESS RUN TO WALK THE GRANT CHAIN…"
      >
        <FlowCanvas className="h-full w-full" ariaLabel="Snowflake role hierarchy flow diagram with grant chain">
          {/* LINKS */}
          <FlowLink d="M50,17 L50,33" status="cyber" dot dotDuration={1.6} showArrow strokeWidth={1.2} />
          <FlowLink
            d="M50,42 C50,50 38,52 38,60"
            status={chained ? "success" : "idle"}
            dot={chained}
            dotDuration={1.3}
            showArrow={chained}
          />
          <FlowLink
            d="M38,70 L38,85"
            status={usersLinked ? "success" : "idle"}
            dot={usersLinked}
            dotDuration={1.2}
            showArrow={usersLinked}
          />
          <FlowLink
            d="M43,66 L71,66"
            status={phase1 >= 1 ? "success" : "idle"}
            dot={phase1 >= 1}
            dotDuration={1.1}
            dashed={phase1 < 1}
            showArrow={phase1 >= 1}
          />
          {phase1 === 5 && <FlowLink d="M43,70 C54,81 60,76 70,71" status="error" dot dotDuration={0.8} strokeWidth={1.4} />}

          {/* NODES */}
          <FlowNode
            x={50}
            y={12}
            icon={ROLE_INFO.ACCOUNTADMIN.icon}
            label="ACCOUNTADMIN"
            sub="CROWN · GOD-MODE"
            status="cyber"
            active
            pulse={currentRole === "ACCOUNTADMIN"}
            onClick={() => setSelectedRole((r) => (r === "ACCOUNTADMIN" ? null : "ACCOUNTADMIN"))}
            size="md"
            delay={0.05}
          />
          <FlowNode
            x={50}
            y={38}
            icon={<RoleIcon className="w-3 h-3" aria-hidden="true" />}
            label="SYSADMIN"
            sub={chained ? "INHERITS DORA_DEV" : "HUB ROLE"}
            status={chained ? "success" : "idle"}
            active={chained}
            pulse={phase1 === 2}
            onClick={() => setSelectedRole((r) => (r === "SYSADMIN" ? null : "SYSADMIN"))}
            size="sm"
            delay={0.12}
          />
          <FlowNode
            x={38}
            y={65}
            icon={<RoleIcon className="w-3 h-3" aria-hidden="true" />}
            label="DORA_DEV"
            sub={roleCreated ? "CUSTOM ROLE" : "NOT CREATED"}
            status={!roleCreated ? "idle" : phase1 >= 2 ? "success" : "active"}
            active={roleCreated}
            pulse={currentRole === "DORA_DEV"}
            onClick={() => setSelectedRole((r) => (r === "DORA_DEV" ? null : "DORA_DEV"))}
            size="sm"
            delay={0.2}
          />
          <FlowNode
            x={38}
            y={90}
            icon={<UsersIcon className="w-3 h-3" aria-hidden="true" />}
            label="USERS"
            sub={usersLinked ? "SESSION: DORA_DEV" : "SESSION PRINCIPALS"}
            status={usersLinked ? "active" : "idle"}
            onClick={() => setSelectedRole((r) => (r === "USERS" ? null : "USERS"))}
            size="sm"
            delay={0.28}
          />
          <FlowNode
            x={76}
            y={66}
            icon={<DatabaseIcon className="w-3 h-3" aria-hidden="true" />}
            label="DEMO_DB"
            sub={`OWNER: ${dbOwner}`}
            status={verdict1?.tone === "deny" ? "error" : phase1 >= 1 ? "success" : "idle"}
            onClick={() => setSelectedRole((r) => (r === "DEMO_DB" ? null : "DEMO_DB"))}
            size="sm"
            delay={0.24}
          />

          {/* LABELS */}
          <FlowLabel x={58.5} y={25} tone="magenta">
            GRANTS
          </FlowLabel>
          <FlowLabel x={21} y={51} tone={chained ? "mint" : "default"}>
            {chained ? "HIERARCHY LINKED" : "GRANT ROLE → SYSADMIN"}
          </FlowLabel>
          {tableCreated && (
            <FlowLabel x={76} y={78} tone="mint">
              TABLE: TRIPS ✓
            </FlowLabel>
          )}
          <FlowLabel x={50} y={97.5}>
            CLICK ANY NODE — INSPECT ITS PRIVILEGES
          </FlowLabel>
        </FlowCanvas>

        {/* SESSION ROLE BADGE — animated CURRENT_ROLE readout */}
        <div className="absolute right-2 top-2 z-20 glass-inset cyber-cut-sm px-2.5 py-1.5 flex items-center gap-2 overflow-hidden">
          <motion.span
            key={`flash-${currentRole}`}
            initial={{ opacity: 0.85 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.9 }}
            className={`absolute inset-0 pointer-events-none ${currentRole === "DORA_DEV" ? "bg-mint/25" : "bg-magenta/25"}`}
            aria-hidden="true"
          />
          <span className="text-[7.5px] uppercase tracking-[0.18em] text-muted-foreground font-bold">CURRENT_ROLE</span>
          <AnimatePresence mode="wait">
            <motion.span
              key={currentRole}
              initial={{ opacity: 0, y: -8, scale: 1.25 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.22 }}
              className={`relative text-[9px] font-extrabold tracking-[0.14em] ${
                currentRole === "DORA_DEV" ? "text-mint text-glow" : "text-magenta text-glow"
              }`}
            >
              {currentRole}
            </motion.span>
          </AnimatePresence>
        </div>

        <StepBadge
          step={Math.max(0, progress1)}
          total={HIER_STEPS.length}
          text={started1 ? HIER_STEPS[Math.max(0, progress1)].detail : "STANDBY — PRESS RUN"}
        />

        <VerdictFlash show={!!verdict1} text={verdict1?.text ?? ""} tone={verdict1?.tone ?? "snow"} />

        {/* NODE DETAIL CARD */}
        <AnimatePresence>
          {detail && selectedRole && (
            <motion.aside
              key={selectedRole}
              initial={{ opacity: 0, x: 14 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 14 }}
              transition={{ duration: 0.2 }}
              role="region"
              aria-label={`${detail.label} privilege detail`}
              className="absolute right-2 bottom-2 z-30 w-[min(272px,64%)] glass-inset cyber-cut-sm p-2.5"
            >
              <div className="flex items-start justify-between gap-2 pb-1.5 border-b border-snow/15">
                <div className="min-w-0">
                  <p className="flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.14em] text-snow">
                    {detail.icon}
                    {detail.label}
                  </p>
                  <p className="text-[7px] uppercase tracking-[0.18em] text-muted-foreground mt-0.5">{detail.kind}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedRole(null)}
                  aria-label={`Close ${detail.label} detail card`}
                  className="shrink-0 p-1 border border-foreground/20 text-muted-foreground hover:border-danger/60 hover:text-danger transition-colors"
                >
                  <X className="w-2.5 h-2.5" aria-hidden="true" />
                </button>
              </div>
              <div className="flex flex-col gap-1 pt-1.5">
                {detail.privileges.map((p) => (
                  <p key={p} className="flex gap-1.5 text-[7.5px] leading-relaxed tracking-wider text-foreground/80">
                    <span className={`shrink-0 ${p.startsWith("✗") ? "text-danger" : "text-mint"}`}>▸</span>
                    <span>{p}</span>
                  </p>
                ))}
              </div>
              <p className="mt-1.5 pt-1.5 border-t border-snow/10 text-[7px] font-bold uppercase tracking-[0.16em] text-magenta">
                {detail.note}
              </p>
            </motion.aside>
          )}
        </AnimatePresence>
      </UseCaseShell>

      {/* ================= SECTION 2 — RESOURCE MONITOR ================= */}
      <SectionTitle
        kicker="06 · B // CREDIT FIREWALL — DORA 'RESOURCE MONITOR SETUP' LAB"
        title="RESOURCE MONITOR — CREDIT GAUGE"
        desc="COMPUTE_WH burns credits live against RM_DORA. At 50% the monitor notifies, at 80% it suspends the warehouse immediately — a credit firewall against runaway compute."
      />

      <UseCaseShell
        title="SIM 02 // CREDIT GUARD"
        subtitle="COMPUTE_WH × RM_DORA · CREDIT_QUOTA = 100"
        stats={
          <>
            <UCStat label="CURRENT ROLE" value={currentRole} tone={currentRole === "ACCOUNTADMIN" ? "magenta" : "mint"} />
            <UCStat
              label="CREDITS USED"
              value={`${credits.toFixed(1)} %`}
              tone={credits >= 80 ? "danger" : credits >= 50 ? "neon" : "snow"}
            />
            <UCStat label="QUOTA" value="100 CR" tone="snow" />
            <UCStat label="MONITOR STATE" value={monState} tone={stateTone} />
            <UCStat label="TRIGGERED AT" value={triggeredAt ?? "—"} tone={triggeredAt ? "danger" : "neutral"} />
            <UCStat
              label="WAREHOUSE"
              value={warehouseOn ? "RUNNING" : "SUSPENDED"}
              tone={warehouseOn ? "mint" : "danger"}
            />
          </>
        }
        controls={
          <div className="flex flex-col gap-2.5">
            <SimControls
              running={burning}
              onToggle={() => setBurning((b) => !b)}
              onReset={resetQuota}
              status={
                monState === "SUSPENDED"
                  ? "MONITOR ENGAGED — WAREHOUSE SUSPENDED"
                  : burning
                    ? "BURN LIVE — RM_DORA IS WATCHING"
                    : "BURN PAUSED — PRESS RUN TO RESUME"
              }
              hint="THRESHOLDS: 50 NOTIFY · 80 SUSPEND IMMEDIATELY · 100 KILL"
            />
            <div className="flex flex-wrap gap-2">
              <UCToggle on={boost} onClick={toggleBoost} accent="magenta" ariaLabel="Boost warehouse credit burn rate">
                <Zap className="w-3 h-3" aria-hidden="true" />
                BOOST BURN
              </UCToggle>
              <UCButton onClick={resetQuota} tone="mint" ariaLabel="Reset credit quota and resume the warehouse">
                <RotateCcw className="w-3 h-3" aria-hidden="true" />
                RESET QUOTA
              </UCButton>
            </div>
          </div>
        }
        logLines={log2}
        logTitle="MONITOR LOG // LIVE"
        logEmpty="PRESS RUN TO START THE BURN…"
      >
        <div className="relative h-full flex flex-col">
          <VerdictFlash show={!!verdict2} text={verdict2?.text ?? ""} tone={verdict2?.tone ?? "deny"} />

          {/* CREDIT GAUGE */}
          <div className="shrink-0 px-3 sm:px-4 pt-3 pb-1 flex flex-col gap-1.5">
            <div className="flex items-end justify-between gap-2">
              <p className="text-[8px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                CREDIT GAUGE // COMPUTE_WH vs QUOTA 100 CR
              </p>
              <p
                className={`text-[11px] font-extrabold tabular-nums ${
                  credits >= 80 ? "text-danger text-glow" : credits >= 50 ? "text-neon" : "text-snow"
                }`}
              >
                {credits.toFixed(1)}%
              </p>
            </div>
            <div
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(credits)}
              aria-label="Warehouse credit consumption versus quota"
              className="relative h-7 glass-inset cyber-cut-sm overflow-hidden"
            >
              <motion.div
                className="absolute inset-y-0 left-0"
                animate={{ width: `${credits}%` }}
                transition={{ duration: 0.22, ease: "linear" }}
                style={{
                  background: fillGrad,
                  boxShadow: credits >= 80 ? "0 0 18px rgba(255,45,120,0.45)" : "0 0 14px rgba(41,181,232,0.3)",
                }}
              />
              {METER_THRESHOLDS.filter((t) => t.p < 100).map((t) => (
                <span
                  key={t.p}
                  className={`absolute top-0 bottom-0 w-px ${credits >= t.p ? "bg-danger/70" : "bg-foreground/25"}`}
                  style={{ left: `${t.p}%` }}
                  aria-hidden="true"
                />
              ))}
              {monState === "SUSPENDED" && (
                <span className="absolute right-1.5 top-1/2 -translate-y-1/2 text-[7.5px] font-extrabold uppercase tracking-[0.22em] text-danger">
                  SUSPENDED
                </span>
              )}
            </div>
            <div className="relative h-3.5" aria-hidden="true">
              {METER_THRESHOLDS.map((t) => (
                <span
                  key={t.p}
                  className={`absolute top-0 text-[7px] font-bold uppercase tracking-[0.14em] whitespace-nowrap ${
                    credits >= t.p ? t.lit : "text-muted-foreground/60"
                  }`}
                  style={{
                    left: `${t.p}%`,
                    transform: t.p === 100 ? "translateX(-100%)" : "translateX(-50%)",
                  }}
                >
                  {t.p}% {t.label}
                </span>
              ))}
            </div>
          </div>

          {/* WAREHOUSE × MONITOR FLOW */}
          <FlowCanvas
            className="flex-1 min-h-0 mx-3 sm:mx-4 mb-3"
            ariaLabel="Resource monitor guarding warehouse credit consumption flow"
          >
            <FlowLink
              d="M36,52 L63,52"
              status={monState === "SUSPENDED" ? "error" : monState === "NOTIFY" ? "flowing" : "idle"}
              dot={monState !== "NOMINAL"}
              dotDuration={1.1}
              strokeWidth={1.2}
              showArrow
            />
            <FlowNode
              x={26}
              y={52}
              icon={<WarehouseIcon className="w-4 h-4" aria-hidden="true" />}
              label="COMPUTE_WH"
              sub={warehouseOn ? "X-SMALL — BURNING" : "SUSPENDED"}
              status={warehouseOn ? "active" : "idle"}
              active={warehouseOn}
              pulse={warehouseOn}
              onClick={inspectWarehouse}
              size="md"
              delay={0.05}
            />
            <FlowNode
              x={74}
              y={52}
              icon={<MonitorIcon className="w-4 h-4" aria-hidden="true" />}
              label="RM_DORA"
              sub={`STATE: ${monState}`}
              status={monState === "SUSPENDED" ? "error" : monState === "NOTIFY" ? "warn" : "idle"}
              pulse={monState !== "NOMINAL"}
              onClick={inspectMonitor}
              size="md"
              delay={0.14}
            />
            <FlowLabel x={26} y={16} tone="snow">
              CREDIT BURNER
            </FlowLabel>
            <FlowLabel x={74} y={16} tone={monState === "SUSPENDED" ? "danger" : "default"}>
              CREDIT FIREWALL
            </FlowLabel>
            <FlowLabel x={50} y={92} tone={monState === "SUSPENDED" ? "danger" : "default"}>
              TRIGGERS · 50 NOTIFY · 80 SUSPEND IMMEDIATELY · 100 KILL
            </FlowLabel>
          </FlowCanvas>
        </div>
      </UseCaseShell>

      {/* ================= TRIGGER DDL + MATRIX ================= */}
      <div className="grid gap-4 lg:grid-cols-2">
        <SqlCodeBlock code={RM_DDL} label="DDL // CREATE RESOURCE MONITOR RM_DORA" delay={0.05} />
        <GlassPanel title="TRIGGER MATRIX" subtitle="WHAT FIRES AT EACH THRESHOLD" className="!p-0" delay={0.1}>
          <div className="p-3 flex flex-col gap-2">
            {TRIGGER_ROWS.map((t) => (
              <div key={t.p} className="flex items-start gap-2.5 border border-foreground/10 bg-black/40 px-2.5 py-2">
                <span
                  className={`shrink-0 px-1.5 py-0.5 text-[9px] font-extrabold tabular-nums border ${t.cls}`}
                  aria-hidden="true"
                >
                  {t.p}
                </span>
                <div className="min-w-0">
                  <p className={`text-[8.5px] font-extrabold uppercase tracking-[0.16em] ${t.cls.split(" ")[0]}`}>
                    {t.action}
                  </p>
                  <p className="mt-0.5 text-[8px] leading-relaxed tracking-wider text-muted-foreground">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </GlassPanel>
      </div>

      {/* ================= KNOWLEDGE CALLOUTS ================= */}
      <div className="grid gap-3 md:grid-cols-3">
        <Callout type="critical" title="ACCOUNTADMIN is god-mode" delay={0.05}>
          ACCOUNTADMIN holds every privilege in the account — CREATE ROLE, MANAGE GRANTS, DROP DATABASE. Never use it
          day-to-day: run daily work as SYSADMIN or a lower custom role and save the crown for setup-only moments.
        </Callout>
        <Callout type="exam" title="Ownership ≠ grants" delay={0.1}>
          TRANSFER OWNERSHIP moves the whole object chain — that is why the lab grants DEMO_DB to DORA_DEV, then links
          the role to SYSADMIN. Since ACCOUNTADMIN sits above SYSADMIN in the same tree, it still reaches the object even
          after ownership moves down.
        </Callout>
        <Callout type="tip" title="Resource monitors = credit firewall" delay={0.15}>
          Just because additional compute power is available does not mean it should be used without limits. A resource
          monitor with SUSPEND IMMEDIATELY caps a runaway warehouse at exactly the credits you allow — RM_DORA halts
          COMPUTE_WH the moment 80% of the quota burns.
        </Callout>
      </div>
    </div>
  );
}
