"use client";

import { useEffect, useState } from "react";
import type { ComponentType } from "react";
import HexagonLoader from "@/components/shared/hexagon-loader";

/**
 * MODULE REGISTRY — PORTED from the reference AtomLearn-AWS repo
 * (components/services/registry.tsx) and wired to the SNOWFLAKE//NEXUS
 * module set.
 *
 * Core structure (same as reference):
 *   • every service module is code-split via a raw dynamic import()
 *   • the import starts immediately on mount (no next/dynamic wrapper)
 *   • the HexagonLoader panel stays up until BOTH: the chunk resolved
 *     AND a minimum display window elapsed — so module switches always
 *     read as an intentional "boot", never a jarring flash
 */

function ModuleLoader() {
  return (
    <div className="h-full min-h-[480px] flex flex-col items-center justify-center gap-4 glass-inset">
      <HexagonLoader size={80} />
      <p className="text-[9px] uppercase tracking-[0.35em] text-primary text-glow">
        LOADING MODULE<span className="blink-cursor">_</span>
      </p>
      <p className="text-[8px] uppercase tracking-[0.2em] text-muted-foreground">
        COMPILING FLOW GRAPH // MOUNTING WEBGL
      </p>
    </div>
  );
}

/** minimum time the hexagon loader stays on screen — avoids a jarring sub-300ms flash
    when a cached chunk resolves almost instantly, so the boot animation reads clearly */
const MIN_MODULE_LOAD_MS = 900;

type ModuleFactory = () => Promise<{ default: ComponentType }>;

/** starts the chunk import immediately on mount and swaps loader → module in place —
    no wrapper card/overlay, just the loader until the chunk is ready AND the
    minimum display window has elapsed */
function withMinLoad(factory: ModuleFactory): ComponentType {
  return function MinLoadModule() {
    const [Comp, setComp] = useState<ComponentType | null>(null);
    const [minDone, setMinDone] = useState(false);

    useEffect(() => {
      let alive = true;
      factory()
        .then((m) => {
          if (alive) setComp(() => m.default);
        })
        .catch(() => {
          /* chunk failed — loader stays up; a reload retries */
        });
      const t = setTimeout(() => setMinDone(true), MIN_MODULE_LOAD_MS);
      return () => {
        alive = false;
        clearTimeout(t);
      };
    }, [factory]);

    if (!Comp || !minDone) return <ModuleLoader />;
    return <Comp />;
  };
}

export const MODULE_COMPONENTS: Record<string, ComponentType> = {
  overview: withMinLoad(() => import("./overview")),
  architecture: withMinLoad(() => import("./architecture")),
  warehouses: withMinLoad(() => import("./warehouses")),
  ingestion: withMinLoad(() => import("./ingestion")),
  snowpipe: withMinLoad(() => import("./snowpipe")),
  governance: withMinLoad(() => import("./governance")),
  labs: withMinLoad(() => import("./lab-explorer")),
};
