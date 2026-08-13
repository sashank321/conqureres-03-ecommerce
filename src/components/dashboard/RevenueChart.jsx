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
  const [metric, setMetric] = useState('revenue');

  return (
    <GlassCard className="w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-lg font-bold text-white">
            Revenue Analytics
          </h3>
          <p className="text-xs text-slate-300">
            Interactive sales & volume trends over time
          </p>
        </div>

        {/* Series Switcher */}
        <div className="flex items-center gap-1 p-1 bg-black/30 border border-white/20 rounded-xl text-xs font-semibold backdrop-blur-md">
          <button
            onClick={() => setMetric('revenue')}
            className={`px-3.5 py-1.5 rounded-lg transition-all duration-300 ${
              metric === 'revenue'
                ? 'bg-pastel-indigo text-slate-900 font-extrabold shadow-md'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Revenue (₹)
          </button>
          <button
            onClick={() => setMetric('orders')}
            className={`px-3.5 py-1.5 rounded-lg transition-all duration-300 ${
              metric === 'orders'
                ? 'bg-pastel-sky text-slate-900 font-extrabold shadow-md'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Orders Volume
          </button>
        </div>
      </div>

      {/* Recharts Area Chart with Pastel Gradients */}
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="colorRevenuePastel" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#a5b4fc" stopOpacity={0.45} />
                <stop offset="95%" stopColor="#a5b4fc" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="colorOrdersPastel" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#7dd3fc" stopOpacity={0.45} />
                <stop offset="95%" stopColor="#7dd3fc" stopOpacity={0.0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255, 255, 255, 0.12)" />
            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#cbd5e1', fontSize: 11 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#cbd5e1', fontSize: 11 }}
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
                    <div className="p-3 bg-slate-950/70 border border-white/20 rounded-2xl backdrop-blur-2xl shadow-2xl text-xs text-white">
                      <p className="font-bold text-slate-300 mb-1">{item.label}</p>
                      <p className="text-pastel-indigo font-extrabold text-sm">
                        Revenue: {formatCurrency(item.revenue)}
                      </p>
                      <p className="text-pastel-sky font-semibold mt-0.5">
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
                stroke="#a5b4fc"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorRevenuePastel)"
              />
            ) : (
              <Area
                type="monotone"
                dataKey="orders"
                stroke="#7dd3fc"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorOrdersPastel)"
              />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </GlassCard>
  );
};
