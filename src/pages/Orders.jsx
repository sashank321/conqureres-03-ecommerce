import React, { useState, useMemo } from 'react';
import { useData } from '../context/DataContext';
import { useToast } from '../components/common/Toast';
import { GlassCard } from '../components/common/GlassCard';
import { StatusBadge } from '../components/common/StatusBadge';
import { OrderDetailsModal } from '../components/orders/OrderDetailsModal';
import { formatCurrency, formatDate } from '../utils/helpers';
import { exportToCSV } from '../utils/csvExport';
import { Search, Download, Filter, Eye, ChevronLeft, ChevronRight } from 'lucide-react';

export const Orders = () => {
  const { orders } = useData();
  const { addToast } = useToast();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [paymentFilter, setPaymentFilter] = useState('All');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const filteredOrders = useMemo(() => {
    return orders.filter((ord) => {
      const matchesSearch =
        ord.id.toLowerCase().includes(search.toLowerCase()) ||
        ord.customerName.toLowerCase().includes(search.toLowerCase()) ||
        ord.productName.toLowerCase().includes(search.toLowerCase());

      const matchesStatus = statusFilter === 'All' || ord.status === statusFilter;
      const matchesPayment = paymentFilter === 'All' || ord.paymentMethod.includes(paymentFilter);

      return matchesSearch && matchesStatus && matchesPayment;
    });
  }, [orders, search, statusFilter, paymentFilter]);

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage) || 1;
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleExportCSV = () => {
    const exportData = filteredOrders.map((o) => ({
      'Order ID': o.id,
      Customer: o.customerName,
      Email: o.email,
      Product: o.productName,
      Amount: o.amount,
      Payment: o.paymentMethod,
      Status: o.status,
      Date: o.date,
      Location: o.location,
    }));
    exportToCSV(exportData, `evocommerce_orders_${new Date().toISOString().split('T')[0]}.csv`);
    addToast('Orders report CSV downloaded successfully!', 'success');
  };

  return (
    <div className="space-y-6">
      {/* Header Actions & Filters */}
      <GlassCard className="w-full">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by Order ID, Customer, or Product..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl text-xs sm:text-sm text-white placeholder:text-slate-400 focus:outline-none focus:border-brand-400"
            />
          </div>

          {/* Filter Dropdowns */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs bg-black/20 border border-white/15 backdrop-blur-md">
              <Filter className="w-3.5 h-3.5 text-brand-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-transparent text-slate-100 focus:outline-none font-semibold"
              >
                <option value="All" className="bg-slate-900 text-white">All Statuses</option>
                <option value="Pending" className="bg-slate-900 text-white">Pending</option>
                <option value="Processing" className="bg-slate-900 text-white">Processing</option>
                <option value="Shipped" className="bg-slate-900 text-white">Shipped</option>
                <option value="Delivered" className="bg-slate-900 text-white">Delivered</option>
                <option value="Cancelled" className="bg-slate-900 text-white">Cancelled</option>
              </select>
            </div>

            <button
              onClick={handleExportCSV}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 text-white font-bold text-xs shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40 transition-all"
            >
              <Download className="w-4 h-4" /> Export CSV
            </button>
          </div>
        </div>
      </GlassCard>

      {/* Orders Table */}
      <GlassCard className="w-full overflow-hidden">
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-white/10 text-slate-300 uppercase font-bold tracking-wider">
                <th className="pb-3 px-3">Order ID</th>
                <th className="pb-3 px-3">Customer</th>
                <th className="pb-3 px-3">Product</th>
                <th className="pb-3 px-3">Date</th>
                <th className="pb-3 px-3">Amount</th>
                <th className="pb-3 px-3">Payment</th>
                <th className="pb-3 px-3">Status</th>
                <th className="pb-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {paginatedOrders.length > 0 ? (
                paginatedOrders.map((ord) => (
                  <tr
                    key={ord.id}
                    className="hover:bg-white/5 transition-colors cursor-pointer"
                    onClick={() => setSelectedOrder(ord)}
                  >
                    <td className="py-4 px-3 font-extrabold text-brand-400">{ord.id}</td>
                    <td className="py-4 px-3">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={ord.avatar}
                          alt={ord.customerName}
                          className="w-8 h-8 rounded-full object-cover ring-2 ring-white/10"
                        />
                        <div>
                          <p className="font-bold text-white">{ord.customerName}</p>
                          <p className="text-[11px] text-slate-400">{ord.location}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-3 text-slate-200 max-w-[180px] truncate font-medium">
                      {ord.productName}
                    </td>
                    <td className="py-4 px-3 text-slate-400">{formatDate(ord.date)}</td>
                    <td className="py-4 px-3 font-extrabold text-white">
                      {formatCurrency(ord.amount)}
                    </td>
                    <td className="py-4 px-3 text-slate-300">{ord.paymentMethod}</td>
                    <td className="py-4 px-3">
                      <StatusBadge status={ord.status} />
                    </td>
                    <td className="py-4 px-3 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedOrder(ord);
                        }}
                        className="p-2 rounded-xl text-slate-300 hover:text-brand-400 hover:bg-brand-500/20 transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="py-12 text-center text-slate-400 font-medium">
                    No orders match your filter criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10 text-xs">
          <span className="text-slate-300 font-medium">
            Showing {filteredOrders.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} to{' '}
            {Math.min(currentPage * itemsPerPage, filteredOrders.length)} of {filteredOrders.length} orders
          </span>

          <div className="flex items-center gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="p-2 rounded-xl border border-white/10 disabled:opacity-30 hover:bg-white/10 text-slate-200"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="font-bold px-2 text-white">
              Page {currentPage} of {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="p-2 rounded-xl border border-white/10 disabled:opacity-30 hover:bg-white/10 text-slate-200"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </GlassCard>

      {/* Order Details Modal Drawer */}
      <OrderDetailsModal
        order={selectedOrder}
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />
    </div>
  );
};
