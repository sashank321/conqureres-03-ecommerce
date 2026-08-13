import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { GlassCard } from '../common/GlassCard';
import { CATEGORY_SALES } from '../../data/initialData';

export const CategoryChart = () => {
  return (
    <GlassCard className="w-full h-full flex flex-col justify-between">
      <div>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
          Sales by Category
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Distribution across main product lines
        </p>
      </div>

      <div className="h-52 w-full my-2 relative flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={CATEGORY_SALES}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={80}
              paddingAngle={4}
              dataKey="value"
            >
              {CATEGORY_SALES.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} stroke="transparent" />
              ))}
            </Pie>
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="p-2.5 bg-slate-900/90 border border-white/10 rounded-xl text-xs text-white shadow-xl">
                      <span className="font-bold" style={{ color: data.color }}>
                        {data.name}
                      </span>
                      <p className="font-extrabold text-sm">{data.value}% of sales</p>
                    </div>
                  );
                }
                return null;
              }}
            />
          </PieChart>
        </ResponsiveContainer>
        {/* Center label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-xl font-extrabold text-slate-900 dark:text-white">100%</span>
          <span className="text-[10px] text-slate-400 uppercase font-semibold">Total Share</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-100 dark:border-white/5">
        {CATEGORY_SALES.map((item) => (
          <div key={item.name} className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
            <span className="text-xs font-medium text-slate-600 dark:text-slate-300 truncate">
              {item.name} ({item.value}%)
            </span>
          </div>
        ))}
      </div>
    </GlassCard>
  );
};
