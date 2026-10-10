import React, { useState } from 'react';
import { DisplayTheme } from '../types';
import { BatteryCharging, SunMedium, Eye, ShieldCheck, X } from 'lucide-react';

interface PocketModeIndicatorProps {
  theme: DisplayTheme;
  setTheme: (theme: DisplayTheme) => void;
}

export const PocketModeIndicator: React.FC<PocketModeIndicatorProps> = ({
  theme,
  setTheme,
}) => {
  const [minimized, setMinimized] = useState(false);

  if (theme === 'nature') {
    return null;
  }

  if (minimized) {
    return (
      <button
        onClick={() => setMinimized(false)}
        className="fixed bottom-20 right-4 z-30 px-3 py-1.5 rounded-full bg-charcoal-900/90 text-stone-200 border border-charcoal-700 text-xs font-mono shadow-lg flex items-center gap-1.5 backdrop-blur-sm"
      >
        <BatteryCharging className="w-3.5 h-3.5 text-emerald-400" />
        <span>{theme.toUpperCase()}</span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-20 left-4 right-4 max-w-md mx-auto z-30 p-2.5 rounded-2xl border shadow-xl backdrop-blur-md transition-all bg-charcoal-950/90 border-charcoal-800 text-stone-200">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          {theme === 'pocket' && (
            <div className="p-1.5 rounded-lg bg-emerald-950 text-emerald-400 border border-emerald-800/60">
              <BatteryCharging className="w-4 h-4" />
            </div>
          )}
          {theme === 'red-night' && (
            <div className="p-1.5 rounded-lg bg-red-950 text-red-400 border border-red-800/60">
              <Eye className="w-4 h-4" />
            </div>
          )}
          {theme === 'sunlight' && (
            <div className="p-1.5 rounded-lg bg-stone-100 text-black border border-black">
              <SunMedium className="w-4 h-4" />
            </div>
          )}

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-display font-bold leading-tight">
                {theme === 'pocket'
                  ? 'Pocket Mode Active (OLED Black)'
                  : theme === 'red-night'
                  ? 'Red Night-Preserve Active'
                  : 'High-Contrast Sunlight Mode'}
              </span>
            </div>
            <span className="text-[10px] text-stone-400 font-mono block">
              {theme === 'pocket'
                ? 'Zero OLED backlight glare • Conserves ~40% battery'
                : theme === 'red-night'
                ? 'Preserves human dark adaptation & rod vision'
                : '100% Bold contrast for midday direct sunlight'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setTheme('nature')}
            className="px-2 py-1 rounded-lg text-[10px] font-mono border border-stone-700 bg-stone-800/80 text-stone-300 hover:text-white"
          >
            Normal
          </button>
          <button
            onClick={() => setMinimized(true)}
            className="p-1 text-stone-400 hover:text-stone-200"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
