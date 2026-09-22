import { ThemePalette, ThemePaletteId } from '../types';

export const THEME_PALETTES: ThemePalette[] = [
  {
    id: 'emerald',
    name: 'Emerald Matrix',
    tagline: 'Signature cyber green with emerald phosphor glow',
    accentColor: '#00df81',
    accentBg: '#0a2e1d',
    borderColor: '#172b21',
    bgBase: '#070b09',
  },
  {
    id: 'cyan',
    name: 'Electric Cyan',
    tagline: 'Cool sci-fi neon blue and crisp electric glow',
    accentColor: '#00e5ff',
    accentBg: '#082838',
    borderColor: '#142d3e',
    bgBase: '#050b11',
  },
  {
    id: 'amber',
    name: 'Amber Cyber',
    tagline: 'Warm retro amber terminal with golden highlights',
    accentColor: '#fbbf24',
    accentBg: '#312108',
    borderColor: '#382914',
    bgBase: '#0e0b06',
  },
  {
    id: 'amethyst',
    name: 'Amethyst Void',
    tagline: 'Cosmic synthwave violet and purple neon aura',
    accentColor: '#c084fc',
    accentBg: '#291240',
    borderColor: '#311b4e',
    bgBase: '#0c0714',
  },
  {
    id: 'high-contrast',
    name: 'High-Contrast Mode',
    tagline: 'WCAG AAA accessibility with pure black, pure white borders & stark yellow',
    accentColor: '#ffff00',
    accentBg: '#262600',
    borderColor: '#ffffff',
    bgBase: '#000000',
    isHighContrast: true,
  },
];

export const applyThemeToDocument = (themeId: ThemePaletteId) => {
  const root = document.documentElement;
  root.setAttribute('data-theme', themeId);

  const theme = THEME_PALETTES.find((t) => t.id === themeId) || THEME_PALETTES[0];

  // Specific style definitions
  switch (themeId) {
    case 'cyan':
      root.style.setProperty('--color-accent', '#00e5ff');
      root.style.setProperty('--color-accent-rgb', '0, 229, 255');
      root.style.setProperty('--color-accent-hover', '#33ecff');
      root.style.setProperty('--color-accent-subtle', '#082838');
      root.style.setProperty('--color-bg-base', '#050b11');
      root.style.setProperty('--color-bg-surface', '#09131d');
      root.style.setProperty('--color-bg-surface-elevated', '#0e1d2c');
      root.style.setProperty('--color-border', '#142d3e');
      root.style.setProperty('--color-border-subtle', '#0e202d');
      root.style.setProperty('--color-text-main', '#e0f2fe');
      root.style.setProperty('--color-text-muted', '#7ba1b8');
      root.style.setProperty('--color-glow', 'rgba(0, 229, 255, 0.3)');
      break;

    case 'amber':
      root.style.setProperty('--color-accent', '#fbbf24');
      root.style.setProperty('--color-accent-rgb', '251, 191, 36');
      root.style.setProperty('--color-accent-hover', '#fcd34d');
      root.style.setProperty('--color-accent-subtle', '#312108');
      root.style.setProperty('--color-bg-base', '#0e0b06');
      root.style.setProperty('--color-bg-surface', '#151008');
      root.style.setProperty('--color-bg-surface-elevated', '#21190c');
      root.style.setProperty('--color-border', '#382914');
      root.style.setProperty('--color-border-subtle', '#271c0d');
      root.style.setProperty('--color-text-main', '#fef3c7');
      root.style.setProperty('--color-text-muted', '#ab9674');
      root.style.setProperty('--color-glow', 'rgba(251, 191, 36, 0.3)');
      break;

    case 'amethyst':
      root.style.setProperty('--color-accent', '#c084fc');
      root.style.setProperty('--color-accent-rgb', '192, 132, 252');
      root.style.setProperty('--color-accent-hover', '#d8b4fe');
      root.style.setProperty('--color-accent-subtle', '#291240');
      root.style.setProperty('--color-bg-base', '#0c0714');
      root.style.setProperty('--color-bg-surface', '#130c20');
      root.style.setProperty('--color-bg-surface-elevated', '#1e1333');
      root.style.setProperty('--color-border', '#311b4e');
      root.style.setProperty('--color-border-subtle', '#231238');
      root.style.setProperty('--color-text-main', '#f5edff');
      root.style.setProperty('--color-text-muted', '#9d83b8');
      root.style.setProperty('--color-glow', 'rgba(192, 132, 252, 0.3)');
      break;

    case 'high-contrast':
      root.style.setProperty('--color-accent', '#ffff00');
      root.style.setProperty('--color-accent-rgb', '255, 255, 0');
      root.style.setProperty('--color-accent-hover', '#ffffff');
      root.style.setProperty('--color-accent-subtle', '#262600');
      root.style.setProperty('--color-bg-base', '#000000');
      root.style.setProperty('--color-bg-surface', '#0a0a0a');
      root.style.setProperty('--color-bg-surface-elevated', '#171717');
      root.style.setProperty('--color-border', '#ffffff');
      root.style.setProperty('--color-border-subtle', '#a3a3a3');
      root.style.setProperty('--color-text-main', '#ffffff');
      root.style.setProperty('--color-text-muted', '#e5e5e5');
      root.style.setProperty('--color-glow', 'rgba(255, 255, 0, 0.5)');
      break;

    case 'emerald':
    default:
      root.style.setProperty('--color-accent', '#00df81');
      root.style.setProperty('--color-accent-rgb', '0, 223, 129');
      root.style.setProperty('--color-accent-hover', '#10f193');
      root.style.setProperty('--color-accent-subtle', '#0a2e1d');
      root.style.setProperty('--color-bg-base', '#070b09');
      root.style.setProperty('--color-bg-surface', '#0a130f');
      root.style.setProperty('--color-bg-surface-elevated', '#0f1d16');
      root.style.setProperty('--color-border', '#172b21');
      root.style.setProperty('--color-border-subtle', '#121f19');
      root.style.setProperty('--color-text-main', '#e3ece7');
      root.style.setProperty('--color-text-muted', '#7e9587');
      root.style.setProperty('--color-glow', 'rgba(0, 223, 129, 0.3)');
      break;
  }
};
