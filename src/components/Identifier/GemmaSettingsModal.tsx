import React, { useState } from 'react';
import { GemmaConfig } from '../../types';
import { saveGemmaConfig, testGemmaConnection } from '../../services/gemmaService';
import { X, Sparkles, CheckCircle2, AlertCircle, Key, Cpu, ExternalLink, RefreshCw, Terminal, Layers } from 'lucide-react';

interface GemmaSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: GemmaConfig;
  onConfigUpdated: (newConfig: GemmaConfig) => void;
}

export const GemmaSettingsModal: React.FC<GemmaSettingsModalProps> = ({
  isOpen,
  onClose,
  config,
  onConfigUpdated,
}) => {
  const [apiKey, setApiKey] = useState(config.apiKey);
  const [provider, setProvider] = useState<GemmaConfig['provider']>(config.provider);
  const [model, setModel] = useState(config.model);
  const [endpointUrl, setEndpointUrl] = useState(config.endpointUrl || '');
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<{
    success: boolean;
    message: string;
    latencyMs: number;
  } | null>(null);

  if (!isOpen) return null;

  const handleSave = () => {
    const updated = saveGemmaConfig({
      apiKey: apiKey.trim(),
      provider,
      model,
      endpointUrl: endpointUrl.trim(),
    });
    onConfigUpdated(updated);
  };

  const handleTest = async () => {
    setIsTesting(true);
    setTestResult(null);
    try {
      const res = await testGemmaConnection({
        apiKey: apiKey.trim(),
        provider,
        model,
        endpointUrl: endpointUrl.trim(),
        isCustomKeySet: Boolean(apiKey.trim()),
      });
      setTestResult(res);
      if (res.success) {
        handleSave();
      }
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal-950/70 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl border bg-stone-50 border-stone-200 shadow-2xl dark:bg-pocket-card dark:border-pocket-border text-charcoal-900 dark:text-stone-100 p-5 sm:p-6 transition-all">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 pb-4 border-b border-stone-200/80 dark:border-pocket-border">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-sage-100 text-sage-800 dark:bg-sage-950 dark:text-sage-300">
              <Sparkles className="w-5 h-5 text-terracotta-500" />
            </div>
            <div>
              <h2 className="text-lg font-display font-bold m-0 leading-tight">
                Gemma 2 Nature Intelligence
              </h2>
              <p className="text-xs text-charcoal-500 dark:text-stone-400 m-0">
                Offline-First Botanical & Ecological Reasoning Engine
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

        {/* Selected Model Card */}
        <div className="my-4 p-4 rounded-2xl border bg-stone-100/70 border-stone-200/80 dark:bg-pocket-bg dark:border-pocket-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono uppercase tracking-wider text-charcoal-400 dark:text-stone-500">
              Selected Foundation Model
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold">
              Edge-Optimized
            </span>
          </div>
          <div className="flex items-center gap-2 mb-1.5">
            <Cpu className="w-4 h-4 text-sage-600 dark:text-sage-400" />
            <h3 className="text-sm font-display font-bold m-0">
              Gemma 2 9B Instruct (<code className="text-xs font-mono">gemma-2-9b-it</code>)
            </h3>
          </div>
          <p className="text-xs text-charcoal-600 dark:text-stone-300 leading-relaxed m-0">
            <strong>Why selected:</strong> Google's Gemma 2 9B provides unmatched reasoning density per parameter, enabling near-zero latency identification of poisonous plants and rare birds. Open weights allow complete offline local execution in backcountry wilderness.
          </p>
        </div>

        {/* Credentials Form */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-charcoal-500 dark:text-stone-400 mb-1">
              Provider Endpoint
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'google', label: 'Google AI Studio' },
                { id: 'groq', label: 'Groq (Ultra-Fast)' },
                { id: 'ollama', label: 'Ollama (Local)' },
                { id: 'openrouter', label: 'OpenRouter' },
              ].map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => {
                    setProvider(p.id as GemmaConfig['provider']);
                    if (p.id === 'google') setModel('gemma-2-9b-it');
                    if (p.id === 'groq') setModel('gemma2-9b-it');
                  }}
                  className={`py-2 px-2.5 rounded-xl text-xs font-medium border text-center transition-all ${
                    provider === p.id
                      ? 'bg-sage-600 text-stone-50 border-sage-600 font-semibold shadow-sm'
                      : 'bg-stone-50 text-charcoal-700 border-stone-200 dark:bg-pocket-card dark:border-pocket-border dark:text-stone-300'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* API Key Input */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-mono uppercase tracking-wider text-charcoal-500 dark:text-stone-400 flex items-center gap-1">
                <Key className="w-3.5 h-3.5 text-sage-600" />
                API Credentials
              </label>
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noreferrer"
                className="text-[11px] text-terracotta-600 dark:text-terracotta-400 hover:underline inline-flex items-center gap-0.5"
              >
                Get Google AI Studio Key
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="AIzaSy... or gsk_..."
              className="w-full px-3.5 py-2.5 rounded-xl border font-mono text-xs bg-stone-50 border-stone-200 dark:bg-pocket-bg dark:border-pocket-border focus:outline-none focus:ring-2 focus:ring-sage-500 text-charcoal-900 dark:text-stone-100"
            />
            <p className="text-[11px] text-charcoal-400 dark:text-stone-500 mt-1">
              Stored locally on your device or read automatically from <code className="text-[10px]">VITE_GEMMA_API_KEY</code>.
            </p>
          </div>

          {/* Model Name Input */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-charcoal-500 dark:text-stone-400 mb-1">
              Model Identifier
            </label>
            <input
              type="text"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border font-mono text-xs bg-stone-50 border-stone-200 dark:bg-pocket-bg dark:border-pocket-border text-charcoal-900 dark:text-stone-100"
            />
          </div>

          {/* Test Status feedback */}
          {testResult && (
            <div
              className={`p-3 rounded-xl border flex items-start gap-2.5 text-xs ${
                testResult.success
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-800 dark:bg-emerald-950/60 dark:border-emerald-800 dark:text-emerald-200'
                  : 'bg-red-50 border-red-300 text-red-800 dark:bg-red-950/60 dark:border-red-800 dark:text-red-200'
              }`}
            >
              {testResult.success ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
              )}
              <div>
                <p className="font-semibold m-0">{testResult.message}</p>
                {testResult.latencyMs > 0 && (
                  <span className="font-mono text-[10px] opacity-80">
                    Round-trip latency: {testResult.latencyMs}ms
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Offline Engine Reminder */}
          <div className="p-3 rounded-xl border border-stone-200/60 dark:border-pocket-border/60 bg-stone-100/50 dark:bg-pocket-bg/40 flex items-start gap-2 text-[11px] text-charcoal-500 dark:text-stone-400">
            <Layers className="w-4 h-4 text-sage-600 flex-shrink-0 mt-0.5" />
            <div>
              <strong>100% Offline Resilience:</strong> If you leave this blank or lose cellular signal on the trail, TrailSync seamlessly switches to its built-in local offline botanical classifier.
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="flex items-center justify-end gap-2.5 mt-6 pt-4 border-t border-stone-200/80 dark:border-pocket-border">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold border border-stone-200 dark:border-pocket-border text-charcoal-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-pocket-bg"
          >
            Close
          </button>
          <button
            type="button"
            onClick={handleTest}
            disabled={isTesting}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold border border-sage-500 text-sage-700 dark:text-sage-300 hover:bg-sage-50 dark:hover:bg-pocket-bg"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isTesting ? 'animate-spin' : ''}`} />
            <span>{isTesting ? 'Testing...' : 'Test Connection'}</span>
          </button>
          <button
            type="button"
            onClick={() => {
              handleSave();
              onClose();
            }}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-sage-700 text-stone-50 hover:bg-sage-800 shadow-soft"
          >
            Save Configuration
          </button>
        </div>
      </div>
    </div>
  );
};
