/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { Palette, Check, Sun, Sparkles, Eye, ShieldCheck } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { THEME_PALETTES } from '../data/themes';
import { ThemePaletteId } from '../types';
import { playCyberClick } from '../utils/audio';

interface ThemeSwitcherProps {
  compact?: boolean;
}

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ compact = false }) => {
  const { currentTheme, setTheme, toggleHighContrast, isHighContrast } = usePortfolio();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const activePalette = THEME_PALETTES.find((p) => p.id === currentTheme) || THEME_PALETTES[0];

  const handleSelect = (id: ThemePaletteId) => {
    setTheme(id);
    playCyberClick(840, 0.05);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      {/* Trigger Button */}
      <div className="flex items-center gap-1.5">
        {/* High-Contrast Fast Toggle Pill */}
        <button
          onClick={() => {
            toggleHighContrast();
          }}
          type="button"
          aria-label={isHighContrast ? 'Disable high-contrast accessibility mode' : 'Enable high-contrast accessibility mode'}
          title={isHighContrast ? 'Disable High Contrast Mode' : 'Toggle High Contrast (WCAG AAA Accessibility)'}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-mono transition-all duration-200 cursor-pointer border ${
            isHighContrast
              ? 'bg-yellow-400 text-black border-yellow-300 font-bold shadow-[0_0_15px_rgba(255,255,0,0.6)]'
              : 'bg-[#0a1410] text-[#7e9587] border-[#162a20] hover:text-white hover:border-[#234232]'
          }`}
        >
          <Eye className="w-3.5 h-3.5" />
          <span className="hidden sm:inline text-[11px] font-medium">
            {isHighContrast ? 'Contrast: ON' : 'High Contrast'}
          </span>
        </button>

        {/* Palette Dropdown Toggle */}
        <button
          onClick={() => {
            playCyberClick(700, 0.04);
            setIsOpen(!isOpen);
          }}
          type="button"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-label="Toggle color palette switcher"
          title="Change portfolio color theme"
          className={`flex items-center gap-2 px-2.5 py-1.5 rounded-full transition-all duration-200 cursor-pointer border ${
            isOpen
              ? 'bg-[#0f2017] border-[var(--color-accent)] text-white shadow-[0_0_15px_var(--color-glow)]'
              : 'bg-[#0a1410] border-[#162a20] text-[#a3b8ad] hover:text-white hover:border-[#234232]'
          }`}
        >
          <span
            className="w-3 h-3 rounded-full flex-shrink-0 shadow-sm border border-black/40"
            style={{ backgroundColor: activePalette.accentColor }}
          />
          <Palette className="w-3.5 h-3.5" />
          {!compact && (
            <span className="hidden md:inline text-xs font-mono tracking-wider font-semibold text-white">
              {activePalette.name.split(' ')[0]}
            </span>
          )}
        </button>
      </div>

      {/* Popover Menu */}
      {isOpen && (
        <div
          role="listbox"
          aria-label="Color themes"
          className="absolute right-0 mt-2 w-72 sm:w-80 rounded-2xl bg-[#09110d] border border-[#1b3628] shadow-[0_16px_40px_rgba(0,0,0,0.85)] p-3.5 z-50 animate-in fade-in zoom-in-95 duration-150 backdrop-blur-xl"
        >
          <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-[#14291f]">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[var(--color-accent)]" />
              <span className="text-xs font-bold font-mono tracking-wider uppercase text-white">
                Color Palette Switcher
              </span>
            </div>
            <span className="text-[10px] font-mono text-[#7e9587]">
              {THEME_PALETTES.length} Palettes
            </span>
          </div>

          {/* Theme Option List */}
          <div className="space-y-1.5 mb-3">
            {THEME_PALETTES.map((theme) => {
              const isSelected = currentTheme === theme.id;
              return (
                <button
                  key={theme.id}
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => handleSelect(theme.id)}
                  type="button"
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl transition-all duration-150 cursor-pointer text-left border ${
                    isSelected
                      ? 'bg-[#102419] border-[var(--color-accent)] shadow-[0_0_12px_var(--color-glow)]'
                      : 'bg-[#0a1410]/80 border-transparent hover:bg-[#0e1d15] hover:border-[#1a3829]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="w-4 h-4 rounded-full flex-shrink-0 border-2 border-white/20 shadow-sm"
                      style={{ backgroundColor: theme.accentColor }}
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-white tracking-wide">
                          {theme.name}
                        </span>
                        {theme.isHighContrast && (
                          <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-yellow-400/20 text-yellow-300 border border-yellow-400/40">
                            WCAG AAA
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-[#7e9587] line-clamp-1">
                        {theme.tagline}
                      </p>
                    </div>
                  </div>

                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-[var(--color-accent)] flex items-center justify-center text-black flex-shrink-0 shadow-sm">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Quick Accessibility Banner */}
          <div className="pt-2.5 border-t border-[#14291f] flex items-center justify-between text-[11px] text-[#8fa89b] font-mono">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[var(--color-accent)]" />
              <span>A11y Compliant</span>
            </span>
            <button
              onClick={() => {
                toggleHighContrast();
                setIsOpen(false);
              }}
              type="button"
              className="text-[var(--color-accent)] hover:underline cursor-pointer font-semibold"
            >
              {isHighContrast ? 'Revert Theme' : 'Max Contrast Mode'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
