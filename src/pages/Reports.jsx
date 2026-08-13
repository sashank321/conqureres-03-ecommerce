import React from 'react';
import { GlassCard } from '../components/common/GlassCard';
import { useData } from '../context/DataContext';
import { exportToCSV } from '../utils/csvExport';
import { FileSpreadsheet, Download, ShieldCheck, DollarSign } from 'lucide-react';

export const Reports = () => {
  const { orders, products, customers } = useData();

  const exportFinancialReport = () => {
    const data = orders.map((o) => ({
      TransactionID: o.id,
      Date: o.date,
      Customer: o.customerName,
      Amount: o.amount,
      PaymentMethod: o.paymentMethod,
      FulfillmentStatus: o.status,
    }));
    exportToCSV(data, `financial_report_${new Date().toISOString().split('T')[0]}.csv`);
  };

  const exportProductReport = () => {
    const data = products.map((p) => ({
      SKU: p.sku,
      Title: p.name,
      Category: p.category,
      UnitPrice: p.price,
      StockCount: p.stock,
      ReorderThreshold: p.reorderLevel,
      Status: p.status,
    }));
    exportToCSV(data, `inventory_report_${new Date().toISOString().split('T')[0]}.csv`);
  };

  const exportCustomerReport = () => {
    const data = customers.map((c) => ({
      CustomerID: c.id,
      Name: c.name,
      Email: c.email,
      Location: c.location,
      LifetimeSpend: c.totalSpent,
      OrdersCount: c.totalOrders,
      Tier: c.status,
    }));
    exportToCSV(data, `customer_report_${new Date().toISOString().split('T')[0]}.csv`);
  };

  return (
    <div className="space-y-6">
      <GlassCard className="w-full">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">Exportable Audit Reports</h3>
        <p className="text-xs text-slate-400 mt-1">
          Download real CSV datasets for financial analysis and inventory compliance
        </p>
      </GlassCard>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard className="flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-brand-500/10 text-brand-500 flex items-center justify-center mb-4">
              <DollarSign className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-extrabold text-slate-900 dark:text-white">Financial Statement</h4>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Complete breakdown of all revenue transactions, payment gateways used, and fulfillment statuses.
            </p>
          </div>
          <button
            onClick={exportFinancialReport}
            className="mt-6 flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-brand-500 text-white font-bold text-xs shadow-lg shadow-brand-500/25 hover:bg-brand-600 transition-all"
          >
            <Download className="w-4 h-4" /> Download Sales CSV
          </button>
        </GlassCard>

        <GlassCard className="flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-4">
              <FileSpreadsheet className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-extrabold text-slate-900 dark:text-white">Inventory Audit Report</h4>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Stock levels, reorder thresholds, SKU catalog, and out-of-stock items summary.
            </p>
          </div>
          <button
            onClick={exportProductReport}
            className="mt-6 flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-cyan-500 text-white font-bold text-xs shadow-lg shadow-cyan-500/25 hover:bg-cyan-600 transition-all"
          >
            <Download className="w-4 h-4" /> Download Inventory CSV
          </button>
        </GlassCard>

        <GlassCard className="flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-extrabold text-slate-900 dark:text-white">Customer Insights CSV</h4>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Customer lifetime value (LTV), transaction counts, location data, and VIP status tiers.
            </p>
          </div>
          <button
            onClick={exportCustomerReport}
            className="mt-6 flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-purple-500 text-white font-bold text-xs shadow-lg shadow-purple-500/25 hover:bg-purple-600 transition-all"
          >
            <Download className="w-4 h-4" /> Download Customers CSV
          </button>
        </GlassCard>
      </div>
    </div>
  );
};
