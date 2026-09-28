import React, { useState } from 'react';
import {
  CONGRUENCE_CRITERIA,
  SIMILARITY_CRITERIA,
  QUADRILATERAL_PROPERTIES,
  REAL_LIFE_SCENARIOS,
  CongruenceCriterion,
} from '../data/materialsData';
import { soundManager } from '../utils/audio';
import {
  BookOpen,
  Layers,
  Sparkles,
  Move,
  RotateCw,
  FlipHorizontal,
  ChevronRight,
  Calculator,
  Sliders,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';

export const MaterialPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(1);

  // Tab 1 Transformation Sandbox State
  const [transX, setTransX] = useState<number>(120);
  const [transY, setTransY] = useState<number>(0);
  const [transRot, setTransRot] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  // Tab 2 Selected Congruence Card
  const [selectedCriterion, setSelectedCriterion] = useState<CongruenceCriterion>(CONGRUENCE_CRITERIA[0]);

  // Tab 7 Interactive Thales State
  const [thalesPos, setThalesPos] = useState<number>(0.6); // 0.3 to 0.8
  // Tab 7 Right Triangle Altitude State
  const [altAD, setAltAD] = useState<number>(4);
  const [altDB, setAltDB] = useState<number>(9);

  // Tab 8 Interactive Scenarios State
  const [scenarioInputs, setScenarioInputs] = useState<Record<string, Record<string, number>>>({
    tree_shadow: { stickH: 1.5, stickS: 2, treeS: 12 },
    map_scale: { mapDist: 4, scaleVal: 250000 },
    photo_zoom: { origW: 3, origH: 4, kScale: 3 },
    tile_compare: { tileSmall: 20, tileBig: 60 },
    congruent_patterns: { count: 50, base: 10, height: 8 },
    floor_blueprint: { realLength: 8, realWidth: 6 },
  });

  const handleTabChange = (t: number) => {
    soundManager.playClick();
    setActiveTab(t);
  };

  const tabs = [
    { id: 1, label: '1. Kekongruenan', short: 'Kekongruenan' },
    { id: 2, label: '2. Syarat Kongruen Segitiga', short: 'Syarat Kongruen' },
    { id: 3, label: '3. Sifat Kekongruenan', short: 'Sifat Kongruen' },
    { id: 4, label: '4. Kesebangunan', short: 'Kesebangunan' },
    { id: 5, label: '5. Syarat Sebangun Segitiga', short: 'Syarat Sebangun' },
    { id: 6, label: '6. Kesebangunan Segiempat', short: 'Segiempat' },
    { id: 7, label: '7. Teorema & Rumus', short: 'Teorema & Rumus' },
    { id: 8, label: '8. Penerapan Sehari-hari', short: 'Penerapan' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold mb-2">
            <BookOpen className="w-3.5 h-3.5" />
            Buku Panduan Forensik Geometri
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Materi Kekongruenan & Kesebangunan
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Modul lengkap matematika kelas IX SMP berstandar kurikulum nasional dengan visualisasi interaktif.
          </p>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex overflow-x-auto py-3 gap-2 no-scrollbar border-b border-slate-200 sticky top-16 bg-slate-50/95 backdrop-blur z-20">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === tab.id
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Contents */}
      <div className="mt-6">
        {/* ======================= TAB 1: KEKONGRUENAN ======================= */}
        {activeTab === 1 && (
          <div className="space-y-8 animate-fadeIn">
            {/* Definition Box */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">📐</span>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Pengertian Kekongruenan</h2>
                  <span className="text-xs text-blue-600 font-mono font-bold">Notasi Resmi: F₁ ≅ F₂</span>
                </div>
              </div>
              <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
                Dua bangun datar dikatakan <strong>kongruen (≅)</strong> jika memiliki{' '}
                <span className="text-blue-600 font-semibold">bentuk dan ukuran yang sama persis</span>.
                Artinya, jika bangun satu ditumpukkan ke bangun kedua melalui transformasi kaku (isometri),
                keduanya akan saling menutup secara tepat (tepat berimpit).
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-4">
                  <h3 className="font-bold text-blue-900 text-sm flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600" />
                    Syarat 1: Sisi-Sisi Bersesuaian
                  </h3>
                  <p className="text-xs text-blue-800 mt-1">
                    Semua sisi yang bersesuaian (seletak) antara kedua bangun memiliki{' '}
                    <strong>panjang yang sama persis</strong>.
                  </p>
                </div>
                <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-4">
                  <h3 className="font-bold text-emerald-900 text-sm flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Syarat 2: Sudut-Sudut Bersesuaian
                  </h3>
                  <p className="text-xs text-emerald-800 mt-1">
                    Semua sudut yang bersesuaian (seletak) antara kedua bangun memiliki{' '}
                    <strong>besar sudut yang sama persis</strong>.
                  </p>
                </div>
              </div>

              <div className="mt-4 p-3 rounded-xl bg-slate-100 text-slate-700 text-xs sm:text-sm font-medium flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
                <span>
                  <strong>Kaidah Kunci:</strong> Kekongruenan merupakan bentuk khusus dari kesebangunan dengan faktor skala{' '}
                  <code className="font-mono bg-white px-1.5 py-0.5 rounded text-blue-700 border border-slate-300">k = 1</code>.
                </span>
              </div>
            </div>

            {/* Interactive Transform Sandbox: Translation, Rotation, Reflection */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <Move className="w-5 h-5 text-blue-600" />
                    Laboratorium Transformasi Isometri
                  </h3>
                  <p className="text-xs text-slate-500">
                    Buktikan bahwa <strong>Translasi</strong>, <strong>Rotasi</strong>, dan <strong>Refleksi</strong> mempertahankan kekongruenan (bentuk dan ukuran tidak berubah sama sekali).
                  </p>
                </div>
                <button
                  onClick={() => {
                    setTransX(120);
                    setTransY(0);
                    setTransRot(0);
                    setIsFlipped(false);
                  }}
                  className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 self-start sm:self-auto cursor-pointer"
                >
                  Reset Posisi
                </button>
              </div>

              {/* Canvas area */}
              <div className="h-64 sm:h-80 w-full bg-slate-950 rounded-xl relative overflow-hidden border border-slate-800 flex items-center justify-center">
                <svg className="w-full h-full" viewBox="0 0 460 260">
                  <defs>
                    <pattern id="isoGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(59, 130, 246, 0.15)" strokeWidth="1" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#isoGrid)" />

                  {/* Fixed Reference Triangle 1 (Blue) */}
                  <g transform="translate(60, 60)">
                    <polygon
                      points="10,130 110,130 10,40"
                      fill="rgba(59, 130, 246, 0.25)"
                      stroke="#3B82F6"
                      strokeWidth="2.5"
                    />
                    <text x="10" y="145" fill="#93C5FD" fontSize="11" fontWeight="bold">A</text>
                    <text x="115" y="145" fill="#93C5FD" fontSize="11" fontWeight="bold">B</text>
                    <text x="10" y="32" fill="#93C5FD" fontSize="11" fontWeight="bold">C</text>
                    <text x="60" y="145" fill="#BFDBFE" fontSize="10" textAnchor="middle">c = 4 cm</text>
                    <text x="2" y="90" fill="#BFDBFE" fontSize="10" textAnchor="end">a = 3 cm</text>
                    <text x="75" y="80" fill="#BFDBFE" fontSize="10">b = 5 cm</text>
                    <text x="50" y="15" fill="#60A5FA" fontSize="11" fontWeight="bold" textAnchor="middle">ΔABC (Acuan Tetap)</text>
                  </g>

                  {/* Transformed Triangle 2 (Emerald) */}
                  <g
                    transform={`translate(${180 + transX}, ${120 + transY}) rotate(${transRot}) scale(${isFlipped ? -1 : 1}, 1) translate(-60, -85)`}
                  >
                    <polygon
                      points="10,130 110,130 10,40"
                      fill="rgba(34, 197, 94, 0.3)"
                      stroke="#22C55E"
                      strokeWidth="2.5"
                    />
                    <text x="10" y="145" fill="#86EFAC" fontSize="11" fontWeight="bold">D</text>
                    <text x="115" y="145" fill="#86EFAC" fontSize="11" fontWeight="bold">E</text>
                    <text x="10" y="32" fill="#86EFAC" fontSize="11" fontWeight="bold">F</text>
                    <text x="60" y="145" fill="#BBF7D0" fontSize="10" textAnchor="middle">4 cm</text>
                    <text x="2" y="90" fill="#BBF7D0" fontSize="10" textAnchor="end">3 cm</text>
                    <text x="75" y="80" fill="#BBF7D0" fontSize="10">5 cm</text>
                  </g>

                  {/* Status Overlay */}
                  <g transform="translate(15, 20)">
                    <rect width="180" height="30" rx="6" fill="rgba(15, 23, 42, 0.85)" stroke="#334155" />
                    <text x="90" y="20" fill="#4ADE80" fontSize="11" fontWeight="bold" textAnchor="middle">
                      Status: KONGRUEN (k = 1.0)
                    </text>
                  </g>
                </svg>
              </div>

              {/* Controls */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
                {/* Translation slider */}
                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                    <span className="flex items-center gap-1">
                      <Move className="w-3.5 h-3.5 text-blue-600" />
                      Translasi (Geser Horisontal)
                    </span>
                    <span className="font-mono text-blue-600">{transX}px</span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="180"
                    value={transX}
                    onChange={(e) => setTransX(parseInt(e.target.value))}
                    className="w-full accent-blue-600 cursor-pointer"
                  />
                </div>

                {/* Rotation slider */}
                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                    <span className="flex items-center gap-1">
                      <RotateCw className="w-3.5 h-3.5 text-emerald-600" />
                      Rotasi (Putar Sudut)
                    </span>
                    <span className="font-mono text-emerald-600">{transRot}°</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="360"
                    step="15"
                    value={transRot}
                    onChange={(e) => setTransRot(parseInt(e.target.value))}
                    className="w-full accent-emerald-600 cursor-pointer"
                  />
                </div>

                {/* Reflection Toggle */}
                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                    <span className="flex items-center gap-1">
                      <FlipHorizontal className="w-3.5 h-3.5 text-purple-600" />
                      Refleksi (Pencerminan)
                    </span>
                    <span className="font-mono text-purple-600">{isFlipped ? 'Dicerminkan' : 'Normal'}</span>
                  </div>
                  <button
                    onClick={() => setIsFlipped(!isFlipped)}
                    className={`w-full py-1.5 px-3 text-xs font-bold rounded-lg border transition cursor-pointer ${
                      isFlipped
                        ? 'bg-purple-600 text-white border-purple-700'
                        : 'bg-white text-purple-700 border-purple-300 hover:bg-purple-50'
                    }`}
                  >
                    {isFlipped ? 'Kembalikan Asli' : 'Cerminkan Sumbu Vertikal'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ======================= TAB 2: SYARAT KEKONGRUENAN SEGITIGA ======================= */}
        {activeTab === 2 && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <h2 className="text-xl font-bold text-slate-900">5 Syarat / Kriteria Kekongruenan Segitiga</h2>
              <p className="text-sm text-slate-600 mt-1">
                Klik kartu di bawah ini untuk menelaah visualisasi, pengertian, informasi sisi/sudut, dan contoh kasusnya.
              </p>
            </div>

            {/* Clickable criteria selector cards */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {CONGRUENCE_CRITERIA.map((crit) => {
                const active = selectedCriterion.id === crit.id;
                return (
                  <div
                    key={crit.id}
                    onClick={() => {
                      soundManager.playClick();
                      setSelectedCriterion(crit);
                    }}
                    className={`p-4 rounded-xl border transition-all cursor-pointer text-center ${
                      active
                        ? 'bg-blue-600 text-white border-blue-700 shadow-md scale-102'
                        : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    <span className="text-xl sm:text-2xl font-black block tracking-tight font-mono">
                      {crit.code}
                    </span>
                    <span className="text-xs font-semibold mt-1 block truncate">
                      {crit.name}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Selected Detail Showcase Card */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
                <div>
                  <span className="text-xs font-mono font-extrabold text-blue-600 uppercase tracking-widest">
                    {selectedCriterion.fullName}
                  </span>
                  <h3 className="text-2xl font-extrabold text-slate-900 mt-0.5">
                    Kriteria {selectedCriterion.code}: {selectedCriterion.name}
                  </h3>
                </div>
                <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold self-start">
                  Syarat Terbukti Mutlak
                </span>
              </div>

              {/* Visual SVG for this criterion */}
              <div className="h-56 w-full bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-center p-4">
                <svg className="w-full h-full max-w-lg" viewBox="0 0 400 160">
                  {/* Triangle 1 */}
                  <g transform="translate(40, 20)">
                    <polygon
                      points="10,110 110,110 50,20"
                      fill="rgba(59, 130, 246, 0.2)"
                      stroke="#3B82F6"
                      strokeWidth="2.5"
                    />
                    <text x="5" y="125" fill="#93C5FD" fontSize="11" fontWeight="bold">A</text>
                    <text x="115" y="125" fill="#93C5FD" fontSize="11" fontWeight="bold">B</text>
                    <text x="50" y="12" fill="#93C5FD" fontSize="11" fontWeight="bold" textAnchor="middle">C</text>

                    {/* Marks based on criterion */}
                    {selectedCriterion.id === 'sss' && (
                      <>
                        <line x1="58" y1="106" x2="58" y2="114" stroke="#60A5FA" strokeWidth="2" />
                        <line x1="28" y1="62" x2="33" y2="67" stroke="#60A5FA" strokeWidth="2" />
                        <line x1="78" y1="62" x2="83" y2="67" stroke="#60A5FA" strokeWidth="2" />
                      </>
                    )}
                    {(selectedCriterion.id === 'sas' || selectedCriterion.id === 'asa') && (
                      <path d="M 25 110 A 15 15 0 0 0 20 100" fill="none" stroke="#FBBF24" strokeWidth="2" />
                    )}
                    {selectedCriterion.id === 'rhs' && (
                      <path d="M 10 95 L 25 95 L 25 110" fill="none" stroke="#34D399" strokeWidth="2" />
                    )}
                  </g>

                  {/* Congruence Symbol In Center */}
                  <text x="200" y="85" fill="#F8FAFC" fontSize="26" fontWeight="bold" textAnchor="middle">≅</text>
                  <text x="200" y="105" fill="#94A3B8" fontSize="10" textAnchor="middle" className="font-mono">
                    {selectedCriterion.code}
                  </text>

                  {/* Triangle 2 */}
                  <g transform="translate(240, 20)">
                    <polygon
                      points="10,110 110,110 50,20"
                      fill="rgba(34, 197, 94, 0.2)"
                      stroke="#22C55E"
                      strokeWidth="2.5"
                    />
                    <text x="5" y="125" fill="#86EFAC" fontSize="11" fontWeight="bold">D</text>
                    <text x="115" y="125" fill="#86EFAC" fontSize="11" fontWeight="bold">E</text>
                    <text x="50" y="12" fill="#86EFAC" fontSize="11" fontWeight="bold" textAnchor="middle">F</text>

                    {selectedCriterion.id === 'sss' && (
                      <>
                        <line x1="58" y1="106" x2="58" y2="114" stroke="#4ADE80" strokeWidth="2" />
                        <line x1="28" y1="62" x2="33" y2="67" stroke="#4ADE80" strokeWidth="2" />
                        <line x1="78" y1="62" x2="83" y2="67" stroke="#4ADE80" strokeWidth="2" />
                      </>
                    )}
                    {(selectedCriterion.id === 'sas' || selectedCriterion.id === 'asa') && (
                      <path d="M 25 110 A 15 15 0 0 0 20 100" fill="none" stroke="#FBBF24" strokeWidth="2" />
                    )}
                    {selectedCriterion.id === 'rhs' && (
                      <path d="M 10 95 L 25 95 L 25 110" fill="none" stroke="#34D399" strokeWidth="2" />
                    )}
                  </g>
                </svg>
              </div>

              {/* Text explanations */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-bold text-slate-900 text-sm">Pengertian & Aturan:</h4>
                  <p className="text-slate-700 text-sm leading-relaxed">{selectedCriterion.description}</p>
                  <p className="text-slate-600 text-xs leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200">
                    {selectedCriterion.details}
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="font-bold text-slate-900 text-sm">Contoh Nyata Kasus:</h4>
                  <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-xl text-xs sm:text-sm text-blue-900 leading-relaxed">
                    {selectedCriterion.example}
                  </div>
                  <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl text-xs sm:text-sm text-emerald-900 leading-relaxed font-medium">
                    <strong>Kesimpulan Detektif:</strong> {selectedCriterion.conclusion}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ======================= TAB 3: SIFAT KEKONGRUENAN ======================= */}
        {activeTab === 3 && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Sifat-Sifat Relasi Kekongruenan</h2>
              <p className="text-sm text-slate-600 mt-1">
                Kekongruenan merupakan relasi ekuivalensi yang memenuhi sifat refleksif, simetris, dan transitif, serta kaidah CPCTC.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Sifat Refleksif */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-base text-slate-900">1. Sifat Refleksif</h3>
                  <span className="font-mono text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                    A ≅ A
                  </span>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Setiap bangun datar selalu kongruen dengan dirinya sendiri. Ukuran sisi dan sudut suatu bangun identik dengan bangun itu sendiri.
                </p>
                <div className="bg-slate-50 p-3 rounded-lg text-xs font-mono text-slate-700">
                  ΔABC ≅ ΔABC (karena sisi dan sudutnya sama dengan dirinya sendiri).
                </div>
              </div>

              {/* Sifat Simetris */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-base text-slate-900">2. Sifat Simetris</h3>
                  <span className="font-mono text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                    A ≅ B ⟹ B ≅ A
                  </span>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Jika bangun A kongruen dengan bangun B, maka bangun B pasti kongruen dengan bangun A. Hubungan kekongruenan berlaku dua arah tanpa kecuali.
                </p>
                <div className="bg-slate-50 p-3 rounded-lg text-xs font-mono text-slate-700">
                  Jika ΔABC ≅ ΔDEF, maka ΔDEF ≅ ΔABC.
                </div>
              </div>

              {/* Sifat Transitif */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-base text-slate-900">3. Sifat Transitif</h3>
                  <span className="font-mono text-xs font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded">
                    A ≅ B & B ≅ C ⟹ A ≅ C
                  </span>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Jika bangun A kongruen dengan bangun B, dan bangun B kongruen dengan bangun C, maka bangun A pasti kongruen dengan bangun C.
                </p>
                <div className="bg-slate-50 p-3 rounded-lg text-xs font-mono text-slate-700">
                  Jika Δ1 ≅ Δ2 dan Δ2 ≅ Δ3, maka Δ1 ≅ Δ3.
                </div>
              </div>

              {/* CPCTC */}
              <div className="bg-gradient-to-br from-blue-900 to-indigo-950 text-white rounded-2xl p-5 shadow-md space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-base text-amber-300">4. Kaidah CPCTC</h3>
                  <span className="font-mono text-xs font-bold text-blue-200 bg-blue-800/80 px-2 py-0.5 rounded">
                    Golden Rule
                  </span>
                </div>
                <p className="text-sm text-blue-100 leading-relaxed">
                  <strong>CPCTC</strong> singkatan dari <em>Corresponding Parts of Congruent Triangles are Congruent</em>.
                  Artinya: Bagian-bagian yang bersesuaian dari segitiga-segitiga yang kongruen memiliki ukuran yang sama persis.
                </p>
                <div className="bg-blue-950/80 p-3 rounded-lg text-xs text-blue-200 leading-relaxed">
                  Begitu Anda membuktikan dua segitiga kongruen (misal via SSS), seluruh 3 sudut dan 3 sisi lainnya otomatis terbukti sama besar!
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ======================= TAB 4: KESEBANGUNAN ======================= */}
        {activeTab === 4 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🔍</span>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Pengertian Kesebangunan</h2>
                  <span className="text-xs text-blue-600 font-mono font-bold">Notasi Resmi: F₁ ~ F₂</span>
                </div>
              </div>
              <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
                Dua bangun datar dikatakan <strong>sebangun (~)</strong> jika memiliki{' '}
                <span className="text-blue-600 font-semibold">bentuk yang sama persis</span>, tetapi{' '}
                <span className="text-amber-600 font-semibold">ukurannya tidak harus sama</span>.
                Bentuk yang satu merupakan perbesaran atau pengecilan proporsional dari bentuk lainnya.
              </p>

              {/* 2 Requirements */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
                  <h3 className="font-bold text-amber-900 text-sm flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-600" />
                    Syarat 1: Sudut-Sudut Bersesuaian
                  </h3>
                  <p className="text-xs text-amber-800 mt-1">
                    Semua sudut yang bersesuaian memiliki <strong>besar yang sama persis (∠A = ∠D, ∠B = ∠E, ∠C = ∠F)</strong>.
                  </p>
                </div>
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
                  <h3 className="font-bold text-blue-900 text-sm flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600" />
                    Syarat 2: Sisi-Sisi Bersesuaian
                  </h3>
                  <p className="text-xs text-blue-800 mt-1">
                    Semua sisi yang bersesuaian memiliki <strong>perbandingan / rasio yang sama (faktor skala k konstan)</strong>.
                  </p>
                </div>
              </div>
            </div>

            {/* Scale Factor and Ratios Formulas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-2">
                <span className="text-xs font-mono font-bold text-blue-600 uppercase">Faktor Skala (k)</span>
                <h4 className="font-extrabold text-base text-slate-900">Rumus Sisi Baru</h4>
                <div className="p-3 bg-slate-50 rounded-xl font-mono text-xs text-slate-800 border border-slate-200">
                  k = sisi bangun 2 / sisi bangun 1<br />
                  Sisi Baru = k × Sisi Asli
                </div>
                <p className="text-xs text-slate-500">
                  Jika k &gt; 1: diperbesar. Jika 0 &lt; k &lt; 1: diperkecil. Jika k = 1: kongruen.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-2">
                <span className="text-xs font-mono font-bold text-emerald-600 uppercase">Perbandingan Keliling</span>
                <h4 className="font-extrabold text-base text-slate-900">Rasio Keliling Linear</h4>
                <div className="p-3 bg-slate-50 rounded-xl font-mono text-xs text-slate-800 border border-slate-200">
                  K₂ / K₁ = k
                </div>
                <p className="text-xs text-slate-500">
                  Perbandingan keliling dua bangun sebangun sama persis dengan faktor skala panjang sisinya.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-2">
                <span className="text-xs font-mono font-bold text-purple-600 uppercase">Perbandingan Luas</span>
                <h4 className="font-extrabold text-base text-slate-900">Rasio Kuadratis (k²)</h4>
                <div className="p-3 bg-slate-50 rounded-xl font-mono text-xs text-slate-800 border border-slate-200">
                  L₂ / L₁ = k² = (s₂ / s₁)²
                </div>
                <p className="text-xs text-slate-500">
                  Jika sisi diperbesar 2 kali, luasnya menjadi 2² = 4 kali lipat!
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ======================= TAB 5: SYARAT KESEBANGUNAN SEGITIGA ======================= */}
        {activeTab === 5 && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <h2 className="text-xl font-bold text-slate-900">3 Syarat Kesebangunan Segitiga</h2>
              <p className="text-sm text-slate-600 mt-1">
                Cukup penuhi salah satu dari ketiga kriteria berikut untuk membuktikan dua buah segitiga sebangun.
              </p>
            </div>

            <div className="space-y-4">
              {SIMILARITY_CRITERIA.map((crit, idx) => (
                <div
                  key={crit.id}
                  className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3 mb-3">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 font-black text-sm flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <h3 className="font-extrabold text-base sm:text-lg text-slate-900">
                        {crit.code}: {crit.name}
                      </h3>
                    </div>
                    <span className="font-mono text-xs text-blue-700 bg-blue-50 px-2.5 py-1 rounded border border-blue-200 self-start sm:self-auto font-bold">
                      {crit.mathFormula}
                    </span>
                  </div>
                  <p className="text-slate-700 text-sm leading-relaxed mb-3">{crit.description}</p>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-700">
                    <span className="font-bold text-blue-800">Contoh Penerapan:</span> {crit.example}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======================= TAB 6: KESEBANGUNAN SEGIEMPAT ======================= */}
        {activeTab === 6 && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Kesebangunan pada Segiempat</h2>
              <p className="text-sm text-slate-600 mt-1">
                PENTING: Pada segitiga, kesamaan sudut saja (AA) sudah menjamin kesebangunan. Namun pada segiempat,{' '}
                <strong className="text-rose-600">KEDUA syarat (sudut sama DAN sisi sebanding) HARUS diuji sekaligus!</strong>
              </p>
            </div>

            {/* Properties Comparison Table */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-[#17324D] text-white text-xs uppercase font-mono tracking-wider">
                    <tr>
                      <th className="p-3.5 sm:p-4">Bangun Datar</th>
                      <th className="p-3.5 sm:p-4">Selalu Sebangun?</th>
                      <th className="p-3.5 sm:p-4">Syarat Sudut</th>
                      <th className="p-3.5 sm:p-4">Syarat Perbandingan Sisi</th>
                      <th className="p-3.5 sm:p-4">Catatan Detektif</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {QUADRILATERAL_PROPERTIES.map((q, idx) => (
                      <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/60'}>
                        <td className="p-3.5 sm:p-4 font-bold text-slate-900 whitespace-nowrap">
                          {q.name}
                        </td>
                        <td className="p-3.5 sm:p-4 whitespace-nowrap">
                          {q.alwaysSimilar ? (
                            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs">
                              ✓ Selalu Sebangun
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold text-xs">
                              ✕ Belum Tentu
                            </span>
                          )}
                        </td>
                        <td className="p-3.5 sm:p-4 text-xs">{q.angleCondition}</td>
                        <td className="p-3.5 sm:p-4 text-xs">{q.sideCondition}</td>
                        <td className="p-3.5 sm:p-4 text-xs text-slate-500">{q.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ======================= TAB 7: TEOREMA DAN RUMUS PENTING ======================= */}
        {activeTab === 7 && (
          <div className="space-y-8 animate-fadeIn">
            {/* Teorema Thales with Interactive Slider */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div>
                  <span className="text-xs font-mono font-bold text-blue-600 uppercase">Teorema Klasik 1</span>
                  <h3 className="text-lg font-extrabold text-slate-900">
                    Teorema Thales (Garis Sejajar Sisi Segitiga)
                  </h3>
                </div>
                <span className="text-xs font-mono bg-blue-50 text-blue-700 px-3 py-1 rounded font-bold border border-blue-200 self-start sm:self-auto">
                  DE ∥ BC ⟹ AD/DB = AE/EC
                </span>
              </div>

              <p className="text-sm text-slate-700 leading-relaxed">
                Jika sebuah garis sejajar dengan salah satu sisi segitiga memotong dua sisi lainnya, maka garis tersebut membagi kedua sisi menjadi segmen-segmen yang sebanding:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                {/* SVG Visualizer */}
                <div className="h-60 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-center p-2 relative overflow-hidden">
                  <svg className="w-full h-full max-w-sm" viewBox="0 0 300 200">
                    {/* Big Triangle ABC: A(150, 20), B(30, 180), C(270, 180) */}
                    {/* Cut Line DE at factor thalesPos */}
                    {/* D = A + (B - A)*thalesPos = (150 - 120*pos, 20 + 160*pos) */}
                    {/* E = A + (C - A)*thalesPos = (150 + 120*pos, 20 + 160*pos) */}
                    {(() => {
                      const Ax = 150, Ay = 25;
                      const Bx = 40, By = 175;
                      const Cx = 260, Cy = 175;
                      const Dx = Ax + (Bx - Ax) * thalesPos;
                      const Dy = Ay + (By - Ay) * thalesPos;
                      const Ex = Ax + (Cx - Ax) * thalesPos;
                      const Ey = Ay + (Cy - Ay) * thalesPos;

                      return (
                        <g>
                          {/* Triangle ABC */}
                          <polygon
                            points={`${Ax},${Ay} ${Bx},${By} ${Cx},${Cy}`}
                            fill="rgba(59, 130, 246, 0.15)"
                            stroke="#3B82F6"
                            strokeWidth="2.5"
                          />
                          {/* Parallel Line DE */}
                          <line
                            x1={Dx}
                            y1={Dy}
                            x2={Ex}
                            y2={Ey}
                            stroke="#EAB308"
                            strokeWidth="3"
                            strokeDasharray="4 2"
                          />
                          {/* Parallel arrow markers */}
                          <path
                            d={`M ${Bx + 110} 175 L ${Bx + 115} 170 M ${Bx + 110} 175 L ${Bx + 115} 180`}
                            stroke="#60A5FA"
                            strokeWidth="2"
                          />
                          <path
                            d={`M ${(Dx + Ex) / 2} ${Dy} L ${(Dx + Ex) / 2 + 5} ${Dy - 5} M ${(Dx + Ex) / 2} ${Dy} L ${(Dx + Ex) / 2 + 5} ${Dy + 5}`}
                            stroke="#FDE047"
                            strokeWidth="2"
                          />

                          {/* Points */}
                          <circle cx={Ax} cy={Ay} r="4" fill="#60A5FA" />
                          <circle cx={Bx} cy={By} r="4" fill="#60A5FA" />
                          <circle cx={Cx} cy={Cy} r="4" fill="#60A5FA" />
                          <circle cx={Dx} cy={Dy} r="4" fill="#FACC15" />
                          <circle cx={Ex} cy={Ey} r="4" fill="#FACC15" />

                          {/* Labels */}
                          <text x={Ax} y={Ay - 8} fill="#93C5FD" fontSize="12" fontWeight="bold" textAnchor="middle">A</text>
                          <text x={Bx - 10} y={By + 5} fill="#93C5FD" fontSize="12" fontWeight="bold">B</text>
                          <text x={Cx + 10} y={By + 5} fill="#93C5FD" fontSize="12" fontWeight="bold">C</text>
                          <text x={Dx - 15} y={Dy + 4} fill="#FDE047" fontSize="12" fontWeight="bold">D</text>
                          <text x={Ex + 15} y={Ey + 4} fill="#FDE047" fontSize="12" fontWeight="bold">E</text>

                          {/* Segments ratio live */}
                          <text x={150} y={193} fill="#94A3B8" fontSize="10" textAnchor="middle" className="font-mono">
                            BC (Alas) sejajar DE
                          </text>
                        </g>
                      );
                    })()}
                  </svg>
                </div>

                {/* Slider and Interactive Math Values */}
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-semibold text-slate-700">
                      <span>Geser Posisi Garis DE (Tinggi):</span>
                      <span className="font-mono text-blue-600 font-bold">{Math.round(thalesPos * 100)}%</span>
                    </div>
                    <input
                      type="range"
                      min="0.25"
                      max="0.85"
                      step="0.05"
                      value={thalesPos}
                      onChange={(e) => setThalesPos(parseFloat(e.target.value))}
                      className="w-full accent-blue-600 cursor-pointer"
                    />
                  </div>

                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 text-xs font-mono">
                    <div className="text-slate-600">
                      Rasio Pembagian Sisi:
                    </div>
                    <div className="text-blue-700 font-bold">
                      AD / AB = AE / AC = DE / BC = {thalesPos.toFixed(2)}
                    </div>
                    <div className="text-emerald-700 font-bold">
                      AD / DB = AE / EC = {(thalesPos / (1 - thalesPos)).toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Garis Tinggi Segitiga Siku-siku */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div>
                  <span className="text-xs font-mono font-bold text-emerald-600 uppercase">Teorema Klasik 2</span>
                  <h3 className="text-lg font-extrabold text-slate-900">
                    Garis Tinggi pada Segitiga Siku-siku
                  </h3>
                </div>
                <span className="text-xs font-mono bg-emerald-50 text-emerald-700 px-3 py-1 rounded font-bold border border-emerald-200 self-start sm:self-auto">
                  CD² = AD × DB
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                {/* Formulas List */}
                <div className="space-y-3">
                  <p className="text-sm text-slate-700 leading-relaxed">
                    Pada segitiga siku-siku ABC dengan sudut 90° di C, garis tinggi CD membagi hipotenusa AB menjadi segmen AD dan DB:
                  </p>
                  <div className="space-y-2">
                    <div className="p-2.5 bg-blue-50 border border-blue-200 rounded-lg text-xs font-mono text-blue-900">
                      <strong>1. Tinggi kuadrat:</strong> CD² = AD × DB  ⟹  CD = √(AD × DB)
                    </div>
                    <div className="p-2.5 bg-indigo-50 border border-indigo-200 rounded-lg text-xs font-mono text-indigo-900">
                      <strong>2. Sisi tegak kiri:</strong> AC² = AD × AB  ⟹  AC = √(AD × AB)
                    </div>
                    <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg text-xs font-mono text-emerald-900">
                      <strong>3. Sisi tegak kanan:</strong> BC² = DB × AB  ⟹  BC = √(DB × AB)
                    </div>
                  </div>
                </div>

                {/* Interactive Altitude Calculator */}
                <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-3">
                  <h4 className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                    <Calculator className="w-4 h-4 text-blue-600" />
                    Kalkulator Interaktif Garis Tinggi
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-slate-600 block mb-1">Panjang AD (cm):</label>
                      <input
                        type="number"
                        min="1"
                        max="20"
                        value={altAD}
                        onChange={(e) => setAltAD(Math.max(1, parseFloat(e.target.value) || 1))}
                        className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-600 block mb-1">Panjang DB (cm):</label>
                      <input
                        type="number"
                        min="1"
                        max="20"
                        value={altDB}
                        onChange={(e) => setAltDB(Math.max(1, parseFloat(e.target.value) || 1))}
                        className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-mono"
                      />
                    </div>
                  </div>

                  {(() => {
                    const ab = altAD + altDB;
                    const cd = Math.sqrt(altAD * altDB);
                    const ac = Math.sqrt(altAD * ab);
                    const bc = Math.sqrt(altDB * ab);
                    return (
                      <div className="bg-white p-3 rounded-lg border border-slate-200 text-xs font-mono space-y-1">
                        <div>Panjang AB = {altAD} + {altDB} = <strong>{ab} cm</strong></div>
                        <div className="text-blue-700">CD = √({altAD} × {altDB}) = <strong>{cd.toFixed(2)} cm</strong></div>
                        <div className="text-indigo-700">AC = √({altAD} × {ab}) = <strong>{ac.toFixed(2)} cm</strong></div>
                        <div className="text-emerald-700">BC = √({altDB} × {ab}) = <strong>{bc.toFixed(2)} cm</strong></div>
                      </div>
                    );
                  })()}
                </div>
              </div>
            </div>

            {/* Other Theorems: Pythagoras, Area Ratio, Midsegment */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-2">
                <span className="text-xs font-mono font-bold text-amber-600 uppercase">Teorema Pythagoras</span>
                <h4 className="font-extrabold text-base text-slate-900">AC² + BC² = AB²</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Pada segitiga siku-siku, kuadrat sisi miring (hipotenusa) sama dengan jumlah kuadrat kedua sisi siku-sikunya.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-2">
                <span className="text-xs font-mono font-bold text-purple-600 uppercase">Perbandingan Luas</span>
                <h4 className="font-extrabold text-base text-slate-900">L₂ / L₁ = k²</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Luas bangun sebangun berbanding lurus dengan kuadrat faktor skala k. Sangat penting saat menghitung luas foto atau ubin.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-2">
                <span className="text-xs font-mono font-bold text-emerald-600 uppercase">Garis Tengah Trapesium</span>
                <h4 className="font-extrabold text-base text-slate-900">Midsegment = (a + b) / 2</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Panjang garis yang menghubungkan titik tengah kedua kaki trapesium sama dengan rata-rata panjang kedua sisi sejajarnya.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ======================= TAB 8: PENERAPAN DALAM KEHIDUPAN SEHARI-HARI ======================= */}
        {activeTab === 8 && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <h2 className="text-xl font-bold text-slate-900">6 Penerapan dalam Kehidupan Sehari-hari</h2>
              <p className="text-sm text-slate-600 mt-1">
                Eksplorasi bagaimana konsep kekongruenan dan kesebangunan dipakai dalam kasus investigasi nyata, arsitektur, dan navigasi.
                Cobalah mengubah angka input pada kalkulator interaktif di tiap studi kasus!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {REAL_LIFE_SCENARIOS.map((sc) => {
                const currentVals = scenarioInputs[sc.id] || {};
                const currentAnswer = sc.interactiveQuestion.calcAnswer(currentVals);
                const explanation = sc.interactiveQuestion.explanationTemplate(currentVals, currentAnswer);

                return (
                  <div
                    key={sc.id}
                    className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wide bg-blue-50 px-2 py-0.5 rounded">
                          {sc.category}
                        </span>
                        <span className="text-lg">
                          {sc.illustrationType === 'tree' && '🌲'}
                          {sc.illustrationType === 'map' && '🗺️'}
                          {sc.illustrationType === 'photo' && '📷'}
                          {sc.illustrationType === 'tile' && '🔲'}
                          {sc.illustrationType === 'pattern' && '🎨'}
                          {sc.illustrationType === 'blueprint' && '🏗️'}
                        </span>
                      </div>
                      <h3 className="font-extrabold text-base sm:text-lg text-slate-900">{sc.title}</h3>
                      <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">{sc.story}</p>
                      
                      <div className="mt-3 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700">
                        <span className="font-bold text-slate-900 block mb-0.5">Konsep Matematika:</span>
                        {sc.concept}
                      </div>
                    </div>

                    {/* Interactive Widget Box */}
                    <div className="bg-slate-900 text-white rounded-xl p-4 space-y-3">
                      <div className="flex items-center justify-between text-xs text-blue-300 font-semibold border-b border-slate-800 pb-2">
                        <span>{sc.interactiveQuestion.questionText}</span>
                        <Calculator className="w-3.5 h-3.5 text-amber-400" />
                      </div>

                      {/* Dynamic Inputs */}
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        {sc.interactiveQuestion.inputs.map((inp) => (
                          <div key={inp.key}>
                            <label className="text-[11px] text-slate-400 block mb-0.5">{inp.label}:</label>
                            <div className="flex items-center bg-slate-800 rounded px-2 py-1 border border-slate-700">
                              <input
                                type="number"
                                value={currentVals[inp.key] ?? inp.defaultValue}
                                onChange={(e) => {
                                  const val = parseFloat(e.target.value) || 0;
                                  setScenarioInputs((prev) => ({
                                    ...prev,
                                    [sc.id]: {
                                      ...prev[sc.id],
                                      [inp.key]: val,
                                    },
                                  }));
                                }}
                                className="w-full bg-transparent font-mono text-white text-xs outline-none"
                              />
                              {inp.unit && <span className="text-slate-400 text-[10px] ml-1">{inp.unit}</span>}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Calculated Result Display */}
                      <div className="bg-blue-950/70 border border-blue-500/40 rounded-lg p-2.5 flex items-center justify-between text-xs">
                        <span className="text-blue-200">Hasil Perhitungan:</span>
                        <span className="font-mono font-bold text-emerald-400 text-sm">
                          {currentAnswer}
                        </span>
                      </div>

                      <p className="text-[11px] text-slate-400 leading-normal italic">
                        {explanation}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
