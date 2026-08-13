import React from 'react';
import { useData } from '../context/DataContext';
import { GlassCard } from '../components/common/GlassCard';
import { StatusBadge } from '../components/common/StatusBadge';
import { Boxes, AlertTriangle, CheckCircle, XCircle, Plus, Minus } from 'lucide-react';

export const Inventory = () => {
  const { products, adjustStock } = useData();

  const totalProducts = products.length;
  const inStockCount = products.filter((p) => p.status === 'In Stock').length;
  const lowStockCount = products.filter((p) => p.status === 'Low Stock').length;
  const outOfStockCount = products.filter((p) => p.status === 'Out of Stock').length;

  const lowOrOutItems = products.filter(
    (p) => p.status === 'Low Stock' || p.status === 'Out of Stock'
  );

  return (
    <div className="space-y-6">
      {/* KPI Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <GlassCard>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-400 uppercase">Total Items</span>
            <Boxes className="w-5 h-5 text-brand-500" />
          </div>
          <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">{totalProducts}</h3>
          <p className="text-xs text-slate-400 mt-1">Unique catalog SKUs</p>
        </GlassCard>

        <GlassCard>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-emerald-400 uppercase">In Stock</span>
            <CheckCircle className="w-5 h-5 text-emerald-400" />
          </div>
          <h3 className="text-2xl font-extrabold text-emerald-400">{inStockCount}</h3>
          <p className="text-xs text-slate-400 mt-1">Optimal inventory levels</p>
        </GlassCard>

        <GlassCard>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-amber-400 uppercase">Low Stock</span>
            <AlertTriangle className="w-5 h-5 text-amber-400" />
          </div>
          <h3 className="text-2xl font-extrabold text-amber-400">{lowStockCount}</h3>
          <p className="text-xs text-slate-400 mt-1">Requires urgent reorder</p>
        </GlassCard>

        <GlassCard>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-rose-400 uppercase">Out of Stock</span>
            <XCircle className="w-5 h-5 text-rose-400" />
          </div>
          <h3 className="text-2xl font-extrabold text-rose-400">{outOfStockCount}</h3>
          <p className="text-xs text-slate-400 mt-1">Revenue at risk</p>
        </GlassCard>
      </div>

      {/* Low Stock Alert Banners */}
      {lowOrOutItems.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-bold uppercase text-slate-400 tracking-wider">
            Critical Inventory Alerts
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {lowOrOutItems.map((p) => (
              <GlassCard
                key={p.id}
                className="flex items-center justify-between p-4 border-l-4 border-amber-500"
              >
                <div className="flex items-center gap-3">
                  <img src={p.image} alt={p.name} className="w-12 h-12 rounded-xl object-cover" />
                  <div>
                    <h5 className="font-bold text-slate-900 dark:text-white line-clamp-1">
                      {p.name}
                    </h5>
                    <p className="text-xs text-slate-400">
                      SKU: <span className="font-mono">{p.sku}</span> • Reorder Threshold: {p.reorderLevel}
                    </p>
                    <span className="text-xs font-bold text-amber-400 mt-0.5 inline-block">
                      Only {p.stock} units remaining
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => adjustStock(p.id, -1)}
                    className="p-1.5 rounded-lg bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center font-bold text-slate-900 dark:text-white text-xs">
                    {p.stock}
                  </span>
                  <button
                    onClick={() => adjustStock(p.id, 10)}
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-brand-500 text-white font-bold text-xs shadow-md shadow-brand-500/20"
                  >
                    <Plus className="w-3.5 h-3.5" /> +10
                  </button>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      )}

      {/* Main Inventory Table */}
      <GlassCard className="w-full overflow-hidden">
        <div className="mb-4">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Inventory Roster</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Real-time stock quantities vs reorder thresholds
          </p>
        </div>

        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-200 dark:border-white/10 text-slate-400 uppercase font-bold tracking-wider">
                <th className="pb-3 px-3">Product</th>
                <th className="pb-3 px-3">SKU</th>
                <th className="pb-3 px-3">Stock Level</th>
                <th className="pb-3 px-3">Reorder Point</th>
                <th className="pb-3 px-3">Status</th>
                <th className="pb-3 px-3 text-right">Quick Stock Adjust</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5">
              {products.map((p) => {
                const stockPercent = Math.min(100, Math.round((p.stock / (p.reorderLevel * 3)) * 100));
                return (
                  <tr key={p.id} className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                    <td className="py-3.5 px-3">
                      <div className="flex items-center gap-3">
                        <img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover" />
                        <div>
                          <p className="font-bold text-slate-900 dark:text-white">{p.name}</p>
                          <p className="text-[11px] text-slate-400">{p.category}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-3 font-mono text-slate-400">{p.sku}</td>
                    <td className="py-3.5 px-3">
                      <div className="w-36">
                        <div className="flex items-center justify-between text-xs font-bold mb-1">
                          <span className="text-slate-900 dark:text-white">{p.stock} units</span>
                          <span className="text-slate-400">{stockPercent}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all ${
                              p.status === 'In Stock'
                                ? 'bg-emerald-500'
                                : p.status === 'Low Stock'
                                ? 'bg-amber-500'
                                : 'bg-rose-500'
                            }`}
                            style={{ width: `${stockPercent}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-3 font-semibold text-slate-500 dark:text-slate-400">
                      {p.reorderLevel} units
                    </td>
                    <td className="py-3.5 px-3">
                      <StatusBadge status={p.status} />
                    </td>
                    <td className="py-3.5 px-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => adjustStock(p.id, -1)}
                          className="p-1.5 rounded-lg bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => adjustStock(p.id, 1)}
                          className="p-1.5 rounded-lg bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
};
