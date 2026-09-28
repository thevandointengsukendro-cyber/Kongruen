import React, { useState } from 'react';
import { soundManager } from '../utils/audio';
import {
  FlaskConical,
  Scale,
  Maximize2,
  RotateCw,
  Sliders,
  CheckCircle2,
  XCircle,
  Shapes,
  RefreshCw,
} from 'lucide-react';

export const GeometryLab: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState<'congruence' | 'similarity' | 'quadrilateral'>('congruence');

  // ==================== FEATURE 1: DETEKSI KONGRUENSI ====================
  // Triangle 1 ABC: Base length b1, height h1, offset x1
  const [tri1Base, setTri1Base] = useState<number>(8); // cm
  const [tri1Height, setTri1Height] = useState<number>(6); // cm
  const [tri1ApexOffset, setTri1ApexOffset] = useState<number>(2); // Apex X offset from left

  // Triangle 2 DEF: Base length b2, height h2, offset x2, rotation angle
  const [tri2Base, setTri2Base] = useState<number>(8);
  const [tri2Height, setTri2Height] = useState<number>(6);
  const [tri2ApexOffset, setTri2ApexOffset] = useState<number>(2);
  const [tri2Rotation, setTri2Rotation] = useState<number>(0);

  // Compute lengths of sides for Tri 1
  const s1_a = tri1Base;
  const s1_b = Math.hypot(tri1ApexOffset, tri1Height);
  const s1_c = Math.hypot(tri1Base - tri1ApexOffset, tri1Height);

  // Compute lengths of sides for Tri 2
  const s2_a = tri2Base;
  const s2_b = Math.hypot(tri2ApexOffset, tri2Height);
  const s2_c = Math.hypot(tri2Base - tri2ApexOffset, tri2Height);

  // Compute angles using Law of Cosines for Tri 1
  const calcAngle = (a: number, b: number, c: number) => {
    const cosVal = (b * b + c * c - a * a) / (2 * b * c);
    return (Math.acos(Math.max(-1, Math.min(1, cosVal))) * 180) / Math.PI;
  };

  const angle1_A = calcAngle(s1_c, s1_a, s1_b);
  const angle1_B = calcAngle(s1_b, s1_a, s1_c);
  const angle1_C = 180 - angle1_A - angle1_B;

  const angle2_D = calcAngle(s2_c, s2_a, s2_b);
  const angle2_E = calcAngle(s2_b, s2_a, s2_c);
  const angle2_F = 180 - angle2_D - angle2_E;

  const sidesEqual =
    Math.abs(s1_a - s2_a) < 0.05 &&
    Math.abs(s1_b - s2_b) < 0.05 &&
    Math.abs(s1_c - s2_c) < 0.05;

  const anglesEqual =
    Math.abs(angle1_A - angle2_D) < 0.5 &&
    Math.abs(angle1_B - angle2_E) < 0.5 &&
    Math.abs(angle1_C - angle2_F) < 0.5;

  const isCongruent = sidesEqual && anglesEqual;

  // ==================== FEATURE 2: DETEKSI KESEBANGUNAN ====================
  const [scaleFactor, setScaleFactor] = useState<number>(1.5);
  // Base triangle for similarity: sides 3, 4, 5
  const baseSides = [3, 4, 5];
  const simSidesA = baseSides;
  const simSidesB = baseSides.map((s) => parseFloat((s * scaleFactor).toFixed(1)));
  const simRatio1 = (simSidesB[0] / simSidesA[0]).toFixed(2);
  const simRatio2 = (simSidesB[1] / simSidesA[1]).toFixed(2);
  const simRatio3 = (simSidesB[2] / simSidesA[2]).toFixed(2);
  const isScaleCongruent = Math.abs(scaleFactor - 1.0) < 0.01;

  // ==================== FEATURE 3: PERBANDINGAN SEGIEMPAT ====================
  const [quadType, setQuadType] = useState<
    'square' | 'rectangle' | 'parallelogram' | 'rhombus' | 'trapezoid' | 'kite'
  >('rectangle');

  // Quad 1 params
  const [q1W, setQ1W] = useState<number>(6);
  const [q1H, setQ1H] = useState<number>(4);
  const [q1Angle, setQ1Angle] = useState<number>(60); // for parallelogram / rhombus

  // Quad 2 params
  const [q2W, setQ2W] = useState<number>(12);
  const [q2H, setQ2H] = useState<number>(8);
  const [q2Angle, setQ2Angle] = useState<number>(60);

  // Compute quadrilateral similarity
  const checkQuadSimilarity = () => {
    if (quadType === 'square') {
      const isCong = Math.abs(q1W - q2W) < 0.05;
      return {
        similar: true,
        congruent: isCong,
        reason: isCong
          ? 'Persegi kongruen sempurna (k = 1, semua sisi sama, semua sudut 90°).'
          : `Kedua persegi SEBANGUN dengan faktor skala k = ${(q2W / q1W).toFixed(2)}. Semua sudut 90°.`,
      };
    }
    if (quadType === 'rectangle') {
      const ratioW = q2W / q1W;
      const ratioH = q2H / q1H;
      const similar = Math.abs(ratioW - ratioH) < 0.05;
      const congruent = similar && Math.abs(ratioW - 1) < 0.05;
      return {
        similar,
        congruent,
        reason: congruent
          ? 'Kongruen sempurna: ukuran panjang dan lebar sama persis.'
          : similar
          ? `SEBANGUN: Rasio panjang (${q2W}/${q1W} = ${ratioW.toFixed(2)}) sama dengan rasio lebar (${q2H}/${q1H} = ${ratioH.toFixed(2)}).`
          : `TIDAK SEBANGUN: Rasio panjang (${(q2W / q1W).toFixed(2)}) berbeda dengan rasio lebar (${(q2H / q1H).toFixed(2)}).`,
      };
    }
    if (quadType === 'parallelogram') {
      const ratioW = q2W / q1W;
      const ratioH = q2H / q1H;
      const anglesMatch = Math.abs(q1Angle - q2Angle) < 1;
      const sidesProp = Math.abs(ratioW - ratioH) < 0.05;
      const similar = anglesMatch && sidesProp;
      const congruent = similar && Math.abs(ratioW - 1) < 0.05;
      return {
        similar,
        congruent,
        reason: congruent
          ? 'Kongruen sempurna: Sisi dan sudut jajaran genjang sama persis.'
          : similar
          ? `SEBANGUN: Sudut sama (${q1Angle}°) dan rasio kedua pasang sisi sebanding (${ratioW.toFixed(2)}).`
          : `TIDAK SEBANGUN: ${!anglesMatch ? `Sudut berbeda (${q1Angle}° vs ${q2Angle}°)` : 'Rasio sisi tidak sebanding'}.`,
      };
    }
    if (quadType === 'rhombus') {
      const anglesMatch = Math.abs(q1Angle - q2Angle) < 1;
      const ratio = q2W / q1W;
      const congruent = anglesMatch && Math.abs(ratio - 1) < 0.05;
      return {
        similar: anglesMatch,
        congruent,
        reason: congruent
          ? 'Kongruen sempurna: Sudut dan panjang sisi sama.'
          : anglesMatch
          ? `SEBANGUN: Sudut bersesuaian sama besar (${q1Angle}°) dan semua sisi seimbang (k = ${ratio.toFixed(2)}).`
          : `TIDAK SEBANGUN: Sudut belah ketupat berbeda (${q1Angle}° vs ${q2Angle}°).`,
      };
    }
    // Default fallback for trapezoid / kite
    const ratioW = q2W / q1W;
    const ratioH = q2H / q1H;
    const similar = Math.abs(ratioW - ratioH) < 0.05;
    const congruent = similar && Math.abs(ratioW - 1) < 0.05;
    return {
      similar,
      congruent,
      reason: congruent
        ? 'Kongruen sempurna.'
        : similar
        ? `Sebangun dengan rasio k = ${ratioW.toFixed(2)}.`
        : 'Tidak sebangun karena proporsi sisi dan sudut berbeda.',
    };
  };

  const quadResult = checkQuadSimilarity();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-2">
            <FlaskConical className="w-3.5 h-3.5" />
            Laboratorium Forensik Interaktif
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Laboratorium Geometri
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Eksperimen langsung memanipulasi koordinat bangun datar, menguji kekongruenan dan kesebangunan secara analitis.
          </p>
        </div>

        {/* Feature Switcher */}
        <div className="flex items-center gap-1.5 bg-slate-200/80 p-1 rounded-xl">
          <button
            onClick={() => {
              soundManager.playClick();
              setActiveFeature('congruence');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
              activeFeature === 'congruence'
                ? 'bg-white text-blue-700 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            1. Deteksi Kongruensi
          </button>
          <button
            onClick={() => {
              soundManager.playClick();
              setActiveFeature('similarity');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
              activeFeature === 'similarity'
                ? 'bg-white text-blue-700 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            2. Deteksi Kesebangunan
          </button>
          <button
            onClick={() => {
              soundManager.playClick();
              setActiveFeature('quadrilateral');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
              activeFeature === 'quadrilateral'
                ? 'bg-white text-blue-700 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            3. Perbandingan Segiempat
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* FEATURE 1: DETEKSI KONGRUENSI */}
      {/* ========================================================================= */}
      {activeFeature === 'congruence' && (
        <div className="space-y-6">
          {/* Status Banner */}
          <div
            className={`p-4 rounded-2xl border flex items-center justify-between ${
              isCongruent
                ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                : 'bg-amber-50 border-amber-300 text-amber-900'
            }`}
          >
            <div className="flex items-center gap-3">
              {isCongruent ? (
                <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
              ) : (
                <XCircle className="w-6 h-6 text-amber-600 shrink-0" />
              )}
              <div>
                <h3 className="font-extrabold text-base">
                  STATUS: {isCongruent ? 'KEDUA SEGITIGA KONGRUEN (ΔABC ≅ ΔDEF)' : 'TIDAK KONGRUEN'}
                </h3>
                <p className="text-xs mt-0.5">
                  {isCongruent
                    ? 'Bentuk dan ukuran sama persis. Ketiga pasang sisi sama panjang dan ketiga sudut sama besar.'
                    : 'Panjang sisi atau sudut bersesuaian masih memiliki perbedaan ukuran.'}
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                setTri2Base(tri1Base);
                setTri2Height(tri1Height);
                setTri2ApexOffset(tri1ApexOffset);
                soundManager.playCorrect();
              }}
              className="hidden sm:block px-3 py-1.5 text-xs font-bold rounded-lg bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 cursor-pointer shadow-sm"
            >
              Samakan Ukuran (Jadikan Kongruen)
            </button>
          </div>

          {/* Interactive Visual Canvas */}
          <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800">
            <div className="h-64 sm:h-80 w-full relative flex items-center justify-center">
              <svg className="w-full h-full" viewBox="0 0 500 240">
                <defs>
                  <pattern id="labGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#labGrid)" />

                {/* Triangle 1 ABC */}
                {/* Scale factor for drawing: 1 cm = 14 px */}
                {(() => {
                  const scale = 14;
                  const ox = 50, oy = 180;
                  const pA = { x: ox, y: oy };
                  const pB = { x: ox + tri1Base * scale, y: oy };
                  const pC = { x: ox + tri1ApexOffset * scale, y: oy - tri1Height * scale };

                  return (
                    <g>
                      <polygon
                        points={`${pA.x},${pA.y} ${pB.x},${pB.y} ${pC.x},${pC.y}`}
                        fill="rgba(59, 130, 246, 0.25)"
                        stroke="#3B82F6"
                        strokeWidth="2.5"
                      />
                      {/* Vertex circles */}
                      <circle cx={pA.x} cy={pA.y} r="4" fill="#60A5FA" />
                      <circle cx={pB.x} cy={pB.y} r="4" fill="#60A5FA" />
                      <circle cx={pC.x} cy={pC.y} r="4" fill="#60A5FA" />
                      {/* Labels */}
                      <text x={pA.x - 8} y={pA.y + 16} fill="#93C5FD" fontSize="12" fontWeight="bold">A</text>
                      <text x={pB.x + 4} y={pB.y + 16} fill="#93C5FD" fontSize="12" fontWeight="bold">B</text>
                      <text x={pC.x} y={pC.y - 8} fill="#93C5FD" fontSize="12" fontWeight="bold" textAnchor="middle">C</text>
                      <text x={(pA.x + pB.x) / 2} y={oy + 14} fill="#BFDBFE" fontSize="10" textAnchor="middle">
                        c = {tri1Base} cm
                      </text>
                      <text x={ox + 20} y={oy - tri1Height * scale * 0.7} fill="#60A5FA" fontSize="11" fontWeight="bold">
                        ΔABC
                      </text>
                    </g>
                  );
                })()}

                {/* Center Symbol */}
                <text x="250" y="115" fill={isCongruent ? '#4ADE80' : '#F87171'} fontSize="28" fontWeight="black" textAnchor="middle">
                  {isCongruent ? '≅' : '≇'}
                </text>
                <text x="250" y="135" fill="#94A3B8" fontSize="10" textAnchor="middle">
                  {isCongruent ? 'Kongruen' : 'Beda Ukuran'}
                </text>

                {/* Triangle 2 DEF with Rotation */}
                {(() => {
                  const scale = 14;
                  const ox = 320, oy = 180;
                  const pD = { x: 0, y: 0 };
                  const pE = { x: tri2Base * scale, y: 0 };
                  const pF = { x: tri2ApexOffset * scale, y: -tri2Height * scale };
                  const cx = (pD.x + pE.x + pF.x) / 3;
                  const cy = (pD.y + pE.y + pF.y) / 3;

                  return (
                    <g transform={`translate(${ox}, ${oy}) rotate(${tri2Rotation}, ${cx}, ${cy})`}>
                      <polygon
                        points={`${pD.x},${pD.y} ${pE.x},${pE.y} ${pF.x},${pF.y}`}
                        fill={isCongruent ? 'rgba(34, 197, 94, 0.25)' : 'rgba(234, 179, 8, 0.25)'}
                        stroke={isCongruent ? '#22C55E' : '#EAB308'}
                        strokeWidth="2.5"
                      />
                      <circle cx={pD.x} cy={pD.y} r="4" fill="#FACC15" />
                      <circle cx={pE.x} cy={pE.y} r="4" fill="#FACC15" />
                      <circle cx={pF.x} cy={pF.y} r="4" fill="#FACC15" />
                      <text x={pD.x - 8} y={pD.y + 16} fill="#FEF08A" fontSize="12" fontWeight="bold">D</text>
                      <text x={pE.x + 4} y={pE.y + 16} fill="#FEF08A" fontSize="12" fontWeight="bold">E</text>
                      <text x={pF.x} y={pF.y - 8} fill="#FEF08A" fontSize="12" fontWeight="bold" textAnchor="middle">F</text>
                      <text x={(pD.x + pE.x) / 2} y={16} fill="#FEF08A" fontSize="10" textAnchor="middle">
                        f = {tri2Base} cm
                      </text>
                      <text x={cx} y={-tri2Height * scale - 4} fill="#FDE047" fontSize="11" fontWeight="bold" textAnchor="middle">
                        ΔDEF
                      </text>
                    </g>
                  );
                })()}
              </svg>
            </div>
          </div>

          {/* Side-by-Side Live Data & Slider Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Control Triangle 1 */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <h4 className="font-extrabold text-blue-700 text-sm">Pengaturan Segitiga 1 (ΔABC)</h4>
                <span className="text-xs font-mono text-slate-500">Acuan</span>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <div className="flex justify-between font-semibold text-slate-700 mb-1">
                    <span>Panjang Alas (AB):</span>
                    <span className="font-mono text-blue-600">{tri1Base} cm</span>
                  </div>
                  <input
                    type="range"
                    min="4"
                    max="14"
                    value={tri1Base}
                    onChange={(e) => setTri1Base(parseInt(e.target.value))}
                    className="w-full accent-blue-600 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between font-semibold text-slate-700 mb-1">
                    <span>Tinggi Segitiga:</span>
                    <span className="font-mono text-blue-600">{tri1Height} cm</span>
                  </div>
                  <input
                    type="range"
                    min="3"
                    max="10"
                    value={tri1Height}
                    onChange={(e) => setTri1Height(parseInt(e.target.value))}
                    className="w-full accent-blue-600 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between font-semibold text-slate-700 mb-1">
                    <span>Posisi Titik Puncak C:</span>
                    <span className="font-mono text-blue-600">{tri1ApexOffset} cm</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max={tri1Base}
                    value={tri1ApexOffset}
                    onChange={(e) => setTri1ApexOffset(parseInt(e.target.value))}
                    className="w-full accent-blue-600 cursor-pointer"
                  />
                </div>
              </div>

              {/* Specs */}
              <div className="bg-blue-50/70 p-3 rounded-xl border border-blue-200 text-xs font-mono space-y-1">
                <div className="font-bold text-blue-900">Ukuran Sisi & Sudut ΔABC:</div>
                <div>Sisi a = {s1_a.toFixed(1)} cm | b = {s1_b.toFixed(1)} cm | c = {s1_c.toFixed(1)} cm</div>
                <div>Sudut ∠A = {angle1_A.toFixed(1)}° | ∠B = {angle1_B.toFixed(1)}° | ∠C = {angle1_C.toFixed(1)}°</div>
              </div>
            </div>

            {/* Control Triangle 2 */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <h4 className="font-extrabold text-amber-700 text-sm">Pengaturan Segitiga 2 (ΔDEF)</h4>
                <span className="text-xs font-mono text-slate-500">Uji Kongruen</span>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <div className="flex justify-between font-semibold text-slate-700 mb-1">
                    <span>Panjang Alas (DE):</span>
                    <span className="font-mono text-amber-600">{tri2Base} cm</span>
                  </div>
                  <input
                    type="range"
                    min="4"
                    max="14"
                    value={tri2Base}
                    onChange={(e) => setTri2Base(parseInt(e.target.value))}
                    className="w-full accent-amber-600 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between font-semibold text-slate-700 mb-1">
                    <span>Tinggi Segitiga:</span>
                    <span className="font-mono text-amber-600">{tri2Height} cm</span>
                  </div>
                  <input
                    type="range"
                    min="3"
                    max="10"
                    value={tri2Height}
                    onChange={(e) => setTri2Height(parseInt(e.target.value))}
                    className="w-full accent-amber-600 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between font-semibold text-slate-700 mb-1">
                    <span>Posisi Titik Puncak F:</span>
                    <span className="font-mono text-amber-600">{tri2ApexOffset} cm</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max={tri2Base}
                    value={tri2ApexOffset}
                    onChange={(e) => setTri2ApexOffset(parseInt(e.target.value))}
                    className="w-full accent-amber-600 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between font-semibold text-slate-700 mb-1">
                    <span className="flex items-center gap-1">
                      <RotateCw className="w-3.5 h-3.5 text-slate-500" />
                      Rotasi Sudut:
                    </span>
                    <span className="font-mono text-slate-800">{tri2Rotation}°</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="360"
                    step="15"
                    value={tri2Rotation}
                    onChange={(e) => setTri2Rotation(parseInt(e.target.value))}
                    className="w-full accent-slate-700 cursor-pointer"
                  />
                </div>
              </div>

              {/* Specs */}
              <div className="bg-amber-50/70 p-3 rounded-xl border border-amber-200 text-xs font-mono space-y-1">
                <div className="font-bold text-amber-900">Ukuran Sisi & Sudut ΔDEF:</div>
                <div>Sisi d = {s2_a.toFixed(1)} cm | e = {s2_b.toFixed(1)} cm | f = {s2_c.toFixed(1)} cm</div>
                <div>Sudut ∠D = {angle2_D.toFixed(1)}° | ∠E = {angle2_E.toFixed(1)}° | ∠F = {angle2_F.toFixed(1)}°</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* FEATURE 2: DETEKSI KESEBANGUNAN */}
      {/* ========================================================================= */}
      {activeFeature === 'similarity' && (
        <div className="space-y-6">
          <div
            className={`p-4 rounded-2xl border flex items-center justify-between ${
              isScaleCongruent
                ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                : 'bg-blue-50 border-blue-300 text-blue-900'
            }`}
          >
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-blue-600 shrink-0" />
              <div>
                <h3 className="font-extrabold text-base">
                  STATUS:{' '}
                  {isScaleCongruent
                    ? 'KEDUA BANGUN KONGRUEN & SEBANGUN (k = 1.00)'
                    : `SEBANGUN TETAPI TIDAK KONGRUEN (k = ${scaleFactor.toFixed(2)})`}
                </h3>
                <p className="text-xs mt-0.5">
                  Semua perbandingan sisi bernilai konstan:{' '}
                  <span className="font-mono font-bold">
                    {simSidesB[0]}/{simSidesA[0]} = {simSidesB[1]}/{simSidesA[1]} = {simSidesB[2]}/{simSidesA[2]} = {scaleFactor.toFixed(2)}
                  </span>
                  . Sudut-sudut bersesuaian sama besar.
                </p>
              </div>
            </div>
          </div>

          {/* Visual Canvas */}
          <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800">
            <div className="h-64 sm:h-80 w-full relative flex items-center justify-center">
              <svg className="w-full h-full" viewBox="0 0 500 240">
                <defs>
                  <pattern id="simGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#simGrid)" />

                {/* Base Triangle A: (0, 0), (60, 0), (0, -80) */}
                <g transform="translate(60, 180)">
                  <polygon
                    points="0,0 80,0 0,-60"
                    fill="rgba(59, 130, 246, 0.25)"
                    stroke="#3B82F6"
                    strokeWidth="2.5"
                  />
                  <text x="40" y="16" fill="#BFDBFE" fontSize="11" textAnchor="middle" className="font-mono">4 cm</text>
                  <text x="-8" y="-30" fill="#BFDBFE" fontSize="11" textAnchor="end" className="font-mono">3 cm</text>
                  <text x="45" y="-35" fill="#BFDBFE" fontSize="11" textAnchor="middle" className="font-mono">5 cm</text>
                  <text x="40" y="-70" fill="#60A5FA" fontSize="12" fontWeight="bold" textAnchor="middle">
                    Bangun 1 (Asli)
                  </text>
                </g>

                {/* Arrow and Scale Factor */}
                <g transform="translate(195, 120)">
                  <text x="0" y="-10" fill="#F8FAFC" fontSize="20" fontWeight="bold" textAnchor="middle">
                    ~
                  </text>
                  <text x="0" y="10" fill="#FACC15" fontSize="12" fontWeight="bold" textAnchor="middle" className="font-mono">
                    k = {scaleFactor.toFixed(2)}
                  </text>
                  <text x="0" y="24" fill="#94A3B8" fontSize="9" textAnchor="middle">
                    {scaleFactor > 1 ? 'Perbesaran' : scaleFactor < 1 ? 'Pengecilan' : 'Identik'}
                  </text>
                </g>

                {/* Scaled Triangle B: Scaled by scaleFactor */}
                {(() => {
                  const baseW = 80;
                  const baseH = 60;
                  const w = baseW * (scaleFactor * 0.75);
                  const h = baseH * (scaleFactor * 0.75);

                  return (
                    <g transform={`translate(${280}, ${180})`}>
                      <polygon
                        points={`0,0 ${w},0 0,-${h}`}
                        fill={isScaleCongruent ? 'rgba(34, 197, 94, 0.3)' : 'rgba(234, 179, 8, 0.25)'}
                        stroke={isScaleCongruent ? '#22C55E' : '#EAB308'}
                        strokeWidth="2.5"
                      />
                      <text x={w / 2} y="16" fill="#FEF08A" fontSize="11" textAnchor="middle" className="font-mono">
                        {simSidesB[1]} cm
                      </text>
                      <text x="-8" y={-h / 2} fill="#FEF08A" fontSize="11" textAnchor="end" className="font-mono">
                        {simSidesB[0]} cm
                      </text>
                      <text x={w / 2 + 5} y={-h / 2 - 5} fill="#FEF08A" fontSize="11" textAnchor="middle" className="font-mono">
                        {simSidesB[2]} cm
                      </text>
                      <text x={w / 2} y={-h - 10} fill="#FDE047" fontSize="12" fontWeight="bold" textAnchor="middle">
                        Bangun 2 (Hasil Skala)
                      </text>
                    </g>
                  );
                })()}
              </svg>
            </div>
          </div>

          {/* Scale Slider Control */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-extrabold text-base text-slate-900">Slider Faktor Skala (k)</h4>
                <p className="text-xs text-slate-500">Geser untuk mengubah rasio ukuran bangun kedua dari 0.5x hingga 3.0x</p>
              </div>
              <div className="text-right">
                <span className="text-xs font-mono text-slate-500">Faktor k =</span>
                <span className="text-2xl font-black text-blue-600 font-mono ml-2">
                  {scaleFactor.toFixed(2)}x
                </span>
              </div>
            </div>

            <input
              type="range"
              min="0.5"
              max="3.0"
              step="0.1"
              value={scaleFactor}
              onChange={(e) => setScaleFactor(parseFloat(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer h-2 bg-slate-200 rounded-lg appearance-none"
            />

            <div className="flex gap-2">
              {[0.5, 1.0, 1.5, 2.0, 2.5, 3.0].map((val) => (
                <button
                  key={val}
                  onClick={() => setScaleFactor(val)}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-mono font-bold border transition cursor-pointer ${
                    Math.abs(scaleFactor - val) < 0.05
                      ? 'bg-blue-600 text-white border-blue-700'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                  }`}
                >
                  {val.toFixed(1)}x
                </button>
              ))}
            </div>

            {/* Live Calculation Table */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs font-mono">
                <span className="text-slate-500 block">Sisi Tegak:</span>
                <div className="font-bold text-slate-900 text-sm mt-0.5">
                  {simSidesB[0]} ÷ 3 = {simRatio1}
                </div>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs font-mono">
                <span className="text-slate-500 block">Sisi Alas:</span>
                <div className="font-bold text-slate-900 text-sm mt-0.5">
                  {simSidesB[1]} ÷ 4 = {simRatio2}
                </div>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs font-mono">
                <span className="text-slate-500 block">Sisi Miring:</span>
                <div className="font-bold text-slate-900 text-sm mt-0.5">
                  {simSidesB[2]} ÷ 5 = {simRatio3}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* FEATURE 3: PERBANDINGAN SEGIEMPAT */}
      {/* ========================================================================= */}
      {activeFeature === 'quadrilateral' && (
        <div className="space-y-6">
          {/* Quadrilateral Selection Buttons */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'square', label: 'Persegi', icon: '🔲' },
              { id: 'rectangle', label: 'Persegi Panjang', icon: '▭' },
              { id: 'parallelogram', label: 'Jajargenjang', icon: '▱' },
              { id: 'rhombus', label: 'Belah Ketupat', icon: '◊' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  soundManager.playClick();
                  setQuadType(item.id as any);
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold border transition cursor-pointer ${
                  quadType === item.id
                    ? 'bg-blue-600 text-white border-blue-700 shadow-md'
                    : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          {/* Analysis Banner */}
          <div
            className={`p-4 rounded-2xl border flex items-center justify-between ${
              quadResult.congruent
                ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                : quadResult.similar
                ? 'bg-blue-50 border-blue-300 text-blue-900'
                : 'bg-rose-50 border-rose-300 text-rose-900'
            }`}
          >
            <div className="flex items-center gap-3">
              {quadResult.similar ? (
                <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
              ) : (
                <XCircle className="w-6 h-6 text-rose-600 shrink-0" />
              )}
              <div>
                <h3 className="font-extrabold text-base">
                  STATUS:{' '}
                  {quadResult.congruent
                    ? 'KONGRUEN & SEBANGUN'
                    : quadResult.similar
                    ? 'SEBANGUN (TIDAK KONGRUEN)'
                    : 'TIDAK SEBANGUN & TIDAK KONGRUEN'}
                </h3>
                <p className="text-xs mt-0.5">{quadResult.reason}</p>
              </div>
            </div>
          </div>

          {/* SVG Preview Canvas for Quadrilaterals */}
          <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800">
            <div className="h-64 sm:h-80 w-full relative flex items-center justify-center">
              <svg className="w-full h-full" viewBox="0 0 500 240">
                <defs>
                  <pattern id="quadGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#quadGrid)" />

                {/* Quad 1 drawing */}
                {(() => {
                  const s = 10;
                  const ox = 60, oy = 180;
                  let pts = '';
                  if (quadType === 'square') {
                    const side = q1W * s;
                    pts = `0,0 ${side},0 ${side},-${side} 0,-${side}`;
                  } else if (quadType === 'rectangle') {
                    const w = q1W * s, h = q1H * s;
                    pts = `0,0 ${w},0 ${w},-${h} 0,-${h}`;
                  } else if (quadType === 'parallelogram') {
                    const w = q1W * s, h = q1H * s;
                    const shift = (h / Math.tan((q1Angle * Math.PI) / 180)) || 15;
                    pts = `0,0 ${w},0 ${w + shift},-${h} ${shift},-${h}`;
                  } else if (quadType === 'rhombus') {
                    const side = q1W * s;
                    const h = side * Math.sin((q1Angle * Math.PI) / 180);
                    const shift = side * Math.cos((q1Angle * Math.PI) / 180);
                    pts = `0,0 ${side},0 ${side + shift},-${h} ${shift},-${h}`;
                  }

                  return (
                    <g transform={`translate(${ox}, ${oy})`}>
                      <polygon
                        points={pts}
                        fill="rgba(59, 130, 246, 0.25)"
                        stroke="#3B82F6"
                        strokeWidth="2.5"
                      />
                      <text x="30" y="-10" fill="#93C5FD" fontSize="11" fontWeight="bold">
                        Bangun 1
                      </text>
                    </g>
                  );
                })()}

                {/* Center comparison operator */}
                <text
                  x="250"
                  y="120"
                  fill={quadResult.congruent ? '#4ADE80' : quadResult.similar ? '#60A5FA' : '#F87171'}
                  fontSize="28"
                  fontWeight="black"
                  textAnchor="middle"
                >
                  {quadResult.congruent ? '≅' : quadResult.similar ? '~' : '≁'}
                </text>

                {/* Quad 2 drawing */}
                {(() => {
                  const s = 10;
                  const ox = 300, oy = 180;
                  let pts = '';
                  if (quadType === 'square') {
                    const side = q2W * s;
                    pts = `0,0 ${side},0 ${side},-${side} 0,-${side}`;
                  } else if (quadType === 'rectangle') {
                    const w = q2W * s, h = q2H * s;
                    pts = `0,0 ${w},0 ${w},-${h} 0,-${h}`;
                  } else if (quadType === 'parallelogram') {
                    const w = q2W * s, h = q2H * s;
                    const shift = (h / Math.tan((q2Angle * Math.PI) / 180)) || 15;
                    pts = `0,0 ${w},0 ${w + shift},-${h} ${shift},-${h}`;
                  } else if (quadType === 'rhombus') {
                    const side = q2W * s;
                    const h = side * Math.sin((q2Angle * Math.PI) / 180);
                    const shift = side * Math.cos((q2Angle * Math.PI) / 180);
                    pts = `0,0 ${side},0 ${side + shift},-${h} ${shift},-${h}`;
                  }

                  return (
                    <g transform={`translate(${ox}, ${oy})`}>
                      <polygon
                        points={pts}
                        fill={quadResult.similar ? 'rgba(34, 197, 94, 0.25)' : 'rgba(244, 63, 94, 0.25)'}
                        stroke={quadResult.similar ? '#22C55E' : '#F43F5E'}
                        strokeWidth="2.5"
                      />
                      <text x="30" y="-10" fill="#FDE047" fontSize="11" fontWeight="bold">
                        Bangun 2
                      </text>
                    </g>
                  );
                })()}
              </svg>
            </div>
          </div>

          {/* Controls for both Quadrilaterals */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Bangun 1 Controls */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3">
              <h4 className="font-extrabold text-blue-700 text-sm">Ukuran Bangun 1</h4>
              <div className="space-y-3 text-xs">
                <div>
                  <div className="flex justify-between font-semibold text-slate-700 mb-1">
                    <span>Panjang / Sisi Alas:</span>
                    <span className="font-mono text-blue-600">{q1W} cm</span>
                  </div>
                  <input
                    type="range"
                    min="3"
                    max="14"
                    value={q1W}
                    onChange={(e) => setQ1W(parseInt(e.target.value))}
                    className="w-full accent-blue-600 cursor-pointer"
                  />
                </div>

                {quadType !== 'square' && quadType !== 'rhombus' && (
                  <div>
                    <div className="flex justify-between font-semibold text-slate-700 mb-1">
                      <span>Lebar / Tinggi:</span>
                      <span className="font-mono text-blue-600">{q1H} cm</span>
                    </div>
                    <input
                      type="range"
                      min="2"
                      max="10"
                      value={q1H}
                      onChange={(e) => setQ1H(parseInt(e.target.value))}
                      className="w-full accent-blue-600 cursor-pointer"
                    />
                  </div>
                )}

                {(quadType === 'parallelogram' || quadType === 'rhombus') && (
                  <div>
                    <div className="flex justify-between font-semibold text-slate-700 mb-1">
                      <span>Besar Sudut:</span>
                      <span className="font-mono text-blue-600">{q1Angle}°</span>
                    </div>
                    <input
                      type="range"
                      min="30"
                      max="90"
                      value={q1Angle}
                      onChange={(e) => setQ1Angle(parseInt(e.target.value))}
                      className="w-full accent-blue-600 cursor-pointer"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Bangun 2 Controls */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3">
              <h4 className="font-extrabold text-amber-700 text-sm">Ukuran Bangun 2</h4>
              <div className="space-y-3 text-xs">
                <div>
                  <div className="flex justify-between font-semibold text-slate-700 mb-1">
                    <span>Panjang / Sisi Alas:</span>
                    <span className="font-mono text-amber-600">{q2W} cm</span>
                  </div>
                  <input
                    type="range"
                    min="3"
                    max="14"
                    value={q2W}
                    onChange={(e) => setQ2W(parseInt(e.target.value))}
                    className="w-full accent-amber-600 cursor-pointer"
                  />
                </div>

                {quadType !== 'square' && quadType !== 'rhombus' && (
                  <div>
                    <div className="flex justify-between font-semibold text-slate-700 mb-1">
                      <span>Lebar / Tinggi:</span>
                      <span className="font-mono text-amber-600">{q2H} cm</span>
                    </div>
                    <input
                      type="range"
                      min="2"
                      max="10"
                      value={q2H}
                      onChange={(e) => setQ2H(parseInt(e.target.value))}
                      className="w-full accent-amber-600 cursor-pointer"
                    />
                  </div>
                )}

                {(quadType === 'parallelogram' || quadType === 'rhombus') && (
                  <div>
                    <div className="flex justify-between font-semibold text-slate-700 mb-1">
                      <span>Besar Sudut:</span>
                      <span className="font-mono text-amber-600">{q2Angle}°</span>
                    </div>
                    <input
                      type="range"
                      min="30"
                      max="90"
                      value={q2Angle}
                      onChange={(e) => setQ2Angle(parseInt(e.target.value))}
                      className="w-full accent-amber-600 cursor-pointer"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
