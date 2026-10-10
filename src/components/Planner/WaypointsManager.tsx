import React, { useState } from 'react';
import { Waypoint, AppMode } from '../../types';
import { addOfflineWaypoint, deleteOfflineWaypoint, toggleWaypointVisited } from '../../services/offlineStorage';
import { MapPin, Plus, Trash2, CheckCircle, Circle, Droplets, Tent, Mountain, AlertCircle, Sprout, Feather, X } from 'lucide-react';

interface WaypointsManagerProps {
  mode: AppMode;
  waypoints: Waypoint[];
  onWaypointsUpdated: (newWaypoints: Waypoint[]) => void;
}

export const WaypointsManager: React.FC<WaypointsManagerProps> = ({
  mode,
  waypoints,
  onWaypointsUpdated,
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [name, setName] = useState('');
  const [category, setCategory] = useState<Waypoint['category']>('water');
  const [notes, setNotes] = useState('');

  // Filter waypoints by mode or show all
  const filteredWaypoints = waypoints.filter((w) => w.mode === mode);

  const handleToggleVisited = (id: string) => {
    toggleWaypointVisited(id);
    onWaypointsUpdated(
      waypoints.map((w) => (w.id === id ? { ...w, isVisited: !w.isVisited } : w))
    );
  };

  const handleDelete = (id: string) => {
    deleteOfflineWaypoint(id);
    onWaypointsUpdated(waypoints.filter((w) => w.id !== id));
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    // Simulated hyper-local GPS coordinates
    const baseLat = 44.2715 + (Math.random() - 0.5) * 0.02;
    const baseLng = -71.3032 + (Math.random() - 0.5) * 0.02;

    const newWp = addOfflineWaypoint({
      mode,
      name: name.trim(),
      coordinates: {
        lat: Number(baseLat.toFixed(5)),
        lng: Number(baseLng.toFixed(5)),
      },
      elevation: Math.round(1100 + Math.random() * 500),
      category,
      notes: notes.trim(),
      isVisited: false,
    });

    onWaypointsUpdated([newWp, ...waypoints]);
    setName('');
    setNotes('');
    setIsAdding(false);
  };

  const getCategoryIcon = (cat: Waypoint['category']) => {
    switch (cat) {
      case 'water':
        return <Droplets className="w-3.5 h-3.5 text-blue-500" />;
      case 'campsite':
        return <Tent className="w-3.5 h-3.5 text-amber-600" />;
      case 'trailhead':
        return <Mountain className="w-3.5 h-3.5 text-sage-600" />;
      case 'hazard':
        return <AlertCircle className="w-3.5 h-3.5 text-red-500" />;
      case 'plant_bed':
        return <Sprout className="w-3.5 h-3.5 text-emerald-600" />;
      case 'roost':
        return <Feather className="w-3.5 h-3.5 text-terracotta-500" />;
      default:
        return <MapPin className="w-3.5 h-3.5 text-stone-500" />;
    }
  };

  return (
    <div className="space-y-4">
      {/* Action Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-display font-bold text-charcoal-900 dark:text-stone-100 m-0">
            Offline Field Waypoints
          </h2>
          <p className="text-xs text-charcoal-500 dark:text-stone-400 m-0">
            GPS markers saved locally in device memory with zero cell coverage.
          </p>
        </div>

        <button
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sage-700 text-stone-50 text-xs font-semibold hover:bg-sage-800 transition-colors shadow-soft"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Waypoint</span>
        </button>
      </div>

      {/* Add Waypoint Modal / Card */}
      {isAdding && (
        <form
          onSubmit={handleCreate}
          className="p-4 rounded-2xl border bg-stone-100/90 border-stone-300 dark:bg-pocket-bg dark:border-pocket-border space-y-3"
        >
          <div className="flex items-center justify-between pb-2 border-b border-stone-200 dark:border-pocket-border">
            <span className="text-xs font-display font-bold text-charcoal-900 dark:text-stone-100 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-terracotta-500" />
              Pin New {mode.toUpperCase()} Location
            </span>
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="text-charcoal-400 hover:text-charcoal-600 dark:hover:text-stone-200"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] uppercase font-mono tracking-wider text-charcoal-500 dark:text-stone-400 mb-1">
                Waypoint Label
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Filtered Spring, Elderberry Stand, Raptor Roost..."
                className="w-full px-3 py-1.5 rounded-xl border text-xs bg-stone-50 border-stone-200 dark:bg-pocket-card dark:border-pocket-border text-charcoal-900 dark:text-stone-100 focus:outline-none focus:ring-1 focus:ring-sage-500"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase font-mono tracking-wider text-charcoal-500 dark:text-stone-400 mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as Waypoint['category'])}
                className="w-full px-3 py-1.5 rounded-xl border text-xs bg-stone-50 border-stone-200 dark:bg-pocket-card dark:border-pocket-border text-charcoal-900 dark:text-stone-100 focus:outline-none focus:ring-1 focus:ring-sage-500"
              >
                <option value="water">Water Source</option>
                <option value="trailhead">Trailhead / Summit</option>
                <option value="plant_bed">Garden Bed / Foraging Spot</option>
                <option value="roost">Bird Roost / Nest</option>
                <option value="campsite">Shelter / Campsite</option>
                <option value="hazard">Trail Hazard</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[10px] uppercase font-mono tracking-wider text-charcoal-500 dark:text-stone-400 mb-1">
              Field Notes (Soil, Flow Rate, Landmarks)
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Reliable year-round flow; filter required; shaded by birch grove."
              className="w-full px-3 py-1.5 rounded-xl border text-xs bg-stone-50 border-stone-200 dark:bg-pocket-card dark:border-pocket-border text-charcoal-900 dark:text-stone-100 focus:outline-none focus:ring-1 focus:ring-sage-500"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-3 py-1.5 rounded-xl text-xs text-charcoal-600 dark:text-stone-400 hover:bg-stone-200/50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-1.5 rounded-xl bg-sage-700 text-stone-50 text-xs font-semibold hover:bg-sage-800"
            >
              Save Pin (GPS Stamped)
            </button>
          </div>
        </form>
      )}

      {/* Waypoints List */}
      <div className="space-y-2">
        {filteredWaypoints.length === 0 ? (
          <div className="p-8 text-center rounded-2xl border bg-stone-50 border-stone-200 dark:bg-pocket-card dark:border-pocket-border">
            <MapPin className="w-8 h-8 text-stone-400 mx-auto mb-2 opacity-50" />
            <h3 className="text-xs font-display font-bold text-charcoal-700 dark:text-stone-300 m-0">
              No waypoints saved for {mode.toUpperCase()}
            </h3>
            <p className="text-[11px] text-charcoal-400 dark:text-stone-500 m-0 mt-0.5">
              Tap "Add Waypoint" or "Drop Pin" from dashboard to save coordinates.
            </p>
          </div>
        ) : (
          filteredWaypoints.map((wp) => (
            <div
              key={wp.id}
              className={`p-3.5 rounded-xl border transition-all flex items-start justify-between gap-3 ${
                wp.isVisited
                  ? 'bg-stone-100/40 border-stone-200/50 opacity-75 dark:bg-pocket-bg/40 dark:border-pocket-border/40'
                  : 'bg-stone-50 border-stone-200 dark:bg-pocket-card dark:border-pocket-border'
              }`}
            >
              <div className="flex items-start gap-3">
                <button
                  onClick={() => handleToggleVisited(wp.id)}
                  title={wp.isVisited ? 'Mark unvisited' : 'Mark visited'}
                  className="mt-0.5 text-stone-400 hover:text-sage-600 transition-colors"
                >
                  {wp.isVisited ? (
                    <CheckCircle className="w-4 h-4 text-sage-600 dark:text-sage-400" />
                  ) : (
                    <Circle className="w-4 h-4" />
                  )}
                </button>

                <div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs font-display font-bold leading-tight ${
                        wp.isVisited
                          ? 'line-through text-charcoal-400 dark:text-stone-500'
                          : 'text-charcoal-900 dark:text-stone-100'
                      }`}
                    >
                      {wp.name}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono px-1.5 py-0.5 rounded bg-stone-200/60 dark:bg-pocket-bg text-charcoal-600 dark:text-stone-400 capitalize">
                      {getCategoryIcon(wp.category)}
                      {wp.category.replace('_', ' ')}
                    </span>
                  </div>

                  <div className="text-[11px] font-mono text-charcoal-500 dark:text-stone-400 mt-1 flex items-center gap-2">
                    <span>
                      {wp.coordinates.lat.toFixed(4)}°N, {Math.abs(wp.coordinates.lng).toFixed(4)}°W
                    </span>
                    {wp.elevation && <span>• {wp.elevation} ft</span>}
                  </div>

                  {wp.notes && (
                    <p className="text-xs text-charcoal-600 dark:text-stone-300 mt-1 m-0 leading-relaxed">
                      {wp.notes}
                    </p>
                  )}
                </div>
              </div>

              <button
                onClick={() => handleDelete(wp.id)}
                title="Delete waypoint"
                className="text-stone-400 hover:text-red-500 p-1 rounded-lg transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
