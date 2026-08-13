import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import { ThemeProvider } from './context/ThemeContext';
import { DataProvider } from './context/DataContext';
import { ToastProvider } from './components/common/Toast';
import { Layout } from './components/layout/Layout';
import { LoadingReveal } from './components/common/LoadingReveal';

import { Dashboard } from './pages/Dashboard';
import { Orders } from './pages/Orders';
import { Products } from './pages/Products';
import { Inventory } from './pages/Inventory';
import { Customers } from './pages/Customers';
import { Analytics } from './pages/Analytics';
import { Marketing } from './pages/Marketing';
import { Reports } from './pages/Reports';
import { Settings } from './pages/Settings';
import { Help } from './pages/Help';

export function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider>
      <DataProvider>
        <ToastProvider>
          <AnimatePresence mode="wait">
            {loading ? (
              <LoadingReveal key="loading" />
            ) : (
              <Router key="router">
                <Layout>
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/inventory" element={<Inventory />} />
                    <Route path="/customers" element={<Customers />} />
                    <Route path="/analytics" element={<Analytics />} />
                    <Route path="/marketing" element={<Marketing />} />
                    <Route path="/reports" element={<Reports />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/help" element={<Help />} />
                  </Routes>
                </Layout>
              </Router>
            )}
          </AnimatePresence>
        </ToastProvider>
      </DataProvider>
    </ThemeProvider>
  );
}

export default App;
