import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, Sparkles, Lock, Sliders, Globe } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { audioManager } from '../utils/audio';
import { ThemeSwitcher } from './ThemeSwitcher';

const NAV_ITEMS = [
  { id: 'about', label: 'ABOUT' },
  { id: 'experience', label: 'EXPERIENCE' },
  { id: 'skills', label: 'SKILLS' },
  { id: 'projects', label: 'PROJECTS' },
  { id: 'research', label: 'RESEARCH' },
  { id: 'contact', label: 'CONTACT' },
];

export const Navbar: React.FC = () => {
  const {
    portfolio,
    soundOn,
    toggleSound,
    activeSection,
    setActiveSection,
    triggerIntroReplay,
    triggerHiddenEditor,
    isAdminAuthenticated,
    currentPage,
    navigateToPage,
    setIsCustomizerOpen,
  } = usePortfolio();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [secretClickCount, setSecretClickCount] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);

      // Calculate scroll progress percentage for reading bar
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress(Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100)));
      }

      // Section spy
      if (currentPage === 'portfolio') {
        const sections = ['about', 'experience', 'skills', 'projects', 'research', 'contact'];
        for (const sectionId of sections.reverse()) {
          const el = document.getElementById(sectionId);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= 220) {
              setActiveSection(sectionId);
              return;
            }
          }
        }
        if (window.scrollY < 250) {
          setActiveSection('hero');
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [setActiveSection, currentPage]);

  const scrollToSection = (id: string) => {
    audioManager.playNavClick(700, 0.04);
    setMobileMenuOpen(false);

    if (currentPage !== 'portfolio') {
      navigateToPage('portfolio');
      setTimeout(() => {
        performScroll(id);
      }, 100);
      return;
    }

    performScroll(id);
  };

  const performScroll = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -90;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    audioManager.playNavClick(800, 0.04);
    if (currentPage !== 'portfolio') {
      navigateToPage('portfolio');
    }
    setActiveSection('hero');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Discreet trigger: Clicking brand logo 3 times rapidly opens the owner passcode gate
  const handleBrandClick = () => {
    scrollToTop();
    const nextCount = secretClickCount + 1;
    setSecretClickCount(nextCount);
    if (nextCount >= 3) {
      setSecretClickCount(0);
      triggerHiddenEditor();
    }
    setTimeout(() => setSecretClickCount(0), 1200);
  };

  return (
    <>
      {/* Top Reading / Scroll Progress Line */}
      <div
        className="fixed top-0 left-0 h-[2.5px] bg-gradient-to-r from-[#00df81] via-[#38ef7d] to-[#11998e] z-50 transition-all duration-75 ease-out shadow-[0_0_10px_rgba(0,223,129,0.7)]"
        style={{ width: `${scrollProgress}%` }}
      />

      <header className="fixed top-5 left-0 right-0 z-40 flex justify-center px-4 pointer-events-none">
        <nav
          id="main-floating-nav"
          className={`pointer-events-auto flex items-center justify-between gap-2 md:gap-6 px-4 py-2.5 rounded-full border transition-all duration-300 ${
            scrolled
              ? 'bg-[#0b1310]/92 border-[#1d3328] shadow-[0_12px_40px_rgba(0,0,0,0.65)] backdrop-blur-md'
              : 'bg-[#0d1713]/85 border-[#182921] shadow-[0_8px_30px_rgba(0,0,0,0.4)] backdrop-blur-sm'
          }`}
        >
          {/* Brand Logo with secret triple click trigger */}
          <button
            onClick={handleBrandClick}
            onMouseEnter={() => audioManager.playHoverPing(1600)}
            className="flex items-center gap-1 font-bold text-lg tracking-wider text-[#e6f0eb] hover:text-white px-3 py-1 rounded-full transition-colors group cursor-pointer"
            title="MONTA. (Back to top)"
          >
            <span className="font-extrabold">{portfolio.shortName.replace('.', '')}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#00df81] inline-block animate-pulse group-hover:scale-125 transition-transform" />
          </button>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = currentPage === 'portfolio' && activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  onMouseEnter={() => audioManager.playHoverPing(1450)}
                  className={`relative px-4 py-1.5 text-xs font-semibold tracking-widest uppercase transition-all duration-200 rounded-full cursor-pointer ${
                    isActive
                      ? 'text-[#00df81] bg-[#0c2419] shadow-[0_0_15px_rgba(0,223,129,0.15)] border border-[#16432f]'
                      : 'text-[#8ea197] hover:text-[#d0ded6] hover:bg-[#121f1a]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Action Controls on Right */}
          <div className="flex items-center gap-1.5 pl-1">
            {/* Color Palette & High Contrast Switcher */}
            <div onMouseEnter={() => audioManager.playHoverPing(1500)}>
              <ThemeSwitcher />
            </div>

            {/* Sound Quick Toggle */}
            <button
              onClick={() => {
                toggleSound();
              }}
              onMouseEnter={() => audioManager.playHoverPing(1520)}
              className={`p-2 rounded-full border transition-all cursor-pointer ${
                soundOn
                  ? 'text-[#00df81] bg-[#0c2419] border-[#16432f] shadow-[0_0_12px_rgba(0,223,129,0.2)]'
                  : 'text-[#7d9287] hover:text-[#d0ded6] bg-[#101b16] border-[#192b22]'
              }`}
              title={soundOn ? 'Interface Audio Enabled (Click to Mute)' : 'Interface Audio Muted (Click to Enable)'}
              aria-label="Toggle Sound Effects"
            >
              {soundOn ? <Volume2 size={15} /> : <VolumeX size={15} />}
            </button>

            {/* Global Settings & Preferences Drawer Button */}
            <button
              onClick={() => {
                audioManager.playNavClick(750, 0.04);
                setIsCustomizerOpen(true);
              }}
              onMouseEnter={() => audioManager.playHoverPing(1550)}
              className="p-2 rounded-full border text-[#7d9287] hover:text-[#00df81] bg-[#101b16] border-[#192b22] hover:border-[#1e3b2e] transition-all cursor-pointer"
              title="Settings & Audio Drawer"
              aria-label="Open Settings Drawer"
            >
              <Sliders size={15} />
            </button>

            {/* Intro Replay mini button */}
            <button
              onClick={() => {
                audioManager.playNavClick(850, 0.04);
                triggerIntroReplay();
              }}
              onMouseEnter={() => audioManager.playHoverPing(1600)}
              className="p-2 rounded-full border text-[#7d9287] hover:text-[#00df81] bg-[#101b16] border-[#192b22] transition-colors cursor-pointer hidden sm:block"
              title="Replay Brand Intro Splash"
            >
              <Sparkles size={14} />
            </button>

            {/* Authenticated Admin Indicator (Only visible when owner is logged in) */}
            {isAdminAuthenticated && (
              <button
                onClick={() => {
                  audioManager.playNavClick(880, 0.05);
                  triggerHiddenEditor();
                }}
                onMouseEnter={() => audioManager.playHoverPing(1650)}
                className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#0d2217] border border-[#16432f] text-[11px] font-mono text-[#00df81] hover:bg-[#123020] transition-colors cursor-pointer"
                title="Admin Authenticated - Click to open editor"
              >
                <Lock size={11} />
                <span>Admin</span>
              </button>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => {
                audioManager.playNavClick(680, 0.03);
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              onMouseEnter={() => audioManager.playHoverPing(1400)}
              className="md:hidden p-2 rounded-full text-[#8ea197] hover:text-white bg-[#101b16] border border-[#192b22] cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </nav>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="pointer-events-auto absolute top-16 left-4 right-4 bg-[#0a120f]/95 border border-[#1c3327] rounded-2xl p-4 shadow-2xl backdrop-blur-xl md:hidden animate-in fade-in slide-in-from-top-4 duration-200">
            <div className="flex flex-col gap-1">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  onMouseEnter={() => audioManager.playHoverPing(1450)}
                  className={`w-full text-left px-4 py-2.5 text-sm font-semibold tracking-wider rounded-xl transition-colors cursor-pointer ${
                    currentPage === 'portfolio' && activeSection === item.id
                      ? 'text-[#00df81] bg-[#0d261b] border border-[#1a4431]'
                      : 'text-[#9cb2a6] hover:text-white hover:bg-[#121f1a]'
                  }`}
                >
                  {item.label}
                </button>
              ))}

              <div className="pt-3 mt-2 border-t border-[#182a22] flex flex-col gap-2">
                <div className="flex items-center justify-between px-1">
                  <span className="text-xs font-mono text-[#8ea197]">Theme & Palette:</span>
                  <ThemeSwitcher compact />
                </div>

                {/* SEO Authority Dossier Link with Route Tag */}
                <button
                  onClick={() => {
                    audioManager.playNavClick(700, 0.04);
                    navigateToPage(currentPage === 'seo' ? 'portfolio' : 'seo');
                    setMobileMenuOpen(false);
                  }}
                  onMouseEnter={() => audioManager.playHoverPing(1550)}
                  className="w-full text-left px-3 py-2 text-xs font-mono tracking-wider rounded-xl transition-colors cursor-pointer text-[#8ea197] hover:text-[#00df81] hover:bg-[#121f1a] flex items-center justify-between border border-[#16271e]"
                >
                  <span className="flex items-center gap-2">
                    <Globe size={13} className="text-[#00df81]" />
                    <span>{currentPage === 'seo' ? 'Interactive Portfolio' : 'Montaherul Islam (SEO Dossier)'}</span>
                  </span>
                  <span className="text-[10px] text-[#00df81] px-1.5 py-0.5 rounded bg-[#0a1811] border border-[#143d29]">
                    /#seo
                  </span>
                </button>

                <div className="flex justify-between items-center px-1 pt-1">
                  <button
                    onClick={() => {
                      toggleSound();
                    }}
                    onMouseEnter={() => audioManager.playHoverPing(1500)}
                    className="text-xs text-[#8ea197] hover:text-white flex items-center gap-2 py-1 cursor-pointer"
                  >
                    {soundOn ? <Volume2 size={14} className="text-[#00df81]" /> : <VolumeX size={14} />}
                    <span>Sound: {soundOn ? 'On' : 'Off'}</span>
                  </button>

                  <button
                    onClick={() => {
                      audioManager.playNavClick(750, 0.04);
                      setIsCustomizerOpen(true);
                      setMobileMenuOpen(false);
                    }}
                    onMouseEnter={() => audioManager.playHoverPing(1520)}
                    className="text-xs text-[#8ea197] hover:text-[#00df81] flex items-center gap-1.5 py-1 cursor-pointer"
                  >
                    <Sliders size={13} />
                    <span>Settings Drawer</span>
                  </button>

                  <button
                    onClick={() => {
                      audioManager.playNavClick(800, 0.04);
                      triggerIntroReplay();
                      setMobileMenuOpen(false);
                    }}
                    onMouseEnter={() => audioManager.playHoverPing(1600)}
                    className="text-xs text-[#8ea197] hover:text-[#00df81] flex items-center gap-1.5 py-1 cursor-pointer"
                  >
                    <Sparkles size={12} className="text-[#00df81]" />
                    <span>Replay Intro</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
