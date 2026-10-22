"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { FileTerminal, Copy, Check } from "lucide-react";
import { useState } from "react";

/**
 * highlightSql — tiny SQL token highlighter → spans with .kw/.str/.cmt/.fn
 * Not a parser: regex-order matters (comments → strings → keywords).
 */
export function highlightSql(code: string): React.ReactNode[] {
  const KW = new Set(
    ("SELECT FROM WHERE CREATE OR REPLACE DATABASE SCHEMA TABLE STAGE FILE FORMAT COPY INTO PUT GET " +
      "ALTER DROP SET ON AS VIEW INSERT MERGE UPDATE DELETE VALUES JOIN LEFT RIGHT INNER OUTER FULL " +
      "GROUP BY ORDER LIMIT OFFSET HAVING DISTINCT UNION ALL WITH WINDOW PARTITION ROWS BETWEEN AND " +
      "NOT NULL IN IS LIKE ANY AUTOINCREMENT PRIMARY KEY FOREIGN REFERENCES DEFAULT COMMENT IF EXISTS " +
      "WAREHOUSE WAREHOUSES RESOURCES MONITOR TRIGGERS SUSPEND RESUME IMMEDIATELY AFTER STATEMENT_QUEUED " +
      "TIME_TRAVEL DATA_RETENTION_TIME_IN_DAYS PIPE AUTO_INGEST TRUE FALSE AWS_SQS ARN URL STREAM TASK " +
      "SCHEDULE CRON USER ROLE GRANT USAGE OPERATE OWNERSHIP ACCOUNTADMIN SYSADMIN SECURITYADMIN PUBLIC " +
      "TRANSFER SHARE CLONE CLUSTER CASE WHEN THEN ELSE END TRANSFORM MATCHED DUPLICATE KEY SEQUENCE " +
      "DESCRIPTION DESC ASC TO ROLE CURRENT_ROLE USE SHOW DESCRIBE LIST REMOVE RM GET_INCREMENTAL " +
      "SYSTEM$STREAM_HAS_DATA QUALIFY TOP INTERVAL MINUTE HOUR DAY WEEK MONTH YEAR TZ = 'UTC' " +
      "OVER VALIDATION_MODE RETURN_ERRORS ERRORS ONLY FIRST ATTRIBUTE PARSE_JSON FLATTEN LATERAL " +
      "OBJECT_CONSTRUCT ARRAY_SIZE PATH OBJECT_KEYS TRY_TO_NUMBER TO_TIMESTAMP_NTZ CURRENT_TIMESTAMP " +
      "TO_VARIANT TO_DATE TO_CHAR TO_NUMBER DATE_TRUNC COUNT SUM AVG MIN MAX NVL COALESCE IFF NULLIF " +
      "RETAIN NULL FROM_MAX CONTAINS STARTSWITH ENDSWITH REGEXP_SUBSTR REGEXP_REPLACE SPLIT PART " +
      "CALL EXECUTE BEGIN COMMIT ROLLBACK TRANSACTION STORED PROCEDURE RETURNS LANGUAGE JAVASCRIPT " +
      "PYTHON DECLARE LET RETURN WHILE FOR FUNCTION EXTERNAL NETWORK ACCESS INTEGRATION ALLOWED_AUTHENTICATION_ENDPOINTS " +
      "SECRET API_KEY ALLOWED_API_HOSTS MASKING ROW ACCESS TAG").split(" ")
  );
  KW.delete("="); KW.delete("'"); KW.delete("UTC");
  const FN = new Set(
    ("PARSE_JSON FLATTEN OBJECT_CONSTRUCT ARRAY_SIZE TO_TIMESTAMP_NTZ CURRENT_TIMESTAMP TO_VARIANT TO_DATE TO_CHAR " +
      "TO_NUMBER DATE_TRUNC COUNT SUM AVG MIN MAX NVL COALESCE IFF NULLIF REGEXP_SUBSTR REGEXP_REPLACE SPLIT " +
      "SYSTEM$STREAM_HAS_DATA TRY_TO_NUMBER GET CURRENT_UUID UUID_STRING INITCAP LOWER UPPER TRIM LENGTH ABS ROUND CEIL FLOOR MOD RANDOM SEQ4 SEQ1").split(" ")
  );

  const out: React.ReactNode[] = [];
  // order: comments, strings, words, everything else
  const re = /(--[^\n]*|\/\*[\s\S]*?\*\/)|('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*")|([A-Za-z_][A-Za-z0-9_$]*)|(\s+)|([^\sA-Za-z_]+)/g;
  let m: RegExpExecArray | null;
  let k = 0;
  while ((m = re.exec(code)) !== null) {
    if (m[1]) out.push(<span key={k++} className="cmt">{m[1]}</span>);
    else if (m[2]) out.push(<span key={k++} className="str">{m[2]}</span>);
    else if (m[3]) {
      const w = m[3];
      const up = w.toUpperCase();
      if (KW.has(up)) out.push(<span key={k++} className="kw">{w}</span>);
      else if (FN.has(up)) out.push(<span key={k++} className="fn">{w}</span>);
      else out.push(<span key={k++}>{w}</span>);
    } else if (m[4]) out.push(<span key={k++}>{m[4]}</span>);
    else if (m[5]) out.push(<span key={k++}>{m[5]}</span>);
  }
  return out;
}

interface SqlCodeBlockProps {
  code: string;
  label?: string;
  lang?: string;
  highlightLines?: number[];
  className?: string;
  delay?: number;
  dense?: boolean;
}

/**
 * SqlCodeBlock — cyber terminal for SQL snippets with keyword glow.
 */
export function SqlCodeBlock({
  code,
  label,
  lang = "SQL",
  className = "",
  delay = 0,
  dense = false,
}: SqlCodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const lines = useMemo(() => code.replace(/\s+$/, "").split("\n"), [code]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.4, delay }}
      className={`glass-inset cyber-cut-sm overflow-hidden ${className}`}
    >
      <div className="flex items-center justify-between gap-2 px-2.5 py-1.5 border-b border-snow/15 bg-black/40">
        <span className="flex items-center gap-1.5 text-[8px] font-bold uppercase tracking-[0.2em] text-snow/90 min-w-0">
          <FileTerminal className="w-3 h-3 shrink-0" />
          <span className="truncate">{label ?? lang}</span>
        </span>
        <button
          type="button"
          onClick={copy}
          aria-label="Copy code to clipboard"
          className="flex items-center gap-1 text-[7.5px] font-bold uppercase tracking-[0.18em] text-muted-foreground hover:text-snow transition-colors shrink-0"
        >
          {copied ? <Check className="w-3 h-3 text-mint" /> : <Copy className="w-3 h-3" />}
          {copied ? "COPIED" : "COPY"}
        </button>
      </div>
      <div className={`cyber-scroll overflow-x-auto ${dense ? "py-1.5" : "py-2"} px-2.5`}>
        <pre className="sql-code text-[9.5px] sm:text-[10.5px] leading-[1.6] font-medium min-w-max">
          {lines.map((ln, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: Math.min(delay * 1000 + i * 24, 1200) / 1000, duration: 0.25 }}
              className="whitespace-pre"
            >
              <span className="select-none text-snow/30 tabular-nums inline-block w-6 pr-2 text-right shrink-0">{i + 1}</span>
              {highlightSql(ln)}
              {ln === "" ? " " : null}
            </motion.div>
          ))}
        </pre>
      </div>
    </motion.div>
  );
}
