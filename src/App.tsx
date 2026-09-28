import React, { useState, useEffect } from 'react';
import { Page, UserProgress } from './types';
import { loadUserProgress, saveUserProgress } from './utils/storage';
import { Navbar } from './components/Navbar';
import { HomePage } from './components/HomePage';
import { GuidePage } from './components/GuidePage';
import { MaterialPage } from './components/MaterialPage';
import { GeometryLab } from './components/GeometryLab';
import { MissionGame } from './components/MissionGame';
import { QuizPage } from './components/QuizPage';
import { ResultPage } from './components/ResultPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [progress, setProgress] = useState<UserProgress>(() => loadUserProgress());

  // Scroll to top on page change
  useEffect(() => {
    try {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      window.scrollTo(0, 0);
    }
  }, [currentPage]);

  const handleUpdateProgress = (newProgress: UserProgress) => {
    setProgress(newProgress);
    saveUserProgress(newProgress);
  };

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 flex flex-col font-sans selection:bg-blue-200 selection:text-blue-900">
      {/* Top Navbar */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        progress={progress}
      />

      {/* Main Content View */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage onNavigate={handleNavigate} progress={progress} />
        )}
        {currentPage === 'materials' && <MaterialPage />}
        {currentPage === 'guide' && <GuidePage onNavigate={handleNavigate} />}
        {currentPage === 'lab' && <GeometryLab />}
        {currentPage === 'game' && (
          <MissionGame
            progress={progress}
            onUpdateProgress={handleUpdateProgress}
            onNavigate={handleNavigate}
          />
        )}
        {currentPage === 'quiz' && <QuizPage />}
        {currentPage === 'result' && (
          <ResultPage
            progress={progress}
            onUpdateProgress={handleUpdateProgress}
            onNavigate={handleNavigate}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-[#17324D] text-slate-400 text-xs py-8 border-t border-blue-900/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-lg">🔍</span>
            <div>
              <span className="font-extrabold text-white text-sm">GeoMatch: Detektif Bangun Geometri</span>
              <p className="text-[11px] text-slate-400">
                Pecahkan Kasus, Temukan Hubungan Geometri! • Media Pembelajaran Matematika SMP Kelas IX
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-[11px]">
            <button
              onClick={() => handleNavigate('materials')}
              className="hover:text-white transition cursor-pointer"
            >
              Materi
            </button>
            <span className="text-slate-600">·</span>
            <button
              onClick={() => handleNavigate('lab')}
              className="hover:text-white transition cursor-pointer"
            >
              Laboratorium
            </button>
            <span className="text-slate-600">·</span>
            <button
              onClick={() => handleNavigate('game')}
              className="hover:text-white transition cursor-pointer"
            >
              Misi Detektif
            </button>
            <span className="text-slate-600">·</span>
            <button
              onClick={() => handleNavigate('quiz')}
              className="hover:text-white transition cursor-pointer"
            >
              Evaluasi
            </button>
            <span className="text-slate-600">·</span>
            <button
              onClick={() => handleNavigate('guide')}
              className="hover:text-white transition cursor-pointer"
            >
              Petunjuk
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
