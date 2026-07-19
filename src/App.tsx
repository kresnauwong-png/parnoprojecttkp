import React from 'react';
import RobotBackground from './components/ui/RobotBackground';
import { NavbarHero } from './components/ui/hero-with-video';

function App() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#050505]">
      <RobotBackground />
      <div className="relative z-10">
        <NavbarHero 
          brandName="ParnoXAi Studio"
          heroTitle="Desain Arsitektur Eksklusif & Kustom Grafis"
          heroDescription="Membangun blueprint masa depan dengan presisi tinggi. Mengintegrasikan estetika visual modern ke dalam konstruksi fisik dan karya digital."
        />
      </div>
    </div>
  );
}
export default App;
