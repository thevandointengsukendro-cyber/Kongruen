import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Mission, Page, UserProgress } from '../types';
import { MISSIONS_DATA } from '../data/missionsData';
import { soundManager } from '../utils/audio';
import { evaluateBadges } from '../utils/storage';
import {
  Award,
  BookOpen,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowRight,
  RotateCcw,
  Sparkles,
  ChevronRight,
  Search,
  Eye,
  ShieldCheck,
  Compass,
} from 'lucide-react';

interface MissionGameProps {
  progress: UserProgress;
  onUpdateProgress: (newProgress: UserProgress) => void;
  onNavigate: (page: Page) => void;
}

export const MissionGame: React.FC<MissionGameProps> = ({
  progress,
  onUpdateProgress,
  onNavigate,
}) => {
  const [activeMissionId, setActiveMissionId] = useState<number>(() => {
    // Pick first unfinished mission or last mission
    const firstUnfinished = MISSIONS_DATA.find((m) => !progress.completedCases.includes(m.id));
    return firstUnfinished ? firstUnfinished.id : 1;
  });

  const mission = MISSIONS_DATA.find((m) => m.id === activeMissionId) || MISSIONS_DATA[0];

  // User state for active mission
  const savedAnswer = progress.answers[mission.id];
  const [selectedOption, setSelectedOption] = useState<string>(savedAnswer?.optionId || '');
  const [isAnswered, setIsAnswered] = useState<boolean>(!!savedAnswer);
  const [isCorrect, setIsCorrect] = useState<boolean>(savedAnswer?.isCorrect || false);
  const [revealedHintsCount, setRevealedHintsCount] = useState<number>(
    progress.hintsRevealed[mission.id] || 0
  );
  const [showCelebrationBanner, setShowCelebrationBanner] = useState<boolean>(false);

  // Sync state if active mission changes
  const handleSelectMission = (id: number) => {
    soundManager.playClick();
    setActiveMissionId(id);
    const existing = progress.answers[id];
    setSelectedOption(existing?.optionId || '');
    setIsAnswered(!!existing);
    setIsCorrect(existing?.isCorrect || false);
    setRevealedHintsCount(progress.hintsRevealed[id] || 0);
    setShowCelebrationBanner(false);
  };

  const handleSelectOption = (optId: string) => {
    if (isAnswered && isCorrect) return; // locked once correct
    soundManager.playClick();
    setSelectedOption(optId);
  };

  const handleRevealHint = () => {
    if (revealedHintsCount < mission.hints.length) {
      soundManager.playClue();
      const nextCount = revealedHintsCount + 1;
      setRevealedHintsCount(nextCount);
      onUpdateProgress({
        ...progress,
        hintsRevealed: {
          ...progress.hintsRevealed,
          [mission.id]: nextCount,
        },
      });
    }
  };

  const handleCheckAnswer = () => {
    if (!selectedOption) return;

    const correct = selectedOption === mission.correctAnswer;
    setIsAnswered(true);
    setIsCorrect(correct);

    const alreadyCompleted = progress.completedCases.includes(mission.id);

    if (correct) {
      soundManager.playCorrect();
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });

      const updatedCompleted = alreadyCompleted
        ? progress.completedCases
        : [...progress.completedCases, mission.id];
      const newScore = alreadyCompleted ? progress.score : Math.min(100, progress.score + 20);

      const { newBadges, allUnlocked } = evaluateBadges(
        updatedCompleted.length,
        progress.unlockedBadges
      );

      if (newBadges.length > 0) {
        soundManager.playFanfare();
        setShowCelebrationBanner(true);
      }

      onUpdateProgress({
        ...progress,
        score: newScore,
        completedCases: updatedCompleted,
        unlockedBadges: allUnlocked,
        answers: {
          ...progress.answers,
          [mission.id]: { optionId: selectedOption, isCorrect: true },
        },
      });
    } else {
      soundManager.playWrong();
      onUpdateProgress({
        ...progress,
        answers: {
          ...progress.answers,
          [mission.id]: { optionId: selectedOption, isCorrect: false },
        },
      });
    }
  };

  const handleRetry = () => {
    soundManager.playClick();
    setSelectedOption('');
    setIsAnswered(false);
    setIsCorrect(false);
  };

  const handleNextMission = () => {
    soundManager.playClick();
    if (activeMissionId < MISSIONS_DATA.length) {
      handleSelectMission(activeMissionId + 1);
    } else {
      // All missions completed or at the end
      onNavigate('result');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Mission Progression Tracker */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-slate-900 text-lg sm:text-xl">
              Peta Investigasi Forensik
            </span>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
              {progress.completedCases.length} dari 5 Kasus Selesai
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Setiap kasus bernilai +20 Poin. Selesaikan seluruhnya untuk meraih lencana Master GeoMatch.
          </p>
        </div>

        {/* Progress Bar & Quick Case Selectors */}
        <div className="flex items-center gap-2">
          {MISSIONS_DATA.map((m) => {
            const isDone = progress.completedCases.includes(m.id);
            const isCurrent = m.id === activeMissionId;
            return (
              <button
                key={m.id}
                onClick={() => handleSelectMission(m.id)}
                className={`relative px-3 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1.5 ${
                  isCurrent
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30 ring-2 ring-blue-400'
                    : isDone
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-300 hover:bg-emerald-100'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                {isDone ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <span>#{m.id}</span>}
                <span className="hidden sm:inline">Kasus {m.id}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Badge Unlocked Alert Banner if new badge gained */}
      {showCelebrationBanner && (
        <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 p-4 rounded-2xl shadow-lg flex items-center justify-between animate-bounce">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🏆</span>
            <div>
              <h4 className="font-black text-sm uppercase tracking-wider">Lencana Baru Terbuka!</h4>
              <p className="text-xs font-medium text-slate-900">
                Penyelidikan Anda berhasil membuktikan kasus ini dan membuka tingkatan detektif baru di kantor pusat.
              </p>
            </div>
          </div>
          <button
            onClick={() => onNavigate('result')}
            className="px-3 py-1.5 text-xs font-bold rounded-lg bg-slate-900 text-amber-300 hover:bg-slate-800 cursor-pointer"
          >
            Lihat Lencana
          </button>
        </div>
      )}

      {/* Main Investigation Case Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Dossier & Geometry Forensic Visualizer */}
        <div className="lg:col-span-7 space-y-4">
          {/* Dossier Card */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-extrabold text-blue-600 bg-blue-50 px-2.5 py-1 rounded">
                  {mission.caseNumber}
                </span>
                <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">
                  {mission.title}
                </h2>
              </div>
              <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                +20 Poin
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic bg-slate-50 p-3 rounded-xl border border-slate-200">
              "{mission.dossier}"
            </p>

            {/* Suspect specs description */}
            <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-xl">
              <span className="text-xs font-bold text-blue-900 block mb-1">
                Data Forensik Barang Bukti:
              </span>
              <pre className="text-xs text-blue-950 font-mono whitespace-pre-wrap leading-relaxed">
                {mission.suspectsDesc}
              </pre>
            </div>
          </div>

          {/* SVG Forensic Canvas */}
          <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800">
            <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-slate-800">
              <span className="flex items-center gap-1.5 font-mono">
                <Search className="w-3.5 h-3.5 text-blue-400" />
                Visualisasi Koordinat Barang Bukti
              </span>
              <span className="font-mono text-[11px] text-blue-300">Skala 1:1 Forensik</span>
            </div>

            <div className="h-64 sm:h-72 w-full flex items-center justify-center my-2 relative">
              <svg className="w-full h-full" viewBox="0 0 460 220">
                <defs>
                  <pattern id="caseGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(59, 130, 246, 0.12)" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#caseGrid)" />

                {/* Render Shape A */}
                {mission.id === 1 && (
                  <>
                    {/* Triangle ABC (3, 4, 5) */}
                    <g transform="translate(60, 50)">
                      <polygon points="10,120 90,120 10,60" fill="rgba(59, 130, 246, 0.25)" stroke="#3B82F6" strokeWidth="2.5" />
                      <text x="5" y="135" fill="#93C5FD" fontSize="11" fontWeight="bold">A</text>
                      <text x="95" y="135" fill="#93C5FD" fontSize="11" fontWeight="bold">B</text>
                      <text x="5" y="52" fill="#93C5FD" fontSize="11" fontWeight="bold">C</text>
                      <text x="50" y="134" fill="#BFDBFE" fontSize="10" textAnchor="middle">4 cm</text>
                      <text x="-4" y="95" fill="#BFDBFE" fontSize="10" textAnchor="end">3 cm</text>
                      <text x="58" y="85" fill="#BFDBFE" fontSize="10">5 cm</text>
                      <text x="50" y="30" fill="#60A5FA" fontSize="11" fontWeight="bold" textAnchor="middle">ΔABC</text>
                    </g>

                    <text x="230" y="110" fill="#F8FAFC" fontSize="24" fontWeight="bold" textAnchor="middle">vs</text>

                    {/* Triangle DEF (3, 4, 5) */}
                    <g transform="translate(280, 50)">
                      <polygon points="10,120 90,120 10,60" fill="rgba(34, 197, 94, 0.25)" stroke="#22C55E" strokeWidth="2.5" />
                      <text x="5" y="135" fill="#86EFAC" fontSize="11" fontWeight="bold">D</text>
                      <text x="95" y="135" fill="#86EFAC" fontSize="11" fontWeight="bold">E</text>
                      <text x="5" y="52" fill="#86EFAC" fontSize="11" fontWeight="bold">F</text>
                      <text x="50" y="134" fill="#BBF7D0" fontSize="10" textAnchor="middle">4 cm</text>
                      <text x="-4" y="95" fill="#BBF7D0" fontSize="10" textAnchor="end">3 cm</text>
                      <text x="58" y="85" fill="#BBF7D0" fontSize="10">5 cm</text>
                      <text x="50" y="30" fill="#4ADE80" fontSize="11" fontWeight="bold" textAnchor="middle">ΔDEF</text>
                    </g>
                  </>
                )}

                {mission.id === 2 && (
                  <>
                    {/* Triangle 1: (3, 4, 5) */}
                    <g transform="translate(50, 70)">
                      <polygon points="10,100 70,100 10,55" fill="rgba(59, 130, 246, 0.25)" stroke="#3B82F6" strokeWidth="2.5" />
                      <text x="40" y="115" fill="#BFDBFE" fontSize="10" textAnchor="middle">4 cm</text>
                      <text x="0" y="80" fill="#BFDBFE" fontSize="10" textAnchor="end">3 cm</text>
                      <text x="46" y="70" fill="#BFDBFE" fontSize="10">5 cm</text>
                      <text x="40" y="35" fill="#60A5FA" fontSize="11" fontWeight="bold" textAnchor="middle">Δ Pertama</text>
                    </g>

                    <text x="180" y="115" fill="#F8FAFC" fontSize="24" fontWeight="bold" textAnchor="middle">⟶</text>
                    <text x="180" y="135" fill="#FDE047" fontSize="11" fontWeight="bold" textAnchor="middle">k = ?</text>

                    {/* Triangle 2: (6, 8, 10) */}
                    <g transform="translate(260, 40)">
                      <polygon points="10,140 130,140 10,50" fill="rgba(234, 179, 8, 0.25)" stroke="#EAB308" strokeWidth="2.5" />
                      <text x="70" y="155" fill="#FEF08A" fontSize="10" textAnchor="middle">8 cm</text>
                      <text x="0" y="100" fill="#FEF08A" fontSize="10" textAnchor="end">6 cm</text>
                      <text x="80" y="85" fill="#FEF08A" fontSize="10">10 cm</text>
                      <text x="70" y="30" fill="#FACC15" fontSize="11" fontWeight="bold" textAnchor="middle">Δ Kedua</text>
                    </g>
                  </>
                )}

                {mission.id === 3 && (
                  <>
                    {/* Angle inspection: 50, 60, 70 */}
                    <g transform="translate(50, 40)">
                      <polygon points="10,130 110,130 70,30" fill="rgba(59, 130, 246, 0.25)" stroke="#3B82F6" strokeWidth="2.5" />
                      <text x="60" y="145" fill="#BFDBFE" fontSize="10" textAnchor="middle">c = 5 cm</text>
                      <text x="25" y="85" fill="#BFDBFE" fontSize="10">a = 4 cm</text>
                      <text x="95" y="85" fill="#BFDBFE" fontSize="10">b = 6 cm</text>
                      <text x="25" y="125" fill="#93C5FD" fontSize="9">50°</text>
                      <text x="90" y="125" fill="#93C5FD" fontSize="9">60°</text>
                      <text x="65" y="55" fill="#93C5FD" fontSize="9">70°</text>
                      <text x="60" y="15" fill="#60A5FA" fontSize="11" fontWeight="bold" textAnchor="middle">Δ Navigasi Alpha</text>
                    </g>

                    <text x="230" y="110" fill="#F8FAFC" fontSize="24" fontWeight="bold" textAnchor="middle">vs</text>

                    <g transform="translate(280, 40)">
                      <polygon points="10,130 110,130 70,30" fill="rgba(34, 197, 94, 0.25)" stroke="#22C55E" strokeWidth="2.5" />
                      <text x="60" y="145" fill="#BBF7D0" fontSize="10" textAnchor="middle">c = 5 cm</text>
                      <text x="25" y="85" fill="#BBF7D0" fontSize="10">a = 4 cm</text>
                      <text x="95" y="85" fill="#BBF7D0" fontSize="10">b = 6 cm</text>
                      <text x="25" y="125" fill="#86EFAC" fontSize="9">50°</text>
                      <text x="90" y="125" fill="#86EFAC" fontSize="9">60°</text>
                      <text x="65" y="55" fill="#86EFAC" fontSize="9">70°</text>
                      <text x="60" y="15" fill="#4ADE80" fontSize="11" fontWeight="bold" textAnchor="middle">Δ Navigasi Beta</text>
                    </g>
                  </>
                )}

                {mission.id === 4 && (
                  <>
                    {/* Scale factor: 5, 7, 9 vs 10, 14, 18 */}
                    <g transform="translate(50, 60)">
                      <polygon points="10,110 80,110 50,40" fill="rgba(59, 130, 246, 0.25)" stroke="#3B82F6" strokeWidth="2.5" />
                      <text x="45" y="125" fill="#BFDBFE" fontSize="10" textAnchor="middle">5 cm</text>
                      <text x="18" y="75" fill="#BFDBFE" fontSize="10">7 cm</text>
                      <text x="70" y="75" fill="#BFDBFE" fontSize="10">9 cm</text>
                      <text x="45" y="25" fill="#60A5FA" fontSize="11" fontWeight="bold" textAnchor="middle">Wilayah 1</text>
                    </g>

                    <text x="190" y="110" fill="#F8FAFC" fontSize="24" fontWeight="bold" textAnchor="middle">⟶</text>
                    <text x="190" y="130" fill="#FDE047" fontSize="11" fontWeight="bold" textAnchor="middle">k = ?</text>

                    <g transform="translate(260, 30)">
                      <polygon points="10,140 150,140 90,20" fill="rgba(234, 179, 8, 0.25)" stroke="#EAB308" strokeWidth="2.5" />
                      <text x="80" y="155" fill="#FEF08A" fontSize="10" textAnchor="middle">10 cm</text>
                      <text x="30" y="80" fill="#FEF08A" fontSize="10">14 cm</text>
                      <text x="125" y="80" fill="#FEF08A" fontSize="10">18 cm</text>
                      <text x="80" y="10" fill="#FACC15" fontSize="11" fontWeight="bold" textAnchor="middle">Wilayah 2</text>
                    </g>
                  </>
                )}

                {mission.id === 5 && (
                  <>
                    {/* Square A (4 cm) vs Square B (8 cm) */}
                    <g transform="translate(60, 70)">
                      <rect x="10" y="30" width="60" height="60" fill="rgba(59, 130, 246, 0.25)" stroke="#3B82F6" strokeWidth="2.5" />
                      {/* 90 deg corner markers */}
                      <path d="M 10 40 L 20 40 L 20 30" fill="none" stroke="#60A5FA" strokeWidth="1.5" />
                      <text x="40" y="105" fill="#BFDBFE" fontSize="10" textAnchor="middle">s = 4 cm</text>
                      <text x="40" y="20" fill="#60A5FA" fontSize="11" fontWeight="bold" textAnchor="middle">Persegi A</text>
                    </g>

                    <text x="190" y="105" fill="#F8FAFC" fontSize="24" fontWeight="bold" textAnchor="middle">vs</text>

                    <g transform="translate(260, 40)">
                      <rect x="10" y="10" width="110" height="110" fill="rgba(234, 179, 8, 0.25)" stroke="#EAB308" strokeWidth="2.5" />
                      <path d="M 10 22 L 22 22 L 22 10" fill="none" stroke="#FDE047" strokeWidth="1.5" />
                      <text x="65" y="135" fill="#FEF08A" fontSize="10" textAnchor="middle">s = 8 cm</text>
                      <text x="65" y="0" fill="#FACC15" fontSize="11" fontWeight="bold" textAnchor="middle">Persegi B</text>
                    </g>
                  </>
                )}
              </svg>
            </div>
          </div>
        </div>

        {/* Right Column: Detective Question, Options & Step-by-Step Resolution */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div>
              <span className="text-xs font-mono font-bold text-slate-500 uppercase">
                Pertanyaan Kasus #{mission.id}
              </span>
              <h3 className="text-base sm:text-lg font-extrabold text-slate-900 mt-1">
                {mission.question}
              </h3>
            </div>

            {/* Answer Options */}
            <div className="space-y-2.5">
              {mission.options.map((opt) => {
                const selected = selectedOption === opt.id;
                let optStyle = 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800';

                if (isAnswered) {
                  if (opt.id === mission.correctAnswer) {
                    optStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold';
                  } else if (selected && !isCorrect) {
                    optStyle = 'bg-rose-50 border-rose-400 text-rose-950';
                  }
                } else if (selected) {
                  optStyle = 'bg-blue-50 border-blue-600 text-blue-950 font-bold ring-2 ring-blue-400';
                }

                return (
                  <div
                    key={opt.id}
                    onClick={() => handleSelectOption(opt.id)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${optStyle}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-lg bg-slate-100 border border-slate-300 text-slate-700 font-bold text-xs flex items-center justify-center shrink-0">
                        {opt.label}
                      </span>
                      <span className="text-xs sm:text-sm">{opt.text}</span>
                    </div>

                    {isAnswered && opt.id === mission.correctAnswer && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    )}
                    {isAnswered && selected && !isCorrect && (
                      <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Feedback Message */}
            {isAnswered && (
              <div
                className={`p-4 rounded-xl border flex items-start gap-3 animate-fadeIn ${
                  isCorrect
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                    : 'bg-rose-50 border-rose-300 text-rose-900'
                }`}
              >
                {isCorrect ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                )}
                <div>
                  <h4 className="font-extrabold text-sm">
                    {isCorrect
                      ? 'Benar! Kamu berhasil menemukan hubungan kedua bangun.'
                      : 'Belum tepat. Periksa kembali sisi dan sudut yang bersesuaian.'}
                  </h4>
                  <p className="text-xs mt-1 leading-relaxed">
                    {isCorrect
                      ? 'Analisis matematis Anda akurat. Silakan telaah pembahasan lengkap di bawah.'
                      : 'Gunakan petunjuk atau pelajari kembali syarat kekongruenan dan faktor skala.'}
                  </p>
                </div>
              </div>
            )}

            {/* Hint System */}
            <div className="pt-2">
              <div className="flex items-center justify-between mb-2">
                <button
                  onClick={handleRevealHint}
                  disabled={revealedHintsCount >= mission.hints.length}
                  className={`text-xs font-bold flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition cursor-pointer ${
                    revealedHintsCount >= mission.hints.length
                      ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
                      : 'bg-amber-50 text-amber-800 border-amber-300 hover:bg-amber-100'
                  }`}
                >
                  <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
                  <span>
                    {revealedHintsCount >= mission.hints.length
                      ? 'Semua Petunjuk Terbuka'
                      : `Minta Petunjuk (${revealedHintsCount}/${mission.hints.length})`}
                  </span>
                </button>
              </div>

              {revealedHintsCount > 0 && (
                <div className="space-y-1.5 mt-2 bg-amber-50/50 p-3 rounded-xl border border-amber-200/80">
                  {mission.hints.slice(0, revealedHintsCount).map((hint, idx) => (
                    <div key={idx} className="text-xs text-amber-900 flex items-start gap-2">
                      <span className="font-bold text-amber-700">💡 Petunjuk {idx + 1}:</span>
                      <span>{hint}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="pt-2 space-y-2">
              {!isAnswered ? (
                <button
                  onClick={handleCheckAnswer}
                  disabled={!selectedOption}
                  className={`w-full py-3.5 rounded-xl font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 shadow-md transition cursor-pointer ${
                    selectedOption
                      ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-500/30'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  <span>Periksa Jawaban Detektif</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <div className="flex gap-2">
                  {!isCorrect && (
                    <button
                      onClick={handleRetry}
                      className="flex-1 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Coba Lagi</span>
                    </button>
                  )}
                  <button
                    onClick={handleNextMission}
                    className="flex-1 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition cursor-pointer shadow-md shadow-blue-500/30"
                  >
                    <span>{activeMissionId === 5 ? 'Lihat Hasil Akhir' : 'Kasus Berikutnya'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              <button
                onClick={() => onNavigate('materials')}
                className="w-full py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center justify-center gap-1 transition cursor-pointer"
              >
                <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                <span>Buka Materi Terkait Kasus Ini</span>
              </button>
            </div>
          </div>

          {/* Mathematical Proof Accordion / Card */}
          {isAnswered && (
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <h4 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  Pembahasan Matematis Resmi
                </h4>
                <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                  {mission.explanation.criterionBadge}
                </span>
              </div>

              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                {mission.explanation.summary}
              </p>

              <div className="space-y-2 pt-1">
                {mission.explanation.steps.map((st) => (
                  <div key={st.stepNumber} className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-xs">
                    <span className="font-bold text-slate-800 block mb-0.5">
                      Langkah {st.stepNumber}: {st.title}
                    </span>
                    <p className="text-slate-600 whitespace-pre-wrap">{st.content}</p>
                    {st.mathHighlight && (
                      <div className="mt-1 font-mono text-blue-700 font-bold bg-white px-2 py-0.5 rounded border border-slate-200 inline-block">
                        {st.mathHighlight}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 font-bold">
                ✓ {mission.explanation.conclusion}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
