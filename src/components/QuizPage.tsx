import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { MULTIPLE_CHOICE_QUIZ, ESSAY_QUESTIONS } from '../data/quizData';
import { soundManager } from '../utils/audio';
import {
  FileQuestion,
  Clock,
  CheckCircle2,
  XCircle,
  HelpCircle,
  RotateCcw,
  BookOpen,
  Award,
  ChevronDown,
  ChevronUp,
  Filter,
  Eye,
  Send,
} from 'lucide-react';

export const QuizPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'mcq' | 'essay'>('mcq');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('Semua');

  // MCQ State
  const [mcqAnswers, setMcqAnswers] = useState<Record<number, string>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<{ correct: number; total: number; percent: number }>({
    correct: 0,
    total: 10,
    percent: 0,
  });

  // Essay State
  const [essayAnswers, setEssayAnswers] = useState<Record<number, string>>({});
  const [revealedRubrics, setRevealedRubrics] = useState<Record<number, boolean>>({});

  // Optional Timer State
  const [timerEnabled, setTimerEnabled] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(900); // 15 minutes (900s)

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (timerEnabled && timeLeft > 0 && !isSubmitted) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerEnabled, timeLeft, isSubmitted]);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSelectOption = (qId: number, optId: string) => {
    if (isSubmitted) return;
    soundManager.playClick();
    setMcqAnswers((prev) => ({
      ...prev,
      [qId]: optId,
    }));
  };

  const handleSubmit = () => {
    soundManager.playFanfare();
    let correctCount = 0;
    MULTIPLE_CHOICE_QUIZ.forEach((q) => {
      if (mcqAnswers[q.id] === q.correctAnswer) {
        correctCount++;
      }
    });

    const percent = Math.round((correctCount / MULTIPLE_CHOICE_QUIZ.length) * 100);
    setScore({
      correct: correctCount,
      total: MULTIPLE_CHOICE_QUIZ.length,
      percent,
    });
    setIsSubmitted(true);

    if (percent >= 70) {
      confetti({ particleCount: 70, spread: 60 });
    }
  };

  const handleReset = () => {
    soundManager.playClick();
    setMcqAnswers({});
    setIsSubmitted(false);
    setTimeLeft(900);
    setScore({ correct: 0, total: 10, percent: 0 });
  };

  const filteredMCQ = MULTIPLE_CHOICE_QUIZ.filter(
    (q) => selectedDifficulty === 'Semua' || q.difficulty === selectedDifficulty
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold mb-2">
            <FileQuestion className="w-3.5 h-3.5" />
            Evaluasi Kemampuan Detektif Geometri
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Uji Kompetensi & Pembahasan
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Uji pemahaman Anda dengan 10 soal pilihan ganda standar nasional dan 5 soal penalaran uraian.
          </p>
        </div>

        {/* Tab & Timer Bar */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Timer Toggle */}
          <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-xl border border-slate-200">
            <button
              onClick={() => {
                soundManager.playClick();
                setTimerEnabled(!timerEnabled);
              }}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                timerEnabled
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:text-slate-900'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>{timerEnabled ? 'Timer Aktif' : 'Nyalakan Timer'}</span>
            </button>
            {timerEnabled && (
              <span className="font-mono text-xs font-black text-blue-700 px-2 py-0.5 bg-blue-50 rounded">
                {formatTimer(timeLeft)}
              </span>
            )}
          </div>

          {/* Section Switcher */}
          <div className="flex items-center gap-1 bg-slate-200/80 p-1 rounded-xl">
            <button
              onClick={() => {
                soundManager.playClick();
                setActiveTab('mcq');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                activeTab === 'mcq'
                  ? 'bg-white text-blue-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              10 Pilihan Ganda
            </button>
            <button
              onClick={() => {
                soundManager.playClick();
                setActiveTab('essay');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                activeTab === 'essay'
                  ? 'bg-white text-blue-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              5 Soal Uraian
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: 10 PILIHAN GANDA */}
      {/* ========================================================================= */}
      {activeTab === 'mcq' && (
        <div className="space-y-6">
          {/* Score Result Card when submitted */}
          {isSubmitted && (
            <div className="bg-gradient-to-r from-[#17324D] to-[#1e3e60] text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 animate-fadeIn">
              <div className="space-y-2 text-center md:text-left">
                <span className="text-xs font-bold text-amber-300 uppercase tracking-widest">
                  Hasil Evaluasi Pilihan Ganda
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Skor Anda: {score.percent} / 100
                </h3>
                <p className="text-sm text-blue-200">
                  {score.correct} soal benar dari {score.total} butir pertanyaan ({score.percent}%).
                  {score.percent >= 80
                    ? ' Luar biasa! Kemampuan detektif geometri Anda sangat tajam.'
                    : score.percent >= 60
                    ? ' Cukup baik. Pelajari pembahasan pada butir soal yang belum tepat.'
                    : ' Perlu latihan lebih banyak. Tinjau kembali materi di tab pembelajaran.'}
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleReset}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 border border-slate-700 cursor-pointer shadow-sm"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Ulangi Kuis</span>
                </button>
              </div>
            </div>
          )}

          {/* Difficulty Filter */}
          <div className="flex items-center justify-between flex-wrap gap-3 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
              <Filter className="w-4 h-4 text-blue-600" />
              <span>Filter Tingkat Kesulitan:</span>
            </div>
            <div className="flex items-center gap-1.5">
              {['Semua', 'Mudah', 'Sedang', 'Sulit'].map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setSelectedDifficulty(lvl)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition cursor-pointer ${
                    selectedDifficulty === lvl
                      ? 'bg-blue-600 text-white font-bold shadow-sm'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          {/* Questions List */}
          <div className="space-y-5">
            {filteredMCQ.map((q) => {
              const userAnswer = mcqAnswers[q.id];
              const isCorrect = userAnswer === q.correctAnswer;

              return (
                <div
                  key={q.id}
                  className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-sm space-y-4"
                >
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2.5">
                      <span className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 font-extrabold text-xs flex items-center justify-center">
                        {q.id}
                      </span>
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                        {q.topic}
                      </span>
                    </div>

                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        q.difficulty === 'Mudah'
                          ? 'bg-emerald-100 text-emerald-800'
                          : q.difficulty === 'Sedang'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {q.difficulty}
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-relaxed">
                    {q.question}
                  </h3>

                  {/* Options */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {q.options.map((opt) => {
                      const selected = userAnswer === opt.id;
                      let btnClass = 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700';

                      if (isSubmitted) {
                        if (opt.id === q.correctAnswer) {
                          btnClass = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold';
                        } else if (selected && !isCorrect) {
                          btnClass = 'bg-rose-50 border-rose-400 text-rose-950';
                        }
                      } else if (selected) {
                        btnClass = 'bg-blue-50 border-blue-600 text-blue-950 font-bold ring-2 ring-blue-400';
                      }

                      return (
                        <div
                          key={opt.id}
                          onClick={() => handleSelectOption(q.id, opt.id)}
                          className={`p-3 rounded-xl border text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-between ${btnClass}`}
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="w-6 h-6 rounded bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center shrink-0">
                              {opt.id}
                            </span>
                            <span>{opt.text}</span>
                          </div>

                          {isSubmitted && opt.id === q.correctAnswer && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          )}
                          {isSubmitted && selected && !isCorrect && (
                            <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Explanation after submission */}
                  {isSubmitted && (
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-1.5 animate-fadeIn">
                      <div className="flex items-center gap-1.5 font-bold text-slate-800">
                        <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                        <span>Pembahasan Detektif:</span>
                      </div>
                      <p className="text-slate-600 leading-relaxed">{q.explanation}</p>
                      {q.formula && (
                        <div className="font-mono text-blue-700 font-bold bg-white px-2.5 py-1 rounded border border-slate-200 inline-block mt-1">
                          {q.formula}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Submit Action Bar */}
          {!isSubmitted && (
            <div className="sticky bottom-6 z-20 bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-slate-300 shadow-xl flex items-center justify-between">
              <span className="text-xs sm:text-sm font-semibold text-slate-700">
                Terjawab:{' '}
                <strong className="text-blue-700 font-mono">
                  {Object.keys(mcqAnswers).length}
                </strong>{' '}
                dari 10 Soal
              </span>
              <button
                onClick={handleSubmit}
                disabled={Object.keys(mcqAnswers).length === 0}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-extrabold text-xs sm:text-sm shadow-md transition cursor-pointer ${
                  Object.keys(mcqAnswers).length > 0
                    ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-500/30'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                <span>Kirim & Nilai Evaluasi</span>
                <Send className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: 5 SOAL URAIAN & RUBRIK PENILAIAN */}
      {/* ========================================================================= */}
      {activeTab === 'essay' && (
        <div className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-2xl text-xs sm:text-sm text-blue-900 flex items-start gap-3">
            <HelpCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <strong>Petunjuk Soal Uraian:</strong> Tuliskan alur penalaran dan pembuktian matematis Anda pada kolom yang disediakan.
              Setelah selesai menyusun argumen, klik tombol <em>"Buka Model Jawaban & Rubrik Penilaian"</em> untuk mengevaluasi jawaban Anda secara mandiri.
            </div>
          </div>

          <div className="space-y-5">
            {ESSAY_QUESTIONS.map((eq) => {
              const isRubricOpen = !!revealedRubrics[eq.id];
              return (
                <div
                  key={eq.id}
                  className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-sm space-y-4"
                >
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2.5">
                      <span className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 font-extrabold text-xs flex items-center justify-center">
                        {eq.id}
                      </span>
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                        {eq.topic}
                      </span>
                    </div>

                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        eq.difficulty === 'Mudah'
                          ? 'bg-emerald-100 text-emerald-800'
                          : eq.difficulty === 'Sedang'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {eq.difficulty}
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-relaxed">
                    {eq.question}
                  </h3>

                  {/* Hints */}
                  <div className="text-xs text-slate-500 italic bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                    💡 Petunjuk Pengerjaan: {eq.hints}
                  </div>

                  {/* Student input field */}
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Ruang Jawaban Detektif:
                    </label>
                    <textarea
                      rows={3}
                      value={essayAnswers[eq.id] || ''}
                      onChange={(e) =>
                        setEssayAnswers((prev) => ({ ...prev, [eq.id]: e.target.value }))
                      }
                      placeholder="Tuliskan langkah pembuktian atau rumus yang Anda gunakan di sini..."
                      className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                    />
                  </div>

                  {/* Toggle Rubric Button */}
                  <div>
                    <button
                      onClick={() => {
                        soundManager.playClick();
                        setRevealedRubrics((prev) => ({
                          ...prev,
                          [eq.id]: !prev[eq.id],
                        }));
                      }}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>{isRubricOpen ? 'Sembunyikan Kunci & Rubrik' : 'Buka Kunci Jawaban & Rubrik Penilaian'}</span>
                      {isRubricOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  {/* Revealed Rubric & Model Answer */}
                  {isRubricOpen && (
                    <div className="bg-slate-900 text-white rounded-xl p-4 text-xs space-y-3 animate-fadeIn">
                      <div>
                        <span className="font-bold text-emerald-400 block mb-1">
                          Model Jawaban Standar Detektif:
                        </span>
                        <pre className="text-xs text-slate-200 whitespace-pre-wrap font-sans leading-relaxed">
                          {eq.modelAnswer}
                        </pre>
                      </div>

                      <div className="pt-2 border-t border-slate-800">
                        <span className="font-bold text-amber-300 block mb-1">
                          Rubrik Penilaian Mandiri:
                        </span>
                        <ul className="list-disc pl-4 space-y-1 text-slate-300">
                          {eq.rubric.map((r, rIdx) => (
                            <li key={rIdx}>{r}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
