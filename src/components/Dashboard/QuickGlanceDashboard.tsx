import React, { useState } from 'react';
import { WeatherCondition, AppMode, PhenologyHighlight, Waypoint } from '../../types';
import { WeatherCard } from './WeatherCard';
import { QuickActionStrip } from './QuickActionStrip';
import { HardDrive, CheckCircle2, AlertTriangle, Info, MapPin, ExternalLink, RefreshCw, Layers } from 'lucide-react';

interface QuickGlanceDashboardProps {
  weather: WeatherCondition;
  mode: AppMode;
  highlights: PhenologyHighlight[];
  recentWaypoints: Waypoint[];
  onOpenIdentifier: () => void;
  onQuickMarkWaypoint: () => void;
  onOpenPlanner: () => void;
  onOpenJournal: () => void;
  onSelectWaypoint: (wp: Waypoint) => void;
}

export const QuickGlanceDashboard: React.FC<QuickGlanceDashboardProps> = ({
  weather,
  mode,
  highlights,
  recentWaypoints,
  onOpenIdentifier,
  onQuickMarkWaypoint,
  onOpenPlanner,
  onOpenJournal,
  onSelectWaypoint,
}) => {
  const [offlinePackCached, setOfflinePackCached] = useState(true);
  const [cacheRefreshing, setCacheRefreshing] = useState(false);

  const handleRefreshCache = () => {
    setCacheRefreshing(true);
    setTimeout(() => {
      setCacheRefreshing(false);
      setOfflinePackCached(true);
    }, 800);
  };

  const filteredHighlights = highlights.filter((h) => h.mode === mode);
  const modeWaypoints = recentWaypoints.filter((w) => w.mode === mode).slice(0, 3);

  const getUrgencyBadge = (urgency: 'low' | 'medium' | 'high') => {
    switch (urgency) {
      case 'high':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-terracotta-100 text-terracotta-800 dark:bg-terracotta-900/40 dark:text-terracotta-300">
            <AlertTriangle className="w-3 h-3 text-terracotta-600" />
            Peak Window
          </span>
        );
      case 'medium':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300">
            <Info className="w-3 h-3 text-amber-600" />
            Active
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full bg-sage-100 text-sage-800 dark:bg-sage-950 dark:text-sage-300">
            <CheckCircle2 className="w-3 h-3 text-sage-600" />
            Stable
          </span>
        );
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 pb-8 space-y-4">
      {/* 1. Hyper-local Weather Conditions */}
      <WeatherCard weather={weather} mode={mode} />

      {/* 2. Rapid 1-Tap Action Strip */}
      <QuickActionStrip
        onOpenIdentifier={onOpenIdentifier}
        onQuickMarkWaypoint={onQuickMarkWaypoint}
        onOpenPlanner={onOpenPlanner}
        onOpenJournal={onOpenJournal}
      />

      {/* 3. Offline Map & Topo Cache Status */}
      <div className="rounded-2xl border p-4 bg-stone-50 border-stone-200/90 shadow-soft dark:bg-pocket-card dark:border-pocket-border transition-colors">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-sage-100 text-sage-800 dark:bg-sage-950 dark:text-sage-300">
              <HardDrive className="w-4 h-4 text-sage-700 dark:text-sage-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-display font-bold text-charcoal-900 dark:text-stone-100">
                  Regional Offline Tile Pack
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-stone-200/70 text-charcoal-700 dark:bg-pocket-bg dark:text-stone-300">
                  v4.8 • 28.4 MB
                </span>
              </div>
              <p className="text-[11px] text-charcoal-500 dark:text-stone-400 m-0">
                Bear Creek Ridge & Presidential Foothills • 100% On-Device
              </p>
            </div>
          </div>

          <button
            onClick={handleRefreshCache}
            disabled={cacheRefreshing}
            className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-xl border transition-all active-press bg-stone-100/70 border-stone-200 text-charcoal-700 hover:border-sage-400 dark:bg-pocket-bg dark:border-pocket-border dark:text-stone-300"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${cacheRefreshing ? 'animate-spin text-sage-600' : ''}`} />
            <span className="hidden sm:inline">{cacheRefreshing ? 'Checking...' : 'Verify Cache'}</span>
          </button>
        </div>

        <div className="mt-3 pt-3 border-t border-stone-200/60 dark:border-pocket-border/60 flex flex-wrap items-center justify-between gap-2 text-[11px] text-charcoal-500 dark:text-stone-400">
          <span className="inline-flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 pulse-offline"></span>
            Storage: IndexedDB Vector Cache
          </span>
          <span className="font-mono text-[10px]">
            GPS: 44.2715° N, 71.3032° W
          </span>
        </div>
      </div>

      {/* 4. Seasonal Phenology Highlights tailored to mode */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-sage-700 dark:text-sage-400" />
            <h2 className="text-sm font-display font-bold text-charcoal-900 dark:text-stone-100 m-0">
              {mode === 'hiking' ? 'Trail Alerts & Phenology' : mode === 'gardening' ? 'Garden Phenology Cues' : 'Canopy & Flyway Cues'}
            </h2>
          </div>
          <button
            onClick={onOpenPlanner}
            className="text-xs font-medium text-sage-700 hover:text-sage-900 dark:text-sage-400 dark:hover:text-sage-300 inline-flex items-center gap-0.5"
          >
            Full Seasonal Matrix
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {filteredHighlights.map((highlight) => (
            <div
              key={highlight.id}
              className="rounded-2xl border p-4 bg-stone-50 border-stone-200/90 shadow-soft dark:bg-pocket-card dark:border-pocket-border transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-charcoal-500 dark:text-stone-400">
                    {highlight.tag}
                  </span>
                  {getUrgencyBadge(highlight.urgency)}
                </div>
                <h3 className="text-sm font-display font-bold text-charcoal-900 dark:text-stone-100 m-0 mb-1 leading-snug">
                  {highlight.title}
                </h3>
                <p className="text-xs text-charcoal-600 dark:text-stone-300 leading-relaxed m-0">
                  {highlight.description}
                </p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-stone-200/60 dark:border-pocket-border/60 text-[11px] font-medium text-terracotta-600 dark:text-terracotta-400">
                {highlight.actionableWindow}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Quick Offline Waypoints Peek */}
      {modeWaypoints.length > 0 && (
        <div className="rounded-2xl border p-4 bg-stone-50 border-stone-200/90 shadow-soft dark:bg-pocket-card dark:border-pocket-border transition-colors">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-terracotta-600" />
              <h2 className="text-sm font-display font-bold text-charcoal-900 dark:text-stone-100 m-0">
                Pinned Waypoints ({modeWaypoints.length})
              </h2>
            </div>
            <button
              onClick={onOpenPlanner}
              className="text-xs font-medium text-sage-700 dark:text-sage-400 hover:underline"
            >
              View All & Checklists
            </button>
          </div>

          <div className="space-y-2">
            {modeWaypoints.map((wp) => (
              <div
                key={wp.id}
                onClick={() => onSelectWaypoint(wp)}
                className="flex items-center justify-between p-2.5 rounded-xl border cursor-pointer transition-all active-press bg-stone-100/50 border-stone-200/60 hover:border-sage-400 dark:bg-pocket-bg/60 dark:border-pocket-border/60 dark:hover:border-sage-600"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-2 h-2 rounded-full bg-terracotta-500" />
                  <div>
                    <span className="text-xs font-display font-semibold text-charcoal-800 dark:text-stone-200 block leading-tight">
                      {wp.name}
                    </span>
                    <span className="text-[10px] text-charcoal-400 dark:text-stone-500 font-mono">
                      {wp.coordinates.lat.toFixed(4)}°N, {Math.abs(wp.coordinates.lng).toFixed(4)}°W
                      {wp.elevation ? ` • ${wp.elevation} ft` : ''}
                    </span>
                  </div>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-md font-mono uppercase bg-stone-200/60 text-charcoal-600 dark:bg-pocket-card dark:text-stone-400">
                  {wp.category}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
