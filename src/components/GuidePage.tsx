import React from 'react';
import { Page } from '../types';
import { soundManager } from '../utils/audio';
import {
  FileText,
  Target,
  Award,
  Lightbulb,
  CheckCircle,
  HelpCircle,
  ArrowRight,
  ShieldCheck,
  Compass,
} from 'lucide-react';

interface GuidePageProps {
  onNavigate: (page: Page) => void;
}

export const GuidePage: React.FC<GuidePageProps> = ({ onNavigate }) => {
  const handleStartMission = () => {
    soundManager.playClick();
    onNavigate('game');
  };

  const steps = [
    {
      num: '01',
      title: 'Amati Dua Bangun Datar',
      desc: 'Buka berkas perkara dan teliti kedua bangun yang ditampilkan pada visualizer kanvas forensik.',
      icon: <Compass className="w-5 h-5 text-blue-600" />,
    },
    {
      num: '02',
      title: 'Periksa Panjang Sisi dan Sudut',
      desc: 'Cek angka label panjang setiap sisi dan besar sudut yang ada. Catat apakah ada sudut 90° atau sisi sama panjang.',
      icon: <Target className="w-5 h-5 text-indigo-600" />,
    },
    {
      num: '03',
      title: 'Identifikasi Pasangan Bersesuaian',
      desc: 'Pasangkan sisi-sisi yang seletak (bersesuaian) dan sudut-sudut yang seletak antara bangun pertama dan kedua.',
      icon: <CheckCircle className="w-5 h-5 text-emerald-600" />,
    },
    {
      num: '04',
      title: 'Tentukan Hubungan Geometris',
      desc: 'Bandingkan ukuran dan bentuk: apakah Kongruen (k=1), Sebangun tidak kongruen (k≠1), atau Tidak Kongruen & Tidak Sebangun.',
      icon: <Award className="w-5 h-5 text-amber-600" />,
    },
    {
      num: '05',
      title: 'Pilih Jawaban Berdasarkan Konsep',
      desc: 'Gunakan kriteria matematika resmi (seperti SSS, SAS, ASA, atau rasio faktor skala k), bukan sekadar menebak visual.',
      icon: <ShieldCheck className="w-5 h-5 text-purple-600" />,
    },
    {
      num: '06',
      title: 'Pelajari Pembahasan Matematis',
      desc: 'Setelah menjawab, telaah langkah pembuktian logis yang terbuka otomatis untuk memperkuat pemahaman konsep Anda.',
      icon: <Lightbulb className="w-5 h-5 text-rose-600" />,
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Title Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold mb-3">
          <FileText className="w-3.5 h-3.5" />
          Protokol Operasional Standar Detektif
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Panduan Investigasi GeoMatch
        </h1>
        <p className="text-slate-600 text-base mt-2">
          Ikuti aturan operasional detektif geometri untuk menganalisis barang bukti dan menuntaskan 5 kasus misterius.
        </p>
      </div>

      {/* 6 Step Rules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-12">
        {steps.map((s) => (
          <div
            key={s.num}
            className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex items-start gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center shrink-0 border border-slate-200">
              {s.icon}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-extrabold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                  LANGKAH {s.num}
                </span>
                <h3 className="font-bold text-slate-900 text-base">{s.title}</h3>
              </div>
              <p className="text-sm text-slate-600 mt-1.5 leading-relaxed">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Scoring System Card */}
      <div className="bg-gradient-to-br from-[#17324D] to-[#1e3a58] rounded-3xl p-6 sm:p-8 text-white shadow-xl mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-black">
            100
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white">Sistem Penilaian & Syarat Kelulusan</h2>
            <p className="text-xs sm:text-sm text-blue-200">Aturan penghitungan poin detektif forensik</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          <div className="bg-slate-900/60 rounded-xl p-4 border border-blue-400/20">
            <span className="text-xs text-emerald-300 font-semibold uppercase tracking-wider block">Jawaban Benar</span>
            <span className="text-2xl font-black text-emerald-400 mt-1 block">+20 Poin</span>
            <p className="text-xs text-slate-300 mt-1">Diberikan langsung saat opsi yang tepat dikonfirmasi.</p>
          </div>

          <div className="bg-slate-900/60 rounded-xl p-4 border border-blue-400/20">
            <span className="text-xs text-rose-300 font-semibold uppercase tracking-wider block">Jawaban Salah</span>
            <span className="text-2xl font-black text-rose-400 mt-1 block">0 Poin</span>
            <p className="text-xs text-slate-300 mt-1">Dapat mencoba kembali setelah mempelajari petunjuk.</p>
          </div>

          <div className="bg-slate-900/60 rounded-xl p-4 border border-blue-400/20">
            <span className="text-xs text-amber-300 font-semibold uppercase tracking-wider block">Skor Maksimal</span>
            <span className="text-2xl font-black text-amber-300 mt-1 block">100 Poin</span>
            <p className="text-xs text-slate-300 mt-1">Selesaikan seluruh 5 kasus untuk membuka Rapor Akhir.</p>
          </div>
        </div>

        {/* Hints feature explanation */}
        <div className="mt-6 pt-6 border-t border-blue-800/60 flex items-start gap-3 bg-blue-950/40 p-4 rounded-xl">
          <HelpCircle className="w-5 h-5 text-amber-300 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-blue-100">
            <span className="font-bold text-amber-300">Fitur Petunjuk (Hint):</span> Jika menemui kesulitan,
            gunakan tombol <span className="font-semibold underline">"Minta Petunjuk"</span> pada kasus. Petunjuk dirancang
            untuk mengarahkan cara berpikir Anda tanpa langsung memberi bocoran jawaban.
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <div className="text-center">
        <button
          onClick={handleStartMission}
          className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 active:scale-95 text-white font-extrabold text-lg shadow-xl shadow-blue-600/30 transition-all cursor-pointer"
        >
          <span>Mulai Misi Detektif</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
