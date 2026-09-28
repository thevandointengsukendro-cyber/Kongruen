import React from 'react';
import confetti from 'canvas-confetti';
import { Page, UserProgress } from '../types';
import { INITIAL_BADGES, resetUserProgress } from '../utils/storage';
import { soundManager } from '../utils/audio';
import {
  Award,
  BookOpen,
  FileQuestion,
  RotateCcw,
  CheckCircle2,
  XCircle,
  ShieldCheck,
  Sparkles,
  Trophy,
  ArrowRight,
} from 'lucide-react';

interface ResultPageProps {
  progress: UserProgress;
  onUpdateProgress: (newProgress: UserProgress) => void;
  onNavigate: (page: Page) => void;
}

export const ResultPage: React.FC<ResultPageProps> = ({
  progress,
  onUpdateProgress,
  onNavigate,
}) => {
  const safeCompleted = progress?.completedCases || [];
  const safeBadges = progress?.unlockedBadges || [];
  const totalMissions = 5;
  const correctCount = safeCompleted.length;
  const wrongCount = totalMissions - correctCount;
  const percentage = Math.round((correctCount / totalMissions) * 100);

  // Recommendations according to prompt specification
  let feedbackMessage = '';
  let feedbackGrade = '';
  let recommendations: string[] = [];

  if (percentage >= 90) {
    feedbackGrade = 'Penguasaan materi sangat baik';
    feedbackMessage =
      'Selamat Detektif! Anda menguasai penuh seluruh konsep kekongruenan dan kesebangunan dengan akurasi sempurna.';
    recommendations = [
      'Pertahankan ketelitian dalam menyelesaikan soal variasi tingkat tinggi (HOTS).',
      'Coba kerjakan latihan soal uraian pembuktian pada menu Evaluasi.',
      'Bantu rekan kelas Anda yang ingin memahami kriteria SSS/SAS dan Teorema Thales.',
    ];
  } else if (percentage >= 75) {
    feedbackGrade = 'Pemahaman materi baik';
    feedbackMessage =
      'Penyelidikan Anda solid! Sebagian besar kasus berhasil dianalisis dengan penalaran yang tepat.';
    recommendations = [
      'Periksa kembali konsep faktor skala k pada bangun hasil perbesaran atau pengecilan.',
      'Pelajari perbedaan mendasar antara kriteria kesebangunan segiempat vs segitiga di Tab 6.',
      'Uji coba simulasi pembesaran pada Laboratorium Geometri.',
    ];
  } else if (percentage >= 60) {
    feedbackGrade = 'Perlu latihan tambahan';
    feedbackMessage =
      'Anda telah memahami konsep dasar, namun masih membutuhkan penguatan pada pengujian kriteria sisi dan sudut.';
    recommendations = [
      'Pelajari kembali Tab 2: 5 Syarat Kekongruenan Segitiga (SSS, SAS, ASA, AAS, RHS).',
      'Gunakan fitur slider pada Laboratorium Geometri untuk memvisualisasikan faktor skala k.',
      'Pastikan selalu mengecek apakah sudut yang diketahui merupakan sudut apit atau bukan.',
    ];
  } else {
    feedbackGrade = 'Pelajari kembali materi dasar';
    feedbackMessage =
      'Banyak petunjuk forensik yang terlewat. Jangan berkecil hati, buka kembali buku materi untuk memperkokoh fondasi geometri Anda!';
    recommendations = [
      'Baca secara saksama Tab 1 (Pengertian Kekongruenan) dan Tab 4 (Pengertian Kesebangunan).',
      'Ingat rumus dasar: jika k = 1 maka Kongruen; jika k ≠ 1 maka Sebangun tetapi tidak kongruen.',
      'Gunakan tombol "Minta Petunjuk" saat mencoba investigasi berikutnya.',
    ];
  }

  const handleResetInvestigation = () => {
    if (window.confirm('Apakah Anda yakin ingin mereset riwayat kasus dan memulai investigasi dari awal?')) {
      const fresh = resetUserProgress();
      onUpdateProgress(fresh);
      soundManager.playClick();
      onNavigate('game');
    }
  };

  const handleLaunchConfetti = () => {
    soundManager.playFanfare();
    confetti({ particleCount: 100, spread: 80, origin: { y: 0.5 } });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fadeIn">
      {/* Hero Victory Card */}
      <div className="bg-gradient-to-br from-[#17324D] via-[#1b3a5b] to-[#122538] text-white rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden border border-blue-900">
        <div className="relative z-10 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/20 border border-blue-400/40 text-blue-200 text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            Laporan Akhir Kasus Forensik
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            INVESTIGASI SELESAI!
          </h1>

          <p className="text-sm sm:text-base text-blue-100 max-w-2xl mx-auto leading-relaxed">
            {feedbackMessage}
          </p>

          {/* Big Score Badges Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto pt-4">
            <div className="bg-slate-900/70 backdrop-blur rounded-2xl p-4 border border-blue-400/20 text-center">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold">Skor Akhir</span>
              <span className="text-2xl sm:text-3xl font-black text-amber-300 font-mono mt-1 block">
                {(progress?.score ?? 0)} Pts
              </span>
              <span className="text-[11px] text-slate-400">dari 100 Poin</span>
            </div>

            <div className="bg-slate-900/70 backdrop-blur rounded-2xl p-4 border border-blue-400/20 text-center">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold">Jawaban Benar</span>
              <span className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono mt-1 block">
                {correctCount}
              </span>
              <span className="text-[11px] text-slate-400">Kasus Terpecahkan</span>
            </div>

            <div className="bg-slate-900/70 backdrop-blur rounded-2xl p-4 border border-blue-400/20 text-center">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold">Jawaban Salah</span>
              <span className="text-2xl sm:text-3xl font-black text-rose-400 font-mono mt-1 block">
                {wrongCount}
              </span>
              <span className="text-[11px] text-slate-400">Kasus Belum Tuntas</span>
            </div>

            <div className="bg-slate-900/70 backdrop-blur rounded-2xl p-4 border border-blue-400/20 text-center">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold">Persentase</span>
              <span className="text-2xl sm:text-3xl font-black text-sky-300 font-mono mt-1 block">
                {percentage}%
              </span>
              <span className="text-[11px] text-slate-400">Tingkat Akurasi</span>
            </div>
          </div>

          <div className="pt-2">
            <span className="inline-block px-4 py-1.5 rounded-full bg-blue-600/30 border border-blue-400/50 text-xs sm:text-sm font-bold text-blue-200">
              Kategori: {feedbackGrade}
            </span>
          </div>
        </div>
      </div>

      {/* Badges Earned Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-500" />
              Lencana Kehormatan Detektif
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Pencapaian resmi berdasarkan jumlah kasus yang telah Anda tuntaskan.
            </p>
          </div>
          <button
            onClick={handleLaunchConfetti}
            className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Rayakan!</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {INITIAL_BADGES.map((b) => {
            const isEarned = safeBadges.includes(b.id) || correctCount >= b.threshold;
            return (
              <div
                key={b.id}
                className={`p-5 rounded-2xl border text-center transition-all ${
                  isEarned
                    ? 'bg-gradient-to-b from-amber-50 to-amber-100/50 border-amber-300 shadow-sm'
                    : 'bg-slate-50 border-slate-200 opacity-60'
                }`}
              >
                <div className="text-3xl sm:text-4xl mb-2">
                  {b.id === 'badge_pemula' && '🔍'}
                  {b.id === 'badge_analis' && '🛡️'}
                  {b.id === 'badge_master' && '🏆'}
                </div>
                <h3 className="font-extrabold text-slate-900 text-sm">{b.title}</h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">{b.description}</p>
                <div className="mt-3">
                  {isEarned ? (
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      Terbuka
                    </span>
                  ) : (
                    <span className="text-[10px] font-semibold text-slate-400 bg-slate-200 px-2 py-0.5 rounded-full">
                      Terkunci (Butuh {b.threshold} Kasus)
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recommended Topics to Review */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
        <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-blue-600" />
          Rekomendasi Tindak Lanjut Belajar
        </h2>
        <ul className="space-y-2.5">
          {recommendations.map((rec, idx) => (
            <li
              key={idx}
              className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700"
            >
              <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <span>{rec}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Action Buttons: Ulangi, Pelajari Materi, Kerjakan Evaluasi */}
      <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
        <button
          onClick={handleResetInvestigation}
          className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 active:scale-95 text-white font-bold text-xs sm:text-sm border border-slate-700 transition cursor-pointer shadow-md"
        >
          <RotateCcw className="w-4 h-4 text-amber-400" />
          <span>Ulangi Investigasi</span>
        </button>

        <button
          onClick={() => {
            soundManager.playClick();
            onNavigate('materials');
          }}
          className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 active:scale-95 text-blue-700 font-bold text-xs sm:text-sm border border-blue-300 transition cursor-pointer shadow-sm"
        >
          <BookOpen className="w-4 h-4 text-blue-600" />
          <span>Pelajari Materi</span>
        </button>

        <button
          onClick={() => {
            soundManager.playClick();
            onNavigate('quiz');
          }}
          className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 active:scale-95 text-white font-bold text-xs sm:text-sm transition cursor-pointer shadow-lg shadow-blue-500/30"
        >
          <FileQuestion className="w-4 h-4" />
          <span>Kerjakan Evaluasi</span>
        </button>
      </div>
    </div>
  );
};
