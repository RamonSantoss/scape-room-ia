/* Design reminder: celebrate discovery with a restrained signal burst, a clear achievement seal and no forced motion. */

import { Award, Check, Sparkles } from "lucide-react";
import type { ModuleData } from "@/data/moduleData";

const confettiPieces = Array.from({ length: 34 }, (_, index) => ({
  id: index,
  x: ((index * 37) % 100) - 50,
  y: -58 - ((index * 19) % 38),
  rotate: (index * 53) % 360,
  delay: (index % 9) * 55,
  color: ["#B8F36B", "#F7F3E9", "#7FE8E3", "#FFC978", "#D4B4FF"][index % 5],
  shape: index % 3 === 0 ? "confetti-piece--square" : index % 3 === 1 ? "confetti-piece--dash" : "confetti-piece--diamond",
}));

export function CelebrationConfetti() {
  return (
    <div className="confetti-burst" aria-hidden="true">
      {confettiPieces.map((piece) => (
        <span
          key={piece.id}
          className={`confetti-piece ${piece.shape}`}
          style={{
            "--confetti-x": `${piece.x}vw`,
            "--confetti-y": `${piece.y}vh`,
            "--confetti-rotate": `${piece.rotate}deg`,
            "--confetti-delay": `${piece.delay}ms`,
            "--confetti-color": piece.color,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}

export function AchievementBadge({ module }: { module: ModuleData }) {
  return (
    <div className="achievement-wrap" aria-label={`Emblema conquistado: ${module.shortTitle}`}>
      <div className="achievement-badge" style={{ "--badge-color": module.color } as React.CSSProperties}>
        <span className="achievement-badge__orbit achievement-badge__orbit--one" />
        <span className="achievement-badge__orbit achievement-badge__orbit--two" />
        <span className="achievement-badge__star"><Sparkles size={12} fill="currentColor" /></span>
        <span className="achievement-badge__core"><Award size={29} /><Check className="achievement-badge__check" size={11} strokeWidth={3} /></span>
        <span className="achievement-badge__ribbon achievement-badge__ribbon--left" />
        <span className="achievement-badge__ribbon achievement-badge__ribbon--right" />
      </div>
      <div className="achievement-copy"><span>EMBLEMA CONQUISTADO</span><strong>{module.signalPhrase}</strong><small>{module.fingerprint}</small></div>
    </div>
  );
}
