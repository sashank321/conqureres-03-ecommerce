import React, { useState, useMemo } from 'react';
import { useData } from '../context/DataContext';
import { GlassCard } from '../components/common/GlassCard';
import { StatusBadge } from '../components/common/StatusBadge';
import { Modal } from '../components/common/Modal';
import { formatCurrency } from '../utils/helpers';
import { exportToCSV } from '../utils/csvExport';
import { Search, Download, Eye, Mail, Phone, MapPin } from 'lucide-react';

export const Customers = () => {
  const { customers } = useData();

  const [search, setSearch] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const filteredCustomers = useMemo(() => {
    return customers.filter((c) => {
      return (
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.email.toLowerCase().includes(search.toLowerCase()) ||
        c.location.toLowerCase().includes(search.toLowerCase())
      );
    });
  }, [customers, search]);

  const handleExportCSV = () => {
    const exportData = filteredCustomers.map((c) => ({
      ID: c.id,
      Name: c.name,
      Email: c.email,
      Phone: c.phone,
      Location: c.location,
      'Total Orders': c.totalOrders,
      'Total Spent': c.totalSpent,
      Status: c.status,
    }));
    exportToCSV(exportData, `evocommerce_customers_${new Date().toISOString().split('T')[0]}.csv`);
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <GlassCard className="w-full">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search customers by name, email, or city..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-brand-500"
            />
          </div>

          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 text-white font-bold text-xs shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40 transition-all"
          >
            <Download className="w-4 h-4" /> Export CSV
          </button>
        </div>
      </GlassCard>

      {/* Customer Roster Table */}
      <GlassCard className="w-full overflow-hidden">
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-200 dark:border-white/10 text-slate-400 uppercase font-bold tracking-wider">
                <th className="pb-3 px-3">Customer</th>
                <th className="pb-3 px-3">Contact</th>
                <th className="pb-3 px-3">Location</th>
                <th className="pb-3 px-3">Total Orders</th>
                <th className="pb-3 px-3">Lifetime Spend (LTV)</th>
                <th className="pb-3 px-3">Status</th>
                <th className="pb-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5">
              {filteredCustomers.map((c) => (
                <tr
                  key={c.id}
                  className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
                  onClick={() => setSelectedCustomer(c)}
                >
                  <td className="py-4 px-3">
                    <div className="flex items-center gap-3">
                      <img src={c.avatar} alt={c.name} className="w-10 h-10 rounded-full object-cover" />
                      <div>
                        <p className="font-bold text-slate-900 dark:text-white">{c.name}</p>
                        <p className="text-[11px] text-slate-400">{c.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-3 text-slate-600 dark:text-slate-400">
                    <div className="flex flex-col text-xs">
                      <span>{c.email}</span>
                      <span className="text-[11px] text-slate-400">{c.phone}</span>
                    </div>
                  </td>
                  <td className="py-4 px-3 font-medium text-slate-700 dark:text-slate-300">{c.location}</td>
                  <td className="py-4 px-3 font-bold text-slate-900 dark:text-white">{c.totalOrders} orders</td>
                  <td className="py-4 px-3 font-extrabold text-brand-500">
                    {formatCurrency(c.totalSpent)}
                  </td>
                  <td className="py-4 px-3">
                    <StatusBadge status={c.status} />
                  </td>
                  <td className="py-4 px-3 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedCustomer(c);
                      }}
                      className="p-2 rounded-xl text-slate-400 hover:text-brand-500 hover:bg-brand-500/10 transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>

      {/* Customer Details Modal */}
      {selectedCustomer && (
        <Modal
          isOpen={!!selectedCustomer}
          onClose={() => setSelectedCustomer(null)}
          title={`Customer Profile — ${selectedCustomer.name}`}
        >
          <div className="space-y-6 text-xs sm:text-sm">
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10">
              <img
                src={selectedCustomer.avatar}
                alt={selectedCustomer.name}
                className="w-16 h-16 rounded-full object-cover ring-4 ring-brand-500/20"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white">
                    {selectedCustomer.name}
                  </h4>
                  <StatusBadge status={selectedCustomer.status} />
                </div>
                <div className="flex flex-wrap gap-4 mt-2 text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-brand-500" /> {selectedCustomer.email}
                  </span>
                  <span className="flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-cyan-400" /> {selectedCustomer.phone}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-purple-400" /> {selectedCustomer.location}
                  </span>
                </div>
              </div>
            </div>

            {/* Spending stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
                <span className="text-xs font-bold text-slate-400 uppercase">Lifetime Value</span>
                <p className="text-2xl font-extrabold text-brand-500 mt-1">
                  {formatCurrency(selectedCustomer.totalSpent)}
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
                <span className="text-xs font-bold text-slate-400 uppercase">Total Completed Orders</span>
                <p className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
                  {selectedCustomer.totalOrders}
                </p>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
