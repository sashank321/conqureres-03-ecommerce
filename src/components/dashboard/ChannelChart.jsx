import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';
import { GlassCard } from '../common/GlassCard';
import { CHANNEL_REVENUE } from '../../data/initialData';
import { formatCurrency } from '../../utils/helpers';

export const ChannelChart = () => {
  return (
    <GlassCard className="w-full h-full flex flex-col justify-between">
      <div>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
          Revenue by Channel
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Performance breakdown across sales channels
        </p>
      </div>

      <div className="h-52 w-full my-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={CHANNEL_REVENUE} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <XAxis dataKey="channel" tickLine={false} axisLine={false} tick={{ fill: '#94a3b8', fontSize: 10 }} />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#94a3b8', fontSize: 10 }}
              tickFormatter={(val) => `₹${(val / 100000).toFixed(1)}L`}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const item = payload[0].payload;
                  return (
                    <div className="p-2.5 bg-slate-900/90 border border-white/10 rounded-xl text-xs text-white shadow-xl">
                      <p className="font-bold">{item.channel}</p>
                      <p className="font-extrabold text-brand-400">{formatCurrency(item.revenue)}</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar dataKey="revenue" radius={[6, 6, 0, 0]}>
              {CHANNEL_REVENUE.map((entry, index) => (
                <Cell key={`bar-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-100 dark:border-white/5">
        {CHANNEL_REVENUE.map((item) => (
          <div key={item.channel} className="flex items-center justify-between">
            <span className="text-xs text-slate-500 dark:text-slate-400">{item.channel}</span>
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
              {formatCurrency(item.revenue)}
            </span>
          </div>
        ))}
      </div>
    </GlassCard>
  );
};
