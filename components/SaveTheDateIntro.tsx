"use client";

import { useEffect, useRef, useState } from "react";

const SESSION_KEY = "std-intro-seen";

type Stage = "closed" | "opening" | "revealed" | "dismissing";

function shouldSkipIntro() {
  if (typeof window === "undefined") return false;
  if (window.location.search.includes("replay=1")) return false;
  return window.sessionStorage.getItem(SESSION_KEY) === "1";
}

export function SaveTheDateIntro({ onDone }: { onDone: () => void }) {
  const [stage, setStage] = useState<Stage>("closed");
  const [visible, setVisible] = useState(true);
  const checkedRef = useRef(false);

  useEffect(() => {
    if (checkedRef.current) return;
    checkedRef.current = true;
    if (shouldSkipIntro()) {
      setVisible(false);
      onDone();
    }
  }, [onDone]);

  if (!visible) return null;

  const handleClick = () => {
    if (stage === "closed") {
      setStage("opening");
      setTimeout(() => setStage("revealed"), 1200);
      return;
    }
    if (stage === "revealed") {
      setStage("dismissing");
      setTimeout(() => {
        try {
          window.sessionStorage.setItem(SESSION_KEY, "1");
        } catch {}
        onDone();
      }, 900);
    }
  };

  const hint =
    stage === "closed"
      ? "Tap the envelope"
      : stage === "opening"
      ? ""
      : stage === "revealed"
      ? "Tap anywhere to continue"
      : "";

  return (
    <div
      className={`std-intro std-intro--${stage}`}
      role="dialog"
      aria-label="Save the date"
      onClick={handleClick}
    >
      <div className="std-stars" aria-hidden />
      <div className="std-vignette" aria-hidden />

      <div className="std-monogram" aria-hidden>
        <span>T</span>
        <span className="std-monogram__amp">&amp;</span>
        <span>J</span>
      </div>

      <div className="std-scene">
        <div className={`std-envelope std-envelope--${stage}`}>
          <div className="std-envelope__inside" aria-hidden />
          <div className="std-card">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/save-the-date.png"
              alt="Save the date — Sorrento, Italy, June 4, 2027"
              draggable={false}
            />
          </div>
          <div className="std-flap std-flap--left" aria-hidden />
          <div className="std-flap std-flap--right" aria-hidden />
          <div className="std-flap std-flap--bottom" aria-hidden />
          <div className="std-flap std-flap--top" aria-hidden />
          <div className="std-wax" aria-hidden>
            <span>TJ</span>
          </div>
        </div>
      </div>

      <p
        className={`std-hint std-hint--${
          hint ? "shown" : "hidden"
        } std-hint--stage-${stage}`}
      >
        {hint}
      </p>

      <CornerFlourish className="std-corner std-corner--tl" />
      <CornerFlourish className="std-corner std-corner--tr" />
    </div>
  );
}

function CornerFlourish({ className }: { className: string }) {
  return (
    <div className={className} aria-hidden>
      <svg viewBox="0 0 100 100" fill="none">
        {/* main sweeping stem */}
        <path
          d="M4 50 Q 20 30 40 28 Q 60 26 78 14"
          stroke="currentColor"
          strokeWidth="0.9"
          strokeLinecap="round"
          fill="none"
        />
        {/* secondary curl */}
        <path
          d="M4 50 Q 14 62 30 66 Q 48 70 60 60"
          stroke="currentColor"
          strokeWidth="0.7"
          strokeLinecap="round"
          fill="none"
          opacity="0.7"
        />
        {/* leaves along the main stem */}
        <path
          d="M22 34 Q 26 28 32 30 Q 28 36 22 34 Z"
          fill="currentColor"
          opacity="0.65"
        />
        <path
          d="M44 24 Q 50 18 56 22 Q 52 30 44 24 Z"
          fill="currentColor"
          opacity="0.65"
        />
        <path
          d="M64 20 Q 70 12 76 16 Q 72 24 64 20 Z"
          fill="currentColor"
          opacity="0.55"
        />
        {/* small berries */}
        <circle cx="38" cy="30" r="1.4" fill="currentColor" opacity="0.75" />
        <circle cx="58" cy="24" r="1.2" fill="currentColor" opacity="0.75" />
        <circle cx="78" cy="14" r="1.6" fill="currentColor" opacity="0.8" />
        {/* terminal flourish dot */}
        <circle cx="4" cy="50" r="1.8" fill="currentColor" />
      </svg>
    </div>
  );
}
