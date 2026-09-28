import React, { useState } from 'react';
import { Page, UserProgress } from '../types';
import { soundManager } from '../utils/audio';
import {
  Compass,
  BookOpen,
  HelpCircle,
  Award,
  FlaskConical,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  Layers,
  Scale,
  Maximize2,
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: Page) => void;
  progress: UserProgress;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, progress }) => {
  const [heroScale, setHeroScale] = useState<number>(1.5);
  const [heroRot, setHeroRot] = useState<number>(15);

  const handleNav = (p: Page) => {
    soundManager.playClick();
    onNavigate(p);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 text-slate-800 pb-16">
      {/* Top Banner Notice */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white py-2 px-4 text-xs font-medium text-center border-b border-blue-800/40">
        <span className="inline-flex items-center gap-1.5 text-blue-200">
          <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
          Markas Investigasi Forensik Geometri: 5 Kasus Misterius Menanti untuk Dipecahkan!
        </span>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#17324D] via-[#1e3f61] to-[#17324D] text-white pt-12 pb-20 px-4 sm:px-6 lg:px-8 border-b border-blue-950">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-blueprint opacity-40 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/40 text-blue-200 text-xs font-semibold tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Media Pembelajaran Interaktif Matematika SMP Kelas IX</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Selamat Datang, <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-blue-200 to-emerald-300">
                Detektif Geometri!
              </span>
            </h1>

            <p className="text-base sm:text-lg text-blue-100/90 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Amati bangun, temukan petunjuk, dan pecahkan misteri kekongruenan serta kesebangunan.
              Buktikan apakah dua bangun identik sempurna atau memiliki rasio pembesaran tersembunyi!
            </p>

            {/* Quick Specs Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-w-xl mx-auto lg:mx-0 pt-2">
              <div className="bg-slate-900/60 backdrop-blur border border-blue-500/30 rounded-xl p-2.5 text-center">
                <span className="text-[10px] text-blue-300 uppercase tracking-wider block font-bold">Materi</span>
                <span className="text-xs sm:text-sm font-bold text-white">Kekongruenan & Kesebangunan</span>
              </div>
              <div className="bg-slate-900/60 backdrop-blur border border-blue-500/30 rounded-xl p-2.5 text-center">
                <span className="text-[10px] text-blue-300 uppercase tracking-wider block font-bold">Tingkat</span>
                <span className="text-xs sm:text-sm font-bold text-white">Kelas IX SMP</span>
              </div>
              <div className="bg-slate-900/60 backdrop-blur border border-blue-500/30 rounded-xl p-2.5 text-center">
                <span className="text-[10px] text-blue-300 uppercase tracking-wider block font-bold">Misi Kasus</span>
                <span className="text-xs sm:text-sm font-bold text-amber-300">5 Kasus Utama</span>
              </div>
              <div className="bg-slate-900/60 backdrop-blur border border-blue-500/30 rounded-xl p-2.5 text-center">
                <span className="text-[10px] text-blue-300 uppercase tracking-wider block font-bold">Sistem Skor</span>
                <span className="text-xs sm:text-sm font-bold text-emerald-300">100 Poin Max</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-3">
              <button
                onClick={() => handleNav('game')}
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 active:scale-95 text-white font-bold text-sm sm:text-base shadow-lg shadow-blue-600/40 transition-all cursor-pointer"
              >
                <span>Mulai Investigasi</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => handleNav('materials')}
                className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 active:scale-95 text-slate-100 font-semibold text-sm sm:text-base border border-slate-600 shadow-md transition-all cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-sky-400" />
                <span>Pelajari Materi</span>
              </button>

              <button
                onClick={() => handleNav('guide')}
                className="flex items-center gap-2 px-4 py-3.5 rounded-xl bg-transparent hover:bg-white/10 text-blue-200 hover:text-white font-medium text-sm transition-all cursor-pointer"
              >
                <HelpCircle className="w-4 h-4" />
                <span>Lihat Petunjuk</span>
              </button>
            </div>
          </div>

          {/* Hero Right Visual: Interactive Two Triangles Inspection Sandbox */}
          <div className="lg:col-span-5">
            <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl border border-blue-500/40 p-5 shadow-2xl relative">
              <div className="flex items-center justify-between pb-3 border-b border-slate-700">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span className="text-xs font-mono text-blue-300 ml-1">Lensa Forensik: Perbandingan Bangun</span>
                </div>
                <span className="text-[11px] px-2 py-0.5 rounded bg-blue-950 text-blue-300 font-mono border border-blue-800">
                  {heroScale === 1.0 ? 'KONGRUEN (k=1)' : `SEBANGUN (k=${heroScale.toFixed(1)})`}
                </span>
              </div>

              {/* Dynamic SVG Comparison */}
              <div className="h-64 sm:h-72 w-full flex items-center justify-center my-3 relative bg-slate-950/60 rounded-xl overflow-hidden border border-slate-800">
                <svg className="w-full h-full" viewBox="0 0 360 220">
                  {/* Grid lines inside preview */}
                  <defs>
                    <pattern id="heroGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(59, 130, 246, 0.12)" strokeWidth="1" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#heroGrid)" />

                  {/* Triangle 1: Base Triangle ABC (Fixed) */}
                  <g transform="translate(40, 40)">
                    <polygon
                      points="10,120 100,120 10,40"
                      fill="rgba(59, 130, 246, 0.25)"
                      stroke="#3B82F6"
                      strokeWidth="2.5"
                    />
                    {/* Angle marker at right angle */}
                    <path d="M 10 108 L 22 108 L 22 120" fill="none" stroke="#60A5FA" strokeWidth="1.5" />
                    {/* Labels */}
                    <text x="5" y="135" fill="#93C5FD" fontSize="11" fontWeight="bold">A</text>
                    <text x="105" y="135" fill="#93C5FD" fontSize="11" fontWeight="bold">B</text>
                    <text x="5" y="32" fill="#93C5FD" fontSize="11" fontWeight="bold">C</text>
                    {/* Side labels */}
                    <text x="50" y="136" fill="#BFDBFE" fontSize="10" textAnchor="middle">4 cm</text>
                    <text x="2" y="85" fill="#BFDBFE" fontSize="10" textAnchor="end">3 cm</text>
                    <text x="62" y="75" fill="#BFDBFE" fontSize="10" textAnchor="middle">5 cm</text>
                    <text x="45" y="15" fill="#60A5FA" fontSize="11" fontWeight="600" textAnchor="middle">ΔABC (Asli)</text>
                  </g>

                  {/* Triangle 2: Transformed Triangle DEF */}
                  <g transform={`translate(230, 110) rotate(${heroRot}) scale(${heroScale * 0.7}) translate(-50, -60)`}>
                    <polygon
                      points="10,120 100,120 10,40"
                      fill={heroScale === 1.0 ? 'rgba(34, 197, 94, 0.25)' : 'rgba(234, 179, 8, 0.25)'}
                      stroke={heroScale === 1.0 ? '#22C55E' : '#EAB308'}
                      strokeWidth="2.5"
                    />
                    {/* Right angle */}
                    <path d="M 10 108 L 22 108 L 22 120" fill="none" stroke={heroScale === 1.0 ? '#4ADE80' : '#FDE047'} strokeWidth="1.5" />
                    {/* Labels */}
                    <text x="5" y="135" fill="#FDE047" fontSize="11" fontWeight="bold">D</text>
                    <text x="105" y="135" fill="#FDE047" fontSize="11" fontWeight="bold">E</text>
                    <text x="5" y="32" fill="#FDE047" fontSize="11" fontWeight="bold">F</text>
                    {/* Dimension */}
                    <text x="50" y="136" fill="#FEF08A" fontSize="10" textAnchor="middle">{(4 * heroScale).toFixed(1)} cm</text>
                    <text x="-2" y="85" fill="#FEF08A" fontSize="10" textAnchor="end">{(3 * heroScale).toFixed(1)} cm</text>
                    <text x="62" y="75" fill="#FEF08A" fontSize="10" textAnchor="middle">{(5 * heroScale).toFixed(1)} cm</text>
                  </g>

                  {/* Center comparison arrow */}
                  <text x="180" y="90" fill="#94A3B8" fontSize="11" textAnchor="middle" fontWeight="bold">
                    {heroScale === 1.0 ? '≅ (Identik)' : `~ (k = ${heroScale.toFixed(1)})`}
                  </text>
                  <text x="180" y="108" fill="#64748B" fontSize="9" textAnchor="middle">
                    {heroScale === 1.0 ? 'Kongruen Sempurna' : 'Perbesaran Proporsional'}
                  </text>
                </svg>
              </div>

              {/* Interactive Controls for Hero Visual */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span className="flex items-center gap-1.5 font-medium">
                    <Scale className="w-3.5 h-3.5 text-sky-400" />
                    Ubah Faktor Skala (k):
                  </span>
                  <span className="font-mono font-bold text-amber-300">{heroScale.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="0.8"
                  max="2.2"
                  step="0.1"
                  value={heroScale}
                  onChange={(e) => setHeroScale(parseFloat(e.target.value))}
                  className="w-full accent-blue-500 cursor-pointer h-1.5 bg-slate-700 rounded-lg appearance-none"
                />

                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span className="flex items-center gap-1.5 font-medium">
                    <Maximize2 className="w-3.5 h-3.5 text-emerald-400" />
                    Rotasi Bangun:
                  </span>
                  <span className="font-mono font-bold text-emerald-300">{heroRot}°</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="180"
                  step="15"
                  value={heroRot}
                  onChange={(e) => setHeroRot(parseInt(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer h-1.5 bg-slate-700 rounded-lg appearance-none"
                />

                <div className="flex gap-2 pt-1">
                  <button
                    onClick={() => {
                      setHeroScale(1.0);
                      setHeroRot(0);
                    }}
                    className="flex-1 py-1.5 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition cursor-pointer"
                  >
                    Set Kongruen (k=1)
                  </button>
                  <button
                    onClick={() => {
                      setHeroScale(2.0);
                      setHeroRot(45);
                    }}
                    className="flex-1 py-1.5 text-xs font-semibold rounded-lg bg-blue-900/60 hover:bg-blue-800 text-blue-200 border border-blue-700 transition cursor-pointer"
                  >
                    Set Pembesaran (k=2)
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature & Learning Paths Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Investigation Cases */}
          <div
            onClick={() => handleNav('game')}
            className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl border border-slate-200 hover:border-blue-500 transition-all duration-300 cursor-pointer group relative overflow-hidden"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Award className="w-6 h-6" />
            </div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-blue-600 transition-colors">
                5 Misi Kasus Detektif
              </h3>
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                {(progress?.completedCases?.length || 0)}/5 Selesai
              </span>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed mb-4">
              Investigasi barang bukti segitiga identik, pelat hasil pembesaran, pemeriksaan sudut tersembunyi, hingga ubin persegi.
            </p>
            <div className="flex items-center text-blue-600 text-xs font-bold gap-1 group-hover:translate-x-1 transition-transform">
              <span>Buka Berkas Perkara</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 2: Interactive Lab */}
          <div
            onClick={() => handleNav('lab')}
            className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl border border-slate-200 hover:border-emerald-500 transition-all duration-300 cursor-pointer group relative overflow-hidden"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <FlaskConical className="w-6 h-6" />
            </div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-emerald-700 transition-colors">
                Laboratorium Geometri
              </h3>
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                Sandbox Interaktif
              </span>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed mb-4">
              Eksperimen geser titik sudut, putar bangun, ubah faktor skala 0.5 - 3x, dan uji kesebangunan 6 jenis segiempat.
            </p>
            <div className="flex items-center text-emerald-700 text-xs font-bold gap-1 group-hover:translate-x-1 transition-transform">
              <span>Masuk ke Lab</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 3: Complete Syllabus */}
          <div
            onClick={() => handleNav('materials')}
            className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl border border-slate-200 hover:border-indigo-500 transition-all duration-300 cursor-pointer group relative overflow-hidden"
          >
            <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Layers className="w-6 h-6" />
            </div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-indigo-700 transition-colors">
                8 Bab Materi Lengkap
              </h3>
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
                8 Tab Materi
              </span>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed mb-4">
              Pelajari definisi, syarat SSS/SAS/ASA/AAS, kesebangunan segiempat, Teorema Thales, garis tinggi, dan penerapan nyata.
            </p>
            <div className="flex items-center text-indigo-700 text-xs font-bold gap-1 group-hover:translate-x-1 transition-transform">
              <span>Buka Ensiklopedia Materi</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </section>

      {/* Overview of The 5 Mystery Cases */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-14">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Daftar Kasus Aktif
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
            5 Berkas Perkara Geometri Kelas IX
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Setiap kasus dirancang dengan bukti konkret sisi, sudut, dan hubungan proporsional.
            Pecahkan secara matematis untuk mengungkap bukti!
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            {
              id: 1,
              title: 'Dua Segitiga Identik',
              target: 'Kriteria SSS (3, 4, 5 cm)',
              type: 'Kongruen',
              icon: '🔍',
            },
            {
              id: 2,
              title: 'Segitiga Pembesaran',
              target: 'Faktor Skala k = 2 (6, 8, 10 cm)',
              type: 'Sebangun',
              icon: '📐',
            },
            {
              id: 3,
              title: 'Pemeriksaan Sudut',
              target: 'Sudut 50°, 60°, 70° & Sisi 4, 5, 6',
              type: 'Kongruen',
              icon: '🧭',
            },
            {
              id: 4,
              title: 'Misteri Faktor Skala',
              target: 'Dilation k = 2 (5, 7, 9 cm)',
              type: 'Faktor Skala',
              icon: '⚖️',
            },
            {
              id: 5,
              title: 'Persegi yang Sebangun',
              target: 'Sisi 4 cm vs 8 cm (Sudut 90°)',
              type: 'Sebangun',
              icon: '🔳',
            },
          ].map((c) => {
            const isDone = (progress?.completedCases || []).includes(c.id);
            return (
              <div
                key={c.id}
                onClick={() => handleNav('game')}
                className={`p-4 rounded-xl border transition-all cursor-pointer relative overflow-hidden ${
                  isDone
                    ? 'bg-emerald-50/70 border-emerald-300 shadow-sm'
                    : 'bg-white border-slate-200 hover:border-blue-400 hover:shadow-md'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xl">{c.icon}</span>
                  {isDone ? (
                    <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                      <CheckCircle2 className="w-3 h-3" />
                      Terpecahkan
                    </span>
                  ) : (
                    <span className="text-[11px] font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                      Kasus #{c.id}
                    </span>
                  )}
                </div>
                <h4 className="font-bold text-sm text-slate-800 line-clamp-1 mb-1">{c.title}</h4>
                <p className="text-xs text-slate-500 line-clamp-2 mb-3">{c.target}</p>
                <div className="text-[11px] font-semibold text-blue-600 flex items-center justify-between">
                  <span>Target: {c.type}</span>
                  <span>+20 Poin</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Detective Badges Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-14">
        <div className="bg-[#17324D] rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-blue-600/10 pointer-events-none rounded-r-3xl" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <span className="text-xs font-bold text-amber-300 uppercase tracking-widest">
                Lencana Kehormatan Forensik
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                Raih 3 Lencana Prestasi Detektif
              </h3>
              <p className="text-sm text-blue-200 max-w-xl">
                Selesaikan kasus untuk membuka gelar resmi: Mulai dari Detektif Pemula, Analis Geometri, hingga Master GeoMatch dengan sertifikasi penguasaan 100%!
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-3 text-center min-w-[120px]">
                <div className="text-2xl mb-1">🔍</div>
                <div className="text-xs font-bold text-slate-200">Detektif Pemula</div>
                <div className="text-[10px] text-slate-400">1 Kasus</div>
              </div>
              <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-3 text-center min-w-[120px]">
                <div className="text-2xl mb-1">🛡️</div>
                <div className="text-xs font-bold text-slate-200">Analis Geometri</div>
                <div className="text-[10px] text-slate-400">3 Kasus</div>
              </div>
              <div className="bg-gradient-to-b from-amber-500/20 to-amber-900/30 border border-amber-500/50 rounded-2xl p-3 text-center min-w-[120px]">
                <div className="text-2xl mb-1">🏆</div>
                <div className="text-xs font-bold text-amber-300">Master GeoMatch</div>
                <div className="text-[10px] text-amber-200/80">5 Kasus Sempurna</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
