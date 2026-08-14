/* Design reminder: keep progress calm, visible and reversible; never punish exploration. */

import type { ModuleKey } from "@/data/moduleData";

export type ModuleProgress = {
  chapterIndex: number;
  lessonComplete: boolean;
  roomComplete: boolean;
  practiceStarted: boolean;
};

type ProgressMap = Partial<Record<ModuleKey, ModuleProgress>>;

const STORAGE_KEY = "scape-room-ia-progress-v1";

const emptyProgress = (): ModuleProgress => ({
  chapterIndex: 0,
  lessonComplete: false,
  roomComplete: false,
  practiceStarted: false,
});

export function getProgress(key: ModuleKey): ModuleProgress {
  if (typeof window === "undefined") return emptyProgress();
  try {
    const stored = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "{}") as ProgressMap;
    return { ...emptyProgress(), ...(stored[key] || {}) };
  } catch {
    return emptyProgress();
  }
}

export function saveProgress(key: ModuleKey, patch: Partial<ModuleProgress>) {
  if (typeof window === "undefined") return;
  try {
    const stored = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "{}") as ProgressMap;
    stored[key] = { ...emptyProgress(), ...(stored[key] || {}), ...patch };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
    window.dispatchEvent(new CustomEvent("scape-progress-updated"));
  } catch {
    // Storage can be disabled in private browsing; the experience remains usable in memory.
  }
}

export function getAllProgress(): ProgressMap {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "{}") as ProgressMap;
  } catch {
    return {};
  }
}
