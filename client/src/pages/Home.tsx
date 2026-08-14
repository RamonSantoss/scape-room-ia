/* Design reminder: the home is a mission control viewport — asymmetrical, calm and free of page scroll. */

import { ArrowRight, Command, Layers3, Sparkles } from "lucide-react";
import { Link } from "wouter";
import { BrandMark } from "@/components/BrandMark";
import { ModuleCard } from "@/components/ModuleCard";
import { Telemetry } from "@/components/Telemetry";
import { modules } from "@/data/moduleData";
import { getAllProgress, type ModuleProgress } from "@/lib/progress";
import { useEffect, useState } from "react";

export default function Home() {
  const [progressMap, setProgressMap] = useState<Record<string, ModuleProgress>>(() => getAllProgress() as Record<string, ModuleProgress>);

  useEffect(() => {
    const refresh = () => setProgressMap(getAllProgress() as Record<string, ModuleProgress>);
    window.addEventListener("scape-progress-updated", refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener("scape-progress-updated", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  const completed = modules.filter((module) => progressMap[module.key]?.roomComplete).length;

  return (
    <main className="mission-shell mission-shell--home">
      <div className="home-glow home-glow--one" aria-hidden="true" />
      <div className="home-glow home-glow--two" aria-hidden="true" />
      <header className="topbar">
        <BrandMark />
        <Telemetry label="NÚCLEO 00" status="PRONTO PARA EXPLORAR" />
        <div className="topbar__meta"><span>PROGRESSO</span><strong>{completed}/4</strong></div>
      </header>

      <div className="home-layout">
        <section className="home-intro">
          <div className="eyebrow-line"><span className="eyebrow-dot" /> EXPERIÊNCIA GUIADA / 04 MÓDULOS</div>
          <h1>Abra uma ideia.<br /><em>Pratique.</em></h1>
          <p className="home-lede">Uma jornada curta para entender a IA fazendo — aula, sala e uma primeira tentativa real.</p>
          <div className="home-actions">
            <Link href="/modulo/prompts" className="button button--primary"><span>Começar pelo primeiro sinal</span><ArrowRight size={18} /></Link>
            <div className="home-note"><Sparkles size={15} /><span>Sem código. Sem rolagem.<br />Uma cena por vez.</span></div>
          </div>
          <div className="home-stats">
            <div><strong>04</strong><span>portas de entrada</span></div>
            <div><strong>03</strong><span>pistas por sala</span></div>
            <div><strong>01</strong><span>prática para levar</span></div>
          </div>
        </section>

        <section className="home-portal" aria-label="Escolha um módulo">
          <div className="portal-heading"><span>ESCOLHA SUA PRIMEIRA SALA</span><Command size={16} /></div>
          <div className="mission-map">
            <div className="map-connector map-connector--horizontal" aria-hidden="true" />
            <div className="map-connector map-connector--vertical" aria-hidden="true" />
            <div className="mission-core" aria-hidden="true"><span>SCAPE / IA</span><strong>00</strong><i /></div>
            <div className="stations-grid">
              {modules.map((module) => <ModuleCard key={module.key} module={module} progress={progressMap[module.key] || { chapterIndex: 0, lessonComplete: false, roomComplete: false, practiceStarted: false }} />)}
            </div>
          </div>
          <div className="portal-foot"><Layers3 size={15} /><span>As salas ficam mais fáceis quando você experimenta.</span></div>
        </section>
      </div>

      <footer className="home-footer"><span>SCAPE / ROOM / IA</span><span>aprendizagem por descoberta</span><span>v.01 — sinal aberto</span></footer>
    </main>
  );
}
