/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';
import { IntroAnimation } from './components/IntroAnimation';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { ExperienceSection } from './components/ExperienceSection';
import { SkillsBento } from './components/SkillsBento';
import { ProjectsSection } from './components/ProjectsSection';
import { GithubHeatmap } from './components/GithubHeatmap';
import { InteractiveTerminal } from './components/InteractiveTerminal';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { ResumeModal } from './components/ResumeModal';
import { CustomizerDrawer } from './components/CustomizerDrawer';
import { PasswordGateModal } from './components/PasswordGateModal';
import { SeoPage } from './components/SeoPage';

const PortfolioMainContent: React.FC = () => {
  const { currentPage } = usePortfolio();

  return (
    <div className="min-h-screen bg-[#070b09] text-[#e3ece7] selection:bg-[#00df81] selection:text-[#070b09] relative overflow-x-hidden">
      {/* Intro Splash Animation */}
      <IntroAnimation />

      {/* Floating Pill Navigation with Scroll Progress */}
      <Navbar />

      {/* Conditional View: Dedicated SEO Landing Page or Full Portfolio */}
      {currentPage === 'seo' ? (
        <SeoPage />
      ) : (
        <main>
          <Hero />
          <AboutSection />
          <ExperienceSection />
          <SkillsBento />
          <ProjectsSection />
          <GithubHeatmap />
          <InteractiveTerminal />
          <ContactSection />
        </main>
      )}

      {/* Footer with SEO index link and Replay button */}
      <Footer />

      {/* Modals and Hidden Drawers */}
      <ProjectModal />
      <ResumeModal />
      <CustomizerDrawer />
      <PasswordGateModal />
    </div>
  );
};

export default function App() {
  return (
    <PortfolioProvider>
      <PortfolioMainContent />
    </PortfolioProvider>
  );
}
