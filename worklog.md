# SNOWFLAKE//NEXUS — Build Worklog

Project: Interactive visual Snowflake learning console (Next.js 16, single route `/`).

## Architecture (inherited outline from AtomLearn-AWS, re-themed for Snowflake)

- One route: `src/app/page.tsx` (client console). Module switching = client state synced to `?module=<id>`.
- Theme: cyan Snowflake palette (#29B5E8 brand), glassmorphism + cyberpunk, JetBrains Mono, sharp edges (border-radius 0 everywhere), scanlines/grid/glow FX.
- Libs: three.js + @react-three/fiber + drei (3D overview scene), animejs 4 (flow link/packet engine), framer-motion 12 (transitions/reveals).
- Data: `src/lib/labs-data.ts` — AUTO-GENERATED from uploaded `Data Warehousing.json` + `Data Engineering.json` (2 courses → 6 labs → 20 modules → 155 steps, incl. flow node graphs + SQL snippets). Regenerate via `python3 scripts/convert-labs.py`.

## File map (target)

- `src/app/globals.css` — full cyan theme (glass, cyber-cut, scanlines, glow, grid, no-radius).
- `src/app/layout.tsx` — JetBrains Mono, dark.
- `src/lib/services-data.ts` — MODULES catalog (overview, architecture, warehouses, ingestion, snowpipe, governance, labs).
- `src/components/shared/` — flow.tsx (animejs FlowCanvas/FlowNode/FlowLink/FlowLabel), glass-panel.tsx, auto-log.tsx, sim-controls.tsx, callout.tsx, typography.tsx, use-case.tsx (UseCaseShell/UCStat/UCToggle/UCButton/useScenarioRunner/useTicker), snowflake-icons.tsx (custom Snowflake object SVGs), snow-loader.tsx.
- `src/components/layout/` — background-fx.tsx, boot-overlay.tsx, service-nav.tsx, footer.tsx.
- `src/components/services/` — registry.tsx (dynamic imports) + module components: overview.tsx, architecture.tsx, warehouses.tsx, ingestion.tsx, snowpipe.tsx, governance.tsx, lab-explorer.tsx.

## CONTRACT FOR SERVICE MODULES (each file default-exports a client component, no props)

Use shared: FlowCanvas/FlowNode/FlowLink (coords are 0–100 %), UseCaseShell (stage + LIVE STATS + CONTROLS + log), AutoLog lines, GlassPanel, Callout, SectionTitle. Status vocabulary: idle/active/success/warn/error/cyber for nodes; idle/flowing/success/error/cyber for links.

---
Task ID: 1
Agent: main
Task: Install deps + convert JSON lab docs to typed data module

Work Log:
- Installed three@0.186.1, @react-three/fiber@9.8.2, @react-three/drei@10.7.9, animejs@4.5.0 (+types).
- Parsed upload/Data Warehousing.json & upload/Data Engineering.json (structure: courseGroups/courses/labs/modules/steps; module.flow = JSON-string node list start/process/decision/end; step.blocks = JSON-string of description/snippet/image blocks).
- Wrote scripts/convert-labs.py: strips inline black styles, parses flow + blocks strings, emits typed TS.
- Generated src/lib/labs-data.ts (109KB) with LAB_COURSES + LAB_STATS (courses:2, labs:6, modules:20, steps:155).

Stage Summary:
- Data layer ready. Lab content is fully available as typed TS constants for the lab-explorer module.

---
Task ID: 2
Agent: main
Task: Theme foundation + shell + shared engine

Work Log:
- Rewrote src/app/globals.css: cyan Snowflake palette (snow #29b5e8, cyanx, ice, frost, neon, mint, magenta, danger, void #04070d), glass/glass-deep/glass-inset, cyber-cut, scanlines, grids, glow, snow-drift keyframes, lab-prose + sql-code styles, zero border-radius everywhere.
- layout.tsx: JetBrains Mono, dark, metadata.
- src/lib/services-data.ts: 7-module catalog (overview/architecture/warehouses/ingestion/snowpipe/governance/labs) with stats, docs, hotkeys.
- Shared components written: snowflake-icons.tsx (20 SVG glyphs: flake, layers, warehouse, stage, pipe, shield, flask, database, table, view, role, stream, task, monitor, storage, compute, cloud, query, file, spark), flow.tsx (animejs FlowCanvas/FlowNode/FlowLink/FlowLabel — cyan tinted), glass-panel.tsx, auto-log.tsx (snow tones), sim-controls.tsx, callout.tsx, typography.tsx, use-case.tsx (UseCaseTabs/useScenarioRunner/useTicker/UseCaseShell/UCStat/UCToggle/UCButton/VerdictFlash/StepBadge/UseCaseNote/FullscreenToggle), snow-loader.tsx (SnowLoader), sql-code-block.tsx (SqlCodeBlock + highlightSql with copy button).
- Layout components: background-fx.tsx (grid + glacial glows + snowfall particles), boot-overlay.tsx (SNOWFLAKE//NEXUS boot), service-nav.tsx (collapsible rail + portal tooltips + mobile chips + UTC clock), footer.tsx (sticky via mt-auto).
- src/app/page.tsx: console shell — URL sync ?module=<id>, hotkeys 1-7, AnimatePresence module transitions, header card with stats/docs.
- registry.tsx: dynamic imports with 850ms SnowLoader boot for all 7 modules.
- Lint passes. Dev server serves 200.

Stage Summary:
- Shell + theme + shared engine ready. Module files are stubs; implement per contract in header of this worklog. NODE STATUS vocabulary: idle/active/success/warn/error/cyber; LINK status: idle/flowing/success/error/cyber.

---
Task ID: 4-d
Agent: labexplorer-agent
Task: Implement src/components/services/lab-explorer.tsx (LAB EXPLORER module, part 2 — full implementation)

Work Log:
- Replaced the stub with the full "use client" LabExplorerModule (default export kept, no props).
- Course selector: 2 glass chips (Data WareHousing 3L·20M·20S / DATA ENGINEERING 3L·8M·8S, counts computed from LAB_COURSES), framer-motion layoutId marker underline, WarehouseIcon/PipeIcon, role=tablist.
- Left rail (lg:grid-cols-[300px_minmax(0,1fr)]): LABS panel (numbered glass buttons, module counts, "OPEN SNOWFLAKE COURSE" external link when lab.linkUrl, AnimatePresence per course) + MODULES panel (compact buttons with step counts, mint Check for visited, max-h-[380px] cyber-scroll, AnimatePresence per lab).
- Main pane (max-h-[1200px] overflow-y-auto cyber-scroll, AnimatePresence keyed by `${ci}-${li}-${mi}`): ModuleDetail renders header (breadcrumb + LOGGED·VISITED chip + tabular-nums counts), OVERVIEW // MISSION BRIEF, FIELD NOTES // DEEP DIVE (module.explanation), MODULE FLOW // VISUAL MAP, STEPS // EXECUTION PROCEDURE, EXPECTED OUTPUT // RESULT (outputCode → SqlCodeBlock "DORA GRADER QUERY"; table/mark styling via arbitrary variants).
- FlowMap: vertical FlowCanvas h-[420px], y=8+i*(84/(n-1))%, FlowLink d="M 50 y1 L 50 y2" showArrow, node status by type (start→success/mint, end→cyber/magenta, decision→warn, process/io→active) + START/DECISION/END FlowLabel chips at x=91, legend row, xs size + 30-char truncation for >10 nodes (handles the 20-node PIPELINE flow).
- SIMULATE FLOW toggle (UCToggle in GlassPanel actions): 900ms setInterval stepping activeIndex with loop; current node pulses+glows, later nodes dim to 40%, traversed links switch idle→flowing with packet dot; HUD badge shows current node NN/NN + label; state lives in FlowMap so it resets per module via remount.
- Step cards: numbered badge (01…), title, step.description HtmlBlock, then blocks in order (description→HtmlBlock, snippet→SqlCodeBlock, image→lazy img max-h-[280px] + muted caption), then legacy step.code/step.image; empty steps skipped; staggered whileInView.
- Progress: "CURRICULUM PROGRESS" strip — animated width bar (role=progressbar), % + visited/28 count, UCButton danger RESET. localStorage key "sfnexus-lab-visited" (JSON array of "ci-li-mi"); loaded in useState initializer (module mounts with ssr:false so window exists — avoids react-hooks/set-state-in-effect lint errors), persisted via effect, marked event-driven in selectCourse/selectLab/selectModule handlers.
- HtmlBlock single helper for all trusted HTML (dangerouslySetInnerHTML with lab-prose).
- Verification: file-scoped eslint clean (0 problems); module-booted browser tests — course/lab/module switching, sim start/stop, 20-node map, reset (storage → []), mobile 390px (no horizontal overflow), zero page errors from this module. NOTE: project-wide lint currently has 3 pre-existing errors in governance.tsx (react-hooks/refs) and warehouses.tsx (react-hooks/immutability) — owned by other agents, untouched.

Stage Summary:
- LAB EXPLORER complete: full 2-course / 6-lab / 28-module curriculum console with flow simulation, step rendering and persisted visited tracking, ready for integration with the shell nav.

---
Task ID: 4-d
Agent: governance-agent
Task: Implement governance.tsx — GOVERNANCE & RBAC module (role hierarchy sim + resource monitor firewall)

Work Log:
- Replaced the governance.tsx stub entirely: "use client", default export GovernanceModule, two stacked UseCaseShell sections under SectionTitle kickers.
- SECTION 1 — ROLE HIERARCHY (DORA "Roles & Access"): FlowCanvas chain ACCOUNTADMIN (crown, magenta/cyber) → SYSADMIN → DORA_DEV → USERS + DEMO_DB node (owner sub flips with the GRANT OWNERSHIP step). 6-step useScenarioRunner (1.7s/step, loops): CREATE ROLE → GRANT OWNERSHIP ON DATABASE DEMO_DB → GRANT ROLE DORA_DEV TO ROLE SYSADMIN (link success, "ownership chain links up") → USE ROLE DORA_DEV (CURRENT_ROLE session badge flips with bg-flash + AnimatePresence swap) → CREATE TABLE (mint ACCESS GRANTED VerdictFlash + "TABLE: TRIPS ✓") → DROP DATABASE (danger ACCESS DENIED VerdictFlash + SQL compilation error log + transient error attack-link). All nodes clickable → glass-inset privilege detail card overlay. LIVE STATS (6) + SimControls + "GRANT LOG // LIVE".
- SECTION 2 — RESOURCE MONITOR (DORA "Resource Monitor Setup"): credit gauge meter (role=progressbar) burning via useTicker (refs-as-truth + flush, iam.tsx pattern); thresholds 50 NOTIFY / 80 SUSPEND IMMEDIATELY / 100 KILL as ticks+labels that light on reach; at 80% warehouse dims→SUSPENDED, RM_DORA→error/pulse, telemetry link→error, VerdictFlash "CREDIT GUARD TRIGGERED", TRIGGERED AT timestamp. Mini FlowCanvas COMPUTE_WH × RM_DORA (clickable → inspect log lines). Controls: SimControls + BOOST BURN UCToggle (magenta, 70ms) + RESET QUOTA UCButton (mint, resumes + re-arms). Milestone logs at 25/50/75%. LIVE STATS: CURRENT ROLE / CREDITS USED % / QUOTA / MONITOR STATE / TRIGGERED AT / WAREHOUSE.
- Below sims: SqlCodeBlock with authentic CREATE RESOURCE MONITOR RM_DORA DDL (50/80/100 triggers) + TRIGGER MATRIX GlassPanel; 3 Callouts (god-mode critical / ownership≠grants exam / credit firewall tip).
- Style: uppercase tracking-[0.18em] micro-labels, 7-10px text, glass-inset/cyber-cut-sm, mint success, magenta ACCOUNTADMIN/danger, no radii, aria-labels everywhere, tabular-nums numerics, logTs() at push time.

Verification:
- Fixed 2 react-hooks/refs errors (lazy ref init → `if (ref.current == null)` pattern) + 1 TS2367 (redundant narrowed comparison). `bunx eslint src/components/services/governance.tsx` → clean; `bunx tsc --noEmit` → no governance errors; full `bun run lint` → zero issues in this file (remaining errors belong to other agents' in-flight files).
- Dev server `GET /?module=governance 200`, compile clean, no runtime errors in dev.log.

Stage Summary:
- governance.tsx complete and self-contained (default export, no props). Detailed record in agent-ctx/4-d-governance-agent.md.

---
Task ID: 4-b
Agent: architecture-agent
Task: Implement src/components/services/architecture.tsx — PLATFORM ARCHITECTURE module

Work Log:
- Replaced the stub with a full "PLATFORM ARCHITECTURE" client module (default export ArchitectureModule).
- Stage: FlowCanvas (h 540/560/620 responsive stageClass) with 4 stacked bands in 0-100 coordinate space:
  L1 CLIENT (3 clickable FlowNodes: SNOWSQL / NOTEBOOK / BI TOOL — selectable endpoint, default snowsql),
  L2 CLOUD SERVICES glass cyber-cut card with 4 animated rows (Parser/Optimizer, Metadata+Micro-partition stats,
  Access Control RBAC, Transaction Manager) each flipping idle→active(RUN)→done(OK),
  L3 VIRTUAL WAREHOUSE frame (WH_CALC_XS · XS · 1 CR/HR) with N1/N2/N3 FlowNodes lighting up staggered during
  EXECUTE + EXECUTION progress bar, L4 STORAGE frame with 12-cell micro-partition grid (MP-01..MP-12, 82MB·128K)
  + DATA CACHE · WAREHOUSE LOCAL SSD row with HOT/COLD badge.
- Links: 3 client→brain curved FlowLinks (flowing on SUBMIT, success on RETURN), brain→warehouse (QUERY PLAN
  label), warehouse→storage (SCAN · CACHE PROBE label), dashed brain→storage metadata link that goes cyber
  during PRUNE (PRUNING STATS label). All with traveling packet dots + arrowheads.
- Engine: useScenarioRunner(8 steps: SUBMIT→PARSE→OPTIMIZE→PRUNE→CACHE→EXECUTE→AGGREGATE→RETURN) at 1350ms/step,
  refs-as-truth + flush pattern (as in iam.tsx reference). Loop wrap flips cache COLD→HOT so second pass logs a
  cache HIT. BYTES SCANNED counts up via 70ms ticker during EXECUTE (scanned partitions × 82MB), EXECUTION %
  fills 0→72→96→100. FAST-FORWARD → RESULT button switches runner to 90ms turbo until RETURN restores speed.
- LIVE STATS rail: QUERY LIFECYCLE, BYTES SCANNED, PARTITIONS PRUNED (x/12, magenta), CACHE STATE (HOT mint /
  COLD magenta), EXECUTION %, QUERY ID (deterministic hash per run). AutoLog lines with logTs() timestamps +
  tone coding (snow/ice/mint/magenta/dim). StepBadge + VerdictFlash "RESULT RETURNED" (mint) at final step.
- QUERY TEXT mini terminal (hand-built, reuses highlightSql): 7-line SQL against ANALYTICS.ORDERS with the active
  line tracking the engine phase per step (LINE_FOR_STEP map) + PHASE readout footer.
- 2 Callouts: tip "why pruning matters" (live pruned count interpolated), info "warehouse isolation".
- SimControls RUN/PAUSE/RESET with status line + hint. Client nodes switch the issuing endpoint mid-session
  (logged). Reset restores armed log, COLD cache, zeroed counters.
- Lint passes clean; GET /?module=architecture → 200.

Stage Summary:
- Architecture module complete: animated end-to-end query lifecycle through all 3 Snowflake layers with pruning,
  cache warmth across loops, MPP parallel scan and live stats. Follows shared contract (status vocab, cyan tones,
  uppercase micro-labels, sharp cyber-cut panels, no rounded corners).
---
Task ID: 4-c
Agent: pipelines-agent
Task: Implement ingestion.tsx + snowpipe.tsx service modules

Work Log:
- ingestion.tsx (INGESTION & STAGING): UseCaseTabs with 3 scenarios, each an 8-step useScenarioRunner machine + SimControls + UCStat rail + AutoLog + StepBadge:
  - TAB A "CSV → TABLE": FlowCanvas USER FILES → PUT → @%EMP_STAGE (custom stage box, mint file chips accumulate) → COPY INTO → EMPLOYEES target-table box (24-cell grid fills, rowCount ticker 0→64→128), WH_CALC_WH node spins during compute; VALIDATION · RETURN_ERRORS preview panel appears at step 6; UCButton "REMOVE @%EMP_STAGE" purge; SqlCodeBlock with PUT/COPY INTO EMPLOYEES FILE_FORMAT=(TYPE=CSV SKIP_HEADER=1); callouts: staging decouples load from transform / validate-before-commit.
  - TAB B "TSV + FILE FORMATS": same flow for sensor_readings.tsv + named FILE FORMAT object card (TYPE='CSV', FIELD_DELIMITER='\t', SKIP_HEADER=1) whose attributes light mint per step, tab-separated preview "SRV-01 ⇥ 27.4 ⇥ OK", dashed cyber link format→COPY; SqlCodeBlock with CREATE FILE FORMAT TSV_FMT + COPY USING + query-before-load; callouts: TSV=CSV w/ delimiter + delimiter traps.
  - TAB C "JSON TWEETS": tweets.json → @%TWEETS_STAGE (VARIANT) → COPY INTO TWEETS; JSON doc card lines animate hot (snow box-glow) → extracted (mint) as $1:user:name / $1:tweet:text / $1:tweet:created_at probe; flattened 3-column TWEETS card on right with lit column headers + rows appearing (36 docs); SqlCodeBlock with PUT + COPY (TYPE=JSON) + SELECT $1 paths; callouts: VARIANT schema-on-read / flatten on demand.
- snowpipe.tsx (SNOWPIPE · STREAMS · TASKS): single full-pipeline FlowCanvas GAME EVENTS (S3) → SQS AUTO-INGEST → SNOWPIPE → RAW_FEED (custom box, micro-batch chips MB-xxx) → RAW_STREAM (offset sub + FRESH/STALE FlowLabel) → MERGE_TASK (T-00:SS countdown chip) → MERGE → ANALYTICS box; COPY_HISTORY errors_only node with dashed red error link + RETRY 1/3 chip.
  - 3 tickers: file lander ~2.1s (irregular, "[SQS] OBJECT LANDED: game_events_NNNN.csv"), Snowpipe micro-batch ~2s (rows climb, stream offset grows, FRESH), task clock 133ms (60→0 in ~8s) → MERGE consumes delta (offset resets → STALE, analytics grows, "0 DUPLICATES").
  - UCToggle FILE ERROR INJECT: poisoned file → COPY ERROR log → retry → "RETRY OK / PIPELINE RECOVERED" → "MERGE SKIPPED 0 DUPLICATES — IDEMPOTENT REPLAY IS SAFE".
  - LIVE STATS: FILES INGESTED / RAW ROWS / STREAM OFFSET / TASK COUNTDOWN / MERGE CYCLES / ERROR STATE. StepBadge 8 phases (IDLE→S3 EVENT→…→MERGE DELTA), VerdictFlash "PIPELINE LIVE" on first data + recoveries, SqlCodeBlock with CREATE PIPE AUTO_INGEST / CREATE STREAM / CREATE TASK SCHEDULE='1 MINUTE' AS MERGE, 3 callouts (serverless load / streams=offset pointers / tasks=cron).
- Verified with headless browser: CSV sim steps, JSON tab render, snowpipe end-to-end incl. poison→error→retry→idempotent merge; `bun run lint` clean; /?module=ingestion + /?module=snowpipe both 200.

Stage Summary:
- Modules 04 (ingestion) + 05 (snowpipe) complete per contract (default-export client components, shared shared/* engine, status vocabulary, cyan theme, aria-labels, tabular-nums). Remaining stubs: warehouses, governance, architecture, lab-explorer (and overview if stub).

---
Task ID: 4-b
Agent: warehouses-agent
Task: Implement services/warehouses.tsx — VIRTUAL WAREHOUSES MPP compute sim

Work Log:
- Replaced stub in src/components/services/warehouses.tsx with full client module (default export WarehousesModule).
- Stage (FlowCanvas, 0-100% coords): QUEUE column left (query chips + depth badge, cap 6, AnimatePresence enter/exit), WH_MAIN cluster center (glass-inset box, per-size MPP node tiles N1..N8 with animated load bars, per-node load %, state badge RUNNING/SUSPENDED/RESUMING/SCALING), RESULTS column right (mint done chips with exec time + node id), WH_C2 scale-out cluster (magenta accents) sliding in via framer-motion spring. FlowLinks: queue→C1 flowing, queue→C2 dashed-armed/cyber-live, C1→RESULTS flowing/success-flash, C2→RESULTS cyber. FlowLabels: DISPATCH, scale-armed/scaled captions. StepBadge + UseCaseNote (warehouse cache isolation) + VerdictFlash (RESUMING / CLUSTER 2 ONLINE / SUSPENDED).
- Sim loop: useScenarioRunner(8 steps, 1100ms) → onTick mutates a ref-based world (arrivals p=0.78, dispatch to free nodes C1-first, parallel exec +26-48%/tick, completion → avgMs EMA, credits accrual = size credits/hr × clusters × 90s sim/step, idle countdown 3 ticks → auto-suspend, arrival while suspended → auto-resume). Snapshot pattern (takeSnapshot → setSnap) mirrors world into render state.
- Controls: SimControls (run/pause/reset + status line), XS/S/M/L UCButton size group (nodes 1/2/4/8, credits/hr 1/2/4/8; resize rebuilds world + reseeds queue + resets runner), magenta UCToggle SCALE OUT (arms; queue ≥3 → SCALING → C2 online → drains queue; queue drained 2 ticks → scale-in release; disarm → drain-then-release). Inline framer-motion credit-burn bar chart (XS 1 → L 8, current size highlighted).
- LIVE STATS: STATE, CLUSTERS, ACTIVE QUERIES, QUEUE DEPTH, CREDITS BURNED (2 decimals), AVG EXEC (ms), SIZE·NODES, COMPLETED. AutoLog logTs() lines: SUBMITTED/ASSIGNED→NODE/COMPLETE/SCALE-OUT/SCALE-IN/AUTO-SUSPEND AFTER 60s IDLE/AUTO-RESUME/RESIZE.
- Knowledge row: Callout warn (multi-cluster = no queuing, credits multiply), Callout tip (auto-suspend saves cost), SqlCodeBlock (CREATE WAREHOUSE with SIZE/MAX_CLUSTER_COUNT/AUTO_SUSPEND 60/SCALING_POLICY). Hidden in immersive mode.
- Lint fix: initial render-phase `if (worldRef.current === null)` ref init tripped react-hooks/immutability (world objects aliased into useState initializer); switched to `useRef(makeWorld("M"))` + lazy useState snapshot from a throwaway world.
- Shell fix (page.tsx, cross-cutting): header card rendered `<Icon>` from meta.iconId STRING → console error "tag <warehouse> unrecognized" on every module; added MODULE_ICONS id→component map (7 Snowflake icons) with FlakeIcon fallback.
- Verified headless (agent-browser): run/dispatch/complete/credits 0.10/tick at M, auto-resume after suspend countdown, scale-out C2 rendered, resize→L reset (8 nodes 8cr), log lines correct; VLM visual QA desktop + mobile 390px — no overflow/clipping. `bun run lint` clean.

Stage Summary:
- warehouses.tsx module complete per contract. NOTE for other agents: don't lazy-init refs with render-phase null-checks (react-hooks/immutability flags it when ref contents feed useState initializers) — use useRef(factory()) + throwaway snapshot instead. page.tsx now has MODULE_ICONS map for meta.iconId.

---
Task ID: 4-a
Agent: main (overview + integration)
Task: Three.js overview module + full-app integration & browser verification

Work Log:
- Wrote src/components/services/overview.tsx: R3F 3D "data cloud" — 1500-point micro-partition core (vertexColors, pixel-size sprites), wireframe icosahedron partition cage, 3 clickable warehouse nodes on an orbit ring (hover/select scale + ping ring), magenta service halo (8 tetra nodes), bezier warehouse→core links with traveling packets, 700-star field, FocusRig camera bias, DOM HUD (layer toggles, telemetry, legend, selected-warehouse card), layer focus panel, layer breakdown cards, callouts.
- DEBUGGED the "giant white blob": R3F auto-attach nests — <pointsMaterial> must be a DIRECT child of <points>, not inside <bufferGeometry> (it attached to geometry → Points fell back to default white 46px sprites). Fixed same nesting in MicroPartitionCore + Stars. Isolation method: hide canvas via DOM eval → disable cage → magenta/green marker spheres → points-only test.
- Fixed agent-introduced corruption in page.tsx icon map (verified MODULE_ICONS map intact).
- Fixed architecture.tsx FlowCanvas missing height class (collapsed to 2px) → className="h-full".
- Regenerated labs-data.ts after fixing scripts/convert-labs.py indentation bug (modules_out.append was inside the steps loop → duplicated module-per-step). Now 2 courses / 6 labs / 28 modules / 138 steps (278KB). Updated services-data labs stats card.
- Fixed Google Fonts 500 (Turbopack "queries have exactly one entry" after cache clear): vendored JetBrains Mono variable woff2 (latin+latin-ext) into src/fonts + next/font/local in layout.tsx.
- Fixed lab-explorer StepCard duplication (step.description/code/image duplicated blocks array) via normalized-text dedup.
- Restarted dev server with clean .next (stale grey CSS chunk on /labs route).
- Browser-verified (agent-browser, desktop 1440x900 + mobile 390x844): boot overlay, all 7 modules render + RUN sims advance (architecture 06/08 MPP EXECUTE with bytes/pruning/cache stats; warehouses N1-N4 dispatch + credits; ingestion CSV PUT→STAGE→COPY 05/08; snowpipe 3 files/403 rows/T-00:06 countdown; governance role chain 04/06 CURRENT_ROLE=DORA_DEV; labs explorer flows/simulate/images/SQL), layer toggles, zero console errors, no horizontal overflow on mobile, footer pinned bottom.

Stage Summary:
- ALL 7 MODULES LIVE & browser-verified. Lint clean. App ready: cyan Snowflake glassmorphism + cyberpunk console, Three.js core scene, animejs flow engine, framer-motion everywhere, JetBrains Mono, sharp edges.
---
Task ID: 5
Agent: main (core-structure alignment)
Task: Port reference AtomLearn-AWS core structure — HexagonLoader, fixed sidebar icons, mapper hide

Work Log:
- Cloned reference repo to /tmp/atomlearn-ref and diffed core shell files (page.tsx, service-nav.tsx, registry.tsx, hexagon-loader.tsx) against ours.
- ROOT-CAUSED "sidebar icons not working": nav/tooltip/mobile chips rendered `const Icon = s.iconId` where iconId is a STRING ("flake"…) → invalid DOM tags. Fixed via new canonical SNOW_ICON_MAP + resolveSnowIcon() in snowflake-icons.tsx; applied in service-nav (3 render paths) + boot-overlay module glyph strip.
- ROOT-CAUSED "hide not working": feature didn't exist. Ported from reference: ServiceNav onHide prop (PanelLeftClose btn in expanded rail + HIDE chip on mobile), mapperHidden state in page.tsx synced to ?mapperhidden=true|false URL param, SHOW MAPPER restore chip, parseBoolParam helper in services-data.ts.
- Ported HexagonLoader (morphing hexagon SVG, glow filter, styled-jsx global keyframes) re-themed to Snowflake cyan (stroke/fill-primary #29b5e8). Rewrote registry.tsx to reference withMinLoad pattern: raw import() starts on mount, loader holds until chunk ready AND 900ms min window; ModuleLoader panel = hexagon + "LOADING MODULE_" + "COMPILING FLOW GRAPH // MOUNTING WEBGL".
- Lint fix: react-hooks/static-components flagged resolveSnowIcon() call in page.tsx render body → switched to direct SNOW_ICON_MAP[meta.iconId] lookup.
- Browser-verified (1440x900 + 390x844): 8/8 rail SVGs, expand (250px+labels+UTC) / collapse (60px) toggle, hide → rail removed + URL ?mapperhidden=true + SHOW MAPPER chip → restore, deep-link ?module=ingest&mapperhidden=true works, hexagon loader caught at 800ms during module switch then module mounts, zero console errors, no mobile overflow.

Stage Summary:
- Core shell now matches reference repo 1:1 (loader/registry/nav/hide semantics) in Snowflake theme. localStorage rail-expansion persistence confirmed. All 7 modules unaffected.
---
Task ID: 6
Agent: main (codebase cleanup)
Task: Double-check and remove unused files/folders, components, packages

Work Log:
- Built a reachability graph (depgraph script) from entry points (layout.tsx, page.tsx, api/route.ts, globals.css): only 29 of 83 src files reachable; manually verified next/font/local string-path fonts ARE used (kept).
- Deleted src/components/ui/ entirely (48 shadcn components — zero app imports; app uses its own glass/cyberpunk shared components), src/hooks/ (use-toast.ts, use-mobile.ts — only consumers were removed ui files), src/components/shared/snow-loader.tsx (superseded by ported HexagonLoader), src/lib/db.ts (nothing imports db client).
- Deleted dead config/files: tailwind.config.ts (Tailwind v4 CSS-first config; no @config directive anywhere — theme lives in globals.css @theme inline), components.json (shadcn CLI manifest, no shadcn components remain), tool-results/ (agent leftovers), agent-ctx/ (stale subagent notes; worklog.md is the record), download/ (leftover README), mini-services/ (empty), prisma/ + db/custom.db (2 scaffold models, zero runtime usage).
- package.json: removed 40 unused deps (27x @radix-ui/*, @dnd-kit/*, prisma+@prisma/client, recharts, zustand, zod, uuid, vaul, cmdk, sonner, next-themes, next-auth, next-intl, react-hook-form, @hookform/resolvers, react-markdown, react-syntax-highlighter, recharts, date-fns, react-day-picker, embla-carousel-react, input-otp, react-resizable-panels, @tanstack/react-query+table, @reactuses/core, @mdxeditor/editor, class-variance-authority, sharp, tailwindcss-animate, z-ai-web-dev-sdk) + 4 db:* scripts. Kept exactly the used set: next/react/framer-motion/three/@react-three/fiber+drei/animejs/lucide-react/clsx/tailwind-merge (+types). bun install: Removed 59 packages. Remaining bun.lock zustand/prisma-ish hits verified as transitive deps of @react-three/drei|fiber.
- Kept intentionally: upload/ (user's lab JSON source data), scripts/convert-labs.py (documented generator for 278KB labs-data.ts), examples/websocket (scaffold reference), tests/ (sandbox infra scripts), public/robots.txt.
- Fixed latent 404: metadata icons pointed at /icon.svg which did not exist; deleted unused public/logo.svg and wrote branded public/icon.svg (cyan flake on void bg).
- Restarted dev server with clean .next. Lint clean. Browser-verified: 8/8 rail SVGs, module switch → labs mounts (?module=labs), hexagon loader cycle, hide mapper + SHOW MAPPER, Three.js canvas + footer, zero console errors, icon.svg 200, /api 200.

Stage Summary:
- Codebase pruned: 55 src files + 6 root items removed, 59 npm packages removed. App behavior unchanged (desktop + interactions verified post-cleanup). Kept data pipeline (upload/scripts) on purpose.
