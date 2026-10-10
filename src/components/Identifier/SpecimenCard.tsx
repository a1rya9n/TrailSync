import React, { useState } from 'react';
import { IdentificationResult } from '../../types';
import { AlertOctagon, CheckCircle2, BookmarkPlus, BookmarkCheck, Volume2, VolumeX, Eye, Info, Sparkles } from 'lucide-react';

interface SpecimenCardProps {
  specimen: IdentificationResult;
  onSaveJournal: (specimen: IdentificationResult) => void;
  isSaved?: boolean;
}

export const SpecimenCard: React.FC<SpecimenCardProps> = ({
  specimen,
  onSaveJournal,
  isSaved = false,
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [justSaved, setJustSaved] = useState(isSaved);

  const handleSave = () => {
    onSaveJournal(specimen);
    setJustSaved(true);
    setTimeout(() => setJustSaved(false), 2500);
  };

  const toggleAudio = () => {
    setIsPlayingAudio(!isPlayingAudio);
    // Auto-stop after 4 seconds
    if (!isPlayingAudio) {
      setTimeout(() => setIsPlayingAudio(false), 4000);
    }
  };

  const getSafetyBadge = () => {
    if (specimen.safetyLevel === 'danger') {
      return (
        <div className="flex items-start gap-2.5 p-3 rounded-xl bg-red-100/90 border border-red-300 text-red-900 dark:bg-red-950/70 dark:border-red-800 dark:text-red-200 mb-3">
          <AlertOctagon className="w-4 h-4 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
          <div className="text-xs font-semibold leading-relaxed">
            {specimen.safetyWarning || 'DANGER: Do not handle or ingest. Toxic nature specimen.'}
          </div>
        </div>
      );
    }
    if (specimen.safetyLevel === 'caution') {
      return (
        <div className="flex items-start gap-2.5 p-3 rounded-xl bg-amber-100/90 border border-amber-300 text-amber-900 dark:bg-amber-950/70 dark:border-amber-800 dark:text-amber-200 mb-3">
          <Info className="w-4 h-4 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
          <div className="text-xs font-semibold leading-relaxed">
            {specimen.safetyWarning || 'CAUTION: Exercise care in identification. Confirm against toxic lookalikes.'}
          </div>
        </div>
      );
    }
    return (
      <div className="inline-flex items-center gap-1.5 text-[11px] font-medium text-emerald-800 bg-emerald-100/80 dark:bg-emerald-950/60 dark:text-emerald-300 px-2.5 py-1 rounded-full mb-3">
        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
        Safe Field Observation • Harmless / Non-toxic
      </div>
    );
  };

  return (
    <div className="rounded-2xl border p-4 sm:p-5 bg-stone-50 border-stone-200/90 shadow-card dark:bg-pocket-card dark:border-pocket-border transition-all">
      {/* Top Header: Common Name, Latin Binomial, Confidence */}
      <div className="flex items-start justify-between gap-3 mb-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 rounded-full bg-stone-200/70 text-charcoal-700 dark:bg-pocket-bg dark:text-stone-300">
              {specimen.category}
            </span>
            <span className="text-[11px] font-mono font-semibold text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-terracotta-500" />
              {specimen.confidence.toFixed(1)}% Match
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-display font-bold text-charcoal-900 dark:text-stone-100 m-0 mt-1 leading-tight">
            {specimen.commonName}
          </h2>
          <p className="text-sm italic font-serif text-charcoal-500 dark:text-stone-400 m-0">
            {specimen.scientificName}
          </p>
        </div>

        {/* Save to Field Journal Button */}
        <button
          onClick={handleSave}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-all active-press ${
            justSaved || isSaved
              ? 'bg-sage-600 border-sage-600 text-stone-50'
              : 'bg-stone-100 border-stone-200 text-charcoal-700 hover:border-sage-500 dark:bg-pocket-bg dark:border-pocket-border dark:text-stone-200'
          }`}
        >
          {justSaved || isSaved ? (
            <>
              <BookmarkCheck className="w-4 h-4 text-stone-50" />
              <span>Logged</span>
            </>
          ) : (
            <>
              <BookmarkPlus className="w-4 h-4 text-sage-700 dark:text-sage-400" />
              <span>Log Entry</span>
            </>
          )}
        </button>
      </div>

      {/* Safety Warning Banner */}
      {getSafetyBadge()}

      {/* Optional Specimen Image Preview if available */}
      {specimen.imageUrl && (
        <div className="w-full h-44 sm:h-52 rounded-xl overflow-hidden mb-4 border border-stone-200/80 dark:border-pocket-border relative">
          <img
            src={specimen.imageUrl}
            alt={specimen.commonName}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-charcoal-900/70 backdrop-blur-sm text-[10px] text-stone-200 font-mono">
            {specimen.habitat}
          </div>
        </div>
      )}

      {/* Diagnostic Field Markers */}
      <div className="mb-4">
        <h3 className="text-xs font-mono uppercase tracking-wider text-charcoal-400 dark:text-stone-400 mb-2 flex items-center gap-1.5">
          <Eye className="w-3.5 h-3.5 text-sage-600" />
          Key ID Markers
        </h3>
        <ul className="space-y-1.5 pl-0 list-none m-0">
          {specimen.diagnosticMarkers.map((marker, idx) => (
            <li
              key={idx}
              className="text-xs leading-relaxed text-charcoal-700 dark:text-stone-300 flex items-start gap-2 bg-stone-100/50 dark:bg-pocket-bg/40 p-2 rounded-lg border border-stone-200/40 dark:border-pocket-border/40"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-sage-600 dark:bg-sage-400 mt-1.5 flex-shrink-0" />
              <span>{marker}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Audio Song Call Snippet (if available, e.g. for Birds) */}
      {specimen.audioCallSnippet && (
        <div className="mb-4 p-3 rounded-xl border bg-stone-100/70 border-stone-200/70 dark:bg-pocket-bg dark:border-pocket-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={toggleAudio}
                className="p-2 rounded-lg bg-sage-700 text-stone-50 hover:bg-sage-800 transition-colors"
                title="Play Audio Call Simulation"
              >
                {isPlayingAudio ? <VolumeX className="w-4 h-4 animate-pulse" /> : <Volume2 className="w-4 h-4" />}
              </button>
              <div>
                <span className="text-xs font-display font-bold text-charcoal-900 dark:text-stone-100 block">
                  {specimen.audioCallSnippet.label}
                </span>
                <span className="text-[11px] text-charcoal-500 dark:text-stone-400 italic">
                  "{specimen.audioCallSnippet.description}"
                </span>
              </div>
            </div>
            {isPlayingAudio && (
              <span className="text-[10px] font-mono text-terracotta-600 dark:text-terracotta-400 animate-pulse">
                Playing Call...
              </span>
            )}
          </div>
        </div>
      )}

      {/* Ecological Notes & Active Season */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-stone-200/70 dark:border-pocket-border text-xs">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-charcoal-400 dark:text-stone-500 block mb-0.5">
            Ecological Role
          </span>
          <p className="text-charcoal-700 dark:text-stone-300 leading-relaxed m-0">
            {specimen.ecologicalNotes}
          </p>
        </div>
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-charcoal-400 dark:text-stone-500 block mb-0.5">
            Active Season / Window
          </span>
          <p className="text-charcoal-700 dark:text-stone-300 leading-relaxed m-0">
            {specimen.bloomOrActivePeriod}
          </p>
        </div>
      </div>

      {/* Lookalikes Comparison */}
      {specimen.lookalikes && specimen.lookalikes.length > 0 && (
        <div className="mt-3 pt-3 border-t border-stone-200/70 dark:border-pocket-border">
          <span className="text-[10px] font-mono uppercase tracking-wider text-charcoal-400 dark:text-stone-500 block mb-1.5">
            Compare Against Lookalikes
          </span>
          <div className="space-y-1.5">
            {specimen.lookalikes.map((lookalike, idx) => (
              <div
                key={idx}
                className="text-[11px] p-2 rounded-lg bg-stone-100/60 dark:bg-pocket-bg/60 border border-stone-200/40 dark:border-pocket-border/40 text-charcoal-700 dark:text-stone-300"
              >
                <span className="font-semibold text-charcoal-900 dark:text-stone-200">
                  {lookalike.name}:
                </span>{' '}
                <span>{lookalike.distinction}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
