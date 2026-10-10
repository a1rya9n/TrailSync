import React from 'react';
import { WeatherCondition, AppMode } from '../../types';
import { Sun, CloudSun, Wind, ArrowUpRight, ArrowDownRight, ArrowRight, Gauge, Clock, Droplets, Mountain } from 'lucide-react';

interface WeatherCardProps {
  weather: WeatherCondition;
  mode: AppMode;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({ weather, mode }) => {
  const getTrendIcon = () => {
    if (weather.barometerTrend === 'rising') return <ArrowUpRight className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 inline" />;
    if (weather.barometerTrend === 'falling') return <ArrowDownRight className="w-3.5 h-3.5 text-terracotta-500 inline" />;
    return <ArrowRight className="w-3.5 h-3.5 text-charcoal-400 inline" />;
  };

  const getConditionIcon = () => {
    switch (weather.iconName) {
      case 'Sun':
        return <Sun className="w-8 h-8 text-amber-500 animate-spin-slow" />;
      case 'CloudSun':
        return <CloudSun className="w-8 h-8 text-amber-500" />;
      case 'Wind':
        return <Wind className="w-8 h-8 text-sage-600 dark:text-sage-400" />;
      default:
        return <Sun className="w-8 h-8 text-amber-500" />;
    }
  };

  const getModeEmphasis = () => {
    if (mode === 'hiking') {
      return {
        label: 'Tread & Summit Forecast',
        primaryMetric: `${weather.elevation} ft`,
        primaryLabel: 'Base Elevation',
        secondaryMetric: `${weather.barometer} hPa`,
        secondaryLabel: `Barometer (${weather.barometerTrend})`,
      };
    }
    if (mode === 'gardening') {
      return {
        label: 'Soil & Canopy Condition',
        primaryMetric: `${weather.humidity}%`,
        primaryLabel: 'Foliar Humidity',
        secondaryMetric: `${weather.uvIndex} (${weather.uvLevel})`,
        secondaryLabel: 'Solar UV Index',
      };
    }
    return {
      label: 'Canopy & Thermal Dynamics',
      primaryMetric: `${weather.windSpeed} mph ${weather.windDirection}`,
      primaryLabel: 'Thermal Wind',
      secondaryMetric: weather.goldenHourRemaining,
      secondaryLabel: 'Daylight Remaining',
    };
  };

  const emphasis = getModeEmphasis();

  return (
    <div className="w-full rounded-2xl border p-4 sm:p-5 bg-stone-50 border-stone-200/90 shadow-soft dark:bg-pocket-card dark:border-pocket-border transition-colors">
      {/* Top Banner: Condition & Core Temp */}
      <div className="flex items-start justify-between">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-wider text-charcoal-500 dark:text-stone-400 block mb-1">
            {emphasis.label}
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl sm:text-5xl font-display font-extrabold tracking-tight text-charcoal-900 dark:text-stone-100">
              {weather.temp}°
            </span>
            <span className="text-sm font-medium text-charcoal-500 dark:text-stone-400">
              Feels {weather.feelsLike}°
            </span>
          </div>
          <p className="text-sm font-medium text-sage-800 dark:text-sage-300 mt-1 flex items-center gap-1.5">
            <span>{weather.condition}</span>
            <span className="text-stone-400">•</span>
            <span className="text-xs text-charcoal-600 dark:text-stone-400">AQI {weather.aqi} ({weather.aqiStatus})</span>
          </p>
        </div>

        <div className="flex flex-col items-end">
          <div className="p-2.5 rounded-xl bg-stone-100 dark:bg-pocket-bg border border-stone-200/80 dark:border-pocket-border mb-1">
            {getConditionIcon()}
          </div>
          <span className="text-[11px] font-mono text-terracotta-600 dark:text-terracotta-400 font-medium">
            Sunset {weather.sunset}
          </span>
        </div>
      </div>

      {/* Grid of Micro-Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-4 pt-4 border-t border-stone-200/70 dark:border-pocket-border">
        {/* Barometer */}
        <div className="p-2.5 rounded-xl bg-stone-100/60 dark:bg-pocket-bg/60 border border-stone-200/50 dark:border-pocket-border/50">
          <div className="flex items-center justify-between text-charcoal-400 dark:text-stone-500 mb-1">
            <span className="text-[10px] uppercase font-mono tracking-wider">Barometer</span>
            <Gauge className="w-3.5 h-3.5" />
          </div>
          <div className="flex items-center gap-1 font-display font-bold text-sm text-charcoal-800 dark:text-stone-200">
            <span>{weather.barometer} hPa</span>
            {getTrendIcon()}
          </div>
          <span className="text-[10px] text-charcoal-500 dark:text-stone-400 capitalize">
            {weather.barometerTrend === 'rising' ? 'Dry & Stable' : weather.barometerTrend === 'falling' ? 'Storm Watch' : 'Steady Trend'}
          </span>
        </div>

        {/* Golden Hour / Daylight */}
        <div className="p-2.5 rounded-xl bg-stone-100/60 dark:bg-pocket-bg/60 border border-stone-200/50 dark:border-pocket-border/50">
          <div className="flex items-center justify-between text-charcoal-400 dark:text-stone-500 mb-1">
            <span className="text-[10px] uppercase font-mono tracking-wider">Golden Hour</span>
            <Clock className="w-3.5 h-3.5 text-amber-500" />
          </div>
          <div className="font-display font-bold text-sm text-charcoal-800 dark:text-stone-200">
            {weather.goldenHourRemaining}
          </div>
          <span className="text-[10px] text-charcoal-500 dark:text-stone-400">
            Begins {weather.goldenHour}
          </span>
        </div>

        {/* Wind / Thermals */}
        <div className="p-2.5 rounded-xl bg-stone-100/60 dark:bg-pocket-bg/60 border border-stone-200/50 dark:border-pocket-border/50">
          <div className="flex items-center justify-between text-charcoal-400 dark:text-stone-500 mb-1">
            <span className="text-[10px] uppercase font-mono tracking-wider">Wind Vector</span>
            <Wind className="w-3.5 h-3.5" />
          </div>
          <div className="font-display font-bold text-sm text-charcoal-800 dark:text-stone-200">
            {weather.windSpeed} mph {weather.windDirection}
          </div>
          <span className="text-[10px] text-charcoal-500 dark:text-stone-400">
            {mode === 'birding' ? 'Optimal Gliding' : 'Gentle Breeze'}
          </span>
        </div>

        {/* Elevation or Humidity */}
        <div className="p-2.5 rounded-xl bg-stone-100/60 dark:bg-pocket-bg/60 border border-stone-200/50 dark:border-pocket-border/50">
          <div className="flex items-center justify-between text-charcoal-400 dark:text-stone-500 mb-1">
            <span className="text-[10px] uppercase font-mono tracking-wider">
              {mode === 'gardening' ? 'Humidity' : 'Elevation'}
            </span>
            {mode === 'gardening' ? <Droplets className="w-3.5 h-3.5 text-blue-500" /> : <Mountain className="w-3.5 h-3.5 text-sage-600" />}
          </div>
          <div className="font-display font-bold text-sm text-charcoal-800 dark:text-stone-200">
            {mode === 'gardening' ? `${weather.humidity}%` : `${weather.elevation} ft`}
          </div>
          <span className="text-[10px] text-charcoal-500 dark:text-stone-400">
            {mode === 'gardening' ? 'Low Mildew Risk' : 'Altimeter Lock'}
          </span>
        </div>
      </div>
    </div>
  );
};
