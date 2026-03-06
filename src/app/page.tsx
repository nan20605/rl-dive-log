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

  const shellDots = useMemo(
    () =>
      Array.from({ length: 46 }, (_, i) => ({
        id: i,
        left: `${4 + (i % 12) * 7.9}%`,
        top: `${8 + Math.floor(i / 12) * 20}%`,
        size: 3 + (i % 4),
        opacity: 0.12 + (i % 5) * 0.04,
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
      className="min-h-screen overflow-x-hidden bg-[#0b4c7a] text-white"
      onClick={spawnBurst}
    >
      <style>{`
        html {
          scroll-behavior: smooth;
        }

        body {
          background: #0b4c7a;
        }

        @keyframes mermaidFloat {
          0%   { transform: translate(0px, 0px) rotate(-2deg) scale(1); }
          18%  { transform: translate(78px, -18px) rotate(2deg) scale(1.01); }
          36%  { transform: translate(165px, 10px) rotate(5deg) scale(1.02); }
          56%  { transform: translate(98px, 48px) rotate(1deg) scale(1); }
          74%  { transform: translate(8px, 22px) rotate(-3deg) scale(0.995); }
          88%  { transform: translate(-34px, -8px) rotate(-5deg) scale(1); }
          100% { transform: translate(0px, 0px) rotate(-2deg) scale(1); }
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
            background:
              "linear-gradient(to bottom, #38c8ef 0%, #1ca8db 18%, #1279b1 40%, #0c5a8f 65%, #08395f 100%)",
          }}
        />

        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "url('/mermaid.jpg'), radial-gradient(circle at 84% 12%, rgba(255,255,255,0.26), transparent 24%)",
            backgroundSize: "cover, auto",
            backgroundPosition: "center top, center",
            backgroundRepeat: "no-repeat, no-repeat",
            opacity: 0.3,
            filter: "saturate(1.08) blur(1px)",
          }}
        />

        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.06),transparent_18%,transparent_70%,rgba(2,22,44,0.34))]" />

        <div className="absolute inset-0">
          <div
            className="absolute left-[-6%] top-[-1%] h-[54vh] w-[42vw] rounded-[48%]"
            style={{
              background:
                "linear-gradient(180deg, rgba(54,149,121,0.55), rgba(22,108,128,0.38) 44%, rgba(13,77,118,0.08) 100%)",
            }}
          />
          <div
            className="absolute left-[2%] top-[19%] h-[34vh] w-[28vw]"
            style={{
              background:
                "radial-gradient(circle at 38% 48%, rgba(16,105,130,0.38), rgba(8,57,93,0.08) 72%, transparent 78%)",
            }}
          />
          <div
            className="absolute right-[9%] top-[15%] h-[42vh] w-[24vw]"
            style={{
              background:
                "radial-gradient(circle at 50% 36%, rgba(183,255,214,0.22), rgba(116,200,155,0.12) 42%, rgba(16,85,108,0.02) 78%)",
            }}
          />
          <div
            className="absolute right-[6%] bottom-[14%] h-[20vh] w-[18vw]"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, rgba(8,92,134,0.38), rgba(4,40,71,0.08) 72%, transparent 78%)",
            }}
          />
          <div
            className="absolute left-[0%] bottom-[0%] h-[24vh] w-[34vw]"
            style={{
              background:
                "radial-gradient(circle at 52% 60%, rgba(8,79,123,0.42), rgba(4,36,67,0.14) 72%, transparent 82%)",
            }}
          />
        </div>

        <div className="absolute right-[11%] top-[15%] h-[42vh] w-[26vw]">
          <div className="absolute bottom-0 left-[28%] h-[74%] w-[14%] rounded-t-[18px] bg-[linear-gradient(to_top,rgba(143,215,171,0.74),rgba(231,255,235,0.42))]" />
          <div className="absolute bottom-0 left-[6%] h-[53%] w-[11%] rounded-t-[14px] bg-[linear-gradient(to_top,rgba(129,203,160,0.62),rgba(222,255,228,0.34))]" />
          <div className="absolute bottom-0 left-[49%] h-[61%] w-[11%] rounded-t-[14px] bg-[linear-gradient(to_top,rgba(133,207,163,0.62),rgba(227,255,234,0.34))]" />
          <div className="absolute bottom-0 left-[68%] h-[49%] w-[11%] rounded-t-[14px] bg-[linear-gradient(to_top,rgba(119,191,151,0.6),rgba(214,255,223,0.3))]" />
          <div className="absolute bottom-0 left-[82%] h-[40%] w-[9%] rounded-t-[12px] bg-[linear-gradient(to_top,rgba(119,191,151,0.52),rgba(214,255,223,0.22))]" />
          <div className="absolute left-[4%] right-[8%] bottom-[10%] h-[3px] bg-[rgba(224,255,231,0.22)]" />
          <div className="absolute left-[10%] right-[16%] bottom-[20%] h-[3px] bg-[rgba(224,255,231,0.18)]" />
          <div className="absolute left-[22%] right-[10%] bottom-[32%] h-[3px] bg-[rgba(224,255,231,0.15)]" />
          <div className="absolute left-[34%] right-[22%] bottom-[44%] h-[3px] bg-[rgba(224,255,231,0.12)]" />
        </div>

        <div className="absolute left-[3%] top-[19%] h-[35vh] w-[31vw]">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="absolute bottom-0 rounded-t-[100%]"
              style={{
                left: `${i * 11}%`,
                width: `${32 + (i % 3) * 12}px`,
                height: `${132 + (i % 4) * 28}px`,
                background:
                  i % 2 === 0
                    ? "linear-gradient(to top, rgba(37,128,98,0.56), rgba(77,189,137,0.25), transparent)"
                    : "linear-gradient(to top, rgba(23,109,108,0.54), rgba(70,179,156,0.2), transparent)",
              }}
            />
          ))}
        </div>

        <div className="absolute left-0 right-0 bottom-0 h-[31vh]">
          <div className="absolute left-[1%] bottom-[2%] h-[18vh] w-[35vw] rounded-[48%] bg-[radial-gradient(circle_at_52%_54%,rgba(8,95,145,0.46),rgba(4,39,74,0.16),transparent_72%)]" />
          <div className="absolute left-[28%] bottom-[0%] h-[16vh] w-[38vw] rounded-[48%] bg-[radial-gradient(circle_at_50%_56%,rgba(8,79,130,0.4),rgba(4,39,74,0.14),transparent_72%)]" />
          <div className="absolute right-[0%] bottom-[0%] h-[18vh] w-[31vw] rounded-[48%] bg-[radial-gradient(circle_at_48%_56%,rgba(8,79,130,0.42),rgba(4,39,74,0.14),transparent_72%)]" />
        </div>

        <div className="absolute left-[6%] bottom-[0%] h-[23vh] w-[34vw]">
          {Array.from({ length: 11 }).map((_, i) => (
            <div
              key={i}
              className="absolute bottom-0 rounded-t-[100%]"
              style={{
                left: `${i * 8.3}%`,
                width: `${22 + (i % 4) * 10}px`,
                height: `${92 + (i % 5) * 22}px`,
                background:
                  i % 3 === 0
                    ? "linear-gradient(to top, rgba(79,202,149,0.66), rgba(132,250,191,0.22), transparent)"
                    : i % 3 === 1
                    ? "linear-gradient(to top, rgba(44,171,118,0.58), rgba(114,242,173,0.18), transparent)"
                    : "linear-gradient(to top, rgba(23,118,104,0.58), rgba(96,209,189,0.18), transparent)",
              }}
            />
          ))}
        </div>

        <div className="absolute right-[0%] bottom-[0%] h-[22vh] w-[28vw]">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="absolute bottom-0 rounded-t-[100%]"
              style={{
                left: `${i * 11}%`,
                width: `${18 + (i % 3) * 9}px`,
                height: `${72 + (i % 4) * 20}px`,
                background:
                  i % 2 === 0
                    ? "linear-gradient(to top, rgba(103,27,66,0.66), rgba(163,48,105,0.2), transparent)"
                    : "linear-gradient(to top, rgba(75,15,48,0.62), rgba(125,36,86,0.22), transparent)",
              }}
            />
          ))}
        </div>

        {shellDots.map((dot) => (
          <span
            key={dot.id}
            className="absolute rounded-full bg-white"
            style={{
              left: dot.left,
              top: dot.top,
              width: dot.size,
              height: dot.size,
              opacity: dot.opacity,
              animation: "shimmer 5.5s ease-in-out infinite",
              animationDelay: `${(dot.id % 7) * 0.4}s`,
            }}
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

          <div className="mx-auto mt-10 grid max-w-7xl items-center gap-8 lg:grid-cols-[1.02fr_0.98fr]">
            <div className="relative z-20 max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white/90 backdrop-blur-md">
                <Sparkles className="h-4 w-4" />
                underwater journal for my reinforcement learning journey
              </div>

              <h1 className="mt-6 text-5xl font-semibold leading-[0.95] tracking-tight text-white md:text-7xl">
                Diving deeper
                <span className="block text-white/96">into reinforcement learning</span>
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/86 md:text-xl">
                Lecture notes, visual experiments, and projects gathered like
                treasures in a glowing underwater world.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
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

            <div className="relative h-[680px]">
              <div
                className="absolute left-[4%] top-[0%] w-[560px] max-w-[96%]"
                style={{ animation: "mermaidFloat 16s ease-in-out infinite" }}
              >
                <div
                  className="relative h-[660px] w-full"
                  style={{
                    filter: "drop-shadow(0 24px 34px rgba(6,24,48,0.22))",
                  }}
                >
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage: "url('/mermaid.jpg')",
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "900px auto",
                      backgroundPosition: "50% 64%",
                      clipPath:
                        "polygon(26% 19%, 31% 14%, 39% 12%, 51% 11%, 59% 13%, 67% 17%, 75% 25%, 85% 37%, 94% 49%, 99% 59%, 96% 67%, 88% 70%, 76% 70%, 69% 72%, 64% 82%, 59% 91%, 51% 99%, 42% 99%, 34% 93%, 27% 82%, 21% 72%, 13% 63%, 7% 55%, 2% 46%, 3% 39%, 9% 31%, 16% 24%)",
                    }}
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "radial-gradient(circle at 50% 66%, rgba(235,255,221,0.3), rgba(255,255,255,0.05) 28%, transparent 50%)",
                      mixBlendMode: "screen",
                      clipPath:
                        "polygon(30% 35%, 38% 30%, 48% 29%, 58% 31%, 66% 37%, 69% 46%, 67% 58%, 63% 71%, 57% 83%, 49% 94%, 40% 92%, 34% 84%, 30% 70%, 27% 54%)",
                    }}
                  />
                </div>
              </div>
            </div>
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