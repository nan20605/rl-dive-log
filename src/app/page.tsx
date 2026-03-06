"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Waves, Fish, BookOpen, FolderOpen, Sparkles, Github, ExternalLink, ArrowDown } from "lucide-react";

export default function RLUnderwaterQuestSite() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMouse({ x, y });
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);
  const [activeTab, setActiveTab] = useState("notes");
  const { scrollYProgress } = useScroll();
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const midY = useTransform(scrollYProgress, [0, 1], [0, -220]);
  const frontY = useTransform(scrollYProgress, [0, 1], [0, -320]);
  const mermaidY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const depthLabel = useTransform(
    scrollYProgress,
    [0, 0.2, 0.45, 0.7, 1],
    ["Sunlit Surface", "Blue Descent", "Coral Forest", "Twilight Zone", "Abyssal Floor"]
  );

  const notes = [
    {
      title: "Lecture 01 — MDPs as Ocean Currents",
      tag: "Foundations",
      blurb:
        "States, actions, rewards, and transitions — the first map of the underwater world.",
      links: ["Notes", "Summary", "Diagrams"],
    },
    {
      title: "Lecture 02 — Value Functions & Depth Gauges",
      tag: "Theory",
      blurb:
        "How future rewards shimmer beneath the surface and guide the diver forward.",
      links: ["Notes", "Equations", "Flashcards"],
    },
    {
      title: "Lecture 03 — Q-Learning in Coral Mazes",
      tag: "Algorithms",
      blurb:
        "Exploration, exploitation, and hidden pathways through a reef of decisions.",
      links: ["Notes", "Code", "Examples"],
    },
    {
      title: "Lecture 04 — Policy Gradients in the Deep",
      tag: "Deep RL",
      blurb:
        "Learning directly from trajectories as if following bioluminescent trails in the dark.",
      links: ["Notes", "Math", "Project Tie-in"],
    },
  ];

  const projects = [
    {
      title: "Diver vs Current",
      type: "Interactive RL Demo",
      description:
        "A visual environment where an agent learns to move through shifting underwater currents.",
      stack: "Python • Gymnasium • React viz",
    },
    {
      title: "Coral Policy Garden",
      type: "Policy Visualization",
      description:
        "Policies grow like glowing coral branches as the agent improves during training.",
      stack: "PyTorch • Framer Motion",
    },
    {
      title: "Deep Sea Treasure Hunt",
      type: "Gridworld Project",
      description:
        "Rewards, hazards, and trajectories visualized as treasures and traps on the ocean floor.",
      stack: "Q-learning • Gridworld",
    },
    {
      title: "Jellyfish Explorer",
      type: "Exploration Demo",
      description:
        "A soft, beautiful visualization of epsilon-greedy exploration vs exploitation over time.",
      stack: "RL basics • data viz",
    },
  ];

  const bubbles = useMemo(
    () =>
      Array.from({ length: 40 }, (_, i) => ({
        id: i,
        left: `${2 + i * 2.45}%`,
        delay: `${(i % 8) * 0.65}s`,
        duration: `${8 + (i % 6)}s`,
        size: `${8 + (i % 5) * 7}px`,
      })),
    []
  );

  const corals = [110, 145, 92, 168, 124, 150, 98, 178, 118];

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#020816] text-white">
      <style>{`
        @keyframes floatUp {
          0% { transform: translateY(60px) translateX(0px); opacity: 0; }
          15% { opacity: 0.45; }
          50% { transform: translateY(-45vh) translateX(8px); opacity: 0.35; }
          100% { transform: translateY(-110vh) translateX(-8px); opacity: 0; }
        }
        @keyframes sway {
          0%, 100% { transform: translateX(0px) rotate(0deg); }
          50% { transform: translateX(10px) rotate(2deg); }
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.35; transform: scale(1); }
          50% { opacity: 0.95; transform: scale(1.08); }
        }
        @keyframes drift {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-10px) translateX(10px); }
        }
        @keyframes shimmer {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
        @keyframes mermaidSwim {
          0% { transform: translateX(-12vw) translateY(0px) rotate(-4deg); }
          25% { transform: translateX(12vw) translateY(-16px) rotate(2deg); }
          50% { transform: translateX(28vw) translateY(10px) rotate(6deg); }
          75% { transform: translateX(46vw) translateY(-12px) rotate(-2deg); }
          100% { transform: translateX(64vw) translateY(4px) rotate(4deg); }
        }
        @keyframes finWave {
          0%, 100% { transform: rotate(-8deg); }
          50% { transform: rotate(10deg); }
        }
        @keyframes coralPulse {
          0%, 100% { filter: drop-shadow(0 0 10px rgba(110,231,255,0.18)); opacity: 0.82; }
          50% { filter: drop-shadow(0 0 22px rgba(167,139,250,0.3)); opacity: 1; }
        }
      `}</style>

      <motion.div
        className="fixed left-0 right-0 top-0 z-50 h-[3px] origin-left bg-gradient-to-r from-cyan-300 via-sky-300 to-violet-300"
        style={{ scaleX: scrollYProgress }}
      />

      <div className="fixed right-4 top-4 z-50 hidden rounded-2xl border border-cyan-100/10 bg-slate-950/40 px-4 py-3 text-sm text-cyan-50/80 backdrop-blur-xl md:block">
        <div className="text-xs uppercase tracking-[0.25em] text-cyan-200/60">Depth</div>
        <motion.div className="mt-1 font-medium text-cyan-100">{depthLabel}</motion.div>
      </div>

      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div style={{ y: bgY }} className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(71,212,255,0.18),_transparent_35%),linear-gradient(to_bottom,_#0a2742_0%,_#072038_18%,_#04152a_40%,_#020d1c_70%,_#020816_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,_rgba(95,225,255,0.12),_transparent_18%),radial-gradient(circle_at_80%_10%,_rgba(126,87,255,0.14),_transparent_18%),radial-gradient(circle_at_45%_55%,_rgba(34,165,195,0.10),_transparent_24%)]" />
        </motion.div>

        <motion.div
          style={{ x: mouse.x * 10, y: mouse.y * 8 }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,_rgba(140,240,255,0.07),_transparent_18%),radial-gradient(circle_at_75%_18%,_rgba(120,180,255,0.05),_transparent_16%)]"
        />

        <motion.div style={{ y: midY }} className="absolute inset-0">
          <div className="absolute left-[8%] top-[16%] h-56 w-56 rounded-full bg-cyan-200/5 blur-3xl" />
          <div className="absolute right-[12%] top-[24%] h-72 w-72 rounded-full bg-violet-300/5 blur-3xl" />
          <div className="absolute left-[20%] top-[42%] h-80 w-80 rounded-full bg-sky-300/5 blur-3xl" />
        </motion.div>

        {bubbles.map((bubble) => (
          <span
            key={bubble.id}
            className="absolute bottom-[-40px] rounded-full bg-cyan-100/20 blur-[1px]"
            style={{
              left: bubble.left,
              width: bubble.size,
              height: bubble.size,
              animation: `floatUp ${bubble.duration} linear infinite`,
              animationDelay: bubble.delay,
              boxShadow: "0 0 18px rgba(173, 240, 255, 0.22)",
            }}
          />
        ))}

        <motion.div
          style={{ y: mermaidY, x: mouse.x * 16 }}
          className="absolute left-[-8%] top-[22%] h-40 w-56 opacity-90"
        >
          <div style={{ animation: "mermaidSwim 16s ease-in-out infinite" }} className="relative h-full w-full">
            <div className="absolute left-10 top-12 h-7 w-7 rounded-full bg-rose-100/80 shadow-[0_0_18px_rgba(255,220,240,0.25)]" />
            <div className="absolute left-[70px] top-[58px] h-12 w-20 rounded-full bg-gradient-to-r from-fuchsia-200/70 to-violet-300/65" />
            <div className="absolute left-[128px] top-[56px] h-6 w-14 rounded-full bg-gradient-to-r from-cyan-200/65 to-emerald-300/55" />
            <div className="absolute left-[138px] top-[44px] h-10 w-10 rounded-tr-[90%] rounded-bl-[90%] bg-cyan-200/55" style={{ animation: "finWave 2.2s ease-in-out infinite" }} />
            <div className="absolute left-[138px] top-[68px] h-10 w-10 rounded-br-[90%] rounded-tl-[90%] bg-cyan-300/45" style={{ animation: "finWave 2.2s ease-in-out infinite", animationDelay: "0.2s" }} />
            <div className="absolute left-[82px] top-[46px] h-4 w-8 rounded-full bg-fuchsia-200/55 rotate-[-25deg]" />
            <div className="absolute left-[88px] top-[76px] h-4 w-8 rounded-full bg-fuchsia-200/45 rotate-[25deg]" />
            <div className="absolute left-6 top-6 h-16 w-14 rounded-full bg-gradient-to-b from-violet-300/25 to-transparent blur-xl" />
          </div>
        </motion.div>

        <motion.div style={{ y: frontY, x: mouse.x * 22 }} className="absolute inset-x-0 bottom-0 h-[34vh]">
          <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-emerald-950/70 via-teal-900/18 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between px-6 md:px-12">
            {corals.map((h, i) => (
              <div key={i} className="relative flex items-end gap-2">
                <div
                  className="w-5 rounded-t-full bg-gradient-to-t from-emerald-800 via-cyan-300/65 to-cyan-100/40"
                  style={{ height: `${h}px`, animation: `sway ${4 + (i % 3)}s ease-in-out infinite, coralPulse ${3.5 + (i % 2)}s ease-in-out infinite`, animationDelay: `${i * 0.22}s` }}
                />
                <div
                  className="w-4 rounded-t-full bg-gradient-to-t from-fuchsia-900 via-violet-300/70 to-cyan-100/35"
                  style={{ height: `${Math.max(60, h - 34)}px`, animation: `sway ${4.8 + (i % 3)}s ease-in-out infinite, coralPulse ${4.1 + (i % 2)}s ease-in-out infinite`, animationDelay: `${i * 0.18}s` }}
                />
                <div className="absolute bottom-[65%] left-1/2 h-4 w-4 rounded-full bg-cyan-200/25 blur-md" />
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <section className="relative min-h-screen">
        <nav className="relative z-20 mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
          <div className="flex items-center gap-3 text-cyan-100">
            <div className="rounded-2xl border border-cyan-100/10 bg-white/5 p-2 backdrop-blur-md">
              <Waves className="h-5 w-5" />
            </div>
            <div>
              <div className="text-sm uppercase tracking-[0.25em] text-cyan-200/60">Nandika’s</div>
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

        <div id="hero" className="relative z-10 mx-auto grid min-h-[calc(100vh-88px)] max-w-7xl gap-12 px-6 pb-20 pt-4 lg:grid-cols-[1.15fr_0.85fr] lg:px-10">
          <div className="flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-cyan-200/20 bg-cyan-100/5 px-4 py-2 text-sm text-cyan-100/80 backdrop-blur-md"
            >
              <Sparkles className="h-4 w-4" />
              Deep-sea website for my reinforcement learning journey
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="max-w-4xl text-5xl font-semibold leading-[0.95] tracking-tight text-white md:text-7xl"
            >
              I’m diving deeper
              <span className="block bg-gradient-to-r from-cyan-200 via-sky-300 to-violet-300 bg-clip-text text-transparent">
                into reinforcement learning
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-6 max-w-2xl text-lg leading-8 text-cyan-50/80 md:text-xl"
            >
              This is my underwater atlas of RL: lecture notes, elegant summaries, visual demos,
              experiments, and projects collected like treasures from the ocean floor.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 34 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-10 flex flex-wrap gap-4"
            >
              <a
                href="#notes"
                className="rounded-2xl border border-cyan-200/20 bg-cyan-300/15 px-6 py-3 text-sm font-medium text-cyan-50 shadow-[0_0_40px_rgba(56,189,248,0.18)] backdrop-blur-md transition hover:scale-[1.02] hover:bg-cyan-300/20"
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
                <span className="flex items-center gap-2"><Github className="h-4 w-4" /> GitHub</span>
              </a>
            </motion.div>

            <div className="mt-12 grid max-w-2xl gap-4 sm:grid-cols-3">
              {[
                ["12+", "Lecture logs"],
                ["6+", "Interactive builds"],
                ["∞", "Curiosity depth"],
              ].map(([value, label], i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.25 + i * 0.1 }}
                  className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl"
                >
                  <div className="text-2xl font-semibold text-cyan-100">{value}</div>
                  <div className="mt-1 text-sm text-cyan-50/65">{label}</div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.15 }}
              className="relative h-[560px] w-full max-w-[470px] overflow-hidden rounded-[2rem] border border-cyan-100/10 bg-white/5 shadow-[0_0_80px_rgba(25,150,255,0.14)] backdrop-blur-2xl"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,_rgba(147,233,255,0.22),_transparent_30%),linear-gradient(to_bottom,_rgba(4,22,41,0.25),_rgba(2,10,24,0.88))]" />
              <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-cyan-200/10 to-transparent" />

              <div className="absolute left-1/2 top-16 h-28 w-28 -translate-x-1/2 rounded-full bg-cyan-200/10 blur-2xl" style={{ animation: "pulseGlow 3.8s ease-in-out infinite" }} />

              <div className="absolute left-1/2 top-20 -translate-x-1/2" style={{ animation: "drift 4s ease-in-out infinite" }}>
                <div className="relative h-28 w-20">
                  <div className="absolute left-1/2 top-0 h-10 w-10 -translate-x-1/2 rounded-full border border-cyan-100/30 bg-slate-900/60" />
                  <div className="absolute left-1/2 top-8 h-12 w-6 -translate-x-1/2 rounded-full bg-slate-800/80" />
                  <div className="absolute left-[28%] top-10 h-14 w-2 origin-top rotate-12 rounded-full bg-cyan-100/50" />
                  <div className="absolute right-[28%] top-10 h-14 w-2 origin-top -rotate-12 rounded-full bg-cyan-100/50" />
                  <div className="absolute left-[40%] top-18 h-16 w-2 origin-top rotate-6 rounded-full bg-cyan-100/40" />
                  <div className="absolute right-[40%] top-18 h-16 w-2 origin-top -rotate-6 rounded-full bg-cyan-100/40" />
                  <div className="absolute left-1/2 top-3 h-3 w-3 -translate-x-1/2 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.9)]" />
                </div>
              </div>

              <motion.div
                animate={{ y: [0, -10, 0], x: [0, 8, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className="absolute right-10 top-28 text-cyan-100/70"
              >
                <Fish className="h-8 w-8" />
              </motion.div>

              <motion.div
                animate={{ y: [0, -12, 0], x: [0, -8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute left-10 top-44 text-violet-200/70"
              >
                <Fish className="h-6 w-6" />
              </motion.div>

              <div className="absolute inset-x-10 bottom-0 h-48 rounded-t-[3rem] bg-[linear-gradient(to_top,_rgba(26,90,110,0.8),_rgba(37,130,110,0.15))] blur-[2px]" />
              <div className="absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-emerald-950/80 via-teal-900/25 to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                {[90, 120, 78, 132, 88, 110, 96].map((h, i) => (
                  <div key={i} className="relative flex items-end gap-2">
                    <div
                      className="w-4 rounded-t-full bg-gradient-to-t from-emerald-700 to-cyan-300/70 opacity-80"
                      style={{ height: `${h}px`, animation: "sway 4s ease-in-out infinite", animationDelay: `${i * 0.3}s` }}
                    />
                    <div
                      className="w-3 rounded-t-full bg-gradient-to-t from-fuchsia-800 to-violet-300/80 opacity-80"
                      style={{ height: `${Math.max(50, h - 28)}px`, animation: "sway 4.8s ease-in-out infinite", animationDelay: `${i * 0.25}s` }}
                    />
                  </div>
                ))}
              </div>

              {[
                ["depth: policy gradients", "bottom-24 left-8", "cyan"],
                ["exploration zone", "right-8 top-44", "violet"],
                ["value reef", "left-8 top-64", "emerald"],
              ].map(([label, pos, tone]) => (
                <div
                  key={label}
                  className={`absolute ${pos} rounded-full border px-4 py-2 text-xs backdrop-blur-md ${
                    tone === "cyan"
                      ? "border-cyan-100/15 bg-cyan-100/10 text-cyan-50/80"
                      : tone === "violet"
                      ? "border-violet-200/15 bg-violet-200/10 text-violet-50/80"
                      : "border-emerald-100/15 bg-emerald-100/10 text-emerald-50/85"
                  }`}
                  style={{ animation: "shimmer 3.6s ease-in-out infinite" }}
                >
                  {label}
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        <div className="relative z-10 flex justify-center pb-10">
          <a href="#notes" className="flex flex-col items-center text-cyan-100/70">
            <span className="text-sm">Scroll to descend</span>
            <ArrowDown className="mt-2 h-5 w-5 animate-bounce" />
          </a>
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-7xl px-6 py-10 lg:px-10">
        <div className="rounded-[2rem] border border-cyan-100/10 bg-white/5 p-8 backdrop-blur-2xl md:p-10">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.28em] text-cyan-200/70">Site concept</p>
            <h2 className="mt-3 text-3xl font-semibold text-white md:text-4xl">
              Scroll like a descent into the deep sea
            </h2>
            <p className="mt-4 text-lg leading-8 text-cyan-50/75">
              The site becomes darker and more mysterious as you go deeper. Near the surface,
              visitors meet your motivation and the beauty of RL. Mid-depth is where your lecture
              notes live. The ocean floor holds your project vault: demos, code, experiments,
              writeups, and future ideas.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              ["Surface", "Intro, identity, and why reinforcement learning feels like exploration."],
              ["Midwater", "Lecture notes, equations, concept explainers, diagrams, and reading logs."],
              ["Abyss", "Projects, simulations, code repositories, videos, results, and reflections."],
            ].map(([title, text]) => (
              <div key={title} className="rounded-3xl border border-white/10 bg-slate-950/20 p-5">
                <div className="text-lg font-medium text-cyan-100">{title}</div>
                <div className="mt-2 text-sm leading-7 text-cyan-50/70">{text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="notes" className="relative z-10 mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-cyan-200/70">Dive log</p>
            <h2 className="mt-3 text-3xl font-semibold text-white md:text-4xl">Lecture notes</h2>
          </div>
          <div className="flex gap-3">
            {[
              ["notes", "Notes", BookOpen],
              ["projects", "Projects", FolderOpen],
            ].map(([key, label, Icon]) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`rounded-full border px-4 py-2 text-sm backdrop-blur-md transition ${
                  activeTab === key
                    ? "border-cyan-200/20 bg-cyan-300/15 text-cyan-50"
                    : "border-white/10 bg-white/5 text-cyan-50/70"
                }`}
              >
                <span className="flex items-center gap-2"><Icon className="h-4 w-4" /> {label}</span>
              </button>
            ))}
          </div>
        </div>

        {activeTab === "notes" ? (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {notes.map((item, i) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.6, delay: i * 0.06 }}
                className="group rounded-[2rem] border border-cyan-100/10 bg-white/5 p-6 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:bg-white/10"
              >
                <div className="mb-4 inline-flex rounded-full border border-cyan-100/10 bg-cyan-100/10 px-3 py-1 text-xs uppercase tracking-[0.18em] text-cyan-100/70">
                  {item.tag}
                </div>
                <h3 className="text-xl font-medium text-white">{item.title}</h3>
                <p className="mt-3 leading-7 text-cyan-50/70">{item.blurb}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {item.links.map((link) => (
                    <span key={link} className="rounded-full border border-white/10 bg-slate-950/25 px-3 py-1 text-xs text-cyan-50/70">
                      {link}
                    </span>
                  ))}
                </div>
                <div className="mt-6 text-sm text-cyan-300 transition group-hover:translate-x-1">
                  Open notes →
                </div>
              </motion.article>
            ))}
          </div>
        ) : (
          <div className="grid gap-5 lg:grid-cols-2">
            {projects.slice(0, 2).map((project, idx) => (
              <div
                key={project.title}
                className="rounded-[2rem] border border-white/10 bg-gradient-to-b from-white/8 to-white/[0.03] p-6 backdrop-blur-xl"
              >
                <div className="text-sm uppercase tracking-[0.22em] text-cyan-200/65">0{idx + 1} • {project.type}</div>
                <h3 className="mt-3 text-2xl font-medium text-white">{project.title}</h3>
                <p className="mt-4 leading-7 text-cyan-50/72">{project.description}</p>
                <div className="mt-5 text-sm text-cyan-100/70">{project.stack}</div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section id="projects" className="relative z-10 mx-auto max-w-7xl px-6 py-10 lg:px-10">
        <div className="mb-8">
          <p className="text-sm uppercase tracking-[0.28em] text-cyan-200/70">Treasure chest</p>
          <h2 className="mt-3 text-3xl font-semibold text-white md:text-4xl">Projects from the ocean floor</h2>
        </div>

        <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-4">
          {projects.map((project, idx) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: idx * 0.06 }}
              className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-b from-white/8 to-white/[0.03] p-6 backdrop-blur-xl"
            >
              <div className="absolute right-0 top-0 h-28 w-28 rounded-full bg-cyan-300/10 blur-3xl" />
              <div className="relative z-10">
                <div className="text-sm uppercase tracking-[0.22em] text-cyan-200/65">0{idx + 1} • {project.type}</div>
                <h3 className="mt-3 text-2xl font-medium text-white">{project.title}</h3>
                <p className="mt-4 leading-7 text-cyan-50/72">{project.description}</p>
                <div className="mt-5 text-sm text-cyan-100/70">{project.stack}</div>
                <div className="mt-8 flex gap-3">
                  <button className="rounded-2xl border border-cyan-100/10 bg-cyan-100/10 px-4 py-3 text-sm text-cyan-50 transition hover:bg-cyan-100/15">
                    Demo
                  </button>
                  <button className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/90 transition hover:bg-white/10">
                    Code
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="about" className="relative z-10 mx-auto max-w-5xl px-6 py-20 text-center lg:px-10">
        <div className="rounded-[2rem] border border-cyan-100/10 bg-white/5 px-6 py-14 backdrop-blur-2xl md:px-10">
          <p className="text-sm uppercase tracking-[0.28em] text-cyan-200/70">Mission</p>
          <h2 className="mt-4 text-3xl font-semibold text-white md:text-5xl">
            Reinforcement learning feels like deep sea diving.
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-cyan-50/75">
            The deeper I go, the stranger and more beautiful the ecosystem becomes: rewards,
            policies, uncertainty, adaptation, exploration, and emergent behavior. This website
            is part notebook, part lab, and part story of descent.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href="https://github.com/"
              className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm text-white/90 backdrop-blur-md transition hover:bg-white/10"
            >
              <span className="flex items-center gap-2"><Github className="h-4 w-4" /> Source code</span>
            </a>
            <a
              href="https://vercel.com/"
              className="rounded-2xl border border-cyan-200/20 bg-cyan-300/15 px-5 py-3 text-sm text-cyan-50 backdrop-blur-md transition hover:bg-cyan-300/20"
            >
              <span className="flex items-center gap-2"><ExternalLink className="h-4 w-4" /> Live site</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
