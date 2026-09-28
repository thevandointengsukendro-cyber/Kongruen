export type Page = 'home' | 'materials' | 'guide' | 'game' | 'lab' | 'quiz' | 'result';

export interface Mission {
  id: number;
  caseNumber: string;
  title: string;
  subtitle: string;
  dossier: string;
  suspectsDesc: string;
  shapeA: {
    name: string;
    sides: number[];
    angles?: number[];
    labels: { [key: string]: string };
    type: 'triangle' | 'square' | 'rectangle';
  };
  shapeB: {
    name: string;
    sides: number[];
    angles?: number[];
    labels: { [key: string]: string };
    type: 'triangle' | 'square' | 'rectangle';
  };
  question: string;
  options: {
    id: string;
    label: string;
    text: string;
  }[];
  correctAnswer: string;
  hints: string[];
  explanation: {
    summary: string;
    steps: {
      stepNumber: number;
      title: string;
      content: string;
      mathHighlight?: string;
    }[];
    conclusion: string;
    criterionBadge: string;
  };
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  iconName: string;
  threshold: number; // number of cases required
  unlocked: boolean;
}

export interface UserProgress {
  score: number; // 0 to 100
  completedCases: number[];
  answers: Record<number, { optionId: string; isCorrect: boolean }>;
  hintsRevealed: Record<number, number>; // missionId -> hints revealed count
  unlockedBadges: string[];
}

export interface QuizQuestion {
  id: number;
  type: 'multiple-choice';
  topic: string;
  difficulty: 'Mudah' | 'Sedang' | 'Sulit';
  question: string;
  options: { id: string; text: string }[];
  correctAnswer: string;
  explanation: string;
  formula?: string;
}

export interface EssayQuestion {
  id: number;
  topic: string;
  difficulty: 'Mudah' | 'Sedang' | 'Sulit';
  question: string;
  hints: string;
  modelAnswer: string;
  rubric: string[];
}
