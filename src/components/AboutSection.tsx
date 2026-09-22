import React from 'react';
import { GraduationCap, MapPin, CheckCircle2, BookOpen, School } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { playCyberClick } from '../utils/audio';
import { FadeInSection } from './FadeInSection';

export const AboutSection: React.FC = () => {
  const { portfolio, setSelectedTechFilter, selectedTechFilter } = usePortfolio();

  const handleInterestClick = (interest: string) => {
    playCyberClick(720, 0.03);
    if (selectedTechFilter === interest) {
      setSelectedTechFilter(null);
    } else {
      setSelectedTechFilter(interest);
      const projEl = document.getElementById('projects');
      if (projEl) {
        const yOffset = -90;
        const y = projEl.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  };

  return (
    <section id="about" className="py-24 relative border-t border-[#121f19]">
      <div className="w-full max-w-6xl mx-auto px-6">
        {/* Top Header */}
        <FadeInSection className="flex flex-col items-start max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0a1811] border border-[#143525] text-[#00df81] text-xs font-mono tracking-widest uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00df81]" />
            <span>ABOUT ME</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#eef6f2] tracking-tight leading-tight mb-6">
            {portfolio.aboutHeadline}
          </h2>

          <p className="text-[#9cb2a6] text-lg leading-relaxed mb-8">
            {portfolio.aboutBio}
          </p>

          {/* Fields of Interest */}
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#668072] block mb-3">
              Fields of Interest (Click to filter works)
            </span>
            <div className="flex flex-wrap gap-2.5">
              {portfolio.fieldsOfInterest.map((interest) => {
                const isSelected = selectedTechFilter === interest;
                return (
                  <button
                    key={interest}
                    onClick={() => handleInterestClick(interest)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer border ${
                      isSelected
                        ? 'bg-[#00df81] text-[#080d0a] font-semibold border-[#00df81] shadow-[0_0_15px_rgba(0,223,129,0.3)]'
                        : 'bg-[#0e1914] text-[#a9beb2] border-[#182d23] hover:border-[#00df81]/50 hover:text-white'
                    }`}
                  >
                    <span>{interest}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </FadeInSection>

        {/* Education Timeline */}
        <FadeInSection delay={0.15} className="mt-16 pt-12 border-t border-[#14231b]">
          <div className="flex items-center gap-2.5 mb-10">
            <GraduationCap className="text-[#00df81]" size={20} />
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Education</h3>
          </div>

          <div className="flex flex-col gap-8">
            {portfolio.education.map((item, idx) => (
              <FadeInSection
                key={item.id}
                delay={idx * 0.1}
                className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start group"
              >
                {/* Year / Period on the left */}
                <div className="md:col-span-3 pt-1">
                  <span className="text-lg md:text-xl font-mono font-bold text-[#c7d9cf] group-hover:text-[#00df81] transition-colors">
                    {item.period}
                  </span>
                </div>

                {/* Card on the right */}
                <div className="md:col-span-9 bg-[#0b1410] border border-[#162a20] group-hover:border-[#224434] rounded-2xl p-6 sm:p-7 transition-all duration-300 shadow-[0_8px_30px_rgba(0,0,0,0.3)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.5)]">
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                    <span className="px-3 py-1 rounded-full text-[11px] font-mono font-medium tracking-wide bg-[#0c2419] border border-[#16422e] text-[#00df81]">
                      {item.typeBadge}
                    </span>

                    <span className="flex items-center gap-1.5 text-xs font-mono text-[#768e81]">
                      <MapPin size={13} className="text-[#00df81]" />
                      <span>{item.location}</span>
                    </span>
                  </div>

                  <h4 className="text-xl font-bold text-white mb-1 group-hover:text-[#e4f5ec] transition-colors">
                    {item.degree}
                  </h4>
                  <p className="text-sm font-medium text-[#00df81]/90 mb-4 flex items-center gap-2">
                    <School size={15} />
                    <span>{item.institution}</span>
                  </p>

                  <ul className="space-y-2 mt-4 pt-4 border-t border-[#13241b]">
                    {item.details.map((detail, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-2.5 text-sm text-[#8ca195] leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00df81] mt-2 flex-shrink-0" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeInSection>
            ))}
          </div>
        </FadeInSection>
      </div>
    </section>
  );
};

