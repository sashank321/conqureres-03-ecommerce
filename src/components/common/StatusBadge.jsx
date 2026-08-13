import React from 'react';

const STATUS_STYLES = {
  // Order Statuses (Pastel Colors)
  Delivered: 'bg-pastel-mint/20 text-pastel-mint border-pastel-mint/30 shadow-sm',
  Shipped: 'bg-pastel-indigo/20 text-pastel-indigo border-pastel-indigo/30 shadow-sm',
  Processing: 'bg-pastel-peach/20 text-pastel-peach border-pastel-peach/30 shadow-sm',
  Pending: 'bg-pastel-sky/20 text-pastel-sky border-pastel-sky/30 shadow-sm',
  Cancelled: 'bg-pastel-rose/20 text-pastel-rose border-pastel-rose/30 shadow-sm',
  
  // Stock Statuses
  'In Stock': 'bg-pastel-mint/20 text-pastel-mint border-pastel-mint/30 shadow-sm',
  'Low Stock': 'bg-pastel-peach/20 text-pastel-peach border-pastel-peach/30 shadow-sm',
  'Out of Stock': 'bg-pastel-rose/20 text-pastel-rose border-pastel-rose/30 shadow-sm',

  // Customer Statuses
  'VIP Customer': 'bg-pastel-purple/20 text-pastel-purple border-pastel-purple/30 shadow-sm',
  Active: 'bg-pastel-mint/20 text-pastel-mint border-pastel-mint/30 shadow-sm',
  New: 'bg-pastel-sky/20 text-pastel-sky border-pastel-sky/30 shadow-sm'
};

export const StatusBadge = ({ status, className = '' }) => {
  const style = STATUS_STYLES[status] || 'bg-white/10 text-slate-200 border-white/20';

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border backdrop-blur-xl transition-all duration-300 ${style} ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-90" />
      {status}
    </span>
  );
};
