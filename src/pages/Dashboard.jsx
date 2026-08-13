import React from 'react';
import { WidgetGrid } from '../components/dashboard/WidgetGrid';
import { CategoryChart } from '../components/dashboard/CategoryChart';
import { ChannelChart } from '../components/dashboard/ChannelChart';

export const Dashboard = () => {
  return (
    <div className="space-y-6">
      {/* Main Drag and Drop Dashboard Grid */}
      <WidgetGrid />

      {/* Analytics Breakdown Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CategoryChart />
        <ChannelChart />
      </div>
    </div>
  );
};
