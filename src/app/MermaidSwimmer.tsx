"use client";

import React, { useEffect, useState } from "react";

const FRAME_COUNT = 5;
const FRAME_WIDTH = 341;
const FRAME_HEIGHT = 512;
const FRAME_DURATION = 150;

// 3x2 grid: row 0 has frames 0,1,2; row 1 has frames 3,4
const FRAME_POSITIONS: [number, number][] = [
  [0, 0],
  [1, 0],
  [2, 0],
  [0, 1],
  [1, 1],
];

export function MermaidSwimmer() {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setFrame((f) => (f + 1) % FRAME_COUNT);
    }, FRAME_DURATION);
    return () => clearInterval(id);
  }, []);

  const [col, row] = FRAME_POSITIONS[frame];
  const bgX = -col * FRAME_WIDTH;
  const bgY = -row * FRAME_HEIGHT;

  return (
    <div
      className="pointer-events-none fixed z-30 animate-mermaid-swim"
      style={{
        width: FRAME_WIDTH,
        height: FRAME_HEIGHT,
        backgroundImage: "url('/mermaid-sprite.png')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: `${bgX}px ${bgY}px`,
        backgroundSize: `${FRAME_WIDTH * 3}px ${FRAME_HEIGHT * 2}px`,
        imageRendering: "auto",
      }}
    />
  );
}
