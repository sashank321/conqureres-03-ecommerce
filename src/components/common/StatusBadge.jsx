import React from 'react';

const STATUS_STYLES = {
  // Order Statuses
  Delivered: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-emerald-500/10',
  Shipped: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20 shadow-indigo-500/10',
  Processing: 'bg-amber-500/10 text-amber-400 border-amber-500/20 shadow-amber-500/10',
  Pending: 'bg-sky-500/10 text-sky-400 border-sky-500/20 shadow-sky-500/10',
  Cancelled: 'bg-rose-500/10 text-rose-400 border-rose-500/20 shadow-rose-500/10',
  
  // Stock Statuses
  'In Stock': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-emerald-500/10',
  'Low Stock': 'bg-amber-500/10 text-amber-400 border-amber-500/20 shadow-amber-500/10',
  'Out of Stock': 'bg-rose-500/10 text-rose-400 border-rose-500/20 shadow-rose-500/10',

  // Customer Statuses
  'VIP Customer': 'bg-purple-500/10 text-purple-400 border-purple-500/20 shadow-purple-500/10',
  Active: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-emerald-500/10',
  New: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20 shadow-cyan-500/10'
};

export const StatusBadge = ({ status, className = '' }) => {
  const style = STATUS_STYLES[status] || 'bg-slate-500/10 text-slate-400 border-slate-500/20';

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border backdrop-blur-md shadow-sm transition-all duration-200 ${style} ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
      {status}
    </span>
  );
};
