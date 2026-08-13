import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { GlassCard } from '../common/GlassCard';

export const KpiCard = ({ title, value, change, isPositive = true, icon: Icon, color = 'indigo' }) => {
  const COLOR_MAP = {
    indigo: 'from-brand-500/20 to-brand-500/5 text-brand-500 border-brand-500/30',
    cyan: 'from-cyan-500/20 to-cyan-500/5 text-cyan-400 border-cyan-500/30',
    purple: 'from-purple-500/20 to-purple-500/5 text-purple-400 border-purple-500/30',
    emerald: 'from-emerald-500/20 to-emerald-500/5 text-emerald-400 border-emerald-500/30'
  };

  const gradientStyle = COLOR_MAP[color] || COLOR_MAP.indigo;

  return (
    <GlassCard className="relative overflow-hidden group">
      {/* Background Subtle Glow */}
      <div className={`absolute -right-8 -top-8 w-24 h-24 rounded-full bg-gradient-to-br ${gradientStyle} opacity-30 blur-2xl group-hover:opacity-60 transition-opacity`} />

      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
          {title}
        </span>
        <div className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${gradientStyle} border flex items-center justify-center shadow-sm`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>

      <div className="flex items-baseline justify-between gap-2">
        <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          {value}
        </h3>
      </div>

      <div className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-100 dark:border-white/5">
        <span
          className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full ${
            isPositive
              ? 'bg-emerald-500/15 text-emerald-500 dark:text-emerald-400'
              : 'bg-rose-500/15 text-rose-500 dark:text-rose-400'
          }`}
        >
          {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          {change}
        </span>
        <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">vs previous period</span>
      </div>
    </GlassCard>
  );
};
