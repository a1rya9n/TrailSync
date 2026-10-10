import React, { useState } from 'react';
import { IdentificationResult } from '../../types';
import { X, BookOpen, Trash2, Sparkles, AlertOctagon, CheckCircle2, Search, ExternalLink } from 'lucide-react';

interface OfflineJournalModalProps {
  isOpen: boolean;
  onClose: () => void;
  journalEntries: IdentificationResult[];
  onRemoveEntry: (id: string) => void;
  onSelectEntry: (entry: IdentificationResult) => void;
}

export const OfflineJournalModal: React.FC<OfflineJournalModalProps> = ({
  isOpen,
  onClose,
  journalEntries,
  onRemoveEntry,
  onSelectEntry,
}) => {
  const [filterQuery, setFilterQuery] = useState('');

  if (!isOpen) return null;

  const filtered = journalEntries.filter(
    (e) =>
      e.commonName.toLowerCase().includes(filterQuery.toLowerCase()) ||
      e.scientificName.toLowerCase().includes(filterQuery.toLowerCase()) ||
      e.category.toLowerCase().includes(filterQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal-950/70 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-xl max-h-[85vh] overflow-y-auto rounded-3xl border bg-stone-50 border-stone-200 shadow-2xl dark:bg-pocket-card dark:border-pocket-border text-charcoal-900 dark:text-stone-100 p-5 sm:p-6 transition-all flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 pb-3 border-b border-stone-200/80 dark:border-pocket-border">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-sage-100 text-sage-800 dark:bg-sage-950 dark:text-sage-300">
              <BookOpen className="w-5 h-5 text-sage-700 dark:text-sage-400" />
            </div>
            <div>
              <h2 className="text-lg font-display font-bold m-0 leading-tight">
                Offline Field Journal
              </h2>
              <p className="text-xs text-charcoal-500 dark:text-stone-400 m-0">
                {journalEntries.length} Saved Flora & Fauna Observations (Stored Locally)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl border border-stone-200 text-charcoal-500 hover:bg-stone-100 dark:border-pocket-border dark:text-stone-400 dark:hover:bg-pocket-bg"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Filter input */}
        <div className="my-3">
          <div className="relative">
            <Search className="w-4 h-4 text-charcoal-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              placeholder="Search saved journal notes..."
              className="w-full pl-9 pr-3 py-2 rounded-xl border text-xs bg-stone-100/60 border-stone-200 dark:bg-pocket-bg dark:border-pocket-border text-charcoal-900 dark:text-stone-100 focus:outline-none focus:ring-1 focus:ring-sage-500"
            />
          </div>
        </div>

        {/* Journal Entries List */}
        <div className="flex-1 overflow-y-auto space-y-2.5 my-2">
          {filtered.length === 0 ? (
            <div className="p-8 text-center rounded-2xl border bg-stone-100/50 border-stone-200 dark:bg-pocket-bg dark:border-pocket-border">
              <BookOpen className="w-8 h-8 text-stone-400 mx-auto mb-2 opacity-50" />
              <h3 className="text-xs font-display font-bold text-charcoal-700 dark:text-stone-300 m-0">
                No observations match
              </h3>
              <p className="text-[11px] text-charcoal-400 dark:text-stone-500 m-0 mt-0.5">
                Identify any specimen in the Field Guide and tap "Log Entry" to save it here offline.
              </p>
            </div>
          ) : (
            filtered.map((entry) => (
              <div
                key={entry.id}
                className="p-3.5 rounded-xl border bg-stone-50 border-stone-200 dark:bg-pocket-bg dark:border-pocket-border hover:border-sage-400 transition-all flex items-start justify-between gap-3"
              >
                <div
                  onClick={() => {
                    onSelectEntry(entry);
                    onClose();
                  }}
                  className="flex-1 cursor-pointer"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-stone-200/70 text-charcoal-700 dark:bg-pocket-card dark:text-stone-300">
                      {entry.category}
                    </span>
                    {entry.safetyLevel === 'danger' && (
                      <span className="inline-flex items-center gap-0.5 text-[10px] font-mono text-red-600 dark:text-red-400 font-bold">
                        <AlertOctagon className="w-3 h-3" />
                        Toxic
                      </span>
                    )}
                    {entry.safetyLevel === 'safe' && (
                      <span className="inline-flex items-center gap-0.5 text-[10px] font-mono text-emerald-600 dark:text-emerald-400">
                        <CheckCircle2 className="w-3 h-3" />
                        Safe
                      </span>
                    )}
                    {entry.detectedAt && (
                      <span className="text-[10px] font-mono text-charcoal-400 dark:text-stone-500">
                        • {entry.detectedAt}
                      </span>
                    )}
                  </div>

                  <h3 className="text-sm font-display font-bold text-charcoal-900 dark:text-stone-100 m-0 leading-tight">
                    {entry.commonName}
                  </h3>
                  <p className="text-xs italic font-serif text-charcoal-500 dark:text-stone-400 m-0">
                    {entry.scientificName}
                  </p>

                  <p className="text-xs text-charcoal-600 dark:text-stone-300 m-0 mt-1.5 line-clamp-2 leading-relaxed">
                    {entry.ecologicalNotes}
                  </p>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <button
                    onClick={() => onRemoveEntry(entry.id)}
                    title="Delete entry"
                    className="p-1 rounded-lg text-stone-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => {
                      onSelectEntry(entry);
                      onClose();
                    }}
                    title="View details"
                    className="text-[11px] font-medium text-sage-700 dark:text-sage-400 hover:underline flex items-center gap-0.5"
                  >
                    Details <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-stone-200/80 dark:border-pocket-border flex items-center justify-between">
          <span className="text-[10px] font-mono text-charcoal-400 dark:text-stone-500">
            Encrypted in browser IndexedDB / localStorage
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl text-xs font-semibold bg-stone-200/80 text-charcoal-800 dark:bg-pocket-bg dark:text-stone-200 hover:bg-stone-300/80"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
