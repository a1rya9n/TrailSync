import React from 'react';
import { Camera, MapPin, Calendar, BookOpen } from 'lucide-react';

interface QuickActionStripProps {
  onOpenIdentifier: () => void;
  onQuickMarkWaypoint: () => void;
  onOpenPlanner: () => void;
  onOpenJournal: () => void;
}

export const QuickActionStrip: React.FC<QuickActionStripProps> = ({
  onOpenIdentifier,
  onQuickMarkWaypoint,
  onOpenPlanner,
  onOpenJournal,
}) => {
  return (
    <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-2.5 my-3">
      {/* 1. Instant Camera / Specimen Identify */}
      <button
        onClick={onOpenIdentifier}
        className="flex items-center gap-3 p-3.5 rounded-2xl border transition-all active-press text-left bg-stone-50 border-stone-200/90 shadow-soft hover:border-sage-500 dark:bg-pocket-card dark:border-pocket-border dark:hover:border-sage-500"
      >
        <div className="p-2.5 rounded-xl bg-sage-100 text-sage-800 dark:bg-sage-950 dark:text-sage-300 dark:border dark:border-sage-800/80">
          <Camera className="w-5 h-5 text-sage-700 dark:text-sage-300" />
        </div>
        <div>
          <span className="block text-xs font-display font-bold text-charcoal-900 dark:text-stone-100 leading-tight">
            ID Specimen
          </span>
          <span className="text-[10px] text-charcoal-500 dark:text-stone-400">
            Offline Camera
          </span>
        </div>
      </button>

      {/* 2. 1-Tap Quick Mark Waypoint */}
      <button
        onClick={onQuickMarkWaypoint}
        className="flex items-center gap-3 p-3.5 rounded-2xl border transition-all active-press text-left bg-stone-50 border-stone-200/90 shadow-soft hover:border-terracotta-400 dark:bg-pocket-card dark:border-pocket-border dark:hover:border-terracotta-400"
      >
        <div className="p-2.5 rounded-xl bg-terracotta-100 text-terracotta-800 dark:bg-red-950/60 dark:text-terracotta-300 dark:border dark:border-terracotta-900/60">
          <MapPin className="w-5 h-5 text-terracotta-600 dark:text-terracotta-400" />
        </div>
        <div>
          <span className="block text-xs font-display font-bold text-charcoal-900 dark:text-stone-100 leading-tight">
            Drop Pin
          </span>
          <span className="text-[10px] text-charcoal-500 dark:text-stone-400">
            Current GPS
          </span>
        </div>
      </button>

      {/* 3. Planner / Phenology */}
      <button
        onClick={onOpenPlanner}
        className="flex items-center gap-3 p-3.5 rounded-2xl border transition-all active-press text-left bg-stone-50 border-stone-200/90 shadow-soft hover:border-sage-500 dark:bg-pocket-card dark:border-pocket-border dark:hover:border-sage-500"
      >
        <div className="p-2.5 rounded-xl bg-stone-200/70 text-charcoal-800 dark:bg-pocket-bg dark:text-stone-300 dark:border dark:border-pocket-border">
          <Calendar className="w-5 h-5 text-charcoal-700 dark:text-stone-300" />
        </div>
        <div>
          <span className="block text-xs font-display font-bold text-charcoal-900 dark:text-stone-100 leading-tight">
            Phenology
          </span>
          <span className="text-[10px] text-charcoal-500 dark:text-stone-400">
            Seasonal Matrix
          </span>
        </div>
      </button>

      {/* 4. Field Journal */}
      <button
        onClick={onOpenJournal}
        className="flex items-center gap-3 p-3.5 rounded-2xl border transition-all active-press text-left bg-stone-50 border-stone-200/90 shadow-soft hover:border-sage-500 dark:bg-pocket-card dark:border-pocket-border dark:hover:border-sage-500"
      >
        <div className="p-2.5 rounded-xl bg-stone-200/70 text-charcoal-800 dark:bg-pocket-bg dark:text-stone-300 dark:border dark:border-pocket-border">
          <BookOpen className="w-5 h-5 text-sage-700 dark:text-sage-400" />
        </div>
        <div>
          <span className="block text-xs font-display font-bold text-charcoal-900 dark:text-stone-100 leading-tight">
            Field Log
          </span>
          <span className="text-[10px] text-charcoal-500 dark:text-stone-400">
            Cached Journal
          </span>
        </div>
      </button>
    </div>
  );
};
