import React from 'react';
import { GlassCard } from '../components/common/GlassCard';
import { RevenueChart } from '../components/dashboard/RevenueChart';
import { CategoryChart } from '../components/dashboard/CategoryChart';
import { ChannelChart } from '../components/dashboard/ChannelChart';
import { useData } from '../context/DataContext';
import { getAnalyticsDataForRange } from '../data/mockAnalytics';
import { formatCurrency } from '../utils/helpers';
import { TrendingUp, ShoppingBag, DollarSign, Target, Award } from 'lucide-react';

export const Analytics = () => {
  const { dateRange, products } = useData();
  const analytics = getAnalyticsDataForRange(dateRange);

  return (
    <div className="space-y-6">
      {/* Top Strategic KPI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <GlassCard>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-400 uppercase">Conversion Rate</span>
            <Target className="w-5 h-5 text-brand-500" />
          </div>
          <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">2.84%</h3>
          <span className="text-xs font-bold text-emerald-400 flex items-center gap-1 mt-1">
            <TrendingUp className="w-3 h-3" /> +0.4% this month
          </span>
        </GlassCard>

        <GlassCard>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-400 uppercase">Avg Order Value (AOV)</span>
            <DollarSign className="w-5 h-5 text-cyan-400" />
          </div>
          <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">₹1,349</h3>
          <span className="text-xs font-bold text-emerald-400 flex items-center gap-1 mt-1">
            <TrendingUp className="w-3 h-3" /> +₹120 vs last month
          </span>
        </GlassCard>

        <GlassCard>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-400 uppercase">Repeat Customer Rate</span>
            <Award className="w-5 h-5 text-purple-400" />
          </div>
          <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">38.2%</h3>
          <span className="text-xs font-bold text-emerald-400 flex items-center gap-1 mt-1">
            <TrendingUp className="w-3 h-3" /> +4.1% retention
          </span>
        </GlassCard>

        <GlassCard>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-400 uppercase">Gross Profit Margin</span>
            <ShoppingBag className="w-5 h-5 text-emerald-400" />
          </div>
          <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">64.5%</h3>
          <span className="text-xs font-bold text-emerald-400 flex items-center gap-1 mt-1">
            <TrendingUp className="w-3 h-3" /> Healthy margins
          </span>
        </GlassCard>
      </div>

      {/* Main Revenue Chart */}
      <RevenueChart data={analytics.chartData} />

      {/* Secondary Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CategoryChart />
        <ChannelChart />
      </div>

      {/* Top Products Leaderboard */}
      <GlassCard className="w-full">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Top Products Leaderboard
            </h3>
            <p className="text-xs text-slate-400">Ranked by overall sales revenue</p>
          </div>
        </div>

        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-200 dark:border-white/10 text-slate-400 uppercase font-bold">
                <th className="pb-3 px-3">Rank</th>
                <th className="pb-3 px-3">Product Name</th>
                <th className="pb-3 px-3">Category</th>
                <th className="pb-3 px-3">Unit Price</th>
                <th className="pb-3 px-3">Rating</th>
                <th className="pb-3 px-3 text-right">Total Stock</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5">
              {products.slice(0, 5).map((p, idx) => (
                <tr key={p.id} className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                  <td className="py-3.5 px-3 font-extrabold text-brand-500">#{idx + 1}</td>
                  <td className="py-3.5 px-3">
                    <div className="flex items-center gap-3">
                      <img src={p.image} alt={p.name} className="w-9 h-9 rounded-lg object-cover" />
                      <span className="font-bold text-slate-900 dark:text-white">{p.name}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-3 text-slate-400">{p.category}</td>
                  <td className="py-3.5 px-3 font-bold text-slate-900 dark:text-white">
                    {formatCurrency(p.price)}
                  </td>
                  <td className="py-3.5 px-3 text-amber-400 font-bold">★ {p.rating}</td>
                  <td className="py-3.5 px-3 text-right font-bold text-slate-700 dark:text-slate-300">
                    {p.stock} units
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
};
