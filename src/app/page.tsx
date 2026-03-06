"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import {
  ArrowDown,
  BookOpen,
  ExternalLink,
  FolderOpen,
  Github,
  Sparkles,
  Waves,
} from "lucide-react";

type TabKey = "notes" | "projects";
type BubbleBurst = { id: number; x: number; y: number };

type SceneProps = {
  progress: number;
  mouse: { x: number; y: number };
};

const tabs = [
  { key: "notes" as const, label: "Notes", Icon: BookOpen },
  { key: "projects" as const, label: "Projects", Icon: FolderOpen },
];

const notes = [
  {
    title: "Lecture 01 — MDPs as Ocean Currents",
    tag: "Foundations",
    blurb:
      "States, actions, rewards, and transitions — the first map of the underwater world.",
  },
  {
    title: "Lecture 02 — Value Functions & Depth Gauges",
    tag: "Theory",
    blurb:
      "How future rewards shimmer beneath the surface and guide the diver forward.",
  },
  {
    title: "Lecture 03 — Q-Learning in Coral Mazes",
    tag: "Algorithms",
    blurb:
      "Exploration, exploitation, and hidden pathways through a reef of decisions.",
  },
  {
    title: "Lecture 04 — Policy Gradients in the Deep",
    tag: "Deep RL",
    blurb:
      "Learning from trajectories like following bioluminescent trails in the dark.",
  },
];

const projects = [
  {
    title: "Diver vs Current",
    type: "Interactive RL Demo",
    description: "An agent learns to move through shifting underwater currents.",
  },
  {
    title: "Coral Policy Garden",
    type: "Policy Visualization",
    description: "Policies grow like glowing coral branches as training improves.",
  },
  {
    title: "Deep Sea Treasure Hunt",
    type: "Gridworld Project",
    description: "Rewards, hazards, and trajectories visualized on the ocean floor.",
  },
  {
    title: "Jellyfish Explorer",
    type: "Exploration Demo",
    description: "A soft, beautiful visualization of epsilon-greedy exploration.",
  },
];

const depthStages = [
  { label: "Sunlit Surface", range: [0, 0.18] },
  { label: "Blue Descent", range: [0.18, 0.38] },
  { label: "Coral Forest", range: [0.38, 0.62] },
  { label: "Twilight Zone", range: [0.62, 0.82] },
  { label: "Abyssal Floor", range: [0.82, 1] },
] as const;

function clamp01(x: number) {
  return Math.max(0, Math.min(1, x));
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function sceneColors(progress: number) {
  if (progress < 0.18) {
    return {
      top: "#6fdfff",
      bottom: "#0f4f85",
      fog: "#78dbff",
      ambient: "#8fe9ff",
    };
  }
  if (progress < 0.38) {
    return {
      top: "#2c8fd3",
      bottom: "#062f5d",
      fog: "#2e97d9",
      ambient: "#67c7ff",
    };
  }
  if (progress < 0.62) {
    return {
      top: "#1a6cb2",
      bottom: "#04213f",
      fog: "#1f6ba7",
      ambient: "#67e2ff",
    };
  }
  if (progress < 0.82) {
    return {
      top: "#113e73",
      bottom: "#020f25",
      fog: "#153c66",
      ambient: "#72a7ff",
    };
  }
  return {
    top: "#07162f",
    bottom: "#020612",
    fog: "#091628",
    ambient: "#9cc6ff",
  };
}

function BubbleField({ progress }: { progress: number }) {
  const group = useRef<THREE.Group>(null);

  const bubbles = useMemo(
    () =>
      Array.from({ length: 90 }, (_, i) => ({
        id: i,
        x: (Math.random() - 0.5) * 26,
        y: -10 - Math.random() * 16,
        z: -8 + Math.random() * 12,
        r: 0.06 + Math.random() * 0.16,
        speed: 0.01 + Math.random() * 0.03,
      })),
    []
  );

  useFrame(() => {
    if (!group.current) return;

    group.current.children.forEach((child, i) => {
      const b = bubbles[i];
      child.position.y += b.speed * (1 + progress * 0.8);
      child.position.x += Math.sin(performance.now() * 0.0007 + i) * 0.002;

      if (child.position.y > 11) {
        child.position.y = -10 - Math.random() * 5;
      }
    });
  });

  return (
    <group ref={group}>
      {bubbles.map((b) => (
        <mesh key={b.id} position={[b.x, b.y, b.z]}>
          <sphereGeometry args={[b.r, 16, 16]} />
          <meshPhysicalMaterial
            color="#c8f5ff"
            transmission={1}
            transparent
            opacity={0.5}
            roughness={0.05}
            metalness={0}
          />
        </mesh>
      ))}
    </group>
  );
}

function FishSchool({
  count,
  area,
  tint = "#8ce9ff",
  speed = 1,
}: {
  count: number;
  area: number;
  tint?: string;
  speed?: number;
}) {
  const group = useRef<THREE.Group>(null);

  const fish = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        radius: 1.5 + Math.random() * area,
        offset: Math.random() * Math.PI * 2,
        y: -1 + Math.random() * 7,
        z: -7 + Math.random() * 10,
        scale: 0.12 + Math.random() * 0.18,
      })),
    [count, area]
  );

  useFrame(({ clock }) => {
    if (!group.current) return;

    const t = clock.getElapsedTime() * 0.35 * speed;

    group.current.children.forEach((child, i) => {
      const f = fish[i];
      child.position.x = Math.sin(t + f.offset) * f.radius;
      child.position.y = f.y + Math.cos(t * 1.2 + f.offset) * 0.35;
      child.position.z = f.z + Math.cos(t + f.offset) * 0.6;
      child.rotation.y = Math.cos(t + f.offset) > 0 ? Math.PI : 0;
      child.rotation.z = Math.sin(t * 2 + f.offset) * 0.08;
    });
  });

  return (
    <group ref={group}>
      {fish.map((f) => (
        <group key={f.id} scale={f.scale}>
          <mesh>
            <sphereGeometry args={[0.55, 20, 20]} />
            <meshStandardMaterial
              color={tint}
              emissive={tint}
              emissiveIntensity={0.15}
              roughness={0.35}
            />
          </mesh>
          <mesh position={[0.72, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <coneGeometry args={[0.42, 0.85, 4]} />
            <meshStandardMaterial
              color="#b9fcff"
              emissive="#7bdfff"
              emissiveIntensity={0.1}
            />
          </mesh>
          <mesh position={[-0.2, 0.25, 0]} rotation={[0, 0, -0.4]}>
            <coneGeometry args={[0.18, 0.35, 3]} />
            <meshStandardMaterial color="#d6ffff" />
          </mesh>
          <mesh position={[-0.2, -0.25, 0]} rotation={[0, 0, 0.4]}>
            <coneGeometry args={[0.18, 0.35, 3]} />
            <meshStandardMaterial color="#d6ffff" />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function CoralCluster({
  position,
  scale = 1,
  bright = false,
}: {
  position: [number, number, number];
  scale?: number;
  bright?: boolean;
}) {
  const colorA = bright ? "#7ff4ff" : "#58d9ff";
  const colorB = bright ? "#f1a4ff" : "#b76cff";
  const colorC = bright ? "#8cffc9" : "#43d98b";

  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 0.65, 0]}>
        <cylinderGeometry args={[0.16, 0.24, 1.3, 8]} />
        <meshStandardMaterial
          color={colorA}
          emissive={colorA}
          emissiveIntensity={0.35}
          roughness={0.45}
        />
      </mesh>
      <mesh position={[-0.35, 0.95, 0.12]} rotation={[0, 0, -0.45]}>
        <cylinderGeometry args={[0.09, 0.13, 0.9, 8]} />
        <meshStandardMaterial
          color={colorB}
          emissive={colorB}
          emissiveIntensity={0.28}
          roughness={0.45}
        />
      </mesh>
      <mesh position={[0.38, 0.88, -0.08]} rotation={[0, 0, 0.5]}>
        <cylinderGeometry args={[0.08, 0.12, 0.85, 8]} />
        <meshStandardMaterial
          color={colorC}
          emissive={colorC}
          emissiveIntensity={0.26}
          roughness={0.45}
        />
      </mesh>
      <mesh position={[0.02, 1.36, 0]}>
        <sphereGeometry args={[0.12, 12, 12]} />
        <meshStandardMaterial
          color="#dcffff"
          emissive="#b1ffff"
          emissiveIntensity={0.5}
        />
      </mesh>
    </group>
  );
}

function ReefBand({
  depth,
  progress,
  count = 12,
}: {
  depth: number;
  progress: number;
  count?: number;
}) {
  const positions = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        x: -13 + (i / (count - 1)) * 26,
        z: depth + (Math.random() - 0.5) * 3,
        s: 0.8 + Math.random() * 1.5,
      })),
    [count, depth]
  );

  return (
    <group position={[0, -4.7, 0]}>
      {positions.map((p, i) => (
        <CoralCluster
          key={i}
          position={[p.x, 0, p.z]}
          scale={p.s * (0.8 + progress * 0.4)}
          bright={progress > 0.35 && progress < 0.8}
        />
      ))}
    </group>
  );
}

function Mermaid({ progress, mouse }: SceneProps) {
  const ref = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;

    const t = clock.getElapsedTime();
    ref.current.position.x = -4.8 + Math.sin(t * 0.35) * 3.4 + mouse.x * 0.9;
    ref.current.position.y =
      1.9 + Math.sin(t * 1.2) * 0.22 - progress * 1.4 + mouse.y * 0.35;
    ref.current.position.z = 1.2 + Math.cos(t * 0.3) * 0.35;
    ref.current.rotation.z = Math.sin(t * 1.1) * 0.12;
    ref.current.rotation.y = Math.sin(t * 0.35) * 0.18 + 0.35;

    const spineUpper = ref.current.getObjectByName("spine-upper");
    const spineLower = ref.current.getObjectByName("spine-lower");
    const tailBase = ref.current.getObjectByName("tail-base");
    const tail = ref.current.getObjectByName("tail");

    const swimPhase = t * 2.6;
    const spineWave = Math.sin(swimPhase) * 0.08;
    const lowerWave = Math.sin(swimPhase + 0.5) * 0.12;
    const tailWave = Math.sin(swimPhase + 0.9) * 0.24;

    if (spineUpper) {
      spineUpper.rotation.z = spineWave * 0.6;
      spineUpper.rotation.y = spineWave * 0.4;
    }
    if (spineLower) {
      spineLower.rotation.z = lowerWave * 0.9;
      spineLower.rotation.y = lowerWave * 0.6;
    }
    if (tailBase) {
      tailBase.rotation.z = lowerWave * 1.1;
      tailBase.rotation.y = lowerWave * 0.7;
    }
    if (tail) {
      tail.rotation.z = tailWave;
      tail.rotation.y = tailWave * 0.3;
    }

    const fin = ref.current.getObjectByName("fin");
    if (fin) fin.rotation.z = Math.sin(t * 4.1) * 0.38;

    const hair = ref.current.getObjectByName("hair");
    if (hair) hair.rotation.z = Math.sin(t * 2.2) * 0.12;
  });

  return (
    <Float speed={1.1} rotationIntensity={0.15} floatIntensity={0.25}>
      <group ref={ref} scale={1.18}>
        {/* Upper body / spine */}
        <group name="spine-upper">
          <mesh position={[0, 0.65, 0]}>
            <capsuleGeometry args={[0.28, 0.8, 24, 32]} />
            <meshPhysicalMaterial
              color="#f3d2c0"
              roughness={0.45}
              metalness={0.0}
              sheen={0.35}
              sheenRoughness={0.6}
              clearcoat={0.25}
              clearcoatRoughness={0.6}
            />
          </mesh>
          <mesh position={[0, 1.45, 0.05]}>
            <sphereGeometry args={[0.25, 32, 32]} />
            <meshPhysicalMaterial
              color="#f1cdb8"
              roughness={0.42}
              metalness={0.0}
              sheen={0.35}
              sheenRoughness={0.6}
              clearcoat={0.25}
              clearcoatRoughness={0.6}
            />
          </mesh>
          <mesh name="hair" position={[-0.02, 1.48, -0.16]}>
            <sphereGeometry args={[0.3, 36, 36]} />
            <meshStandardMaterial
              color="#5f3bd4"
              emissive="#3c2aa3"
              emissiveIntensity={0.12}
              roughness={0.6}
            />
          </mesh>
          {/* simple eyes */}
          <mesh position={[0.09, 1.46, 0.16]}>
            <sphereGeometry args={[0.035, 18, 18]} />
            <meshStandardMaterial color="#111827" roughness={0.25} />
          </mesh>
          <mesh position={[-0.09, 1.46, 0.16]}>
            <sphereGeometry args={[0.035, 18, 18]} />
            <meshStandardMaterial color="#111827" roughness={0.25} />
          </mesh>
          <mesh position={[0, 0.84, 0.18]}>
            <sphereGeometry args={[0.2, 24, 24]} />
            <meshPhysicalMaterial
              color="#b96df0"
              roughness={0.35}
              metalness={0.1}
              clearcoat={0.3}
              clearcoatRoughness={0.4}
            />
          </mesh>
          <mesh position={[-0.42, 0.88, 0]} rotation={[0, 0, 0.45]}>
            <capsuleGeometry args={[0.08, 0.42, 12, 12]} />
            <meshPhysicalMaterial
              color="#f2d0bf"
              roughness={0.45}
              metalness={0}
              sheen={0.25}
              sheenRoughness={0.7}
            />
          </mesh>
          <mesh position={[0.42, 0.88, 0]} rotation={[0, 0, -0.45]}>
            <capsuleGeometry args={[0.08, 0.42, 12, 12]} />
            <meshPhysicalMaterial
              color="#f2d0bf"
              roughness={0.45}
              metalness={0}
              sheen={0.25}
              sheenRoughness={0.7}
            />
          </mesh>
        </group>

        {/* Lower spine and tail */}
        <group name="spine-lower" position={[0, -0.35, 0]} rotation={[0, 0, 0.04]}>
          <group name="tail-base" position={[0, -0.05, 0]}>
            <mesh>
              <cylinderGeometry args={[0.24, 0.14, 1.5, 28]} />
              <meshPhysicalMaterial
                color="#3fc0b7"
                roughness={0.3}
                metalness={0.08}
                transmission={0.25}
                thickness={0.6}
                ior={1.33}
                clearcoat={0.3}
                clearcoatRoughness={0.35}
              />
            </mesh>
          </group>
          <group name="tail" position={[0, -1.15, 0]}>
            <mesh>
              <cylinderGeometry args={[0.16, 0.06, 1.1, 32]} />
              <meshPhysicalMaterial
                color="#48d3c4"
                roughness={0.28}
                metalness={0.08}
                transmission={0.32}
                thickness={0.7}
                ior={1.33}
                clearcoat={0.35}
                clearcoatRoughness={0.35}
              />
            </mesh>
            <mesh name="fin" position={[0, -0.9, 0]} rotation={[0, 0, Math.PI / 2]}>
              <coneGeometry args={[0.45, 0.9, 22]} />
              <meshPhysicalMaterial
                color="#7ddff5"
                roughness={0.16}
                metalness={0.05}
                transmission={0.6}
                thickness={0.5}
                ior={1.33}
                clearcoat={0.4}
                clearcoatRoughness={0.25}
              />
            </mesh>
          </group>
        </group>
      </group>
    </Float>
  );
}

function SeaFloor({ progress }: { progress: number }) {
  return (
    <group position={[0, -5.6, 0]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[42, 38, 1, 1]} />
        <meshStandardMaterial
          color={progress > 0.75 ? "#081320" : "#0d3d4d"}
          roughness={1}
          metalness={0}
        />
      </mesh>
      <mesh position={[-6, 0.35, -4]}>
        <sphereGeometry args={[1.4, 24, 24]} />
        <meshStandardMaterial color="#19465e" roughness={1} />
      </mesh>
      <mesh position={[4.5, 0.45, -2]}>
        <sphereGeometry args={[1.7, 24, 24]} />
        <meshStandardMaterial color="#12384d" roughness={1} />
      </mesh>
      <mesh position={[0, 0.25, 1.5]}>
        <sphereGeometry args={[1.1, 24, 24]} />
        <meshStandardMaterial color="#1a5465" roughness={1} />
      </mesh>
    </group>
  );
}

function DepthScenery({ progress, mouse }: SceneProps) {
  const surfaceT = clamp01((0.18 - progress) / 0.18);
  const descentT = clamp01(1 - Math.abs(progress - 0.28) / 0.12);
  const coralT = clamp01(1 - Math.abs(progress - 0.5) / 0.18);
  const twilightT = clamp01(1 - Math.abs(progress - 0.72) / 0.12);
  const abyssT = clamp01((progress - 0.78) / 0.22);

  return (
    <group position={[mouse.x * 0.45, mouse.y * 0.25, 0]}>
      <group visible={surfaceT > 0.02}>
        <mesh position={[0, 7.6, -8]} rotation={[-0.15, 0, 0]}>
          <planeGeometry args={[24, 10]} />
          <meshBasicMaterial
            color="#c0fbff"
            transparent
            opacity={0.14 + surfaceT * 0.14}
          />
        </mesh>
        <FishSchool count={8} area={5} tint="#d4ffff" speed={0.8} />
      </group>

      <group visible={descentT > 0.02}>
        {Array.from({ length: 8 }).map((_, i) => (
          <mesh
            key={i}
            position={[-8 + i * 2.3, 3.5 - i * 0.7, -7 + i * 0.2]}
            rotation={[0, 0, -0.55]}
          >
            <cylinderGeometry args={[0.03, 0.16, 6.5, 8]} />
            <meshBasicMaterial
              color="#89dbff"
              transparent
              opacity={0.06 + descentT * 0.12}
            />
          </mesh>
        ))}
      </group>

      <group visible={coralT > 0.02}>
        <ReefBand depth={-2} progress={coralT} count={14} />
        <ReefBand depth={2} progress={coralT} count={12} />
        <FishSchool count={14} area={7} tint="#7df2ff" speed={1.15} />
      </group>

      <group visible={twilightT > 0.02}>
        {Array.from({ length: 16 }).map((_, i) => (
          <mesh
            key={i}
            position={[
              (Math.random() - 0.5) * 18,
              -1 + Math.random() * 8,
              -8 + Math.random() * 12,
            ]}
          >
            <sphereGeometry args={[0.07 + Math.random() * 0.07, 12, 12]} />
            <meshBasicMaterial
              color={i % 2 === 0 ? "#8be1ff" : "#be8fff"}
              transparent
              opacity={0.75}
            />
          </mesh>
        ))}
        <FishSchool count={7} area={5} tint="#b6a2ff" speed={0.6} />
      </group>

      <group visible={abyssT > 0.02}>
        <ReefBand depth={0} progress={abyssT} count={10} />
        {Array.from({ length: 7 }).map((_, i) => (
          <mesh
            key={i}
            position={[-10 + i * 3.1, -3.4 + Math.sin(i) * 0.5, -4 + Math.cos(i) * 2]}
          >
            <coneGeometry args={[0.55, 2.1 + (i % 3) * 0.7, 7]} />
            <meshStandardMaterial
              color="#0e2745"
              emissive="#12345c"
              emissiveIntensity={0.14}
              roughness={0.9}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}

function CameraRig({ progress, mouse }: SceneProps) {
  useFrame(({ camera }) => {
    const y = lerp(1.8, -4.1, progress);
    camera.position.x = mouse.x * 0.8;
    camera.position.y = y + mouse.y * 0.35;
    camera.position.z = 9.5 - progress * 1.6;
    camera.lookAt(mouse.x * 0.6, y * 0.2, 0);
  });

  return null;
}

function UnderwaterScene({ progress, mouse }: SceneProps) {
  const colors = sceneColors(progress);
  const fogColor = useMemo(() => new THREE.Color(colors.fog), [colors.fog]);

  return (
    <>
      <color attach="background" args={[colors.bottom]} />
      <fog attach="fog" args={[fogColor, 10, 28]} />
      <ambientLight intensity={0.7} color={colors.ambient} />
      <directionalLight position={[4, 7, 6]} intensity={2.4} color="#d8fbff" />
      <pointLight position={[-5, 2, 4]} intensity={1.15} color="#75f2ff" />
      <pointLight
        position={[5, -2, 2]}
        intensity={0.8 + progress * 0.5}
        color="#ae8eff"
      />
      <pointLight
        position={[-4.5, 2.4, 2.2]}
        intensity={0.7}
        distance={14}
        color="#b9ecff"
      />
      <CameraRig progress={progress} mouse={mouse} />
      <DepthScenery progress={progress} mouse={mouse} />
      <Mermaid progress={progress} mouse={mouse} />
      <BubbleField progress={progress} />
      <SeaFloor progress={progress} />
    </>
  );
}

export default function RLUnderwaterQuestSite() {
  const [activeTab, setActiveTab] = useState<TabKey>("notes");
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [progress, setProgress] = useState(0);
  const [bursts, setBursts] = useState<BubbleBurst[]>([]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: -(e.clientY / window.innerHeight - 0.5) * 2,
      });
    };

    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? window.scrollY / scrollable : 0);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("scroll", onScroll);
    onScroll();

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const depthLabel = useMemo(() => {
    const current = depthStages.find(
      (stage) => progress >= stage.range[0] && progress <= stage.range[1]
    );
    return current?.label ?? "Abyssal Floor";
  }, [progress]);

  function spawnBurst(e: React.MouseEvent<HTMLDivElement>) {
    const id = Date.now() + Math.random();
    const x = e.clientX;
    const y = e.clientY;

    setBursts((prev) => [...prev, { id, x, y }]);

    window.setTimeout(() => {
      setBursts((prev) => prev.filter((b) => b.id !== id));
    }, 1400);
  }

  return (
    <div
      className="min-h-[500vh] overflow-x-hidden bg-[#020816] text-white"
      onClick={spawnBurst}
    >
      <style>{`
        html { scroll-behavior: smooth; }
        @keyframes bubbleBurst {
          0% { transform: translate(-50%, -50%) scale(0.3); opacity: 0.9; }
          100% { transform: translate(calc(-50% + var(--dx)), calc(-50% + var(--dy))) scale(1.2); opacity: 0; }
        }
        @keyframes bubblePop {
          0% { transform: scale(0.3); opacity: 0.9; }
          100% { transform: scale(1.1); opacity: 0; }
        }
      `}</style>

      <div className="fixed inset-0 z-0">
        <Canvas camera={{ position: [0, 1.5, 9.5], fov: 48 }} gl={{ antialias: true }}>
          <UnderwaterScene progress={progress} mouse={mouse} />
        </Canvas>
      </div>

      <div
        className="pointer-events-none fixed left-0 right-0 top-0 z-50 h-[3px] bg-gradient-to-r from-cyan-300 via-sky-300 to-violet-300"
        style={{ transform: `scaleX(${progress})`, transformOrigin: "left" }}
      />

      <div className="pointer-events-none fixed right-4 top-4 z-50 hidden rounded-2xl border border-cyan-100/10 bg-slate-950/45 px-4 py-3 text-sm text-cyan-50/85 backdrop-blur-xl md:block">
        <div className="text-xs uppercase tracking-[0.25em] text-cyan-200/60">
          Depth
        </div>
        <div className="mt-1 font-medium text-cyan-100">{depthLabel}</div>
      </div>

      {bursts.map((burst) => (
        <div key={burst.id} className="pointer-events-none fixed inset-0 z-[60]">
          {Array.from({ length: 9 }).map((_, i) => {
            const angle = (Math.PI * 2 * i) / 9;
            const dx = `${Math.cos(angle) * (26 + (i % 3) * 14)}px`;
            const dy = `${Math.sin(angle) * (26 + (i % 4) * 12) - 35}px`;

            return (
              <span
                key={i}
                className="absolute h-3 w-3 rounded-full border border-cyan-100/60 bg-cyan-100/20 backdrop-blur-sm"
                style={
                  {
                    left: burst.x,
                    top: burst.y,
                    "--dx": dx,
                    "--dy": dy,
                    animation: "bubbleBurst 1.2s ease-out forwards",
                    boxShadow: "0 0 18px rgba(164,240,255,0.4)",
                  } as React.CSSProperties
                }
              />
            );
          })}
          <span
            className="absolute h-5 w-5 rounded-full border border-cyan-100/70 bg-cyan-100/15"
            style={{
              left: burst.x,
              top: burst.y,
              transform: "translate(-50%, -50%)",
              animation: "bubblePop 0.9s ease-out forwards",
            }}
          />
        </div>
      ))}

      <div className="relative z-10">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
          <div className="flex items-center gap-3 text-cyan-100">
            <div className="rounded-2xl border border-cyan-100/10 bg-white/5 p-2 backdrop-blur-md">
              <Waves className="h-5 w-5" />
            </div>
            <div>
              <div className="text-sm uppercase tracking-[0.25em] text-cyan-200/60">
                Nandika’s
              </div>
              <div className="text-base font-medium">RL Dive Log</div>
            </div>
          </div>

          <div className="hidden items-center gap-3 md:flex">
            {[
              ["Surface", "#hero"],
              ["Notes", "#notes"],
              ["Projects", "#projects"],
              ["About", "#about"],
            ].map(([label, href]) => (
              <a
                key={label}
                href={href}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-cyan-50/80 backdrop-blur-md transition hover:bg-white/10"
              >
                {label}
              </a>
            ))}
          </div>
        </nav>

        <section
          id="hero"
          className="mx-auto flex min-h-screen max-w-7xl items-center px-6 pb-20 pt-8 lg:px-10"
        >
          <div className="max-w-3xl rounded-[2rem] border border-cyan-100/10 bg-slate-950/28 p-8 backdrop-blur-xl md:p-10">
            <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-cyan-200/20 bg-cyan-100/5 px-4 py-2 text-sm text-cyan-100/80 backdrop-blur-md">
              <Sparkles className="h-4 w-4" />
              Fully 3D underwater exploration site for my reinforcement learning journey
            </div>

            <h1 className="text-5xl font-semibold leading-[0.95] tracking-tight text-white md:text-7xl">
              I’m diving deeper
              <span className="block bg-gradient-to-r from-cyan-200 via-sky-300 to-violet-300 bg-clip-text text-transparent">
                into reinforcement learning
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-cyan-50/82 md:text-xl">
              Scroll through five underwater worlds — Sunlit Surface, Blue Descent,
              Coral Forest, Twilight Zone, and Abyssal Floor — while I upload lecture
              notes, experiments, and projects.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#notes"
                className="rounded-2xl border border-cyan-200/20 bg-cyan-300/15 px-6 py-3 text-sm font-medium text-cyan-50 backdrop-blur-md transition hover:scale-[1.02] hover:bg-cyan-300/20"
              >
                Explore the notes
              </a>
              <a
                href="#projects"
                className="rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-white/90 backdrop-blur-md transition hover:scale-[1.02] hover:bg-white/10"
              >
                View projects
              </a>
              <a
                href="https://github.com/"
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white/90 backdrop-blur-md transition hover:scale-[1.02] hover:bg-white/10"
              >
                <span className="flex items-center gap-2">
                  <Github className="h-4 w-4" />
                  GitHub
                </span>
              </a>
            </div>

            <div className="mt-10 flex flex-col gap-2 text-cyan-100/75">
              <span>Click anywhere to release a tiny bubble burst.</span>
              <span>Move your mouse to make the world drift with you.</span>
              <span>Scroll to descend into different underwater biomes.</span>
            </div>

            <a href="#notes" className="mt-8 inline-flex items-center gap-2 text-cyan-100/80">
              <ArrowDown className="h-5 w-5 animate-bounce" />
              Scroll to descend
            </a>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
          <div className="grid gap-4 md:grid-cols-5">
            {depthStages.map((stage) => (
              <div
                key={stage.label}
                className="rounded-3xl border border-white/10 bg-slate-950/28 p-5 backdrop-blur-xl"
              >
                <div className="text-sm uppercase tracking-[0.22em] text-cyan-200/60">
                  Depth zone
                </div>
                <div className="mt-2 text-lg font-medium text-cyan-100">
                  {stage.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="notes" className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
          <div className="rounded-[2rem] border border-cyan-100/10 bg-slate-950/30 p-8 backdrop-blur-xl md:p-10">
            <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.28em] text-cyan-200/70">
                  Dive log
                </p>
                <h2 className="mt-3 text-3xl font-semibold text-white md:text-4xl">
                  Lecture notes
                </h2>
              </div>

              <div className="flex gap-3">
                {tabs.map(({ key, label, Icon }) => (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key)}
                    className={`rounded-full border px-4 py-2 text-sm backdrop-blur-md transition ${
                      activeTab === key
                        ? "border-cyan-200/20 bg-cyan-300/15 text-cyan-50"
                        : "border-white/10 bg-white/5 text-cyan-50/70"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Icon className="h-4 w-4" />
                      {label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {activeTab === "notes" ? (
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                {notes.map((item) => (
                  <article
                    key={item.title}
                    className="group rounded-[2rem] border border-cyan-100/10 bg-white/5 p-6 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:bg-white/10"
                  >
                    <div className="mb-4 inline-flex rounded-full border border-cyan-100/10 bg-cyan-100/10 px-3 py-1 text-xs uppercase tracking-[0.18em] text-cyan-100/70">
                      {item.tag}
                    </div>
                    <h3 className="text-xl font-medium text-white">{item.title}</h3>
                    <p className="mt-3 leading-7 text-cyan-50/70">{item.blurb}</p>
                    <div className="mt-6 text-sm text-cyan-300 transition group-hover:translate-x-1">
                      Open notes →
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="grid gap-5 lg:grid-cols-2">
                {projects.slice(0, 2).map((project, idx) => (
                  <div
                    key={project.title}
                    className="rounded-[2rem] border border-white/10 bg-gradient-to-b from-white/8 to-white/[0.03] p-6 backdrop-blur-xl"
                  >
                    <div className="text-sm uppercase tracking-[0.22em] text-cyan-200/65">
                      0{idx + 1} • {project.type}
                    </div>
                    <h3 className="mt-3 text-2xl font-medium text-white">
                      {project.title}
                    </h3>
                    <p className="mt-4 leading-7 text-cyan-50/72">
                      {project.description}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        <section id="projects" className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
          <div className="rounded-[2rem] border border-cyan-100/10 bg-slate-950/30 p-8 backdrop-blur-xl md:p-10">
            <div className="mb-8">
              <p className="text-sm uppercase tracking-[0.28em] text-cyan-200/70">
                Treasure chest
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-white md:text-4xl">
                Projects from the ocean floor
              </h2>
            </div>

            <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-4">
              {projects.map((project, idx) => (
                <div
                  key={project.title}
                  className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-b from-white/8 to-white/[0.03] p-6 backdrop-blur-xl"
                >
                  <div className="absolute right-0 top-0 h-28 w-28 rounded-full bg-cyan-300/10 blur-3xl" />
                  <div className="relative z-10">
                    <div className="text-sm uppercase tracking-[0.22em] text-cyan-200/65">
                      0{idx + 1} • {project.type}
                    </div>
                    <h3 className="mt-3 text-2xl font-medium text-white">
                      {project.title}
                    </h3>
                    <p className="mt-4 leading-7 text-cyan-50/72">
                      {project.description}
                    </p>
                    <div className="mt-8 flex gap-3">
                      <button className="rounded-2xl border border-cyan-100/10 bg-cyan-100/10 px-4 py-3 text-sm text-cyan-50 transition hover:bg-cyan-100/15">
                        Demo
                      </button>
                      <button className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/90 transition hover:bg-white/10">
                        Code
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="about"
          className="mx-auto max-w-5xl px-6 py-20 text-center lg:px-10"
        >
          <div className="rounded-[2rem] border border-cyan-100/10 bg-slate-950/30 px-6 py-14 backdrop-blur-xl md:px-10">
            <p className="text-sm uppercase tracking-[0.28em] text-cyan-200/70">
              Mission
            </p>
            <h2 className="mt-4 text-3xl font-semibold text-white md:text-5xl">
              Reinforcement learning feels like deep sea diving.
            </h2>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-cyan-50/75">
              The deeper I go, the stranger and more beautiful the ecosystem becomes:
              rewards, policies, uncertainty, adaptation, exploration, and emergent
              behavior. This website is part notebook, part lab, and part story of
              descent.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <a
                href="https://github.com/"
                className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm text-white/90 backdrop-blur-md transition hover:bg-white/10"
              >
                <span className="flex items-center gap-2">
                  <Github className="h-4 w-4" />
                  Source code
                </span>
              </a>
              <a
                href="https://vercel.com/"
                className="rounded-2xl border border-cyan-200/20 bg-cyan-300/15 px-5 py-3 text-sm text-cyan-50 backdrop-blur-md transition hover:bg-cyan-300/20"
              >
                <span className="flex items-center gap-2">
                  <ExternalLink className="h-4 w-4" />
                  Live site
                </span>
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}