import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ThemeVariant = 'rose-gold' | 'cyan-neon' | 'purple-mystic' | 'emerald-sacred';
export type LayoutMode = 'compact' | 'spacious' | 'minimal';

interface ThemeState {
  variant: ThemeVariant;
  layoutMode: LayoutMode;
  fontSize: number;
  transparency: number;
  animationSpeed: 'slow' | 'normal' | 'fast';
  setVariant: (variant: ThemeVariant) => void;
  setLayoutMode: (mode: LayoutMode) => void;
  setFontSize: (size: number) => void;
  setTransparency: (value: number) => void;
  setAnimationSpeed: (speed: 'slow' | 'normal' | 'fast') => void;
  resetTheme: () => void;
}

const defaultState = {
  variant: 'rose-gold' as ThemeVariant,
  layoutMode: 'spacious' as LayoutMode,
  fontSize: 16,
  transparency: 80,
  animationSpeed: 'normal' as const,
};

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      ...defaultState,
      setVariant: (variant) => set({ variant }),
      setLayoutMode: (mode) => set({ layoutMode: mode }),
      setFontSize: (size) => set({ fontSize: Math.max(12, Math.min(24, size)) }),
      setTransparency: (value) => set({ transparency: Math.max(20, Math.min(100, value)) }),
      setAnimationSpeed: (speed) => set({ animationSpeed: speed }),
      resetTheme: () => set(defaultState),
    }),
    {
      name: 'voltron-theme-store',
    }
  )
);

// Theme color mappings
export const themeColors = {
  'rose-gold': {
    primary: '#d4af37',
    secondary: '#ff6b9d',
    accent: '#00d9ff',
    name: 'Rose Gold Sovereign',
  },
  'cyan-neon': {
    primary: '#00d9ff',
    secondary: '#d4af37',
    accent: '#ff6b9d',
    name: 'Cyan Neon',
  },
  'purple-mystic': {
    primary: '#b366ff',
    secondary: '#d4af37',
    accent: '#00d9ff',
    name: 'Purple Mystic',
  },
  'emerald-sacred': {
    primary: '#00d97f',
    secondary: '#d4af37',
    accent: '#00d9ff',
    name: 'Emerald Sacred',
  },
};

// Layout spacing presets
export const layoutPresets = {
  compact: { padding: '0.75rem', gap: '0.5rem', radius: '0.4rem' },
  spacious: { padding: '1.5rem', gap: '1rem', radius: '0.65rem' },
  minimal: { padding: '0.5rem', gap: '0.25rem', radius: '0.25rem' },
};
