import React from 'react';
import { GlassCard } from '../common/GlassCard';
import { TrendingUp, TrendingDown } from 'lucide-react';

export const KpiCard = ({ title, value, change, isPositive = true, icon: Icon, color = 'indigo' }) => {
  const COLOR_MAP = {
    indigo: 'from-pastel-indigo/30 to-pastel-indigo/5 text-pastel-indigo border-pastel-indigo/40',
    cyan: 'from-pastel-sky/30 to-pastel-sky/5 text-pastel-sky border-pastel-sky/40',
    purple: 'from-pastel-purple/30 to-pastel-purple/5 text-pastel-purple border-pastel-purple/40',
    emerald: 'from-pastel-mint/30 to-pastel-mint/5 text-pastel-mint border-pastel-mint/40'
  };

  const gradientStyle = COLOR_MAP[color] || COLOR_MAP.indigo;

  return (
    <GlassCard className="relative overflow-hidden group">
      {/* Subtle Pastel Glow */}
      <div className={`absolute -right-8 -top-8 w-28 h-28 rounded-full bg-gradient-to-br ${gradientStyle} opacity-30 blur-2xl group-hover:opacity-60 transition-opacity duration-500`} />

      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
          {title}
        </span>
        <div className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${gradientStyle} border flex items-center justify-center shadow-md backdrop-blur-md`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>

      <div className="flex items-baseline justify-between gap-2">
        <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white drop-shadow-sm">
          {value}
        </h3>
      </div>

      <div className="flex items-center gap-2 mt-3 pt-3 border-t border-white/10">
        <span
          className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-0.5 rounded-full backdrop-blur-md border ${
            isPositive
              ? 'bg-pastel-mint/20 text-pastel-mint border-pastel-mint/30'
              : 'bg-pastel-rose/20 text-pastel-rose border-pastel-rose/30'
          }`}
        >
          {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          {change}
        </span>
        <span className="text-[11px] font-medium text-slate-300">vs previous period</span>
      </div>
    </GlassCard>
  );
};
