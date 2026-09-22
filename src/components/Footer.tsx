import React from 'react';
import { ArrowUp, Sparkles, Globe, Lock } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { audioManager } from '../utils/audio';

export const Footer: React.FC = () => {
  const {
    portfolio,
    triggerIntroReplay,
    isAdminAuthenticated,
    lockAdmin,
    navigateToPage,
    currentPage
  } = usePortfolio();

  const scrollToTop = () => {
    audioManager.playNavClick(800, 0.04);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 border-t border-[#121f19] bg-[#070c09] text-xs font-mono text-[#668072]">
      <div className="w-full max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Left: Copyright */}
        <div className="flex items-center gap-2">
          <span>© 2026 {portfolio.name.toUpperCase()}</span>
          <span className="text-[#00df81]">•</span>
          <span className="text-[#89a295]">ALL ARE DYNAMIC</span>
        </div>

        {/* Center: Actions & Crawlable SEO link */}
        <div className="flex items-center gap-5">
          <button
            onClick={triggerIntroReplay}
            className="hover:text-[#00df81] transition-colors cursor-pointer flex items-center gap-1"
            title="Replay Brand Intro Splash"
          >
            <Sparkles size={12} className="text-[#00df81]" />
            <span>Replay Intro</span>
          </button>

          {/* Crawlable SEO Profile link */}
          <a
            href="#seo"
            onClick={(e) => {
              e.preventDefault();
              navigateToPage(currentPage === 'seo' ? 'portfolio' : 'seo');
            }}
            className="hover:text-[#00df81] transition-colors cursor-pointer flex items-center gap-1 text-[#839b8e]"
            title="Montaherul Islam (Monta) SEO & Search Index Dossier"
          >
            <Globe size={12} className="text-[#00df81]" />
            <span>{currentPage === 'seo' ? 'Portfolio Home' : 'Montaherul Islam (SEO)'}</span>
          </a>

          {/* Admin Lock / Logout (Only rendered if admin is currently authenticated) */}
          {isAdminAuthenticated && (
            <button
              onClick={lockAdmin}
              className="hover:text-[#f87171] transition-colors cursor-pointer flex items-center gap-1 text-[#70887c]"
              title="Lock Admin Session"
            >
              <Lock size={12} />
              <span>Lock Admin</span>
            </button>
          )}
        </div>

        {/* Right: Back to top & Tag */}
        <div className="flex items-center gap-4">
          <span className="tracking-wider uppercase text-[#738b7e]">
            BUILT WITH INTENT
          </span>

          <button
            onClick={scrollToTop}
            className="p-2 rounded-full bg-[#0e1914] hover:bg-[#15271e] text-[#8ea396] hover:text-[#00df81] border border-[#172b20] transition-colors cursor-pointer"
            title="Scroll to Top"
          >
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
};
