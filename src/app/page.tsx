"use client";

import React, { useEffect, useMemo, useState } from "react";
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
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const ambientBubbles = useMemo(
    () =>
      Array.from({ length: 26 }, (_, i) => ({
        id: i,
        left: `${4 + i * 3.6}%`,
        size: 10 + (i % 5) * 7,
        duration: 8 + (i % 4) * 2,
        delay: (i % 7) * 0.7,
        opacity: 0.15 + (i % 4) * 0.08,
      })),
    []
  );

  function spawnBurst(e: React.MouseEvent<HTMLDivElement>) {
    const id = Date.now() + Math.random();
    setBursts((prev) => [...prev, { id, x: e.clientX, y: e.clientY }]);
    window.setTimeout(() => {
      setBursts((prev) => prev.filter((b) => b.id !== id));
    }, 1700);
  }

  return (
    <div
      className="min-h-screen overflow-x-hidden bg-[#0b4f86] text-white"
      onClick={spawnBurst}
    >
      <style>{`
        html {
          scroll-behavior: smooth;
        }

        body {
          background: #0b4f86;
        }

        @keyframes driftSlow {
          0%, 100% { transform: translate3d(0px, 0px, 0px); }
          50% { transform: translate3d(0px, -16px, 0px); }
        }

        @keyframes driftSide {
          0%, 100% { transform: translate3d(0px, 0px, 0px); }
          50% { transform: translate3d(18px, -12px, 0px); }
        }

        @keyframes sway {
          0%, 100% { transform: rotate(0deg) translateY(0px); }
          50% { transform: rotate(2deg) translateY(-6px); }
        }

        @keyframes riseBubble {
          0% { transform: translateY(80px) scale(0.8); opacity: 0; }
          15% { opacity: 1; }
          100% { transform: translateY(-120vh) scale(1.1); opacity: 0; }
        }

        @keyframes mermaidFloat {
          0%   { transform: translate(0px, 0px) rotate(-3deg); }
          20%  { transform: translate(90px, -24px) rotate(2deg); }
          40%  { transform: translate(180px, 8px) rotate(5deg); }
          60%  { transform: translate(80px, 40px) rotate(1deg); }
          80%  { transform: translate(-20px, 10px) rotate(-4deg); }
          100% { transform: translate(0px, 0px) rotate(-3deg); }
        }

        @keyframes tailWave {
          0%, 100% { transform: rotate(8deg); }
          50% { transform: rotate(-12deg); }
        }

        @keyframes hairFlow {
          0%, 100% { transform: rotate(-2deg) scaleX(1); }
          50% { transform: rotate(4deg) scaleX(1.03); }
        }

        @keyframes glowPulse {
          0%, 100% { opacity: 0.45; }
          50% { opacity: 0.9; }
        }

        @keyframes palaceGlow {
          0%, 100% { opacity: 0.24; filter: blur(0px); }
          50% { opacity: 0.38; filter: blur(1px); }
        }

        @keyframes bubbleBurst {
          0% {
            transform: translate(-50%, -50%) translate(0px, 0px) scale(0.35);
            opacity: 0.9;
          }
          100% {
            transform: translate(-50%, -50%) translate(var(--dx), var(--dy)) scale(1.25);
            opacity: 0;
          }
        }

        @keyframes bubbleRing {
          0% {
            transform: translate(-50%, -50%) scale(0.2);
            opacity: 0.75;
          }
          100% {
            transform: translate(-50%, -50%) scale(2.2);
            opacity: 0;
          }
        }
      `}</style>

      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, #2cc2ef 0%, #1aa6dc 18%, #0c6ea6 42%, #0a5488 68%, #083b67 100%)",
          }}
        />

        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 82% 10%, rgba(232,255,255,0.55), transparent 25%), radial-gradient(circle at 72% 24%, rgba(224,255,240,0.22), transparent 18%), radial-gradient(circle at 22% 18%, rgba(28,89,150,0.24), transparent 24%), radial-gradient(circle at 20% 56%, rgba(21,77,130,0.28), transparent 32%)",
          }}
        />

        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.08),transparent_20%,transparent_70%,rgba(4,27,48,0.25))]" />

        <div
          className="absolute -left-[8%] top-[-3%] h-[52vh] w-[44vw] rounded-[48%]"
          style={{
            background:
              "linear-gradient(180deg, rgba(72,145,119,0.58), rgba(32,108,125,0.42) 40%, rgba(11,76,120,0.15) 100%)",
            filter: "blur(0.5px)",
            transform: `translate(${mouse.x * -12}px, ${mouse.y * -8}px) rotate(-6deg)`,
          }}
        >
          <div className="absolute left-[8%] top-[7%] h-[75%] w-[55%] rounded-[45%] bg-[linear-gradient(180deg,rgba(48,120,91,0.45),rgba(11,69,100,0.05))]" />
          <div className="absolute right-[14%] top-[10%] h-[65%] w-[28%] rounded-[45%] bg-[linear-gradient(180deg,rgba(63,156,116,0.38),rgba(11,69,100,0.05))]" />
        </div>

        <div
          className="absolute left-[3%] top-[18%] h-[34vh] w-[30vw]"
          style={{
            transform: `translate(${mouse.x * -8}px, ${mouse.y * -5}px)`,
          }}
        >
          {Array.from({ length: 7 }).map((_, i) => (
            <div
              key={i}
              className="absolute bottom-0 rounded-t-[100%]"
              style={{
                left: `${i * 12}%`,
                width: `${30 + (i % 3) * 14}px`,
                height: `${140 + (i % 4) * 28}px`,
                background:
                  i % 2 === 0
                    ? "linear-gradient(to top, rgba(30,125,95,0.55), rgba(71,188,131,0.3), transparent)"
                    : "linear-gradient(to top, rgba(24,103,104,0.5), rgba(65,174,153,0.25), transparent)",
                filter: "blur(0.4px)",
                animation: `sway ${4 + i * 0.35}s ease-in-out infinite`,
                animationDelay: `${i * 0.18}s`,
              }}
            />
          ))}
        </div>

        <div
          className="absolute right-[10%] top-[16%] h-[40vh] w-[24vw]"
          style={{
            transform: `translate(${mouse.x * 10}px, ${mouse.y * -6}px)`,
          }}
        >
          <div className="absolute bottom-0 left-[30%] h-[72%] w-[14%] rounded-t-[16px] bg-[linear-gradient(to_top,rgba(137,216,170,0.62),rgba(202,255,219,0.45))] shadow-[0_0_24px_rgba(220,255,230,0.18)] animate-[palaceGlow_4s_ease-in-out_infinite]" />
          <div className="absolute bottom-0 left-[7%] h-[52%] w-[12%] rounded-t-[14px] bg-[linear-gradient(to_top,rgba(114,195,150,0.58),rgba(203,255,214,0.38))] animate-[palaceGlow_5s_ease-in-out_infinite]" />
          <div className="absolute bottom-0 left-[52%] h-[60%] w-[12%] rounded-t-[14px] bg-[linear-gradient(to_top,rgba(126,203,159,0.58),rgba(212,255,230,0.4))] animate-[palaceGlow_4.5s_ease-in-out_infinite]" />
          <div className="absolute bottom-0 left-[71%] h-[48%] w-[11%] rounded-t-[14px] bg-[linear-gradient(to_top,rgba(110,188,150,0.52),rgba(205,255,220,0.32))] animate-[palaceGlow_5.5s_ease-in-out_infinite]" />
          <div className="absolute left-[4%] right-[8%] bottom-[8%] h-[3px] bg-[rgba(202,255,221,0.26)]" />
          <div className="absolute left-[8%] right-[16%] bottom-[18%] h-[3px] bg-[rgba(202,255,221,0.2)]" />
          <div className="absolute left-[20%] right-[10%] bottom-[30%] h-[3px] bg-[rgba(202,255,221,0.18)]" />
          <div className="absolute left-[34%] right-[22%] bottom-[42%] h-[3px] bg-[rgba(202,255,221,0.14)]" />
        </div>

        <div
          className="absolute left-0 right-0 bottom-0 h-[32vh]"
          style={{
            transform: `translate(${mouse.x * 12}px, ${mouse.y * 6}px)`,
            background:
              "linear-gradient(to top, rgba(5,34,61,0.5), rgba(5,34,61,0.15), transparent)",
          }}
        >
          <div className="absolute left-[3%] bottom-[4%] h-[14vh] w-[28vw] rounded-[46%] bg-[radial-gradient(circle_at_50%_50%,rgba(9,96,149,0.42),rgba(4,39,74,0.22),transparent_70%)]" />
          <div className="absolute right-[2%] bottom-[0%] h-[18vh] w-[30vw] rounded-[46%] bg-[radial-gradient(circle_at_50%_50%,rgba(7,83,132,0.38),rgba(4,39,74,0.2),transparent_70%)]" />
          <div className="absolute left-[32%] bottom-[2%] h-[16vh] w-[36vw] rounded-[46%] bg-[radial-gradient(circle_at_50%_50%,rgba(7,76,126,0.35),rgba(4,39,74,0.18),transparent_70%)]" />
        </div>

        <div
          className="absolute left-[6%] bottom-[0%] h-[22vh] w-[34vw]"
          style={{ transform: `translate(${mouse.x * 16}px, ${mouse.y * 8}px)` }}
        >
          {Array.from({ length: 11 }).map((_, i) => (
            <div
              key={i}
              className="absolute bottom-0 rounded-t-[100%]"
              style={{
                left: `${i * 8}%`,
                width: `${22 + (i % 4) * 10}px`,
                height: `${90 + (i % 5) * 22}px`,
                background:
                  i % 3 === 0
                    ? "linear-gradient(to top, rgba(76,199,145,0.6), rgba(122,250,184,0.26), transparent)"
                    : i % 3 === 1
                    ? "linear-gradient(to top, rgba(49,174,121,0.54), rgba(112,240,172,0.2), transparent)"
                    : "linear-gradient(to top, rgba(29,124,104,0.56), rgba(93,207,190,0.18), transparent)",
                animation: `sway ${4.6 + i * 0.25}s ease-in-out infinite`,
                animationDelay: `${i * 0.12}s`,
              }}
            />
          ))}
        </div>

        <div
          className="absolute right-[0%] bottom-[0%] h-[22vh] w-[28vw]"
          style={{ transform: `translate(${mouse.x * 18}px, ${mouse.y * 7}px)` }}
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="absolute bottom-0 rounded-t-[100%]"
              style={{
                left: `${i * 11}%`,
                width: `${18 + (i % 3) * 9}px`,
                height: `${70 + (i % 4) * 20}px`,
                background:
                  i % 2 === 0
                    ? "linear-gradient(to top, rgba(104,24,66,0.56), rgba(154,46,103,0.2), transparent)"
                    : "linear-gradient(to top, rgba(70,15,47,0.54), rgba(122,35,84,0.22), transparent)",
                animation: `sway ${4.8 + i * 0.28}s ease-in-out infinite`,
                animationDelay: `${i * 0.18}s`,
              }}
            />
          ))}
        </div>

        {ambientBubbles.map((b) => (
          <span
            key={b.id}
            className="absolute bottom-[-60px] rounded-full border border-white/35 bg-white/10 backdrop-blur-sm"
            style={{
              left: b.left,
              width: b.size,
              height: b.size,
              opacity: b.opacity,
              animation: `riseBubble ${b.duration}s linear infinite`,
              animationDelay: `${b.delay}s`,
              boxShadow: "inset 0 0 8px rgba(255,255,255,0.22), 0 0 16px rgba(180,235,255,0.2)",
            }}
          />
        ))}
      </div>

      {bursts.map((burst) => (
        <div key={burst.id} className="pointer-events-none fixed inset-0 z-[70]">
          {Array.from({ length: 11 }).map((_, i) => {
            const angle = (Math.PI * 2 * i) / 11;
            const radius = 38 + (i % 4) * 18;
            const dx = `${Math.cos(angle) * radius}px`;
            const dy = `${Math.sin(angle) * radius - 34}px`;

            return (
              <span
                key={i}
                className="absolute rounded-full border border-white/60 bg-white/12 backdrop-blur-sm"
                style={
                  {
                    left: burst.x,
                    top: burst.y,
                    width: `${16 + (i % 3) * 7}px`,
                    height: `${16 + (i % 3) * 7}px`,
                    "--dx": dx,
                    "--dy": dy,
                    animation: "bubbleBurst 1.5s ease-out forwards",
                    boxShadow:
                      "inset 0 0 12px rgba(255,255,255,0.24), 0 0 24px rgba(171,230,255,0.42)",
                  } as React.CSSProperties
                }
              />
            );
          })}
          <span
            className="absolute h-10 w-10 rounded-full border border-white/65 bg-white/10"
            style={{
              left: burst.x,
              top: burst.y,
              animation: "bubbleRing 1.2s ease-out forwards",
              boxShadow: "0 0 24px rgba(180,235,255,0.34)",
            }}
          />
        </div>
      ))}

      <main className="relative z-10">
        <section
          id="hero"
          className="relative min-h-screen px-6 pt-8 pb-20 lg:px-10"
        >
          <nav className="mx-auto flex max-w-7xl items-center justify-between">
            <div className="rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-md">
              <span className="text-sm tracking-[0.22em] text-white/90">
                RL DIVE LOG
              </span>
            </div>

            <div className="hidden md:flex items-center gap-3">
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

          <div className="mx-auto mt-10 grid max-w-7xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="relative z-20 max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white/90 backdrop-blur-md">
                <Sparkles className="h-4 w-4" />
                underwater journal for my reinforcement learning journey
              </div>

              <h1 className="mt-6 text-5xl font-semibold leading-[0.95] tracking-tight text-white md:text-7xl">
                Diving deeper
                <span className="block text-white/95">into reinforcement learning</span>
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
                className="mt-10 inline-flex items-center gap-2 text-white/85"
              >
                <ArrowDown className="h-5 w-5 animate-bounce" />
                Scroll to descend
              </a>
            </div>

            <div className="relative h-[620px]">
              <div
                className="absolute inset-0"
                style={{
                  transform: `translate(${mouse.x * 10}px, ${mouse.y * 8}px)`,
                }}
              >
                <div
                  className="absolute left-[18%] top-[8%] h-[440px] w-[320px]"
                  style={{ animation: "mermaidFloat 16s ease-in-out infinite" }}
                >
                  <div
                    className="absolute left-[60px] top-[40px] h-[150px] w-[210px] rounded-[56%_44%_52%_48%/58%_50%_50%_42%]"
                    style={{
                      background:
                        "linear-gradient(180deg, #ff8f6f 0%, #ff654d 48%, #f24e39 100%)",
                      boxShadow:
                        "0 20px 40px rgba(255,87,64,0.16), inset -20px -12px 18px rgba(201,54,38,0.18)",
                      animation: "hairFlow 4.5s ease-in-out infinite",
                    }}
                  />
                  <div
                    className="absolute left-[170px] top-[86px] h-[135px] w-[145px] rounded-[45%_55%_60%_40%/46%_48%_52%_54%]"
                    style={{
                      background:
                        "linear-gradient(180deg, #ff7f60 0%, #f15742 100%)",
                      transform: "rotate(16deg)",
                      animation: "hairFlow 5.2s ease-in-out infinite",
                    }}
                  />
                  <div
                    className="absolute left-[116px] top-[78px] h-[98px] w-[76px] rounded-full bg-[#ffe0cf]"
                    style={{
                      boxShadow: "inset -8px -6px 10px rgba(233,182,160,0.35)",
                    }}
                  />
                  <div className="absolute left-[138px] top-[106px] h-[7px] w-[7px] rounded-full bg-[#1a2a42]" />
                  <div className="absolute left-[171px] top-[106px] h-[7px] w-[7px] rounded-full bg-[#1a2a42]" />
                  <div className="absolute left-[150px] top-[128px] h-[2px] w-[24px] rounded-full bg-[#d88f80]" />
                  <div className="absolute left-[145px] top-[138px] h-[11px] w-[20px] rounded-b-full border-b border-[#c96b60]" />

                  <div
                    className="absolute left-[112px] top-[166px] h-[108px] w-[86px] rounded-[45%_45%_42%_42%/36%_36%_64%_64%] bg-[#ffe0cf]"
                    style={{
                      boxShadow: "inset -8px -10px 10px rgba(225,176,158,0.35)",
                    }}
                  />
                  <div className="absolute left-[123px] top-[164px] h-[30px] w-[28px] rounded-[40%_60%_45%_55%] bg-[#8f75d7]" />
                  <div className="absolute left-[160px] top-[164px] h-[30px] w-[28px] rounded-[60%_40%_55%_45%] bg-[#8f75d7]" />

                  <div
                    className="absolute left-[80px] top-[196px] h-[88px] w-[26px] rounded-full bg-[#ffe0cf]"
                    style={{ transform: "rotate(26deg)" }}
                  />
                  <div
                    className="absolute left-[197px] top-[208px] h-[84px] w-[24px] rounded-full bg-[#ffe0cf]"
                    style={{ transform: "rotate(-28deg)" }}
                  />

                  <div
                    className="absolute left-[115px] top-[248px] h-[214px] w-[112px] rounded-[44%_44%_50%_50%/18%_18%_82%_82%]"
                    style={{
                      background:
                        "linear-gradient(180deg, #88f0dc 0%, #66d8c7 28%, #50c6b8 52%, #69def0 100%)",
                      boxShadow:
                        "0 18px 34px rgba(95,233,220,0.12), inset 0 0 0 1px rgba(255,255,255,0.16)",
                    }}
                  />

                  <div
                    className="absolute left-[132px] top-[274px] h-[152px] w-[75px] rounded-[48%]"
                    style={{
                      background:
                        "radial-gradient(circle, rgba(255,255,214,0.96) 0%, rgba(245,255,201,0.92) 16%, rgba(186,255,220,0.8) 34%, rgba(255,255,255,0) 62%)",
                      mixBlendMode: "screen",
                      filter: "blur(0.2px)",
                    }}
                  />

                  <div
                    className="absolute left-[84px] top-[410px] h-[95px] w-[92px] rounded-[0_100%_100%_100%]"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(220,245,255,0.96), rgba(139,222,243,0.78))",
                      border: "1px solid rgba(255,255,255,0.34)",
                      transform: "rotate(-26deg)",
                      boxShadow: "0 0 24px rgba(196,242,255,0.22)",
                      animation: "tailWave 2.6s ease-in-out infinite",
                    }}
                  />
                  <div
                    className="absolute left-[174px] top-[414px] h-[98px] w-[96px] rounded-[100%_0_100%_100%]"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(220,245,255,0.96), rgba(139,222,243,0.78))",
                      border: "1px solid rgba(255,255,255,0.34)",
                      transform: "rotate(24deg)",
                      boxShadow: "0 0 24px rgba(196,242,255,0.22)",
                      animation: "tailWave 2.8s ease-in-out infinite",
                    }}
                  />

                  <div
                    className="absolute left-[90px] top-[420px] h-[70px] w-[175px]"
                    style={{
                      background:
                        "radial-gradient(circle, rgba(227,250,255,0.62), rgba(183,240,255,0.16), transparent 70%)",
                      filter: "blur(8px)",
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
                  className="rounded-[34px] border border-white/15 bg-white/8 p-6 backdrop-blur-xl"
                >
                  <h3 className="text-xl font-medium text-white">{title}</h3>
                  <p className="mt-2 leading-7 text-white/75">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="notes" className="px-6 py-14 lg:px-10">
          <div className="mx-auto max-w-7xl rounded-[40px] border border-white/15 bg-white/8 p-8 backdrop-blur-xl md:p-10">
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
                    className="rounded-[30px] border border-white/15 bg-white/8 p-6 backdrop-blur-xl transition hover:bg-white/12"
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
                    className="rounded-[30px] border border-white/15 bg-white/8 p-6 backdrop-blur-xl"
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
          <div className="mx-auto max-w-7xl rounded-[40px] border border-white/15 bg-white/8 p-8 backdrop-blur-xl md:p-10">
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
                  className="rounded-[30px] border border-white/15 bg-white/8 p-6 backdrop-blur-xl"
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
          <div className="mx-auto max-w-5xl rounded-[42px] border border-white/15 bg-white/8 px-6 py-14 text-center backdrop-blur-xl md:px-10">
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