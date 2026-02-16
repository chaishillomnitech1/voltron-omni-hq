import React, { useEffect } from 'react';
import { Palette, Layout, Type, Zap, RotateCcw } from 'lucide-react';
import { useThemeStore, themeColors, layoutPresets, type ThemeVariant, type LayoutMode } from '@/stores/themeStore';

export const ThemeCustomizer: React.FC = () => {
  const {
    variant,
    layoutMode,
    fontSize,
    transparency,
    animationSpeed,
    setVariant,
    setLayoutMode,
    setFontSize,
    setTransparency,
    setAnimationSpeed,
    resetTheme,
  } = useThemeStore();

  // Apply theme to CSS variables
  useEffect(() => {
    const colors = themeColors[variant];
    const layout = layoutPresets[layoutMode];

    document.documentElement.style.setProperty('--primary-color', colors.primary);
    document.documentElement.style.setProperty('--secondary-color', colors.secondary);
    document.documentElement.style.setProperty('--accent-color', colors.accent);
    document.documentElement.style.setProperty('--layout-padding', layout.padding);
    document.documentElement.style.setProperty('--layout-gap', layout.gap);
    document.documentElement.style.setProperty('--layout-radius', layout.radius);
    document.documentElement.style.setProperty('--font-size-base', `${fontSize}px`);
    document.documentElement.style.setProperty('--transparency', `${transparency}%`);

    // Apply animation speed
    const animationDuration = animationSpeed === 'slow' ? '0.6s' : animationSpeed === 'fast' ? '0.2s' : '0.3s';
    document.documentElement.style.setProperty('--animation-duration', animationDuration);
  }, [variant, layoutMode, fontSize, transparency, animationSpeed]);

  const themeVariants: ThemeVariant[] = ['rose-gold', 'cyan-neon', 'purple-mystic', 'emerald-sacred'];
  const layoutModes: LayoutMode[] = ['compact', 'spacious', 'minimal'];

  return (
    <div className="space-y-6 bg-gradient-to-br from-[#0f0f0f] to-[#050505] rounded-lg border border-[#2a2a2a] p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Palette className="w-5 h-5 text-[#d4af37]" />
          <h3 className="text-lg font-bold text-white">Portal Customization</h3>
        </div>
        <button
          onClick={resetTheme}
          className="p-2 hover:bg-[#1a1a1a] rounded transition text-gray-400 hover:text-[#d4af37]"
          title="Reset to defaults"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
      </div>

      {/* Theme Variants */}
      <div>
        <label className="text-sm font-bold text-gray-300 uppercase tracking-widest mb-3 block">Theme Variant</label>
        <div className="grid grid-cols-2 gap-3">
          {themeVariants.map((v) => (
            <button
              key={v}
              onClick={() => setVariant(v)}
              className={`p-3 rounded-lg border-2 transition-all ${
                variant === v
                  ? 'border-[#d4af37] bg-[#1a1a1a]'
                  : 'border-[#2a2a2a] bg-[#0f0f0f] hover:border-[#d4af37]/50'
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <div
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: themeColors[v].primary }}
                />
                <span className="text-xs font-semibold text-white">{themeColors[v].name}</span>
              </div>
              <div className="flex gap-1">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: themeColors[v].primary }}
                />
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: themeColors[v].secondary }}
                />
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: themeColors[v].accent }}
                />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Layout Mode */}
      <div>
        <label className="text-sm font-bold text-gray-300 uppercase tracking-widest mb-3 block flex items-center gap-2">
          <Layout className="w-4 h-4" />
          Layout Mode
        </label>
        <div className="grid grid-cols-3 gap-3">
          {layoutModes.map((mode) => (
            <button
              key={mode}
              onClick={() => setLayoutMode(mode)}
              className={`p-3 rounded-lg border-2 transition-all text-xs font-semibold uppercase tracking-widest ${
                layoutMode === mode
                  ? 'border-[#d4af37] bg-[#1a1a1a] text-[#d4af37]'
                  : 'border-[#2a2a2a] bg-[#0f0f0f] text-gray-400 hover:border-[#d4af37]/50'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* Font Size */}
      <div>
        <label className="text-sm font-bold text-gray-300 uppercase tracking-widest mb-3 block flex items-center gap-2">
          <Type className="w-4 h-4" />
          Font Size: {fontSize}px
        </label>
        <input
          type="range"
          min="12"
          max="24"
          value={fontSize}
          onChange={(e) => setFontSize(parseInt(e.target.value))}
          className="w-full h-2 bg-[#1a1a1a] rounded-lg appearance-none cursor-pointer accent-[#d4af37]"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-2">
          <span>Small</span>
          <span>Large</span>
        </div>
      </div>

      {/* Transparency */}
      <div>
        <label className="text-sm font-bold text-gray-300 uppercase tracking-widest mb-3 block">
          Background Transparency: {transparency}%
        </label>
        <input
          type="range"
          min="20"
          max="100"
          value={transparency}
          onChange={(e) => setTransparency(parseInt(e.target.value))}
          className="w-full h-2 bg-[#1a1a1a] rounded-lg appearance-none cursor-pointer accent-[#d4af37]"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-2">
          <span>More Transparent</span>
          <span>More Opaque</span>
        </div>
      </div>

      {/* Animation Speed */}
      <div>
        <label className="text-sm font-bold text-gray-300 uppercase tracking-widest mb-3 block flex items-center gap-2">
          <Zap className="w-4 h-4" />
          Animation Speed
        </label>
        <div className="grid grid-cols-3 gap-3">
          {(['slow', 'normal', 'fast'] as const).map((speed) => (
            <button
              key={speed}
              onClick={() => setAnimationSpeed(speed)}
              className={`p-3 rounded-lg border-2 transition-all text-xs font-semibold uppercase tracking-widest ${
                animationSpeed === speed
                  ? 'border-[#d4af37] bg-[#1a1a1a] text-[#d4af37]'
                  : 'border-[#2a2a2a] bg-[#0f0f0f] text-gray-400 hover:border-[#d4af37]/50'
              }`}
            >
              {speed}
            </button>
          ))}
        </div>
      </div>

      {/* Preview */}
      <div className="border-t border-[#2a2a2a] pt-4 mt-4">
        <p className="text-xs text-gray-400 mb-3">Preview:</p>
        <div className="space-y-2">
          <div
            className="p-3 rounded-lg border"
            style={{
              borderColor: themeColors[variant].primary,
              backgroundColor: `rgba(212, 175, 55, ${transparency / 100 * 0.1})`,
            }}
          >
            <p style={{ color: themeColors[variant].primary }} className="text-sm font-bold">
              Primary Color
            </p>
          </div>
          <div
            className="p-3 rounded-lg border"
            style={{
              borderColor: themeColors[variant].secondary,
              backgroundColor: `rgba(255, 107, 157, ${transparency / 100 * 0.1})`,
            }}
          >
            <p style={{ color: themeColors[variant].secondary }} className="text-sm font-bold">
              Secondary Color
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
