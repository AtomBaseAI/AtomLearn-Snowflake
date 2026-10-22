"use client";

import React, { useMemo, useRef, useState, useCallback } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import { GlassPanel } from "@/components/shared/glass-panel";
import { Callout } from "@/components/shared/callout";
import { SectionTitle, StatChip } from "@/components/shared/typography";
import { UCStat, UCToggle, useTicker } from "@/components/shared/use-case";
import { SqlCodeBlock } from "@/components/shared/sql-code-block";
import { FlowLabel } from "@/components/shared/flow";

/* ================================================================== */
/* SNOWFLAKE CORE — 3D data cloud                                      */
/* Three layers, one mesh:                                             */
/*   STORAGE  — micro-partition points packed in a core sphere         */
/*   COMPUTE  — virtual warehouses orbiting on a ring (clickable)      */
/*   SERVICES — metadata halo of service nodes (outer ring)            */
/* Data packets ride bezier links between warehouses and the core.     */
/* ================================================================== */

const SNOW = "#29b5e8";
const ICE = "#7dd3fc";
const MINT = "#00ffa3";
const MAGENTA = "#ff2d78";

type LayerKey = "storage" | "compute" | "services";

/* ---------------- shared curve helpers ---------------- */

function ringPosition(i: number, count: number, radius: number, y = 0): THREE.Vector3 {
  const a = (i / count) * Math.PI * 2;
  return new THREE.Vector3(Math.cos(a) * radius, y, Math.sin(a) * radius);
}

/* ---------------- STORAGE: micro-partition core ---------------- */

function MicroPartitionCore({ active }: { active: boolean }) {
  const ref = useRef<THREE.Points>(null);
  const { positions, colors } = useMemo(() => {
    const COUNT = 1500;
    const positions = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3);
    const cSnow = new THREE.Color("#1f8fc4");
    const cIce = new THREE.Color(ICE);
    const cMint = new THREE.Color(MINT);
    for (let i = 0; i < COUNT; i++) {
      // fibonacci-ish ball with a denser inner shell (micro-partitions)
      const r = Math.pow(Math.random(), 0.5) * 1.9 + 0.35;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.cos(phi) * 0.72; // slightly flattened
      positions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
      const c = Math.random() < 0.1 ? (Math.random() < 0.5 ? cMint : cIce) : cSnow;
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    return { positions, colors };
  }, []);

  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.12;
    const t = state.clock.elapsedTime;
    const mat = ref.current.material as THREE.PointsMaterial;
    mat.opacity = active ? 0.85 : 0.4;
    ref.current.scale.setScalar(1 + Math.sin(t * 0.8) * 0.015);
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        vertexColors
        size={2.2}
        sizeAttenuation={false}
        transparent
        opacity={0.8}
        depthWrite={false}
      />
    </points>
  );
}

/* ---------------- STORAGE: partition cage (wireframe icosahedron) ---------------- */

function PartitionCage({ active }: { active: boolean }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y -= delta * 0.07;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.08;
  });
  return (
    <group ref={ref}>
      <mesh>
        <icosahedronGeometry args={[1.95, 1]} />
        <meshBasicMaterial
          color={SNOW}
          wireframe
          transparent
          opacity={active ? 0.16 : 0.07}
        />
      </mesh>
    </group>
  );
}

/* ---------------- COMPUTE: warehouse ring (clickable) ---------------- */

interface WhVisual {
  id: string;
  name: string;
  size: string;
  credits: string;
  angle: number;
}

const WAREHOUSES: WhVisual[] = [
  { id: "wh1", name: "WH_ETL_XL", size: "XL", credits: "16", angle: 0 },
  { id: "wh2", name: "WH_BI_M", size: "M", credits: "4", angle: (Math.PI * 2) / 3 },
  { id: "wh3", name: "WH_DEV_XS", size: "XS", credits: "1", angle: (Math.PI * 4) / 3 },
];

function WarehouseRing({
  active,
  selected,
  onSelect,
}: {
  active: boolean;
  selected: string | null;
  onSelect: (id: string | null) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const R = 3.1;

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.16;
  });

  return (
    <group ref={groupRef}>
      {/* orbit path */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[R, 0.006, 8, 128]} />
        <meshBasicMaterial color={SNOW} transparent opacity={active ? 0.55 : 0.2} />
      </mesh>
      {WAREHOUSES.map((wh, i) => {
        const isSel = selected === wh.id;
        return (
          <WarehouseNode
            key={wh.id}
            wh={wh}
            index={i}
            radius={R}
            dimmed={!active}
            selected={isSel}
            onSelect={onSelect}
          />
        );
      })}
      {/* ring rotation state shared via context-free clock sync */}
      <RingClockSync />
    </group>
  );
}

/** Shared elapsed-time base so FocusRig can predict ring rotation. */
let RING_T0 = 0;
function RingClockSync() {
  useFrame((state) => {
    if (RING_T0 === 0) RING_T0 = state.clock.elapsedTime;
  });
  return null;
}

function WarehouseNode({
  wh,
  index,
  radius,
  dimmed,
  selected,
  onSelect,
}: {
  wh: WhVisual;
  index: number;
  radius: number;
  dimmed: boolean;
  selected: boolean;
  onSelect: (id: string | null) => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const base = ringPosition(0, 1, radius).applyAxisAngle(new THREE.Vector3(0, 1, 0), wh.angle);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.8;
      meshRef.current.rotation.x = Math.sin(t * 0.6 + index) * 0.3;
      const target = dimmed ? 0.55 : selected || hovered ? 1.35 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(target, target, target), 0.12);
    }
    if (ringRef.current) {
      const s = selected ? 1 + ((t * 0.9) % 1) * 1.4 : 1;
      ringRef.current.scale.setScalar(s);
      (ringRef.current.material as THREE.MeshBasicMaterial).opacity =
        selected ? Math.max(0, 0.7 - ((t * 0.9) % 1) * 0.7) : 0;
    }
  });

  return (
    <group position={[base.x, 0, base.z]}>
      <mesh
        ref={meshRef}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = "auto";
        }}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(selected ? null : wh.id);
        }}
      >
        <boxGeometry args={[0.42, 0.42, 0.42]} />
        <meshBasicMaterial color={selected ? MAGENTA : hovered ? ICE : SNOW} wireframe transparent opacity={dimmed ? 0.35 : 0.9} />
      </mesh>
      {/* solid core */}
      <mesh scale={0.24}>
        <octahedronGeometry args={[0.42, 0]} />
        <meshBasicMaterial color={selected ? MAGENTA : SNOW} transparent opacity={dimmed ? 0.25 : 0.85} />
      </mesh>
      {/* selection ping */}
      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.34, 0.38, 32]} />
        <meshBasicMaterial color={MAGENTA} transparent opacity={0} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

/* ---------------- SERVICES: metadata halo ---------------- */

const SERVICE_NODES = ["QUERY PARSER", "OPTIMIZER", "METADATA", "TXN MGR", "ACCESS CTRL", "RESULTS", "INFRA MGR", "SEMI-STRUCT"];

function ServiceHalo({ active }: { active: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const R = 4.6;
  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y -= delta * 0.06;
  });
  return (
    <group ref={groupRef}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[R, 0.004, 8, 128]} />
        <meshBasicMaterial color={MAGENTA} transparent opacity={active ? 0.4 : 0.12} />
      </mesh>
      {SERVICE_NODES.map((name, i) => {
        const p = ringPosition(i, SERVICE_NODES.length, R);
        return (
          <group key={name} position={[p.x, 0, p.z]}>
            <mesh>
              <tetrahedronGeometry args={[0.12, 0]} />
              <meshBasicMaterial color={MAGENTA} transparent opacity={active ? 0.9 : 0.3} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

/* ---------------- Links: warehouses ↔ core ---------------- */

function WarehouseLinks({ active, selected }: { active: boolean; selected: string | null }) {
  const groupRef = useRef<THREE.Group>(null);
  const curves = useMemo(() => {
    return WAREHOUSES.map((wh) => {
      const start = ringPosition(0, 1, 3.1).applyAxisAngle(new THREE.Vector3(0, 1, 0), wh.angle);
      const mid = start.clone().multiplyScalar(0.5).setY(0.9);
      return new THREE.QuadraticBezierCurve3(start, mid, new THREE.Vector3(0, 0, 0));
    });
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.16;
  });

  return (
    <group ref={groupRef}>
      {curves.map((c, i) => {
        const wh = WAREHOUSES[i];
        const isSel = selected === wh.id;
        return (
          <group key={wh.id}>
            <mesh>
              <tubeGeometry args={[c, 32, 0.008, 6, false]} />
              <meshBasicMaterial
                color={isSel ? MAGENTA : SNOW}
                transparent
                opacity={active ? (isSel ? 0.85 : 0.3) : 0.12}
              />
            </mesh>
            <PacketOnCurve curve={c} speed={0.35 + i * 0.1} color={isSel ? MAGENTA : MINT} active={active} />
            {active && <PacketOnCurve curve={c} speed={0.35 + i * 0.1} offset={0.5} color={ICE} active />}
          </group>
        );
      })}
    </group>
  );
}

function PacketOnCurve({
  curve,
  speed,
  offset = 0,
  color,
  active,
}: {
  curve: THREE.QuadraticBezierCurve3;
  speed: number;
  offset?: number;
  color: string;
  active: boolean;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = (state.clock.elapsedTime * speed + offset) % 1;
    ref.current.position.copy(curve.getPoint(active ? t : 0));
    ref.current.visible = active;
    const s = 0.6 + Math.sin(t * Math.PI) * 0.6;
    ref.current.scale.setScalar(s);
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.05, 8, 8]} />
      <meshBasicMaterial color={color} transparent opacity={0.95} />
    </mesh>
  );
}

/* ---------------- Stars ---------------- */

function Stars({ count = 700 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 9 + Math.random() * 14;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.cos(phi);
      arr[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (!ref.current) return;
    const mat = ref.current.material as THREE.PointsMaterial;
    mat.opacity = 0.5 + Math.sin(state.clock.elapsedTime * 0.7) * 0.2;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color={ICE} size={1.5} sizeAttenuation={false} transparent opacity={0.55} depthWrite={false} />
    </points>
  );
}

/* ---------------- Camera rig: focus selected warehouse ---------------- */

function FocusRig({ selected }: { selected: string | null }) {
  const target = useMemo(() => {
    if (!selected) return null;
    const wh = WAREHOUSES.find((w) => w.id === selected);
    if (!wh) return null;
    return ringPosition(0, 1, 3.1).applyAxisAngle(new THREE.Vector3(0, 1, 0), wh.angle);
  }, [selected]);

  useFrame(({ camera, clock }) => {
    if (!target) return;
    // track the selected warehouse as the ring rotates under the camera
    const current = target
      .clone()
      .applyAxisAngle(new THREE.Vector3(0, 1, 0), (clock.elapsedTime - RING_T0) * 0.16);
    const dir = current.normalize();
    const desired = dir.multiplyScalar(6.4).setY(2.4);
    camera.position.lerp(desired, 0.012);
  });
  return null;
}

/* ---------------- HUD stats ---------------- */

function useTelemetry(active: boolean) {
  const [qps, setQps] = useState(1284);
  const [bytes, setBytes] = useState(2.41);
  const [nodes, setNodes] = useState(48);
  useTicker(active, () => {
    setQps((q) => Math.max(600, Math.min(3200, q + Math.round((Math.random() - 0.5) * 220))));
    setBytes((b) => Math.max(0.4, Math.min(9.9, +(b + (Math.random() - 0.5) * 0.3).toFixed(2))));
    setNodes((n) => Math.max(32, Math.min(72, n + Math.round((Math.random() - 0.5) * 6))));
  }, 1200);
  return { qps, bytes, nodes };
}

/* ================================================================== */
/* MAIN MODULE                                                         */
/* ================================================================== */

const LAYER_META: Record<LayerKey, { label: string; tone: string; desc: string }> = {
  storage: {
    label: "DATABASE STORAGE",
    tone: "text-snow border-snow/40",
    desc: "Hybrid-columnar micro-partitions in cloud object storage — compressed, encrypted, replicated. No capacity planning, ever.",
  },
  compute: {
    label: "QUERY PROCESSING",
    tone: "text-mint border-mint/40",
    desc: "MPP virtual warehouses — independent clusters with zero contention. Each gets its own cache; sizes XS → 6XL.",
  },
  services: {
    label: "CLOUD SERVICES",
    tone: "text-magenta border-magenta/40",
    desc: "The brain: query parsing, optimizer, metadata, transactions, access control — coordinating every warehouse.",
  },
};

export default function OverviewModule() {
  const [layer, setLayer] = useState<LayerKey | null>(null);
  const [selectedWh, setSelectedWh] = useState<string | null>(null);
  const [autoRotate, setAutoRotate] = useState(true);
  const { qps, bytes, nodes } = useTelemetry(true);

  const toggleLayer = useCallback((k: LayerKey) => {
    setLayer((cur) => (cur === k ? null : k));
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <SectionTitle
        kicker="01 // CORE"
        title="THE DATA CLOUD IN MOTION"
        desc="Storage, compute and cloud services decoupled into one elastic mesh. Drag to orbit · click a warehouse node · toggle layers to isolate them."
      />

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px] items-start">
        {/* 3D STAGE */}
        <GlassPanel title="3D CORE // LIVE SCENE" subtitle="SNOWFLAKE REFERENCE TOPOLOGY" className="!p-0 overflow-hidden" delay={0.05}>
          <div className="relative h-[420px] sm:h-[500px] lg:h-[560px] scanlines">
            <Canvas
              camera={{ position: [0, 2.6, 6.4], fov: 42 }}
              dpr={[1, 2]}
              gl={{ antialias: true, alpha: true }}
              aria-label="Interactive 3D scene of the Snowflake data cloud: micro-partition storage core, orbiting virtual warehouses and a cloud services halo"
              role="img"
            >
              <color attach="background" args={["#02050b"]} />
              <fog attach="fog" args={["#02050b", 9, 22]} />
              <Stars />
              <MicroPartitionCore active={!layer || layer === "storage"} />
              <PartitionCage active={!layer || layer === "storage"} />
              <WarehouseRing
                active={!layer || layer === "compute"}
                selected={selectedWh}
                onSelect={setSelectedWh}
              />
              <WarehouseLinks active={!layer || layer === "compute"} selected={selectedWh} />
              <ServiceHalo active={!layer || layer === "services"} />
              <FocusRig selected={selectedWh} />
              <OrbitControls
                enablePan={false}
                enableDamping
                dampingFactor={0.08}
                minDistance={3.4}
                maxDistance={12}
                autoRotate={autoRotate}
                autoRotateSpeed={0.5}
              />
            </Canvas>

            {/* HUD — top-left layer toggles */}
            <div className="absolute left-3 top-3 z-20 flex flex-col gap-1.5">
              {(Object.keys(LAYER_META) as LayerKey[]).map((k) => (
                <UCToggle key={k} on={layer === k} onClick={() => toggleLayer(k)} accent={k === "compute" ? "mint" : k === "services" ? "magenta" : "snow"} ariaLabel={`Toggle ${LAYER_META[k].label} layer`}>
                  {LAYER_META[k].label}
                </UCToggle>
              ))}
              <UCToggle on={autoRotate} onClick={() => setAutoRotate((v) => !v)} ariaLabel="Toggle auto rotation">
                AUTO-ORBIT
              </UCToggle>
            </div>

            {/* HUD — top-right telemetry */}
            <div className="absolute right-3 top-3 z-20 glass-inset cyber-cut-sm px-3 py-2 text-right">
              <p className="text-[7px] uppercase tracking-[0.24em] text-muted-foreground">QUERIES / SEC</p>
              <motion.p key={qps} initial={{ opacity: 0.4 }} animate={{ opacity: 1 }} className="text-sm font-extrabold text-snow tabular-nums text-glow">
                {qps.toLocaleString()}
              </motion.p>
              <p className="text-[7px] uppercase tracking-[0.24em] text-muted-foreground mt-1.5">SCAN GB / SEC</p>
              <p className="text-xs font-extrabold text-mint tabular-nums">{bytes.toFixed(2)}</p>
              <p className="text-[7px] uppercase tracking-[0.24em] text-muted-foreground mt-1.5">MPP NODES</p>
              <p className="text-xs font-extrabold text-ice tabular-nums">{nodes}</p>
            </div>

            {/* HUD — bottom-left legend */}
            <div className="absolute left-3 bottom-3 z-20 flex flex-col gap-1">
              <FlowLabel x={0} y={0} tone="snow" className="!static !translate-x-0 !translate-y-0">◉ STORAGE · MICRO-PARTITIONS</FlowLabel>
              <FlowLabel x={0} y={0} tone="mint" className="!static !translate-x-0 !translate-y-0">▣ COMPUTE · WAREHOUSES</FlowLabel>
              <FlowLabel x={0} y={0} tone="magenta" className="!static !translate-x-0 !translate-y-0">✦ SERVICES · METADATA</FlowLabel>
            </div>

            {/* HUD — selected warehouse card */}
            <AnimatePresence>
              {selectedWh && (
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 14 }}
                  className="absolute right-3 bottom-3 z-20 glass-deep cyber-cut px-3.5 py-2.5 max-w-[240px]"
                >
                  {(() => {
                    const wh = WAREHOUSES.find((w) => w.id === selectedWh);
                    if (!wh) return null;
                    return (
                      <>
                        <p className="text-[8px] uppercase tracking-[0.24em] text-magenta font-bold">WAREHOUSE SELECTED</p>
                        <p className="text-[11px] font-extrabold text-foreground mt-0.5">{wh.name}</p>
                        <div className="mt-1.5 flex gap-3 text-[8px] text-muted-foreground tracking-[0.14em]">
                          <span>SIZE <span className="text-snow font-bold">{wh.size}</span></span>
                          <span>CREDITS/H <span className="text-mint font-bold">{wh.credits}</span></span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setSelectedWh(null)}
                          className="mt-2 text-[7.5px] uppercase tracking-[0.2em] text-muted-foreground hover:text-snow transition-colors"
                          aria-label="Deselect warehouse"
                        >
                          [ DESELECT ]
                        </button>
                      </>
                    );
                  })()}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </GlassPanel>

        {/* SIDE RAIL */}
        <div className="flex flex-col gap-4 min-w-0">
          <GlassPanel title="LIVE STATS" className="!p-0" delay={0.1}>
            <div className="p-3 grid grid-cols-2 gap-2">
              <UCStat label="QUERY RATE" value={`${qps}/s`} />
              <UCStat label="SCAN THROUGHPUT" value={`${bytes.toFixed(2)} GB/s`} tone="mint" />
              <UCStat label="MPP NODES" value={nodes} tone="neutral" />
              <UCStat label="WAREHOUSES" value={WAREHOUSES.length} />
            </div>
          </GlassPanel>

          <GlassPanel title="LAYER FOCUS" className="!p-0" delay={0.15}>
            <div className="p-3 flex flex-col gap-2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={layer ?? "all"}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="glass-inset cyber-cut-sm p-2.5"
                >
                  <p className={`text-[8px] font-bold uppercase tracking-[0.2em] ${layer ? LAYER_META[layer].tone : "text-snow border-snow/40"}`}>
                    {layer ? LAYER_META[layer].label : "ALL LAYERS // UNIFIED"}
                  </p>
                  <p className="mt-1.5 text-[10px] leading-relaxed text-foreground/75">
                    {layer ? LAYER_META[layer].desc : "Snowflake's three layers scale independently — storage grows with data, compute grows with concurrency, services coordinate it all."}
                  </p>
                </motion.div>
              </AnimatePresence>
              <div className="grid grid-cols-3 gap-1.5">
                <StatChip label="ELASTIC" value="TRUE" delay={0.1} />
                <StatChip label="CONTENTION" value="ZERO" tone="mint" delay={0.15} />
                <StatChip label="OPS" value="ZERO" tone="magenta" delay={0.2} />
              </div>
            </div>
          </GlassPanel>

          <GlassPanel title="ZERO-COPY CLONE" className="!p-0" delay={0.2}>
            <div className="p-3">
              <SqlCodeBlock
                label="INSTANT SANDBOX"
                code={`CREATE DB DEV_CLONE
  CLONE PROD_DB;`}
                dense
              />
            </div>
          </GlassPanel>
        </div>
      </div>

      {/* LAYER BREAKDOWN CARDS */}
      <div className="grid gap-4 md:grid-cols-3">
        {(
          [
            { k: "storage" as LayerKey, icon: "▣", stats: [["COMPRESSION", "4-8×"], ["RETENTION", "TIME TRAVEL"], ["REPLICATION", "AUTO"]], cmd: "MICRO-PARTITIONS · ~16MB COMPRESSED" },
            { k: "compute" as LayerKey, icon: "⬡", stats: [["SIZES", "XS→6XL"], ["CLUSTERS", "MULTI"], ["SUSPEND", "AUTO 60s"]], cmd: "ISOLATED MPP CLUSTERS · PER-QUERY" },
            { k: "services" as LayerKey, icon: "✦", stats: [["METADATA", "GLOBAL"], ["LOCKS", "MANAGED"], ["SECURITY", "RBAC"]], cmd: "BRAIN · PARSE OPTIMIZE GOVERN" },
          ] as const
        ).map((c, idx) => (
          <GlassPanel key={c.k} title={LAYER_META[c.k].label} className="!p-0" delay={0.1 + idx * 0.08}>
            <div className="p-4 flex flex-col gap-2.5">
              <p className="text-2xl text-snow/70 leading-none">{c.icon}</p>
              <p className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground">{c.cmd}</p>
              <div className="grid grid-cols-3 gap-1.5">
                {c.stats.map(([l, v]) => (
                  <div key={l} className="glass-inset px-1.5 py-1">
                    <p className="text-[6.5px] uppercase tracking-[0.14em] text-muted-foreground">{l}</p>
                    <p className="text-[9px] font-extrabold text-snow">{v}</p>
                  </div>
                ))}
              </div>
              <p className="text-[10px] leading-relaxed text-foreground/70">{LAYER_META[c.k].desc}</p>
            </div>
          </GlassPanel>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Callout type="info" title="Why decoupling matters" delay={0.05}>
          Every warehouse reads the same storage — so ETL, BI and dev never queue behind each other. Compute bills only while running; storage bills per TB/month.
        </Callout>
        <Callout type="tip" title="Per-warehouse cache" delay={0.12}>
          Each virtual warehouse keeps local SSD + memory caches of scanned partitions. First query warms it; the rest fly. That is why isolation beats sharing.
        </Callout>
      </div>
    </div>
  );
}
