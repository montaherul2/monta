import React, { createContext, useContext, useState, useEffect } from 'react';
import { PortfolioData, ProjectItem, ThemePaletteId } from '../types';
import { initialPortfolioData } from '../data/initialData';
import { setSoundEnabled, playCyberClick, playSuccessChime, audioManager } from '../utils/audio';
import { applyThemeToDocument, THEME_PALETTES } from '../data/themes';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  timestamp: string;
}

interface PortfolioContextType {
  portfolio: PortfolioData;
  isAlterEgo: boolean;
  toggleAvatar: () => void;
  soundOn: boolean;
  setSoundOn: (enabled: boolean) => void;
  toggleSound: () => void;
  soundVolume: number;
  setSoundVolume: (vol: number) => void;
  activeProjectModal: ProjectItem | null;
  setActiveProjectModal: (project: ProjectItem | null) => void;
  isCvModalOpen: boolean;
  setIsCvModalOpen: (open: boolean) => void;
  isCustomizerOpen: boolean;
  setIsCustomizerOpen: (open: boolean) => void;
  activeSection: string;
  setActiveSection: (sec: string) => void;
  filterCategory: string;
  setFilterCategory: (cat: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedTechFilter: string | null;
  setSelectedTechFilter: (tech: string | null) => void;
  messages: ContactMessage[];
  addMessage: (name: string, email: string, message: string) => void;
  updatePortfolioData: (data: Partial<PortfolioData>) => void;
  resetPortfolioData: () => void;
  exportJsonConfig: () => void;
  importJsonConfig: (json: string) => boolean;
  showIntro: boolean;
  setShowIntro: (show: boolean) => void;
  triggerIntroReplay: () => void;
  // Hidden Edit Route & Password Protection ('sunny')
  isAdminAuthenticated: boolean;
  isPasswordGateOpen: boolean;
  setIsPasswordGateOpen: (open: boolean) => void;
  verifyPassword: (pwd: string) => boolean;
  lockAdmin: () => void;
  triggerHiddenEditor: () => void;
  // Navigation / SEO Page
  currentPage: 'portfolio' | 'seo';
  setCurrentPage: (page: 'portfolio' | 'seo') => void;
  navigateToPage: (page: 'portfolio' | 'seo') => void;
  // Theme Switcher & Accessibility High Contrast
  currentTheme: ThemePaletteId;
  setTheme: (themeId: ThemePaletteId) => void;
  toggleHighContrast: () => void;
  isHighContrast: boolean;
  // Project Management from GitHub & Customizer
  addProject: (project: ProjectItem) => void;
  importGitHubProjects: (projects: ProjectItem[]) => void;
}

const PortfolioContext = createContext<PortfolioContextType | null>(null);

const STORAGE_KEY = 'monta_portfolio_data_v2';
const MESSAGES_KEY = 'monta_portfolio_messages_v2';
const ADMIN_AUTH_KEY = 'monta_admin_authenticated_session';
const THEME_STORAGE_KEY = 'monta_portfolio_theme_palette';
const SOUND_STORAGE_KEY = 'monta_audio_fx_enabled';
const VOLUME_STORAGE_KEY = 'monta_audio_fx_volume';

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [portfolio, setPortfolio] = useState<PortfolioData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.name && (parsed.name.includes('Tareef') || parsed.name.includes('Ashraful'))) {
          parsed.name = 'Montaherul Islam';
        }
        if (parsed.shortName && parsed.shortName.includes('REEF')) {
          parsed.shortName = 'MONTA.';
        }
        return { ...initialPortfolioData, ...parsed };
      }
    } catch {
      // Fallback
    }
    return initialPortfolioData;
  });

  const [currentTheme, setCurrentTheme] = useState<ThemePaletteId>(() => {
    try {
      const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) as ThemePaletteId;
      if (savedTheme && THEME_PALETTES.some((t) => t.id === savedTheme)) {
        return savedTheme;
      }
    } catch {
      // Fallback
    }
    return 'emerald';
  });

  // Apply theme dynamically to documentElement
  useEffect(() => {
    applyThemeToDocument(currentTheme);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, currentTheme);
    } catch {
      // ignore
    }
  }, [currentTheme]);

  const setTheme = (themeId: ThemePaletteId) => {
    playCyberClick(800, 0.05);
    setCurrentTheme(themeId);
  };

  const toggleHighContrast = () => {
    playCyberClick(900, 0.08);
    setCurrentTheme((prev) => (prev === 'high-contrast' ? 'emerald' : 'high-contrast'));
  };

  const isHighContrast = currentTheme === 'high-contrast';

  const [isAlterEgo, setIsAlterEgo] = useState<boolean>(false);
  const [soundOn, setSoundOnState] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(SOUND_STORAGE_KEY);
      if (saved !== null) {
        const val = saved === 'true';
        audioManager.setEnabled(val);
        return val;
      }
    } catch {}
    return false;
  });

  const [soundVolume, setSoundVolumeState] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(VOLUME_STORAGE_KEY);
      if (saved !== null) {
        const val = parseFloat(saved);
        if (!isNaN(val) && val >= 0 && val <= 1) {
          audioManager.setVolume(val);
          return val;
        }
      }
    } catch {}
    return 0.5;
  });

  const activeProjectModalState = useState<ProjectItem | null>(null);
  const [activeProjectModal, setActiveProjectModal] = activeProjectModalState;
  const [isCvModalOpen, setIsCvModalOpen] = useState<boolean>(false);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTechFilter, setSelectedTechFilter] = useState<string | null>(null);
  const [showIntro, setShowIntro] = useState<boolean>(true);

  // Hidden admin & password protection ('sunny')
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(ADMIN_AUTH_KEY) === 'true';
    } catch {
      return false;
    }
  });
  const [isPasswordGateOpen, setIsPasswordGateOpen] = useState<boolean>(false);

  // Page Routing: 'portfolio' or 'seo'
  const [currentPage, setCurrentPage] = useState<'portfolio' | 'seo'>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.toLowerCase();
      const path = window.location.pathname.toLowerCase();
      if (hash === '#seo' || path === '/seo') return 'seo';
    }
    return 'portfolio';
  });

  const [messages, setMessages] = useState<ContactMessage[]>(() => {
    try {
      const saved = localStorage.getItem(MESSAGES_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    return [];
  });

  // Check URL paths for /edit or #edit, /seo or #seo
  useEffect(() => {
    const handleUrlRoute = () => {
      const hash = window.location.hash.toLowerCase();
      const path = window.location.pathname.toLowerCase();
      const search = window.location.search.toLowerCase();

      // Check for /edit or #edit
      if (path === '/edit' || hash === '#edit' || search.includes('edit')) {
        if (isAdminAuthenticated) {
          setIsCustomizerOpen(true);
        } else {
          setIsPasswordGateOpen(true);
        }
      }

      // Check for /seo or #seo
      if (path === '/seo' || hash === '#seo') {
        setCurrentPage('seo');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '' || hash === '#portfolio' || path === '/') {
        setCurrentPage('portfolio');
      }
    };

    handleUrlRoute();
    window.addEventListener('hashchange', handleUrlRoute);
    window.addEventListener('popstate', handleUrlRoute);

    // Global shortcut: Ctrl+Alt+E or Alt+E to trigger hidden edit
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey && e.altKey && e.key.toLowerCase() === 'e') || (e.altKey && e.key.toLowerCase() === 'e')) {
        e.preventDefault();
        triggerHiddenEditor();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('hashchange', handleUrlRoute);
      window.removeEventListener('popstate', handleUrlRoute);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isAdminAuthenticated]);

  // Save portfolio to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(portfolio));
    } catch {
      // ignore
    }
  }, [portfolio]);

  // Save messages to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(MESSAGES_KEY, JSON.stringify(messages));
    } catch {
      // ignore
    }
  }, [messages]);

  const toggleAvatar = () => {
    playCyberClick(720, 0.06);
    setIsAlterEgo((prev) => !prev);
  };

  const setSoundOn = (enabled: boolean) => {
    setSoundOnState(enabled);
    audioManager.setEnabled(enabled);
    try {
      localStorage.setItem(SOUND_STORAGE_KEY, String(enabled));
    } catch {
      // ignore
    }
    if (enabled) {
      audioManager.playToggleChime(true);
    }
  };

  const toggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
  };

  const setSoundVolume = (vol: number) => {
    const clamped = Math.max(0, Math.min(1, vol));
    setSoundVolumeState(clamped);
    audioManager.setVolume(clamped);
    try {
      localStorage.setItem(VOLUME_STORAGE_KEY, String(clamped));
    } catch {
      // ignore
    }
  };

  const addMessage = (name: string, email: string, message: string) => {
    const newMessage: ContactMessage = {
      id: Date.now().toString(),
      name,
      email,
      message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', month: 'short', day: 'numeric' }),
    };
    setMessages((prev) => [newMessage, ...prev]);
    playSuccessChime();
  };

  const updatePortfolioData = (data: Partial<PortfolioData>) => {
    setPortfolio((prev) => ({ ...prev, ...data }));
    playCyberClick(900, 0.03);
  };

  const addProject = (project: ProjectItem) => {
    setPortfolio((prev) => {
      const exists = prev.projects.some((p) => p.id === project.id || p.title.toLowerCase() === project.title.toLowerCase());
      if (exists) {
        return {
          ...prev,
          projects: prev.projects.map((p) => (p.id === project.id || p.title.toLowerCase() === project.title.toLowerCase() ? project : p)),
        };
      }
      return {
        ...prev,
        projects: [project, ...prev.projects],
      };
    });
    playSuccessChime();
  };

  const importGitHubProjects = (newProjects: ProjectItem[]) => {
    setPortfolio((prev) => {
      const existingIds = new Set(prev.projects.map((p) => p.id));
      const existingTitles = new Set(prev.projects.map((p) => p.title.toLowerCase()));
      const filtered = newProjects.filter((p) => !existingIds.has(p.id) && !existingTitles.has(p.title.toLowerCase()));
      return {
        ...prev,
        projects: [...filtered, ...prev.projects],
      };
    });
    playSuccessChime();
  };

  const resetPortfolioData = () => {
    setPortfolio(initialPortfolioData);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    playSuccessChime();
  };

  const exportJsonConfig = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(portfolio, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `portfolio-${portfolio.name.toLowerCase().replace(/\s+/g, '-')}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const importJsonConfig = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.name && parsed.projects) {
        setPortfolio({ ...initialPortfolioData, ...parsed });
        playSuccessChime();
        return true;
      }
    } catch {
      // Invalid JSON
    }
    return false;
  };

  const triggerIntroReplay = () => {
    setShowIntro(true);
    playCyberClick(500, 0.08);
  };

  // Hidden Editor Trigger & Authentication with password 'sunny'
  const triggerHiddenEditor = () => {
    playCyberClick(800, 0.04);
    if (isAdminAuthenticated) {
      setIsCustomizerOpen(true);
    } else {
      setIsPasswordGateOpen(true);
    }
  };

  const verifyPassword = (passwordInput: string): boolean => {
    if (passwordInput.trim().toLowerCase() === 'sunny') {
      setIsAdminAuthenticated(true);
      try {
        sessionStorage.setItem(ADMIN_AUTH_KEY, 'true');
      } catch {
        // ignore
      }
      setIsPasswordGateOpen(false);
      setIsCustomizerOpen(true);
      playSuccessChime();
      return true;
    }
    playCyberClick(250, 0.15); // error buzz
    return false;
  };

  const lockAdmin = () => {
    setIsAdminAuthenticated(false);
    setIsCustomizerOpen(false);
    try {
      sessionStorage.removeItem(ADMIN_AUTH_KEY);
    } catch {
      // ignore
    }
    // Clean hash
    if (window.location.hash === '#edit') {
      window.history.replaceState(null, '', window.location.pathname);
    }
    playCyberClick(500, 0.06);
  };

  const navigateToPage = (page: 'portfolio' | 'seo') => {
    audioManager.playNavClick(700, 0.04);
    setCurrentPage(page);
    window.location.hash = page === 'seo' ? 'seo' : '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <PortfolioContext.Provider
      value={{
        portfolio,
        isAlterEgo,
        toggleAvatar,
        soundOn,
        setSoundOn,
        toggleSound,
        soundVolume,
        setSoundVolume,
        activeProjectModal,
        setActiveProjectModal,
        isCvModalOpen,
        setIsCvModalOpen,
        isCustomizerOpen,
        setIsCustomizerOpen,
        activeSection,
        setActiveSection,
        filterCategory,
        setFilterCategory,
        searchQuery,
        setSearchQuery,
        selectedTechFilter,
        setSelectedTechFilter,
        messages,
        addMessage,
        updatePortfolioData,
        resetPortfolioData,
        exportJsonConfig,
        importJsonConfig,
        showIntro,
        setShowIntro,
        triggerIntroReplay,
        isAdminAuthenticated,
        isPasswordGateOpen,
        setIsPasswordGateOpen,
        verifyPassword,
        lockAdmin,
        triggerHiddenEditor,
        currentPage,
        setCurrentPage,
        navigateToPage,
        currentTheme,
        setTheme,
        toggleHighContrast,
        isHighContrast,
        addProject,
        importGitHubProjects,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
