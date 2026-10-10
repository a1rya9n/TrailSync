import { Waypoint, ChecklistItem, IdentificationResult } from '../types';
import { INITIAL_WAYPOINTS, INITIAL_CHECKLIST } from '../data/mockData';

const WAYPOINTS_KEY = 'trailsync_waypoints';
const CHECKLIST_KEY = 'trailsync_checklist';
const JOURNAL_KEY = 'trailsync_journal';

export function getOfflineWaypoints(): Waypoint[] {
  try {
    const saved = localStorage.getItem(WAYPOINTS_KEY);
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.warn('Failed to load waypoints', e);
  }
  return INITIAL_WAYPOINTS;
}

export function saveOfflineWaypoints(waypoints: Waypoint[]): void {
  try {
    localStorage.setItem(WAYPOINTS_KEY, JSON.stringify(waypoints));
  } catch (e) {
    console.error('Failed to save waypoints', e);
  }
}

export function addOfflineWaypoint(waypoint: Omit<Waypoint, 'id' | 'createdAt'>): Waypoint {
  const all = getOfflineWaypoints();
  const newWp: Waypoint = {
    ...waypoint,
    id: `wp-${Date.now()}`,
    createdAt: new Date().toLocaleString([], {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    }),
  };
  saveOfflineWaypoints([newWp, ...all]);
  return newWp;
}

export function deleteOfflineWaypoint(id: string): void {
  const all = getOfflineWaypoints();
  saveOfflineWaypoints(all.filter((w) => w.id !== id));
}

export function toggleWaypointVisited(id: string): void {
  const all = getOfflineWaypoints();
  saveOfflineWaypoints(
    all.map((w) => (w.id === id ? { ...w, isVisited: !w.isVisited } : w))
  );
}

export function getOfflineChecklist(): ChecklistItem[] {
  try {
    const saved = localStorage.getItem(CHECKLIST_KEY);
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.warn('Failed to load checklist', e);
  }
  return INITIAL_CHECKLIST;
}

export function saveOfflineChecklist(items: ChecklistItem[]): void {
  try {
    localStorage.setItem(CHECKLIST_KEY, JSON.stringify(items));
  } catch (e) {
    console.error('Failed to save checklist', e);
  }
}

export function toggleChecklistItem(id: string): void {
  const all = getOfflineChecklist();
  saveOfflineChecklist(
    all.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item))
  );
}

export function addChecklistItem(item: Omit<ChecklistItem, 'id'>): ChecklistItem {
  const all = getOfflineChecklist();
  const newItem: ChecklistItem = {
    ...item,
    id: `cl-${Date.now()}`,
  };
  saveOfflineChecklist([...all, newItem]);
  return newItem;
}

// Offline Field Journal
export function getOfflineJournal(): IdentificationResult[] {
  try {
    const saved = localStorage.getItem(JOURNAL_KEY);
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.warn('Failed to load journal', e);
  }
  return [];
}

export function saveToOfflineJournal(specimen: IdentificationResult): void {
  const all = getOfflineJournal();
  // Prevent duplicate by name if saved recently
  const existingIndex = all.findIndex((s) => s.commonName === specimen.commonName);
  if (existingIndex >= 0) {
    all[existingIndex] = specimen;
    localStorage.setItem(JOURNAL_KEY, JSON.stringify(all));
  } else {
    localStorage.setItem(JOURNAL_KEY, JSON.stringify([specimen, ...all]));
  }
}

export function removeFromOfflineJournal(id: string): void {
  const all = getOfflineJournal();
  localStorage.setItem(JOURNAL_KEY, JSON.stringify(all.filter((s) => s.id !== id)));
}
