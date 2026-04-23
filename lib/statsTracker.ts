const STATS_KEY = 'interviewai_stats';
const PRACTICE_STATS_KEY = 'interviewai_practice_stats';
const LANG_STATS_KEY = 'interviewai_lang_stats';

export interface AppStats {
  totalInterviews: number;
  totalQuestionsAttempted: number;
  totalCorrectAnswers: number;
  avgScore: number;
  streak: number;
  lastInterviewDate: string;
}

export interface PracticeStats {
  attempted: number;
  solved: number;
}

export interface LangStats {
  [lang: string]: { attempted: number; solved: number };
}

function getDefaultStats(): AppStats {
  return {
    totalInterviews: 0,
    totalQuestionsAttempted: 0,
    totalCorrectAnswers: 0,
    avgScore: 0,
    streak: 0,
    lastInterviewDate: ''
  };
}

export function getStats(): AppStats {
  if (typeof window === 'undefined') return getDefaultStats();
  try {
    const raw = localStorage.getItem(STATS_KEY);
    if (!raw) return getDefaultStats();
    return JSON.parse(raw);
  } catch {
    return getDefaultStats();
  }
}

export function saveInterviewResult(questionsAttempted: number, correctAnswers: number, score: number): void {
  if (typeof window === 'undefined') return;
  const current = getStats();
  const totalInterviews = current.totalInterviews + 1;
  const totalQuestions = current.totalQuestionsAttempted + questionsAttempted;
  const totalCorrect = current.totalCorrectAnswers + correctAnswers;
  const newAvg = Math.round(((current.avgScore * current.totalInterviews) + score) / totalInterviews);

  const today = new Date().toISOString().split('T')[0];
  const lastDate = current.lastInterviewDate;
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
  const streak = lastDate === yesterday || lastDate === today ? current.streak + 1 : 1;

  const updated: AppStats = {
    totalInterviews,
    totalQuestionsAttempted: totalQuestions,
    totalCorrectAnswers: totalCorrect,
    avgScore: newAvg,
    streak,
    lastInterviewDate: today
  };
  localStorage.setItem(STATS_KEY, JSON.stringify(updated));
}

export function getPracticeStats(): PracticeStats {
  if (typeof window === 'undefined') return { attempted: 0, solved: 0 };
  try {
    const raw = localStorage.getItem(PRACTICE_STATS_KEY);
    if (!raw) return { attempted: 0, solved: 0 };
    return JSON.parse(raw);
  } catch {
    return { attempted: 0, solved: 0 };
  }
}

export function recordPracticeAttempt(solved: boolean, lang?: string): void {
  if (typeof window === 'undefined') return;
  const current = getPracticeStats();
  const updated: PracticeStats = {
    attempted: current.attempted + 1,
    solved: current.solved + (solved ? 1 : 0)
  };
  localStorage.setItem(PRACTICE_STATS_KEY, JSON.stringify(updated));

  if (lang) {
    const langStats = getLangStats();
    const prev = langStats[lang] || { attempted: 0, solved: 0 };
    langStats[lang] = { attempted: prev.attempted + 1, solved: prev.solved + (solved ? 1 : 0) };
    localStorage.setItem(LANG_STATS_KEY, JSON.stringify(langStats));
  }
}

export function getLangStats(): LangStats {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(LANG_STATS_KEY);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch {
    return {};
  }
}
