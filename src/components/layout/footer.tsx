"use client";

import React from "react";
import { FlakeIcon } from "@/components/shared/snowflake-icons";

/**
 * Sticky footer — pinned to the viewport bottom via mt-auto on the
 * min-h-screen flex column; pushed naturally when content overflows.
 */
export function Footer() {
  return (
    <footer className="mt-auto border-t border-snow/15 bg-black/60 backdrop-blur-md">
      <div className="mx-auto max-w-[1500px] px-4 sm:px-6 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-2.5">
        <div className="flex items-center gap-2.5 min-w-0">
          <FlakeIcon className="w-4 h-4 text-snow shrink-0 spin-slow" aria-hidden="true" />
          <p className="text-[8px] sm:text-[9px] uppercase tracking-[0.28em] text-muted-foreground truncate">
            SNOWFLAKE<span className="text-snow">{"//"}</span>NEXUS <span className="text-snow/60">— VISUAL DATA CLOUD CONSOLE</span>
          </p>
        </div>
        <div className="flex items-center gap-3 sm:gap-4 text-[7.5px] sm:text-[8px] uppercase tracking-[0.22em] text-muted-foreground/70 shrink-0">
          <span className="flex items-center gap-1.5">
            <span className="w-1 h-1 bg-mint animate-pulse" aria-hidden="true" />
            DATA WAREHOUSING
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1 h-1 bg-snow animate-pulse" aria-hidden="true" />
            DATA ENGINEERING
          </span>
          <span className="hidden md:inline text-snow/50">3 LAYERS · 0 OPS</span>
        </div>
      </div>
    </footer>
  );
}
