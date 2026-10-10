import React, { useState } from 'react';
import { AppMode, Waypoint, ChecklistItem } from '../../types';
import { WaypointsManager } from './WaypointsManager';
import { SeasonalSchedule } from './SeasonalSchedule';
import { ChecklistManager } from './ChecklistManager';
import { Calendar, MapPin, CheckSquare, Layers } from 'lucide-react';

interface TrailGardenPlannerProps {
  mode: AppMode;
  waypoints: Waypoint[];
  checklist: ChecklistItem[];
  onWaypointsUpdated: (wps: Waypoint[]) => void;
  onChecklistUpdated: (items: ChecklistItem[]) => void;
}

export const TrailGardenPlanner: React.FC<TrailGardenPlannerProps> = ({
  mode,
  waypoints,
  checklist,
  onWaypointsUpdated,
  onChecklistUpdated,
}) => {
  const [activeTab, setActiveTab] = useState<'seasonal' | 'waypoints' | 'checklist'>('seasonal');

  return (
    <div className="w-full max-w-4xl mx-auto px-4 pb-12 space-y-4">
      {/* Planner Header Banner */}
      <div className="rounded-2xl border p-4 bg-stone-50 border-stone-200/90 shadow-soft dark:bg-pocket-card dark:border-pocket-border transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-sage-100 text-sage-800 dark:bg-sage-950 dark:text-sage-300 font-bold">
                Minimalist Planner
              </span>
              <span className="text-xs font-mono text-charcoal-500 dark:text-stone-400">
                100% Offline Database
              </span>
            </div>
            <h1 className="text-lg sm:text-xl font-display font-bold text-charcoal-900 dark:text-stone-100 m-0 mt-1">
              {mode === 'hiking' ? 'Trail & Ridge Operations' : mode === 'gardening' ? 'Garden Phenology & Bed Planner' : 'Flyway & Observation Planner'}
            </h1>
            <p className="text-xs text-charcoal-500 dark:text-stone-400 m-0">
              Zero clutter. Access localized schedules, GPS waypoints, and packing checklists.
            </p>
          </div>
        </div>

        {/* Sub-tab pills */}
        <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-stone-200/70 dark:border-pocket-border">
          <button
            onClick={() => setActiveTab('seasonal')}
            className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all active-press ${
              activeTab === 'seasonal'
                ? 'bg-sage-700 text-stone-50 shadow-soft'
                : 'bg-stone-100 text-charcoal-600 hover:bg-stone-200/60 dark:bg-pocket-bg dark:text-stone-300'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span className="truncate">Phenology Matrix</span>
          </button>

          <button
            onClick={() => setActiveTab('waypoints')}
            className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all active-press ${
              activeTab === 'waypoints'
                ? 'bg-sage-700 text-stone-50 shadow-soft'
                : 'bg-stone-100 text-charcoal-600 hover:bg-stone-200/60 dark:bg-pocket-bg dark:text-stone-300'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span className="truncate">GPS Waypoints</span>
          </button>

          <button
            onClick={() => setActiveTab('checklist')}
            className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all active-press ${
              activeTab === 'checklist'
                ? 'bg-sage-700 text-stone-50 shadow-soft'
                : 'bg-stone-100 text-charcoal-600 hover:bg-stone-200/60 dark:bg-pocket-bg dark:text-stone-300'
            }`}
          >
            <CheckSquare className="w-3.5 h-3.5" />
            <span className="truncate">Field Checklist</span>
          </button>
        </div>
      </div>

      {/* Content based on sub-tab */}
      <div className="rounded-2xl border p-4 sm:p-5 bg-stone-50 border-stone-200/90 shadow-soft dark:bg-pocket-card dark:border-pocket-border transition-colors">
        {activeTab === 'seasonal' && <SeasonalSchedule mode={mode} />}
        {activeTab === 'waypoints' && (
          <WaypointsManager
            mode={mode}
            waypoints={waypoints}
            onWaypointsUpdated={onWaypointsUpdated}
          />
        )}
        {activeTab === 'checklist' && (
          <ChecklistManager
            mode={mode}
            items={checklist}
            onItemsUpdated={onChecklistUpdated}
          />
        )}
      </div>
    </div>
  );
};
