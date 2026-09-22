import React from 'react';
import { ArrowDownRight, Download, RefreshCw, Shield, Sparkles } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { playCyberClick } from '../utils/audio';

export const Hero: React.FC = () => {
  const { portfolio, isAlterEgo, toggleAvatar, setIsCvModalOpen } = usePortfolio();

  const handleScrollToProjects = () => {
    playCyberClick(680, 0.04);
    const element = document.getElementById('projects');
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleDownloadCv = () => {
    playCyberClick(750, 0.04);
    setIsCvModalOpen(true);
  };

  return (
    <section id="hero" className="relative min-h-screen pt-32 pb-20 flex items-center justify-center overflow-hidden">
      {/* Ambient background mesh lighting */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#00df81]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-[#10b981]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Intro & Typography */}
        <div className="lg:col-span-7 flex flex-col items-start text-left z-10">
          {/* Tags */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0d1c15] border border-[#173829] text-[#00df81] text-xs font-mono tracking-wider mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00df81] animate-ping" />
            <span className="truncate">{portfolio.headlineRole}</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold text-[#eef6f2] tracking-tight leading-[1.08] mb-6">
            Hi, I'm <br />
            <span className="text-white drop-shadow-[0_2px_20px_rgba(255,255,255,0.15)]">
              {portfolio.name.split(' ').slice(0, 2).join(' ')}
            </span>{' '}
            <span className="text-[#00df81] drop-shadow-[0_0_25px_rgba(0,223,129,0.3)]">
              {portfolio.name.split(' ').slice(2).join(' ')}
            </span>
          </h1>

          {/* Tagline */}
          <p className="text-xl sm:text-2xl text-[#c1d3c9] font-medium tracking-tight mb-4">
            {portfolio.tagline}
          </p>

          {/* Brief Bio */}
          <p className="text-[#889d91] text-base sm:text-lg leading-relaxed max-w-xl mb-10 font-normal">
            {portfolio.introBio}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              id="hero-view-work-btn"
              onClick={handleScrollToProjects}
              className="group flex items-center gap-2.5 px-6 py-3.5 bg-[#00df81] hover:bg-[#05f08d] text-[#06100b] font-bold text-sm tracking-wide rounded-full transition-all duration-200 shadow-[0_4px_25px_rgba(0,223,129,0.28)] hover:shadow-[0_6px_30px_rgba(0,223,129,0.45)] hover:-translate-y-0.5 cursor-pointer"
            >
              <span>View my work</span>
              <ArrowDownRight size={18} className="group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
            </button>

            <button
              id="hero-download-cv-btn"
              onClick={handleDownloadCv}
              className="group flex items-center gap-2.5 px-6 py-3.5 bg-[#0e1713] hover:bg-[#15231d] text-[#e0ece5] hover:text-white font-semibold text-sm tracking-wide rounded-full border border-[#1a2d24] hover:border-[#274637] transition-all duration-200 cursor-pointer"
            >
              <span>Download CV</span>
              <Download size={16} className="text-[#00df81] group-hover:translate-y-0.5 transition-transform" />
            </button>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-3 gap-6 pt-10 mt-10 border-t border-[#14231b] w-full max-w-md">
            <div>
              <div className="text-2xl font-bold text-white font-mono">18+</div>
              <div className="text-xs text-[#7f9488] uppercase tracking-wider">Technologies</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-[#00df81] font-mono">11+</div>
              <div className="text-xs text-[#7f9488] uppercase tracking-wider">Projects Built</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white font-mono">130+</div>
              <div className="text-xs text-[#7f9488] uppercase tracking-wider">Git Contributions</div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Photo with Flip to Spider-Man / Alter-Ego */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
          <div
            onClick={toggleAvatar}
            className="group relative cursor-pointer select-none perspective-[1000px] w-72 sm:w-80 aspect-[3/4]"
            title="Click to switch between Professional & Alter-Ego Persona!"
          >
            {/* Outer Cyber Card Frame */}
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-b from-[#00df81]/40 via-[#10b981]/20 to-transparent blur-md group-hover:blur-lg opacity-70 group-hover:opacity-100 transition-all duration-300" />

            <div
              className={`relative w-full h-full rounded-2xl overflow-hidden border-2 border-[#1c3529] group-hover:border-[#00df81] transition-all duration-500 shadow-[0_20px_50px_rgba(0,0,0,0.8)] bg-[#0c1410] ${
                isAlterEgo ? 'ring-2 ring-red-500/50' : ''
              }`}
            >
              {/* Photo Image */}
              <img
                src={isAlterEgo ? portfolio.alterEgoPhoto : portfolio.primaryPhoto}
                alt={portfolio.name}
                className={`w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105 ${
                  isAlterEgo ? 'filter saturate-125' : ''
                }`}
                loading="eager"
              />

              {/* Gradient overlay for text contrast at the bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#080d0a] via-transparent to-black/20" />

              {/* Status pill inside card */}
              <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#070c09]/80 backdrop-blur-md border border-[#1a3326] text-[11px] font-mono text-[#00df81]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00df81] animate-pulse" />
                  <span>{isAlterEgo ? 'ALTER-EGO // SPIDER-MAN' : 'MONTA // AVAILABLE'}</span>
                </div>

                <div className="p-1.5 rounded-full bg-[#070c09]/80 backdrop-blur-md border border-[#1a3326] text-[#a0b5aa] group-hover:text-[#00df81] transition-colors">
                  <RefreshCw size={13} className="group-hover:rotate-180 transition-transform duration-500" />
                </div>
              </div>

              {/* Bottom Card Info */}
              <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-[#09110d]/90 backdrop-blur-md border border-[#172b21] flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-white tracking-wide">
                    {isAlterEgo ? 'Peter Parker Mode' : portfolio.name}
                  </p>
                  <p className="text-[10px] font-mono text-[#7e9488]">
                    {isAlterEgo ? 'Web-Slinger & Researcher' : 'Full-Stack & Systems Undergrad'}
                  </p>
                </div>
                <span className="text-[10px] text-[#00df81] font-mono font-medium px-2 py-0.5 rounded bg-[#0b2217] border border-[#133c2a]">
                  FLIP ⇄
                </span>
              </div>
            </div>
          </div>

          <p className="text-xs font-mono text-[#6c8276] mt-4 flex items-center gap-1.5">
            <Sparkles size={12} className="text-[#00df81]" />
            <span>Interactive avatar: click photo to toggle alter-ego</span>
          </p>
        </div>
      </div>
    </section>
  );
};
