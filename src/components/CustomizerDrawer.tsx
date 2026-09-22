import React, { useState } from 'react';
import {
  X,
  Sliders,
  RotateCcw,
  Download,
  Upload,
  Plus,
  Trash2,
  Edit2,
  Check,
  Sparkles,
  MessageSquare,
  User,
  FolderGit2,
  Briefcase,
  GraduationCap,
  Layers,
  Palette,
  Eye,
  ShieldCheck,
  Volume2,
  VolumeX,
  Lock,
  Unlock,
  Play,
  Activity,
  Headphones,
  SlidersHorizontal,
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { ProjectItem } from '../types';
import { audioManager } from '../utils/audio';
import { THEME_PALETTES } from '../data/themes';

export const CustomizerDrawer: React.FC = () => {
  const {
    portfolio,
    updatePortfolioData,
    resetPortfolioData,
    exportJsonConfig,
    importJsonConfig,
    isCustomizerOpen,
    setIsCustomizerOpen,
    isAdminAuthenticated,
    lockAdmin,
    messages,
    isAlterEgo,
    toggleAvatar,
    currentTheme,
    setTheme,
    toggleHighContrast,
    isHighContrast,
    soundOn,
    setSoundOn,
    toggleSound,
    soundVolume,
    setSoundVolume,
    verifyPassword,
  } = usePortfolio();

  const [activeTab, setActiveTab] = useState<'audio' | 'theme' | 'profile' | 'projects' | 'skills' | 'messages' | 'backup' | 'auth'>('audio');
  const [importText, setImportText] = useState('');
  const [importError, setImportError] = useState(false);
  const [passcodeAttempt, setPasscodeAttempt] = useState('');
  const [passcodeError, setPasscodeError] = useState(false);
  const [activeAudioTest, setActiveAudioTest] = useState<string | null>(null);

  // New Project State
  const [newProjTitle, setNewProjTitle] = useState('');
  const [newProjBadge, setNewProjBadge] = useState('WEB APPLICATION');
  const [newProjDesc, setNewProjDesc] = useState('');
  const [newProjTech, setNewProjTech] = useState('React, TypeScript, Tailwind CSS');
  const [newProjCategory, setNewProjCategory] = useState<'professional' | 'academic' | 'systems' | 'mobile' | 'collaborative'>('professional');

  if (!isCustomizerOpen) return null;

  const handleClose = () => {
    audioManager.playNavClick(700, 0.04);
    setIsCustomizerOpen(false);
  };

  const handlePasscodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = verifyPassword(passcodeAttempt);
    if (success) {
      setPasscodeError(false);
      setPasscodeAttempt('');
      setActiveTab('profile');
      audioManager.playSuccessChime();
    } else {
      setPasscodeError(true);
      audioManager.playNavClick(400, 0.08);
    }
  };

  const testSound = (id: string, playFn: () => void) => {
    setActiveAudioTest(id);
    playFn();
    setTimeout(() => setActiveAudioTest(null), 300);
  };

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjTitle.trim() || !newProjDesc.trim()) return;

    const newProject: ProjectItem = {
      id: `p-custom-${Date.now()}`,
      title: newProjTitle.trim(),
      typeBadge: newProjBadge.trim().toUpperCase(),
      description: newProjDesc.trim(),
      category: newProjCategory,
      techStack: newProjTech.split(',').map((t) => t.trim()).filter(Boolean),
      featured: true,
    };

    updatePortfolioData({
      projects: [newProject, ...portfolio.projects],
    });

    setNewProjTitle('');
    setNewProjDesc('');
    audioManager.playSuccessChime();
  };

  const handleDeleteProject = (id: string) => {
    audioManager.playNavClick(600, 0.05);
    updatePortfolioData({
      projects: portfolio.projects.filter((p) => p.id !== id),
    });
  };

  const handleSkillChange = (name: string, newPercentage: number) => {
    const updated = portfolio.skillDomains.map((s) =>
      s.name === name ? { ...s, percentage: newPercentage } : s
    );
    updatePortfolioData({ skillDomains: updated });
  };

  const handleImportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = importJsonConfig(importText);
    if (success) {
      setImportError(false);
      setImportText('');
    } else {
      setImportError(true);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={handleClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl bg-[#08100c] border-l border-[#193527] h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-300 text-left"
      >
        {/* Top Drawer Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#14261d] bg-[#0c1611]">
          <div className="flex items-center gap-2">
            <Sliders size={18} className="text-[#00df81]" />
            <span className="font-bold text-sm text-white tracking-wide">
              {isAdminAuthenticated ? 'Dynamic Portfolio Editor' : 'Settings & Sensory Controls'}
            </span>
            <span
              className={`px-2 py-0.5 rounded text-[10px] font-mono border ${
                isAdminAuthenticated
                  ? 'bg-[#0c2e1f] text-[#00df81] border-[#164c34]'
                  : 'bg-[#111f17] text-[#7ea591] border-[#193828]'
              }`}
            >
              {isAdminAuthenticated ? 'Admin Authed' : 'Preferences'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {isAdminAuthenticated ? (
              <>
                <button
                  onClick={() => {
                    lockAdmin();
                    audioManager.playNavClick(600, 0.05);
                    handleClose();
                  }}
                  className="px-2.5 py-1 text-xs font-mono text-[#f87171] hover:bg-[#2e1010] border border-[#4a1818] rounded-lg transition-colors cursor-pointer flex items-center gap-1"
                  title="Lock Admin Session"
                >
                  <Lock size={12} />
                  <span>Lock</span>
                </button>

                <button
                  onClick={() => {
                    if (confirm('Reset all customized portfolio data to original defaults?')) {
                      resetPortfolioData();
                      audioManager.playSuccessChime();
                    }
                  }}
                  className="px-2.5 py-1 text-xs font-mono text-[#789283] hover:text-[#f87171] border border-[#172c21] rounded-lg transition-colors cursor-pointer flex items-center gap-1"
                  title="Reset to initial data"
                >
                  <RotateCcw size={12} />
                  <span className="hidden sm:inline">Reset</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  setActiveTab('auth');
                  audioManager.playNavClick(700, 0.03);
                }}
                className="px-2.5 py-1 text-xs font-mono text-[#7ea591] hover:text-[#00df81] hover:bg-[#11241a] border border-[#172e21] rounded-lg transition-colors cursor-pointer flex items-center gap-1"
                title="Enter Admin Passcode"
              >
                <Unlock size={12} />
                <span>Admin Login</span>
              </button>
            )}

            <button
              onClick={handleClose}
              className="p-1.5 rounded-lg text-[#71897c] hover:text-white hover:bg-[#13241b] cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#14261d] bg-[#0a140f] overflow-x-auto scrollbar-none px-4 text-xs font-mono">
          {/* Audio Tab (Always visible) */}
          <button
            onClick={() => {
              setActiveTab('audio');
              audioManager.playNavClick(700, 0.03);
            }}
            onMouseEnter={() => audioManager.playHoverPing(1450)}
            className={`px-3 py-2.5 border-b-2 font-medium flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'audio'
                ? 'border-[#00df81] text-[#00df81]'
                : 'border-transparent text-[#7d9385] hover:text-white'
            }`}
          >
            {soundOn ? <Volume2 size={13} /> : <VolumeX size={13} className="text-[#f87171]" />}
            <span>Audio & Sound</span>
          </button>

          {/* Theme Tab (Always visible) */}
          <button
            onClick={() => {
              setActiveTab('theme');
              audioManager.playNavClick(700, 0.03);
            }}
            onMouseEnter={() => audioManager.playHoverPing(1450)}
            className={`px-3 py-2.5 border-b-2 font-medium flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'theme'
                ? 'border-[#00df81] text-[#00df81]'
                : 'border-transparent text-[#7d9385] hover:text-white'
            }`}
          >
            <Palette size={13} />
            <span>Theme & A11y</span>
          </button>

          {/* Admin Tabs */}
          {isAdminAuthenticated ? (
            <>
              <button
                onClick={() => {
                  setActiveTab('profile');
                  audioManager.playNavClick(700, 0.03);
                }}
                onMouseEnter={() => audioManager.playHoverPing(1450)}
                className={`px-3 py-2.5 border-b-2 font-medium flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap ${
                  activeTab === 'profile'
                    ? 'border-[#00df81] text-[#00df81]'
                    : 'border-transparent text-[#7d9385] hover:text-white'
                }`}
              >
                <User size={13} />
                <span>Profile</span>
              </button>

              <button
                onClick={() => {
                  setActiveTab('projects');
                  audioManager.playNavClick(700, 0.03);
                }}
                onMouseEnter={() => audioManager.playHoverPing(1450)}
                className={`px-3 py-2.5 border-b-2 font-medium flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap ${
                  activeTab === 'projects'
                    ? 'border-[#00df81] text-[#00df81]'
                    : 'border-transparent text-[#7d9385] hover:text-white'
                }`}
              >
                <FolderGit2 size={13} />
                <span>Projects ({portfolio.projects.length})</span>
              </button>

              <button
                onClick={() => {
                  setActiveTab('skills');
                  audioManager.playNavClick(700, 0.03);
                }}
                onMouseEnter={() => audioManager.playHoverPing(1450)}
                className={`px-3 py-2.5 border-b-2 font-medium flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap ${
                  activeTab === 'skills'
                    ? 'border-[#00df81] text-[#00df81]'
                    : 'border-transparent text-[#7d9385] hover:text-white'
                }`}
              >
                <Layers size={13} />
                <span>Skills & Stacks</span>
              </button>

              <button
                onClick={() => {
                  setActiveTab('messages');
                  audioManager.playNavClick(700, 0.03);
                }}
                onMouseEnter={() => audioManager.playHoverPing(1450)}
                className={`px-3 py-2.5 border-b-2 font-medium flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap ${
                  activeTab === 'messages'
                    ? 'border-[#00df81] text-[#00df81]'
                    : 'border-transparent text-[#7d9385] hover:text-white'
                }`}
              >
                <MessageSquare size={13} />
                <span>Messages ({messages.length})</span>
              </button>

              <button
                onClick={() => {
                  setActiveTab('backup');
                  audioManager.playNavClick(700, 0.03);
                }}
                onMouseEnter={() => audioManager.playHoverPing(1450)}
                className={`px-3 py-2.5 border-b-2 font-medium flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap ${
                  activeTab === 'backup'
                    ? 'border-[#00df81] text-[#00df81]'
                    : 'border-transparent text-[#7d9385] hover:text-white'
                }`}
              >
                <Download size={13} />
                <span>Backup/JSON</span>
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                setActiveTab('auth');
                audioManager.playNavClick(700, 0.03);
              }}
              onMouseEnter={() => audioManager.playHoverPing(1450)}
              className={`px-3 py-2.5 border-b-2 font-medium flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'auth'
                  ? 'border-[#00df81] text-[#00df81]'
                  : 'border-transparent text-[#7d9385] hover:text-white'
              }`}
            >
              <Lock size={13} />
              <span>Owner Unlock</span>
            </button>
          )}
        </div>

        {/* Tab Content Area */}
        <div className="flex-1 overflow-y-auto p-6 scrollbar-thin space-y-6">
          {/* TAB: AUDIO & SOUND FX */}
          {activeTab === 'audio' && (
            <div className="space-y-6">
              {/* Audio Toggle Switch Banner */}
              <div className="p-5 rounded-2xl bg-[#0a1510] border border-[#173324] space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <div className={`p-1.5 rounded-lg ${soundOn ? 'bg-[#0f3020] text-[#00df81]' : 'bg-[#201515] text-[#f87171]'}`}>
                        {soundOn ? <Volume2 size={18} /> : <VolumeX size={18} />}
                      </div>
                      <h4 className="text-sm font-bold text-white tracking-wide">
                        Global Interface Sound FX
                      </h4>
                    </div>
                    <p className="text-xs text-[#80998b] leading-relaxed">
                      Tactile, soft procedural audio feedback synthesized via Web Audio API for navigation clicks, hover blips, and terminal keystrokes.
                    </p>
                  </div>

                  {/* Toggle Switch */}
                  <button
                    type="button"
                    role="switch"
                    aria-checked={soundOn}
                    onClick={() => {
                      toggleSound();
                    }}
                    onMouseEnter={() => audioManager.playHoverPing(1400)}
                    className={`relative inline-flex h-7 w-14 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      soundOn ? 'bg-[#00df81]' : 'bg-[#203127]'
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                        soundOn ? 'translate-x-7' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                {/* Status indicator bar */}
                <div className="flex items-center justify-between pt-2 border-t border-[#13261c] text-xs font-mono">
                  <span className="text-[#658273]">Audio Engine State:</span>
                  <span className={`flex items-center gap-1.5 font-bold ${soundOn ? 'text-[#00df81]' : 'text-[#f87171]'}`}>
                    <span className={`w-2 h-2 rounded-full ${soundOn ? 'bg-[#00df81] animate-pulse' : 'bg-[#f87171]'}`} />
                    {soundOn ? 'ACTIVE (Online)' : 'MUTED (Silent)'}
                  </span>
                </div>
              </div>

              {/* Volume Slider Section */}
              <div className="p-5 rounded-2xl bg-[#0a1510] border border-[#173324] space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <SlidersHorizontal size={16} className="text-[#00df81]" />
                    <span className="text-xs font-mono uppercase text-white font-bold">
                      Master Volume Control
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded font-mono text-xs font-bold bg-[#11241a] text-[#00df81] border border-[#1b3a29]">
                    {soundOn ? `${Math.round(soundVolume * 100)}%` : '0% (Muted)'}
                  </span>
                </div>

                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.02"
                    disabled={!soundOn}
                    value={soundOn ? soundVolume : 0}
                    onChange={(e) => {
                      const newVol = parseFloat(e.target.value);
                      setSoundVolume(newVol);
                      if (!soundOn && newVol > 0) {
                        setSoundOn(true);
                      }
                      // Micro click at current setting
                      audioManager.playNavClick(700, 0.02);
                    }}
                    className="w-full h-2 bg-[#12241b] rounded-lg appearance-none cursor-pointer accent-[#00df81] disabled:opacity-40 disabled:cursor-not-allowed"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-[#5f786a]">
                    <span>0% (Silent)</span>
                    <span>50% (Recommended)</span>
                    <span>100% (Max)</span>
                  </div>
                </div>

                {/* Quick Presets */}
                <div className="flex items-center gap-2 pt-2 border-t border-[#13261c]">
                  <span className="text-[11px] text-[#698475] font-mono">Presets:</span>
                  {[0.25, 0.5, 0.75, 1.0].map((volPreset) => {
                    const pct = Math.round(volPreset * 100);
                    const isCurrent = soundOn && Math.abs(soundVolume - volPreset) < 0.03;
                    return (
                      <button
                        key={pct}
                        type="button"
                        disabled={!soundOn}
                        onClick={() => {
                          setSoundVolume(volPreset);
                          audioManager.playNavClick(750, 0.03);
                        }}
                        onMouseEnter={() => audioManager.playHoverPing(1400)}
                        className={`px-2 py-1 rounded text-[11px] font-mono transition-all cursor-pointer disabled:opacity-40 ${
                          isCurrent
                            ? 'bg-[#00df81] text-black font-bold'
                            : 'bg-[#11241a] text-[#86a293] hover:text-white border border-[#1b3a29]'
                        }`}
                      >
                        {pct}%
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Soundboard Test Suite */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-mono uppercase text-white font-bold flex items-center gap-1.5">
                    <Activity size={14} className="text-[#00df81]" />
                    Interactive Sound FX Soundboard
                  </h4>
                  <span className="text-[10px] text-[#658273] font-mono">click to audition tone</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {/* 1. Hover Ping */}
                  <button
                    type="button"
                    onClick={() => testSound('hover', () => audioManager.playHoverPing(1450))}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      activeAudioTest === 'hover'
                        ? 'bg-[#143323] border-[#00df81] shadow-[0_0_12px_rgba(0,223,129,0.3)]'
                        : 'bg-[#0a1410] border-[#152a20] hover:border-[#224433]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#00df81]" />
                        <span className="text-xs font-bold text-white">Hover Ping</span>
                      </div>
                      <span className="text-[10px] font-mono text-[#00df81]">1450 Hz</span>
                    </div>
                    <p className="text-[11px] text-[#7a9385] mb-2">
                      Soft sinusoidal blip triggered when hovering over navigation links and chips.
                    </p>
                    <span className="text-[10px] font-mono text-[#4e6b5c] flex items-center gap-1">
                      <Play size={10} className="text-[#00df81]" /> Test Tone
                    </span>
                  </button>

                  {/* 2. Nav Micro-Click */}
                  <button
                    type="button"
                    onClick={() => testSound('click', () => audioManager.playNavClick(720))}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      activeAudioTest === 'click'
                        ? 'bg-[#143323] border-[#00df81] shadow-[0_0_12px_rgba(0,223,129,0.3)]'
                        : 'bg-[#0a1410] border-[#152a20] hover:border-[#224433]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#38bdf8]" />
                        <span className="text-xs font-bold text-white">Nav Micro-Click</span>
                      </div>
                      <span className="text-[10px] font-mono text-[#38bdf8]">720 Hz</span>
                    </div>
                    <p className="text-[11px] text-[#7a9385] mb-2">
                      Tactile micro-switch triggered upon clicking navigation items or switching views.
                    </p>
                    <span className="text-[10px] font-mono text-[#4e6b5c] flex items-center gap-1">
                      <Play size={10} className="text-[#38bdf8]" /> Test Tone
                    </span>
                  </button>

                  {/* 3. Terminal Keystroke */}
                  <button
                    type="button"
                    onClick={() => testSound('key', () => audioManager.playTerminalKeystroke())}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      activeAudioTest === 'key'
                        ? 'bg-[#143323] border-[#00df81] shadow-[0_0_12px_rgba(0,223,129,0.3)]'
                        : 'bg-[#0a1410] border-[#152a20] hover:border-[#224433]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#fbbf24]" />
                        <span className="text-xs font-bold text-white">Terminal Keystroke</span>
                      </div>
                      <span className="text-[10px] font-mono text-[#fbbf24]">840 Hz (Jitter)</span>
                    </div>
                    <p className="text-[11px] text-[#7a9385] mb-2">
                      Tactile mechanical switch simulation when typing in the interactive CLI.
                    </p>
                    <span className="text-[10px] font-mono text-[#4e6b5c] flex items-center gap-1">
                      <Play size={10} className="text-[#fbbf24]" /> Test Tone
                    </span>
                  </button>

                  {/* 4. Command Execution */}
                  <button
                    type="button"
                    onClick={() => testSound('cmd', () => audioManager.playCommandExecute())}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      activeAudioTest === 'cmd'
                        ? 'bg-[#143323] border-[#00df81] shadow-[0_0_12px_rgba(0,223,129,0.3)]'
                        : 'bg-[#0a1410] border-[#152a20] hover:border-[#224433]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#a855f7]" />
                        <span className="text-xs font-bold text-white">Command Execution</span>
                      </div>
                      <span className="text-[10px] font-mono text-[#a855f7]">560-980 Hz</span>
                    </div>
                    <p className="text-[11px] text-[#7a9385] mb-2">
                      Ascending cyber chirp triggered when executing a command in the bash console.
                    </p>
                    <span className="text-[10px] font-mono text-[#4e6b5c] flex items-center gap-1">
                      <Play size={10} className="text-[#a855f7]" /> Test Tone
                    </span>
                  </button>

                  {/* 5. Harmonic Chime */}
                  <button
                    type="button"
                    onClick={() => testSound('chime', () => audioManager.playSuccessChime())}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between sm:col-span-2 ${
                      activeAudioTest === 'chime'
                        ? 'bg-[#143323] border-[#00df81] shadow-[0_0_12px_rgba(0,223,129,0.3)]'
                        : 'bg-[#0a1410] border-[#152a20] hover:border-[#224433]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <Sparkles size={14} className="text-[#00df81]" />
                        <span className="text-xs font-bold text-white">Harmonic Success Chime</span>
                      </div>
                      <span className="text-[10px] font-mono text-[#00df81]">C5 - E5 - G5 Triad</span>
                    </div>
                    <p className="text-[11px] text-[#7a9385] mb-1">
                      Harmonic three-tone major chord played on copying terminal text, saving configuration, or message transmission.
                    </p>
                    <span className="text-[10px] font-mono text-[#4e6b5c] flex items-center gap-1">
                      <Play size={10} className="text-[#00df81]" /> Test Tone
                    </span>
                  </button>
                </div>
              </div>

              {/* Technical Architecture Specs */}
              <div className="p-4 rounded-xl bg-[#09110d] border border-[#13241b] text-xs font-mono space-y-2">
                <div className="text-[#7f9c8d] font-bold uppercase tracking-wider text-[10px] flex items-center gap-1.5">
                  <Headphones size={12} className="text-[#00df81]" /> Audio System Architecture
                </div>
                <ul className="space-y-1 text-[#658273] text-[11px]">
                  <li>• Pure client-side Web Audio API oscillator synthesis</li>
                  <li>• Zero MP3/WAV asset downloads — 0 KB network payload</li>
                  <li>• 45ms rate-limiting throttle prevents acoustic spamming</li>
                  <li>• Automatic AudioContext resumption on first user interaction</li>
                  <li>• Persistent user preferences stored in localStorage</li>
                </ul>
              </div>
            </div>
          )}

          {/* TAB: ADMIN PASSCODE UNLOCK */}
          {activeTab === 'auth' && !isAdminAuthenticated && (
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-[#0a1510] border border-[#173324] space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-[#0f2e1e] text-[#00df81]">
                    <Lock size={22} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Owner / Admin Passcode</h4>
                    <p className="text-xs text-[#7e998b]">
                      Enter portfolio administrative key to unlock inline project adding, deletion, bio editing, and skill sliders.
                    </p>
                  </div>
                </div>

                <form onSubmit={handlePasscodeSubmit} className="space-y-3 pt-2">
                  <div>
                    <label className="block text-xs font-mono uppercase text-[#6f897b] mb-1">
                      Passcode
                    </label>
                    <input
                      type="password"
                      autoFocus
                      value={passcodeAttempt}
                      onChange={(e) => setPasscodeAttempt(e.target.value)}
                      placeholder="Enter admin passcode (e.g. sunny)"
                      className="w-full bg-[#070e0b] border border-[#193827] rounded-xl px-4 py-2.5 text-sm text-white focus:border-[#00df81] outline-none font-mono"
                    />
                  </div>

                  {passcodeError && (
                    <p className="text-xs font-mono text-[#f87171]">
                      Incorrect passcode. Please verify and try again.
                    </p>
                  )}

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-[#00df81] hover:bg-[#05f08d] text-[#06100b] font-bold text-xs rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Unlock size={14} />
                    <span>Unlock Portfolio Editor</span>
                  </button>
                </form>

                <div className="text-[11px] text-[#556e60] font-mono pt-2 border-t border-[#13241b]">
                  Hint: Default portfolio administrator access code is <span className="text-[#00df81] font-bold">sunny</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 1: PROFILE */}
          {activeTab === 'profile' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase text-[#738a7c] mb-1">Full Name</label>
                <input
                  type="text"
                  value={portfolio.name}
                  onChange={(e) => updatePortfolioData({ name: e.target.value })}
                  className="w-full bg-[#0d1813] border border-[#172c21] rounded-xl px-3 py-2 text-sm text-white focus:border-[#00df81] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#738a7c] mb-1">Short Brand Name</label>
                <input
                  type="text"
                  value={portfolio.shortName}
                  onChange={(e) => updatePortfolioData({ shortName: e.target.value })}
                  className="w-full bg-[#0d1813] border border-[#172c21] rounded-xl px-3 py-2 text-sm text-white focus:border-[#00df81] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#738a7c] mb-1">Role / Headline Tags</label>
                <input
                  type="text"
                  value={portfolio.headlineRole}
                  onChange={(e) => updatePortfolioData({ headlineRole: e.target.value })}
                  className="w-full bg-[#0d1813] border border-[#172c21] rounded-xl px-3 py-2 text-sm text-white focus:border-[#00df81] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#738a7c] mb-1">Tagline</label>
                <input
                  type="text"
                  value={portfolio.tagline}
                  onChange={(e) => updatePortfolioData({ tagline: e.target.value })}
                  className="w-full bg-[#0d1813] border border-[#172c21] rounded-xl px-3 py-2 text-sm text-white focus:border-[#00df81] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#738a7c] mb-1">Hero Intro Bio</label>
                <textarea
                  rows={3}
                  value={portfolio.introBio}
                  onChange={(e) => updatePortfolioData({ introBio: e.target.value })}
                  className="w-full bg-[#0d1813] border border-[#172c21] rounded-xl px-3 py-2 text-sm text-white focus:border-[#00df81] outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#738a7c] mb-1">About Me Headline</label>
                <input
                  type="text"
                  value={portfolio.aboutHeadline}
                  onChange={(e) => updatePortfolioData({ aboutHeadline: e.target.value })}
                  className="w-full bg-[#0d1813] border border-[#172c21] rounded-xl px-3 py-2 text-sm text-white focus:border-[#00df81] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#738a7c] mb-1">About Me Detailed Bio</label>
                <textarea
                  rows={4}
                  value={portfolio.aboutBio}
                  onChange={(e) => updatePortfolioData({ aboutBio: e.target.value })}
                  className="w-full bg-[#0d1813] border border-[#172c21] rounded-xl px-3 py-2 text-sm text-white focus:border-[#00df81] outline-none resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono uppercase text-[#738a7c] mb-1">Contact Email</label>
                  <input
                    type="email"
                    value={portfolio.email}
                    onChange={(e) => updatePortfolioData({ email: e.target.value })}
                    className="w-full bg-[#0d1813] border border-[#172c21] rounded-xl px-3 py-2 text-sm text-white focus:border-[#00df81] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-[#738a7c] mb-1">Location</label>
                  <input
                    type="text"
                    value={portfolio.location}
                    onChange={(e) => updatePortfolioData({ location: e.target.value })}
                    className="w-full bg-[#0d1813] border border-[#172c21] rounded-xl px-3 py-2 text-sm text-white focus:border-[#00df81] outline-none"
                  />
                </div>
              </div>

              {/* Avatar Toggle */}
              <div className="pt-4 border-t border-[#14261d]">
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#0c1611] border border-[#162c20]">
                  <div>
                    <div className="text-xs font-bold text-white">Active Avatar Persona</div>
                    <div className="text-[11px] font-mono text-[#748f80]">
                      Currently: {isAlterEgo ? 'Spider-Man Alter-Ego' : 'Real Photo'}
                    </div>
                  </div>
                  <button
                    onClick={toggleAvatar}
                    className="px-3 py-1.5 rounded-lg bg-[#00df81] text-[#06100b] font-bold text-xs cursor-pointer"
                  >
                    Toggle Avatar
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PROJECTS */}
          {activeTab === 'projects' && (
            <div className="space-y-6">
              {/* Add Project Form */}
              <form onSubmit={handleAddProject} className="p-4 rounded-2xl bg-[#0c1611] border border-[#162c20] space-y-3">
                <div className="text-xs font-mono font-bold text-[#00df81] uppercase flex items-center gap-1.5">
                  <Plus size={14} />
                  <span>Add New Project</span>
                </div>

                <div>
                  <input
                    type="text"
                    required
                    placeholder="Project Title (e.g. CyberLens)"
                    value={newProjTitle}
                    onChange={(e) => setNewProjTitle(e.target.value)}
                    className="w-full bg-[#08100c] border border-[#172c21] rounded-xl px-3 py-2 text-xs text-white focus:border-[#00df81] outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Badge (e.g. AI TOOL)"
                    value={newProjBadge}
                    onChange={(e) => setNewProjBadge(e.target.value)}
                    className="w-full bg-[#08100c] border border-[#172c21] rounded-xl px-3 py-2 text-xs text-white focus:border-[#00df81] outline-none"
                  />
                  <select
                    value={newProjCategory}
                    onChange={(e) => setNewProjCategory(e.target.value as any)}
                    className="w-full bg-[#08100c] border border-[#172c21] rounded-xl px-3 py-2 text-xs text-white focus:border-[#00df81] outline-none"
                  >
                    <option value="professional">Professional</option>
                    <option value="collaborative">Collaborative</option>
                    <option value="systems">Systems</option>
                    <option value="mobile">Mobile</option>
                    <option value="academic">Academic</option>
                  </select>
                </div>

                <div>
                  <textarea
                    rows={2}
                    required
                    placeholder="Short description of the project..."
                    value={newProjDesc}
                    onChange={(e) => setNewProjDesc(e.target.value)}
                    className="w-full bg-[#08100c] border border-[#172c21] rounded-xl px-3 py-2 text-xs text-white focus:border-[#00df81] outline-none resize-none"
                  />
                </div>

                <div>
                  <input
                    type="text"
                    placeholder="Technologies (comma-separated, e.g. React, Next.js, Node.js)"
                    value={newProjTech}
                    onChange={(e) => setNewProjTech(e.target.value)}
                    className="w-full bg-[#08100c] border border-[#172c21] rounded-xl px-3 py-2 text-xs text-white focus:border-[#00df81] outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2 bg-[#00df81] hover:bg-[#05f08d] text-[#06100b] font-bold text-xs rounded-xl transition-colors cursor-pointer"
                >
                  Insert Project Instantly
                </button>
              </form>

              {/* List of Projects */}
              <div className="space-y-3">
                <div className="text-xs font-mono uppercase text-[#738a7c]">
                  Active Projects ({portfolio.projects.length})
                </div>
                {portfolio.projects.map((project) => (
                  <div
                    key={project.id}
                    className="p-3 rounded-xl bg-[#0c1611] border border-[#172c21] flex items-start justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white">{project.title}</span>
                        <span className="text-[10px] font-mono text-[#00df81] px-1.5 py-0.5 rounded bg-[#0b2418]">
                          {project.typeBadge}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#809789] line-clamp-2 mt-1">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {project.techStack.map((t) => (
                          <span key={t} className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-[#11221a] text-[#93aba0]">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => handleDeleteProject(project.id)}
                      className="p-1.5 rounded-lg text-[#f87171]/70 hover:text-[#f87171] hover:bg-[#200e0e] transition-colors cursor-pointer flex-shrink-0"
                      title="Delete project"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: SKILLS */}
          {activeTab === 'skills' && (
            <div className="space-y-6">
              <div className="text-xs font-mono uppercase text-[#738a7c]">
                Live Skill Domain Percentages
              </div>
              <div className="space-y-4">
                {portfolio.skillDomains.map((skill) => (
                  <div key={skill.name} className="p-3 rounded-xl bg-[#0c1611] border border-[#172c21]">
                    <div className="flex justify-between text-xs font-medium mb-2 text-white">
                      <span>{skill.name}</span>
                      <span className="font-mono text-[#00df81]">{skill.percentage}%</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="100"
                      step="5"
                      value={skill.percentage}
                      onChange={(e) => handleSkillChange(skill.name, Number(e.target.value))}
                      className="w-full accent-[#00df81] cursor-pointer"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: MESSAGES */}
          {activeTab === 'messages' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase text-[#738a7c]">
                  Inbound Inquiries ({messages.length})
                </span>
              </div>

              {messages.length === 0 ? (
                <div className="p-8 text-center rounded-2xl bg-[#0c1611] border border-[#172c21] text-xs text-[#738a7c]">
                  No messages submitted yet. Test the contact form at the bottom of the page!
                </div>
              ) : (
                messages.map((msg) => (
                  <div
                    key={msg.id}
                    className="p-4 rounded-xl bg-[#0c1611] border border-[#172c21] space-y-1.5"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-white">{msg.name}</span>
                      <span className="text-[10px] font-mono text-[#738a7c]">{msg.timestamp}</span>
                    </div>
                    <div className="text-[11px] font-mono text-[#00df81]">{msg.email}</div>
                    <p className="text-xs text-[#9db2a5] pt-1">{msg.message}</p>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB: THEMES & ACCESSIBILITY */}
          {activeTab === 'theme' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-xs font-mono uppercase text-white font-bold mb-1">
                  Color Palettes & Visual Atmosphere
                </h4>
                <p className="text-xs text-[#7f9789] mb-4">
                  Select a color scheme to dynamically tint backgrounds, glowing borders, accents, and code highlights across the portfolio.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {THEME_PALETTES.map((theme) => {
                    const isSelected = currentTheme === theme.id;
                    return (
                      <button
                        key={theme.id}
                        type="button"
                        onClick={() => {
                          setTheme(theme.id);
                          audioManager.playNavClick(800, 0.05);
                        }}
                        className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? 'bg-[#102419] border-[var(--color-accent)] shadow-[0_0_15px_var(--color-glow)]'
                            : 'bg-[#0a1410] border-[#162a20] hover:border-[#234232]'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span
                              className="w-3.5 h-3.5 rounded-full border border-white/20 shadow-sm"
                              style={{ backgroundColor: theme.accentColor }}
                            />
                            <span className="text-xs font-bold text-white">{theme.name}</span>
                          </div>
                          {isSelected && (
                            <span className="w-4 h-4 rounded-full bg-[var(--color-accent)] text-black flex items-center justify-center text-[10px] font-bold">
                              ✓
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-[#7e9587] leading-relaxed">
                          {theme.tagline}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* High Contrast Accessibility Option */}
              <div className="p-4 rounded-2xl bg-[#0b1410] border border-[#162a20] flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Eye size={15} className="text-[var(--color-accent)]" />
                    <h4 className="text-xs font-mono uppercase text-white font-bold">
                      WCAG High-Contrast Mode
                    </h4>
                  </div>
                  <p className="text-xs text-[#7e9587]">
                    Forces max-contrast pure black and crisp white borders with bright yellow for accessibility.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={toggleHighContrast}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer border ${
                    isHighContrast
                      ? 'bg-yellow-400 text-black border-yellow-300'
                      : 'bg-[#101e17] text-[var(--color-accent)] border-[#1a3829] hover:bg-[#162e22]'
                  }`}
                >
                  {isHighContrast ? 'Enabled' : 'Enable'}
                </button>
              </div>
            </div>
          )}

          {/* TAB 5: BACKUP / IMPORT / EXPORT */}
          {activeTab === 'backup' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-xs font-mono uppercase text-white font-bold mb-2">
                  Export Portfolio Data
                </h4>
                <p className="text-xs text-[#7f9789] mb-3">
                  Download all your current customized configuration as a JSON file.
                </p>
                <button
                  onClick={exportJsonConfig}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#00df81] text-[#06100b] font-bold text-xs hover:bg-[#05f08d] transition-colors cursor-pointer"
                >
                  <Download size={14} />
                  <span>Download portfolio.json</span>
                </button>
              </div>

              <div className="pt-6 border-t border-[#14261d]">
                <h4 className="text-xs font-mono uppercase text-white font-bold mb-2">
                  Import Portfolio Data
                </h4>
                <p className="text-xs text-[#7f9789] mb-3">
                  Paste exported portfolio JSON to load configuration dynamically.
                </p>
                <form onSubmit={handleImportSubmit} className="space-y-3">
                  <textarea
                    rows={6}
                    value={importText}
                    onChange={(e) => setImportText(e.target.value)}
                    placeholder="Paste JSON content here..."
                    className="w-full bg-[#0d1813] border border-[#172c21] rounded-xl p-3 text-xs font-mono text-white focus:border-[#00df81] outline-none"
                  />
                  {importError && (
                    <div className="text-xs text-[#f87171] font-mono">
                      Invalid JSON payload structure.
                    </div>
                  )}
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0e1c15] text-white border border-[#193627] hover:border-[#00df81] font-semibold text-xs transition-colors cursor-pointer"
                  >
                    <Upload size={14} className="text-[#00df81]" />
                    <span>Apply Custom JSON</span>
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
