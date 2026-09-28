import React, { useState } from 'react';
import { Page, UserProgress } from '../types';
import { soundManager } from '../utils/audio';
import {
  Compass,
  BookOpen,
  FlaskConical,
  Award,
  FileQuestion,
  HelpCircle,
  Volume2,
  VolumeX,
  Menu,
  X,
  Trophy,
} from 'lucide-react';

interface NavbarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  progress: UserProgress;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  progress,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(soundManager.getIsMuted());

  const handleToggleSound = () => {
    const muted = soundManager.toggleMute();
    setIsMuted(muted);
    if (!muted) soundManager.playClick();
  };

  const navItems: { page: Page; label: string; icon: React.ReactNode }[] = [
    { page: 'home', label: 'Beranda', icon: <Compass className="w-4 h-4" /> },
    { page: 'materials', label: 'Materi Lengkap', icon: <BookOpen className="w-4 h-4" /> },
    { page: 'lab', label: 'Lab Geometri', icon: <FlaskConical className="w-4 h-4" /> },
    { page: 'game', label: 'Misi Detektif', icon: <Award className="w-4 h-4" /> },
    { page: 'quiz', label: 'Latihan & Evaluasi', icon: <FileQuestion className="w-4 h-4" /> },
    { page: 'guide', label: 'Petunjuk', icon: <HelpCircle className="w-4 h-4" /> },
  ];

  const handleNav = (p: Page) => {
    soundManager.playClick();
    onNavigate(p);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#17324D] text-white shadow-md border-b border-blue-900/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div
            onClick={() => handleNav('home')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-sky-400 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform duration-200">
              <span className="text-xl">🔍</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white group-hover:text-blue-200 transition-colors">
                  GeoMatch
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-700/50">
                  SMP IX
                </span>
              </div>
              <p className="text-[11px] text-blue-200/80 font-medium hidden sm:block">
                Detektif Bangun Geometri
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navItems.map((item) => {
              const active = currentPage === item.page;
              return (
                <button
                  key={item.page}
                  onClick={() => handleNav(item.page)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs lg:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                    active
                      ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Header Right Action & Progress */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Score & Case Pill */}
            <div
              onClick={() => handleNav('result')}
              title="Lihat Rapor & Hasil Investigasi"
              className="flex items-center gap-2 bg-slate-800/80 hover:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700 cursor-pointer transition-colors text-xs"
            >
              <Trophy className="w-4 h-4 text-amber-400" />
              <div className="flex flex-col text-left leading-tight">
                <span className="text-[10px] text-slate-400 font-medium">Skor Kasus</span>
                <span className="font-bold text-amber-300">{(progress?.score ?? 0)}/100 Pts</span>
              </div>
              <div className="h-4 w-px bg-slate-700 mx-0.5" />
              <div className="text-[11px] font-semibold text-sky-200">
                {(progress?.completedCases?.length || 0)}/5 Misi
              </div>
            </div>

            {/* Sound Toggle */}
            <button
              onClick={handleToggleSound}
              title={isMuted ? 'Aktifkan Suara' : 'Bisukan Suara'}
              className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 cursor-pointer transition-colors"
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-slate-800/80 text-slate-200 hover:bg-slate-700 border border-slate-700"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#17324D] border-b border-blue-900 px-4 pt-2 pb-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.page}
              onClick={() => handleNav(item.page)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                currentPage === item.page
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
          <div className="pt-2">
            <button
              onClick={() => handleNav('result')}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg bg-slate-800 text-amber-300 text-sm font-bold border border-slate-700"
            >
              <span className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-amber-400" />
                Lihat Hasil Investigasi
              </span>
              <span>{(progress?.score ?? 0)} Pts</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
