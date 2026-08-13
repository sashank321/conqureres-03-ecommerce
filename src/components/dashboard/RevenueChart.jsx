import React, { useState } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { GlassCard } from '../common/GlassCard';
import { formatCurrency } from '../../utils/helpers';

export const RevenueChart = ({ data = [] }) => {
  const [metric, setMetric] = useState('revenue'); // 'revenue' | 'orders'

  return (
    <GlassCard className="w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Revenue Analytics
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Interactive sales & volume trends over time
          </p>
        </div>

        {/* Series Switcher */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-xs font-semibold">
          <button
            onClick={() => setMetric('revenue')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              metric === 'revenue'
                ? 'bg-brand-500 text-white font-bold shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Revenue (₹)
          </button>
          <button
            onClick={() => setMetric('orders')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              metric === 'orders'
                ? 'bg-cyan-500 text-white font-bold shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Orders Volume
          </button>
        </div>
      </div>

      {/* Recharts Area Chart */}
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148, 163, 184, 0.15)" />
            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#94a3b8', fontSize: 11 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#94a3b8', fontSize: 11 }}
              tickFormatter={(val) =>
                metric === 'revenue'
                  ? val >= 1000000
                    ? `₹${(val / 1000000).toFixed(1)}M`
                    : val >= 1000
                    ? `₹${(val / 1000).toFixed(0)}k`
                    : `₹${val}`
                  : val
              }
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const item = payload[0].payload;
                  return (
                    <div className="p-3 bg-slate-900/90 dark:bg-slate-950/95 border border-white/10 rounded-xl backdrop-blur-md shadow-2xl text-xs text-white">
                      <p className="font-bold text-slate-300 mb-1">{item.label}</p>
                      <p className="text-brand-400 font-extrabold text-sm">
                        Revenue: {formatCurrency(item.revenue)}
                      </p>
                      <p className="text-cyan-400 font-semibold mt-0.5">
                        Orders: {item.orders} transactions
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            {metric === 'revenue' ? (
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#6366f1"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorRevenue)"
              />
            ) : (
              <Area
                type="monotone"
                dataKey="orders"
                stroke="#06b6d4"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorOrders)"
              />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </GlassCard>
  );
};
