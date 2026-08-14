/* Design reminder: module stations feel like portals, not uniform course cards. */

import { ArrowUpRight, Check, LockKeyhole } from "lucide-react";
import { Link } from "wouter";
import type { ModuleData } from "@/data/moduleData";
import type { ModuleProgress } from "@/lib/progress";

type ModuleCardProps = { module: ModuleData; progress: ModuleProgress };

export function ModuleCard({ module, progress }: ModuleCardProps) {
  const isComplete = progress.roomComplete;
  const isUnlocked = progress.lessonComplete;
  return (
    <Link href={`/modulo/${module.key}`} className={`station station--${module.key}`} style={{ "--station-color": module.color } as React.CSSProperties}>
      <div className="station__topline">
        <span>{module.eyebrow}</span>
        {isComplete ? <Check size={15} aria-label="Concluído" /> : isUnlocked ? <ArrowUpRight size={16} aria-label="Desbloqueado" /> : <LockKeyhole size={14} aria-label="Aula pendente" />}
      </div>
      <div className="station__orb" aria-hidden="true"><span /></div>
      <div className="station__copy">
        <h2>{module.shortTitle}</h2>
        <p>{isComplete ? "Sala concluída" : isUnlocked ? "Sala liberada" : "Aula disponível"}</p>
        <span className="station__fingerprint">{module.fingerprint}</span>
      </div>
      <span className="station__arrow" aria-hidden="true"><ArrowUpRight size={18} /></span>
    </Link>
  );
}
