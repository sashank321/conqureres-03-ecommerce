export const INITIAL_PRODUCTS = [
  {
    id: 'PRD-001',
    name: 'Aura Studio Wireless Headphones',
    category: 'Electronics',
    sku: 'AUR-WL-01',
    price: 8499,
    stock: 42,
    reorderLevel: 15,
    status: 'In Stock',
    rating: 4.8,
    reviewsCount: 128,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80',
    description: 'Active noise cancelling wireless headphones with 40h battery life and spatial audio.'
  },
  {
    id: 'PRD-002',
    name: 'Luminary Ultra 4K Monitor 27"',
    category: 'Electronics',
    sku: 'LUM-MON-27',
    price: 34999,
    stock: 8,
    reorderLevel: 10,
    status: 'Low Stock',
    rating: 4.9,
    reviewsCount: 94,
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&q=80',
    description: '27-inch 4K IPS display with 144Hz refresh rate, USB-C 90W charging, and HDR600.'
  },
  {
    id: 'PRD-003',
    name: 'ErgoPro Mechanical Keyboard',
    category: 'Electronics',
    sku: 'ERG-KB-RGB',
    price: 6299,
    stock: 25,
    reorderLevel: 10,
    status: 'In Stock',
    rating: 4.7,
    reviewsCount: 215,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&q=80',
    description: 'Hot-swappable wireless mechanical keyboard with custom lubricated linear switches.'
  },
  {
    id: 'PRD-004',
    name: 'Precision Master Ergonomic Mouse',
    category: 'Electronics',
    sku: 'PRE-MS-04',
    price: 3499,
    stock: 6,
    reorderLevel: 12,
    status: 'Low Stock',
    rating: 4.6,
    reviewsCount: 180,
    image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500&q=80',
    description: 'Ultra-accurate optical sensor mouse with thumb wheel, side buttons, and multi-device connection.'
  },
  {
    id: 'PRD-005',
    name: 'Minimalist Leather Executive Bag',
    category: 'Fashion',
    sku: 'FSH-BAG-05',
    price: 7999,
    stock: 18,
    reorderLevel: 5,
    status: 'In Stock',
    rating: 4.8,
    reviewsCount: 86,
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&q=80',
    description: 'Full-grain Italian leather briefcase with padded 16" laptop compartment and water resistance.'
  },
  {
    id: 'PRD-006',
    name: 'HydroPulse Smart Water Bottle 750ml',
    category: 'Home & Fitness',
    sku: 'HYD-BTL-75',
    price: 2499,
    stock: 0,
    reorderLevel: 20,
    status: 'Out of Stock',
    rating: 4.5,
    reviewsCount: 310,
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&q=80',
    description: 'UV-C self-cleaning smart water bottle with LED hydration tracker and double-wall insulation.'
  },
  {
    id: 'PRD-007',
    name: 'Zenith Organic Cotton Oversized Hoodie',
    category: 'Fashion',
    sku: 'ZNT-HD-BLK',
    price: 3299,
    stock: 64,
    reorderLevel: 15,
    status: 'In Stock',
    rating: 4.9,
    reviewsCount: 412,
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=500&q=80',
    description: '450 GSM heavyweight organic French terry cotton hoodie with relaxed silhouette.'
  },
  {
    id: 'PRD-008',
    name: 'Serene Botanical Scented Candle',
    category: 'Home & Living',
    sku: 'SER-CND-08',
    price: 1299,
    stock: 4,
    reorderLevel: 10,
    status: 'Low Stock',
    rating: 4.7,
    reviewsCount: 154,
    image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=500&q=80',
    description: 'Hand-poured soy wax candle infused with lavender, eucalyptus, and cedarwood essential oils.'
  }
];

export const INITIAL_ORDERS = [
  {
    id: 'ORD-10482',
    customerName: 'Aarav Sharma',
    email: 'aarav.sharma@example.com',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80',
    productName: 'Aura Studio Wireless Headphones',
    productId: 'PRD-001',
    quantity: 1,
    amount: 8499,
    paymentMethod: 'UPI / GPay',
    status: 'Delivered',
    date: '2026-08-13T10:30:00',
    location: 'Mumbai, MH',
    items: [
      { id: 'PRD-001', name: 'Aura Studio Wireless Headphones', price: 8499, qty: 1 }
    ],
    timeline: [
      { status: 'Pending', time: '13 Aug 10:30 AM', completed: true },
      { status: 'Processing', time: '13 Aug 10:45 AM', completed: true },
      { status: 'Shipped', time: '13 Aug 11:15 AM', completed: true },
      { status: 'Delivered', time: '13 Aug 02:00 PM', completed: true }
    ]
  },
  {
    id: 'ORD-10481',
    customerName: 'Priya Patel',
    email: 'priya.patel@example.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80',
    productName: 'Luminary Ultra 4K Monitor 27"',
    productId: 'PRD-002',
    quantity: 1,
    amount: 34999,
    paymentMethod: 'Credit Card',
    status: 'Processing',
    date: '2026-08-13T09:15:00',
    location: 'Bengaluru, KA',
    items: [
      { id: 'PRD-002', name: 'Luminary Ultra 4K Monitor 27"', price: 34999, qty: 1 }
    ],
    timeline: [
      { status: 'Pending', time: '13 Aug 09:15 AM', completed: true },
      { status: 'Processing', time: '13 Aug 09:30 AM', completed: true },
      { status: 'Shipped', time: 'In Progress', completed: false },
      { status: 'Delivered', time: 'Pending', completed: false }
    ]
  },
  {
    id: 'ORD-10480',
    customerName: 'Rohan Verma',
    email: 'rohan.v@example.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80',
    productName: 'ErgoPro Mechanical Keyboard',
    productId: 'PRD-003',
    quantity: 2,
    amount: 12598,
    paymentMethod: 'Net Banking',
    status: 'Shipped',
    date: '2026-08-12T16:45:00',
    location: 'Delhi, NCR',
    items: [
      { id: 'PRD-003', name: 'ErgoPro Mechanical Keyboard', price: 6299, qty: 2 }
    ],
    timeline: [
      { status: 'Pending', time: '12 Aug 04:45 PM', completed: true },
      { status: 'Processing', time: '12 Aug 05:15 PM', completed: true },
      { status: 'Shipped', time: '13 Aug 08:00 AM', completed: true },
      { status: 'Delivered', time: 'Estimated 14 Aug', completed: false }
    ]
  },
  {
    id: 'ORD-10479',
    customerName: 'Ananya Reddy',
    email: 'ananya.r@example.com',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&q=80',
    productName: 'Minimalist Leather Executive Bag',
    productId: 'PRD-005',
    quantity: 1,
    amount: 7999,
    paymentMethod: 'UPI / PhonePe',
    status: 'Pending',
    date: '2026-08-12T14:20:00',
    location: 'Hyderabad, TS',
    items: [
      { id: 'PRD-005', name: 'Minimalist Leather Executive Bag', price: 7999, qty: 1 }
    ],
    timeline: [
      { status: 'Pending', time: '12 Aug 02:20 PM', completed: true },
      { status: 'Processing', time: 'Pending', completed: false },
      { status: 'Shipped', time: 'Pending', completed: false },
      { status: 'Delivered', time: 'Pending', completed: false }
    ]
  },
  {
    id: 'ORD-10478',
    customerName: 'Vikram Sengupta',
    email: 'vikram.s@example.com',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80',
    productName: 'Zenith Organic Cotton Hoodie',
    productId: 'PRD-007',
    quantity: 2,
    amount: 6598,
    paymentMethod: 'Debit Card',
    status: 'Delivered',
    date: '2026-08-11T11:10:00',
    location: 'Kolkata, WB',
    items: [
      { id: 'PRD-007', name: 'Zenith Organic Cotton Hoodie', price: 3299, qty: 2 }
    ],
    timeline: [
      { status: 'Pending', time: '11 Aug 11:10 AM', completed: true },
      { status: 'Processing', time: '11 Aug 11:40 AM', completed: true },
      { status: 'Shipped', time: '11 Aug 03:00 PM', completed: true },
      { status: 'Delivered', time: '12 Aug 04:30 PM', completed: true }
    ]
  },
  {
    id: 'ORD-10477',
    customerName: 'Sneha Kulkarni',
    email: 'sneha.k@example.com',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80',
    productName: 'Precision Master Ergonomic Mouse',
    productId: 'PRD-004',
    quantity: 1,
    amount: 3499,
    paymentMethod: 'UPI / Paytm',
    status: 'Cancelled',
    date: '2026-08-10T18:05:00',
    location: 'Pune, MH',
    items: [
      { id: 'PRD-004', name: 'Precision Master Ergonomic Mouse', price: 3499, qty: 1 }
    ],
    timeline: [
      { status: 'Pending', time: '10 Aug 06:05 PM', completed: true },
      { status: 'Cancelled', time: '10 Aug 06:20 PM', completed: true }
    ]
  }
];

export const INITIAL_CUSTOMERS = [
  {
    id: 'CST-001',
    name: 'Aarav Sharma',
    email: 'aarav.sharma@example.com',
    phone: '+91 98765 43210',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80',
    location: 'Mumbai, MH',
    totalOrders: 14,
    totalSpent: 124500,
    lastOrderDate: '2026-08-13',
    status: 'VIP Customer'
  },
  {
    id: 'CST-002',
    name: 'Priya Patel',
    email: 'priya.patel@example.com',
    phone: '+91 98123 88990',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80',
    location: 'Bengaluru, KA',
    totalOrders: 8,
    totalSpent: 98400,
    lastOrderDate: '2026-08-13',
    status: 'Active'
  },
  {
    id: 'CST-003',
    name: 'Rohan Verma',
    email: 'rohan.v@example.com',
    phone: '+91 99887 11223',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80',
    location: 'Delhi, NCR',
    totalOrders: 5,
    totalSpent: 36200,
    lastOrderDate: '2026-08-12',
    status: 'Active'
  },
  {
    id: 'CST-004',
    name: 'Ananya Reddy',
    email: 'ananya.r@example.com',
    phone: '+91 97766 55443',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&q=80',
    location: 'Hyderabad, TS',
    totalOrders: 3,
    totalSpent: 18900,
    lastOrderDate: '2026-08-12',
    status: 'New'
  },
  {
    id: 'CST-005',
    name: 'Vikram Sengupta',
    email: 'vikram.s@example.com',
    phone: '+91 91234 56789',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80',
    location: 'Kolkata, WB',
    totalOrders: 11,
    totalSpent: 84300,
    lastOrderDate: '2026-08-11',
    status: 'VIP Customer'
  }
];

export const CATEGORY_SALES = [
  { name: 'Electronics', value: 45, color: '#6366f1' },
  { name: 'Fashion', value: 25, color: '#06b6d4' },
  { name: 'Home & Living', value: 18, color: '#8b5cf6' },
  { name: 'Beauty & Fitness', value: 12, color: '#ec4899' }
];

export const CHANNEL_REVENUE = [
  { channel: 'Direct Website', revenue: 1450000, color: '#6366f1' },
  { channel: 'Mobile App', revenue: 680000, color: '#06b6d4' },
  { channel: 'Marketplace', revenue: 240000, color: '#8b5cf6' },
  { channel: 'Social Commerce', revenue: 116240, color: '#ec4899' }
];
