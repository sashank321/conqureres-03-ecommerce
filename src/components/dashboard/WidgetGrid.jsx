import React from 'react';
import { Reorder } from 'framer-motion';
import { GripVertical } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { KpiCard } from './KpiCard';
import { RevenueChart } from './RevenueChart';
import { CategoryChart } from './CategoryChart';
import { ChannelChart } from './ChannelChart';
import { StatusBadge } from '../common/StatusBadge';
import { GlassCard } from '../common/GlassCard';
import { getAnalyticsDataForRange } from '../../data/mockAnalytics';
import { formatCurrency, formatDate } from '../../utils/helpers';
import { DollarSign, ShoppingBag, Users, Package, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const WidgetGrid = () => {
  const { widgetOrder, setWidgetOrder, dateRange, orders } = useData();
  const analytics = getAnalyticsDataForRange(dateRange);

  const renderWidget = (id) => {
    switch (id) {
      case 'kpi':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
            <KpiCard
              title="Total Revenue"
              value={analytics.revenueTotal}
              change={analytics.revenueChange}
              icon={DollarSign}
              color="indigo"
            />
            <KpiCard
              title="Total Orders"
              value={analytics.ordersTotal}
              change={analytics.ordersChange}
              icon={ShoppingBag}
              color="cyan"
            />
            <KpiCard
              title="Total Customers"
              value={analytics.customersTotal}
              change={analytics.customersChange}
              icon={Users}
              color="purple"
            />
            <KpiCard
              title="Active Products"
              value={analytics.productsTotal}
              change={analytics.productsChange}
              icon={Package}
              color="emerald"
            />
          </div>
        );

      case 'revenueChart':
        return <RevenueChart data={analytics.chartData} />;

      case 'salesCategory':
        return <CategoryChart />;

      case 'channelRevenue':
        return <ChannelChart />;

      case 'recentOrders':
        return (
          <GlassCard className="w-full">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Recent Orders</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Latest completed and pending customer transactions</p>
              </div>
              <Link
                to="/orders"
                className="flex items-center gap-1 text-xs font-bold text-brand-500 hover:text-brand-400 transition-colors"
              >
                View All Orders <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="overflow-x-auto no-scrollbar">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-white/10 text-slate-400 uppercase font-semibold">
                    <th className="pb-3 px-2">Order ID</th>
                    <th className="pb-3 px-2">Customer</th>
                    <th className="pb-3 px-2">Product</th>
                    <th className="pb-3 px-2">Amount</th>
                    <th className="pb-3 px-2">Status</th>
                    <th className="pb-3 px-2">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                  {orders.slice(0, 5).map((ord) => (
                    <tr key={ord.id} className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                      <td className="py-3 px-2 font-bold text-brand-500">{ord.id}</td>
                      <td className="py-3 px-2">
                        <div className="flex items-center gap-2">
                          <img src={ord.avatar} alt={ord.customerName} className="w-6 h-6 rounded-full object-cover" />
                          <span className="font-semibold text-slate-800 dark:text-slate-200">{ord.customerName}</span>
                        </div>
                      </td>
                      <td className="py-3 px-2 text-slate-600 dark:text-slate-400 max-w-[150px] truncate">{ord.productName}</td>
                      <td className="py-3 px-2 font-bold text-slate-900 dark:text-white">{formatCurrency(ord.amount)}</td>
                      <td className="py-3 px-2">
                        <StatusBadge status={ord.status} />
                      </td>
                      <td className="py-3 px-2 text-slate-400">{formatDate(ord.date)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </GlassCard>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <Reorder.Group
        axis="y"
        values={widgetOrder}
        onReorder={setWidgetOrder}
        className="space-y-6"
      >
        {widgetOrder.map((id) => (
          <Reorder.Item
            key={id}
            value={id}
            className="relative group cursor-grab active:cursor-grabbing"
          >
            {/* Drag Handle Indicator */}
            <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg bg-black/20 text-white backdrop-blur-md">
              <GripVertical className="w-4 h-4" />
            </div>

            {id === 'salesCategory' || id === 'channelRevenue' ? null : (
              renderWidget(id)
            )}
          </Reorder.Item>
        ))}
      </Reorder.Group>
    </div>
  );
};
