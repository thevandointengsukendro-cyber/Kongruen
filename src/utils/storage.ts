import { UserProgress, Badge } from '../types';

const STORAGE_KEY = 'geomatch_detective_progress_v1';

export const INITIAL_BADGES: Badge[] = [
  {
    id: 'badge_pemula',
    title: 'Detektif Pemula',
    description: 'Menyelesaikan 1 kasus investigasi geometri pertama.',
    iconName: 'Search',
    threshold: 1,
    unlocked: false,
  },
  {
    id: 'badge_analis',
    title: 'Analis Geometri',
    description: 'Menyelesaikan 3 kasus investigasi dengan analisis mendalam.',
    iconName: 'ShieldCheck',
    threshold: 3,
    unlocked: false,
  },
  {
    id: 'badge_master',
    title: 'Master GeoMatch',
    description: 'Menyelesaikan seluruh 5 kasus investigasi dan membuktikan semua teorema.',
    iconName: 'Award',
    threshold: 5,
    unlocked: false,
  },
];

export const INITIAL_PROGRESS: UserProgress = {
  score: 0,
  completedCases: [],
  answers: {},
  hintsRevealed: {},
  unlockedBadges: [],
};

export function loadUserProgress(): UserProgress {
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      return INITIAL_PROGRESS;
    }
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return INITIAL_PROGRESS;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return INITIAL_PROGRESS;

    return {
      score: typeof parsed.score === 'number' && !isNaN(parsed.score) ? parsed.score : 0,
      completedCases: Array.isArray(parsed.completedCases) ? parsed.completedCases.filter((n: unknown) => typeof n === 'number') : [],
      answers: parsed.answers && typeof parsed.answers === 'object' ? parsed.answers : {},
      hintsRevealed: parsed.hintsRevealed && typeof parsed.hintsRevealed === 'object' ? parsed.hintsRevealed : {},
      unlockedBadges: Array.isArray(parsed.unlockedBadges) ? parsed.unlockedBadges.filter((s: unknown) => typeof s === 'string') : [],
    };
  } catch {
    return INITIAL_PROGRESS;
  }
}

export function saveUserProgress(progress: UserProgress): void {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    }
  } catch (err) {
    console.error('Failed to save progress to localStorage', err);
  }
}

export function resetUserProgress(): UserProgress {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem(STORAGE_KEY);
    }
  } catch {}
  return INITIAL_PROGRESS;
}

export function evaluateBadges(completedCount: number, existingUnlocked: string[] = []): {
  newBadges: Badge[];
  allUnlocked: string[];
} {
  const newlyUnlocked: Badge[] = [];
  const safeUnlocked = Array.isArray(existingUnlocked) ? existingUnlocked : [];
  const updatedUnlocked = [...safeUnlocked];

  INITIAL_BADGES.forEach((b) => {
    if (completedCount >= b.threshold && !updatedUnlocked.includes(b.id)) {
      newlyUnlocked.push({ ...b, unlocked: true });
      updatedUnlocked.push(b.id);
    }
  });

  return {
    newBadges: newlyUnlocked,
    allUnlocked: updatedUnlocked,
  };
}
