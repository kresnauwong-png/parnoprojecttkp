import React, { useState } from 'react';
import RobotBackground from './components/ui/RobotBackground';
import { NavbarHero } from './components/ui/hero-with-video';
import { ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function App() {
  const [isIntro, setIsIntro] = useState<boolean>(true);
  const [zoomActive, setZoomActive] = useState<boolean>(false);

  return (
    <div className="relative min-h-screen w-full bg-[#020617] text-white overflow-hidden">
      {/* 3D Core Engine Background */}
      <RobotBackground 
        triggerZoom={zoomActive} 
        onZoomComplete={() => { setZoomActive(false); setIsIntro(false); }} 
        isIntroMode={isIntro} 
      />
      
      <AnimatePresence mode="wait">
        {isIntro ? (
          /* --- TAB TAMPILAN AWAL (INTRO PRELOADER) --- */
          <motion.div 
            key="intro"
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative z-20 h-[100dvh] w-full flex flex-col items-center justify-between p-6 bg-gradient-to-t from-[#020617] via-transparent"
          >
            <div className="pt-16 text-center">
              <h1 className="text-3xl font-black tracking-widest text-cyan-400">PARNOXAI STUDIO</h1>
              <p className="text-xs text-slate-500 mt-2 font-mono">System Core Genesis v3.0</p>
            </div>

            <div className="pb-24 text-center max-w-sm px-4 w-full">
              <button
                type="button"
                onClick={() => setZoomActive(true)}
                className="group bg-cyan-500 text-black font-extrabold px-8 py-4 rounded-full text-sm shadow-xl shadow-cyan-500/20 hover:bg-cyan-400 transition-all flex items-center gap-3 mx-auto"
              >
                <span>MASUK BERANDA</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </motion.div>
        ) : (
          /* --- TAB INTEGRASI KOMPONEN BARU --- */
          <motion.div 
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative z-10 min-h-screen w-full flex items-center justify-center p-4"
          >
            <NavbarHero
              brandName="TechFlow"
              heroTitle="Innovation Meets Simplicity"
              heroSubtitle="Early Access Available"
              heroDescription="Discover cutting-edge solutions designed for the modern digital landscape."
              emailPlaceholder="enter@email.com"
              backgroundImage="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=2072&q=80"
              videoUrl="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
