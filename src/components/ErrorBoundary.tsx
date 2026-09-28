import React, { Component, ErrorInfo, ReactNode } from 'react';
import { resetUserProgress } from '../utils/storage';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in GeoMatch:', error, errorInfo);
  }

  private handleResetAndReload = () => {
    try {
      resetUserProgress();
      localStorage.clear();
    } catch {}
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-700 shadow-2xl text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center text-3xl mx-auto">
              🔍
            </div>

            <h1 className="text-xl sm:text-2xl font-extrabold text-white">
              GeoMatch: Detektif Bangun Geometri
            </h1>

            <p className="text-sm text-slate-300 leading-relaxed">
              Terjadi sedikit kendala saat memuat data investigasi. Klik tombol di bawah untuk menyegarkan dan memulihkan aplikasi secara otomatis.
            </p>

            {this.state.error && (
              <div className="text-left bg-slate-950 p-3 rounded-xl border border-slate-800 text-[11px] font-mono text-rose-300 max-h-32 overflow-y-auto">
                {this.state.error.message || 'Unknown render error'}
              </div>
            )}

            <div className="pt-2 space-y-2">
              <button
                onClick={this.handleResetAndReload}
                className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 active:scale-95 text-white font-bold text-sm shadow-lg shadow-blue-500/30 transition cursor-pointer"
              >
                Muat Ulang & Pulihkan Aplikasi
              </button>
              <button
                onClick={() => window.location.reload()}
                className="w-full py-2.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-semibold transition cursor-pointer"
              >
                Segarkan Halaman (Refresh)
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
