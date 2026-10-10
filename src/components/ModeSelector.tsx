import React from 'react';
import { AppMode } from '../types';
import { Compass, Sprout, Feather } from 'lucide-react';

interface ModeSelectorProps {
  currentMode: AppMode;
  onSelectMode: (mode: AppMode) => void;
}

export const ModeSelector: React.FC<ModeSelectorProps> = ({ currentMode, onSelectMode }) => {
  const modes: { id: AppMode; label: string; icon: React.ReactNode; subtitle: string }[] = [
    {
      id: 'hiking',
      label: 'Hiking',
      subtitle: 'Ridgeline & Tread',
      icon: <Compass className="w-4 h-4" />,
    },
    {
      id: 'gardening',
      label: 'Gardening',
      subtitle: 'Soil & Phenology',
      icon: <Sprout className="w-4 h-4" />,
    },
    {
      id: 'birding',
      label: 'Birding',
      subtitle: 'Canopy & Flyway',
      icon: <Feather className="w-4 h-4" />,
    },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto px-4 pt-3 pb-2">
      <div className="grid grid-cols-3 gap-2 p-1.5 rounded-2xl border bg-stone-200/50 border-stone-300/60 dark:bg-pocket-card dark:border-pocket-border">
        {modes.map((m) => {
          const isActive = currentMode === m.id;
          return (
            <button
              key={m.id}
              onClick={() => onSelectMode(m.id)}
              className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl transition-all active-press ${
                isActive
                  ? 'bg-stone-50 text-charcoal-900 font-semibold shadow-soft border border-stone-200 dark:bg-pocket-bg dark:text-stone-100 dark:border-pocket-border'
                  : 'text-charcoal-600 hover:text-charcoal-900 hover:bg-stone-200/40 dark:text-stone-400 dark:hover:text-stone-200 dark:hover:bg-pocket-card/60'
              }`}
            >
              <span
                className={`p-1 rounded-lg ${
                  isActive
                    ? 'text-sage-700 dark:text-sage-400'
                    : 'text-charcoal-400 dark:text-stone-500'
                }`}
              >
                {m.icon}
              </span>
              <div className="text-left">
                <span className="text-xs sm:text-sm font-display block leading-none">
                  {m.label}
                </span>
                <span className="hidden sm:block text-[10px] text-charcoal-400 dark:text-stone-500 font-normal leading-tight mt-0.5">
                  {m.subtitle}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
