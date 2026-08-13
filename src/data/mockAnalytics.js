// Dynamic chart dataset generator for Date Range Analytics (7 Days, 30 Days, 90 Days, 1 Year)

export const getAnalyticsDataForRange = (range) => {
  switch (range) {
    case '7d':
      return {
        revenueTotal: '₹6,42,800',
        revenueChange: '+14.2%',
        ordersTotal: '482',
        ordersChange: '+9.8%',
        customersTotal: '215',
        customersChange: '+11.4%',
        productsTotal: '1,284',
        productsChange: '+2.1%',
        chartData: [
          { label: 'Mon', revenue: 82000, orders: 62 },
          { label: 'Tue', revenue: 95000, orders: 74 },
          { label: 'Wed', revenue: 78000, orders: 58 },
          { label: 'Thu', revenue: 110000, orders: 84 },
          { label: 'Fri', revenue: 125000, orders: 95 },
          { label: 'Sat', revenue: 88000, orders: 61 },
          { label: 'Sun', revenue: 64800, orders: 48 },
        ]
      };
    case '30d':
      return {
        revenueTotal: '₹24,86,240',
        revenueChange: '+18.4%',
        ordersTotal: '1,842',
        ordersChange: '+12.8%',
        customersTotal: '8,429',
        customersChange: '+9.2%',
        productsTotal: '1,284',
        productsChange: '+6.4%',
        chartData: [
          { label: 'Week 1', revenue: 520000, orders: 390 },
          { label: 'Week 2', revenue: 640000, orders: 460 },
          { label: 'Week 3', revenue: 710000, orders: 520 },
          { label: 'Week 4', revenue: 616240, orders: 472 },
        ]
      };
    case '90d':
      return {
        revenueTotal: '₹68,40,000',
        revenueChange: '+22.1%',
        ordersTotal: '5,120',
        ordersChange: '+16.5%',
        customersTotal: '19,800',
        customersChange: '+14.0%',
        productsTotal: '1,284',
        productsChange: '+8.2%',
        chartData: [
          { label: 'Jun', revenue: 2100000, orders: 1580 },
          { label: 'Jul', revenue: 2250000, orders: 1690 },
          { label: 'Aug', revenue: 2490000, orders: 1850 },
        ]
      };
    case '1y':
    default:
      return {
        revenueTotal: '₹2,48,50,000',
        revenueChange: '+34.6%',
        ordersTotal: '18,400',
        ordersChange: '+28.2%',
        customersTotal: '45,200',
        customersChange: '+24.5%',
        productsTotal: '1,284',
        productsChange: '+15.0%',
        chartData: [
          { label: 'Sep', revenue: 1600000, orders: 1200 },
          { label: 'Oct', revenue: 1850000, orders: 1400 },
          { label: 'Nov', revenue: 2400000, orders: 1800 },
          { label: 'Dec', revenue: 3100000, orders: 2300 },
          { label: 'Jan', revenue: 1950000, orders: 1450 },
          { label: 'Feb', revenue: 1800000, orders: 1350 },
          { label: 'Mar', revenue: 2050000, orders: 1520 },
          { label: 'Apr', revenue: 2100000, orders: 1580 },
          { label: 'May', revenue: 2250000, orders: 1690 },
          { label: 'Jun', revenue: 2400000, orders: 1780 },
          { label: 'Jul', revenue: 2460000, orders: 1820 },
          { label: 'Aug', revenue: 2485000, orders: 1842 },
        ]
      };
  }
};
