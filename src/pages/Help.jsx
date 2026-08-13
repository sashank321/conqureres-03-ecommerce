import React from 'react';
import { GlassCard } from '../components/common/GlassCard';
import { HelpCircle, BookOpen, MessageSquare, ExternalLink } from 'lucide-react';

export const Help = () => {
  return (
    <div className="space-y-6">
      <GlassCard className="w-full">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">Help & Knowledge Base</h3>
        <p className="text-xs text-slate-400 mt-1">
          Documentation, keyboard shortcuts, and developer guides for EvoCommerce Admin OS
        </p>
      </GlassCard>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GlassCard>
          <BookOpen className="w-8 h-8 text-brand-500 mb-3" />
          <h4 className="text-lg font-bold text-slate-900 dark:text-white">API & Integration Guides</h4>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
            Learn how to synchronize local stock levels with external marketplaces, ERP systems, and payment gateways.
          </p>
        </GlassCard>

        <GlassCard>
          <MessageSquare className="w-8 h-8 text-cyan-400 mb-3" />
          <h4 className="text-lg font-bold text-slate-900 dark:text-white">24/7 Developer Support</h4>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
            Contact the system administrator or submit a ticket for custom dashboard layout adjustments.
          </p>
        </GlassCard>
      </div>
    </div>
  );
};
