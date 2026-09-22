import React from 'react';
import { X, ExternalLink, Github, CheckCircle2, Layers, Cpu, Globe } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { playCyberClick } from '../utils/audio';

export const ProjectModal: React.FC = () => {
  const { activeProjectModal, setActiveProjectModal } = usePortfolio();

  if (!activeProjectModal) return null;

  const handleClose = () => {
    playCyberClick(700, 0.04);
    setActiveProjectModal(null);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={handleClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl bg-[#09120e] border border-[#1a3828] rounded-3xl p-6 sm:p-8 shadow-[0_25px_70px_rgba(0,0,0,0.8)] max-h-[90vh] overflow-y-auto scrollbar-thin text-left"
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-[#0e1c15] border border-[#1a3325] text-[#738d7f] hover:text-white hover:border-[#00df81] transition-all cursor-pointer"
          title="Close Modal"
        >
          <X size={18} />
        </button>

        {/* Top Badges */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="text-[11px] font-mono tracking-wider text-[#00df81] uppercase px-3 py-1 rounded-full bg-[#0b2418] border border-[#14422c]">
            {activeProjectModal.typeBadge}
          </span>
          {activeProjectModal.status && (
            <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-[#0d1f17] text-[#93aba0] border border-[#173325]">
              Status: {activeProjectModal.status}
            </span>
          )}
        </div>

        {/* Project Title */}
        <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
          {activeProjectModal.title}
        </h3>

        {/* Tagline / Overview */}
        <p className="text-[#8ba295] text-sm sm:text-base leading-relaxed mb-6">
          {activeProjectModal.description}
        </p>

        {/* In-depth breakdown */}
        {activeProjectModal.fullDescription && (
          <div className="mb-6 p-4 rounded-2xl bg-[#0e1a14] border border-[#162e22]">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#00df81] mb-2 flex items-center gap-1.5">
              <Layers size={14} />
              <span>System & Architectural Highlights</span>
            </h4>
            <p className="text-xs sm:text-sm text-[#c0d4ca] leading-relaxed">
              {activeProjectModal.fullDescription}
            </p>
          </div>
        )}

        {/* Key Features List */}
        {activeProjectModal.features && activeProjectModal.features.length > 0 && (
          <div className="mb-6">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#799486] mb-3">
              Core Capabilities
            </h4>
            <div className="space-y-2">
              {activeProjectModal.features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#9cb2a6]">
                  <CheckCircle2 size={15} className="text-[#00df81] mt-0.5 flex-shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tech Stack Chips */}
        <div className="mb-8 pt-4 border-t border-[#13261d]">
          <h4 className="text-xs font-mono uppercase tracking-wider text-[#799486] mb-3">
            Technologies Utilized
          </h4>
          <div className="flex flex-wrap gap-2">
            {activeProjectModal.techStack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-lg text-xs font-mono bg-[#0f2119] text-[#00df81] border border-[#19422e]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-[#13261d]">
          {activeProjectModal.liveUrl && (
            <a
              href={activeProjectModal.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#00df81] text-[#06100b] font-bold text-xs tracking-wide hover:bg-[#05f08d] transition-colors cursor-pointer"
            >
              <Globe size={15} />
              <span>Live Application</span>
              <ExternalLink size={13} />
            </a>
          )}

          {activeProjectModal.githubUrl && (
            <a
              href={activeProjectModal.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0e1c15] hover:bg-[#14291f] text-white border border-[#183626] text-xs font-semibold tracking-wide transition-colors cursor-pointer"
            >
              <Github size={15} className="text-[#00df81]" />
              <span>GitHub Repository</span>
              <ExternalLink size={13} />
            </a>
          )}

          <button
            onClick={handleClose}
            className="ml-auto px-4 py-2.5 rounded-xl text-xs font-mono text-[#789284] hover:text-white transition-colors cursor-pointer"
          >
            Close ✕
          </button>
        </div>
      </div>
    </div>
  );
};
