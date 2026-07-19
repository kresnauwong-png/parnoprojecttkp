import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Mail, ArrowRight, Menu, ChevronDown, Sun, Moon } from 'lucide-react';

interface NavbarHeroProps {
  brandName?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  heroDescription?: string;
  backgroundImage?: string;
  videoUrl?: string;
  emailPlaceholder?: string;
}

const NavbarHero: React.FC<NavbarHeroProps> = ({
  brandName = "nexus",
  heroTitle = "Innovation Meets Simplicity",
  heroSubtitle = "Join the community",
  heroDescription = "Discover cutting-edge solutions designed for the modern digital landscape.",
  backgroundImage = "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=2072&q=80",
  videoUrl = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  emailPlaceholder = "enter@email.com"
}) => {
  const [email, setEmail] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isVideoPaused, setIsVideoPaused] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const handleEmailSubmit = () => {
    console.log('Email submitted:', email);
    alert(`Email ${email} terdaftar!`);
  };

  const toggleDropdown = (dropdownName: string) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
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
  
  const handleResumeVideo = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsVideoPaused(false);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 relative z-10 text-white">
      {/* --- Navbar --- */}
      <div className="py-4 relative z-20 flex items-center justify-between gap-4 bg-slate-900/60 backdrop-blur-md px-6 rounded-2xl border border-slate-800">
        <div className="flex items-center gap-6">
          <a href="#" className="font-bold text-2xl text-cyan-400 tracking-wider flex-shrink-0">
            {brandName}
          </a>
          <nav className="hidden lg:flex text-slate-400 font-medium">
            <ul className="flex items-center space-x-2">
              <li><a href="#" className="hover:text-white px-3 py-2 text-sm transition-colors rounded-lg">About</a></li>
              <li className="relative">
                <button onClick={() => toggleDropdown('desktop-resources')} className="flex items-center hover:text-white px-3 py-2 text-sm transition-colors rounded-lg">
                  Resources<ChevronDown className={`h-4 w-4 ml-1 transition-transform ${openDropdown === 'desktop-resources' ? 'rotate-180' : ''}`} />
                </button>
                {openDropdown === 'desktop-resources' && (
                  <ul className="absolute top-full left-0 mt-2 p-2 bg-slate-950 border border-slate-800 shadow-lg rounded-xl z-20 w-48">
                    <li><a href="#" className="block px-3 py-2 text-sm text-slate-400 hover:text-white hover:bg-slate-900 rounded-lg">Submenu 1</a></li>
                    <li><a href="#" className="block px-3 py-2 text-sm text-slate-400 hover:text-white hover:bg-slate-900 rounded-lg">Submenu 2</a></li>
                  </ul>
                )}
              </li>
              <li><a href="#" className="hover:text-white px-3 py-2 text-sm transition-colors rounded-lg">Blog</a></li>
            </ul>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={() => setIsDarkMode(!isDarkMode)} className="bg-slate-800 hover:bg-slate-700 p-2.5 rounded-full transition-colors">
            {isDarkMode ? <Sun className="h-5 w-5 text-yellow-400" /> : <Moon className="h-5 w-5 text-white" />}
          </button>
        </div>
      </div>

      {/* --- Hero Section --- */}
      <div className="pt-16 pb-12 text-center">
        <div className="max-w-2xl mx-auto">
          <span className="text-xs font-mono tracking-widest text-purple-400 uppercase bg-purple-500/10 border border-purple-500/20 px-3 py-1 rounded-full">{heroSubtitle}</span>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight mt-4 bg-gradient-to-r from-white via-cyan-200 to-slate-400 bg-clip-text text-transparent">{heroTitle}</h1>
          <p className="mt-6 text-base text-slate-400 leading-relaxed">{heroDescription}</p>
          <div className="mt-8 flex items-center justify-center gap-3 flex-wrap">
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-500" />
              <input type="email" placeholder={emailPlaceholder} value={email} onChange={(e) => setEmail(e.target.value)} className="w-full max-w-xs bg-slate-950 border border-slate-800 text-white placeholder-slate-600 pl-10 pr-4 py-2.5 text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-cyan-500" />
            </div>
            <button onClick={handleEmailSubmit} className="bg-cyan-500 hover:bg-cyan-400 text-black px-6 py-2.5 text-sm rounded-full font-bold transition-colors flex items-center gap-2">
              Join Now <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* --- Media Header --- */}
      <header className="relative w-full aspect-video rounded-3xl overflow-hidden border border-slate-800 shadow-2xl bg-black">
        <img src={backgroundImage} alt="Preview asset" className={`w-full h-full absolute inset-0 object-cover transition-opacity duration-500 ${isVideoPlaying ? 'opacity-0' : 'opacity-100'}`} />
        <video ref={videoRef} src={videoUrl} className={`w-full h-full absolute inset-0 object-cover transition-opacity duration-500 ${isVideoPlaying ? 'opacity-100' : 'opacity-0'}`} onEnded={() => setIsVideoPlaying(false)} playsInline muted />
        <div className="absolute bottom-5 right-5 z-10">
          {!isVideoPlaying ? (
            <button onClick={handlePlayVideo} className="w-14 h-14 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-black/80 transition-all">
              <Play className="h-6 w-6 text-white fill-white ml-0.5" />
            </button>
          ) : (
            <button onClick={isVideoPaused ? handleResumeVideo : handlePauseVideo} className="w-14 h-14 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-black/80 transition-all">
              {isVideoPaused ? <Play className="h-6 w-6 text-white fill-white ml-0.5" /> : <Pause className="h-6 w-6 text-white fill-white" />}
            </button>
          )}
        </div>
      </header>
    </div>
  );
};

export { NavbarHero };

