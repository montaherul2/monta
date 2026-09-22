import React from 'react';
import {
  Layers,
  Code2,
  FileCode2,
  Terminal,
  Cpu,
  Sparkles,
  ExternalLink,
  Flame,
  CheckCircle2,
  Workflow,
  ShieldCheck,
  ChevronRight,
  Database
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { playCyberClick } from '../utils/audio';
import { FadeInSection } from './FadeInSection';

export const SkillsBento: React.FC = () => {
  const { portfolio, setActiveProjectModal, setSelectedTechFilter, selectedTechFilter } = usePortfolio();

  const handleTechClick = (techName: string) => {
    playCyberClick(700, 0.03);
    if (selectedTechFilter === techName) {
      setSelectedTechFilter(null);
    } else {
      setSelectedTechFilter(techName);
      const el = document.getElementById('projects');
      if (el) {
        const yOffset = -90;
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  };

  const scrollToProjects = () => {
    playCyberClick(750, 0.04);
    const el = document.getElementById('projects');
    if (el) {
      const yOffset = -90;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const scrollToContact = () => {
    playCyberClick(750, 0.04);
    const el = document.getElementById('contact');
    if (el) {
      const yOffset = -90;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const getFrameworkIcon = (name: string) => {
    switch (name) {
      case 'Next.js':
        return <Layers size={18} className="text-[#00df81]" />;
      case 'React':
        return <Code2 size={18} className="text-[#00df81]" />;
      case 'TypeScript':
        return <FileCode2 size={18} className="text-[#00df81]" />;
      case 'Python':
        return <Terminal size={18} className="text-[#00df81]" />;
      case 'C++':
        return <Cpu size={18} className="text-[#00df81]" />;
      default:
        return <Code2 size={18} className="text-[#00df81]" />;
    }
  };

  const languages = portfolio.techMatrix.filter((t) => t.category === 'languages');
  const frontend = portfolio.techMatrix.filter((t) => t.category === 'frontend');
  const backend = portfolio.techMatrix.filter((t) => t.category === 'backend');

  return (
    <section id="skills" className="py-24 relative border-t border-[#121f19]">
      <div className="w-full max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <FadeInSection className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0a1811] border border-[#143525] text-[#00df81] text-xs font-mono tracking-widest uppercase mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00df81]" />
              <span>TECHNICAL RANGE & CAPABILITIES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Craft & Engineering Matrix
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#7e9587] max-w-md font-mono">
            A working toolkit shaped by coursework, product work, and the habit of learning by building.
          </p>
        </FadeInSection>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Tile 1: SKILL DOMAINS (Col 4) */}
          <FadeInSection delay={0.08} className="md:col-span-4 bg-[#0a130f] border border-[#172b21] rounded-2xl p-6 flex flex-col justify-between shadow-[0_8px_30px_rgba(0,0,0,0.4)]">
            <div>
              <div className="text-[11px] font-mono text-[#00df81] uppercase tracking-wider mb-2">
                SKILL DOMAINS
              </div>
              <h3 className="text-2xl font-bold text-white mb-6">What I Work With</h3>

              <div className="space-y-4">
                {portfolio.skillDomains.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between text-xs font-medium mb-1.5">
                      <span className="text-[#c9ded3]">{skill.name}</span>
                      <span className="font-mono text-[#00df81]">{skill.percentage}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-[#12221a] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#00df81] to-[#34d399] rounded-full transition-all duration-1000"
                        style={{ width: `${skill.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-[#14261d] flex items-center justify-between text-xs font-mono text-[#6e8578]">
              <span>{portfolio.location}</span>
              <span className="text-[#00df81]">IIUC Undergrad</span>
            </div>
          </FadeInSection>

          {/* Tile 2: CORE LANGUAGES & FRAMEWORKS (Col 4) */}
          <FadeInSection delay={0.16} className="md:col-span-4 bg-[#0a130f] border border-[#172b21] rounded-2xl p-6 flex flex-col justify-between shadow-[0_8px_30px_rgba(0,0,0,0.4)]">
            <div>
              <div className="text-[11px] font-mono text-[#00df81] uppercase tracking-wider mb-2">
                CORE LANGUAGES & FRAMEWORKS
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Primary Stacks</h3>

              <div className="space-y-2.5">
                {portfolio.coreFrameworks.map((fw) => (
                  <div
                    key={fw.name}
                    onClick={() => handleTechClick(fw.name)}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-[#0e1b15] hover:bg-[#13261e] border border-[#162920] hover:border-[#00df81]/40 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-1.5 rounded-lg bg-[#0a1410] border border-[#172c21]">
                        {getFrameworkIcon(fw.name)}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white group-hover:text-[#00df81] transition-colors">
                          {fw.name}
                        </div>
                        <div className="text-[11px] text-[#738a7c] font-mono">{fw.tagline}</div>
                      </div>
                    </div>
                    <ChevronRight size={14} className="text-[#597163] group-hover:text-[#00df81] group-hover:translate-x-0.5 transition-all" />
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-[#14261d] text-xs font-mono text-[#6e8578]">
              Click any tech to inspect corresponding projects
            </div>
          </FadeInSection>

          {/* Tile 3: PHILOSOPHY & CRAFT (Col 4) */}
          <FadeInSection delay={0.24} className="md:col-span-4 bg-[#0a130f] border border-[#172b21] rounded-2xl p-6 flex flex-col justify-between shadow-[0_8px_30px_rgba(0,0,0,0.4)]">
            <div>
              <div className="text-[11px] font-mono text-[#00df81] uppercase tracking-wider mb-2">
                PHILOSOPHY & CRAFT
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight mb-4">
                Building Skills For Future.
              </h3>
              <p className="text-sm text-[#8aa093] leading-relaxed mb-6">
                Iterating on real products, diving into low-level systems, and sharpening mental models with competitive programming.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-[#14261d]">
              <div className="p-3 rounded-xl bg-[#0e1b15] border border-[#162920]">
                <div className="text-2xl font-bold font-mono text-[#00df81]">18+</div>
                <div className="text-xs text-[#7d9385] font-mono">Technologies</div>
              </div>
              <div className="p-3 rounded-xl bg-[#0e1b15] border border-[#162920]">
                <div className="text-2xl font-bold font-mono text-white">11</div>
                <div className="text-xs text-[#7d9385] font-mono">Projects</div>
              </div>
            </div>
          </FadeInSection>

          {/* Tile 4: TOOLKIT MATRIX (Col 6) */}
          <FadeInSection delay={0.15} className="md:col-span-6 bg-[#0a130f] border border-[#172b21] rounded-2xl p-6 shadow-[0_8px_30px_rgba(0,0,0,0.4)]">
            <div className="flex items-center justify-between mb-6">
              <div className="text-xs font-mono text-[#00df81] uppercase tracking-wider">
                TOOLKIT MATRIX
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-[#0c2419] border border-[#16422e] text-[#00df81]">
                18 Technologies
              </span>
            </div>

            <div className="space-y-5">
              {/* Languages & Core */}
              <div>
                <div className="flex justify-between items-center text-xs font-mono text-[#768e80] mb-2">
                  <span>LANGUAGES & CORE</span>
                  <span>{languages.length} Tools</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {languages.map((tech) => (
                    <button
                      key={tech.name}
                      onClick={() => handleTechClick(tech.name)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
                        selectedTechFilter === tech.name
                          ? 'bg-[#00df81] text-[#070c0a] font-bold shadow-[0_0_12px_rgba(0,223,129,0.4)]'
                          : 'bg-[#0e1c15] text-[#b8ccc1] border border-[#193024] hover:border-[#00df81]/60 hover:text-white'
                      }`}
                    >
                      {tech.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Frontend & Mobile */}
              <div>
                <div className="flex justify-between items-center text-xs font-mono text-[#768e80] mb-2">
                  <span>FRONTEND & MOBILE</span>
                  <span>{frontend.length} Tools</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {frontend.map((tech) => (
                    <button
                      key={tech.name}
                      onClick={() => handleTechClick(tech.name)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
                        selectedTechFilter === tech.name
                          ? 'bg-[#00df81] text-[#070c0a] font-bold shadow-[0_0_12px_rgba(0,223,129,0.4)]'
                          : 'bg-[#0e1c15] text-[#b8ccc1] border border-[#193024] hover:border-[#00df81]/60 hover:text-white'
                      }`}
                    >
                      {tech.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Backend & Embedded */}
              <div>
                <div className="flex justify-between items-center text-xs font-mono text-[#768e80] mb-2">
                  <span>BACKEND, DATA & EMBEDDED</span>
                  <span>{backend.length} Tools</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {backend.map((tech) => (
                    <button
                      key={tech.name}
                      onClick={() => handleTechClick(tech.name)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
                        selectedTechFilter === tech.name
                          ? 'bg-[#00df81] text-[#070c0a] font-bold shadow-[0_0_12px_rgba(0,223,129,0.4)]'
                          : 'bg-[#0e1c15] text-[#b8ccc1] border border-[#193024] hover:border-[#00df81]/60 hover:text-white'
                      }`}
                    >
                      {tech.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </FadeInSection>

          {/* Tile 5: CURRENTLY BUILDING & SHOWCASE (Col 6) */}
          <FadeInSection delay={0.22} className="md:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Showcase mini bento */}
            <div className="bg-[#0a130f] border border-[#172b21] rounded-2xl p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-mono text-[#00df81] uppercase tracking-wider">
                    SHOWCASE
                  </span>
                  <button
                    onClick={scrollToProjects}
                    className="text-xs text-[#00df81] font-mono hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>View all (11)</span>
                    <ExternalLink size={12} />
                  </button>
                </div>
                <p className="text-xs text-[#8ca094] mb-3">
                  Preview of key works including Bridge Marketing, DrawSync, and K.I.T.E.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2">
                {portfolio.projects.slice(0, 4).map((p) => (
                  <div
                    key={p.id}
                    onClick={() => {
                      playCyberClick(750, 0.04);
                      setActiveProjectModal(p);
                    }}
                    className="p-2 rounded-lg bg-[#0e1b15] border border-[#172d22] hover:border-[#00df81]/50 cursor-pointer transition-colors"
                  >
                    <div className="text-[11px] font-bold text-white truncate">{p.title}</div>
                    <div className="text-[9px] font-mono text-[#00df81] truncate">{p.typeBadge}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Currently Building */}
            <div className="bg-[#0a130f] border border-[#172b21] rounded-2xl p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-mono text-[#00df81] uppercase tracking-wider">
                    CURRENTLY BUILDING
                  </span>
                  <span className="flex items-center gap-1 text-[10px] font-mono text-[#00df81] px-2 py-0.5 rounded bg-[#0b2418] border border-[#14422c]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00df81] animate-pulse" />
                    <span>Working</span>
                  </span>
                </div>

                <div className="space-y-3">
                  {portfolio.currentlyBuilding.map((item) => (
                    <div
                      key={item.id}
                      className="p-2.5 rounded-xl bg-[#0e1b15] border border-[#172c21]"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-white">{item.title}</span>
                        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#10271d] text-[#00df81] border border-[#19402e]">
                          {item.status}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#7d9486] mb-1.5">{item.tagline}</p>
                      <div className="flex flex-wrap gap-1">
                        {item.tech.map((t) => (
                          <span key={t} className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#0a1410] text-[#a1b7ab]">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sub-card 1: Production & Research */}
            <div className="bg-[#0a130f] border border-[#172b21] rounded-2xl p-4 flex items-center justify-between">
              <div>
                <div className="text-[10px] font-mono text-[#668072] uppercase">PRODUCTION & RESEARCH</div>
                <div className="text-sm font-bold text-white">Full Lifecycle Stack</div>
              </div>
              <div className="w-7 h-7 rounded-full bg-[#0d2217] border border-[#18422e] flex items-center justify-center text-[#00df81] text-xs font-mono">
                &lt;/&gt;
              </div>
            </div>

            {/* Sub-card 2: Open to Collaboration */}
            <div
              onClick={scrollToContact}
              className="bg-[#0a130f] hover:bg-[#0f1d16] border border-[#172b21] hover:border-[#00df81]/40 rounded-2xl p-4 flex items-center justify-between cursor-pointer transition-colors"
            >
              <div>
                <div className="text-[10px] font-mono text-[#668072] uppercase">OPEN TO</div>
                <div className="text-sm font-bold text-[#00df81] flex items-center gap-1">
                  <span>Collaboration</span>
                  <ChevronRight size={14} />
                </div>
              </div>
              <div className="w-7 h-7 rounded-full bg-[#0d2217] border border-[#18422e] flex items-center justify-center text-[#00df81]">
                ↗
              </div>
            </div>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
};

