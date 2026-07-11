"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";

const SESSION_KEY = "std-intro-seen";

type Stage = "closed" | "opening" | "revealed" | "dismissing";

function shouldSkipIntro() {
  if (typeof window === "undefined") return false;
  if (window.location.search.includes("replay=1")) return false;
  // sessionStorage can throw when the app is loaded inside a cross-site iframe
  // (e.g. embedded in the Canva site) with storage access blocked.
  try {
    return window.sessionStorage.getItem(SESSION_KEY) === "1";
  } catch {
    return false;
  }
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

  const proceed = () => {
    if (stage !== "revealed") return;
    setStage("dismissing");
    setTimeout(() => {
      try {
        window.sessionStorage.setItem(SESSION_KEY, "1");
      } catch {}
      onDone();
    }, 900);
  };

  const handleClick = () => {
    if (stage === "closed") {
      setStage("opening");
      setTimeout(() => setStage("revealed"), 1200);
    } else if (stage === "revealed") {
      // once open, a tap anywhere continues (as does the button)
      proceed();
    }
  };

  const handleContinue = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    proceed();
  };

  return (
    <div
      className={`std-intro std-intro--${stage}`}
      role="dialog"
      aria-label="Save the date"
      onClick={handleClick}
    >
      <div className="std-stars" aria-hidden />
      <div className="std-vignette" aria-hidden />

      <div className="std-scene">
        <div className={`std-envelope std-envelope--${stage}`}>
          <div className="std-envelope__inside" aria-hidden />
          <div className="std-card">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/save-the-date-card.png"
              alt="Save the date — Jacquelyn & Tommy, June 4, 2027, Sorrento, Italy"
              draggable={false}
            />
          </div>
          <div className="std-flap std-flap--left" aria-hidden />
          <div className="std-flap std-flap--right" aria-hidden />
          <div className="std-flap std-flap--bottom" aria-hidden />
          <div className="std-flap std-flap--top" aria-hidden />
          <div className="std-wax" aria-hidden>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/wax-seal.png" alt="" draggable={false} />
          </div>
          <p className="std-caption" aria-hidden>
            Tap to open
          </p>
        </div>
      </div>

      {(stage === "revealed" || stage === "dismissing") && (
        <button type="button" className="std-continue" onClick={handleContinue}>
          Continue
        </button>
      )}
    </div>
  );
}
