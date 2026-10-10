import React from 'react';
import { AppMode } from '../../types';
import { SEASONAL_TASKS } from '../../data/seasonalCalendar';
import { Calendar, Clock, Sparkles } from 'lucide-react';

interface SeasonalScheduleProps {
  mode: AppMode;
}

export const SeasonalSchedule: React.FC<SeasonalScheduleProps> = ({ mode }) => {
  const tasks = SEASONAL_TASKS.filter((t) => t.mode === mode);

  return (
    <div className="space-y-4">
      <div>
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-sage-600 dark:text-sage-400" />
          <h2 className="text-sm font-display font-bold text-charcoal-900 dark:text-stone-100 m-0">
            Localized Phenology Matrix & Seasonal Timeline
          </h2>
        </div>
        <p className="text-xs text-charcoal-500 dark:text-stone-400 m-0 mt-0.5">
          Ecological schedule for {mode.toUpperCase()} operations based on microclimate phenology rather than arbitrary dates.
        </p>
      </div>

      <div className="space-y-3">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="p-4 rounded-2xl border bg-stone-50 border-stone-200/90 shadow-soft dark:bg-pocket-card dark:border-pocket-border transition-colors"
          >
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-sage-100 text-sage-800 dark:bg-sage-950 dark:text-sage-300">
                  {task.month}
                </span>
                <span className="text-[10px] font-mono uppercase tracking-wider text-charcoal-400 dark:text-stone-500">
                  {task.stage} stage
                </span>
              </div>

              <span className="text-[11px] font-medium text-terracotta-600 dark:text-terracotta-400 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                Active Window
              </span>
            </div>

            <h3 className="text-sm font-display font-bold text-charcoal-900 dark:text-stone-100 m-0 mb-1 leading-snug">
              {task.title}
            </h3>

            <p className="text-xs text-charcoal-600 dark:text-stone-300 leading-relaxed m-0 mb-2.5">
              {task.details}
            </p>

            <div className="pt-2 border-t border-stone-200/60 dark:border-pocket-border/60 flex items-center gap-1.5 text-[11px] text-charcoal-500 dark:text-stone-400">
              <Sparkles className="w-3 h-3 text-amber-500 flex-shrink-0" />
              <span>
                <strong>Ideal Trigger:</strong> {task.idealConditions}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
