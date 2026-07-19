import React, { useState } from 'react';
import RobotBackground from './components/ui/RobotBackground';
import { NavbarHero } from './components/ui/hero-with-video';
import { LayoutDashboard, Shield, Layers, Home, FileText, CheckCircle2, TrendingUp, Users } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState<'beranda' | 'layanan' | 'dashboard'>('beranda');
  const [zoomActive, setZoomActive] = useState(false);

  const handleBerandaClick = () => {
    setZoomActive(true);
  };

  const handleZoomFinished = () => {
    // Aksi opsional setelah kamera mentok di mata elang
    setZoomActive(false); 
    setActiveTab('beranda');
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#020617] text-white selection:bg-cyan-500 selection:text-black">
      {/* Sistem 3D Engine Core */}
      <RobotBackground triggerZoom={zoomActive} onZoomComplete={handleZoomFinished} />
      
      {/* Konten Utama */}
      <div className="relative z-10 min-h-screen flex flex-col justify-between">
        
        {/* --- DOCK NAVIGATION ALAPAD MOBILE --- */}
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-slate-900/80 backdrop-blur-xl border border-slate-800 px-6 py-3 rounded-2xl flex items-center gap-8 shadow-2xl">
          <button 
            onClick={handleBerandaClick}
            className={`flex flex-col items-center gap-1 text-xs font-semibold tracking-wider transition-colors ${activeTab === 'beranda' ? 'text-cyan-400' : 'text-slate-400 hover:text-white'}`}
          >
            <Home className="h-5 w-4" /> Beranda
          </button>
          <button 
            onClick={() => { setZoomActive(false); setActiveTab('layanan'); }}
            className={`flex flex-col items-center gap-1 text-xs font-semibold tracking-wider transition-colors ${activeTab === 'layanan' ? 'text-cyan-400' : 'text-slate-400 hover:text-white'}`}
          >
            <Layers className="h-5 w-4" /> Layanan
          </button>
          <button 
            onClick={() => { setZoomActive(false); setActiveTab('dashboard'); }}
            className={`flex flex-col items-center gap-1 text-xs font-semibold tracking-wider transition-colors ${activeTab === 'dashboard' ? 'text-cyan-400' : 'text-slate-400 hover:text-white'}`}
          >
            <LayoutDashboard className="h-5 w-4" /> Dashboard
          </button>
        </div>

        {/* --- VIEW ROUTER --- */}
        <main className="w-full pb-24">
          {activeTab === 'beranda' && (
            <NavbarHero 
              brandName="ParnoXAi Engine"
              heroTitle="Arsitektur Ekstrim & Estetika Siber"
              heroDescription="Sistem blueprint digital terotomatisasi. Menghubungkan visualisasi data spasial dengan manufaktur fisik secara waktu nyata."
            />
          )}

          {activeTab === 'layanan' && (
            <div className="max-w-4xl mx-auto pt-24 px-4">
              <div className="text-center mb-12">
                <span className="text-xs uppercase bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 px-3 py-1 rounded-full font-bold tracking-widest">Katalog Layanan</span>
                <h1 className="text-3xl font-extrabold mt-4">Solusi Studio Terintegrasi</h1>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl hover:border-cyan-500/40 transition-colors">
                  <CheckCircle2 className="h-8 w-8 text-cyan-400 mb-4" />
                  <h3 className="text-lg font-bold mb-2">3D Spatial Mapping</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">Pemetaan topografi tanah presisi tinggi menggunakan sensor optik siber untuk simulasi beban bangunan.</p>
                </div>
                <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl hover:border-cyan-500/40 transition-colors">
                  <Shield className="h-8 w-8 text-cyan-400 mb-4" />
                  <h3 className="text-lg font-bold mb-2">Automated Decal Vector</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">Ekstraksi aset grafis kendaraan bermotor berbasis algoritma matematis bebas pecah saat dicetak skala besar.</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'dashboard' && (
            <div className="max-w-5xl mx-auto pt-24 px-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-6 mb-8">
                <div>
                  <h1 className="text-2xl font-black tracking-wide">COMMAND CENTER STATS</h1>
                  <p className="text-xs text-slate-500 mt-1">Sistem Pemantauan Operasional Studio ParnoXAi</p>
                </div>
                <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-lg text-emerald-400 text-xs font-mono">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" /> ENGINE ONLINE
                </div>
              </div>

              {/* Grid Metrik Angka */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <div className="bg-slate-900/40 border border-slate-800/80 p-5 rounded-xl">
                  <div className="flex justify-between items-center text-slate-400 text-xs font-bold tracking-wider uppercase">Proyek Aktif <FileText className="h-4 w-4 text-cyan-400" /></div>
                  <div className="text-3xl font-black mt-2">42 <span className="text-xs text-slate-500 font-normal">Lahan</span></div>
                </div>
                <div className="bg-slate-900/40 border border-slate-800/80 p-5 rounded-xl">
                  <div className="flex justify-between items-center text-slate-400 text-xs font-bold tracking-wider uppercase">Efisiensi Render <TrendingUp className="h-4 w-4 text-emerald-400" /></div>
                  <div className="text-3xl font-black mt-2">98.4% <span className="text-xs text-emerald-500 font-normal">Vite Core</span></div>
                </div>
                <div className="bg-slate-900/40 border border-slate-800/80 p-5 rounded-xl">
                  <div className="flex justify-between items-center text-slate-400 text-xs font-bold tracking-wider uppercase">Klien Terdaftar <Users className="h-4 w-4 text-purple-400" /></div>
                  <div className="text-3xl font-black mt-2">1,204 <span className="text-xs text-slate-500 font-normal">Entitas</span></div>
                </div>
              </div>

              {/* Tabel Log Aktivitas Terbaru */}
              <div className="bg-slate-900/20 border border-slate-800 rounded-xl overflow-hidden">
                <div className="px-5 py-4 border-b border-slate-800 bg-slate-900/40 font-bold text-sm tracking-wide">Log Aktivitas Server Utama</div>
                <div className="p-4 font-mono text-xs space-y-2.5 text-slate-400">
                  <p><span className="text-cyan-400">[11:54:12]</span> SUCCESS: Mengompilasi modul animasi Framer Motion.</p>
                  <p><span className="text-purple-400">[11:55:01]</span> INFO: Aset 3D Cyber-Eagle mendarat dengan aman di koordinat ranting.</p>
                  <p><span className="text-emerald-400">[11:56:54]</span> READY: Menunggu instruksi navigasi dari menu dock utama.</p>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
