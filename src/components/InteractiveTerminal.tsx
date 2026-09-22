import React, { useState, useRef, useEffect } from 'react';
import { Terminal, Copy, Check, Sparkles, CornerDownLeft, Terminal as TerminalIcon } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { audioManager } from '../utils/audio';
import { FadeInSection } from './FadeInSection';

interface TerminalLine {
  id: string;
  type: 'command' | 'output' | 'system';
  content: string;
  highlight?: boolean;
}

export const InteractiveTerminal: React.FC = () => {
  const { portfolio, navigateToPage } = usePortfolio();
  const [copied, setCopied] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initial terminal output matching the video exactly
  const initialLines: TerminalLine[] = [
    { id: '1', type: 'command', content: 'whoami' },
    { id: '2', type: 'output', content: portfolio.name, highlight: true },
    { id: '3', type: 'command', content: 'research -status' },
    { id: '4', type: 'output', content: '1 Manuscript Completed (Under Review / Upcoming Publication)' },
    { id: '5', type: 'command', content: 'research -topic' },
    { id: '6', type: 'output', content: 'NIDS using Machine Learning & Deep Learning', highlight: true },
    { id: '7', type: 'command', content: 'cp -profile' },
    { id: '8', type: 'output', content: `${portfolio.codeforcesHandle} (Pupil) • Codeforces` },
    { id: '9', type: 'command', content: 'algorithms -focus' },
    { id: '10', type: 'output', content: 'Graphs • Dynamic Programming • Number Theory • Trees', highlight: true },
  ];

  const [lines, setLines] = useState<TerminalLine[]>(initialLines);

  const handleCopyTerminal = () => {
    audioManager.playSuccessChime();
    const textToCopy = lines
      .map((l) => (l.type === 'command' ? `$ ${l.content}` : l.content))
      .join('\n');
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const executeCommandString = (rawCmd: string) => {
    const trimmed = rawCmd.trim();
    if (!trimmed) return;

    audioManager.playCommandExecute();
    const cmd = trimmed.toLowerCase();

    // Add command to history
    setCommandHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);

    const newLines: TerminalLine[] = [
      ...lines,
      { id: Date.now().toString(), type: 'command', content: trimmed },
    ];

    if (cmd === 'clear') {
      setLines(initialLines);
      setInputVal('');
      return;
    } else if (cmd === 'help') {
      newLines.push({
        id: (Date.now() + 1).toString(),
        type: 'output',
        content:
          'Available commands:\n  whoami             Display developer identity\n  research           Show research publication status & topic\n  cp                 Display competitive programming statistics\n  algorithms         Current algorithm focus areas\n  skills             List top technologies and competencies\n  projects           List selected works & applications\n  contact            Show communication channels\n  seo                Canonical SEO dossier & index route (/seo, /#seo)\n  clear              Restore initial terminal buffer\n  date               Print current local timestamp\n  sudo [action]      Superuser privileges tester',
      });
    } else if (cmd === 'whoami') {
      newLines.push({
        id: (Date.now() + 1).toString(),
        type: 'output',
        content: `${portfolio.name} (MONTA) — ${portfolio.university}`,
        highlight: true,
      });
    } else if (cmd.startsWith('research')) {
      newLines.push({
        id: (Date.now() + 1).toString(),
        type: 'output',
        content:
          'Status: 1 Manuscript Completed (Under Review / Upcoming Publication)\nDomain: Network Intrusion Detection Systems (NIDS)\nStack: Python, Scikit-Learn, PyTorch, Deep Learning, Feature Engineering',
        highlight: true,
      });
    } else if (cmd.startsWith('cp')) {
      newLines.push({
        id: (Date.now() + 1).toString(),
        type: 'output',
        content: `Codeforces: ${portfolio.codeforcesHandle} (Pupil)\nPlatform: Codeforces & AtCoder\nPrimary Language: C++20 with Fast I/O & STL optimizations`,
        highlight: true,
      });
    } else if (cmd.startsWith('algo') || cmd.startsWith('algorithm')) {
      newLines.push({
        id: (Date.now() + 1).toString(),
        type: 'output',
        content: 'Core Focus: Graphs (BFS/DFS, Dijkstra, MST), Dynamic Programming, Number Theory, Segment Trees, Disjoint Set Union',
        highlight: true,
      });
    } else if (cmd === 'skills') {
      newLines.push({
        id: (Date.now() + 1).toString(),
        type: 'output',
        content: 'Full-Stack (90%) | System Analysis (70%) | Cybersecurity (60%) | Algorithmic Problem-Solving (45%)',
        highlight: true,
      });
    } else if (cmd === 'projects') {
      newLines.push({
        id: (Date.now() + 1).toString(),
        type: 'output',
        content: portfolio.projects.map((p) => `• ${p.title} [${p.typeBadge}]`).join('\n'),
      });
    } else if (cmd === 'contact') {
      newLines.push({
        id: (Date.now() + 1).toString(),
        type: 'output',
        content: `Email: ${portfolio.email}\nGitHub: ${portfolio.github}\nLinkedIn: ${portfolio.linkedin}`,
        highlight: true,
      });
    } else if (cmd === 'seo' || cmd.startsWith('seo ') || cmd === 'dossier') {
      newLines.push({
        id: (Date.now() + 1).toString(),
        type: 'output',
        content: `[SEO AUTHORITY DOSSIER]\nCanonical Route: /#seo (Direct URL: /seo)\nIndex Status: Google, Bing, DuckDuckGo Knowledge Schema Verified\nTarget Keywords: monta, montaherul, 1st it, iiuc\nNavigating to SEO Dossier...`,
        highlight: true,
      });
      setTimeout(() => {
        navigateToPage('seo');
      }, 600);
    } else if (cmd === 'date') {
      newLines.push({
        id: (Date.now() + 1).toString(),
        type: 'output',
        content: new Date().toString(),
      });
    } else if (cmd.startsWith('sudo')) {
      newLines.push({
        id: (Date.now() + 1).toString(),
        type: 'output',
        content: 'Permission denied: MONTA terminal architecture is secure and immutable.',
      });
    } else {
      newLines.push({
        id: (Date.now() + 1).toString(),
        type: 'output',
        content: `bash: command not found: ${trimmed}. Type "help" for a list of valid commands.`,
      });
    }

    setLines(newLines);
    setInputVal('');
  };

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeCommandString(inputVal);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      audioManager.playHoverPing(1200);
      if (commandHistory.length > 0) {
        const nextIdx = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(nextIdx);
        setInputVal(commandHistory[nextIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      audioManager.playHoverPing(1200);
      if (historyIndex !== -1) {
        const nextIdx = historyIndex + 1;
        if (nextIdx < commandHistory.length) {
          setHistoryIndex(nextIdx);
          setInputVal(commandHistory[nextIdx]);
        } else {
          setHistoryIndex(-1);
          setInputVal('');
        }
      }
    } else if (e.key !== 'Enter') {
      // Keystroke sound for typing inside the terminal
      audioManager.playTerminalKeystroke();
    }
  };

  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [lines]);

  return (
    <section id="research" className="py-24 relative border-t border-[#121f19]">
      <div className="w-full max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Heading and Context */}
          <FadeInSection className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0a1811] border border-[#143525] text-[#00df81] text-xs font-mono tracking-widest uppercase mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00df81]" />
              <span>RESEARCH & COMPETITIVE PROGRAMMING</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-6">
              Scientific curiosity & algorithmic rigour.
            </h2>

            <p className="text-base sm:text-lg text-[#90a699] leading-relaxed mb-8">
              Balancing formal investigative research in computer science with high-tempo algorithmic problem-solving on competitive platforms.
            </p>

            {/* Quick Badges */}
            <div className="space-y-3 font-mono text-xs">
              <div className="p-3 rounded-xl bg-[#0b1410] border border-[#162a20] flex items-center justify-between">
                <span className="text-[#789283]">Research Focus</span>
                <span className="text-[#00df81] font-semibold">NIDS • ML / DL</span>
              </div>
              <div className="p-3 rounded-xl bg-[#0b1410] border border-[#162a20] flex items-center justify-between">
                <span className="text-[#789283]">Competitive Rank</span>
                <span className="text-white font-semibold">Codeforces Pupil</span>
              </div>
              <div className="p-3 rounded-xl bg-[#0b1410] border border-[#162a20] flex items-center justify-between">
                <span className="text-[#789283]">Target Algorithms</span>
                <span className="text-white font-semibold">DP • Graphs • Number Theory</span>
              </div>
            </div>
          </FadeInSection>

          {/* Right Column: Terminal Window matching the video */}
          <FadeInSection delay={0.15} className="lg:col-span-7">
            <div className="bg-[#09110d] border border-[#172e22] rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.7)] font-mono">
              {/* Terminal Top Bar */}
              <div className="flex items-center justify-between px-4 py-3 bg-[#0c1611] border-b border-[#14261d]">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f56]/80" />
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e]/80" />
                  <div className="w-3 h-3 rounded-full bg-[#27c93f]/80" />
                  <span className="ml-2 text-xs font-bold text-[#b4ccc0] tracking-wider">
                    _&gt; MONTA_TERMINAL.SH
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1.5 text-[11px] text-[#00df81]">
                    <span className="w-2 h-2 rounded-full bg-[#00df81] animate-ping" />
                    <span>• active</span>
                  </span>

                  <button
                    onClick={handleCopyTerminal}
                    onMouseEnter={() => audioManager.playHoverPing(1500)}
                    className="p-1.5 rounded-md hover:bg-[#13241b] text-[#6d8477] hover:text-[#00df81] transition-colors cursor-pointer"
                    title="Copy terminal session"
                  >
                    {copied ? <Check size={14} className="text-[#00df81]" /> : <Copy size={14} />}
                  </button>
                </div>
              </div>

              {/* Quick Interactive Command Chips with Audio Feedback */}
              <div className="flex flex-wrap items-center gap-1.5 px-4 py-2 bg-[#0b1611] border-b border-[#13241b]">
                <span className="text-[10px] text-[#527060] uppercase tracking-wider font-mono mr-1 select-none flex items-center gap-1">
                  <Sparkles size={10} className="text-[#00df81]" /> Quick Run:
                </span>
                {['whoami', 'research', 'cp', 'algorithms', 'skills', 'projects', 'seo', 'help', 'clear'].map((quickCmd) => (
                  <button
                    key={quickCmd}
                    type="button"
                    onClick={() => {
                      executeCommandString(quickCmd);
                      inputRef.current?.focus();
                    }}
                    onMouseEnter={() => audioManager.playHoverPing(1420)}
                    className="px-2 py-0.5 rounded bg-[#0f1f18] hover:bg-[#153123] text-[11px] font-mono text-[#89a597] hover:text-[#00df81] border border-[#183023] hover:border-[#1e4834] transition-all cursor-pointer shadow-sm active:scale-95"
                  >
                    {quickCmd}
                  </button>
                ))}
              </div>

              {/* Terminal Screen */}
              <div
                onClick={() => {
                  audioManager.playNavClick(650, 0.02);
                  inputRef.current?.focus();
                }}
                className="p-5 min-h-[320px] max-h-[440px] overflow-y-auto text-xs leading-relaxed scrollbar-thin cursor-text"
              >
                {lines.map((line) => (
                  <div key={line.id} className="mb-2.5">
                    {line.type === 'command' ? (
                      <div className="flex items-center gap-2 text-[#7f988b]">
                        <span className="text-[#00df81] select-none font-bold">$</span>
                        <span className="text-white font-semibold">{line.content}</span>
                      </div>
                    ) : (
                      <div
                        className={`pl-4 whitespace-pre-wrap ${
                          line.highlight
                            ? 'text-[#00df81] font-semibold drop-shadow-[0_0_8px_rgba(0,223,129,0.3)]'
                            : 'text-[#9cb2a6]'
                        }`}
                      >
                        {line.content}
                      </div>
                    )}
                  </div>
                ))}

                {/* Interactive CLI Input Line */}
                <form onSubmit={handleCommandSubmit} className="flex items-center gap-2 mt-4 pt-2 border-t border-[#122219]">
                  <span className="text-[#00df81] font-bold select-none">$</span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="type 'help' or command..."
                    className="flex-1 bg-transparent text-white outline-none placeholder-[#4d6356] font-mono text-xs"
                    autoComplete="off"
                    spellCheck="false"
                  />
                  <button
                    type="submit"
                    className="text-[#00df81] hover:text-white p-1 rounded transition-colors cursor-pointer"
                    title="Execute"
                  >
                    <CornerDownLeft size={13} />
                  </button>
                </form>

                <div ref={terminalEndRef} />
              </div>

              {/* Terminal Footer Hint */}
              <div className="px-4 py-2 bg-[#0a140f] border-t border-[#13241b] text-[10px] text-[#556c5f] flex justify-between items-center">
                <span>Interactive CLI: type 'help', 'whoami', 'skills', 'clear'</span>
                <span>bash 5.2.15</span>
              </div>
            </div>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
};
