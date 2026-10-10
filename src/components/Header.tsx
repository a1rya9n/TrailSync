import React from 'react';
import { DisplayTheme, GemmaConfig } from '../types';
import { Moon, Sun, Sparkles, BookOpen, WifiOff, Compass, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  theme: DisplayTheme;
  setTheme: (theme: DisplayTheme) => void;
  gemmaConfig: GemmaConfig;
  onOpenGemmaSettings: () => void;
  onOpenJournal: () => void;
  journalCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  theme,
  setTheme,
  gemmaConfig,
  onOpenGemmaSettings,
  onOpenJournal,
  journalCount,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md border-b transition-colors duration-200 px-4 py-3 sm:px-6 bg-stone-100/90 border-stone-200 dark:bg-pocket-bg/95 dark:border-pocket-border">
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-2">
        {/* Brand & Offline status */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sage-700 text-stone-50 flex items-center justify-center font-display font-bold text-lg shadow-soft dark:bg-sage-600 dark:text-stone-900 flex-shrink-0">
            TS
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-display font-bold tracking-tight text-charcoal-900 dark:text-stone-100 m-0 leading-tight">
                TrailSync
              </h1>
              <span className="hidden xs:inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full bg-sage-100 text-sage-800 dark:bg-sage-950 dark:text-sage-300 dark:border dark:border-sage-800/60">
                <WifiOff className="w-3 h-3 text-sage-600 dark:text-sage-400" />
                Offline Ready
              </span>
            </div>
            <p className="text-xs text-charcoal-500 dark:text-stone-400 font-normal m-0 flex items-center gap-1.5">
              <span>Digital Minimalism</span>
              <span className="text-stone-400 dark:text-stone-600">•</span>
              <span className="inline-flex items-center gap-0.5">
                <Compass className="w-3 h-3 text-terracotta-500 inline" />
                GPS Lock ±3m
              </span>
            </p>
          </div>
        </div>

        {/* Action controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Gemma AI Settings Trigger */}
          <button
            onClick={onOpenGemmaSettings}
            title="Gemma 2 Nature Intelligence Settings"
            className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-lg border transition-all active-press bg-stone-50 border-stone-200 text-charcoal-700 hover:border-sage-400 dark:bg-pocket-card dark:border-pocket-border dark:text-stone-300 dark:hover:border-sage-600"
          >
            <Sparkles className="w-3.5 h-3.5 text-terracotta-500" />
            <span className="hidden sm:inline">Gemma 2</span>
            {gemmaConfig.isCustomKeySet ? (
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            ) : (
              <span className="w-2 h-2 rounded-full bg-sage-400" />
            )}
          </button>

          {/* Offline Field Journal Trigger */}
          <button
            onClick={onOpenJournal}
            title="Offline Field Journal"
            className="relative p-2 rounded-lg border transition-all active-press bg-stone-50 border-stone-200 text-charcoal-700 hover:border-sage-400 dark:bg-pocket-card dark:border-pocket-border dark:text-stone-300"
          >
            <BookOpen className="w-4 h-4 text-sage-700 dark:text-sage-400" />
            {journalCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-terracotta-500 text-stone-50 text-[10px] font-bold flex items-center justify-center">
                {journalCount}
              </span>
            )}
          </button>

          {/* Theme / Pocket Mode Toggle */}
          <div className="flex items-center rounded-lg border p-0.5 bg-stone-200/60 border-stone-300/80 dark:bg-pocket-card dark:border-pocket-border">
            <button
              onClick={() => setTheme('nature')}
              title="Natural Stone Light Mode (Earthy/Minimalist)"
              className={`p-1.5 rounded-md transition-all ${
                theme === 'nature'
                  ? 'bg-stone-50 text-sage-800 shadow-sm font-semibold'
                  : 'text-charcoal-500 hover:text-charcoal-800 dark:text-stone-400'
              }`}
            >
              <Sun className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setTheme('pocket')}
              title="Pocket Mode (OLED Deep Black / Low-Battery Saver)"
              className={`p-1.5 rounded-md transition-all ${
                theme === 'pocket'
                  ? 'bg-charcoal-900 text-emerald-400 shadow-sm font-semibold'
                  : 'text-charcoal-500 hover:text-charcoal-800 dark:text-stone-400'
              }`}
            >
              <Moon className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setTheme(theme === 'red-night' ? 'pocket' : 'red-night')}
              title="Red Night-Preserve Mode (Nocturnal Vision & Stargazing)"
              className={`px-1.5 py-1 text-[11px] rounded-md font-mono transition-all ${
                theme === 'red-night'
                  ? 'bg-red-950 text-red-400 border border-red-800 font-bold'
                  : 'text-charcoal-400 hover:text-red-500 dark:text-stone-500'
              }`}
            >
              RED
            </button>
            <button
              onClick={() => setTheme(theme === 'sunlight' ? 'nature' : 'sunlight')}
              title="High-Contrast Sunlight Mode (Direct Blinding Outdoor Sun)"
              className={`px-1.5 py-1 text-[10px] font-bold rounded-md font-mono transition-all ${
                theme === 'sunlight'
                  ? 'bg-black text-white border border-black font-extrabold'
                  : 'text-charcoal-400 hover:text-black dark:text-stone-500'
              }`}
            >
              SUN
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
