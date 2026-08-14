/* Design reminder: the module is a full-height mission viewport; video, room and practice never become a long page. */

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Check, ChevronLeft, ChevronRight, CircleHelp, Copy, ExternalLink, KeyRound, LockKeyhole, Play, RotateCcw, Sparkles, Target, Trophy, X } from "lucide-react";
import { Link, useLocation } from "wouter";
import type { ModuleData, ModuleKey } from "@/data/moduleData";
import { moduleByKey } from "@/data/moduleData";
import { getProgress, saveProgress } from "@/lib/progress";
import { BrandMark } from "@/components/BrandMark";
import { Telemetry } from "@/components/Telemetry";
import { AchievementBadge, CelebrationConfetti } from "@/components/Celebration";

type Scene = "briefing" | "lesson" | "room" | "practice";

const sceneLabels: Record<Scene, string> = {
  briefing: "BRIEFING",
  lesson: "AULA",
  room: "SALA",
  practice: "PRÁTICA",
};

const sceneOrder: Scene[] = ["briefing", "lesson", "room", "practice"];

export default function ModulePage({ module }: { module: ModuleData }) {
  const [, navigate] = useLocation();
  const saved = useMemo(() => getProgress(module.key), [module.key]);
  const [scene, setScene] = useState<Scene>(saved.roomComplete ? "practice" : saved.lessonComplete ? "room" : "briefing");
  const [chapterIndex, setChapterIndex] = useState(saved.chapterIndex || 0);
  const [lessonUnlocked, setLessonUnlocked] = useState(saved.lessonComplete);
  const [roomComplete, setRoomComplete] = useState(saved.roomComplete);
  const [practiceStarted, setPracticeStarted] = useState(saved.practiceStarted);
  const [justCompleted, setJustCompleted] = useState(!saved.roomComplete);
  const [puzzleIndex, setPuzzleIndex] = useState(0);
  const [solved, setSolved] = useState<boolean[]>([]);
  const [feedback, setFeedback] = useState<"idle" | "wrong" | "right">("idle");
  const [showHint, setShowHint] = useState(false);
  const [copied, setCopied] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setChapterIndex(saved.chapterIndex || 0);
    setLessonUnlocked(saved.lessonComplete);
    setRoomComplete(saved.roomComplete);
    setPracticeStarted(saved.practiceStarted);
    setJustCompleted(!saved.roomComplete);
    setScene(saved.roomComplete ? "practice" : saved.lessonComplete ? "room" : "briefing");
  }, [module.key, saved]);

  const currentChapter = module.chapters[chapterIndex];
  const currentPuzzle = module.puzzles[puzzleIndex];
  const solvedCount = solved.filter(Boolean).length;

  function completeLesson() {
    setLessonUnlocked(true);
    saveProgress(module.key, { lessonComplete: true, chapterIndex });
    setScene("room");
  }

  function selectChapter(nextIndex: number) {
    const normalized = (nextIndex + module.chapters.length) % module.chapters.length;
    setChapterIndex(normalized);
    saveProgress(module.key, { chapterIndex: normalized });
    setFeedback("idle");
    setShowHint(false);
    requestAnimationFrame(() => videoRef.current?.load());
  }

  function answerPuzzle(optionIndex: number) {
    if (optionIndex === currentPuzzle.answer) {
      setFeedback("right");
      const nextSolved = [...solved];
      nextSolved[puzzleIndex] = true;
      setSolved(nextSolved);
      window.setTimeout(() => {
        if (puzzleIndex === module.puzzles.length - 1) {
          setRoomComplete(true);
          setJustCompleted(true);
          saveProgress(module.key, { roomComplete: true, lessonComplete: true });
          setScene("practice");
        } else {
          setPuzzleIndex((value) => value + 1);
          setFeedback("idle");
          setShowHint(false);
        }
      }, 520);
    } else {
      setFeedback("wrong");
    }
  }

  function copyPractice() {
    navigator.clipboard?.writeText(module.practicePrompt).then(() => {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    });
  }

  function startPractice() {
    setPracticeStarted(true);
    saveProgress(module.key, { practiceStarted: true, roomComplete: roomComplete || true, lessonComplete: true });
  }

  function goToScene(nextScene: Scene) {
    if (nextScene === "room" && !lessonUnlocked) return;
    if (nextScene === "practice" && !roomComplete) return;
    setScene(nextScene);
    setFeedback("idle");
  }

  return (
    <main className={`mission-shell module-shell module-shell--${module.key}`} style={{ "--module-color": module.color, "--module-soft": module.softColor } as React.CSSProperties}>
      <div className="module-backdrop" aria-hidden="true" />
      <header className="topbar topbar--module">
        <button className="icon-button" onClick={() => navigate("/")} aria-label="Voltar para os módulos"><ArrowLeft size={18} /></button>
        <BrandMark compact />
        <Telemetry label={module.eyebrow} status={sceneLabels[scene]} tone="module" />
        <div className="module-stepper" aria-label={`Etapa ${sceneOrder.indexOf(scene) + 1} de 4`}>
          {sceneOrder.map((item, index) => <button key={item} className={`step-dot ${scene === item ? "is-active" : ""} ${sceneOrder.indexOf(scene) > index ? "is-done" : ""}`} onClick={() => goToScene(item)} aria-label={`Ir para ${sceneLabels[item]}`}><span>{String(index + 1).padStart(2, "0")}</span></button>)}
        </div>
      </header>

      <div className="module-content">
        {scene === "briefing" && <Briefing module={module} onStart={() => setScene("lesson")} />}
        {scene === "lesson" && <Lesson module={module} currentChapter={currentChapter} chapterIndex={chapterIndex} videoRef={videoRef} onEnded={completeLesson} onComplete={completeLesson} onSelectChapter={selectChapter} />}
        {scene === "room" && <Room module={module} puzzle={currentPuzzle} puzzleIndex={puzzleIndex} solvedCount={solvedCount} feedback={feedback} showHint={showHint} onAnswer={answerPuzzle} onHint={() => setShowHint((value) => !value)} onReset={() => { setPuzzleIndex(0); setSolved([]); setFeedback("idle"); setShowHint(false); }} />}
        {scene === "practice" && <Practice module={module} copied={copied} practiceStarted={practiceStarted} celebration={justCompleted} onCopy={copyPractice} onStart={startPractice} onRestart={() => { setScene("briefing"); setLessonUnlocked(false); setRoomComplete(false); setPracticeStarted(false); setJustCompleted(false); setSolved([]); saveProgress(module.key, { lessonComplete: false, roomComplete: false, practiceStarted: false, chapterIndex: 0 }); }} />}
      </div>

      <footer className="module-footer">
        <span className="module-footer__code">{module.key.toUpperCase()} / 04</span>
        <div className="module-footer__hint"><span className="live-pulse" />{lessonUnlocked ? "SALA DISPONÍVEL" : "ASSISTA PARA DESBLOQUEAR"}</div>
        <div className="module-footer__next">{scene === "briefing" ? "01 — ENTENDER" : scene === "lesson" ? "02 — ASSISTIR" : scene === "room" ? "03 — DESCOBRIR" : "04 — PRATICAR"}</div>
      </footer>
    </main>
  );
}

function Briefing({ module, onStart }: { module: ModuleData; onStart: () => void }) {
  return (
    <section className="scene scene--briefing scene-enter">
      <div className="module-fingerprint" aria-hidden="true"><span>{module.signalPhrase}</span><strong>{module.fingerprint}</strong><i /><i /><i /></div>
      <div className="briefing-copy">
        <div className="eyebrow-line"><span className="eyebrow-dot" style={{ background: module.color }} /> {module.eyebrow}</div>
        <h1>{module.title}</h1>
        <p className="scene-lede">{module.description}</p>
        <div className="outcome-card"><Target size={19} /><div><span>AO FINAL DESTA SALA</span><strong>{module.outcome}</strong></div></div>
        <div className="briefing-actions"><button className="button button--primary" onClick={onStart}><Play size={16} fill="currentColor" /> Iniciar a aula <ArrowRight size={17} /></button><span><Sparkles size={14} /> {module.duration}</span></div>
        <div className="briefing-route"><span>PRÓXIMO SINAL</span><strong>Assista à primeira aula para abrir a sala.</strong></div>
      </div>
      <div className="briefing-visual" aria-hidden="true"><div className="visual-ring visual-ring--outer" /><div className="visual-ring visual-ring--inner" /><div className="visual-core" style={{ background: module.color }}><KeyRound size={42} /></div><div className="visual-label visual-label--one">SINAL / 01</div><div className="visual-label visual-label--two">PORTA DE ENTRADA</div><div className="visual-line visual-line--one" /><div className="visual-line visual-line--two" /></div>
    </section>
  );
}

function Lesson({ module, currentChapter, chapterIndex, videoRef, onEnded, onComplete, onSelectChapter }: { module: ModuleData; currentChapter: { title: string; storageUrl: string }; chapterIndex: number; videoRef: React.RefObject<HTMLVideoElement | null>; onEnded: () => void; onComplete: () => void; onSelectChapter: (index: number) => void }) {
  return (
    <section className="scene scene--lesson scene-enter">
      <div className="lesson-video-wrap">
        <div className="lesson-heading"><div><span className="scene-kicker">AULA / TRANSMISSÃO</span><h1>{currentChapter.title}</h1></div><span className="chapter-counter">{String(chapterIndex + 1).padStart(2, "0")} / {String(module.chapters.length).padStart(2, "0")}</span></div>
        <div className="video-frame"><video ref={videoRef} key={currentChapter.storageUrl} controls playsInline onEnded={onEnded} poster={module.sceneImage}><source src={currentChapter.storageUrl} type="video/mp4" />Seu navegador não consegue reproduzir este vídeo.</video><div className="video-corner video-corner--tl" /><div className="video-corner video-corner--br" /></div>
        <div className="lesson-bottom"><span><span className="live-pulse" /> Assista ao vídeo e depois abra a sala</span><button className="button button--ghost" onClick={onComplete}>Marcar aula como assistida <Check size={15} /></button></div>
      </div>
      <aside className="lesson-rail"><div className="rail-heading"><span>MAPA DA AULA</span><span>{module.chapters.length} sinais</span></div><div className="chapter-switcher"><button className="chapter-nav" onClick={() => onSelectChapter(chapterIndex - 1)} aria-label="Vídeo anterior"><ChevronLeft size={16} /></button><div className="chapter-current"><span className="chapter-current__index">{String(chapterIndex + 1).padStart(2, "0")}</span><strong>{currentChapter.title}</strong><small>Selecione outro sinal</small></div><button className="chapter-nav" onClick={() => onSelectChapter(chapterIndex + 1)} aria-label="Próximo vídeo"><ChevronRight size={16} /></button></div><div className="chapter-dots" aria-label="Selecionar aula">{module.chapters.map((chapter, index) => <button key={chapter.title} className={`chapter-dot ${index === chapterIndex ? "is-current" : ""}`} style={{ "--dot-color": module.color } as React.CSSProperties} onClick={() => onSelectChapter(index)} aria-label={`Aula ${index + 1}: ${chapter.title}`}><span>{String(index + 1).padStart(2, "0")}</span></button>)}</div><div className="rail-tip"><Sparkles size={16} /><p>Você não precisa memorizar tudo. Observe uma ideia e leve-a para a prática.</p></div></aside>
    </section>
  );
}

function Room({ module, puzzle, puzzleIndex, solvedCount, feedback, showHint, onAnswer, onHint, onReset }: { module: ModuleData; puzzle: ModuleData["puzzles"][number]; puzzleIndex: number; solvedCount: number; feedback: "idle" | "wrong" | "right"; showHint: boolean; onAnswer: (index: number) => void; onHint: () => void; onReset: () => void }) {
  return (
    <section className="scene scene--room scene-enter">
      <div className="room-copy"><div className="scene-kicker">ESCAPE ROOM / PISTA {String(puzzleIndex + 1).padStart(2, "0")}</div><h1>A porta responde<br /><em>ao seu olhar.</em></h1><p className="scene-lede">Resolva três sinais rápidos para provar que a ideia da aula já está nas suas mãos.</p><div className="room-progress"><span>PISTAS DECODIFICADAS</span><div>{module.puzzles.map((_, index) => <i key={index} className={index < solvedCount ? "is-solved" : index === puzzleIndex ? "is-current" : ""} style={{ "--puzzle-color": module.color } as React.CSSProperties} />)}</div><b>{solvedCount}/{module.puzzles.length}</b></div></div>
      <div className="puzzle-panel"><div className="puzzle-panel__top"><div className="puzzle-seal" style={{ borderColor: module.color, color: module.color }}><LockKeyhole size={22} /></div><span>DECODIFICADOR / {module.key.toUpperCase()}</span><button className="icon-button icon-button--small" onClick={onReset} aria-label="Reiniciar pistas"><RotateCcw size={14} /></button></div><h2>{puzzle.prompt}</h2><div className="puzzle-options">{puzzle.options.map((option, index) => <button key={option} className={`puzzle-option ${feedback === "right" && index === puzzle.answer ? "is-right" : ""} ${feedback === "wrong" && index !== puzzle.answer ? "is-wrong" : ""}`} onClick={() => onAnswer(index)}><span>{String.fromCharCode(65 + index)}</span>{option}</button>)}</div><div className="puzzle-feedback" aria-live="polite">{feedback === "right" ? <><Check size={15} /> Sinal confirmado. Próxima pista.</> : feedback === "wrong" ? <><X size={15} /> Quase. Observe o contexto e tente outra vez.</> : <span>Escolha uma resposta para testar a pista.</span>}</div><button className="hint-button" onClick={onHint}><CircleHelp size={15} /> {showHint ? "Esconder dica" : "Pedir uma dica"}</button>{showHint && <div className="hint-box">{puzzle.hint}</div>}</div>
    </section>
  );
}

function Practice({ module, copied, practiceStarted, celebration, onCopy, onStart, onRestart }: { module: ModuleData; copied: boolean; practiceStarted: boolean; celebration: boolean; onCopy: () => void; onStart: () => void; onRestart: () => void }) {
  return (
    <section className="scene scene--practice scene-enter">
      {celebration && <CelebrationConfetti />}
      <div className="practice-copy"><AchievementBadge module={module} /><div className="scene-kicker">SALA CONCLUÍDA / PRÓXIMO SINAL</div><h1>Agora leve a ideia<br /><em>para a vida real.</em></h1><p className="scene-lede">Você abriu a porta. O próximo passo é criar uma conta em uma IA e experimentar com uma tarefa sua.</p><div className="practice-steps"><div className="practice-step is-current"><span>01</span><strong>Crie sua conta</strong><small>Escolha uma IA de conversa ou imagens.</small></div><div className="practice-step"><span>02</span><strong>Copie a missão</strong><small>Adapte os trechos entre colchetes.</small></div><div className="practice-step"><span>03</span><strong>Faça uma tentativa</strong><small>Observe, revise e tente uma variação.</small></div></div></div>
      <div className="mission-card"><div className="mission-card__header"><span>MISSÃO DE CAMPO / {module.shortTitle.toUpperCase()}</span><span className="mission-card__status">{practiceStarted ? "PRÁTICA INICIADA" : "PRONTA"}</span></div><h2>{module.practice}</h2><div className="prompt-box"><p>{module.practicePrompt}</p><button className="copy-button" onClick={onCopy}>{copied ? <><Check size={14} /> Copiado</> : <><Copy size={14} /> Copiar missão</>}</button></div><div className="mission-actions"><a className="button button--primary" href={module.aiLink} target="_blank" rel="noreferrer" onClick={onStart}><ExternalLink size={15} /> {module.aiLabel}</a><button className="button button--ghost" onClick={onStart}>{practiceStarted ? "Prática registrada" : "Já comecei a praticar"} <Check size={15} /></button></div><p className="mission-disclaimer">O cadastro acontece no serviço externo escolhido por você. Use apenas informações que se sinta confortável em compartilhar.</p><button className="restart-link" onClick={onRestart}>Refazer esta sala</button></div>
    </section>
  );
}

export function ModuleRoute({ moduleKey }: { moduleKey: ModuleKey }) {
  const module = moduleByKey[moduleKey];
  if (!module) return null;
  return <ModulePage module={module} />;
}
