import React, { useState } from 'react';
import {
  Plus,
  Search,
  Filter,
  ExternalLink,
  Github,
  X,
  Sparkles,
  FolderGit2,
  CheckCircle2
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { ProjectItem } from '../types';
import { playCyberClick } from '../utils/audio';
import { FadeInSection } from './FadeInSection';
import { GithubRepoBrowser } from './GithubRepoBrowser';

export const ProjectsSection: React.FC = () => {
  const {
    portfolio,
    setActiveProjectModal,
    filterCategory,
    setFilterCategory,
    searchQuery,
    setSearchQuery,
    selectedTechFilter,
    setSelectedTechFilter,
  } = usePortfolio();

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleOpenProject = (project: ProjectItem) => {
    playCyberClick(800, 0.04);
    setActiveProjectModal(project);
  };

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Filter projects by category, search query, and tech filter
  const filteredProjects = portfolio.projects.filter((project) => {
    // Category match
    if (filterCategory !== 'all' && filterCategory !== 'github-repos') {
      if (filterCategory === 'professional' && project.category !== 'professional') return false;
      if (filterCategory === 'academic' && project.category !== 'academic') return false;
      if (filterCategory === 'systems' && project.category !== 'systems') return false;
      if (filterCategory === 'mobile' && project.category !== 'mobile') return false;
      if (filterCategory === 'collaborative' && project.category !== 'collaborative') return false;
    }

    // Tech filter match
    if (selectedTechFilter) {
      const matchTech = project.techStack.some((t) =>
        t.toLowerCase().includes(selectedTechFilter.toLowerCase())
      );
      const matchInterest =
        project.title.toLowerCase().includes(selectedTechFilter.toLowerCase()) ||
        project.description.toLowerCase().includes(selectedTechFilter.toLowerCase()) ||
        project.typeBadge.toLowerCase().includes(selectedTechFilter.toLowerCase());

      if (!matchTech && !matchInterest) return false;
    }

    // Search query match
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchTitle = project.title.toLowerCase().includes(q);
      const matchDesc = project.description.toLowerCase().includes(q);
      const matchBadge = project.typeBadge.toLowerCase().includes(q);
      const matchTech = project.techStack.some((t) => t.toLowerCase().includes(q));
      if (!matchTitle && !matchDesc && !matchBadge && !matchTech) return false;
    }

    return true;
  });

  const professionalProjects = filteredProjects.filter((p) => p.category === 'professional');
  const personalAndAcademic = filteredProjects.filter((p) => p.category !== 'professional');

  const categories = [
    { id: 'all', label: 'All Works' },
    { id: 'professional', label: 'Professional' },
    { id: 'collaborative', label: 'Collaborative' },
    { id: 'systems', label: 'Systems & Fleet' },
    { id: 'mobile', label: 'Mobile Apps' },
    { id: 'academic', label: 'Academic' },
    { id: 'github-repos', label: 'Live GitHub Repos', isSpecial: true },
  ];

  return (
    <section id="projects" className="py-24 relative border-t border-[#121f19]">
      <div className="w-full max-w-6xl mx-auto px-6">
        {/* Toast feedback */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 bg-[#00df81] text-black px-4 py-3 rounded-2xl font-mono text-xs font-bold shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-5">
            <CheckCircle2 size={16} />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Top Header */}
        <FadeInSection className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0a1811] border border-[#143525] text-[#00df81] text-xs font-mono tracking-widest uppercase mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00df81]" />
              <span>SELECTED WORKS</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Software & Systems Portfolio
            </h2>
          </div>

          {/* Search Input & Quick Fetch Repos Button */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#5a7364]" size={16} />
              <input
                type="text"
                placeholder="Search projects or tech..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#0a1410] border border-[#172c21] focus:border-[#00df81] rounded-full pl-10 pr-4 py-2.5 text-xs text-white placeholder-[#5a7364] outline-none transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#5a7364] hover:text-white"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            <button
              onClick={() => {
                playCyberClick(700, 0.04);
                setFilterCategory('github-repos');
              }}
              className={`px-3.5 py-2.5 rounded-full text-xs font-mono font-medium flex items-center gap-1.5 shrink-0 transition-all cursor-pointer border ${
                filterCategory === 'github-repos'
                  ? 'bg-[#00df81] text-black border-[#00df81] font-bold shadow-[0_0_12px_rgba(0,223,129,0.3)]'
                  : 'bg-[#0d1f17] hover:bg-[#132c21] text-[#00df81] border-[#1b4832]'
              }`}
              title="Fetch repositories directly from GitHub"
            >
              <Github size={14} />
              <span className="hidden sm:inline">Fetch Repos</span>
            </button>
          </div>
        </FadeInSection>

        {/* Filter Tabs */}
        <FadeInSection delay={0.08} className="flex flex-wrap items-center justify-between gap-3 mb-12 pb-6 border-b border-[#14231b]">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const count =
                cat.id === 'all'
                  ? portfolio.projects.length
                  : cat.id === 'github-repos'
                  ? 'Live'
                  : portfolio.projects.filter((p) => p.category === cat.id).length;
              const isActive = filterCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    playCyberClick(720, 0.03);
                    setFilterCategory(cat.id);
                  }}
                  className={`px-4 py-2 rounded-full text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-[#00df81] text-[#070c0a] font-bold shadow-[0_0_15px_rgba(0,223,129,0.3)]'
                      : cat.isSpecial
                      ? 'bg-[#0d2116] text-[#00df81] hover:text-white border border-[#1b432e] hover:border-[#00df81]/50'
                      : 'bg-[#0b1611] text-[#93aba0] hover:text-white border border-[#162a20] hover:border-[#224434]'
                  }`}
                >
                  {cat.id === 'github-repos' && <Github size={13} className={isActive ? 'text-black' : 'text-[#00df81]'} />}
                  <span>{cat.label}</span>
                  <span className={`text-[10px] font-mono ${isActive ? 'text-[#070c0a]' : 'text-[#647c6f]'}`}>
                    ({count})
                  </span>
                  {cat.id === 'github-repos' && !isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00df81] animate-pulse" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Active tech filter indicator badge */}
          {selectedTechFilter && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0d261b] border border-[#174630] text-xs text-[#00df81]">
              <span className="font-mono">Filtering by: {selectedTechFilter}</span>
              <button
                onClick={() => setSelectedTechFilter(null)}
                className="hover:text-white cursor-pointer"
                title="Clear filter"
              >
                <X size={13} />
              </button>
            </div>
          )}
        </FadeInSection>

        {/* View Mode 1: Live GitHub Repositories Browser */}
        {filterCategory === 'github-repos' && (
          <div className="mb-16 animate-in fade-in duration-200">
            <GithubRepoBrowser
              onProjectImported={(title) => {
                showToast(`Synchronized "${title}" into portfolio projects!`);
              }}
            />
          </div>
        )}

        {/* Case: No Projects Found in Standard Categories */}
        {filterCategory !== 'github-repos' && filteredProjects.length === 0 && (
          <div className="py-20 text-center bg-[#0a130f] rounded-2xl border border-[#162a20] p-8">
            <p className="text-[#8ba295] text-base mb-3">No projects matching your current filter.</p>
            <button
              onClick={() => {
                setFilterCategory('all');
                setSearchQuery('');
                setSelectedTechFilter(null);
              }}
              className="px-4 py-2 bg-[#0d261b] border border-[#174630] text-[#00df81] text-xs font-mono rounded-full hover:bg-[#133827]"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Section 1: Professional Works */}
        {filterCategory !== 'github-repos' && professionalProjects.length > 0 && (
          <div className="mb-16">
            <FadeInSection className="flex flex-col mb-8">
              <h3 className="text-2xl font-bold text-white tracking-tight mb-2">Professional Works</h3>
              <p className="text-sm text-[#7e9587]">
                Commercial projects, client work, and startup products built for operational reliability and user impact.
              </p>
            </FadeInSection>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {professionalProjects.map((project, idx) => (
                <FadeInSection key={project.id} delay={idx * 0.08}>
                  <ProjectCard project={project} onOpen={() => handleOpenProject(project)} />
                </FadeInSection>
              ))}
            </div>
          </div>
        )}

        {/* Section 2: Personal & Academic Projects */}
        {filterCategory !== 'github-repos' && personalAndAcademic.length > 0 && (
          <div>
            <FadeInSection className="flex flex-col mb-8">
              <h3 className="text-2xl font-bold text-white tracking-tight mb-2">
                Personal & Academic Projects
              </h3>
              <p className="text-sm text-[#7e9587]">
                Explorations in system tools, desktop software, utilities, and web engineering. Complete with open-source repositories.
              </p>
            </FadeInSection>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {personalAndAcademic.map((project, idx) => (
                <FadeInSection key={project.id} delay={idx * 0.06}>
                  <ProjectCard project={project} onOpen={() => handleOpenProject(project)} />
                </FadeInSection>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

interface ProjectCardProps {
  project: ProjectItem;
  onOpen: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onOpen }) => {
  return (
    <div
      onClick={onOpen}
      className="group bg-[#0b1410] hover:bg-[#0e1a14] border border-[#172b21] hover:border-[#00df81]/50 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between cursor-pointer shadow-[0_8px_30px_rgba(0,0,0,0.3)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.6)] hover:-translate-y-1"
    >
      <div>
        {/* Top bar: Type badge + Expand "+" button matching video */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <span className="text-[10px] font-mono tracking-wider text-[#00df81] uppercase px-2.5 py-1 rounded bg-[#0b2418] border border-[#14422c]">
            {project.typeBadge}
          </span>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpen();
            }}
            className="w-8 h-8 rounded-lg bg-[#0e1c15] group-hover:bg-[#00df81] border border-[#193326] group-hover:border-[#00df81] text-[#789283] group-hover:text-[#060e0a] flex items-center justify-center transition-all cursor-pointer"
            title="View details"
          >
            <Plus size={16} className="group-hover:rotate-90 transition-transform duration-300" />
          </button>
        </div>

        {/* Project Title */}
        <h4 className="text-xl font-bold text-white group-hover:text-[#00df81] transition-colors mb-2">
          {project.title}
        </h4>

        {/* Short Description */}
        <p className="text-xs text-[#8ca094] leading-relaxed mb-6 line-clamp-3">
          {project.description}
        </p>
      </div>

      {/* Tech stack pills */}
      <div className="pt-4 border-t border-[#14261d] flex flex-wrap gap-1.5">
        {project.techStack.map((tech) => (
          <span
            key={tech}
            className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0e1a14] text-[#a4baa0] border border-[#172d22]"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
};
