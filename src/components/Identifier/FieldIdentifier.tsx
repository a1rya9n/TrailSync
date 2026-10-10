import React, { useState } from 'react';
import { IdentificationResult, GemmaConfig } from '../../types';
import { PRESET_SPECIMENS } from '../../data/mockData';
import { identifySpecimen } from '../../services/gemmaService';
import { SpecimenCard } from './SpecimenCard';
import { Camera, Upload, Search, Sparkles, RefreshCw, AlertTriangle, Check, Layers, Image as ImageIcon } from 'lucide-react';

interface FieldIdentifierProps {
  gemmaConfig: GemmaConfig;
  onOpenGemmaSettings: () => void;
  onSaveToJournal: (specimen: IdentificationResult) => void;
  savedJournalIds: string[];
}

export const FieldIdentifier: React.FC<FieldIdentifierProps> = ({
  gemmaConfig,
  onOpenGemmaSettings,
  onSaveToJournal,
  savedJournalIds,
}) => {
  const [selectedSpecimen, setSelectedSpecimen] = useState<IdentificationResult | null>(PRESET_SPECIMENS[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [uploadedImagePreview, setUploadedImagePreview] = useState<string | null>(null);
  const [activeEngine, setActiveEngine] = useState<'gemma_live' | 'offline_local'>('offline_local');

  // Handle preset selection
  const handleSelectPreset = (preset: IdentificationResult) => {
    setUploadedImagePreview(null);
    setSelectedSpecimen(preset);
  };

  // Handle custom query search or identification
  const handleIdentifyQuery = async (queryToRun: string, imageSrc?: string) => {
    if (!queryToRun.trim()) return;
    setIsAnalyzing(true);
    try {
      const result = await identifySpecimen(queryToRun, imageSrc);
      if (imageSrc) {
        result.imageUrl = imageSrc;
      }
      setSelectedSpecimen(result);
      setActiveEngine(
        gemmaConfig.apiKey && gemmaConfig.apiKey.trim() !== '' && navigator.onLine
          ? 'gemma_live'
          : 'offline_local'
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Handle mock file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        setUploadedImagePreview(dataUrl);
        const nameGuess = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
        handleIdentifyQuery(nameGuess || 'Field Sample Observation', dataUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 pb-12 space-y-4">
      {/* Top Banner / Philosophy */}
      <div className="rounded-2xl border p-4 bg-stone-50 border-stone-200/90 shadow-soft dark:bg-pocket-card dark:border-pocket-border transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-sage-100 text-sage-800 dark:bg-sage-950 dark:text-sage-300 font-bold">
                Offline Field Guide
              </span>
              <span className="text-xs font-mono text-charcoal-500 dark:text-stone-400">
                0ms Latency Engine
              </span>
            </div>
            <h1 className="text-lg sm:text-xl font-display font-bold text-charcoal-900 dark:text-stone-100 m-0 mt-1">
              Field Specimen Identifier
            </h1>
            <p className="text-xs text-charcoal-500 dark:text-stone-400 m-0">
              Instant botanical, avian, and mycological identification without heavy cloud lag.
            </p>
          </div>

          <button
            onClick={onOpenGemmaSettings}
            className="flex items-center gap-1.5 self-start sm:self-auto text-xs font-semibold px-3 py-1.5 rounded-xl border border-stone-200 bg-stone-100 text-charcoal-700 hover:border-sage-500 dark:bg-pocket-bg dark:border-pocket-border dark:text-stone-300"
          >
            <Sparkles className="w-3.5 h-3.5 text-terracotta-500" />
            <span>Gemma 2 Model Setup</span>
          </button>
        </div>
      </div>

      {/* Camera / Upload Mock Viewfinder */}
      <div className="rounded-2xl border p-4 sm:p-5 bg-stone-50 border-stone-200/90 shadow-soft dark:bg-pocket-card dark:border-pocket-border transition-colors">
        {/* Mock Viewfinder Frame */}
        <div className="relative w-full h-48 sm:h-56 rounded-xl border-2 border-dashed border-stone-300 dark:border-stone-700 bg-stone-100/60 dark:bg-pocket-bg flex flex-col items-center justify-center p-4 text-center overflow-hidden">
          {uploadedImagePreview ? (
            <div className="absolute inset-0 w-full h-full">
              <img
                src={uploadedImagePreview}
                alt="Captured Specimen"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-charcoal-950/20 backdrop-blur-[1px]" />
            </div>
          ) : (
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-12 h-12 rounded-2xl bg-stone-200 dark:bg-pocket-card text-charcoal-600 dark:text-stone-300 flex items-center justify-center mb-2 shadow-inner">
                <Camera className="w-6 h-6 text-sage-600 dark:text-sage-400" />
              </div>
              <span className="text-xs font-display font-bold text-charcoal-800 dark:text-stone-200 block">
                Offline Field Lens Viewfinder
              </span>
              <span className="text-[11px] text-charcoal-400 dark:text-stone-500 max-w-xs mt-0.5">
                Align leaf venation, bird silhouette, or mushroom gill structure
              </span>
            </div>
          )}

          {/* Crosshair markers in corners */}
          <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-sage-500 pointer-events-none" />
          <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-sage-500 pointer-events-none" />
          <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-sage-500 pointer-events-none" />
          <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-sage-500 pointer-events-none" />

          {/* Trigger & Upload Actions floating on bottom of viewfinder */}
          <div className="absolute bottom-3 z-20 flex items-center gap-2">
            <label className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-900/80 backdrop-blur-md text-stone-100 text-xs font-semibold cursor-pointer hover:bg-stone-900 shadow-md">
              <Upload className="w-3.5 h-3.5" />
              <span>Choose Photo</span>
              <input
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
            <button
              onClick={() => handleIdentifyQuery('Wild Field Specimen')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sage-700/90 backdrop-blur-md text-stone-50 text-xs font-semibold hover:bg-sage-700 shadow-md"
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Snap Lens</span>
            </button>
          </div>
        </div>

        {/* 1-Tap Specimen Presets Drawer */}
        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono uppercase tracking-wider text-charcoal-500 dark:text-stone-400 flex items-center gap-1">
              <ImageIcon className="w-3.5 h-3.5 text-sage-600" />
              1-Tap Field Test Presets
            </span>
            <span className="text-[10px] text-charcoal-400 dark:text-stone-500">
              Instant Verified Specimens
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {PRESET_SPECIMENS.map((preset) => {
              const isSelected = selectedSpecimen?.id === preset.id;
              const isDanger = preset.safetyLevel === 'danger';
              const isCaution = preset.safetyLevel === 'caution';

              return (
                <button
                  key={preset.id}
                  onClick={() => handleSelectPreset(preset)}
                  className={`p-2.5 rounded-xl border text-left transition-all active-press flex items-start justify-between gap-1.5 ${
                    isSelected
                      ? 'bg-stone-100 border-sage-600 shadow-sm dark:bg-pocket-bg dark:border-sage-500'
                      : 'bg-stone-50 border-stone-200/80 hover:border-sage-400 dark:bg-pocket-card dark:border-pocket-border'
                  }`}
                >
                  <div className="min-w-0">
                    <span className="block text-xs font-display font-bold text-charcoal-900 dark:text-stone-100 truncate">
                      {preset.commonName}
                    </span>
                    <span className="block text-[10px] italic font-serif text-charcoal-400 dark:text-stone-500 truncate">
                      {preset.scientificName}
                    </span>
                  </div>

                  {isDanger ? (
                    <AlertTriangle className="w-3.5 h-3.5 text-red-500 flex-shrink-0 mt-0.5" />
                  ) : isCaution ? (
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
                  ) : (
                    <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Text Search or Species Query */}
        <div className="mt-4 pt-3 border-t border-stone-200/60 dark:border-pocket-border/60">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleIdentifyQuery(searchQuery);
            }}
            className="flex items-center gap-2"
          >
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-charcoal-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Or query species (e.g. 'Stinging Nettle', 'Barred Owl', 'Fiddlehead')..."
                className="w-full pl-9 pr-3 py-2 rounded-xl border text-xs bg-stone-100/60 border-stone-200 dark:bg-pocket-bg dark:border-pocket-border text-charcoal-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-sage-500"
              />
            </div>
            <button
              type="submit"
              disabled={isAnalyzing || !searchQuery.trim()}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-sage-700 text-stone-50 hover:bg-sage-800 disabled:opacity-50 transition-colors flex items-center gap-1.5"
            >
              {isAnalyzing ? (
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              )}
              <span>Analyze</span>
            </button>
          </form>
        </div>
      </div>

      {/* Identification Result Section */}
      {isAnalyzing && (
        <div className="rounded-2xl border p-8 bg-stone-50 border-stone-200 dark:bg-pocket-card dark:border-pocket-border text-center">
          <RefreshCw className="w-8 h-8 text-sage-600 animate-spin mx-auto mb-2" />
          <h2 className="text-sm font-display font-bold text-charcoal-900 dark:text-stone-100 m-0">
            Running Local Ecological Inference...
          </h2>
          <p className="text-xs text-charcoal-400 dark:text-stone-400 m-0 mt-0.5">
            Evaluating diagnostic markers & safety cautions
          </p>
        </div>
      )}

      {selectedSpecimen && !isAnalyzing && (
        <SpecimenCard
          specimen={selectedSpecimen}
          onSaveJournal={onSaveToJournal}
          isSaved={savedJournalIds.includes(selectedSpecimen.id) || savedJournalIds.includes(selectedSpecimen.commonName)}
        />
      )}
    </div>
  );
};
