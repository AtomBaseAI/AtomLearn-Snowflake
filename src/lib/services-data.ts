import type { SnowIconId } from "@/components/shared/snowflake-icons";

export interface ServiceStat {
  label: string;
  value: string;
}

export interface ServiceDoc {
  title: string;
  label: string;
  url: string;
}

export interface ServiceMeta {
  id: string;
  index: string;
  name: string;
  short: string;
  abbr: string;
  category:
    | "CORE"
    | "COMPUTE"
    | "DATA-PIPE"
    | "GOVERNANCE"
    | "LABS";
  tagline: string;
  description: string;
  iconId: SnowIconId;
  stats: ServiceStat[];
  docs?: ServiceDoc[];
  /** hotkey for keyboard nav */
  hotkey?: string;
}

export const SERVICES: ServiceMeta[] = [
  {
    id: "overview",
    index: "01",
    name: "SNOWFLAKE CORE",
    short: "CORE",
    abbr: "CORE",
    category: "CORE",
    tagline: "One platform. Three layers. Zero ops.",
    description:
      "Snowflake decouples storage, compute and cloud services into an elastic mesh that scales without contention. Explore the living core in 3D — virtual warehouses orbiting a shared, governed data cloud.",
    iconId: "flake",
    stats: [
      { label: "CLOUDS", value: "AWS·AZ·GCP" },
      { label: "WAREHOUSES", value: "INFINITE" },
      { label: "STORAGE", value: "MICRO-PART" },
      { label: "OPS BURDEN", value: "ZERO" },
    ],
    docs: [
      {
        title: "Snowflake Architecture",
        label: "ARCHITECTURE",
        url: "https://docs.snowflake.com/en/user-guide/intro-key-concepts",
      },
    ],
    hotkey: "1",
  },
  {
    id: "architecture",
    index: "02",
    name: "PLATFORM ARCHITECTURE",
    short: "ARCH",
    abbr: "ARCH",
    category: "CORE",
    tagline: "Database storage · Query processing · Cloud services.",
    description:
      "Trace a query end-to-end through Snowflake's three independently-scaling layers: the metadata-rich cloud services brain, MPP virtual warehouses, and the S3-backed micro-partition storage fabric.",
    iconId: "layers",
    stats: [
      { label: "LAYERS", value: "3" },
      { label: "STORAGE", value: "S3-BACKED" },
      { label: "MPP NODES", value: "ELASTIC" },
      { label: "META STORE", value: "CLOUD SVC" },
    ],
    docs: [
      {
        title: "Snowflake Key Concepts",
        label: "KEY CONCEPTS",
        url: "https://docs.snowflake.com/en/user-guide/intro-key-concepts",
      },
    ],
    hotkey: "2",
  },
  {
    id: "warehouses",
    index: "03",
    name: "VIRTUAL WAREHOUSES",
    short: "WH",
    abbr: "WH",
    category: "COMPUTE",
    tagline: "Isolated MPP clusters. Sized XS → 6XL. Auto-suspend.",
    description:
      "Virtual warehouses are independent compute clusters that never contend for resources. Simulate query queuing, multi-cluster scale-out, auto-suspend and warehouse sizing against live credit burn.",
    iconId: "warehouse",
    stats: [
      { label: "SIZES", value: "XS→6XL" },
      { label: "CREDITS/H", value: "1→512" },
      { label: "SCALING", value: "MIN/MAX" },
      { label: "AUTO-SUSPEND", value: "60s+" },
    ],
    docs: [
      {
        title: "Snowflake Virtual Warehouses",
        label: "WAREHOUSES",
        url: "https://docs.snowflake.com/en/user-guide/warehouses-overview",
      },
    ],
    hotkey: "3",
  },
  {
    id: "ingestion",
    index: "04",
    name: "INGESTION & STAGING",
    short: "INGEST",
    abbr: "ING",
    category: "DATA-PIPE",
    tagline: "CSV · TSV · JSON → Stage → COPY INTO tables.",
    description:
      "Load structured and semi-structured data: PUT files to internal stages, query with file formats, and COPY INTO tables. Watch delimited data, JSON tweets and TSV files land as governed relational data.",
    iconId: "stage",
    stats: [
      { label: "FORMATS", value: "CSV/TSV/JSON" },
      { label: "STAGES", value: "INT/EXT" },
      { label: "COMMANDS", value: "PUT·COPY" },
      { label: "VALIDATE", value: "PREVIEW" },
    ],
    docs: [
      {
        title: "Snowflake Data Loading",
        label: "DATA LOADING",
        url: "https://docs.snowflake.com/en/user-guide/data-load-overview",
      },
    ],
    hotkey: "4",
  },
  {
    id: "snowpipe",
    index: "05",
    name: "SNOWPIPE · STREAMS · TASKS",
    short: "PIPE",
    abbr: "PIPE",
    category: "DATA-PIPE",
    tagline: "Continuous ETL/ELT. Auto-ingest. Idempotent MERGE.",
    description:
      "Snowpipe loads micro-batches seconds after they land. Streams capture deltas, tasks schedule idempotent MERGE transforms — wire the full event-driven ELT pipeline from the Data Engineering lab.",
    iconId: "pipe",
    stats: [
      { label: "LATENCY", value: "~SECONDS" },
      { label: "TRIGGER", value: "SQS EVENT" },
      { label: "STREAMS", value: "DELTA CDC" },
      { label: "TASKS", value: "CRON DAG" },
    ],
    docs: [
      {
        title: "Snowpipe Introduction",
        label: "SNOWPIPE",
        url: "https://docs.snowflake.com/en/user-guide/data-load-snowpipe-intro",
      },
    ],
    hotkey: "5",
  },
  {
    id: "governance",
    index: "06",
    name: "GOVERNANCE & RBAC",
    short: "RBAC",
    abbr: "RBAC",
    category: "GOVERNANCE",
    tagline: "Roles, ownership chains and credit guards.",
    description:
      "ACCOUNTADMIN grants SYSADMIN the crown jewels; resource monitors slam the brakes on runaway warehouses. Explore Snowflake's role hierarchy, ownership transfer and cost-control firewall in motion.",
    iconId: "shield",
    stats: [
      { label: "TOP ROLE", value: "ACCOUNTADMIN" },
      { label: "HOOK", value: "SYSADMIN" },
      { label: "MONITOR", value: "CREDIT %" },
      { label: "SUSPEND", value: "INSTANT" },
    ],
    docs: [
      {
        title: "Snowflake Access Control",
        label: "ACCESS CONTROL",
        url: "https://docs.snowflake.com/en/user-guide/security-access-control-overview",
      },
    ],
    hotkey: "6",
  },
  {
    id: "labs",
    index: "07",
    name: "LAB EXPLORER",
    short: "LABS",
    abbr: "LAB",
    category: "LABS",
    tagline: "DORA labs: Data Warehousing & Data Engineering.",
    description:
      "The full hands-on curriculum: every lab, module, flow-diagram, SQL snippet and step from the Data Warehousing and Data Engineering course exports — rendered as an interactive mission console.",
    iconId: "flask",
    stats: [
      { label: "COURSES", value: "2" },
      { label: "LABS", value: "6" },
      { label: "MODULES", value: "28" },
      { label: "STEPS", value: "138" },
    ],
    hotkey: "7",
  },
];

export const SERVICE_MAP: Record<string, ServiceMeta> = Object.fromEntries(
  SERVICES.map((s) => [s.id, s])
);

export function resolveServiceKey(key: string | null): string {
  if (!key) return SERVICES[0].id;
  const k = key.toLowerCase();
  if (SERVICE_MAP[k]) return k;
  const byAbbr = SERVICES.find(
    (s) => s.abbr.toLowerCase() === k || s.short.toLowerCase() === k
  );
  return byAbbr ? byAbbr.id : SERVICES[0].id;
}

/** parse a URL boolean param — "true"/"1"/"yes" → true, anything else false
 *  (ported from the reference AtomLearn-AWS repo's services-data) */
export function parseBoolParam(v: string | null): boolean {
  if (!v) return false;
  return ["true", "1", "yes", "on"].includes(v.toLowerCase());
}
