"use client";

import React, { useMemo, useState } from "react";
import {
  ArrowDown,
  BookOpen,
  ExternalLink,
  FolderOpen,
  Github,
  Sparkles,
} from "lucide-react";

type TabKey = "notes" | "projects";
type BubbleBurst = { id: number; x: number; y: number };

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
    description:
      "An agent learns to move through shifting underwater currents.",
  },
  {
    title: "Coral Policy Garden",
    type: "Policy Visualization",
    description:
      "Policies grow like glowing coral branches as training improves.",
  },
  {
    title: "Deep Sea Treasure Hunt",
    type: "Gridworld Project",
    description:
      "Rewards, hazards, and trajectories visualized on the ocean floor.",
  },
  {
    title: "Jellyfish Explorer",
    type: "Exploration Demo",
    description:
      "A soft, beautiful visualization of epsilon-greedy exploration.",
  },
];

export default function Page() {
  const [activeTab, setActiveTab] = useState<TabKey>("notes");
  const [bursts, setBursts] = useState<BubbleBurst[]>([]);

  const ambientBubbles = useMemo(
    () =>
      Array.from({ length: 42 }, (_, i) => ({
        id: i,
        left: `${3 + (i % 12) * 8.1}%`,
        startY: 8 + (i % 5) * 16,
        size: 10 + (i % 5) * 7,
        duration: 10 + (i % 4) * 2.4,
        delay: (i % 9) * 0.65,
        drift: -20 + (i % 7) * 8,
        opacity: 0.18 + (i % 4) * 0.08,
      })),
    []
  );

  function spawnBurst(e: React.MouseEvent<HTMLDivElement>) {
    const id = Date.now() + Math.random();
    setBursts((prev) => [...prev, { id, x: e.clientX, y: e.clientY }]);
    window.setTimeout(() => {
      setBursts((prev) => prev.filter((b) => b.id !== id));
    }, 1900);
  }

  return (
    <div
      className="min-h-screen overflow-x-hidden text-white"
      onClick={spawnBurst}
    >
      <style>{`
        html {
          scroll-behavior: smooth;
        }

        body {
          background: transparent;
        }

        @keyframes riseBubble3D {
          0% {
            transform: translate3d(0px, 40px, 0px) scale(0.7);
            opacity: 0;
          }
          12% {
            opacity: 1;
          }
          30% {
            transform: translate3d(calc(var(--drift) * 0.25), -22vh, 0px) scale(0.9);
          }
          60% {
            transform: translate3d(calc(var(--drift) * 0.7), -62vh, 0px) scale(1.03);
          }
          100% {
            transform: translate3d(var(--drift), -118vh, 0px) scale(1.16);
            opacity: 0;
          }
        }

        @keyframes bubbleBurst {
          0% {
            transform: translate(-50%, -50%) translate(0px, 0px) scale(0.32);
            opacity: 0.95;
          }
          100% {
            transform: translate(-50%, -50%) translate(var(--dx), var(--dy)) scale(1.35);
            opacity: 0;
          }
        }

        @keyframes bubbleRing {
          0% {
            transform: translate(-50%, -50%) scale(0.15);
            opacity: 0.8;
          }
          100% {
            transform: translate(-50%, -50%) scale(2.35);
            opacity: 0;
          }
        }

        @keyframes shimmer {
          0%, 100% { opacity: 0.72; }
          50% { opacity: 1; }
        }
      `}</style>

      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/underwater castle.png')",
            backgroundSize: "cover",
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
          }}
        />

        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.06),transparent_16%,transparent_68%,rgba(2,22,44,0.42))]" />

        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 82% 14%, rgba(255,255,255,0.18), transparent 24%), radial-gradient(circle at 72% 10%, rgba(215,255,248,0.14), transparent 20%), radial-gradient(circle at 18% 18%, rgba(29,79,138,0.16), transparent 20%)",
          }}
        />

        {ambientBubbles.map((b) => (
          <span
            key={b.id}
            className="absolute rounded-full border border-white/45"
            style={
              {
                left: b.left,
                bottom: `-${b.startY}px`,
                width: `${b.size}px`,
                height: `${b.size}px`,
                opacity: b.opacity,
                "--drift": `${b.drift}px`,
                animation: `riseBubble3D ${b.duration}s linear infinite`,
                animationDelay: `${b.delay}s`,
                background:
                  "radial-gradient(circle at 30% 28%, rgba(255,255,255,0.36), rgba(255,255,255,0.12) 52%, rgba(255,255,255,0.03) 100%)",
                boxShadow:
                  "inset 0 0 18px rgba(255,255,255,0.24), 0 0 22px rgba(178,234,255,0.28)",
                backdropFilter: "blur(1px)",
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      {bursts.map((burst) => (
        <div key={burst.id} className="pointer-events-none fixed inset-0 z-[80]">
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (Math.PI * 2 * i) / 12;
            const radius = 46 + (i % 4) * 18;
            const dx = `${Math.cos(angle) * radius}px`;
            const dy = `${Math.sin(angle) * radius - 34}px`;

            return (
              <span
                key={i}
                className="absolute rounded-full border border-white/60"
                style={
                  {
                    left: burst.x,
                    top: burst.y,
                    width: `${22 + (i % 4) * 10}px`,
                    height: `${22 + (i % 4) * 10}px`,
                    "--dx": dx,
                    "--dy": dy,
                    background:
                      "radial-gradient(circle at 30% 28%, rgba(255,255,255,0.35), rgba(255,255,255,0.12) 52%, rgba(255,255,255,0.03) 100%)",
                    boxShadow:
                      "inset 0 0 18px rgba(255,255,255,0.26), 0 0 34px rgba(175,232,255,0.48)",
                    animation: "bubbleBurst 1.8s ease-out forwards",
                  } as React.CSSProperties
                }
              />
            );
          })}
          <span
            className="absolute h-14 w-14 rounded-full border border-white/65 bg-white/5"
            style={{
              left: burst.x,
              top: burst.y,
              boxShadow: "0 0 26px rgba(180,235,255,0.34)",
              animation: "bubbleRing 1.25s ease-out forwards",
            }}
          />
        </div>
      ))}

      <main className="relative z-10">
        <section id="hero" className="min-h-screen px-6 pt-8 pb-20 lg:px-10">
          <nav className="mx-auto flex max-w-7xl items-center justify-between">
            <div className="rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-md">
              <span className="text-sm tracking-[0.22em] text-white/92">
                RL DIVE LOG
              </span>
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
                  className="rounded-full border border-white/15 bg-white/8 px-4 py-2 text-sm text-white/85 backdrop-blur-md transition hover:bg-white/12"
                >
                  {label}
                </a>
              ))}
            </div>
          </nav>

          <div className="mx-auto mt-16 max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white/90 backdrop-blur-md">
              <Sparkles className="h-4 w-4" />
              underwater journal for my reinforcement learning journey
            </div>

            <h1 className="mt-6 text-5xl font-semibold leading-[0.95] tracking-tight text-white md:text-7xl">
              Diving deeper
              <span className="block text-white/96">into reinforcement learning</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/86 md:text-xl">
              Lecture notes, visual experiments, and projects gathered like
              treasures in a glowing underwater world.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <a
                href="#notes"
                className="rounded-full border border-white/20 bg-white/14 px-6 py-3 text-sm font-medium text-white backdrop-blur-md transition hover:bg-white/18"
              >
                Explore notes
              </a>
              <a
                href="#projects"
                className="rounded-full border border-white/20 bg-[#79d6d1]/20 px-6 py-3 text-sm font-medium text-white backdrop-blur-md transition hover:bg-[#79d6d1]/28"
              >
                View projects
              </a>
              <a
                href="https://github.com/"
                className="rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm font-medium text-white backdrop-blur-md transition hover:bg-white/15"
              >
                <span className="flex items-center gap-2">
                  <Github className="h-4 w-4" />
                  GitHub
                </span>
              </a>
            </div>

            <a
              href="#notes"
              className="mt-10 inline-flex items-center gap-2 text-white/84"
            >
              <ArrowDown className="h-5 w-5 animate-bounce" />
              Scroll to descend
            </a>
          </div>
        </section>

        <section className="px-6 pb-8 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-4 md:grid-cols-3">
              {[
                [
                  "Underwater notes",
                  "Lecture notes collected like pages drifting through the sea.",
                ],
                [
                  "Glowing experiments",
                  "Visual RL ideas, intuitive demos, and concept explorations.",
                ],
                [
                  "Project reef",
                  "A curated collection of builds from deeper and deeper dives.",
                ],
              ].map(([title, text]) => (
                <div
                  key={title}
                  className="rounded-[48px] border border-white/14 bg-white/8 p-6 backdrop-blur-xl"
                >
                  <h3 className="text-xl font-medium text-white">{title}</h3>
                  <p className="mt-2 leading-7 text-white/75">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="notes" className="px-6 py-14 lg:px-10">
          <div className="mx-auto max-w-7xl rounded-[56px] border border-white/14 bg-white/8 p-8 backdrop-blur-xl md:p-10">
            <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.28em] text-white/70">
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
                        ? "border-white/25 bg-white/18 text-white"
                        : "border-white/15 bg-white/8 text-white/72"
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
                    className="rounded-[40px] border border-white/14 bg-white/8 p-6 backdrop-blur-xl transition hover:bg-white/12"
                  >
                    <div className="mb-4 inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.18em] text-white/76">
                      {item.tag}
                    </div>
                    <h3 className="text-xl font-medium text-white">{item.title}</h3>
                    <p className="mt-3 leading-7 text-white/72">{item.blurb}</p>
                    <div className="mt-6 text-sm text-white/88">Open notes →</div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="grid gap-5 lg:grid-cols-2">
                {projects.slice(0, 2).map((project, idx) => (
                  <div
                    key={project.title}
                    className="rounded-[40px] border border-white/14 bg-white/8 p-6 backdrop-blur-xl"
                  >
                    <div className="text-sm uppercase tracking-[0.22em] text-white/68">
                      0{idx + 1} • {project.type}
                    </div>
                    <h3 className="mt-3 text-2xl font-medium text-white">
                      {project.title}
                    </h3>
                    <p className="mt-4 leading-7 text-white/72">
                      {project.description}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        <section id="projects" className="px-6 py-6 lg:px-10">
          <div className="mx-auto max-w-7xl rounded-[56px] border border-white/14 bg-white/8 p-8 backdrop-blur-xl md:p-10">
            <div className="mb-8">
              <p className="text-sm uppercase tracking-[0.28em] text-white/70">
                Treasure chest
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-white md:text-4xl">
                Projects from the reef
              </h2>
            </div>

            <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-4">
              {projects.map((project, idx) => (
                <div
                  key={project.title}
                  className="rounded-[40px] border border-white/14 bg-white/8 p-6 backdrop-blur-xl"
                >
                  <div className="text-sm uppercase tracking-[0.22em] text-white/68">
                    0{idx + 1} • {project.type}
                  </div>
                  <h3 className="mt-3 text-2xl font-medium text-white">
                    {project.title}
                  </h3>
                  <p className="mt-4 leading-7 text-white/72">
                    {project.description}
                  </p>
                  <div className="mt-8 flex gap-3">
                    <button className="rounded-full border border-white/18 bg-white/12 px-4 py-3 text-sm text-white transition hover:bg-white/18">
                      Demo
                    </button>
                    <button className="rounded-full border border-white/18 bg-white/10 px-4 py-3 text-sm text-white transition hover:bg-white/16">
                      Code
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="px-6 py-20 lg:px-10">
          <div className="mx-auto max-w-5xl rounded-[58px] border border-white/14 bg-white/8 px-6 py-14 text-center backdrop-blur-xl md:px-10">
            <p className="text-sm uppercase tracking-[0.28em] text-white/70">
              Mission
            </p>
            <h2 className="mt-4 text-3xl font-semibold text-white md:text-5xl">
              Reinforcement learning feels like underwater exploration.
            </h2>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-white/75">
              The deeper I go, the stranger and more beautiful the ecosystem
              becomes: rewards, policies, uncertainty, adaptation, exploration,
              and emergent behavior.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <a
                href="https://github.com/"
                className="rounded-full border border-white/18 bg-white/10 px-5 py-3 text-sm text-white backdrop-blur-md transition hover:bg-white/16"
              >
                <span className="flex items-center gap-2">
                  <Github className="h-4 w-4" />
                  Source code
                </span>
              </a>
              <a
                href="https://vercel.com/"
                className="rounded-full border border-white/18 bg-white/12 px-5 py-3 text-sm text-white backdrop-blur-md transition hover:bg-white/18"
              >
                <span className="flex items-center gap-2">
                  <ExternalLink className="h-4 w-4" />
                  Live site
                </span>
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}