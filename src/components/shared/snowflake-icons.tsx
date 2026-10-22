import React from "react";

/**
 * SNOWFLAKE//NEXUS icon set — hand-drawn SVG glyphs (fill: currentColor)
 * so flow nodes and buttons inherit status colors.
 */

export type SnowIconId =
  | "flake"
  | "layers"
  | "warehouse"
  | "stage"
  | "pipe"
  | "shield"
  | "flask"
  | "database"
  | "table"
  | "view"
  | "role"
  | "stream"
  | "task"
  | "monitor"
  | "storage"
  | "compute"
  | "cloud"
  | "query"
  | "file"
  | "spark";

type IconProps = { className?: string; style?: React.CSSProperties };

const wrap = (children: React.ReactNode, vb = "0 0 24 24") =>
  function SnowIcon({ className, style }: IconProps) {
    return (
      <svg
        viewBox={vb}
        fill="currentColor"
        aria-hidden="true"
        className={className}
        style={style}
        focusable="false"
      >
        {children}
      </svg>
    );
  };

/* Six-armed snowflake — the brand mark */
export const FlakeIcon = wrap(
  <path d="M12 1.5c.4 0 .7.3.7.7v3.4l2.2-1.3a.7.7 0 0 1 .7 1.2L12.7 7.2v3.1l2.7-1.6V5.5a.7.7 0 0 1 1.4 0v2.4l2.9-1.7a.7.7 0 1 1 .7 1.2l-2.9 1.7 2 1.2a.7.7 0 0 1-.7 1.2l-2.7-1.6-2.7 1.6 2.7 1.6 2.7-1.6a.7.7 0 0 1 .7 1.2l-2 1.2 2.9 1.7a.7.7 0 1 1-.7 1.2l-2.9-1.7v2.4a.7.7 0 0 1-1.4 0v-3.2l-2.7-1.6v3.1l2.9 1.7a.7.7 0 1 1-.7 1.2l-2.2-1.3v3.4a.7.7 0 0 1-1.4 0v-3.4l-2.2 1.3a.7.7 0 1 1-.7-1.2l2.9-1.7v-3.1l-2.7 1.6v3.2a.7.7 0 0 1-1.4 0v-2.4l-2.9 1.7a.7.7 0 1 1-.7-1.2l2.9-1.7-2-1.2a.7.7 0 0 1 .7-1.2l2.7 1.6 2.7-1.6-2.7-1.6-2.7 1.6a.7.7 0 0 1-.7-1.2l2-1.2-2.9-1.7a.7.7 0 1 1 .7-1.2l2.9 1.7V5.5a.7.7 0 0 1 1.4 0v3.2l2.7 1.6V7.2L8.4 5.5a.7.7 0 1 1 .7-1.2l2.2 1.3V2.2c0-.4.3-.7.7-.7Z" />
);

/* Stacked layers — platform architecture */
export const LayersIcon = wrap(
  <>
    <path d="M12 2 2 7l10 5 10-5-10-5Zm-8.3 5L12 3.6 20.3 7 12 10.4 3.7 7Z" />
    <path d="M2 12l10 5 10-5-1.8-.9L12 15.2 3.8 11.1 2 12Zm0 5 10 5 10-5-1.8-.9L12 20.2 3.8 16.1 2 17Z" />
  </>
);

/* Compute warehouse — chip inside brackets */
export const WarehouseIcon = wrap(
  <>
    <path d="M4 4h4v2H6v12h2v2H4V4Zm16 0v16h-4v-2h2V6h-2V4h4Z" />
    <path d="M8 8h8v8H8V8Zm2 2v4h4v-4h-4Z" />
    <path d="M11 2h2v3h-2V2Zm0 17h2v3h-2v-3ZM2 11h3v2H2v-2Zm17 0h3v2h-3v-2Z" />
  </>
);

/* Stage — tray with files */
export const StageIcon = wrap(
  <>
    <path d="M3 13h18v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3Zm2 2v1h14v-1H5Z" />
    <path d="M6 4h8l3 3v4h-2V8h-2V6H8v5H6V4Z" />
    <path d="M3 20h18v2H3v-2Z" opacity=".55" />
  </>
);

/* Pipeline — pipe with flowing dot */
export const PipeIcon = wrap(
  <>
    <path d="M2 10h9V7l5 4-5 4v-3H4v5H2v-7Zm20 4h-6v-2h4v-3h2v5Z" />
    <circle cx="19" cy="9" r="2" />
  </>
);

/* Shield — governance */
export const ShieldIcon = wrap(
  <>
    <path d="M12 2 4 5v6c0 5.2 3.4 9.4 8 11 4.6-1.6 8-5.8 8-11V5l-8-3Zm0 2.1 6 2.2V11c0 4.2-2.6 7.6-6 9-3.4-1.4-6-4.8-6-9V6.3l6-2.2Z" />
    <path d="m11 14.2-2.1-2.1L7.5 13.5 11 17l5.5-5.5-1.4-1.4L11 14.2Z" />
  </>
);

/* Flask — labs */
export const FlaskIcon = wrap(
  <>
    <path d="M9 2h6v2h-1v5.5l5.7 9.1A2 2 0 0 1 18 21.7H6a2 2 0 0 1-1.7-3.1L10 9.5V4H9V2Zm3 9.1-2.4 3.9h4.8L12 11.1Zm-3.6 5.9-1.7 2.7h10.6L15.6 17H8.4Z" />
  </>
);

/* Database — cylinder */
export const DatabaseIcon = wrap(
  <path d="M12 2c-4.4 0-8 1.6-8 3.6v12.8c0 2 3.6 3.6 8 3.6s8-1.6 8-3.6V5.6c0-2-3.6-3.6-8-3.6Zm0 2c3.7 0 6 1.2 6 1.6s-2.3 1.6-6 1.6-6-1.2-6-1.6S8.3 4 12 4Zm6 14.4c0 .4-2.3 1.6-6 1.6s-6-1.2-6-1.6v-2.5c1.5.8 3.6 1.2 6 1.2s4.5-.4 6-1.2v2.5Zm0-5c0 .4-2.3 1.6-6 1.6s-6-1.2-6-1.6v-2.5c1.5.8 3.6 1.2 6 1.2s4.5-.4 6-1.2v2.5Z" />
);

/* Table */
export const TableIcon = wrap(
  <path d="M3 3h18v18H3V3Zm2 2v4h6V5H5Zm8 0v4h6V5h-6ZM5 11v4h6v-4H5Zm8 0v4h6v-4h-6ZM5 17v2h6v-2H5Zm8 0v2h6v-2h-6Z" />
);

/* View */
export const ViewIcon = wrap(
  <path d="M12 5c5 0 9.3 2.9 11 7-1.7 4.1-6 7-11 7S2.7 16.1 1 12c1.7-4.1 6-7 11-7Zm0 2C8.2 7 4.8 9.1 3.2 12 4.8 14.9 8.2 17 12 17s7.2-2.1 8.8-5C19.2 9.1 15.8 7 12 7Zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6Z" />
);

/* Role — key */
export const RoleIcon = wrap(
  <path d="M14 2a6 6 0 0 0-5.7 7.9L2 16.2V22h5.8l1.4-1.4V18.2h2.4l1.7-1.7.2-1.9.4-.1A6 6 0 1 0 14 2Zm2 6a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z" />
);

/* Stream — delta waves */
export const StreamIcon = wrap(
  <path d="M3 6h3v4h4V6h4v4h4V6h3v12h-3v-4h-4v4h-4v-4H6v4H3V6Z" />
);

/* Task — scheduled clock */
export const TaskIcon = wrap(
  <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm0 2a8 8 0 1 1 0 16 8 8 0 0 1 0-16Zm-1 3v6l4.5 2.7 1-1.7-3.5-2V7h-2Z" />
);

/* Monitor — credit gauge */
export const MonitorIcon = wrap(
  <path d="M3 4h18v12H3V4Zm2 2v8h14V6H5Zm1.5 6 2.5-3 2 2 3-4 2.5 5h-10ZM4 18h16v2H4v-2Z" />
);

/* Storage — micro-partition stack */
export const StorageIcon = wrap(
  <path d="M4 4h7v5H4V4Zm9 0h7v5h-7V4ZM4 10h7v5H4v-5Zm9 0h7v5h-7v-5ZM4 16h7v4H4v-4Zm9 0h7v4h-7v-4Z" />
);

/* Compute — cluster */
export const ComputeIcon = wrap(
  <>
    <circle cx="12" cy="12" r="3.2" />
    <circle cx="4.5" cy="5.5" r="2.2" />
    <circle cx="19.5" cy="5.5" r="2.2" />
    <circle cx="4.5" cy="18.5" r="2.2" />
    <circle cx="19.5" cy="18.5" r="2.2" />
    <path d="m6 6.9 3.9 3.2-1.2 1.6L4.8 8.4 6 6.9Zm12 0 1.2 1.5-3.9 3.3-1.2-1.6 3.9-3.2ZM6 17.1l3.9-3.3 1.2 1.6-3.9 3.2L6 17.1Zm12 0-1.2 1.5-3.9-3.2 1.2-1.6 3.9 3.3Z" />
  </>
);

/* Cloud services */
export const CloudIcon = wrap(
  <path d="M7 18a5 5 0 0 1-.9-9.9 6 6 0 0 1 11.6-1.2A4.5 4.5 0 0 1 17.5 16H7v2Zm-.5-2h11a2.5 2.5 0 0 0 .4-5l-1.3-.2-.4-1.2a4 4 0 0 0-7.7.8l-.2 1.4-1.4.2A3 3 0 0 0 6.5 16Z" />
);

/* Query — terminal prompt */
export const QueryIcon = wrap(
  <path d="M3 4h18v16H3V4Zm2 2v12h14V6H5Zm2 2 3.5 3L7 14l1.4 1.4L12.2 11 8.4 7.6 7 8Zm5 6h5v1.6h-5V14Z" />
);

/* File */
export const FileIcon = wrap(
  <path d="M6 2h9l5 5v15H6V2Zm2 2v16h10V8h-4V4H8Zm8 .8V6h1.2L16 4.8Z" />
);

/* Spark */
export const SparkIcon = wrap(
  <path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2Zm7 11 1 3.4L23 17l-3 1-1 3-1-3-3-1 3-.6 1-3.4Z" />
);

/* ─────────────────────────────────────────────────────────────────────────
 * SNOW_ICON_MAP — canonical iconId(string) → SVG component lookup.
 * Data files (services-data) store icon ids as STRINGS; every renderer
 * (sidebar rail, tooltips, boot overlay, module header) MUST resolve them
 * through this map — never render the raw string as a JSX tag.
 * ────────────────────────────────────────────────────────────────────── */
export const SNOW_ICON_MAP: Record<SnowIconId, React.ComponentType<IconProps>> = {
  flake: FlakeIcon,
  layers: LayersIcon,
  warehouse: WarehouseIcon,
  stage: StageIcon,
  pipe: PipeIcon,
  shield: ShieldIcon,
  flask: FlaskIcon,
  database: DatabaseIcon,
  table: TableIcon,
  view: ViewIcon,
  role: RoleIcon,
  stream: StreamIcon,
  task: TaskIcon,
  monitor: MonitorIcon,
  storage: StorageIcon,
  compute: ComputeIcon,
  cloud: CloudIcon,
  query: QueryIcon,
  file: FileIcon,
  spark: SparkIcon,
};

/** Safe resolver with FlakeIcon fallback (unknown id never crashes the rail). */
export function resolveSnowIcon(id: string): React.ComponentType<IconProps> {
  return SNOW_ICON_MAP[id as SnowIconId] ?? FlakeIcon;
}
