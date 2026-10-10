import React, { useState, useEffect } from 'react';
import { AppMode, DisplayTheme, WeatherCondition, Waypoint, ChecklistItem, IdentificationResult, GemmaConfig } from './types';
import { INITIAL_WEATHER_DATA, PHENOLOGY_HIGHLIGHTS, INITIAL_WAYPOINTS, INITIAL_CHECKLIST } from './data/mockData';
import { getOfflineWaypoints, addOfflineWaypoint, getOfflineChecklist, getOfflineJournal, saveToOfflineJournal, removeFromOfflineJournal } from './services/offlineStorage';
import { getGemmaConfig } from './services/gemmaService';

import { Header } from './components/Header';
import { ModeSelector } from './components/ModeSelector';
import { QuickGlanceDashboard } from './components/Dashboard/QuickGlanceDashboard';
import { FieldIdentifier } from './components/Identifier/FieldIdentifier';
import { TrailGardenPlanner } from './components/Planner/TrailGardenPlanner';
import { GemmaSettingsModal } from './components/Identifier/GemmaSettingsModal';
import { OfflineJournalModal } from './components/Journal/OfflineJournalModal';
import { PocketModeIndicator } from './components/PocketModeIndicator';

import { Home, Camera, Calendar, CheckCircle2 } from 'lucide-react';

export function App() {
  // Primary state
  const [currentMode, setCurrentMode] = useState<AppMode>('hiking');
  const [theme, setTheme] = useState<DisplayTheme>('nature');
  const [activeTab, setActiveTab] = useState<'dashboard' | 'identifier' | 'planner'>('dashboard');

  // Data state
  const [weatherData] = useState<Record<string, WeatherCondition>>(INITIAL_WEATHER_DATA);
  const [waypoints, setWaypoints] = useState<Waypoint[]>(getOfflineWaypoints);
  const [checklist, setChecklist] = useState<ChecklistItem[]>(getOfflineChecklist);
  const [journal, setJournal] = useState<IdentificationResult[]>(getOfflineJournal);
  const [gemmaConfig, setGemmaConfig] = useState<GemmaConfig>(getGemmaConfig);

  // Modals & toast
  const [isGemmaModalOpen, setIsGemmaModalOpen] = useState(false);
  const [isJournalModalOpen, setIsJournalModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Show transient toast
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Sync theme class to document body
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('dark', 'pocket-mode', 'red-night-mode', 'sunlight-mode');

    if (theme === 'pocket') {
      root.classList.add('dark', 'pocket-mode');
    } else if (theme === 'red-night') {
      root.classList.add('dark', 'red-night-mode');
    } else if (theme === 'sunlight') {
      root.classList.add('sunlight-mode');
    }
  }, [theme]);

  // Handle 1-tap quick drop waypoint
  const handleQuickMarkWaypoint = () => {
    const defaultName =
      currentMode === 'hiking'
        ? 'Trail Landmark Pin'
        : currentMode === 'gardening'
        ? 'Garden Bed Observation'
        : 'Bird Sighting Coordinate';

    const category =
      currentMode === 'hiking' ? 'trailhead' : currentMode === 'gardening' ? 'plant_bed' : 'roost';

    const baseLat = 44.2715 + (Math.random() - 0.5) * 0.01;
    const baseLng = -71.3032 + (Math.random() - 0.5) * 0.01;

    const newWp = addOfflineWaypoint({
      mode: currentMode,
      name: defaultName,
      coordinates: { lat: Number(baseLat.toFixed(5)), lng: Number(baseLng.toFixed(5)) },
      elevation: 1320,
      category,
      notes: 'Captured instantly via 1-Tap Out-the-Door quick action.',
      isVisited: false,
    });

    setWaypoints([newWp, ...waypoints]);
    showToast(`📍 Waypoint dropped: ${baseLat.toFixed(4)}°N, ${Math.abs(baseLng).toFixed(4)}°W`);
  };

  // Save to journal
  const handleSaveToJournal = (specimen: IdentificationResult) => {
    saveToOfflineJournal(specimen);
    setJournal(getOfflineJournal());
    showToast(`📖 Saved "${specimen.commonName}" to Field Log`);
  };

  // Remove from journal
  const handleRemoveFromJournal = (id: string) => {
    removeFromOfflineJournal(id);
    setJournal(getOfflineJournal());
  };

  const currentWeather = weatherData[currentMode] || weatherData.hiking;

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-200">
      {/* 1. Header with Mode switch, Gemma info, and battery toggle */}
      <Header
        theme={theme}
        setTheme={setTheme}
        gemmaConfig={gemmaConfig}
        onOpenGemmaSettings={() => setIsGemmaModalOpen(true)}
        onOpenJournal={() => setIsJournalModalOpen(true)}
        journalCount={journal.length}
      />

      {/* 2. Top Contextual Mode Selector (Hiking / Gardening / Birding) */}
      <ModeSelector
        currentMode={currentMode}
        onSelectMode={(newMode) => {
          setCurrentMode(newMode);
          showToast(`Switched context to ${newMode.toUpperCase()} mode`);
        }}
      />

      {/* 3. Main Content Views */}
      <main className="flex-1 transition-opacity duration-150">
        {activeTab === 'dashboard' && (
          <QuickGlanceDashboard
            weather={currentWeather}
            mode={currentMode}
            highlights={PHENOLOGY_HIGHLIGHTS}
            recentWaypoints={waypoints}
            onOpenIdentifier={() => setActiveTab('identifier')}
            onQuickMarkWaypoint={handleQuickMarkWaypoint}
            onOpenPlanner={() => setActiveTab('planner')}
            onOpenJournal={() => setIsJournalModalOpen(true)}
            onSelectWaypoint={(_wp) => setActiveTab('planner')}
          />
        )}

        {activeTab === 'identifier' && (
          <FieldIdentifier
            gemmaConfig={gemmaConfig}
            onOpenGemmaSettings={() => setIsGemmaModalOpen(true)}
            onSaveToJournal={handleSaveToJournal}
            savedJournalIds={journal.map((j) => j.id).concat(journal.map((j) => j.commonName))}
          />
        )}

        {activeTab === 'planner' && (
          <TrailGardenPlanner
            mode={currentMode}
            waypoints={waypoints}
            checklist={checklist}
            onWaypointsUpdated={setWaypoints}
            onChecklistUpdated={setChecklist}
          />
        )}
      </main>

      {/* 4. Bottom Native PWA Dock / Navigation */}
      <nav className="sticky bottom-0 z-40 w-full backdrop-blur-md border-t px-4 py-2 bg-stone-100/95 border-stone-200/90 dark:bg-pocket-bg/95 dark:border-pocket-border transition-colors">
        <div className="max-w-md mx-auto grid grid-cols-3 gap-2">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-xl transition-all active-press ${
              activeTab === 'dashboard'
                ? 'text-sage-800 font-bold dark:text-stone-100 bg-stone-200/60 dark:bg-pocket-card'
                : 'text-charcoal-500 hover:text-charcoal-800 dark:text-stone-400'
            }`}
          >
            <Home className="w-5 h-5 mb-0.5" />
            <span className="text-[11px] font-display">Out-the-Door</span>
          </button>

          <button
            onClick={() => setActiveTab('identifier')}
            className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-xl transition-all active-press ${
              activeTab === 'identifier'
                ? 'text-sage-800 font-bold dark:text-stone-100 bg-stone-200/60 dark:bg-pocket-card'
                : 'text-charcoal-500 hover:text-charcoal-800 dark:text-stone-400'
            }`}
          >
            <Camera className="w-5 h-5 mb-0.5 text-sage-600 dark:text-sage-400" />
            <span className="text-[11px] font-display">Field Guide</span>
          </button>

          <button
            onClick={() => setActiveTab('planner')}
            className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-xl transition-all active-press ${
              activeTab === 'planner'
                ? 'text-sage-800 font-bold dark:text-stone-100 bg-stone-200/60 dark:bg-pocket-card'
                : 'text-charcoal-500 hover:text-charcoal-800 dark:text-stone-400'
            }`}
          >
            <Calendar className="w-5 h-5 mb-0.5" />
            <span className="text-[11px] font-display">Planner & GPS</span>
          </button>
        </div>
      </nav>

      {/* Floating Low-Power / Glare Mode Overlay Pill */}
      <PocketModeIndicator theme={theme} setTheme={setTheme} />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-xl bg-charcoal-900/90 backdrop-blur-md text-stone-100 text-xs font-medium shadow-2xl flex items-center gap-2 animate-bounce-subtle border border-charcoal-700">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Gemma Settings Modal */}
      <GemmaSettingsModal
        isOpen={isGemmaModalOpen}
        onClose={() => setIsGemmaModalOpen(false)}
        config={gemmaConfig}
        onConfigUpdated={setGemmaConfig}
      />

      {/* Offline Journal Drawer / Modal */}
      <OfflineJournalModal
        isOpen={isJournalModalOpen}
        onClose={() => setIsJournalModalOpen(false)}
        journalEntries={journal}
        onRemoveEntry={handleRemoveFromJournal}
        onSelectEntry={(_entry) => {
          setActiveTab('identifier');
        }}
      />
    </div>
  );
}

export default App;
