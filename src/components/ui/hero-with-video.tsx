import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, ArrowRight, Sun, Moon, Sparkles } from 'lucide-react';

interface NavbarHeroProps {
  brandName?: string;
  heroTitle?: string;
  heroDescription?: string;
  backgroundImage?: string;
  videoUrl?: string;
}

const NavbarHero: React.FC<NavbarHeroProps> = ({
  brandName = "ParnoXAi Website",
  heroTitle = "Parno Desain Arsitektur",
  heroDescription = "Sistem blueprint digital terotomatisasi. Menghubungkan visualisasi data spasial dengan manufaktur fisik secara waktu nyata.",
  backgroundImage = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
  videoUrl = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
}) => {
  const [message, setMessage] = useState('');
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isVideoPaused, setIsVideoPaused] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Formulir Kerja Sama berhasil dikirim ke ParnoXAi Engine!');
  };

  const handlePlayVideo = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsVideoPlaying(true);
      setIsVideoPaused(false);
    }
  };

  const handlePauseVideo = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsVideoPaused(true);
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  return (
    <div className="relative z-10 w-full max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 text-white">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="py-4 relative z-20 flex items-center justify-between gap-4 bg-black/40 backdrop-blur-md px-6 rounded-2xl border border-white/5">
        <a href="#" className="font-bold text-2xl tracking-wider text-white hover:scale-105 transition-transform">{brandName}</a>
        <nav className="hidden lg:flex text-gray-400 font-medium">
          <ul className="flex items-center space-x-6">
            <li><a href="#home" className="hover:text-white transition-colors text-sm">Beranda</a></li>
            <li><a href="#layanan" className="hover:text-white transition-colors text-sm">Layanan</a></li>
            <li><a href="#kontak" className="hover:text-white transition-colors text-sm">Kontak</a></li>
          </ul>
        </nav>
        <div className="flex items-center gap-3">
          <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="p-2.5 bg-neutral-900 rounded-full border border-white/5 hover:bg-neutral-800">
            {theme === 'dark' ? <Sun className="h-4 w-4 text-yellow-400" /> : <Moon className="h-4 w-4 text-white" />}
          </button>
          <a href="https://wa.me/6283834979782" target="_blank" rel="noopener noreferrer" className="hidden lg:flex bg-white text-black py-2 px-5 text-sm rounded-xl font-semibold hover:bg-neutral-200 items-center gap-2">
            WhatsApp Fast Response <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </motion.div>

      <div className="pt-24 pb-16 text-center max-w-3xl mx-auto" id="home">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest text-gray-300 mb-6">
          <Sparkles className="h-3 w-3 text-cyan-400 animate-pulse" /> ParnoXAi Studio Core v3.0
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="text-4xl sm:text-6xl text-white font-extrabold tracking-tight leading-tight bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent">
          {heroTitle}
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.4 }} className="mt-6 text-lg text-gray-400 leading-relaxed">
          {heroDescription}
        </motion.p>
      </div>

      <motion.header initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }} className="relative w-full aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-neutral-950 mb-24 group/media">
        <img src={backgroundImage} alt="Showcase Arsitektur" className={`w-full h-full absolute inset-0 object-cover transition-all duration-700 group-hover/media:scale-102 ${isVideoPlaying ? 'opacity-0' : 'opacity-100'}`} />
        <video ref={videoRef} src={videoUrl} className={`w-full h-full absolute inset-0 object-cover transition-opacity duration-500 ${isVideoPlaying ? 'opacity-100' : 'opacity-0'}`} onEnded={() => setIsVideoPlaying(false)} playsInline muted />
        <div className="absolute bottom-5 right-5 z-10">
          {!isVideoPlaying ? (
            <button onClick={handlePlayVideo} className="w-14 h-14 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all">
              <Play className="h-6 w-6 text-white fill-white ml-0.5" />
            </button>
          ) : ( 
            <button onClick={handlePauseVideo} className="w-14 h-14 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all">
              {isVideoPaused ? <Play className="h-6 w-6 text-white fill-white ml-0.5" /> : <Pause className="h-6 w-6 text-white fill-white" />}
            </button>
          )}
        </div>
      </motion.header>

      <section id="layanan" className="mb-24">
        <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: "-100px" }} className="text-3xl font-bold text-center mb-16 tracking-wide">Layanan Utama Kami</motion.h2>
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "Desain Rumah", desc: "Perencanaan tata ruang hunian modern, minimalis, dan estetis.", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80" },
            { title: "Desain Perusahaan", desc: "Konsep gedung komersial dan interior ruang kerja profesional.", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=400&q=80" },
            { title: "Desain Bangunan", desc: "Struktur komprehensif untuk fasilitas umum skala besar.", img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=400&q=80" },
            { title: "Desain Decal", desc: "Pola grafis striping kendaraan tajam beresolusi tinggi.", img: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=400&q=80" }
          ].map((item, index) => (
            <motion.div key={index} variants={fadeInUp} whileHover={{ y: -10 }} className="bg-[#0a0a0a] border border-neutral-900 rounded-2xl p-4 hover:border-white/20 transition-all duration-300 group cursor-pointer">
              <div className="h-44 rounded-xl overflow-hidden mb-4 bg-neutral-900 relative">
                <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700" />
              </div>
              <h3 className="font-semibold text-lg mb-2 group-hover:text-cyan-400 transition-colors">{item.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <footer id="kontak" className="border-t border-neutral-900 pt-16 pb-6">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="max-w-xl mx-auto bg-[#0a0a0a] border border-neutral-900 rounded-2xl p-6 sm:p-8 mb-12">
          <h3 className="text-xl font-bold mb-6 text-center">Hubungi Command Center</h3>
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div>
              <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={4} className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-white focus:outline-none focus:border-white text-sm" placeholder="Detail lokasi lahan & ukuran tanah Anda..." required />
            </div>
            <button type="submit" className="w-full bg-white text-black py-3 rounded-xl font-bold hover:bg-gray-200 transition-all flex justify-center items-center gap-2">
              Kirim Formulir Kerja Sama <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        </motion.div>
        <p className="text-center text-xs text-gray-600">&copy; 2026 ParnoXAi Studio. All rights reserved.</p>
      </footer>
    </div>
  );
};
export { NavbarHero };
            WhatsApp Fast Response <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </motion.div>

      <div className="pt-24 pb-16 text-center max-w-3xl mx-auto" id="home">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest text-gray-300 mb-6">
          <Sparkles className="h-3 w-3 text-cyan-400 animate-pulse" /> ParnoXAi Studio Core v3.0
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="text-4xl sm:text-6xl text-white font-extrabold tracking-tight leading-tight bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent">
          {heroTitle}
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.4 }} className="mt-6 text-lg text-gray-400 leading-relaxed">
          {heroDescription}
        </motion.p>
      </div>

      <motion.header initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }} className="relative w-full aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-neutral-950 mb-24 group/media">
        <img src={backgroundImage} alt="Showcase Arsitektur" className={`w-full h-full absolute inset-0 object-cover transition-all duration-700 group-hover/media:scale-102 ${isVideoPlaying ? 'opacity-0' : 'opacity-100'}`} />
        <video ref={videoRef} src={videoUrl} className={`w-full h-full absolute inset-0 object-cover transition-opacity duration-500 ${isVideoPlaying ? 'opacity-100' : 'opacity-0'}`} onEnded={() => setIsVideoPlaying(false)} playsInline muted />
        <div className="absolute bottom-5 right-5 z-10">
          {!isVideoPlaying ? (
            <button onClick={handlePlayVideo} className="w-14 h-14 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all">
              <Play className="h-6 w-6 text-white fill-white ml-0.5" />
            </button>
          ) : ( 
            <button onClick={handlePauseVideo} className="w-14 h-14 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all">
              {isVideoPaused ? <Play className="h-6 w-6 text-white fill-white ml-0.5" /> : <Pause className="h-6 w-6 text-white fill-white" />}
            </button>
          )}
        </div>
      </motion.header>

      <section id="layanan" className="mb-24">
        <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: "-100px" }} className="text-3xl font-bold text-center mb-16 tracking-wide">Layanan Utama Kami</motion.h2>
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "Desain Rumah", desc: "Perencanaan tata ruang hunian modern, minimalis, dan estetis.", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80" },
            { title: "Desain Perusahaan", desc: "Konsep gedung komersial dan interior ruang kerja profesional.", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=400&q=80" },
            { title: "Desain Bangunan", desc: "Struktur komprehensif untuk fasilitas umum skala besar.", img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=400&q=80" },
            { title: "Desain Decal", desc: "Pola grafis striping kendaraan tajam beresolusi tinggi.", img: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=400&q=80" }
          ].map((item, index) => (
            <motion.div key={index} variants={fadeInUp} whileHover={{ y: -10 }} className="bg-[#0a0a0a] border border-neutral-900 rounded-2xl p-4 hover:border-white/20 transition-all duration-300 group cursor-pointer">
              <div className="h-45 rounded-xl overflow-hidden mb-4 bg-neutral-900 relative">
                <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700" />
              </div>
              <h3 className="font-semibold text-lg mb-2 group-hover:text-cyan-400 transition-colors">{item.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <footer id="kontak" className="border-t border-neutral-900 pt-16 pb-6">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="max-w-xl mx-auto bg-[#0a0a0a] border border-neutral-900 rounded-2xl p-6 sm:p-8 mb-12">
          <h3 className="text-xl font-bold mb-6 text-center">Hubungi Command Center</h3>
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div>
              <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={4} className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-white focus:outline-none focus:border-white text-sm" placeholder="Detail lokasi lahan & ukuran tanah Anda..." required />
            </div>
            <button type="submit" className="w-full bg-white text-black py-3 rounded-xl font-bold hover:bg-gray-200 transition-all flex justify-center items-center gap-2">
              Kirim Formulir Kerja Sama <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        </motion.div>
        <p className="text-center text-xs text-gray-600">&copy; 2026 ParnoXAi Studio. All rights reserved.</p>
      </footer>
    </div>
  );
};
export { NavbarHero };
            WhatsApp Fast Response <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </motion.div>

      <div className="pt-24 pb-16 text-center max-w-3xl mx-auto" id="home">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest text-gray-300 mb-6">
          <Sparkles className="h-3 w-3 text-cyan-400 animate-pulse" /> ParnoXAi Studio Core v2.0
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="text-4xl sm:text-6xl text-white font-extrabold tracking-tight leading-tight bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent">
          {heroTitle}
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.4 }} className="mt-6 text-lg text-gray-400 leading-relaxed">
          {heroDescription}
        </motion.p>
      </div>

      <motion.header initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }} className="relative w-full aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-neutral-950 mb-24 group/media">
        <img src={backgroundImage} alt="Showcase Arsitektur" className={`w-full h-full absolute inset-0 object-cover transition-all duration-700 group-hover/media:scale-102 ${isVideoPlaying ? 'opacity-0' : 'opacity-100'}`} />
        <video ref={videoRef} src={videoUrl} className={`w-full h-full absolute inset-0 object-cover transition-opacity duration-500 ${isVideoPlaying ? 'opacity-100' : 'opacity-0'}`} onEnded={() => setIsVideoPlaying(false)} playsInline muted />
        <div className="absolute bottom-5 right-5 z-10">
          {!isVideoPlaying ? (
            <button onClick={handlePlayVideo} className="w-14 h-14 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all">
              <Play className="h-6 w-6 text-white fill-white ml-0.5" />
            </button>
          ) : ( 
            <button onClick={handlePauseVideo} className="w-14 h-14 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all">
              {isVideoPaused ? <Play className="h-6 w-6 text-white fill-white ml-0.5" /> : <Pause className="h-6 w-6 text-white fill-white" />}
            </button>
          )}
        </div>
      </motion.header>

      <section id="layanan" className="mb-24">
        <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: "-100px" }} className="text-3xl font-bold text-center mb-16 tracking-wide">Layanan Utama Kami</motion.h2>
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "Desain Rumah", desc: "Perencanaan tata ruang hunian modern, minimalis, dan estetis.", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80" },
            { title: "Desain Perusahaan", desc: "Konsep gedung komersial dan interior ruang kerja profesional.", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=400&q=80" },
            { title: "Desain Bangunan", desc: "Struktur komprehensif untuk fasilitas umum skala besar.", img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=400&q=80" },
            { title: "Desain Decal", desc: "Pola grafis striping kendaraan tajam beresolusi tinggi.", img: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=400&q=80" }
          ].map((item, index) => (
            <motion.div key={index} variants={fadeInUp} whileHover={{ y: -10 }} className="bg-[#0a0a0a] border border-neutral-900 rounded-2xl p-4 hover:border-white/20 transition-all duration-300 group cursor-pointer">
              <div className="h-45 rounded-xl overflow-hidden mb-4 bg-neutral-900 relative">
                <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700" />
              </div>
              <h3 className="font-semibold text-lg mb-2 group-hover:text-cyan-400 transition-colors">{item.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <footer id="kontak" className="border-t border-neutral-900 pt-16 pb-6">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="max-w-xl mx-auto bg-[#0a0a0a] border border-neutral-900 rounded-2xl p-6 sm:p-8 mb-12">
          <h3 className="text-xl font-bold mb-6 text-center">Hubungi Command Center</h3>
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div>
              <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={4} className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-white focus:outline-none focus:border-white text-sm" placeholder="Detail lokasi lahan & ukuran tanah Anda..." required />
            </div>
            <button type="submit" className="w-full bg-white text-black py-3 rounded-xl font-bold hover:bg-gray-200 transition-all flex justify-center items-center gap-2">
              Kirim Formulir Kerja Sama <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        </motion.div>
        <p className="text-center text-xs text-gray-600">&copy; 2026 ParnoXAi Studio. All rights reserved.</p>
      </footer>
    </div>
  );
};
export { NavbarHero };
