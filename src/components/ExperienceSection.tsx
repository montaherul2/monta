import React from 'react';
import { Briefcase, MapPin, Building2, ExternalLink } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { FadeInSection } from './FadeInSection';

export const ExperienceSection: React.FC = () => {
  const { portfolio } = usePortfolio();

  return (
    <section id="experience" className="py-24 relative border-t border-[#121f19]">
      <div className="w-full max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <FadeInSection className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#0a1811] border border-[#143525] text-[#00df81] text-xs font-mono tracking-widest uppercase mb-12 w-fit">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00df81]" />
          <span>PROFESSIONAL EXPERIENCE</span>
        </FadeInSection>

        {/* Experience Timeline */}
        <div className="flex flex-col gap-10">
          {portfolio.experience.map((exp, idx) => (
            <FadeInSection
              key={exp.id}
              delay={idx * 0.12}
              className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start group"
            >
              {/* Date & Period on Left */}
              <div className="md:col-span-3 pt-1">
                <span className="text-lg md:text-xl font-mono font-bold text-[#c7d9cf] group-hover:text-[#00df81] transition-colors block">
                  {exp.period}
                </span>
                <span className="text-xs font-mono text-[#668072] mt-1 block">
                  {exp.roleNum}
                </span>
              </div>

              {/* Card on Right */}
              <div className="md:col-span-9 bg-[#0b1410] border border-[#162a20] group-hover:border-[#224434] rounded-2xl p-6 sm:p-8 transition-all duration-300 shadow-[0_8px_30px_rgba(0,0,0,0.3)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.5)]">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#0f261c] border border-[#1a4732] flex items-center justify-center font-bold text-[#00df81] text-base">
                      {exp.company.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white group-hover:text-[#e4f5ec] transition-colors">
                        {exp.title}
                      </h4>
                      <p className="text-sm font-semibold text-[#00df81]/90 flex items-center gap-1.5">
                        <Building2 size={14} />
                        <span>{exp.company}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-mono bg-[#0c2419] border border-[#16422e] text-[#00df81]">
                      {exp.roleNum}
                    </span>
                    <span className="flex items-center gap-1 text-xs font-mono text-[#768e81]">
                      <MapPin size={13} className="text-[#00df81]" />
                      <span>{exp.location}</span>
                    </span>
                  </div>
                </div>

                <ul className="space-y-2.5 mt-5 pt-5 border-t border-[#13241b]">
                  {exp.details.map((detail, dIdx) => (
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
      </div>
    </section>
  );
};

