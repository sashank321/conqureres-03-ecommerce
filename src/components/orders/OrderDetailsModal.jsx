import React from 'react';
import { Modal } from '../common/Modal';
import { StatusBadge } from '../common/StatusBadge';
import { formatCurrency, formatDate } from '../../utils/helpers';
import { useData } from '../../context/DataContext';
import { useToast } from '../common/Toast';
import { Printer } from 'lucide-react';

export const OrderDetailsModal = ({ order, isOpen, onClose }) => {
  const { updateOrderStatus } = useData();
  const { addToast } = useToast();

  if (!order) return null;

  const STATUS_STEPS = ['Pending', 'Processing', 'Shipped', 'Delivered'];

  const handleStatusChange = (newStatus) => {
    updateOrderStatus(order.id, newStatus);
    addToast(`Order ${order.id} status updated to "${newStatus}"!`, 'success');
  };

  const handlePrintReceipt = () => {
    window.print();
    addToast('Opening print receipt window...', 'info');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Order Details — ${order.id}`}>
      <div className="space-y-6 text-xs sm:text-sm">
        {/* Top Summary */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10 gap-3 backdrop-blur-md">
          <div>
            <p className="text-xs text-slate-300">Placed on {formatDate(order.date)}</p>
            <h4 className="text-lg font-extrabold text-white mt-0.5">
              Total Amount: {formatCurrency(order.amount)}
            </h4>
          </div>

          <div className="flex items-center gap-3">
            <StatusBadge status={order.status} className="text-sm px-4 py-1.5" />
            <button
              onClick={handlePrintReceipt}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold transition-all border border-white/15"
              title="Print Order Receipt"
            >
              <Printer className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Interactive Order Timeline & Status Switcher */}
        <div>
          <h5 className="text-xs font-bold uppercase text-slate-300 tracking-wider mb-3">
            Update Fulfillment Status
          </h5>
          <div className="flex flex-wrap gap-2">
            {STATUS_STEPS.map((st) => (
              <button
                key={st}
                onClick={() => handleStatusChange(st)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all border ${
                  order.status === st
                    ? 'bg-brand-500 text-white border-brand-400 shadow-lg shadow-brand-500/30'
                    : 'bg-white/5 text-slate-200 border-white/10 hover:bg-white/15'
                }`}
              >
                Set {st}
              </button>
            ))}
            <button
              onClick={() => handleStatusChange('Cancelled')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all border ${
                order.status === 'Cancelled'
                  ? 'bg-rose-500 text-white border-rose-400 shadow-lg'
                  : 'bg-rose-500/10 text-rose-300 border-rose-500/20 hover:bg-rose-500/20'
              }`}
            >
              Cancel Order
            </button>
          </div>
        </div>

        {/* Customer Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
          <div>
            <span className="text-[11px] font-bold text-slate-300 uppercase">Customer Information</span>
            <div className="flex items-center gap-3 mt-2">
              <img src={order.avatar} alt={order.customerName} className="w-10 h-10 rounded-full object-cover ring-2 ring-white/10" />
              <div>
                <p className="font-bold text-white">{order.customerName}</p>
                <p className="text-xs text-slate-300">{order.email}</p>
              </div>
            </div>
          </div>

          <div>
            <span className="text-[11px] font-bold text-slate-300 uppercase">Shipping Location</span>
            <p className="font-semibold text-slate-100 mt-2">{order.location}</p>
            <p className="text-xs text-slate-300 mt-0.5">Payment via {order.paymentMethod}</p>
          </div>
        </div>

        {/* Order Items Breakdown */}
        <div>
          <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-2 block">
            Purchased Items
          </span>
          <div className="space-y-2">
            {order.items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-brand-500/20 text-brand-300 font-bold flex items-center justify-center text-xs border border-brand-500/30">
                    {item.qty}x
                  </div>
                  <div>
                    <p className="font-bold text-white">{item.name}</p>
                    <p className="text-xs text-slate-300">{formatCurrency(item.price)} each</p>
                  </div>
                </div>
                <span className="font-extrabold text-white">
                  {formatCurrency(item.price * item.qty)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};
