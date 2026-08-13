import React, { useState } from 'react';
import { GlassCard } from '../components/common/GlassCard';
import { useTheme } from '../context/ThemeContext';
import { useData } from '../context/DataContext';
import { Sun, Moon, RotateCcw, Save, ShieldAlert } from 'lucide-react';

export const Settings = () => {
  const { theme, toggleTheme } = useTheme();
  const { resetToDefaults } = useData();

  const [storeName, setStoreName] = useState('EvoCommerce Flagship Store');
  const [currency, setCurrency] = useState('INR (₹)');
  const [timezone, setTimezone] = useState('Asia/Kolkata (IST +5:30)');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Store Profile Settings */}
      <GlassCard className="w-full">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
          General Store Preferences
        </h3>
        <p className="text-xs text-slate-400 mb-6">
          Configure branding, currency display, and timezone localization
        </p>

        <form onSubmit={handleSave} className="space-y-4 text-xs sm:text-sm">
          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
              Store Name
            </label>
            <input
              type="text"
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:border-brand-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Display Currency
              </label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:border-brand-500"
              >
                <option value="INR (₹)">INR (₹) — Indian Rupee</option>
                <option value="USD ($)">USD ($) — US Dollar</option>
                <option value="EUR (€)">EUR (€) — Euro</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Timezone
              </label>
              <select
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:border-brand-500"
              >
                <option value="Asia/Kolkata (IST +5:30)">Asia/Kolkata (IST +5:30)</option>
                <option value="UTC (GMT +0:00)">UTC (GMT +0:00)</option>
                <option value="America/New_York (EST)">America/New_York (EST)</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-white/10">
            {savedSuccess && (
              <span className="text-xs font-bold text-emerald-400">
                ✓ Preferences updated successfully!
              </span>
            )}
            <button
              type="submit"
              className="ml-auto flex items-center gap-2 px-6 py-2.5 rounded-xl bg-brand-500 text-white font-bold text-xs shadow-lg shadow-brand-500/25 hover:bg-brand-600 transition-all"
            >
              <Save className="w-4 h-4" /> Save Settings
            </button>
          </div>
        </form>
      </GlassCard>

      {/* Visual Theme Appearance */}
      <GlassCard className="w-full">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
          Visual Interface Theme
        </h3>
        <p className="text-xs text-slate-400 mb-4">
          Switch between dark space mode and clean light glass mode
        </p>

        <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10">
          <div className="flex items-center gap-3">
            {theme === 'dark' ? (
              <Moon className="w-6 h-6 text-brand-400" />
            ) : (
              <Sun className="w-6 h-6 text-amber-500" />
            )}
            <div>
              <p className="font-bold text-slate-900 dark:text-white">
                Current Theme: <span className="capitalize">{theme} Mode</span>
              </p>
              <p className="text-xs text-slate-400">
                {theme === 'dark'
                  ? 'Deep dark gradient background with cyan and violet accents.'
                  : 'Crisp bright background with high contrast glass panels.'}
              </p>
            </div>
          </div>

          <button
            onClick={toggleTheme}
            className="px-4 py-2 rounded-xl bg-brand-500 text-white font-bold text-xs shadow-md"
          >
            Switch to {theme === 'dark' ? 'Light' : 'Dark'} Mode
          </button>
        </div>
      </GlassCard>

      {/* Danger Zone / Reset Data */}
      <GlassCard className="w-full border-rose-500/20">
        <div className="flex items-center gap-3 mb-2 text-rose-500">
          <ShieldAlert className="w-5 h-5" />
          <h3 className="text-lg font-bold">Reset Local Data</h3>
        </div>
        <p className="text-xs text-slate-400 mb-4 leading-relaxed">
          Reset all products, orders, inventory stock levels, and widget positions back to their initial mock datasets in localStorage.
        </p>

        <button
          onClick={resetToDefaults}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20 hover:bg-rose-500/20 font-bold text-xs transition-all"
        >
          <RotateCcw className="w-4 h-4" /> Reset Mock Data Defaults
        </button>
      </GlassCard>
    </div>
  );
};
