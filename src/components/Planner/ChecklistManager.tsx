import React, { useState } from 'react';
import { ChecklistItem, AppMode } from '../../types';
import { toggleChecklistItem, addChecklistItem } from '../../services/offlineStorage';
import { CheckSquare, Square, Plus, ShieldAlert } from 'lucide-react';

interface ChecklistManagerProps {
  mode: AppMode;
  items: ChecklistItem[];
  onItemsUpdated: (newItems: ChecklistItem[]) => void;
}

export const ChecklistManager: React.FC<ChecklistManagerProps> = ({
  mode,
  items,
  onItemsUpdated,
}) => {
  const [newLabel, setNewLabel] = useState('');
  const [newCategory, setNewCategory] = useState('Gear');
  const [isEssential, setIsEssential] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const modeItems = items.filter((i) => i.mode === mode);
  const completedCount = modeItems.filter((i) => i.completed).length;

  const handleToggle = (id: string) => {
    toggleChecklistItem(id);
    onItemsUpdated(
      items.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item))
    );
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLabel.trim()) return;

    const created = addChecklistItem({
      mode,
      label: newLabel.trim(),
      category: newCategory,
      completed: false,
      essential: isEssential,
    });

    onItemsUpdated([...items, created]);
    setNewLabel('');
    setIsEssential(false);
    setIsAdding(false);
  };

  return (
    <div className="space-y-4">
      {/* Header and Progress */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-display font-bold text-charcoal-900 dark:text-stone-100 m-0">
            Field Checklist ({completedCount}/{modeItems.length})
          </h2>
          <p className="text-xs text-charcoal-500 dark:text-stone-400 m-0">
            Offline verification list for {mode.toUpperCase()} readiness.
          </p>
        </div>

        <button
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sage-700 text-stone-50 text-xs font-semibold hover:bg-sage-800 transition-colors shadow-soft"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Item</span>
        </button>
      </div>

      {/* Add Item Form */}
      {isAdding && (
        <form
          onSubmit={handleAdd}
          className="p-3.5 rounded-xl border bg-stone-100/90 border-stone-300 dark:bg-pocket-bg dark:border-pocket-border flex flex-col gap-2.5"
        >
          <input
            type="text"
            required
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
            placeholder="e.g. 100% DEET Bug Spray, Soil Thermometer, Water Purification Drops..."
            className="w-full px-3 py-1.5 rounded-lg border text-xs bg-stone-50 border-stone-200 dark:bg-pocket-card dark:border-pocket-border text-charcoal-900 dark:text-stone-100"
          />
          <div className="flex items-center justify-between gap-2">
            <label className="flex items-center gap-1.5 text-xs text-charcoal-700 dark:text-stone-300 cursor-pointer">
              <input
                type="checkbox"
                checked={isEssential}
                onChange={(e) => setIsEssential(e.target.checked)}
                className="rounded text-terracotta-500 focus:ring-0"
              />
              <span className="text-[11px] font-mono">Safety-Critical Item</span>
            </label>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="px-2.5 py-1 text-xs text-charcoal-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-3 py-1 bg-sage-700 text-stone-50 text-xs font-semibold rounded-lg"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Items List */}
      <div className="space-y-2">
        {modeItems.map((item) => (
          <div
            key={item.id}
            onClick={() => handleToggle(item.id)}
            className={`p-3 rounded-xl border cursor-pointer transition-all active-press flex items-center justify-between gap-2 ${
              item.completed
                ? 'bg-stone-100/50 border-stone-200/50 opacity-75 dark:bg-pocket-bg/40 dark:border-pocket-border/40'
                : 'bg-stone-50 border-stone-200 dark:bg-pocket-card dark:border-pocket-border'
            }`}
          >
            <div className="flex items-center gap-2.5">
              {item.completed ? (
                <CheckSquare className="w-4 h-4 text-sage-600 dark:text-sage-400 flex-shrink-0" />
              ) : (
                <Square className="w-4 h-4 text-stone-400 dark:text-stone-500 flex-shrink-0" />
              )}
              <span
                className={`text-xs font-medium leading-snug ${
                  item.completed
                    ? 'line-through text-charcoal-400 dark:text-stone-500'
                    : 'text-charcoal-900 dark:text-stone-100'
                }`}
              >
                {item.label}
              </span>
            </div>

            <div className="flex items-center gap-1.5 flex-shrink-0">
              {item.essential && (
                <span className="inline-flex items-center gap-0.5 text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-terracotta-100 text-terracotta-800 dark:bg-red-950/60 dark:text-terracotta-300">
                  <ShieldAlert className="w-3 h-3 text-terracotta-600" />
                  Essential
                </span>
              )}
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-stone-200/60 text-charcoal-600 dark:bg-pocket-bg dark:text-stone-400">
                {item.category}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
