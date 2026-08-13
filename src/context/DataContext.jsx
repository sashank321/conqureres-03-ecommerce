import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_PRODUCTS, INITIAL_ORDERS, INITIAL_CUSTOMERS } from '../data/initialData';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  // Products State
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('evocommerce_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  // Orders State
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('evocommerce_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  // Customers State
  const [customers, setCustomers] = useState(() => {
    const saved = localStorage.getItem('evocommerce_customers');
    return saved ? JSON.parse(saved) : INITIAL_CUSTOMERS;
  });

  // Date Range State
  const [dateRange, setDateRange] = useState('30d');

  // Widget Order State (for Drag and Drop)
  const [widgetOrder, setWidgetOrder] = useState(() => {
    const saved = localStorage.getItem('evocommerce_widget_order');
    return saved
      ? JSON.parse(saved)
      : ['kpi', 'revenueChart', 'salesCategory', 'recentOrders'];
  });

  // Notifications State
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Low Stock Alert', message: 'Precision Master Ergonomic Mouse has only 6 units remaining.', time: '10m ago', unread: true, type: 'warning' },
    { id: 2, title: 'New High Value Order', message: 'Priya Patel placed order #ORD-10481 worth ₹34,999.', time: '2h ago', unread: true, type: 'success' },
    { id: 3, title: 'System Backup Complete', message: 'Database backup executed successfully.', time: '5h ago', unread: false, type: 'info' }
  ]);

  // Persist State to LocalStorage
  useEffect(() => {
    localStorage.setItem('evocommerce_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('evocommerce_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('evocommerce_customers', JSON.stringify(customers));
  }, [customers]);

  useEffect(() => {
    localStorage.setItem('evocommerce_widget_order', JSON.stringify(widgetOrder));
  }, [widgetOrder]);

  // Product Actions
  const addProduct = (newProduct) => {
    const formatted = {
      ...newProduct,
      id: `PRD-00${products.length + 1}`,
      rating: 4.5,
      reviewsCount: 0,
      status: Number(newProduct.stock) > Number(newProduct.reorderLevel)
        ? 'In Stock'
        : Number(newProduct.stock) > 0
        ? 'Low Stock'
        : 'Out of Stock'
    };
    setProducts((prev) => [formatted, ...prev]);
  };

  const updateProduct = (updatedProduct) => {
    const formatted = {
      ...updatedProduct,
      status: Number(updatedProduct.stock) > Number(updatedProduct.reorderLevel)
        ? 'In Stock'
        : Number(updatedProduct.stock) > 0
        ? 'Low Stock'
        : 'Out of Stock'
    };
    setProducts((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? formatted : p))
    );
  };

  const adjustStock = (productId, delta) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          const newStock = Math.max(0, p.stock + delta);
          const status = newStock > p.reorderLevel
            ? 'In Stock'
            : newStock > 0
            ? 'Low Stock'
            : 'Out of Stock';
          return { ...p, stock: newStock, status };
        }
        return p;
      })
    );
  };

  // Order Actions
  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === orderId) {
          const updatedTimeline = ord.timeline.map((t) => {
            if (t.status === newStatus) {
              return { ...t, completed: true, time: 'Just now' };
            }
            return t;
          });
          return { ...ord, status: newStatus, timeline: updatedTimeline };
        }
        return ord;
      })
    );
  };

  // Clear or Reset Data
  const resetToDefaults = () => {
    localStorage.removeItem('evocommerce_products');
    localStorage.removeItem('evocommerce_orders');
    localStorage.removeItem('evocommerce_customers');
    localStorage.removeItem('evocommerce_widget_order');
    setProducts(INITIAL_PRODUCTS);
    setOrders(INITIAL_ORDERS);
    setCustomers(INITIAL_CUSTOMERS);
    setWidgetOrder(['kpi', 'revenueChart', 'salesCategory', 'recentOrders']);
  };

  const markNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  return (
    <DataContext.Provider
      value={{
        products,
        orders,
        customers,
        dateRange,
        setDateRange,
        widgetOrder,
        setWidgetOrder,
        notifications,
        markNotificationsRead,
        addProduct,
        updateProduct,
        adjustStock,
        updateOrderStatus,
        resetToDefaults,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
