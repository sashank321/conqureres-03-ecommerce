import React from 'react';
import { GlassCard } from '../components/common/GlassCard';
import { Megaphone, ArrowUpRight, Zap, Target } from 'lucide-react';

export const Marketing = () => {
  return (
    <div className="space-y-6">
      <GlassCard className="w-full">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Marketing & Growth Campaigns</h3>
            <p className="text-xs text-slate-400 mt-1">
              Active promotions, discount codes, and customer referral tracking
            </p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-500 text-white font-bold text-xs shadow-lg">
            <Zap className="w-4 h-4" /> Create Campaign
          </button>
        </div>
      </GlassCard>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GlassCard>
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-brand-500 uppercase">Flash Sale 20% OFF</span>
            <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full">
              Active
            </span>
          </div>
          <h4 className="text-lg font-bold text-slate-900 dark:text-white">FESTIVE20</h4>
          <p className="text-xs text-slate-400 mt-1">Generated ₹4,20,000 revenue across 142 redeemed orders.</p>
          <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-100 dark:border-white/5 text-xs text-slate-400">
            <span>Expires in 4 days</span>
            <span className="font-bold text-slate-900 dark:text-white">Conversion: 4.8%</span>
          </div>
        </GlassCard>

        <GlassCard>
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-cyan-400 uppercase">VIP Loyalty Coupon</span>
            <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full">
              Active
            </span>
          </div>
          <h4 className="text-lg font-bold text-slate-900 dark:text-white">VIPCLUB</h4>
          <p className="text-xs text-slate-400 mt-1">Exclusive ₹1,000 discount code for repeat high-value customers.</p>
          <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-100 dark:border-white/5 text-xs text-slate-400">
            <span>Never expires</span>
            <span className="font-bold text-slate-900 dark:text-white">Conversion: 12.4%</span>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};
