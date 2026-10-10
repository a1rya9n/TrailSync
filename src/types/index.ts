export type AppMode = 'hiking' | 'gardening' | 'birding';

export type DisplayTheme = 'nature' | 'pocket' | 'red-night' | 'sunlight';

export interface WeatherCondition {
  temp: number;
  feelsLike: number;
  condition: string;
  iconName: string;
  humidity: number;
  windSpeed: number;
  windDirection: string;
  barometer: number; // in hPa / inHg
  barometerTrend: 'rising' | 'steady' | 'falling';
  uvIndex: number;
  uvLevel: 'Low' | 'Moderate' | 'Very High' | 'Extreme';
  sunrise: string;
  sunset: string;
  goldenHour: string;
  goldenHourRemaining: string;
  elevation: number; // in meters / feet
  aqi: number;
  aqiStatus: string;
}

export interface PhenologyHighlight {
  id: string;
  mode: AppMode;
  title: string;
  tag: string;
  urgency: 'low' | 'medium' | 'high';
  description: string;
  actionableWindow: string;
  icon: string;
}

export interface IdentificationResult {
  id: string;
  commonName: string;
  scientificName: string;
  category: 'plant' | 'bird' | 'fungi' | 'insect' | 'landmark';
  confidence: number;
  safetyLevel: 'safe' | 'caution' | 'danger';
  safetyWarning?: string;
  diagnosticMarkers: string[];
  ecologicalNotes: string;
  habitat: string;
  bloomOrActivePeriod: string;
  audioCallSnippet?: {
    label: string;
    description: string;
  };
  lookalikes: {
    name: string;
    distinction: string;
  }[];
  imageUrl?: string;
  detectedAt?: string;
}

export interface Waypoint {
  id: string;
  mode: AppMode;
  name: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  elevation?: number;
  category: 'water' | 'trailhead' | 'plant_bed' | 'roost' | 'hazard' | 'campsite' | 'custom';
  notes: string;
  createdAt: string;
  isVisited?: boolean;
}

export interface ChecklistItem {
  id: string;
  mode: AppMode;
  label: string;
  category: string;
  completed: boolean;
  essential: boolean;
}

export interface SeasonalTask {
  id: string;
  mode: AppMode;
  month: string;
  title: string;
  stage: 'early' | 'mid' | 'late';
  details: string;
  idealConditions: string;
}

export interface GemmaConfig {
  apiKey: string;
  provider: 'google' | 'groq' | 'openrouter' | 'ollama' | 'offline_local';
  model: string;
  endpointUrl?: string;
  isCustomKeySet: boolean;
}
