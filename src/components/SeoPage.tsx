import React from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  MapPin,
  School,
  Building2,
  Search,
  Sparkles,
  ShieldCheck,
  Code2,
  Cpu,
  Globe
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const SeoPage: React.FC = () => {
  const { portfolio, navigateToPage } = usePortfolio();

  return (
    <article
      id="seo-authority-page"
      className="min-h-screen bg-[#070b09] text-[#e3ece7] pt-24 pb-28 px-6 selection:bg-[#00df81] selection:text-[#070b09]"
    >
      <div className="w-full max-w-4xl mx-auto text-left">
        {/* Breadcrumb & Navigation */}
        <div className="flex items-center justify-between gap-4 mb-8 pb-4 border-b border-[#14261d]">
          <button
            onClick={() => navigateToPage('portfolio')}
            className="inline-flex items-center gap-2 text-xs font-mono text-[#00df81] hover:text-[#57ebb0] px-3.5 py-1.5 rounded-full bg-[#0d2217] border border-[#16432f] transition-all cursor-pointer"
          >
            <ArrowLeft size={14} />
            <span>Back to Interactive Portfolio</span>
          </button>

          <span className="text-xs font-mono text-[#627a6d]">
            Official Canonical Profile // Google Index Archive
          </span>
        </div>

        {/* SEO Main Heading / Identity */}
        <header className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0a1811] border border-[#143525] text-[#00df81] text-xs font-mono tracking-widest uppercase mb-4">
            <Search size={13} />
            <span>OFFICIAL DEVELOPER PROFILE & SEARCH INDEX</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-[1.1] mb-4">
            Montaherul Islam <span className="text-[#00df81]">(Monta)</span>
          </h1>

          <p className="text-lg sm:text-xl text-[#b4ccc0] font-medium leading-relaxed mb-6">
            Software Engineer, 1st IT Technical Lead, CSE Undergraduate at International Islamic University Chittagong (IIUC), and Algorithmic Researcher.
          </p>

          {/* Keyword Pill Cloud for Search Crawlers & Discoverability */}
          <div className="p-4 rounded-2xl bg-[#0a1410] border border-[#172c21] mb-8">
            <span className="text-[11px] font-mono text-[#668072] uppercase tracking-wider block mb-2.5">
              Verified Search Identifiers & Queries
            </span>
            <div className="flex flex-wrap gap-2">
              {[
                'monta',
                '1st it',
                'montaherul',
                'montaherlislam',
                'montaherul iiuc',
                'Montaherul islam',
                'Montaherul Islam IIUC',
                '1st IT tech',
                'Montaherul Islam',
                'MONTA',
                'montaherul portfolio',
              ].map((term) => (
                <span
                  key={term}
                  className="px-2.5 py-1 rounded-lg text-xs font-mono bg-[#0e1e17] text-[#00df81] border border-[#173827]"
                >
                  #{term}
                </span>
              ))}
            </div>
          </div>
        </header>

        {/* Section 1: Executive Overview */}
        <section className="mb-12 space-y-4">
          <h2 className="text-2xl font-bold text-white border-b border-[#14261d] pb-2">
            Executive Summary: Who is Montaherul Islam?
          </h2>
          <p className="text-sm sm:text-base text-[#92a89c] leading-relaxed">
            <strong>Montaherul Islam</strong> (commonly known in developer and academic circles as{' '}
            <strong>Monta</strong>, <strong>montaherlislam</strong>, and <strong>montaherul</strong>) is a versatile software engineer, full-stack web developer,
            and competitive programming specialist based in Chittagong, Bangladesh.
          </p>
          <p className="text-sm sm:text-base text-[#92a89c] leading-relaxed">
            As an undergraduate in the Department of Computer Science & Engineering at the{' '}
            <strong>International Islamic University Chittagong (IIUC)</strong> (searchable as{' '}
            <em>montaherul iiuc</em>), Montaherul bridges high-tempo practical product development with rigorous
            algorithmic foundations and machine learning research in network security.
          </p>
        </section>

        {/* Section 2: 1st IT & Professional Leadership */}
        <section className="mb-12 space-y-4">
          <h2 className="text-2xl font-bold text-white border-b border-[#14261d] pb-2">
            Technology Leadership at 1st IT & Ventures
          </h2>
          <p className="text-sm sm:text-base text-[#92a89c] leading-relaxed">
            Across his engineering career, Montaherul has served in key engineering roles:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-5 rounded-2xl bg-[#0b1410] border border-[#162a20]">
              <div className="flex items-center gap-2 text-[#00df81] font-bold text-sm mb-1">
                <Building2 size={16} />
                <span>1st IT & Technology Ventures</span>
              </div>
              <p className="text-xs text-[#8ca094] leading-relaxed">
                Directing system architecture, scalable web applications, client solutions, and high-performance digital platforms with modern micro-service and Next.js architectures.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#0b1410] border border-[#162a20]">
              <div className="flex items-center gap-2 text-[#00df81] font-bold text-sm mb-1">
                <Building2 size={16} />
                <span>Amplytic & Bridge Marketing</span>
              </div>
              <p className="text-xs text-[#8ca094] leading-relaxed">
                Co-Founder and Software Developer driving cloud infrastructure, data visualization tools, and high-conversion web experiences.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Academic Credentials at IIUC */}
        <section className="mb-12 space-y-4">
          <h2 className="text-2xl font-bold text-white border-b border-[#14261d] pb-2">
            Academic Track: Montaherul at IIUC (Chittagong)
          </h2>
          <div className="p-6 rounded-2xl bg-[#0b1410] border border-[#162a20] space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-lg font-bold text-white">
                BSc in Computer Science & Engineering (CSE)
              </h3>
              <span className="text-xs font-mono text-[#00df81] px-2.5 py-0.5 rounded bg-[#0c2419] border border-[#15422d]">
                2023 – Present
              </span>
            </div>
            <p className="text-sm text-[#00df81] font-medium flex items-center gap-1.5">
              <School size={15} />
              <span>International Islamic University Chittagong (IIUC)</span>
            </p>
            <ul className="space-y-1.5 text-xs text-[#8ca094] list-disc list-inside pt-2">
              <li>Concentration: Data Structures, Algorithms, Software Architecture, Cryptography & Systems.</li>
              <li>Active participant in inter-university competitive programming contests (ICPC and regional rounds).</li>
              <li>Leading university project groups, open-source repositories, and peer mentorship.</li>
            </ul>
          </div>
        </section>

        {/* Section 4: Machine Learning & Scientific Research */}
        <section className="mb-12 space-y-4">
          <h2 className="text-2xl font-bold text-white border-b border-[#14261d] pb-2">
            Research & Competitive Programming Publications
          </h2>
          <div className="space-y-4">
            <div className="p-5 rounded-2xl bg-[#0b1410] border border-[#162a20]">
              <div className="text-xs font-mono text-[#00df81] uppercase tracking-wider mb-1">
                Completed Manuscript // Under Review
              </div>
              <h3 className="text-base font-bold text-white mb-2">
                Network Intrusion Detection Systems (NIDS) using Machine Learning & Deep Learning
              </h3>
              <p className="text-xs text-[#8ca094] leading-relaxed">
                Investigating high-accuracy feature extraction and real-time anomalous packet classification using supervised learning and deep neural networks to prevent distributed denial of service and zero-day intrusion vectors.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#0b1410] border border-[#162a20]">
              <div className="text-xs font-mono text-[#00df81] uppercase tracking-wider mb-1">
                Competitive Programming Platform Rank
              </div>
              <h3 className="text-base font-bold text-white mb-2">
                Codeforces Profile: {portfolio.codeforcesHandle} (Pupil Rank)
              </h3>
              <p className="text-xs text-[#8ca094] leading-relaxed">
                Specialized in graph theory, dynamic programming, number theory, and advanced data structures (Segment Trees, Disjoint Set Unions) with fast C++20 standard library implementations.
              </p>
            </div>
          </div>
        </section>

        {/* Section 5: Major Software Engineering Projects */}
        <section className="mb-12 space-y-4">
          <h2 className="text-2xl font-bold text-white border-b border-[#14261d] pb-2">
            Selected Software Projects by Montaherul Islam
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                title: 'Bridge Marketing',
                tech: 'Next.js, TypeScript, Tailwind CSS',
                desc: 'Digital presence for London agency, sub-second latency and custom case study modules.',
              },
              {
                title: 'DrawSync',
                tech: '.NET, C#, Appwrite',
                desc: 'Multi-user collaborative digital whiteboard with real-time cursor tracking.',
              },
              {
                title: 'K.I.T.E. Fleet System',
                tech: 'Node.js, JavaScript',
                desc: 'Drone fleet geospatial telemetry coordination and unmanned aerial vehicle flight routing.',
              },
              {
                title: 'ClassRep IIUC',
                tech: 'Node.js, Appwrite',
                desc: 'Campus utility for empty classroom detection and academic routine schedules.',
              },
            ].map((p) => (
              <div key={p.title} className="p-4 rounded-xl bg-[#0b1410] border border-[#162a20]">
                <h3 className="text-sm font-bold text-white">{p.title}</h3>
                <span className="text-[11px] font-mono text-[#00df81] block mb-1.5">{p.tech}</span>
                <p className="text-xs text-[#8ca094] leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 6: FAQ for Search Engine Featured Snippets */}
        <section className="mb-12 space-y-4">
          <h2 className="text-2xl font-bold text-white border-b border-[#14261d] pb-2">
            Frequently Asked Questions (FAQ)
          </h2>
          <div className="space-y-3 text-left">
            <details className="p-4 rounded-xl bg-[#0b1410] border border-[#162a20] cursor-pointer group">
              <summary className="text-sm font-bold text-white flex items-center justify-between">
                <span>Who is Montaherul Islam (Monta)?</span>
                <span className="text-[#00df81]">+</span>
              </summary>
              <p className="text-xs text-[#90a699] leading-relaxed mt-2.5 pt-2.5 border-t border-[#14261d]">
                Montaherul Islam (Monta) is a computer scientist, full-stack web engineer, and competitive programmer studying CSE at IIUC, working on web systems and cybersecurity research.
              </p>
            </details>

            <details className="p-4 rounded-xl bg-[#0b1410] border border-[#162a20] cursor-pointer group">
              <summary className="text-sm font-bold text-white flex items-center justify-between">
                <span>What is Montaherul's role in 1st IT?</span>
                <span className="text-[#00df81]">+</span>
              </summary>
              <p className="text-xs text-[#90a699] leading-relaxed mt-2.5 pt-2.5 border-t border-[#14261d]">
                At 1st IT, Montaherul oversees modern web engineering, front-end and back-end integration, and digital product solutions tailored for reliable client impact.
              </p>
            </details>

            <details className="p-4 rounded-xl bg-[#0b1410] border border-[#162a20] cursor-pointer group">
              <summary className="text-sm font-bold text-white flex items-center justify-between">
                <span>How can I contact Montaherul Islam?</span>
                <span className="text-[#00df81]">+</span>
              </summary>
              <p className="text-xs text-[#90a699] leading-relaxed mt-2.5 pt-2.5 border-t border-[#14261d]">
                You can email directly at <strong>montaherul26@gmail.com</strong>, or connect via GitHub (@montaherul) and LinkedIn.
              </p>
            </details>
          </div>
        </section>

        {/* Section 7: Verified Contact & Social Handles */}
        <footer className="pt-8 border-t border-[#14261d] space-y-4">
          <h2 className="text-xl font-bold text-white">Verified Contact & Links</h2>
          <div className="flex flex-wrap gap-3">
            <a
              href="mailto:montaherul26@gmail.com"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0d2217] border border-[#18422e] text-xs font-mono text-[#00df81] hover:text-white transition-colors"
            >
              <Mail size={14} />
              <span>montaherul26@gmail.com</span>
            </a>

            <a
              href={portfolio.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0b1410] border border-[#162a20] text-xs font-mono text-[#c0d4ca] hover:text-white transition-colors"
            >
              <Github size={14} />
              <span>GitHub: @{portfolio.github.split('/').filter(Boolean).pop() || 'montaherul'}</span>
            </a>

            <button
              onClick={() => navigateToPage('portfolio')}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-[#00df81] text-[#06100b] font-bold text-xs tracking-wide hover:bg-[#05f08d] transition-colors cursor-pointer ml-auto"
            >
              <span>Explore Interactive Portfolio</span>
              <ArrowLeft size={13} className="rotate-180" />
            </button>
          </div>
        </footer>
      </div>
    </article>
  );
};
