import React from 'react';
import { X, Download, Printer, ExternalLink, Mail, MapPin, Globe } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { playCyberClick } from '../utils/audio';

export const ResumeModal: React.FC = () => {
  const { isCvModalOpen, setIsCvModalOpen, portfolio } = usePortfolio();

  if (!isCvModalOpen) return null;

  const handleClose = () => {
    playCyberClick(700, 0.04);
    setIsCvModalOpen(false);
  };

  const handlePrint = () => {
    playCyberClick(800, 0.04);
    window.print();
  };

  const handleDownloadText = () => {
    playCyberClick(800, 0.04);
    const content = `=====================================================
${portfolio.name.toUpperCase()} - CURRICULUM VITAE
${portfolio.headlineRole}
Location: ${portfolio.location}
Email: ${portfolio.email}
GitHub: ${portfolio.github}
LinkedIn: ${portfolio.linkedin}
=====================================================

EDUCATION:
${portfolio.education
  .map(
    (e) => `
* ${e.degree} - ${e.institution} (${e.period})
  Location: ${e.location}
  Details:
  ${e.details.map((d) => `  - ${d}`).join('\n')}`
  )
  .join('\n')}

PROFESSIONAL EXPERIENCE:
${portfolio.experience
  .map(
    (exp) => `
* ${exp.title} - ${exp.company} (${exp.period})
  Role: ${exp.roleNum} | Location: ${exp.location}
  Details:
  ${exp.details.map((d) => `  - ${d}`).join('\n')}`
  )
  .join('\n')}

TECHNICAL SKILLS:
- Languages & Stacks: C++, Python, TypeScript, C#, Java, C, React, Next.js, Node.js, Spring Boot, MySQL, Appwrite
- Key Domains: Full-Stack Engineering, System Architecture, Cybersecurity, Competitive Programming

SELECTED PROJECTS:
${portfolio.projects.map((p) => `* ${p.title} [${p.typeBadge}]: ${p.description}`).join('\n')}

RESEARCH:
* Network Intrusion Detection Systems (NIDS) using Machine Learning & Deep Learning (Manuscript Under Review)
=====================================================`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `CV-${portfolio.name.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={handleClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl bg-[#09110d] border border-[#1a3828] rounded-3xl shadow-2xl max-h-[92vh] flex flex-col overflow-hidden text-left"
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#14261d] bg-[#0c1611]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00df81]" />
            <span className="text-xs font-mono font-bold text-white tracking-wider">
              CURRICULUM VITAE // PREVIEW
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0e1c15] hover:bg-[#14281f] text-xs font-mono text-[#00df81] border border-[#193829] transition-colors cursor-pointer"
              title="Print CV"
            >
              <Printer size={13} />
              <span className="hidden sm:inline">Print / Save PDF</span>
            </button>

            <button
              onClick={handleDownloadText}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#00df81] hover:bg-[#05f08d] text-xs font-mono font-bold text-[#06100b] transition-colors cursor-pointer"
              title="Download Text Resume"
            >
              <Download size={13} />
              <span>Download (.txt)</span>
            </button>

            <button
              onClick={handleClose}
              className="p-1.5 rounded-lg hover:bg-[#13241b] text-[#71897c] hover:text-white cursor-pointer ml-2"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* CV Document Body */}
        <div className="p-8 overflow-y-auto space-y-8 scrollbar-thin text-[#c9dbd1]">
          {/* Header info */}
          <div className="border-b border-[#14261d] pb-6">
            <h2 className="text-3xl font-extrabold text-white tracking-tight">{portfolio.name}</h2>
            <p className="text-sm font-mono text-[#00df81] mt-1">{portfolio.headlineRole}</p>
            <div className="flex flex-wrap gap-4 text-xs font-mono text-[#768e80] mt-3">
              <span className="flex items-center gap-1">
                <MapPin size={12} className="text-[#00df81]" />
                {portfolio.location}
              </span>
              <span className="flex items-center gap-1">
                <Mail size={12} className="text-[#00df81]" />
                {portfolio.email}
              </span>
              <span className="flex items-center gap-1">
                <Globe size={12} className="text-[#00df81]" />
                {portfolio.github.replace(/^https?:\/\//, '')}
              </span>
            </div>
          </div>

          {/* Education */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-widest text-[#00df81] font-bold mb-4">
              EDUCATION
            </h3>
            <div className="space-y-4">
              {portfolio.education.map((edu) => (
                <div key={edu.id} className="text-xs leading-relaxed">
                  <div className="flex justify-between font-bold text-white text-sm">
                    <span>{edu.degree}</span>
                    <span className="font-mono text-[#00df81]">{edu.period}</span>
                  </div>
                  <div className="text-[#7e9789] font-medium mb-1">
                    {edu.institution} — {edu.location}
                  </div>
                  <ul className="list-disc list-inside text-[#9db3a6] space-y-1">
                    {edu.details.map((d, i) => (
                      <li key={i}>{d}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Professional Experience */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-widest text-[#00df81] font-bold mb-4">
              PROFESSIONAL EXPERIENCE
            </h3>
            <div className="space-y-5">
              {portfolio.experience.map((exp) => (
                <div key={exp.id} className="text-xs leading-relaxed">
                  <div className="flex justify-between font-bold text-white text-sm">
                    <span>
                      {exp.title} • <span className="text-[#00df81]">{exp.company}</span>
                    </span>
                    <span className="font-mono text-[#7e9789]">{exp.period}</span>
                  </div>
                  <div className="text-[#657d70] font-mono mb-1">
                    {exp.roleNum} | {exp.location}
                  </div>
                  <ul className="list-disc list-inside text-[#9db3a6] space-y-1">
                    {exp.details.map((d, i) => (
                      <li key={i}>{d}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Core Technical Stacks */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-widest text-[#00df81] font-bold mb-3">
              TECHNICAL COMPETENCIES
            </h3>
            <p className="text-xs text-[#9db3a6] leading-relaxed">
              <strong>Languages & Core:</strong> C++, Python, TypeScript, JavaScript, C#, Java, C <br />
              <strong>Web & Mobile:</strong> Next.js, React, Tailwind CSS, React Native, Expo Go <br />
              <strong>Backend & Systems:</strong> Node.js, .NET, Spring Boot, MySQL, Appwrite, ESP32, Arduino, Git
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
